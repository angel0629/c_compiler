---
title: "_pipe"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pipe?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a pipe for reading and writing.

## Syntax

```
int _pipe(
   int *pfds,
   unsigned int psize,
   int textmode
);
```

### Parameters

_`pfds`_  
Pointer to an array of two **`int`** to hold read and write file descriptors.

_`psize`_  
Amount of memory to reserve.

_`textmode`_  
File mode.

## Return value

Returns 0 if successful. Returns -1 to indicate an error. On error, `errno` is set to one of these values:

*   `EMFILE`, which indicates that no more file descriptors are available.
    
*   `ENFILE`, which indicates a system-file-table overflow.
    
*   `EINVAL`, which indicates that either the array _`pfds`_ is a null pointer or that an invalid value for _`textmode`_ was passed in.
    

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_pipe`** function creates a _pipe_, which is an artificial I/O channel that a program uses to pass information to other programs. A pipe resembles a file, because it has a file pointer, a file descriptor, or both. And, it can be read from or written to by using the Standard Library input and output functions. However, a pipe doesn't represent a specific file or device. Instead, it represents temporary storage in memory that is independent of the program's own memory and is controlled entirely by the operating system.

**`_pipe`** resembles **`_open`** but opens the pipe for reading and writing and returns two file descriptors instead of one. The program can use both sides of the pipe or close the one that it doesn't need. For example, the command processor in Windows creates a pipe when it executes a command such as **`PROGRAM1 | PROGRAM2`**.

The standard output descriptor of `PROGRAM1` is attached to the pipe's write descriptor. The standard input descriptor of `PROGRAM2` is attached to the pipe's read descriptor. This attachment eliminates the need to create temporary files to pass information to other programs.

The **`_pipe`** function returns two file descriptors to the pipe in the _`pfds`_ argument. The element _`pfds`_\[0\] contains the read descriptor, and the element _`pfds`_\[1\] contains the write descriptor. Pipe file descriptors are used in the same way as other file descriptors. (The low-level input and output functions **`_read`** and **`_write`** can read from and write to a pipe.) To detect the end-of-pipe condition, check for a **`_read`** request that returns 0 as the number of bytes read.

The _`psize`_ argument specifies the amount of memory, in bytes, to reserve for the pipe. The _`textmode`_ argument specifies the translation mode for the pipe. The manifest constant `_O_TEXT` specifies an ANSI text translation, and the constant `_O_BINARY` specifies binary translation. (See [`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170) for a description of text and binary modes.) If the _`textmode`_ argument is 0, **`_pipe`** uses the default translation mode that's specified by the default-mode variable [`_fmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/fmode?view=msvc-170).

In multithreaded programs, no locking is performed. The file descriptors that are returned are newly opened and shouldn't be referenced by any thread until after the **`_pipe`** call is complete.

To use the **`_pipe`** function to communicate between a parent process and a child process, each process must have only one descriptor open on the pipe. The descriptors must be opposites: if the parent has a read descriptor open, then the child must have a write descriptor open. It's easiest to use a bitwise "or" (**`|`**) on the `_O_NOINHERIT` flag with _`textmode`_. Then, use **`_dup`** or **`_dup2`** to create an inheritable copy of the pipe descriptor that you want to pass to the child. Close the original descriptor, and then spawn the child process. On returning from the spawn call, close the duplicate descriptor in the parent process. For more information, see example 2 later in this article.

In the Windows operating system, a pipe is destroyed when all of its descriptors have been closed. (If all read descriptors on the pipe have been closed, then writing to the pipe causes an error.) All read and write operations on the pipe wait until there's enough data or enough buffer space to complete the I/O request.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

Optional header

**`_pipe`**

`<io.h>`

`<fcntl.h>`,1 `<errno.h>`2

1 For `_O_BINARY` and `_O_TEXT` definitions.

2 `errno` definitions.

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example 1

```
// crt_pipe.c
/* This program uses the _pipe function to pass streams of
* text to spawned processes.
*/

#include <stdlib.h>
#include <stdio.h>
#include <io.h>
#include <fcntl.h>
#include <process.h>
#include <math.h>

enum PIPES { READ, WRITE }; /* Constants 0 and 1 for READ and WRITE */
#define NUMPROBLEM 8

int main( int argc, char *argv[] )
{
   int fdpipe[2];
   char hstr[20];
   int pid, problem, c;
   int termstat;

   /* If no arguments, this is the spawning process */
   if( argc == 1 )
   {

      setvbuf( stdout, NULL, _IONBF, 0 );

      /* Open a set of pipes */
      if( _pipe( fdpipe, 256, O_BINARY ) == -1 )
          exit( 1 );

      /* Convert pipe read descriptor to string and pass as argument
       * to spawned program. Program spawns itself (argv[0]).
       */
      _itoa_s( fdpipe[READ], hstr, sizeof(hstr), 10 );
      if( ( pid = _spawnl( P_NOWAIT, argv[0], argv[0],
            hstr, NULL ) ) == -1 )
          printf( "Spawn failed" );

      /* Put problem in write pipe. Since spawned program is
       * running simultaneously, first solutions may be done
       * before last problem is given.
       */
      for( problem = 1000; problem <= NUMPROBLEM * 1000; problem += 1000)
      {

         printf( "Son, what is the square root of %d?\n", problem );
         _write( fdpipe[WRITE], (char *)&problem, sizeof( int ) );

      }

      /* Wait until spawned program is done processing. */
      _cwait( &termstat, pid, WAIT_CHILD );
      if( termstat & 0x0 )
         printf( "Child failed\n" );

      _close( fdpipe[READ] );
      _close( fdpipe[WRITE] );

   }

   /* If there is an argument, this must be the spawned process. */
   else
   {

      /* Convert passed string descriptor to integer descriptor. */
      fdpipe[READ] = atoi( argv[1] );

      /* Read problem from pipe and calculate solution. */
      for( c = 0; c < NUMPROBLEM; c++ )
      {

        _read( fdpipe[READ], (char *)&problem, sizeof( int ) );
        printf( "Dad, the square root of %d is %3.2f.\n",
                 problem, sqrt( ( double )problem ) );

      }
   }
}
```

```
Son, what is the square root of 1000?
Son, what is the square root of 2000?
Son, what iDad, the square root of 1000 is 31.62.
Dad, the square root of 2000 is 44.72.
s the square root of 3000?
Dad, the square root of 3000 is 54.77.
Son, what is the square root of 4000?
Dad, the square root of 4000 is 63.25.
Son, what is the square root of 5000?
Dad, the square root of 5000 is 70.71.
Son, what is the square root of 6000?
SonDad, the square root of 6000 is 77.46.
, what is the square root of 7000?
Dad, the square root of 7000 is 83.67.
Son, what is the square root of 8000?
Dad, the square root of 8000 is 89.44.
```

## Example 2

The sample code is a basic filter application. It spawns the application `crt_pipe_beeper` after it creates a pipe that directs the spawned application's `stdout` to the filter. The filter removes ASCII 7 (beep) characters.

```
// crt_pipe_beeper.c

#include <stdio.h>
#include <string.h>

int main()
{
   int   i;
   for(i=0;i<10;++i)
      {
         printf("This is speaker beep number %d...\n\7", i+1);
      }
   return 0;
}
```

The actual filter application:

```
// crt_pipe_BeepFilter.C
// arguments: crt_pipe_beeper.exe

#include <windows.h>
#include <process.h>
#include <memory.h>
#include <string.h>
#include <stdio.h>
#include <fcntl.h>
#include <io.h>

#define   OUT_BUFF_SIZE 512
#define   READ_FD 0
#define   WRITE_FD 1
#define   BEEP_CHAR 7

char szBuffer[OUT_BUFF_SIZE];

int Filter(char* szBuff, ULONG nSize, int nChar)
{
   char* szPos = szBuff + nSize -1;
   char* szEnd = szPos;
   int nRet = nSize;

   while (szPos > szBuff)
   {
      if (*szPos == nChar)
         {
            memmove(szPos, szPos+1, szEnd - szPos);
            --nRet;
         }
      --szPos;
   }
   return nRet;
}

int main(int argc, char** argv)
{
   int nExitCode = STILL_ACTIVE;
   if (argc >= 2)
   {
      HANDLE hProcess;
      int fdStdOut;
      int fdStdOutPipe[2];

      // Create the pipe
      if(_pipe(fdStdOutPipe, 512, O_NOINHERIT) == -1)
         return   1;

      // Duplicate stdout file descriptor (next line will close original)
      fdStdOut = _dup(_fileno(stdout));

      // Duplicate write end of pipe to stdout file descriptor
      if(_dup2(fdStdOutPipe[WRITE_FD], _fileno(stdout)) != 0)
         return   2;

      // Close original write end of pipe
      _close(fdStdOutPipe[WRITE_FD]);

      // Spawn process
      hProcess = (HANDLE)_spawnvp(P_NOWAIT, argv[1],
       (const char* const*)&argv[1]);

      // Duplicate copy of original stdout back into stdout
      if(_dup2(fdStdOut, _fileno(stdout)) != 0)
         return   3;

      // Close duplicate copy of original stdout
      _close(fdStdOut);

      if(hProcess)
      {
         int nOutRead;
         while   (nExitCode == STILL_ACTIVE)
         {
            nOutRead = _read(fdStdOutPipe[READ_FD],
             szBuffer, OUT_BUFF_SIZE);
            if(nOutRead)
            {
               nOutRead = Filter(szBuffer, nOutRead, BEEP_CHAR);
               fwrite(szBuffer, 1, nOutRead, stdout);
            }

            if(!GetExitCodeProcess(hProcess,(unsigned long*)&nExitCode))
               return 4;
         }
      }
   }
   return nExitCode;
}
```

```
This is speaker beep number 1...
This is speaker beep number 2...
This is speaker beep number 3...
This is speaker beep number 4...
This is speaker beep number 5...
This is speaker beep number 6...
This is speaker beep number 7...
This is speaker beep number 8...
This is speaker beep number 9...
This is speaker beep number 10...
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)
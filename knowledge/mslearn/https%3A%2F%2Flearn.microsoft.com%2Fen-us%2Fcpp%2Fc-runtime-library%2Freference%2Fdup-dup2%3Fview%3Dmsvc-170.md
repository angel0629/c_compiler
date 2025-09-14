---
title: "_dup, _dup2"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dup-dup2?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a second file descriptor for an open file (**`_dup`**), or reassigns a file descriptor (**`_dup2`**).

## Syntax

```
int _dup( int fd );
int _dup2( int fd1, int fd2 );
```

### Parameters

_`fd`_, _`fd1`_  
File descriptors referring to open file.

_`fd2`_  
Any file descriptor.

## Return value

**`_dup`** returns a new file descriptor. **`_dup2`** returns 0 to indicate success. If an error occurs, each function returns -1 and sets `errno` to `EBADF` if the file descriptor is invalid, or to `EMFILE` if no more file descriptors are available. When passed an invalid file descriptor, the function also invokes the invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_dup`** and **`_dup2`** functions associate a second file descriptor with a currently open file. These functions can be used to associate a predefined file descriptor, such as that for **`stdout`**, with a different file. Operations on the file can be carried out using either file descriptor. The type of access allowed for the file is unaffected by the creation of a new descriptor. **`_dup`** returns the next available file descriptor for the given file. **`_dup2`** forces _`fd2`_ to refer to the same file as _`fd1`_. If _`fd2`_ is associated with an open file at the time of the call, that file is closed.

Both **`_dup`** and **`_dup2`** accept file descriptors as parameters. To pass a stream (`FILE *`) to either of these functions, use [`_fileno`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno?view=msvc-170). The **`fileno`** routine returns the file descriptor currently associated with the given stream. The following example shows how to associate **`stderr`** (defined as `FILE *` in `stdio.h`) with a file descriptor:

```
int cstderr = _dup( _fileno( stderr ));
```

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_dup`**

`<io.h>`

**`_dup2`**

`<io.h>`

The console isn't supported in Universal Windows Platform (UWP) apps. The standard stream handles that are associated with the console, **`stdin`**, **`stdout`**, and **`stderr`**, must be redirected before C run-time functions can use them in UWP apps. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_dup.c
// This program uses the variable old to save
// the original stdout. It then opens a new file named
// DataFile and forces stdout to refer to it. Finally, it
// restores stdout to its original state.

#include <io.h>
#include <stdlib.h>
#include <stdio.h>

int main( void )
{
   int old;
   FILE *DataFile;

   old = _dup( 1 );   // "old" now refers to "stdout"
                      // Note:  file descriptor 1 == "stdout"
   if( old == -1 )
   {
      perror( "_dup( 1 ) failure" );
      exit( 1 );
   }
   _write( old, "This goes to stdout first\n", 26 );
   if( fopen_s( &DataFile, "data", "w" ) != 0 )
   {
      puts( "Can't open file 'data'\n" );
      exit( 1 );
   }

   // stdout now refers to file "data"
   if( -1 == _dup2( _fileno( DataFile ), 1 ) )
   {
      perror( "Can't _dup2 stdout" );
      exit( 1 );
   }
   puts( "This goes to file 'data'\n" );

   // Flush stdout stream buffer so it goes to correct file
   fflush( stdout );
   fclose( DataFile );

   // Restore original stdout
   _dup2( old, 1 );
   puts( "This goes to stdout\n" );
   puts( "The file 'data' contains:" );
   _flushall();
   system( "type data" );
}
```

```
This goes to stdout first
This goes to stdout

The file 'data' contains:
This goes to file 'data'
```

## See also

[Low-level I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/low-level-i-o?view=msvc-170)  
[`_close`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/close?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)
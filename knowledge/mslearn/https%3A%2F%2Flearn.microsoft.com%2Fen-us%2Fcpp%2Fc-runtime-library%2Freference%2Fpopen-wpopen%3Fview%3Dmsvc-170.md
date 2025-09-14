---
title: "_popen, _wpopen"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/popen-wpopen?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a pipe and executes a command.

## Syntax

```
FILE *_popen(
    const char *command,
    const char *mode
);
FILE *_wpopen(
    const wchar_t *command,
    const wchar_t *mode
);
```

### Parameters

_`command`_  
Command to be executed.

_`mode`_  
Mode of the returned stream.

## Return value

Returns a stream associated with one end of the created pipe. The other end of the pipe is associated with the spawned command's standard input or standard output. The functions return `NULL` on an error. If the error is caused by an invalid parameter, `errno` is set to `EINVAL`. See the Remarks section for valid modes.

For information about these and other error codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The **`_popen`** function creates a pipe. It then asynchronously executes a spawned copy of the command processor, and uses _`command`_ as the command line. The character string _`mode`_ specifies the type of access requested, as follows.

Access mode

Description

**"`r`"**

The calling process can read the spawned command's standard output using the returned stream.

**"`w`"**

The calling process can write to the spawned command's standard input using the returned stream.

**"`b`"**

Open in binary mode.

**"`t`"**

Open in text mode.

Note

If used in a Windows program, the **`_popen`** function returns an invalid file pointer that causes the program to stop responding indefinitely. **`_popen`** works properly in a console application. To create a Windows application that redirects input and output, see [Creating a child process with redirected input and output](https://learn.microsoft.com/en-us/windows/win32/ProcThread/creating-a-child-process-with-redirected-input-and-output) in the Windows SDK.

**`_wpopen`** is a wide-character version of **`_popen`**; the _`path`_ argument to **`_wpopen`** is a wide-character string. **`_wpopen`** and **`_popen`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`Tchar.h` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tpopen`

**`_popen`**

**`_popen`**

**`_wpopen`**

## Requirements

Routine

Required header

**`_popen`**

`<stdio.h>`

**`_wpopen`**

`<stdio.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## Example

```
// popen.c
/* This program uses _popen and _pclose to receive a
* stream of text from a system process.
*/

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char psBuffer[128];
    FILE* pPipe;

    /* Run DIR so that it writes its output to a pipe. Open this
     * pipe with read text attribute so that we can read it
     * like a text file.
     */

    if ((pPipe = _popen("dir *.c /on /p", "rt")) == NULL)
    {
        exit(1);
    }

    /* Read pipe until end of file, or an error occurs. */

    while (fgets(psBuffer, 128, pPipe))
    {
        puts(psBuffer);
    }

    int endOfFileVal = feof(pPipe);
    int closeReturnVal = _pclose(pPipe);

    if (endOfFileVal)
    {
        printf("\nProcess returned %d\n", closeReturnVal);
    }
    else
    {
        printf("Error: Failed to read the pipe to the end.\n");
    }
}
```

This output assumes there's only one file in the current directory that has a `.c` file name extension.

```
Volume in drive C is CDRIVE
Volume Serial Number is 0E17-1702

Directory of D:\proj\console\test1

07/17/98  07:26p                   780 popen.c
               1 File(s)            780 bytes
                             86,597,632 bytes free

Process returned 0
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_pclose`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pclose?view=msvc-170)  
[`_pipe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pipe?view=msvc-170)
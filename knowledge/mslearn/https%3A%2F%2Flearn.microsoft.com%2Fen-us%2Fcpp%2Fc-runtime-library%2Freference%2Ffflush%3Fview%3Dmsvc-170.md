---
title: "fflush"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Flushes a stream.

## Syntax

```
int fflush(
   FILE *stream
);
```

### Parameters

_`stream`_  
Pointer to `FILE` structure.

## Return value

**`fflush`** returns 0 if the buffer was successfully flushed. The value 0 is also returned in cases in which the specified stream has no buffer or is open for reading only. A return value of `EOF` indicates an error.

Note

If **`fflush`** returns `EOF`, data may have been lost due to a write failure. When setting up a critical error handler, it is safest to turn buffering off with the **`setvbuf`** function or to use low-level I/O routines such as **`_open`**, **`_close`**, and **`_write`** instead of the stream I/O functions.

The **`fflush`** function flushes the stream _`stream`_. If the stream was opened in write mode, or it was opened in update mode and the last operation was a write, **`fflush`** writes the contents of the stream buffer to the underlying file or device, and the buffer is discarded. If the stream was opened in read mode, or if the stream has no buffer, the call to **`fflush`** has no effect, and any buffer is retained. A call to **`fflush`** negates the effect of any prior call to **`ungetc`** for the stream. The stream remains open after the call.

If _`stream`_ is `NULL`, the behavior is the same as a call to **`fflush`** on each open stream. All streams opened in write mode and all streams opened in update mode where the last operation was a write are flushed. The call has no effect on other streams.

Buffers are normally maintained by the operating system, which determines the optimal time to write the data automatically to disk: when a buffer is full, when a stream is closed, or when a program terminates normally without closing the stream. The commit-to-disk feature of the run-time library lets you ensure that critical data is written directly to disk rather than to the operating-system buffers. Without rewriting an existing program, you can enable this feature by linking the program's object files with `COMMODE.OBJ`. In the resulting executable file, calls to **`_flushall`** write the contents of all buffers to disk. Only **`_flushall`** and **`fflush`** are affected by `COMMODE.OBJ`.

For information about controlling the commit-to-disk feature, see [Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170), [`fopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170), and [`_fdopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fdopen-wfdopen?view=msvc-170).

This function locks the calling thread and is therefore thread-safe. For a non-locking version, see **`_fflush_nolock`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Function

Required header

**`fflush`**

`<stdio.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fflush.c
// Compile with: cl /W4 crt_fflush.c
// This sample gets a number from the user, then writes it to a file.
// It ensures the write isn't lost on crash by calling fflush.
#include <stdio.h>

int * crash_the_program = 0;

int main(void)
{
    FILE * my_file;
    errno_t err = fopen_s(&my_file, "myfile.txt", "w");
    if (my_file && !err)
    {
        printf("Write a number: ");

        int my_number = 0;
        scanf_s("%d", &my_number);

        fprintf(my_file, "User selected %d\n", my_number);

        // Write data to a file immediately instead of buffering.
        fflush(my_file);

        if (my_number == 5)
        {
            // Without using fflush, no data was written to the file
            // prior to the crash, so the data is lost.
            *crash_the_program = 5;
        }

        // Normally, fflush is not needed as closing the file will write the buffer.
        // Note that files are automatically closed and flushed during normal termination.
        fclose(my_file);
    }
    return 0;
}
```

```
5
```

```
User selected 5
```

## See also

[Stream I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/stream-i-o?view=msvc-170)  
[`fclose`, `_fcloseall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fclose-fcloseall?view=msvc-170)  
[`_flushall`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/flushall?view=msvc-170)  
[`setvbuf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setvbuf?view=msvc-170)
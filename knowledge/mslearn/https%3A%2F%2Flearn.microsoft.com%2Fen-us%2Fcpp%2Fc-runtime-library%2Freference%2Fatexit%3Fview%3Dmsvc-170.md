---
title: "atexit"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Processes the specified function at exit.

## Syntax

```
int atexit(
   void (__cdecl *func )( void )
);
```

### Parameters

_`func`_  
Function to be called.

## Return value

**`atexit`** returns 0 if successful, or a nonzero value if an error occurs.

The **`atexit`** function is passed the address of a function _`func`_ to be called when the program terminates normally. Successive calls to **`atexit`** create a register of functions that are executed in last-in, first-out (LIFO) order. The functions passed to **`atexit`** can't take parameters. **`atexit`** and **`_onexit`** use the heap to hold the register of functions. Thus, the number of functions that can be registered is limited only by heap memory.

The code in the **`atexit`** function shouldn't contain any dependency on any DLL that could have already been unloaded when the **`atexit`** function is called.

To generate an ANSI-conformant application, use the ANSI-standard **`atexit`** function (rather than the similar **`_onexit`** function).

## Requirements

Routine

Required header

**`atexit`**

`<stdlib.h>`

## Example

This program pushes four functions onto the stack of functions to be executed when **`atexit`** is called. When the program exits, these programs are executed on a last in, first out basis.

```
// crt_atexit.c
#include <stdlib.h>
#include <stdio.h>

void fn1( void ), fn2( void ), fn3( void ), fn4( void );

int main( void )
{
   atexit( fn1 );
   atexit( fn2 );
   atexit( fn3 );
   atexit( fn4 );
   printf( "This is executed first.\n" );
}

void fn1()
{
   printf( "next.\n" );
}

void fn2()
{
   printf( "executed " );
}

void fn3()
{
   printf( "is " );
}

void fn4()
{
   printf( "This " );
}
```

```
This is executed first.
This is executed next.
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170)
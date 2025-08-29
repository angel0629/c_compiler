---
title: "_onexit, _onexit_m"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Registers a routine to be called at exit time.

## Syntax

```
_onexit_t _onexit(
   _onexit_t function
);
_onexit_t_m _onexit_m(
   _onexit_t_m function
);
```

### Parameters

_`function`_  
Pointer to a function to be called at exit.

## Return value

**`_onexit`** returns a pointer to the function if successful or `NULL` if there's no space to store the function pointer.

The **`_onexit`** function is passed the address of a function (_`function`_) to be called when the program terminates normally. Successive calls to **`_onexit`** create a register of functions that are executed in LIFO (last-in-first-out) order. The functions passed to **`_onexit`** can't take parameters.

In the case when **`_onexit`** is called from within a DLL, routines registered with **`_onexit`** run when the DLL is unloaded, after `DllMain` is called with `DLL_PROCESS_DETACH`.

**`_onexit`** is a Microsoft extension. For ANSI portability, use [`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170). The **`_onexit_m`** version of the function is for mixed mode use.

## Requirements

Routine

Required header

**`_onexit`**

<stdlib.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_onexit.c

#include <stdlib.h>
#include <stdio.h>

/* Prototypes */
int fn1(void), fn2(void), fn3(void), fn4 (void);

int main( void )
{
   _onexit( fn1 );
   _onexit( fn2 );
   _onexit( fn3 );
   _onexit( fn4 );
   printf( "This is executed first.\n" );
}

int fn1()
{
   printf( "next.\n" );
   return 0;
}

int fn2()
{
   printf( "executed " );
   return 0;
}

int fn3()
{
   printf( "is " );
   return 0;
}

int fn4()
{
   printf( "This " );
   return 0;
}
```

### Output

```
This is executed first.
This is executed next.
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`atexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atexit?view=msvc-170)  
[`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)  
[`__dllonexit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/dllonexit?view=msvc-170)
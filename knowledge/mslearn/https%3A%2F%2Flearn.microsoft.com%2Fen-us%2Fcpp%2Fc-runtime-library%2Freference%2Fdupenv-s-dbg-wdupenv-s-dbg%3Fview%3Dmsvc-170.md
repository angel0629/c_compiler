---
title: "_dupenv_s_dbg, _wdupenv_s_dbg"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dupenv-s-dbg-wdupenv-s-dbg?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Get a value from the current environment. Versions of [`_dupenv_s`, `_wdupenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dupenv-s-wdupenv-s?view=msvc-170) that allocate memory with [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170) to provide more debugging information.

## Syntax

```
errno_t _dupenv_s_dbg(
   char **buffer,
   size_t *numberOfElements,
   const char *varname,
   int blockType,
   const char *filename,
   int lineNumber
);
errno_t _wdupenv_s_dbg(
   wchar_t **buffer,
   size_t * numberOfElements,
   const wchar_t *varname,
   int blockType,
   const char *filename,
   int lineNumber
);
```

### Parameters

_`buffer`_  
Buffer to store the variable's value.

_`numberOfElements`_  
Size of _`buffer`_.

_`varname`_  
Environment variable name.

_`blockType`_  
Requested type of the memory block: `_CLIENT_BLOCK` or `_NORMAL_BLOCK`.

_`filename`_  
Pointer to the name of the source file or `NULL`.

_`lineNumber`_  
Line number in source file or `NULL`.

## Return value

Zero on success, an error code on failure.

These functions validate their parameters; if _`buffer`_ or _`varname`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions set `errno` to `EINVAL`, and return `EINVAL`.

If these functions can't allocate enough memory, they set _`buffer`_ to `NULL` and _`numberOfElements`_ to 0, and return `ENOMEM`.

The **`_dupenv_s_dbg`** and **`_wdupenv_s_dbg`** functions are identical to `_dupenv_s` and `_wdupenv_s` except that, when `_DEBUG` is defined, these functions use the debug version of [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170), [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170), to allocate memory for the value of the environment variable. For information on the debugging features of `_malloc_dbg`, see [`_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc-dbg?view=msvc-170).

You don't need to call these functions explicitly in most cases. Instead, you can define the flag `_CRTDBG_MAP_ALLOC`. When `_CRTDBG_MAP_ALLOC` is defined, calls to `_dupenv_s` and `_wdupenv_s` are remapped to **`_dupenv_s_dbg`** and **`_wdupenv_s_dbg`**, respectively, with the _`blockType`_ set to `_NORMAL_BLOCK`. Thus, you don't need to call these functions explicitly unless you want to mark the heap blocks as `_CLIENT_BLOCK`. For more information on block types, see [Types of blocks on the debug heap](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debug-heap-details?view=msvc-170#types-of-blocks-on-the-debug-heap).

### Generic-text routine mappings

TCHAR.H routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tdupenv_s_dbg`

**`_dupenv_s_dbg`**

**`_dupenv_s_dbg`**

**`_wdupenv_s_dbg`**

## Requirements

Routine

Required header

**`_dupenv_s_dbg`**

<crtdbg.h>

**`_wdupenv_s_dbg`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_dupenv_s_dbg.c
#include <stdlib.h>
#include <crtdbg.h>

int main( void )
{
   char *pValue;
   size_t len;
   errno_t err = _dupenv_s_dbg( &pValue, &len, "pathext",
      _NORMAL_BLOCK, __FILE__, __LINE__ );
   if ( err ) return -1;
   printf( "pathext = %s\n", pValue );
   free( pValue );
   err = _dupenv_s_dbg( &pValue, &len, "nonexistentvariable",
      _NORMAL_BLOCK, __FILE__, __LINE__ );
   if ( err ) return -1;
   printf( "nonexistentvariable = %s\n", pValue );
   free( pValue ); // It's OK to call free with NULL
}
```

```
pathext = .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.pl
nonexistentvariable = (null)
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[Environmental constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environmental-constants?view=msvc-170)  
[`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170)  
[`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170)
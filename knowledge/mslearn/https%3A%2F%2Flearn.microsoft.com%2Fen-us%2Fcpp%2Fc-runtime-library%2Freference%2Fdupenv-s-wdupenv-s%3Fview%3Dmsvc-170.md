---
title: "_dupenv_s, _wdupenv_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dupenv-s-wdupenv-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a value from the current environment.

## Syntax

```
errno_t _dupenv_s(
   char **buffer,
   size_t *numberOfElements,
   const char *varname
);
errno_t _wdupenv_s(
   wchar_t **buffer,
   size_t *numberOfElements,
   const wchar_t *varname
);
```

### Parameters

_`buffer`_  
Buffer to store the variable's value.

_`numberOfElements`_  
Size of _`buffer`_.

_`varname`_  
Environment variable name.

## Return value

Zero on success, an error code on failure.

These functions validate their parameters; if _`buffer`_ or _`varname`_ is `NULL`, the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the functions set `errno` to `EINVAL` and return `EINVAL`.

If these functions can't allocate enough memory, they set _`buffer`_ to `NULL` and _`numberOfElements`_ to 0, and return `ENOMEM`.

The **`_dupenv_s`** function searches the list of environment variables for _`varname`_. If the variable is found, **`_dupenv_s`** allocates a buffer and copies the variable's value into the buffer. The buffer's address and length are returned in _`buffer`_ and _`numberOfElements`_. Because it allocates the buffer itself, **`_dupenv_s`** provides a more convenient alternative to [`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170).

Note

It's the calling program's responsibility to free the memory by calling [`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170).

If the variable isn't found, then _`buffer`_ is set to `NULL`, _`numberOfElements`_ is set to 0, and the return value is 0 because this situation isn't considered to be an error condition.

If you aren't interested in the size of the buffer, you can pass `NULL` for _`numberOfElements`_.

**`_dupenv_s`** isn't case sensitive in the Windows operating system. **`_dupenv_s`** uses the copy of the environment pointed to by the global variable **`_environ`** to access the environment. See the Remarks in [`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170) for a discussion of **`_environ`**.

The value in _`buffer`_ is a copy of the environment variable's value; modifying it has no effect on the environment. Use the [`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170) function to modify the value of an environment variable.

**`_wdupenv_s`** is a wide-character version of **`_dupenv_s`**; the arguments of **`_wdupenv_s`** are wide-character strings. The **`_wenviron`** global variable is a wide-character version of **`_environ`**. See the Remarks in [`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170) for more on **`_wenviron`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

**`_tdupenv_s`**

**`_dupenv_s`**

**`_dupenv_s`**

**`_wdupenv_s`**

## Requirements

Routine

Required header

**`_dupenv_s`**

`<stdlib.h>`

**`_wdupenv_s`**

`<stdlib.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_dupenv_s.c
#include <stdlib.h>

int main( void )
{
   char *pValue;
   size_t len;
   errno_t err = _dupenv_s( &pValue, &len, "pathext" );
   if ( err ) return -1;
   printf( "pathext = %s\n", pValue );
   free( pValue );
   err = _dupenv_s( &pValue, &len, "nonexistentvariable" );
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
[`_dupenv_s_dbg`, `_wdupenv_s_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/dupenv-s-dbg-wdupenv-s-dbg?view=msvc-170)  
[`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170)  
[`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170)
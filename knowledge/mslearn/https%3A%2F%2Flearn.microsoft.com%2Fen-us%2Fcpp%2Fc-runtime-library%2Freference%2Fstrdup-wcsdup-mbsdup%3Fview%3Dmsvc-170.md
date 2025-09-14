---
title: "_strdup, _wcsdup, _mbsdup"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-wcsdup-mbsdup?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Duplicates strings.

## Syntax

```
char *_strdup(
   const char *strSource
);
wchar_t *_wcsdup(
   const wchar_t *strSource
);
unsigned char *_mbsdup(
   const unsigned char *strSource
);
```

### Parameters

_`strSource`_  
Null-terminated source string.

## Return value

Each of these functions returns a pointer to the storage location for the copied string or `NULL` if storage can't be allocated.

The **`_strdup`** function calls [`malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloc?view=msvc-170) to allocate storage space for a copy of _`strSource`_ and then copies _`strSource`_ to the allocated space.

**`_wcsdup`** and **`_mbsdup`** are wide-character and multibyte-character versions of **`_strdup`**. The arguments and return value of **`_wcsdup`** are wide-character strings. The arguments and return value of **`_mbsdup`** are multibyte-character strings. These three functions behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tcsdup`

**`_strdup`**

**`_mbsdup`**

**`_wcsdup`**

Because **`_strdup`** calls **`malloc`** to allocate storage space for the copy of _`strSource`_, it's good practice always to release this memory by calling the [`free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free?view=msvc-170) routine on the pointer that's returned by the call to **`_strdup`**.

If `_DEBUG` and `_CRTDBG_MAP_ALLOC` are defined, **`_strdup`** and **`_wcsdup`** are replaced by calls to **`_strdup_dbg`** and **`_wcsdup_dbg`**, to allow for debugging memory allocations. For more information, see [`_strdup_dbg`, `_wcsdup_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-dbg-wcsdup-dbg?view=msvc-170).

## Requirements

Routine

Required header

**`_strdup`**

`<string.h>`

**`_wcsdup`**

`<string.h>` or `<wchar.h>`

**`_mbsdup`**

`<mbstring.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_strdup.c

#include <string.h>
#include <stdio.h>

int main( void )
{
   char buffer[] = "This is the buffer text";
   char *newstring;
   printf( "Original: %s\n", buffer );
   newstring = _strdup( buffer );
   printf( "Copy:     %s\n", newstring );
   free( newstring );
}
```

```
Original: This is the buffer text
Copy:     This is the buffer text
```

## See also

[String manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170)  
[`memset`, `wmemset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memset-wmemset?view=msvc-170)  
[`strcat`, `wcscat`, `_mbscat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170)  
[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)  
[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)  
[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)  
[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)  
[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)  
[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)  
[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)
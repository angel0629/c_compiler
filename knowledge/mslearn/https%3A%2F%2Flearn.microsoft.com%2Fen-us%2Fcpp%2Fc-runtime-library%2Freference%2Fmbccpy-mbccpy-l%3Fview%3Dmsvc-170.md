---
title: "_mbccpy, _mbccpy_l"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-mbccpy-l?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Copies a multibyte character from one string to another string. More secure versions of these functions are available; see [`_mbccpy_s`, `_mbccpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-s-mbccpy-s-l?view=msvc-170).

## Syntax

```
void _mbccpy(
   unsigned char *dest,
   const unsigned char *src
);
void _mbccpy_l(
   unsigned char *dest,
   const unsigned char *src,
   _locale_t locale
);
```

### Parameters

_`dest`_  
Copy destination.

_`src`_  
Multibyte character to copy.

_`locale`_  
Locale to use.

The **`_mbccpy`** function copies one multibyte character from _`src`_ to _`dest`_.

This function validates its parameters. If **`_mbccpy`** is passed a null pointer for _`dest`_ or _`src`_, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL`.

**`_mbccpy`** uses the current locale for any locale-dependent behavior. **`_mbccpy_l`** is identical to **`_mbccpy`** except that **`_mbccpy_l`** uses the locale passed in for any locale-dependent behavior. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

**Security Note** Use a null-terminated string. The null-terminated string must not exceed the size of the destination buffer. For more information, see [Avoiding buffer overruns](https://learn.microsoft.com/en-us/windows/win32/SecBP/avoiding-buffer-overruns). Buffer overrun problems are a frequent method of system attack, resulting in an unwarranted elevation of privilege.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

Tchar.h routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tccpy`

Maps to macro or inline function

**`_mbccpy`**

Maps to macro or inline function

`_tccpy_l`

n/a

**`_mbccpy_l`**

n/a

## Requirements

Routine

Required header

**`_mbccpy`**

<mbctype.h>

**`_mbccpy_l`**

<mbctype.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)
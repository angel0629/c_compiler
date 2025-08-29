---
title: "_free_locale"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-locale?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Frees a locale object.

## Syntax

```
void _free_locale(
   _locale_t locale
);
```

### Parameters

_`locale`_  
Locale object to free.

## Remarks

The **`_free_locale`** function is used to free the locale object obtained from a call to `_get_current_locale` or `_create_locale`.

The previous name of this function, **`__free_locale`** (with two leading underscores) has been deprecated.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

`Routine`

Required header

**`_free_locale`**

<locale.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`_get_current_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-current-locale?view=msvc-170)  
[`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170)
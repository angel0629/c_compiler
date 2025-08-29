---
title: "_get_current_locale"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-current-locale?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets a locale object representing the current locale.

## Syntax

```
_locale_t _get_current_locale(void);
```

## Return value

A locale object representing the current locale.

## Remarks

The **`_get_current_locale`** function gets the currently set locale for the thread and returns a locale object representing that locale.

The previous name of this function, **`__get_current_locale`** (with two leading underscores) has been deprecated.

## Requirements

Routine

Required header

**`_get_current_locale`**

<locale.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170)  
[`_free_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-locale?view=msvc-170)
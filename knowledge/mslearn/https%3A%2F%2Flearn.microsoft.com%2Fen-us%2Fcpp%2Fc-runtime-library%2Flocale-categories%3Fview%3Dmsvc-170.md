---
title: "Locale Categories"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-categories?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <locale.h>
```

## Remarks

Locale categories are manifest constants used by the localization routines to specify which portion of a program's locale information will be used. The locale refers to the locality (or Country/Region) for which certain aspects of your program can be customized. Locale-dependent areas include, for example, the formatting of dates or the display format for monetary values.

Locale category

Parts of program affected

`LC_ALL`

All locale-specific behavior (all categories)

`LC_COLLATE`

Behavior of `strcoll` and `strxfrm` functions

`LC_CTYPE`

Behavior of character-handling functions (except `isdigit`, `isxdigit`, `mbstowcs`, and `mbtowc`, which are unaffected)

`LC_MAX`

Same as `LC_TIME`

`LC_MIN`

Same as `LC_ALL`

`LC_MONETARY`

Monetary formatting information returned by the `localeconv` function

`LC_NUMERIC`

Decimal-point character for formatted output routines (for example, `printf`), data conversion routines, and nonmonetary formatting information returned by `localeconv` function

`LC_TIME`

Behavior of `strftime` function

See [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) for an example.

## See also

[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strftime`, `wcsftime`, `_strftime_l`, `_wcsftime_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170)  
[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)
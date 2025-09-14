---
title: "_create_locale, _wcreate_locale"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a locale object.

## Syntax

```
_locale_t _create_locale(
   int category,
   const char *locale
);
_locale_t _wcreate_locale(
   int category,
   const wchar_t *locale
);
```

### Parameters

_`category`_  
Category.

_`locale`_  
Locale specifier.

## Return value

If a valid _`locale`_ and _`category`_ are given, the functions return the specified locale settings as a `_locale_t` object. The current locale settings of the program aren't changed.

The **`_create_locale`** function allows you to create an object that represents certain region-specific settings, for use in locale-specific versions of many CRT functions (functions with the `_l` suffix). The behavior is similar to `setlocale`, except that instead of applying the specified locale settings to the current environment, the settings are saved in a `_locale_t` structure that is returned. The `_locale_t` structure should be freed using [`_free_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-locale?view=msvc-170) when it's no longer needed.

**`_wcreate_locale`** is a wide-character version of **`_create_locale`**; the _`locale`_ argument to **`_wcreate_locale`** is a wide-character string. **`_wcreate_locale`** and **`_create_locale`** behave identically otherwise.

The _`category`_ argument specifies the parts of the locale-specific behavior that are affected. The flags used for _`category`_ and the parts of the program they affect are as shown in this table:

_`category`_ flag

Affects

`LC_ALL`

All categories, as listed below.

`LC_COLLATE`

The `strcoll`, `_stricoll`, `wcscoll`, `_wcsicoll`, `strxfrm`, `_strncoll`, `_strnicoll`, `_wcsncoll`, `_wcsnicoll`, and `wcsxfrm` functions.

`LC_CTYPE`

The character-handling functions (except `isdigit`, `isxdigit`, `mbstowcs`, and `mbtowc`, which are unaffected).

`LC_MONETARY`

Monetary-formatting information returned by the `localeconv` function.

`LC_NUMERIC`

Decimal-point character for the formatted output routines (such as `printf`), for the data-conversion routines, and for the non-monetary formatting information returned by `localeconv`. In addition to the decimal-point character, `LC_NUMERIC` sets the thousands separator and the grouping control string returned by [`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170).

`LC_TIME`

The `strftime` and `wcsftime` functions.

This function validates the _`category`_ and _`locale`_ parameters. If the category parameter isn't one of the values given in the previous table or if _`locale`_ is `NULL`, the function returns `NULL`.

The _`locale`_ argument is a pointer to a string that specifies the locale. For information about the format of the _`locale`_ argument, see [Locale names, Languages, and Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170).

The _`locale`_ argument can take several kinds of values: a locale name, a language string, a language string and country/region code, a code page, or a combination of language string, country/region code, and code page. The set (of available locale names, languages, country/region codes, and code pages) includes all that are supported by the Windows NLS API. The set of locale names **`_create_locale`** supports is described in [Locale names, Languages, and Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170). The set of language and country/region strings supported by **`_create_locale`** are listed in [Language strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/language-strings?view=msvc-170) and [Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/country-region-strings?view=msvc-170).

For more information about locale settings, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170).

The previous name of this function, **`__create_locale`** (with two leading underscores), has been deprecated.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_create_locale`**

<locale.h>

**`_wcreate_locale`**

<locale.h> or <wchar.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_create_locale.c
// Sets the current locale to "de-CH" using the
// setlocale function and demonstrates its effect on the strftime
// function.

#include <stdio.h>
#include <locale.h>
#include <time.h>

int main(void)
{
    time_t ltime;
    struct tm thetime;
    unsigned char str[100];
    _locale_t locale;

    // Create a locale object representing the German (Switzerland) locale
    locale = _create_locale(LC_ALL, "de-CH");
    time (&ltime);
    _gmtime64_s(&thetime, &ltime);

    // %#x is the long date representation, appropriate to
    // the current locale
    if (!_strftime_l((char *)str, 100, "%#x",
                     (const struct tm *)&thetime, locale))
    {
        printf("_strftime_l failed!\n");
    }
    else
    {
        printf("In de-CH locale, _strftime_l returns '%s'\n", str);
    }

    _free_locale(locale);

    // Create a locale object representing the default C locale
    locale = _create_locale(LC_ALL, "C");
    time(&ltime);
    _gmtime64_s(&thetime, &ltime);

    if (!_strftime_l((char *)str, 100, "%#x",
                     (const struct tm *)&thetime, locale))
    {
        printf("_strftime_l failed!\n");
    }
    else
    {
        printf("In 'C' locale, _strftime_l returns '%s'\n", str);
    }

    _free_locale(locale);
}
```

```
In de-CH locale, _strftime_l returns 'Samstag, 9. Februar 2002'
In 'C' locale, _strftime_l returns 'Saturday, February 09, 2002'
```

## See also

[Locale names, Languages, and Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170)  
[Language strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/language-strings?view=msvc-170)  
[Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/country-region-strings?view=msvc-170)  
[`_free_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/free-locale?view=msvc-170)  
[`_configthreadlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/configthreadlocale?view=msvc-170)  
[`setlocale`](https://learn.microsoft.com/en-us/cpp/preprocessor/setlocale?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`strlen`, `wcslen`, `_mbslen`, `_mbslen_l`, `_mbstrlen`, `_mbstrlen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlen-wcslen-mbslen-mbslen-l-mbstrlen-mbstrlen-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strftime`, `wcsftime`, `_strftime_l`, `_wcsftime_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170)  
[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)  
[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)  
[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)
---
title: "Locale Names, Languages, and Country-Region Strings"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
You can set the _`locale`_ argument to the [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170), [`_create_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170), and [`_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170) functions in several ways. The locale can be set by using the locale names, languages, country/region codes, and code pages that are supported by the Windows NLS API. The _`locale`_ argument takes one of the following forms:

> _`locale`_ :: "_locale-name_"  
>  | "_language_\[\__country-region_\[._code-page_\]\]"  
>  | "._code-page_"  
>  | "C"  
>  | ""  
>  | NULL

The _locale-name_ form is a short, IETF-standardized string; for example, `en-US` for English (United States) or `bs-Cyrl-BA` for Bosnian (Cyrillic, Bosnia and Herzegovina). These forms are preferred. For a list of supported locale names by Windows operating system version, see the **Language tag** column of the table in [Appendix A: Product Behavior](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c) in \[MS-LCID\]: Windows Language Code Identifier (LCID) Reference. This resource lists the supported language, script, and region parts of the locale names. For information about the supported locale names that have non-default sort orders, see the **Locale name** column in [Sort order identifiers](https://learn.microsoft.com/en-us/windows/win32/Intl/sort-order-identifiers). Under Windows 10 or later, locale names that correspond to valid [BCP-47](https://tools.ietf.org/html/bcp47) language tags are allowed. For example, `jp-US` is a valid BCP-47 tag, but it's effectively only `US` for locale functionality.

The _language_\[**\_**_country-region_\[**.**_code-page_\]\] form is stored in the locale setting for a category when a language string, or language string and country or region string, is used to create the locale. The set of supported language strings is described in [Language strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/language-strings?view=msvc-170), and the list of supported country and region strings is listed in [Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/country-region-strings?view=msvc-170). If the specified language isn't associated with the specified country or region, the default language for the specified country or region is stored in the locale setting. We don't recommend this form for locale strings embedded in code or serialized to storage: These strings are more likely to be changed by an operating system update than the locale name form.

The _code-page_ is the ANSI/OEM code page that's associated with the locale. The code page is determined for you when you specify a locale by language or by language and country/region alone. The special value `.ACP` specifies the ANSI code page for the country/region. The special value `.OCP` specifies the OEM code page for the country/region. For example, if you specify `"Greek_Greece.ACP"` as the locale, the locale is stored as `Greek_Greece.1253` (the ANSI code page for Greek), and if you specify `"Greek_Greece.OCP"` as the locale, it's stored as `Greek_Greece.737` (the OEM code page for Greek). For more information about code pages, see [Code pages](https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170). For a list of supported code pages on Windows, see [Code page identifiers](https://learn.microsoft.com/en-us/windows/win32/Intl/code-page-identifiers).

If you use only the code page to specify the locale, the user's default language and country/region as reported by [`GetUserDefaultLocaleName`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getuserdefaultlocalename) are used. For example, if you specify `".1254"` (ANSI Turkish) as the locale for a user that's configured for English (United States), the locale that's stored is `English_United States.1254`. We don't recommend this form, because it could lead to inconsistent behavior.

A _`locale`_ argument value of `C` specifies the minimal ANSI conforming environment for C translation. The `C` locale assumes that every **`char`** data type is 1 byte and its value is always less than 256. If _`locale`_ points to an empty string, the locale is the implementation-defined native environment.

You can specify all of the locale categories at the same time for the `setlocale` and `_wsetlocale` functions by using the `LC_ALL` category. The categories can all be set to the same locale, or you can set each category individually by using a locale argument that has this form:

> _`LC-ALL-specifier`_ :: _`locale`_  
>  | \[**`LC_COLLATE=`**_`locale`_\]\[**`;LC_CTYPE=`**_`locale`_\]\[**`;LC_MONETARY=`**_`locale`_\]\[**`;LC_NUMERIC=`**_`locale`_\]\[**`;LC_TIME=`**_`locale`_\]

You can specify multiple category types, separated by semicolons. Category types that aren't specified use the current locale setting. For example, this code snippet sets the current locale for all categories to `de-DE`, and then sets the categories `LC_MONETARY` to `en-GB` and `LC_TIME` to `es-ES`:

```
_wsetlocale(LC_ALL, L"de-DE");
_wsetlocale(LC_ALL, L"LC_MONETARY=en-GB;LC_TIME=es-ES");
```

## UTF-8 Support

UTF-8 support can be enabled by using the UTF-8 code page in your locale string. For more information, see the [UTF-8 support section of `setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170#utf-8-support).

## See also

[C runtime library reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)  
[`_get_current_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-current-locale?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)  
[`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170)  
[Language strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/language-strings?view=msvc-170)  
[Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/country-region-strings?view=msvc-170)
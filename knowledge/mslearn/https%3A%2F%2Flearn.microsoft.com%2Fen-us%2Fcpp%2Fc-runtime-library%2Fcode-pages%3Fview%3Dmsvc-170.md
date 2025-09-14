---
title: "Code Pages"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/code-pages?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
A _code page_ is a character set, which can include numbers, punctuation marks, and other glyphs. Different languages and locales may use different code pages. For example, ANSI code page 1252 is used for English and most European languages; OEM code page 932 is used for Japanese Kanji.

A code page can be represented in a table as a mapping of characters to single-byte or multibyte values. Many code pages share the ASCII character set for characters in the range 0x00 - 0x7F.

The Microsoft runtime library uses the following types of code pages:

*   System-default ANSI code page. By default, at startup, the runtime system automatically sets the multibyte code page to the system-default ANSI code page, which is obtained from the operating system. The call:
    
    ```
    setlocale ( LC_ALL, "" );
    ```
    
    also sets the locale to the system-default ANSI code page.
    
*   Locale code page. The behavior of several run-time routines is dependent on the current locale setting, which includes the locale code page. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170). By default, all locale-dependent routines in the Microsoft run-time library use the code page that corresponds to the "C" locale. At run time, you can change or query the locale code page in use with a call to [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170).
    
*   Multibyte code page. The behavior of most of the multibyte-character routines in the run-time library depends on the current multibyte code page setting. By default, these routines use the system-default ANSI code page. At run-time you can query and change the multibyte code page with [`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170) and [`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170), respectively.
    
*   The "C" locale is defined by ANSI to correspond to the locale in which C programs have traditionally executed. The code page for the "C" locale ("C" code page) corresponds to the ASCII character set. For example, in the "C" locale, `islower` returns true for the values 0x61 - 0x7A only. In another locale, `islower` may return `true` for these and other values, as defined by that locale.
    

## See also

[Internationalization](https://learn.microsoft.com/en-us/cpp/c-runtime-library/internationalization?view=msvc-170)  
[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
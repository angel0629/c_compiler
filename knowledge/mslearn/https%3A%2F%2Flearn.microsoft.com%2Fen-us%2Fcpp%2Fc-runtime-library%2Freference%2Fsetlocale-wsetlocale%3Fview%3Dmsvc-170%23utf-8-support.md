---
title: "setlocale, _wsetlocale"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170#utf-8-support"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Set or retrieve the run-time locale.

## Syntax

```
char *setlocale(
   int category,
   const char *locale
);

wchar_t *_wsetlocale(
   int category,
   const wchar_t *locale
);
```

### Parameters

_`category`_  
Category affected by locale.

_`locale`_  
Locale specifier.

## Return value

If a valid _`locale`_ and _`category`_ are given, the functions return a pointer to the string associated with the specified _`locale`_ and _`category`_. If the _`locale`_ argument is `NULL`, the functions return the current locale.

If an invalid argument is passed to either function, the return value is `NULL`. The behavior for invalid arguments is as follows:

Function

Invalid parameter

Invalid handler invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170)

Sets `errno`

`setlocale`

_`category`_

yes

yes

`setlocale`

_`locale`_

no

no

`_wsetlocale`

_`category`_

yes

yes

`_wsetlocale`

_`locale`_

no

no

The call:

```
setlocale( LC_ALL, "en-US" );
```

sets all categories, returning only the string

```
en-US
```

You can copy the string returned by **`setlocale`** to restore that part of the program's locale information. Global or thread local storage is used for the string returned by **`setlocale`**. Later calls to **`setlocale`** overwrite the string, which invalidates string pointers returned by earlier calls.

Use the **`setlocale`** function to set, change, or query some or all of the current program locale information specified by _`locale`_ and _`category`_. _`locale`_ refers to the locality (country/region and language) for which you can customize certain aspects of your program. Some locale-dependent categories include the formatting of dates and the display format for monetary values. If you set _`locale`_ to the default string for a language that has multiple forms supported on your computer, you should check the **`setlocale`** return value to see which language is in effect. For example, if you set _`locale`_ to `"chinese"` the return value could be either `"chinese-simplified"` or `"chinese-traditional"`.

**`_wsetlocale`** is a wide-character version of **`setlocale`**; the _`locale`_ argument and return value of **`_wsetlocale`** are wide-character strings. **`_wsetlocale`** and **`setlocale`** behave identically otherwise.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tsetlocale`

**`setlocale`**

**`setlocale`**

**`_wsetlocale`**

The _`category`_ argument specifies the parts of a program's locale information that are affected. The macros used for _`category`_ and the parts of the program they affect are as follows:

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

Decimal-point character for the formatted output routines (such as `printf`), for the data-conversion routines, and for the nonmonetary formatting information returned by `localeconv`. In addition to the decimal-point character, `LC_NUMERIC` sets the thousands separator and the grouping control string returned by [`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170).

`LC_TIME`

The `strftime` and `wcsftime` functions.

This function validates the category parameter. If the category parameter isn't one of the values given in the previous table, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function sets `errno` to `EINVAL` and returns `NULL`.

The _`locale`_ argument is a pointer to a string that specifies the locale. For information about the format of the _`locale`_ argument, see [Locale names, Languages, and Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170). If _`locale`_ points to an empty string, the locale is the implementation-defined native environment. A value of `C` specifies the minimal ANSI conforming environment for C translation. The `C` locale assumes that all `char` data types are 1 byte and that their value is always less than 256.

At program startup, the equivalent of the following statement is executed:

`setlocale( LC_ALL, "C" );`

The _`locale`_ argument can take a locale name, a language string, a language string and country/region code, a code page, or a language string, country/region code, and code page. The available locale names, languages, country/region codes, and code pages include all the ones supported by the Windows NLS API. The set of locale names supported by **`setlocale`** is described in [Locale names, Languages, and Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170). The set of language and country/region strings supported by **`setlocale`** are listed in [Language strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/language-strings?view=msvc-170) and [Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/country-region-strings?view=msvc-170). We recommend the locale name form for performance and for maintainability of locale strings embedded in code or serialized to storage. The locale name strings are less likely to be changed by an operating system update than the language and country/region name form.

A null pointer that's passed as the _`locale`_ argument tells **`setlocale`** to query instead of to set the international environment. If the _`locale`_ argument is a null pointer, the program's current locale setting isn't changed. Instead, **`setlocale`** returns a pointer to the string that's associated with the _`category`_ of the thread's current locale. If the _`category`_ argument is `LC_ALL`, the function returns a string that indicates the current setting of each category, separated by semicolons. For example, the sequence of calls

```
// Set all categories and return "en-US"
setlocale(LC_ALL, "en-US");
// Set only the LC_MONETARY category and return "fr-FR"
setlocale(LC_MONETARY, "fr-FR");
printf("%s\n", setlocale(LC_ALL, NULL));
```

returns

```
LC_COLLATE=en-US;LC_CTYPE=en-US;LC_MONETARY=fr-FR;LC_NUMERIC=en-US;LC_TIME=en-US
```

which is the string that's associated with the `LC_ALL` category.

The following examples pertain to the `LC_ALL` category. Either of the strings ".OCP" and ".ACP" can be used instead of a code page number to specify use of the user-default OEM code page and user-default ANSI code page for that locale name, respectively.

*   `setlocale( LC_ALL, "" );`
    
    Sets the locale to the default, which is the user-default ANSI code page obtained from the operating system. The locale name is set to the value returned by [`GetUserDefaultLocaleName`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getuserdefaultlocalename). The code page is set to the value returned by [`GetACP`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getacp).
    
*   `setlocale( LC_ALL, ".OCP" );`
    
    Sets the locale to the current OEM code page obtained from the operating system. The locale name is set to the value returned by [`GetUserDefaultLocaleName`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getuserdefaultlocalename). The code page is set to the [`LOCALE_IDEFAULTCODEPAGE`](https://learn.microsoft.com/en-us/windows/win32/intl/locale-idefault-constants) value for the user-default locale name by [`GetLocaleInfoEx`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getlocaleinfoex).
    
*   `setlocale( LC_ALL, ".ACP" );`
    
    Sets the locale to the ANSI code page obtained from the operating system. The locale name is set to the value returned by [`GetUserDefaultLocaleName`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getuserdefaultlocalename). The code page is set to the [`LOCALE_IDEFAULTANSICODEPAGE`](https://learn.microsoft.com/en-us/windows/win32/intl/locale-idefault-constants) value for the user-default locale name by [`GetLocaleInfoEx`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getlocaleinfoex).
    
*   `setlocale( LC_ALL, "<localename>" );`
    
    Sets the locale to the locale name that's indicated by _`<localename>`_. The code page is set to the [`LOCALE_IDEFAULTANSICODEPAGE`](https://learn.microsoft.com/en-us/windows/win32/intl/locale-idefault-constants) value for the specified locale name by [`GetLocaleInfoEx`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getlocaleinfoex).
    
*   `setlocale( LC_ALL, "<language>_<country>" );`
    
    Sets the locale to the language and country/region indicated by _`<language>`_ and _`<country>`_, together with the default code page obtained from the host operating system. The code page is set to the [`LOCALE_IDEFAULTANSICODEPAGE`](https://learn.microsoft.com/en-us/windows/win32/intl/locale-idefault-constants) value for the specified locale name by [`GetLocaleInfoEx`](https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getlocaleinfoex).
    
*   `setlocale( LC_ALL, "<language>_<country>.<code_page>" );`
    
    Sets the locale to the language, country/region, and code page indicated by the _`<language>`_, _`<country>`_, and _`<code_page>`_ strings. You can use various combinations of language, country/region, and code page. For example, this call sets the locale to French Canada with code page 1252:
    
    `setlocale( LC_ALL, "French_Canada.1252" );`
    
    This call sets the locale to French Canada with the default ANSI code page:
    
    `setlocale( LC_ALL, "French_Canada.ACP" );`
    
    This call sets the locale to French Canada with the default OEM code page:
    
    `setlocale( LC_ALL, "French_Canada.OCP" );`
    
*   `setlocale( LC_ALL, "<language>" );`
    
    Sets the locale to the language that's indicated by _`<language>`_, and uses the default country/region for the specified language and the user-default ANSI code page for that country/region as obtained from the host operating system. For example, the following calls to **`setlocale`** are functionally equivalent:
    
    `setlocale( LC_ALL, "en-US" );`
    
    `setlocale( LC_ALL, "English" );`
    
    `setlocale( LC_ALL, "English_United States.1252" );`
    
    We recommend the first form for performance and maintainability.
    
*   `setlocale( LC_ALL, ".<code_page>" );`
    
    Sets the code page to the value indicated by _`<code_page>`_, together with the default country/region and language (as defined by the host operating system) for the specified code page.
    

The category must be either `LC_ALL` or `LC_CTYPE` to effect a change of code page. For example, if the default country/region and language of the host operating system are "`United States`" and "`English`", the following two calls to **`setlocale`** are functionally equivalent:

`setlocale( LC_ALL, ".1252" );`

`setlocale( LC_ALL, "English_United States.1252");`

For more information, see the [`setlocale`](https://learn.microsoft.com/en-us/cpp/preprocessor/setlocale?view=msvc-170) pragma directive in the [C/C++ Preprocessor Reference](https://learn.microsoft.com/en-us/cpp/preprocessor/c-cpp-preprocessor-reference?view=msvc-170).

The function [`_configthreadlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/configthreadlocale?view=msvc-170) is used to control whether **`setlocale`** affects the locale of all threads in a program or only the locale of the calling thread.

## UTF-8 support

Starting in Windows 10 version 1803 (10.0.17134.0), the Universal C Runtime supports using a UTF-8 code page. The change means that `char` strings passed to C runtime functions can expect strings in the UTF-8 encoding. To enable UTF-8 mode, use `".UTF8"` as the code page when using **`setlocale`**. For example, `setlocale(LC_ALL, ".UTF8")` uses the current default Windows ANSI code page (ACP) for the locale and UTF-8 for the code page.

The string to specify UTF-8 mode is:

*   case-insensitive
*   the hyphen (`-`) is optional
*   It must be in the code page part of the locale name, so must have a leading period (`.`) as in these examples: `"en_US.UTF8"` or `".utf8"`

The following examples show how to specify the UTF-8 string:

`".UTF8"`  
`".UTF-8"`  
`".utf8"`  
`".utf-8"`  
`"en_us.utf8"`  
`"ja_JP.Utf-8"`

After calling `setlocale(LC_ALL, ".UTF8")`, you may pass "😊" to `mbtowcs` and it will be properly translated to a `wchar_t` string. Previously, there wasn't a locale setting available to do this translation.

UTF-8 mode is also enabled for functions that have historically translated `char` strings using the default Windows ANSI code page (ACP). For example, calling [`_mkdir("😊")`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkdir-wmkdir?view=msvc-170) while using a UTF-8 code page will correctly produce a directory with that emoji as the folder name, instead of requiring the ACP to be changed to UTF-8 before running your program. Likewise, calling [`_getcwd()`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getcwd-wgetcwd?view=msvc-170) in that folder returns a UTF-8 encoded string. For compatibility, the ACP is still used if the C locale code page isn't set to UTF-8.

The following aspects of the C Runtime can't use UTF-8 because they're set during program startup and must use the default Windows ANSI code page (ACP): [`__argv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/argc-argv-wargv?view=msvc-170), [`_acmdln`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/acmdln-tcmdln-wcmdln?view=msvc-170), and [`_pgmptr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pgmptr-wpgmptr?view=msvc-170).

Previous to this support, [`mbrtoc16`, `mbrtoc32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtoc16-mbrtoc323?view=msvc-170), [`c16rtomb`, and `c32rtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/c16rtomb-c32rtomb1?view=msvc-170) existed to translate between UTF-8 narrow strings, UTF-16 (same encoding as `wchar_t` on Windows platforms) and UTF-32. For compatibility reasons, these APIs still only translate to and from UTF-8 and not the code page set via **`setlocale`**.

To use this feature on an OS prior to Windows 10, you must use [app-local deployment](https://learn.microsoft.com/en-us/cpp/windows/universal-crt-deployment?view=msvc-170#local-deployment) or link statically using version 1803 (10.0.17134.0) of the Windows SDK or later. For Windows 10 operating systems prior to 1803 (10.0.17134.0), only static linking is supported.

## Requirements

Routine

Required header

**`setlocale`**

`<locale.h>`

**`_wsetlocale`**

`<locale.h>` or `<wchar.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_setlocale.c
//
// This program demonstrates the use of setlocale when
// using two independent threads.
//

#include <locale.h>
#include <process.h>
#include <windows.h>
#include <stdio.h>
#include <time.h>

#define BUFF_SIZE 100

// Retrieve the date in the current
// locale's format.
int get_date(unsigned char* str)
{
    __time64_t ltime;
    struct tm  thetime;

    // Retrieve the current time
    _time64(&ltime);
    _gmtime64_s(&thetime, &ltime);

    // Format the current time structure into a string
    // "%#x" is the long date representation in the
    // current locale
    if (!strftime((char *)str, BUFF_SIZE, "%#x",
                  (const struct tm *)&thetime))
    {
        printf("strftime failed!\n");
        return -1;
    }
    return 0;
}

// This thread sets its locale to the argument and prints the date.
unsigned __stdcall SecondThreadFunc(void* pArguments)
{
    unsigned char str[BUFF_SIZE];
    char * locale = (char *)pArguments;

    // Set the thread locale
    printf("The thread locale is now set to %s.\n",
           setlocale(LC_ALL, locale));

    // Retrieve the date string from the helper function
    if (get_date(str) == 0)
    {
        printf("The date in %s locale is: '%s'\n", locale, str);
    }

    _endthreadex( 0 );
    return 0;
}

// The main thread sets the locale to English
// and then spawns a second thread (above) and prints the date.
int main()
{
    HANDLE          hThread;
    unsigned        threadID;
    unsigned char   str[BUFF_SIZE];

    // Enable per-thread locale causes all subsequent locale
    // setting changes in this thread to only affect this thread.
    _configthreadlocale(_ENABLE_PER_THREAD_LOCALE);

    // Set the locale of the main thread to US English.
    printf("The thread locale is now set to %s.\n",
           setlocale(LC_ALL, "en-US"));

    // Create the second thread with a German locale.
    // Our thread function takes an argument of the locale to use.
    hThread = (HANDLE)_beginthreadex( NULL, 0, &SecondThreadFunc,
                                      (void*)"de-DE", 0, &threadID );

    if (get_date(str) == 0)
    {
        // Retrieve the date string from the helper function
        printf("The date in en-US locale is: '%s'\n\n", str);
    }

    // Wait for the created thread to finish.
    WaitForSingleObject( hThread, INFINITE );

    // Destroy the thread object.
    CloseHandle( hThread );
}
```

```
The thread locale is now set to en-US.
The date in en-US locale is: 'Thursday, January 4, 2024'

The thread locale is now set to de-DE.
The date in de-DE locale is: 'Donnerstag, 4. Januar 2024'
```

## See also

[Locale names, Languages, and Country/Region strings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale-names-languages-and-country-region-strings?view=msvc-170)  
[`_configthreadlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/configthreadlocale?view=msvc-170)  
[`_create_locale`, `_wcreate_locale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/create-locale-wcreate-locale?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170)  
[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`strlen`, `wcslen`, `_mbslen`, `_mbslen_l`, `_mbstrlen`, `_mbstrlen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlen-wcslen-mbslen-mbslen-l-mbstrlen-mbstrlen-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strftime`, `wcsftime`, `_strftime_l`, `_wcsftime_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170)  
[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)  
[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)  
[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)
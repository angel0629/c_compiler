---
title: "Security-Enhanced Versions of CRT Functions"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-enhanced-versions-of-crt-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
More secure versions of run-time library routines are available. For more information about security enhancements in the CRT, see [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Secure functions

CRT Function

Security enhanced function

Use

[`_access`, `_waccess`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170)

[`_access_s`, `_waccess_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-s-waccess-s?view=msvc-170)

Determine file-access permission

[`_alloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/alloca?view=msvc-170)

[`_malloca`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/malloca?view=msvc-170)

Allocate memory on the stack

[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170)

[`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)

Convert time from type `struct tm` to character string

[`bsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch?view=msvc-170)

[`bsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/bsearch-s?view=msvc-170)

Perform a binary search of a sorted array

[`_cgets`, `_cgetws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/cgets-cgetws?view=msvc-170)

[`_cgets_s`, `_cgetws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cgets-s-cgetws-s?view=msvc-170)

Get a character string from the console

[`_chsize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize?view=msvc-170)

[`_chsize_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/chsize-s?view=msvc-170)

Change the size of a file

[`clearerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr?view=msvc-170)

[`clearerr_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clearerr-s?view=msvc-170)

Reset the error indicator for a stream

[`_control87`, `_controlfp`, `__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170)

[`_controlfp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/controlfp-s?view=msvc-170)

Get and set the floating-point control word

[`_cprintf`, `_cprintf_l`, `_cwprintf`, `_cwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-cprintf-l-cwprintf-cwprintf-l?view=msvc-170)

[`_cprintf_s`, `_cprintf_s_l`, `_cwprintf_s`, `_cwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cprintf-s-cprintf-s-l-cwprintf-s-cwprintf-s-l?view=msvc-170)

Format and print to the console

[`_cscanf`, `_cscanf_l`, `_cwscanf`, `_cwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-cscanf-l-cwscanf-cwscanf-l?view=msvc-170)

[`_cscanf_s`, `_cscanf_s_l`, `_cwscanf_s`, `_cwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cscanf-s-cscanf-s-l-cwscanf-s-cwscanf-s-l?view=msvc-170)

Read formatted data from the console

[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170)

[`_ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170)

Convert time from type `time_t`, `__time32_t` or `__time64_t` to character string

[`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170)

[`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170)

Convert a **`double`** number to a string

[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170)

[`_fcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170)

Converts a floating-point number to a string

[`fopen`, `_wfopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen?view=msvc-170)

[`fopen_s`, `_wfopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-s-wfopen-s?view=msvc-170)

Open a file

[`fprintf`, `_fprintf_l`, `fwprintf`, `_fwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-fprintf-l-fwprintf-fwprintf-l?view=msvc-170)

[`fprintf_s`, `_fprintf_s_l`, `fwprintf_s`, `_fwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fprintf-s-fprintf-s-l-fwprintf-s-fwprintf-s-l?view=msvc-170)

Print formatted data to a stream

[`fread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread?view=msvc-170)

[`fread_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-s?view=msvc-170)

Read from a file

[`_fread_nolock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-nolock?view=msvc-170)

[`_fread_nolock_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fread-nolock-s2?view=msvc-170)

Read from a file without using a multi-thread write lock

[`freopen`, `_wfreopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen?view=msvc-170)

[`freopen_s`, `_wfreopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-s-wfreopen-s?view=msvc-170)

Reopen the file

[`fscanf`, `_fscanf_l`, `fwscanf`, `_fwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-fscanf-l-fwscanf-fwscanf-l?view=msvc-170)

[`fscanf_s`, `_fscanf_s_l`, `fwscanf_s`, `_fwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fscanf-s-fscanf-s-l-fwscanf-s-fwscanf-s-l?view=msvc-170)

Read formatted data from a stream

[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170)

[`_ftime_s`, `_ftime32_s`, `_ftime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-s-ftime32-s-ftime64-s?view=msvc-170)

Get the current time

[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170)

[`_gcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170)

Convert a floating-point value to a string, and store it in a buffer

[`getenv`, `_wgetenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-wgetenv?view=msvc-170)

[`getenv_s`, `_wgetenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getenv-s-wgetenv-s?view=msvc-170)

Get a value from the current environment.

[`gets`, `getws`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/gets-getws?view=msvc-170)

[`gets_s`, `_getws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gets-s-getws-s?view=msvc-170)

Get a line from the `stdin` stream

[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170)

[`_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)

Convert time from type `time_t` to `struct tm` or from type `__time64_t` to `struct tm`

[`itoa`, `_itoa`, `ltoa`, `_ltoa`, `ultoa`, `_ultoa`, `_i64toa`, `_ui64toa`, `_itow`, `_ltow`, `_ultow`, `_i64tow`, `_ui64tow`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/itoa-itow?view=msvc-170)

[`_itoa_s`, `_ltoa_s`, `_ultoa_s`, `_i64toa_s`, `_ui64toa_s`, `_itow_s`, `_ltow_s`, `_ultow_s`, `_i64tow_s`, `_ui64tow_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/itoa-s-itow-s?view=msvc-170)

Convert an integral type to a string

[`_lfind`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind?view=msvc-170)

[`_lfind_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lfind-s?view=msvc-170)

Perform a linear search for the specified key

[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170)

[`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)

Convert time from type `time_t` to `struct tm` or from type `__time64_t` to `struct tm` with local correction

[`_lsearch`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch?view=msvc-170)

[`_lsearch_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lsearch-s?view=msvc-170)

Perform a linear search for a value; adds to end of list if not found

[`_makepath`, `_wmakepath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-wmakepath?view=msvc-170)

[`_makepath_s`, `_wmakepath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170)

Create a path name from components

[`_mbccpy`, `_mbccpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-mbccpy-l?view=msvc-170)

[`_mbccpy_s`, `_mbccpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbccpy-s-mbccpy-s-l?view=msvc-170)

Copy a multibyte character from one string to another string

[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170)

[`_mbsnbcat_s`, `_mbsnbcat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-s-mbsnbcat-s-l?view=msvc-170)

Append at most the first _n_ bytes of one multibyte character string to another

[`_mbsnbcpy`, `_mbsnbcpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-mbsnbcpy-l?view=msvc-170)

[`_mbsnbcpy_s`, `_mbsnbcpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-s-mbsnbcpy-s-l?view=msvc-170)

Copy _n_ bytes of a string to a destination string

[`_mbsnbset`, `_mbsnbset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-mbsnbset-l?view=msvc-170)

[`_mbsnbset_s`, `_mbsnbset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-s-mbsnbset-s-l?view=msvc-170)

Set the first _n_ bytes of a string to a specified character

[`mbsrtowcs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs?view=msvc-170)

[`mbsrtowcs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs-s?view=msvc-170)

Convert a multibyte character string to a corresponding wide character string

[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)

[`mbstowcs_s`, `_mbstowcs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170)

Convert a sequence of multibyte characters to a corresponding sequence of wide characters

[`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170)

[`memcpy_s`, `wmemcpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-s-wmemcpy-s?view=msvc-170)

Copy characters between buffers

[`memmove`, `wmemmove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170)

[`memmove_s`, `wmemmove_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-s-wmemmove-s?view=msvc-170)

Move one buffer to another

[`_mktemp`, `_wmktemp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-wmktemp?view=msvc-170)

[`_mktemp_s`, `_wmktemp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-s-wmktemp-s?view=msvc-170)

Create a unique filename

[`printf`, `_printf_l`, `wprintf`, `_wprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-printf-l-wprintf-wprintf-l?view=msvc-170)

[`printf_s`, `_printf_s_l`, `wprintf_s`, `_wprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/printf-s-printf-s-l-wprintf-s-wprintf-s-l?view=msvc-170)

Print formatted output to the standard output stream

[`_putenv`, `_wputenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-wputenv?view=msvc-170)

[`_putenv_s`, `_wputenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/putenv-s-wputenv-s?view=msvc-170)

Create, modify, or remove environment variables

[`qsort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort?view=msvc-170)

[`qsort_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/qsort-s?view=msvc-170)

Perform a quick sort

[`rand`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rand?view=msvc-170)

[`rand_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s?view=msvc-170)

Generate a pseudorandom number

[`scanf`, `_scanf_l`, `wscanf`, `_wscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170)

[`scanf_s`, `_scanf_s_l`, `wscanf_s`, `_wscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l?view=msvc-170)

Read formatted data from the standard input stream

[`_searchenv`, `_wsearchenv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-wsearchenv?view=msvc-170)

[`_searchenv_s`, `_wsearchenv_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/searchenv-s-wsearchenv-s?view=msvc-170)

Search for a file using environment paths

[`snprintf`, `_snprintf`, `_snprintf_l`, `_snwprintf`, `_snwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-snprintf-snprintf-l-snwprintf-snwprintf-l?view=msvc-170)

[`_snprintf_s`, `_snprintf_s_l`, `_snwprintf_s`, `_snwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-s-snprintf-s-l-snwprintf-s-snwprintf-s-l?view=msvc-170)

Write formatted data to a string

[`_snscanf`, `_snscanf_l`, `_snwscanf`, `_snwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-snscanf-l-snwscanf-snwscanf-l?view=msvc-170)

[`_snscanf_s`, `_snscanf_s_l`, `_snwscanf_s`, `_snwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-s-snscanf-s-l-snwscanf-s-snwscanf-s-l?view=msvc-170)

Read formatted data of a specified length from a string.

[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)

[`_sopen_s`, `_wsopen_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-s-wsopen-s?view=msvc-170)

Open a file for sharing

[`_splitpath`, `_wsplitpath`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-wsplitpath?view=msvc-170)

[`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170)

Break a path name into components

[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)

[`sprintf_s`, `_sprintf_s_l`, `swprintf_s`, `_swprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-s-sprintf-s-l-swprintf-s-swprintf-s-l?view=msvc-170)

Write formatted data to a string

[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170)

[`sscanf_s`, `_sscanf_s_l`, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170)

Read formatted data from a string

[`strcat`, `wcscat`, `_mbscat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170)

[`strcat_s`, `wcscat_s`, `_mbscat_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-s-wcscat-s-mbscat-s?view=msvc-170)

Append a string

[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170)

[`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170)

Copy a string

[`_strdate`, `_wstrdate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-wstrdate?view=msvc-170)

[`_strdate_s`, `_wstrdate_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-s-wstrdate-s?view=msvc-170)

Return current system date as string

[`strerror`, `_strerror`, `_wcserror`, `__wcserror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170)

[`strerror_s`, `_strerror_s`, `_wcserror_s`, `__wcserror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170)

Get a system error message (`strerror`, `_wcserror`) or print a user-supplied error message (`_strerror`, `__wcserror`)

[`_strlwr`, `_wcslwr`, `_mbslwr`, `_strlwr_l`, `_wcslwr_l`, `_mbslwr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr-mbslwr-strlwr-l-wcslwr-l-mbslwr-l?view=msvc-170)

[`_strlwr_s`, `_strlwr_s_l`, `_mbslwr_s`, `_mbslwr_s_l`, `_wcslwr_s`, `_wcslwr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-s-strlwr-s-l-mbslwr-s-mbslwr-s-l-wcslwr-s-wcslwr-s-l?view=msvc-170)

Convert a string to lowercase

[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170)

[`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)

Append characters to a string

[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170)

[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)

Copy characters of one string to another

[`_strnset`, `_strnset_l`, `_wcsnset`, `_wcsnset_l`, `_mbsnset`, `_mbsnset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-strnset-l-wcsnset-wcsnset-l-mbsnset-mbsnset-l?view=msvc-170)

[`_strnset_s`, `_strnset_s_l`, `_wcsnset_s`, `_wcsnset_s_l`, `_mbsnset_s`, `_mbsnset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-s-strnset-s-l-wcsnset-s-wcsnset-s-l-mbsnset-s-mbsnset-s-l?view=msvc-170)

Set the first n characters of a string to the specified character

[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)

[`_strset_s`, `_strset_s_l`, `_wcsset_s`, `_wcsset_s_l`, `_mbsset_s`, `_mbsset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-s-strset-s-l-wcsset-s-wcsset-s-l-mbsset-s-mbsset-s-l?view=msvc-170)

Set all the characters of a string to the specified character

[`_strtime`, `_wstrtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-wstrtime?view=msvc-170)

[`_strtime_s`, `_wstrtime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-s-wstrtime-s?view=msvc-170)

Return current system time as string

[`strtok`, `_strtok_l`, `wcstok`, `_wcstok_l`, `_mbstok`, `_mbstok_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-strtok-l-wcstok-wcstok-l-mbstok-mbstok-l?view=msvc-170)

[`strtok_s`, `_strtok_s_l`, `wcstok_s`, `_wcstok_s_l`, `_mbstok_s`, `_mbstok_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-s-strtok-s-l-wcstok-s-wcstok-s-l-mbstok-s-mbstok-s-l?view=msvc-170)

Find the next token in a string, using the current locale or a locale passed in

[`_strupr`, `_strupr_l`, `_mbsupr`, `_mbsupr_l`, `_wcsupr_l`, `_wcsupr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-strupr-l-mbsupr-mbsupr-l-wcsupr-l-wcsupr?view=msvc-170)

[`_strupr_s`, `_strupr_s_l`, `_mbsupr_s`, `_mbsupr_s_l`, `_wcsupr_s`, `_wcsupr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-s-strupr-s-l-mbsupr-s-mbsupr-s-l-wcsupr-s-wcsupr-s-l?view=msvc-170)

Convert a string to uppercase

[`tmpfile`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile?view=msvc-170)

[`tmpfile_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpfile-s?view=msvc-170)

Create a temporary file

[`_tempnam`, `_wtempnam`, `tmpnam`, `_wtmpnam`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tempnam-wtempnam-tmpnam-wtmpnam?view=msvc-170)

[`tmpnam_s`, `_wtmpnam_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tmpnam-s-wtmpnam-s?view=msvc-170)

Generate names you can use to create temporary files

[`_umask`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask?view=msvc-170)

[`_umask_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/umask-s?view=msvc-170)

Set the default file-permission mask

[`_vcprintf`, `_vcprintf_l`, `_vcwprintf`, `_vcwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vcprintf-vcprintf-l-vcwprintf-vcwprintf-l?view=msvc-170)

[`_vcprintf_s`, `_vcprintf_s_l`, `_vcwprintf_s`, `_vcwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vcprintf-s-vcprintf-s-l-vcwprintf-s-vcwprintf-s-l?view=msvc-170)

Write formatted output to the console using a pointer to a list of arguments

[`vfprintf`, `_vfprintf_l`, `vfwprintf`, `_vfwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-vfprintf-l-vfwprintf-vfwprintf-l?view=msvc-170)

[`vfprintf_s`, `_vfprintf_s_l`, `vfwprintf_s`, `_vfwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfprintf-s-vfprintf-s-l-vfwprintf-s-vfwprintf-s-l?view=msvc-170)

Write formatted output using a pointer to a list of arguments

[`vfscanf`, `vfwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfscanf-vfwscanf?view=msvc-170)

[`vfscanf_s`, `vfwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vfscanf-s-vfwscanf-s?view=msvc-170)

Read formatted data from a stream

[`vprintf`, `_vprintf_l`, `vwprintf`, `_vwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-vprintf-l-vwprintf-vwprintf-l?view=msvc-170)

[`vprintf_s`, `_vprintf_s_l`, `vwprintf_s`, `_vwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vprintf-s-vprintf-s-l-vwprintf-s-vwprintf-s-l?view=msvc-170)

Write formatted output using a pointer to a list of arguments

[`vscanf`, `vwscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-vwscanf?view=msvc-170)

[`vscanf_s`, `vwscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vscanf-s-vwscanf-s?view=msvc-170)

Read formatted data from the standard input stream

[`vsnprintf`, `_vsnprintf`, `_vsnprintf_l`, `_vsnwprintf`, `_vsnwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-vsnprintf-vsnprintf-l-vsnwprintf-vsnwprintf-l?view=msvc-170)

[`vsnprintf_s`, `_vsnprintf_s`, `_vsnprintf_s_l`, `_vsnwprintf_s`, `_vsnwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-s-vsnprintf-s-vsnprintf-s-l-vsnwprintf-s-vsnwprintf-s-l?view=msvc-170)

Write formatted output using a pointer to a list of arguments

[`vsprintf`, `_vsprintf_l`, `vswprintf`, `_vswprintf_l`, `__vswprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-vsprintf-l-vswprintf-vswprintf-l-vswprintf-l?view=msvc-170)

[`vsprintf_s`, `_vsprintf_s_l`, `vswprintf_s`, `_vswprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-s-vsprintf-s-l-vswprintf-s-vswprintf-s-l?view=msvc-170)

Write formatted output using a pointer to a list of arguments

[`vsscanf`, `vswscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsscanf-vswscanf?view=msvc-170)

[`vsscanf_s`, `vswscanf_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsscanf-s-vswscanf-s?view=msvc-170)

Read formatted data from a string

[`wcrtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb?view=msvc-170)

[`wcrtomb_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcrtomb-s?view=msvc-170)

Convert a wide character into its multibyte character representation

[`wcsrtombs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs?view=msvc-170)

[`wcsrtombs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs-s?view=msvc-170)

Convert a wide character string to its multibyte character string representation

[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)

[`wcstombs_s`, `_wcstombs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170)

Convert a sequence of wide characters to a corresponding sequence of multibyte characters

[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)

[`wctomb_s`, `_wctomb_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-s-wctomb-s-l?view=msvc-170)

Convert a wide character to the corresponding multibyte character

## See also

[C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)
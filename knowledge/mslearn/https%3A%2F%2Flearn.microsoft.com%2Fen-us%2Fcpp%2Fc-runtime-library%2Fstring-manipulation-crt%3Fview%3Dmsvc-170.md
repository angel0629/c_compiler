---
title: "String Manipulation (CRT)"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-manipulation-crt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These routines operate on null-terminated single-byte character, wide-character, and multibyte-character strings. Use the buffer-manipulation routines, described in [Buffer manipulation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170), to work with character arrays that don't end with a `NULL` character.

## String-manipulation routines

Routine

Use

[`strcoll`, `wcscoll`, `_mbscoll`, `_strcoll_l`, `_wcscoll_l`, `_mbscoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcoll-wcscoll-mbscoll-strcoll-l-wcscoll-l-mbscoll-l?view=msvc-170), [`_stricoll`, `_wcsicoll`, `_mbsicoll`, `_stricoll_l`, `_wcsicoll_l`, `_mbsicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricoll-wcsicoll-mbsicoll-stricoll-l-wcsicoll-l-mbsicoll-l?view=msvc-170), [`_strncoll`, `_wcsncoll`, `_mbsncoll`, `_strncoll_l`, `_wcsncoll_l`, `_mbsncoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170), [`_strnicoll`, `_wcsnicoll`, `_mbsnicoll`, `_strnicoll_l`, `_wcsnicoll_l`, `_mbsnicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicoll-wcsnicoll-mbsnicoll-strnicoll-l-wcsnicoll-l-mbsnicoll-l?view=msvc-170)

Compare two character strings using code page information (**`_mbsicoll`** and **`_mbsnicoll`** are case-insensitive)

[`_strdec`, `_wcsdec`, `_mbsdec`, `_mbsdec_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdec-wcsdec-mbsdec-mbsdec-l?view=msvc-170)

Move string pointer back one character

[`_strinc`, `_wcsinc`, `_mbsinc`, `_mbsinc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strinc-wcsinc-mbsinc-mbsinc-l?view=msvc-170)

Advance string pointer by one character

[`_mbsnbcat`, `_mbsnbcat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-mbsnbcat-l?view=msvc-170), [`_mbsnbcat_s`, `_mbsnbcat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-s-mbsnbcat-s-l?view=msvc-170)

Append, at most, first _n_ bytes of one character string to another

[`_mbsnbcmp`, `_mbsnbcmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcmp-mbsnbcmp-l?view=msvc-170)

Compare first _n_ bytes of two character strings

[`_strncnt`, `_wcsncnt`, `_mbsnbcnt`, `_mbsnbcnt_l`, `_mbsnccnt`, `_mbsnccnt_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncnt-wcsncnt-mbsnbcnt-mbsnbcnt-l-mbsnccnt-mbsnccnt-l?view=msvc-170)

Return number of character bytes within supplied character count

[`_mbsnbcpy`, `_mbsnbcpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-mbsnbcpy-l?view=msvc-170), [`_mbsnbcpy_s`, `_mbsnbcpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-s-mbsnbcpy-s-l?view=msvc-170)

Copy _n_ bytes of string

[`_mbsnbicmp`, `_mbsnbicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbicmp-mbsnbicmp-l?view=msvc-170)

Compare _n_ bytes of two character strings, ignoring case

[`_mbsnbset`, `_mbsnbset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-mbsnbset-l?view=msvc-170)

Set first _n_ bytes of character string to specified character

[`_strncnt`, `_wcsncnt`, `_mbsnbcnt`, `_mbsnbcnt_l`, `_mbsnccnt`, `_mbsnccnt_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncnt-wcsncnt-mbsnbcnt-mbsnbcnt-l-mbsnccnt-mbsnccnt-l?view=msvc-170)

Return number of characters within supplied byte count

[`_strnextc`, `_wcsnextc`, `_mbsnextc`, `_mbsnextc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnextc-wcsnextc-mbsnextc-mbsnextc-l?view=msvc-170)

Find next character in string

[`_strninc`, `_wcsninc`, `_mbsninc`, `_mbsninc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strninc-wcsninc-mbsninc-mbsninc-l?view=msvc-170)

Advance string pointer by _n_ characters

[`_strspnp`, `_wcsspnp`, `_mbsspnp`, `_mbsspnp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspnp-wcsspnp-mbsspnp-mbsspnp-l?view=msvc-170)

Return pointer to first character in given string that isn't in another given string

[`_scprintf`, `_scprintf_l`, `_scwprintf`, `_scwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scprintf-scprintf-l-scwprintf-scwprintf-l?view=msvc-170)

Return the number of characters in a formatted string

[`_snscanf`, `_snscanf_l`, `_snwscanf`, `_snwscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-snscanf-l-snwscanf-snwscanf-l?view=msvc-170), [`_snscanf_s`, `_snscanf_s_l`, `_snwscanf_s`, `_snwscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snscanf-s-snscanf-s-l-snwscanf-s-snwscanf-s-l?view=msvc-170)

Read formatted data of a specified length from the standard input stream.

[`sscanf`, `_sscanf_l`, `swscanf`, `_swscanf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-sscanf-l-swscanf-swscanf-l?view=msvc-170), [`sscanf_s`, `_sscanf_s_l`, `swscanf_s`, `_swscanf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sscanf-s-sscanf-s-l-swscanf-s-swscanf-s-l?view=msvc-170)

Read formatted data of a specified length from the standard input stream.

[`sprintf`, `_sprintf_l`, `swprintf`, `_swprintf_l`, `__swprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170), [`sprintf_s`, `_sprintf_s_l`, `swprintf_s`, `_swprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-s-sprintf-s-l-swprintf-s-swprintf-s-l?view=msvc-170), [`_sprintf_p`, `_sprintf_p_l`, `_swprintf_p`, `_swprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sprintf-p-sprintf-p-l-swprintf-p-swprintf-p-l?view=msvc-170)

Write formatted data to a string

[`strcat`, `wcscat`, `_mbscat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-wcscat-mbscat?view=msvc-170), [`strcat_s`, `wcscat_s`, `_mbscat_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-s-wcscat-s-mbscat-s?view=msvc-170)

Append one string to another

[`strchr`, `wcschr`, `_mbschr`, `_mbschr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strchr-wcschr-mbschr-mbschr-l?view=msvc-170)

Find first occurrence of specified character in string

[`strcmp`, `wcscmp`, `_mbscmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcmp-wcscmp-mbscmp?view=msvc-170)

Compare two strings

[`strcoll`, `wcscoll`, `_mbscoll`, `_strcoll_l`, `_wcscoll_l`, `_mbscoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcoll-wcscoll-mbscoll-strcoll-l-wcscoll-l-mbscoll-l?view=msvc-170), [`_stricoll`, `_wcsicoll`, `_mbsicoll`, `_stricoll_l`, `_wcsicoll_l`, `_mbsicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricoll-wcsicoll-mbsicoll-stricoll-l-wcsicoll-l-mbsicoll-l?view=msvc-170), [`_strncoll`, `_wcsncoll`, `_mbsncoll`, `_strncoll_l`, `_wcsncoll_l`, `_mbsncoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncoll-wcsncoll-mbsncoll-strncoll-l-wcsncoll-l-mbsncoll-l?view=msvc-170), [`_strnicoll`, `_wcsnicoll`, `_mbsnicoll`, `_strnicoll_l`, `_wcsnicoll_l`, `_mbsnicoll_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicoll-wcsnicoll-mbsnicoll-strnicoll-l-wcsnicoll-l-mbsnicoll-l?view=msvc-170)

Compare two strings using current locale code page information (**`_stricoll`**, **`_wcsicoll`**, **`_strnicoll`**, and **`_wcsnicoll`** are case-insensitive)

[`strcpy`, `wcscpy`, `_mbscpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-wcscpy-mbscpy?view=msvc-170), [`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170)

Copy one string to another

[`strcspn`, `wcscspn`, `_mbscspn`, `_mbscspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcspn-wcscspn-mbscspn-mbscspn-l?view=msvc-170)

Find first occurrence of character from specified character set in string

[`_strdup`, `_wcsdup`, `_mbsdup`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-wcsdup-mbsdup?view=msvc-170), [`_strdup_dbg`, `_wcsdup_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdup-dbg-wcsdup-dbg?view=msvc-170)

Duplicate string

[`strerror`, `_strerror`, `_wcserror`, `__wcserror`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-strerror-wcserror-wcserror?view=msvc-170), [`strerror_s`, `_strerror_s`, `_wcserror_s`, `__wcserror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170)

Map error number to message string

[`strftime`, `wcsftime`, `_strftime_l`, `_wcsftime_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170)

Format date-and-time string

[`_stricmp`, `_wcsicmp`, `_mbsicmp`, `_stricmp_l`, `_wcsicmp_l`, `_mbsicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stricmp-wcsicmp-mbsicmp-stricmp-l-wcsicmp-l-mbsicmp-l?view=msvc-170)

Compare two strings without regard to case

[`strlen`, `wcslen`, `_mbslen`, `_mbslen_l`, `_mbstrlen`, `_mbstrlen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlen-wcslen-mbslen-mbslen-l-mbstrlen-mbstrlen-l?view=msvc-170), [`strnlen`, `strnlen_s`, `wcsnlen`, `wcsnlen_s`, `_mbsnlen`, `_mbsnlen_l`, `_mbstrnlen`, `_mbstrnlen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnlen-strnlen-s?view=msvc-170)

Find length of string

[`_strlwr`, `_wcslwr`, `_mbslwr`, `_strlwr_l`, `_wcslwr_l`, `_mbslwr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-wcslwr-mbslwr-strlwr-l-wcslwr-l-mbslwr-l?view=msvc-170), [`_strlwr_s`, `_strlwr_s_l`, `_mbslwr_s`, `_mbslwr_s_l`, `_wcslwr_s`, `_wcslwr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-s-strlwr-s-l-mbslwr-s-mbslwr-s-l-wcslwr-s-wcslwr-s-l?view=msvc-170)

Convert string to lowercase

[`strncat`, `_strncat_l`, `wcsncat`, `_wcsncat_l`, `_mbsncat`, `_mbsncat_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-strncat-l-wcsncat-wcsncat-l-mbsncat-mbsncat-l?view=msvc-170), [`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)

Append characters of string

[`strncmp`, `wcsncmp`, `_mbsncmp`, `_mbsncmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncmp-wcsncmp-mbsncmp-mbsncmp-l?view=msvc-170)

Compare characters of two strings

[`strncpy`, `_strncpy_l`, `wcsncpy`, `_wcsncpy_l`, `_mbsncpy`, `_mbsncpy_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-strncpy-l-wcsncpy-wcsncpy-l-mbsncpy-mbsncpy-l?view=msvc-170), [`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)

Copy characters of one string to another

[`_strnicmp`, `_wcsnicmp`, `_mbsnicmp`, `_strnicmp_l`, `_wcsnicmp_l`, `_mbsnicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnicmp-wcsnicmp-mbsnicmp-strnicmp-l-wcsnicmp-l-mbsnicmp-l?view=msvc-170)

Compare characters of two strings without regard to case

[`_strnset`, `_strnset_l`, `_wcsnset`, `_wcsnset_l`, `_mbsnset`, `_mbsnset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-strnset-l-wcsnset-wcsnset-l-mbsnset-mbsnset-l?view=msvc-170)

Set first _n_ characters of string to specified character

[`strpbrk`, `wcspbrk`, `_mbspbrk`, `_mbspbrk_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strpbrk-wcspbrk-mbspbrk-mbspbrk-l?view=msvc-170)

Find first occurrence of character from one string in another string

[`strrchr`, `wcsrchr`, `_mbsrchr`, `_mbsrchr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrchr-wcsrchr-mbsrchr-mbsrchr-l?view=msvc-170)

Find last occurrence of given character in string

[`_strrev`, `_wcsrev`, `_mbsrev`, `_mbsrev_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strrev-wcsrev-mbsrev-mbsrev-l?view=msvc-170)

Reverse string

[`_strset`, `_strset_l`, `_wcsset`, `_wcsset_l`, `_mbsset`, `_mbsset_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-strset-l-wcsset-wcsset-l-mbsset-mbsset-l?view=msvc-170)

Set all characters of string to specified character

[`strspn`, `wcsspn`, `_mbsspn`, `_mbsspn_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strspn-wcsspn-mbsspn-mbsspn-l?view=msvc-170)

Find first occurrence in a string of a character not found in another string

[`strstr`, `wcsstr`, `_mbsstr`, `_mbsstr_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strstr-wcsstr-mbsstr-mbsstr-l?view=msvc-170)

Find first occurrence of specified string in another string

[`strtok`, `_strtok_l`, `wcstok`, `_wcstok_l`, `_mbstok`, `_mbstok_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-strtok-l-wcstok-wcstok-l-mbstok-mbstok-l?view=msvc-170), [`strtok_s`, `_strtok_s_l`, `wcstok_s`, `_wcstok_s_l`, `_mbstok_s`, `_mbstok_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtok-s-strtok-s-l-wcstok-s-wcstok-s-l-mbstok-s-mbstok-s-l?view=msvc-170)

Find next token in string

[`_strupr`, `_strupr_l`, `_mbsupr`, `_mbsupr_l`, `_wcsupr_l`, `_wcsupr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-strupr-l-mbsupr-mbsupr-l-wcsupr-l-wcsupr?view=msvc-170), [`_strupr_s`, `_strupr_s_l`, `_mbsupr_s`, `_mbsupr_s_l`, `_wcsupr_s`, `_wcsupr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-s-strupr-s-l-mbsupr-s-mbsupr-s-l-wcsupr-s-wcsupr-s-l?view=msvc-170)

Convert string to uppercase

[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)

Transform string into collated form based on locale-specific information

[`vsprintf`, `_vsprintf_l`, `vswprintf`, `_vswprintf_l`, `__vswprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-vsprintf-l-vswprintf-vswprintf-l-vswprintf-l?view=msvc-170), [`vsprintf_s`, `_vsprintf_s_l`, `vswprintf_s`, `_vswprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-s-vsprintf-s-l-vswprintf-s-vswprintf-s-l?view=msvc-170), [`_vsprintf_p`, `_vsprintf_p_l`, `_vswprintf_p`, `_vswprintf_p_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsprintf-p-vsprintf-p-l-vswprintf-p-vswprintf-p-l?view=msvc-170)

Write formatted output using a pointer to a list of arguments

[`vsnprintf`, `_vsnprintf`, `_vsnprintf_l`, `_vsnwprintf`, `_vsnwprintf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-vsnprintf-vsnprintf-l-vsnwprintf-vsnwprintf-l?view=msvc-170), [`vsnprintf_s`, `_vsnprintf_s`, `_vsnprintf_s_l`, `_vsnwprintf_s`, `_vsnwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-s-vsnprintf-s-vsnprintf-s-l-vsnwprintf-s-vsnwprintf-s-l?view=msvc-170)

Write formatted output using a pointer to a list of arguments

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
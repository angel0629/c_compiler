---
title: "localeconv"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets detailed information on locale settings.

## Syntax

```
struct lconv *localeconv( void );
```

## Return value

**`localeconv`** returns a pointer to a filled-in object of type [`struct lconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170). The values contained in the object are copied from the locale settings in thread-local storage, and can be overwritten by subsequent calls to **`localeconv`**. Changes made to the values in this object don't modify the locale settings. Calls to [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170) with _`category`_ values of `LC_ALL`, `LC_MONETARY`, or `LC_NUMERIC` overwrite the contents of the structure.

The **`localeconv`** function gets detailed information about numeric formatting for the current locale. This information is stored in a structure of type `lconv`. The `lconv` structure, defined in LOCALE.H, contains the following members:

Field

Meaning

`decimal_point`,  
`_W_decimal_point`

Pointer to decimal-point character for nonmonetary quantities.

`thousands_sep`,  
`_W_thousands_sep`

Pointer to character that separates groups of digits to left of decimal point for nonmonetary quantities.

`grouping`

Pointer to a **`char`**\-sized integer that contains the size of each group of digits in nonmonetary quantities.

`int_curr_symbol`,  
`_W_int_curr_symbol`

Pointer to international currency symbol for current locale. First three characters specify alphabetic international currency symbol as defined in the _ISO 4217 Codes for the Representation of Currency and Funds_ standard. Fourth character (immediately preceding null character) separates international currency symbol from monetary quantity.

`currency_symbol`,  
`_W_currency_symbol`

Pointer to local currency symbol for current locale.

`mon_decimal_point`,  
`_W_mon_decimal_point`

Pointer to decimal-point character for monetary quantities.

`mon_thousands_sep`,  
`_W_mon_thousands_sep`

Pointer to separator for groups of digits to left of decimal place in monetary quantities.

`mon_grouping`

Pointer to a **`char`**\-sized integer that contains the size of each group of digits in monetary quantities.

`positive_sign`,  
`_W_positive_sign`

String denoting sign for nonnegative monetary quantities.

`negative_sign`,  
`_W_negative_sign`

String denoting sign for negative monetary quantities.

`int_frac_digits`

Number of digits to right of decimal point in internationally formatted monetary quantities.

`frac_digits`

Number of digits to right of decimal point in formatted monetary quantities.

`p_cs_precedes`

Set to 1 if currency symbol precedes value for nonnegative formatted monetary quantity. Set to 0 if symbol follows value.

`p_sep_by_space`

Set to 1 if currency symbol is separated by space from value for nonnegative formatted monetary quantity. Set to 0 if there's no space separation.

`n_cs_precedes`

Set to 1 if currency symbol precedes value for negative formatted monetary quantity. Set to 0 if symbol succeeds value.

`n_sep_by_space`

Set to 1 if currency symbol is separated by space from value for negative formatted monetary quantity. Set to 0 if there's no space separation.

`p_sign_posn`

In nonnegative formatted monetary quantities, position of the positive sign.

`n_sign_posn`

In negative formatted monetary quantities, position of the positive sign.

Except as specified, members of the `lconv` structure that have `char *` and `wchar_t *` versions are pointers to strings. Any member that equals **`""`** (or **`L""`** for `wchar_t *`) is either of zero length, or not supported in the current locale. Both `decimal_point` and `_W_decimal_point` are always supported and have a nonzero length.

The **`char`** members of the structure are small non-negative numbers, not characters. Any member that equals `CHAR_MAX` isn't supported in the current locale.

The values of `grouping` and `mon_grouping` are interpreted according to the following rules:

*   `CHAR_MAX` - Don't perform any further grouping.
    
*   0 - Use previous element for each of remaining digits.
    
*   _`n`_ - Number of digits that make up current group. Next element is examined to determine size of next group of digits before current group.
    

The values for `int_curr_symbol` are interpreted according to the following rules:

*   The first three characters specify the alphabetic international currency symbol as defined in the _ISO 4217 Codes for the Representation of Currency and Funds_ standard.
    
*   The fourth character (immediately preceding the null character) separates the international currency symbol from the monetary quantity.
    

The values for `p_cs_precedes` and `n_cs_precedes` are interpreted according to the following rules (the `n_cs_precedes` rule is in parentheses):

*   0 - Currency symbol follows value for nonnegative (negative) formatted monetary value.
    
*   1 - Currency symbol precedes value for nonnegative (negative) formatted monetary value.
    

The values for `p_sep_by_space` and `n_sep_by_space` are interpreted according to the following rules (the `n_sep_by_space` rule is in parentheses):

*   0 - Currency symbol is separated from value by space for nonnegative (negative) formatted monetary value.
    
*   1 - There's no space separation between currency symbol and value for nonnegative (negative) formatted monetary value.
    

The values for `p_sign_posn` and `n_sign_posn` are interpreted according to the following rules:

*   0 - Parentheses surround quantity and currency symbol.
    
*   1 - Sign string precedes quantity and currency symbol.
    
*   2 - Sign string follows quantity and currency symbol.
    
*   3 - Sign string immediately precedes currency symbol.
    
*   4 - Sign string immediately follows currency symbol.
    

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`localeconv`**

<locale.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[`setlocale`](https://learn.microsoft.com/en-us/cpp/preprocessor/setlocale?view=msvc-170)  
[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
[`strftime`, `wcsftime`, `_strftime_l`, `_wcsftime_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170)  
[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)
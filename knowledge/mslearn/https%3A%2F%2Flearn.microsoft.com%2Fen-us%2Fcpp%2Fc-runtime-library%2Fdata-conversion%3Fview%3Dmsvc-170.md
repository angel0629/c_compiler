---
title: "Data Conversion"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These routines convert data from one form to another. Generally these routines execute faster than conversions you might write. Each routine that begins with a `to` prefix is implemented as a function and as a macro. See [Recommendations for choosing between functions and macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/recommendations-for-choosing-between-functions-and-macros?view=msvc-170) for information about choosing an implementation.

## Data-conversion routines

Routine

Use

[`abs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)

Find absolute value of integer

[`atof`, `_atof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)

Convert string to **`float`**

[`atoi`, `_atoi_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoi-atoi-l-wtoi-wtoi-l?view=msvc-170)

Convert string to **`int`**

[`_atoi64`, `_atoi64_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoi64-atoi64-l-wtoi64-wtoi64-l?view=msvc-170)

Convert string to **`__int64`** or **`long long`**

[`atol`, `_atol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atol-atol-l-wtol-wtol-l?view=msvc-170)

Convert string to **`long`**

[`c16rtomb`, `c32rtomb`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/c16rtomb-c32rtomb1?view=msvc-170)

Convert UTF-16 or UTF-32 character to equivalent multibyte character

[`_ecvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt?view=msvc-170), [`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170)

Convert **`double`** to string of specified length

[`_fcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt?view=msvc-170), [`_fcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170)

Convert **`double`** to string with specified number of digits following decimal point

[`_gcvt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt?view=msvc-170), [`_gcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170)

Convert **`double`** number to string; store string in buffer

[`_itoa`, `_ltoa`, `_ultoa`, `_i64toa`, `_ui64toa`, `_itow`, `_ltow`, `ultow`, `_i64tow`, `_ui64tow`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/itoa-itow?view=msvc-170), [`_itoa_s`, `_ltoa_s`, `_ultoa_s`, `_i64toa_s`, `_ui64toa_s`, `_itow_s`, `_ltow_s`, `_ultow_s`, `_i64tow_s`, `_ui64tow_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/itoa-s-itow-s?view=msvc-170)

Convert integer types to string

[`labs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)

Find absolute value of **`long`** integer

[`llabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abs-labs-llabs-abs64?view=msvc-170)

Find absolute value of **`long long`** integer

[`_mbbtombc`, `_mbbtombc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtombc-mbbtombc-l?view=msvc-170)

Convert 1-byte multibyte character to corresponding 2-byte multibyte character

[`_mbcjistojms`, `_mbcjistojms_l`, `_mbcjmstojis`, `_mbcjmstojis_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbcjistojms-mbcjistojms-l-mbcjmstojis-mbcjmstojis-l?view=msvc-170)

Convert Japan Industry Standard (JIS) character to Japan Microsoft (JMS) character

[`_mbcjistojms`, `_mbcjistojms_l`, `_mbcjmstojis`, `_mbcjmstojis_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbcjistojms-mbcjistojms-l-mbcjmstojis-mbcjmstojis-l?view=msvc-170)

Convert JMS character to JIS character

[`_mbctohira`, `_mbctohira_l`, `_mbctokata`, `_mbctokata_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctohira-mbctohira-l-mbctokata-mbctokata-l?view=msvc-170)

Convert multibyte character to 1-byte hiragana code

[`_mbctohira`, `_mbctohira_l`, `_mbctokata`, `_mbctokata_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctohira-mbctohira-l-mbctokata-mbctokata-l?view=msvc-170)

Convert multibyte character to 1-byte katakana code

[`_mbctombb`, `_mbctombb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctombb-mbctombb-l?view=msvc-170)

Convert 2-byte multibyte character to corresponding 1-byte multibyte character

[`mbrtoc16`, `mbrtoc32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtoc16-mbrtoc323?view=msvc-170)

Convert multibyte character to equivalent UTF-16 or UTF-32 character

[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170), [`mbstowcs_s`, `_mbstowcs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170)

Convert sequence of multibyte characters to corresponding sequence of wide characters

[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)

Convert multibyte character to corresponding wide character

[`strtod`, `_strtod_l`, `wcstod`, `_wcstod_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtod-strtod-l-wcstod-wcstod-l?view=msvc-170)

Convert string to **`double`**

[`strtol`, `wcstol`, `_strtol_l`, `_wcstol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtol-wcstol-strtol-l-wcstol-l?view=msvc-170)

Convert string to **`long`** integer

[`strtoul`, `_strtoul_l`, `wcstoul`, `_wcstoul_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtoul-strtoul-l-wcstoul-wcstoul-l?view=msvc-170)

Convert string to **`unsigned long`** integer

[`strxfrm`, `wcsxfrm`, `_strxfrm_l`, `_wcsxfrm_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strxfrm-wcsxfrm-strxfrm-l-wcsxfrm-l?view=msvc-170)

Transform string into collated form based on locale-specific information

[`toascii`, `__toascii`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toascii-toascii?view=msvc-170)

Convert character to ASCII code

[`tolower`, `_tolower`, `towlower`, `_tolower_l`, `_towlower_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tolower-tolower-towlower-tolower-l-towlower-l?view=msvc-170), [`_mbctolower`, `_mbctolower_l`, `_mbctoupper`, `_mbctoupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctolower-mbctolower-l-mbctoupper-mbctoupper-l?view=msvc-170)

Test character and convert to lowercase if currently uppercase

[`tolower`, `_tolower`, `towlower`, `_tolower_l`, `_towlower_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tolower-tolower-towlower-tolower-l-towlower-l?view=msvc-170)

Convert character to lowercase unconditionally

[`toupper`, `_toupper`, `towupper`, `_toupper_l`, `_towupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toupper-toupper-towupper-toupper-l-towupper-l?view=msvc-170), [`_mbctolower`, `_mbctolower_l`, `_mbctoupper`, `_mbctoupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctolower-mbctolower-l-mbctoupper-mbctoupper-l?view=msvc-170)

Test character and convert to uppercase if currently lowercase

[`toupper`, `_toupper`, `towupper`, `_toupper_l`, `_towupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toupper-toupper-towupper-toupper-l-towupper-l?view=msvc-170)

Convert character to uppercase unconditionally

[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170), [`wcstombs_s`, `_wcstombs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170)

Convert sequence of wide characters to corresponding sequence of multibyte characters

[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170), [`wctomb_s`, `_wctomb_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-s-wctomb-s-l?view=msvc-170)

Convert wide character to corresponding multibyte character

[`_wtof`, `_wtof_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atof-atof-l-wtof-wtof-l?view=msvc-170)

Convert wide-character string to a **`double`**

[`_wtoi`, `_wtoi_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoi-atoi-l-wtoi-wtoi-l?view=msvc-170)

Convert wide-character string to **`int`**

[`_wtoi64`, `_wtoi64_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atoi64-atoi64-l-wtoi64-wtoi64-l?view=msvc-170)

Convert wide-character string to **`__int64`** or **`long long`**

[`_wtol`, `_wtol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/atol-atol-l-wtol-wtol-l?view=msvc-170)

Convert wide-character string to **`long`**

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
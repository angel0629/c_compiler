---
title: "Data Type Mappings"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-type-mappings?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These data-type mappings are defined in TCHAR.H and depend on whether the constant `_UNICODE` or `_MBCS` has been defined in your program.

For related information, see [Using TCHAR.H Data Types with \_MBCS Code](https://learn.microsoft.com/en-us/cpp/text/using-tchar-h-data-types-with-mbcs-code?view=msvc-170).

### Generic-text data type mappings

Generic-text

data type name

SBCS (\_UNICODE,

\_MBCS not

defined)

\_MBCS

defined

\_UNICODE

defined

`_TCHAR`

**`char`**

**`char`**

**`wchar_t`**

`_tfinddata_t`

`_finddata_t`

`_finddata_t`

`_wfinddata_t`

`_tfinddata64_t`

`__finddata64_t`

`__finddata64_t`

`_wfinddata64_t`

`_tfinddatai64_t`

`_finddatai64_t`

`_finddatai64_t`

`_wfinddatai64_t`

`_TINT`

**`int`**

**`int`**

`wint_t`

`_TSCHAR`

**`signed char`**

**`signed char`**

**`wchar_t`**

`_TUCHAR`

**`unsigned char`**

**`unsigned char`**

**`wchar_t`**

`_TXCHAR`

**`char`**

**`unsigned char`**

**`wchar_t`**

`_T` or `_TEXT`

No effect (removed by preprocessor)

No effect (removed by preprocessor)

`L` (converts following character or string to its Unicode counterpart)

## See also

[Generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/generic-text-mappings?view=msvc-170)  
[Constant and global variable mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/constant-and-global-variable-mappings?view=msvc-170)  
[Routine mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/routine-mappings?view=msvc-170)  
[A sample generic-text program](https://learn.microsoft.com/en-us/cpp/c-runtime-library/a-sample-generic-text-program?view=msvc-170)  
[Using generic-text mappings](https://learn.microsoft.com/en-us/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170)
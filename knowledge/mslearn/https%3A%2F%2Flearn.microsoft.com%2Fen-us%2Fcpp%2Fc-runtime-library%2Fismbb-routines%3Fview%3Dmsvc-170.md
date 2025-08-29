---
title: "_ismbb routines"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Tests the given integer value `c` for a particular condition, by using the current locale or a specified `LC_CTYPE` conversion state category.

[`_ismbbalnum`, `_ismbbalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalnum-ismbbalnum-l?view=msvc-170)  
[`_ismbbalpha`, `_ismbbalpha_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalpha-ismbbalpha-l?view=msvc-170)  
[`_ismbbblank`, `_ismbbblank_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbblank-ismbbblank-l?view=msvc-170)  
[`_ismbbgraph`, `_ismbbgraph_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbgraph-ismbbgraph-l?view=msvc-170)  
[`_ismbbkalnum`, `_ismbbkalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkalnum-ismbbkalnum-l?view=msvc-170)  
[`_ismbbkana`, `_ismbbkana_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkana-ismbbkana-l?view=msvc-170)  
[`_ismbbkprint`, `_ismbbkprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkprint-ismbbkprint-l?view=msvc-170)  
[`_ismbbkpunct`, `_ismbbkpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkpunct-ismbbkpunct-l?view=msvc-170)  
[`_ismbblead`, `_ismbblead_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170)  
[`_ismbbprint`, `_ismbbprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbprint-ismbbprint-l?view=msvc-170)  
[`_ismbbpunct`, `_ismbbpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbpunct-ismbbpunct-l?view=msvc-170)  
[`_ismbbtrail`, `_ismbbtrail_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbtrail-ismbbtrail-l?view=msvc-170)\\

Every routine in the `_ismbb` family tests the given integer value `c` for a particular condition. The test result depends on the multibyte code page that's in effect. By default, the multibyte code page is set to the ANSI code page that's obtained from the operating system at program startup. You can use [`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170) to query for the multibyte code page that's in use, or [`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170) to change it.

The output value is affected by the setting of the `LC_CTYPE` category setting of the locale; for more information, see [`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions that don't have the **`_l`** suffix use the current locale for this locale-dependent behavior; the versions that do have the **`_l`** suffix are identical except that instead they use the locale parameter that's passed in.

The routines in the `_ismbb` family test the given integer `c` as follows.

Routine

Byte test condition

[`_ismbbalnum`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalnum-ismbbalnum-l?view=msvc-170)

`isalnum(c) || _ismbbkalnum(c)`

[`_ismbbalpha`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalpha-ismbbalpha-l?view=msvc-170)

`isalpha(c) || _ismbbkalpha(c)`

[`_ismbbblank`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbblank-ismbbblank-l?view=msvc-170)

`isblank(c)`

[`_ismbbgraph`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbgraph-ismbbgraph-l?view=msvc-170)

Same as `_ismbbprint`, but `_ismbbgraph` doesn't include the space character (0x20)

[`_ismbbkalnum`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkalnum-ismbbkalnum-l?view=msvc-170)

Non-ASCII text symbol other than punctuation. For example, in code page 932 only, `_ismbbkalnum` tests for katakana alphanumeric

[`_ismbbkana`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkana-ismbbkana-l?view=msvc-170)

Katakana (0xA1 - 0xDF). Specific to code page 932

[`_ismbbkprint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkprint-ismbbkprint-l?view=msvc-170)

Non-ASCII text or non-ASCII punctuation symbol. For example, in code page 932 only, `_ismbbkprint` tests for katakana alphanumeric or katakana punctuation (range: 0xA1 - 0xDF)

[`_ismbbkpunct`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkpunct-ismbbkpunct-l?view=msvc-170)

Non-ASCII punctuation. For example, in code page 932 only, `_ismbbkpunct` tests for katakana punctuation

[`_ismbblead`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170)

First byte of multibyte character. For example, in code page 932 only, valid ranges are 0x81 - 0x9F, 0xE0 - 0xFC

[`_ismbbprint`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbprint-ismbbprint-l?view=msvc-170)

`isprint(c) || _ismbbkprint(c)`. `ismbbprint` includes the space character (0x20)

[`_ismbbpunct`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbpunct-ismbbpunct-l?view=msvc-170)

`ispunct(c) || _ismbbkpunct(c)`.

[`_ismbbtrail`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbtrail-ismbbtrail-l?view=msvc-170)

Second byte of multibyte character. For example, in code page 932 only, valid ranges are 0x40 - 0x7E, 0x80 - 0xEC

The following table shows the `|`\-combined values that compose the test conditions for these routines. The manifest constants `_BLANK`, `_DIGIT`, `_LOWER`, `_PUNCT`, and `_UPPER` are defined in _`ctype.h`_.

Routine

`_BLANK`

`_DIGIT`

`LOWER`

`_PUNCT`

`UPPER`

Non-ASCII  
text

Non-ASCII  
punctuation

`_ismbbalnum`

—

x

x

—

x

x

—

`_ismbbalpha`

—

—

x

—

x

x

—

`_ismbbblank`

x

—

—

—

—

—

—

`_ismbbgraph`

—

x

x

x

x

x

x

`_ismbbkalnum`

—

—

—

—

—

x

—

`_ismbbkprint`

—

—

—

—

—

x

x

`_ismbbkpunct`

—

—

—

—

—

—

x

`_ismbbprint`

x

x

x

x

x

x

x

`_ismbbpunct`

—

—

—

x

—

—

x

The `_ismbb` routines are implemented both as functions and as macros. For more information about how to choose either implementation, see [Recommendations for choosing between functions and macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/recommendations-for-choosing-between-functions-and-macros?view=msvc-170).

## See also

[Byte classification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170)  
[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`_mbbtombc`, `_mbbtombc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtombc-mbbtombc-l?view=msvc-170)  
[`_mbctombb`, `_mbctombb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbctombb-mbctombb-l?view=msvc-170)
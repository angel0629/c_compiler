---
title: "Byte classification"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/byte-classification?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Each of these routines tests a specified byte of a multibyte character for satisfaction of a condition. Except where specified otherwise, the output value is affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the **`_l`** suffix use the current locale for this locale-dependent behavior; the versions with the **`_l`** suffix are identical except that they use the locale parameter passed in instead.

Note

By definition, the ASCII characters between 0 and 127 are a subset of all multibyte-character sets. For example, the Japanese katakana character set includes ASCII as well as non-ASCII characters.

The predefined constants in the following table are defined in `<ctype.h>`.

## Multibyte-character byte-classification routines

Routine

Byte Test Condition

[`isleadbyte`, `_isleadbyte_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isleadbyte-isleadbyte-l?view=msvc-170)

Lead byte; test result depends on `LC_CTYPE` category setting of current locale

[`_ismbbalnum`, `_ismbbalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalnum-ismbbalnum-l?view=msvc-170)

`isalnum || _ismbbkalnum`

[`_ismbbalpha`, `_ismbbalpha_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalpha-ismbbalpha-l?view=msvc-170)

`isalpha || _ismbbkalpha`

[`_ismbbgraph`, `_ismbbgraph_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbgraph-ismbbgraph-l?view=msvc-170)

Same as `_ismbbprint`, but `_ismbbgraph` doesn't include the space character (0x20)

[`_ismbbkalnum`, `_ismbbkalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkalnum-ismbbkalnum-l?view=msvc-170)

Non-ASCII text symbol other than punctuation. For example, in code page 932 only, `_ismbbkalnum` tests for katakana alphanumeric

[`_ismbbkana`, `_ismbbkana_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkana-ismbbkana-l?view=msvc-170)

Katakana (0xA1 - 0xDF), code page 932 only

[`_ismbbkprint`, `_ismbbkprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkprint-ismbbkprint-l?view=msvc-170)

Non-ASCII text or non-ASCII punctuation symbol. For example, in code page 932 only, `_ismbbkprint` tests for katakana alphanumeric or katakana punctuation (range: 0xA1 - 0xDF).

[`_ismbbkpunct`, `_ismbbkpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkpunct-ismbbkpunct-l?view=msvc-170)

Non-ASCII punctuation. For example, in code page 932 only, `_ismbbkpunct` tests for katakana punctuation.

[`_ismbblead`, `_ismbblead_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170)

First byte of multibyte character. For example, in code page 932 only, valid ranges are 0x81 - 0x9F, 0xE0 - 0xFC.

[`_ismbbprint`, `_ismbbprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbprint-ismbbprint-l?view=msvc-170)

`isprint || _ismbbkprint`. `ismbbprint` includes the space character (0x20)

[`_ismbbpunct`, `_ismbbpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbpunct-ismbbpunct-l?view=msvc-170)

`ispunct || _ismbbkpunct`

[`_ismbbtrail`, `_ismbbtrail_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbtrail-ismbbtrail-l?view=msvc-170)

Second byte of multibyte character. For example, in code page 932 only, valid ranges are 0x40 - 0x7E, 0x80 - 0xEC.

[`_ismbslead`, `_ismbslead_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbslead-ismbstrail-ismbslead-l-ismbstrail-l?view=msvc-170)

Lead byte (in string context)

[`ismbstrail`, `_ismbstrail_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbslead-ismbstrail-ismbslead-l-ismbstrail-l?view=msvc-170)

Trail byte (in string context)

[`_mbbtype`, `_mbbtype_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbbtype-mbbtype-l?view=msvc-170)

Return byte type based on previous byte

[`_mbsbtype`, `_mbsbtype_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsbtype-mbsbtype-l?view=msvc-170)

Return type of byte within string

[`mbsinit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsinit?view=msvc-170)

Tracks the state of a multibyte character conversion.

The `MB_LEN_MAX` macro, defined in `<limits.h>`, expands to the maximum length in bytes that any multibyte character can have. `MB_CUR_MAX`, defined in `<stdlib.h>`, expands to the maximum length in bytes of any multibyte character in the current locale.

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
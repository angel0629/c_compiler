---
title: "Character Classification"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/character-classification?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Each of these routines tests a specified single-byte character, wide character, or multibyte character for satisfaction of a condition. (By definition, the ASCII character set between 0 and 127 are a subset of all multibyte-character sets. For example, Japanese katakana includes both ASCII and non-ASCII characters.)

The test conditions are affected by the setting of the `LC_CTYPE` category setting of the locale. For more information, see [`setlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170). The versions of these functions without the `_l` suffix use the current locale for this locale-dependent behavior; the versions with the `_l` suffix are identical except that they use the locale parameter passed in instead.

Generally these routines execute faster than tests you might write and should be favored over. For example, the following code executes slower than a call to `isalpha(c)`:

```
if ((c >= 'A') && (c <= 'Z')) || ((c >= 'a') && (c <= 'z'))
    return TRUE;
```

## Character-classification routines

Routine

Character test condition

[`isalnum`, `iswalnum`, `_isalnum_l`, `_iswalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isalnum-iswalnum-isalnum-l-iswalnum-l?view=msvc-170), [`_ismbcalnum`, `_ismbcalnum_l`, `_ismbcalpha`, `_ismbcalpha_l`, `_ismbcdigit`, `_ismbcdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170)

Alphanumeric

[`_ismbcalnum`, `_ismbcalnum_l`, `_ismbcalpha`, `_ismbcalpha_l`, `_ismbcdigit`, `_ismbcdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170)

Multibyte alphanumeric

[`isalpha`, `iswalpha`, `_isalpha_l`, `_iswalpha_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isalpha-iswalpha-isalpha-l-iswalpha-l?view=msvc-170), [`_ismbcalnum`, `_ismbcalnum_l`, `_ismbcalpha`, `_ismbcalpha_l`, `_ismbcdigit`, `_ismbcdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170)

Alphabetic

[`isascii`, `__isascii`, `iswascii`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isascii-isascii-iswascii?view=msvc-170)

ASCII

[`isblank`, `iswblank`, `_isblank_l`, `_iswblank_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isblank-iswblank-isblank-l-iswblank-l?view=msvc-170), [`_ismbcsblank`, `_ismbcsblank_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

Blank (space or horizontal tab)

[`iscntrl`, `iswcntrl`, `_iscntrl_l`, `_iswcntrl_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/iscntrl-iswcntrl-iscntrl-l-iswcntrl-l?view=msvc-170)

Control

[`iscsym`, `iscsymf`, `__iscsym`, `__iswcsym`, `__iscsymf`, `__iswcsymf`, `_iscsym_l`, `_iswcsym_l`, `_iscsymf_l`, `_iswcsymf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/iscsym-functions?view=msvc-170)

Letter, underscore, or digit

[`iscsym`, `iscsymf`, `__iscsym`, `__iswcsym`, `__iscsymf`, `__iswcsymf`, `_iscsym_l`, `_iswcsym_l`, `_iscsymf_l`, `_iswcsymf_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/iscsym-functions?view=msvc-170)

Letter or underscore

[`isdigit`, `iswdigit`, `_isdigit_l`, `_iswdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isdigit-iswdigit-isdigit-l-iswdigit-l?view=msvc-170), [`_ismbcalnum`, `_ismbcalnum_l`, `_ismbcalpha`, `_ismbcalpha_l`, `_ismbcdigit`, `_ismbcdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcalnum-functions?view=msvc-170)

Decimal digit

[`isgraph`, `iswgraph`, `_isgraph_l`, `_iswgraph_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isgraph-iswgraph-isgraph-l-iswgraph-l?view=msvc-170), [`_ismbcgraph`, `_ismbcgraph_l`, `_ismbcprint`, `_ismbcprint_l`, `_ismbcpunct`, `_ismbcpunct_l`, `_ismbcblank`, `_ismbcblank_l`, `_ismbcspace`, `_ismbcspace_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

Printable other than space

[`islower`, `iswlower`, `_islower_l`, `_iswlower_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/islower-iswlower-islower-l-iswlower-l?view=msvc-170), [`_ismbclower`, `_ismbclower_l`, `_ismbcupper`, `_ismbcupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclower-ismbclower-l-ismbcupper-ismbcupper-l?view=msvc-170)

Lowercase

[`_ismbchira`, `_ismbchira_l`, `_ismbckata`, `_ismbckata_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbchira-ismbchira-l-ismbckata-ismbckata-l?view=msvc-170)

Hiragana

[`_ismbchira`, `_ismbchira_l`, `_ismbckata`, `_ismbckata_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbchira-ismbchira-l-ismbckata-ismbckata-l?view=msvc-170)

Katakana

[`_ismbclegal`, `_ismbclegal_l`, `_ismbcsymbol`, `_ismbcsymbol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclegal-ismbclegal-l-ismbcsymbol-ismbcsymbol-l?view=msvc-170)

Legal multibyte character

[`_ismbcl0`, `_ismbcl0_l`, `_ismbcl1`, `_ismbcl1_l`, `_ismbcl2`, `_ismbcl2_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcl0-ismbcl0-l-ismbcl1-ismbcl1-l-ismbcl2-ismbcl2-l?view=msvc-170)

Japan-level 0 multibyte character

[`_ismbcl0`, `_ismbcl0_l`, `_ismbcl1`, `_ismbcl1_l`, `_ismbcl2`, `_ismbcl2_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcl0-ismbcl0-l-ismbcl1-ismbcl1-l-ismbcl2-ismbcl2-l?view=msvc-170)

Japan-level 1 multibyte character

[`_ismbcl0`, `_ismbcl0_l`, `_ismbcl1`, `_ismbcl1_l`, `_ismbcl2`, `_ismbcl2_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcl0-ismbcl0-l-ismbcl1-ismbcl1-l-ismbcl2-ismbcl2-l?view=msvc-170)

Japan-level 2 multibyte character

[`_ismbclegal`, `_ismbclegal_l`, `_ismbcsymbol`, `_ismbcsymbol_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclegal-ismbclegal-l-ismbcsymbol-ismbcsymbol-l?view=msvc-170)

Non-alphanumeric multibyte character

[`isprint`, `iswprint`, `_isprint_l`, `_iswprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isprint-iswprint-isprint-l-iswprint-l?view=msvc-170), [`_ismbcgraph`, `_ismbcgraph_l`, `_ismbcprint`, `_ismbcprint_l`, `_ismbcpunct`, `_ismbcpunct_l`, `_ismbcblank`, `_ismbcblank_l`, `_ismbcspace`, `_ismbcspace_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

Printable

[`ispunct`, `iswpunct`, `_ispunct_l`, `_iswpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ispunct-iswpunct-ispunct-l-iswpunct-l?view=msvc-170), [`_ismbcgraph`, `_ismbcgraph_l`, `_ismbcprint`, `_ismbcprint_l`, `_ismbcpunct`, `_ismbcpunct_l`, `_ismbcblank`, `_ismbcblank_l`, `_ismbcspace`, `_ismbcspace_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

Punctuation

[`isspace`, `iswspace`, `_isspace_l`, `_iswspace_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isspace-iswspace-isspace-l-iswspace-l?view=msvc-170), [`_ismbcgraph`, `_ismbcgraph_l`, `_ismbcprint`, `_ismbcprint_l`, `_ismbcpunct`, `_ismbcpunct_l`, `_ismbcblank`, `_ismbcblank_l`, `_ismbcspace`, `_ismbcspace_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbcgraph-functions?view=msvc-170)

White-space

[`isupper`, `iswupper`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isupper-isupper-l-iswupper-iswupper-l?view=msvc-170), [`_ismbclower`, `_ismbclower_l`, `_ismbcupper`, `_ismbcupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbclower-ismbclower-l-ismbcupper-ismbcupper-l?view=msvc-170)

Uppercase

[`_isctype`, `iswctype`, `_isctype_l`, `_iswctype_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isctype-iswctype-isctype-l-iswctype-l?view=msvc-170)

Property specified by _`desc`_ argument

[`isxdigit`, `iswxdigit`, `_isxdigit_l`, `_iswxdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isxdigit-iswxdigit-isxdigit-l-iswxdigit-l?view=msvc-170)

Hexadecimal digit

[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)

Return length of valid multibyte character; result depends on `LC_CTYPE` category setting of current locale

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
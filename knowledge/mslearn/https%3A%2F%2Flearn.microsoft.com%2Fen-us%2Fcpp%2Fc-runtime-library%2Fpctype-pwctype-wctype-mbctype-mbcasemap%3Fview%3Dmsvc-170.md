---
title: "_pctype, _pwctype, _wctype, _mbctype, _mbcasemap"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/pctype-pwctype-wctype-mbctype-mbcasemap?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These global variables contain information used by the character classification functions. They are for internal use only.

## Syntax

```
extern const unsigned short *_pctype;
extern const wctype_t *_pwctype;
extern const unsigned short _wctype[];
extern unsigned char _mbctype[];
extern unsigned char _mbcasemap[];
```

## Remarks

The information in `_pctype`, `_pwctype`, and `_wctype` is used internally by [`isupper`, `_isupper_l`, `iswupper`, `_iswupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isupper-isupper-l-iswupper-iswupper-l?view=msvc-170), [`islower`, `iswlower`, `_islower_l`, `_iswlower_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/islower-iswlower-islower-l-iswlower-l?view=msvc-170), [`isdigit`, `iswdigit`, `_isdigit_l`, `_iswdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isdigit-iswdigit-isdigit-l-iswdigit-l?view=msvc-170), [`isxdigit`, `iswxdigit`, `_isxdigit_l`, `_iswxdigit_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isxdigit-iswxdigit-isxdigit-l-iswxdigit-l?view=msvc-170), [`isspace`, `iswspace`, `_isspace_l`, `_iswspace_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isspace-iswspace-isspace-l-iswspace-l?view=msvc-170), [`isalnum`, `iswalnum`, `_isalnum_l`, `_iswalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isalnum-iswalnum-isalnum-l-iswalnum-l?view=msvc-170), [`ispunct`, `iswpunct`, `_ispunct_l`, `_iswpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ispunct-iswpunct-ispunct-l-iswpunct-l?view=msvc-170), [`isgraph`, `iswgraph`, `_isgraph_l`, `_iswgraph_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isgraph-iswgraph-isgraph-l-iswgraph-l?view=msvc-170), [`iscntrl`, `iswcntrl`, `_iscntrl_l`, `_iswcntrl_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/iscntrl-iswcntrl-iscntrl-l-iswcntrl-l?view=msvc-170), [`toupper`, `_toupper`, `towupper`, `_toupper_l`, `_towupper_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/toupper-toupper-towupper-toupper-l-towupper-l?view=msvc-170), [`tolower`, `_tolower`, `towlower`, `_tolower_l`, and `_towlower_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tolower-tolower-towlower-tolower-l-towlower-l?view=msvc-170) functions. These functions should be used instead of accessing these global variables.

The information in `_mbctype` and `_mbcasemap` is used internally by [`_ismbbkalnum`, `_ismbbkalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkalnum-ismbbkalnum-l?view=msvc-170), [`_ismbbkana`, `_ismbbkana_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkana-ismbbkana-l?view=msvc-170), [`_ismbbkpunct`, `_ismbbkpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkpunct-ismbbkpunct-l?view=msvc-170), [`_ismbbkprint`, `_ismbbkprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbkprint-ismbbkprint-l?view=msvc-170), [`_ismbbalpha`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalpha-ismbbalpha-l?view=msvc-170), [`_ismbbpunct`, `_ismbbpunct_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbpunct-ismbbpunct-l?view=msvc-170), [`_ismbbalnum`, `_ismbbalnum_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbalnum-ismbbalnum-l?view=msvc-170), [`_ismbbprint`, `_ismbbprint_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbprint-ismbbprint-l?view=msvc-170), [`_ismbbgraph`, `_ismbbgraph_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbgraph-ismbbgraph-l?view=msvc-170), [`_ismbblead`, `_ismbblead_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbblead-ismbblead-l?view=msvc-170), [`_ismbbtrail`, `_ismbbtrail_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbbtrail-ismbbtrail-l?view=msvc-170), [`_ismbslead`, `_ismbstrail`, `_ismbslead_l`, `_ismbstrail_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbslead-ismbstrail-ismbslead-l-ismbstrail-l?view=msvc-170), [`_ismbslead`, `_ismbstrail`, `_ismbslead_l`, and `_ismbstrail_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ismbslead-ismbstrail-ismbslead-l-ismbstrail-l?view=msvc-170). Use these functions instead of accessing the global variables.

## Requirements

Not for public use.

## See also

[`is`, `isw` routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
[`__pctype_func`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/pctype-func?view=msvc-170)
---
title: "MB_CUR_MAX"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/mb-cur-max?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
A macro that indicates the maximum number of bytes in a multibyte character for the current locale.

## Syntax

```
#include <stdlib.h>
```

## Remarks

Context: ANSI multibyte- and wide-character conversion functions

The value of `MB_CUR_MAX` is the maximum number of bytes in a multibyte character for the current locale.

## See also

[`_mbclen`, `mblen`, `_mblen_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbclen-mblen-mblen-l?view=msvc-170)  
[`mbstowcs`, `_mbstowcs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-mbstowcs-l?view=msvc-170)  
[`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170)  
[`___mb_cur_max_func`, `___mb_cur_max_l_func`, `__p___mb_cur_max`, `__mb_cur_max`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/mb-cur-max-func-mb-cur-max-l-func-p-mb-cur-max-mb-cur-max?view=msvc-170)  
[Standard types](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170)  
[`wcstombs`, `_wcstombs_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-wcstombs-l?view=msvc-170)  
[`wctomb`, `_wctomb_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctomb-wctomb-l?view=msvc-170)  
[Data type constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-type-constants?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)
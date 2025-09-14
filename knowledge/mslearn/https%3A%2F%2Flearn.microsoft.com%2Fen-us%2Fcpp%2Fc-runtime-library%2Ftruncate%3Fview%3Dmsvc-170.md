---
title: "_TRUNCATE"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Specifies string truncation behavior.

## Syntax

```
#include <stdlib.h>
```

`_TRUNCATE` enables truncation behavior when passed as the `count` parameter to these functions:

[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)

[`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)

[`mbstowcs_s`, `_mbstowcs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170)

[`mbsrtowcs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsrtowcs-s?view=msvc-170)

[`wcstombs_s`, `_wcstombs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170)

[`wcsrtombs_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcsrtombs-s?view=msvc-170)

[`_snprintf_s`, `_snprintf_s_l`, `_snwprintf_s`, `_snwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-s-snprintf-s-l-snwprintf-s-snwprintf-s-l?view=msvc-170)

[`vsnprintf_s`, `_vsnprintf_s`, `_vsnprintf_s_l`, `_vsnwprintf_s`, `_vsnwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-s-vsnprintf-s-vsnprintf-s-l-vsnwprintf-s-vsnwprintf-s-l?view=msvc-170)

If the destination buffer is too small to hold the entire string, the normal behavior of these functions is to treat it as an error situation (see [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170)). However, if string truncation is enabled by passing `_TRUNCATE`, these functions will copy only as much of the string as will fit, leaving the destination buffer null-terminated, and return successfully.

String truncation changes the return values of the affected functions. The following functions return 0 if no truncation occurs, or `STRUNCATE` if truncation does occur:

[`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)

[`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)

[`wcstombs_s`, `_wcstombs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wcstombs-s-wcstombs-s-l?view=msvc-170)

[`mbstowcs_s`, `_mbstowcs_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbstowcs-s-mbstowcs-s-l?view=msvc-170)

The following functions return the number of characters copied if no truncation occurs, or -1 if truncation does occur (matching the behavior of the original `snprintf` functions):

[`_snprintf_s`, `_snprintf_s_l`, `_snwprintf_s`, `_snwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/snprintf-s-snprintf-s-l-snwprintf-s-snwprintf-s-l?view=msvc-170)

[`vsnprintf_s`, `_vsnprintf_s`, `_vsnprintf_s_l`, `_vsnwprintf_s`, `_vsnwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-s-vsnprintf-s-vsnprintf-s-l-vsnwprintf-s-vsnwprintf-s-l?view=msvc-170)

## Example

```
// crt_truncate.c
#include <stdlib.h>
#include <errno.h>

int main()
{
   char src[] = "1234567890";
   char dst[5];
   errno_t err = strncpy_s(dst, _countof(dst), src, _TRUNCATE);
   if ( err == STRUNCATE )
      printf( "truncation occurred!\n" );
   printf( "'%s'\n", dst );
}
```

```
truncation occurred!
'1234'
```

## See also

[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)
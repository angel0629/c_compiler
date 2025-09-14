---
title: "_CrtSetDebugFillThreshold"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdebugfillthreshold?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves or modifies the threshold controlling buffer-filling behavior in debug functions.

## Syntax

```
size_t _CrtSetDebugFillThreshold( size_t newThreshold );
```

### Parameters

_`newThreshold`_  
New threshold size in bytes.

## Return value

The previous threshold value.

## Remarks

The debug versions of some security-enhanced CRT functions fill the buffer passed to them with a special character (0xFE). This fill character helps to find cases where the incorrect size was passed to the function. Unfortunately, it also reduces performance. To improve performance, use **`_CrtSetDebugFillThreshold`** to disable buffer-filling for buffers larger than the _`newThreshold`_ threshold. A _`newThreshold`_ value of 0 disables it for all buffers.

The default threshold is `SIZE_T_MAX`.

Here's a list of the affected functions:

*   [`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)
*   [`_cgets_s`, `_cgetws_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cgets-s-cgetws-s?view=msvc-170)
*   [`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170)
*   [`_ecvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ecvt-s?view=msvc-170)
*   [`_fcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fcvt-s?view=msvc-170)
*   [`_gcvt_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gcvt-s?view=msvc-170)
*   [`_itoa_s`, `_ltoa_s`, `_ultoa_s`, `_i64toa_s`, `_ui64toa_s`, `_itow_s`, `_ltow_s`, `_ultow_s`, `_i64tow_s`, `_ui64tow_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/itoa-s-itow-s?view=msvc-170)
*   [`_makepath_s`, `_wmakepath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170)
*   [`_mbsnbcat_s`, `_mbsnbcat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcat-s-mbsnbcat-s-l?view=msvc-170)
*   [`_mbsnbcpy_s`, `_mbsnbcpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbcpy-s-mbsnbcpy-s-l?view=msvc-170)
*   [`_mbsnbset_s`, `_mbsnbset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbsnbset-s-mbsnbset-s-l?view=msvc-170)
*   [`_mktemp_s`, `_wmktemp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/makepath-s-wmakepath-s?view=msvc-170)
*   [`_splitpath_s`, `_wsplitpath_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/splitpath-s-wsplitpath-s?view=msvc-170)
*   [`strcat_s`, `wcscat_s`, `_mbscat_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcat-s-wcscat-s-mbscat-s?view=msvc-170)
*   [`strcpy_s`, `wcscpy_s`, `_mbscpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strcpy-s-wcscpy-s-mbscpy-s?view=msvc-170)
*   [`_strdate_s`, `_wstrdate_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-s-wstrdate-s?view=msvc-170)
*   [`strerror_s`, `_strerror_s`, `_wcserror_s`, `__wcserror_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strerror-s-strerror-s-wcserror-s-wcserror-s?view=msvc-170)
*   [`_strlwr_s`, `_strlwr_s_l`, `_mbslwr_s`, `_mbslwr_s_l`, `_wcslwr_s`, `_wcslwr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strlwr-s-strlwr-s-l-mbslwr-s-mbslwr-s-l-wcslwr-s-wcslwr-s-l?view=msvc-170)
*   [`strncat_s`, `_strncat_s_l`, `wcsncat_s`, `_wcsncat_s_l`, `_mbsncat_s`, `_mbsncat_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncat-s-strncat-s-l-wcsncat-s-wcsncat-s-l-mbsncat-s-mbsncat-s-l?view=msvc-170)
*   [`strncpy_s`, `_strncpy_s_l`, `wcsncpy_s`, `_wcsncpy_s_l`, `_mbsncpy_s`, `_mbsncpy_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strncpy-s-strncpy-s-l-wcsncpy-s-wcsncpy-s-l-mbsncpy-s-mbsncpy-s-l?view=msvc-170)
*   [`_strnset_s`, `_strnset_s_l`, `_wcsnset_s`, `_wcsnset_s_l`, `_mbsnset_s`, `_mbsnset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strnset-s-strnset-s-l-wcsnset-s-wcsnset-s-l-mbsnset-s-mbsnset-s-l?view=msvc-170)
*   [`_strset_s`, `_strset_s_l`, `_wcsset_s`, `_wcsset_s_l`, `_mbsset_s`, `_mbsset_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strset-s-strset-s-l-wcsset-s-wcsset-s-l-mbsset-s-mbsset-s-l?view=msvc-170)
*   [`_strtime_s`, `_wstrtime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-s-wstrtime-s?view=msvc-170)
*   [`_strupr_s`, `_strupr_s_l`, `_mbsupr_s`, `_mbsupr_s_l`, `_wcsupr_s`, `_wcsupr_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strupr-s-strupr-s-l-mbsupr-s-mbsupr-s-l-wcsupr-s-wcsupr-s-l?view=msvc-170)
*   [`vsnprintf_s`, `_vsnprintf_s`, `_vsnprintf_s_l`, `_vsnwprintf_s`, `_vsnwprintf_s_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/vsnprintf-s-vsnprintf-s-vsnprintf-s-l-vsnwprintf-s-vsnwprintf-s-l?view=msvc-170)

## Requirements

Routine

Required header

**`_CrtSetDebugFillThreshold`**

`<crtdbg.h>`

This function is Microsoft-specific. For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## Example

```
// crt_crtsetdebugfillthreshold.c
// compile with: cl /MTd crt_crtsetdebugfillthreshold.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <crtdbg.h>

void Clear( char buff[], size_t size )
{
   for( int i=0; i<size; ++i )
      buff[i] = 0;
}

void Print( char buff[], size_t size )
{
   for( int i=0; i<size; ++i )
      printf( "%02x  %c\n", (unsigned char)buff[i], buff[i] );
}

int main( void )
{
   char buff[10];

   printf( "With buffer-filling on:\n" );
   strcpy_s( buff, _countof(buff), "howdy" );
   Print( buff, _countof(buff) );

   _CrtSetDebugFillThreshold( 0 );

   printf( "With buffer-filling off:\n" );
   Clear( buff, _countof(buff) );
   strcpy_s( buff, _countof(buff), "howdy" );
   Print( buff, _countof(buff) );
}
```

```
With buffer-filling on:
68  h
6f  o
77  w
64  d
79  y
00
fe  ■
fe  ■
fe  ■
fe  ■
With buffer-filling off:
68  h
6f  o
77  w
64  d
79  y
00
00
00
00
00
```

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)
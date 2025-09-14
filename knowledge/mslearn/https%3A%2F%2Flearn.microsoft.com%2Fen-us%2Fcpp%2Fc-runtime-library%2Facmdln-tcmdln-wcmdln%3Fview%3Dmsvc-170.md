---
title: "_acmdln, _tcmdln, _wcmdln"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/acmdln-tcmdln-wcmdln?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Internal CRT global variable. The command line.

## Syntax

```
char * _acmdln;
wchar_t * _wcmdln;

#ifdef WPRFLAG
   #define _tcmdln _wcmdln
#else
   #define _tcmdln _acmdln
#endif
```

## Remarks

These CRT internal variables store the complete command line. They're exposed in the exported symbols for the CRT, but aren't intended for use in your code. `_acmdln` stores the data as a character string. `_wcmdln` stores the data as a wide character string. `_tcmdln` can be defined as either `_acmdln` or `_wcmdln`, depending on which is appropriate.

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)
---
title: "wctype"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/wctype?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines a classification rule for wide-character codes.

## Syntax

```
wctype_t wctype(
   const char * property
);
```

### Parameters

_`property`_  
Property string.

## Return value

If the `LC_CTYPE` category of the current locale doesn't define a classification rule whose name matches the property string _`property`_, the function returns zero. Otherwise, it returns a nonzero value suitable for use as the second argument to a subsequent call to [`towctrans`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/towctrans?view=msvc-170).

## Remarks

The function determines a classification rule for wide-character codes. The following pairs of calls have the same behavior in all locales (but an implementation can define more classification rules even in the "C" locale):

Function

Same as

`iswalnum(c)`

`iswctype(c, wctype( "alnum" ))`

`iswalpha(c)`

`iswctype(c, wctype( "alpha" ))`

`iswcntrl(c)`

`iswctype(c, wctype( "cntrl" ))`

`iswdigit(c)`

`iswctype(c, wctype( "digit" ))`

`iswgraph(c)`

`iswctype(c, wctype( "graph" ))`

`iswlower(c)`

`iswctype(c, wctype( "lower" ))`

`iswprint(c)`

`iswctype(c, wctype( "print" ))`

`iswpunct(c)`

`iswctype(c, wctype( "punct" ))`

`iswspace(c)`

`iswctype(c, wctype( "space" ))`

`iswupper(c)`

`iswctype(c, wctype( "upper" ))`

`iswxdigit(c)`

`iswctype(c, wctype( "xdigit" ))`

## Requirements

Routine

Required header

**`wctype`**

`<wctype.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[`setlocale`, `_wsetlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setlocale-wsetlocale?view=msvc-170)
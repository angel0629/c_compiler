---
title: "_iob"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/iob?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The array of `stdio` control structures.

## Syntax

```
FILE _iob[_IOB_ENTRIES];
```

## Remarks

Starting with Visual Studio 2015, `_IOB_ENTRIES` is defined as 3 with the introduction of the Universal CRT. It was previously defined as 20.

Defined in `stdio.h`.

## See also

[Global variables](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-variables?view=msvc-170)  
[Introducing the Universal CRT](https://devblogs.microsoft.com/cppblog/introducing-the-universal-crt/)
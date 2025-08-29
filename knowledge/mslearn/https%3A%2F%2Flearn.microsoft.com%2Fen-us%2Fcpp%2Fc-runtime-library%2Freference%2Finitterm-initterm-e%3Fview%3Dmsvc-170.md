---
title: "_initterm, _initterm_e"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/initterm-initterm-e?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Internal methods that walk a table of function pointers and initialize them.

The first pointer is the starting location in the table and the second pointer is the ending location.

## Syntax

```
void __cdecl _initterm(
   PVFV *,
   PVFV *
);

int __cdecl _initterm_e(
   PIFV *,
   PIFV *
);
```

## Return value

A non-zero error code if an initialization fails and throws an error; 0 if no error occurs.

## Remarks

These methods are only called internally during the initialization of a C++ program. Don't call these methods in a program.

When these methods walk a table of function entries, they skip `NULL` entries and continue.

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)
---
title: "offsetof Macro"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/offsetof-macro?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the offset of a member from the beginning of its parent structure.

## Syntax

```
size_t offsetof(
   structName,
   memberName
);
```

### Parameters

_`structName`_  
Name of the parent data structure.

_`memberName`_  
Name of the member in the parent data structure for which to determine the offset.

## Return value

**`offsetof`** returns the offset in bytes of the specified member from the beginning of its parent data structure. It's undefined for bit fields.

## Remarks

The **`offsetof`** macro returns the offset in bytes of _`memberName`_ from the beginning of the structure specified by _`structName`_ as a value of type `size_t`. You can specify types with the **`struct`** keyword.

Note

**`offsetof`** is not a function and cannot be described using a C prototype.

## Requirements

Routine

Required header

**`offsetof`**

<stddef.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

All versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170).

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)
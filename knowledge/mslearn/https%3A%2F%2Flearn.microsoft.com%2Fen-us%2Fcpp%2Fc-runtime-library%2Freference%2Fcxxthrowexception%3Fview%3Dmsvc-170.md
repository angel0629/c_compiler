---
title: "_CxxThrowException"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cxxthrowexception?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Builds the exception record and calls the runtime environment to start processing the exception.

## Syntax

```
extern "C" void __stdcall _CxxThrowException(
   void* pExceptionObject,
   _ThrowInfo* pThrowInfo
);
```

### Parameters

_`pExceptionObject`_  
The object that generated the exception.

_`pThrowInfo`_  
The information that is required to process the exception.

## Remarks

This method is included in a compiler-only file that the compiler uses to process exceptions. Don't call the method directly from your code.

## Requirements

**Source:** Throw.cpp

## See also

[Alphabetical function reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crt-alphabetical-function-reference?view=msvc-170)
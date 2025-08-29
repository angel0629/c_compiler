---
title: "__uncaught_exception"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/uncaught-exception?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Indicates whether one or more exceptions have been thrown, but haven't yet been handled by the corresponding **`catch`** block of a [try-catch](https://learn.microsoft.com/en-us/cpp/cpp/try-throw-and-catch-statements-cpp?view=msvc-170) statement.

## Syntax

```
bool __uncaught_exception();
```

## Return value

**`true`** from the time an exception is thrown in a **`try`** block until the matching **`catch`** block is initialized; otherwise, **`false`**.

## Remarks

## Requirements

Routine

Required header

**`__uncaught_exception`**

`<eh.h>`

## See also

[try, throw, and catch Statements (C++)](https://learn.microsoft.com/en-us/cpp/cpp/try-throw-and-catch-statements-cpp?view=msvc-170)
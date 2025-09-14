---
title: "isgreater, isgreaterequal, isless, islessequal, islessgreater, isunordered"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/floating-point-ordering?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Determines the ordering relationship between two floating-point values.

## Syntax

```
int isgreater(
   /* floating-point */ x,
   /* floating-point */ y
); /* C-only macro */

int isgreaterequal(
   /* floating-point */ x,
   /* floating-point */ y
); /* C-only macro */

int isless(
   /* floating-point */ x,
   /* floating-point */ y
); /* C-only macro */

int islessequal(
   /* floating-point */ x,
   /* floating-point */ y
); /* C-only macro */

int islessgreater(
   /* floating-point */ x,
   /* floating-point */ y
); /* C-only macro */

int isunordered(
   /* floating-point */ x,
   /* floating-point */ y
); /* C-only macro */
```

```
template <class FloatingType1, class FloatingType2>
inline bool isgreater(
   FloatingType1 x,
   FloatingType2 y
) throw(); /* C++-only template function */

template <class FloatingType1, class FloatingType2>
inline bool isgreaterequal(
   FloatingType1 x,
   FloatingType2 y
) throw(); /* C++-only template function */

template <class FloatingType1, class FloatingType2>
inline bool isless(
   FloatingType1 x,
   FloatingType2 y
) throw(); /* C++-only template function */

template <class FloatingType1, class FloatingType2>
inline bool islessequal(
   FloatingType1 x,
   FloatingType2 y
) throw(); /* C++-only template function */

template <class FloatingType1, class FloatingType2>
inline bool islessgreater(
   FloatingType1 x,
   FloatingType2 y
) throw(); /* C++-only template function */

template <class FloatingType1, class FloatingType2>
inline bool isunordered(
   FloatingType1 x,
   FloatingType2 y
) throw(); /* C++-only template function */
```

### Parameters

_`x`_, _`y`_  
The floating-point values to compare.

## Return value

In all comparisons, infinities of the same sign compare as equal. Negative infinity is less than any finite value or positive infinity. Positive infinity is greater than any finite value or negative infinity. Zeroes are equal regardless of sign. NaNs aren't less than, equal to, or greater than any value, including another NaN.

When neither argument is a NaN, the ordering macros **`isgreater`**, **`isgreaterequal`**, **`isless`**, and **`islessequal`** return a non-zero value if the specified ordering relation between _`x`_ and _`y`_ holds true. These macros return 0 if either or both arguments are NaNs or if the ordering relationship is false. The function forms behave the same way, but return **`true`** or **`false`**.

The **`islessgreater`** macro returns a non-zero value if both _`x`_ and _`y`_ aren't NaNs, and _`x`_ is either less than or greater than _`y`_. It returns 0 if either or both arguments are NaNs, or if the values are equal. The function form behaves the same way, but returns **`true`** or **`false`**.

The **`isunordered`** macro returns a non-zero value if either _`x`_, _`y`_, or both are NaNs. Otherwise, it returns 0. The function form behaves the same way, but returns **`true`** or **`false`**.

These comparison operations are implemented as macros when compiled as C, and as inline template functions when compiled as C++.

## Requirements

Function

Required header (C)

Required header (C++)

**`isgreater`**, **`isgreaterequal`**, **`isless`**,  
**`islessequal`**, **`islessgreater`**, **`isunordered`**

<math.h>

<math.h> or <cmath>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`isfinite`, `_finite`, `_finitef`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/finite-finitef?view=msvc-170)  
[`isinf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isinf?view=msvc-170)  
[`isnan`, `_isnan`, `_isnanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/isnan-isnan-isnanf?view=msvc-170)  
[`_fpclass`, `_fpclassf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpclass-fpclassf?view=msvc-170)
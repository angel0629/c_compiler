---
title: "Secure Template Overloads"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/secure-template-overloads?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Microsoft has deprecated many C Runtime library (CRT) functions in favor of security-enhanced versions. For example, `strcpy_s` is the more secure replacement for `strcpy`. The deprecated functions are common sources of security bugs, because they don't prevent operations that can overwrite memory. By default, the compiler produces a deprecation warning when you use one of these functions. The CRT provides C++ template overloads for these functions to help ease the transition to the more secure variants.

For example, this code snippet generates a warning because `strcpy` is deprecated:

```
char szBuf[10];
strcpy(szBuf, "test"); // warning: deprecated
```

The deprecation warning is there to tell you that your code may be unsafe. If you've verified that your code can't overwrite memory, you have several choices. You can choose to ignore the warning, you can define the symbol `_CRT_SECURE_NO_WARNINGS` before the include statements for the CRT headers to suppress the warning, or you can update your code to use `strcpy_s`:

```
char szBuf[10];
strcpy_s(szBuf, 10, "test"); // security-enhanced _s function
```

The template overloads provide more choices. If you define `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` to 1, it enables template overloads of standard CRT functions that call the more secure variants automatically. If `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` is 1, then no changes to your code are necessary. Behind the scenes, the call to `strcpy` is changed to a call to `strcpy_s` with the size argument supplied automatically.

```
#define _CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES 1

// ...

char szBuf[10];
strcpy(szBuf, "test"); // ==> strcpy_s(szBuf, 10, "test")
```

The macro `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` doesn't affect the functions that take a count, such as `strncpy`. To enable template overloads for the count functions, define `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT` to 1. Before doing so, however, make sure that your code passes the count of characters, not the size of the buffer (a common mistake). Also, code that explicitly writes a null terminator at the end of the buffer after the function call is unnecessary if the secure variant is called. If you need truncation behavior, see [`_TRUNCATE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/truncate?view=msvc-170).

Note

The macro `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT` requires that `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` is also defined as 1. If `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT` is defined as 1 and `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` is defined as 0, the application will not perform any template overloads.

When you define `_CRT_SECURE_CPP_OVERLOAD_SECURE_NAMES` to 1, it enables template overloads of the secure variants (names ending in "\_s"). In this case, if `_CRT_SECURE_CPP_OVERLOAD_SECURE_NAMES` is 1, then one small change must be made to the original code:

```
#define _CRT_SECURE_CPP_OVERLOAD_SECURE_NAMES 1

// ...

char szBuf[10];
strcpy_s(szBuf, "test"); // ==> strcpy_s(szBuf, 10, "test")
```

Only the name of the function needs to be changed (by adding "\_s"); the template overload takes care of providing the size argument.

By default, `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES` and `_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT` are defined as 0 (disabled) and `_CRT_SECURE_CPP_OVERLOAD_SECURE_NAMES` is defined as 1 (enabled).

The template overloads only work for static arrays. Dynamically allocated buffers require other source code changes. Revisiting the above examples:

```
#define _CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES 1

// ...

char *szBuf = (char*)malloc(10);
strcpy(szBuf, "test"); // still deprecated; change it to
                       // strcpy_s(szBuf, 10, "test");
```

And this example:

```
#define _CRT_SECURE_CPP_OVERLOAD_SECURE_NAMES 1

// ...

char *szBuf = (char*)malloc(10);
strcpy_s(szBuf, "test"); // doesn't compile; change it to
                         // strcpy_s(szBuf, 10, "test");
```

## See also

[Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170)  
[C runtime (CRT) and C++ Standard Library (STL) `.lib` files](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170)
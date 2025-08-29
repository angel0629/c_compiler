---
title: "__security_init_cookie"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/security-init-cookie?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Initializes the global security cookie.

## Syntax

```
void __security_init_cookie(void);
```

The global security cookie is used for buffer overrun protection in code compiled with [/GS (Buffer Security Check)](https://learn.microsoft.com/en-us/cpp/build/reference/gs-buffer-security-check?view=msvc-170) and in code that uses exception handling. On entry to an overrun-protected function, the cookie is put on the stack, and on exit, the value on the stack is compared with the global cookie. Any difference between them indicates that a buffer overrun has occurred and causes immediate termination of the program.

Normally, **`__security_init_cookie`** is called by the CRT when it's initialized. If you bypass CRT initialization—for example, if you use [`/ENTRY`](https://learn.microsoft.com/en-us/cpp/build/reference/entry-entry-point-symbol?view=msvc-170) to specify an entry-point—then you must call **`__security_init_cookie`** yourself. If **`__security_init_cookie`** isn't called, the global security cookie is set to a default value, and buffer overrun protection is compromised. Because an attacker can exploit this default cookie value to defeat the buffer overrun checks, we recommend that you always call **`__security_init_cookie`** when you define your own entry point.

The call to **`__security_init_cookie`** must be made before any overrun-protected function is entered; otherwise a spurious buffer overrun will be detected. For more information, see [C Runtime Error R6035](https://learn.microsoft.com/en-us/cpp/error-messages/tool-errors/c-runtime-error-r6035?view=msvc-170).

## Example

See the examples in [C Runtime Error R6035](https://learn.microsoft.com/en-us/cpp/error-messages/tool-errors/c-runtime-error-r6035?view=msvc-170).

## Requirements

Routine

Required header

**`__security_init_cookie`**

`<process.h>`

**`__security_init_cookie`** is a Microsoft extension to the standard C Runtime Library. For compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Microsoft Security Response Center](https://www.microsoft.com/msrc?rtc=1)
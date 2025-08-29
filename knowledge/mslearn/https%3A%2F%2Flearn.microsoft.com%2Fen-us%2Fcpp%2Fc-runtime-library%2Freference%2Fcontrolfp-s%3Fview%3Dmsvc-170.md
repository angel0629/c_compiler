---
title: "_controlfp_s"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/controlfp-s?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets and sets the floating-point control word. This version of [`_control87`, `_controlfp`, `__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170) has security enhancements, as described in [Security features in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170).

## Syntax

```
errno_t _controlfp_s(
    unsigned int *currentControl,
    unsigned int newControl,
    unsigned int mask
);
```

### Parameters

_`currentControl`_  
The current control-word bit value.

_`newControl`_  
New control-word bit values.

_`mask`_  
Mask for new control-word bits to set.

## Return value

Zero if successful, or an `errno` value error code.

The **`_controlfp_s`** function is a platform-independent and more secure version of **`_control87`**, which gets the floating-point control word into the address that's stored in _`currentControl`_ and sets it by using _`newControl`_. The bits in the values indicate the floating-point control state. The floating-point control state enables the program to change the precision, rounding, and infinity modes in the floating-point math package, depending on the platform. You can also use **`_controlfp_s`** to mask or unmask floating-point exceptions.

If the value for _`mask`_ is equal to 0, **`_controlfp_s`** gets the floating-point control word and stores the retrieved value in _`currentControl`_.

If _`mask`_ is nonzero, a new value for the control word is set: For any bit that is set (that is, equal to 1) in _`mask`_, the corresponding bit in _`new`_ is used to update the control word. In other words, `fpcntrl = ((fpcntrl & ~mask) | (newControl & mask))` where _`fpcntrl`_ is the floating-point control word. In this scenario, _`currentControl`_ is set to the value after the change completes; it isn't the old control-word bit value.

Note

By default, the run-time libraries mask all floating-point exceptions.

**`_controlfp_s`** is nearly identical to the **`_control87`** function on Intel (x86), x64, and ARM platforms. If you're targeting x86, x64, or ARM platforms, you can use **`_control87`** or **`_controlfp_s`**.

The difference between **`_control87`** and **`_controlfp_s`** is in how they treat denormal values. For Intel (x86), x64, and ARM platforms, **`_control87`** can set and clear the `DENORMAL OPERAND` exception mask. **`_controlfp_s`** doesn't modify the `DENORMAL OPERAND` exception mask. This example demonstrates the difference:

```
_control87( _EM_INVALID, _MCW_EM );
// DENORMAL is unmasked by this call.
unsigned int current_word = 0;
_controlfp_s( &current_word, _EM_INVALID, _MCW_EM );
// DENORMAL exception mask remains unchanged.
```

The possible values for the mask constant (_`mask`_) and new control values (_`newControl`_) are shown in the following Hexadecimal Values table. Use the portable constants listed below (`_MCW_EM`, `_EM_INVALID`, and so on) as arguments to these functions, rather than supplying the hexadecimal values explicitly.

Intel (x86)-derived platforms support the `DENORMAL` input and output values in hardware. The x86 behavior is to preserve `DENORMAL` values. The ARM platform and the x64 platforms that have SSE2 support enable `DENORMAL` operands and results to be flushed, or forced to zero. The **`_controlfp_s`**, **`_controlfp`**, and **`_control87`** functions provide a mask to change this behavior. The following example demonstrates the use of this mask:

```
unsigned int current_word = 0;
_controlfp_s(&current_word, _DN_SAVE, _MCW_DN);
// Denormal values preserved on ARM platforms and on x64 processors with
// SSE2 support. NOP on x86 platforms.
_controlfp_s(&current_word, _DN_FLUSH, _MCW_DN);
// Denormal values flushed to zero by hardware on ARM platforms
// and x64 processors with SSE2 support. Ignored on other x86 platforms.
```

This function is ignored when you use [`/clr` (Common Language Runtime Compilation)](https://learn.microsoft.com/en-us/cpp/build/reference/clr-common-language-runtime-compilation?view=msvc-170) to compile because the common language runtime (CLR) only supports the default floating-point precision.

On x64, only the SSE2 control word stored in the MXCSR register is affected. Changing the infinity mode or the floating-point precision isn't supported. If the precision control mask is used on the x64 platform, the function raises an assertion and the invalid parameter handler is invoked as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

On x86, **`_controlfp_s`** affects the control words for both the x87 and the SSE2, if present. It's possible for the two control words to be inconsistent with each other (because of a previous call to [`__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170), for example); if there's an inconsistency between the two control words, **`_controlfp_s`** sets the `EM_AMBIGUOUS` flag in _`currentControl`_. It's a warning that the returned control word might not represent the state of both floating-point control words accurately.

If the mask isn't set correctly, this function generates an invalid parameter exception, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function returns `EINVAL` and sets `errno` to `EINVAL`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Arm platforms

*   Changing the infinity mode or the floating-point precision isn't supported. If the precision control mask is used on the x64 platform, the function raises an assertion and the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).
*   On ARM32 (discontinued), Windows doesn't support FP exceptions.
*   On ARM64, unmasking the whole `_MCW_EM` or any bits from it (`_EM_INEXACT`, `_EM_UNDERFLOW`, `_EM_OVERFLOW`, `_EM_ZERODIVIDE`, and `_EM_INVALID`) correctly change the FPCR register. Floating point exceptions raised by standard math functions, like Invalid operation from `std::acos`, are exempt from this behavior and can be ignored or raised properly depending on the FPCR register. For more information, see [Overview of ARM32 ABI Conventions](https://learn.microsoft.com/en-us/cpp/build/overview-of-arm-abi-conventions?view=msvc-170#floating-point-exceptions).
*   On ARM64EC, Windows catches processor floating-point exceptions and disables them in the FPCR register. This ensures consistent behavior across different processor variants.

### Mask constants and values

For the `_MCW_EM` mask, clearing it sets the exception, which allows the hardware exception; setting it hides the exception. If a `_EM_UNDERFLOW` or `_EM_OVERFLOW` occurs, no hardware exception is thrown until the next floating-point instruction is executed. To generate a hardware exception immediately after `_EM_UNDERFLOW` or `_EM_OVERFLOW`, call the `FWAIT MASM` instruction.

Mask

Hex value

Constant

Hex value

`_MCW_DN` (Denormal control)

0x03000000

`_DN_SAVE`

`_DN_FLUSH`

0x00000000

0x01000000

`_MCW_EM` (Interrupt exception mask)

0x0008001F

`_EM_INVALID`

`_EM_DENORMAL`

`_EM_ZERODIVIDE`

`_EM_OVERFLOW`

`_EM_UNDERFLOW`

`_EM_INEXACT`

0x00000010

0x00080000

0x00000008

0x00000004

0x00000002

0x00000001

`_MCW_IC` (Infinity control)

(Not supported on ARM or x64 platforms.)

0x00040000

`_IC_AFFINE`

`_IC_PROJECTIVE`

0x00040000

0x00000000

`_MCW_RC` (Rounding control)

0x00000300

`_RC_CHOP`

`_RC_UP`

`_RC_DOWN`

`_RC_NEAR`

0x00000300

0x00000200

0x00000100

0x00000000

`_MCW_PC` (Precision control)

(Not supported on ARM or x64 platforms.)

0x00030000

`_PC_24` (24 bits)

`_PC_53` (53 bits)

`_PC_64` (64 bits)

0x00020000

0x00010000

0x00000000

## Requirements

Routine

Required header

**`_controlfp_s`**

`<float.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_contrlfp_s.c
// processor: x86
// This program uses _controlfp_s to output the FP control
// word, set the precision to 24 bits, and reset the status to
// the default.

#include <stdio.h>
#include <float.h>
#pragma fenv_access (on)

int main( void )
{
    double a = 0.1;
    unsigned int control_word;
    int err;

    // Show original FP control word and do calculation.
    err = _controlfp_s(&control_word, 0, 0);
    if ( err ) /* handle error here */;

    printf( "Original: 0x%.4x\n", control_word );
    printf( "%1.1f * %1.1f = %.15e\n", a, a, a * a );

    // Set precision to 24 bits and recalculate.
    err = _controlfp_s(&control_word, _PC_24, MCW_PC);
    if ( err ) /* handle error here */;

    printf( "24-bit:   0x%.4x\n", control_word );
    printf( "%1.1f * %1.1f = %.15e\n", a, a, a * a );

    // Restore default precision-control bits and recalculate.
    err = _controlfp_s(&control_word, _CW_DEFAULT, MCW_PC);
    if ( err ) /* handle error here */;

    printf( "Default:  0x%.4x\n", control_word );
    printf( "%1.1f * %1.1f = %.15e\n", a, a, a * a );
}
```

```
Original: 0x9001f
0.1 * 0.1 = 1.000000000000000e-002
24-bit:   0xa001f
0.1 * 0.1 = 9.999999776482582e-003
Default:  0x9001f
0.1 * 0.1 = 1.000000000000000e-002
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`_clear87`, `_clearfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clear87-clearfp?view=msvc-170)  
[`_status87`, `_statusfp`, `_statusfp2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/status87-statusfp-statusfp2?view=msvc-170)  
[`_control87`, `_controlfp`, `__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170)
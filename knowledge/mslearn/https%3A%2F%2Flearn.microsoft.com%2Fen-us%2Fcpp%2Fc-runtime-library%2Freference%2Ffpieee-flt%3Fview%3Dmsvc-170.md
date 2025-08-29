---
title: "_fpieee_flt"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpieee-flt?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Invokes a user-defined trap handler for IEEE floating-point exceptions.

## Syntax

```
int _fpieee_flt(
   unsigned long excCode,
   struct _EXCEPTION_POINTERS *excInfo,
   int handler(_FPIEEE_RECORD *)
);
```

### Parameters

_`excCode`_  
Exception code.

_`excInfo`_  
Pointer to the Windows NT exception information structure.

_`handler`_  
Pointer to the user's IEEE trap-handler routine.

## Return value

The return value of **`_fpieee_flt`** is the value returned by _`handler`_. As such, the IEEE filter routine might be used in the except clause of a structured exception-handling (SEH) mechanism.

The **`_fpieee_flt`** function invokes a user-defined trap handler for IEEE floating-point exceptions and provides it with all relevant information. This routine serves as an exception filter in the SEH mechanism, which invokes your own IEEE exception handler when necessary.

The `_FPIEEE_RECORD` structure, defined in Fpieee.h, contains information pertaining to an IEEE floating-point exception. This structure is passed to the user-defined trap handler by **`_fpieee_flt`**.

\_FPIEEE\_RECORD field

Description

`RoundingMode`  
`Precision`

These **`unsigned int`** fields contain information about the floating-point environment at the time the exception occurred.

`Operation`

This **`unsigned int`** field indicates the type of operation that caused the trap. If the type is a comparison (`_FpCodeCompare`), you can supply one of the special `_FPIEEE_COMPARE_RESULT` values (as defined in Fpieee.h) in the **Result.Value** field. The conversion type (`_FpCodeConvert`) indicates that the trap occurred during a floating-point conversion operation. You can look at the `Operand1` and `Result` types to determine the type of conversion being attempted.

`Operand1`  
`Operand2`  
`Result`

These `_FPIEEE_VALUE` structures indicate the types and values of the proposed result and operands. Each structure contains these fields:

`OperandValid` - Flag indicating whether the responding value is valid.  
`Format` - Data type of the corresponding value. The format type might be returned even if the corresponding value isn't valid.  
`Value` - Result or operand data value.

`Cause`  
`Enable`  
`Status`

`_FPIEEE_EXCEPTION_FLAGS` contains a bit field for each type of floating point exception. There's a correspondence between these fields and the arguments used to mask the exceptions supplied to [`_controlfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170). The exact meaning of each bit depends on context:

`Cause` - Each set bit indicates the particular exception that was raised.  
`Enable` - Each set bit indicates that the particular exception is currently unmasked.  
`Status` - Each set bit indicates that the particular exception is currently pending, which includes exceptions that haven't been raised because they were masked by `_controlfp`.

Pending exceptions that are disabled are raised when you enable them. These exceptions can result in undefined behavior when using **`_fpieee_flt`** as an exception filter. Always call [`_clearfp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clear87-clearfp?view=msvc-170) before enabling floating point exceptions.

## Requirements

Function

Required header

**`_fpieee_flt`**

<fpieee.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_fpieee.c
// This program demonstrates the implementation of
// a user-defined floating-point exception handler using the
// _fpieee_flt function.

#include <fpieee.h>
#include <excpt.h>
#include <float.h>
#include <stddef.h>

int fpieee_handler( _FPIEEE_RECORD * );

int fpieee_handler( _FPIEEE_RECORD *pieee )
{
   // user-defined ieee trap handler routine:
   // there is one handler for all
   // IEEE exceptions

   // Assume the user wants all invalid
   // operations to return 0.

   if ((pieee->Cause.InvalidOperation) &&
       (pieee->Result.Format == _FpFormatFp32))
   {
        pieee->Result.Value.Fp32Value = 0.0F;

        return EXCEPTION_CONTINUE_EXECUTION;
   }
   else
      return EXCEPTION_EXECUTE_HANDLER;
}

#define _EXC_MASK    \
    _EM_UNDERFLOW  + \
    _EM_OVERFLOW   + \
    _EM_ZERODIVIDE + \
    _EM_INEXACT

int main( void )
{
   // ...

   __try {
      // unmask invalid operation exception
      _controlfp_s(NULL, _EXC_MASK, _MCW_EM);

      // code that may generate
      // fp exceptions goes here
   }
   __except ( _fpieee_flt( GetExceptionCode(),
                GetExceptionInformation(),
                fpieee_handler ) ){

      // code that gets control

      // if fpieee_handler returns
      // EXCEPTION_EXECUTE_HANDLER goes here

   }

   // ...
}
```

## See also

[Math and floating-point support](https://learn.microsoft.com/en-us/cpp/c-runtime-library/floating-point-support?view=msvc-170)  
[`_control87`, `_controlfp`, `__control87_2`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2?view=msvc-170)  
[`_controlfp_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/controlfp-s?view=msvc-170)
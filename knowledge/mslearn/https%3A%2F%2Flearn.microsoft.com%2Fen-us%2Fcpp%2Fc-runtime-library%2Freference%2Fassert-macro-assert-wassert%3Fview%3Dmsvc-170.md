---
title: "assert Macro, _assert, _wassert"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Evaluates an expression and, when the result is **`false`**, prints a diagnostic message and aborts the program.

## Syntax

```
assert(
   expression
);
void _assert(
   char const* message,
   char const* filename,
   unsigned line
);
void _wassert(
   wchar_t const* message,
   wchar_t const* filename,
   unsigned line
);
```

### Parameters

_`expression`_  
A scalar expression (including pointer expressions) that evaluates to nonzero (**`true`**) or 0 (**`false`**).

_`message`_  
The message to display.

_`filename`_  
The name of the source file the assertion failed in.

_`line`_  
The line number in the source file of the failed assertion.

The `assert` macro is typically used to identify logic errors during program development. Use it to stop program execution when unexpected conditions occur by implementing the _`expression`_ argument to evaluate to **`false`** only when the program is operating incorrectly. Assertion checks can be turned off at compile time by defining the macro `NDEBUG`. You can turn off the `assert` macro without modifying your source files by using a **`/DNDEBUG`** command-line option. You can turn off the `assert` macro in your source code by using a `#define NDEBUG` directive before `<assert.h>` is included.

The `assert` macro prints a diagnostic message when _`expression`_ evaluates to **`false`** (0) and calls [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) to stop program execution. No action is taken if _`expression`_ is **`true`** (nonzero). The diagnostic message includes the failed expression, the name of the source file and line number where the assertion failed.

The diagnostic message is printed in wide (`wchar_t`) characters. Therefore, it will work as expected even if there are Unicode characters in the expression.

The destination of the diagnostic message depends on the type of application that called the routine. Console applications receive the message through **`stderr`**. In a Windows-based application, `assert` calls the Windows [`MessageBox`](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messagebox) function to create a message box to display the message with three buttons: **Abort**, **Retry**, and **Ignore**. If the user chooses **Abort**, the program aborts immediately. If the user chooses **Retry**, the debugger is called, and the user can debug the program if just-in-time (JIT) debugging is enabled. If the user chooses **Ignore**, the program will continue with normal execution. Clicking **Ignore** when an error condition exists can result in undefined behavior since preconditions of the calling code weren't met.

To override the default output behavior regardless of the app type, call [`_set_error_mode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-error-mode?view=msvc-170) to select between the output-to-stderr and display-dialog-box behavior.

After `assert` displays its message, it calls [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170), which displays a dialog box with **Abort**, **Retry**, and **Ignore** buttons. [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) exits the program, so the **Retry** and **Ignore** button won't resume program execution following the `assert` call. If `assert` displayed a dialog box, the [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) dialog box isn't shown. The only time the [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170) dialog box is shown, is when `assert` sends its output to stderr.

As a consequence of the above behavior, a dialog box is always displayed following an `assert` call in debug mode. The behavior of each button is captured in the below table.

Error mode

Output to `stderr` (Console/`_OUT_TO_STDERR`)

Display Dialog Box (Windows/`_OUT_TO_MSGBOX`)

`Abort`

Exit immediately with exit code 3

Exit immediately with exit code 3

`Retry`

Break into debugger during `abort`

Break into debugger during `assert`

`Ignore`

Finish exiting via `abort`

Continue program as though `assert` didn't fire (may result in undefined behavior since preconditions of the calling code weren't met)

For more information about CRT debugging, see [CRT debugging techniques](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170).

The `_assert` and `_wassert` functions are internal CRT functions. They help minimize the code required in your object files to support assertions. We don't recommend that you call these functions directly.

The `assert` macro is enabled in both the release and debug versions of the C run-time libraries when `NDEBUG` isn't defined. When `NDEBUG` is defined, the macro is available, but doesn't evaluate its argument and has no effect. When it's enabled, the `assert` macro calls `_wassert` for its implementation. Other assertion macros, [`_ASSERT`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170), [`_ASSERTE`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170) and [`_ASSERT_EXPR`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170), are also available, but they only evaluate the expressions passed to them when the [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) macro has been defined and when they are in code linked with the debug version of the C run-time libraries.

## Requirements

Routine

Required header

`assert`, `_wassert`

`<assert.h>`

The signature of the `_assert` function isn't available in a header file. The signature of the `_wassert` function is only available when the `NDEBUG` macro isn't defined.

## Example

In this program, the **`analyze_string`** function uses the `assert` macro to test several conditions related to string and length. If any of the conditions fails, the program prints a message indicating what caused the failure.

```
// crt_assert.c
// compile by using: cl /W4 crt_assert.c
#include <stdio.h>
#include <assert.h>
#include <string.h>

void analyze_string( char *string );   // Prototype

int main( void )
{
   char  test1[] = "abc", *test2 = NULL, test3[] = "";

   printf ( "Analyzing string '%s'\n", test1 ); fflush( stdout );
   analyze_string( test1 );
   printf ( "Analyzing string '%s'\n", test2 ); fflush( stdout );
   analyze_string( test2 );
   printf ( "Analyzing string '%s'\n", test3 ); fflush( stdout );
   analyze_string( test3 );
}

// Tests a string to see if it is NULL,
// empty, or longer than 0 characters.
void analyze_string( char * string )
{
   assert( string != NULL );        // Cannot be NULL
   assert( *string != '\0' );       // Cannot be empty
   assert( strlen( string ) > 2 );  // Length must exceed 2
}
```

The program generates this output:

```
Analyzing string 'abc'
Analyzing string '(null)'
Assertion failed: string != NULL, file crt_assert.c, line 25
```

After the assertion failure, depending on the version of the operating system and run-time library, you may see a message box that contains something similar to:

```
A problem caused the program to stop working correctly. Windows will close the program and notify you if a solution is available.
```

If a debugger is installed, choose the **Debug** button to start the debugger, or **Close program** to exit.

## See also

[Error handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/error-handling-crt?view=msvc-170)  
[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)  
[`raise`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/raise?view=msvc-170)  
[`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170)  
[`_ASSERT`, `_ASSERTE`, `_ASSERT_EXPR` Macros](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-asserte-assert-expr-macros?view=msvc-170)  
[`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170)
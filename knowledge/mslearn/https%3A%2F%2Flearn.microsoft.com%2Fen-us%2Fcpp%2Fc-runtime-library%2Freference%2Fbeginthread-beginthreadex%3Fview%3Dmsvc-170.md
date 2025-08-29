---
title: "_beginthread, _beginthreadex"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/beginthread-beginthreadex?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Creates a thread.

## Syntax

```
uintptr_t _beginthread( // NATIVE CODE
   void( __cdecl *start_address )( void * ),
   unsigned stack_size,
   void *arglist
);
uintptr_t _beginthread( // MANAGED CODE
   void( __clrcall *start_address )( void * ),
   unsigned stack_size,
   void *arglist
);
uintptr_t _beginthreadex( // NATIVE CODE
   void *security,
   unsigned stack_size,
   unsigned ( __stdcall *start_address )( void * ),
   void *arglist,
   unsigned initflag,
   unsigned *thrdaddr
);
uintptr_t _beginthreadex( // MANAGED CODE
   void *security,
   unsigned stack_size,
   unsigned ( __clrcall *start_address )( void * ),
   void *arglist,
   unsigned initflag,
   unsigned *thrdaddr
);
```

### Parameters

_`start_address`_  
Start address of a routine that begins execution of a new thread. For **`_beginthread`**, the calling convention is either [`__cdecl`](https://learn.microsoft.com/en-us/cpp/cpp/cdecl?view=msvc-170) (for native code) or [`__clrcall`](https://learn.microsoft.com/en-us/cpp/cpp/clrcall?view=msvc-170) (for managed code). For **`_beginthreadex`**, the calling convention is either [`__stdcall`](https://learn.microsoft.com/en-us/cpp/cpp/stdcall?view=msvc-170) (for native code) or [`__clrcall`](https://learn.microsoft.com/en-us/cpp/cpp/clrcall?view=msvc-170) (for managed code).

_`stack_size`_  
Stack size for a new thread, or 0.

_`arglist`_  
Argument list to be passed to a new thread, or `NULL`.

_`Security`_  
Pointer to a [`SECURITY_ATTRIBUTES`](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/legacy/aa379560\(v=vs.85\)) structure that determines whether the returned handle can be inherited by child processes. If _`Security`_ is `NULL`, the handle can't be inherited.

_`initflag`_  
Flags that control the initial state of a new thread. Set _`initflag`_ to 0 to run immediately, or to `CREATE_SUSPENDED` to create the thread in a suspended state; use [`ResumeThread`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-resumethread) to execute the thread. Set _`initflag`_ to `STACK_SIZE_PARAM_IS_A_RESERVATION` flag to use _`stack_size`_ as the initial reserve size of the stack in bytes; if this flag isn't specified, _`stack_size`_ specifies the commit size.

_`thrdaddr`_  
Points to a 32-bit variable that receives the thread identifier. If it's `NULL`, it's not used.

## Return value

If successful, each of these functions returns a handle to the newly created thread; however, if the newly created thread exits too quickly, **`_beginthread`** might not return a valid handle. (See the discussion in the Remarks section.) On an error, **`_beginthread`** returns -1L, and `errno` is set to `EAGAIN` if there are too many threads, to `EINVAL` if the argument is invalid or the stack size is incorrect, or to `EACCES` if there are insufficient resources (such as memory). On an error, **`_beginthreadex`** returns 0, and `errno` and **`_doserrno`** are set.

If _`start_address`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, these functions set `errno` to `EINVAL` and return -1.

For more information about these and other return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

For more information about **`uintptr_t`**, see [Standard types](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170).

The **`_beginthread`** function creates a thread that begins execution of a routine at _`start_address`_. The routine at _`start_address`_ must use the **`__cdecl`** (for native code) or **`__clrcall`** (for managed code) calling convention and should have no return value. When the thread returns from that routine, it's terminated automatically. For more information about threads, see [Multithreading support for older code (Visual C++)](https://learn.microsoft.com/en-us/cpp/parallel/multithreading-support-for-older-code-visual-cpp?view=msvc-170).

**`_beginthreadex`** resembles the Win32 [`CreateThread`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createthread) API more closely than **`_beginthread`** does. **`_beginthreadex`** differs from **`_beginthread`** in the following ways:

*   **`_beginthreadex`** has three more parameters: _`initflag`_, _`Security`_, and **`threadaddr`**. The new thread can be created in a suspended state, with a specified security, and can be accessed by using _`thrdaddr`_, which is the thread identifier.
    
*   The routine at _`start_address`_ that's passed to **`_beginthreadex`** must use the **`__stdcall`** (for native code) or **`__clrcall`** (for managed code) calling convention and must return a thread exit code.
    
*   **`_beginthreadex`** returns 0 on failure, rather than -1L.
    
*   A thread that's created by using **`_beginthreadex`** is terminated by a call to [`_endthreadex`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/endthread-endthreadex?view=msvc-170).
    

The **`_beginthreadex`** function gives you more control over how the thread is created than **`_beginthread`** does. The **`_endthreadex`** function is also more flexible. For example, with **`_beginthreadex`**, you can use security information, set the initial state of the thread (running or suspended), and get the thread identifier of the newly created thread. You can also use the thread handle that's returned by **`_beginthreadex`** with the synchronization APIs, which you can't do with **`_beginthread`**.

**`_beginthreadex`** is safer to use than **`_beginthread`**. If the thread that's generated by **`_beginthread`** exits quickly, the handle that's returned to the caller of **`_beginthread`** might be invalid or point to another thread. However, the handle that's returned by **`_beginthreadex`** has to be closed by the caller of **`_beginthreadex`**, so it's guaranteed to be a valid handle if **`_beginthreadex`** didn't return an error.

You can call [`_endthread`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/endthread-endthreadex?view=msvc-170) or **`_endthreadex`** explicitly to terminate a thread; however, **`_endthread`** or **`_endthreadex`** is called automatically when the thread returns from the routine that's passed as a parameter. Terminating a thread with a call to **`_endthread`** or **`_endthreadex`** helps ensure correct recovery of resources that are allocated for the thread.

**`_endthread`** automatically closes the thread handle, whereas **`_endthreadex`** doesn't. Therefore, when you use **`_beginthread`** and **`_endthread`**, don't explicitly close the thread handle by calling the Win32 [`CloseHandle`](https://learn.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-closehandle) API. This behavior differs from the Win32 [`ExitThread`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-exitthread) API.

Note

For an executable file linked with Libcmt.lib, do not call the Win32 `ExitThread` API so that you don't prevent the run-time system from reclaiming allocated resources. **`_endthread`** and **`_endthreadex`** reclaim allocated thread resources and then call `ExitThread`.

The operating system handles the allocation of the stack when either **`_beginthread`** or **`_beginthreadex`** is called; you don't have to pass the address of the thread stack to either of these functions. In addition, the _`stack_size`_ argument can be 0, in which case the operating system uses the same value as the stack that's specified for the main thread.

_`arglist`_ is a parameter to be passed to the newly created thread. Typically, it's the address of a data item, such as a character string. _`arglist`_ can be `NULL` if it isn't needed, but **`_beginthread`** and **`_beginthreadex`** must be given some value to pass to the new thread. All threads are terminated if any thread calls [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170), **`exit`**, **`_exit`**, or `ExitProcess`.

The locale of the new thread is initialized by using the per-process global current locale info. If per-thread locale is enabled by a call to [`_configthreadlocale`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/configthreadlocale?view=msvc-170) (either globally or for new threads only), the thread can change its locale independently from other threads by calling **`setlocale`** or **`_wsetlocale`**. Threads that don't have the per-thread locale flag set can affect the locale info in all other threads that also don't have the per-thread locale flag set, and also all newly created threads. For more information, see [Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170).

For **`/clr`** code, **`_beginthread`** and **`_beginthreadex`** each have two overloads. One takes a native calling-convention function pointer, and the other takes a **`__clrcall`** function pointer. The first overload isn't application domain-safe and never will be. If you're writing **`/clr`** code, you must ensure that the new thread enters the correct application domain before it accesses managed resources. You can do so, for example, by using [`call_in_appdomain`](https://learn.microsoft.com/en-us/cpp/dotnet/call-in-appdomain-function?view=msvc-170). The second overload is application domain-safe; the newly created thread will always end up in the application domain of the caller of **`_beginthread`** or **`_beginthreadex`**.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_beginthread`**

`<process.h>`

**`_beginthreadex`**

`<process.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Multithreaded versions of the [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

To use **`_beginthread`** or **`_beginthreadex`**, the application must link with one of the multithreaded C run-time libraries.

## Examples

The following example uses **`_beginthread`** and **`_endthread`**.

```
// crt_BEGTHRD.C
// compile with: /MT /D "_X86_" /c
// processor: x86
#include <windows.h>
#include <process.h>    /* _beginthread, _endthread */
#include <stddef.h>
#include <stdlib.h>
#include <conio.h>

void Bounce( void * );
void CheckKey( void * );

// GetRandom returns a random integer between min and max.
#define GetRandom( min, max ) ((rand() % (int)(((max) + 1) - (min))) + (min))
// GetGlyph returns a printable ASCII character value
#define GetGlyph( val ) ((char)((val + 32) % 93 + 33))

BOOL repeat = TRUE;                 // Global repeat flag
HANDLE hStdOut;                     // Handle for console window
CONSOLE_SCREEN_BUFFER_INFO csbi;    // Console information structure

int main()
{
    int param = 0;
    int * pparam = &param;

    // Get display screen's text row and column information.
    hStdOut = GetStdHandle( STD_OUTPUT_HANDLE );
    GetConsoleScreenBufferInfo( hStdOut, &csbi );

    // Launch CheckKey thread to check for terminating keystroke.
    _beginthread( CheckKey, 0, NULL );

    // Loop until CheckKey terminates program or 1000 threads created.
    while( repeat && param < 1000 )
    {
        // launch another character thread.
        _beginthread( Bounce, 0, (void *) pparam );

        // increment the thread parameter
        param++;

        // Wait one second between loops.
        Sleep( 1000L );
    }
}

// CheckKey - Thread to wait for a keystroke, then clear repeat flag.
void CheckKey( void * ignored )
{
    _getch();
    repeat = 0;    // _endthread implied
}

// Bounce - Thread to create and control a colored letter that moves
// around on the screen.
//
// Params: parg - the value to create the character from
void Bounce( void * parg )
{
    char       blankcell = 0x20;
    CHAR_INFO  ci;
    COORD      oldcoord, cellsize, origin;
    DWORD      result;
    SMALL_RECT region;

    cellsize.X = cellsize.Y = 1;
    origin.X = origin.Y = 0;

    // Generate location, letter and color attribute from thread argument.
    srand( _threadid );
    oldcoord.X = region.Left = region.Right =
        GetRandom(csbi.srWindow.Left, csbi.srWindow.Right - 1);
    oldcoord.Y = region.Top = region.Bottom =
        GetRandom(csbi.srWindow.Top, csbi.srWindow.Bottom - 1);
    ci.Char.AsciiChar = GetGlyph(*((int *)parg));
    ci.Attributes = GetRandom(1, 15);

    while (repeat)
    {
        // Pause between loops.
        Sleep( 100L );

        // Blank out our old position on the screen, and draw new letter.
        WriteConsoleOutputCharacterA(hStdOut, &blankcell, 1, oldcoord, &result);
        WriteConsoleOutputA(hStdOut, &ci, cellsize, origin, &region);

        // Increment the coordinate for next placement of the block.
        oldcoord.X = region.Left;
        oldcoord.Y = region.Top;
        region.Left = region.Right += GetRandom(-1, 1);
        region.Top = region.Bottom += GetRandom(-1, 1);

        // Correct placement (and beep) if about to go off the screen.
        if (region.Left < csbi.srWindow.Left)
            region.Left = region.Right = csbi.srWindow.Left + 1;
        else if (region.Right >= csbi.srWindow.Right)
            region.Left = region.Right = csbi.srWindow.Right - 2;
        else if (region.Top < csbi.srWindow.Top)
            region.Top = region.Bottom = csbi.srWindow.Top + 1;
        else if (region.Bottom >= csbi.srWindow.Bottom)
            region.Top = region.Bottom = csbi.srWindow.Bottom - 2;

        // If not at a screen border, continue, otherwise beep.
        else
            continue;
        Beep((ci.Char.AsciiChar - 'A') * 100, 175);
    }
    // _endthread given to terminate
    _endthread();
}
```

Press any key to end the sample application.

The following sample code demonstrates how you can use the thread handle that's returned by **`_beginthreadex`** with the synchronization API [`WaitForSingleObject`](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-waitforsingleobject). The main thread waits for the second thread to terminate before it continues. When the second thread calls **`_endthreadex`**, it causes its thread object to go to the signaled state, which allows the primary thread to continue running. It can't be done with **`_beginthread`** and **`_endthread`**, because **`_endthread`** calls `CloseHandle`, which destroys the thread object before it can be set to the signaled state.

```
// crt_begthrdex.cpp
// compile with: /MT
#include <windows.h>
#include <stdio.h>
#include <process.h>

unsigned Counter;
unsigned __stdcall SecondThreadFunc( void* pArguments )
{
    printf( "In second thread...\n" );

    while ( Counter < 1000000 )
        Counter++;

    _endthreadex( 0 );
    return 0;
}

int main()
{
    HANDLE hThread;
    unsigned threadID;

    printf( "Creating second thread...\n" );

    // Create the second thread.
    hThread = (HANDLE)_beginthreadex( NULL, 0, &SecondThreadFunc, NULL, 0, &threadID );

    // Wait until second thread terminates. If you comment out the line
    // below, Counter will not be correct because the thread has not
    // terminated, and Counter most likely has not been incremented to
    // 1000000 yet.
    WaitForSingleObject( hThread, INFINITE );
    printf( "Counter should be 1000000; it is-> %d\n", Counter );
    // Destroy the thread object.
    CloseHandle( hThread );
}
```

```
Creating second thread...
In second thread...
Counter should be 1000000; it is-> 1000000
```

## See also

*   [Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)
*   [`_endthread`, `_endthreadex`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/endthread-endthreadex?view=msvc-170)
*   [`abort`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/abort?view=msvc-170)
*   [`exit`, `_Exit`, `_exit`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/exit-exit-exit?view=msvc-170)
*   [`GetExitCodeThread`](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getexitcodethread)
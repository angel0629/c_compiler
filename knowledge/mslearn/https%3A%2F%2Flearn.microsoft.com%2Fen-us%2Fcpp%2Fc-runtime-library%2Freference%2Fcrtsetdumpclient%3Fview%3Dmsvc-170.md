---
title: "_CrtSetDumpClient"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetdumpclient?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Installs an application-defined function to dump `_CLIENT_BLOCK` type memory blocks (debug version only).

## Syntax

```
_CRT_DUMP_CLIENT _CrtSetDumpClient( _CRT_DUMP_CLIENT dumpClient );
```

### Parameters

_`dumpClient`_  
New client-defined memory dump function to hook.

## Return value

Returns the previously defined client block dump function.

The **`_CrtSetDumpClient`** function allows the application to hook its own function to dump objects stored in `_CLIENT_BLOCK` memory blocks. As a result, every time a debug dump function such as [`_CrtMemDumpAllObjectsSince`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpallobjectssince?view=msvc-170) or [`_CrtDumpMemoryLeaks`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdumpmemoryleaks?view=msvc-170) dumps a `_CLIENT_BLOCK` memory block, the application's dump function is called as well. **`_CrtSetDumpClient`** provides an application with an easy method for detecting memory leaks and validating or reporting the contents of data stored in `_CLIENT_BLOCK` blocks. When [`_DEBUG`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug?view=msvc-170) isn't defined, calls to **`_CrtSetDumpClient`** are removed during preprocessing.

The **`_CrtSetDumpClient`** function installs the new application-defined dump function specified in _`dumpClient`_ and returns the previously defined dump function. An example of a client block dump function is as follows:

```
void DumpClientFunction( void *userPortion, size_t blockSize );
```

The _`userPortion`_ argument is a pointer to the beginning of the user data portion of the memory block and _`blockSize`_ specifies the size of the allocated memory block in bytes. The client block dump function must return **`void`**. The pointer to the client dump function that is passed to **`_CrtSetDumpClient`** is of type `_CRT_DUMP_CLIENT`, as defined in Crtdbg.h:

```
typedef void (__cdecl *_CRT_DUMP_CLIENT)( void *, size_t );
```

For more information about functions that operate on `_CLIENT_BLOCK` type memory blocks, see [Client block hook functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-debugging-techniques?view=msvc-170#client-block-hook-functions). The [`_CrtReportBlockType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtreportblocktype?view=msvc-170) function can be used to return information about block types and subtypes.

## Requirements

Routine

Required header

**`_CrtSetDumpClient`**

<crtdbg.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Libraries

Debug versions of [C run-time libraries](https://learn.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-170) only.

## See also

[Debug routines](https://learn.microsoft.com/en-us/cpp/c-runtime-library/debug-routines?view=msvc-170)  
[`_CrtReportBlockType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtreportblocktype?view=msvc-170)  
[`_CrtGetDumpClient`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtgetdumpclient?view=msvc-170)
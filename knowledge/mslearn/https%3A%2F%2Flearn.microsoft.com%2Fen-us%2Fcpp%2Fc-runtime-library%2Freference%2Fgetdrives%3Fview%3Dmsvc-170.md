---
title: "_getdrives"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdrives?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Returns a bitmask that represents the currently available disk drives.

## Syntax

```
unsigned long _getdrives( void );
```

## Return value

If the function succeeds, the return value is a bitmask that represents the currently available disk drives. Bit position 0 (the least-significant bit) represents drive A. Similarly, bit position 1 represents drive B, bit position 2 represents drive C, and so on. If the function fails, the return value is zero. To get extended error information, call `GetLastError`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_getdrives`**

<direct.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getdrives.c
// This program retrieves and lists out
// all the logical drives that are
// currently mounted on the machine.

#include <windows.h>
#include <direct.h>
#include <stdio.h>
#include <tchar.h>

TCHAR g_szDrvMsg[] = _T("A:\n");

int main(int argc, char* argv[]) {
   ULONG uDriveMask = _getdrives();

   if (uDriveMask == 0)
   {
      printf( "_getdrives() failed with failure code: %d\n",
              GetLastError());
   }
   else
   {
      printf("The following logical drives are being used:\n");

      while (uDriveMask) {
         if (uDriveMask & 1)
            printf(g_szDrvMsg);

         ++g_szDrvMsg[0];
         uDriveMask >>= 1;
      }
   }
}
```

```
The following logical drives are being used:
A:
C:
D:
E:
```

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)
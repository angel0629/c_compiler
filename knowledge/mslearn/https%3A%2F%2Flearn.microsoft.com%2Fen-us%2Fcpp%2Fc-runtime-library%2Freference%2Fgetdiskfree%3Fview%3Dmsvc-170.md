---
title: "_getdiskfree"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdiskfree?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Get information about a disk drive such as total clusters, available clusters, sectors per cluster, and bytes per sector.

## Syntax

```
unsigned _getdiskfree(
   unsigned drive,
   struct _diskfree_t * driveinfo
);
```

### Parameters

_`drive`_  
The disk drive for which you want information.

_`driveinfo`_  
A **`_diskfree_t`** structure that will be populated with information about the drive.

## Return value

If the function succeeds, the return value is zero. If the function fails, the return value is the error code. The value `errno` is set for any errors that are returned by the operating system. For more information about error conditions that are indicated by `errno`, see [`errno` constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-constants?view=msvc-170).

The **`_diskfree_t`** structure is defined in Direct.h.

```
struct _diskfree_t {
   unsigned total_clusters;      // The total number of clusters, both used and available, on the disk.
   unsigned avail_clusters;      // The number of unused clusters on the disk.
   unsigned sectors_per_cluster; // The number of sectors in each cluster.
   unsigned bytes_per_sector;    // The size of each sector in bytes.
};
```

This function validates its parameters. If the _`driveinfo`_ pointer is `NULL` or _`drive`_ specifies an invalid drive, this function invokes an invalid parameter handler, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, the function returns `EINVAL` and sets `errno` to `EINVAL`. Valid drives range from 0 to 26. A _`drive`_ value of 0 specifies the current drive; thereafter, numbers map to letters of the English alphabet such that 1 indicates drive A, 3 indicates drive C, and so on.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_getdiskfree`**

`<direct.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getdiskfree.c

#include <windows.h>
#include <direct.h>
#include <stdio.h>

int main(int argc, char* argv[]) 
{
    ULONG uDriveMask = _getdrives();

    for (unsigned uDrive = 1; uDrive <= 26; ++uDrive) 
    {
        if (uDriveMask & 1)
        {
            struct _diskfree_t df = { 0 };
            unsigned uErr = _getdiskfree(uDrive, &df);
            printf("\nDrive: %c\n", uDrive + 'A' - 1);
            
            if (uErr == 0)
            {
                printf("\tTotal clusters:      %11u\n", df.total_clusters);
                printf("\tAvailable clusters:  %11u\n", df.avail_clusters);
                printf("\tSectors per cluster: %11u\n", df.sectors_per_cluster);
                printf("\tBytes per sector:    %11u\n", df.bytes_per_sector);
            }
            else
            {
                WCHAR errMsg[80];
                unsigned uLen = FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL,
                    uErr, 0, errMsg, sizeof(errMsg), NULL);
                printf("%S\n", errMsg);
            }
        }
        uDriveMask >>= 1;
    }
}
```

```
Drive: C
        Total clusters:        249754111
        Available clusters:    160184686
        Sectors per cluster:           8
        Bytes per sector:            512
```

## See also

[Directory control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/directory-control?view=msvc-170)
---
title: "_unlock_file"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unlock-file?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Unlocks a file, allowing other processes to access the file.

## Syntax

```
void _unlock_file(
   FILE* file
);
```

### Parameters

_`file`_  
File handle.

## Remarks

The **`_unlock_file`** function unlocks the file specified by _`file`_. Unlocking a file allows access to the file by other processes. This function shouldn't be called unless `_lock_file` was previously called on the _`file`_ pointer. Calling **`_unlock_file`** on a file that isn't locked may result in a deadlock. For an example, see [`_lock_file`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lock-file?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Requirements

Routine

Required header

**`_unlock_file`**

<stdio.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_creat`, `_wcreat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/creat-wcreat?view=msvc-170)  
[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_lock_file`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/lock-file?view=msvc-170)
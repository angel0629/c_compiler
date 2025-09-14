---
title: "Heap Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/heap-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <malloc.h>
```

## Remarks

These constants give the return value indicating status of the heap.

Constant

Meaning

`_HEAPBADBEGIN`

Initial header information wasn't found or was invalid.

`_HEAPBADNODE`

Bad node was found, or heap is damaged.

`_HEAPBADPTR`

`_pentry` field of `_HEAPINFO` structure doesn't contain valid pointer into heap (`_heapwalk` routine only).

`_HEAPEMPTY`

Heap hasn't been initialized.

`_HEAPEND`

End of heap was reached successfully (`_heapwalk` routine only).

`_HEAPOK`

Heap is consistent (`_heapset` and `_heapchk` routines only). No errors so far; `_HEAPINFO` structure contains information about next entry (`_heapwalk` routine only).

## See also

[`_heapchk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapchk?view=msvc-170)  
[`_heapset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapset?view=msvc-170)  
[`_heapwalk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)
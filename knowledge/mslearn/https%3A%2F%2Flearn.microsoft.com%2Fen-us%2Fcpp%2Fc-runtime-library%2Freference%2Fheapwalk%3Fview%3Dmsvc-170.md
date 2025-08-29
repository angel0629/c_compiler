---
title: "_heapwalk"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Traverses the heap and returns information about the next entry.

## Syntax

```
int _heapwalk( _HEAPINFO *entryinfo );
```

### Parameters

_`entryinfo`_  
Buffer to contain heap information.

## Return value

**`_heapwalk`** returns one of the following integer manifest constants defined in Malloc.h.

Return value

Meaning

`_HEAPBADBEGIN`

Initial header information invalid or not found.

`_HEAPBADNODE`

Heap damaged or bad node found.

`_HEAPBADPTR`

The `_pentry` field of the `_HEAPINFO` structure doesn't contain a valid pointer into the heap or _`entryinfo`_ is a null pointer.

`_HEAPEND`

End of the heap reached successfully.

`_HEAPEMPTY`

Heap not initialized.

`_HEAPOK`

No errors so far; _`entryinfo`_ is updated with information about the next heap entry.

In addition, if an error occurs, **`_heapwalk`** sets `errno` to `ENOSYS`.

The **`_heapwalk`** function helps debug heap-related problems in programs. The function walks through the heap, traversing one entry per call, and returns a pointer to a structure of type `_HEAPINFO` that contains information about the next heap entry. The `_HEAPINFO` type, defined in Malloc.h, contains the following elements.

Field

Meaning

`int *_pentry`

Heap entry pointer.

`size_t _size`

Size of the heap entry.

`int _useflag`

Flag that indicates whether the heap entry is in use.

A call to **`_heapwalk`** that returns `_HEAPOK` stores the size of the entry in the `_size` field and sets the `_useflag` field to either `_FREEENTRY` or `_USEDENTRY` (both are constants defined in Malloc.h). To obtain this information about the first entry in the heap, pass **`_heapwalk`** a pointer to a `_HEAPINFO` structure whose `_pentry` member is `NULL`. If the operating system doesn't support **`_heapwalk`**, the function returns `_HEAPEND` and sets `errno` to `ENOSYS`.

This function validates its parameter. If _`entryinfo`_ is a null pointer, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, `errno` is set to `EINVAL` and the function returns `_HEAPBADPTR`.

## Requirements

Routine

Required header

Optional header

**`_heapwalk`**

<malloc.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_heapwalk.c

// This program "walks" the heap, starting
// at the beginning (_pentry = NULL). It prints out each
// heap entry's use, location, and size. It also prints
// out information about the overall state of the heap as
// soon as _heapwalk returns a value other than _HEAPOK
// or if the loop has iterated 100 times.

#include <stdio.h>
#include <malloc.h>

void heapdump(void);

int main(void)
{
    char *buffer;

    heapdump();
    if((buffer = (char *)malloc(59)) != NULL)
    {
        heapdump();
        free(buffer);
    }
    heapdump();
}

void heapdump(void)
{
    _HEAPINFO hinfo;
    int heapstatus;
    int numLoops;
    hinfo._pentry = NULL;
    numLoops = 0;
    while((heapstatus = _heapwalk(&hinfo)) == _HEAPOK &&
          numLoops < 100)
    {
        printf("%8s block at %Fp of size %4.4X\n",
               (hinfo._useflag == _USEDENTRY ? "USED" : "FREE"),
               hinfo._pentry, hinfo._size);
        numLoops++;
    }

    switch(heapstatus)
    {
    case _HEAPEMPTY:
        printf("OK - empty heap\n");
        break;
    case _HEAPEND:
        printf("OK - end of heap\n");
        break;
    case _HEAPBADPTR:
        printf("ERROR - bad pointer to heap\n");
        break;
    case _HEAPBADBEGIN:
        printf("ERROR - bad start of heap\n");
        break;
    case _HEAPBADNODE:
        printf("ERROR - bad node in heap\n");
        break;
    }
}
```

```
    USED block at 00310650 of size 0100
    USED block at 00310758 of size 0800
    USED block at 00310F60 of size 0080
    FREE block at 00310FF0 of size 0398
    USED block at 00311390 of size 000D
    USED block at 003113A8 of size 00B4
    USED block at 00311468 of size 0034
    USED block at 003114A8 of size 0039
...
    USED block at 00312228 of size 0010
    USED block at 00312240 of size 1000
    FREE block at 00313250 of size 1DB0
OK - end of heap
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`_heapadd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapadd?view=msvc-170)  
[`_heapchk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapchk?view=msvc-170)  
[`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170)  
[`_heapset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapset?view=msvc-170)
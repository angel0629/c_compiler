---
title: "_heapset"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapset?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Checks heaps for minimal consistency and sets the free entries to a specified value.

Important

This function is obsolete. Beginning in Visual Studio 2015, it is not available in the CRT.

## Syntax

```
int _heapset(
   unsigned int fill
);
```

#### Parameters

_`fill`_  
Fill character.

## Return value

**`_heapset`** returns one of the following integer manifest constants defined in Malloc.h.

Value

Description

`_HEAPBADBEGIN`

Initial header information invalid or not found.

`_HEAPBADNODE`

Heap damaged or bad node found.

`_HEAPEMPTY`

Heap not initialized.

`_HEAPOK`

Heap appears to be consistent.

In addition, if an error occurs, **`_heapset`** sets `errno` to `ENOSYS`.

The **`_heapset`** function shows free memory locations or nodes that have been unintentionally overwritten.

**`_heapset`** checks for minimal consistency on the heap and then sets each byte of the heap's free entries to the `fill` value. This known value shows which memory locations of the heap contain free nodes and which contain data that were unintentionally written to freed memory. If the operating system doesn't support **`_heapset`** (for example, Windows 98), the function returns `_HEAPOK` and sets `errno` to `ENOSYS`.

## Requirements

Routine

Required header

Optional header

**`_heapset`**

<malloc.h>

<errno.h>

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170) in the Introduction.

## Example

```
// crt_heapset.c
// This program checks the heap and
// fills in free entries with the character 'Z'.

#include <malloc.h>
#include <stdio.h>
#include <stdlib.h>

int main( void )
{
   int heapstatus;
   char *buffer;

   if( (buffer = malloc( 1 )) == NULL ) // Make sure heap is
      exit( 0 );                        //    initialized
   heapstatus = _heapset( 'Z' );        // Fill in free entries
   switch( heapstatus )
   {
   case _HEAPOK:
      printf( "OK - heap is fine\n" );
      break;
   case _HEAPEMPTY:
      printf( "OK - heap is empty\n" );
      break;
   case _HEAPBADBEGIN:
      printf( "ERROR - bad start of heap\n" );
      break;
   case _HEAPBADNODE:
      printf( "ERROR - bad node in heap\n" );
      break;
   }
   free( buffer );
}
```

```
OK - heap is fine
```

## See also

[Memory allocation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/memory-allocation?view=msvc-170)  
[`_heapadd`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/heapadd?view=msvc-170)  
[`_heapchk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapchk?view=msvc-170)  
[`_heapmin`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapmin?view=msvc-170)  
[`_heapwalk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170)
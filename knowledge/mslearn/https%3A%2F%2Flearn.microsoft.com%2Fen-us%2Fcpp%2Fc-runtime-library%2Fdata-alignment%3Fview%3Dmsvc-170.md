---
title: "Data Alignment"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-alignment?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The following C run-time functions support data alignment.

## Data-alignment routines

Routine

Use

[`_aligned_free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free?view=msvc-170)

Frees a block of memory that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170).

[`_aligned_free_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free-dbg?view=msvc-170)

Frees a block of memory that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) (debug only).

[`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170)

Allocates memory on a specified alignment boundary.

[`_aligned_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc-dbg?view=msvc-170)

Allocates memory on a specified alignment boundary with extra space for a debugging header and overwrite buffers (debug version only).

[`_aligned_msize`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-msize?view=msvc-170)

Returns the size of a memory block allocated in the heap.

[`_aligned_msize_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-msize-dbg?view=msvc-170)

Returns the size of a memory block allocated in the heap (debug version only).

[`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170)

Allocates memory on a specified alignment boundary.

[`_aligned_offset_malloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc-dbg?view=msvc-170)

Allocates memory on a specified alignment boundary (debug version only).

[`_aligned_offset_realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-realloc?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170).

[`_aligned_offset_realloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-realloc-dbg?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) (debug version only).

[`_aligned_offset_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-recalloc?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) and initializes the memory to 0.

[`_aligned_offset_recalloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-recalloc-dbg?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) and initializes the memory to 0 (debug version only).

[`_aligned_realloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-realloc?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170).

[`_aligned_realloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-realloc-dbg?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) (debug version only).

[`_aligned_recalloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-recalloc?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) and initializes the memory to 0.

[`_aligned_recalloc_dbg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-recalloc-dbg?view=msvc-170)

Changes the size of a memory block that was allocated with [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) or [`_aligned_offset_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-offset-malloc?view=msvc-170) and initializes the memory to 0 (debug version only).

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
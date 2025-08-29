---
title: "Buffer manipulation"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/buffer-manipulation?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use these routines to work with areas of memory on a byte-by-byte basis.

## Buffer-manipulation routines

Routine

Use

[`_memccpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memccpy?view=msvc-170)

Copy characters from one buffer to another until given character or given number of characters has been copied

[`memchr`, `wmemchr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memchr-wmemchr?view=msvc-170)

Return pointer to first occurrence, within specified number of characters, of given character in buffer

[`memcmp`, `wmemcmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcmp-wmemcmp?view=msvc-170)

Compare specified number of characters from two buffers

[`memcpy`, `wmemcpy`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-wmemcpy?view=msvc-170), [`memcpy_s`, `wmemcpy_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memcpy-s-wmemcpy-s?view=msvc-170)

Copy specified number of characters from one buffer to another

[`_memicmp`, `_memicmp_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memicmp-memicmp-l?view=msvc-170)

Compare specified number of characters from two buffers without regard to case

[`memmove`, `wmemmove`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-wmemmove?view=msvc-170), [`memmove_s`, `wmemmove_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memmove-s-wmemmove-s?view=msvc-170)

Copy specified number of characters from one buffer to another

[`memset`, `wmemset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/memset-wmemset?view=msvc-170)

Use given character to initialize specified number of bytes in the buffer

[`_swab`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/swab?view=msvc-170)

Swap bytes of data and store them at specified location

When the source and target areas overlap, only `memmove` is guaranteed to copy the full source properly.

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
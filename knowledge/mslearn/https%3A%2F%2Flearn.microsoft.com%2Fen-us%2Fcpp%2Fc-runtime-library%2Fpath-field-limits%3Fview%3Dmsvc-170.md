---
title: "Path Field Limits"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/path-field-limits?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
These constants define the maximum length for the path and for the individual fields within the path.

Note

The C Runtime supports path lengths up to 32768 characters in length, but it is up to the operating system, specifically the file system, to support these longer paths. The sum of the fields should not exceed `_MAX_PATH` for full backwards compatibility with FAT32 file systems. The Windows NTFS file system supports paths up to 32768 characters in length, but only when using the Unicode APIs. When using long path names, prefix the path with the characters \\\\?\\ and use the Unicode versions of the C Runtime functions.
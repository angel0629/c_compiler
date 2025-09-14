---
title: "UNIX"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/unix?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
If you plan to port your programs to UNIX, follow these guidelines:

*   Don't remove header files from the SYS subdirectory. You can place the SYS header files elsewhere only if you don't plan to transport your programs to UNIX.
    
*   Use the UNIX-compatible path delimiter in routines that take strings representing paths and filenames as arguments. UNIX supports only the forward slash (/) for this purpose, but Win32 operating systems support both the backslash (\\) and the forward slash (/). This documentation uses UNIX-compatible forward slashes as path delimiters in `#include` statements, for example. (However, the Windows operating system command shell, CMD.EXE, doesn't support the forward slash in commands entered at the command prompt.)
    
*   Use paths and filenames that work correctly in UNIX, which is case-sensitive. The file allocation table (FAT) file system in Win32 operating systems isn't case-sensitive. The NTFS file system preserves case for directory listings, but ignores case in file searches and other system operations.
    

Note

In this version of Visual C++, UNIX compatibility information has been removed from the function descriptions.

## See also

[Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170)
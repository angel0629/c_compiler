---
title: "_stat, _stat32, _stat64, _stati64, _stat32i64, _stat64i32, _wstat, _wstat32, _wstat64, _wstati64, _wstat32i64, _wstat64i32"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Get status information on a file.

## Syntax

```
int _stat(
   const char *path,
   struct _stat *buffer
);
int _stat32(
   const char *path,
   struct __stat32 *buffer
);
int _stat64(
   const char *path,
   struct __stat64 *buffer
);
int _stati64(
   const char *path,
   struct _stati64 *buffer
);
int _stat32i64(
   const char *path,
   struct _stat32i64 *buffer
);
int _stat64i32(
   const char *path,
   struct _stat64i32 *buffer
);
int _wstat(
   const wchar_t *path,
   struct _stat *buffer
);
int _wstat32(
   const wchar_t *path,
   struct __stat32 *buffer
);
int _wstat64(
   const wchar_t *path,
   struct __stat64 *buffer
);
int _wstati64(
   const wchar_t *path,
   struct _stati64 *buffer
);
int _wstat32i64(
   const wchar_t *path,
   struct _stat32i64 *buffer
);
int _wstat64i32(
   const wchar_t *path,
   struct _stat64i32 *buffer
);
```

### Parameters

_`path`_  
Pointer to a string containing the path of existing file or directory.

_`buffer`_  
Pointer to structure that stores results.

## Return value

Each of these functions returns 0 if the file-status information is obtained. A return value of -1 indicates an error, in which case `errno` is set to `ENOENT`, indicating that the filename or path couldn't be found. A return value of `EINVAL` indicates an invalid parameter; `errno` is also set to `EINVAL` in this case.

For more information about return codes, see [`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170).

The date stamp on a file can be represented if it's later than midnight, January 1, 1970, and before 23:59:59, December 31, 3000, UTC, unless you use **`_stat32`** or **`_wstat32`**, or have defined `_USE_32BIT_TIME_T`, in which case the date can be represented only until 23:59:59 January 18, 2038, UTC.

The **`_stat`** function obtains information about the file or directory specified by _`path`_ and stores it in the structure pointed to by _`buffer`_. **`_stat`** automatically handles multibyte-character string arguments as appropriate, recognizing multibyte-character sequences according to the multibyte code page currently in use.

**`_wstat`** is a wide-character version of **`_stat`**; the _`path`_ argument to **`_wstat`** is a wide-character string. **`_wstat`** and **`_stat`** behave identically except that **`_wstat`** doesn't handle multibyte-character strings.

Variations of these functions support 32-bit or 64-bit time types, and 32-bit or 64-bit file lengths. The first numerical suffix (**`32`** or **`64`**) indicates the size of the time type used; the second suffix is either **`i32`** or **`i64`**, indicating whether the file size is represented as a 32-bit or 64-bit integer.

**`_stat`** is equivalent to **`_stat64i32`**, and **`struct _stat`** contains a 64-bit time, unless `_USE_32BIT_TIME_T` is defined, in which case the old behavior is in effect; **`_stat`** uses a 32-bit time, and **`struct _stat`** contains a 32-bit time. The same is true for **`_stati64`**.

Note

**`_wstat`** does not work with Windows Vista symbolic links. In these cases, **`_wstat`** will always report a file size of 0. **`_stat`** does work correctly with symbolic links. The `_stat` family of functions use `CreateFile` in Visual Studio 2015, instead of `FindFirstFile` as in Visual Studio 2013 and earlier. This means that `_stat` on a path ending with a slash succeeds if the path refers to a directory, as opposed to before when the function would error with `errno` set to `ENOENT`.

This function validates its parameters. If either _`path`_ or _`buffer`_ is `NULL`, the invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170).

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

### Time type and file length type variations of `_stat`

Functions

`_USE_32BIT_TIME_T` defined

Time type

File length type

**`_stat`**, **`_wstat`**

Not defined

64-bit

32-bit

**`_stat`**, **`_wstat`**

Defined

32-bit

32-bit

**`_stat32`**, **`_wstat32`**

Not affected by the macro definition

32-bit

32-bit

**`_stat64`**, **`_wstat64`**

Not affected by the macro definition

64-bit

64-bit

**`_stati64`**, **`_wstati64`**

Not defined

64-bit

64-bit

**`_stati64`**, **`_wstati64`**

Defined

32-bit

64-bit

**`_stat32i64`**, **`_wstat32i64`**

Not affected by the macro definition

32-bit

64-bit

**`_stat64i32`**, **`_wstat64i32`**

Not affected by the macro definition

64-bit

32-bit

### Generic-text routine mappings

`TCHAR.H` routine

`_UNICODE` and `_MBCS` not defined

`_MBCS` defined

`_UNICODE` defined

`_tstat`

**`_stat`**

**`_stat`**

**`_wstat`**

`_tstat64`

**`_stat64`**

**`_stat64`**

**`_wstat64`**

`_tstati64`

**`_stati64`**

**`_stati64`**

**`_wstati64`**

`_tstat32i64`

**`_stat32i64`**

**`_stat32i64`**

**`_wstat32i64`**

`_tstat64i32`

**`_stat64i32`**

**`_stat64i32`**

**`_wstat64i32`**

The **`_stat`** structure, defined in **`SYS\STAT.H`**, includes the following fields.

Field

Description

**`st_gid`**

Numeric identifier of group that owns the file (UNIX-specific) This field will always be zero on Windows systems. A redirected file is classified as a Windows file.

**`st_atime`**

Time of last access of file. Valid on NTFS but not on FAT formatted disk drives.

**`st_ctime`**

Time of creation of file. Valid on NTFS but not on FAT formatted disk drives.

**`st_dev`**

Drive number of the disk containing the file (same as **`st_rdev`**).

**`st_ino`**

Number of the information node (the **`inode`**) for the file (UNIX-specific). On UNIX file systems, the **`inode`** describes the file date and time stamps, permissions, and content. When files are hard-linked to one another, they share the same **`inode`**. The **`inode`**, and therefore **`st_ino`**, has no meaning in the FAT, HPFS, or NTFS file systems.

**`st_mode`**

Bit mask for file-mode information. The `_S_IFDIR` bit is set if _`path`_ specifies a directory; the `_S_IFREG` bit is set if _`path`_ specifies an ordinary file or a device. User read/write bits are set according to the file's permission mode; user execute bits are set according to the filename extension.

**`st_mtime`**

Time of last modification of file.

**`st_nlink`**

Always 1 on non-NTFS file systems.

**`st_rdev`**

Drive number of the disk containing the file (same as **`st_dev`**).

**`st_size`**

Size of the file in bytes; a 64-bit integer for variations with the **`i64`** suffix.

**`st_uid`**

Numeric identifier of user who owns file (UNIX-specific). This field will always be zero on Windows systems. A redirected file is classified as a Windows file.

If _`path`_ refers to a device, the **`st_size`**, various time fields, **`st_dev`**, and **`st_rdev`** fields in the **`_stat`** structure are meaningless. Because **`STAT.H`** uses the [`_dev_t`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) type that is defined in **`TYPES.H`**, you must include **`TYPES.H`** before **`STAT.H`** in your code.

## Requirements

Routine

Required header

Optional headers

**`_stat`**, **`_stat32`**, **`_stat64`**, **`_stati64`**, **`_stat32i64`**, **`_stat64i32`**

`<sys/types.h>` followed by `<sys/stat.h>`

`<errno.h>`

**`_wstat`**, **`_wstat32`**, **`_wstat64`**, **`_wstati64`**, **`_wstat32i64`**, **`_wstat64i32`**

`<sys/types.h>` followed by `<sys/stat.h>` or `<wchar.h>`

`<errno.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_stat.c
// This program uses the _stat function to
// report information about the file named crt_stat.c.

#include <time.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <errno.h>

int main( void )
{
   struct _stat buf;
   int result;
   char timebuf[26];
   char* filename = "crt_stat.c";
   errno_t err;

   // Get data associated with "crt_stat.c":
   result = _stat( filename, &buf );

   // Check if statistics are valid:
   if( result != 0 )
   {
      perror( "Problem getting information" );
      switch (errno)
      {
         case ENOENT:
           printf("File %s not found.\n", filename);
           break;
         case EINVAL:
           printf("Invalid parameter to _stat.\n");
           break;
         default:
           /* Should never be reached. */
           printf("Unexpected error in _stat.\n");
      }
   }
   else
   {
      // Output some of the statistics:
      printf( "File size     : %ld\n", buf.st_size );
      printf( "Drive         : %c:\n", buf.st_dev + 'A' );
      err = ctime_s(timebuf, 26, &buf.st_mtime);
      if (err)
      {
         printf("Invalid arguments to ctime_s.");
         exit(1);
      }
      printf( "Time modified : %s", timebuf );
   }
}
```

```
File size     : 732
Drive         : C:
Time modified : Thu Feb 07 14:39:36 2002
```

## See also

[File handling](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-handling?view=msvc-170)  
[`_access`, `_waccess`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/access-waccess?view=msvc-170)  
[`_fstat`, `_fstat32`, `_fstat64`, `_fstati64`, `_fstat32i64`, `_fstat64i32`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170)  
[`_getmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getmbcp?view=msvc-170)  
[`_setmbcp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmbcp?view=msvc-170)
---
title: "Standard Types"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The Microsoft run-time library defines the following standard types and typedefs.

### Fixed-width integral types (`stdint.h`)

Name

Equivalent built-in type

`int8_t`, `uint8_t`

`signed char`, `unsigned char`

`int16_t`, `uint16_t`

`short`, `unsigned short`

`int32_t`, `uint32_t`

`int`, `unsigned int`

`int64_t`, `uint64_t`

`long long`, `unsigned long long`

`int_least8_t`, `uint_least8_t`

`signed char`, `unsigned char`

`int_least16_t`, `uint_least16_t`

`short`, `unsigned short`

`int_least32_t`, `uint_least32_t`

`int`, `unsigned int`

`int_least64_t`, `uint_least64_t`

`long long`, `unsigned long long`

`int_fast8_t`, `uint_fast8_t`

`signed char`, `unsigned char`

`int_fast16_t`, `uint_fast16_t`

`int`, `unsigned int`

`int_fast32_t`, `uint_fast32_t`

`int`, `unsigned int`

`int_fast64_t`, `uint_fast64_t`

`long long`, `unsigned long long`

`intmax_t`, `uintmax_t`

`long long`, `unsigned long long`

Type

Description

Declared in

`clock_t` (long)

Stores time values; used by [`clock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clock?view=msvc-170).

`TIME.H`

`_complex` structure

Stores real and imaginary parts of complex numbers; used by [`_cabs`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/cabs?view=msvc-170).

`MATH.H`

`_CRT_ALLOC_HOOK`

A type definition for the user-defined hook function. Used in [`_CrtSetAllocHook`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtsetallochook?view=msvc-170).

`CRTDBG.H`

`_CRT_DUMP_CLIENT`,

`_CRT_DUMP_CLIENT_M`

A type definition for a call-back function that will get called in [`_CrtMemDumpAllObjectsSince`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtmemdumpallobjectssince?view=msvc-170).

`CRTDBG.H`

`_CrtMemState` structure

Provides information about the current state of the C run-time debug heap.

`CRTDBG.H`

`_CRT_REPORT_HOOK`,

`_CRT_REPORT_HOOKW`,

`_CRT_REPORT_HOOKW_M`

A type definition for a call-back function that will get called in [`_CrtDbgReport`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/crtdbgreport-crtdbgreportw?view=msvc-170).

The parameters for this function are: report type, output message and the return value from the call-back function.

`CRTDBG.H`

`dev_t`, `_dev_t` short or unsigned integer

Represents device handles.

`SYS\TYPES.H`

`_diskfree_t` structure

Contains information about a disk drive. Used by [`_getdiskfree`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getdiskfree?view=msvc-170)**.**

`DOS.H` and `DIRECT.H`

`div_t`, `ldiv_t` and `lldiv_t` structures

Store values returned by [`div`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170), [`ldiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170), and [`lldiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/div?view=msvc-170), respectively.

`STDLIB.H`

`errno_t` integer

Used for a function return type or parameter that deals with the error codes of `errno`.

`STDDEF.H`,

`CRTDEFS.H`

`_exception` structure

Stores error information for [`_matherr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/matherr?view=msvc-170).

`MATH.H`

`_EXCEPTION_POINTERS`

Contains an exception record. For more information, see [`EXCEPTION_POINTERS`](https://learn.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-exception_pointers).

`FPIEEE.H`

`FILE` structure

Stores information about current state of stream; used in all stream I/O operations.

`STDIO.H`

`_finddata_t`, `_wfinddata_t`, `_finddata32_t`, `_wfinddata32_t`, `_finddatai64_t`, `_wfinddatai64_t`, `__finddata64_t`, `_wfinddata64_t`, `__finddata32i64_t`, `__wfinddata32i64_t`, `__finddata64i32_t`, `__wfinddata64i32_t` structures

Store file-attribute information returned by [`_findfirst`, `_wfindfirst`, and related functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findfirst-functions?view=msvc-170) and [`_findnext`, `_wfindnext` and related functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/findnext-functions?view=msvc-170). See [Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170) for information on structure members.

`IO.H`, `WCHAR.H`

`_FPIEEE_RECORD` structure

Contains information pertaining to IEEE floating-point exception; passed to user-defined trap handler by [`_fpieee_flt`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fpieee-flt?view=msvc-170).

`FPIEEE.H`

`fpos_t` (`long integer`, **`__int64`**, or structure, depending on the target platform)

Used by [`fgetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fgetpos?view=msvc-170) and [`fsetpos`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fsetpos?view=msvc-170) to record information for uniquely specifying every position within a file.

`STDIO.H`

`_fsize_t` (`unsigned long integer`)

Used to represent the size of a file.

`IO.H`,

`WCHAR.H`

`_HEAPINFO` structure

Contains information about next heap entry for [`_heapwalk`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/heapwalk?view=msvc-170).

`MALLOC.H`

`_HFILE` (void \*)

An operating system file handle.

`CRTDBG.H`

`imaxdiv_t`

The type of value that's returned by the [`imaxdiv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/imaxdiv?view=msvc-170) function, containing both the quotient and the remainder.

`inttypes.h`

`ino_t`, `_ino_t` (`unsigned short`)

For returning status information.

`WCHAR.H`

`intmax_t`

A signed integer type capable of representing any value of any signed integer type.

stdint.h

`intptr_t` (`long integer` or **`__int64`**, depending on the target platform)

Stores a pointer (or `HANDLE`) on both Win32 and Win64 platforms.

`STDDEF.H` and other include files

`jmp_buf` array

Used by [`setjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setjmp?view=msvc-170) and [`longjmp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/longjmp?view=msvc-170) to save and restore program environment.

`SETJMP.H`

`lconv` structure

Contains formatting rules for numeric values in different countries/regions. Used by [`localeconv`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localeconv?view=msvc-170).

`LOCALE.H`

`_LDOUBLE`,

`_LONGDOUBLE`,

`_LDBL12` (long double or an unsigned char array)

Use to represent a long double value.

`STDLIB.H`

`_locale_t` structure

Stores current locale values; used in all locale specific C run-time libraries.

`CRTDEFS.H`

`mbstate_t`

Tracks the state of a multibyte character conversion.

`WCHAR.H`

`off_t`, `_off_t` `long integer`

Represents file-offset value.

`WCHAR.H`, `SYS\TYPES.H`

`_onexit_t`,

`_onexit_m_t` pointer

Returned by [`_onexit`, `_onexit_m`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/onexit-onexit-m?view=msvc-170).

`STDLIB.H`

`_PNH` pointer to function

Type of argument to [`_set_new_handler`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-new-handler?view=msvc-170).

`NEW.H`

`ptrdiff_t` (long integer or **`__int64`**, depending on the target platform)

Result of subtraction of two pointers.

`CRTDEFS.H`

`_purecall_handler`,

`_purecall_handler_m`

A type definition for a call-back function that is called when a pure virtual function is called. Used by [`_get_purecall_handler`, \_set\_purecall\_handler](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-purecall-handler-set-purecall-handler?view=msvc-170). A `_purecall_handler` function should have a void return type.

`STDLIB.H`

`_RTC_error_fn` type definition

A type definition for a function that will handle run-time error checks. Used in [`_RTC_SetErrorFunc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrorfunc?view=msvc-170).

`RTCAPI.H`

`_RTC_error_fnW` type definition

A type definition for a function that will handle run-time error checks. Used in [`_RTC_SetErrorFuncW`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrorfuncw?view=msvc-170).

`RTCAPI.H`

`_RTC_ErrorNumber` enumeration

Defines error conditions for [`_RTC_GetErrDesc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-geterrdesc?view=msvc-170) and [`_RTC_SetErrorType`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/rtc-seterrortype?view=msvc-170).

`RTCAPI.H`

`_se_translator_function`

A type definition for a call-back function that translates an exception. The first parameter is the exception code and the second parameter is the exception record. Used by [`_set_se_translator`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-se-translator?view=msvc-170).

`EH.H`

`sig_atomic_t` integer

Type of object that can be modified as atomic entity, even in presence of asynchronous interrupts; used with [`signal`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/signal?view=msvc-170).

`SIGNAL.H`

`size_t` (`unsigned __int64` or `unsigned integer`, depending on the target platform)

Result of **`sizeof`** operator.

`CRTDEFS.H` and other include files

`_stat` structure

Contains file-status information returned by [`_stat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170) and [`_fstat`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170).

`SYS\STAT.H`

`__stat64` structure

Contains file-status information returned by [`_fstat64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170) and [`_stat64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170), and [`_wstat64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170).

`SYS\STAT.H`

`_stati64` structure

Contains file-status information returned by [`_fstati64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fstat-fstat32-fstat64-fstati64-fstat32i64-fstat64i32?view=msvc-170), [`_stati64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170), and [`_wstati64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/stat-functions?view=msvc-170).

`SYS\STAT.H`

`terminate_function` type definition

A type definition for a call-back function that is called when [`terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/terminate-crt?view=msvc-170) is called. Used by [`set_terminate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-terminate-crt?view=msvc-170).

`EH.H`

`time_t` (`__int64` or `long integer`)

Represents time values in [`mktime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170), [`time`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170), [`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170), [`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, \_wctime32\_s, \_wctime64\_s](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170), [`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170) and [`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170). The number of seconds since January 1, 1970, 0:00 UTC. If `_USE_32BIT_TIME_T` is defined, `time_t` is a long integer. If not defined, it's a 64-bit integer.

`TIME.H`,

`SYS\STAT.H`,

`SYS\TIMEB.H`

`__time32_t` (`long integer`)

Represents time values in [`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170), [`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170), [`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170), [`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170) and [`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170).

`CRTDEFS.H`, `SYS\STAT.H`,

`SYS\TIMEB.H`

`__time64_t` (**`__int64`**)

Represents time values in [`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170), [`_ctime64`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170), [`ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170), [`_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170), [`_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170) and [`_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170).

`TIME.H`,

`SYS\STAT.H`,

`SYS\TIMEB.H`

`_timeb` structure

The [`_ftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170) and [`_ftime_s`, `_ftime32_s`, `_ftime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-s-ftime32-s-ftime64-s?view=msvc-170) functions use it to store current system time.

`SYS\TIMEB.H`

`__timeb32` structure

The [`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170) and [`_ftime_s`, `_ftime32_s`, `_ftime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-s-ftime32-s-ftime64-s?view=msvc-170) functions use it to store current system time.

`SYS\TIMEB.H`

`__timeb64` structure

The [`_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170) and [`_ftime_s`, `_ftime32_s`, `_ftime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-s-ftime32-s-ftime64-s?view=msvc-170) functions use it to store current system time.

`SYS\TIMEB.H`

`tm` structure

The [`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170), [`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170), [`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170), [`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170), [`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170), [`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170), [`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170) and [`strftime`, `wcsftime`, \_strftime\_l, \_wcsftime\_l](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170) functions use it to store and retrieve time information.

`TIME.H`

`uintmax_t`

An `unsigned integer` type capable of representing any value of any `unsigned integer` type.

`stdint.h`

`uintptr_t` (`long integer` or **`__int64`**, depending on the target platform)

An `unsigned integer` or `unsigned __int64` version of `intptr_t`.

`STDDEF.H` and other include files

`unexpected_function`

A type definition for a call-back function that is called when [`unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/unexpected-crt?view=msvc-170) is called. Used by [`set_unexpected`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-unexpected-crt?view=msvc-170).

`EH.H`

`_utimbuf` structure

Stores file access and modification times used by [`_utime`, `_wutime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/utime-utime32-utime64-wutime-wutime32-wutime64?view=msvc-170) and [`_futime`, `_futime32`, `_futime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/futime-futime32-futime64?view=msvc-170) to change file-modification dates.

`SYS\UTIME.H`

`_utimbuf32` structure

Stores file access and modification times used by [`_utime`, `_utime32`, `_utime64`, `_wutime`, `_wutime32`, `_wutime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/utime-utime32-utime64-wutime-wutime32-wutime64?view=msvc-170) and [`_futime`, `_futime32`, `_futime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/futime-futime32-futime64?view=msvc-170) to change file-modification dates.

`SYS\UTIME.H`

`__utimbuf64` structure

The [`_utime64`, `_wutime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/utime-utime32-utime64-wutime-wutime32-wutime64?view=msvc-170) and [`_futime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/futime-futime32-futime64?view=msvc-170) functions use it to store the current time.

`SYS\UTIME.H`

`va_list` structure

Used to hold information needed by [`va_arg`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/va-arg-va-copy-va-end-va-start?view=msvc-170) and [`va_end`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/va-arg-va-copy-va-end-va-start?view=msvc-170) macros. Called function declares variable of type `va_list` that can be passed as argument to another function.

`STDARG.H`,

`CRTDEFS.H`

**`wchar_t`** wide character

Useful for writing portable programs for international markets.

`STDDEF.H`, `STDLIB.H`,

`CRTDEFS.H`,

`SYS\STAT.H`

`wctrans_t` integer

Represents locale-specific character mappings.

`WCTYPE.H`

`wctype_t` integer

Can represent all characters of any language character set.

`WCHAR.H`,

`CRTDEFS.H`

`wint_t` integer

Type of data object that can hold any wide character or wide end-of-file value.

`WCHAR.H`,

`CRTDEFS.H`

## See also

[C runtime library reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)
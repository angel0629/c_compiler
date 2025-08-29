---
title: "Time Management"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Use these functions to get the current time and convert, adjust, and store it as necessary. The current time is the system time.

The **`_ftime`** and **`localtime`** routines use the **`TZ`** environment variable. If **`TZ`** isn't set, the run-time library attempts to use the time-zone information specified by the operating system. If this information is unavailable, these functions use the default value of PST8PDT. For more information on **`TZ`**, see [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170); also see [`_daylight`, `timezone`, and `_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/daylight-dstbias-timezone-and-tzname?view=msvc-170).

### Time routines

Function

Use

[`asctime`, `_wasctime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-wasctime?view=msvc-170), [`asctime_s`, `_wasctime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/asctime-s-wasctime-s?view=msvc-170)

Convert time from type **`struct tm`** to character string. The versions of these functions with the **`_s`** suffix are more secure.

[`clock`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/clock?view=msvc-170)

Return elapsed wall-clock time for process.

[`ctime`, `_ctime32`, `_ctime64`, `_wctime`, `_wctime32`, `_wctime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-ctime32-ctime64-wctime-wctime32-wctime64?view=msvc-170), [`_ctime_s`, `_ctime32_s`, `_ctime64_s`, `_wctime_s`, `_wctime32_s`, `_wctime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ctime-s-ctime32-s-ctime64-s-wctime-s-wctime32-s-wctime64-s?view=msvc-170)

Convert time from type **`time_t`**, **`__time32_t`** or **`__time64_t`** to character string. The versions of these functions with the **`_s`** suffix are more secure.

[`difftime`, `_difftime32`, `_difftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/difftime-difftime32-difftime64?view=msvc-170)

Compute difference between two times.

[`_ftime`, `_ftime32`, `_ftime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), [`_ftime_s`, `_ftime32_s`, \_ftime64\_s](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-s-ftime32-s-ftime64-s?view=msvc-170)

Store current system time in variable of type **`struct _timeb`** or type **`struct __timeb64`** The versions of these functions with the **`_s`** suffix are more secure.

[`_futime`, `_futime32`, `_futime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/futime-futime32-futime64?view=msvc-170)

Set modification time on open file

[`gmtime`, `_gmtime32`, `_gmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-gmtime32-gmtime64?view=msvc-170), [`gmtime_s`, `_gmtime32_s`, `_gmtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/gmtime-s-gmtime32-s-gmtime64-s?view=msvc-170)

Convert time from type **`time_t`** to **`struct tm`** or from type **`__time64_t`** to **`struct tm`**. The versions of these functions with the **`_s`** suffix are more secure.

[`localtime`, `_localtime32`, `_localtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170), [`localtime_s`, `_localtime32_s`, `_localtime64_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-s-localtime32-s-localtime64-s?view=msvc-170)

Convert time from type **`time_t`** to **`struct tm`** or from type **`__time64_t`** to **`struct tm`** with local correction. The versions of these functions with the **`_s`** suffix are more secure.

[`_mkgmtime`, `_mkgmtime32`, `_mkgmtime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mkgmtime-mkgmtime32-mkgmtime64?view=msvc-170)

Convert time to calendar value in Greenwich Mean Time.

[`mktime`, `_mktime32`, `_mktime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170)

Convert time to calendar value.

[`_strdate`, `_wstrdate`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-wstrdate?view=msvc-170), [`_strdate_s`, `_wstrdate_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strdate-s-wstrdate-s?view=msvc-170)

Return current system date as string. The versions of these functions with the **`_s`** suffix are more secure.

[`strftime`, `wcsftime`, `_strftime_l`, `_wcsftime_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170)

Format date-and-time string for international use.

[`_strtime`, `_wstrtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-wstrtime?view=msvc-170), [`_strtime_s`, `_wstrtime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strtime-s-wstrtime-s?view=msvc-170)

Return current system time as string. The versions of these functions with the **`_s`** suffix are more secure.

[`time`, `_time32`, `_time64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/time-time32-time64?view=msvc-170)

Get current system time as type **`time_t`**, **`__time32_t`** or as type **`__time64_t`**.

[`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170)

Set external time variables from environment time variable **`TZ`**.

[`_utime`, `_utime32`, `_utime64`, `_wutime`, `_wutime32`, `_wutime64`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/utime-utime32-utime64-wutime-wutime32-wutime64?view=msvc-170)

Set modification time for specified file using either current time or time value stored in structure.

Note

In all versions of Microsoft C/C++ except Microsoft C/C++ version 7.0, and in all versions of Visual C++, the time function returns the current time as the number of seconds elapsed since midnight on January 1, 1970. In Microsoft C/C++ version 7.0, **`time`** returned the current time as the number of seconds elapsed since midnight on December 31, 1899.

Note

In versions of Visual C++ and Microsoft C/C++ before Visual Studio 2005, **`time_t`** was a **`long int`** (32 bits) and hence could not be used for dates past 3:14:07 January 19, 2038, UTC. **`time_t`** is now equivalent to **`__time64_t`** by default, but defining `_USE_32BIT_TIME_T` changes **`time_t`** to **`__time32_t`** and forces many time functions to call versions that take the 32-bit **`time_t`**. For more information, see [Standard types](https://learn.microsoft.com/en-us/cpp/c-runtime-library/standard-types?view=msvc-170) and comments in the documentation for the individual time functions.

## See also

[Universal C runtime routines by category](https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170)
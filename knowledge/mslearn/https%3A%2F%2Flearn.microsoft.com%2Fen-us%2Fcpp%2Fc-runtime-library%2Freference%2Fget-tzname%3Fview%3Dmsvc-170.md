---
title: "_get_tzname"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Retrieves the character string representation of the time zone name or the daylight standard time (DST) zone name.

## Syntax

```
errno_t _get_tzname(
    size_t* pReturnValue,
    char* timeZoneName,
    size_t sizeInBytes,
    int index
);
```

### Parameters

_`pReturnValue`_  
The string length of _`timeZoneName`_ including a `NULL` terminator.

_`timeZoneName`_  
The address of a character string for the representation of the time zone name or the daylight standard time zone name (DST), depending on _`index`_.

_`sizeInBytes`_  
The size of the _`timeZoneName`_ character string in bytes.

_`index`_  
The _`index`_ of one of the two time zone names to retrieve.

_`index`_

Contents of _`timeZoneName`_

_`timeZoneName`_ default value

0

Time zone name

`"PST"`

1

Daylight standard time zone name

`"PDT"`

\> 1 or < 0

`errno` set to `EINVAL`

not modified

Unless explicitly updated during runtime, `"PST"` is returned for the standard time zone and `"PDT"` for the daylight standard time zone. For more information, see the [Remarks](#remarks).

The time zone string isn't guaranteed to be the same between OS releases. Official time zone names can and do change.

## Return value

Zero if successful, otherwise an `errno` type value.

If either _`timeZoneName`_ is `NULL`, or _`sizeInBytes`_ is zero or less than zero (but not both), an invalid parameter handler is invoked, as described in [Parameter validation](https://learn.microsoft.com/en-us/cpp/c-runtime-library/parameter-validation?view=msvc-170). If execution is allowed to continue, this function sets `errno` to `EINVAL` and returns `EINVAL`.

### Error conditions

_`pReturnValue`_

_`timeZoneName`_

_`sizeInBytes`_

_`index`_

Return value

Contents of _`timeZoneName`_

size of TZ name

`NULL`

0

0 or 1

0

not modified

size of TZ name

any

\> 0

0 or 1

0

TZ name

not modified

`NULL`

\> 0

any

`EINVAL`

not modified

not modified

any

zero

any

`EINVAL`

not modified

not modified

any

\> 0

\> 1

`EINVAL`

not modified

The `_get_tzname` function retrieves the character string representation of the current time zone name or the daylight standard time zone name (DST) into the address of _`timeZoneName`_ depending on the _`index`_ value, along with the size of the string in _`pReturnValue`_. If _`timeZoneName`_ is `NULL` and _`sizeInBytes`_ is zero, the size of the string in bytes required to hold both the specified time zone, and a terminating `NULL`, is returned in _`pReturnValue`_.

The _`index`_ values must be either 0 for standard time zone or 1 for daylight standard time zone; any other values have undetermined results.

By default, `"PST"` is returned for the standard time zone and `"PDT"` for the daylight standard time zone. The true time zone name is updated the first time it's needed by a function that requires time zone information, such as [`strftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/strftime-wcsftime-strftime-l-wcsftime-l?view=msvc-170), [`ftime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-ftime32-ftime64?view=msvc-170), [`ftime_s`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftime-s-ftime32-s-ftime64-s?view=msvc-170), [`mktime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktime-mktime32-mktime64?view=msvc-170), [`localtime`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/localtime-localtime32-localtime64?view=msvc-170), and others. If a function that doesn't require time zone information isn't called prior to calling `_get_tzname`, the default values are returned unless you first explicitly update them using one of the functions mentioned, or by a call to [`tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170). Also, if the `TZ` environment variable is set, it takes precedence over the time zone name reported by the OS. Even in this case, one of the functions mentioned above must be called before `_get_tzname` is called or the default time zone value will be returned. For more information about the `TZ` environment variable and the CRT, see [`_tzset`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/tzset?view=msvc-170).

Warning

The time zone string is not guaranteed to be the same between OS releases. Official time zone names can and do change.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Example

This sample calls `_get_tzname` to get the required buffer size to display the current Daylight standard time zone name, allocates a buffer of that size, calls `_get_tzname` again to load the name in the buffer, and prints it to the console.

It also calls `_tzset()` to cause the OS to update the time zone information before calling `_get_tzname()`. Otherwise, the default values are used.

```
// crt_get_tzname.c
// Compile by using: cl /W4 crt_get_tzname.c
#include <stdio.h>
#include <time.h>
#include <malloc.h>

enum TZindex {
    STD,
    DST
};

int main()
{
    size_t tznameSize = 0;
    char * tznameBuffer = NULL;

    _tzset(); // Update the time zone information

    // Get the size of buffer required to hold DST time zone name
    if (_get_tzname(&tznameSize, NULL, 0, DST))
    {
        return 1;    // Return an error value if it failed
    }

    // Allocate a buffer for the name
    if (NULL == (tznameBuffer = (char *)(malloc(tznameSize))))
    {
        return 2;    // Return an error value if it failed
    }

    // Load the name in the buffer
    if (_get_tzname(&tznameSize, tznameBuffer, tznameSize, DST))
    {
        return 3;    // Return an error value if it failed
    }

    printf_s("The current Daylight standard time zone name is %s.\n", tznameBuffer);
    return 0;
}
```

### Output

```
The current Daylight standard time zone name is Pacific Daylight Time.
```

## Requirements

Routine

Required header

`_get_tzname`

`<time.h>`

For more information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## See also

[Time management](https://learn.microsoft.com/en-us/cpp/c-runtime-library/time-management?view=msvc-170)  
[`errno`, `_doserrno`, `_sys_errlist`, and `_sys_nerr`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr?view=msvc-170)  
[`_get_daylight`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-daylight?view=msvc-170)  
[`_get_dstbias`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-dstbias?view=msvc-170)  
[`_get_timezone`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-timezone?view=msvc-170)
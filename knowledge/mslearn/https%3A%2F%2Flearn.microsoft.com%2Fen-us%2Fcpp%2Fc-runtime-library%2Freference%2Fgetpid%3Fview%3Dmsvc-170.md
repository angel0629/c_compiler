---
title: "_getpid"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/getpid?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Gets the process identification.

## Syntax

```
int _getpid( void );
```

## Return value

Returns the process ID obtained from the system. There's no error return.

## Remarks

The **`_getpid`** function obtains the process ID from the system. The process ID uniquely identifies the calling process.

## Requirements

Routine

Required header

**`_getpid`**

`<process.h>`

For more compatibility information, see [Compatibility](https://learn.microsoft.com/en-us/cpp/c-runtime-library/compatibility?view=msvc-170).

## Example

```
// crt_getpid.c
// This program uses _getpid to obtain
// the process ID and then prints the ID.

#include <stdio.h>
#include <process.h>

int main( void )
{
   // If run from command line, shows different ID for
   // command line than for operating system shell.

   printf( "Process id: %d\n", _getpid() );
}
```

```
Process id: 3584
```

## See also

[Process and environment control](https://learn.microsoft.com/en-us/cpp/c-runtime-library/process-and-environment-control?view=msvc-170)  
[`_mktemp`, `_wmktemp`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mktemp-wmktemp?view=msvc-170)
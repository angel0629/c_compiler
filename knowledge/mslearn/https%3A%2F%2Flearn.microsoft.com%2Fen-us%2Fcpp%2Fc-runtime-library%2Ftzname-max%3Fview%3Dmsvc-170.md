---
title: "TZNAME_MAX"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/tzname-max?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
**Obsolete**. The maximum permissible string length for a time zone name variable. This macro was defined in <limits.h> in Visual Studio 2012 and earlier versions. It isn't defined in Visual Studio 2013 and later versions. To get the length required to hold the current time zone name, use [`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170).

## Syntax

```
#include <limits.h>
```

## See also

[Environmental constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/environmental-constants?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)  
[`_get_tzname`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/get-tzname?view=msvc-170)
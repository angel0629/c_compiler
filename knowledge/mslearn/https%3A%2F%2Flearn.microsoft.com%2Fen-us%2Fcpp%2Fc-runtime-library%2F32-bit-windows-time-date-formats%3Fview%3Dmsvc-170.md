---
title: "32-Bit Windows Time-Date Formats"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/32-bit-windows-time-date-formats?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
The file time and the date are stored individually, using unsigned integers as bit fields. File time and date are packed as follows:

### Time

Bit position:

0 1 2 3 4

5 6 7 8 9 A

B C D E F

Length:

5

6

5

Contents:

hours

minutes

2-second increments

Value Range:

0-23

0-59

0-29 in 2-second intervals

### Date

Bit position:

0 1 2 3 4 5 6

7 8 9 A

B C D E F

Length:

7

4

5

Contents:

year

month

day

Value Range:

0-119

1-12

1-31

(relative to 1980)

## See also

[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)
---
title: "Input and Output"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/input-and-output?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
[Console and port I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/console-and-port-i-o?view=msvc-170) functions read or write directly to a console (keyboard and screen) or an I/O port (such as a printer port).

Note

Because stream functions are buffered and low-level functions are not, these two types of functions are generally incompatible. For processing a particular file, use either stream or low-level functions exclusively.
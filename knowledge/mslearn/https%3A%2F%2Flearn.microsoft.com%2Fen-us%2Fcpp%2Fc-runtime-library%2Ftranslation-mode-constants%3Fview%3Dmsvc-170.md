---
title: "Translation Mode Constants"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/translation-mode-constants?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
## Syntax

```
#include <fcntl.h>
```

## Remarks

The `_O_BINARY`, `_O_TEXT`, `_O_WTEXT`, `_O_U16TEXT`, and `_O_U8TEXT` manifest constants determine the translation mode for files (`_open` and `_sopen`) or the translation mode for streams (`_setmode`).

The allowed values are:

Value

Description

`_O_TEXT`

Opens file in ANSI text (translated) mode. Carriage return-line feed (CR-LF) combinations are translated into a single line feed (LF) on input. Line feed characters are translated into CR-LF combinations on output. Also, CTRL+Z is interpreted as an end-of-file character on input. In files opened for reading, and for reading and writing, `fopen` checks for CTRL+Z at the end of the file and removes it, if possible. It's removed because using the `fseek` and `ftell` functions to move within a file ending with CTRL+Z may cause `fseek` to behave improperly near the end of the file.

`_O_WTEXT`

Opens file in UTF-16 text (translated) mode. The wide-character versions of the text translations of `_O_TEXT` are supported.

`_O_U16TEXT`

Opens file in UTF-16 no BOM text (translated) mode. The wide-character versions of the text translations of `_O_TEXT` are supported.

`_O_U8TEXT`

Opens file in UTF-8 no BOM text (translated) mode. The text translations of `_O_TEXT` are supported.

`_O_BINARY`

Opens file in binary (untranslated) mode. The above translations are suppressed.

`_O_RAW`

Same as `_O_BINARY`. Supported for C 2.0 compatibility.

For more information, see [Text and binary mode file I/O](https://learn.microsoft.com/en-us/cpp/c-runtime-library/text-and-binary-mode-file-i-o?view=msvc-170) and [File translation constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/file-translation-constants?view=msvc-170).

## See also

[`_open`, `_wopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/open-wopen?view=msvc-170)  
[`_pipe`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/pipe?view=msvc-170)  
[`_sopen`, `_wsopen`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/sopen-wsopen?view=msvc-170)  
[`_setmode`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode?view=msvc-170)  
[Global constants](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-constants?view=msvc-170)
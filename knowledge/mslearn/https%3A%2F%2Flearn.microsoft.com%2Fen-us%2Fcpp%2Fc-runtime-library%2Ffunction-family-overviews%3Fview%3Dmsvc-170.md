---
title: "Function family overview"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/function-family-overviews?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
This section lists C runtime library routines by function family.

## CRT library routine families

[`_exec`, `_wexec`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/exec-wexec-functions?view=msvc-170)  
Functions to load and execute a new process.

[Filename search functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/filename-search-functions?view=msvc-170)  
Functions to search for specified file names, and to close searches.

[Format specification syntax for `printf` and `wprintf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-syntax-printf-and-wprintf-functions?view=msvc-170)  
Describes the format string and arguments for `printf` and `wprintf`.

[Format specification field characters: `scanf` and `wscanf`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions?view=msvc-170)  
Describes the format specification fields for parsing an input stream for the entire `scanf` family of functions.

[`is`, `isw` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/is-isw-routines?view=msvc-170)  
Functions for testing characters for things like whether they're uppercase, ASCII, numeric, punctuation, and so on.

[`_ismbb` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbb-routines?view=msvc-170)  
Functions for testing an integer value for whether it represents an alpha character, blank character, a print character, and so on.

[`_ismbc` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/ismbc-routines?view=msvc-170)  
Functions for testing a multibyte character for whether it represents an alpha character, blank character, a print character, and so on.

[operator `delete` (CRT)](https://learn.microsoft.com/en-us/cpp/c-runtime-library/delete-operator-crt?view=msvc-170)  
Beginning in Visual Studio 2013, the Universal C Runtime (UCRT) no longer supports the C++-specific operator delete function. It's now part of the C++ Standard Library.

[operator `new` (CRT)](https://learn.microsoft.com/en-us/cpp/c-runtime-library/new-operator-crt?view=msvc-170)  
Beginning in Visual Studio 2013, the Universal C Runtime (UCRT) no longer supports the C++-specific operator new function. It's now part of the C++ Standard Library.

[`printf` positional parameter functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/printf-p-positional-parameters?view=msvc-170)  
Positional parameters specify by number the argument to substitute into a field in a format string.

[`scanf` type field characters](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-type-field-characters?view=msvc-170)  
The type character determines whether the associated argument is interpreted as a character, string, or number for any of the `scanf` family of functions, including the secure versions, such as `scanf_s`.

[`scanf` width specification](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification?view=msvc-170)  
The width field is a positive decimal integer that controls the maximum number of characters to be read for that field. Applies to any of the `scanf` family of functions, including the secure versions, such as `scanf_s`.

[\_spawn, \_wspawn functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/spawn-wspawn-functions?view=msvc-170)  
Functions to create and execute a new process.

[`strcoll` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/strcoll-functions?view=msvc-170)  
The `strcoll` and `wcscoll` functions compare two strings according to the `LC_COLLATE` category setting of the locale code page.

[String to numeric value functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/string-to-numeric-value-functions?view=msvc-170)  
The `strtod` family of functions convert a null-terminated string to a numeric value.

[`vprintf` functions](https://learn.microsoft.com/en-us/cpp/c-runtime-library/vprintf-functions?view=msvc-170)  
The `vprintf` functions take a pointer to an argument list, format it, and write the result to the specified destination. The functions differ in several ways: the parameter validation performed; whether they take wide or single-byte character strings; the output destination; and support for specifying the order in which parameters are used in the format string.

## See also

[C Runtime library reference](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)
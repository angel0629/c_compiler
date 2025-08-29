---
title: "mbrtowc"
source: "https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbrtowc?view=msvc-170"
source_tag: "mslearn"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
attribution: "© Microsoft Learn (CC BY 4.0)"
---
Convert a multibyte character in the current locale into the equivalent wide character, with the capability of restarting in the middle of a multibyte character.

## Syntax

```
size_t mbrtowc(
   wchar_t *wchar,
   const char *mbchar,
   size_t count,
   mbstate_t *mbstate
);
```

### Parameters

_`wchar`_  
Address of a wide character to receive the converted wide character string (type **`wchar_t`**). This value can be a null pointer if no return wide character is required.

_`mbchar`_  
Address of a sequence of bytes (a multibyte character).

_`count`_  
Number of bytes to check.

_`mbstate`_  
Pointer to conversion state object. If this value is a null pointer, the function uses a static internal conversion state object. Because the internal `mbstate_t` object isn't thread-safe, we recommend that you always pass your own _`mbstate`_ argument.

## Return value

One of the following values:

0 The next _`count`_ or fewer bytes complete the multibyte character that represents the null wide character, which is stored in _`wchar`_, if _`wchar`_ isn't a null pointer.

1 to _`count`_, inclusive The next _`count`_ or fewer bytes complete a valid multibyte character. The value returned is the number of bytes that complete the multibyte character. The wide character equivalent is stored in _`wchar`_, if _`wchar`_ isn't a null pointer.

(size\_t)(-1) An encoding error occurred. The next _`count`_ or fewer bytes don't contribute to a complete and valid multibyte character. In this case, `errno` is set to EILSEQ and the conversion shift state in _`mbstate`_ is unspecified.

(size\_t)(-2) The next _`count`_ bytes contribute to an incomplete but potentially valid multibyte character, and all _`count`_ bytes have been processed. No value is stored in _`wchar`_, but _`mbstate`_ is updated to restart the function.

If _`mbchar`_ is a null pointer, the function is equivalent to the call:

`mbrtowc(NULL, "", 1, &mbstate)`

In this case, the values of the _`wchar`_ and _`count`_ arguments are ignored.

If _`mbchar`_ isn't a null pointer, the function examines _`count`_ bytes from _`mbchar`_ to determine the required number of bytes that are required to complete the next multibyte character. If the next character is valid, the corresponding multibyte character is stored in _`wchar`_ if it isn't a null pointer. If the character is the corresponding wide null character, the resulting state of _`mbstate`_ is the initial conversion state.

The **`mbrtowc`** function differs from [`mbtowc`, `_mbtowc_l`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/mbtowc-mbtowc-l?view=msvc-170) by its restartability. The conversion state is stored in _`mbstate`_ for subsequent calls to the same or other restartable functions. Results are undefined when mixing the use of restartable and nonrestartable functions. For example, an application should use `wcsrlen` instead of `wcslen` if a subsequent call to `wcsrtombs` is used instead of `wcstombs`.

By default, this function's global state is scoped to the application. To change this behavior, see [Global state in the CRT](https://learn.microsoft.com/en-us/cpp/c-runtime-library/global-state?view=msvc-170).

## Example

Converts a multibyte character to its wide character equivalent.

```
// crt_mbrtowc.cpp

#include <stdio.h>
#include <mbctype.h>
#include <string.h>
#include <locale.h>
#include <wchar.h>

#define BUF_SIZE 100

int Sample(char* szIn, wchar_t* wcOut, int nMax)
{
    mbstate_t   state = {0}; // Initial state
    size_t      nConvResult,
                nmbLen = 0,
                nwcLen = 0;
    wchar_t*    wcCur = wcOut;
    wchar_t*    wcEnd = wcCur + nMax;
    const char* mbCur = szIn;
    const char* mbEnd = mbCur + strlen(mbCur) + 1;
    char*       szLocal;

    // Sets all locale to French_Canada.1252
    szLocal = setlocale(LC_ALL, "French_Canada.1252");
    if (!szLocal)
    {
        printf("The function setlocale(LC_ALL, \"French_Canada.1252\") failed!\n");
        return 1;
    }

    printf("Locale set to: \"%s\"\n", szLocal);

    // Sets the code page associated current locale's code page
    // from a previous call to setlocale.
    if (_setmbcp(_MB_CP_SBCS) == -1)
    {
        printf("The function _setmbcp(_MB_CP_SBCS) failed!");
        return 1;
    }

    while ((mbCur < mbEnd) && (wcCur < wcEnd))
    {
        //
        nConvResult = mbrtowc(wcCur, mbCur, 1, &state);
        switch (nConvResult)
        {
            case 0:
            {  // done
                printf("Conversion succeeded!\nMultibyte String: ");
                printf(szIn);
                printf("\nWC String: ");
                wprintf(wcOut);
                printf("\n");
                mbCur = mbEnd;
                break;
            }

            case -1:
            {  // encoding error
                printf("The call to mbrtowc has detected an encoding error.\n");
                mbCur = mbEnd;
                break;
            }

            case -2:
            {  // incomplete character
                if   (!mbsinit(&state))
                {
                    printf("Currently in middle of mb conversion, state = %x\n", state);
                    // state will contain data regarding lead byte of mb character
                }

                ++nmbLen;
                ++mbCur;
                break;
            }

            default:
            {
                if   (nConvResult > 2) // The multibyte should never be larger than 2
                {
                    printf("Error: The size of the converted multibyte is %d.\n", nConvResult);
                }

                ++nmbLen;
                ++nwcLen;
                ++wcCur;
                ++mbCur;
            break;
            }
        }
    }

   return 0;
}

int main(int argc, char* argv[])
{
    char    mbBuf[BUF_SIZE] = "AaBbCc\x9A\x8B\xE0\xEF\xF0xXyYzZ";
    wchar_t wcBuf[BUF_SIZE] = {L''};

    return Sample(mbBuf, wcBuf, BUF_SIZE);
}
```

### Sample output

```
Locale set to: "French_Canada.1252"
Conversion succeeded!
Multibyte String: AaBbCcÜïα∩≡xXyYzZ
WC String: AaBbCcÜïα∩≡xXyYzZ
```

## Requirements

Routine

Required header

**`mbrtowc`**

<wchar.h>

## See also

[Data conversion](https://learn.microsoft.com/en-us/cpp/c-runtime-library/data-conversion?view=msvc-170)  
[Locale](https://learn.microsoft.com/en-us/cpp/c-runtime-library/locale?view=msvc-170)  
[Interpretation of multibyte-character sequences](https://learn.microsoft.com/en-us/cpp/c-runtime-library/interpretation-of-multibyte-character-sequences?view=msvc-170)
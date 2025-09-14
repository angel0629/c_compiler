---
title: "LeakSanitizer — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/LeakSanitizer.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Usage](#usage)
    
*   [Security Considerations](#security-considerations)
    
*   [Supported Platforms](#supported-platforms)
    
*   [More Information](#more-information)
    

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

LeakSanitizer is a run-time memory leak detector. It can be combined with [AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html) to get both memory error and leak detection, or used in a stand-alone mode. LSan adds almost no performance overhead until the very end of the process, at which point there is an extra leak detection phase.

[Usage](#id2)[¶](#usage "Link to this heading")
-----------------------------------------------

[AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html): integrates LeakSanitizer and enables it by default on supported platforms.

$ cat memory-leak.c
#include <stdlib.h>
void \*p;
int main() {
  p = malloc(7);
  p = 0; // The memory is leaked here.
  return 0;
}
% clang \-fsanitize\=address \-g memory-leak.c ; ASAN\_OPTIONS\=detect\_leaks\=1 ./a.out
\==23646==ERROR: LeakSanitizer: detected memory leaks
Direct leak of 7 byte(s) in 1 object(s) allocated from:
    #0 0x4af01b in \_\_interceptor\_malloc /projects/compiler-rt/lib/asan/asan\_malloc\_linux.cc:52:3
    #1 0x4da26a in main memory-leak.c:4:7
    #2 0x7f076fd9cec4 in \_\_libc\_start\_main libc-start.c:287
SUMMARY: AddressSanitizer: 7 byte(s) leaked in 1 allocation(s).

To use LeakSanitizer in stand-alone mode, link your program with `-fsanitize=leak` flag. Make sure to use `clang` (not `ld`) for the link step, so that it would link in proper LeakSanitizer run-time library into the final executable.

[Security Considerations](#id3)[¶](#security-considerations "Link to this heading")
-----------------------------------------------------------------------------------

LeakSanitizer is a bug detection tool and its runtime is not meant to be linked against production executables. While it may be useful for testing, LeakSanitizer’s runtime was not developed with security-sensitive constraints in mind and may compromise the security of the resulting executable.

[Supported Platforms](#id4)[¶](#supported-platforms "Link to this heading")
---------------------------------------------------------------------------

*   Android
    
*   Fuchsia
    
*   Linux
    
*   macOS
    
*   NetBSD
    

[More Information](#id5)[¶](#more-information "Link to this heading")
---------------------------------------------------------------------

[https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer)
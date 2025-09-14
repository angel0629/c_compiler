---
title: "Diagnostic flags in Clang — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/DiagnosticsReference.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
[Diagnostic flags](#id3)[¶](#diagnostic-flags "Link to this heading")
---------------------------------------------------------------------

### [\-W](#id4)[¶](#w "Link to this heading")

Synonym for [\-Wextra](#wextra).

### [\-W#pragma-messages](#id5)[¶](#w-pragma-messages "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-W#warnings](#id6)[¶](#w-warnings "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-WCFString-literal](#id7)[¶](#wcfstring-literal "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: input conversion stopped due to an input byte that does not belong to the input codeset UTF-8

### [\-WCL4](#id8)[¶](#wcl4 "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wall](#wall), [\-Wextra](#wextra).

### [\-WIndependentClass-attribute](#id9)[¶](#windependentclass-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘objc\_independent\_class’ attribute may be put on a typedef only; attribute is ignored

warning: ‘objc\_independent\_class’ attribute may be put on Objective-C object pointer type only; attribute is ignored

### [\-WNSObject-attribute](#id10)[¶](#wnsobject-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘NSObject’ attribute may be put on a typedef only; attribute is ignored

### [\-WTU-local-entity-exposure](#id11)[¶](#wtu-local-entity-exposure "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: TU local entity _A_ is exposed

### [\-Waarch64-sme-attributes](#id12)[¶](#waarch64-sme-attributes "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: always\_inline function _B_ and its caller _A_ have mismatching _C_ attributes, inlining may change runtime behaviour

warning: 

returning

passing

 a VL-dependent argument 

from

to

 a locally streaming function is undefined behaviour when the streaming and non-streaming vector lengths are different at runtime

warning: 

returning

passing

 a VL-dependent argument 

from

to

 a function with a different streaming-mode is undefined behaviour when the streaming and non-streaming vector lengths are different at runtime

### [\-Wabi](#id13)[¶](#wabi "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wabsolute-value](#id14)[¶](#wabsolute-value "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: absolute value function _A_ given an argument of type _B_ but has parameter of type _C_ which may cause truncation of value

warning: taking the absolute value of 

pointer

function

array

 type _B_ is suspicious

warning: taking the absolute value of unsigned type _A_ has no effect

warning: using 

integer

floating point

complex

 absolute value function _A_ when argument is of 

integer

floating point

complex

 type

### [\-Wabstract-final-class](#id15)[¶](#wabstract-final-class "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: abstract class is marked ‘

final

sealed

‘

### [\-Wabstract-vbase-init](#id16)[¶](#wabstract-vbase-init "Link to this heading")

**Diagnostic text:**

warning: initializer for virtual base class _A_ of abstract class _B_ will never be used

### [\-Waddress](#id17)[¶](#waddress "Link to this heading")

This diagnostic is enabled by default.

Controls [\-Wpointer-bool-conversion](#wpointer-bool-conversion), [\-Wstring-compare](#wstring-compare), [\-Wtautological-pointer-compare](#wtautological-pointer-compare).

### [\-Waddress-of-packed-member](#id18)[¶](#waddress-of-packed-member "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: taking address of packed member _A_ of class or structure _B_ may result in an unaligned pointer value

### [\-Waddress-of-temporary](#id19)[¶](#waddress-of-temporary "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-address-of-temporary` can be used to disable the error.

**Diagnostic text:**

error: taking the address of a temporary object of type _A_

### [\-Waggregate-return](#id20)[¶](#waggregate-return "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Waix-compat](#id21)[¶](#waix-compat "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: alignment of 16 bytes for a struct member is not binary compatible with IBM XL C/C++ for AIX 16.1.0 or older

warning: #pragma align(packed) may not be compatible with objects generated with AIX XL C/C++

### [\-Walias-template-in-declaration-name](#id22)[¶](#walias-template-in-declaration-name "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: a declarative nested name specifier cannot name an alias template

### [\-Walign-mismatch](#id23)[¶](#walign-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: passing _A_\-byte aligned argument to _B_\-byte aligned parameter _C_

 of _E_

 may result in an unaligned pointer access

### [\-Wall](#id24)[¶](#wall "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wmisleading-indentation](#wmisleading-indentation), [\-Wmost](#wmost), [\-Wpacked-non-pod](#wpacked-non-pod), [\-Wparentheses](#wparentheses), [\-Wperf-constraint-implies-noexcept](#wperf-constraint-implies-noexcept), [\-Wswitch](#wswitch), [\-Wswitch-bool](#wswitch-bool), [\-Wvla-cxx-extension](#wvla-cxx-extension).

### [\-Walloc-size](#id25)[¶](#walloc-size "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: allocation of insufficient size ‘_A_’ for type _B_ with size ‘_C_’

### [\-Walloca](#id26)[¶](#walloca "Link to this heading")

**Diagnostic text:**

warning: use of function _A_ is discouraged; there is no way to check for failure but failure may still occur, resulting in a possibly exploitable security vulnerability

### [\-Walloca-with-align-alignof](#id27)[¶](#walloca-with-align-alignof "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: second argument to \_\_builtin\_alloca\_with\_align is supposed to be in bits

### [\-Walways-inline-coroutine](#id28)[¶](#walways-inline-coroutine "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: this coroutine may be split into pieces; not every piece is guaranteed to be inlined

### [\-Wambiguous-delete](#id29)[¶](#wambiguous-delete "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: multiple suitable _A_ functions for _B_; no ‘operator delete’ function will be invoked if initialization throws an exception

### [\-Wambiguous-ellipsis](#id30)[¶](#wambiguous-ellipsis "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘…’ in this location creates a C-style varargs function

, not a function parameter pack

### [\-Wambiguous-macro](#id31)[¶](#wambiguous-macro "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ambiguous expansion of macro _A_

### [\-Wambiguous-member-template](#id32)[¶](#wambiguous-member-template "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: lookup of _A_ in member access expression is ambiguous; using member of _B_

### [\-Wambiguous-reversed-operator](#id33)[¶](#wambiguous-reversed-operator "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++20 considers use of overloaded operator ‘_A_’ (with operand types _B_ and _C_) to be ambiguous despite there being a unique best viable function

 with non-reversed arguments

### [\-Wanalyzer-incompatible-plugin](#id34)[¶](#wanalyzer-incompatible-plugin "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: checker plugin ‘_A_’ is not compatible with this version of the analyzer

### [\-Wandroid-unversioned-fallback](#id35)[¶](#wandroid-unversioned-fallback "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: using unversioned Android target directory _A_ for target _B_; unversioned directories will not be used in Clang 19 – provide a versioned directory for the target version or lower instead

### [\-Wanon-enum-enum-conversion](#id36)[¶](#wanon-enum-enum-conversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-anon-enum-enum-conversion](#wdeprecated-anon-enum-enum-conversion).

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

### [\-Wanonymous-pack-parens](#id37)[¶](#wanonymous-pack-parens "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++11 requires a parenthesized pack declaration to have a name

### [\-Wapinotes](#id38)[¶](#wapinotes "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Warc](#id39)[¶](#warc "Link to this heading")

This diagnostic is enabled by default.

Controls [\-Warc-non-pod-memaccess](#warc-non-pod-memaccess), [\-Warc-retain-cycles](#warc-retain-cycles), [\-Warc-unsafe-retained-assign](#warc-unsafe-retained-assign).

### [\-Warc-bridge-casts-disallowed-in-nonarc](#id40)[¶](#warc-bridge-casts-disallowed-in-nonarc "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ casts have no effect when not using ARC

### [\-Warc-maybe-repeated-use-of-weak](#id41)[¶](#warc-maybe-repeated-use-of-weak "Link to this heading")

**Diagnostic text:**

warning: weak 

variable

property

implicit property

instance variable

 _B_ may be accessed multiple times in this 

function

method

block

lambda

 and may be unpredictably set to nil; assign to a strong variable to keep the object alive

### [\-Warc-non-pod-memaccess](#id42)[¶](#warc-non-pod-memaccess "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

destination for

source of

 this _B_ call is a pointer to ownership-qualified type _C_

### [\-Warc-performSelector-leaks](#id43)[¶](#warc-performselector-leaks "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: performSelector may cause a leak because its selector is unknown

### [\-Warc-repeated-use-of-weak](#id44)[¶](#warc-repeated-use-of-weak "Link to this heading")

Also controls [\-Warc-maybe-repeated-use-of-weak](#warc-maybe-repeated-use-of-weak).

**Diagnostic text:**

warning: weak 

variable

property

implicit property

instance variable

 _B_ is accessed multiple times in this 

function

method

block

lambda

 but may be unpredictably set to nil; assign to a strong variable to keep the object alive

### [\-Warc-retain-cycles](#id45)[¶](#warc-retain-cycles "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: capturing _A_ strongly in this block is likely to lead to a retain cycle

### [\-Warc-unsafe-retained-assign](#id46)[¶](#warc-unsafe-retained-assign "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: assigning 

array literal

dictionary literal

numeric literal

boxed expression

<should not happen>

block literal

 to a weak 

property

variable

; object will be released after assignment

warning: assigning retained object to 

weak

unsafe\_unretained

property

variable

; object will be released after assignment

warning: assigning retained object to unsafe property; object will be released after assignment

### [\-Wargument-outside-range](#id47)[¶](#wargument-outside-range "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-argument-outside-range` can be used to disable the error.

**Diagnostic text:**

error: argument value _A_ is outside the valid range \[_B_, _C_\]

### [\-Wargument-undefined-behaviour](#id48)[¶](#wargument-undefined-behaviour "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: argument value _A_ will result in undefined behaviour

### [\-Warm-interrupt-save-fp-no-vfp-unit](#id49)[¶](#warm-interrupt-save-fp-no-vfp-unit "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \`interrupt\_save\_fp\` only applies to targets that have a VFP unit enabled for this compilation; this will be treated as a regular \`interrupt\` attribute

### [\-Warm-interrupt-vfp-clobber](#id50)[¶](#warm-interrupt-vfp-clobber "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: interrupt service routine with vfp enabled may clobber the interruptee’s vfp state; consider using the \`interrupt\_save\_fp\` attribute to prevent this behavior

### [\-Warray-bounds](#id51)[¶](#warray-bounds "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: array index _A_ is past the end of the array (that has type _B_

, cast to _D_

)

warning: array index _A_ refers past the last possible element for an array in _B_\-bit address space containing _C_\-bit (_D_\-byte) elements (max possible _E_ element

s

)

warning: array index _A_ is before the beginning of the array

warning: the pointer incremented by _A_ refers past the last possible element for an array in _B_\-bit address space containing _C_\-bit (_D_\-byte) elements (max possible _E_ element

s

)

warning: array argument is too small; 

contains _A_ elements

is of size _A_

, callee requires at least _B_

### [\-Warray-bounds-pointer-arithmetic](#id52)[¶](#warray-bounds-pointer-arithmetic "Link to this heading")

**Diagnostic text:**

warning: the pointer incremented by _A_ refers past the end of the array (that has type _B_)

warning: the pointer decremented by _A_ refers before the beginning of the array

### [\-Warray-compare](#id53)[¶](#warray-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparison between two arrays compare their addresses and will be deprecated in c++20; to compare array addresses, use unary ‘+’ to decay operands to pointers

### [\-Warray-compare-cxx26](#id54)[¶](#warray-compare-cxx26 "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-array-compare-cxx26` can be used to disable the error.

**Diagnostic text:**

error: comparison between two arrays is ill-formed in C++26; to compare array addresses, use unary ‘+’ to decay operands to pointers

### [\-Warray-parameter](#id55)[¶](#warray-parameter "Link to this heading")

**Diagnostic text:**

warning: argument _A_ of type _B_ with mismatched bound

### [\-Wasm](#id56)[¶](#wasm "Link to this heading")

Synonym for [\-Wasm-operand-widths](#wasm-operand-widths).

### [\-Wasm-operand-widths](#id57)[¶](#wasm-operand-widths "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: value size does not match register size specified by the constraint and modifier

### [\-Wassign-enum](#id58)[¶](#wassign-enum "Link to this heading")

**Diagnostic text:**

warning: integer constant not in range of enumerated type _A_

### [\-Wassume](#id59)[¶](#wassume "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: assumption is ignored because it contains (potential) side-effects

### [\-Wat-protocol](#id60)[¶](#wat-protocol "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Watomic-access](#id62)[¶](#watomic-access "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-atomic-access` can be used to disable the error.

**Diagnostic text:**

error: accessing a member of an atomic structure or union is undefined behavior

### [\-Watomic-alignment](#id63)[¶](#watomic-alignment "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: misaligned atomic operation may incur significant performance penalty; the expected alignment (_A_ bytes) exceeds the actual alignment (_B_ bytes)

warning: large atomic operation may incur significant performance penalty; the access size (_A_ bytes) exceeds the max lock-free size (_B_ bytes)

### [\-Watomic-implicit-seq-cst](#id64)[¶](#watomic-implicit-seq-cst "Link to this heading")

**Diagnostic text:**

warning: implicit use of sequentially-consistent atomic may incur stronger memory barriers than necessary

### [\-Watomic-memory-ordering](#id65)[¶](#watomic-memory-ordering "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

success 

failure 

memory order argument to atomic operation is invalid

### [\-Watomic-properties](#id66)[¶](#watomic-properties "Link to this heading")

Controls [\-Wcustom-atomic-properties](#wcustom-atomic-properties), [\-Wimplicit-atomic-properties](#wimplicit-atomic-properties).

### [\-Watomic-property-with-user-defined-accessor](#id67)[¶](#watomic-property-with-user-defined-accessor "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: writable atomic property _A_ cannot pair a synthesized 

getter

setter

 with a user defined 

getter

setter

### [\-Wattribute-packed-for-bitfield](#id68)[¶](#wattribute-packed-for-bitfield "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘packed’ attribute was ignored on bit-fields with single-byte alignment in older versions of GCC and Clang

### [\-Wattribute-preprocessor-tokens](#id69)[¶](#wattribute-preprocessor-tokens "Link to this heading")

**Diagnostic text:**

warning: ‘_A_’ is not allowed in an attribute argument list

### [\-Wattribute-statement](#id70)[¶](#wattribute-statement "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-attribute-statement` can be used to disable the error.

**Diagnostic text:**

error: _A_ attribute minimum and maximum arguments are equal

### [\-Wattribute-warning](#id71)[¶](#wattribute-warning "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: call to ‘_A_’ declared with ‘warning’ attribute: _B_

warning: \-mtocdata option is ignored for _A_ because _B_

### [\-Wattributes](#id72)[¶](#wattributes "Link to this heading")

This diagnostic is enabled by default.

Controls [\-Wignored-attributes](#wignored-attributes), [\-Wunknown-attributes](#wunknown-attributes).

### [\-Wauto-decl-extensions](#id73)[¶](#wauto-decl-extensions "Link to this heading")

**Diagnostic text:**

warning: type inference of a declaration other than a plain identifier with optional trailing attributes is a Clang extension

### [\-Wauto-disable-vptr-sanitizer](#id74)[¶](#wauto-disable-vptr-sanitizer "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicitly disabling vptr sanitizer because rtti wasn’t enabled

### [\-Wauto-import](#id75)[¶](#wauto-import "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wauto-storage-class](#id76)[¶](#wauto-storage-class "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘auto’ storage class specifier is not permitted in C++11, and will not be supported in future releases

### [\-Wauto-var-id](#id77)[¶](#wauto-var-id "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘auto’ deduced as ‘id’ in declaration of _A_

### [\-Wavailability](#id78)[¶](#wavailability "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘unavailable’ availability overrides all other availability information

warning: Fuchsia API Level prohibits specifying a minor or sub-minor version

warning: ignoring availability attribute 

on ‘+load’ method

with constructor attribute

with destructor attribute

warning: only ‘unavailable’ and ‘deprecated’ are supported for Swift availability

warning: unknown environment _A_ in availability macro

warning: unknown platform _A_ in availability macro

warning: feature cannot be 

introduced

deprecated

obsoleted

 in _B_ version _C_ before it was 

introduced

deprecated

obsoleted

 in version _E_; attribute ignored

warning: use same version number separators ‘\_’ or ‘.’; as in ‘major\[.minor\[.subminor\]\]’

warning: availability does not match previous declaration

warning: 

overriding 

method 

introduced after

deprecated before

obsoleted before

the protocol method it implements

overridden method

 on _B_ (_C_ vs. _D_)

warning: 

overriding 

method cannot be unavailable on _A_ when 

the protocol method it implements

its overridden method

 is available

### [\-Wavr-rtlib-linking-quirks](#id79)[¶](#wavr-rtlib-linking-quirks "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: support for linking stdlibs for microcontroller ‘_A_’ is not implemented

warning: no avr-libc installation can be found on the system, cannot link standard libraries

warning: support for passing the data section address to the linker for microcontroller ‘_A_’ is not implemented

warning: no target microcontroller specified, please pass -mmcu=<mcu name>

warning: standard library not linked and so no interrupt vector table or compiler runtime routines will be linked

### [\-Wbackend-plugin](#id80)[¶](#wbackend-plugin "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

warning: _A_ (_B_) exceeds limit (_C_) in ‘_D_’

### [\-Wbackslash-newline-escape](#id81)[¶](#wbackslash-newline-escape "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: backslash and newline separated by space

### [\-Wbad-function-cast](#id82)[¶](#wbad-function-cast "Link to this heading")

**Diagnostic text:**

warning: cast from function call of type _A_ to non-matching type _B_

### [\-Wbinary-literal](#id83)[¶](#wbinary-literal "Link to this heading")

Controls [\-Wc++14-binary-literal](#wc-14-binary-literal), [\-Wc++98-c++11-compat-binary-literal](#wc-98-c-11-compat-binary-literal).

### [\-Wbind-to-temporary-copy](#id84)[¶](#wbind-to-temporary-copy "Link to this heading")

Also controls [\-Wc++98-compat-bind-to-temporary-copy](#wc-98-compat-bind-to-temporary-copy).

**Diagnostic text:**

warning: C++98 requires an accessible copy constructor for class _C_ when binding a reference to a temporary; was 

private

protected

warning: no viable constructor 

copying variable

copying parameter

initializing template parameter

returning object

initializing statement expression result

throwing object

copying member subobject

copying array element

allocating object

copying temporary

initializing base subobject

initializing vector element

capturing value

 of type _B_; C++98 requires a copy constructor when binding a reference to a temporary

### [\-Wbit-int-extension](#id85)[¶](#wbit-int-extension "Link to this heading")

**Diagnostic text:**

warning: ‘\_BitInt’ in 

C17 and earlier

C++

 is a Clang extension

warning: ‘\_BitInt’ suffix for literals is a Clang extension

### [\-Wbitfield-constant-conversion](#id86)[¶](#wbitfield-constant-conversion "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wsingle-bit-bitfield-constant-conversion](#wsingle-bit-bitfield-constant-conversion).

**Diagnostic text:**

warning: implicit truncation from _C_ to bit-field changes value from _A_ to _B_

### [\-Wbitfield-enum-conversion](#id87)[¶](#wbitfield-enum-conversion "Link to this heading")

**Diagnostic text:**

warning: bit-field _A_ is not wide enough to store all enumerators of _B_

warning: signed bit-field _A_ needs an extra bit to represent the largest positive enumerators of _B_

warning: assigning value of signed enum type _B_ to unsigned bit-field _A_; negative enumerators of enum _B_ will be converted to positive values

### [\-Wbitfield-width](#id88)[¶](#wbitfield-width "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: width of bit-field _A_ (_B_ bits) exceeds the width of its type; value will be truncated to _C_ bit

s

### [\-Wbitwise-conditional-parentheses](#id89)[¶](#wbitwise-conditional-parentheses "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: operator ‘?:’ has lower precedence than ‘_A_’; ‘_A_’ will be evaluated first

### [\-Wbitwise-instead-of-logical](#id90)[¶](#wbitwise-instead-of-logical "Link to this heading")

**Diagnostic text:**

warning: use of bitwise ‘_A_’ with boolean operands

### [\-Wbitwise-op-parentheses](#id91)[¶](#wbitwise-op-parentheses "Link to this heading")

**Diagnostic text:**

warning: ‘_A_’ within ‘_B_’

### [\-Wblock-capture-autoreleasing](#id92)[¶](#wblock-capture-autoreleasing "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: block captures an autoreleasing out-parameter, which may result in use-after-free bugs

### [\-Wbool-conversion](#id93)[¶](#wbool-conversion "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wpointer-bool-conversion](#wpointer-bool-conversion), [\-Wundefined-bool-conversion](#wundefined-bool-conversion).

**Diagnostic text:**

warning: initialization of pointer of type _A_ to null from a constant boolean expression

### [\-Wbool-conversions](#id94)[¶](#wbool-conversions "Link to this heading")

Synonym for [\-Wbool-conversion](#wbool-conversion).

### [\-Wbool-operation](#id95)[¶](#wbool-operation "Link to this heading")

Also controls [\-Wbitwise-instead-of-logical](#wbitwise-instead-of-logical).

**Diagnostic text:**

warning: bitwise negation of a boolean expression

;

 always evaluates to ‘true’;

 did you mean logical negation?

### [\-Wbounds-safety-counted-by-elt-type-unknown-size](#id96)[¶](#wbounds-safety-counted-by-elt-type-unknown-size "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘

counted\_by

sized\_by

counted\_by\_or\_null

sized\_by\_or\_null

‘ 

cannot

should not

 be applied to 

a pointer with pointee

an array with element

 of unknown size because _B_ is 

an incomplete type

a sizeless type

a function type

a struct type with a flexible array member

. This will be an error in a future compiler version

### [\-Wbraced-scalar-init](#id97)[¶](#wbraced-scalar-init "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: braces around 

scalar 

initializer

### [\-Wbranch-protection](#id98)[¶](#wbranch-protection "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘-mbranch-protection=’ option is incompatible with the ‘_A_’ architecture

warning: ignoring the ‘branch-protection’ attribute because the ‘_A_’ architecture does not support it

warning: invalid branch protection option ‘_A_’ in ‘_B_’

warning: unsupported branch protection specification ‘_A_’

### [\-Wbridge-cast](#id99)[¶](#wbridge-cast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ bridges to _B_, not _C_

warning: _A_ cannot bridge to _B_

### [\-Wbuiltin-assume-aligned-alignment](#id100)[¶](#wbuiltin-assume-aligned-alignment "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: requested alignment must be _A_ bytes or smaller; maximum alignment assumed

### [\-Wbuiltin-macro-redefined](#id101)[¶](#wbuiltin-macro-redefined "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: redefining builtin macro

warning: undefining builtin macro

### [\-Wbuiltin-memcpy-chk-size](#id102)[¶](#wbuiltin-memcpy-chk-size "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ will always overflow; destination buffer has size _B_, but size argument is _C_

### [\-Wc++-compat](#id104)[¶](#wc-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++-hidden-decl](#wc-hidden-decl), [\-Wc++-keyword](#wc-keyword), [\-Wc++-unterminated-string-initialization](#wc-unterminated-string-initialization), [\-Wdefault-const-init](#wdefault-const-init), [\-Wduplicate-decl-specifier](#wduplicate-decl-specifier), [\-Wimplicit-int-enum-cast](#wimplicit-int-enum-cast), [\-Wimplicit-void-ptr-cast](#wimplicit-void-ptr-cast), [\-Wjump-misses-init](#wjump-misses-init), [\-Wtentative-definition-compat](#wtentative-definition-compat).

**Diagnostic text:**

warning: if you see this diagnostic, a Clang developer has made a mistake

warning: 

empty 

struct

union

 has size 0 in C, 

size 1

non-zero size

 in C++

### [\-Wc++-hidden-decl](#id105)[¶](#wc-hidden-decl "Link to this heading")

**Diagnostic text:**

warning: 

struct

union

enum

 defined within a struct or union is not visible in C++

### [\-Wc++-keyword](#id106)[¶](#wc-keyword "Link to this heading")

**Diagnostic text:**

warning: identifier _A_ conflicts with a C++ keyword

### [\-Wc++-unterminated-string-initialization](#id107)[¶](#wc-unterminated-string-initialization "Link to this heading")

**Diagnostic text:**

warning: initializer-string for character array is too long for C++, array size is _A_ but initializer has size _B_ (including the null terminating character)

### [\-Wc++0x-compat](#id108)[¶](#wc-0x-compat "Link to this heading")

Synonym for [\-Wc++11-compat](#wc-11-compat).

### [\-Wc++0x-extensions](#id109)[¶](#wc-0x-extensions "Link to this heading")

Synonym for [\-Wc++11-extensions](#wc-11-extensions).

### [\-Wc++0x-narrowing](#id110)[¶](#wc-0x-narrowing "Link to this heading")

Synonym for [\-Wc++11-narrowing](#wc-11-narrowing).

### [\-Wc++11-compat](#id111)[¶](#wc-11-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++11-compat-deprecated-writable-strings](#wc-11-compat-deprecated-writable-strings), [\-Wc++11-compat-reserved-user-defined-literal](#wc-11-compat-reserved-user-defined-literal), [\-Wc++11-narrowing](#wc-11-narrowing), [\-Wpre-c++14-compat](#wpre-c-14-compat), [\-Wpre-c++17-compat](#wpre-c-17-compat), [\-Wpre-c++20-compat](#wpre-c-20-compat), [\-Wpre-c++23-compat](#wpre-c-23-compat), [\-Wpre-c++26-compat](#wpre-c-26-compat).

**Diagnostic text:**

warning: integer literal is too large to be represented in type ‘long’ and is subject to undefined behavior under C++98, interpreting as ‘unsigned long’; this literal will 

have type ‘long long’

be ill-formed

 in C++11 onwards

warning: ‘auto’ storage class specifier is redundant and incompatible with C++11

warning: identifier after literal will be treated as a user-defined literal suffix in C++11

warning: ‘_A_’ is a keyword in C++11

warning: use of right-shift operator (‘>>’) in template argument will require parentheses in C++11

warning: explicit instantiation cannot be ‘inline’

warning: explicit instantiation of _A_ must occur at global scope

warning: explicit instantiation of _A_ not in a namespace enclosing _B_

warning: explicit instantiation of _A_ must occur in namespace _B_

warning: integer literal is too large to be represented in type ‘long’, interpreting as ‘unsigned long’ per C++98; this literal will 

have type ‘long long’

be ill-formed

 in C++11 onwards

### [\-Wc++11-compat-deprecated-writable-strings](#id112)[¶](#wc-11-compat-deprecated-writable-strings "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: conversion from string literal to _A_ is deprecated

### [\-Wc++11-compat-pedantic](#id113)[¶](#wc-11-compat-pedantic "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wc++11-compat](#wc-11-compat), [\-Wpre-c++14-compat-pedantic](#wpre-c-14-compat-pedantic), [\-Wpre-c++17-compat-pedantic](#wpre-c-17-compat-pedantic), [\-Wpre-c++20-compat-pedantic](#wpre-c-20-compat-pedantic), [\-Wpre-c++23-compat-pedantic](#wpre-c-23-compat-pedantic), [\-Wpre-c++26-compat-pedantic](#wpre-c-26-compat-pedantic).

### [\-Wc++11-compat-reserved-user-defined-literal](#id114)[¶](#wc-11-compat-reserved-user-defined-literal "Link to this heading")

**Diagnostic text:**

warning: identifier after literal will be treated as a reserved user-defined literal suffix in C++11

### [\-Wc++11-extensions](#id115)[¶](#wc-11-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++11-extra-semi](#wc-11-extra-semi), [\-Wc++11-inline-namespace](#wc-11-inline-namespace), [\-Wc++11-long-long](#wc-11-long-long).

**Diagnostic text:**

warning: enumeration types with a fixed underlying type are a C++11 extension

warning: non-class friend type _A_ is a C++11 extension

warning: static data member _A_ in union is a C++11 extension

warning: default template arguments for a function template are a C++11 extension

warning: parentheses around address non-type template argument are a C++11 extension

warning: ‘typename’ outside of a template is a C++11 extension

warning: alias declarations are a C++11 extension

warning: implicit conversion from array size expression of type _A_ to 

integral

enumeration

 type _C_ is a C++11 extension

warning: ‘auto’ type specifier is a 

C++11

HLSL 202y

 extension

warning: 

defaulted

deleted

 function definitions are a C++11 extension

warning: commas at the end of enumerator lists are a C++11 extension

warning: explicit conversion functions are a C++11 extension

warning: extern templates are a C++11 extension

warning: range-based for loop is a C++11 extension

warning: generalized initializer lists are a C++11 extension

warning: lambdas are a 

C++11

clang HLSL

 extension

warning: use of enumeration in a nested name specifier is a C++11 extension

warning: default member initializer for non-static data member is a C++11 extension

warning: ‘_A_’ keyword is a C++11 extension

warning: reference qualifiers on functions are a C++11 extension

warning: rvalue references are a C++11 extension

warning: scoped enumerations are a C++11 extension

warning: non-type template argument referring to 

function

object

 _B_ with internal linkage is a C++11 extension

warning: ‘template’ keyword outside of a template

warning: unelaborated friend declaration is a C++11 extension; specify ‘

struct

interface

union

class

enum

‘ to befriend _B_

warning: variadic templates are a C++11 extension

warning: \[\[\]\] attributes are a C++11 extension

### [\-Wc++11-inline-namespace](#id117)[¶](#wc-11-inline-namespace "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: inline namespaces are a C++11 feature

### [\-Wc++11-long-long](#id118)[¶](#wc-11-long-long "Link to this heading")

**Diagnostic text:**

warning: ‘long long’ is a C++11 extension

### [\-Wc++11-narrowing](#id119)[¶](#wc-11-narrowing "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++11-narrowing-const-reference](#wc-11-narrowing-const-reference).

**Diagnostic text:**

error: 

case value

enumerator value

non-type template argument

non-type parameter of template template parameter

array size

explicit specifier argument

noexcept specifier argument

call to ‘size()’

call to ‘data()’

cannot be narrowed from type _C_ to _D_

evaluates to _C_, which cannot be narrowed to type _D_

error: constant expression evaluates to _A_ which cannot be narrowed to type _B_

error: type _A_ cannot be narrowed to _B_ in initializer list

error: non-constant-expression cannot be narrowed from type _A_ to _B_ in initializer list

warning: constant expression evaluates to _A_ which cannot be narrowed to type _B_ in C++11

warning: type _A_ cannot be narrowed to _B_ in initializer list in C++11

warning: non-constant-expression cannot be narrowed from type _A_ to _B_ in initializer list in C++11

### [\-Wc++11-narrowing-const-reference](#id120)[¶](#wc-11-narrowing-const-reference "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-c++11-narrowing-const-reference` can be used to disable the error.

**Diagnostic text:**

error: constant expression evaluates to _A_ which cannot be narrowed to type _B_

error: type _A_ cannot be narrowed to _B_ in initializer list

error: non-constant-expression cannot be narrowed from type _A_ to _B_ in initializer list

### [\-Wc++14-attribute-extensions](#id121)[¶](#wc-14-attribute-extensions "Link to this heading")

**Diagnostic text:**

warning: use of the _A_ attribute is a C++14 extension

### [\-Wc++14-binary-literal](#id122)[¶](#wc-14-binary-literal "Link to this heading")

**Diagnostic text:**

warning: binary integer literals are a C++14 extension

### [\-Wc++14-compat](#id123)[¶](#wc-14-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wpre-c++17-compat](#wpre-c-17-compat), [\-Wpre-c++20-compat](#wpre-c-20-compat), [\-Wpre-c++23-compat](#wpre-c-23-compat), [\-Wpre-c++26-compat](#wpre-c-26-compat).

### [\-Wc++14-compat-pedantic](#id124)[¶](#wc-14-compat-pedantic "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wc++14-compat](#wc-14-compat), [\-Wpre-c++17-compat-pedantic](#wpre-c-17-compat-pedantic), [\-Wpre-c++20-compat-pedantic](#wpre-c-20-compat-pedantic), [\-Wpre-c++23-compat-pedantic](#wpre-c-23-compat-pedantic), [\-Wpre-c++26-compat-pedantic](#wpre-c-26-compat-pedantic).

### [\-Wc++14-extensions](#id125)[¶](#wc-14-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++14-attribute-extensions](#wc-14-attribute-extensions), [\-Wc++14-binary-literal](#wc-14-binary-literal).

**Diagnostic text:**

warning: multiple return statements in constexpr function is a C++14 extension

warning: variable declaration in a constexpr 

function

constructor

 is a C++14 extension

warning: type definition in a constexpr 

function

constructor

 is a C++14 extension

warning: use of this statement in a constexpr 

function

constructor

 is a C++14 extension

warning: variable templates are a C++14 extension

warning: ‘decltype(auto)’ type specifier is a C++14 extension

warning: initialized lambda captures are a C++14 extension

### [\-Wc++17-attribute-extensions](#id126)[¶](#wc-17-attribute-extensions "Link to this heading")

**Diagnostic text:**

warning: use of the _A_ attribute is a C++17 extension

### [\-Wc++17-compat](#id127)[¶](#wc-17-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wc++17-compat-mangling](#wc-17-compat-mangling), [\-Wdeprecated-increment-bool](#wdeprecated-increment-bool), [\-Wdeprecated-register](#wdeprecated-register), [\-Wpre-c++20-compat](#wpre-c-20-compat), [\-Wpre-c++23-compat](#wpre-c-23-compat), [\-Wpre-c++26-compat](#wpre-c-26-compat).

### [\-Wc++17-compat-mangling](#id128)[¶](#wc-17-compat-mangling "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: mangled name of _A_ will change in C++17 due to non-throwing exception specification in function signature

### [\-Wc++17-compat-pedantic](#id129)[¶](#wc-17-compat-pedantic "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wc++17-compat](#wc-17-compat), [\-Wpre-c++20-compat-pedantic](#wpre-c-20-compat-pedantic), [\-Wpre-c++23-compat-pedantic](#wpre-c-23-compat-pedantic), [\-Wpre-c++26-compat-pedantic](#wpre-c-26-compat-pedantic).

### [\-Wc++17-extensions](#id130)[¶](#wc-17-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++17-attribute-extensions](#wc-17-attribute-extensions).

**Diagnostic text:**

warning: decomposition declarations are a C++17 extension

warning: inline variables are a C++17 extension

warning: ISO C++ standards before C++17 do not allow new expression for type _A_ to use list-initialization

warning: constexpr if is a C++17 extension

warning: ‘constexpr’ on lambda expressions is a C++17 extension

warning: ‘static\_assert’ with no message is a C++17 extension

warning: pack fold expression is a C++17 extension

warning: ‘begin’ and ‘end’ returning different types (_A_ and _B_) is a C++17 extension

warning: hexadecimal floating literals are a C++17 feature

warning: ‘

if

switch

‘ initialization statements are a C++17 extension

warning: use of multiple declarators in a single using declaration is a C++17 extension

warning: nested namespace definition is a C++17 extension; define each namespace separately

warning: attributes on 

a namespace

an enumerator

 declaration are a C++17 extension

warning: capture of ‘\*this’ by copy is a C++17 extension

warning: template template parameter using ‘typename’ is a C++17 extension

warning: default scope specifier for attributes is a C++17 extension

warning: pack expansion of using declaration is a C++17 extension

### [\-Wc++1y-extensions](#id131)[¶](#wc-1y-extensions "Link to this heading")

Synonym for [\-Wc++14-extensions](#wc-14-extensions).

### [\-Wc++1z-compat](#id132)[¶](#wc-1z-compat "Link to this heading")

Synonym for [\-Wc++17-compat](#wc-17-compat).

### [\-Wc++1z-compat-mangling](#id133)[¶](#wc-1z-compat-mangling "Link to this heading")

Synonym for [\-Wc++17-compat-mangling](#wc-17-compat-mangling).

### [\-Wc++1z-extensions](#id134)[¶](#wc-1z-extensions "Link to this heading")

Synonym for [\-Wc++17-extensions](#wc-17-extensions).

### [\-Wc++20-attribute-extensions](#id135)[¶](#wc-20-attribute-extensions "Link to this heading")

**Diagnostic text:**

warning: use of the _A_ attribute is a C++20 extension

### [\-Wc++20-compat](#id136)[¶](#wc-20-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wpre-c++23-compat](#wpre-c-23-compat), [\-Wpre-c++26-compat](#wpre-c-26-compat).

**Diagnostic text:**

warning: aggregate initialization of type _A_ with user-declared constructors is incompatible with C++20

warning: this expression will be parsed as explicit(bool) in C++20

warning: explicit initialization of field _B_ will not be enforced in C++20 and later because _C_ has a user-declared constructor, making the type no longer an aggregate

warning: ‘<=>’ is a single token in C++20; add a space to avoid a change in behavior

warning: taking address of non-addressable standard library function is incompatible with C++20

warning: type of UTF-8 string literal will change from array of const char to array of const char8\_t in C++20

warning: ‘_A_’ is a keyword in C++20

### [\-Wc++20-compat-pedantic](#id137)[¶](#wc-20-compat-pedantic "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wc++20-compat](#wc-20-compat), [\-Wpre-c++23-compat-pedantic](#wpre-c-23-compat-pedantic), [\-Wpre-c++26-compat-pedantic](#wpre-c-26-compat-pedantic).

### [\-Wc++20-designator](#id138)[¶](#wc-20-designator "Link to this heading")

**Diagnostic text:**

warning: designated initializers are a C++20 extension

### [\-Wc++20-extensions](#id139)[¶](#wc-20-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++20-attribute-extensions](#wc-20-attribute-extensions), [\-Wc++20-designator](#wc-20-designator), [\-Wvariadic-macro-arguments-omitted](#wvariadic-macro-arguments-omitted).

**Diagnostic text:**

warning: use of function template name with no prior declaration in function call with explicit template arguments is a C++20 extension

warning: constexpr constructor that does not initialize all members is a C++20 extension

warning: function try block in constexpr 

function

constructor

 is a C++20 extension

warning: uninitialized variable in a constexpr 

function

constructor

 is a C++20 extension

warning: constexpr union constructor that does not initialize any member is a C++20 extension

warning: class template argument deduction for alias templates is a C++20 extension

warning: use of this statement in a constexpr 

function

constructor

 is a C++20 extension

warning: decomposition declaration declared 

‘_B_’

with ‘_B_’ specifiers

 is a C++20 extension

warning: missing ‘typename’ prior to dependent type name _A_ is a C++20 extension

warning: default member initializer for bit-field is a C++20 extension

warning: captured structured bindings are a C++20 extension

warning: defaulted comparison operators are a C++20 extension

warning: explicit capture of ‘this’ with a capture default of ‘=’ is a C++20 extension

warning: explicit(bool) is a C++20 extension

warning: range-based for loop initialization statements are a C++20 extension

warning: initialized lambda pack captures are a C++20 extension

warning: inline nested namespace definition is a C++20 extension

warning: explicit template parameter list for lambdas is a C++20 extension

warning: invoking a pointer to a ‘const &’ member function on an rvalue is a C++20 extension

warning: using declaration naming a scoped enumerator is a C++20 extension

warning: using enum declaration is a C++20 extension

warning: aggregate initialization of type _A_ from a parenthesized list of values is a C++20 extension

### [\-Wc++23-attribute-extensions](#id140)[¶](#wc-23-attribute-extensions "Link to this heading")

**Diagnostic text:**

warning: use of the _A_ attribute is a C++23 extension

### [\-Wc++23-compat](#id141)[¶](#wc-23-compat "Link to this heading")

Synonym for [\-Wpre-c++26-compat](#wpre-c-26-compat).

### [\-Wc++23-extensions](#id142)[¶](#wc-23-extensions "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wc++23-lambda-attributes](#wc-23-lambda-attributes).

**Diagnostic text:**

warning: definition of a 

static

thread\_local

 variable in a constexpr 

function

constructor

 is a C++23 extension

warning: use of this statement in a constexpr 

function

constructor

 is a C++23 extension

warning: static lambdas are a C++23 extension

warning: alias declaration in this context is a C++23 extension

warning: consteval if is a C++23 extension

warning: use of a ‘#

<BUG IF SEEN>

elifdef

elifndef

‘ directive is a C++23 extension

warning: ‘size\_t’ suffix for literals is a C++23 extension

warning: label at end of compound statement is a C++23 extension

warning: lambda without a parameter clause is a C++23 extension

warning: declaring overloaded _A_ as ‘static’ is a C++23 extension

### [\-Wc++23-lambda-attributes](#id143)[¶](#wc-23-lambda-attributes "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

an attribute specifier sequence

_A_

 in this position is a C++23 extension

### [\-Wc++26-extensions](#id144)[¶](#wc-26-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: structured binding declaration in a condition is a C++2c extension

warning:  ‘_A_’ in a raw string literal delimiter is a C++2c extension

warning: structured binding packs are a C++2c extension 

warning: ‘static\_assert’ with a user-generated message is a C++26 extension

warning: an attribute specifier sequence attached to a structured binding declaration is a C++2c extension

warning: ‘= delete’ with a message is a C++2c extension

warning: pack indexing is a C++2c extension

warning: placeholder variables are a C++2c extension

warning: ‘

trivially\_relocatable\_if\_eligible

replaceable\_if\_eligible

‘ keyword is a C++2c extension

warning: variadic ‘friend’ declarations are a C++2c extension

### [\-Wc++2a-compat](#id145)[¶](#wc-2a-compat "Link to this heading")

Synonym for [\-Wc++20-compat](#wc-20-compat).

### [\-Wc++2a-compat-pedantic](#id146)[¶](#wc-2a-compat-pedantic "Link to this heading")

Synonym for [\-Wc++20-compat-pedantic](#wc-20-compat-pedantic).

### [\-Wc++2a-extensions](#id147)[¶](#wc-2a-extensions "Link to this heading")

Synonym for [\-Wc++20-extensions](#wc-20-extensions).

### [\-Wc++2b-extensions](#id148)[¶](#wc-2b-extensions "Link to this heading")

Synonym for [\-Wc++23-extensions](#wc-23-extensions).

### [\-Wc++2c-compat](#id149)[¶](#wc-2c-compat "Link to this heading")

Synonym for [\-Wdelete-incomplete](#wdelete-incomplete).

### [\-Wc++2c-extensions](#id150)[¶](#wc-2c-extensions "Link to this heading")

Synonym for [\-Wc++26-extensions](#wc-26-extensions).

### [\-Wc++98-c++11-c++14-c++17-compat](#id151)[¶](#wc-98-c-11-c-14-c-17-compat "Link to this heading")

Synonym for [\-Wpre-c++20-compat](#wpre-c-20-compat).

### [\-Wc++98-c++11-c++14-c++17-compat-pedantic](#id152)[¶](#wc-98-c-11-c-14-c-17-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c++20-compat-pedantic](#wpre-c-20-compat-pedantic).

### [\-Wc++98-c++11-c++14-compat](#id153)[¶](#wc-98-c-11-c-14-compat "Link to this heading")

Synonym for [\-Wpre-c++17-compat](#wpre-c-17-compat).

### [\-Wc++98-c++11-c++14-compat-pedantic](#id154)[¶](#wc-98-c-11-c-14-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c++17-compat-pedantic](#wpre-c-17-compat-pedantic).

### [\-Wc++98-c++11-compat](#id155)[¶](#wc-98-c-11-compat "Link to this heading")

Synonym for [\-Wpre-c++14-compat](#wpre-c-14-compat).

### [\-Wc++98-c++11-compat-binary-literal](#id156)[¶](#wc-98-c-11-compat-binary-literal "Link to this heading")

**Diagnostic text:**

warning: binary integer literals are incompatible with C++ standards before C++14

### [\-Wc++98-c++11-compat-pedantic](#id157)[¶](#wc-98-c-11-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c++14-compat-pedantic](#wpre-c-14-compat-pedantic).

### [\-Wc++98-compat](#id158)[¶](#wc-98-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++98-compat-local-type-template-args](#wc-98-compat-local-type-template-args), [\-Wc++98-compat-unnamed-type-template-args](#wc-98-compat-unnamed-type-template-args), [\-Wpre-c++14-compat](#wpre-c-14-compat), [\-Wpre-c++17-compat](#wpre-c-17-compat), [\-Wpre-c++20-compat](#wpre-c-20-compat), [\-Wpre-c++23-compat](#wpre-c-23-compat), [\-Wpre-c++26-compat](#wpre-c-26-compat).

**Diagnostic text:**

warning: enumeration types with a fixed underlying type are incompatible with C++98

warning: non-class friend type _A_ is incompatible with C++98

warning: static data member _A_ in union is incompatible with C++98

warning: default template arguments for a function template are incompatible with C++98

warning: parentheses around address non-type template argument are incompatible with C++98

warning: ‘typename’ outside of a template is incompatible with C++98

warning: alias declarations are incompatible with C++98

warning: ‘alignas’ is incompatible with C++98

warning: alignof expressions are incompatible with C++98

warning: \[\[\]\] attributes are incompatible with C++ standards before C++11

warning: ‘auto’ type specifier is incompatible with C++98

warning: ‘constexpr’ specifier is incompatible with C++98

warning: constructor call from initializer list is incompatible with C++98

warning: ‘decltype’ type specifier is incompatible with C++98

warning: 

defaulted

deleted

 function definitions are incompatible with C++98

warning: delegating constructors are incompatible with C++98

warning: scalar initialized from empty initializer list is incompatible with C++98

warning: initializing _A_ from an empty initializer list is incompatible with C++98

warning: enumeration type in nested name specifier is incompatible with C++98

warning: explicit conversion functions are incompatible with C++98

warning: range-based for loop is incompatible with C++98

warning: friend declaration naming a member of the declaring class is incompatible with C++98

warning: generalized initializer lists are incompatible with C++98

warning: jump from this goto statement to its label is incompatible with C++98

warning: jump from this 

indirect

asm

 goto statement to one of its possible targets is incompatible with C++98

warning: initialization of initializer\_list object is incompatible with C++98

warning: inline namespaces are incompatible with C++98

warning: lambda expressions are incompatible with C++98

warning: ‘<::’ is treated as digraph ‘<:’ (aka ‘\[’) followed by ‘:’ in C++98

warning: literal operators are incompatible with C++98

warning: universal character name referring to a control character is incompatible with C++98

warning: specifying character ‘_A_’ with a universal character name is incompatible with C++98

warning: noexcept specifications are incompatible with C++98

warning: noexcept expressions are incompatible with C++98

warning: use of non-static data member _A_ in an unevaluated context is incompatible with C++98

warning: default member initializer for non-static data members is incompatible with C++98

warning: 

anonymous struct

union

 member _B_ with a non-trivial 

default constructor

copy constructor

move constructor

copy assignment operator

move assignment operator

destructor

 is incompatible with C++98

warning: ‘nullptr’ is incompatible with C++98

warning: ‘_A_’ keyword is incompatible with C++98

warning: passing object of trivial but non-POD type _A_ through variadic 

function

block

method

constructor

 is incompatible with C++98

warning: raw string literals are incompatible with C++98

warning: reference qualifiers on functions are incompatible with C++98

warning: reference initialized from initializer list is incompatible with C++98

warning: rvalue references are incompatible with C++98

warning: scoped enumerations are incompatible with C++98

warning: substitution failure due to access control is incompatible with C++98

warning: ‘static\_assert’ declarations are incompatible with C++98

warning: jump from switch statement to this case label is incompatible with C++98

warning: use of null pointer as non-type template argument is incompatible with C++98

warning: non-type template argument referring to 

function

object

 _B_ with internal linkage is incompatible with C++98

warning: use of ‘template’ keyword outside of a template is incompatible with C++98

warning: trailing return types are incompatible with C++98

warning: consecutive right angle brackets are incompatible with C++98 (use ‘> >’)

warning: befriending _B_ without ‘

struct

interface

union

class

enum

‘ keyword is incompatible with C++98

warning: unicode literals are incompatible with C++98

warning: ‘_A_’ type specifier is incompatible with C++98

warning: inheriting constructors are incompatible with C++98

warning: variadic templates are incompatible with C++98

### [\-Wc++98-compat-bind-to-temporary-copy](#id159)[¶](#wc-98-compat-bind-to-temporary-copy "Link to this heading")

**Diagnostic text:**

warning: 

copying variable

copying parameter

initializing template parameter

returning object

initializing statement expression result

throwing object

copying member subobject

copying array element

allocating object

copying temporary

initializing base subobject

initializing vector element

capturing value

 of type _C_ when binding a reference to a temporary would 

invoke an inaccessible constructor

find no viable constructor

find ambiguous constructors

invoke a deleted constructor

 in C++98

### [\-Wc++98-compat-local-type-template-args](#id161)[¶](#wc-98-compat-local-type-template-args "Link to this heading")

**Diagnostic text:**

warning: local type _A_ as template argument is incompatible with C++98

### [\-Wc++98-compat-pedantic](#id162)[¶](#wc-98-compat-pedantic "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++98-compat](#wc-98-compat), [\-Wc++98-compat-bind-to-temporary-copy](#wc-98-compat-bind-to-temporary-copy), [\-Wc++98-compat-extra-semi](#wc-98-compat-extra-semi), [\-Wpre-c++14-compat-pedantic](#wpre-c-14-compat-pedantic), [\-Wpre-c++17-compat-pedantic](#wpre-c-17-compat-pedantic), [\-Wpre-c++20-compat-pedantic](#wpre-c-20-compat-pedantic), [\-Wpre-c++23-compat-pedantic](#wpre-c-23-compat-pedantic), [\-Wpre-c++26-compat-pedantic](#wpre-c-26-compat-pedantic).

**Diagnostic text:**

warning: implicit conversion from array size expression of type _A_ to 

integral

enumeration

 type _C_ is incompatible with C++98

warning: cast between pointer-to-function and pointer-to-object is incompatible with C++98

warning: empty macro arguments are incompatible with C++98

warning: commas at the end of enumerator lists are incompatible with C++98

warning: extern templates are incompatible with C++98

warning: ‘long long’ is incompatible with C++98

warning: #line number greater than 32767 is incompatible with C++98

warning: variadic macros are incompatible with C++98

### [\-Wc++98-compat-unnamed-type-template-args](#id163)[¶](#wc-98-compat-unnamed-type-template-args "Link to this heading")

**Diagnostic text:**

warning: unnamed type as template argument is incompatible with C++98

### [\-Wc-attribute-extension](#id164)[¶](#wc-attribute-extension "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C does not allow an attribute list to appear here

### [\-Wc11-extensions](#id165)[¶](#wc11-extensions "Link to this heading")

**Diagnostic text:**

warning: anonymous unions are a C11 extension

warning: anonymous structs are a C11 extension

warning: ‘_A_’ is a C11 extension

warning: pointer comparisons before C11 need to be between two complete or two incomplete types; _A_ is 

in

complete and _B_ is 

in

complete

### [\-Wc23-compat](#id166)[¶](#wc23-compat "Link to this heading")

**Diagnostic text:**

warning: type of UTF-8 string literal will change from array of char to array of char8\_t in C23

warning: ‘_A_’ is a keyword in C23

### [\-Wc23-extensions](#id167)[¶](#wc23-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wvariadic-macro-arguments-omitted](#wvariadic-macro-arguments-omitted).

**Diagnostic text:**

warning: binary integer literals are a C23 extension

warning: ‘\_BitInt’ suffix for literals is a C23 extension

warning: enumeration types with a fixed underlying type are a C23 extension

warning: 

incremented 

enumerator value which exceeds the range of ‘int’ is a C23 extension (_B_ is too 

small

large

)

warning: declaration of non-local variable in ‘for’ loop is a C23 extension

warning: non-variable declaration in ‘for’ loop is a C23 extension

warning: use of a ‘#

<BUG IF SEEN>

elifdef

elifndef

‘ directive is a C23 extension

warning: use of an empty initializer is a C23 extension

warning: label at end of compound statement is a C23 extension

warning: label followed by a declaration is a C23 extension

warning: ‘nullptr’ is a C23 extension

warning: ‘\_Static\_assert’ with no message is a C23 extension

warning: omitting the parameter name in a function definition is a C23 extension

warning: #embed is a 

C23

Clang

 extension

warning: ‘restrict’ qualifier on an array of pointers is a C23 extension

warning: defining a type within ‘

\_\_builtin\_offsetof

offsetof

‘ is a C23 extension

warning: \[\[\]\] attributes are a C23 extension

### [\-Wc2x-compat](#id168)[¶](#wc2x-compat "Link to this heading")

Synonym for [\-Wc23-compat](#wc23-compat).

### [\-Wc2x-extensions](#id169)[¶](#wc2x-extensions "Link to this heading")

Synonym for [\-Wc23-extensions](#wc23-extensions).

### [\-Wc2y-extensions](#id170)[¶](#wc2y-extensions "Link to this heading")

**Diagnostic text:**

warning: incomplete type _A_ in a ‘\_Generic’ association is a C2y extension

warning: ‘alignof’ on an incomplete array type is a C2y extension

warning: case ranges are a C2y extension

warning: ‘_A_’ is a C2y extension

warning: passing a type argument as the first operand to ‘\_Generic’ is a C2y extension

warning: imaginary constants are a C2y extension

warning: ‘

–

++

‘ on an object of complex type is a C2y extension

warning: octal integer literals are a C2y extension

### [\-Wc99-compat](#id171)[¶](#wc99-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: 

using this character in an identifier

starting an identifier with this character

 is incompatible with C99

warning: unicode literals are incompatible with C99

warning: ‘_A_’ is a keyword in C99

warning: integer literal is too large to be represented in type ‘long’, interpreting as ‘unsigned long’ per C89; this literal will 

have type ‘long long’

be ill-formed

 in C99 onwards

### [\-Wc99-designator](#id172)[¶](#wc99-designator "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++20-designator](#wc-20-designator), [\-Winitializer-overrides](#winitializer-overrides), [\-Wreorder-init-list](#wreorder-init-list).

**Diagnostic text:**

warning: designated initializers are a C99 feature

warning: array designators are a C99 extension

warning: brace elision for designated initializer is a C99 extension

warning: mixture of designated and non-designated initializers in the same initializer list is a C99 extension

warning: nested designators are a C99 extension

### [\-Wc99-extensions](#id173)[¶](#wc99-extensions "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc99-designator](#wc99-designator).

**Diagnostic text:**

warning: initializer for aggregate is not a compile-time constant

warning: 

qualifier in 

static 

array size 

‘\[\*\] ‘

is a C99 feature

warning: compound literals are a C99-specific feature

warning: ‘_A_’ is a C99 extension

warning: flexible array members are a C99 feature

warning: variable declaration in for loop is a C99-specific feature

warning: ISO C99 requires whitespace after the macro name

warning: empty macro arguments are a C99 feature

warning: commas at the end of enumerator lists are a C99-specific feature

warning: hexadecimal floating constants are a C99 feature

### [\-Wcall-to-pure-virtual-from-ctor-dtor](#id174)[¶](#wcall-to-pure-virtual-from-ctor-dtor "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: call to pure virtual member function _A_ has undefined behavior; overrides of _A_ in subclasses are not available in the 

constructor

destructor

 of _C_

### [\-Wcalled-once-parameter](#id175)[¶](#wcalled-once-parameter "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wcompletion-handler](#wcompletion-handler).

**Diagnostic text:**

warning: _A_ parameter marked ‘called\_once’ is called twice

warning: 

captured 

_A_ parameter marked ‘called\_once’ is never called

warning: _A_ parameter marked ‘called\_once’ is never 

used

called

 when 

taking true branch

taking false branch

handling this case

none of the cases applies

entering the loop

skipping the loop

taking one of the branches

### [\-Wcast-align](#id176)[¶](#wcast-align "Link to this heading")

**Diagnostic text:**

warning: cast from _A_ to _B_ increases required alignment from _C_ to _D_

### [\-Wcast-calling-convention](#id177)[¶](#wcast-calling-convention "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cast between incompatible calling conventions ‘_A_’ and ‘_B_’; calls through this pointer may abort at runtime

### [\-Wcast-function-type](#id178)[¶](#wcast-function-type "Link to this heading")

Controls [\-Wcast-function-type-mismatch](#wcast-function-type-mismatch), [\-Wcast-function-type-strict](#wcast-function-type-strict).

### [\-Wcast-function-type-mismatch](#id179)[¶](#wcast-function-type-mismatch "Link to this heading")

**Diagnostic text:**

warning: cast 

from _A_ to _B_ 

converts to incompatible function type

### [\-Wcast-function-type-strict](#id180)[¶](#wcast-function-type-strict "Link to this heading")

**Diagnostic text:**

warning: cast 

from _A_ to _B_ 

converts to incompatible function type

### [\-Wcast-of-sel-type](#id181)[¶](#wcast-of-sel-type "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cast of type _A_ to _B_ is deprecated; use sel\_getName instead

### [\-Wcast-qual](#id182)[¶](#wcast-qual "Link to this heading")

**Diagnostic text:**

warning: cast from _A_ to _B_ drops 

const and volatile qualifiers

const qualifier

volatile qualifier

warning: cast from _A_ to _B_ must have all intermediate pointers const qualified to be safe

### [\-Wcfi-unchecked-callee](#id184)[¶](#wcfi-unchecked-callee "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from _A_ to _B_ discards ‘cfi\_unchecked\_callee’ attribute

### [\-Wchar-align](#id185)[¶](#wchar-align "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wchar-subscripts](#id186)[¶](#wchar-subscripts "Link to this heading")

**Diagnostic text:**

warning: array section 

lower bound

length

 is of type ‘char’

warning: array subscript is of type ‘char’

### [\-Wcharacter-conversion](#id187)[¶](#wcharacter-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different Unicode character types _B_ and _C_

warning: comparing values of different Unicode code unit types _A_ and _B_ may compare different code points

warning: comparing values of different Unicode code unit types _A_ and _B_ compares unrelated code units ‘_C_’ and ‘_D_’

warning: implicit conversion from _A_ to _B_ may change the meaning of the represented code unit

warning: implicit conversion from _A_ to _B_ changes the meaning of the 

code unit

code point

 ‘_D_’

warning: implicit conversion from _A_ to _B_ may lose precision and change the meaning of the represented code unit

### [\-Wclang-cl-pch](#id188)[¶](#wclang-cl-pch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: support for ‘/Yc’ with more than one source file not implemented yet; flag ignored

warning: support for ‘/Yc’ and ‘/Yu’ with different filenames not implemented yet; flags ignored

warning: #pragma hdrstop filename not supported, /Fp can be used to specify precompiled header filename

warning: definition of macro _A_ does not match definition in precompiled header

### [\-Wclass-conversion](#id189)[¶](#wclass-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: conversion function converting _A_ to its base class _B_ will never be used

warning: conversion function converting _A_ to itself will never be used

warning: conversion function converting _A_ to _B_ will never be used

### [\-Wclass-varargs](#id190)[¶](#wclass-varargs "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wnon-pod-varargs](#wnon-pod-varargs).

**Diagnostic text:**

warning: passing object of class type _A_ through variadic 

function

block

method

constructor

; did you mean to call ‘_D_’?

### [\-Wcmse-union-leak](#id191)[¶](#wcmse-union-leak "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: passing union across security boundary via 

parameter _B_

return value

 may leak information

### [\-Wcomma](#id192)[¶](#wcomma "Link to this heading")

**Diagnostic text:**

warning: possible misuse of comma operator here

### [\-Wcompare-distinct-pointer-types](#id195)[¶](#wcompare-distinct-pointer-types "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparison of distinct pointer types

 (_A_ and _B_)

### [\-Wcompletion-handler](#id196)[¶](#wcompletion-handler "Link to this heading")

**Diagnostic text:**

warning: completion handler is called twice

warning: 

captured 

completion handler is never called

warning: completion handler is never 

used

called

 when 

taking true branch

taking false branch

handling this case

none of the cases applies

entering the loop

skipping the loop

taking one of the branches

### [\-Wcomplex-component-init](#id197)[¶](#wcomplex-component-init "Link to this heading")

**Diagnostic text:**

warning: complex initialization specifying real and imaginary components is an extension

### [\-Wcompound-token-split](#id198)[¶](#wcompound-token-split "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wcompound-token-split-by-macro](#wcompound-token-split-by-macro), [\-Wcompound-token-split-by-space](#wcompound-token-split-by-space).

### [\-Wcompound-token-split-by-macro](#id199)[¶](#wcompound-token-split-by-macro "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

_B_ and 

_C_ tokens 

introducing statement expression

terminating statement expression

introducing attribute

terminating attribute

forming pointer to member type

 appear in different macro expansion contexts

### [\-Wcompound-token-split-by-space](#id200)[¶](#wcompound-token-split-by-space "Link to this heading")

**Diagnostic text:**

warning: 

_B_ and 

_C_ tokens 

introducing statement expression

terminating statement expression

introducing attribute

terminating attribute

forming pointer to member type

 are separated by whitespace

### [\-Wconditional-type-mismatch](#id201)[¶](#wconditional-type-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: pointer/integer type mismatch in conditional expression

 (_A_ and _B_)

### [\-Wconditional-uninitialized](#id202)[¶](#wconditional-uninitialized "Link to this heading")

**Diagnostic text:**

warning: variable _A_ may be uninitialized when 

used here

captured by block

### [\-Wconfig-macros](#id203)[¶](#wconfig-macros "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

definition

#undef

 of configuration macro ‘_B_’ has no effect on the import of ‘_C_’; pass ‘

\-D_B_\=…

\-U_B_

‘ on the command line to configure the module

### [\-Wconstant-conversion](#id204)[¶](#wconstant-conversion "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wbitfield-constant-conversion](#wbitfield-constant-conversion), [\-Wobjc-bool-constant-conversion](#wobjc-bool-constant-conversion).

**Diagnostic text:**

warning: implicit conversion from _C_ to _D_ changes value from _A_ to _B_

### [\-Wconstant-evaluated](#id205)[¶](#wconstant-evaluated "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ will always evaluate to ‘true’ in a manifestly constant-evaluated expression

### [\-Wconstant-logical-operand](#id206)[¶](#wconstant-logical-operand "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: use of logical ‘_A_’ with constant operand

### [\-Wconstexpr-not-const](#id207)[¶](#wconstexpr-not-const "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘constexpr’ non-static member function will not be implicitly ‘const’ in C++14; add ‘const’ to avoid a change in behavior

### [\-Wconsumed](#id208)[¶](#wconsumed "Link to this heading")

**Diagnostic text:**

warning: consumed analysis attribute is attached to member of class _A_ which isn’t marked as consumable

warning: state of variable ‘_A_’ must match at the entry and exit of loop

warning: parameter ‘_A_’ not in expected state when the function returns: expected ‘_B_’, observed ‘_C_’

warning: argument not in expected state; expected ‘_A_’, observed ‘_B_’

warning: return state set for an unconsumable type ‘_A_’

warning: return value not in expected state; expected ‘_A_’, observed ‘_B_’

warning: invalid invocation of method ‘_A_’ on object ‘_B_’ while it is in the ‘_C_’ state

warning: invalid invocation of method ‘_A_’ on a temporary object while it is in the ‘_B_’ state

### [\-Wconversion](#id209)[¶](#wconversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wbitfield-enum-conversion](#wbitfield-enum-conversion), [\-Wbool-conversion](#wbool-conversion), [\-Wcharacter-conversion](#wcharacter-conversion), [\-Wconstant-conversion](#wconstant-conversion), [\-Wenum-conversion](#wenum-conversion), [\-Wfloat-conversion](#wfloat-conversion), [\-Wimplicit-float-conversion](#wimplicit-float-conversion), [\-Wimplicit-int-conversion](#wimplicit-int-conversion), [\-Wint-conversion](#wint-conversion), [\-Wliteral-conversion](#wliteral-conversion), [\-Wnon-literal-null-conversion](#wnon-literal-null-conversion), [\-Wnull-conversion](#wnull-conversion), [\-Wobjc-literal-conversion](#wobjc-literal-conversion), [\-Wsign-conversion](#wsign-conversion), [\-Wstring-conversion](#wstring-conversion).

**Diagnostic text:**

warning: implicit conversion truncates vector: _A_ to _B_

warning: implicit conversion discards imaginary component: _A_ to _B_

warning: implicit conversion turns vector to scalar: _A_ to _B_

warning: passing non-generic address space pointer to _A_ may cause dynamic conversion affecting performance

warning: non-type template argument with value ‘_A_’ converted to ‘_B_’ for unsigned template parameter of type _C_

warning: non-type template argument value ‘_A_’ truncated to ‘_B_’ for template parameter of type _C_

### [\-Wconversion-null](#id210)[¶](#wconversion-null "Link to this heading")

Synonym for [\-Wnull-conversion](#wnull-conversion).

### [\-Wcoro-non-aligned-allocation-function](#id211)[¶](#wcoro-non-aligned-allocation-function "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: under -fcoro-aligned-allocation, the non-aligned allocation function for the promise type _A_ has higher precedence than the global aligned allocation function

### [\-Wcoro-type-aware-allocation-function](#id212)[¶](#wcoro-type-aware-allocation-function "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: type aware _A_ will not be used for coroutine allocation

### [\-Wcoroutine](#id213)[¶](#wcoroutine "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Walways-inline-coroutine](#walways-inline-coroutine), [\-Wcoro-non-aligned-allocation-function](#wcoro-non-aligned-allocation-function), [\-Wcoro-type-aware-allocation-function](#wcoro-type-aware-allocation-function), [\-Wcoroutine-missing-unhandled-exception](#wcoroutine-missing-unhandled-exception), [\-Wdeprecated-coroutine](#wdeprecated-coroutine).

**Diagnostic text:**

warning: return type of ‘coroutine\_handle<>::address should be ‘void\*’ (have _A_) in order to get capability with existing async C API

### [\-Wcoroutine-missing-unhandled-exception](#id214)[¶](#wcoroutine-missing-unhandled-exception "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is required to declare the member ‘unhandled\_exception()’ when exceptions are enabled

### [\-Wcovered-switch-default](#id215)[¶](#wcovered-switch-default "Link to this heading")

**Diagnostic text:**

warning: default label in switch which covers all enumeration values

### [\-Wcpp](#id216)[¶](#wcpp "Link to this heading")

Synonym for [\-W#warnings](#w-warnings).

### [\-Wcstring-format-directive](#id217)[¶](#wcstring-format-directive "Link to this heading")

**Diagnostic text:**

warning: using _A_ directive in 

NSString

CFString

 which is being passed as a formatting argument to the formatting 

method

CFfunction

### [\-Wctad-maybe-unsupported](#id218)[¶](#wctad-maybe-unsupported "Link to this heading")

**Diagnostic text:**

warning: _A_ may not intend to support class template argument deduction

### [\-Wctor-dtor-privacy](#id219)[¶](#wctor-dtor-privacy "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wctu](#id220)[¶](#wctu "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: imported AST from ‘_A_’ had been generated for a different target, current: _B_, imported: _C_

### [\-Wcuda-compat](#id221)[¶](#wcuda-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: _A_ attribute parameter _B_ is negative and will be ignored

warning: nvcc does not allow ‘\_\__A_\_\_’ to appear after the parameter list in lambdas

warning: ignored ‘inline’ attribute on kernel function _A_

warning: kernel function _A_ is a member function; this may not be accepted by nvcc

warning: argument to ‘#pragma unroll’ should not be in parentheses in CUDA C/C++

### [\-Wcustom-atomic-properties](#id222)[¶](#wcustom-atomic-properties "Link to this heading")

**Diagnostic text:**

warning: atomic by default property _A_ has a user defined 

getter

setter

 (property should be marked ‘atomic’ if this is intended)

### [\-Wcxx-attribute-extension](#id223)[¶](#wcxx-attribute-extension "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++ does not allow 

an attribute list

_A_

 to appear here

### [\-Wdangling](#id224)[¶](#wdangling "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdangling-assignment](#wdangling-assignment), [\-Wdangling-assignment-gsl](#wdangling-assignment-gsl), [\-Wdangling-capture](#wdangling-capture), [\-Wdangling-field](#wdangling-field), [\-Wdangling-gsl](#wdangling-gsl), [\-Wdangling-initializer-list](#wdangling-initializer-list), [\-Wreturn-stack-address](#wreturn-stack-address).

**Diagnostic text:**

warning: 

temporary 

whose address is used as value of

implicitly 

bound to

reference 

member of local variable

local 

variable

reference

array backing 

initializer list subobject of local variable

local initializer list

_D_ 

will be destroyed at the end of the full-expression

### [\-Wdangling-assignment](#id225)[¶](#wdangling-assignment "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: object backing 

the pointer 

_B_ will be destroyed at the end of the full-expression

### [\-Wdangling-assignment-gsl](#id226)[¶](#wdangling-assignment-gsl "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: object backing the pointer _A_ will be destroyed at the end of the full-expression

### [\-Wdangling-capture](#id227)[¶](#wdangling-capture "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: object whose reference is captured by _A_ will be destroyed at the end of the full-expression

warning: object whose reference is captured will be destroyed at the end of the full-expression

### [\-Wdangling-else](#id228)[¶](#wdangling-else "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: add explicit braces to avoid dangling else

### [\-Wdangling-field](#id229)[¶](#wdangling-field "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: binding reference member _A_ to stack allocated 

variable

parameter

 _B_

warning: 

reference

backing array for ‘std::initializer\_list’

subobject of 

member _A_ 

binds to

is

 a temporary object whose lifetime is shorter than the lifetime of the constructed object

warning: initializing pointer member _A_ with the stack address of 

variable

parameter

 _B_

warning: temporary bound to reference member of allocated object will be destroyed at the end of the full-expression

### [\-Wdangling-gsl](#id230)[¶](#wdangling-gsl "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: object backing the pointer will be destroyed at the end of the full-expression

warning: initializing pointer member _A_ to point to a temporary object whose lifetime is shorter than the lifetime of the constructed object

### [\-Wdangling-initializer-list](#id231)[¶](#wdangling-initializer-list "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: array backing 

initializer list subobject of the allocated object

the allocated initializer list

 will be destroyed at the end of the full-expression

### [\-Wdarwin-sdk-settings](#id232)[¶](#wdarwin-sdk-settings "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: SDK settings were ignored as ‘SDKSettings.json’ could not be parsed

### [\-Wdate-time](#id233)[¶](#wdate-time "Link to this heading")

**Diagnostic text:**

warning: expansion of date or time macro is not reproducible

### [\-Wdealloc-in-category](#id234)[¶](#wdealloc-in-category "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \-dealloc is being overridden in a category

### [\-Wdebug-compression-unavailable](#id235)[¶](#wdebug-compression-unavailable "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cannot compress debug sections (_A_ not enabled)

### [\-Wdeclaration-after-statement](#id236)[¶](#wdeclaration-after-statement "Link to this heading")

**Diagnostic text:**

warning: mixing declarations and code is a C99 extension

warning: mixing declarations and code is incompatible with standards before C99

### [\-Wdecls-in-multiple-modules](#id237)[¶](#wdecls-in-multiple-modules "Link to this heading")

**Diagnostic text:**

warning: declaration _A_ is detected to be defined in multiple module units, first is from ‘_B_’ and second is from ‘_C_’; the compiler may not be good at merging the definitions. 

### [\-Wdefault-const-init](#id238)[¶](#wdefault-const-init "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wdefault-const-init-field](#wdefault-const-init-field), [\-Wdefault-const-init-unsafe](#wdefault-const-init-unsafe), [\-Wdefault-const-init-var](#wdefault-const-init-var).

### [\-Wdefault-const-init-field](#id239)[¶](#wdefault-const-init-field "Link to this heading")

**Diagnostic text:**

warning: default initialization of an object of type _A_ with const member is incompatible with C++

### [\-Wdefault-const-init-field-unsafe](#id240)[¶](#wdefault-const-init-field-unsafe "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: default initialization of an object of type _A_ with const member leaves the object uninitialized

 and is incompatible with C++

### [\-Wdefault-const-init-unsafe](#id241)[¶](#wdefault-const-init-unsafe "Link to this heading")

This diagnostic is enabled by default.

Controls [\-Wdefault-const-init-field-unsafe](#wdefault-const-init-field-unsafe), [\-Wdefault-const-init-var-unsafe](#wdefault-const-init-var-unsafe).

### [\-Wdefault-const-init-var](#id242)[¶](#wdefault-const-init-var "Link to this heading")

**Diagnostic text:**

warning: default initialization of an object of type _A_ is incompatible with C++

### [\-Wdefault-const-init-var-unsafe](#id243)[¶](#wdefault-const-init-var-unsafe "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: default initialization of an object of type _A_ leaves the object uninitialized

 and is incompatible with C++

### [\-Wdefaulted-function-deleted](#id244)[¶](#wdefaulted-function-deleted "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: explicitly defaulted 

<ERROR>

equality

three-way

equality

relational

 comparison operator is implicitly deleted

warning: explicitly defaulted 

default constructor

copy constructor

move constructor

copy assignment operator

move assignment operator

destructor

 is implicitly deleted

### [\-Wdelayed-template-parsing-in-cxx20](#id245)[¶](#wdelayed-template-parsing-in-cxx20 "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \-fdelayed-template-parsing is deprecated after C++20

### [\-Wdelegating-ctor-cycles](#id246)[¶](#wdelegating-ctor-cycles "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-delegating-ctor-cycles` can be used to disable the error.

**Diagnostic text:**

error: constructor for _A_ creates a delegation cycle

### [\-Wdelete-abstract-non-virtual-dtor](#id247)[¶](#wdelete-abstract-non-virtual-dtor "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

delete

destructor

 called on _B_ that is abstract but has non-virtual destructor

### [\-Wdelete-incomplete](#id248)[¶](#wdelete-incomplete "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cannot delete expression with pointer-to-‘void’ type _A_

warning: deleting pointer to incomplete type _A_ is incompatible with C++2c and may cause undefined behavior

### [\-Wdelete-non-abstract-non-virtual-dtor](#id249)[¶](#wdelete-non-abstract-non-virtual-dtor "Link to this heading")

**Diagnostic text:**

warning: 

delete

destructor

 called on non-final _B_ that has virtual functions but non-virtual destructor

### [\-Wdelete-non-virtual-dtor](#id250)[¶](#wdelete-non-virtual-dtor "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wdelete-abstract-non-virtual-dtor](#wdelete-abstract-non-virtual-dtor), [\-Wdelete-non-abstract-non-virtual-dtor](#wdelete-non-abstract-non-virtual-dtor).

### [\-Wdelimited-escape-sequence-extension](#id251)[¶](#wdelimited-escape-sequence-extension "Link to this heading")

**Diagnostic text:**

warning: 

delimited

named

 escape sequences are a 

C++23

C2y

Clang

 extension

### [\-Wdeprecate-lax-vec-conv-all](#id252)[¶](#wdeprecate-lax-vec-conv-all "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion between vector types (’_A_’ and ‘_B_’) is deprecated; in the future, the behavior implied by ‘-fno-lax-vector-conversions’ will be the default

### [\-Wdeprecated](#id253)[¶](#wdeprecated "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-anon-enum-enum-conversion](#wdeprecated-anon-enum-enum-conversion), [\-Wdeprecated-array-compare](#wdeprecated-array-compare), [\-Wdeprecated-attributes](#wdeprecated-attributes), [\-Wdeprecated-builtins](#wdeprecated-builtins), [\-Wdeprecated-comma-subscript](#wdeprecated-comma-subscript), [\-Wdeprecated-copy](#wdeprecated-copy), [\-Wdeprecated-copy-with-dtor](#wdeprecated-copy-with-dtor), [\-Wdeprecated-declarations](#wdeprecated-declarations), [\-Wdeprecated-dynamic-exception-spec](#wdeprecated-dynamic-exception-spec), [\-Wdeprecated-enum-compare](#wdeprecated-enum-compare), [\-Wdeprecated-enum-compare-conditional](#wdeprecated-enum-compare-conditional), [\-Wdeprecated-enum-enum-conversion](#wdeprecated-enum-enum-conversion), [\-Wdeprecated-enum-float-conversion](#wdeprecated-enum-float-conversion), [\-Wdeprecated-increment-bool](#wdeprecated-increment-bool), [\-Wdeprecated-literal-operator](#wdeprecated-literal-operator), [\-Wdeprecated-missing-comma-variadic-parameter](#wdeprecated-missing-comma-variadic-parameter), [\-Wdeprecated-octal-literals](#wdeprecated-octal-literals), [\-Wdeprecated-ofast](#wdeprecated-ofast), [\-Wdeprecated-pragma](#wdeprecated-pragma), [\-Wdeprecated-redundant-constexpr-static-def](#wdeprecated-redundant-constexpr-static-def), [\-Wdeprecated-register](#wdeprecated-register), [\-Wdeprecated-this-capture](#wdeprecated-this-capture), [\-Wdeprecated-type](#wdeprecated-type), [\-Wdeprecated-volatile](#wdeprecated-volatile), [\-Wdeprecated-writable-strings](#wdeprecated-writable-strings).

**Diagnostic text:**

warning: \-O4 is equivalent to -O3

warning: access declarations are deprecated; use using declarations instead

warning: argument ‘_A_’ is deprecated

, use ‘_C_’ instead

warning: argument ‘_A_’ is deprecated, _B_

warning: treating ‘_A_’ input as ‘_B_’ when in C++ mode, this behavior is deprecated

warning: ‘default’ clause for ‘metadirective’ is deprecated; use ‘otherwise’ instead

warning: ‘depend’ clause for ‘ordered’ is deprecated; use ‘doacross’ instead

warning: the delimited form of ‘#pragma omp declare target’ without clauses is deprecated; use ‘#pragma omp begin declare target’ instead

warning: minus(-) operator for reductions is deprecated; use + or user defined reduction instead

warning: _A_ does not support the option ‘_B_’

warning: use of ‘long’ with ‘\_\_vector’ is deprecated

### [\-Wdeprecated-altivec-src-compat](#id254)[¶](#wdeprecated-altivec-src-compat "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: current handling of vector bool and vector pixel types in this context are deprecated; the default behaviour will soon change to that implied by the ‘-altivec-compat=xl’ option

### [\-Wdeprecated-anon-enum-enum-conversion](#id255)[¶](#wdeprecated-anon-enum-enum-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

 is deprecated

### [\-Wdeprecated-array-compare](#id256)[¶](#wdeprecated-array-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparison between two arrays is deprecated; to compare array addresses, use unary ‘+’ to decay operands to pointers

### [\-Wdeprecated-attributes](#id257)[¶](#wdeprecated-attributes "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: the ‘\[\[\_Noreturn\]\]’ attribute spelling is deprecated in C23; use ‘\[\[noreturn\]\]’ instead

warning: applying attribute _A_ to a declaration is deprecated; apply it to the type instead

warning: specifying vector types with the ‘mode’ attribute is deprecated; use the ‘vector\_size’ attribute instead

### [\-Wdeprecated-builtins](#id258)[¶](#wdeprecated-builtins "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: builtin _A_ is deprecated; use _B_ instead

### [\-Wdeprecated-comma-subscript](#id259)[¶](#wdeprecated-comma-subscript "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: top-level comma expression in array subscript is deprecated in C++20 and unsupported in C++23

### [\-Wdeprecated-copy](#id260)[¶](#wdeprecated-copy "Link to this heading")

Also controls [\-Wdeprecated-copy-with-user-provided-copy](#wdeprecated-copy-with-user-provided-copy).

**Diagnostic text:**

warning: definition of implicit copy 

constructor

assignment operator

 for _A_ is deprecated because it has a user-declared copy 

assignment operator

constructor

### [\-Wdeprecated-copy-dtor](#id261)[¶](#wdeprecated-copy-dtor "Link to this heading")

Synonym for [\-Wdeprecated-copy-with-dtor](#wdeprecated-copy-with-dtor).

### [\-Wdeprecated-copy-with-dtor](#id262)[¶](#wdeprecated-copy-with-dtor "Link to this heading")

Also controls [\-Wdeprecated-copy-with-user-provided-dtor](#wdeprecated-copy-with-user-provided-dtor).

**Diagnostic text:**

warning: definition of implicit copy 

constructor

assignment operator

 for _A_ is deprecated because it has a user-declared destructor

### [\-Wdeprecated-copy-with-user-provided-copy](#id263)[¶](#wdeprecated-copy-with-user-provided-copy "Link to this heading")

**Diagnostic text:**

warning: definition of implicit copy 

constructor

assignment operator

 for _A_ is deprecated because it has a user-provided copy 

assignment operator

constructor

### [\-Wdeprecated-copy-with-user-provided-dtor](#id264)[¶](#wdeprecated-copy-with-user-provided-dtor "Link to this heading")

**Diagnostic text:**

warning: definition of implicit copy 

constructor

assignment operator

 for _A_ is deprecated because it has a user-provided destructor

### [\-Wdeprecated-coroutine](#id265)[¶](#wdeprecated-coroutine "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘for co\_await’ belongs to CoroutineTS instead of C++20, which is deprecated

### [\-Wdeprecated-declarations](#id266)[¶](#wdeprecated-declarations "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdeprecated-declarations-switch-case](#wdeprecated-declarations-switch-case).

**Diagnostic text:**

warning: specifying ‘uuid’ as an ATL attribute is deprecated; use \_\_declspec instead

warning: use of C-style parameters in Objective-C method declarations is deprecated

warning: _A_ is deprecated

warning: _A_ may be deprecated because the receiver type is unknown

warning: _A_ is deprecated: _B_

warning: property access is using _A_ method which is deprecated

### [\-Wdeprecated-declarations-switch-case](#id267)[¶](#wdeprecated-declarations-switch-case "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is deprecated

### [\-Wdeprecated-dynamic-exception-spec](#id268)[¶](#wdeprecated-dynamic-exception-spec "Link to this heading")

**Diagnostic text:**

warning: dynamic exception specifications are deprecated

### [\-Wdeprecated-enum-compare](#id269)[¶](#wdeprecated-enum-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

 is deprecated

### [\-Wdeprecated-enum-compare-conditional](#id270)[¶](#wdeprecated-enum-compare-conditional "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

 is deprecated

### [\-Wdeprecated-enum-enum-conversion](#id271)[¶](#wdeprecated-enum-enum-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

 is deprecated

### [\-Wdeprecated-enum-float-conversion](#id272)[¶](#wdeprecated-enum-float-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

floating-point

enumeration

 type _C_ 

with

from

and

enumeration

floating-point

 type _D_ is deprecated

### [\-Wdeprecated-implementations](#id273)[¶](#wdeprecated-implementations "Link to this heading")

**Diagnostic text:**

warning: implementing deprecated 

method

class

category

warning: implementing unavailable method

### [\-Wdeprecated-increment-bool](#id274)[¶](#wdeprecated-increment-bool "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: incrementing expression of type bool is deprecated and incompatible with C++17

### [\-Wdeprecated-literal-operator](#id275)[¶](#wdeprecated-literal-operator "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: identifier _A_ preceded by whitespace in a literal operator declaration is deprecated

### [\-Wdeprecated-missing-comma-variadic-parameter](#id276)[¶](#wdeprecated-missing-comma-variadic-parameter "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: declaration of a variadic function without a comma before ‘…’ is deprecated

### [\-Wdeprecated-module-dot-map](#id277)[¶](#wdeprecated-module-dot-map "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ as a module map name is deprecated, rename it to 

module.modulemap

module.private.modulemap

 in the ‘Modules’ directory of the framework

### [\-Wdeprecated-non-prototype](#id278)[¶](#wdeprecated-non-prototype "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: a function 

declaration

definition

 without a prototype is deprecated in all versions of C 

and is not supported in C23

and is treated as a zero-parameter prototype in C23, conflicting with a 

previous

subsequent

declaration

definition

warning: passing arguments to 

a function

_B_

 without a prototype is deprecated in all versions of C and is not supported in C23

### [\-Wdeprecated-objc-isa-usage](#id279)[¶](#wdeprecated-objc-isa-usage "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: assignment to Objective-C’s isa is deprecated in favor of object\_setClass()

warning: direct access to Objective-C’s isa is deprecated in favor of object\_getClass()

### [\-Wdeprecated-objc-pointer-introspection](#id280)[¶](#wdeprecated-objc-pointer-introspection "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdeprecated-objc-pointer-introspection-performSelector](#wdeprecated-objc-pointer-introspection-performselector).

**Diagnostic text:**

warning: bitmasking for introspection of Objective-C object pointers is strongly discouraged

### [\-Wdeprecated-objc-pointer-introspection-performSelector](#id281)[¶](#wdeprecated-objc-pointer-introspection-performselector "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: bitmasking for introspection of Objective-C object pointers is strongly discouraged

### [\-Wdeprecated-octal-literals](#id282)[¶](#wdeprecated-octal-literals "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: octal literals without a ‘0o’ prefix are deprecated

### [\-Wdeprecated-ofast](#id283)[¶](#wdeprecated-ofast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: argument ‘-Ofast’ is deprecated; use ‘-O3 -ffast-math’ for the same behavior, or ‘-O3’ to enable only conforming optimizations

warning: argument ‘-Ofast’ is deprecated; use ‘-O3 -ffast-math -fstack-arrays’ for the same behavior, or ‘-O3 -fstack-arrays’ to enable only conforming optimizations

### [\-Wdeprecated-pragma](#id284)[¶](#wdeprecated-pragma "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: macro _A_ has been marked as deprecated

: _C_

### [\-Wdeprecated-redundant-constexpr-static-def](#id285)[¶](#wdeprecated-redundant-constexpr-static-def "Link to this heading")

**Diagnostic text:**

warning: out-of-line definition of constexpr static data member is redundant in C++17 and is deprecated

### [\-Wdeprecated-register](#id286)[¶](#wdeprecated-register "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘register’ storage class specifier is deprecated and incompatible with C++17

### [\-Wdeprecated-this-capture](#id287)[¶](#wdeprecated-this-capture "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit capture of ‘this’ with a capture default of ‘=’ is deprecated

### [\-Wdeprecated-type](#id288)[¶](#wdeprecated-type "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘\_ExtInt’ is deprecated; use ‘\_BitInt’ instead

### [\-Wdeprecated-volatile](#id289)[¶](#wdeprecated-volatile "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

decrement

increment

 of object of volatile-qualified type _B_ is deprecated

warning: use of result of assignment to object of volatile-qualified type _A_ is deprecated

warning: volatile-qualified parameter type _A_ is deprecated

warning: volatile-qualified return type _A_ is deprecated

warning: volatile qualifier in structured binding declaration is deprecated

### [\-Wdeprecated-writable-strings](#id290)[¶](#wdeprecated-writable-strings "Link to this heading")

Synonym for [\-Wc++11-compat-deprecated-writable-strings](#wc-11-compat-deprecated-writable-strings).

### [\-Wdirect-ivar-access](#id291)[¶](#wdirect-ivar-access "Link to this heading")

**Diagnostic text:**

warning: instance variable _A_ is being directly accessed

### [\-Wdisabled-macro-expansion](#id292)[¶](#wdisabled-macro-expansion "Link to this heading")

**Diagnostic text:**

warning: disabled expansion of recursive macro

### [\-Wdisabled-optimization](#id293)[¶](#wdisabled-optimization "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wdiscard-qual](#id294)[¶](#wdiscard-qual "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wdistributed-object-modifiers](#id295)[¶](#wdistributed-object-modifiers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: conflicting distributed object modifiers on parameter type in implementation of _A_

warning: conflicting distributed object modifiers on return type in implementation of _A_

### [\-Wdiv-by-zero](#id296)[¶](#wdiv-by-zero "Link to this heading")

Synonym for [\-Wdivision-by-zero](#wdivision-by-zero).

### [\-Wdivision-by-zero](#id297)[¶](#wdivision-by-zero "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

remainder

division

 by zero is undefined

### [\-Wdll-attribute-on-redeclaration](#id298)[¶](#wdll-attribute-on-redeclaration "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: redeclaration of _A_ should not add _B_ attribute

### [\-Wdllexport-explicit-instantiation-decl](#id299)[¶](#wdllexport-explicit-instantiation-decl "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: explicit instantiation declaration should not be ‘dllexport’

### [\-Wdllimport-static-field-def](#id300)[¶](#wdllimport-static-field-def "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: definition of dllimport static field

### [\-Wdocumentation](#id301)[¶](#wdocumentation "Link to this heading")

Also controls [\-Wdocumentation-deprecated-sync](#wdocumentation-deprecated-sync), [\-Wdocumentation-html](#wdocumentation-html).

**Diagnostic text:**

warning: ‘

\\

@

class

interface

protocol

struct

union

‘ command should not be used in a comment attached to a non-

class

interface

protocol

struct

union

 declaration

warning: duplicated command ‘

\\

@

_B_’

warning: empty paragraph passed to ‘

\\

@

_B_’ command

warning: ‘

\\

@

classdesign

coclass

dependency

helper

helperclass

helps

instancesize

ownership

performance

security

superclass

‘ command should not be used in a comment attached to a non-container declaration

warning: ‘

\\

@

function

functiongroup

method

methodgroup

callback

‘ command should be used in a comment attached to 

a function

a function

an Objective-C method

an Objective-C method

a pointer to function

 declaration

warning: HTML start tag prematurely ended, expected attribute name or ‘>’

warning: expected quoted string after equals sign

warning: ‘

\\

@

_B_’ command has 

no

_C_

 word argument

s

, expected _D_

warning: parameter ‘_A_’ is already documented

warning: unrecognized parameter passing direction, valid directions are ‘\[in\]’, ‘\[out\]’ and ‘\[in,out\]’

warning: ‘

\\

@

param’ command used in a comment that is not attached to a function declaration

warning: parameter ‘_A_’ not found in the function declaration

warning: ‘

\\

@

_B_’ command used in a comment that is attached to a 

function returning void

constructor

destructor

method returning void

warning: ‘

\\

@

_B_’ command used in a comment that is not attached to a function or method declaration

warning: template parameter ‘_A_’ is already documented

warning: ‘

\\

@

tparam’ command used in a comment that is not attached to a template declaration

warning: template parameter ‘_A_’ not found in the template declaration

warning: not a Doxygen trailing comment

warning: line splicing in Doxygen comments are not supported

warning: ‘

\\

@

_B_’ command does not terminate a verbatim text block

### [\-Wdocumentation-deprecated-sync](#id302)[¶](#wdocumentation-deprecated-sync "Link to this heading")

**Diagnostic text:**

warning: declaration is marked with ‘

\\

@

deprecated’ command but does not have a deprecation attribute

### [\-Wdocumentation-html](#id303)[¶](#wdocumentation-html "Link to this heading")

**Diagnostic text:**

warning: HTML end tag ‘_A_’ is forbidden

warning: HTML end tag does not match any start tag

warning: HTML tag ‘_A_’ requires an end tag

warning: HTML start tag ‘_A_’ closed by ‘_B_’

### [\-Wdocumentation-pedantic](#id304)[¶](#wdocumentation-pedantic "Link to this heading")

Also controls [\-Wdocumentation-unknown-command](#wdocumentation-unknown-command).

**Diagnostic text:**

warning: whitespace is not allowed in parameter passing direction

### [\-Wdocumentation-unknown-command](#id305)[¶](#wdocumentation-unknown-command "Link to this heading")

**Diagnostic text:**

warning: unknown command tag name ‘_A_’; did you mean ‘_B_’?

warning: unknown command tag name

### [\-Wdollar-in-identifier-extension](#id306)[¶](#wdollar-in-identifier-extension "Link to this heading")

**Diagnostic text:**

warning: ‘$’ in identifier

### [\-Wdouble-promotion](#id307)[¶](#wdouble-promotion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion increases floating-point precision: _A_ to _B_

### [\-Wdtor-name](#id308)[¶](#wdtor-name "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: ISO C++ considers this destructor name lookup to be ambiguous

warning: ISO C++ requires the name after ‘::~’ to be found in the same scope as the name before ‘::~’

warning: qualified destructor name only found in lexical scope; omit the qualifier to find this type name by unqualified lookup

### [\-Wdtor-typedef](#id309)[¶](#wdtor-typedef "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-dtor-typedef` can be used to disable the error.

**Diagnostic text:**

error: destructor cannot be declared using a 

typedef

type alias

 _A_ of the class name

### [\-Wduplicate-decl-specifier](#id310)[¶](#wduplicate-decl-specifier "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: duplicate ‘_A_’ declaration specifier

warning: duplicate ‘_A_’ declaration specifier

warning: multiple identical address spaces specified for type

warning: duplicate ‘_A_’ declaration specifier

### [\-Wduplicate-enum](#id311)[¶](#wduplicate-enum "Link to this heading")

**Diagnostic text:**

warning: element _A_ has been implicitly assigned _B_ which another element has been assigned

### [\-Wduplicate-method-arg](#id312)[¶](#wduplicate-method-arg "Link to this heading")

**Diagnostic text:**

warning: redeclaration of method parameter _A_

### [\-Wduplicate-method-match](#id313)[¶](#wduplicate-method-match "Link to this heading")

**Diagnostic text:**

warning: multiple declarations of method _A_ found and ignored

### [\-Wduplicate-protocol](#id314)[¶](#wduplicate-protocol "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: duplicate protocol definition of _A_ is ignored

### [\-Wdxil-validation](#id315)[¶](#wdxil-validation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dxv not found; resulting DXIL will not be validated or signed for use in release environment

### [\-Wdynamic-class-memaccess](#id316)[¶](#wdynamic-class-memaccess "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

destination for

source of

first operand of

second operand of

 this _B_ call is a pointer to 

class containing a 

dynamic class _D_; vtable pointer will be 

overwritten

copied

moved

compared

### [\-Wdynamic-exception-spec](#id317)[¶](#wdynamic-exception-spec "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-dynamic-exception-spec](#wdeprecated-dynamic-exception-spec).

**Diagnostic text:**

error: ISO C++17 does not allow dynamic exception specifications

### [\-Weager-load-cxx-named-modules](#id318)[¶](#weager-load-cxx-named-modules "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: the form ‘-fmodule-file=<BMI-path>’ is deprecated for standard C++ named modules; consider to use ‘-fmodule-file=<module-name>=<BMI-path>’ instead

### [\-Weffc++](#id319)[¶](#weffc "Link to this heading")

Synonym for [\-Wnon-virtual-dtor](#wnon-virtual-dtor).

### [\-Welaborated-enum-base](#id320)[¶](#welaborated-enum-base "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-elaborated-enum-base` can be used to disable the error.

**Diagnostic text:**

error: non-defining declaration of enumeration with a fixed underlying type is only permitted as a standalone declaration

; missing list of enumerators?

### [\-Welaborated-enum-class](#id321)[¶](#welaborated-enum-class "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-elaborated-enum-class` can be used to disable the error.

**Diagnostic text:**

error: reference to enumeration must use ‘enum’ not ‘enum 

struct

class

‘

### [\-Wembedded-directive](#id322)[¶](#wembedded-directive "Link to this heading")

**Diagnostic text:**

warning: embedding a directive within macro arguments has undefined behavior

### [\-Wempty-body](#id323)[¶](#wempty-body "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: for loop has empty body

warning: if statement has empty body

warning: range-based for loop has empty body

warning: switch statement has empty body

warning: while loop has empty body

### [\-Wempty-decomposition](#id324)[¶](#wempty-decomposition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++17 does not allow a decomposition group to be empty

### [\-Wempty-init-stmt](#id325)[¶](#wempty-init-stmt "Link to this heading")

**Diagnostic text:**

warning: empty initialization statement of ‘

if

switch

range-based for

‘ has no effect

### [\-Wempty-translation-unit](#id326)[¶](#wempty-translation-unit "Link to this heading")

**Diagnostic text:**

warning: ISO C requires a translation unit to contain at least one declaration

### [\-Wencode-type](#id327)[¶](#wencode-type "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: encoding of _A_ type is incomplete because _B_ component has unknown encoding

### [\-Wendif-labels](#id328)[¶](#wendif-labels "Link to this heading")

Synonym for [\-Wextra-tokens](#wextra-tokens).

### [\-Wenum-compare](#id329)[¶](#wenum-compare "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdeprecated-enum-compare](#wdeprecated-enum-compare), [\-Wenum-compare-switch](#wenum-compare-switch).

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

### [\-Wenum-compare-conditional](#id330)[¶](#wenum-compare-conditional "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-enum-compare-conditional](#wdeprecated-enum-compare-conditional).

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

### [\-Wenum-compare-switch](#id331)[¶](#wenum-compare-switch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparison of different enumeration types in switch statement

 (_A_ and _B_)

### [\-Wenum-conversion](#id332)[¶](#wenum-conversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wenum-compare-conditional](#wenum-compare-conditional), [\-Wenum-enum-conversion](#wenum-enum-conversion), [\-Wenum-float-conversion](#wenum-float-conversion), [\-Wimplicit-enum-enum-cast](#wimplicit-enum-enum-cast).

### [\-Wenum-enum-conversion](#id333)[¶](#wenum-enum-conversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-enum-enum-conversion](#wdeprecated-enum-enum-conversion).

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

error: invalid 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

 different enumeration types

 (_B_ and _C_)

### [\-Wenum-float-conversion](#id334)[¶](#wenum-float-conversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-enum-float-conversion](#wdeprecated-enum-float-conversion).

**Diagnostic text:**

warning: 

arithmetic between

bitwise operation between

comparison of

conditional expression between

compound assignment of

floating-point

enumeration

 type _C_ 

with

from

and

enumeration

floating-point

 type _D_

### [\-Wenum-too-large](#id335)[¶](#wenum-too-large "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: enumeration values exceed range of largest integer

warning: incremented enumerator value _A_ is not representable in the largest integer type

### [\-Wexceptions](#id336)[¶](#wexceptions "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cannot refer to a non-static member from the handler of a 

constructor

destructor

 function try block

warning: exception of type _A_ will be caught by earlier handler

warning: _A_ has a non-throwing exception specification but can still throw

### [\-Wexcess-initializers](#id337)[¶](#wexcess-initializers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: excess elements in 

array

vector

scalar

union

struct

 initializer

warning: excess elements in initializer for indivisible sizeless type _A_

warning: excess elements in char array initializer

warning: initializer-string for char array is too long

### [\-Wexcessive-regsave](#id338)[¶](#wexcessive-regsave "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

interrupt service routine

function with attribute ‘no\_caller\_saved\_registers’

 should only call a function with attribute ‘no\_caller\_saved\_registers’ or be compiled with ‘-mgeneral-regs-only’

### [\-Wexit-time-destructors](#id339)[¶](#wexit-time-destructors "Link to this heading")

**Diagnostic text:**

warning: declaration requires an exit-time destructor

### [\-Wexpansion-to-defined](#id340)[¶](#wexpansion-to-defined "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: macro expansion producing ‘defined’ has undefined behavior

warning: macro expansion producing ‘defined’ has undefined behavior

### [\-Wexperimental-lifetime-safety](#id342)[¶](#wexperimental-lifetime-safety "Link to this heading")

Controls [\-Wexperimental-lifetime-safety-permissive](#wexperimental-lifetime-safety-permissive), [\-Wexperimental-lifetime-safety-strict](#wexperimental-lifetime-safety-strict).

> Experimental warnings to detect use-after-free and related temporal safety bugs based on lifetime safety analysis.

### [\-Wexperimental-lifetime-safety-permissive](#id343)[¶](#wexperimental-lifetime-safety-permissive "Link to this heading")

**Diagnostic text:**

warning: object whose reference is captured does not live long enough

### [\-Wexperimental-lifetime-safety-strict](#id344)[¶](#wexperimental-lifetime-safety-strict "Link to this heading")

**Diagnostic text:**

warning: object whose reference is captured may not live long enough

### [\-Wexperimental-option](#id345)[¶](#wexperimental-option "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: OpenMP support for version _A_ in flang is still incomplete

### [\-Wexplicit-initialize-call](#id346)[¶](#wexplicit-initialize-call "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: explicit call to +initialize results in duplicate call to +initialize

warning: explicit call to \[super initialize\] should only be in implementation of +initialize

### [\-Wexplicit-ownership-type](#id347)[¶](#wexplicit-ownership-type "Link to this heading")

**Diagnostic text:**

warning: method parameter of type _A_ with no explicit ownership

### [\-Wexplicit-specialization-storage-class](#id348)[¶](#wexplicit-specialization-storage-class "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: explicit specialization cannot have a storage class

### [\-Wexport-unnamed](#id349)[¶](#wexport-unnamed "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wext-cxx-type-aware-allocators](#id350)[¶](#wext-cxx-type-aware-allocators "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: type aware allocators are a Clang extension

### [\-Wextern-c-compat](#id351)[¶](#wextern-c-compat "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

empty 

struct

union

 has size 0 in C, 

size 1

non-zero size

 in C++

### [\-Wextern-initializer](#id352)[¶](#wextern-initializer "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘extern’ variable has an initializer

### [\-Wfinal-dtor-non-final-class](#id360)[¶](#wfinal-dtor-non-final-class "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: class with destructor marked ‘

final

sealed

‘ cannot be inherited from

### [\-Wfinal-macro](#id361)[¶](#wfinal-macro "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: macro _A_ has been marked as final and should not be 

undefined

redefined

### [\-Wfixed-point-overflow](#id362)[¶](#wfixed-point-overflow "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overflow in expression; result is _A_ with type _B_

### [\-Wflag-enum](#id363)[¶](#wflag-enum "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: enumeration value _A_ is out of range of flags in enumeration type _B_

### [\-Wflexible-array-extensions](#id364)[¶](#wflexible-array-extensions "Link to this heading")

**Diagnostic text:**

warning: _A_ may not be used as an array element due to flexible array member

warning: _A_ may not be nested in a struct due to flexible array member

### [\-Wfloat-conversion](#id365)[¶](#wfloat-conversion "Link to this heading")

Also controls [\-Wfloat-overflow-conversion](#wfloat-overflow-conversion), [\-Wfloat-zero-conversion](#wfloat-zero-conversion).

**Diagnostic text:**

warning: implicit conversion turns floating-point number into integer: _A_ to _B_

### [\-Wfloat-equal](#id366)[¶](#wfloat-equal "Link to this heading")

**Diagnostic text:**

warning: comparing floating point with == or != is unsafe

### [\-Wfloat-overflow-conversion](#id367)[¶](#wfloat-overflow-conversion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion from _A_ to _B_ changes value from _C_ to _D_

warning: implicit conversion of out of range value from _A_ to _B_ is undefined

### [\-Wfloat-zero-conversion](#id368)[¶](#wfloat-zero-conversion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion from _A_ to _B_ changes non-zero value from _C_ to _D_

### [\-Wfor-loop-analysis](#id369)[¶](#wfor-loop-analysis "Link to this heading")

**Diagnostic text:**

warning: variable _A_ is 

decremented

incremented

 both in the loop header and in the loop body

warning: variable

s

 _B_

s _B_ and _C_

s _B_, _C_, and _D_

s _B_, _C_, _D_, and _E_

 used in loop condition not modified in loop body

### [\-Wformat](#id370)[¶](#wformat "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wformat-extra-args](#wformat-extra-args), [\-Wformat-insufficient-args](#wformat-insufficient-args), [\-Wformat-invalid-specifier](#wformat-invalid-specifier), [\-Wformat-overflow](#wformat-overflow), [\-Wformat-security](#wformat-security), [\-Wformat-truncation](#wformat-truncation), [\-Wformat-y2k](#wformat-y2k), [\-Wformat-zero-length](#wformat-zero-length), [\-Wnonnull](#wnonnull).

**Diagnostic text:**

warning: using ‘%%P’ format specifier without precision

warning: using ‘%%P’ format specifier with an Objective-C pointer results in dumping runtime object structure, not object value

warning: 

values of type

enum values with underlying type

 ‘_A_’ should not be used as format arguments; add an explicit cast to _B_ instead

warning: using ‘_A_’ format specifier, but argument has boolean value

warning: format argument modifies specifier at position _A_, but it should modify specifier at position _B_

warning: format argument is 

a value

an indirect field width

an indirect precision

an auxiliary value

, but it should be 

a value

an indirect field width

an indirect precision

an auxiliary value

warning: argument sensitivity is 

unspecified

private

public

sensitive

, but it should be 

unspecified

private

public

sensitive

warning: format specifier ‘_A_’ is incompatible with ‘_B_’

warning: format specifies type _A_ but the argument has 

type

underlying type

 _B_

warning: using ‘_A_’ format specifier annotation outside of os\_log()/os\_trace()

warning: invalid position specified for 

field width

field precision

warning: cannot mix positional and non-positional arguments in format string

warning: length modifier ‘_A_’ results in undefined behavior or no effect with ‘_B_’ conversion specifier

warning: format string should not be a wide string

warning: passing ‘_A_’ format string where ‘_B_’ format string is expected

warning: position arguments in format strings start counting at 1 (not 0)

warning: format string missing

warning: object format flags cannot be used with ‘_A_’ conversion specifier

warning: ‘

\*

.\*

‘ specified field 

width

precision

 is missing a matching ‘int’ argument

warning: field 

width

precision

 should have type _B_, but argument has type _C_

warning: missing object format flag

warning: format string contains ‘\\0’ within the string body

warning: format string is not null-terminated

warning: flag ‘_A_’ is ignored when flag ‘_B_’ is present

warning: incomplete format specifier

warning: ‘_A_’ is not a valid object format flag

warning: ‘%%n’ specifier not supported on this platform

warning: flag ‘_A_’ results in undefined behavior with ‘_B_’ conversion specifier

warning: 

field width

precision

 used with ‘_B_’ conversion specifier, resulting in undefined behavior

warning: data argument position ‘_A_’ exceeds the number of data arguments (_B_)

warning: zero field width in scanf format string is unused

warning: no closing ‘\]’ for ‘%%\[’ in scanf format string

### [\-Wformat-insufficient-args](#id372)[¶](#wformat-insufficient-args "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

fewer

more

 specifiers in format string than expected

warning: more ‘%%’ conversions than data arguments

### [\-Wformat-invalid-specifier](#id373)[¶](#wformat-invalid-specifier "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: invalid conversion specifier ‘_A_’

### [\-Wformat-non-iso](#id374)[¶](#wformat-non-iso "Link to this heading")

**Diagnostic text:**

warning: ‘_A_’ 

length modifier

conversion specifier

 is not supported by ISO C

warning: using length modifier ‘_A_’ with conversion specifier ‘_B_’ is not supported by ISO C

warning: positional arguments are not supported by ISO C

### [\-Wformat-nonliteral](#id375)[¶](#wformat-nonliteral "Link to this heading")

**Diagnostic text:**

warning: format string is not a string literal

### [\-Wformat-overflow](#id376)[¶](#wformat-overflow "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wformat-overflow-non-kprintf](#wformat-overflow-non-kprintf).

**Diagnostic text:**

warning: ‘_A_’ will always overflow; destination buffer has size _B_, but format string expands to at least _C_

### [\-Wformat-overflow-non-kprintf](#id377)[¶](#wformat-overflow-non-kprintf "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ will always overflow; destination buffer has size _B_, but format string expands to at least _C_

### [\-Wformat-pedantic](#id378)[¶](#wformat-pedantic "Link to this heading")

**Diagnostic text:**

warning: 

values of type

enum values with underlying type

 ‘_A_’ should not be used as format arguments; add an explicit cast to _B_ instead

warning: signedness of format specifier ‘_A_’ is incompatible with ‘_B_’

warning: format specifies type _A_ but the argument has 

type

underlying type

 _B_

### [\-Wformat-security](#id379)[¶](#wformat-security "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: format string is not a string literal (potentially insecure)

### [\-Wformat-signedness](#id380)[¶](#wformat-signedness "Link to this heading")

**Diagnostic text:**

warning: signedness of format specifier ‘_A_’ is incompatible with ‘_B_’

warning: format specifies type _A_ but the argument has 

type

underlying type

 _B_, which differs in signedness

### [\-Wformat-truncation](#id381)[¶](#wformat-truncation "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wformat-truncation-non-kprintf](#wformat-truncation-non-kprintf).

**Diagnostic text:**

warning: ‘_A_’ will always be truncated; specified size is _B_, but format string expands to at least _C_

### [\-Wformat-truncation-non-kprintf](#id382)[¶](#wformat-truncation-non-kprintf "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ will always be truncated; specified size is _B_, but format string expands to at least _C_

### [\-Wformat-type-confusion](#id383)[¶](#wformat-type-confusion "Link to this heading")

**Diagnostic text:**

warning: format specifies type _A_ but the argument has 

type

underlying type

 _B_

### [\-Wformat-y2k](#id384)[¶](#wformat-y2k "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wformat-zero-length](#id385)[¶](#wformat-zero-length "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: format string is empty

### [\-Wformat=2](#id386)[¶](#wformat-2 "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wformat-nonliteral](#wformat-nonliteral), [\-Wformat-security](#wformat-security), [\-Wformat-y2k](#wformat-y2k).

### [\-Wfortify-source](#id387)[¶](#wfortify-source "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wformat-overflow](#wformat-overflow), [\-Wformat-truncation](#wformat-truncation).

**Diagnostic text:**

warning: ‘_A_’ may overflow; destination buffer in argument _B_ has size _C_, but the corresponding specifier may require size _D_

warning: ‘_A_’ will always overflow; destination buffer has size _B_, but size argument is _C_

warning: ‘_A_’ size argument is too large; destination buffer has size _B_, but size argument is _C_

warning: ‘_A_’ will always overflow; destination buffer has size _B_, but the source string has length _C_ (including NUL byte)

### [\-Wfour-char-constants](#id388)[¶](#wfour-char-constants "Link to this heading")

**Diagnostic text:**

warning: multi-character character constant

### [\-Wframe-address](#id389)[¶](#wframe-address "Link to this heading")

**Diagnostic text:**

warning: calling ‘_A_’ with a nonzero argument is unsafe

### [\-Wframe-larger-than](#id390)[¶](#wframe-larger-than "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

warning: stack frame size (_A_) exceeds limit (_B_) in ‘_C_’

More fine grained information about the stack layout is available by adding the \-Rpass-analysis=stack-frame-layout command-line flag to the compiler invocation.

The diagnostic information can be saved to a file in a machine readable format, like YAML by adding the \-foptimization-record-file=<file> command-line flag.

Results can be filtered by function name by passing \-mllvm -filter-print-funcs=foo, where foo is the target function’s name.

> clang -c a.cpp -Rpass-analysis=stack-frame-layout -mllvm -filter-print-funcs=foo
> 
> clang -c a.cpp -Rpass-analysis=stack-frame-layout -foptimization-record-file=<file>

### [\-Wframe-larger-than=](#id391)[¶](#id1 "Link to this heading")

Synonym for [\-Wframe-larger-than](#wframe-larger-than).

### [\-Wframework-include-private-from-public](#id392)[¶](#wframework-include-private-from-public "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: public framework header includes private framework header ‘_A_’

### [\-Wfree-nonheap-object](#id393)[¶](#wfree-nonheap-object "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: attempt to call _A_ on non-heap 

object _C_

object: block expression

object: lambda-to-function-pointer conversion

### [\-Wfriend-enum](#id394)[¶](#wfriend-enum "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: elaborated enum specifier cannot be declared as a friend

### [\-Wfunction-def-in-objc-container](#id395)[¶](#wfunction-def-in-objc-container "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: function definition inside an Objective-C container is deprecated

### [\-Wfunction-effect-redeclarations](#id396)[¶](#wfunction-effect-redeclarations "Link to this heading")

**Diagnostic text:**

warning: overriding function is missing ‘_A_’ attribute from base declaration

warning: redeclaration is missing ‘_A_’ attribute from previous declaration

### [\-Wfunction-effects](#id397)[¶](#wfunction-effects "Link to this heading")

**Diagnostic text:**

warning: attribute ‘_A_’ on overriding function conflicts with base declaration

warning: effects conflict when merging declarations; kept ‘_A_’, discarded ‘_B_’

warning: 

function

constructor

destructor

lambda

block

member initializer of constructor

 with ‘_B_’ attribute must not call non-’_B_’ expression

warning: 

function

constructor

destructor

lambda

block

member initializer of constructor

 with ‘_B_’ attribute must not call non-’_B_’ 

function

constructor

destructor

lambda

block

 ‘_D_’

warning: 

function

constructor

destructor

lambda

block

member initializer of constructor

 with ‘_B_’ attribute must not 

allocate or deallocate memory

throw or catch exceptions

have static local variables

use thread-local variables

access ObjC methods or properties

warning: attribute ‘_A_’ should not be added via type conversion

### [\-Wfunction-multiversion](#id398)[¶](#wfunction-multiversion "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wtarget-clones-mixed-specifiers](#wtarget-clones-mixed-specifiers).

**Diagnostic text:**

warning: body of cpu\_dispatch function will be ignored

warning: CPU list contains duplicate entries; attribute ignored

warning: version list contains duplicate entries

warning: version list contains entries that don’t impact code generation

### [\-Wfuse-ld-path](#id399)[¶](#wfuse-ld-path "Link to this heading")

**Diagnostic text:**

warning: ‘-fuse-ld=’ taking a path is deprecated; use ‘–ld-path=’ instead

### [\-Wfuture-attribute-extensions](#id400)[¶](#wfuture-attribute-extensions "Link to this heading")

Controls [\-Wc++14-attribute-extensions](#wc-14-attribute-extensions), [\-Wc++17-attribute-extensions](#wc-17-attribute-extensions), [\-Wc++20-attribute-extensions](#wc-20-attribute-extensions), [\-Wc++23-attribute-extensions](#wc-23-attribute-extensions).

### [\-Wfuture-compat](#id401)[¶](#wfuture-compat "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wgcc-compat](#id402)[¶](#wgcc-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: ‘diagnose\_if’ is a clang extension

warning: ‘enable\_if’ is a clang extension

warning: \_\_final is a GNU extension, consider using C++11 final

warning: GCC does not allow _A_ attribute in this position on a function definition

warning: ‘break’ is bound to loop, GCC binds it to switch

warning: GCC does not allow the ‘cleanup’ attribute argument to be anything other than a simple identifier

warning: GCC does not allow an attribute in this position on a function declaration

warning: GCC does not allow the _A_ attribute to be written on a type

warning: GCC requires a function with the _A_ attribute to be variadic

warning: GCC does not allow variable declarations in for loop initializers before C99

warning: ‘_A_’ is bound to current loop, GCC binds it to the enclosing loop

### [\-Wgcc-install-dir-libstdcxx](#id403)[¶](#wgcc-install-dir-libstdcxx "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: future releases of the clang compiler will prefer GCC installations containing libstdc++ include directories; ‘_A_’ would be chosen over ‘_B_’

### [\-Wglobal-constructors](#id404)[¶](#wglobal-constructors "Link to this heading")

**Diagnostic text:**

warning: declaration requires a global constructor

warning: declaration requires a global destructor

Emit a warning for each variable declaration that generates code run at startup.

### [\-Wglobal-isel](#id405)[¶](#wglobal-isel "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \-fglobal-isel support for the ‘_A_’ architecture is incomplete

warning: \-fglobal-isel support is incomplete for this architecture at the current optimization level

### [\-Wgnu](#id406)[¶](#wgnu "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wgnu-alignof-expression](#wgnu-alignof-expression), [\-Wgnu-anonymous-struct](#wgnu-anonymous-struct), [\-Wgnu-auto-type](#wgnu-auto-type), [\-Wgnu-binary-literal](#wgnu-binary-literal), [\-Wgnu-case-range](#wgnu-case-range), [\-Wgnu-complex-integer](#wgnu-complex-integer), [\-Wgnu-compound-literal-initializer](#wgnu-compound-literal-initializer), [\-Wgnu-conditional-omitted-operand](#wgnu-conditional-omitted-operand), [\-Wgnu-designator](#wgnu-designator), [\-Wgnu-empty-struct](#wgnu-empty-struct), [\-Wgnu-flexible-array-initializer](#wgnu-flexible-array-initializer), [\-Wgnu-flexible-array-union-member](#wgnu-flexible-array-union-member), [\-Wgnu-folding-constant](#wgnu-folding-constant), [\-Wgnu-imaginary-constant](#wgnu-imaginary-constant), [\-Wgnu-include-next](#wgnu-include-next), [\-Wgnu-label-as-value](#wgnu-label-as-value), [\-Wgnu-line-marker](#wgnu-line-marker), [\-Wgnu-null-pointer-arithmetic](#wgnu-null-pointer-arithmetic), [\-Wgnu-offsetof-extensions](#wgnu-offsetof-extensions), [\-Wgnu-pointer-arith](#wgnu-pointer-arith), [\-Wgnu-redeclared-enum](#wgnu-redeclared-enum), [\-Wgnu-statement-expression](#wgnu-statement-expression), [\-Wgnu-static-float-init](#wgnu-static-float-init), [\-Wgnu-string-literal-operator-template](#wgnu-string-literal-operator-template), [\-Wgnu-union-cast](#wgnu-union-cast), [\-Wgnu-variable-sized-type-not-at-end](#wgnu-variable-sized-type-not-at-end), [\-Wgnu-zero-line-directive](#wgnu-zero-line-directive), [\-Wgnu-zero-variadic-macro-arguments](#wgnu-zero-variadic-macro-arguments), [\-Wredeclared-class-member](#wredeclared-class-member), [\-Wvla-extension](#wvla-extension), [\-Wzero-length-array](#wzero-length-array).

### [\-Wgnu-alignof-expression](#id407)[¶](#wgnu-alignof-expression "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ applied to an expression is a GNU extension

### [\-Wgnu-anonymous-struct](#id408)[¶](#wgnu-anonymous-struct "Link to this heading")

**Diagnostic text:**

warning: anonymous structs are a GNU extension

### [\-Wgnu-array-member-paren-init](#id409)[¶](#wgnu-array-member-paren-init "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-gnu-array-member-paren-init` can be used to disable the error.

**Diagnostic text:**

error: parenthesized initialization of a member array is a GNU extension

### [\-Wgnu-auto-type](#id410)[¶](#wgnu-auto-type "Link to this heading")

**Diagnostic text:**

warning: ‘\_\_auto\_type’ is a GNU extension

### [\-Wgnu-binary-literal](#id411)[¶](#wgnu-binary-literal "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wgnu-case-range](#id412)[¶](#wgnu-case-range "Link to this heading")

**Diagnostic text:**

warning: case ranges are a GNU extension

### [\-Wgnu-complex-integer](#id413)[¶](#wgnu-complex-integer "Link to this heading")

**Diagnostic text:**

warning: complex integer types are a GNU extension

### [\-Wgnu-compound-literal-initializer](#id414)[¶](#wgnu-compound-literal-initializer "Link to this heading")

**Diagnostic text:**

warning: initialization of an array 

of type _A_ from a compound literal of type _B_

from a compound literal

 is a GNU extension

### [\-Wgnu-conditional-omitted-operand](#id415)[¶](#wgnu-conditional-omitted-operand "Link to this heading")

**Diagnostic text:**

warning: use of GNU ?: conditional expression extension, omitting middle operand

### [\-Wgnu-designator](#id416)[¶](#wgnu-designator "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: use of GNU array range extension

warning: use of GNU ‘missing =’ extension in designator

warning: use of GNU old-style field designator extension

### [\-Wgnu-empty-initializer](#id417)[¶](#wgnu-empty-initializer "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wgnu-empty-struct](#id418)[¶](#wgnu-empty-struct "Link to this heading")

**Diagnostic text:**

warning: empty 

struct

union

 is a GNU extension

warning: flexible array member _A_ in otherwise empty 

struct

interface

union

class

enum

 is a GNU extension

warning: 

struct

union

 without named members is a GNU extension

### [\-Wgnu-flexible-array-initializer](#id419)[¶](#wgnu-flexible-array-initializer "Link to this heading")

**Diagnostic text:**

warning: flexible array initialization is a GNU extension

### [\-Wgnu-flexible-array-union-member](#id420)[¶](#wgnu-flexible-array-union-member "Link to this heading")

**Diagnostic text:**

warning: flexible array member _A_ in a union is a GNU extension

### [\-Wgnu-folding-constant](#id421)[¶](#wgnu-folding-constant "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: expression is not an 

integer

integral

 constant expression; folding it to a constant is a GNU extension

warning: in-class initializer for static data member is not a constant expression; folding it to a constant is a GNU extension

warning: variable length array folded to constant array as an extension

### [\-Wgnu-imaginary-constant](#id422)[¶](#wgnu-imaginary-constant "Link to this heading")

**Diagnostic text:**

warning: imaginary constants are a GNU extension

### [\-Wgnu-include-next](#id423)[¶](#wgnu-include-next "Link to this heading")

**Diagnostic text:**

warning: #include\_next is a language extension

### [\-Wgnu-inline-cpp-without-extern](#id424)[¶](#wgnu-inline-cpp-without-extern "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘gnu\_inline’ attribute without ‘extern’ in C++ treated as externally available, this changed in Clang 10

### [\-Wgnu-label-as-value](#id425)[¶](#wgnu-label-as-value "Link to this heading")

**Diagnostic text:**

warning: use of GNU address-of-label extension

warning: use of GNU indirect-goto extension

### [\-Wgnu-line-marker](#id426)[¶](#wgnu-line-marker "Link to this heading")

**Diagnostic text:**

warning: this style of line directive is a GNU extension

### [\-Wgnu-null-pointer-arithmetic](#id427)[¶](#wgnu-null-pointer-arithmetic "Link to this heading")

**Diagnostic text:**

warning: arithmetic on a null pointer treated as a cast from integer to pointer is a GNU extension

### [\-Wgnu-offsetof-extensions](#id428)[¶](#wgnu-offsetof-extensions "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wgnu-pointer-arith](#id429)[¶](#wgnu-pointer-arith "Link to this heading")

**Diagnostic text:**

warning: arithmetic on

 a

 pointer

s

 to

 the

 function type

s

 _B_

 and _D_

 is a GNU extension

warning: subscript of a pointer to void is a GNU extension

warning: arithmetic on

 a

 pointer

s

 to void is a GNU extension

### [\-Wgnu-redeclared-enum](#id430)[¶](#wgnu-redeclared-enum "Link to this heading")

**Diagnostic text:**

warning: redeclaration of already-defined enum _A_ is a GNU extension

### [\-Wgnu-statement-expression](#id431)[¶](#wgnu-statement-expression "Link to this heading")

Also controls [\-Wgnu-statement-expression-from-macro-expansion](#wgnu-statement-expression-from-macro-expansion).

**Diagnostic text:**

warning: use of GNU statement expression extension

### [\-Wgnu-statement-expression-from-macro-expansion](#id432)[¶](#wgnu-statement-expression-from-macro-expansion "Link to this heading")

**Diagnostic text:**

warning: use of GNU statement expression extension from macro expansion

### [\-Wgnu-static-float-init](#id433)[¶](#wgnu-static-float-init "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: in-class initializer for static data member of type _A_ is a GNU extension

### [\-Wgnu-string-literal-operator-template](#id434)[¶](#wgnu-string-literal-operator-template "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: string literal operator templates are a GNU extension

### [\-Wgnu-union-cast](#id435)[¶](#wgnu-union-cast "Link to this heading")

**Diagnostic text:**

warning: cast to union type is a GNU extension

### [\-Wgnu-variable-sized-type-not-at-end](#id436)[¶](#wgnu-variable-sized-type-not-at-end "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: field _A_ with variable sized type _B_ not at the end of a struct or class is a GNU extension

### [\-Wgnu-zero-line-directive](#id437)[¶](#wgnu-zero-line-directive "Link to this heading")

**Diagnostic text:**

warning: #line directive with zero argument is a GNU extension

### [\-Wgnu-zero-variadic-macro-arguments](#id438)[¶](#wgnu-zero-variadic-macro-arguments "Link to this heading")

Also controls [\-Wvariadic-macro-arguments-omitted](#wvariadic-macro-arguments-omitted).

**Diagnostic text:**

warning: token pasting of ‘,’ and \_\_VA\_ARGS\_\_ is a GNU extension

### [\-Wgpu-maybe-wrong-side](#id439)[¶](#wgpu-maybe-wrong-side "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: capture host side class data member by this pointer in device or host device lambda function may result in invalid memory access if this pointer is not accessible on device side

### [\-Whigher-precision-for-complex-division](#id442)[¶](#whigher-precision-for-complex-division "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: excess precision is requested but the target does not support excess precision which may result in observable differences in complex division behavior

, additional uses where the requested higher precision cannot be honored were found but not diagnosed

### [\-Whip-omp-target-directives](#id443)[¶](#whip-omp-target-directives "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-hip-omp-target-directives` can be used to disable the error.

**Diagnostic text:**

error: HIP does not support OpenMP target directives; directive has been ignored

### [\-Whip-only](#id444)[¶](#whip-only "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ is ignored since it is only supported for HIP

### [\-Whlsl-202y-extensions](#id445)[¶](#whlsl-202y-extensions "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘auto’ type specifier is a 

C++11

HLSL 202y

 extension

### [\-Whlsl-availability](#id446)[¶](#whlsl-availability "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-hlsl-availability` can be used to disable the error.

**Diagnostic text:**

error: _A_ is only available 

in _E_ environment 

on _B_ _C_ or newer

error: _A_ is unavailable

### [\-Whlsl-dxc-compatability](#id447)[¶](#whlsl-dxc-compatability "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: support for HLSL language version _A_ is incomplete, recommend using _B_ instead

### [\-Whlsl-extensions](#id448)[¶](#whlsl-extensions "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Whlsl-202y-extensions](#whlsl-202y-extensions).

**Diagnostic text:**

warning: access specifiers are a clang HLSL extension

warning: lambdas are a 

C++11

clang HLSL

 extension

### [\-Whlsl-implicit-binding](#id449)[¶](#whlsl-implicit-binding "Link to this heading")

**Diagnostic text:**

warning: resource has implicit register binding

### [\-Widiomatic-parentheses](#id450)[¶](#widiomatic-parentheses "Link to this heading")

**Diagnostic text:**

warning: using the result of an assignment as a condition without parentheses

### [\-Wignored-attributes](#id451)[¶](#wignored-attributes "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘trivial\_abi’ cannot be applied to _A_

warning: 

alias

ifunc

 will always resolve to _A_ even if weak definition of _B_ is overridden

warning: 

alias

ifunc

 will not be in section ‘_A_’ but in the same section as the 

aliasee

resolver

warning: requested alignment is less than minimum alignment of _B_ for type _A_

warning: ‘abi\_tag’ attribute on 

non-inline

anonymous

 namespace ignored

warning: attribute _A_ after definition is ignored

warning: ‘cmse\_nonsecure\_entry’ cannot be applied to functions with internal linkage

warning: ‘dllexport’ attribute ignored on explicit instantiation definition

warning: _A_ attribute ignored on local class

 member

warning: _A_ attribute ignored because Clang does not yet support this attribute signature

warning: attribute _A_ has no effect when annotating an ‘if 

constexpr

consteval

‘ statement

warning: attribute _A_ has no effect when annotating an infinite loop

warning: ‘hybrid\_patchable’ is ignored on functions without external linkage

warning: _A_ attribute can only be applied to instance variables or properties

warning: _A_ attribute ignored

warning: _A_ attribute ignored for field of type _B_

warning: _A_ attribute is ignored because there exists no call expression inside the statement

warning: _A_ attribute is ignored because _B_ is not a function pointer

warning: _A_ attribute ignored on inline function

warning: _A_ attribute ignored on a non-definition declaration

warning: ‘_A_’ attribute cannot be specified on a definition

warning: _A_ attribute is ignored in non-aggregate type _B_

warning: attribute _A_ ignored, because it is not attached to a declaration

warning: _A_

 attribute

 only applies to fields or variables of character array type; type is _C_

warning: ‘nonnull’ attribute applied to function with no pointer arguments

warning: ‘nonnull’ attribute when used on parameters takes no arguments

warning: _A_ attribute ignored when parsing type

warning: attribute _A_ cannot be applied to a ‘void’ parameter

warning: _A_ attribute only applies to a pointer or reference (_B_ is invalid)

warning: _A_ attribute only applies to

 constant

 pointer arguments

warning: attribute declaration must precede definition

warning: _A_ attribute only applies to return values that are pointers

warning: _A_ attribute only applies to return values that are pointers or references

warning: ‘sentinel’ attribute requires named arguments

warning: ‘sentinel’ attribute only supported for variadic 

functions

blocks

warning: _A_ attribute argument not supported: _B_

warning: _A_ attribute argument ‘_B_’ not supported on a global variable

warning: unknown visibility _A_

warning: attribute _A_ cannot be applied to 

functions

Objective-C method

 without return value

warning: \_\_weak attribute cannot be specified on a field declaration

warning: \_\_weak attribute cannot be specified on an automatic variable when ARC is not enabled

warning: _A_

 attribute

 only applies to 

functions

unions

variables and functions

functions and methods

functions, methods and blocks

functions, methods, and parameters

variables

variables and fields

variables, data members and tag types

types and namespaces

variables, functions and classes

kernel functions

non-K&R-style functions

for loop statements

virtual functions

parameters and implicit object parameters

non-member functions

functions, classes, or enumerations

classes

typedefs

warning: _A_

 attribute

 only applies to _C_

warning: conflicting attributes _A_ are ignored

warning: attribute _A_ ignored, because it cannot be applied to omitted return type

warning: _A_ calling convention is not supported 

for this target

on variadic function

on constructor/destructor

on builtin function

warning: ‘const’ attribute imposes more restrictions; ‘pure’ attribute ignored

warning: maxclusterrank requires sm\_90 or higher, CUDA arch provided: _A_, ignoring _B_ attribute

warning: attribute _A_ ignored, because it cannot be applied to a type

warning: ignoring \_\_declspec(allocator) because the function return type _A_ is not a pointer or reference type

warning: attribute _A_ is ignored, place it after “

class

struct

interface

union

enum

enum class

enum struct

“ to apply attribute to type declaration

warning: ‘deprecated’ attribute on anonymous namespace ignored

warning: _A_ currently has no effect on a using declaration

warning: _A_ redeclared inline; _B_ attribute ignored

warning: attribute _A_ is already applied with different arguments

warning: attribute _A_ is already applied

warning: attribute is ignored on this statement as it only applies to functions; use ‘_A_’ on statements

warning: statement attribute _A_ has higher precedence than function attribute ‘

always\_inline

flatten

noinline

‘

warning: Objective-C GC does not allow weak variables on the stack

warning: ‘gnu\_inline’ attribute requires function to be marked ‘inline’, attribute ignored

warning: inheritance model ignored on 

primary template

partial specialization

warning: ‘objc\_externally\_retained’ can only be applied to local variables 

of retainable type

with strong ownership

warning: import 

module

name

 cannot be applied to a function with a definition

warning: ‘internal\_linkage’ attribute on a non-static local variable is ignored

warning: 

MIPS

MSP430

RISC-V

AVR

 ‘

interrupt

signal

‘ attribute only applies to functions that have 

no parameters

a ‘void’ return type

warning: qualifiers after comma in declarator list are ignored

warning: ‘mig\_server\_routine’ attribute only applies to routines that return a kern\_return\_t

warning: import 

module

name

 (_B_) does not match the import 

module

name

 (_C_) of the previous declaration

warning: unknown attribute ‘_A_’

warning: ‘nocf\_check’ attribute ignored; use -fcf-protection to enable the attribute

warning: ‘noderef’ can only be used on an array or pointer type

warning: ‘nothrow’ attribute conflicts with exception specification; attribute ignored

warning: _A_ attribute only applies to 

Objective-C object

pointer

pointer-to-CF-pointer

pointer/reference-to-OSObject-pointer

 parameters

warning: _A_ attribute only applies to 

functions

methods

properties

 that return 

an Objective-C object

a pointer

a non-retainable pointer

warning: _A_ attribute isn’t implemented by this Objective-C runtime

warning: direct attribute on property _A_ ignored (not implemented by this Objective-C runtime)

warning: _A_ attribute is deprecated and ignored in _B_

warning: ‘

pure

const

‘ attribute on function returning ‘void’; attribute ignored

warning: ‘require\_constant\_initialization’ attribute added after initialization of variable

warning: repeated RISC-V ‘interrupt’ attribute

warning: template parameter of a function template with the ‘sycl\_kernel’ attribute cannot be a non-type template parameter

warning: function template with ‘sycl\_kernel’ attribute must have a single parameter

warning: ‘sycl\_kernel’ attribute only applies to a function template with at least two template parameters

warning: function template with ‘sycl\_kernel’ attribute must have a ‘void’ return type

warning: 

alignment

size

 of field _B_ (_C_ bits) does not match the 

alignment

size

 of the first field in transparent union; transparent\_union attribute ignored

warning: first field of a transparent union cannot have 

floating point

vector

 type _B_; transparent\_union attribute ignored

warning: transparent\_union attribute can only be applied to a union definition; attribute ignored

warning: transparent union definition must contain at least one field; transparent\_union attribute ignored

warning: ‘_A_’ only applies to 

function

pointer

Objective-C object or block pointer

 types; type here is _C_

warning: \_\_declspec attribute _A_ is not supported

warning: 

unsupported

duplicate

unknown

 CPU

 tune CPU

 ‘_C_’ in the ‘

target

target\_clones

target\_version

‘ attribute string; ‘

target

target\_clones

target\_version

‘ attribute ignored

warning: ‘\[\[

nodiscard

gnu::warn\_unused\_result

\]\]’ attribute ignored when applied to a typedef; consider using ‘\_\_attribute\_\_((warn\_unused\_result))’ or ‘\[\[clang::warn\_unused\_result\]\]’ instead

warning: ‘\_\_clang\_\_’ is a predefined macro name, not an attribute scope specifier; did you mean ‘\_Clang’ instead?

### [\-Wignored-availability-without-sdk-settings](#id452)[¶](#wignored-availability-without-sdk-settings "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ availability is ignored without a valid ‘SDKSettings.json’ in the SDK

### [\-Wignored-base-class-qualifiers](#id453)[¶](#wignored-base-class-qualifiers "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wignored-qualifiers](#wignored-qualifiers).

**Diagnostic text:**

warning: ‘_A_’ qualifier

s

 on base class type _C_ 

has

have

 no effect

### [\-Wignored-gch](#id454)[¶](#wignored-gch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: precompiled header directory ‘_A_’ was ignored because it contains no clang PCH files

warning: precompiled header ‘_A_’ was ignored because it is not a clang PCH file

### [\-Wignored-optimization-argument](#id455)[¶](#wignored-optimization-argument "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: optimization flag ‘_A_’ is not supported for target ‘_B_’

warning: optimization flag ‘_A_’ is not supported

### [\-Wignored-pragma-intrinsic](#id456)[¶](#wignored-pragma-intrinsic "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is not a recognized builtin

; consider including <intrin.h> to access non-builtin intrinsics

### [\-Wignored-pragma-optimize](#id457)[¶](#wignored-pragma-optimize "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wignored-pragmas](#id458)[¶](#wignored-pragmas "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wignored-pragma-intrinsic](#wignored-pragma-intrinsic), [\-Wignored-pragma-optimize](#wignored-pragma-optimize).

**Diagnostic text:**

warning: expected string literal in ‘clause _A_’ - ignoring

warning: ‘#pragma 

push\_macro

pop\_macro

‘ expected a non-empty string

warning: expected ‘=’ following ‘#pragma 

align

options align

‘ - ignored

warning: invalid alignment option in ‘#pragma 

align

options align

‘ - ignored

warning: ‘#pragma comment _A_’ ignored

warning: 

value

type

\-dependent expression passed as an argument to debug command

warning: missing argument to debug command ‘_A_’

warning: missing debug command

warning: unable to find module ‘_A_’

warning: unexpected argument to debug command

warning: unexpected debug command ‘_A_’

warning: unknown module ‘_A_’

warning: expected action or ‘)’ in ‘#pragma _A_’ - ignored

warning: missing ‘:’ after _A_ \- ignoring

warning: missing ‘:’ or ‘)’ after _A_ \- ignoring

warning: expected ‘,’ in ‘#pragma _A_’

warning: expected identifier in ‘#pragma _A_’ - ignored

warning: expected ‘compiler’, ‘lib’, ‘user’, or a string literal for the section name in ‘#pragma _A_’ - ignored

warning: expected integer between _A_ and _B_ inclusive in ‘#pragma _C_’ - ignored

warning: missing ‘(’ after ‘#pragma _A_’ - ignoring

warning: expected non-wide string literal in ‘#pragma _A_’

warning: expected 

‘enable’, ‘disable’, ‘begin’ or ‘end’

‘disable’

 \- ignoring

warning: expected ‘)’ or ‘,’ in ‘#pragma _A_’

warning: missing ‘)’ after ‘#pragma _A_’ - ignoring

warning: expected a stack label or a string literal for the section name in ‘#pragma _A_’ - ignored

warning: expected a string literal for the section name in ‘#pragma _A_’ - ignored

warning: expected push, pop or a string literal for the section name in ‘#pragma _A_’ - ignored

warning: expected string literal in ‘#pragma _A_’ - ignoring

warning: extra tokens at end of ‘#pragma _A_’ - ignored

warning: incorrect use of #pragma clang force\_cuda\_host\_device begin|end

warning: ‘#pragma _A_’ is not supported on this target - ignored

warning: ‘#pragma init\_seg’ is only supported when targeting a Microsoft environment

warning: unknown action for ‘#pragma _A_’ - ignored

warning: unexpected argument ‘_A_’ to ‘#pragma _B_’

; expected _D_

warning: unknown action ‘_B_’ for ‘#pragma _A_’ - ignored

warning: missing argument to ‘#pragma _A_’

; expected _C_

warning: incorrect use of ‘#pragma fenv\_access (on|off)’ - ignored

warning: incorrect use of ‘#pragma ms\_struct on|off’ - ignored

warning: #pragma options align=reset failed: _A_

warning: expected ‘align’ following ‘#pragma options’ - ignored

warning: expected #pragma pack parameter to be ‘1’, ‘2’, ‘4’, ‘8’, or ‘16’

warning: expected integer or identifier in ‘#pragma pack’ - ignored

warning: #pragma _A_(pop, …) failed: _B_

warning: pragma pop\_macro could not pop ‘_A_’, no matching push\_macro

warning: OpenCL extension _A_ unknown or does not require pragma - ignoring

warning: known but unsupported action ‘_B_’ for ‘#pragma _A_’ - ignored

warning: unsupported OpenCL extension _A_ \- ignoring

warning: expected ‘#pragma unused’ argument to be a variable name

warning: only variables can be arguments to ‘#pragma unused’

warning: undeclared variable _A_ used as an argument for ‘#pragma unused’

warning: invalid or unsupported rounding mode in ‘#pragma STDC FENV\_ROUND’ - ignored

### [\-Wignored-qualifiers](#id459)[¶](#wignored-qualifiers "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wignored-reference-qualifiers](#wignored-reference-qualifiers).

**Diagnostic text:**

warning: ‘_A_’ qualifier on function type _B_ has no effect and is a Clang extension

warning: ARC 

unused

\_\_unsafe\_unretained

\_\_strong

\_\_weak

\_\_autoreleasing

 lifetime qualifier on return type is ignored

warning: ‘_A_’ qualifier on omitted return type _B_ has no effect

warning: ‘_A_’ type qualifier

s

 on return type 

has

have

 no effect

warning: ‘_A_’ qualifier on function type _B_ has no effect

### [\-Wignored-reference-qualifiers](#id460)[¶](#wignored-reference-qualifiers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ qualifier on reference type _B_ has no effect

### [\-Wimplicit](#id461)[¶](#wimplicit "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wimplicit-function-declaration](#wimplicit-function-declaration), [\-Wimplicit-int](#wimplicit-int).

### [\-Wimplicit-atomic-properties](#id462)[¶](#wimplicit-atomic-properties "Link to this heading")

**Diagnostic text:**

warning: property is assumed atomic when auto-synthesizing the property

warning: property is assumed atomic by default

### [\-Wimplicit-const-int-float-conversion](#id463)[¶](#wimplicit-const-int-float-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from _C_ to _D_ changes value from _A_ to _B_

### [\-Wimplicit-conversion-floating-point-to-bool](#id464)[¶](#wimplicit-conversion-floating-point-to-bool "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion turns floating-point number into bool: _A_ to _B_

### [\-Wimplicit-enum-enum-cast](#id465)[¶](#wimplicit-enum-enum-cast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from enumeration type _A_ to different enumeration type _B_

### [\-Wimplicit-exception-spec-mismatch](#id466)[¶](#wimplicit-exception-spec-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: function previously declared with an 

explicit

implicit

 exception specification redeclared with an 

implicit

explicit

 exception specification

### [\-Wimplicit-fallthrough](#id467)[¶](#wimplicit-fallthrough "Link to this heading")

Also controls [\-Wimplicit-fallthrough-per-function](#wimplicit-fallthrough-per-function).

**Diagnostic text:**

warning: unannotated fall-through between switch labels

### [\-Wimplicit-fallthrough-per-function](#id468)[¶](#wimplicit-fallthrough-per-function "Link to this heading")

**Diagnostic text:**

warning: unannotated fall-through between switch labels in partly-annotated function

### [\-Wimplicit-fixed-point-conversion](#id469)[¶](#wimplicit-fixed-point-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from _A_ cannot fit within the range of values for _B_

### [\-Wimplicit-float-conversion](#id470)[¶](#wimplicit-float-conversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wimplicit-int-float-conversion](#wimplicit-int-float-conversion), [\-Wobjc-signed-char-bool-implicit-float-conversion](#wobjc-signed-char-bool-implicit-float-conversion).

**Diagnostic text:**

warning: implicit conversion loses floating-point precision: _A_ to _B_

warning: implicit conversion when assigning computation result loses floating-point precision: _A_ to _B_

### [\-Wimplicit-function-declaration](#id471)[¶](#wimplicit-function-declaration "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

error: call to undeclared function _A_; ISO C99 and later do not support implicit function declarations

warning: implicitly declaring library function ‘_A_’ with type _B_

error: call to undeclared library function ‘_A_’ with type _B_; ISO C99 and later do not support implicit function declarations

error: use of unknown builtin _A_

warning: implicit declaration of function _A_

### [\-Wimplicit-int](#id472)[¶](#wimplicit-int "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

error: type specifier missing, defaults to ‘int’; ISO C99 and later do not support implicit int

error: parameter _A_ was not declared, defaults to ‘int’; ISO C99 and later do not support implicit int

warning: type specifier missing, defaults to ‘int’

### [\-Wimplicit-int-conversion](#id473)[¶](#wimplicit-int-conversion "Link to this heading")

Also controls [\-Wimplicit-int-conversion-on-negation](#wimplicit-int-conversion-on-negation), [\-Wobjc-signed-char-bool-implicit-int-conversion](#wobjc-signed-char-bool-implicit-int-conversion), [\-Wshorten-64-to-32](#wshorten-64-to-32).

**Diagnostic text:**

warning: higher order bits are zeroes after implicit conversion

warning: implicit conversion loses integer precision: _A_ to _B_

### [\-Wimplicit-int-conversion-on-negation](#id474)[¶](#wimplicit-int-conversion-on-negation "Link to this heading")

**Diagnostic text:**

warning: implicit conversion loses integer precision: _A_ to _B_ on negation

### [\-Wimplicit-int-enum-cast](#id475)[¶](#wimplicit-int-enum-cast "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wimplicit-enum-enum-cast](#wimplicit-enum-enum-cast).

**Diagnostic text:**

warning: implicit conversion from _A_ to enumeration type _B_ is invalid in C++

### [\-Wimplicit-int-float-conversion](#id476)[¶](#wimplicit-int-float-conversion "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wimplicit-const-int-float-conversion](#wimplicit-const-int-float-conversion).

**Diagnostic text:**

warning: implicit conversion from _A_ to _B_ may lose precision

### [\-Wimplicit-retain-self](#id477)[¶](#wimplicit-retain-self "Link to this heading")

**Diagnostic text:**

warning: block implicitly retains ‘self’; explicitly mention ‘self’ to indicate this is intended behavior

### [\-Wimplicit-void-ptr-cast](#id478)[¶](#wimplicit-void-ptr-cast "Link to this heading")

**Diagnostic text:**

warning: implicit conversion when 

assigning to _A_ from type _B_

assigning to type from type

passing _A_ to parameter of type _B_

passing type to parameter of type

returning _A_ from a function with result type _B_

returning type from a function with result type

<CLANG BUG IF YOU SEE THIS>

initializing _A_ with an expression of type _B_

initializing type with an expression of type

sending _A_ to parameter of type _B_

sending type to parameter of type

<CLANG BUG IF YOU SEE THIS>

 is not permitted in C++

### [\-Wimplicitly-unsigned-literal](#id479)[¶](#wimplicitly-unsigned-literal "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: integer literal is too large to be represented in a signed integer type, interpreting as unsigned

### [\-Wimport](#id480)[¶](#wimport "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wimport-implementation-partition-unit-in-interface-unit](#id481)[¶](#wimport-implementation-partition-unit-in-interface-unit "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: importing an implementation partition unit in a module interface is not recommended. Names from _A_ may not be reachable

### [\-Wimport-preprocessor-directive-pedantic](#id482)[¶](#wimport-preprocessor-directive-pedantic "Link to this heading")

**Diagnostic text:**

warning: #import is a language extension

### [\-Winaccessible-base](#id483)[¶](#winaccessible-base "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: direct base _A_ is inaccessible due to ambiguity:_B_

### [\-Winclude-angled-in-module-purview](#id484)[¶](#winclude-angled-in-module-purview "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘#include <filename>’ attaches the declarations to the named module ‘_A_’, which is not usually intended; consider moving that directive before the module declaration

### [\-Winclude-next-absolute-path](#id485)[¶](#winclude-next-absolute-path "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: #include\_next in file found relative to primary source file or found by absolute path; will search from start of include path

### [\-Wincompatible-exception-spec](#id487)[¶](#wincompatible-exception-spec "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: exception specifications of 

return

argument

 types differ

warning: target exception specification is not superset of source

### [\-Wincompatible-function-pointer-types](#id488)[¶](#wincompatible-function-pointer-types "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-incompatible-function-pointer-types` can be used to disable the error.

**Diagnostic text:**

error: incompatible function pointer types 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

; dereference with \*

; take the address with &

; remove \*

; remove &

### [\-Wincompatible-function-pointer-types-strict](#id489)[¶](#wincompatible-function-pointer-types-strict "Link to this heading")

**Diagnostic text:**

warning: incompatible function pointer types 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

; dereference with \*

; take the address with &

; remove \*

; remove &

### [\-Wincompatible-library-redeclaration](#id490)[¶](#wincompatible-library-redeclaration "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: incompatible redeclaration of library function _A_

### [\-Wincompatible-ms-pragma-section](#id491)[¶](#wincompatible-ms-pragma-section "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \`#pragma const\_seg\` for section _B_ will not apply to _A_ due to the presence of a 

mutable field

non-trivial constructor

non-trivial destructor

### [\-Wincompatible-ms-struct](#id492)[¶](#wincompatible-ms-struct "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-incompatible-ms-struct` can be used to disable the error.

**Diagnostic text:**

error: ms\_struct may not produce Microsoft-compatible layouts for classes with base classes or virtual functions

error: ms\_struct may not produce Microsoft-compatible layouts with fundamental data types with sizes that aren’t a power of two

### [\-Wincompatible-pointer-types](#id493)[¶](#wincompatible-pointer-types "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wincompatible-function-pointer-types](#wincompatible-function-pointer-types), [\-Wincompatible-pointer-types-discards-qualifiers](#wincompatible-pointer-types-discards-qualifiers).

**Diagnostic text:**

warning: incompatible pointer types 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

; dereference with \*

; take the address with &

; remove \*

; remove &

### [\-Wincompatible-pointer-types-discards-qualifiers](#id494)[¶](#wincompatible-pointer-types-discards-qualifiers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

 discards qualifiers in nested pointer types

warning: 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

 discards qualifiers

warning: 

reinterpret\_cast

C-style cast

 from _B_ to _C_ changes address space of nested pointers

### [\-Wincompatible-property-type](#id495)[¶](#wincompatible-property-type "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: property type _A_ is incompatible with type _B_ inherited from _C_

### [\-Wincompatible-sysroot](#id496)[¶](#wincompatible-sysroot "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: using sysroot for ‘_A_’ but targeting ‘_B_’

### [\-Wincomplete-framework-module-declaration](#id497)[¶](#wincomplete-framework-module-declaration "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: skipping ‘_A_’ because module declaration of ‘_B_’ lacks the ‘framework’ qualifier

### [\-Wincomplete-implementation](#id498)[¶](#wincomplete-implementation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: method definition for _A_ not found

### [\-Wincomplete-module](#id499)[¶](#wincomplete-module "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wincomplete-umbrella](#wincomplete-umbrella), [\-Wnon-modular-include-in-module](#wnon-modular-include-in-module).

### [\-Wincomplete-setjmp-declaration](#id500)[¶](#wincomplete-setjmp-declaration "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: declaration of built-in function ‘_A_’ requires the declaration of the ‘jmp\_buf’ type, commonly provided in the header <setjmp.h>

### [\-Wincomplete-umbrella](#id501)[¶](#wincomplete-umbrella "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: missing submodule ‘_A_’

warning: umbrella directory ‘_A_’ not found

warning: umbrella header for module ‘_A_’ does not include header ‘_B_’

### [\-Winconsistent-dllimport](#id502)[¶](#winconsistent-dllimport "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ redeclared without _B_ attribute: previous _B_ ignored

warning: _A_ redeclared without ‘dllimport’ attribute: ‘dllexport’ attribute added

### [\-Winconsistent-missing-destructor-override](#id503)[¶](#winconsistent-missing-destructor-override "Link to this heading")

**Diagnostic text:**

warning: _A_ overrides a destructor but is not marked ‘override’

### [\-Winconsistent-missing-override](#id504)[¶](#winconsistent-missing-override "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ overrides a member function but is not marked ‘override’

### [\-Wincrement-bool](#id505)[¶](#wincrement-bool "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdeprecated-increment-bool](#wdeprecated-increment-bool).

**Diagnostic text:**

error: ISO C++17 does not allow incrementing expression of type bool

### [\-Winfinite-recursion](#id506)[¶](#winfinite-recursion "Link to this heading")

**Diagnostic text:**

warning: all paths through this function will call itself

### [\-Winit-priority-reserved](#id507)[¶](#winit-priority-reserved "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-init-priority-reserved` can be used to disable the error.

**Diagnostic text:**

error: requested ‘init\_priority’ _A_ is reserved for internal use

### [\-Winit-self](#id508)[¶](#winit-self "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Winitializer-overrides](#id509)[¶](#winitializer-overrides "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: initializer 

partially 

overrides prior initialization of this subobject

error: initializer 

partially 

overrides prior initialization of this subobject

warning: initializer 

partially 

overrides prior initialization of this subobject

### [\-Winjected-class-name](#id510)[¶](#winjected-class-name "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++ specifies that qualified reference to _A_ is a constructor name rather than a 

template name

type

 in this context, despite preceding 

‘typename’

‘template’

 keyword

### [\-Winline](#id511)[¶](#winline "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Winline-asm](#id512)[¶](#winline-asm "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Winline-namespace-reopened-noninline](#id513)[¶](#winline-namespace-reopened-noninline "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: inline namespace reopened as a non-inline namespace

### [\-Winline-new-delete](#id514)[¶](#winline-new-delete "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: replacement function _A_ cannot be declared ‘inline’

### [\-Winstallapi-violation](#id515)[¶](#winstallapi-violation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dynamic library symbol ‘_A_’ is 

weak defined

thread local

, but its declaration is not

warning: glob ‘_A_’ did not match any header file

warning: declaration ‘_A_’ is marked 

available

unavailable

, but symbol is 

not 

exported in dynamic library

warning: symbol exported in dynamic library, but marked hidden in declaration ‘_A_’

warning: declaration ‘_A_’ is 

weak defined

thread local

, but symbol is not in dynamic library

warning: no declaration was found for exported symbol ‘_A_’ in dynamic library

warning: declaration has external linkage, but symbol has internal linkage in dynamic library ‘_A_’

warning: declaration has external linkage, but dynamic library doesn’t have symbol ‘_A_’

warning: no such excluded 

public

private

 header file: ‘_B_’

warning: platform does not match: ‘_A_’ (provided) vs ‘_B_’ (found)

warning: runpath search paths do not match: ‘_A_’ (provided) vs ‘_B_’ (found)

warning: runpath search paths missing from _A_: ‘_B_’

warning: violations found for _A_

### [\-Winstantiation-after-specialization](#id516)[¶](#winstantiation-after-specialization "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: explicit instantiation of _A_ that occurs after an explicit specialization has no effect

### [\-Wint-conversion](#id517)[¶](#wint-conversion "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-int-conversion` can be used to disable the error.

**Diagnostic text:**

error: incompatible integer to pointer conversion 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

; dereference with \*

; take the address with &

; remove \*

; remove &

error: incompatible pointer to integer conversion 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

; dereference with \*

; take the address with &

; remove \*

; remove &

### [\-Wint-conversions](#id518)[¶](#wint-conversions "Link to this heading")

Synonym for [\-Wint-conversion](#wint-conversion).

### [\-Wint-in-bool-context](#id519)[¶](#wint-in-bool-context "Link to this heading")

**Diagnostic text:**

warning: converting the enum constant to a boolean

warning: converting the result of ‘<<’ to a boolean; did you mean to compare with ‘0’?

### [\-Wint-to-pointer-cast](#id520)[¶](#wint-to-pointer-cast "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wint-to-void-pointer-cast](#wint-to-void-pointer-cast).

**Diagnostic text:**

warning: cast to _B_ from smaller integer type _A_

### [\-Wint-to-void-pointer-cast](#id521)[¶](#wint-to-void-pointer-cast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cast to _B_ from smaller integer type _A_

### [\-Winteger-overflow](#id522)[¶](#winteger-overflow "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overflow in expression; result is _A_ with type _B_

### [\-Winvalid-command-line-argument](#id523)[¶](#winvalid-command-line-argument "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wignored-optimization-argument](#wignored-optimization-argument).

**Diagnostic text:**

warning: missing plugin argument for plugin _A_ in _B_

warning: missing plugin name in _A_

warning: the given MCU supports _A_ hardware multiply, but ‘-mhwmult’ is set to _B_

warning: no MCU device specified, but ‘-mhwmult’ is set to ‘auto’, assuming no hardware multiply; use ‘-mmcu’ to specify an MSP430 device, or ‘-mhwmult’ to set the hardware multiply type explicitly

warning: the given MCU does not support hardware multiply, but ‘-mhwmult’ is set to _A_

warning: the object size sanitizer has no effect at -O0, but is explicitly enabled: _A_

warning: optimization level ‘_A_’ is not supported; using ‘_B__C_’ instead

warning: feature flag ‘_A_’ must start with either ‘+’ to enable the feature or ‘-’ to disable it; flag ignored

warning: feature flag ‘_A_’ is ignored since the feature is read only

warning: mismatch between architecture and environment in target triple ‘_A_’; did you mean ‘_B_’?

warning: ignoring extension ‘_A_’ because the ‘_B_’ architecture does not support it

### [\-Winvalid-constexpr](#id524)[¶](#winvalid-constexpr "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-constexpr` can be used to disable the error.

**Diagnostic text:**

error: 

constexpr

consteval

function

constructor

 never produces a constant expression

### [\-Winvalid-feature-combination](#id525)[¶](#winvalid-feature-combination "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: invalid feature combination: _A_

### [\-Winvalid-gnu-asm-cast](#id526)[¶](#winvalid-gnu-asm-cast "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-gnu-asm-cast` can be used to disable the error.

**Diagnostic text:**

error: invalid use of a cast in an inline asm context requiring an lvalue

### [\-Winvalid-iboutlet](#id527)[¶](#winvalid-iboutlet "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

instance variable

property

 with _A_ attribute must be an object type (invalid _B_)

warning: IBOutletCollection properties should be copy/strong and not assign

### [\-Winvalid-ios-deployment-target](#id529)[¶](#winvalid-ios-deployment-target "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-ios-deployment-target` can be used to disable the error.

**Diagnostic text:**

error: invalid iOS deployment version ‘_A_’, iOS 10 is the maximum deployment target for 32-bit targets

### [\-Winvalid-no-builtin-names](#id530)[¶](#winvalid-no-builtin-names "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ is not a valid builtin name for _B_

### [\-Winvalid-noreturn](#id531)[¶](#winvalid-noreturn "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: coroutine _A_ cannot be declared ‘noreturn’ as it always returns a coroutine handle

warning: function _A_ declared ‘noreturn’ should not return

warning: 

function

block

lambda

coroutine

 declared ‘noreturn’ should not return

### [\-Winvalid-offsetof](#id532)[¶](#winvalid-offsetof "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘offsetof’ on non-POD type _A_

warning: ‘offsetof’ on non-standard-layout type _A_

### [\-Winvalid-or-nonexistent-directory](#id533)[¶](#winvalid-or-nonexistent-directory "Link to this heading")

**Diagnostic text:**

warning: unable to find _A_ directory, expected to be in ‘_B_’ found via _C_

### [\-Winvalid-partial-specialization](#id534)[¶](#winvalid-partial-specialization "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-partial-specialization` can be used to disable the error.

**Diagnostic text:**

error: 

class

variable

 template partial specialization is not more specialized than the primary template

### [\-Winvalid-pch](#id535)[¶](#winvalid-pch "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Winvalid-pp-token](#id536)[¶](#winvalid-pp-token "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: empty character constant

warning: missing terminating 

‘

‘”’

 character

### [\-Winvalid-source-encoding](#id537)[¶](#winvalid-source-encoding "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: illegal character encoding in character literal

warning: illegal character encoding in string literal

### [\-Winvalid-specialization](#id538)[¶](#winvalid-specialization "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-specialization` can be used to disable the error.

**Diagnostic text:**

error: _A_ cannot be specialized

: _C_

### [\-Winvalid-static-assert-message](#id539)[¶](#winvalid-static-assert-message "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-static-assert-message` can be used to disable the error.

**Diagnostic text:**

error: 

the message

the expression

 in 

this static assertion

this asm operand

 is not a constant expression

### [\-Winvalid-token-paste](#id540)[¶](#winvalid-token-paste "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-invalid-token-paste` can be used to disable the error.

**Diagnostic text:**

error: pasting formed ‘_A_’, an invalid preprocessing token

### [\-Winvalid-unevaluated-string](#id541)[¶](#winvalid-unevaluated-string "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: encoding prefix ‘_A_’ on an unevaluated string literal has no effect

 and is incompatible with c++2c

### [\-Winvalid-utf8](#id542)[¶](#winvalid-utf8 "Link to this heading")

**Diagnostic text:**

warning: invalid UTF-8 in comment

### [\-Winvalid-version-availability](#id543)[¶](#winvalid-version-availability "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: invalid _B_ version ‘_A_’ in availability attribute

### [\-Wjump-misses-init](#id544)[¶](#wjump-misses-init "Link to this heading")

**Diagnostic text:**

warning: jump from this goto statement to its label is incompatible with C++

warning: jump from this 

indirect

asm

 goto statement to one of its possible targets is incompatible with C++

warning: jump from switch statement to this case label is incompatible with C++

### [\-Wjump-seh-finally](#id545)[¶](#wjump-seh-finally "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: jump out of \_\_finally block has undefined behavior

### [\-Wkeyword-compat](#id546)[¶](#wkeyword-compat "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: keyword ‘_A_’ will be made available as an identifier 

here

for the remainder of the translation unit

### [\-Wkeyword-macro](#id547)[¶](#wkeyword-macro "Link to this heading")

**Diagnostic text:**

warning: keyword is hidden by macro definition

### [\-Wknr-promoted-parameter](#id548)[¶](#wknr-promoted-parameter "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

promoted type _A_ of K&R function parameter is not compatible with the parameter type _B_

promoted type of K&R function parameter is not compatible with parameter type

 declared in a previous prototype

### [\-Wlanguage-extension-token](#id549)[¶](#wlanguage-extension-token "Link to this heading")

**Diagnostic text:**

warning: extension used

### [\-Wlarge-by-value-copy](#id550)[¶](#wlarge-by-value-copy "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is a large (_B_ bytes) pass-by-value argument; pass it by reference instead ?

warning: return value of _A_ is a large (_B_ bytes) pass-by-value object; pass it by reference instead ?

### [\-Wlegacy-constant-register-binding](#id551)[¶](#wlegacy-constant-register-binding "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

error: binding type ‘b’ only applies to constant buffers. The ‘bool constant’ binding type is no longer supported

error: binding type ‘i’ ignored. The ‘integer constant’ binding type is no longer supported

error: binding type ‘c’ ignored in buffer declaration. Did you mean ‘packoffset’?

warning: binding type ‘

t

u

b

s

c

‘ only applies to types containing 

SRV resources

UAV resources

constant buffer resources

sampler state

numeric types

### [\-Wliblto](#id552)[¶](#wliblto "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wlinker-warnings](#id553)[¶](#wlinker-warnings "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: linking module ‘_A_’: _B_

### [\-Wliteral-conversion](#id554)[¶](#wliteral-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from _A_ to _B_ changes value from _C_ to _D_

warning: implicit conversion of out of range value from _A_ to _B_ is undefined

### [\-Wliteral-range](#id555)[¶](#wliteral-range "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: floating-point comparison is always 

true

false

; constant cannot be represented exactly in type _B_

warning: magnitude of floating-point constant too large for type _A_; maximum is _B_

warning: magnitude of floating-point constant too small for type _A_; minimum is _B_

### [\-Wlocal-type-template-args](#id556)[¶](#wlocal-type-template-args "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++98-compat-local-type-template-args](#wc-98-compat-local-type-template-args).

**Diagnostic text:**

warning: template argument uses local type _A_

### [\-Wlogical-not-parentheses](#id557)[¶](#wlogical-not-parentheses "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: logical not is only applied to the left hand side of this 

comparison

bitwise operator

### [\-Wlogical-op-parentheses](#id558)[¶](#wlogical-op-parentheses "Link to this heading")

**Diagnostic text:**

warning: ‘&&’ within ‘||’

### [\-Wlong-long](#id559)[¶](#wlong-long "Link to this heading")

Also controls [\-Wc++11-long-long](#wc-11-long-long).

**Diagnostic text:**

warning: ‘long long’ is an extension when C99 mode is not enabled

### [\-Wloop-analysis](#id560)[¶](#wloop-analysis "Link to this heading")

Controls [\-Wfor-loop-analysis](#wfor-loop-analysis), [\-Wrange-loop-analysis](#wrange-loop-analysis).

### [\-Wmacro-redefined](#id561)[¶](#wmacro-redefined "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ macro redefined

### [\-Wmain](#id562)[¶](#wmain "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: ‘main’ should not be ‘extern “C”’

warning: referring to ‘main’ within an expression is a Clang extension

warning: ‘main’ is not allowed to be declared \_Noreturn

warning: ‘main’ is not allowed to be declared variadic

warning: only one parameter on ‘main’ declaration

warning: variable named ‘main’ with external linkage has undefined behavior

warning: bool literal returned from ‘main’

warning: ‘main’ should not be declared static

### [\-Wmain-attached-to-named-module](#id563)[¶](#wmain-attached-to-named-module "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘main’ never has module linkage

### [\-Wmain-return-type](#id564)[¶](#wmain-return-type "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: implicit ‘0’ return value from ‘main’ is a C99 extension

warning: return type of ‘main’ is not ‘int’

### [\-Wmalformed-warning-check](#id565)[¶](#wmalformed-warning-check "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \_\_has\_warning expected option name (e.g. “-Wundef”)

### [\-Wmany-braces-around-scalar-init](#id566)[¶](#wmany-braces-around-scalar-init "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: too many braces around 

scalar 

initializer

### [\-Wmath-errno-enabled-with-veclib](#id567)[¶](#wmath-errno-enabled-with-veclib "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: math errno enabled by ‘_A_’ after it was implicitly disabled by ‘_B_’, this may limit the utilization of the vector library

### [\-Wmathematical-notation-identifier-extension](#id568)[¶](#wmathematical-notation-identifier-extension "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: mathematical notation character <U+_A_\> in an identifier is a Clang extension

### [\-Wmax-tokens](#id569)[¶](#wmax-tokens "Link to this heading")

**Diagnostic text:**

warning: the number of preprocessor source tokens (_A_) exceeds this token limit (_B_)

warning: the total number of preprocessor source tokens (_A_) exceeds the token limit (_B_)

The warning is issued if the number of pre-processor tokens exceeds the token limit, which can be set in three ways:

1.  As a limit at a specific point in a file, using the `clang max_tokens_here` pragma:
    
    #pragma clang max\_tokens\_here 1234
    
2.  As a per-translation unit limit, using the `-fmax-tokens=` command-line flag:
    
    clang -c a.cpp -fmax-tokens=1234
    
3.  As a per-translation unit limit using the `clang max_tokens_total` pragma, which works like and overrides the `-fmax-tokens=` flag:
    
    #pragma clang max\_tokens\_total 1234
    

These limits can be helpful in limiting code growth through included files.

Setting a token limit of zero means no limit.

Note that the warning is disabled by default, so -Wmax-tokens must be used in addition with the pragmas or -fmax-tokens flag to get any warnings.

### [\-Wmax-unsigned-zero](#id570)[¶](#wmax-unsigned-zero "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: taking the max of 

a value and unsigned zero

unsigned zero and a value

 is always equal to the other value

### [\-Wmemset-transposed-args](#id571)[¶](#wmemset-transposed-args "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

‘size’ argument to memset is ‘0’

setting buffer to a ‘sizeof’ expression

; did you mean to transpose the last two arguments?

### [\-Wmemsize-comparison](#id572)[¶](#wmemsize-comparison "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: size argument in _A_ call is a comparison

### [\-Wmethod-signatures](#id573)[¶](#wmethod-signatures "Link to this heading")

**Diagnostic text:**

warning: conflicting parameter types in implementation of _A_: _B_ vs _C_

warning: conflicting return type in implementation of _A_: _B_ vs _C_

### [\-Wmicrosoft](#id574)[¶](#wmicrosoft "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Winconsistent-dllimport](#winconsistent-dllimport), [\-Wmicrosoft-abstract](#wmicrosoft-abstract), [\-Wmicrosoft-anon-tag](#wmicrosoft-anon-tag), [\-Wmicrosoft-cast](#wmicrosoft-cast), [\-Wmicrosoft-charize](#wmicrosoft-charize), [\-Wmicrosoft-comment-paste](#wmicrosoft-comment-paste), [\-Wmicrosoft-const-init](#wmicrosoft-const-init), [\-Wmicrosoft-cpp-macro](#wmicrosoft-cpp-macro), [\-Wmicrosoft-default-arg-redefinition](#wmicrosoft-default-arg-redefinition), [\-Wmicrosoft-drectve-section](#wmicrosoft-drectve-section), [\-Wmicrosoft-end-of-file](#wmicrosoft-end-of-file), [\-Wmicrosoft-enum-forward-reference](#wmicrosoft-enum-forward-reference), [\-Wmicrosoft-enum-value](#wmicrosoft-enum-value), [\-Wmicrosoft-exception-spec](#wmicrosoft-exception-spec), [\-Wmicrosoft-explicit-constructor-call](#wmicrosoft-explicit-constructor-call), [\-Wmicrosoft-extra-qualification](#wmicrosoft-extra-qualification), [\-Wmicrosoft-fixed-enum](#wmicrosoft-fixed-enum), [\-Wmicrosoft-flexible-array](#wmicrosoft-flexible-array), [\-Wmicrosoft-goto](#wmicrosoft-goto), [\-Wmicrosoft-include](#wmicrosoft-include), [\-Wmicrosoft-init-from-predefined](#wmicrosoft-init-from-predefined), [\-Wmicrosoft-inline-on-non-function](#wmicrosoft-inline-on-non-function), [\-Wmicrosoft-mutable-reference](#wmicrosoft-mutable-reference), [\-Wmicrosoft-pure-definition](#wmicrosoft-pure-definition), [\-Wmicrosoft-redeclare-static](#wmicrosoft-redeclare-static), [\-Wmicrosoft-sealed](#wmicrosoft-sealed), [\-Wmicrosoft-string-literal-from-predefined](#wmicrosoft-string-literal-from-predefined), [\-Wmicrosoft-template](#wmicrosoft-template), [\-Wmicrosoft-union-member-reference](#wmicrosoft-union-member-reference), [\-Wmicrosoft-unqualified-friend](#wmicrosoft-unqualified-friend), [\-Wmicrosoft-using-decl](#wmicrosoft-using-decl), [\-Wmicrosoft-void-pseudo-dtor](#wmicrosoft-void-pseudo-dtor).

### [\-Wmicrosoft-abstract](#id575)[¶](#wmicrosoft-abstract "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘abstract’ keyword is a Microsoft extension

### [\-Wmicrosoft-anon-tag](#id576)[¶](#wmicrosoft-anon-tag "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: types declared in an anonymous 

struct

union

 are a Microsoft extension

warning: anonymous 

structs

unions

 are a Microsoft extension

### [\-Wmicrosoft-cast](#id577)[¶](#wmicrosoft-cast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: static\_cast between pointer-to-function and pointer-to-object is a Microsoft extension

warning: implicit conversion between pointer-to-function and pointer-to-object is a Microsoft extension

### [\-Wmicrosoft-charize](#id578)[¶](#wmicrosoft-charize "Link to this heading")

**Diagnostic text:**

warning: charizing operator #@ is a Microsoft extension

### [\-Wmicrosoft-const-init](#id580)[¶](#wmicrosoft-const-init "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: default initialization of an object of const type _A_

 without a user-provided default constructor

 is a Microsoft extension

### [\-Wmicrosoft-cpp-macro](#id581)[¶](#wmicrosoft-cpp-macro "Link to this heading")

**Diagnostic text:**

warning: C++ operator _A_ (aka _B_) used as a macro name

### [\-Wmicrosoft-default-arg-redefinition](#id582)[¶](#wmicrosoft-default-arg-redefinition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: redefinition of default argument

### [\-Wmicrosoft-drectve-section](#id583)[¶](#wmicrosoft-drectve-section "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: #pragma _A_(“.drectve”) has undefined behavior, use #pragma comment(linker, …) instead

### [\-Wmicrosoft-end-of-file](#id584)[¶](#wmicrosoft-end-of-file "Link to this heading")

**Diagnostic text:**

warning: treating Ctrl-Z as end-of-file is a Microsoft extension

### [\-Wmicrosoft-enum-forward-reference](#id585)[¶](#wmicrosoft-enum-forward-reference "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: forward references to ‘enum’ types are a Microsoft extension

### [\-Wmicrosoft-enum-value](#id586)[¶](#wmicrosoft-enum-value "Link to this heading")

**Diagnostic text:**

warning: enumerator value is not representable in the underlying type _A_

### [\-Wmicrosoft-exception-spec](#id587)[¶](#wmicrosoft-exception-spec "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: exception specification of ‘…’ is a Microsoft extension

warning: 

pointer to 

reference to 

incomplete type _B_ is not allowed in exception specification

warning: exception specification in declaration does not match previous declaration

warning: exception specification in explicit instantiation does not match instantiated one

warning: exception specification of overriding function is more lax than base version

### [\-Wmicrosoft-exists](#id588)[¶](#wmicrosoft-exists "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dependent 

\_\_if\_not\_exists

\_\_if\_exists

 declarations are ignored

### [\-Wmicrosoft-explicit-constructor-call](#id589)[¶](#wmicrosoft-explicit-constructor-call "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: explicit constructor calls are a Microsoft extension

### [\-Wmicrosoft-fixed-enum](#id591)[¶](#wmicrosoft-fixed-enum "Link to this heading")

**Diagnostic text:**

warning: enumeration types with a fixed underlying type are a Microsoft extension

### [\-Wmicrosoft-flexible-array](#id592)[¶](#wmicrosoft-flexible-array "Link to this heading")

**Diagnostic text:**

warning: flexible array member _A_ in otherwise empty 

struct

interface

union

class

enum

 is a Microsoft extension

warning: flexible array member _A_ in a union is a Microsoft extension

### [\-Wmicrosoft-goto](#id593)[¶](#wmicrosoft-goto "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: jump from this goto statement to its label is a Microsoft extension

### [\-Wmicrosoft-inaccessible-base](#id594)[¶](#wmicrosoft-inaccessible-base "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: accessing inaccessible direct base _A_ of _B_ is a Microsoft extension

### [\-Wmicrosoft-include](#id595)[¶](#wmicrosoft-include "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: #include resolved using non-portable Microsoft search rules as: _A_

### [\-Wmicrosoft-init-from-predefined](#id596)[¶](#wmicrosoft-init-from-predefined "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: initializing an array from a _A_ predefined identifier is a Microsoft extension

### [\-Wmicrosoft-inline-on-non-function](#id597)[¶](#wmicrosoft-inline-on-non-function "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘inline’ can only appear on functions

 and non-local variables

### [\-Wmicrosoft-mutable-reference](#id598)[¶](#wmicrosoft-mutable-reference "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘mutable’ on a reference type is a Microsoft extension

### [\-Wmicrosoft-pure-definition](#id599)[¶](#wmicrosoft-pure-definition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: function definition with pure-specifier is a Microsoft extension

### [\-Wmicrosoft-redeclare-static](#id600)[¶](#wmicrosoft-redeclare-static "Link to this heading")

**Diagnostic text:**

warning: redeclaring non-static _A_ as static is a Microsoft extension

### [\-Wmicrosoft-sealed](#id601)[¶](#wmicrosoft-sealed "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘sealed’ keyword is a Microsoft extension

### [\-Wmicrosoft-string-literal-from-predefined](#id602)[¶](#wmicrosoft-string-literal-from-predefined "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: expansion of predefined identifier ‘_A_’ to a string literal is a Microsoft extension

### [\-Wmicrosoft-template](#id603)[¶](#wmicrosoft-template "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wmicrosoft-template-shadow](#wmicrosoft-template-shadow).

**Diagnostic text:**

warning: duplicate explicit instantiation of _A_ ignored as a Microsoft extension

warning: use of member _A_ found via unqualified lookup into dependent bases of class templates is a Microsoft extension

warning: use of member _A_ before its declaration is a Microsoft extension

warning: using the undeclared type _A_ as a default template argument is a Microsoft extension

warning: non-type template argument containing a dereference operation is a Microsoft extension

warning: 

class template

class template partial

variable template

variable template partial

function template

member function

static data member

member class

member enumeration

 specialization of _B_ not in 

a namespace enclosing _C_

class _C_ or an enclosing namespace

 is a Microsoft extension

warning: template argument for template type parameter must be a type; omitted ‘typename’ is a Microsoft extension

warning: ‘static’ can only be specified inside the class definition

warning: use of undeclared identifier _A_; unqualified lookup into dependent bases of class template _B_ is a Microsoft extension

warning: unqualified base initializer of class templates is a Microsoft extension

### [\-Wmicrosoft-template-shadow](#id604)[¶](#wmicrosoft-template-shadow "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: declaration of _A_ shadows template parameter

### [\-Wmicrosoft-union-member-reference](#id605)[¶](#wmicrosoft-union-member-reference "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: union member _A_ has reference type _B_, which is a Microsoft extension

### [\-Wmicrosoft-unqualified-friend](#id606)[¶](#wmicrosoft-unqualified-friend "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unqualified friend declaration referring to type outside of the nearest enclosing namespace is a Microsoft extension; add a nested name specifier

### [\-Wmicrosoft-using-decl](#id607)[¶](#wmicrosoft-using-decl "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: using declaration referring to inaccessible member ‘_A_’ (which refers to accessible member ‘_B_’) is a Microsoft compatibility extension

### [\-Wmicrosoft-void-pseudo-dtor](#id608)[¶](#wmicrosoft-void-pseudo-dtor "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: pseudo-destructors on type void are a Microsoft extension

### [\-Wmisexpect](#id609)[¶](#wmisexpect "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: potential performance regression from use of \_\_builtin\_expect(): annotation was correct on _A_ of profiled executions

### [\-Wmisleading-indentation](#id610)[¶](#wmisleading-indentation "Link to this heading")

**Diagnostic text:**

warning: misleading indentation; statement is not part of the previous ‘

if

else

for

while

‘

### [\-Wmismatched-new-delete](#id611)[¶](#wmismatched-new-delete "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘delete

\[\]

‘ applied to a pointer that was allocated with ‘new

\[\]

‘; did you mean ‘delete

\[\]

‘?

### [\-Wmismatched-parameter-types](#id612)[¶](#wmismatched-parameter-types "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: conflicting parameter types in implementation of _A_

: _B_ vs _C_

### [\-Wmismatched-return-types](#id613)[¶](#wmismatched-return-types "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: conflicting return type in implementation of _A_

: _B_ vs _C_

### [\-Wmismatched-tags](#id614)[¶](#wmismatched-tags "Link to this heading")

**Diagnostic text:**

warning: _C_ defined as 

a struct

an interface

a class

 template

 here but previously declared as 

a struct

an interface

a class

 template

; this is valid, but may result in linker errors under the Microsoft C++ ABI

warning: 

struct

interface

class

 template

 _C_ was previously declared as a 

struct

interface

class

 template

; this is valid, but may result in linker errors under the Microsoft C++ ABI

### [\-Wmissing-braces](#id615)[¶](#wmissing-braces "Link to this heading")

**Diagnostic text:**

warning: suggest braces around initialization of subobject

### [\-Wmissing-constinit](#id616)[¶](#wmissing-constinit "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘constinit’ specifier missing on initializing declaration of _A_

### [\-Wmissing-declarations](#id617)[¶](#wmissing-declarations "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: declaration does not declare anything

warning: ‘_A_’ is not permitted on a declaration of a type

warning: typedef requires a name

warning: ‘_A_’ ignored on this declaration

### [\-Wmissing-designated-field-initializers](#id618)[¶](#wmissing-designated-field-initializers "Link to this heading")

**Diagnostic text:**

warning: missing field _A_ initializer

Warn about designated initializers with some fields missing (only in C++).

### [\-Wmissing-exception-spec](#id619)[¶](#wmissing-exception-spec "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is missing exception specification ‘_B_’

### [\-Wmissing-field-initializers](#id620)[¶](#wmissing-field-initializers "Link to this heading")

Also controls [\-Wmissing-designated-field-initializers](#wmissing-designated-field-initializers).

**Diagnostic text:**

warning: missing field _A_ initializer

### [\-Wmissing-format-attribute](#id621)[¶](#wmissing-format-attribute "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wmissing-include-dirs](#id622)[¶](#wmissing-include-dirs "Link to this heading")

**Diagnostic text:**

warning: no such include directory: ‘_A_’

### [\-Wmissing-method-return-type](#id623)[¶](#wmissing-method-return-type "Link to this heading")

**Diagnostic text:**

warning: method has no return type specified; defaults to ‘id’

### [\-Wmissing-multilib](#id624)[¶](#wmissing-multilib "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: no multilib found matching flags: _A_

### [\-Wmissing-noescape](#id625)[¶](#wmissing-noescape "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: parameter of overriding method should be annotated with \_\_attribute\_\_((noescape))

### [\-Wmissing-noreturn](#id626)[¶](#wmissing-noreturn "Link to this heading")

**Diagnostic text:**

warning: block could be declared with attribute ‘noreturn’

warning: 

function

method

 _B_ could be declared with attribute ‘noreturn’

### [\-Wmissing-prototype-for-cc](#id627)[¶](#wmissing-prototype-for-cc "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: function with no prototype cannot use the _A_ calling convention

### [\-Wmissing-prototypes](#id628)[¶](#wmissing-prototypes "Link to this heading")

**Diagnostic text:**

warning: no previous prototype for function _A_

### [\-Wmissing-selector-name](#id629)[¶](#wmissing-selector-name "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ used as the name of the previous parameter rather than as part of the selector

### [\-Wmissing-sysroot](#id630)[¶](#wmissing-sysroot "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: no such sysroot directory: ‘_A_’

### [\-Wmissing-template-arg-list-after-template-kw](#id631)[¶](#wmissing-template-arg-list-after-template-kw "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-missing-template-arg-list-after-template-kw` can be used to disable the error.

**Diagnostic text:**

error: a template argument list is expected after a name prefixed by the template keyword

### [\-Wmissing-variable-declarations](#id632)[¶](#wmissing-variable-declarations "Link to this heading")

**Diagnostic text:**

warning: no previous extern declaration for non-static variable _A_

### [\-Wmisspelled-assumption](#id633)[¶](#wmisspelled-assumption "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unknown assumption string ‘_A_’ may be misspelled; attribute is potentially ignored, did you mean ‘_B_’?

### [\-Wmix-packoffset](#id634)[¶](#wmix-packoffset "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cannot mix packoffset elements with nonpackoffset elements in a cbuffer

### [\-Rmodule-build](#id635)[¶](#rmodule-build "Link to this heading")

**Diagnostic text:**

 building module ‘_A_’ as ‘_B_’

 finished building module ‘_A_’

 could not acquire lock file for module ‘_A_’: _B_

 timed out waiting to acquire lock file for module ‘_A_’

### [\-Wmodule-conflict](#id636)[¶](#wmodule-conflict "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: module ‘_A_’ conflicts with already-imported module ‘_B_’: _C_

warning: module file ‘_A_’ was validated as a system module and is now being imported as a non-system module; any difference in diagnostic options will be ignored

### [\-Wmodule-file-config-mismatch](#id637)[¶](#wmodule-file-config-mismatch "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-module-file-config-mismatch` can be used to disable the error.

**Diagnostic text:**

error: module file _A_ cannot be loaded due to a configuration mismatch with the current compilation

### [\-Wmodule-file-extension](#id638)[¶](#wmodule-file-extension "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: duplicate module file extension block name ‘_A_’

### [\-Wmodule-file-mapping-mismatch](#id639)[¶](#wmodule-file-mapping-mismatch "Link to this heading")

**Diagnostic text:**

warning: loaded module file ‘_A_’ conflicts with imported file ‘_B_’

### [\-Rmodule-import](#id640)[¶](#rmodule-import "Link to this heading")

**Diagnostic text:**

 importing module ‘_A_’

 into ‘_D_’

 from ‘_B_’

### [\-Wmodule-import-in-extern-c](#id641)[¶](#wmodule-import-in-extern-c "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-module-import-in-extern-c` can be used to disable the error.

**Diagnostic text:**

error: import of C++ module ‘_A_’ appears within extern “C” language linkage specification

### [\-Rmodule-include-translation](#id642)[¶](#rmodule-include-translation "Link to this heading")

**Diagnostic text:**

 treating #

include

import

include\_next

\_\_include\_macros

 as an import of module ‘_B_’

### [\-Wmodule-link-redeclaration](#id643)[¶](#wmodule-link-redeclaration "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-module-link-redeclaration` can be used to disable the error.

**Diagnostic text:**

error: redeclaration of link library ‘_A_’

### [\-Rmodule-lock](#id644)[¶](#rmodule-lock "Link to this heading")

**Diagnostic text:**

 locking ‘_A_’ to build module ‘_B_’

### [\-Rmodule-map](#id645)[¶](#rmodule-map "Link to this heading")

**Diagnostic text:**

 loading modulemap ‘_A_’

 loading parsed module ‘_A_’

 parsing modulemap ‘_A_’

### [\-Wmodules-ambiguous-internal-linkage](#id646)[¶](#wmodules-ambiguous-internal-linkage "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ambiguous use of internal linkage declaration _A_ defined in multiple modules

### [\-Rmodules-driver](#id647)[¶](#rmodules-driver "Link to this heading")

**Diagnostic text:**

 found C++20 module usage in file ‘_A_’

 performing driver managed module build

### [\-Wmodules-import-nested-redundant](#id648)[¶](#wmodules-import-nested-redundant "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-modules-import-nested-redundant` can be used to disable the error.

**Diagnostic text:**

error: redundant #include of module ‘_A_’ appears within _B_

### [\-Wmost](#id649)[¶](#wmost "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Warray-parameter](#warray-parameter), [\-Wbool-operation](#wbool-operation), [\-Wcast-of-sel-type](#wcast-of-sel-type), [\-Wchar-subscripts](#wchar-subscripts), [\-Wcomment](#wcomment), [\-Wdelete-non-virtual-dtor](#wdelete-non-virtual-dtor), [\-Wextern-c-compat](#wextern-c-compat), [\-Wfor-loop-analysis](#wfor-loop-analysis), [\-Wformat](#wformat), [\-Wframe-address](#wframe-address), [\-Wimplicit](#wimplicit), [\-Winfinite-recursion](#winfinite-recursion), [\-Wint-in-bool-context](#wint-in-bool-context), [\-Wmismatched-tags](#wmismatched-tags), [\-Wmissing-braces](#wmissing-braces), [\-Wmove](#wmove), [\-Wmultichar](#wmultichar), [\-Wobjc-designated-initializers](#wobjc-designated-initializers), [\-Wobjc-flexible-array](#wobjc-flexible-array), [\-Wobjc-missing-super-calls](#wobjc-missing-super-calls), [\-Woverloaded-virtual](#woverloaded-virtual), [\-Wprivate-extern](#wprivate-extern), [\-Wrange-loop-construct](#wrange-loop-construct), [\-Wreorder](#wreorder), [\-Wreturn-type](#wreturn-type), [\-Wself-assign](#wself-assign), [\-Wself-move](#wself-move), [\-Wsizeof-array-argument](#wsizeof-array-argument), [\-Wsizeof-array-decay](#wsizeof-array-decay), [\-Wstring-plus-int](#wstring-plus-int), [\-Wtautological-compare](#wtautological-compare), [\-Wtrigraphs](#wtrigraphs), [\-Wuninitialized](#wuninitialized), [\-Wunknown-pragmas](#wunknown-pragmas), [\-Wunused](#wunused), [\-Wuser-defined-warnings](#wuser-defined-warnings), [\-Wvolatile-register-var](#wvolatile-register-var).

### [\-Wmove](#id650)[¶](#wmove "Link to this heading")

Controls [\-Wpessimizing-move](#wpessimizing-move), [\-Wredundant-move](#wredundant-move), [\-Wreturn-std-move](#wreturn-std-move), [\-Wself-move](#wself-move).

### [\-Wms-bitfield-padding](#id651)[¶](#wms-bitfield-padding "Link to this heading")

**Diagnostic text:**

warning: bit-field _A_ of type _B_ has a different storage size than the preceding bit-field (_C_ vs _D_ bytes) and will not be packed under the Microsoft ABI

> Under the Microsoft ABI, adjacent bit-fields are not packed if the underlying type has a different storage size. This warning indicates that a pair of adjacent bit-fields may not pack in the same way due to this behavioural difference.
> 
> This can occur when mixing different types explicitly:
> 
> struct S {
>   uint16\_t field1 : 1;
>   uint32\_t field2 : 1;
> };
> 
> or more subtly through enums
> 
> enum Enum1 { /\* ... \*/ };
> enum class Enum2 : unsigned char { /\* ... \*/ };
> struct S {
>   Enum1 field1 : 1;
>   Enum2 field2 : 1;
> };
> 
> In each of these cases under the Microsoft ABI the second bit-field will not be packed with the preceding bit-field, and instead will be aligned as if the fields were each separately defined integer fields of their respective storage size. For binary compatibility this is obviously and observably incompatible, however where bit-fields are being used solely for memory use reduction this incomplete packing may silently increase the size of objects vs what is expected.
> 
> This issue can be addressed by ensuring the storage type of each bit-field is the same, either by explicitly using the same integer type, or in the case of enum types declaring the enum types with the same storage size. For enum types where you cannot specify the underlying type, the options are to either switch to int sized storage for all specifiers or to resort to declaring the bit-fields with explicit integer storage types and cast in and out of the field. If such a solution is required the [preferred\_type](https://clang.llvm.org/docs/AttributeReference.html#langext-preferred-type-documentation) attribute can be used to convey the actual field type to debuggers and other tooling.

### [\-Wmsvc-include](#id652)[¶](#wmsvc-include "Link to this heading")

Synonym for [\-Wmicrosoft-include](#wmicrosoft-include).

### [\-Wmsvc-not-found](#id653)[¶](#wmsvc-not-found "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unable to find a Visual Studio installation; try running Clang from a developer command prompt

### [\-Wmulti-gpu](#id654)[¶](#wmulti-gpu "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: multiple _A_ architectures are detected: _B_; only the first one is used for ‘_C_’

### [\-Wmultichar](#id655)[¶](#wmultichar "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: multi-character character constant

### [\-Wmultilib-not-found](#id656)[¶](#wmultilib-not-found "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: no multilib structure encoded for Arm, Aarch64 and PPC targets

### [\-Wmultiple-move-vbase](#id657)[¶](#wmultiple-move-vbase "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: defaulted move assignment operator of _A_ will move assign virtual base class _B_ multiple times

### [\-Wnan-infinity-disabled](#id658)[¶](#wnan-infinity-disabled "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: use of 

infinity

NaN

 via a macro

 is undefined behavior due to the currently enabled floating-point options

This warning is enabled when source code using the macros `INFINITY` or `NAN` is compiled with floating-point options preventing these two values. This can lead to undefined behavior. Check the order of command line arguments that modify this behavior, such as `-ffast-math`, `-fhonor-infinities`, and `-fhonor-nans` (etc), as well as `#pragma` directives if this diagnostic is generated unexpectedly.

### [\-Wnarrowing](#id659)[¶](#wnarrowing "Link to this heading")

Synonym for [\-Wc++11-narrowing](#wc-11-narrowing).

### [\-Wnested-anon-types](#id660)[¶](#wnested-anon-types "Link to this heading")

**Diagnostic text:**

warning: anonymous types declared in an anonymous 

struct

union

 are an extension

### [\-Wnested-externs](#id661)[¶](#wnested-externs "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wnew-returns-null](#id662)[¶](#wnew-returns-null "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ should not return a null pointer unless it is declared ‘throw()’

 or ‘noexcept’

### [\-Wnewline-eof](#id663)[¶](#wnewline-eof "Link to this heading")

**Diagnostic text:**

warning: no newline at end of file

### [\-Wnoderef](#id664)[¶](#wnoderef "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dereferencing _A_; was declared with a ‘noderef’ type

warning: dereferencing expression marked as ‘noderef’

warning: casting to dereferenceable pointer removes ‘noderef’ attribute

### [\-Wnoexcept-type](#id665)[¶](#wnoexcept-type "Link to this heading")

Synonym for [\-Wc++17-compat-mangling](#wc-17-compat-mangling).

### [\-Wnon-c-typedef-for-linkage](#id666)[¶](#wnon-c-typedef-for-linkage "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: anonymous non-C-compatible type given name for linkage purposes by 

typedef

alias

 declaration; add a tag name here

### [\-Wnon-gcc](#id667)[¶](#wnon-gcc "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wconversion](#wconversion), [\-Wliteral-range](#wliteral-range), [\-Wsign-compare](#wsign-compare).

### [\-Wnon-literal-null-conversion](#id668)[¶](#wnon-literal-null-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: expression which evaluates to zero treated as a null pointer constant of type _A_

### [\-Wnon-modular-include-in-framework-module](#id669)[¶](#wnon-modular-include-in-framework-module "Link to this heading")

**Diagnostic text:**

warning: include of non-modular header inside framework module ‘_A_’: ‘_B_’

### [\-Wnon-modular-include-in-module](#id670)[¶](#wnon-modular-include-in-module "Link to this heading")

Also controls [\-Wnon-modular-include-in-framework-module](#wnon-modular-include-in-framework-module).

**Diagnostic text:**

warning: include of non-modular header inside module ‘_A_’: ‘_B_’

### [\-Wnon-pod-varargs](#id671)[¶](#wnon-pod-varargs "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-non-pod-varargs` can be used to disable the error.

**Diagnostic text:**

error: cannot pass object of 

non-POD

non-trivial

 type _B_ through variadic 

function

block

method

constructor

; call will abort at runtime

error: cannot pass 

non-POD

non-trivial

 object of type _B_ to variadic 

function

block

method

constructor

; expected type from format string was _D_

error: second argument to ‘va\_arg’ is of non-POD type _A_

error: second argument to ‘va\_arg’ is of ARC ownership-qualified type _A_

### [\-Wnon-power-of-two-alignment](#id672)[¶](#wnon-power-of-two-alignment "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: requested alignment is not a power of 2

### [\-Wnon-virtual-dtor](#id673)[¶](#wnon-virtual-dtor "Link to this heading")

**Diagnostic text:**

warning: _A_ has virtual functions but non-virtual destructor

### [\-Wnonnull](#id674)[¶](#wnonnull "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: null passed to a callee that requires a non-null argument

warning: null returned from 

function

method

 that requires a non-null return value

### [\-Wnonportable-cfstrings](#id675)[¶](#wnonportable-cfstrings "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wnonportable-include-path](#id676)[¶](#wnonportable-include-path "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: non-portable path to file ‘_A_’; specified path differs in case from file name on disk

### [\-Wnonportable-private-apinotes-path](#id677)[¶](#wnonportable-private-apinotes-path "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: private API notes file for module ‘_A_’ should be named ‘_A_\_private.apinotes’, not ‘_B_’

### [\-Wnonportable-private-system-apinotes-path](#id678)[¶](#wnonportable-private-system-apinotes-path "Link to this heading")

**Diagnostic text:**

warning: private API notes file for module ‘_A_’ should be named ‘_A_\_private.apinotes’, not ‘_B_’

### [\-Wnonportable-sycl](#id679)[¶](#wnonportable-sycl "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ attribute does not appear on the first declaration

error: _A_ is not a valid SYCL kernel name type; a non-union class type is required

### [\-Wnonportable-system-include-path](#id680)[¶](#wnonportable-system-include-path "Link to this heading")

**Diagnostic text:**

warning: non-portable path to file ‘_A_’; specified path differs in case from file name on disk

### [\-Wnonportable-vector-initialization](#id681)[¶](#wnonportable-vector-initialization "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: vector initializers are not compatible with NEON intrinsics in big endian mode

### [\-Wnontrivial-memaccess](#id682)[¶](#wnontrivial-memaccess "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wnontrivial-memcall](#wnontrivial-memcall).

**Diagnostic text:**

warning: 

destination for

source of

first operand of

second operand of

 this _B_ call is a pointer to record _C_ that is not trivial to 

primitive-default-initialize

primitive-copy

### [\-Wnontrivial-memcall](#id683)[¶](#wnontrivial-memcall "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: first argument in call to _A_ is a pointer to non-trivially copyable type _B_

### [\-Wnrvo](#id684)[¶](#wnrvo "Link to this heading")

**Diagnostic text:**

warning: not eliding copy on return

### [\-Wnsconsumed-mismatch](#id685)[¶](#wnsconsumed-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overriding method has mismatched ns\_consumed attribute on its parameter

### [\-Wnsreturns-mismatch](#id686)[¶](#wnsreturns-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overriding method has mismatched ns\_returns\_

not\_retained

retained

 attributes

### [\-Wnull-arithmetic](#id687)[¶](#wnull-arithmetic "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: use of NULL in arithmetic operation

warning: comparison between NULL and non-pointer 

(_B_ and NULL)

(NULL and _B_)

### [\-Wnull-character](#id688)[¶](#wnull-character "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: null character(s) preserved in 

char

string

 literal

warning: null character ignored

### [\-Wnull-conversion](#id689)[¶](#wnull-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion of 

NULL

nullptr

 constant to _B_

### [\-Wnull-dereference](#id690)[¶](#wnull-dereference "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: binding dereferenced null pointer to reference has undefined behavior

warning: indirection of non-volatile null pointer will be deleted, not trap

### [\-Wnull-pointer-arithmetic](#id691)[¶](#wnull-pointer-arithmetic "Link to this heading")

Also controls [\-Wgnu-null-pointer-arithmetic](#wgnu-null-pointer-arithmetic).

**Diagnostic text:**

warning: performing pointer arithmetic on a null pointer has undefined behavior

 if the offset is nonzero

### [\-Wnull-pointer-subtraction](#id692)[¶](#wnull-pointer-subtraction "Link to this heading")

**Diagnostic text:**

warning: performing pointer subtraction with a null pointer 

has

may have

 undefined behavior

### [\-Wnullability](#id693)[¶](#wnullability "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: conflicting nullability specifier on parameter types, _A_ conflicts with existing specifier _B_

warning: conflicting nullability specifier on return types, _A_ conflicts with existing specifier _B_

warning: nullability specifier _A_ conflicts with existing specifier _B_

warning: synthesized setter _A_ for null\_resettable property _B_ does not handle nil

warning: duplicate nullability specifier _A_

### [\-Wnullability-completeness](#id694)[¶](#wnullability-completeness "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wnullability-completeness-on-arrays](#wnullability-completeness-on-arrays).

**Diagnostic text:**

warning: 

pointer

block pointer

member pointer

 is missing a nullability type specifier (\_Nonnull, \_Nullable, or \_Null\_unspecified)

### [\-Wnullability-completeness-on-arrays](#id695)[¶](#wnullability-completeness-on-arrays "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: array parameter is missing a nullability type specifier (\_Nonnull, \_Nullable, or \_Null\_unspecified)

### [\-Wnullability-declspec](#id696)[¶](#wnullability-declspec "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-nullability-declspec` can be used to disable the error.

**Diagnostic text:**

error: nullability specifier _A_ cannot be applied to non-pointer type _B_; did you mean to apply the specifier to the 

pointer

block pointer

member pointer

function pointer

member function pointer

?

### [\-Wnullability-extension](#id697)[¶](#wnullability-extension "Link to this heading")

**Diagnostic text:**

warning: type nullability specifier _A_ is a Clang extension

### [\-Wnullability-inferred-on-nested-type](#id698)[¶](#wnullability-inferred-on-nested-type "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: inferring ‘\_Nonnull’ for pointer type within 

array

reference

 is deprecated

### [\-Wnullable-to-nonnull-conversion](#id699)[¶](#wnullable-to-nonnull-conversion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion from nullable pointer _A_ to non-nullable pointer type _B_

### [\-Wnvcc-compat](#id700)[¶](#wnvcc-compat "Link to this heading")

**Diagnostic text:**

warning: target-attribute based function overloads are not supported by NVCC and will be treated as a function redeclaration:new declaration is 

\_\_device\_\_

\_\_global\_\_

\_\_host\_\_

\_\_host\_\_ \_\_device\_\_

 function, old declaration is 

\_\_device\_\_

\_\_global\_\_

\_\_host\_\_

\_\_host\_\_ \_\_device\_\_

 function

### [\-Wobjc-autosynthesis-property-ivar-name-match](#id701)[¶](#wobjc-autosynthesis-property-ivar-name-match "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: autosynthesized property _A_ will use 

synthesized

 instance variable _C_, not existing instance variable _D_

### [\-Wobjc-bool-constant-conversion](#id702)[¶](#wobjc-bool-constant-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from constant value _A_ to ‘BOOL’; the only well defined values for ‘BOOL’ are YES and NO

### [\-Wobjc-boxing](#id703)[¶](#wobjc-boxing "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: string is ill-formed as UTF-8 and will become a null _A_ when boxed

### [\-Wobjc-circular-container](#id704)[¶](#wobjc-circular-container "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: adding _A_ to _B_ might cause circular dependency in container

### [\-Wobjc-cocoa-api](#id705)[¶](#wobjc-cocoa-api "Link to this heading")

Synonym for [\-Wobjc-redundant-api-use](#wobjc-redundant-api-use).

### [\-Wobjc-designated-initializers](#id706)[¶](#wobjc-designated-initializers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: designated initializer missing a ‘super’ call to a designated initializer of the super class

warning: designated initializer invoked a non-designated initializer

warning: designated initializer should only invoke a designated initializer on ‘super’

warning: method override for the designated initializer of the superclass _A_ not found

warning: convenience initializer missing a ‘self’ call to another initializer

warning: convenience initializer should not invoke an initializer on ‘super’

### [\-Wobjc-dictionary-duplicate-keys](#id707)[¶](#wobjc-dictionary-duplicate-keys "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: duplicate key in dictionary literal

### [\-Wobjc-duplicate-category-definition](#id708)[¶](#wobjc-duplicate-category-definition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: duplicate definition of category _B_ on interface _A_

### [\-Wobjc-flexible-array](#id709)[¶](#wobjc-flexible-array "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: field _A_ can overwrite instance variable _B_ with variable sized type _C_ in superclass _D_

warning: field _A_ with variable sized type _B_ is not visible to subclasses and can conflict with their instance variables

### [\-Wobjc-forward-class-redefinition](#id710)[¶](#wobjc-forward-class-redefinition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: redefinition of forward class _A_ of a typedef name of an object type is ignored

### [\-Wobjc-interface-ivars](#id711)[¶](#wobjc-interface-ivars "Link to this heading")

**Diagnostic text:**

warning: declaration of instance variables in the interface is deprecated

### [\-Wobjc-literal-compare](#id712)[¶](#wobjc-literal-compare "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wobjc-string-compare](#wobjc-string-compare).

**Diagnostic text:**

warning: direct comparison of 

an array literal

a dictionary literal

a numeric literal

a boxed expression

 has undefined behavior

### [\-Wobjc-literal-conversion](#id713)[¶](#wobjc-literal-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit boolean conversion of Objective-C object literal always evaluates to true

warning: object of type _A_ is not compatible with 

array element type

dictionary key type

dictionary value type

 _C_

### [\-Wobjc-macro-redefinition](#id714)[¶](#wobjc-macro-redefinition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring redefinition of Objective-C qualifier macro

### [\-Wobjc-messaging-id](#id715)[¶](#wobjc-messaging-id "Link to this heading")

**Diagnostic text:**

warning: messaging unqualified id

### [\-Wobjc-method-access](#id716)[¶](#wobjc-method-access "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: class method _A_ not found (return type defaults to ‘id’)

warning: class method _A_ not found (return type defaults to ‘id’); did you mean _C_?

warning: instance method _A_ not found (return type defaults to ‘id’)

warning: instance method _A_ not found (return type defaults to ‘id’); did you mean _C_?

warning: instance method _A_ found instead of class method _B_

warning: instance method _A_ is being used on ‘Class’ which is not in the root class

### [\-Wobjc-missing-property-synthesis](#id717)[¶](#wobjc-missing-property-synthesis "Link to this heading")

**Diagnostic text:**

warning: auto property synthesis is synthesizing property not explicitly synthesized

### [\-Wobjc-missing-super-calls](#id718)[¶](#wobjc-missing-super-calls "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: method possibly missing a \[super _A_\] call

### [\-Wobjc-multiple-method-names](#id719)[¶](#wobjc-multiple-method-names "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: multiple methods named _A_ found

### [\-Wobjc-noncopy-retain-block-property](#id720)[¶](#wobjc-noncopy-retain-block-property "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: retain’ed block property does not copy the block - use copy attribute instead

### [\-Wobjc-nonunified-exceptions](#id721)[¶](#wobjc-nonunified-exceptions "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cannot catch an exception thrown with @throw in C++ in the non-unified exception model

### [\-Wobjc-property-assign-on-object-type](#id722)[¶](#wobjc-property-assign-on-object-type "Link to this heading")

**Diagnostic text:**

warning: ‘assign’ property of object type may become a dangling reference; consider using ‘unsafe\_unretained’

### [\-Wobjc-property-implementation](#id723)[¶](#wobjc-property-implementation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: class property _A_ requires method _B_ to be defined - use @dynamic or provide a method implementation in this class implementation

warning: class property _A_ requires method _B_ to be defined - use @dynamic or provide a method implementation in this category

warning: property _A_ requires method _B_ to be defined - use @synthesize, @dynamic or provide a method implementation in this class implementation

warning: property _A_ requires method _B_ to be defined - use @dynamic or provide a method implementation in this category

### [\-Wobjc-property-implicit-mismatch](#id724)[¶](#wobjc-property-implicit-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: primary property declaration is implicitly strong while redeclaration in class extension is weak

### [\-Wobjc-property-matches-cocoa-ownership-rule](#id725)[¶](#wobjc-property-matches-cocoa-ownership-rule "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: property follows Cocoa naming convention for returning ‘owned’ objects

### [\-Wobjc-property-no-attribute](#id726)[¶](#wobjc-property-no-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: default property attribute ‘assign’ not appropriate for object

warning: no ‘assign’, ‘retain’, or ‘copy’ attribute is specified - ‘assign’ is assumed

### [\-Wobjc-property-synthesis](#id727)[¶](#wobjc-property-synthesis "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: auto property synthesis will not synthesize property _A_; it will be implemented by its superclass, use @dynamic to acknowledge intention

warning: auto property synthesis will not synthesize property _A_ because it is ‘readwrite’ but it will be synthesized ‘readonly’ via another property

warning: auto property synthesis will not synthesize property _A_ because it cannot share an ivar with another synthesized property

### [\-Wobjc-protocol-method-implementation](#id728)[¶](#wobjc-protocol-method-implementation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: category is implementing a method which will also be implemented by its primary class

### [\-Wobjc-protocol-property-synthesis](#id729)[¶](#wobjc-protocol-property-synthesis "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: auto property synthesis will not synthesize property _A_ declared in protocol _B_

### [\-Wobjc-protocol-qualifiers](#id730)[¶](#wobjc-protocol-qualifiers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: parameterized class _A_ already conforms to the protocols listed; did you forget a ‘\*’?

### [\-Wobjc-readonly-with-setter-property](#id731)[¶](#wobjc-readonly-with-setter-property "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: setter cannot be specified for a readonly property

### [\-Wobjc-redundant-api-use](#id732)[¶](#wobjc-redundant-api-use "Link to this heading")

Synonym for [\-Wobjc-redundant-literal-use](#wobjc-redundant-literal-use).

### [\-Wobjc-redundant-literal-use](#id733)[¶](#wobjc-redundant-literal-use "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: using _A_ with a literal is redundant

### [\-Wobjc-root-class](#id734)[¶](#wobjc-root-class "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: class _A_ defined without specifying a base class

### [\-Wobjc-signed-char-bool](#id735)[¶](#wobjc-signed-char-bool "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wobjc-bool-constant-conversion](#wobjc-bool-constant-conversion), [\-Wobjc-signed-char-bool-implicit-float-conversion](#wobjc-signed-char-bool-implicit-float-conversion), [\-Wobjc-signed-char-bool-implicit-int-conversion](#wobjc-signed-char-bool-implicit-int-conversion), [\-Wtautological-objc-bool-compare](#wtautological-objc-bool-compare).

### [\-Wobjc-signed-char-bool-implicit-float-conversion](#id736)[¶](#wobjc-signed-char-bool-implicit-float-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit conversion from floating-point type _A_ to ‘BOOL’

### [\-Wobjc-signed-char-bool-implicit-int-conversion](#id737)[¶](#wobjc-signed-char-bool-implicit-int-conversion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion from integral type _A_ to ‘BOOL’

### [\-Wobjc-string-compare](#id738)[¶](#wobjc-string-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: direct comparison of a string literal has undefined behavior

### [\-Wobjc-string-concatenation](#id739)[¶](#wobjc-string-concatenation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: concatenated NSString literal for an NSArray expression - possibly missing a comma

### [\-Wobjc-unsafe-perform-selector](#id740)[¶](#wobjc-unsafe-perform-selector "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is incompatible with selectors that return a 

struct

union

vector

 type

### [\-Woctal-prefix-extension](#id741)[¶](#woctal-prefix-extension "Link to this heading")

**Diagnostic text:**

warning: octal integer literals are a Clang extension

### [\-Wodr](#id742)[¶](#wodr "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: template parameter lists have a different number of parameters (_A_ vs _B_)

warning: template parameter has different kinds in different translation units

warning: field _A_ declared with incompatible types in different translation units (_B_ vs. _C_)

warning: external function _A_ declared with incompatible types in different translation units (_B_ vs. _C_)

warning: instance variable _A_ declared with incompatible types in different translation units (_B_ vs. _C_)

warning: non-type template parameter declared with incompatible types in different translation units (_A_ vs. _B_)

warning: 

class

instance

 method _B_ has a different number of parameters in different translation units (_C_ vs. _D_)

warning: 

class

instance

 method _B_ has a parameter with a different types in different translation units (_C_ vs. _D_)

warning: 

class

instance

 method _B_ has incompatible result types in different translation units (_C_ vs. _D_)

warning: 

class

instance

 method _B_ is variadic in one translation unit and not variadic in another

warning: property _A_ is implemented with 

@synthesize

@dynamic

 in one translation but 

@dynamic

@synthesize

 in another translation unit

warning: property _A_ declared with incompatible types in different translation units (_B_ vs. _C_)

warning: class _A_ has incompatible superclasses

warning: property _A_ is synthesized to different ivars in different translation units (_B_ vs. _C_)

warning: parameter kind mismatch; parameter is 

not a

a

 parameter pack

warning: type _A_ has incompatible definitions

 in different translation units

error: type _A_ has 

an attribute

a member with an attribute

 which currently causes the types to be treated as though they are incompatible

warning: external variable _A_ defined in multiple translation units

warning: external variable _A_ declared with incompatible types in different translation units (_B_ vs. _C_)

### [\-Wold-style-cast](#id743)[¶](#wold-style-cast "Link to this heading")

**Diagnostic text:**

warning: use of old-style cast

### [\-Wold-style-definition](#id744)[¶](#wold-style-definition "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wopenacc](#id745)[¶](#wopenacc "Link to this heading")

Synonym for [\-Wsource-uses-openacc](#wsource-uses-openacc).

### [\-Wopenacc-cache-var-inside-loop](#id746)[¶](#wopenacc-cache-var-inside-loop "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: OpenACC variable in ‘cache’ directive was not declared outside of the associated ‘loop’ directive; directive has no effect

### [\-Wopenacc-confusing-routine-name](#id747)[¶](#wopenacc-confusing-routine-name "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: OpenACC ‘routine’ directive with a name refers to a function with the same name as the function on the following line; this may be unintended

### [\-Wopenacc-deprecated-clause-alias](#id748)[¶](#wopenacc-deprecated-clause-alias "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: OpenACC clause name ‘_A_’ is a deprecated clause name and is now an alias for ‘_B_’

### [\-Wopenacc-extension](#id749)[¶](#wopenacc-extension "Link to this heading")

**Diagnostic text:**

warning: sub-array as a variable 

in ‘use\_device’ clause

on ‘declare’ construct

 is not a valid variable name or array name

### [\-Wopenacc-self-if-potential-conflict](#id750)[¶](#wopenacc-self-if-potential-conflict "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: OpenACC construct ‘self’ has no effect when an ‘if’ clause evaluates to true

### [\-Wopenacc-var-lacks-operation](#id751)[¶](#wopenacc-var-lacks-operation "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-openacc-var-lacks-operation` can be used to disable the error.

**Diagnostic text:**

error: variable of type _A_ referenced in OpenACC ‘_B_’ clause does not have a 

default constructor

copy constructor

destructor

; reference has no effect

### [\-Wopenacc-var-non-const-array](#id752)[¶](#wopenacc-var-non-const-array "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: variable of array type _A_ referenced in OpenACC ‘_B_’ clause does not have constant bounds; initialization will happen after decay to pointer

### [\-Wopencl-unsupported-rgba](#id753)[¶](#wopencl-unsupported-rgba "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: vector component name ‘_A_’ is a feature from OpenCL version 3.0 onwards

### [\-Wopenmp](#id754)[¶](#wopenmp "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wopenmp-51-extensions](#wopenmp-51-extensions), [\-Wopenmp-clauses](#wopenmp-clauses), [\-Wopenmp-extensions](#wopenmp-extensions), [\-Wopenmp-future](#wopenmp-future), [\-Wopenmp-loop-form](#wopenmp-loop-form), [\-Wopenmp-mapping](#wopenmp-mapping), [\-Wopenmp-target](#wopenmp-target), [\-Wopenmp-target-exception](#wopenmp-target-exception), [\-Wsource-uses-openmp](#wsource-uses-openmp).

### [\-Wopenmp-51-extensions](#id755)[¶](#wopenmp-51-extensions "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: specifying OpenMP directives with \[\[\]\] is an OpenMP 5.1 extension

### [\-Wopenmp-clauses](#id756)[¶](#wopenmp-clauses "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: aligned clause will be ignored because the requested alignment is not a power of 2

warning: allocator with the ‘thread’ trait access has unspecified behavior on ‘_A_’ directive

warning: the context property ‘_A_’ is not valid for the context selector ‘_B_’ and the context set ‘_C_’; property ignored

warning: the context selector ‘_A_’ in the context set ‘_B_’ cannot have a score (_C_); score ignored

warning: the context selector ‘_A_’ is not valid for the context set ‘_B_’; selector ignored

warning: the context selector ‘_A_’ in context set ‘_B_’ requires a context property defined in parentheses; selector ignored

warning: the context 

set

selector

property

 ‘_B_’ was used already in the same ‘omp declare variant’ directive; 

set

selector

property

 ignored

warning: ‘_A_’ is not a valid context property for the context selector ‘_B_’ and the context set ‘_C_’; property ignored

warning: ‘_A_’ is not a valid context selector for the context set ‘_B_’; selector ignored

warning: ‘_A_’ is not a valid context set in a \`declare variant\`; set ignored

warning: expected ‘_A_’ after the _B_; ‘_A_’ assumed

warning: expected identifier or string literal describing a context 

set

selector

property

; 

set

selector

property

 skipped

warning: zero linear step (_A_ 

and other variables in clause 

should probably be const)

warning: more than one ‘device\_type’ clause is specified

warning: interop type ‘_A_’ cannot be specified more than once

warning: reserved locator ‘omp\_all\_memory’ cannot be specified more than once

warning: valid _A_ clauses start with _B_; 

token

tokens

 will be ignored

warning: _A_ clause should not be followed by arguments; tokens will be ignored

warning: allocate directive specifies 

default

‘_B_’

 allocator while previously used 

default

‘_D_’

### [\-Wopenmp-extensions](#id757)[¶](#wopenmp-extensions "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘ompx\_attribute’ clause only allows ‘amdgpu\_flat\_work\_group\_size’, ‘amdgpu\_waves\_per\_eu’, and ‘launch\_bounds’; _A_ is ignored

### [\-Wopenmp-future](#id758)[¶](#wopenmp-future "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: directive spelling ‘_A_’ is introduced in a later OpenMP version

### [\-Wopenmp-loop-form](#id759)[¶](#wopenmp-loop-form "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: initialization clause of OpenMP for loop is not in canonical form (‘var = init’ or ‘T var = init’)

warning: OpenMP loop iteration variable cannot have more than 64 bits size and will be narrowed

### [\-Wopenmp-mapping](#id760)[¶](#wopenmp-mapping "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: type _A_ is not trivially copyable and not guaranteed to be mapped correctly

### [\-Wopenmp-target](#id761)[¶](#wopenmp-target "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wopenmp-mapping](#wopenmp-mapping).

**Diagnostic text:**

warning: OpenMP offloading target ‘_A_’ is similar to target ‘_B_’ already specified; will be ignored

warning: declaration marked as declare target after first use, it may lead to incorrect results

warning: declaration is not declared in any declare target region

### [\-Wopenmp-target-exception](#id762)[¶](#wopenmp-target-exception "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: target ‘_A_’ does not support exception handling; ‘throw’ is assumed to be never reached

warning: target ‘_A_’ does not support exception handling; ‘catch’ block is ignored

### [\-Woption-ignored](#id763)[¶](#woption-ignored "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: option ‘-ffine-grained-bitfield-accesses’ cannot be enabled together with a sanitizer; flag ignored

warning: \-fjmc works only for ELF; option ignored

warning: _A_ requires debug info. Use _B_ or debug options that enable debugger’s stepping function; option ignored

warning: ignoring ‘_A_’ as it conflicts with that implied by ‘_B_’ (_C_)

warning: ‘_A_’ does not support ‘-_B_’; flag ignored

warning: ‘_A_’ does not support ‘-moutline’; flag ignored

warning: _A_ requires HVX, use -mhvx/-mhvx= to enable it

warning: option ‘_A_’ was ignored by the _B_ toolchain, using ‘-fPIC’

warning: the warning option ‘-_A_’ is not supported

warning: ignoring ‘-mlong-calls’ option as it is not currently supported with 

the implicit usage of 

\-mabicalls

warning: the library ‘_A_\=_B_’ is not supported, OpenMP will not be enabled

warning: the argument ‘_A_’ is not supported for option ‘_B_’. Mapping to ‘_B__C_’

warning: ignoring ‘_A_’ option for offload arch ‘_B_’ as it is not currently supported there. Use it with an offload arch containing ‘_C_’ instead

warning: ignoring ‘_A_’ option as it is not currently supported for processor ‘_B_’

warning: ignoring ‘_A_’ option as it is not currently supported for target ‘_B_’

warning: ignoring ‘_A_’ option as it cannot be used with 

implicit usage of

 \-mabicalls and the N64 ABI

warning: /arm64EC has been overridden by specified target: _A_; option ignored

### [\-Wordered-compare-function-pointers](#id764)[¶](#wordered-compare-function-pointers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ordered comparison of function pointers (_A_ and _B_)

warning: ordered comparison of function pointers (_A_ and _B_)

### [\-Wout-of-line-declaration](#id765)[¶](#wout-of-line-declaration "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-out-of-line-declaration` can be used to disable the error.

**Diagnostic text:**

error: out-of-line declaration of a member must be a definition

### [\-Wout-of-scope-function](#id766)[¶](#wout-of-scope-function "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: use of out-of-scope declaration of _A_

 whose type is not compatible with that of an implicit declaration

### [\-Wover-aligned](#id767)[¶](#wover-aligned "Link to this heading")

**Diagnostic text:**

warning: type _A_ requires _B_ bytes of alignment and the default allocator only guarantees _C_ bytes

### [\-Woverflow](#id768)[¶](#woverflow "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Woverlength-strings](#id769)[¶](#woverlength-strings "Link to this heading")

**Diagnostic text:**

warning: string literal of length _A_ exceeds maximum length _B_ that 

C90

ISO C99

C++

 compilers are required to support

### [\-Woverloaded-shift-op-parentheses](#id770)[¶](#woverloaded-shift-op-parentheses "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overloaded operator 

\>>

<<

 has higher precedence than comparison operator

### [\-Woverloaded-virtual](#id771)[¶](#woverloaded-virtual "Link to this heading")

**Diagnostic text:**

warning: _A_ hides overloaded virtual 

function

functions

### [\-Woverride-init](#id772)[¶](#woverride-init "Link to this heading")

Synonym for [\-Winitializer-overrides](#winitializer-overrides).

### [\-Woverride-module](#id773)[¶](#woverride-module "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overriding the module target triple with _A_

### [\-Woverriding-deployment-version](#id774)[¶](#woverriding-deployment-version "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overriding deployment version from ‘_A_’ to ‘_B_’

### [\-Woverriding-method-mismatch](#id775)[¶](#woverriding-method-mismatch "Link to this heading")

**Diagnostic text:**

warning: conflicting distributed object modifiers on parameter type in declaration of _A_

warning: conflicting parameter types in declaration of _A_

: _B_ vs _C_

warning: conflicting distributed object modifiers on return type in declaration of _A_

warning: conflicting return type in declaration of _A_

: _B_ vs _C_

warning: conflicting variadic declaration of method and its implementation

warning: conflicting parameter types in declaration of _A_: _B_ vs _C_

warning: conflicting return type in declaration of _A_: _B_ vs _C_

### [\-Woverriding-option](#id776)[¶](#woverriding-option "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overriding ‘_A_’ option with ‘_B_’

### [\-Wpacked](#id777)[¶](#wpacked "Link to this heading")

Also controls [\-Wpacked-non-pod](#wpacked-non-pod).

**Diagnostic text:**

warning: packed attribute is unnecessary for _A_

### [\-Wpacked-non-pod](#id778)[¶](#wpacked-non-pod "Link to this heading")

**Diagnostic text:**

warning: not packing field _A_ as it is non-POD for the purposes of layout

### [\-Wpadded](#id779)[¶](#wpadded "Link to this heading")

Also controls [\-Wpadded-bitfield](#wpadded-bitfield).

**Diagnostic text:**

warning: padding 

struct

interface

class

 _B_ with _C_ 

byte

bit

s

 to align anonymous field

warning: padding 

struct

interface

class

 _B_ with _C_ 

byte

bit

s

 to align _E_

warning: padding size of _A_ with _B_ 

byte

bit

s

 to alignment boundary

### [\-Wpadded-bitfield](#id780)[¶](#wpadded-bitfield "Link to this heading")

**Diagnostic text:**

warning: padding 

struct

interface

class

 _B_ with _C_ 

byte

bit

s

 to align anonymous bit-field

warning: padding 

struct

interface

class

 _B_ with _C_ 

byte

bit

s

 to align _E_

### [\-Wparentheses](#id781)[¶](#wparentheses "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wbitwise-conditional-parentheses](#wbitwise-conditional-parentheses), [\-Wbitwise-op-parentheses](#wbitwise-op-parentheses), [\-Wdangling-else](#wdangling-else), [\-Wlogical-not-parentheses](#wlogical-not-parentheses), [\-Wlogical-op-parentheses](#wlogical-op-parentheses), [\-Woverloaded-shift-op-parentheses](#woverloaded-shift-op-parentheses), [\-Wparentheses-equality](#wparentheses-equality), [\-Wshift-op-parentheses](#wshift-op-parentheses).

**Diagnostic text:**

error: comparison in fold expression would evaluate to ‘(X _A_ Y) _A_ Z’ which does not behave the same as a mathematical expression

warning: using the result of an assignment as a condition without parentheses

error: chained comparison ‘X _A_ Y _B_ Z’ does not behave the same as a mathematical expression

warning: _A_ has lower precedence than _B_; _B_ will be evaluated first

warning: operator ‘?:’ has lower precedence than ‘_A_’; ‘_A_’ will be evaluated first

### [\-Wparentheses-equality](#id782)[¶](#wparentheses-equality "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: equality comparison with extraneous parentheses

### [\-Wpartial-availability](#id783)[¶](#wpartial-availability "Link to this heading")

Synonym for [\-Wunguarded-availability](#wunguarded-availability).

### [\-Rpass](#id784)[¶](#rpass "Link to this heading")

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Rpass-analysis](#id785)[¶](#rpass-analysis "Link to this heading")

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

 _A_; allow reordering by specifying ‘#pragma clang loop vectorize(enable)’ before the loop; if the arrays will always be independent, specify ‘#pragma clang loop vectorize(assume\_safety)’ before the loop or provide the ‘\_\_restrict\_\_’ qualifier with the independent array arguments – erroneous results will occur if these options are incorrectly applied

 _A_; allow reordering by specifying ‘#pragma clang loop vectorize(enable)’ before the loop or by providing the compiler option ‘-ffast-math’

### [\-Wpass-failed](#id786)[¶](#wpass-failed "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Rpass-missed](#id787)[¶](#rpass-missed "Link to this heading")

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Wpch-date-time](#id788)[¶](#wpch-date-time "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

precompiled header

module

 uses \_\_DATE\_\_ or \_\_TIME\_\_

### [\-Wpch-vfs-diff](#id789)[¶](#wpch-vfs-diff "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: PCH was compiled with different VFS overlay files than are currently in use

### [\-Wpedantic](#id790)[¶](#wpedantic "Link to this heading")

Also controls [\-Wattribute-preprocessor-tokens](#wattribute-preprocessor-tokens), [\-Wauto-decl-extensions](#wauto-decl-extensions), [\-Wbit-int-extension](#wbit-int-extension), [\-Wc++11-extra-semi](#wc-11-extra-semi), [\-Wc++11-long-long](#wc-11-long-long), [\-Wc++14-attribute-extensions](#wc-14-attribute-extensions), [\-Wc++14-binary-literal](#wc-14-binary-literal), [\-Wc++17-attribute-extensions](#wc-17-attribute-extensions), [\-Wc++20-attribute-extensions](#wc-20-attribute-extensions), [\-Wc++20-designator](#wc-20-designator), [\-Wc11-extensions](#wc11-extensions), [\-Wc2y-extensions](#wc2y-extensions), [\-Wcomplex-component-init](#wcomplex-component-init), [\-Wdelimited-escape-sequence-extension](#wdelimited-escape-sequence-extension), [\-Wdollar-in-identifier-extension](#wdollar-in-identifier-extension), [\-Wembedded-directive](#wembedded-directive), [\-Wempty-translation-unit](#wempty-translation-unit), [\-Wflexible-array-extensions](#wflexible-array-extensions), [\-Wfuture-attribute-extensions](#wfuture-attribute-extensions), [\-Wgnu-anonymous-struct](#wgnu-anonymous-struct), [\-Wgnu-auto-type](#wgnu-auto-type), [\-Wgnu-case-range](#wgnu-case-range), [\-Wgnu-complex-integer](#wgnu-complex-integer), [\-Wgnu-compound-literal-initializer](#wgnu-compound-literal-initializer), [\-Wgnu-conditional-omitted-operand](#wgnu-conditional-omitted-operand), [\-Wgnu-empty-struct](#wgnu-empty-struct), [\-Wgnu-flexible-array-initializer](#wgnu-flexible-array-initializer), [\-Wgnu-flexible-array-union-member](#wgnu-flexible-array-union-member), [\-Wgnu-imaginary-constant](#wgnu-imaginary-constant), [\-Wgnu-include-next](#wgnu-include-next), [\-Wgnu-label-as-value](#wgnu-label-as-value), [\-Wgnu-line-marker](#wgnu-line-marker), [\-Wgnu-null-pointer-arithmetic](#wgnu-null-pointer-arithmetic), [\-Wgnu-pointer-arith](#wgnu-pointer-arith), [\-Wgnu-redeclared-enum](#wgnu-redeclared-enum), [\-Wgnu-statement-expression](#wgnu-statement-expression), [\-Wgnu-union-cast](#wgnu-union-cast), [\-Wgnu-zero-line-directive](#wgnu-zero-line-directive), [\-Wimport-preprocessor-directive-pedantic](#wimport-preprocessor-directive-pedantic), [\-Winvalid-utf8](#winvalid-utf8), [\-Wkeyword-macro](#wkeyword-macro), [\-Wlanguage-extension-token](#wlanguage-extension-token), [\-Wlong-long](#wlong-long), [\-Wmicrosoft-charize](#wmicrosoft-charize), [\-Wmicrosoft-comment-paste](#wmicrosoft-comment-paste), [\-Wmicrosoft-cpp-macro](#wmicrosoft-cpp-macro), [\-Wmicrosoft-end-of-file](#wmicrosoft-end-of-file), [\-Wmicrosoft-enum-value](#wmicrosoft-enum-value), [\-Wmicrosoft-fixed-enum](#wmicrosoft-fixed-enum), [\-Wmicrosoft-flexible-array](#wmicrosoft-flexible-array), [\-Wmicrosoft-redeclare-static](#wmicrosoft-redeclare-static), [\-Wnested-anon-types](#wnested-anon-types), [\-Wnullability-extension](#wnullability-extension), [\-Woctal-prefix-extension](#woctal-prefix-extension), [\-Wopenacc-extension](#wopenacc-extension), [\-Woverlength-strings](#woverlength-strings), [\-Wretained-language-linkage](#wretained-language-linkage), [\-Wtentative-definition-incomplete-type](#wtentative-definition-incomplete-type), [\-Wundefined-internal-type](#wundefined-internal-type), [\-Wzero-length-array](#wzero-length-array).

**Diagnostic text:**

warning: enumeration types with a fixed underlying type are a C++11 extension

warning: expression is not an 

integer

integral

 constant expression; folding it to a constant is a GNU extension

warning: variable length arrays are a C99 feature

warning: variable length arrays in C++ are a Clang extension

warning: variable length arrays in C++ are a Clang extension; did you mean to use ‘static\_assert’?

warning: designated initializers are a C99 feature

warning: implicit ‘0’ return value from ‘main’ is a C99 extension

warning: referring to ‘main’ within an expression is a Clang extension

warning: defining a type within ‘

\_\_builtin\_offsetof

offsetof

‘ is a C23 extension

warning: C++98 requires an accessible copy constructor for class _C_ when binding a reference to a temporary; was 

private

protected

warning: anonymous 

struct

union

 cannot be ‘_B_’

warning: ISO C++ requires the name after ‘::~’ to be found in the same scope as the name before ‘::~’

warning: ISO C++ considers this destructor name lookup to be ambiguous

warning: no viable constructor 

copying variable

copying parameter

initializing template parameter

returning object

initializing statement expression result

throwing object

copying member subobject

copying array element

allocating object

copying temporary

initializing base subobject

initializing vector element

capturing value

 of type _B_; C++98 requires a copy constructor when binding a reference to a temporary

warning: ISO C++ standards before C++17 do not allow new expression for type _A_ to use list-initialization

warning: invoking a pointer to a ‘const &’ member function on an rvalue is a C++20 extension

warning: qualifier in explicit instantiation of _A_ requires a template-id (a typedef is not permitted)

warning: a 

function

block

 declaration without a prototype is deprecated 

in all versions of C

warning: static 

function

variable

 _B_ is used in an inline function with external linkage

warning: ISO C forbids forward references to ‘enum’ types

warning: 

incremented 

enumerator value which exceeds the range of ‘int’ is a C23 extension (_B_ is too 

small

large

)

warning: initializer for aggregate is not a compile-time constant

warning: flexible array members are a C99 feature

warning: invalid application of ‘_A_’ to a function type

warning: invalid application of ‘_A_’ to a void type

warning: ISO C90 does not allow subscripting non-lvalue array

warning: ‘restrict’ qualifier on an array of pointers is a C23 extension

warning: ISO C forbids taking the address of an expression of type ‘void’

warning: ordered comparison between pointer and zero (_A_ and _B_) is an extension

warning: equality comparison between function pointer and void pointer (_A_ and _B_)

warning: ISO C does not support ‘~’ for complex conjugation of _A_

warning: complex numbers are an extension in a freestanding C99 implementation

warning: cast between pointer-to-function and pointer-to-object is an extension

warning: implicit conversion from array size expression of type _A_ to 

integral

enumeration

 type _C_ is a C++11 extension

warning: 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

 converts between void pointer and function pointer

warning: kernel function _A_ is a member function; this may not be accepted by nvcc

warning: C99 forbids conditional expressions with only one void side

warning: C99 forbids casting nonscalar type _A_ to the same type

warning: in-class initializer for static data member is not a constant expression; folding it to a constant is a GNU extension

warning: types declared in an anonymous 

struct

union

 are a Microsoft extension

warning: format specifies type _A_ but the argument has 

type

underlying type

 _B_

warning: signedness of format specifier ‘_A_’ is incompatible with ‘_B_’

warning: void 

function

method

block

 _A_ should not return void expression

warning: mixing declarations and code is a C99 extension

warning: declaration of non-local variable in ‘for’ loop is a C23 extension

warning: non-variable declaration in ‘for’ loop is a C23 extension

warning: 

qualifier in 

static 

array size 

‘\[\*\] ‘

is a C99 feature

warning: Clang permits use of type ‘double’ regardless pragma if ‘cl\_khr\_fp64’ is supported

warning: extra ‘;’ 

outside of a function

inside a _B_

inside instance variable list

after member function definition

warning: ‘\_\_thread’ before ‘_A_’

warning: type-less parameter names in function declaration

warning: variable declaration in for loop is a C99-specific feature

warning: compound literals are a C99-specific feature

warning: commas at the end of enumerator lists are a C99-specific feature

warning: commas at the end of enumerator lists are a C++11 extension

warning: enumeration types with a fixed underlying type are a C23 extension

warning: ‘_A_’ is a C99 extension

warning: use of GNU array range extension

warning: exception specification of ‘…’ is a Microsoft extension

warning: ‘nullptr’ is a C23 extension

warning: attributes on 

a namespace

an enumerator

 declaration are a C++17 extension

warning: \[\[\]\] attributes are a C++11 extension

warning: \[\[\]\] attributes are a C23 extension

warning: extern templates are a C++11 extension

warning: ‘= delete’ with a message is a C++2c extension

warning: multi-line // comment

warning: // comments are not allowed in this language

warning:  ‘_A_’ in a raw string literal delimiter is a C++2c extension

warning: use of non-standard escape character ‘\\_A_’

warning: hexadecimal floating constants are a C99 feature

warning: hexadecimal floating literals are a C++17 feature

warning: binary integer literals are a C23 extension

warning: #ident is a language extension

warning: #warning is a 

C23

C++23

 extension

warning: comma operator in operand of #if

warning: \_\_VA\_ARGS\_\_ can only appear in the expansion of a C99 variadic macro

warning: variadic macros are a C99 feature

warning: named variadic macros are a GNU extension

warning: passing no argument for the ‘…’ parameter of a variadic macro is a C23 extension

warning: passing no argument for the ‘…’ parameter of a variadic macro is a C++20 extension

warning: empty macro arguments are a C99 feature

warning: variadic macros are a Clang extension in OpenCL

warning: token pasting of ‘,’ and \_\_VA\_ARGS\_\_ is a GNU extension

warning: C requires #line number to be less than _A_, allowed as extension

warning: macro expansion producing ‘defined’ has undefined behavior

warning: use of an empty initializer is a C23 extension

warning: duplicate ‘_A_’ declaration specifier

warning: ‘enable\_if’ is a clang extension

warning: ‘diagnose\_if’ is a clang extension

### [\-Wpedantic-core-features](#id791)[¶](#wpedantic-core-features "Link to this heading")

**Diagnostic text:**

warning: _A_ is a core feature in 

OpenCL C

C++ for OpenCL

 version _C_ but not supported on this target

warning: OpenCL extension _A_ is core feature or supported optional core feature - ignoring

### [\-Wpedantic-macros](#id792)[¶](#wpedantic-macros "Link to this heading")

This diagnostic is enabled by default.

Controls [\-Wbuiltin-macro-redefined](#wbuiltin-macro-redefined), [\-Wdeprecated-pragma](#wdeprecated-pragma), [\-Wfinal-macro](#wfinal-macro), [\-Wmacro-redefined](#wmacro-redefined), [\-Wrestrict-expansion](#wrestrict-expansion).

### [\-Wperf-constraint-implies-noexcept](#id793)[¶](#wperf-constraint-implies-noexcept "Link to this heading")

**Diagnostic text:**

warning: 

function

constructor

destructor

lambda

block

 with ‘_B_’ attribute should be declared noexcept

### [\-Wpessimizing-move](#id794)[¶](#wpessimizing-move "Link to this heading")

**Diagnostic text:**

warning: moving a temporary object prevents copy elision

warning: moving a local object in a return statement prevents copy elision

### [\-Wpointer-arith](#id795)[¶](#wpointer-arith "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wgnu-pointer-arith](#wgnu-pointer-arith).

**Diagnostic text:**

warning: invalid application of ‘_A_’ to a function type

warning: invalid application of ‘_A_’ to a void type

warning: subtraction of pointers to type _A_ of zero size has undefined behavior

### [\-Wpointer-bool-conversion](#id796)[¶](#wpointer-bool-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: nonnull 

function call

parameter

 ‘_B_’ will evaluate to ‘true’ on first encounter

warning: address of 

‘_B_’

function ‘_B_’

array ‘_B_’

lambda function pointer conversion operator

 will always evaluate to ‘true’

### [\-Wpointer-compare](#id797)[¶](#wpointer-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparing a pointer to a null character constant; did you mean to compare to 

NULL

(void \*)0

?

### [\-Wpointer-integer-compare](#id798)[¶](#wpointer-integer-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparison between pointer and integer (_A_ and _B_)

### [\-Wpointer-sign](#id799)[¶](#wpointer-sign "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

 converts between pointers to integer types 

with different sign

where one is of the unique plain ‘char’ type and the other is not

### [\-Wpointer-to-enum-cast](#id800)[¶](#wpointer-to-enum-cast "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wvoid-pointer-to-enum-cast](#wvoid-pointer-to-enum-cast).

**Diagnostic text:**

warning: cast to smaller integer type _B_ from _A_

### [\-Wpointer-to-int-cast](#id801)[¶](#wpointer-to-int-cast "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wpointer-to-enum-cast](#wpointer-to-enum-cast), [\-Wvoid-pointer-to-int-cast](#wvoid-pointer-to-int-cast).

**Diagnostic text:**

warning: cast to smaller integer type _B_ from _A_

### [\-Wpointer-type-mismatch](#id802)[¶](#wpointer-type-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: pointer type mismatch

 (_A_ and _B_)

### [\-Wpoison-system-directories](#id803)[¶](#wpoison-system-directories "Link to this heading")

**Diagnostic text:**

warning: include location ‘_A_’ is unsafe for cross-compilation

### [\-Wpotentially-direct-selector](#id804)[¶](#wpotentially-direct-selector "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: @selector expression formed with potentially direct selector _A_

### [\-Wpotentially-evaluated-expression](#id805)[¶](#wpotentially-evaluated-expression "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: expression with side effects will be evaluated despite being used as an operand to ‘typeid’

### [\-Wpragma-clang-attribute](#id806)[¶](#wpragma-clang-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unused attribute _A_ in ‘#pragma clang attribute push’ region

### [\-Wpragma-pack](#id808)[¶](#wpragma-pack "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wpragma-pack-suspicious-include](#wpragma-pack-suspicious-include).

**Diagnostic text:**

warning: the current #pragma pack alignment value is modified in the included file

warning: unterminated ‘#pragma pack (push, …)’ at end of file

### [\-Wpragma-pack-suspicious-include](#id809)[¶](#wpragma-pack-suspicious-include "Link to this heading")

**Diagnostic text:**

warning: non-default #pragma pack value changes the alignment of struct or union members in the included file

### [\-Wpragmas](#id811)[¶](#wpragmas "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wignored-pragmas](#wignored-pragmas), [\-Wpragma-clang-attribute](#wpragma-clang-attribute), [\-Wpragma-pack](#wpragma-pack), [\-Wunknown-pragmas](#wunknown-pragmas).

**Diagnostic text:**

warning: setting the floating point evaluation method to \`source\` on a target without SSE is not supported

warning: #pragma redefine\_extname is applicable to external C declarations only; not applied to 

function

variable

 _B_

### [\-Wpre-c++14-compat](#id812)[¶](#wpre-c-14-compat "Link to this heading")

**Diagnostic text:**

warning: multiple return statements in constexpr function is incompatible with C++ standards before C++14

warning: variable declaration in a constexpr 

function

constructor

 is incompatible with C++ standards before C++14

warning: type definition in a constexpr 

function

constructor

 is incompatible with C++ standards before C++14

warning: use of this statement in a constexpr 

function

constructor

 is incompatible with C++ standards before C++14

warning: variable templates are incompatible with C++ standards before C++14

warning: constexpr function with no return statements is incompatible with C++ standards before C++14

warning: ‘decltype(auto)’ type specifier is incompatible with C++ standards before C++14

warning: return type deduction is incompatible with C++ standards before C++14

warning: digit separators are incompatible with C++ standards before C++14

warning: generic lambdas are incompatible with C++11

warning: initialized lambda captures are incompatible with C++ standards before C++14

### [\-Wpre-c++14-compat-pedantic](#id813)[¶](#wpre-c-14-compat-pedantic "Link to this heading")

Controls [\-Wc++98-c++11-compat-binary-literal](#wc-98-c-11-compat-binary-literal), [\-Wpre-c++14-compat](#wpre-c-14-compat).

### [\-Wpre-c++17-compat](#id814)[¶](#wpre-c-17-compat "Link to this heading")

**Diagnostic text:**

warning: decomposition declarations are incompatible with C++ standards before C++17

warning: inline variables are incompatible with C++ standards before C++17

warning: class template argument deduction is incompatible with C++ standards before C++17

; for compatibility, use explicit type name _B_

warning: constexpr if is incompatible with C++ standards before C++17

warning: constexpr on lambda expressions is incompatible with C++ standards before C++17

warning: pack fold expression is incompatible with C++ standards before C++17

warning: 

if

switch

 initialization statements are incompatible with C++ standards before C++17

warning: nested namespace definition is incompatible with C++ standards before C++17

warning: by value capture of ‘\*this’ is incompatible with C++ standards before C++17

warning: ‘static\_assert’ with no message is incompatible with C++ standards before C++17

warning: non-type template parameters declared with _A_ are incompatible with C++ standards before C++17

warning: template template parameter using ‘typename’ is incompatible with C++ standards before C++17

warning: unicode literals are incompatible with C++ standards before C++17

warning: default scope specifier for attributes is incompatible with C++ standards before C++17

warning: use of multiple declarators in a single using declaration is incompatible with C++ standards before C++17

warning: pack expansion using declaration is incompatible with C++ standards before C++17

warning: ‘begin’ and ‘end’ returning different types (_A_ and _B_) is incompatible with C++ standards before C++17

### [\-Wpre-c++17-compat-pedantic](#id815)[¶](#wpre-c-17-compat-pedantic "Link to this heading")

Also controls [\-Wpre-c++17-compat](#wpre-c-17-compat).

**Diagnostic text:**

warning: attributes on 

a namespace

an enumerator

 declaration are incompatible with C++ standards before C++17

warning: hexadecimal floating literals are incompatible with C++ standards before C++17

### [\-Wpre-c++20-compat](#id816)[¶](#wpre-c-20-compat "Link to this heading")

**Diagnostic text:**

warning: use of function template name with no prior declaration in function call with explicit template arguments is incompatible with C++ standards before C++20

warning: constexpr constructor that does not initialize all members is incompatible with C++ standards before C++20

warning: function try block in constexpr 

function

constructor

 is incompatible with C++ standards before C++20

warning: uninitialized variable in a constexpr 

function

constructor

 is incompatible with C++ standards before C++20

warning: constexpr union constructor that does not initialize any member is incompatible with C++ standards before C++20

warning: class template argument deduction for alias templates is incompatible with C++ standards before C++20

warning: use of this statement in a constexpr 

function

constructor

 is incompatible with C++ standards before C++20

warning: decomposition declaration declared 

‘_B_’

with ‘_B_’ specifiers

 is incompatible with C++ standards before C++20

warning: missing ‘typename’ prior to dependent type name _A_ is incompatible with C++ standards before C++20

warning: default member initializer for bit-field is incompatible with C++ standards before C++20

warning: captured structured bindings are incompatible with C++ standards before C++20

warning: virtual constexpr functions are incompatible with C++ standards before C++20

warning: defaulted comparison operators are incompatible with C++ standards before C++20

warning: explicitly defaulting this 

default constructor

copy constructor

move constructor

copy assignment operator

move assignment operator

destructor

 with a type different from the implicit type is incompatible with C++ standards before C++20

warning: explicit capture of ‘this’ with a capture default of ‘=’ is incompatible with C++ standards before C++20

warning: explicit(bool) is incompatible with C++ standards before C++20

warning: range-based for loop initialization statements are incompatible with C++ standards before C++20

warning: initialized lambda capture packs are incompatible with C++ standards before C++20

warning: inline nested namespace definition is incompatible with C++ standards before C++20

warning: 

default construction

assignment

 of lambda is incompatible with C++ standards before C++20

warning: explicit template parameter list for lambdas is incompatible with C++ standards before C++20

warning: passing no argument for the ‘…’ parameter of a variadic macro is incompatible with C++ standards before C++20

warning: ‘<=>’ operator is incompatible with C++ standards before C++20

warning: non-type template parameter of type _A_ is incompatible with C++ standards before C++20

warning: ‘char8\_t’ type specifier is incompatible with C++ standards before C++20

warning: member using declaration naming a non-member enumerator is incompatible with C++ standards before C++20

warning: member using declaration naming non-class ‘_A_’ enumerator is incompatible with C++ standards before C++20

warning: using declaration naming a scoped enumerator is incompatible with C++ standards before C++20

warning: using enum declaration is incompatible with C++ standards before C++20

warning: ‘consteval’ specifier is incompatible with C++ standards before C++20

warning: ‘constinit’ specifier is incompatible with C++ standards before C++20

### [\-Wpre-c++20-compat-pedantic](#id817)[¶](#wpre-c-20-compat-pedantic "Link to this heading")

Also controls [\-Wpre-c++20-compat](#wpre-c-20-compat).

**Diagnostic text:**

warning: designated initializers are incompatible with C++ standards before C++20

warning: invoking a pointer to a ‘const &’ member function on an rvalue is incompatible with C++ standards before C++20

### [\-Wpre-c++23-compat](#id818)[¶](#wpre-c-23-compat "Link to this heading")

**Diagnostic text:**

warning: definition of a 

static

thread\_local

 variable in a constexpr 

function

constructor

 is incompatible with C++ standards before C++23

warning: use of this statement in a constexpr 

function

constructor

 is incompatible with C++ standards before C++23

warning: overloaded _A_ with 

no

a defaulted

more than one

 parameter is a C++23 extension

warning: alias declaration in this context is incompatible with C++ standards before C++23

warning: ‘auto’ as a functional-style cast is incompatible with C++ standards before C++23

warning: consteval if is incompatible with C++ standards before C++23

warning: definition of a variable of non-literal type in a constexpr 

function

constructor

 is incompatible with C++ standards before C++23

warning: 

an attribute specifier sequence

_B_

 in this position is incompatible with C++ standards before C++23

warning: label at end of compound statement is incompatible with C++ standards before C++23

warning: declaring overloaded _A_ as ‘static’ is incompatible with C++ standards before C++23

warning: ‘size\_t’ suffix for literals is incompatible with C++ standards before C++23

warning: static lambdas are incompatible with C++ standards before C++23

warning: use of a ‘#

<BUG IF SEEN>

elifdef

elifndef

‘ directive is incompatible with C++ standards before C++23

warning: #warning is incompatible with C++ standards before C++23

warning: 

delimited

named

 escape sequences are incompatible with C++ standards before C++23

### [\-Wpre-c++23-compat-pedantic](#id819)[¶](#wpre-c-23-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c++23-compat](#wpre-c-23-compat).

### [\-Wpre-c++26-compat](#id820)[¶](#wpre-c-26-compat "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: structured binding declaration in a condition is incompatible with C++ standards before C++2c

warning: ‘static\_assert’ with a user-generated message is incompatible with C++ standards before C++26

warning: structured binding packs are incompatible with C++ standards before C++2c

warning: an attribute specifier sequence attached to a structured binding declaration is incompatible with C++ standards before C++2c

warning: ‘= delete’ with a message is incompatible with C++ standards before C++2c

warning: pack indexing is incompatible with C++ standards before C++2c

warning: placeholder variables are incompatible with C++ standards before C++2c

warning: variadic ‘friend’ declarations are incompatible with C++ standards before C++2c

warning:  ‘_A_’ in a raw string literal delimiter is incompatible with standards before C++2c

warning: _A_ is no longer a pack expansion but a pack indexing type; add a name to specify a pack expansion

warning: ‘

trivially\_relocatable

replaceable

\_if\_eligible’ keyword is incompatible with standards before C++2c

### [\-Wpre-c++26-compat-pedantic](#id821)[¶](#wpre-c-26-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c++26-compat](#wpre-c-26-compat).

### [\-Wpre-c++2c-compat](#id822)[¶](#wpre-c-2c-compat "Link to this heading")

Synonym for [\-Wpre-c++26-compat](#wpre-c-26-compat).

### [\-Wpre-c++2c-compat-pedantic](#id823)[¶](#wpre-c-2c-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c++26-compat-pedantic](#wpre-c-26-compat-pedantic).

### [\-Wpre-c11-compat](#id824)[¶](#wpre-c11-compat "Link to this heading")

**Diagnostic text:**

warning: ‘_A_’ is incompatible with C standards before C11

### [\-Wpre-c11-compat-pedantic](#id825)[¶](#wpre-c11-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c11-compat](#wpre-c11-compat).

### [\-Wpre-c23-compat](#id826)[¶](#wpre-c23-compat "Link to this heading")

Also controls [\-Wvariadic-macro-arguments-omitted](#wvariadic-macro-arguments-omitted).

**Diagnostic text:**

warning: ‘…’ as the only parameter of a function is incompatible with C standards before C23

warning: enumeration types with a fixed underlying type are incompatible with C standards before C23

warning: 

incremented 

enumerator value which exceeds the range of ‘int’ is incompatible with C standards before C23 (_B_ is too 

small

large

)

warning: ‘\_Static\_assert’ with no message is incompatible with C standards before C23

warning: unicode literals are incompatible with C standards before C23

warning: passing only one argument to ‘va\_start’ is incompatible with C standards before C23

warning: declaration of non-local variable in ‘for’ loop is incompatible with C standards before C23

warning: non-variable declaration in ‘for’ loop is incompatible with C standards before C23

warning: binary integer literals are incompatible with C standards before C23

warning: ‘\_BitInt’ suffix for literals is incompatible with C standards before C23

warning: digit separators are incompatible with C standards before C23

warning: use of an empty initializer is incompatible with C standards before C23

warning: ‘_A_’ is incompatible with C standards before C23

warning: label at end of compound statement is incompatible with C standards before C23

warning: label followed by a declaration is incompatible with C standards before C23

warning: universal character name referring to a control character is incompatible with C standards before C23

warning: specifying character ‘_A_’ with a universal character name is incompatible with C standards before C23

warning: use of a ‘#

<BUG IF SEEN>

elifdef

elifndef

‘ directive is incompatible with C standards before C23

warning: ‘restrict’ qualifier on an array of pointers is incompatible with C standards before C23

warning: #warning is incompatible with C standards before C23

warning: #embed is incompatible with C standards before C23

warning: \[\[\]\] attributes are incompatible with C standards before C23

### [\-Wpre-c23-compat-pedantic](#id827)[¶](#wpre-c23-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c23-compat](#wpre-c23-compat).

### [\-Wpre-c2x-compat](#id828)[¶](#wpre-c2x-compat "Link to this heading")

Synonym for [\-Wpre-c23-compat](#wpre-c23-compat).

### [\-Wpre-c2x-compat-pedantic](#id829)[¶](#wpre-c2x-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c23-compat-pedantic](#wpre-c23-compat-pedantic).

### [\-Wpre-c2y-compat](#id830)[¶](#wpre-c2y-compat "Link to this heading")

**Diagnostic text:**

warning: ‘alignof’ on an incomplete array type is incompatible with C standards before C2y

warning: use of incomplete type _A_ in a ‘\_Generic’ association is incompatible with C standards before C2y

warning: passing a type argument as the first operand to ‘\_Generic’ is incompatible with C standards before C2y

warning: ‘

–

++

‘ on an object of complex type is incompatible with C standards before C2y

warning: ‘_A_’ is incompatible with C standards before C2y

warning: octal integer literals are incompatible with standards before C2y

warning: delimited escape sequences are incompatible with C standards before C2y

warning: case ranges are incompatible with C standards before C2y

warning: imaginary constants are incompatible with C standards before C2y

### [\-Wpre-c2y-compat-pedantic](#id831)[¶](#wpre-c2y-compat-pedantic "Link to this heading")

Synonym for [\-Wpre-c2y-compat](#wpre-c2y-compat).

### [\-Wpre-openmp-51-compat](#id832)[¶](#wpre-openmp-51-compat "Link to this heading")

**Diagnostic text:**

warning: specifying OpenMP directives with \[\[\]\] is incompatible with OpenMP standards before OpenMP 5.1

### [\-Wpredefined-identifier-outside-function](#id833)[¶](#wpredefined-identifier-outside-function "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: predefined identifier is only valid inside function

### [\-Wpreferred-type-bitfield-enum-conversion](#id834)[¶](#wpreferred-type-bitfield-enum-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: bit-field _A_ is not wide enough to store all enumerators of preferred type _B_

warning: signed bit-field _A_ needs an extra bit to represent the largest positive enumerators of preferred type _B_

warning: assigning value of preferred signed enum type _B_ to unsigned bit-field _A_; negative enumerators of enum _B_ will be converted to positive values

### [\-Wpreferred-type-bitfield-width](#id835)[¶](#wpreferred-type-bitfield-width "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wprivate-extern](#id836)[¶](#wprivate-extern "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: use of \_\_private\_extern\_\_ on a declaration may not produce external symbol private to the linkage unit and is deprecated

### [\-Wprivate-module](#id838)[¶](#wprivate-module "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: expected canonical name for private module ‘_A_’

warning: private submodule ‘_A_’ in private module map, expected top-level module

warning: module ‘_A_’ already re-exported as ‘_B_’

warning: no submodule named _A_ in module ‘_B_’; using top level ‘_C_’

### [\-Wprofile-instr-missing](#id839)[¶](#wprofile-instr-missing "Link to this heading")

**Diagnostic text:**

warning: profile data may be incomplete: of _A_ function

s

, _B_ 

has

have

 no data

### [\-Wprofile-instr-out-of-date](#id840)[¶](#wprofile-instr-out-of-date "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: profile data may be out of date: of _A_ function

s

, _B_ 

has

have

 mismatched data that will be ignored

### [\-Wprofile-instr-unprofiled](#id841)[¶](#wprofile-instr-unprofiled "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: no profile data available for file “_A_”

### [\-Wproperty-access-dot-syntax](#id842)[¶](#wproperty-access-dot-syntax "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: property _A_ not found on object of type _B_; did you mean to access property _C_?

### [\-Wproperty-attribute-mismatch](#id843)[¶](#wproperty-attribute-mismatch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: property attribute in class extension does not match the primary class

warning: ‘_B_’ attribute on property _A_ does not match the property inherited from _C_

warning: getter name mismatch between property redeclaration (_B_) and its original declaration (_A_)

warning: attribute ‘readonly’ of property _A_ restricts attribute ‘readwrite’ of property inherited from _B_

### [\-Wprotocol](#id844)[¶](#wprotocol "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: method _A_ in protocol _B_ not implemented

### [\-Wprotocol-property-synthesis-ambiguity](#id845)[¶](#wprotocol-property-synthesis-ambiguity "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: property 

of type _B_

with attribute ‘_B_’

without attribute ‘_B_’

with getter _B_

with setter _B_

 was selected for synthesis

### [\-Wpsabi](#id846)[¶](#wpsabi "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: AVX vector 

return

argument

 of type _B_ without ‘_C_’ enabled changes the ABI

### [\-Wptrauth-null-pointers](#id847)[¶](#wptrauth-null-pointers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: authenticating a null pointer will almost certainly trap

warning: signing a null pointer will yield a non-null pointer

### [\-Wqualified-void-return-type](#id848)[¶](#wqualified-void-return-type "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: function cannot return qualified void type _A_

### [\-Wrange-loop-analysis](#id850)[¶](#wrange-loop-analysis "Link to this heading")

Controls [\-Wrange-loop-bind-reference](#wrange-loop-bind-reference), [\-Wrange-loop-construct](#wrange-loop-construct).

### [\-Wrange-loop-bind-reference](#id851)[¶](#wrange-loop-bind-reference "Link to this heading")

**Diagnostic text:**

warning: loop variable _A_ binds to a temporary value produced by a range of type _B_

### [\-Wrange-loop-construct](#id852)[¶](#wrange-loop-construct "Link to this heading")

**Diagnostic text:**

warning: loop variable _A_ 

of type _B_ binds to a temporary constructed from type _C_

binds to a temporary constructed from a different type

warning: loop variable _A_ creates a copy from type _B_

### [\-Wread-only-types](#id853)[¶](#wread-only-types "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: object of type _A_ cannot be placed in read-only memory

### [\-Wreadonly-iboutlet-property](#id854)[¶](#wreadonly-iboutlet-property "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: readonly IBOutlet property _A_ when auto-synthesized may not work correctly with ‘nib’ loader

### [\-Wreceiver-expr](#id855)[¶](#wreceiver-expr "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: receiver type _A_ is not ‘id’ or interface pointer, consider casting it to ‘id’

### [\-Wreceiver-forward-class](#id856)[¶](#wreceiver-forward-class "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: receiver _A_ is a forward class and corresponding @interface may not exist

warning: receiver type _A_ for instance message is a forward declaration

### [\-Wredeclared-class-member](#id857)[¶](#wredeclared-class-member "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: class member cannot be redeclared

### [\-Wreduced-bmi-output-overrided](#id858)[¶](#wreduced-bmi-output-overrided "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: the implicit output of reduced BMI may be overrided by the output file specified by ‘–precompile’. please consider use ‘-fmodule-output=’ to specify the output file for reduced BMI explicitly

### [\-Wredundant-attribute](#id859)[¶](#wredundant-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: redundant _A_ attribute

### [\-Wredundant-consteval-if](#id860)[¶](#wredundant-consteval-if "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: consteval if is always true in an 

unevaluated

immediate

 context

### [\-Wredundant-decls](#id861)[¶](#wredundant-decls "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wredundant-move](#id862)[¶](#wredundant-move "Link to this heading")

**Diagnostic text:**

warning: redundant move in return statement

### [\-Wredundant-parens](#id863)[¶](#wredundant-parens "Link to this heading")

**Diagnostic text:**

warning: redundant parentheses surrounding declarator

### [\-Wreference-tu-local-entity-in-other-tu](#id864)[¶](#wreference-tu-local-entity-in-other-tu "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: instantiation of _A_ triggers reference to TU-local entity _B_ from other TU ‘_C_’

### [\-Wregister](#id865)[¶](#wregister "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdeprecated-register](#wdeprecated-register).

**Diagnostic text:**

error: ISO C++17 does not allow ‘register’ storage class specifier

### [\-Wreinterpret-base-class](#id866)[¶](#wreinterpret-base-class "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘reinterpret\_cast’ 

from

to

 class _A_ 

to

from

 its 

virtual base

base at non-zero offset

 _B_ behaves differently from ‘static\_cast’

### [\-Wreorder](#id868)[¶](#wreorder "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wreorder-ctor](#wreorder-ctor), [\-Wreorder-init-list](#wreorder-init-list).

### [\-Wreorder-ctor](#id869)[¶](#wreorder-ctor "Link to this heading")

**Diagnostic text:**

warning: 

field

base class

 _B_ will be initialized after 

field

base

 _D_

warning: initializer order does not match the declaration order

### [\-Wreorder-init-list](#id870)[¶](#wreorder-init-list "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++ requires field designators to be specified in declaration order; field _B_ will be initialized after field _A_

### [\-Wrequires-super-attribute](#id871)[¶](#wrequires-super-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ attribute cannot be applied to 

methods in protocols

dealloc

### [\-Wreserved-attribute-identifier](#id872)[¶](#wreserved-attribute-identifier "Link to this heading")

**Diagnostic text:**

warning: _A_ is a reserved attribute identifier

### [\-Wreserved-id-macro](#id873)[¶](#wreserved-id-macro "Link to this heading")

Synonym for [\-Wreserved-macro-identifier](#wreserved-macro-identifier).

### [\-Wreserved-identifier](#id874)[¶](#wreserved-identifier "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wreserved-attribute-identifier](#wreserved-attribute-identifier), [\-Wreserved-macro-identifier](#wreserved-macro-identifier), [\-Wreserved-module-identifier](#wreserved-module-identifier), [\-Wuser-defined-literals](#wuser-defined-literals).

**Diagnostic text:**

warning: identifier _A_ is reserved because 

<ERROR>

it starts with ‘\_’ at global scope

it starts with ‘\_’ and has C language linkage

it starts with ‘\_\_’

it starts with ‘\_’ followed by a capital letter

it contains ‘\_\_’

### [\-Wreserved-macro-identifier](#id875)[¶](#wreserved-macro-identifier "Link to this heading")

**Diagnostic text:**

warning: macro name is a reserved identifier

### [\-Wreserved-module-identifier](#id876)[¶](#wreserved-module-identifier "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is a reserved name for a module

### [\-Wreserved-user-defined-literal](#id877)[¶](#wreserved-user-defined-literal "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++11-compat-reserved-user-defined-literal](#wc-11-compat-reserved-user-defined-literal).

**Diagnostic text:**

warning: invalid suffix on literal; C++11 requires a space between literal and identifier

error: invalid suffix on literal; C++11 requires a space between literal and identifier

### [\-Wrestrict-expansion](#id878)[¶](#wrestrict-expansion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: macro _A_ has been marked as unsafe for use in headers

: _C_

### [\-Wretained-language-linkage](#id879)[¶](#wretained-language-linkage "Link to this heading")

**Diagnostic text:**

warning: friend function _A_ retaining previous language linkage is an extension

### [\-Wreturn-local-addr](#id880)[¶](#wreturn-local-addr "Link to this heading")

Synonym for [\-Wreturn-stack-address](#wreturn-stack-address).

### [\-Wreturn-mismatch](#id881)[¶](#wreturn-mismatch "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-return-mismatch` can be used to disable the error.

**Diagnostic text:**

error: 

void function

void method

constructor

destructor

 _A_ should not return a value

error: non-void 

function

method

 _A_ should return a value

error: non-void 

function

method

 _A_ should return a value

### [\-Wreturn-stack-address](#id882)[¶](#wreturn-stack-address "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: passing 

address of

reference to

 local temporary object to musttail function

warning: returning address of label, which is local

warning: returning 

address of

reference to

 local temporary object

warning: 

address of

reference to

 stack memory associated with 

local variable

parameter

compound literal

 _B_ 

returned

passed to musttail function

### [\-Wreturn-std-move](#id883)[¶](#wreturn-std-move "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wreturn-type](#id884)[¶](#wreturn-type "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wreturn-mismatch](#wreturn-mismatch), [\-Wreturn-type-c-linkage](#wreturn-type-c-linkage).

**Diagnostic text:**

warning: non-void 

function

block

lambda

coroutine

 does not return a value

 in all control paths

### [\-Wreturn-type-c-linkage](#id885)[¶](#wreturn-type-c-linkage "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ has C-linkage specified, but returns user-defined type _B_ which is incompatible with C

warning: _A_ has C-linkage specified, but returns incomplete type _B_ which could be incompatible with C

### [\-Wrewrite-not-bool](#id886)[¶](#wrewrite-not-bool "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C++20 requires return type of selected ‘operator==’ function for rewritten ‘_B_’ comparison to be ‘bool’, not _A_

### [\-Rround-trip-cc1-args](#id887)[¶](#rround-trip-cc1-args "Link to this heading")

**Diagnostic text:**

 generated arguments #_A_ in round-trip: _B_

### [\-Wrtti](#id888)[¶](#wrtti "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dynamic\_cast will not work since RTTI data is disabled by 

\-fno-rtti-data

/GR-

warning: typeid will not work since RTTI data is disabled by 

\-fno-rtti-data

/GR-

### [\-Rsanitize-address](#id889)[¶](#rsanitize-address "Link to this heading")

**Diagnostic text:**

 \-fsanitize-address-field-padding applied to _A_

 \-fsanitize-address-field-padding ignored for _A_ because it 

is not C++

is packed

is a union

is trivially copyable

has trivial destructor

is standard layout

is in a ignorelisted file

is ignorelisted

### [\-Wsarif-format-unstable](#id890)[¶](#wsarif-format-unstable "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: diagnostic formatting in SARIF mode is currently unstable

### [\-Rsearch-path-usage](#id891)[¶](#rsearch-path-usage "Link to this heading")

**Diagnostic text:**

 search path used: ‘_A_’

### [\-Wsection](#id892)[¶](#wsection "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: section attribute is specified on redeclared variable

warning: duplicate code segment specifiers

warning: 

codeseg

section

 does not match previous declaration

### [\-Wselector](#id893)[¶](#wselector "Link to this heading")

Also controls [\-Wselector-type-mismatch](#wselector-type-mismatch).

**Diagnostic text:**

warning: no method with selector _A_ is implemented in this translation unit

### [\-Wselector-type-mismatch](#id894)[¶](#wselector-type-mismatch "Link to this heading")

**Diagnostic text:**

warning: several methods with selector _A_ of mismatched types are found for the @selector expression

### [\-Wself-assign](#id895)[¶](#wself-assign "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wself-assign-field](#wself-assign-field), [\-Wself-assign-overloaded](#wself-assign-overloaded).

**Diagnostic text:**

warning: explicitly assigning value of variable of type _A_ to itself

; did you mean to assign to member _C_?

### [\-Wself-assign-field](#id896)[¶](#wself-assign-field "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: assigning 

field

instance variable

 to itself

### [\-Wself-assign-overloaded](#id897)[¶](#wself-assign-overloaded "Link to this heading")

**Diagnostic text:**

warning: explicitly assigning value of variable of type _A_ to itself

; did you mean to assign to member _C_?

### [\-Wself-move](#id898)[¶](#wself-move "Link to this heading")

**Diagnostic text:**

warning: explicitly moving variable of type _A_ to itself

; did you mean to move to member _C_?

### [\-Wsemicolon-before-method-body](#id899)[¶](#wsemicolon-before-method-body "Link to this heading")

**Diagnostic text:**

warning: semicolon before method body is ignored

### [\-Wsentinel](#id900)[¶](#wsentinel "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: missing sentinel in 

function call

method dispatch

block call

warning: not enough variable arguments in _A_ declaration to fit a sentinel

### [\-Wsequence-point](#id901)[¶](#wsequence-point "Link to this heading")

Synonym for [\-Wunsequenced](#wunsequenced).

### [\-Wserialized-diagnostics](#id902)[¶](#wserialized-diagnostics "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unable to open file _A_ for serializing diagnostics (_B_)

warning: received warning after diagnostic serialization teardown was underway: _A_

warning: unable to merge a subprocess’s serialized diagnostics

### [\-Wshadow](#id903)[¶](#wshadow "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wshadow-field-in-constructor-modified](#wshadow-field-in-constructor-modified), [\-Wshadow-ivar](#wshadow-ivar).

**Diagnostic text:**

warning: declaration shadows a 

local variable

variable in _C_

static data member of _C_

field of _C_

typedef in _C_

type alias in _C_

structured binding

### [\-Wshadow-all](#id904)[¶](#wshadow-all "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wshadow](#wshadow), [\-Wshadow-field](#wshadow-field), [\-Wshadow-field-in-constructor](#wshadow-field-in-constructor), [\-Wshadow-uncaptured-local](#wshadow-uncaptured-local).

### [\-Wshadow-field](#id905)[¶](#wshadow-field "Link to this heading")

**Diagnostic text:**

warning: 

parameter

non-static data member

 _A_ 

of _B_ 

shadows member inherited from type _C_

### [\-Wshadow-field-in-constructor](#id906)[¶](#wshadow-field-in-constructor "Link to this heading")

Also controls [\-Wshadow-field-in-constructor-modified](#wshadow-field-in-constructor-modified).

**Diagnostic text:**

warning: constructor parameter _A_ shadows the field _B_ of _C_

### [\-Wshadow-field-in-constructor-modified](#id907)[¶](#wshadow-field-in-constructor-modified "Link to this heading")

**Diagnostic text:**

warning: modifying constructor parameter _A_ that shadows a field of _B_

### [\-Wshadow-ivar](#id908)[¶](#wshadow-ivar "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: local declaration of _A_ hides instance variable

### [\-Wshadow-uncaptured-local](#id909)[¶](#wshadow-uncaptured-local "Link to this heading")

**Diagnostic text:**

warning: declaration shadows a 

local variable

variable in _C_

static data member of _C_

field of _C_

typedef in _C_

type alias in _C_

structured binding

### [\-Wshift-bool](#id910)[¶](#wshift-bool "Link to this heading")

**Diagnostic text:**

warning: right shifting a ‘bool’ implicitly converts it to ‘int’

### [\-Wshift-count-negative](#id911)[¶](#wshift-count-negative "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: shift count is negative

### [\-Wshift-count-overflow](#id912)[¶](#wshift-count-overflow "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: shift count >= width of type

### [\-Wshift-negative-value](#id913)[¶](#wshift-negative-value "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: shifting a negative signed value is undefined

### [\-Wshift-op-parentheses](#id914)[¶](#wshift-op-parentheses "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: operator ‘_A_’ has lower precedence than ‘_B_’; ‘_B_’ will be evaluated first

### [\-Wshift-overflow](#id915)[¶](#wshift-overflow "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: signed shift result (_A_) requires _B_ bits to represent, but _C_ only has _D_ bits

### [\-Wshift-sign-overflow](#id916)[¶](#wshift-sign-overflow "Link to this heading")

**Diagnostic text:**

warning: signed shift result (_A_) sets the sign bit of the shift expression’s type (_B_) and becomes negative

### [\-Wshorten-64-to-32](#id917)[¶](#wshorten-64-to-32 "Link to this heading")

**Diagnostic text:**

warning: implicit conversion loses integer precision: _A_ to _B_

### [\-Wsign-compare](#id918)[¶](#wsign-compare "Link to this heading")

**Diagnostic text:**

warning: comparison of integers of different signs: _A_ and _B_

### [\-Wsign-conversion](#id919)[¶](#wsign-conversion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion changes signedness: _A_ to _B_

warning: operand of ? changes signedness: _A_ to _B_

warning: the resulting value is always non-negative after implicit conversion

### [\-Wsign-promo](#id920)[¶](#wsign-promo "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wsigned-enum-bitfield](#id921)[¶](#wsigned-enum-bitfield "Link to this heading")

**Diagnostic text:**

warning: enums in the Microsoft ABI are signed integers by default; consider giving the enum _A_ an unsigned underlying type to make this code portable

### [\-Wsigned-unsigned-wchar](#id922)[¶](#wsigned-unsigned-wchar "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-signed-unsigned-wchar` can be used to disable the error.

**Diagnostic text:**

error: ‘_A_’ cannot be signed or unsigned

### [\-Wsingle-bit-bitfield-constant-conversion](#id923)[¶](#wsingle-bit-bitfield-constant-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit truncation from _C_ to a one-bit wide bit-field changes value from _A_ to _B_

### [\-Wsizeof-array-argument](#id924)[¶](#wsizeof-array-argument "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: sizeof on array function parameter will return size of _A_ instead of _B_

### [\-Wsizeof-array-decay](#id925)[¶](#wsizeof-array-decay "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: sizeof on pointer operation will return size of _A_ instead of _B_

### [\-Wsizeof-array-div](#id926)[¶](#wsizeof-array-div "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: expression does not compute the number of elements in this array; element type is _A_, not _B_

### [\-Wsizeof-pointer-div](#id927)[¶](#wsizeof-pointer-div "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ will return the size of the pointer, not the array itself

### [\-Wsizeof-pointer-memaccess](#id928)[¶](#wsizeof-pointer-memaccess "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’ call operates on objects of type _B_ while the size is based on a different type _C_

warning: argument to ‘sizeof’ in _A_ call is the same pointer type _B_ as the 

destination

source

; expected _D_ or an explicit length

### [\-Wslash-u-filename](#id929)[¶](#wslash-u-filename "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘/U_A_’ treated as the ‘/U’ option

### [\-Wslh-asm-goto](#id930)[¶](#wslh-asm-goto "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: speculative load hardening does not protect functions with asm goto

### [\-Rsloc-usage](#id931)[¶](#rsloc-usage "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

 source manager location address space usage:

### [\-Wsometimes-uninitialized](#id932)[¶](#wsometimes-uninitialized "Link to this heading")

**Diagnostic text:**

warning: variable _A_ is 

used

captured

 uninitialized whenever 

‘_D_’ condition is 

true

false

‘_D_’ loop 

is entered

exits because its condition is false

‘_D_’ loop 

condition is true

exits because its condition is false

switch _D_ is taken

its declaration is reached

_D_ is called

### [\-Wsource-mgr](#id933)[¶](#wsource-mgr "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Wsource-uses-openacc](#id934)[¶](#wsource-uses-openacc "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: OpenACC construct ‘routine’ with implicit function not yet implemented, pragma ignored

warning: OpenACC directives will result in no runtime behavior; use -fclangir to enable runtime effect

warning: unexpected ‘#pragma acc …’ in program

### [\-Wsource-uses-openmp](#id935)[¶](#wsource-uses-openmp "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: ‘#pragma omp declare variant’ cannot be applied to the function that was defined already; the original function might be used

warning: ‘#pragma omp declare variant’ cannot be applied for function after first usage; the original function might be used

warning: variant function in ‘#pragma omp declare variant’ is itself marked as ‘#pragma omp declare variant’

warning: score expressions in the OpenMP context selector need to be constant; _A_ is not and will be ignored

warning: OpenMP only allows an ordered construct with the simd clause nested in a simd construct

warning: expected ‘#pragma omp end declare target’ at end of file to match ‘#pragma omp _A_’

warning: unexpected ‘#pragma omp …’ in program

warning: isa trait ‘_A_’ is not known to the current target; verify the spelling or consider restricting the context selector with the ‘arch’ selector further

### [\-Wspir-compat](#id936)[¶](#wspir-compat "Link to this heading")

**Diagnostic text:**

warning: sampler initializer has invalid _A_ bits

### [\-Wspirv-compat](#id937)[¶](#wspirv-compat "Link to this heading")

Synonym for [\-Wspir-compat](#wspir-compat).

### [\-Wstack-exhausted](#id938)[¶](#wstack-exhausted "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: stack nearly exhausted; compilation time may suffer, and crashes due to stack overflow are likely

### [\-Wstack-protector](#id939)[¶](#wstack-protector "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unable to protect inline asm that clobbers stack pointer against stack clash

### [\-Wstatic-float-init](#id940)[¶](#wstatic-float-init "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wgnu-static-float-init](#wgnu-static-float-init).

**Diagnostic text:**

error: in-class initializer for static data member of type _A_ requires ‘constexpr’ specifier

### [\-Wstatic-in-inline](#id941)[¶](#wstatic-in-inline "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: static 

function

variable

 _B_ is used in an inline function with external linkage

warning: static 

function

variable

 _B_ is used in an inline function with external linkage

### [\-Wstatic-inline-explicit-instantiation](#id942)[¶](#wstatic-inline-explicit-instantiation "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring ‘

static

inline

‘ keyword on explicit template instantiation

### [\-Wstatic-local-in-inline](#id943)[¶](#wstatic-local-in-inline "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: non-constant static local variable in inline function may be different in different files

### [\-Wstatic-self-init](#id944)[¶](#wstatic-self-init "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: static variable _A_ is suspiciously used within its own initialization

### [\-Wstdlibcxx-not-found](#id945)[¶](#wstdlibcxx-not-found "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: include path for libstdc++ headers not found; pass ‘-stdlib=libc++’ on the command line to use the libc++ standard library instead

### [\-Wstrict-aliasing](#id946)[¶](#wstrict-aliasing "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-aliasing=0](#id947)[¶](#wstrict-aliasing-0 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-aliasing=1](#id948)[¶](#wstrict-aliasing-1 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-aliasing=2](#id949)[¶](#wstrict-aliasing-2 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow](#id950)[¶](#wstrict-overflow "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow=0](#id951)[¶](#wstrict-overflow-0 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow=1](#id952)[¶](#wstrict-overflow-1 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow=2](#id953)[¶](#wstrict-overflow-2 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow=3](#id954)[¶](#wstrict-overflow-3 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow=4](#id955)[¶](#wstrict-overflow-4 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-overflow=5](#id956)[¶](#wstrict-overflow-5 "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wstrict-potentially-direct-selector](#id957)[¶](#wstrict-potentially-direct-selector "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wpotentially-direct-selector](#wpotentially-direct-selector).

**Diagnostic text:**

warning: @selector expression formed with potentially direct selector _A_

### [\-Wstrict-primary-template-shadow](#id958)[¶](#wstrict-primary-template-shadow "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-strict-primary-template-shadow` can be used to disable the error.

**Diagnostic text:**

error: declaration of _A_ shadows template parameter

### [\-Wstrict-prototypes](#id959)[¶](#wstrict-prototypes "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wdeprecated-non-prototype](#wdeprecated-non-prototype).

**Diagnostic text:**

warning: a 

function

block

 declaration without a prototype is deprecated 

in all versions of C

### [\-Wstrict-selector-match](#id960)[¶](#wstrict-selector-match "Link to this heading")

**Diagnostic text:**

warning: multiple methods named _A_ found

### [\-Wstring-compare](#id961)[¶](#wstring-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: result of comparison against 

a string literal

@encode

 is unspecified (use an explicit string comparison function instead)

### [\-Wstring-concatenation](#id962)[¶](#wstring-concatenation "Link to this heading")

**Diagnostic text:**

warning: suspicious concatenation of string literals in an array initialization; did you mean to separate the elements with a comma?

### [\-Wstring-conversion](#id963)[¶](#wstring-conversion "Link to this heading")

**Diagnostic text:**

warning: implicit conversion turns string literal into bool: _A_ to _B_

### [\-Wstring-plus-char](#id964)[¶](#wstring-plus-char "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: adding _A_ to a string pointer does not append to the string

### [\-Wstring-plus-int](#id965)[¶](#wstring-plus-int "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: adding _A_ to a string does not append to the string

### [\-Wstrlcpy-strlcat-size](#id966)[¶](#wstrlcpy-strlcat-size "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: size argument in _A_ call appears to be size of the source; expected the size of the destination

### [\-Wstrncat-size](#id967)[¶](#wstrncat-size "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: the value of the size argument in ‘strncat’ is too large, might lead to a buffer overflow

warning: size argument in ‘strncat’ call appears to be size of the source

warning: the value of the size argument to ‘strncat’ is wrong

### [\-Wsuggest-destructor-override](#id968)[¶](#wsuggest-destructor-override "Link to this heading")

**Diagnostic text:**

warning: _A_ overrides a destructor but is not marked ‘override’

### [\-Wsuggest-override](#id969)[¶](#wsuggest-override "Link to this heading")

**Diagnostic text:**

warning: _A_ overrides a member function but is not marked ‘override’

### [\-Wsuper-class-method-mismatch](#id970)[¶](#wsuper-class-method-mismatch "Link to this heading")

**Diagnostic text:**

warning: method parameter type 

_A_ does not match super class method parameter type _B_

does not match super class method parameter type

### [\-Wsuspicious-bzero](#id971)[¶](#wsuspicious-bzero "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘size’ argument to bzero is ‘0’

### [\-Wsuspicious-memaccess](#id972)[¶](#wsuspicious-memaccess "Link to this heading")

This diagnostic is enabled by default.

Controls [\-Wdynamic-class-memaccess](#wdynamic-class-memaccess), [\-Wmemset-transposed-args](#wmemset-transposed-args), [\-Wnontrivial-memaccess](#wnontrivial-memaccess), [\-Wsizeof-pointer-memaccess](#wsizeof-pointer-memaccess), [\-Wsuspicious-bzero](#wsuspicious-bzero).

### [\-Wswift-name-attribute](#id973)[¶](#wswift-name-attribute "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ attribute cannot be applied to this declaration

warning: _A_ attribute cannot be applied to a 

function

method

 with no parameters

warning: _A_ attribute argument must be a string literal specifying a Swift function name

warning: _A_ attribute for getter must not have any parameters besides ‘self:’

warning: _A_ attribute has invalid identifier for the 

base

context

parameter

 name

warning: _A_ attribute is missing parameter label clause

warning: _A_ attribute cannot specify more than one ‘self:’ parameter

warning: too 

few

many

 parameters in the signature specified by the _B_ attribute (expected _C_; got _D_)

warning: _A_ attribute for setter must have one parameter for new value

warning: _A_ attribute for ‘subscript’ getter cannot have a ‘newValue:’ parameter

warning: _A_ attribute for ‘subscript’ must 

be a getter or setter

have at least one parameter

have a ‘self:’ parameter

warning: _A_ attribute for ‘subscript’ setter cannot have multiple ‘newValue:’ parameters

warning: _A_ attribute for ‘subscript’ setter must have a ‘newValue:’ parameter

### [\-Wswitch](#id974)[¶](#wswitch "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overflow converting case value to switch condition type (_A_ to _B_)

warning: 

enumeration value _B_ not handled in switch

enumeration values _B_ and _C_ not handled in switch

enumeration values _B_, _C_, and _D_ not handled in switch

_A_ enumeration values not handled in switch: _B_, _C_, _D_…

warning: case value not in enumerated type _A_

### [\-Wswitch-bool](#id975)[¶](#wswitch-bool "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: switch condition has boolean value

### [\-Wswitch-default](#id976)[¶](#wswitch-default "Link to this heading")

**Diagnostic text:**

warning: ‘switch’ missing ‘default’ label

### [\-Wswitch-enum](#id977)[¶](#wswitch-enum "Link to this heading")

**Diagnostic text:**

warning: 

enumeration value _B_ not explicitly handled in switch

enumeration values _B_ and _C_ not explicitly handled in switch

enumeration values _B_, _C_, and _D_ not explicitly handled in switch

_A_ enumeration values not explicitly handled in switch: _B_, _C_, _D_…

### [\-Wsync-alignment](#id978)[¶](#wsync-alignment "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: \_\_sync builtin operation must have natural alignment (consider using \_\_atomic)

### [\-Wsync-fetch-and-nand-semantics-changed](#id979)[¶](#wsync-fetch-and-nand-semantics-changed "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: the semantics of this intrinsic changed with GCC version 4.4 - the newer semantics are provided here

### [\-Wsynth](#id980)[¶](#wsynth "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wtarget-clones-mixed-specifiers](#id981)[¶](#wtarget-clones-mixed-specifiers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: mixing ‘target\_clones’ specifier mechanisms is permitted for GCC compatibility; use a comma separated sequence of string literals, or a string literal containing a comma-separated list of versions

### [\-Wtautological-bitwise-compare](#id982)[¶](#wtautological-bitwise-compare "Link to this heading")

**Diagnostic text:**

warning: bitwise comparison always evaluates to 

false

true

warning: bitwise or with non-zero value always evaluates to true

### [\-Wtautological-compare](#id983)[¶](#wtautological-compare "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wtautological-bitwise-compare](#wtautological-bitwise-compare), [\-Wtautological-constant-compare](#wtautological-constant-compare), [\-Wtautological-negation-compare](#wtautological-negation-compare), [\-Wtautological-objc-bool-compare](#wtautological-objc-bool-compare), [\-Wtautological-overlap-compare](#wtautological-overlap-compare), [\-Wtautological-pointer-compare](#wtautological-pointer-compare), [\-Wtautological-undefined-compare](#wtautological-undefined-compare).

**Diagnostic text:**

warning: 

aligning a value

the result of checking whether a value is aligned

 to 1 byte is 

a no-op

always true

warning: 

self-

array 

pointer 

comparison always evaluates to 

a constant

true

false

‘std::strong\_ordering::equal’

### [\-Wtautological-constant-compare](#id984)[¶](#wtautological-constant-compare "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wtautological-constant-out-of-range-compare](#wtautological-constant-out-of-range-compare).

**Diagnostic text:**

warning: converting the result of ‘?:’ with integer constants to a boolean always evaluates to ‘true’

warning: converting the result of ‘<<’ to a boolean always evaluates to 

false

true

warning: result of comparison of 

constant _A_

true

false

 with 

expression of type _C_

boolean expression

 is always _E_

### [\-Wtautological-constant-in-range-compare](#id985)[¶](#wtautological-constant-in-range-compare "Link to this heading")

Controls [\-Wtautological-value-range-compare](#wtautological-value-range-compare), [\-Wtype-limits](#wtype-limits).

### [\-Wtautological-constant-out-of-range-compare](#id986)[¶](#wtautological-constant-out-of-range-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: result of comparison of 

constant _A_

true

false

 with 

expression of type _C_

boolean expression

 is always _E_

### [\-Wtautological-negation-compare](#id987)[¶](#wtautological-negation-compare "Link to this heading")

**Diagnostic text:**

warning: ‘&&’ of a value and its negation always evaluates to false

warning: ‘||’ of a value and its negation always evaluates to true

### [\-Wtautological-objc-bool-compare](#id988)[¶](#wtautological-objc-bool-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: result of comparison of constant _A_ with expression of type ‘BOOL’ is always _B_, as the only well defined values for ‘BOOL’ are YES and NO

### [\-Wtautological-overlap-compare](#id989)[¶](#wtautological-overlap-compare "Link to this heading")

**Diagnostic text:**

warning: 

non-

overlapping comparisons always evaluate to 

false

true

### [\-Wtautological-pointer-compare](#id990)[¶](#wtautological-pointer-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: comparison of nonnull 

function call

parameter

 ‘_B_’ 

not 

equal to a null pointer is ‘

true

false

‘ on first encounter

warning: comparison of 

address of

function

array

 ‘_B_’ 

not 

equal to a null pointer is always 

true

false

### [\-Wtautological-type-limit-compare](#id991)[¶](#wtautological-type-limit-compare "Link to this heading")

**Diagnostic text:**

warning: result of comparison 

_D_

_B_

 _C_ 

_B_

_D_

 is always _E_

### [\-Wtautological-undefined-compare](#id992)[¶](#wtautological-undefined-compare "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: reference cannot be bound to dereferenced null pointer in well-defined C++ code; comparison may be assumed to always evaluate to 

true

false

warning: ‘this’ pointer cannot be null in well-defined C++ code; comparison may be assumed to always evaluate to 

true

false

### [\-Wtautological-unsigned-char-zero-compare](#id993)[¶](#wtautological-unsigned-char-zero-compare "Link to this heading")

**Diagnostic text:**

warning: result of comparison of 

_D_

char expression

 _C_ 

char expression

_D_

 is always _E_, since char is interpreted as unsigned

### [\-Wtautological-unsigned-enum-zero-compare](#id994)[¶](#wtautological-unsigned-enum-zero-compare "Link to this heading")

**Diagnostic text:**

warning: result of comparison of 

_D_

unsigned enum expression

 _C_ 

unsigned enum expression

_D_

 is always _E_

### [\-Wtautological-unsigned-zero-compare](#id995)[¶](#wtautological-unsigned-zero-compare "Link to this heading")

**Diagnostic text:**

warning: result of comparison of 

_D_

unsigned expression

 _C_ 

unsigned expression

_D_

 is always _E_

### [\-Wtautological-value-range-compare](#id996)[¶](#wtautological-value-range-compare "Link to this heading")

**Diagnostic text:**

warning: result of comparison of 

_E_

_B_\-bit 

signed

unsigned

 value

 _D_ 

_B_\-bit 

signed

unsigned

 value

_E_

 is always _F_

### [\-Wtcb-enforcement](#id997)[¶](#wtcb-enforcement "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: calling _A_ is a violation of trusted computing base ‘_B_’

### [\-Wtemplate-in-declaration-name](#id998)[¶](#wtemplate-in-declaration-name "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘template’ cannot be used after a declarative nested name specifier

### [\-Wtentative-definition-array](#id999)[¶](#wtentative-definition-array "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: tentative array definition assumed to have one element

### [\-Wtentative-definition-compat](#id1000)[¶](#wtentative-definition-compat "Link to this heading")

**Diagnostic text:**

warning: duplicate declaration of _A_ is invalid in C++

### [\-Wtentative-definition-incomplete-type](#id1001)[¶](#wtentative-definition-incomplete-type "Link to this heading")

**Diagnostic text:**

warning: tentative definition of variable with internal linkage has incomplete 

non-array

array

 type _B_

### [\-Wthread-safety](#id1002)[¶](#wthread-safety "Link to this heading")

Controls [\-Wthread-safety-analysis](#wthread-safety-analysis), [\-Wthread-safety-attributes](#wthread-safety-attributes), [\-Wthread-safety-precise](#wthread-safety-precise), [\-Wthread-safety-reference](#wthread-safety-reference).

### [\-Wthread-safety-analysis](#id1003)[¶](#wthread-safety-analysis "Link to this heading")

**Diagnostic text:**

warning: _A_ ‘_B_’ must be acquired before ‘_C_’

warning: cycle in acquired\_before/after dependencies, starting with ‘_A_’

warning: cannot resolve lock expression

warning: acquiring _A_ ‘_B_’ that is already held

warning: did not expect _A_ ‘_C_’ to be managed by ‘_B_’

warning: _A_ ‘_C_’ not managed by ‘_B_’

warning: expecting _A_ ‘_B_’ to be held at start of each loop

 with equal reentrancy depth

warning: expecting _A_ ‘_B_’ to be held at the end of function

warning: cannot call function ‘_B_’ while _A_ ‘_C_’ is held

warning: calling function _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: calling function _A_ requires negative capability ‘_B_’

warning: _A_ ‘_B_’ is acquired exclusively and shared in the same scope

warning: _A_ ‘_B_’ is not held on every path through here

 with equal reentrancy depth

warning: _A_ ‘_B_’ is still held at the end of function

warning: releasing _A_ ‘_B_’ that was not held

warning: releasing _A_ ‘_B_’ using 

shared

exclusive

 access, expected 

shared

exclusive

 access

warning: _A_ managed by ‘_B_’ is ‘_D_’ instead of ‘_C_’

warning: 

reading

writing

 the value pointed to by _A_ requires holding 

any mutex

any mutex exclusively

warning: 

reading

writing

 the value pointed to by _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: 

reading

writing

 variable _A_ requires holding 

any mutex

any mutex exclusively

warning: 

reading

writing

 variable _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

### [\-Wthread-safety-attributes](#id1004)[¶](#wthread-safety-attributes "Link to this heading")

**Diagnostic text:**

warning: _A_ attribute requires arguments whose type is annotated with ‘capability’ attribute; type here is _B_

warning: _A_ attribute can only be applied in a context annotated with ‘capability’ attribute

warning: _A_ only applies to pointer types; type here is _B_

warning: ignoring _A_ attribute because its argument is invalid

warning: _A_ attribute without capability arguments refers to ‘this’, but _B_ isn’t annotated with ‘capability’ or ‘scoped\_lockable’ attribute

warning: _A_ attribute without capability arguments can only be applied to non-static methods of a class

warning: _A_ attribute applies to function parameters only if their type is a reference to a ‘scoped\_lockable’-annotated type

warning: _A_ attribute on _B_ must be preceded by _C_ attribute

### [\-Wthread-safety-beta](#id1005)[¶](#wthread-safety-beta "Link to this heading")

**Diagnostic text:**

warning: thread safety beta warning

### [\-Wthread-safety-negative](#id1006)[¶](#wthread-safety-negative "Link to this heading")

**Diagnostic text:**

warning: acquiring _A_ ‘_B_’ requires negative capability ‘_C_’

### [\-Wthread-safety-pointer](#id1007)[¶](#wthread-safety-pointer "Link to this heading")

**Diagnostic text:**

warning: passing pointer to variable _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: returning pointer to variable _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: passing pointer _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: returning pointer _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

### [\-Wthread-safety-precise](#id1008)[¶](#wthread-safety-precise "Link to this heading")

**Diagnostic text:**

warning: calling function _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: 

reading

writing

 the value pointed to by _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: 

reading

writing

 variable _B_ requires holding _A_ 

‘_C_’

‘_C_’ exclusively

### [\-Wthread-safety-reference](#id1009)[¶](#wthread-safety-reference "Link to this heading")

Also controls [\-Wthread-safety-reference-return](#wthread-safety-reference-return).

**Diagnostic text:**

warning: passing variable _B_ by reference requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: passing the value that _B_ points to by reference requires holding _A_ 

‘_C_’

‘_C_’ exclusively

### [\-Wthread-safety-reference-return](#id1010)[¶](#wthread-safety-reference-return "Link to this heading")

**Diagnostic text:**

warning: returning variable _B_ by reference requires holding _A_ 

‘_C_’

‘_C_’ exclusively

warning: returning the value that _B_ points to by reference requires holding _A_ 

‘_C_’

‘_C_’ exclusively

### [\-Wthread-safety-verbose](#id1011)[¶](#wthread-safety-verbose "Link to this heading")

**Diagnostic text:**

warning: thread safety verbose warning

### [\-Wtrigraphs](#id1012)[¶](#wtrigraphs "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: trigraph converted to ‘_A_’ character

warning: trigraph ends block comment

warning: trigraph ignored

warning: ignored trigraph would end block comment

### [\-Wtype-limits](#id1013)[¶](#wtype-limits "Link to this heading")

Controls [\-Wtautological-type-limit-compare](#wtautological-type-limit-compare), [\-Wtautological-unsigned-char-zero-compare](#wtautological-unsigned-char-zero-compare), [\-Wtautological-unsigned-enum-zero-compare](#wtautological-unsigned-enum-zero-compare), [\-Wtautological-unsigned-zero-compare](#wtautological-unsigned-zero-compare).

### [\-Wtype-safety](#id1014)[¶](#wtype-safety "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: specified _A_ type tag requires a null pointer

warning: argument type _A_ doesn’t match specified _B_ type tag 

that requires _D_

warning: this type tag was not designed to be used with this function

### [\-Wtypedef-redefinition](#id1015)[¶](#wtypedef-redefinition "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: redefinition of typedef _A_ is a C11 feature

### [\-Wtypename-missing](#id1016)[¶](#wtypename-missing "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: missing ‘typename’ prior to dependent type name _A_

### [\-Wunable-to-open-stats-file](#id1017)[¶](#wunable-to-open-stats-file "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unable to open statistics output file ‘_A_’: ‘_B_’

### [\-Wunaligned-access](#id1018)[¶](#wunaligned-access "Link to this heading")

**Diagnostic text:**

warning: field _B_ within _A_ is less aligned than _C_ and is usually due to _A_ being packed, which can lead to unaligned accesses

### [\-Wunaligned-qualifier-implicit-cast](#id1019)[¶](#wunaligned-qualifier-implicit-cast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: implicit cast from type _A_ to type _B_ drops \_\_unaligned qualifier

### [\-Wunavailable-declarations](#id1020)[¶](#wunavailable-declarations "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ may be unavailable because the receiver type is unknown

### [\-Wundeclared-selector](#id1021)[¶](#wundeclared-selector "Link to this heading")

**Diagnostic text:**

warning: undeclared selector _A_

warning: undeclared selector _A_; did you mean _B_?

### [\-Wundef](#id1022)[¶](#wundef "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wundef-true](#wundef-true).

**Diagnostic text:**

warning: _A_ is not defined, evaluates to 0

### [\-Wundef-prefix](#id1023)[¶](#wundef-prefix "Link to this heading")

**Diagnostic text:**

warning: _A_ is not defined, evaluates to 0

### [\-Wundef-true](#id1024)[¶](#wundef-true "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘true’ is not defined, evaluates to 0

### [\-Wundefined-arm-za](#id1025)[¶](#wundefined-arm-za "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: builtin call is not valid when calling from a function without active ZA state

### [\-Wundefined-arm-zt0](#id1026)[¶](#wundefined-arm-zt0 "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: builtin call is not valid when calling from a function without active ZT0 state

### [\-Wundefined-bool-conversion](#id1027)[¶](#wundefined-bool-conversion "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: reference cannot be bound to dereferenced null pointer in well-defined C++ code; pointer may be assumed to always convert to true

warning: ‘this’ pointer cannot be null in well-defined C++ code; pointer may be assumed to always convert to true

### [\-Wundefined-func-template](#id1028)[¶](#wundefined-func-template "Link to this heading")

**Diagnostic text:**

warning: instantiation of function _A_ required here, but no definition is available

### [\-Wundefined-inline](#id1029)[¶](#wundefined-inline "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: inline function _A_ is not defined

### [\-Wundefined-internal](#id1030)[¶](#wundefined-internal "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

function

variable

 _B_ has internal linkage but is not defined

### [\-Wundefined-internal-type](#id1031)[¶](#wundefined-internal-type "Link to this heading")

**Diagnostic text:**

warning: ISO C++ requires a definition in this translation unit for 

function

variable

 _B_ because its type does not have linkage

### [\-Wundefined-reinterpret-cast](#id1032)[¶](#wundefined-reinterpret-cast "Link to this heading")

**Diagnostic text:**

warning: dereference of type _B_ that was reinterpret\_cast from type _A_ has undefined behavior

warning: reinterpret\_cast from _A_ to _B_ has undefined behavior

### [\-Wundefined-var-template](#id1033)[¶](#wundefined-var-template "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: instantiation of variable _A_ required here, but no definition is available

### [\-Wunderaligned-exception-object](#id1034)[¶](#wunderaligned-exception-object "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: underaligned exception object thrown

### [\-Wunderlying-atomic-qualifier-ignored](#id1035)[¶](#wunderlying-atomic-qualifier-ignored "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-underlying-atomic-qualifier-ignored` can be used to disable the error.

**Diagnostic text:**

error: ‘\_Atomic’ qualifier ignored; operations involving the enumeration type will be non-atomic

### [\-Wunderlying-cv-qualifier-ignored](#id1036)[¶](#wunderlying-cv-qualifier-ignored "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

‘const’ and ‘volatile’ qualifiers

‘const’ qualifier

‘volatile’ qualifier

 in enumeration underlying type ignored

### [\-Wunevaluated-expression](#id1037)[¶](#wunevaluated-expression "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wpotentially-evaluated-expression](#wpotentially-evaluated-expression).

**Diagnostic text:**

warning: expression with side effects has no effect in an unevaluated context

### [\-Wunguarded-availability](#id1038)[¶](#wunguarded-availability "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wunguarded-availability-new](#wunguarded-availability-new).

**Diagnostic text:**

warning: _A_ is only available 

in _E_ environment 

on _B_ _C_ or newer

warning: _A_ is unavailable

### [\-Wunguarded-availability-new](#id1039)[¶](#wunguarded-availability-new "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: _A_ is only available 

in _E_ environment 

on _B_ _C_ or newer

warning: _A_ is unavailable

### [\-Wunicode](#id1040)[¶](#wunicode "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: empty delimited universal character name; treating as ‘\\’ ‘_A_’ ‘{’ ‘}’

warning: incomplete delimited universal character name; treating as ‘\\’ ‘_A_’ ‘{’ identifier

warning: incomplete universal character name; treating as ‘\\’ followed by identifier

warning: \\_A_ used with no following hex digits; treating as ‘\\’ followed by identifier

warning: universal character name refers to a surrogate character

warning: universal character names are only valid in C99 or C++; treating as ‘\\’ followed by identifier

warning: universal character names are only valid in C99 or C++

### [\-Wunicode-homoglyph](#id1041)[¶](#wunicode-homoglyph "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: treating Unicode character <U+_A_\> as an identifier character rather than as ‘_B_’ symbol

### [\-Wunicode-whitespace](#id1042)[¶](#wunicode-whitespace "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: treating Unicode character as whitespace

### [\-Wunicode-zero-width](#id1043)[¶](#wunicode-zero-width "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: identifier contains Unicode character <U+_A_\> that is invisible in some environments

### [\-Wuninitialized](#id1044)[¶](#wuninitialized "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wsometimes-uninitialized](#wsometimes-uninitialized), [\-Wstatic-self-init](#wstatic-self-init), [\-Wuninitialized-const-pointer](#wuninitialized-const-pointer), [\-Wuninitialized-const-reference](#wuninitialized-const-reference).

**Diagnostic text:**

warning: base class _A_ is uninitialized when used here to access _B_

warning: field _A_ is uninitialized when used here

warning: 

struct

interface

union

class

enum

 _B_ does not declare any constructor to initialize its non-modifiable members

warning: reference _A_ is not yet bound to a value when used here

warning: block pointer variable _A_ is 

uninitialized

null

 when captured by block

warning: variable _A_ is uninitialized when used within its own initialization

warning: reference _A_ is not yet bound to a value when used within its own initialization

warning: variable _A_ is uninitialized when 

used here

captured by block

### [\-Wuninitialized-const-pointer](#id1045)[¶](#wuninitialized-const-pointer "Link to this heading")

**Diagnostic text:**

warning: variable _A_ is uninitialized when passed as a const pointer argument here

### [\-Wuninitialized-const-reference](#id1046)[¶](#wuninitialized-const-reference "Link to this heading")

**Diagnostic text:**

warning: variable _A_ is uninitialized when passed as a const reference argument here

### [\-Wuninitialized-explicit-init](#id1047)[¶](#wuninitialized-explicit-init "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: field 

_B_

in _B_

 requires explicit initialization but is not explicitly initialized

### [\-Wunique-object-duplication](#id1048)[¶](#wunique-object-duplication "Link to this heading")

**Diagnostic text:**

warning: initialization of _A_ may run twice when built into a shared library: it has external linkage and 

hidden visibility

no import/export annotation

warning: _A_ may be duplicated when built into a shared library: it is mutable, with external linkage and 

hidden visibility

no import/export annotation

Warns when objects which are supposed to be globally unique might get duplicated when built into a shared library.

This can occur to objects which are hidden from the dynamic linker, due to having hidden visibility (on posix) or lacking a dllimport/dllexport attribute (on windows). If such an object is built into a shared library, each instance of the library will get its own copy. This can cause very subtle bugs if there was only supposed to be one copy of the object in question: singletons aren’t single, changes to one object won’t affect the others, the object’s initializer will run once per copy, etc.

Specifically, this warning fires when it detects an object which:

1.  Is defined as `inline` in a header file (so it might get compiled into multiple libaries), and
    
2.  Has external linkage (otherwise it’s supposed to be duplicated), and
    
3.  Has hidden visibility (posix) or lacks a dllimport/dllexport attribute (windows).
    

As well as one of the following:

1.  The object is mutable, or
    
2.  The object’s initializer definitely has side effects.
    

The warning can be resolved by removing one of the conditions above. In rough order of preference, this may be done by:

1.  Marking the object `const` (if possible)
    
2.  Moving the object’s definition to a source file
    
3.  Making the object visible using `__attribute((visibility("default")))`, `__declspec(dllimport)`, or `__declspec(dllexport)`.
    

When annotating an object with `__declspec(dllimport)` or `__declspec(dllexport)`, take care to ensure that the object is only exported from one dll, and is imported everywhere else.

Note that for (2), all levels of a pointer variable must be constant; `const int*` will trigger the warning because the pointer itself is mutable.

### [\-Wunknown-acc-extension-clause](#id1049)[¶](#wunknown-acc-extension-clause "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unsupported OpenACC extension clause _A_

### [\-Wunknown-argument](#id1050)[¶](#wunknown-argument "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: joined argument treated as ‘_A_’; did you mean ‘_B_’?

warning: unknown argument ignored in clang-cl: ‘_A_’

warning: unknown argument ignored in clang-cl ‘_A_’; did you mean ‘_B_’?

### [\-Wunknown-assumption](#id1051)[¶](#wunknown-assumption "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unknown assumption string ‘_A_’; attribute is potentially ignored

### [\-Wunknown-attributes](#id1052)[¶](#wunknown-attributes "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unknown attribute _A_ ignored

warning: unknown attribute _A_ ignored; did you mean ‘_B_’?

### [\-Wunknown-cuda-version](#id1053)[¶](#wunknown-cuda-version "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: CUDA version_A_ is newer than the latest

 partially

 supported version _C_

warning: CUDA version _A_ is only partially supported

### [\-Wunknown-directives](#id1054)[¶](#wunknown-directives "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: invalid preprocessing directive

, did you mean ‘#_B_’?

### [\-Wunknown-escape-sequence](#id1055)[¶](#wunknown-escape-sequence "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unknown escape sequence ‘\\_A_’

### [\-Wunknown-pragmas](#id1056)[¶](#wunknown-pragmas "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: expected ‘ON’ or ‘OFF’ or ‘DEFAULT’ in pragma

warning: expected end of directive in pragma

warning: unknown pragma in STDC namespace

warning: pragma diagnostic pop could not pop, no matching push

warning: pragma diagnostic expected ‘error’, ‘warning’, ‘ignored’, ‘fatal’, ‘push’, or ‘pop’

warning: pragma diagnostic expected option name (e.g. “-Wundef”)

warning: unexpected token in pragma diagnostic

warning: #pragma execution\_character\_set expected ‘_A_’

warning: #pragma execution\_character\_set invalid value ‘_A_’, only ‘UTF-8’ is supported

warning: #pragma execution\_character\_set expected ‘push’ or ‘pop’

warning: unknown pragma ignored

warning: pragma include\_alias expected ‘_A_’

warning: pragma include\_alias expected include filename

warning: angle-bracketed include <_A_\> cannot be aliased to double-quoted include “_B_”

warning: double-quoted include “_A_” cannot be aliased to angle-bracketed include <_B_\>

warning: #pragma warning expected ‘_A_’

warning: #pragma warning expected a warning number

warning: #pragma warning(push, level) requires a level between 0 and 4

warning: #pragma warning expected ‘push’, ‘pop’, ‘default’, ‘disable’, ‘error’, ‘once’, ‘suppress’, 1, 2, 3, or 4

warning: pragma STDC FENV\_ROUND is not supported

### [\-Wunknown-sanitizers](#id1057)[¶](#wunknown-sanitizers "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unknown sanitizer ‘_A_’ ignored

### [\-Wunknown-warning-option](#id1058)[¶](#wunknown-warning-option "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unknown warning group ‘_A_’, ignored

warning: unknown 

warning

remark

 option ‘_B_’

; did you mean ‘_D_’?

warning: unknown _A_ warning specifier: ‘_B_’

### [\-Wunnamed-type-template-args](#id1059)[¶](#wunnamed-type-template-args "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wc++98-compat-unnamed-type-template-args](#wc-98-compat-unnamed-type-template-args).

**Diagnostic text:**

warning: template argument uses unnamed type

### [\-Wunnecessary-virtual-specifier](#id1060)[¶](#wunnecessary-virtual-specifier "Link to this heading")

**Diagnostic text:**

warning: virtual method _A_ is inside a ‘final’ class and can never be overridden

Warns when a `final` class contains a virtual method (including virtual destructors) that does not override anything. Since `final` classes cannot be subclassed, their methods cannot be overridden, so there is no point to introducing new `virtual` methods.

The warning also detects virtual methods in classes whose destructor is `final`, for the same reason.

### [\-Wunneeded-internal-declaration](#id1061)[¶](#wunneeded-internal-declaration "Link to this heading")

**Diagnostic text:**

warning: 

function

variable

 _B_ is not needed and will not be emitted

warning: ‘static’ function _A_ declared in header file should be declared ‘static inline’

### [\-Wunneeded-member-function](#id1062)[¶](#wunneeded-member-function "Link to this heading")

**Diagnostic text:**

warning: member function _A_ is not needed and will not be emitted

### [\-Wunqualified-std-cast-call](#id1063)[¶](#wunqualified-std-cast-call "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: unqualified call to ‘_A_’

### [\-Wunreachable-code](#id1064)[¶](#wunreachable-code "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wunreachable-code-fallthrough](#wunreachable-code-fallthrough), [\-Wunreachable-code-generic-assoc](#wunreachable-code-generic-assoc), [\-Wunreachable-code-loop-increment](#wunreachable-code-loop-increment).

**Diagnostic text:**

warning: code will never be executed

### [\-Wunreachable-code-aggressive](#id1065)[¶](#wunreachable-code-aggressive "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wunreachable-code](#wunreachable-code), [\-Wunreachable-code-break](#wunreachable-code-break), [\-Wunreachable-code-return](#wunreachable-code-return).

### [\-Wunreachable-code-break](#id1066)[¶](#wunreachable-code-break "Link to this heading")

**Diagnostic text:**

warning: ‘break’ will never be executed

### [\-Wunreachable-code-fallthrough](#id1067)[¶](#wunreachable-code-fallthrough "Link to this heading")

**Diagnostic text:**

warning: fallthrough annotation in unreachable code

### [\-Wunreachable-code-generic-assoc](#id1068)[¶](#wunreachable-code-generic-assoc "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: due to lvalue conversion of the controlling expression, association of type _A_ will never be selected because it is 

of array type

qualified

### [\-Wunreachable-code-loop-increment](#id1069)[¶](#wunreachable-code-loop-increment "Link to this heading")

**Diagnostic text:**

warning: loop will run at most once (loop increment never executed)

### [\-Wunreachable-code-return](#id1070)[¶](#wunreachable-code-return "Link to this heading")

**Diagnostic text:**

warning: ‘return’ will never be executed

### [\-Wunsafe-buffer-usage](#id1071)[¶](#wunsafe-buffer-usage "Link to this heading")

Also controls [\-Wunsafe-buffer-usage-in-container](#wunsafe-buffer-usage-in-container), [\-Wunsafe-buffer-usage-in-libc-call](#wunsafe-buffer-usage-in-libc-call).

**Diagnostic text:**

warning: 

unsafe pointer operation

unsafe pointer arithmetic

unsafe buffer access

function introduces unsafe buffer manipulation

unsafe invocation of _B_

field _B_ prone to unsafe buffer manipulation

warning: _A_ is an 

unsafe pointer used for buffer access

unsafe buffer that does not perform bounds checks

### [\-Wunsafe-buffer-usage-in-container](#id1072)[¶](#wunsafe-buffer-usage-in-container "Link to this heading")

**Diagnostic text:**

warning: the two-parameter std::span construction is unsafe as it can introduce mismatch between buffer size and the bound information

### [\-Wunsafe-buffer-usage-in-libc-call](#id1073)[¶](#wunsafe-buffer-usage-in-libc-call "Link to this heading")

**Diagnostic text:**

warning: function _A_ is unsafe

### [\-Wunsequenced](#id1074)[¶](#wunsequenced "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: multiple unsequenced modifications to _A_

warning: unsequenced modification and access to _A_

### [\-Wunsupported-abi](#id1075)[¶](#wunsupported-abi "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ‘_A_’: selected processor lacks floating point registers

warning: float ABI ‘_A_’ is not supported by current library

### [\-Wunsupported-abs](#id1076)[¶](#wunsupported-abs "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring ‘-mabs=2008’ option because the ‘_A_’ architecture does not support it

warning: ignoring ‘-mabs=legacy’ option because the ‘_A_’ architecture does not support it

### [\-Wunsupported-availability-guard](#id1077)[¶](#wunsupported-availability-guard "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

@available

\_\_builtin\_available

 does not guard availability here; use if (

@available

\_\_builtin\_available

) instead

### [\-Wunsupported-cb](#id1078)[¶](#wunsupported-cb "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring ‘-mcompact-branches=’ option because the ‘_A_’ architecture does not support it

### [\-Wunsupported-dll-base-class-template](#id1079)[¶](#wunsupported-dll-base-class-template "Link to this heading")

**Diagnostic text:**

warning: propagating dll attribute to 

already instantiated

explicitly specialized

 base class template without dll attribute is not supported

### [\-Wunsupported-floating-point-opt](#id1080)[¶](#wunsupported-floating-point-opt "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: overriding currently unsupported use of floating point exceptions on this target

warning: overriding currently unsupported rounding mode on this target

### [\-Wunsupported-friend](#id1081)[¶](#wunsupported-friend "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dependent nested name specifier _A_ for friend template declaration is not supported; ignoring this friend declaration

warning: dependent nested name specifier _A_ for friend class declaration is not supported; turning off access control for _B_

### [\-Wunsupported-gpopt](#id1082)[¶](#wunsupported-gpopt "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring ‘-mgpopt’ option as it cannot be used with 

the implicit usage of 

\-mabicalls

### [\-Wunsupported-nan](#id1083)[¶](#wunsupported-nan "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring ‘-mnan=2008’ option because the ‘_A_’ architecture does not support it

warning: ignoring ‘-mnan=legacy’ option because the ‘_A_’ architecture does not support it

### [\-Wunsupported-target-opt](#id1084)[¶](#wunsupported-target-opt "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: debug information option ‘_A_’ is not supported; requires DWARF-_C_ but target ‘_B_’ only provides DWARF-_D_

warning: debug information option ‘_A_’ is not supported for target ‘_B_’

### [\-Wunsupported-visibility](#id1085)[¶](#wunsupported-visibility "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: target does not support ‘protected’ visibility; using ‘default’

### [\-Wunterminated-string-initialization](#id1086)[¶](#wunterminated-string-initialization "Link to this heading")

**Diagnostic text:**

warning: initializer-string for character array is too long, array size is _A_ but initializer has size _B_ (including the null terminating character); did you mean to use the ‘nonstring’ attribute?

### [\-Wunusable-partial-specialization](#id1087)[¶](#wunusable-partial-specialization "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-unusable-partial-specialization` can be used to disable the error.

**Diagnostic text:**

error: 

class

variable

 template partial specialization contains 

a template parameter

template parameters

 that cannot be deduced; this partial specialization will never be used

### [\-Wunused](#id1088)[¶](#wunused "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Controls [\-Wunused-argument](#wunused-argument), [\-Wunused-but-set-variable](#wunused-but-set-variable), [\-Wunused-function](#wunused-function), [\-Wunused-label](#wunused-label), [\-Wunused-lambda-capture](#wunused-lambda-capture), [\-Wunused-local-typedef](#wunused-local-typedef), [\-Wunused-private-field](#wunused-private-field), [\-Wunused-property-ivar](#wunused-property-ivar), [\-Wunused-value](#wunused-value), [\-Wunused-variable](#wunused-variable).

### [\-Wunused-argument](#id1089)[¶](#wunused-argument "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wunused-but-set-parameter](#id1090)[¶](#wunused-but-set-parameter "Link to this heading")

**Diagnostic text:**

warning: parameter _A_ set but not used

### [\-Wunused-but-set-variable](#id1091)[¶](#wunused-but-set-variable "Link to this heading")

**Diagnostic text:**

warning: variable _A_ set but not used

### [\-Wunused-command-line-argument](#id1092)[¶](#wunused-command-line-argument "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: argument ‘_A_’ requires profile-guided optimization information

warning: argument ‘_A_’ requires profile-guided optimization information

warning: joined argument expects additional value: ‘_A_’

warning: ignoring ‘-f

no-

raw-string-literals’, which is only valid for C and C++ standards before C++11

warning: _A_: ‘_B_’ input unused

 when ‘_D_’ is present

warning: _A_: ‘_B_’ input unused in cpp mode

warning: ignoring invalid /arch: argument ‘_A_’; for 

64

32

\-bit expected one of _C_

warning: ‘_A_’ only applies to medium and large code models

warning: _A_: previously preprocessed input

 unused when ‘_C_’ is present

warning: argument unused during compilation: ‘_A_’

warning: ‘-x _A_’ after last input file has no effect

warning: the flag ‘_A_’ has been deprecated and will be ignored

warning: ignoring -fdiscard-value-names for LLVM Bitcode

warning: ignoring -fverify-debuginfo-preserve-export=_A_ because -fverify-debuginfo-preserve wasn’t enabled

### [\-Wunused-comparison](#id1093)[¶](#wunused-comparison "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: 

equality

inequality

relational

three-way

 comparison result unused

### [\-Wunused-const-variable](#id1094)[¶](#wunused-const-variable "Link to this heading")

**Diagnostic text:**

warning: unused variable _A_

### [\-Wunused-exception-parameter](#id1095)[¶](#wunused-exception-parameter "Link to this heading")

**Diagnostic text:**

warning: unused exception parameter _A_

### [\-Wunused-function](#id1096)[¶](#wunused-function "Link to this heading")

Also controls [\-Wunneeded-internal-declaration](#wunneeded-internal-declaration).

**Diagnostic text:**

warning: unused function _A_

### [\-Wunused-getter-return-value](#id1097)[¶](#wunused-getter-return-value "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: property access result unused - getters should not be used for side effects

### [\-Wunused-label](#id1098)[¶](#wunused-label "Link to this heading")

**Diagnostic text:**

warning: unused label _A_

### [\-Wunused-lambda-capture](#id1099)[¶](#wunused-lambda-capture "Link to this heading")

**Diagnostic text:**

warning: lambda capture _A_ is not 

used

required to be captured for this use

### [\-Wunused-local-typedef](#id1100)[¶](#wunused-local-typedef "Link to this heading")

**Diagnostic text:**

warning: unused 

typedef

type alias

 _B_

### [\-Wunused-local-typedefs](#id1101)[¶](#wunused-local-typedefs "Link to this heading")

Synonym for [\-Wunused-local-typedef](#wunused-local-typedef).

### [\-Wunused-macros](#id1102)[¶](#wunused-macros "Link to this heading")

**Diagnostic text:**

warning: macro is not used

### [\-Wunused-member-function](#id1103)[¶](#wunused-member-function "Link to this heading")

Also controls [\-Wunneeded-member-function](#wunneeded-member-function).

**Diagnostic text:**

warning: unused member function _A_

### [\-Wunused-parameter](#id1104)[¶](#wunused-parameter "Link to this heading")

**Diagnostic text:**

warning: unused parameter _A_

### [\-Wunused-private-field](#id1105)[¶](#wunused-private-field "Link to this heading")

**Diagnostic text:**

warning: private field _A_ is not used

### [\-Wunused-property-ivar](#id1106)[¶](#wunused-property-ivar "Link to this heading")

**Diagnostic text:**

warning: ivar _A_ which backs the property is not referenced in this property’s accessor

### [\-Wunused-result](#id1107)[¶](#wunused-result "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ignoring return value of function declared with _A_ attribute

: _C_

### [\-Wunused-template](#id1108)[¶](#wunused-template "Link to this heading")

Also controls [\-Wunneeded-internal-declaration](#wunneeded-internal-declaration).

**Diagnostic text:**

warning: unused 

function

variable

 template _B_

### [\-Wunused-value](#id1109)[¶](#wunused-value "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wunevaluated-expression](#wunevaluated-expression), [\-Wunused-comparison](#wunused-comparison), [\-Wunused-result](#wunused-result).

**Diagnostic text:**

warning: ignoring return value of function declared with _A_ attribute

warning: left operand of comma operator has no effect

warning: ignoring temporary created by a constructor declared with _A_ attribute

: _C_

warning: container access result unused - container access should not be used for side effects

warning: expression result unused

warning: ignoring 

return value

temporary

 of type _C_ declared with _B_ attribute

: _E_

warning: expression result unused; should this cast be to ‘void’?

### [\-Wunused-variable](#id1110)[¶](#wunused-variable "Link to this heading")

Also controls [\-Wunused-const-variable](#wunused-const-variable).

**Diagnostic text:**

warning: unused variable _A_

### [\-Wunused-volatile-lvalue](#id1111)[¶](#wunused-volatile-lvalue "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: expression result unused; assign into a variable to force a volatile load

### [\-Wused-but-marked-unused](#id1112)[¶](#wused-but-marked-unused "Link to this heading")

**Diagnostic text:**

warning: _A_ was marked unused but was used

### [\-Wuser-defined-literals](#id1113)[¶](#wuser-defined-literals "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: user-defined literal suffixes 

<ERROR>

not starting with ‘\_’

containing ‘\_\_’

 are reserved

; no literal will invoke this operator

### [\-Wuser-defined-warnings](#id1114)[¶](#wuser-defined-warnings "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

The text of this diagnostic is not controlled by Clang.

### [\-Wvarargs](#id1115)[¶](#wvarargs "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: second argument to ‘va\_start’ is not the last non-variadic parameter

warning: second argument to ‘va\_arg’ is of array type _A_; this va\_arg has undefined behavior because arguments will never be compatible with array type

warning: second argument to ‘va\_arg’ is of promotable type _A_; this va\_arg has undefined behavior because arguments will be promoted to _B_

warning: passing 

an object that undergoes default argument promotion

an object of reference type

a parameter declared with the ‘register’ keyword

 to ‘va\_start’ has undefined behavior

### [\-Wvariadic-macro-arguments-omitted](#id1116)[¶](#wvariadic-macro-arguments-omitted "Link to this heading")

**Diagnostic text:**

warning: passing no argument for the ‘…’ parameter of a variadic macro is a C23 extension

warning: passing no argument for the ‘…’ parameter of a variadic macro is a C++20 extension

warning: passing no argument for the ‘…’ parameter of a variadic macro is incompatible with C standards before C23

### [\-Wvariadic-macros](#id1117)[¶](#wvariadic-macros "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: named variadic macros are a GNU extension

warning: \_\_VA\_OPT\_\_ can only appear in the expansion of a variadic macro

warning: variadic macros are a C99 feature

### [\-Wvec-elem-size](#id1118)[¶](#wvec-elem-size "Link to this heading")

This diagnostic is an error by default, but the flag `-Wno-vec-elem-size` can be used to disable the error.

**Diagnostic text:**

error: vector operands do not have the same elements sizes (_A_ and _B_)

### [\-Wvector-conversion](#id1119)[¶](#wvector-conversion "Link to this heading")

**Diagnostic text:**

warning: incompatible vector types 

assigning to _A_ from _B_

assigning to different types

passing _A_ to parameter of type _B_

passing to parameter of different type

returning _A_ from a function with result type _B_

returning from function with different return type

converting _A_ to type _B_

converting between types

initializing _A_ with an expression of type _B_

initializing with expression of different type

sending _A_ to parameter of type _B_

sending to parameter of different type

casting _A_ to type _B_

casting between types

### [\-Wvector-conversions](#id1120)[¶](#wvector-conversions "Link to this heading")

Synonym for [\-Wvector-conversion](#wvector-conversion).

### [\-Wvexing-parse](#id1121)[¶](#wvexing-parse "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: empty parentheses interpreted as a function declaration

warning: parentheses were disambiguated as a function declaration

warning: parentheses were disambiguated as redundant parentheses around declaration of variable named _A_

### [\-Wvisibility](#id1122)[¶](#wvisibility "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: declaration of _A_ will not be visible outside of this function

warning: redefinition of _A_ will not be visible outside of this function

### [\-Wvla](#id1123)[¶](#wvla "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wvla-extension](#wvla-extension).

**Diagnostic text:**

warning: variable length array used

### [\-Wvla-cxx-extension](#id1124)[¶](#wvla-cxx-extension "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wvla-extension-static-assert](#wvla-extension-static-assert).

**Diagnostic text:**

warning: variable length arrays in C++ are a Clang extension

warning: variable length arrays in C++ are a Clang extension

### [\-Wvla-extension](#id1125)[¶](#wvla-extension "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

Also controls [\-Wvla-cxx-extension](#wvla-cxx-extension).

**Diagnostic text:**

warning: variable length arrays are a C99 feature

### [\-Wvla-extension-static-assert](#id1126)[¶](#wvla-extension-static-assert "Link to this heading")

Some of the diagnostics controlled by this flag are enabled by default.

**Diagnostic text:**

warning: variable length arrays in C++ are a Clang extension; did you mean to use ‘static\_assert’?

warning: variable length arrays in C++ are a Clang extension; did you mean to use ‘static\_assert’?

### [\-Wvoid-pointer-to-enum-cast](#id1127)[¶](#wvoid-pointer-to-enum-cast "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: cast to smaller integer type _B_ from _A_

### [\-Wvoid-pointer-to-int-cast](#id1128)[¶](#wvoid-pointer-to-int-cast "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wvoid-pointer-to-enum-cast](#wvoid-pointer-to-enum-cast).

**Diagnostic text:**

warning: cast to smaller integer type _B_ from _A_

### [\-Wvoid-ptr-dereference](#id1129)[¶](#wvoid-ptr-dereference "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: ISO C does not allow indirection on operand of type _A_

### [\-Wvolatile-register-var](#id1130)[¶](#wvolatile-register-var "Link to this heading")

This diagnostic flag exists for GCC compatibility, and has no effect in Clang.

### [\-Wwasm-exception-spec](#id1131)[¶](#wwasm-exception-spec "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: dynamic exception specifications with types are currently ignored in wasm

### [\-Wweak-template-vtables](#id1132)[¶](#wweak-template-vtables "Link to this heading")

**Diagnostic text:**

warning: this warning is no longer in use and will be removed in the next release

### [\-Wweak-vtables](#id1133)[¶](#wweak-vtables "Link to this heading")

**Diagnostic text:**

warning: _A_ has no out-of-line virtual method definitions; its vtable will be emitted in every translation unit

### [\-Wwritable-strings](#id1134)[¶](#wwritable-strings "Link to this heading")

This diagnostic is enabled by default.

Also controls [\-Wdeprecated-writable-strings](#wdeprecated-writable-strings).

**Diagnostic text:**

warning: ISO C++11 does not allow conversion from string literal to _A_

### [\-Wwrite-strings](#id1135)[¶](#wwrite-strings "Link to this heading")

Synonym for [\-Wwritable-strings](#wwritable-strings).

**Note:** enabling this warning in C will change the semantic behavior of the program by treating all string literals as having type `const char *` instead of `char *`. This can cause unexpected behaviors with type-sensitive constructs like `_Generic`.

### [\-Wxor-used-as-pow](#id1136)[¶](#wxor-used-as-pow "Link to this heading")

This diagnostic is enabled by default.

**Diagnostic text:**

warning: result of ‘_A_’ is _B_; did you mean exponentiation?

warning: result of ‘_A_’ is _B_; did you mean ‘_C_’?

warning: result of ‘_A_’ is _B_; did you mean ‘_C_’ (_D_)?

### [\-Wzero-as-null-pointer-constant](#id1137)[¶](#wzero-as-null-pointer-constant "Link to this heading")

**Diagnostic text:**

warning: zero as null pointer constant

### [\-Wzero-length-array](#id1138)[¶](#wzero-length-array "Link to this heading")

**Diagnostic text:**

warning: zero size arrays are an extension
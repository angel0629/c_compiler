---
title: "2.8. Source Annotations — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/analyzer/user-docs/Annotations.html#custom-assertion-handlers"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
The Clang frontend supports several source-level annotations in the form of [GCC-style attributes](https://gcc.gnu.org/onlinedocs/gcc/Attribute-Syntax.html) and pragmas that can help make using the Clang Static Analyzer more useful. These annotations can both help suppress false positives as well as enhance the analyzer’s ability to find bugs.

This page gives a practical overview of such annotations. For more technical specifics regarding Clang-specific annotations please see the Clang’s list of [language extensions](https://clang.llvm.org/docs/LanguageExtensions.html). Details of “standard” GCC attributes (that Clang also supports) can be found in the [GCC manual](https://gcc.gnu.org/onlinedocs/gcc/), with the majority of the relevant attributes being in the section on [function attributes](https://gcc.gnu.org/onlinedocs/gcc/Function-Attributes.html).

Note that attributes that are labeled **Clang-specific** are not recognized by GCC. Their use can be conditioned using preprocessor macros (examples included on this page).

*   [General Purpose Annotations](#general-purpose-annotations)
    
    *   [Null Pointer Checking](#null-pointer-checking)
        
        *   [Attribute ‘nonnull’](#attribute-nonnull)
            
    *   [Custom Assertion Handlers](#custom-assertion-handlers)
        
        *   [Attribute ‘noreturn’](#attribute-noreturn)
            
        *   [Attribute ‘analyzer\_noreturn’ (Clang-specific)](#attribute-analyzer-noreturn-clang-specific)
            
    *   [Dynamic Memory Modeling Annotations](#dynamic-memory-modeling-annotations)
        
        *   [Attribute ‘ownership\_returns’ (Clang-specific)](#attribute-ownership-returns-clang-specific)
            
        *   [Attribute ‘ownership\_takes’ (Clang-specific)](#attribute-ownership-takes-clang-specific)
            
        *   [Attribute ‘ownership\_holds’ (Clang-specific)](#attribute-ownership-holds-clang-specific)
            
*   [Mac OS X API Annotations](#mac-os-x-api-annotations)
    
    *   [Cocoa & Core Foundation Memory Management Annotations](#cocoa-core-foundation-memory-management-annotations)
        
        *   [Attribute ‘ns\_returns\_retained’ (Clang-specific)](#attribute-ns-returns-retained-clang-specific)
            
        *   [Attribute ‘ns\_returns\_not\_retained’ (Clang-specific)](#attribute-ns-returns-not-retained-clang-specific)
            
        *   [Attribute ‘cf\_returns\_retained’ (Clang-specific)](#attribute-cf-returns-retained-clang-specific)
            
        *   [Attribute ‘cf\_returns\_not\_retained’ (Clang-specific)](#attribute-cf-returns-not-retained-clang-specific)
            
        *   [Attribute ‘ns\_consumed’ (Clang-specific)](#attribute-ns-consumed-clang-specific)
            
        *   [Attribute ‘cf\_consumed’ (Clang-specific)](#attribute-cf-consumed-clang-specific)
            
        *   [Attribute ‘ns\_consumes\_self’ (Clang-specific)](#attribute-ns-consumes-self-clang-specific)
            
    *   [Libkern Memory Management Annotations](#libkern-memory-management-annotations)
        
        *   [Attribute ‘os\_returns\_retained’](#attribute-os-returns-retained)
            
        *   [Attribute ‘os\_returns\_not\_retained’](#attribute-os-returns-not-retained)
            
        *   [Attribute ‘os\_consumed’](#attribute-os-consumed)
            
        *   [Attribute ‘os\_consumes\_this’](#attribute-os-consumes-this)
            
        *   [Out Parameters](#out-parameters)
            

[2.8.1. General Purpose Annotations](#id2)[¶](#general-purpose-annotations "Link to this heading")
--------------------------------------------------------------------------------------------------

### [2.8.1.1. Null Pointer Checking](#id3)[¶](#null-pointer-checking "Link to this heading")

#### [2.8.1.1.1. Attribute ‘nonnull’](#id4)[¶](#attribute-nonnull "Link to this heading")

The analyzer recognizes the GCC attribute ‘nonnull’, which indicates that a function expects that a given function parameter is not a null pointer. Specific details of the syntax of using the ‘nonnull’ attribute can be found in [GCC’s documentation](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html#index-nonnull-function-attribute).

Both the Clang compiler and GCC will flag warnings for simple cases where a null pointer is directly being passed to a function with a ‘nonnull’ parameter (e.g., as a constant). The analyzer extends this checking by using its deeper symbolic analysis to track what pointer values are potentially null and then flag warnings when they are passed in a function call via a ‘nonnull’ parameter.

**Example**

int bar(int\*p, int q, int \*r) \_\_attribute\_\_((nonnull(1,3)));

int foo(int \*p, int \*q) {
   return !p ? bar(q, 2, p)
             : bar(p, 2, q);
}

Running `scan-build` over this source produces the following output:

![../../_images/example_attribute_nonnull.png](https://clang.llvm.org/docs/_images/example_attribute_nonnull.png)

### [2.8.1.2. Custom Assertion Handlers](#id5)[¶](#custom-assertion-handlers "Link to this heading")

The analyzer exploits code assertions by pruning off paths where the assertion condition is false. The idea is capture any program invariants specified in the assertion that the developer may know but is not immediately apparent in the code itself. In this way assertions make implicit assumptions explicit in the code, which not only makes the analyzer more accurate when finding bugs, but can help others better able to understand your code as well. It can also help remove certain kinds of analyzer false positives by pruning off false paths.

In order to exploit assertions, however, the analyzer must understand when it encounters an “assertion handler”. Typically assertions are implemented with a macro, with the macro performing a check for the assertion condition and, when the check fails, calling an assertion handler. For example, consider the following code fragment:

void foo(int \*p) {
  assert(p != NULL);
}

When this code is preprocessed on Mac OS X it expands to the following:

void foo(int \*p) {
  (\_\_builtin\_expect(!(p != NULL), 0) ? \_\_assert\_rtn(\_\_func\_\_, "t.c", 4, "p != NULL") : (void)0);
}

In this example, the assertion handler is `__assert_rtn`. When called, most assertion handlers typically print an error and terminate the program. The analyzer can exploit such semantics by ending the analysis of a path once it hits a call to an assertion handler.

The trick, however, is that the analyzer needs to know that a called function is an assertion handler; otherwise the analyzer might assume the function call returns and it will continue analyzing the path where the assertion condition failed. This can lead to false positives, as the assertion condition usually implies a safety condition (e.g., a pointer is not null) prior to performing some action that depends on that condition (e.g., dereferencing a pointer).

The analyzer knows about several well-known assertion handlers, but can automatically infer if a function should be treated as an assertion handler if it is annotated with the ‘noreturn’ attribute or the (Clang-specific) ‘analyzer\_noreturn’ attribute. Note that, currently, clang does not support these attributes on Objective-C methods and C++ methods.

#### [2.8.1.2.1. Attribute ‘noreturn’](#id6)[¶](#attribute-noreturn "Link to this heading")

The ‘noreturn’ attribute is a GCC attribute that can be placed on the declarations of functions. It means exactly what its name implies: a function with a ‘noreturn’ attribute should never return.

Specific details of the syntax of using the ‘noreturn’ attribute can be found in [GCC’s documentation](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html#index-noreturn-function-attribute).

Not only does the analyzer exploit this information when pruning false paths, but the compiler also takes it seriously and will generate different code (and possibly better optimized) under the assumption that the function does not return.

**Example**

On Mac OS X, the function prototype for `__assert_rtn` (declared in `assert.h`) is specifically annotated with the ‘noreturn’ attribute:

void \_\_assert\_rtn(const char \*, const char \*, int, const char \*) \_\_attribute\_\_((\_\_noreturn\_\_));

#### [2.8.1.2.2. Attribute ‘analyzer\_noreturn’ (Clang-specific)](#id7)[¶](#attribute-analyzer-noreturn-clang-specific "Link to this heading")

The Clang-specific ‘analyzer\_noreturn’ attribute is almost identical to ‘noreturn’ except that it is ignored by the compiler for the purposes of code generation.

This attribute is useful for annotating assertion handlers that actually _can_ return, but for the purpose of using the analyzer we want to pretend that such functions do not return.

Because this attribute is Clang-specific, its use should be conditioned with the use of preprocessor macros.

**Example**

#ifndef CLANG\_ANALYZER\_NORETURN
#if \_\_has\_feature(attribute\_analyzer\_noreturn)
#define CLANG\_ANALYZER\_NORETURN \_\_attribute\_\_((analyzer\_noreturn))
#else
#define CLANG\_ANALYZER\_NORETURN
#endif
#endif

void my\_assert\_rtn(const char \*, const char \*, int, const char \*) CLANG\_ANALYZER\_NORETURN;

### [2.8.1.3. Dynamic Memory Modeling Annotations](#id8)[¶](#dynamic-memory-modeling-annotations "Link to this heading")

If a project uses custom functions for dynamic memory management (that e.g. act as wrappers around `malloc`/`free` or `new`/`delete` in C++) and the analyzer cannot “see” the \_definitions\_ of these functions, it’s possible to annotate their declarations to let the analyzer model their behavior. (Otherwise the analyzer cannot know that the opaque `my_free()` is basically equivalent to a standard `free()` call.)

Note

**This page only provides a brief list of these annotations.** For a full documentation, see the main [Attributes in Clang](https://clang.llvm.org/docs/AttributeReference.html#ownership-holds-ownership-returns-ownership-takes-clang-static-analyzer) page.

#### [2.8.1.3.1. Attribute ‘ownership\_returns’ (Clang-specific)](#id9)[¶](#attribute-ownership-returns-clang-specific "Link to this heading")

Use this attribute to mark functions that return dynamically allocated memory. Takes a single argument, the type of the allocation (e.g. `malloc` or `new`).

void \_\_attribute((ownership\_returns(malloc))) \*my\_malloc(size\_t);

#### [2.8.1.3.2. Attribute ‘ownership\_takes’ (Clang-specific)](#id10)[¶](#attribute-ownership-takes-clang-specific "Link to this heading")

Use this attribute to mark functions that deallocate memory. Takes two arguments: the type of the allocation (e.g. `malloc` or `new`) and the index of the parameter that is being deallocated (counting from 1).

void \_\_attribute((ownership\_takes(malloc, 1))) my\_free(void \*);

#### [2.8.1.3.3. Attribute ‘ownership\_holds’ (Clang-specific)](#id11)[¶](#attribute-ownership-holds-clang-specific "Link to this heading")

Use this attribute to mark functions that take ownership of memory and will deallocate it at some unspecified point in the future. Takes two arguments: the type of the allocation (e.g. `malloc` or `new`) and the index of the parameter that is being held (counting from 1).

void \_\_attribute((ownership\_holds(malloc, 2))) store\_in\_table(int key, record\_t \*val);

The annotations `ownership_takes` and `ownership_holds` both prevent memory leak reports (concerning the specified argument); the difference between them is that using taken memory is a use-after-free error, while using held memory is assumed to be legitimate.

[2.8.2. Mac OS X API Annotations](#id12)[¶](#mac-os-x-api-annotations "Link to this heading")
---------------------------------------------------------------------------------------------

### [2.8.2.1. Cocoa & Core Foundation Memory Management Annotations](#id13)[¶](#cocoa-core-foundation-memory-management-annotations "Link to this heading")

The analyzer supports the proper management of retain counts for both Cocoa and Core Foundation objects. This checking is largely based on enforcing Cocoa and Core Foundation naming conventions for Objective-C methods (Cocoa) and C functions (Core Foundation). Not strictly following these conventions can cause the analyzer to miss bugs or flag false positives.

One can educate the analyzer (and others who read your code) about methods or functions that deviate from the Cocoa and Core Foundation conventions using the attributes described here. However, you should consider using proper naming conventions or the [objc\_method\_family](https://clang.llvm.org/docs/LanguageExtensions.html#the-objc-method-family-attribute) attribute, if applicable.

#### [2.8.2.1.1. Attribute ‘ns\_returns\_retained’ (Clang-specific)](#id14)[¶](#attribute-ns-returns-retained-clang-specific "Link to this heading")

The GCC-style (Clang-specific) attribute ‘ns\_returns\_retained’ allows one to annotate an Objective-C method or C function as returning a retained Cocoa object that the caller is responsible for releasing (via sending a `release` message to the object). The Foundation framework defines a macro `NS_RETURNS_RETAINED` that is functionally equivalent to the one shown below.

**Placing on Objective-C methods**: For Objective-C methods, this annotation essentially tells the analyzer to treat the method as if its name begins with “alloc” or “new” or contains the word “copy”.

**Placing on C functions**: For C functions returning Cocoa objects, the analyzer typically does not make any assumptions about whether or not the object is returned retained. Explicitly adding the ‘ns\_returns\_retained’ attribute to C functions allows the analyzer to perform extra checking.

**Example**

#import <Foundation/Foundation.h>;

#ifndef \_\_has\_feature      // Optional.
#define \_\_has\_feature(x) 0 // Compatibility with non-clang compilers.
#endif

#ifndef NS\_RETURNS\_RETAINED
#if \_\_has\_feature(attribute\_ns\_returns\_retained)
#define NS\_RETURNS\_RETAINED \_\_attribute\_\_((ns\_returns\_retained))
#else
#define NS\_RETURNS\_RETAINED
#endif
#endif

@interface MyClass : NSObject {}
\- (NSString\*) returnsRetained NS\_RETURNS\_RETAINED;
\- (NSString\*) alsoReturnsRetained;
@end

@implementation MyClass
\- (NSString\*) returnsRetained {
  return \[\[NSString alloc\] initWithCString:"no leak here"\];
}
\- (NSString\*) alsoReturnsRetained {
  return \[\[NSString alloc\] initWithCString:"flag a leak"\];
}
@end

Running `scan-build` on this source file produces the following output:

![../../_images/example_ns_returns_retained.png](https://clang.llvm.org/docs/_images/example_ns_returns_retained.png)

#### [2.8.2.1.2. Attribute ‘ns\_returns\_not\_retained’ (Clang-specific)](#id15)[¶](#attribute-ns-returns-not-retained-clang-specific "Link to this heading")

The ‘ns\_returns\_not\_retained’ attribute is the complement of ‘[ns\_returns\_retained](#ns-returns-retained)’. Where a function or method may appear to obey the Cocoa conventions and return a retained Cocoa object, this attribute can be used to indicate that the object reference returned should not be considered as an “owning” reference being returned to the caller. The Foundation framework defines a macro `NS_RETURNS_NOT_RETAINED` that is functionally equivalent to the one shown below.

Usage is identical to [ns\_returns\_retained](#ns-returns-retained). When using the attribute, be sure to declare it within the proper macro that checks for its availability, as it is not available in earlier versions of the analyzer:

#### [2.8.2.1.3. Attribute ‘cf\_returns\_retained’ (Clang-specific)](#id16)[¶](#attribute-cf-returns-retained-clang-specific "Link to this heading")

The GCC-style (Clang-specific) attribute ‘cf\_returns\_retained’ allows one to annotate an Objective-C method or C function as returning a retained Core Foundation object that the caller is responsible for releasing. The CoreFoundation framework defines a macro `CF_RETURNS_RETAINED` that is functionally equivalent to the one shown below.

**Placing on Objective-C methods**: With respect to Objective-C methods., this attribute is identical in its behavior and usage to ‘ns\_returns\_retained’ except for the distinction of returning a Core Foundation object instead of a Cocoa object.

This distinction is important for the following reason: as Core Foundation is a C API, the analyzer cannot always tell that a pointer return value refers to a Core Foundation object. In contrast, it is trivial for the analyzer to recognize if a pointer refers to a Cocoa object (given the Objective-C type system).

**Placing on C functions**: When placing the attribute ‘cf\_returns\_retained’ on the declarations of C functions, the analyzer interprets the function as:

1.  Returning a Core Foundation Object
    
2.  Treating the function as if it its name contained the keywords “create” or “copy”. This means the returned object as a +1 retain count that must be released by the caller, either by sending a `release` message (via toll-free bridging to an Objective-C object pointer), or calling `CFRelease` or a similar function.
    

**Example**

Running `scan-build` on this example produces the following output:

![../../_images/example_cf_returns_retained.png](https://clang.llvm.org/docs/_images/example_cf_returns_retained.png)

#### [2.8.2.1.4. Attribute ‘cf\_returns\_not\_retained’ (Clang-specific)](#id17)[¶](#attribute-cf-returns-not-retained-clang-specific "Link to this heading")

The ‘cf\_returns\_not\_retained’ attribute is the complement of ‘[cf\_returns\_retained](#cf-returns-retained)’. Where a function or method may appear to obey the Core Foundation or Cocoa conventions and return a retained Core Foundation object, this attribute can be used to indicate that the object reference returned should not be considered as an “owning” reference being returned to the caller. The CoreFoundation framework defines a macro **\`\`CF\_RETURNS\_NOT\_RETAINED\`\`** that is functionally equivalent to the one shown below.

Usage is identical to [cf\_returns\_retained](#cf-returns-retained). When using the attribute, be sure to declare it within the proper macro that checks for its availability, as it is not available in earlier versions of the analyzer:

#### [2.8.2.1.5. Attribute ‘ns\_consumed’ (Clang-specific)](#id18)[¶](#attribute-ns-consumed-clang-specific "Link to this heading")

The ‘ns\_consumed’ attribute can be placed on a specific parameter in either the declaration of a function or an Objective-C method. It indicates to the static analyzer that a `release` message is implicitly sent to the parameter upon completion of the call to the given function or method. The Foundation framework defines a macro `NS_RELEASES_ARGUMENT` that is functionally equivalent to the `NS_CONSUMED` macro shown below.

**Example**

#### [2.8.2.1.6. Attribute ‘cf\_consumed’ (Clang-specific)](#id19)[¶](#attribute-cf-consumed-clang-specific "Link to this heading")

The ‘cf\_consumed’ attribute is practically identical to [ns\_consumed](#ns-consumed). The attribute can be placed on a specific parameter in either the declaration of a function or an Objective-C method. It indicates to the static analyzer that the object reference is implicitly passed to a call to `CFRelease` upon completion of the call to the given function or method. The CoreFoundation framework defines a macro `CF_RELEASES_ARGUMENT` that is functionally equivalent to the `CF_CONSUMED` macro shown below.

Operationally this attribute is nearly identical to ‘ns\_consumed’.

**Example**

#### [2.8.2.1.7. Attribute ‘ns\_consumes\_self’ (Clang-specific)](#id20)[¶](#attribute-ns-consumes-self-clang-specific "Link to this heading")

The ‘ns\_consumes\_self’ attribute can be placed only on an Objective-C method declaration. It indicates that the receiver of the message is “consumed” (a single reference count decremented) after the message is sent. This matches the semantics of all “init” methods.

One use of this attribute is declare your own init-like methods that do not follow the standard Cocoa naming conventions.

**Example**

In this example, `-nonstandardInitWith:` has the same ownership semantics as the init method `-initWith:`. The static analyzer will observe that the method consumes the receiver, and then returns an object with a +1 retain count.

The Foundation framework defines a macro `NS_REPLACES_RECEIVER` which is functionally equivalent to the combination of `NS_CONSUMES_SELF` and `NS_RETURNS_RETAINED` shown above.

### [2.8.2.2. Libkern Memory Management Annotations](#id21)[¶](#libkern-memory-management-annotations "Link to this heading")

[Libkern](https://developer.apple.com/documentation/kernel/osobject?language=objc) requires developers to inherit all heap allocated objects from `OSObject` and to perform manual reference counting. The reference counting model is very similar to MRR (manual retain-release) mode in [Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmRules.html) or to CoreFoundation reference counting. Freshly-allocated objects start with a reference count of 1, and calls to `retain` increment it, while calls to `release` decrement it. The object is deallocated whenever its reference count reaches zero.

Manually incrementing and decrementing reference counts is error-prone: over-retains lead to leaks, and over-releases lead to uses-after-free. The analyzer can help the programmer to check for unbalanced retain/release calls.

The reference count checking is based on the principle of _locality_: it should be possible to establish correctness (lack of leaks/uses after free) by looking at each function body, and the declarations (not the definitions) of all the functions it interacts with.

In order to support such reasoning, it should be possible to _summarize_ the behavior of each function, with respect to reference count of its returned values and attributes.

By default, the following summaries are assumed:

*   All functions starting with `get` or `Get`, unless they are returning subclasses of `OSIterator`, are assumed to be returning at +0. That is, the caller has no reference count _obligations_ with respect to the reference count of the returned object and should leave it untouched.
    
*   All other functions are assumed to return at +1. That is, the caller has an _obligation_ to release such objects.
    
*   Functions are assumed not to change the reference count of their parameters, including the implicit `this` parameter.
    

These summaries can be overriden with the following [attributes](https://clang.llvm.org/docs/AttributeReference.html#os-returns-not-retained):

#### [2.8.2.2.1. Attribute ‘os\_returns\_retained’](#id22)[¶](#attribute-os-returns-retained "Link to this heading")

The `os_returns_retained` attribute (accessed through the macro `LIBKERN_RETURNS_RETAINED`) plays a role identical to [ns\_returns\_retained](#ns-returns-retained) for functions returning `OSObject` subclasses. The attribute indicates that it is a callers responsibility to release the returned object.

#### [2.8.2.2.2. Attribute ‘os\_returns\_not\_retained’](#id23)[¶](#attribute-os-returns-not-retained "Link to this heading")

The `os_returns_not_retained` attribute (accessed through the macro `LIBKERN_RETURNS_NOT_RETAINED`) plays a role identical to [ns\_returns\_not\_retained](#ns-returns-not-retained) for functions returning `OSObject` subclasses. The attribute indicates that the caller should not change the retain count of the returned object.

**Example**

#### [2.8.2.2.3. Attribute ‘os\_consumed’](#id24)[¶](#attribute-os-consumed "Link to this heading")

Similarly to [ns\_consumed](#ns-consumed) attribute, `os_consumed` (accessed through `LIBKERN_CONSUMED`) attribute, applied to a parameter, indicates that the call to the function _consumes_ the parameter: the callee should either release it or store it and release it in the destructor, while the caller should assume one is subtracted from the reference count after the call.

#### [2.8.2.2.4. Attribute ‘os\_consumes\_this’](#id25)[¶](#attribute-os-consumes-this "Link to this heading")

Similarly to [ns\_consumes\_self](#ns-consumes-self), the `os_consumes_self` attribute indicates that the method call _consumes_ the implicit `this` argument: the caller should assume one was subtracted from the reference count of the object after the call, and the callee has on obligation to either release the argument, or store it and eventually release it in the destructor.

#### [2.8.2.2.5. Out Parameters](#id26)[¶](#out-parameters "Link to this heading")

A function can also return an object to a caller by a means of an out parameter (a pointer-to-OSObject-pointer is passed, and a callee writes a pointer to an object into an argument). Currently the analyzer does not track unannotated out parameters by default, but with annotations we distinguish four separate cases:

**1\. Non-retained out parameters**, identified using `LIBKERN_RETURNS_NOT_RETAINED` applied to parameters, e.g.:

Such functions write a non-retained object into an out parameter, and the caller has no further obligations.

**2\. Retained out parameters**, identified using `LIBKERN_RETURNS_RETAINED`:

In such cases a retained object is written into an out parameter, which the caller has then to release in order to avoid a leak.

These two cases are simple - but in practice a functions returning an out-parameter usually also return a return code, and then an out parameter may or may not be written, which conditionally depends on the exit code, e.g.:

For such functions, the usual semantics is that an object is written into on “success”, and not written into on “failure”.

For `LIBKERN_RETURNS_RETAINED` we assume the following definition of success:

*   For functions returning `OSReturn` or `IOReturn` (any typedef to `kern_return_t`) success is defined as having an output of zero (`kIOReturnSuccess` is zero).
    
*   For all others, success is non-zero (e.g. non-nullptr for pointers)
    

**3\. Retained out parameters on zero return** The annotation `LIBKERN_RETURNS_RETAINED_ON_ZERO` states that a retained object is written into if and only if the function returns a zero value:

Then the caller has to release an object if the function has returned zero.

**4\. Retained out parameters on non-zero return** Similarly, `LIBKERN_RETURNS_RETAINED_ON_NONZERO` specifies that a retained object is written into the parameter if and only if the function has returned a non-zero value.

Note that for non-retained out parameters conditionals do not matter, as the caller has no obligations regardless of whether an object is written into or not.
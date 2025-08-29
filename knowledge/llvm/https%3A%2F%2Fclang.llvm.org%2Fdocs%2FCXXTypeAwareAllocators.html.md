---
title: "C++ Type Aware Allocators — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/CXXTypeAwareAllocators.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Notes](#notes)
    
    *   [Unconstrained Global Operators](#unconstrained-global-operators)
        
    *   [Mismatching Constraints](#mismatching-constraints)
        
    *   [Declarations Across Libraries](#declarations-across-libraries)
        
    *   [Implicit and Placement Parameters](#implicit-and-placement-parameters)
        
*   [Publication](#publication)
    

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

Clang includes an implementation of P2719 “Type-aware allocation and deallocation functions”.

This is a feature that extends the semantics of new, new\[\], delete and delete\[\] operators to expose the type being allocated to the operator. This can be used to customize allocation of types without needing to modify the type declaration, or via template definitions fully generic type aware allocators.

P2719 introduces a type-identity tag as valid parameter type for all allocation operators. This tag is a default initialized value of type std::type\_identity<T> where T is the type being allocated or deallocated. Unlike the other placement arguments this tag is passed as the first parameter to the operator.

The most basic use case is as follows

#include <new>
#include <type\_traits>

struct S {
 // ...
};

void \*operator new(std::type\_identity<S\>, size\_t, std::align\_val\_t);
void operator delete(std::type\_identity<S\>, void \*, size\_t, std::align\_val\_t);

void f() {
  S \*s \= new S; // calls ::operator new(std::type\_identity<S>(), sizeof(S), alignof(S))
  delete s; // calls ::operator delete(std::type\_identity<S>(), s, sizeof(S), alignof(S))
}

While this functionality alone is powerful and useful, the true power comes by using templates. In addition to adding the type-identity tag, P2719 allows the tag parameter to be a dependent specialization of std::type\_identity, updates the overload resolution rules to support full template deduction and constraint semantics, and updates the definition of usual deallocation functions to include operator delete definitions that are templatized on the type-identity tag.

This allows arbitrarily constrained definitions of the operators that resolve as would be expected for any other template function resolution, e.g (only showing operator new for brevity)

template <typename T, unsigned Size\> struct Array {
  T buffer\[Size\];
};

// Starting with a concrete type
void \*operator new(std::type\_identity<Array<int, 5\>>, size\_t, std::align\_val\_t);

// Only care about five element arrays
template <typename T\>
void \*operator new(std::type\_identity<Array<T, 5\>>, size\_t, std::align\_val\_t);

// An array of N floats
template <unsigned N\>
void \*operator new(std::type\_identity<Array<float, N\>>, size\_t, std::align\_val\_t);

// Any array
template <typename T, unsigned N\>
void \*operator new(std::type\_identity<Array<T, N\>>, size\_t, std::align\_val\_t);

// A handy concept
template <typename T\> concept Polymorphic \= std::is\_polymorphic\_v<T\>;

// Only applies is T is Polymorphic
template <Polymorphic T, unsigned N\>
void \*operator new(std::type\_identity<Array<T, N\>>, size\_t, std::align\_val\_t);

// Any even length array
template <typename T, unsigned N\>
void \*operator new(std::type\_identity<Array<T, N\>>, size\_t, std::align\_val\_t)
    requires(N%2 \== 0);

Operator selection then proceeds according to the usual rules for choosing the best/most constrained match.

Any declaration of a type aware operator new or operator delete must include a matching complimentary operator defined in the same scope.

[Notes](#id2)[¶](#notes "Link to this heading")
-----------------------------------------------

### [Unconstrained Global Operators](#id3)[¶](#unconstrained-global-operators "Link to this heading")

Declaring an unconstrained type aware global operator new or delete (or \[\] variants) creates numerous hazards, similar to, but different from, those created by attempting to replace the non-type aware global operators. For that reason unconstrained operators are strongly discouraged.

### [Mismatching Constraints](#id4)[¶](#mismatching-constraints "Link to this heading")

When declaring global type aware operators you should ensure the constraints applied to new and delete match exactly, and declare them together. This limits the risk of having mismatching operators selected due to differing constraints resulting in changes to prioritization when determining the most viable candidate.

### [Declarations Across Libraries](#id5)[¶](#declarations-across-libraries "Link to this heading")

Declaring a typed allocator for a type in a separate TU or library creates similar hazards as different libraries and TUs may see (or select) different definitions.

Under this model something like this would be risky

template<typename T\>
void \*operator new(std::type\_identity<std::vector<T\>>, size\_t, std::align\_val\_t);

However this hazard is not present simply due to the use of the a type from another library:

template<typename T\>
struct MyType {
  T thing;
};
template<typename T\>
void \*operator new(std::type\_identity<MyType<std::vector<T\>>>, size\_t, std::align\_val\_t);

Here we see std::vector being used, but that is not the actual type being allocated.

### [Implicit and Placement Parameters](#id6)[¶](#implicit-and-placement-parameters "Link to this heading")

Type aware allocators are always passed both the implicit alignment and size parameters in all cases. Explicit placement parameters are supported after the mandatory implicit parameters.

[Publication](#id7)[¶](#publication "Link to this heading")
-----------------------------------------------------------

[Type-aware allocation and deallocation functions](https://wg21.link/P2719). Louis Dionne, Oliver Hunt.
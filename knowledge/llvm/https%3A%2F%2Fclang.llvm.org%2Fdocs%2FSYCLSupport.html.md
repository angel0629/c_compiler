---
title: "SYCL Compiler and Runtime architecture design — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/SYCLSupport.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Address space handling](#address-space-handling)
    

[Introduction](#id1)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

This document describes the architecture of the SYCL compiler and runtime library. More details are provided in [external document](https://github.com/intel/llvm/blob/sycl/sycl/doc/design/CompilerAndRuntimeDesign.md), which are going to be added to clang documentation in the future.

[Address space handling](#id2)[¶](#address-space-handling "Link to this heading")
---------------------------------------------------------------------------------

The SYCL specification represents pointers to disjoint memory regions using C++ wrapper classes on an accelerator to enable compilation with a standard C++ toolchain and a SYCL compiler toolchain. Section 3.8.2 of SYCL 2020 specification defines [memory model](https://www.khronos.org/registry/SYCL/specs/sycl-2020/html/sycl-2020.html#_sycl_device_memory_model), section 4.7.7 - [address space classes](https://www.khronos.org/registry/SYCL/specs/sycl-2020/html/sycl-2020.html#_address_space_classes) and section 5.9 covers [address space deduction](https://www.khronos.org/registry/SYCL/specs/sycl-2020/html/sycl-2020.html#_address_space_deduction). The SYCL specification allows two modes of address space deduction: “generic as default address space” (see section 5.9.3) and “inferred address space” (see section 5.9.4). Current implementation supports only “generic as default address space” mode.

SYCL borrows its memory model from OpenCL however SYCL doesn’t perform the address space qualifier inference as detailed in [OpenCL C v3.0 6.7.8](https://www.khronos.org/registry/OpenCL/specs/3.0-unified/html/OpenCL_C.html#addr-spaces-inference).

The default address space is “generic-memory”, which is a virtual address space that overlaps the global, local, and private address spaces. SYCL mode enables following conversions:

*   explicit conversions to/from the default address space from/to the address space-attributed type
    
*   implicit conversions from the address space-attributed type to the default address space
    
*   explicit conversions to/from the global address space from/to the `__attribute__((opencl_global_device))` or `__attribute__((opencl_global_host))` address space-attributed type
    
*   implicit conversions from the `__attribute__((opencl_global_device))` or `__attribute__((opencl_global_host))` address space-attributed type to the global address space
    

All named address spaces are disjoint and sub-sets of default address space.

The SPIR target allocates SYCL namespace scope variables in the global address space.

Pointers to default address space should get lowered into a pointer to a generic address space (or flat to reuse more general terminology). But depending on the allocation context, the default address space of a non-pointer type is assigned to a specific address space. This is described in [common address space deduction rules](https://www.khronos.org/registry/SYCL/specs/sycl-2020/html/sycl-2020.html#subsec:commonAddressSpace) section.

This is also in line with the behaviour of CUDA ([small example](https://godbolt.org/z/veqTfo9PK)).

`multi_ptr` class implementation example:

// check that SYCL mode is ON and we can use non-standard decorations
#if defined(\_\_SYCL\_DEVICE\_ONLY\_\_)
// GPU/accelerator implementation
template <typename T, address\_space AS\> class multi\_ptr {
  // DecoratedType applies corresponding address space attribute to the type T
  // DecoratedType<T, global\_space>::type == "\_\_attribute\_\_((opencl\_global)) T"
  // See sycl/include/CL/sycl/access/access.hpp for more details
  using pointer\_t \= typename DecoratedType<T, AS\>::type \*;

  pointer\_t m\_Pointer;
  public:
  pointer\_t get() { return m\_Pointer; }
  T& operator\* () { return \*reinterpret\_cast<T\*>(m\_Pointer); }
}
#else
// CPU/host implementation
template <typename T, address\_space AS\> class multi\_ptr {
  T \*m\_Pointer; // regular undecorated pointer
  public:
  T \*get() { return m\_Pointer; }
  T& operator\* () { return \*m\_Pointer; }
}
#endif

Depending on the compiler mode, `multi_ptr` will either decorate its internal data with the address space attribute or not.

To utilize clang’s existing functionality, we reuse the following OpenCL address space attributes for pointers:

Address space attribute

SYCL address\_space enumeration

`__attribute__((opencl_global))`

global\_space, constant\_space

`__attribute__((opencl_global_device))`

global\_space

`__attribute__((opencl_global_host))`

global\_space

`__attribute__((opencl_local))`

local\_space

`__attribute__((opencl_private))`

private\_space

//TODO: add support for \_\_attribute\_\_((opencl\_global\_host)) and \_\_attribute\_\_((opencl\_global\_device)).
---
title: "Attributes in Clang — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/AttributeReference.html#availability"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [AArch64 SME Attributes](#aarch64-sme-attributes)
    
    *   [\_\_arm\_agnostic](#arm-agnostic)
        
    *   [\_\_arm\_in](#arm-in)
        
    *   [\_\_arm\_inout](#arm-inout)
        
    *   [\_\_arm\_locally\_streaming](#arm-locally-streaming)
        
    *   [\_\_arm\_new](#arm-new)
        
    *   [\_\_arm\_out](#arm-out)
        
    *   [\_\_arm\_preserves](#arm-preserves)
        
    *   [\_\_arm\_streaming](#arm-streaming)
        
    *   [\_\_arm\_streaming\_compatible](#arm-streaming-compatible)
        
*   [AMD GPU Attributes](#amd-gpu-attributes)
    
    *   [amdgpu\_flat\_work\_group\_size](#amdgpu-flat-work-group-size)
        
    *   [amdgpu\_max\_num\_work\_groups](#amdgpu-max-num-work-groups)
        
    *   [amdgpu\_num\_sgpr, amdgpu\_num\_vgpr](#amdgpu-num-sgpr-amdgpu-num-vgpr)
        
    *   [amdgpu\_waves\_per\_eu](#amdgpu-waves-per-eu)
        
*   [Calling Conventions](#calling-conventions)
    
    *   [aarch64\_sve\_pcs](#aarch64-sve-pcs)
        
    *   [aarch64\_vector\_pcs](#aarch64-vector-pcs)
        
    *   [fastcall](#fastcall)
        
    *   [m68k\_rtd](#m68k-rtd)
        
    *   [ms\_abi](#ms-abi)
        
    *   [pcs](#pcs)
        
    *   [preserve\_all](#preserve-all)
        
    *   [preserve\_most](#preserve-most)
        
    *   [preserve\_none](#preserve-none)
        
    *   [regcall](#regcall)
        
    *   [regparm](#regparm)
        
    *   [riscv::vector\_cc, riscv\_vector\_cc, clang::riscv\_vector\_cc](#riscv-vector-cc-riscv-vector-cc-clang-riscv-vector-cc)
        
    *   [riscv::vls\_cc, riscv\_vls\_cc, clang::riscv\_vls\_cc](#riscv-vls-cc-riscv-vls-cc-clang-riscv-vls-cc)
        
    *   [stdcall](#stdcall)
        
    *   [sysv\_abi](#sysv-abi)
        
    *   [thiscall](#thiscall)
        
    *   [vectorcall](#vectorcall)
        
*   [Consumed Annotation Checking](#consumed-annotation-checking)
    
    *   [callable\_when](#callable-when)
        
    *   [consumable](#consumable)
        
    *   [param\_typestate](#param-typestate)
        
    *   [return\_typestate](#return-typestate)
        
    *   [set\_typestate](#set-typestate)
        
    *   [test\_typestate](#test-typestate)
        
*   [Customizing Swift Import](#customizing-swift-import)
    
    *   [swift\_async](#swift-async)
        
    *   [swift\_async\_error](#swift-async-error)
        
    *   [swift\_async\_name](#swift-async-name)
        
    *   [swift\_attr](#swift-attr)
        
    *   [swift\_bridge](#swift-bridge)
        
    *   [swift\_bridged](#swift-bridged)
        
    *   [swift\_error](#swift-error)
        
    *   [swift\_name](#swift-name)
        
    *   [swift\_newtype](#swift-newtype)
        
    *   [swift\_objc\_members](#swift-objc-members)
        
    *   [swift\_private](#swift-private)
        
*   [Declaration Attributes](#declaration-attributes)
    
    *   [Owner](#owner)
        
    *   [Pointer](#pointer)
        
    *   [\_\_single\_inheritance, \_\_multiple\_inheritance, \_\_virtual\_inheritance](#single-inheritance-multiple-inheritance-virtual-inheritance)
        
    *   [asm](#asm)
        
    *   [coro\_await\_elidable](#coro-await-elidable)
        
    *   [coro\_await\_elidable\_argument](#coro-await-elidable-argument)
        
    *   [coro\_disable\_lifetimebound, coro\_lifetimebound](#coro-disable-lifetimebound-coro-lifetimebound)
        
    *   [coro\_only\_destroy\_when\_complete](#coro-only-destroy-when-complete)
        
    *   [coro\_return\_type, coro\_wrapper](#coro-return-type-coro-wrapper)
        
    *   [deprecated](#deprecated)
        
    *   [empty\_bases](#empty-bases)
        
    *   [enum\_extensibility](#enum-extensibility)
        
    *   [external\_source\_symbol](#external-source-symbol)
        
    *   [flag\_enum](#flag-enum)
        
    *   [grid\_constant](#grid-constant)
        
    *   [layout\_version](#layout-version)
        
    *   [lto\_visibility\_public](#lto-visibility-public)
        
    *   [managed](#managed)
        
    *   [no\_init\_all](#no-init-all)
        
    *   [no\_specializations](#no-specializations)
        
    *   [nonstring](#nonstring)
        
    *   [novtable](#novtable)
        
    *   [ns\_error\_domain](#ns-error-domain)
        
    *   [objc\_boxable](#objc-boxable)
        
    *   [objc\_direct](#objc-direct)
        
    *   [objc\_direct\_members](#objc-direct-members)
        
    *   [objc\_non\_runtime\_protocol](#objc-non-runtime-protocol)
        
    *   [objc\_nonlazy\_class](#objc-nonlazy-class)
        
    *   [objc\_runtime\_name](#objc-runtime-name)
        
    *   [objc\_runtime\_visible](#objc-runtime-visible)
        
    *   [objc\_subclassing\_restricted](#objc-subclassing-restricted)
        
    *   [preferred\_name](#preferred-name)
        
    *   [randomize\_layout, no\_randomize\_layout](#randomize-layout-no-randomize-layout)
        
    *   [selectany](#selectany)
        
    *   [transparent\_union](#transparent-union)
        
    *   [trivial\_abi](#trivial-abi)
        
    *   [using\_if\_exists](#using-if-exists)
        
    *   [weak](#weak)
        
*   [Field Attributes](#field-attributes)
    
    *   [counted\_by, counted\_by\_or\_null, sized\_by, sized\_by\_or\_null](#counted-by-counted-by-or-null-sized-by-sized-by-or-null)
        
    *   [no\_unique\_address](#no-unique-address)
        
    *   [preferred\_type](#preferred-type)
        
    *   [require\_explicit\_initialization](#require-explicit-initialization)
        
*   [Function Attributes](#function-attributes)
    
    *   [#pragma omp declare simd](#pragma-omp-declare-simd)
        
    *   [#pragma omp declare target](#pragma-omp-declare-target)
        
    *   [#pragma omp declare variant](#pragma-omp-declare-variant)
        
    *   [RootSignature](#rootsignature)
        
    *   [WaveSize](#wavesize)
        
    *   [\_Noreturn](#noreturn)
        
    *   [abi\_tag](#abi-tag)
        
    *   [acquire\_capability, acquire\_shared\_capability](#acquire-capability-acquire-shared-capability)
        
    *   [alloc\_align](#alloc-align)
        
    *   [alloc\_size](#alloc-size)
        
    *   [allocator](#allocator)
        
    *   [always\_inline, \_\_force\_inline](#always-inline-force-inline)
        
    *   [artificial](#artificial)
        
    *   [assert\_capability, assert\_shared\_capability](#assert-capability-assert-shared-capability)
        
    *   [assume](#assume)
        
    *   [assume\_aligned](#assume-aligned)
        
    *   [availability](#availability)
        
    *   [btf\_decl\_tag](#btf-decl-tag)
        
    *   [callback](#callback)
        
    *   [carries\_dependency](#carries-dependency)
        
    *   [cf\_consumed, cf\_returns\_not\_retained, cf\_returns\_retained, ns\_consumed, ns\_consumes\_self, ns\_returns\_autoreleased, ns\_returns\_not\_retained, ns\_returns\_retained, os\_consumed, os\_consumes\_this, os\_returns\_not\_retained, os\_returns\_retained, os\_returns\_retained\_on\_non\_zero, os\_returns\_retained\_on\_zero](#cf-consumed-cf-returns-not-retained-cf-returns-retained-ns-consumed-ns-consumes-self-ns-returns-autoreleased-ns-returns-not-retained-ns-returns-retained-os-consumed-os-consumes-this-os-returns-not-retained-os-returns-retained-os-returns-retained-on-non-zero-os-returns-retained-on-zero)
        
    *   [cfi\_canonical\_jump\_table](#cfi-canonical-jump-table)
        
    *   [cfi\_salt](#cfi-salt)
        
    *   [clang::builtin\_alias, clang\_builtin\_alias](#clang-builtin-alias-clang-builtin-alias)
        
    *   [clang\_arm\_builtin\_alias](#clang-arm-builtin-alias)
        
    *   [clspv\_libclc\_builtin](#clspv-libclc-builtin)
        
    *   [cmse\_nonsecure\_entry](#cmse-nonsecure-entry)
        
    *   [code\_seg](#code-seg)
        
    *   [cold](#cold)
        
    *   [constant\_id](#constant-id)
        
    *   [constructor, destructor](#constructor-destructor)
        
    *   [convergent](#convergent)
        
    *   [cpu\_dispatch, cpu\_specific](#cpu-dispatch-cpu-specific)
        
    *   [device\_kernel, sycl\_kernel, nvptx\_kernel, amdgpu\_kernel, kernel, \_\_kernel](#device-kernel-sycl-kernel-nvptx-kernel-amdgpu-kernel-kernel-kernel)
        
    *   [diagnose\_as\_builtin](#diagnose-as-builtin)
        
    *   [diagnose\_if](#diagnose-if)
        
    *   [disable\_sanitizer\_instrumentation](#disable-sanitizer-instrumentation)
        
    *   [disable\_tail\_calls](#disable-tail-calls)
        
    *   [enable\_if](#enable-if)
        
    *   [enforce\_tcb](#enforce-tcb)
        
    *   [enforce\_tcb\_leaf](#enforce-tcb-leaf)
        
    *   [error, warning](#error-warning)
        
    *   [exclude\_from\_explicit\_instantiation](#exclude-from-explicit-instantiation)
        
    *   [export\_name, \_\_funcref](#export-name-funcref)
        
    *   [ext\_vector\_type](#ext-vector-type)
        
    *   [flatten](#flatten)
        
    *   [force\_align\_arg\_pointer](#force-align-arg-pointer)
        
    *   [format](#format)
        
    *   [format\_matches](#format-matches)
        
    *   [function\_return](#function-return)
        
    *   [gnu\_inline](#gnu-inline)
        
    *   [guard](#guard)
        
    *   [hot](#hot)
        
    *   [hybrid\_patchable](#hybrid-patchable)
        
    *   [ifunc](#ifunc)
        
    *   [import\_module](#import-module)
        
    *   [import\_name](#import-name)
        
    *   [internal\_linkage](#internal-linkage)
        
    *   [interrupt (ARM)](#interrupt-arm)
        
    *   [interrupt (AVR)](#interrupt-avr)
        
    *   [interrupt (MIPS)](#interrupt-mips)
        
    *   [interrupt (RISC-V)](#interrupt-risc-v)
        
    *   [interrupt (X86)](#interrupt-x86)
        
    *   [interrupt\_save\_fp (ARM)](#interrupt-save-fp-arm)
        
    *   [lifetime\_capture\_by](#lifetime-capture-by)
        
    *   [lifetimebound](#lifetimebound)
        
    *   [long\_call, far](#long-call-far)
        
    *   [malloc](#malloc)
        
    *   [micromips, nomicromips](#micromips-nomicromips)
        
    *   [mig\_server\_routine](#mig-server-routine)
        
    *   [min\_vector\_width](#min-vector-width)
        
    *   [minsize](#minsize)
        
    *   [no\_builtin](#no-builtin)
        
    *   [no\_caller\_saved\_registers](#no-caller-saved-registers)
        
    *   [no\_profile\_instrument\_function](#no-profile-instrument-function)
        
    *   [no\_sanitize](#no-sanitize)
        
    *   [no\_sanitize\_address, no\_address\_safety\_analysis](#no-sanitize-address-no-address-safety-analysis)
        
    *   [no\_sanitize\_memory](#no-sanitize-memory)
        
    *   [no\_sanitize\_thread](#no-sanitize-thread)
        
    *   [no\_speculative\_load\_hardening](#no-speculative-load-hardening)
        
    *   [no\_split\_stack](#no-split-stack)
        
    *   [no\_stack\_protector, safebuffers](#no-stack-protector-safebuffers)
        
    *   [noalias](#noalias)
        
    *   [nocf\_check](#nocf-check)
        
    *   [noconvergent](#noconvergent)
        
    *   [nodiscard, warn\_unused\_result](#nodiscard-warn-unused-result)
        
    *   [noduplicate](#noduplicate)
        
    *   [noinline](#noinline)
        
    *   [noreturn, \_Noreturn](#noreturn-noreturn)
        
    *   [not\_tail\_called](#not-tail-called)
        
    *   [nothrow](#nothrow)
        
    *   [nouwtable](#nouwtable)
        
    *   [numthreads](#numthreads)
        
    *   [objc\_method\_family](#objc-method-family)
        
    *   [objc\_requires\_super](#objc-requires-super)
        
    *   [optnone](#optnone)
        
    *   [overloadable](#overloadable)
        
    *   [ownership\_holds, ownership\_returns, ownership\_takes (Clang Static Analyzer)](#ownership-holds-ownership-returns-ownership-takes-clang-static-analyzer)
        
    *   [packoffset](#packoffset)
        
    *   [patchable\_function\_entry](#patchable-function-entry)
        
    *   [preserve\_access\_index](#preserve-access-index)
        
    *   [preserve\_static\_offset](#preserve-static-offset)
        
    *   [register](#register)
        
    *   [reinitializes](#reinitializes)
        
    *   [release\_capability, release\_shared\_capability](#release-capability-release-shared-capability)
        
    *   [retain](#retain)
        
    *   [shader](#shader)
        
    *   [short\_call, near](#short-call-near)
        
    *   [signal](#signal)
        
    *   [speculative\_load\_hardening](#id8)
        
    *   [strict\_gs\_check](#strict-gs-check)
        
    *   [sv\_dispatchthreadid](#sv-dispatchthreadid)
        
    *   [sv\_groupid](#sv-groupid)
        
    *   [sv\_groupindex](#sv-groupindex)
        
    *   [sv\_groupthreadid](#sv-groupthreadid)
        
    *   [sv\_position](#sv-position)
        
    *   [sycl\_external](#sycl-external)
        
    *   [sycl\_kernel\_entry\_point](#sycl-kernel-entry-point)
        
    *   [target](#target)
        
    *   [target\_clones](#target-clones)
        
    *   [target\_version](#target-version)
        
    *   [try\_acquire\_capability, try\_acquire\_shared\_capability](#try-acquire-capability-try-acquire-shared-capability)
        
    *   [unsafe\_buffer\_usage](#unsafe-buffer-usage)
        
    *   [used](#used)
        
    *   [xray\_always\_instrument, xray\_never\_instrument, xray\_log\_args](#xray-always-instrument-xray-never-instrument-xray-log-args)
        
    *   [zero\_call\_used\_regs](#zero-call-used-regs)
        
*   [Handle Attributes](#handle-attributes)
    
    *   [acquire\_handle](#acquire-handle)
        
    *   [release\_handle](#release-handle)
        
    *   [use\_handle](#use-handle)
        
*   [Nullability Attributes](#nullability-attributes)
    
    *   [\_Nonnull](#nonnull)
        
    *   [\_Null\_unspecified](#null-unspecified)
        
    *   [\_Nullable](#nullable)
        
    *   [\_Nullable\_result](#nullable-result)
        
    *   [nonnull](#id10)
        
    *   [returns\_nonnull](#returns-nonnull)
        
*   [OpenCL Address Spaces](#opencl-address-spaces)
    
    *   [\[\[clang::opencl\_global\_device\]\], \[\[clang::opencl\_global\_host\]\]](#clang-opencl-global-device-clang-opencl-global-host)
        
    *   [\_\_constant, constant, \[\[clang::opencl\_constant\]\]](#constant-constant-clang-opencl-constant)
        
    *   [\_\_generic, generic, \[\[clang::opencl\_generic\]\]](#generic-generic-clang-opencl-generic)
        
    *   [\_\_global, global, \[\[clang::opencl\_global\]\]](#global-global-clang-opencl-global)
        
    *   [\_\_local, local, \[\[clang::opencl\_local\]\]](#local-local-clang-opencl-local)
        
    *   [\_\_private, private, \[\[clang::opencl\_private\]\]](#private-private-clang-opencl-private)
        
*   [Performance Constraint Attributes](#performance-constraint-attributes)
    
    *   [allocating](#allocating)
        
    *   [blocking](#blocking)
        
    *   [nonallocating](#nonallocating)
        
    *   [nonblocking](#nonblocking)
        
*   [Statement Attributes](#statement-attributes)
    
    *   [#pragma clang loop](#pragma-clang-loop)
        
    *   [#pragma unroll, #pragma nounroll](#pragma-unroll-pragma-nounroll)
        
    *   [\[loop\]](#loop)
        
    *   [\[unroll(x)\], \[unroll\]](#unroll-x-unroll)
        
    *   [\_\_read\_only, \_\_write\_only, \_\_read\_write (read\_only, write\_only, read\_write)](#read-only-write-only-read-write-read-only-write-only-read-write)
        
    *   [assume](#id13)
        
    *   [atomic](#atomic)
        
    *   [constexpr](#constexpr)
        
    *   [fallthrough](#fallthrough)
        
    *   [intel\_reqd\_sub\_group\_size](#intel-reqd-sub-group-size)
        
    *   [likely and unlikely](#likely-and-unlikely)
        
    *   [musttail](#musttail)
        
    *   [nomerge](#nomerge)
        
    *   [opencl\_unroll\_hint](#opencl-unroll-hint)
        
    *   [suppress](#suppress)
        
    *   [sycl\_special\_class](#sycl-special-class)
        
*   [Type Attributes](#type-attributes)
    
    *   [\_\_ptr32](#ptr32)
        
    *   [\_\_ptr64](#ptr64)
        
    *   [\_\_sptr](#sptr)
        
    *   [\_\_uptr](#uptr)
        
    *   [align\_value](#align-value)
        
    *   [annotate\_type](#annotate-type)
        
    *   [arm\_sve\_vector\_bits](#arm-sve-vector-bits)
        
    *   [bpf\_fastcall](#bpf-fastcall)
        
    *   [btf\_type\_tag](#btf-type-tag)
        
    *   [cfi\_unchecked\_callee](#cfi-unchecked-callee)
        
    *   [clang\_arm\_mve\_strict\_polymorphism](#clang-arm-mve-strict-polymorphism)
        
    *   [cmse\_nonsecure\_call](#cmse-nonsecure-call)
        
    *   [device\_builtin\_surface\_type](#device-builtin-surface-type)
        
    *   [device\_builtin\_texture\_type](#device-builtin-texture-type)
        
    *   [enforce\_read\_only\_placement](#enforce-read-only-placement)
        
    *   [noderef](#noderef)
        
    *   [objc\_class\_stub](#objc-class-stub)
        
    *   [riscv\_rvv\_vector\_bits](#riscv-rvv-vector-bits)
        
    *   [type\_visibility](#type-visibility)
        
*   [Type Safety Checking](#type-safety-checking)
    
    *   [argument\_with\_type\_tag](#argument-with-type-tag)
        
    *   [pointer\_with\_type\_tag](#pointer-with-type-tag)
        
    *   [type\_tag\_for\_datatype](#type-tag-for-datatype)
        
*   [Undocumented](#undocumented)
    
    *   [Alignas, align, alignas, aligned](#alignas-align-alignas-aligned)
        
    *   [NSObject](#nsobject)
        
    *   [\_\_kindof](#kindof)
        
    *   [acquired\_after](#acquired-after)
        
    *   [acquired\_before](#acquired-before)
        
    *   [address\_space](#address-space)
        
    *   [alias](#alias)
        
    *   [analyzer\_noreturn](#analyzer-noreturn)
        
    *   [annotate](#annotate)
        
    *   [available\_only\_in\_default\_eval\_method](#available-only-in-default-eval-method)
        
    *   [blocks](#blocks)
        
    *   [capability, shared\_capability](#capability-shared-capability)
        
    *   [cdecl](#cdecl)
        
    *   [cf\_audited\_transfer](#cf-audited-transfer)
        
    *   [cf\_unknown\_transfer](#cf-unknown-transfer)
        
    *   [common](#common)
        
    *   [const](#const)
        
    *   [constant](#constant)
        
    *   [consumable\_auto\_cast\_state](#consumable-auto-cast-state)
        
    *   [consumable\_set\_state\_on\_read](#consumable-set-state-on-read)
        
    *   [device](#device)
        
    *   [exclusive\_locks\_required, requires\_capability, requires\_shared\_capability, shared\_locks\_required](#exclusive-locks-required-requires-capability-requires-shared-capability-shared-locks-required)
        
    *   [format\_arg](#format-arg)
        
    *   [global](#global)
        
    *   [guarded\_by](#guarded-by)
        
    *   [guarded\_var](#guarded-var)
        
    *   [host](#host)
        
    *   [ibaction](#ibaction)
        
    *   [iboutlet](#iboutlet)
        
    *   [iboutletcollection](#iboutletcollection)
        
    *   [intel\_ocl\_bicc](#intel-ocl-bicc)
        
    *   [interrupt](#interrupt)
        
    *   [interrupt](#id16)
        
    *   [launch\_bounds](#launch-bounds)
        
    *   [lock\_returned](#lock-returned)
        
    *   [lockable](#lockable)
        
    *   [locks\_excluded](#locks-excluded)
        
    *   [matrix\_type](#matrix-type)
        
    *   [may\_alias](#may-alias)
        
    *   [mips16](#mips16)
        
    *   [mode](#mode)
        
    *   [ms\_struct](#ms-struct)
        
    *   [naked](#naked)
        
    *   [neon\_polyvector\_type](#neon-polyvector-type)
        
    *   [neon\_vector\_type](#neon-vector-type)
        
    *   [no\_instrument\_function](#no-instrument-function)
        
    *   [no\_thread\_safety\_analysis](#no-thread-safety-analysis)
        
    *   [nocommon](#nocommon)
        
    *   [nomips16](#nomips16)
        
    *   [noreturn](#id17)
        
    *   [objc\_arc\_weak\_reference\_unavailable](#objc-arc-weak-reference-unavailable)
        
    *   [objc\_bridge](#objc-bridge)
        
    *   [objc\_bridge\_mutable](#objc-bridge-mutable)
        
    *   [objc\_bridge\_related](#objc-bridge-related)
        
    *   [objc\_designated\_initializer](#objc-designated-initializer)
        
    *   [objc\_exception](#objc-exception)
        
    *   [objc\_gc](#objc-gc)
        
    *   [objc\_independent\_class](#objc-independent-class)
        
    *   [objc\_ownership](#objc-ownership)
        
    *   [objc\_precise\_lifetime](#objc-precise-lifetime)
        
    *   [objc\_protocol\_requires\_explicit\_implementation](#objc-protocol-requires-explicit-implementation)
        
    *   [objc\_requires\_property\_definitions](#objc-requires-property-definitions)
        
    *   [objc\_returns\_inner\_pointer](#objc-returns-inner-pointer)
        
    *   [objc\_root\_class](#objc-root-class)
        
    *   [packed](#packed)
        
    *   [pascal](#pascal)
        
    *   [pt\_guarded\_by](#pt-guarded-by)
        
    *   [pt\_guarded\_var](#pt-guarded-var)
        
    *   [ptrauth\_vtable\_pointer](#ptrauth-vtable-pointer)
        
    *   [pure](#pure)
        
    *   [reentrant\_capability](#reentrant-capability)
        
    *   [reqd\_work\_group\_size](#reqd-work-group-size)
        
    *   [returns\_twice](#returns-twice)
        
    *   [scoped\_lockable](#scoped-lockable)
        
    *   [sentinel](#sentinel)
        
    *   [shared](#shared)
        
    *   [unavailable](#unavailable)
        
    *   [uuid](#uuid)
        
    *   [vec\_type\_hint](#vec-type-hint)
        
    *   [vecreturn](#vecreturn)
        
    *   [vector\_size](#vector-size)
        
    *   [visibility](#visibility)
        
    *   [warn\_unused](#warn-unused)
        
    *   [weak\_import](#weak-import)
        
    *   [weakref](#weakref)
        
    *   [work\_group\_size\_hint](#work-group-size-hint)
        
*   [Variable Attributes](#variable-attributes)
    
    *   [HLSL Parameter Modifiers](#hlsl-parameter-modifiers)
        
    *   [\_\_ptrauth](#ptrauth)
        
    *   [always\_destroy](#always-destroy)
        
    *   [binding](#binding)
        
    *   [called\_once](#called-once)
        
    *   [clang::code\_align](#clang-code-align)
        
    *   [cleanup](#cleanup)
        
    *   [dllexport](#dllexport)
        
    *   [dllimport](#dllimport)
        
    *   [ext\_builtin\_input](#ext-builtin-input)
        
    *   [groupshared](#groupshared)
        
    *   [init\_priority](#init-priority)
        
    *   [init\_seg](#init-seg)
        
    *   [leaf](#leaf)
        
    *   [loader\_uninitialized](#loader-uninitialized)
        
    *   [maybe\_undef](#maybe-undef)
        
    *   [maybe\_unused, unused](#maybe-unused-unused)
        
    *   [model](#model)
        
    *   [no\_destroy](#no-destroy)
        
    *   [nodebug](#nodebug)
        
    *   [noescape](#noescape)
        
    *   [nosvm](#nosvm)
        
    *   [objc\_externally\_retained](#objc-externally-retained)
        
    *   [pass\_object\_size, pass\_dynamic\_object\_size](#pass-object-size-pass-dynamic-object-size)
        
    *   [require\_constant\_initialization, constinit (C++20)](#require-constant-initialization-constinit-c-20)
        
    *   [section, \_\_declspec(allocate)](#section-declspec-allocate)
        
    *   [standalone\_debug](#standalone-debug)
        
    *   [swift\_async\_context](#swift-async-context)
        
    *   [swift\_context](#swift-context)
        
    *   [swift\_error\_result](#swift-error-result)
        
    *   [swift\_indirect\_result](#swift-indirect-result)
        
    *   [swiftasynccall](#swiftasynccall)
        
    *   [swiftcall](#swiftcall)
        
    *   [thread](#thread)
        
    *   [tls\_model](#tls-model)
        
    *   [uninitialized](#uninitialized)
        

[Introduction](#id415)[¶](#introduction "Link to this heading")
---------------------------------------------------------------

This page lists the attributes currently supported by Clang.

[AArch64 SME Attributes](#id416)[¶](#aarch64-sme-attributes "Link to this heading")
-----------------------------------------------------------------------------------

Clang supports a number of AArch64-specific attributes to manage state added by the Scalable Matrix Extension (SME). This state includes the runtime mode that the processor is in (e.g. non-streaming or streaming) as well as the state of the `ZA` Matrix Storage.

The attributes come in the form of type- and declaration attributes:

*   The SME declaration attributes can appear anywhere that a standard `[[...]]` declaration attribute can appear.
    
*   The SME type attributes apply only to prototyped functions and can appear anywhere that a standard `[[...]]` type attribute can appear. The SME type attributes do not apply to functions having a K&R-style unprototyped function type.
    

See [Arm C Language Extensions](https://github.com/ARM-software/acle) for more details about the features related to the SME extension.

See [Procedure Call Standard for the Arm® 64-bit Architecture (AArch64)](https://github.com/ARM-software/abi-aa) for more details about streaming-interface functions and shared/private-ZA interface functions.

### [\_\_arm\_agnostic](#id417)[¶](#arm-agnostic "Link to this heading")

Supported Syntaxes[¶](#id21 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_agnostic`

The `__arm_agnostic` keyword applies to prototyped function types and affects the function’s calling convention for a given state S. This attribute allows the user to describe a function that preserves S, without requiring the function to share S with its callers and without making the assumption that S exists.

If a function has the `__arm_agnostic(S)` attribute and calls a function without this attribute, then the function’s object code will contain code to preserve state S. Otherwise, the function’s object code will be the same as if it did not have the attribute.

The attribute takes string arguments to describe state S. The supported states are:

*   `"sme_za_state"` for state enabled by PSTATE.ZA, such as ZA and ZT0.
    

The attribute `__arm_agnostic("sme_za_state")` cannot be used in conjunction with `__arm_in(S)`, `__arm_out(S)`, `__arm_inout(S)` or `__arm_preserves(S)` where state S describes state enabled by PSTATE.ZA, such as “za” or “zt0”.

### [\_\_arm\_in](#id418)[¶](#arm-in "Link to this heading")

Supported Syntaxes[¶](#id22 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_in`

The `__arm_in` keyword applies to prototyped function types and specifies that the function shares a given state S with its caller. For `__arm_in`, the function takes the state S as input and returns with the state S unchanged.

The attribute takes string arguments to instruct the compiler which state is shared. The supported states for S are:

*   `"za"` for Matrix Storage (requires SME)
    

The attributes `__arm_in(S)`, `__arm_out(S)`, `__arm_inout(S)` and `__arm_preserves(S)` are all mutually exclusive for the same state S.

### [\_\_arm\_inout](#id419)[¶](#arm-inout "Link to this heading")

Supported Syntaxes[¶](#id23 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_inout`

The `__arm_inout` keyword applies to prototyped function types and specifies that the function shares a given state S with its caller. For `__arm_inout`, the function takes the state S as input and returns new state for S.

The attribute takes string arguments to instruct the compiler which state is shared. The supported states for S are:

*   `"za"` for Matrix Storage (requires SME)
    

The attributes `__arm_in(S)`, `__arm_out(S)`, `__arm_inout(S)` and `__arm_preserves(S)` are all mutually exclusive for the same state S.

### [\_\_arm\_locally\_streaming](#id420)[¶](#arm-locally-streaming "Link to this heading")

Supported Syntaxes[¶](#id24 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_locally_streaming`

The `__arm_locally_streaming` keyword applies to function declarations and specifies that all the statements in the function are executed in streaming mode. This means that:

*   the function requires that the target processor implements the Scalable Matrix Extension (SME).
    
*   the program automatically puts the machine into streaming mode before executing the statements and automatically restores the previous mode afterwards.
    

Clang manages PSTATE.SM automatically; it is not the source code’s responsibility to do this. For example, Clang will emit code to enable streaming mode at the start of the function, and disable streaming mode at the end of the function.

### [\_\_arm\_new](#id421)[¶](#arm-new "Link to this heading")

Supported Syntaxes[¶](#id25 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_new`

The `__arm_new` keyword applies to function declarations and specifies that the function will create a new scope for state S.

The attribute takes string arguments to instruct the compiler for which state to create new scope. The supported states for S are:

*   `"za"` for Matrix Storage (requires SME)
    

For state `"za"`, this means that:

*   the function requires that the target processor implements the Scalable Matrix Extension (SME).
    
*   the function will commit any lazily saved ZA data.
    
*   the function will create a new ZA context and enable PSTATE.ZA.
    
*   the function will disable PSTATE.ZA (by setting it to 0) before returning.
    

For `__arm_new("za")` functions Clang will set up the ZA context automatically on entry to the function and disable it before returning. For example, if ZA is in a dormant state Clang will generate the code to commit a lazy-save and set up a new ZA state before executing user code.

### [\_\_arm\_out](#id422)[¶](#arm-out "Link to this heading")

Supported Syntaxes[¶](#id26 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_out`

The `__arm_out` keyword applies to prototyped function types and specifies that the function shares a given state S with its caller. For `__arm_out`, the function ignores the incoming state for S and returns new state for S.

The attribute takes string arguments to instruct the compiler which state is shared. The supported states for S are:

*   `"za"` for Matrix Storage (requires SME)
    

The attributes `__arm_in(S)`, `__arm_out(S)`, `__arm_inout(S)` and `__arm_preserves(S)` are all mutually exclusive for the same state S.

### [\_\_arm\_preserves](#id423)[¶](#arm-preserves "Link to this heading")

Supported Syntaxes[¶](#id27 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_preserves`

The `__arm_preserves` keyword applies to prototyped function types and specifies that the function does not read a given state S and returns with state S unchanged.

The attribute takes string arguments to instruct the compiler which state is shared. The supported states for S are:

*   `"za"` for Matrix Storage (requires SME)
    

The attributes `__arm_in(S)`, `__arm_out(S)`, `__arm_inout(S)` and `__arm_preserves(S)` are all mutually exclusive for the same state S.

### [\_\_arm\_streaming](#id424)[¶](#arm-streaming "Link to this heading")

Supported Syntaxes[¶](#id28 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_streaming`

The `__arm_streaming` keyword applies to prototyped function types and specifies that the function has a “streaming interface”. This means that:

*   the function requires that the processor implements the Scalable Matrix Extension (SME).
    
*   the function must be entered in streaming mode (that is, with PSTATE.SM set to 1)
    
*   the function must return in streaming mode
    

Clang manages PSTATE.SM automatically; it is not the source code’s responsibility to do this. For example, if a non-streaming function calls an `__arm_streaming` function, Clang generates code that switches into streaming mode before calling the function and switches back to non-streaming mode on return.

### [\_\_arm\_streaming\_compatible](#id425)[¶](#arm-streaming-compatible "Link to this heading")

Supported Syntaxes[¶](#id29 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__arm_streaming_compatible`

The `__arm_streaming_compatible` keyword applies to prototyped function types and specifies that the function has a “streaming compatible interface”. This means that:

*   the function may be entered in either non-streaming mode (PSTATE.SM=0) or in streaming mode (PSTATE.SM=1).
    
*   the function must return in the same mode as it was entered.
    
*   the code executed in the function is compatible with either mode.
    

Clang manages PSTATE.SM automatically; it is not the source code’s responsibility to do this. Clang will ensure that the generated code in streaming-compatible functions is valid in either mode (PSTATE.SM=0 or PSTATE.SM=1). For example, if an `__arm_streaming_compatible` function calls a non-streaming function, Clang generates code to temporarily switch out of streaming mode before calling the function and switch back to streaming-mode on return if `PSTATE.SM` is `1` on entry of the caller. If `PSTATE.SM` is `0` on entry to the `__arm_streaming_compatible` function, the call will be executed without changing modes.

[AMD GPU Attributes](#id426)[¶](#amd-gpu-attributes "Link to this heading")
---------------------------------------------------------------------------

### [amdgpu\_flat\_work\_group\_size](#id427)[¶](#amdgpu-flat-work-group-size "Link to this heading")

Supported Syntaxes[¶](#id30 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`amdgpu_flat_work_group_size`

`clang::amdgpu_flat_work_group_size`

Yes

The flat work-group size is the number of work-items in the work-group size specified when the kernel is dispatched. It is the product of the sizes of the x, y, and z dimension of the work-group.

Clang supports the `__attribute__((amdgpu_flat_work_group_size(<min>, <max>)))` attribute for the AMDGPU target. This attribute may be attached to a kernel function definition and is an optimization hint.

`<min>` parameter specifies the minimum flat work-group size, and `<max>` parameter specifies the maximum flat work-group size (must be greater than `<min>`) to which all dispatches of the kernel will conform. Passing `0, 0` as `<min>, <max>` implies the default behavior (`128, 256`).

If specified, the AMDGPU target backend might be able to produce better machine code for barriers and perform scratch promotion by estimating available group segment size.

An error will be given if:

*   Specified values violate subtarget specifications;
    
*   Specified values are not compatible with values provided through other attributes.
    

### [amdgpu\_max\_num\_work\_groups](#id428)[¶](#amdgpu-max-num-work-groups "Link to this heading")

Supported Syntaxes[¶](#id31 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`amdgpu_max_num_work_groups`

`clang::amdgpu_max_num_work_groups`

Yes

This attribute specifies the max number of work groups when the kernel is dispatched.

Clang supports the `__attribute__((amdgpu_max_num_work_groups(<x>, <y>, <z>)))` or `[[clang::amdgpu_max_num_work_groups(<x>, <y>, <z>)]]` attribute for the AMDGPU target. This attribute may be attached to HIP or OpenCL kernel function definitions and is an optimization hint.

The `<x>` parameter specifies the maximum number of work groups in the x dimension. Similarly `<y>` and `<z>` are for the y and z dimensions respectively. Each of the three values must be greater than 0 when provided. The `<x>` parameter is required, while `<y>` and `<z>` are optional with default value of 1.

If specified, the AMDGPU target backend might be able to produce better machine code.

An error will be given if:

*   Specified values violate subtarget specifications;
    
*   Specified values are not compatible with values provided through other attributes.
    

### [amdgpu\_num\_sgpr, amdgpu\_num\_vgpr](#id429)[¶](#amdgpu-num-sgpr-amdgpu-num-vgpr "Link to this heading")

Supported Syntaxes[¶](#id32 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`amdgpu_num_sgpr`  
`amdgpu_num_vgpr`

`clang::amdgpu_num_sgpr`  
`clang::amdgpu_num_vgpr`

Yes

Clang supports the `__attribute__((amdgpu_num_sgpr(<num_sgpr>)))` and `__attribute__((amdgpu_num_vgpr(<num_vgpr>)))` attributes for the AMDGPU target. These attributes may be attached to a kernel function definition and are an optimization hint.

If these attributes are specified, then the AMDGPU target backend will attempt to limit the number of SGPRs and/or VGPRs used to the specified value(s). The number of used SGPRs and/or VGPRs may further be rounded up to satisfy the allocation requirements or constraints of the subtarget. Passing `0` as `num_sgpr` and/or `num_vgpr` implies the default behavior (no limits).

These attributes can be used to test the AMDGPU target backend. It is recommended that the `amdgpu_waves_per_eu` attribute be used to control resources such as SGPRs and VGPRs since it is aware of the limits for different subtargets.

An error will be given if:

*   Specified values violate subtarget specifications;
    
*   Specified values are not compatible with values provided through other attributes;
    
*   The AMDGPU target backend is unable to create machine code that can meet the request.
    

### [amdgpu\_waves\_per\_eu](#id430)[¶](#amdgpu-waves-per-eu "Link to this heading")

Supported Syntaxes[¶](#id33 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`amdgpu_waves_per_eu`

`clang::amdgpu_waves_per_eu`

Yes

A compute unit (CU) is responsible for executing the wavefronts of a work-group. It is composed of one or more execution units (EU), which are responsible for executing the wavefronts. An EU can have enough resources to maintain the state of more than one executing wavefront. This allows an EU to hide latency by switching between wavefronts in a similar way to symmetric multithreading on a CPU. In order to allow the state for multiple wavefronts to fit on an EU, the resources used by a single wavefront have to be limited. For example, the number of SGPRs and VGPRs. Limiting such resources can allow greater latency hiding, but can result in having to spill some register state to memory.

Clang supports the `__attribute__((amdgpu_waves_per_eu(<min>[, <max>])))` attribute for the AMDGPU target. This attribute may be attached to a kernel function definition and is an optimization hint.

`<min>` parameter specifies the requested minimum number of waves per EU, and _optional_ `<max>` parameter specifies the requested maximum number of waves per EU (must be greater than `<min>` if specified). If `<max>` is omitted, then there is no restriction on the maximum number of waves per EU other than the one dictated by the hardware for which the kernel is compiled. Passing `0, 0` as `<min>, <max>` implies the default behavior (no limits).

If specified, this attribute allows an advanced developer to tune the number of wavefronts that are capable of fitting within the resources of an EU. The AMDGPU target backend can use this information to limit resources, such as number of SGPRs, number of VGPRs, size of available group and private memory segments, in such a way that guarantees that at least `<min>` wavefronts and at most `<max>` wavefronts are able to fit within the resources of an EU. Requesting more wavefronts can hide memory latency but limits available registers which can result in spilling. Requesting fewer wavefronts can help reduce cache thrashing, but can reduce memory latency hiding.

This attribute controls the machine code generated by the AMDGPU target backend to ensure it is capable of meeting the requested values. However, when the kernel is executed, there may be other reasons that prevent meeting the request, for example, there may be wavefronts from other kernels executing on the EU.

An error will be given if:

*   Specified values violate subtarget specifications;
    
*   Specified values are not compatible with values provided through other attributes;
    

The AMDGPU target backend will emit a warning whenever it is unable to create machine code that meets the request.

[Calling Conventions](#id431)[¶](#calling-conventions "Link to this heading")
-----------------------------------------------------------------------------

Clang supports several different calling conventions, depending on the target platform and architecture. The calling convention used for a function determines how parameters are passed, how results are returned to the caller, and other low-level details of calling a function.

### [aarch64\_sve\_pcs](#id432)[¶](#aarch64-sve-pcs "Link to this heading")

Supported Syntaxes[¶](#id34 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`aarch64_sve_pcs`

`clang::aarch64_sve_pcs`

`clang::aarch64_sve_pcs`

On AArch64 targets, this attribute changes the calling convention of a function to preserve additional Scalable Vector registers and Scalable Predicate registers relative to the default calling convention used for AArch64.

This means it is more efficient to call such functions from code that performs extensive scalable vector and scalable predicate calculations, because fewer live SVE registers need to be saved. This property makes it well-suited for SVE math library functions, which are typically leaf functions that require a small number of registers.

However, using this attribute also means that it is more expensive to call a function that adheres to the default calling convention from within such a function. Therefore, it is recommended that this attribute is only used for leaf functions.

For more information, see the documentation for aarch64\_sve\_pcs in the ARM C Language Extension (ACLE) documentation.

### [aarch64\_vector\_pcs](#id433)[¶](#aarch64-vector-pcs "Link to this heading")

Supported Syntaxes[¶](#id35 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`aarch64_vector_pcs`

`clang::aarch64_vector_pcs`

`clang::aarch64_vector_pcs`

On AArch64 targets, this attribute changes the calling convention of a function to preserve additional floating-point and Advanced SIMD registers relative to the default calling convention used for AArch64.

This means it is more efficient to call such functions from code that performs extensive floating-point and vector calculations, because fewer live SIMD and FP registers need to be saved. This property makes it well-suited for e.g. floating-point or vector math library functions, which are typically leaf functions that require a small number of registers.

However, using this attribute also means that it is more expensive to call a function that adheres to the default calling convention from within such a function. Therefore, it is recommended that this attribute is only used for leaf functions.

For more information, see the documentation for [aarch64\_vector\_pcs](https://developer.arm.com/products/software-development-tools/hpc/arm-compiler-for-hpc/vector-function-abi) on the Arm Developer website.

### [fastcall](#id434)[¶](#fastcall "Link to this heading")

Supported Syntaxes[¶](#id36 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`fastcall`

`gnu::fastcall`

`gnu::fastcall`

`__fastcall`  
`_fastcall`

On 32-bit x86 targets, this attribute changes the calling convention of a function to use ECX and EDX as register parameters and clear parameters off of the stack on return. This convention does not support variadic calls or unprototyped functions in C, and has no effect on x86\_64 targets. This calling convention is supported primarily for compatibility with existing code. Users seeking register parameters should use the `regparm` attribute, which does not require callee-cleanup. See the documentation for [\_\_fastcall](http://msdn.microsoft.com/en-us/library/6xa169sk.aspx) on MSDN.

### [m68k\_rtd](#id435)[¶](#m68k-rtd "Link to this heading")

Supported Syntaxes[¶](#id37 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`m68k_rtd`

`clang::m68k_rtd`

`clang::m68k_rtd`

On M68k targets, this attribute changes the calling convention of a function to clear parameters off the stack on return. In other words, callee is responsible for cleaning out the stack space allocated for incoming paramters. This convention does not support variadic calls or unprototyped functions in C. When targeting M68010 or newer CPUs, this calling convention is implemented using the rtd instruction.

### [ms\_abi](#id436)[¶](#ms-abi "Link to this heading")

Supported Syntaxes[¶](#id38 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ms_abi`

`gnu::ms_abi`

`gnu::ms_abi`

On non-Windows x86\_64 targets, this attribute changes the calling convention of a function to match the default convention used on Windows x86\_64. This attribute has no effect on Windows targets or non-x86\_64 targets.

### [pcs](#id437)[¶](#pcs "Link to this heading")

Supported Syntaxes[¶](#id39 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`pcs`

`gnu::pcs`

`gnu::pcs`

On ARM targets, this attribute can be used to select calling conventions similar to `stdcall` on x86. Valid parameter values are “aapcs” and “aapcs-vfp”.

### [preserve\_all](#id438)[¶](#preserve-all "Link to this heading")

Supported Syntaxes[¶](#id40 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preserve_all`

`clang::preserve_all`

`clang::preserve_all`

On X86-64 and AArch64 targets, this attribute changes the calling convention of a function. The `preserve_all` calling convention attempts to make the code in the caller even less intrusive than the `preserve_most` calling convention. This calling convention also behaves identical to the `C` calling convention on how arguments and return values are passed, but it uses a different set of caller/callee-saved registers. This removes the burden of saving and recovering a large register set before and after the call in the caller. If the arguments are passed in callee-saved registers, then they will be preserved by the callee across the call. This doesn’t apply for values returned in callee-saved registers.

*   On X86-64 the callee preserves all general purpose registers, except for R11. R11 can be used as a scratch register. Furthermore it also preserves all floating-point registers (XMMs/YMMs).
    
*   On AArch64 the callee preserve all general purpose registers, except X0-X8 and X16-X18. Furthermore it also preserves lower 128 bits of V8-V31 SIMD - floating point registers.
    

The idea behind this convention is to support calls to runtime functions that don’t need to call out to any other functions.

This calling convention, like the `preserve_most` calling convention, will be used by a future version of the Objective-C runtime and should be considered experimental at this time.

### [preserve\_most](#id439)[¶](#preserve-most "Link to this heading")

Supported Syntaxes[¶](#id41 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preserve_most`

`clang::preserve_most`

`clang::preserve_most`

On X86-64 and AArch64 targets, this attribute changes the calling convention of a function. The `preserve_most` calling convention attempts to make the code in the caller as unintrusive as possible. This convention behaves identically to the `C` calling convention on how arguments and return values are passed, but it uses a different set of caller/callee-saved registers. This alleviates the burden of saving and recovering a large register set before and after the call in the caller. If the arguments are passed in callee-saved registers, then they will be preserved by the callee across the call. This doesn’t apply for values returned in callee-saved registers.

*   On X86-64 the callee preserves all general purpose registers, except for R11. R11 can be used as a scratch register. Floating-point registers (XMMs/YMMs) are not preserved and need to be saved by the caller.
    
*   On AArch64 the callee preserve all general purpose registers, except X0-X8 and X16-X18.
    

The idea behind this convention is to support calls to runtime functions that have a hot path and a cold path. The hot path is usually a small piece of code that doesn’t use many registers. The cold path might need to call out to another function and therefore only needs to preserve the caller-saved registers, which haven’t already been saved by the caller. The `preserve_most` calling convention is very similar to the `cold` calling convention in terms of caller/callee-saved registers, but they are used for different types of function calls. `coldcc` is for function calls that are rarely executed, whereas `preserve_most` function calls are intended to be on the hot path and definitely executed a lot. Furthermore `preserve_most` doesn’t prevent the inliner from inlining the function call.

This calling convention will be used by a future version of the Objective-C runtime and should therefore still be considered experimental at this time. Although this convention was created to optimize certain runtime calls to the Objective-C runtime, it is not limited to this runtime and might be used by other runtimes in the future too. The current implementation only supports X86-64 and AArch64, but the intention is to support more architectures in the future.

### [preserve\_none](#id440)[¶](#preserve-none "Link to this heading")

Supported Syntaxes[¶](#id42 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preserve_none`

`clang::preserve_none`

`clang::preserve_none`

Yes

On X86-64 and AArch64 targets, this attribute changes the calling convention of a function. The `preserve_none` calling convention tries to preserve as few general registers as possible. So all general registers are caller saved registers. It also uses more general registers to pass arguments. This attribute doesn’t impact floating-point registers. `preserve_none`’s ABI is still unstable, and may be changed in the future.

*   On X86-64, only RSP and RBP are preserved by the callee. Registers R12, R13, R14, R15, RDI, RSI, RDX, RCX, R8, R9, R11, and RAX now can be used to pass function arguments. Floating-point registers (XMMs/YMMs) still follow the C calling convention.
    
*   On AArch64, only LR and FP are preserved by the callee. Registers X20-X28, X0-X7, and X9-X14 are used to pass function arguments. X8, X16-X19, SIMD and floating-point registers follow the AAPCS calling convention. X15 is not available for argument passing on Windows, but is used to pass arguments on other platforms.
    

### [regcall](#id441)[¶](#regcall "Link to this heading")

Supported Syntaxes[¶](#id43 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`regcall`

`gnu::regcall`

`gnu::regcall`

`__regcall`

On x86 targets, this attribute changes the calling convention to [\_\_regcall](https://www.intel.com/content/www/us/en/docs/dpcpp-cpp-compiler/developer-guide-reference/2023-2/c-c-sycl-calling-conventions.html) convention. This convention aims to pass as many arguments as possible in registers. It also tries to utilize registers for the return value whenever it is possible.

### [regparm](#id442)[¶](#regparm "Link to this heading")

Supported Syntaxes[¶](#id44 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`regparm`

`gnu::regparm`

`gnu::regparm`

On 32-bit x86 targets, the regparm attribute causes the compiler to pass the first three integer parameters in EAX, EDX, and ECX instead of on the stack. This attribute has no effect on variadic functions, and all parameters are passed via the stack as normal.

### [riscv::vector\_cc, riscv\_vector\_cc, clang::riscv\_vector\_cc](#id443)[¶](#riscv-vector-cc-riscv-vector-cc-clang-riscv-vector-cc "Link to this heading")

Supported Syntaxes[¶](#id45 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`riscv_vector_cc`

`riscv::vector_cc`  
`clang::riscv_vector_cc`

`riscv::vector_cc`  
`clang::riscv_vector_cc`

The `riscv_vector_cc` attribute can be applied to a function. It preserves 15 registers namely, v1-v7 and v24-v31 as callee-saved. Callers thus don’t need to save these registers before function calls, and callees only need to save them if they use them.

### [riscv::vls\_cc, riscv\_vls\_cc, clang::riscv\_vls\_cc](#id444)[¶](#riscv-vls-cc-riscv-vls-cc-clang-riscv-vls-cc "Link to this heading")

Supported Syntaxes[¶](#id46 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`riscv_vls_cc`

`riscv::vls_cc`  
`clang::riscv_vls_cc`

`riscv::vls_cc`  
`clang::riscv_vls_cc`

The `riscv_vls_cc` attribute can be applied to a function. Functions declared with this attribute will utilize the standard fixed-length vector calling convention variant instead of the default calling convention defined by the ABI. This variant aims to pass fixed-length vectors via vector registers, if possible, rather than through general-purpose registers.

### [stdcall](#id445)[¶](#stdcall "Link to this heading")

Supported Syntaxes[¶](#id47 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`stdcall`

`gnu::stdcall`

`gnu::stdcall`

`__stdcall`  
`_stdcall`

On 32-bit x86 targets, this attribute changes the calling convention of a function to clear parameters off of the stack on return. This convention does not support variadic calls or unprototyped functions in C, and has no effect on x86\_64 targets. This calling convention is used widely by the Windows API and COM applications. See the documentation for [\_\_stdcall](http://msdn.microsoft.com/en-us/library/zxk0tw93.aspx) on MSDN.

### [sysv\_abi](#id446)[¶](#sysv-abi "Link to this heading")

Supported Syntaxes[¶](#id48 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sysv_abi`

`gnu::sysv_abi`

`gnu::sysv_abi`

On Windows x86\_64 targets, this attribute changes the calling convention of a function to match the default convention used on Sys V targets such as Linux, Mac, and BSD. This attribute has no effect on other targets.

### [thiscall](#id447)[¶](#thiscall "Link to this heading")

Supported Syntaxes[¶](#id49 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`thiscall`

`gnu::thiscall`

`gnu::thiscall`

`__thiscall`  
`_thiscall`

On 32-bit x86 targets, this attribute changes the calling convention of a function to use ECX for the first parameter (typically the implicit `this` parameter of C++ methods) and clear parameters off of the stack on return. This convention does not support variadic calls or unprototyped functions in C, and has no effect on x86\_64 targets. See the documentation for [\_\_thiscall](http://msdn.microsoft.com/en-us/library/ek8tkfbw.aspx) on MSDN.

### [vectorcall](#id448)[¶](#vectorcall "Link to this heading")

Supported Syntaxes[¶](#id50 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vectorcall`

`clang::vectorcall`

`clang::vectorcall`

`__vectorcall`  
`_vectorcall`

On 32-bit x86 _and_ x86\_64 targets, this attribute changes the calling convention of a function to pass vector parameters in SSE registers.

On 32-bit x86 targets, this calling convention is similar to `__fastcall`. The first two integer parameters are passed in ECX and EDX. Subsequent integer parameters are passed in memory, and callee clears the stack. On x86\_64 targets, the callee does _not_ clear the stack, and integer parameters are passed in RCX, RDX, R8, and R9 as is done for the default Windows x64 calling convention.

On both 32-bit x86 and x86\_64 targets, vector and floating point arguments are passed in XMM0-XMM5. Homogeneous vector aggregates of up to four elements are passed in sequential SSE registers if enough are available. If AVX is enabled, 256 bit vectors are passed in YMM0-YMM5. Any vector or aggregate type that cannot be passed in registers for any reason is passed by reference, which allows the caller to align the parameter memory.

See the documentation for [\_\_vectorcall](http://msdn.microsoft.com/en-us/library/dn375768.aspx) on MSDN for more details.

[Consumed Annotation Checking](#id449)[¶](#consumed-annotation-checking "Link to this heading")
-----------------------------------------------------------------------------------------------

Clang supports additional attributes for checking basic resource management properties, specifically for unique objects that have a single owning reference. The following attributes are currently supported, although **the implementation for these annotations is currently in development and are subject to change.**

### [callable\_when](#id450)[¶](#callable-when "Link to this heading")

Supported Syntaxes[¶](#id51 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`callable_when`

`clang::callable_when`

Yes

Use `__attribute__((callable_when(...)))` to indicate what states a method may be called in. Valid states are unconsumed, consumed, or unknown. Each argument to this attribute must be a quoted string. E.g.:

`__attribute__((callable_when("unconsumed", "unknown")))`

### [consumable](#id451)[¶](#consumable "Link to this heading")

Supported Syntaxes[¶](#id52 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`consumable`

`clang::consumable`

Yes

Each `class` that uses any of the typestate annotations must first be marked using the `consumable` attribute. Failure to do so will result in a warning.

This attribute accepts a single parameter that must be one of the following: `unknown`, `consumed`, or `unconsumed`.

### [param\_typestate](#id452)[¶](#param-typestate "Link to this heading")

Supported Syntaxes[¶](#id53 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`param_typestate`

`clang::param_typestate`

Yes

This attribute specifies expectations about function parameters. Calls to an function with annotated parameters will issue a warning if the corresponding argument isn’t in the expected state. The attribute is also used to set the initial state of the parameter when analyzing the function’s body.

### [return\_typestate](#id453)[¶](#return-typestate "Link to this heading")

Supported Syntaxes[¶](#id54 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`return_typestate`

`clang::return_typestate`

Yes

The `return_typestate` attribute can be applied to functions or parameters. When applied to a function the attribute specifies the state of the returned value. The function’s body is checked to ensure that it always returns a value in the specified state. On the caller side, values returned by the annotated function are initialized to the given state.

When applied to a function parameter it modifies the state of an argument after a call to the function returns. The function’s body is checked to ensure that the parameter is in the expected state before returning.

### [set\_typestate](#id454)[¶](#set-typestate "Link to this heading")

Supported Syntaxes[¶](#id55 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`set_typestate`

`clang::set_typestate`

Yes

Annotate methods that transition an object into a new state with `__attribute__((set_typestate(new_state)))`. The new state must be unconsumed, consumed, or unknown.

### [test\_typestate](#id455)[¶](#test-typestate "Link to this heading")

Supported Syntaxes[¶](#id56 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`test_typestate`

`clang::test_typestate`

Yes

Use `__attribute__((test_typestate(tested_state)))` to indicate that a method returns true if the object is in the specified state..

[Customizing Swift Import](#id456)[¶](#customizing-swift-import "Link to this heading")
---------------------------------------------------------------------------------------

Clang supports additional attributes for customizing how APIs are imported into Swift.

### [swift\_async](#id457)[¶](#swift-async "Link to this heading")

Supported Syntaxes[¶](#id57 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_async`

`clang::swift_async`

`clang::swift_async`

Yes

The `swift_async` attribute specifies if and how a particular function or Objective-C method is imported into a swift async method. For instance:

@interface MyClass : NSObject
\-(void)notActuallyAsync:(int)p1 withCompletionHandler:(void (^)())handler
    \_\_attribute\_\_((swift\_async(none)));

\-(void)actuallyAsync:(int)p1 callThisAsync:(void (^)())fun
    \_\_attribute\_\_((swift\_async(swift\_private, 1)));
@end

Here, `notActuallyAsync:withCompletionHandler` would have been imported as `async` (because it’s last parameter’s selector piece is `withCompletionHandler`) if not for the `swift_async(none)` attribute. Conversely, `actuallyAsync:callThisAsync` wouldn’t have been imported as `async` if not for the `swift_async` attribute because it doesn’t match the naming convention.

When using `swift_async` to enable importing, the first argument to the attribute is either `swift_private` or `not_swift_private` to indicate whether the function/method is private to the current framework, and the second argument is the index of the completion handler parameter.

### [swift\_async\_error](#id458)[¶](#swift-async-error "Link to this heading")

Supported Syntaxes[¶](#id58 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_async_error`

`clang::swift_async_error`

`clang::swift_async_error`

Yes

The `swift_async_error` attribute specifies how an error state will be represented in a swift async method. It’s a bit analogous to the `swift_error` attribute for the generated async method. The `swift_async_error` attribute can indicate a variety of different ways of representing an error.

*   `__attribute__((swift_async_error(zero_argument, N)))`, specifies that the async method is considered to have failed if the Nth argument to the completion handler is zero.
    
*   `__attribute__((swift_async_error(nonzero_argument, N)))`, specifies that the async method is considered to have failed if the Nth argument to the completion handler is non-zero.
    
*   `__attribute__((swift_async_error(nonnull_error)))`, specifies that the async method is considered to have failed if the `NSError *` argument to the completion handler is non-null.
    
*   `__attribute__((swift_async_error(none)))`, specifies that the async method cannot fail.
    

For instance:

@interface MyClass : NSObject
\-(void)asyncMethod:(void (^)(char, int, float))handler
    \_\_attribute\_\_((swift\_async(swift\_private, 1)))
    \_\_attribute\_\_((swift\_async\_error(zero\_argument, 2)));
@end

Here, the `swift_async` attribute specifies that `handler` is the completion handler for this method, and the `swift_async_error` attribute specifies that the `int` parameter is the one that represents the error.

### [swift\_async\_name](#id459)[¶](#swift-async-name "Link to this heading")

Supported Syntaxes[¶](#id59 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_async_name`

Yes

The `swift_async_name` attribute provides the name of the `async` overload for the given declaration in Swift. If this attribute is absent, the name is transformed according to the algorithm built into the Swift compiler.

The argument is a string literal that contains the Swift name of the function or method. The name may be a compound Swift name. The function or method with such an attribute must have more than zero parameters, as its last parameter is assumed to be a callback that’s eliminated in the Swift `async` name.

> @interface URL
> + (void) loadContentsFrom:(URL \*)url callback:(void (^)(NSData \*))data \_\_attribute\_\_((\_\_swift\_async\_name\_\_("URL.loadContentsFrom(\_:)")))
> @end

### [swift\_attr](#id460)[¶](#swift-attr "Link to this heading")

Supported Syntaxes[¶](#id60 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_attr`

Yes

The `swift_attr` provides a Swift-specific annotation for the declaration or type to which the attribute appertains to. It can be used on any declaration or type in Clang. This kind of annotation is ignored by Clang as it doesn’t have any semantic meaning in languages supported by Clang. The Swift compiler can interpret these annotations according to its own rules when importing C or Objective-C declarations.

### [swift\_bridge](#id461)[¶](#swift-bridge "Link to this heading")

Supported Syntaxes[¶](#id61 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_bridge`

The `swift_bridge` attribute indicates that the declaration to which the attribute appertains is bridged to the named Swift type.

> \_\_attribute\_\_((\_\_objc\_root\_\_))
> @interface Base
> \- (instancetype)init;
> @end
> 
> \_\_attribute\_\_((\_\_swift\_bridge\_\_("BridgedI")))
> @interface I : Base
> @end

In this example, the Objective-C interface `I` will be made available to Swift with the name `BridgedI`. It would be possible for the compiler to refer to `I` still in order to bridge the type back to Objective-C.

### [swift\_bridged](#id462)[¶](#swift-bridged "Link to this heading")

Supported Syntaxes[¶](#id62 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_bridged_typedef`

Yes

The `swift_bridged_typedef` attribute indicates that when the typedef to which the attribute appertains is imported into Swift, it should refer to the bridged Swift type (e.g. Swift’s `String`) rather than the Objective-C type as written (e.g. `NSString`).

> @interface NSString;
> typedef NSString \*AliasedString \_\_attribute\_\_((\_\_swift\_bridged\_typedef\_\_));
> 
> extern void acceptsAliasedString(AliasedString \_Nonnull parameter);

In this case, the function `acceptsAliasedString` will be imported into Swift as a function which accepts a `String` type parameter.

### [swift\_error](#id463)[¶](#swift-error "Link to this heading")

Supported Syntaxes[¶](#id63 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_error`

Yes

The `swift_error` attribute controls whether a particular function (or Objective-C method) is imported into Swift as a throwing function, and if so, which dynamic convention it uses.

All of these conventions except `none` require the function to have an error parameter. Currently, the error parameter is always the last parameter of type `NSError**` or `CFErrorRef*`. Swift will remove the error parameter from the imported API. When calling the API, Swift will always pass a valid address initialized to a null pointer.

*   `swift_error(none)` means that the function should not be imported as throwing. The error parameter and result type will be imported normally.
    
*   `swift_error(null_result)` means that calls to the function should be considered to have thrown if they return a null value. The return type must be a pointer type, and it will be imported into Swift with a non-optional type. This is the default error convention for Objective-C methods that return pointers.
    
*   `swift_error(zero_result)` means that calls to the function should be considered to have thrown if they return a zero result. The return type must be an integral type. If the return type would have been imported as `Bool`, it is instead imported as `Void`. This is the default error convention for Objective-C methods that return a type that would be imported as `Bool`.
    
*   `swift_error(nonzero_result)` means that calls to the function should be considered to have thrown if they return a non-zero result. The return type must be an integral type. If the return type would have been imported as `Bool`, it is instead imported as `Void`.
    
*   `swift_error(nonnull_error)` means that calls to the function should be considered to have thrown if they leave a non-null error in the error parameter. The return type is left unmodified.
    

### [swift\_name](#id464)[¶](#swift-name "Link to this heading")

Supported Syntaxes[¶](#id64 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_name`

The `swift_name` attribute provides the name of the declaration in Swift. If this attribute is absent, the name is transformed according to the algorithm built into the Swift compiler.

The argument is a string literal that contains the Swift name of the function, variable, or type. When renaming a function, the name may be a compound Swift name. For a type, enum constant, property, or variable declaration, the name must be a simple or qualified identifier.

> @interface URL
> \- (void) initWithString:(NSString \*)s \_\_attribute\_\_((\_\_swift\_name\_\_("URL.init(\_:)")))
> @end
> 
> void \_\_attribute\_\_((\_\_swift\_name\_\_("squareRoot()"))) sqrt(double v) {
> }

### [swift\_newtype](#id465)[¶](#swift-newtype "Link to this heading")

Supported Syntaxes[¶](#id65 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_newtype`  
`swift_wrapper`

Yes

The `swift_newtype` attribute indicates that the typedef to which the attribute appertains is imported as a new Swift type of the typedef’s name. Previously, the attribute was spelt `swift_wrapper`. While the behaviour of the attribute is identical with either spelling, `swift_wrapper` is deprecated, only exists for compatibility purposes, and should not be used in new code.

*   `swift_newtype(struct)` means that a Swift struct will be created for this typedef.
    
*   `swift_newtype(enum)` means that a Swift enum will be created for this typedef.
    
    // Import UIFontTextStyle as an enum type, with enumerated values being
    // constants.
    typedef NSString \* UIFontTextStyle \_\_attribute\_\_((\_\_swift\_newtype\_\_(enum)));
    
    // Import UIFontDescriptorFeatureKey as a structure type, with enumerated
    // values being members of the type structure.
    typedef NSString \* UIFontDescriptorFeatureKey \_\_attribute\_\_((\_\_swift\_newtype\_\_(struct)));
    

### [swift\_objc\_members](#id466)[¶](#swift-objc-members "Link to this heading")

Supported Syntaxes[¶](#id66 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_objc_members`

Yes

This attribute indicates that Swift subclasses and members of Swift extensions of this class will be implicitly marked with the `@objcMembers` Swift attribute, exposing them back to Objective-C.

### [swift\_private](#id467)[¶](#swift-private "Link to this heading")

Supported Syntaxes[¶](#id67 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_private`

Declarations marked with the `swift_private` attribute are hidden from the framework client but are still made available for use within the framework or Swift SDK overlay.

The purpose of this attribute is to permit a more idomatic implementation of declarations in Swift while hiding the non-idiomatic one.

[Declaration Attributes](#id468)[¶](#declaration-attributes "Link to this heading")
-----------------------------------------------------------------------------------

### [Owner](#id469)[¶](#owner "Link to this heading")

Supported Syntaxes[¶](#id68 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`gsl::Owner`

Yes

Note

This attribute is experimental and its effect on analysis is subject to change in a future version of clang.

The attribute `[[gsl::Owner(T)]]` applies to structs and classes that own an object of type `T`:

class \[\[gsl::Owner(int)\]\] IntOwner {
private:
  int value;
public:
  int \*getInt() { return &value; }
};

The argument `T` is optional and is ignored. This attribute may be used by analysis tools and has no effect on code generation. A `void` argument means that the class can own any type.

See [Pointer](#pointer) for an example.

### [Pointer](#id470)[¶](#pointer "Link to this heading")

Supported Syntaxes[¶](#id69 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`gsl::Pointer`

Yes

Note

This attribute is experimental and its effect on analysis is subject to change in a future version of clang.

The attribute `[[gsl::Pointer(T)]]` applies to structs and classes that behave like pointers to an object of type `T`:

class \[\[gsl::Pointer(int)\]\] IntPointer {
private:
  int \*valuePointer;
public:
  IntPointer(const IntOwner&);
  int \*getInt() { return valuePointer; }
};

The argument `T` is optional and is ignored. This attribute may be used by analysis tools and has no effect on code generation. A `void` argument means that the pointer can point to any type.

Example: When constructing an instance of a class annotated like this (a Pointer) from an instance of a class annotated with `[[gsl::Owner]]` (an Owner), then the analysis will consider the Pointer to point inside the Owner. When the Owner’s lifetime ends, it will consider the Pointer to be dangling.

int f() {
  IntPointer P(IntOwner{}); // P "points into" a temporary IntOwner object
  P.getInt(); // P is dangling
}

If a template class is annotated with `[[gsl::Owner]]`, and the first instantiated template argument is a pointer type (raw pointer, or `[[gsl::Pointer]]`), the analysis will consider the instantiated class as a container of the pointer. When constructing such an object from a GSL owner object, the analysis will assume that the container holds a pointer to the owner object. Consequently, when the owner object is destroyed, the pointer will be considered dangling.

int f() {
  std::vector<std::string\_view\> v \= {std::string()}; // v holds a dangling pointer.
  std::optional<std::string\_view\> o \= std::string(); // o holds a dangling pointer.
}

### [\_\_single\_inheritance, \_\_multiple\_inheritance, \_\_virtual\_inheritance](#id471)[¶](#single-inheritance-multiple-inheritance-virtual-inheritance "Link to this heading")

Supported Syntaxes[¶](#id70 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__single_inheritance`  
`__multiple_inheritance`  
`__virtual_inheritance`  
`__unspecified_inheritance`

This collection of keywords is enabled under `-fms-extensions` and controls the pointer-to-member representation used on `*-*-win32` targets.

The `*-*-win32` targets utilize a pointer-to-member representation which varies in size and alignment depending on the definition of the underlying class.

However, this is problematic when a forward declaration is only available and no definition has been made yet. In such cases, Clang is forced to utilize the most general representation that is available to it.

These keywords make it possible to use a pointer-to-member representation other than the most general one regardless of whether or not the definition will ever be present in the current translation unit.

This family of keywords belong between the `class-key` and `class-name`:

struct \_\_single\_inheritance S;
int S::\*i;
struct S {};

This keyword can be applied to class templates but only has an effect when used on full specializations:

template <typename T, typename U\> struct \_\_single\_inheritance A; // warning: inheritance model ignored on primary template
template <typename T\> struct \_\_multiple\_inheritance A<T, T\>; // warning: inheritance model ignored on partial specialization
template <> struct \_\_single\_inheritance A<int, float\>;

Note that choosing an inheritance model less general than strictly necessary is an error:

struct \_\_multiple\_inheritance S; // error: inheritance model does not match definition
int S::\*i;
struct S {};

### [asm](#id472)[¶](#asm "Link to this heading")

Supported Syntaxes[¶](#id71 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`asm`  
`__asm__`

This attribute can be used on a function or variable to specify its symbol name.

On some targets, all C symbols are prefixed by default with a single character, typically `_`. This was done historically to distinguish them from symbols used by other languages. (This prefix is also added to the standard Itanium C++ ABI prefix on “mangled” symbol names, so that e.g. on such targets the true symbol name for a C++ variable declared as `int cppvar;` would be `__Z6cppvar`; note the two underscores.) This prefix is _not_ added to the symbol names specified by the `asm` attribute; programmers wishing to match a C symbol name must compensate for this.

For example, consider the following C code:

int var1 asm("altvar") \= 1;  // "altvar" in symbol table.
int var2 \= 1; // "\_var2" in symbol table.

void func1(void) asm("altfunc");
void func1(void) {} // "altfunc" in symbol table.
void func2(void) {} // "\_func2" in symbol table.

Clang’s implementation of this attribute is compatible with GCC’s, [documented here](https://gcc.gnu.org/onlinedocs/gcc/Asm-Labels.html).

While it is possible to use this attribute to name a special symbol used internally by the compiler, such as an LLVM intrinsic, this is neither recommended nor supported and may cause the compiler to crash or miscompile. Users who wish to gain access to intrinsic behavior are strongly encouraged to request new builtin functions.

### [coro\_await\_elidable](#id473)[¶](#coro-await-elidable "Link to this heading")

Supported Syntaxes[¶](#id72 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`coro_await_elidable`

`clang::coro_await_elidable`

`clang::coro_await_elidable`

Yes

The `[[clang::coro_await_elidable]]` is a class attribute which can be applied to a coroutine return type. It provides a hint to the compiler to apply Heap Allocation Elision more aggressively.

When a coroutine function returns such a type, a direct call expression therein that returns a prvalue of a type attributed `[[clang::coro_await_elidable]]` is said to be under a safe elide context if one of the following is true: - it is the immediate right-hand side operand to a co\_await expression. - it is an argument to a `[[clang::coro_await_elidable_argument]]` parameter or parameter pack of another direct call expression under a safe elide context.

Do note that the safe elide context applies only to the call expression itself, and the context does not transitively include any of its subexpressions unless exceptional rules of `[[clang::coro_await_elidable_argument]]` apply.

The compiler performs heap allocation elision on call expressions under a safe elide context, if the callee is a coroutine.

Example:

class \[\[clang::coro\_await\_elidable\]\] Task { ... };

Task foo();
Task bar() {
  co\_await foo(); // foo()'s coroutine frame on this line is elidable
  auto t \= foo(); // foo()'s coroutine frame on this line is NOT elidable
  co\_await t;
}

Such elision replaces the heap allocated activation frame of the callee coroutine with a local variable within the enclosing braces in the caller’s stack frame. The local variable, like other variables in coroutines, may be collected into the coroutine frame, which may be allocated on the heap. The behavior is undefined if the caller coroutine is destroyed earlier than the callee coroutine.

### [coro\_await\_elidable\_argument](#id474)[¶](#coro-await-elidable-argument "Link to this heading")

Supported Syntaxes[¶](#id73 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`coro_await_elidable_argument`

`clang::coro_await_elidable_argument`

`clang::coro_await_elidable_argument`

Yes

The `[[clang::coro_await_elidable_argument]]` is a function parameter attribute. It works in conjunction with `[[clang::coro_await_elidable]]` to propagate a safe elide context to a parameter or parameter pack if the function is called under a safe elide context.

This is sometimes necessary on utility functions used to compose or modify the behavior of a callee coroutine.

Example:

template <typename T\>
class \[\[clang::coro\_await\_elidable\]\] Task { ... };

template <typename... T\>
class \[\[clang::coro\_await\_elidable\]\] WhenAll { ... };

// \`when\_all\` is a utility function that composes coroutines. It does not
// need to be a coroutine to propagate.
template <typename... T\>
WhenAll<T...\> when\_all(\[\[clang::coro\_await\_elidable\_argument\]\] Task<T\> tasks...);

Task<int\> foo();
Task<int\> bar();
Task<void\> example1() {
  // \`when\_all\`\`, \`foo\`\`, and \`bar\` are all elide safe because \`when\_all\` is
  // under a safe elide context and, thanks to the \[\[clang::coro\_await\_elidable\_argument\]\]
  // attribute, such context is propagated to foo and bar.
  co\_await when\_all(foo(), bar());
}

Task<void\> example2() {
  // \`when\_all\` and \`bar\` are elide safe. \`foo\` is not elide safe.
  auto f \= foo();
  co\_await when\_all(f, bar());
}

Task<void\> example3() {
  // None of the calls are elide safe.
  auto t \= when\_all(foo(), bar());
  co\_await t;
}

### [coro\_disable\_lifetimebound, coro\_lifetimebound](#id475)[¶](#coro-disable-lifetimebound-coro-lifetimebound "Link to this heading")

Supported Syntaxes[¶](#id74 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`coro_disable_lifetimebound`  
`coro_lifetimebound`

`clang::coro_disable_lifetimebound`  
`clang::coro_lifetimebound`

`clang::coro_disable_lifetimebound`  
`clang::coro_lifetimebound`

Yes

The `[[clang::coro_lifetimebound]]` is a class attribute which can be applied to a coroutine return type ([coro\_return\_type, coro\_wrapper](#coro-return-type-coro-wrapper)) (i.e. it should also be annotated with `[[clang::coro_return_type]]`).

All parameters of a function are considered to be lifetime bound if the function returns a coroutine return type (CRT) annotated with `[[clang::coro_lifetimebound]]`. This lifetime bound analysis can be disabled for a coroutine wrapper or a coroutine by annotating the function with `[[clang::coro_disable_lifetimebound]]` function attribute . See documentation of [lifetimebound](#lifetimebound) for details about lifetime bound analysis.

Reference parameters of a coroutine are susceptible to capturing references to temporaries or local variables.

For example,

task<int\> coro(const int& a) { co\_return a + 1; }
task<int\> dangling\_refs(int a) {
  // \`coro\` captures reference to a temporary. \`foo\` would now contain a dangling reference to \`a\`.
  auto foo \= coro(1);
  // \`coro\` captures reference to local variable \`a\` which is destroyed after the return.
  return coro(a);
}

Lifetime bound static analysis can be used to detect such instances when coroutines capture references which may die earlier than the coroutine frame itself. In the above example, if the CRT task is annotated with `[[clang::coro_lifetimebound]]`, then lifetime bound analysis would detect capturing reference to temporaries or return address of a local variable.

Both coroutines and coroutine wrappers are part of this analysis.

template <typename T\> struct \[\[clang::coro\_return\_type, clang::coro\_lifetimebound\]\] Task {
  using promise\_type \= some\_promise\_type;
};

Task<int\> coro(const int& a) { co\_return a + 1; }
\[\[clang::coro\_wrapper\]\] Task<int\> coro\_wrapper(const int& a, const int& b) {
  return a \> b ? coro(a) : coro(b);
}
Task<int\> temporary\_reference() {
  auto foo \= coro(1); // warning: capturing reference to a temporary which would die after the expression.

  int a \= 1;
  auto bar \= coro\_wrapper(a, 0); // warning: \`b\` captures reference to a temporary.

  co\_return co\_await coro(1); // fine.
}
\[\[clang::coro\_wrapper\]\] Task<int\> stack\_reference(int a) {
  return coro(a); // warning: returning address of stack variable \`a\`.
}

This analysis can be disabled for all calls to a particular function by annotating the function with function attribute `[[clang::coro_disable_lifetimebound]]`. For example, this could be useful for coroutine wrappers which accept reference parameters but do not pass them to the underlying coroutine or pass them by value.

Task<int\> coro(int a) { co\_return a + 1; }
\[\[clang::coro\_wrapper, clang::coro\_disable\_lifetimebound\]\] Task<int\> coro\_wrapper(const int& a) {
  return coro(a + 1);
}
void use() {
  auto task \= coro\_wrapper(1); // use of temporary is fine as the argument is not lifetime bound.
}

### [coro\_only\_destroy\_when\_complete](#id476)[¶](#coro-only-destroy-when-complete "Link to this heading")

Supported Syntaxes[¶](#id75 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`coro_only_destroy_when_complete`

`clang::coro_only_destroy_when_complete`

`clang::coro_only_destroy_when_complete`

Yes

The coro\_only\_destroy\_when\_complete attribute should be marked on a C++ class. The coroutines whose return type is marked with the attribute are assumed to be destroyed only after the coroutine has reached the final suspend point.

This is helpful for the optimizers to reduce the size of the destroy function for the coroutines.

For example,

A foo() {
  dtor d;
  co\_await something();
  dtor d1;
  co\_await something();
  dtor d2;
  co\_return 43;
}

The compiler may generate the following pseudocode:

void foo.destroy(foo.Frame \*frame) {
  switch(frame\->suspend\_index()) {
    case 1:
      frame\->d.~dtor();
      break;
    case 2:
      frame\->d.~dtor();
      frame\->d1.~dtor();
      break;
    case 3:
      frame\->d.~dtor();
      frame\->d1.~dtor();
      frame\->d2.~dtor();
      break;
    default: // coroutine completed or haven't started
      break;
  }

  frame\->promise.~promise\_type();
  delete frame;
}

The foo.destroy() function’s purpose is to release all of the resources initialized for the coroutine when it is destroyed in a suspended state. However, if the coroutine is only ever destroyed at the final suspend state, the rest of the conditions are superfluous.

The user can use the coro\_only\_destroy\_when\_complete attributo suppress generation of the other destruction cases, optimizing the above foo.destroy to:

void foo.destroy(foo.Frame \*frame) {
  frame\->promise.~promise\_type();
  delete frame;
}

### [coro\_return\_type, coro\_wrapper](#id477)[¶](#coro-return-type-coro-wrapper "Link to this heading")

Supported Syntaxes[¶](#id76 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`coro_return_type`  
`coro_wrapper`

`clang::coro_return_type`  
`clang::coro_wrapper`

`clang::coro_return_type`  
`clang::coro_wrapper`

Yes

The `[[clang::coro_return_type]]` attribute is used to help static analyzers to recognize coroutines from the function signatures.

The `coro_return_type` attribute should be marked on a C++ class to mark it as a **coroutine return type (CRT)**.

A function `R func(P1, .., PN)` has a coroutine return type (CRT) `R` if `R` is marked by `[[clang::coro_return_type]]` and `R` has a promise type associated to it (i.e., std::coroutine\_traits<R, P1, .., PN>::promise\_type is a valid promise type).

If the return type of a function is a `CRT` then the function must be a coroutine. Otherwise the program is invalid. It is allowed for a non-coroutine to return a `CRT` if the function is marked with `[[clang::coro_wrapper]]`.

The `[[clang::coro_wrapper]]` attribute should be marked on a C++ function to mark it as a **coroutine wrapper**. A coroutine wrapper is a function which returns a `CRT`, is not a coroutine itself and is marked with `[[clang::coro_wrapper]]`.

Clang will enforce that all functions that return a `CRT` are either coroutines or marked with `[[clang::coro_wrapper]]`. Clang will enforce this with an error.

From a language perspective, it is not possible to differentiate between a coroutine and a function returning a CRT by merely looking at the function signature.

Coroutine wrappers, in particular, are susceptible to capturing references to temporaries and other lifetime issues. This allows to avoid such lifetime issues with coroutine wrappers.

For example,

// This is a CRT.
template <typename T\> struct \[\[clang::coro\_return\_type\]\] Task {
  using promise\_type \= some\_promise\_type;
};

Task<int\> increment(int a) { co\_return a + 1; } // Fine. This is a coroutine.
Task<int\> foo() { return increment(1); } // Error. foo is not a coroutine.

// Fine for a coroutine wrapper to return a CRT.
\[\[clang::coro\_wrapper\]\] Task<int\> foo() { return increment(1); }

void bar() {
  // Invalid. This intantiates a function which returns a CRT but is not marked as
  // a coroutine wrapper.
  std::function<Task<int\>(int)\> f \= increment;
}

Note: `a_promise_type::get_return_object` is exempted from this analysis as it is a necessary implementation detail of any coroutine library.

### [deprecated](#id478)[¶](#deprecated "Link to this heading")

Supported Syntaxes[¶](#id77 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`deprecated`

`gnu::deprecated`  
`deprecated`

`gnu::deprecated`  
`deprecated`

`deprecated`

The `deprecated` attribute can be applied to a function, a variable, or a type. This is useful when identifying functions, variables, or types that are expected to be removed in a future version of a program.

Consider the function declaration for a hypothetical function `f`:

void f(void) \_\_attribute\_\_((deprecated("message", "replacement")));

When spelled as `__attribute__((deprecated))`, the deprecated attribute can have two optional string arguments. The first one is the message to display when emitting the warning; the second one enables the compiler to provide a Fix-It to replace the deprecated name with a new name. Otherwise, when spelled as `[[gnu::deprecated]]` or `[[deprecated]]`, the attribute can have one optional string argument which is the message to display when emitting the warning.

### [empty\_bases](#id479)[¶](#empty-bases "Link to this heading")

Supported Syntaxes[¶](#id78 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`empty_bases`

The empty\_bases attribute permits the compiler to utilize the empty-base-optimization more frequently. This attribute only applies to struct, class, and union types. It is only supported when using the Microsoft C++ ABI.

### [enum\_extensibility](#id480)[¶](#enum-extensibility "Link to this heading")

Supported Syntaxes[¶](#id79 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`enum_extensibility`

`clang::enum_extensibility`

`clang::enum_extensibility`

Yes

Attribute `enum_extensibility` is used to distinguish between enum definitions that are extensible and those that are not. The attribute can take either `closed` or `open` as an argument. `closed` indicates a variable of the enum type takes a value that corresponds to one of the enumerators listed in the enum definition or, when the enum is annotated with `flag_enum`, a value that can be constructed using values corresponding to the enumerators. `open` indicates a variable of the enum type can take any values allowed by the standard and instructs clang to be more lenient when issuing warnings.

enum \_\_attribute\_\_((enum\_extensibility(closed))) ClosedEnum {
  A0, A1
};

enum \_\_attribute\_\_((enum\_extensibility(open))) OpenEnum {
  B0, B1
};

enum \_\_attribute\_\_((enum\_extensibility(closed),flag\_enum)) ClosedFlagEnum {
  C0 \= 1 << 0, C1 \= 1 << 1
};

enum \_\_attribute\_\_((enum\_extensibility(open),flag\_enum)) OpenFlagEnum {
  D0 \= 1 << 0, D1 \= 1 << 1
};

void foo1() {
  enum ClosedEnum ce;
  enum OpenEnum oe;
  enum ClosedFlagEnum cfe;
  enum OpenFlagEnum ofe;

  ce \= A1;           // no warnings
  ce \= 100;          // warning issued
  oe \= B1;           // no warnings
  oe \= 100;          // no warnings
  cfe \= C0 | C1;     // no warnings
  cfe \= C0 | C1 | 4; // warning issued
  ofe \= D0 | D1;     // no warnings
  ofe \= D0 | D1 | 4; // no warnings
}

### [external\_source\_symbol](#id481)[¶](#external-source-symbol "Link to this heading")

Supported Syntaxes[¶](#id80 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`external_source_symbol`

`clang::external_source_symbol`

`clang::external_source_symbol`

Yes

The `external_source_symbol` attribute specifies that a declaration originates from an external source and describes the nature of that source.

The fact that Clang is capable of recognizing declarations that were defined externally can be used to provide better tooling support for mixed-language projects or projects that rely on auto-generated code. For instance, an IDE that uses Clang and that supports mixed-language projects can use this attribute to provide a correct ‘jump-to-definition’ feature. For a concrete example, consider a protocol that’s defined in a Swift file:

@objc public protocol SwiftProtocol {
  func method()
}

This protocol can be used from Objective-C code by including a header file that was generated by the Swift compiler. The declarations in that header can use the `external_source_symbol` attribute to make Clang aware of the fact that `SwiftProtocol` actually originates from a Swift module:

\_\_attribute\_\_((external\_source\_symbol(language\="Swift",defined\_in\="module")))
@protocol SwiftProtocol
@required
\- (void) method;
@end

Consequently, when ‘jump-to-definition’ is performed at a location that references `SwiftProtocol`, the IDE can jump to the original definition in the Swift source file rather than jumping to the Objective-C declaration in the auto-generated header file.

The `external_source_symbol` attribute is a comma-separated list that includes clauses that describe the origin and the nature of the particular declaration. Those clauses can be:

language=_string-literal_

The name of the source language in which this declaration was defined.

defined\_in=_string-literal_

The name of the source container in which the declaration was defined. The exact definition of source container is language-specific, e.g. Swift’s source containers are modules, so `defined_in` should specify the Swift module name.

USR=_string-literal_

String that specifies a unified symbol resolution (USR) value for this declaration. USR string uniquely identifies this particular declaration, and is typically used when constructing an index of a codebase. The USR value in this attribute is expected to be generated by an external compiler that compiled the native declaration using its original source language. The exact format of the USR string and its other attributes are determined by the specification of this declaration’s source language. When not specified, Clang’s indexer will use the Clang USR for this symbol. User can query to see if Clang supports the use of the `USR` clause in the `external_source_symbol` attribute with `__has_attribute(external_source_symbol) >= 20230206`.

generated\_declaration

This declaration was automatically generated by some tool.

The clauses can be specified in any order. The clauses that are listed above are all optional, but the attribute has to have at least one clause.

### [flag\_enum](#id482)[¶](#flag-enum "Link to this heading")

Supported Syntaxes[¶](#id81 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`flag_enum`

`clang::flag_enum`

`clang::flag_enum`

Yes

This attribute can be added to an enumerator to signal to the compiler that it is intended to be used as a flag type. This will cause the compiler to assume that the range of the type includes all of the values that you can get by manipulating bits of the enumerator when issuing warnings.

### [grid\_constant](#id483)[¶](#grid-constant "Link to this heading")

Supported Syntaxes[¶](#id82 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`grid_constant`

`__grid_constant__`

Yes

The `__grid_constant__` attribute can be applied to a `const`\-qualified kernel function argument and allows compiler to take the address of that argument without making a copy. The argument applies to sm\_70 or newer GPUs, during compilation with CUDA-11.7(PTX 7.7) or newer, and is ignored otherwise.

### [layout\_version](#id484)[¶](#layout-version "Link to this heading")

Supported Syntaxes[¶](#id83 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`layout_version`

The layout\_version attribute requests that the compiler utilize the class layout rules of a particular compiler version. This attribute only applies to struct, class, and union types. It is only supported when using the Microsoft C++ ABI.

### [lto\_visibility\_public](#id485)[¶](#lto-visibility-public "Link to this heading")

Supported Syntaxes[¶](#id84 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`lto_visibility_public`

`clang::lto_visibility_public`

`clang::lto_visibility_public`

Yes

See [LTO Visibility](https://clang.llvm.org/docs/LTOVisibility.html).

### [managed](#id486)[¶](#managed "Link to this heading")

Supported Syntaxes[¶](#id85 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`managed`

`__managed__`

Yes

The `__managed__` attribute can be applied to a global variable declaration in HIP. A managed variable is emitted as an undefined global symbol in the device binary and is registered by `__hipRegisterManagedVariable` in init functions. The HIP runtime allocates managed memory and uses it to define the symbol when loading the device binary. A managed variable can be accessed in both device and host code.

### [no\_init\_all](#id487)[¶](#no-init-all "Link to this heading")

Supported Syntaxes[¶](#id86 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_init_all`

The `__declspec(no_init_all)` attribute disables the automatic initialization that the [\-ftrivial-auto-var-init](https://clang.llvm.org/docs/ClangCommandLineReference.html#cmdoption-clang-ftrivial-auto-var-init) flag would have applied to locals in a marked function, or instances of a marked type. Note that this attribute has no effect for locals that are automatically initialized without the [\-ftrivial-auto-var-init](https://clang.llvm.org/docs/ClangCommandLineReference.html#cmdoption-clang-ftrivial-auto-var-init) flag.

### [no\_specializations](#id488)[¶](#no-specializations "Link to this heading")

Supported Syntaxes[¶](#id87 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_specializations`

`clang::no_specializations`

`[[clang::no_specializations]]` can be applied to function, class, or variable templates which should not be explicitly specialized by users. This is primarily used to diagnose user specializations of standard library type traits.

### [nonstring](#id489)[¶](#nonstring "Link to this heading")

Supported Syntaxes[¶](#id88 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nonstring`

`gnu::nonstring`

`gnu::nonstring`

Yes

The `nonstring` attribute can be applied to the declaration of a variable or a field whose type is a character pointer or character array to specify that the buffer is not intended to behave like a null-terminated string. This will silence diagnostics with code like:

char BadStr\[3\] \= "foo"; // No space for the null terminator, diagnosed
\_\_attribute\_\_((nonstring)) char NotAStr\[3\] \= "foo"; // Not diagnosed

### [novtable](#id490)[¶](#novtable "Link to this heading")

Supported Syntaxes[¶](#id89 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`novtable`

This attribute can be added to a class declaration or definition to signal to the compiler that constructors and destructors will not reference the virtual function table. It is only supported when using the Microsoft C++ ABI.

### [ns\_error\_domain](#id491)[¶](#ns-error-domain "Link to this heading")

Supported Syntaxes[¶](#id90 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ns_error_domain`

Yes

In Cocoa frameworks in Objective-C, one can group related error codes in enums and categorize these enums with error domains.

The `ns_error_domain` attribute indicates a global `NSString` or `CFString` constant representing the error domain that an error code belongs to. For pointer uniqueness and code size this is a constant symbol, not a literal.

The domain and error code need to be used together. The `ns_error_domain` attribute links error codes to their domain at the source level.

This metadata is useful for documentation purposes, for static analysis, and for improving interoperability between Objective-C and Swift. It is not used for code generation in Objective-C.

For example:

> #define NS\_ERROR\_ENUM(\_type, \_name, \_domain)  \\
>   enum \_name : \_type \_name; enum \_\_attribute\_\_((ns\_error\_domain(\_domain))) \_name : \_type
> 
> extern NSString \*const MyErrorDomain;
> typedef NS\_ERROR\_ENUM(unsigned char, MyErrorEnum, MyErrorDomain) {
>   MyErrFirst,
>   MyErrSecond,
> };

### [objc\_boxable](#id492)[¶](#objc-boxable "Link to this heading")

Supported Syntaxes[¶](#id91 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_boxable`

`clang::objc_boxable`

`clang::objc_boxable`

Yes

Structs and unions marked with the `objc_boxable` attribute can be used with the Objective-C boxed expression syntax, `@(...)`.

**Usage**: `__attribute__((objc_boxable))`. This attribute can only be placed on a declaration of a trivially-copyable struct or union:

struct \_\_attribute\_\_((objc\_boxable)) some\_struct {
  int i;
};
union \_\_attribute\_\_((objc\_boxable)) some\_union {
  int i;
  float f;
};
typedef struct \_\_attribute\_\_((objc\_boxable)) \_some\_struct some\_struct;

// ...

some\_struct ss;
NSValue \*boxed \= @(ss);

### [objc\_direct](#id493)[¶](#objc-direct "Link to this heading")

Supported Syntaxes[¶](#id92 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_direct`

`clang::objc_direct`

`clang::objc_direct`

Yes

The `objc_direct` attribute can be used to mark an Objective-C method as being _direct_. A direct method is treated statically like an ordinary method, but dynamically it behaves more like a C function. This lowers some of the costs associated with the method but also sacrifices some of the ordinary capabilities of Objective-C methods.

A message send of a direct method calls the implementation directly, as if it were a C function, rather than using ordinary Objective-C method dispatch. This is substantially faster and potentially allows the implementation to be inlined, but it also means the method cannot be overridden in subclasses or replaced dynamically, as ordinary Objective-C methods can.

Furthermore, a direct method is not listed in the class’s method lists. This substantially reduces the code-size overhead of the method but also means it cannot be called dynamically using ordinary Objective-C method dispatch at all; in particular, this means that it cannot override a superclass method or satisfy a protocol requirement.

Because a direct method cannot be overridden, it is an error to perform a `super` message send of one.

Although a message send of a direct method causes the method to be called directly as if it were a C function, it still obeys Objective-C semantics in other ways:

*   If the receiver is `nil`, the message send does nothing and returns the zero value for the return type.
    
*   A message send of a direct class method will cause the class to be initialized, including calling the `+initialize` method if present.
    
*   The implicit `_cmd` parameter containing the method’s selector is still defined. In order to minimize code-size costs, the implementation will not emit a reference to the selector if the parameter is unused within the method.
    

Symbols for direct method implementations are implicitly given hidden visibility, meaning that they can only be called within the same linkage unit.

It is an error to do any of the following:

*   declare a direct method in a protocol,
    
*   declare an override of a direct method with a method in a subclass,
    
*   declare an override of a non-direct method with a direct method in a subclass,
    
*   declare a method with different directness in different class interfaces, or
    
*   implement a non-direct method (as declared in any class interface) with a direct method.
    

If any of these rules would be violated if every method defined in an `@implementation` within a single linkage unit were declared in an appropriate class interface, the program is ill-formed with no diagnostic required. If a violation of this rule is not diagnosed, behavior remains well-defined; this paragraph is simply reserving the right to diagnose such conflicts in the future, not to treat them as undefined behavior.

Additionally, Clang will warn about any `@selector` expression that names a selector that is only known to be used for direct methods.

For the purpose of these rules, a “class interface” includes a class’s primary `@interface` block, its class extensions, its categories, its declared protocols, and all the class interfaces of its superclasses.

An Objective-C property can be declared with the `direct` property attribute. If a direct property declaration causes an implicit declaration of a getter or setter method (that is, if the given method is not explicitly declared elsewhere), the method is declared to be direct.

Some programmers may wish to make many methods direct at once. In order to simplify this, the `objc_direct_members` attribute is provided; see its documentation for more information.

### [objc\_direct\_members](#id494)[¶](#objc-direct-members "Link to this heading")

Supported Syntaxes[¶](#id93 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_direct_members`

`clang::objc_direct_members`

`clang::objc_direct_members`

Yes

The `objc_direct_members` attribute can be placed on an Objective-C `@interface` or `@implementation` to mark that methods declared therein should be considered direct by default. See the documentation for `objc_direct` for more information about direct methods.

When `objc_direct_members` is placed on an `@interface` block, every method in the block is considered to be declared as direct. This includes any implicit method declarations introduced by property declarations. If the method redeclares a non-direct method, the declaration is ill-formed, exactly as if the method was annotated with the `objc_direct` attribute.

When `objc_direct_members` is placed on an `@implementation` block, methods defined in the block are considered to be declared as direct unless they have been previously declared as non-direct in any interface of the class. This includes the implicit method definitions introduced by synthesized properties, including auto-synthesized properties.

### [objc\_non\_runtime\_protocol](#id495)[¶](#objc-non-runtime-protocol "Link to this heading")

Supported Syntaxes[¶](#id94 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_non_runtime_protocol`

`clang::objc_non_runtime_protocol`

`clang::objc_non_runtime_protocol`

Yes

The `objc_non_runtime_protocol` attribute can be used to mark that an Objective-C protocol is only used during static type-checking and doesn’t need to be represented dynamically. This avoids several small code-size and run-time overheads associated with handling the protocol’s metadata. A non-runtime protocol cannot be used as the operand of a `@protocol` expression, and dynamic attempts to find it with `objc_getProtocol` will fail.

If a non-runtime protocol inherits from any ordinary protocols, classes and derived protocols that declare conformance to the non-runtime protocol will dynamically list their conformance to those bare protocols.

### [objc\_nonlazy\_class](#id496)[¶](#objc-nonlazy-class "Link to this heading")

Supported Syntaxes[¶](#id95 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_nonlazy_class`

`clang::objc_nonlazy_class`

`clang::objc_nonlazy_class`

Yes

This attribute can be added to an Objective-C `@interface` or `@implementation` declaration to add the class to the list of non-lazily initialized classes. A non-lazy class will be initialized eagerly when the Objective-C runtime is loaded. This is required for certain system classes which have instances allocated in non-standard ways, such as the classes for blocks and constant strings. Adding this attribute is essentially equivalent to providing a trivial `+load` method but avoids the (fairly small) load-time overheads associated with defining and calling such a method.

### [objc\_runtime\_name](#id497)[¶](#objc-runtime-name "Link to this heading")

Supported Syntaxes[¶](#id96 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_runtime_name`

`clang::objc_runtime_name`

`clang::objc_runtime_name`

Yes

By default, the Objective-C interface or protocol identifier is used in the metadata name for that object. The `objc_runtime_name` attribute allows annotated interfaces or protocols to use the specified string argument in the object’s metadata name instead of the default name.

**Usage**: `__attribute__((objc_runtime_name("MyLocalName")))`. This attribute can only be placed before an @protocol or @interface declaration:

\_\_attribute\_\_((objc\_runtime\_name("MyLocalName")))
@interface Message
@end

### [objc\_runtime\_visible](#id498)[¶](#objc-runtime-visible "Link to this heading")

Supported Syntaxes[¶](#id97 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_runtime_visible`

`clang::objc_runtime_visible`

`clang::objc_runtime_visible`

Yes

This attribute specifies that the Objective-C class to which it applies is visible to the Objective-C runtime but not to the linker. Classes annotated with this attribute cannot be subclassed and cannot have categories defined for them.

### [objc\_subclassing\_restricted](#id499)[¶](#objc-subclassing-restricted "Link to this heading")

Supported Syntaxes[¶](#id98 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_subclassing_restricted`

`clang::objc_subclassing_restricted`

`clang::objc_subclassing_restricted`

Yes

This attribute can be added to an Objective-C `@interface` declaration to ensure that this class cannot be subclassed.

### [preferred\_name](#id500)[¶](#preferred-name "Link to this heading")

Supported Syntaxes[¶](#id99 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preferred_name`

`clang::preferred_name`

The `preferred_name` attribute can be applied to a class template, and specifies a preferred way of naming a specialization of the template. The preferred name will be used whenever the corresponding template specialization would otherwise be printed in a diagnostic or similar context.

The preferred name must be a typedef or type alias declaration that refers to a specialization of the class template (not including any type qualifiers). In general this requires the template to be declared at least twice. For example:

template<typename T\> struct basic\_string;
using string \= basic\_string<char\>;
using wstring \= basic\_string<wchar\_t\>;
template<typename T\> struct \[\[clang::preferred\_name(string),
                              clang::preferred\_name(wstring)\]\] basic\_string {
  // ...
};

Note that the `preferred_name` attribute will be ignored when the compiler writes a C++20 Module interface now. This is due to a compiler issue ([https://github.com/llvm/llvm-project/issues/56490](https://github.com/llvm/llvm-project/issues/56490)) that blocks users to modularize declarations with preferred\_name. This is intended to be fixed in the future.

### [randomize\_layout, no\_randomize\_layout](#id501)[¶](#randomize-layout-no-randomize-layout "Link to this heading")

Supported Syntaxes[¶](#id100 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_randomize_layout`  
`randomize_layout`

`gnu::no_randomize_layout`  
`gnu::randomize_layout`

`gnu::no_randomize_layout`  
`gnu::randomize_layout`

Yes

The attribute `randomize_layout`, when attached to a C structure, selects it for structure layout field randomization; a compile-time hardening technique. A “seed” value, is specified via the `-frandomize-layout-seed=` command line flag. For example:

SEED\=\`od \-A n \-t x8 \-N 32 /dev/urandom | tr \-d ' \\n'\`
make ... CFLAGS\="-frandomize-layout-seed=$SEED" ...

You can also supply the seed in a file with `-frandomize-layout-seed-file=`. For example:

od \-A n \-t x8 \-N 32 /dev/urandom | tr \-d ' \\n' \> /tmp/seed\_file.txt
make ... CFLAGS\="-frandomize-layout-seed-file=/tmp/seed\_file.txt" ...

The randomization is deterministic based for a given seed, so the entire program should be compiled with the same seed, but keep the seed safe otherwise.

The attribute `no_randomize_layout`, when attached to a C structure, instructs the compiler that this structure should not have its field layout randomized.

### [selectany](#id502)[¶](#selectany "Link to this heading")

Supported Syntaxes[¶](#id101 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`selectany`

`gnu::selectany`

`gnu::selectany`

`selectany`

This attribute appertains to a global symbol, causing it to have a weak definition ( [linkonce](https://llvm.org/docs/LangRef.html#linkage-types) ), allowing the linker to select any definition.

For more information see [gcc documentation](https://gcc.gnu.org/onlinedocs/gcc-7.2.0/gcc/Microsoft-Windows-Variable-Attributes.html) or [msvc documentation](https://docs.microsoft.com/pl-pl/cpp/cpp/selectany).

### [transparent\_union](#id503)[¶](#transparent-union "Link to this heading")

Supported Syntaxes[¶](#id102 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`transparent_union`

`gnu::transparent_union`

`gnu::transparent_union`

This attribute can be applied to a union to change the behavior of calls to functions that have an argument with a transparent union type. The compiler behavior is changed in the following manner:

*   A value whose type is any member of the transparent union can be passed as an argument without the need to cast that value.
    
*   The argument is passed to the function using the calling convention of the first member of the transparent union. Consequently, all the members of the transparent union should have the same calling convention as its first member.
    

Transparent unions are not supported in C++.

### [trivial\_abi](#id504)[¶](#trivial-abi "Link to this heading")

Supported Syntaxes[¶](#id103 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`trivial_abi`

`clang::trivial_abi`

Yes

The `trivial_abi` attribute can be applied to a C++ class, struct, or union. It instructs the compiler to pass and return the type using the C ABI for the underlying type when the type would otherwise be considered non-trivial for the purpose of calls. A class annotated with `trivial_abi` can have non-trivial destructors or copy/move constructors without automatically becoming non-trivial for the purposes of calls. For example:

> // A is trivial for the purposes of calls because \`\`trivial\_abi\`\` makes the
> // user-provided special functions trivial.
> struct \_\_attribute\_\_((trivial\_abi)) A {
>   ~A();
>   A(const A &);
>   A(A &&);
>   int x;
> };
> 
> // B's destructor and copy/move constructor are considered trivial for the
> // purpose of calls because A is trivial.
> struct B {
>   A a;
> };

If a type is trivial for the purposes of calls, has a non-trivial destructor, and is passed as an argument by value, the convention is that the callee will destroy the object before returning. The lifetime of the copy of the parameter in the caller ends without a destructor call when the call begins.

If a type is trivial for the purpose of calls, it is assumed to be trivially relocatable for the purpose of `__is_trivially_relocatable` and `__builtin_is_cpp_trivially_relocatable`. When a type marked with `[[trivial_abi]]` is used as a function argument, the compiler may omit the call to the copy constructor. Thus, side effects of the copy constructor are potentially not performed. For example, objects that contain pointers to themselves or otherwise depend on their address (or the address or their subobjects) should not be declared `[[trivial_abi]]`.

Attribute `trivial_abi` has no effect in the following cases:

*   The class directly declares a virtual base or virtual methods.
    
*   Copy constructors and move constructors of the class are all deleted.
    
*   The class has a base class that is non-trivial for the purposes of calls.
    
*   The class has a non-static data member whose type is non-trivial for the purposes of calls, which includes:
    
    *   classes that are non-trivial for the purposes of calls
        
    *   \_\_weak-qualified types in Objective-C++
        
    *   arrays of any of the above
        

### [using\_if\_exists](#id505)[¶](#using-if-exists "Link to this heading")

Supported Syntaxes[¶](#id104 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`using_if_exists`

`clang::using_if_exists`

The `using_if_exists` attribute applies to a using-declaration. It allows programmers to import a declaration that potentially does not exist, instead deferring any errors to the point of use. For instance:

namespace empty\_namespace {};
\_\_attribute\_\_((using\_if\_exists))
using empty\_namespace::does\_not\_exist; // no error!

does\_not\_exist x; // error: use of unresolved 'using\_if\_exists'

The C++ spelling of the attribute (\[\[clang::using\_if\_exists\]\]) is also supported as a clang extension, since ISO C++ doesn’t support attributes in this position. If the entity referred to by the using-declaration is found by name lookup, the attribute has no effect. This attribute is useful for libraries (primarily, libc++) that wish to redeclare a set of declarations in another namespace, when the availability of those declarations is difficult or impossible to detect at compile time with the preprocessor.

### [weak](#id506)[¶](#weak "Link to this heading")

Supported Syntaxes[¶](#id105 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`weak`

`gnu::weak`

`gnu::weak`

Yes

In supported output formats the `weak` attribute can be used to specify that a variable or function should be emitted as a symbol with `weak` (if a definition) or `extern_weak` (if a declaration of an external symbol) [linkage](https://llvm.org/docs/LangRef.html#linkage-types).

If there is a non-weak definition of the symbol the linker will select that over the weak. They must have same type and alignment (variables must also have the same size), but may have a different value.

If there are multiple weak definitions of same symbol, but no non-weak definition, they should have same type, size, alignment and value, the linker will select one of them (see also [selectany](#selectany) attribute).

If the `weak` attribute is applied to a `const` qualified variable definition that variable is no longer consider a compiletime constant as its value can change during linking (or dynamic linking). This means that it can e.g no longer be part of an initializer expression.

const int ANSWER \_\_attribute\_\_ ((weak)) \= 42;

/\* This function may be replaced link-time \*/
\_\_attribute\_\_ ((weak)) void debug\_log(const char \*msg)
{
    fprintf(stderr, "DEBUG: %s\\n", msg);
}

int main(int argc, const char \*\*argv)
{
    debug\_log ("Starting up...");

    /\* This may print something else than "6 \* 7 = 42",
       if there is a non-weak definition of "ANSWER" in
       an object linked in \*/
    printf("6 \* 7 = %d\\n", ANSWER);

    return 0;
 }

If an external declaration is marked weak and that symbol does not exist during linking (possibly dynamic) the address of the symbol will evaluate to NULL.

void may\_not\_exist(void) \_\_attribute\_\_ ((weak));

int main(int argc, const char \*\*argv)
{
    if (may\_not\_exist) {
        may\_not\_exist();
    } else {
        printf("Function did not exist\\n");
    }
    return 0;
}

[Field Attributes](#id507)[¶](#field-attributes "Link to this heading")
-----------------------------------------------------------------------

### [counted\_by, counted\_by\_or\_null, sized\_by, sized\_by\_or\_null](#id508)[¶](#counted-by-counted-by-or-null-sized-by-sized-by-or-null "Link to this heading")

Supported Syntaxes[¶](#id106 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`counted_by`  
`counted_by_or_null`  
`sized_by`  
`sized_by_or_null`

`clang::counted_by`  
`clang::counted_by_or_null`  
`clang::sized_by`  
`clang::sized_by_or_null`

`clang::counted_by`  
`clang::counted_by_or_null`  
`clang::sized_by`  
`clang::sized_by_or_null`

Clang supports the `counted_by` attribute on the flexible array member of a structure in C. The argument for the attribute is the name of a field member holding the count of elements in the flexible array. This information can be used to improve the results of the array bound sanitizer and the `__builtin_dynamic_object_size` builtin. The `count` field member must be within the same non-anonymous, enclosing struct as the flexible array member.

This example specifies that the flexible array member `array` has the number of elements allocated for it in `count`:

struct bar;

struct foo {
  size\_t count;
  char other;
  struct bar \*array\[\] \_\_attribute\_\_((counted\_by(count)));
};

This establishes a relationship between `array` and `count`. Specifically, `array` must have at least `count` number of elements available. It’s the user’s responsibility to ensure that this relationship is maintained through changes to the structure.

In the following example, the allocated array erroneously has fewer elements than what’s specified by `p->count`. This would result in an out-of-bounds access not being detected.

#define SIZE\_INCR 42

struct foo \*p;

void foo\_alloc(size\_t count) {
  p \= malloc(MAX(sizeof(struct foo),
                 offsetof(struct foo, array\[0\]) + count \* sizeof(struct bar \*)));
  p\->count \= count + SIZE\_INCR;
}

The next example updates `p->count`, but breaks the relationship requirement that `p->array` must have at least `p->count` number of elements available:

#define SIZE\_INCR 42

struct foo \*p;

void foo\_alloc(size\_t count) {
  p \= malloc(MAX(sizeof(struct foo),
                 offsetof(struct foo, array\[0\]) + count \* sizeof(struct bar \*)));
  p\->count \= count;
}

void use\_foo(int index, int val) {
  p\->count += SIZE\_INCR + 1; /\* 'count' is now larger than the number of elements of 'array'. \*/
  p\->array\[index\] \= val;     /\* The sanitizer can't properly check this access. \*/
}

In this example, an update to `p->count` maintains the relationship requirement:

void use\_foo(int index, int val) {
  if (p\->count \== 0)
    return;
  \--p\->count;
  p\->array\[index\] \= val;
}

### [no\_unique\_address](#id509)[¶](#no-unique-address "Link to this heading")

Supported Syntaxes[¶](#id107 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_unique_address`  
`msvc::no_unique_address`

The `no_unique_address` attribute allows tail padding in a non-static data member to overlap other members of the enclosing class (and in the special case when the type is empty, permits it to fully overlap other members). The field is laid out as if a base class were encountered at the corresponding point within the class (except that it does not share a vptr with the enclosing object).

Example usage:

template<typename T, typename Alloc\> struct my\_vector {
  T \*p;
  \[\[no\_unique\_address\]\] Alloc alloc;
  // ...
};
static\_assert(sizeof(my\_vector<int, std::allocator<int\>>) \== sizeof(int\*));

`[[no_unique_address]]` is a standard C++20 attribute. Clang supports its use in C++11 onwards.

On MSVC targets, `[[no_unique_address]]` is ignored; use `[[msvc::no_unique_address]]` instead. Currently there is no guarantee of ABI compatibility or stability with MSVC.

### [preferred\_type](#id510)[¶](#preferred-type "Link to this heading")

Supported Syntaxes[¶](#id108 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preferred_type`

`clang::preferred_type`

`clang::preferred_type`

This attribute allows adjusting the type of a bit-field in debug information. This can be helpful when a bit-field is intended to store an enumeration value, but has to be specified as having the enumeration’s underlying type in order to facilitate compiler optimizations or bit-field packing behavior. Normally, the underlying type is what is emitted in debug information, which can make it hard for debuggers to know to map a bit-field’s value back to a particular enumeration.

enum Colors { Red, Green, Blue };

struct S {
  \[\[clang::preferred\_type(Colors)\]\] unsigned ColorVal : 2;
  \[\[clang::preferred\_type(bool)\]\] unsigned UseAlternateColorSpace : 1;
} s \= { Green, false };

Without the attribute, a debugger is likely to display the value `1` for `ColorVal` and `0` for `UseAlternateColorSpace`. With the attribute, the debugger may now display `Green` and `false` instead.

This can be used to map a bit-field to an arbitrary type that isn’t integral or an enumeration type. For example:

struct A {
  short a1;
  short a2;
};

struct B {
  \[\[clang::preferred\_type(A)\]\] unsigned b1 : 32 \= 0x000F'000C;
};

will associate the type `A` with the `b1` bit-field and is intended to display something like this in the debugger:

Process 2755547 stopped
\* thread #1, name = 'test-preferred-', stop reason = step in
    frame #0: 0x0000555555555148 test-preferred-type\`main at test.cxx:13:14
   10   int main()
   11   {
   12       B b;
-> 13       return b.b1;
   14   }
(lldb) v -T
(B) b = {
  (A:32) b1 = {
    (short) a1 = 12
    (short) a2 = 15
  }
}

Note that debuggers may not be able to handle more complex mappings, and so this usage is debugger-dependent.

### [require\_explicit\_initialization](#id511)[¶](#require-explicit-initialization "Link to this heading")

Supported Syntaxes[¶](#id109 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`require_explicit_initialization`

`clang::require_explicit_initialization`

`clang::require_explicit_initialization`

Yes

The `clang::require_explicit_initialization` attribute indicates that a field of an aggregate must be initialized explicitly by the user when an object of the aggregate type is constructed. The attribute supports both C and C++, but its usage is invalid on non-aggregates.

Note that this attribute is _not_ a memory safety feature, and is _not_ intended to guard against use of uninitialized memory.

Rather, it is intended for use in “parameter-objects”, used to simulate, for example, the passing of named parameters. Except inside unevaluated contexts, the attribute generates a warning when explicit initializers for such variables are not provided (this occurs regardless of whether any in-class field initializers exist):

struct Buffer {
  void \*address \[\[clang::require\_explicit\_initialization\]\];
  size\_t length \[\[clang::require\_explicit\_initialization\]\] \= 0;
};

struct ArrayIOParams {
  size\_t count \[\[clang::require\_explicit\_initialization\]\];
  size\_t element\_size \[\[clang::require\_explicit\_initialization\]\];
  int flags \= 0;
};

size\_t ReadArray(FILE \*file, struct Buffer buffer,
                 struct ArrayIOParams params);

int main() {
  unsigned int buf\[512\];
  ReadArray(stdin, {
    buf
    // warning: field 'length' is not explicitly initialized
  }, {
    .count \= sizeof(buf) / sizeof(\*buf),
    // warning: field 'element\_size' is not explicitly initialized
    // (Note that a missing initializer for 'flags' is not diagnosed, because
    // the field is not marked as requiring explicit initialization.)
  });
}

[Function Attributes](#id512)[¶](#function-attributes "Link to this heading")
-----------------------------------------------------------------------------

### [#pragma omp declare simd](#id513)[¶](#pragma-omp-declare-simd "Link to this heading")

Supported Syntaxes[¶](#id110 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

\`\` declare simd\`\`

The `declare simd` construct can be applied to a function to enable the creation of one or more versions that can process multiple arguments using SIMD instructions from a single invocation in a SIMD loop. The `declare simd` directive is a declarative directive. There may be multiple `declare simd` directives for a function. The use of a `declare simd` construct on a function enables the creation of SIMD versions of the associated function that can be used to process multiple arguments from a single invocation from a SIMD loop concurrently. The syntax of the `declare simd` construct is as follows:

> #pragma omp declare simd \[clause\[\[,\] clause\] ...\] new-line
> \[#pragma omp declare simd \[clause\[\[,\] clause\] ...\] new-line\]
> \[...\]
> function definition or declaration

where clause is one of the following:

> simdlen(length)
> linear(argument-list\[:constant-linear-step\])
> aligned(argument-list\[:alignment\])
> uniform(argument-list)
> inbranch
> notinbranch

### [#pragma omp declare target](#id514)[¶](#pragma-omp-declare-target "Link to this heading")

Supported Syntaxes[¶](#id111 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

\`\` declare target\`\`

The `declare target` directive specifies that variables and functions are mapped to a device for OpenMP offload mechanism.

The syntax of the declare target directive is as follows:

> #pragma omp declare target new-line
> declarations\-definition\-seq
> #pragma omp end declare target new-line

or

> #pragma omp declare target (extended-list) new-line

or

> #pragma omp declare target clause\[ \[,\] clause ... \] new-line

where clause is one of the following:

> to(extended\-list)
> link(list)
> device\_type(host | nohost | any)

### [#pragma omp declare variant](#id515)[¶](#pragma-omp-declare-variant "Link to this heading")

Supported Syntaxes[¶](#id112 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

\`\` declare variant\`\`

The `declare variant` directive declares a specialized variant of a base function and specifies the context in which that specialized variant is used. The declare variant directive is a declarative directive. The syntax of the `declare variant` construct is as follows:

> #pragma omp declare variant(variant-func-id) clause new-line
> \[#pragma omp declare variant(variant-func-id) clause new-line\]
> \[...\]
> function definition or declaration

where clause is one of the following:

> match(context-selector-specification)

and where `variant-func-id` is the name of a function variant that is either a base language identifier or, for C++, a template-id.

Clang provides the following context selector extensions, used via `implementation={extension(EXTENSION)}`:

> match\_all
> match\_any
> match\_none
> disable\_implicit\_base
> allow\_templates
> bind\_to\_declaration

The match extensions change when the _entire_ context selector is considered a match for an OpenMP context. The default is `all`, with `none` no trait in the selector is allowed to be in the OpenMP context, with `any` a single trait in both the selector and OpenMP context is sufficient. Only a single match extension trait is allowed per context selector. The disable extensions remove default effects of the `begin declare variant` applied to a definition. If `disable_implicit_base` is given, we will not introduce an implicit base function for a variant if no base function was found. The variant is still generated but will never be called, due to the absence of a base function and consequently calls to a base function. The allow extensions change when the `begin declare variant` effect is applied to a definition. If `allow_templates` is given, template function definitions are considered as specializations of existing or assumed template declarations with the same name. The template parameters for the base functions are used to instantiate the specialization. If `bind_to_declaration` is given, apply the same variant rules to function declarations. This allows the user to override declarations with only a function declaration.

### [RootSignature](#id516)[¶](#rootsignature "Link to this heading")

Supported Syntaxes[¶](#id113 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

The `RootSignature` attribute applies to HLSL entry functions to define what types of resources are bound to the graphics pipeline.

For details about the use and specification of Root Signatures please see here: [https://learn.microsoft.com/en-us/windows/win32/direct3d12/root-signatures](https://learn.microsoft.com/en-us/windows/win32/direct3d12/root-signatures)

### [WaveSize](#id517)[¶](#wavesize "Link to this heading")

Supported Syntaxes[¶](#id114 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

The `WaveSize` attribute specify a wave size on a shader entry point in order to indicate either that a shader depends on or strongly prefers a specific wave size. There’re 2 versions of the attribute: `WaveSize` and `RangedWaveSize`. The syntax for `WaveSize` is:

\`\`\[WaveSize(<numLanes>)\]\`\`

The allowed wave sizes that an HLSL shader may specify are the powers of 2 between 4 and 128, inclusive. In other words, the set: \[4, 8, 16, 32, 64, 128\].

The syntax for `RangedWaveSize` is:

\`\`\[WaveSize(<minWaveSize>, <maxWaveSize>, \[prefWaveSize\])\]\`\`

Where minWaveSize is the minimum wave size supported by the shader representing the beginning of the allowed range, maxWaveSize is the maximum wave size supported by the shader representing the end of the allowed range, and prefWaveSize is the optional preferred wave size representing the size expected to be the most optimal for this shader.

`WaveSize` is available for HLSL shader model 6.6 and later. `RangedWaveSize` available for HLSL shader model 6.8 and later.

The full documentation is available here: [https://microsoft.github.io/DirectX-Specs/d3d/HLSL\_SM\_6\_6\_WaveSize.html](https://microsoft.github.io/DirectX-Specs/d3d/HLSL_SM_6_6_WaveSize.html) and [https://microsoft.github.io/hlsl-specs/proposals/0013-wave-size-range.html](https://microsoft.github.io/hlsl-specs/proposals/0013-wave-size-range.html)

### [\_Noreturn](#id518)[¶](#noreturn "Link to this heading")

Supported Syntaxes[¶](#id115 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`_Noreturn`

A function declared as `_Noreturn` shall not return to its caller. The compiler will generate a diagnostic for a function declared as `_Noreturn` that appears to be capable of returning to its caller. Despite being a type specifier, the `_Noreturn` attribute cannot be specified on a function pointer type.

### [abi\_tag](#id519)[¶](#abi-tag "Link to this heading")

Supported Syntaxes[¶](#id116 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`abi_tag`

`gnu::abi_tag`

Yes

The `abi_tag` attribute can be applied to a function, variable, class or inline namespace declaration to modify the mangled name of the entity. It gives the ability to distinguish between different versions of the same entity but with different ABI versions supported. For example, a newer version of a class could have a different set of data members and thus have a different size. Using the `abi_tag` attribute, it is possible to have different mangled names for a global variable of the class type. Therefore, the old code could keep using the old mangled name and the new code will use the new mangled name with tags.

### [acquire\_capability, acquire\_shared\_capability](#id520)[¶](#acquire-capability-acquire-shared-capability "Link to this heading")

Supported Syntaxes[¶](#id117 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`acquire_capability`  
`acquire_shared_capability`  
`exclusive_lock_function`  
`shared_lock_function`

`clang::acquire_capability`  
`clang::acquire_shared_capability`

Marks a function as acquiring a capability.

### [alloc\_align](#id521)[¶](#alloc-align "Link to this heading")

Supported Syntaxes[¶](#id118 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`alloc_align`

`gnu::alloc_align`

`gnu::alloc_align`

Use `__attribute__((alloc_align(<alignment>))` on a function declaration to specify that the return value of the function (which must be a pointer type) is at least as aligned as the value of the indicated parameter. The parameter is given by its index in the list of formal parameters; the first parameter has index 1 unless the function is a C++ non-static member function, in which case the first parameter has index 2 to account for the implicit `this` parameter.

// The returned pointer has the alignment specified by the first parameter.
void \*a(size\_t align) \_\_attribute\_\_((alloc\_align(1)));

// The returned pointer has the alignment specified by the second parameter.
void \*b(void \*v, size\_t align) \_\_attribute\_\_((alloc\_align(2)));

// The returned pointer has the alignment specified by the second visible
// parameter, however it must be adjusted for the implicit 'this' parameter.
void \*Foo::b(void \*v, size\_t align) \_\_attribute\_\_((alloc\_align(3)));

Note that this attribute merely informs the compiler that a function always returns a sufficiently aligned pointer. It does not cause the compiler to emit code to enforce that alignment. The behavior is undefined if the returned pointer is not sufficiently aligned.

### [alloc\_size](#id522)[¶](#alloc-size "Link to this heading")

Supported Syntaxes[¶](#id119 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`alloc_size`

`gnu::alloc_size`

`gnu::alloc_size`

The `alloc_size` attribute can be placed on functions that return pointers in order to hint to the compiler how many bytes of memory will be available at the returned pointer. `alloc_size` takes one or two arguments.

*   `alloc_size(N)` implies that argument number N equals the number of available bytes at the returned pointer.
    
*   `alloc_size(N, M)` implies that the product of argument number N and argument number M equals the number of available bytes at the returned pointer.
    

Argument numbers are 1-based.

An example of how to use `alloc_size`

void \*my\_malloc(int a) \_\_attribute\_\_((alloc\_size(1)));
void \*my\_calloc(int a, int b) \_\_attribute\_\_((alloc\_size(1, 2)));

int main() {
  void \*const p \= my\_malloc(100);
  assert(\_\_builtin\_object\_size(p, 0) \== 100);
  void \*const a \= my\_calloc(20, 5);
  assert(\_\_builtin\_object\_size(a, 0) \== 100);
}

When `-Walloc-size` is enabled, this attribute allows the compiler to diagnose cases when the allocated memory is insufficient for the size of the type the returned pointer is cast to.

void \*my\_malloc(int a) \_\_attribute\_\_((alloc\_size(1)));
void consumer\_func(int \*);

int main() {
  int \*ptr \= my\_malloc(sizeof(int)); // no warning
  int \*w \= my\_malloc(1); // warning: allocation of insufficient size '1' for type 'int' with size '4'
  consumer\_func(my\_malloc(1)); // warning: allocation of insufficient size '1' for type 'int' with size '4'
}

Note

This attribute works differently in clang than it does in GCC. Specifically, clang will only trace `const` pointers (as above); we give up on pointers that are not marked as `const`. In the vast majority of cases, this is unimportant, because LLVM has support for the `alloc_size` attribute. However, this may cause mildly unintuitive behavior when used with other attributes, such as `enable_if`.

### [allocator](#id523)[¶](#allocator "Link to this heading")

Supported Syntaxes[¶](#id120 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`allocator`

The `__declspec(allocator)` attribute is applied to functions that allocate memory, such as operator new in C++. When CodeView debug information is emitted (enabled by `clang -gcodeview` or `clang-cl /Z7`), Clang will attempt to record the code offset of heap allocation call sites in the debug info. It will also record the type being allocated using some local heuristics. The Visual Studio debugger uses this information to [profile memory usage](https://docs.microsoft.com/en-us/visualstudio/profiling/memory-usage).

This attribute does not affect optimizations in any way, unlike GCC’s `__attribute__((malloc))`.

### [always\_inline, \_\_force\_inline](#id524)[¶](#always-inline-force-inline "Link to this heading")

Supported Syntaxes[¶](#id121 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`always_inline`

`gnu::always_inline`  
`clang::always_inline`

`gnu::always_inline`  
`clang::always_inline`

`__forceinline`

Yes

Inlining heuristics are disabled and inlining is always attempted regardless of optimization level.

`[[clang::always_inline]]` spelling can be used as a statement attribute; other spellings of the attribute are not supported on statements. If a statement is marked `[[clang::always_inline]]` and contains calls, the compiler attempts to inline those calls.

int example(void) {
  int i;
  \[\[clang::always\_inline\]\] foo(); // attempts to inline foo
  \[\[clang::always\_inline\]\] i \= bar(); // attempts to inline bar
  \[\[clang::always\_inline\]\] return f(42, baz(bar())); // attempts to inline everything
}

A declaration statement, which is a statement, is not a statement that can have an attribute associated with it (the attribute applies to the declaration, not the statement in that case). So this use case will not work:

int example(void) {
  \[\[clang::always\_inline\]\] int i \= bar();
  return i;
}

This attribute does not guarantee that inline substitution actually occurs.

<ins>Note: applying this attribute to a coroutine at the \-O0 optimization level has no effect; other optimization levels may only partially inline and result in a diagnostic.</ins>

See also [the Microsoft Docs on Inline Functions](https://docs.microsoft.com/en-us/cpp/cpp/inline-functions-cpp), [the GCC Common Function Attribute docs](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html), and [the GCC Inline docs](https://gcc.gnu.org/onlinedocs/gcc/Inline.html).

### [artificial](#id525)[¶](#artificial "Link to this heading")

Supported Syntaxes[¶](#id122 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`artificial`

`gnu::artificial`

`gnu::artificial`

The `artificial` attribute can be applied to an inline function. If such a function is inlined, the attribute indicates that debuggers should associate the resulting instructions with the call site, rather than with the corresponding line within the inlined callee.

### [assert\_capability, assert\_shared\_capability](#id526)[¶](#assert-capability-assert-shared-capability "Link to this heading")

Supported Syntaxes[¶](#id123 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`assert_capability`  
`assert_shared_capability`  
`assert_exclusive_lock`  
`assert_shared_lock`

`clang::assert_capability`  
`clang::assert_shared_capability`

Marks a function that dynamically tests whether a capability is held, and halts the program if it is not held.

### [assume](#id527)[¶](#assume "Link to this heading")

Supported Syntaxes[¶](#id124 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`omp::assume`

Yes

Clang supports the `[[omp::assume("assumption")]]` attribute to provide additional information to the optimizer. The string-literal, here “assumption”, will be attached to the function declaration such that later analysis and optimization passes can assume the “assumption” to hold. This is similar to [\_\_builtin\_assume](https://clang.llvm.org/docs/LanguageExtensions.html#langext-builtin-assume) but instead of an expression that can be assumed to be non-zero, the assumption is expressed as a string and it holds for the entire function.

A function can have multiple assume attributes and they propagate from prior declarations to later definitions. Multiple assumptions are aggregated into a single comma separated string. Thus, one can provide multiple assumptions via a comma separated string, i.a., `[[omp::assume("assumption1,assumption2")]]`.

While LLVM plugins might provide more assumption strings, the default LLVM optimization passes are aware of the following assumptions:

> "omp\_no\_openmp"
> "omp\_no\_openmp\_routines"
> "omp\_no\_parallelism"
> "omp\_no\_openmp\_constructs"

The OpenMP standard defines the meaning of OpenMP assumptions (“omp\_XYZ” is spelled “XYZ” in the [OpenMP 5.1 Standard](https://www.openmp.org/spec-html/5.1/openmpsu37.html#x56-560002.5.2)).

### [assume\_aligned](#id528)[¶](#assume-aligned "Link to this heading")

Supported Syntaxes[¶](#id125 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`assume_aligned`

`gnu::assume_aligned`

`gnu::assume_aligned`

Yes

Use `__attribute__((assume_aligned(<alignment>[,<offset>]))` on a function declaration to specify that the return value of the function (which must be a pointer type) has the specified offset, in bytes, from an address with the specified alignment. The offset is taken to be zero if omitted.

// The returned pointer value has 32-byte alignment.
void \*a() \_\_attribute\_\_((assume\_aligned (32)));

// The returned pointer value is 4 bytes greater than an address having
// 32-byte alignment.
void \*b() \_\_attribute\_\_((assume\_aligned (32, 4)));

Note that this attribute provides information to the compiler regarding a condition that the code already ensures is true. It does not cause the compiler to enforce the provided alignment assumption.

### [availability](#id529)[¶](#availability "Link to this heading")

Supported Syntaxes[¶](#id126 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`availability`

`clang::availability`

`clang::availability`

Yes

The `availability` attribute can be placed on declarations to describe the lifecycle of that declaration relative to operating system versions. Consider the function declaration for a hypothetical function `f`:

void f(void) \_\_attribute\_\_((availability(macos,introduced\=10.4,deprecated\=10.6,obsoleted\=10.7)));

The availability attribute states that `f` was introduced in macOS 10.4, deprecated in macOS 10.6, and obsoleted in macOS 10.7. This information is used by Clang to determine when it is safe to use `f`: for example, if Clang is instructed to compile code for macOS 10.5, a call to `f()` succeeds. If Clang is instructed to compile code for macOS 10.6, the call succeeds but Clang emits a warning specifying that the function is deprecated. Finally, if Clang is instructed to compile code for macOS 10.7, the call fails because `f()` is no longer available.

Clang is instructed to compile code for a minimum deployment version using the `-target` or `-mtargetos` command line arguments. For example, macOS 10.7 would be specified as `-target x86_64-apple-macos10.7` or `-mtargetos=macos10.7`. Variants like Mac Catalyst are specified as `-target arm64-apple-ios15.0-macabi` or `-mtargetos=ios15.0-macabi`

The availability attribute is a comma-separated list starting with the platform name and then including clauses specifying important milestones in the declaration’s lifetime (in any order) along with additional information. Those clauses can be:

introduced=_version_

The first version in which this declaration was introduced.

deprecated=_version_

The first version in which this declaration was deprecated, meaning that users should migrate away from this API.

obsoleted=_version_

The first version in which this declaration was obsoleted, meaning that it was removed completely and can no longer be used.

unavailable

This declaration is never available on this platform.

message=_string-literal_

Additional message text that Clang will provide when emitting a warning or error about use of a deprecated or obsoleted declaration. Useful to direct users to replacement APIs.

replacement=_string-literal_

Additional message text that Clang will use to provide Fix-It when emitting a warning about use of a deprecated declaration. The Fix-It will replace the deprecated declaration with the new declaration specified.

environment=_identifier_

Target environment in which this declaration is available. If present, the availability attribute applies only to targets with the same platform and environment. The parameter is currently supported only in HLSL.

Multiple availability attributes can be placed on a declaration, which may correspond to different platforms. For most platforms, the availability attribute with the platform corresponding to the target platform will be used; any others will be ignored. However, the availability for `watchOS` and `tvOS` can be implicitly inferred from an `iOS` availability attribute. Any explicit availability attributes for those platforms are still preferred over the implicitly inferred availability attributes. If no availability attribute specifies availability for the current target platform, the availability attributes are ignored. Supported platforms are:

`iOS` `macOS` `tvOS` `watchOS` `iOSApplicationExtension` `macOSApplicationExtension` `tvOSApplicationExtension` `watchOSApplicationExtension` `macCatalyst` `macCatalystApplicationExtension` `visionOS` `visionOSApplicationExtension` `driverkit` `swift` `android` `fuchsia` `ohos` `zos` `ShaderModel`

Some platforms have alias names:

`ios` `macos` `macosx (deprecated)` `tvos` `watchos` `ios_app_extension` `macos_app_extension` `macosx_app_extension (deprecated)` `tvos_app_extension` `watchos_app_extension` `maccatalyst` `maccatalyst_app_extension` `visionos` `visionos_app_extension` `shadermodel`

Supported environment names for the ShaderModel platform:

`pixel` `vertex` `geometry` `hull` `domain` `compute` `raygeneration` `intersection` `anyhit` `closesthit` `miss` `callable` `mesh` `amplification` `library`

A declaration can typically be used even when deploying back to a platform version prior to when the declaration was introduced. When this happens, the declaration is [weakly linked](https://developer.apple.com/library/mac/#documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WeakLinking.html), as if the `weak_import` attribute were added to the declaration. A weakly-linked declaration may or may not be present a run-time, and a program can determine whether the declaration is present by checking whether the address of that declaration is non-NULL.

The flag `strict` disallows using API when deploying back to a platform version prior to when the declaration was introduced. An attempt to use such API before its introduction causes a hard error. Weakly-linking is almost always a better API choice, since it allows users to query availability at runtime.

If there are multiple declarations of the same entity, the availability attributes must either match on a per-platform basis or later declarations must not have availability attributes for that platform. For example:

void g(void) \_\_attribute\_\_((availability(macos,introduced\=10.4)));
void g(void) \_\_attribute\_\_((availability(macos,introduced\=10.4))); // okay, matches
void g(void) \_\_attribute\_\_((availability(ios,introduced\=4.0))); // okay, adds a new platform
void g(void); // okay, inherits both macos and ios availability from above.
void g(void) \_\_attribute\_\_((availability(macos,introduced\=10.5))); // error: mismatch

When one method overrides another, the overriding method can be more widely available than the overridden method, e.g.,:

@interface A
\- (id)method \_\_attribute\_\_((availability(macos,introduced\=10.4)));
\- (id)method2 \_\_attribute\_\_((availability(macos,introduced\=10.4)));
@end

@interface B : A
\- (id)method \_\_attribute\_\_((availability(macos,introduced\=10.3))); // okay: method moved into base class later
\- (id)method \_\_attribute\_\_((availability(macos,introduced\=10.5))); // error: this method was available via the base class in 10.4
@end

Starting with the macOS 10.12 SDK, the `API_AVAILABLE` macro from `<os/availability.h>` can simplify the spelling:

@interface A
\- (id)method API\_AVAILABLE(macos(10.11)));
\- (id)otherMethod API\_AVAILABLE(macos(10.11), ios(11.0));
@end

Availability attributes can also be applied using a `#pragma clang attribute`. Any explicit availability attribute whose platform corresponds to the target platform is applied to a declaration regardless of the availability attributes specified in the pragma. For example, in the code below, `hasExplicitAvailabilityAttribute` will use the `macOS` availability attribute that is specified with the declaration, whereas `getsThePragmaAvailabilityAttribute` will use the `macOS` availability attribute that is applied by the pragma.

#pragma clang attribute push (\_\_attribute\_\_((availability(macOS, introduced=10.12))), apply\_to=function)
void getsThePragmaAvailabilityAttribute(void);
void hasExplicitAvailabilityAttribute(void) \_\_attribute\_\_((availability(macos,introduced\=10.4)));
#pragma clang attribute pop

For platforms like `watchOS` and `tvOS`, whose availability attributes can be implicitly inferred from an `iOS` availability attribute, the logic is slightly more complex. The explicit and the pragma-applied availability attributes whose platform corresponds to the target platform are applied as described in the previous paragraph. However, the implicitly inferred attributes are applied to a declaration only when there is no explicit or pragma-applied availability attribute whose platform corresponds to the target platform. For example, the function below will receive the `tvOS` availability from the pragma rather than using the inferred `iOS` availability from the declaration:

#pragma clang attribute push (\_\_attribute\_\_((availability(tvOS, introduced=12.0))), apply\_to=function)
void getsThePragmaTVOSAvailabilityAttribute(void) \_\_attribute\_\_((availability(iOS,introduced\=11.0)));
#pragma clang attribute pop

The compiler is also able to apply implicitly inferred attributes from a pragma as well. For example, when targeting `tvOS`, the function below will receive a `tvOS` availability attribute that is implicitly inferred from the `iOS` availability attribute applied by the pragma:

#pragma clang attribute push (\_\_attribute\_\_((availability(iOS, introduced=12.0))), apply\_to=function)
void infersTVOSAvailabilityFromPragma(void);
#pragma clang attribute pop

The implicit attributes that are inferred from explicitly specified attributes whose platform corresponds to the target platform are applied to the declaration even if there is an availability attribute that can be inferred from a pragma. For example, the function below will receive the `tvOS, introduced=11.0` availability that is inferred from the attribute on the declaration rather than inferring availability from the pragma:

#pragma clang attribute push (\_\_attribute\_\_((availability(iOS, unavailable))), apply\_to=function)
void infersTVOSAvailabilityFromAttributeNextToDeclaration(void)
  \_\_attribute\_\_((availability(iOS,introduced\=11.0)));
#pragma clang attribute pop

Also see the documentation for [@available](http://clang.llvm.org/docs/LanguageExtensions.html#objective-c-available)

### [btf\_decl\_tag](#id530)[¶](#btf-decl-tag "Link to this heading")

Supported Syntaxes[¶](#id127 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`btf_decl_tag`

`clang::btf_decl_tag`

`clang::btf_decl_tag`

Yes

Clang supports the `__attribute__((btf_decl_tag("ARGUMENT")))` attribute for all targets. This attribute may be attached to a struct/union, struct/union field, function, function parameter, variable or typedef declaration. If -g is specified, the `ARGUMENT` info will be preserved in IR and be emitted to dwarf. For BPF targets, the `ARGUMENT` info will be emitted to .BTF ELF section too.

### [callback](#id531)[¶](#callback "Link to this heading")

Supported Syntaxes[¶](#id128 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`callback`

`clang::callback`

`clang::callback`

Yes

The `callback` attribute specifies that the annotated function may invoke the specified callback zero or more times. The callback, as well as the passed arguments, are identified by their parameter name or position (starting with 1!) in the annotated function. The first position in the attribute identifies the callback callee, the following positions declare describe its arguments. The callback callee is required to be callable with the number, and order, of the specified arguments. The index `0`, or the identifier `this`, is used to represent an implicit “this” pointer in class methods. If there is no implicit “this” pointer it shall not be referenced. The index ‘-1’, or the name “\_\_”, represents an unknown callback callee argument. This can be a value which is not present in the declared parameter list, or one that is, but is potentially inspected, captured, or modified. Parameter names and indices can be mixed in the callback attribute.

The `callback` attribute, which is directly translated to `callback` metadata <[http://llvm.org/docs/LangRef.html#callback-metadata](http://llvm.org/docs/LangRef.html#callback-metadata)\>, make the connection between the call to the annotated function and the callback callee. This can enable interprocedural optimizations which were otherwise impossible. If a function parameter is mentioned in the `callback` attribute, through its position, it is undefined if that parameter is used for anything other than the actual callback. Inspected, captured, or modified parameters shall not be listed in the `callback` metadata.

Example encodings for the callback performed by `pthread_create` are shown below. The explicit attribute annotation indicates that the third parameter (`start_routine`) is called zero or more times by the `pthread_create` function, and that the fourth parameter (`arg`) is passed along. Note that the callback behavior of `pthread_create` is automatically recognized by Clang. In addition, the declarations of `__kmpc_fork_teams` and `__kmpc_fork_call`, generated for `#pragma omp target teams` and `#pragma omp parallel`, respectively, are also automatically recognized as broker functions. Further functions might be added in the future.

> \_\_attribute\_\_((callback (start\_routine, arg)))
> int pthread\_create(pthread\_t \*thread, const pthread\_attr\_t \*attr,
>                    void \*(\*start\_routine) (void \*), void \*arg);
> 
> \_\_attribute\_\_((callback (3, 4)))
> int pthread\_create(pthread\_t \*thread, const pthread\_attr\_t \*attr,
>                    void \*(\*start\_routine) (void \*), void \*arg);

### [carries\_dependency](#id532)[¶](#carries-dependency "Link to this heading")

Supported Syntaxes[¶](#id129 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`carries_dependency`

`carries_dependency`

Yes

The `carries_dependency` attribute specifies dependency propagation into and out of functions.

When specified on a function or Objective-C method, the `carries_dependency` attribute means that the return value carries a dependency out of the function, so that the implementation need not constrain ordering upon return from that function. Implementations of the function and its caller may choose to preserve dependencies instead of emitting memory ordering instructions such as fences.

Note, this attribute does not change the meaning of the program, but may result in generation of more efficient code.

### [cf\_consumed, cf\_returns\_not\_retained, cf\_returns\_retained, ns\_consumed, ns\_consumes\_self, ns\_returns\_autoreleased, ns\_returns\_not\_retained, ns\_returns\_retained, os\_consumed, os\_consumes\_this, os\_returns\_not\_retained, os\_returns\_retained, os\_returns\_retained\_on\_non\_zero, os\_returns\_retained\_on\_zero](#id533)[¶](#cf-consumed-cf-returns-not-retained-cf-returns-retained-ns-consumed-ns-consumes-self-ns-returns-autoreleased-ns-returns-not-retained-ns-returns-retained-os-consumed-os-consumes-this-os-returns-not-retained-os-returns-retained-os-returns-retained-on-non-zero-os-returns-retained-on-zero "Link to this heading")

Supported Syntaxes[¶](#id130 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cf_consumed`  
`cf_returns_not_retained`  
`cf_returns_retained`  
`ns_consumed`  
`ns_consumes_self`  
`ns_returns_autoreleased`  
`ns_returns_not_retained`  
`ns_returns_retained`  
`os_consumed`  
`os_consumes_this`  
`os_returns_not_retained`  
`os_returns_retained`  
`os_returns_retained_on_non_zero`  
`os_returns_retained_on_zero`

`clang::cf_consumed`  
`clang::cf_returns_not_retained`  
`clang::cf_returns_retained`  
`clang::ns_consumed`  
`clang::ns_consumes_self`  
`clang::ns_returns_autoreleased`  
`clang::ns_returns_not_retained`  
`clang::ns_returns_retained`  
`clang::os_consumed`  
`clang::os_consumes_this`  
`clang::os_returns_not_retained`  
`clang::os_returns_retained`  
`clang::os_returns_retained_on_non_zero`  
`clang::os_returns_retained_on_zero`

`clang::cf_consumed`  
`clang::cf_returns_not_retained`  
`clang::cf_returns_retained`  
`clang::ns_consumed`  
`clang::ns_consumes_self`  
`clang::ns_returns_autoreleased`  
`clang::ns_returns_not_retained`  
`clang::ns_returns_retained`  
`clang::os_consumed`  
`clang::os_consumes_this`  
`clang::os_returns_not_retained`  
`clang::os_returns_retained`  
`clang::os_returns_retained_on_non_zero`  
`clang::os_returns_retained_on_zero`

Yes

The behavior of a function with respect to reference counting for Foundation (Objective-C), CoreFoundation (C) and OSObject (C++) is determined by a naming convention (e.g. functions starting with “get” are assumed to return at `+0`).

It can be overridden using a family of the following attributes. In Objective-C, the annotation `__attribute__((ns_returns_retained))` applied to a function communicates that the object is returned at `+1`, and the caller is responsible for freeing it. Similarly, the annotation `__attribute__((ns_returns_not_retained))` specifies that the object is returned at `+0` and the ownership remains with the callee. The annotation `__attribute__((ns_consumes_self))` specifies that the Objective-C method call consumes the reference to `self`, e.g. by attaching it to a supplied parameter. Additionally, parameters can have an annotation `__attribute__((ns_consumed))`, which specifies that passing an owned object as that parameter effectively transfers the ownership, and the caller is no longer responsible for it. These attributes affect code generation when interacting with ARC code, and they are used by the Clang Static Analyzer.

In C programs using CoreFoundation, a similar set of attributes: `__attribute__((cf_returns_not_retained))`, `__attribute__((cf_returns_retained))` and `__attribute__((cf_consumed))` have the same respective semantics when applied to CoreFoundation objects. These attributes affect code generation when interacting with ARC code, and they are used by the Clang Static Analyzer.

Finally, in C++ interacting with XNU kernel (objects inheriting from OSObject), the same attribute family is present: `__attribute__((os_returns_not_retained))`, `__attribute__((os_returns_retained))` and `__attribute__((os_consumed))`, with the same respective semantics. Similar to `__attribute__((ns_consumes_self))`, `__attribute__((os_consumes_this))` specifies that the method call consumes the reference to “this” (e.g., when attaching it to a different object supplied as a parameter). Out parameters (parameters the function is meant to write into, either via pointers-to-pointers or references-to-pointers) may be annotated with `__attribute__((os_returns_retained))` or `__attribute__((os_returns_not_retained))` which specifies that the object written into the out parameter should (or respectively should not) be released after use. Since often out parameters may or may not be written depending on the exit code of the function, annotations `__attribute__((os_returns_retained_on_zero))` and `__attribute__((os_returns_retained_on_non_zero))` specify that an out parameter at `+1` is written if and only if the function returns a zero (respectively non-zero) error code. Observe that return-code-dependent out parameter annotations are only available for retained out parameters, as non-retained object do not have to be released by the callee. These attributes are only used by the Clang Static Analyzer.

The family of attributes `X_returns_X_retained` can be added to functions, C++ methods, and Objective-C methods and properties. Attributes `X_consumed` can be added to parameters of methods, functions, and Objective-C methods.

### [cfi\_canonical\_jump\_table](#id534)[¶](#cfi-canonical-jump-table "Link to this heading")

Supported Syntaxes[¶](#id131 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cfi_canonical_jump_table`

`clang::cfi_canonical_jump_table`

`clang::cfi_canonical_jump_table`

Yes

Use `__attribute__((cfi_canonical_jump_table))` on a function declaration to make the function’s CFI jump table canonical. See [the CFI documentation](https://clang.llvm.org/docs/ControlFlowIntegrity.html#cfi-canonical-jump-tables) for more details.

### [cfi\_salt](#id535)[¶](#cfi-salt "Link to this heading")

Supported Syntaxes[¶](#id132 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cfi_salt`

`clang::cfi_salt`

`clang::cfi_salt`

Yes

The `cfi_salt` attribute specifies a string literal that is used as a salt for Control-Flow Integrity (CFI) checks to distinguish between functions with the same type signature. This attribute can be applied to function declarations, function definitions, and function pointer typedefs.

The attribute prevents function pointers from being replaced with pointers to functions that have a compatible type, which can be a CFI bypass vector.

**Syntax:**

*   GNU-style: `__attribute__((cfi_salt("<salt_string>")))`
    
*   C++11-style: `[[clang::cfi_salt("<salt_string>")]]`
    

**Usage:**

The attribute takes a single string literal argument that serves as the salt. Functions or function types with different salt values will have different CFI hashes, even if they have identical type signatures.

**Motivation:**

In large codebases like the Linux kernel, there are often hundreds of functions with identical type signatures that are called indirectly:

1662 functions with void (\*)(void)
1179 functions with int (\*)(void)
 ...

By salting the CFI hashes, you can make CFI more robust by ensuring that functions intended for different purposes have distinct CFI identities.

**Type Compatibility:**

*   Functions with different salt values are considered to have incompatible types
    
*   Function pointers with different salt values cannot be assigned to each other
    
*   All declarations of the same function must use the same salt value
    

**Example:**

// Header file - define convenience macros
#define \_\_cfi\_salt(s) \_\_attribute\_\_((cfi\_salt(s)))

// Typedef for regular function pointers
typedef int (\*fptr\_t)(void);

// Typedef for salted function pointers
typedef int (\*fptr\_salted\_t)(void) \_\_cfi\_salt("pepper");

struct widget\_ops {
  fptr\_t init;          // Regular CFI
  fptr\_salted\_t exec;   // Salted CFI
  fptr\_t cleanup;       // Regular CFI
};

// Function implementations
static int widget\_init(void) { return 0; }
static int widget\_exec(void) \_\_cfi\_salt("pepper") { return 1; }
static int widget\_cleanup(void) { return 0; }

static struct widget\_ops ops \= {
  .init \= widget\_init,      // OK - compatible types
  .exec \= widget\_exec,      // OK - both use "pepper" salt
  .cleanup \= widget\_cleanup // OK - compatible types
};

// Using C++11 attribute syntax
void secure\_callback(void) \[\[clang::cfi\_salt("secure")\]\];

// This would cause a compilation error:
// fptr\_t bad\_ptr = widget\_exec;  // Error: incompatible types

**Notes:**

*   The salt string can contain non-NULL ASCII characters, including spaces and quotes
    
*   This attribute only applies to function types; using it on non-function types will generate a warning
    
*   All declarations and definitions of the same function must use identical salt values
    
*   The attribute affects type compatibility during compilation and CFI hash generation during code generation
    

### [clang::builtin\_alias, clang\_builtin\_alias](#id536)[¶](#clang-builtin-alias-clang-builtin-alias "Link to this heading")

Supported Syntaxes[¶](#id133 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`clang_builtin_alias`

`clang::builtin_alias`

`clang::builtin_alias`

Yes

This attribute is used in the implementation of the C intrinsics. It allows the C intrinsic functions to be declared using the names defined in target builtins, and still be recognized as clang builtins equivalent to the underlying name. For example, `riscv_vector.h` declares the function `vadd` with `__attribute__((clang_builtin_alias(__builtin_rvv_vadd_vv_i8m1)))`. This ensures that both functions are recognized as that clang builtin, and in the latter case, the choice of which builtin to identify the function as can be deferred until after overload resolution.

This attribute can only be used to set up the aliases for certain ARM/RISC-V C intrinsic functions; it is intended for use only inside `arm_*.h` and `riscv_*.h` and is not a general mechanism for declaring arbitrary aliases for clang builtin functions.

### [clang\_arm\_builtin\_alias](#id537)[¶](#clang-arm-builtin-alias "Link to this heading")

Supported Syntaxes[¶](#id134 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__clang_arm_builtin_alias`

`clang::__clang_arm_builtin_alias`

`clang::__clang_arm_builtin_alias`

Yes

This attribute is used in the implementation of the ACLE intrinsics. It allows the intrinsic functions to be declared using the names defined in ACLE, and still be recognized as clang builtins equivalent to the underlying name. For example, `arm_mve.h` declares the function `vaddq_u32` with `__attribute__((__clang_arm_mve_alias(__builtin_arm_mve_vaddq_u32)))`, and similarly, one of the type-overloaded declarations of `vaddq` will have the same attribute. This ensures that both functions are recognized as that clang builtin, and in the latter case, the choice of which builtin to identify the function as can be deferred until after overload resolution.

This attribute can only be used to set up the aliases for certain Arm intrinsic functions; it is intended for use only inside `arm_*.h` and is not a general mechanism for declaring arbitrary aliases for clang builtin functions.

In order to avoid duplicating the attribute definitions for similar purpose for other architecture, there is a general form for the attribute clang\_builtin\_alias.

### [clspv\_libclc\_builtin](#id538)[¶](#clspv-libclc-builtin "Link to this heading")

Supported Syntaxes[¶](#id135 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`clspv_libclc_builtin`

`clang::clspv_libclc_builtin`

`clang::clspv_libclc_builtin`

Yes

Attribute used by [clspv](https://github.com/google/clspv) (OpenCL-C to Vulkan SPIR-V compiler) to identify functions coming from [libclc](https://libclc.llvm.org/) (OpenCL-C builtin library).

void \_\_attribute\_\_((clspv\_libclc\_builtin)) libclc\_builtin() {}

### [cmse\_nonsecure\_entry](#id539)[¶](#cmse-nonsecure-entry "Link to this heading")

Supported Syntaxes[¶](#id136 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cmse_nonsecure_entry`

Yes

This attribute declares a function that can be called from non-secure state, or from secure state. Entering from and returning to non-secure state would switch to and from secure state, respectively, and prevent flow of information to non-secure state, except via return values. See [ARMv8-M Security Extensions: Requirements on Development Tools - Engineering Specification Documentation](https://developer.arm.com/docs/ecm0359818/latest/) for more information.

### [code\_seg](#id540)[¶](#code-seg "Link to this heading")

Supported Syntaxes[¶](#id137 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`code_seg`

The `__declspec(code_seg)` attribute enables the placement of code into separate named segments that can be paged or locked in memory individually. This attribute is used to control the placement of instantiated templates and compiler-generated code. See the documentation for [\_\_declspec(code\_seg)](http://msdn.microsoft.com/en-us/library/dn636922.aspx) on MSDN.

### [cold](#id541)[¶](#cold "Link to this heading")

Supported Syntaxes[¶](#id138 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cold`

`gnu::cold`

`gnu::cold`

Yes

`__attribute__((cold))` marks a function as cold, as a manual alternative to PGO hotness data. If PGO data is available, the profile count based hotness overrides the `__attribute__((cold))` annotation (unlike `__attribute__((hot))`).

### [constant\_id](#id542)[¶](#constant-id "Link to this heading")

Supported Syntaxes[¶](#id139 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vk::constant_id`

The `vk::constant_id` attribute specifies the id for a SPIR-V specialization constant. The attribute applies to const global scalar variables. The variable must be initialized with a C++11 constexpr. In SPIR-V, the variable will be replaced with an OpSpecConstant with the given id. The syntax is:

\`\`\[\[vk::constant\_id(<Id>)\]\] const T Name = <Init>\`\`

### [constructor, destructor](#id543)[¶](#constructor-destructor "Link to this heading")

Supported Syntaxes[¶](#id140 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`constructor`  
`destructor`

`gnu::constructor`  
`gnu::destructor`

`gnu::constructor`  
`gnu::destructor`

Yes

The `constructor` attribute causes the function to be called before entering `main()`, and the `destructor` attribute causes the function to be called after returning from `main()` or when the `exit()` function has been called. Note, `quick_exit()`, `_Exit()`, and `abort()` prevent a function marked `destructor` from being called.

The constructor or destructor function should not accept any arguments and its return type should be `void`.

The attributes accept an optional argument used to specify the priority order in which to execute constructor and destructor functions. The priority is given as an integer constant expression between 101 and 65535 (inclusive). Priorities outside of that range are reserved for use by the implementation. A lower value indicates a higher priority of initialization. Note that only the relative ordering of values is important. For example:

\_\_attribute\_\_((constructor(200))) void foo(void);
\_\_attribute\_\_((constructor(101))) void bar(void);

`bar()` will be called before `foo()`, and both will be called before `main()`. If no argument is given to the `constructor` or `destructor` attribute, they default to the value `65535`.

### [convergent](#id544)[¶](#convergent "Link to this heading")

Supported Syntaxes[¶](#id141 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`convergent`

`clang::convergent`

`clang::convergent`

Yes

The `convergent` attribute can be placed on a function declaration. It is translated into the LLVM `convergent` attribute, which indicates that the call instructions of a function with this attribute cannot be made control-dependent on any additional values.

This attribute is different from `noduplicate` because it allows duplicating function calls if it can be proved that the duplicated function calls are not made control-dependent on any additional values, e.g., unrolling a loop executed by all work items.

Sample usage:

void convfunc(void) \_\_attribute\_\_((convergent));
// Setting it as a C++11 attribute is also valid in a C++ program.
// void convfunc(void) \[\[clang::convergent\]\];

### [cpu\_dispatch, cpu\_specific](#id545)[¶](#cpu-dispatch-cpu-specific "Link to this heading")

Supported Syntaxes[¶](#id142 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cpu_dispatch`  
`cpu_specific`

`clang::cpu_dispatch`  
`clang::cpu_specific`

`clang::cpu_dispatch`  
`clang::cpu_specific`

`cpu_dispatch`  
`cpu_specific`

Yes

The `cpu_specific` and `cpu_dispatch` attributes are used to define and resolve multiversioned functions. This form of multiversioning provides a mechanism for declaring versions across translation units and manually specifying the resolved function list. A specified CPU defines a set of minimum features that are required for the function to be called. The result of this is that future processors execute the most restrictive version of the function the new processor can execute.

In addition, unlike the ICC implementation of this feature, the selection of the version does not consider the manufacturer or microarchitecture of the processor. It tests solely the list of features that are both supported by the specified processor and present in the compiler-rt library. This can be surprising at times, as the runtime processor may be from a completely different manufacturer, as long as it supports the same feature set.

This can additionally be surprising, as some processors are indistringuishable from others based on the list of testable features. When this happens, the variant is selected in an unspecified manner.

Function versions are defined with `cpu_specific`, which takes one or more CPU names as a parameter. For example:

// Declares and defines the ivybridge version of single\_cpu.
\_\_attribute\_\_((cpu\_specific(ivybridge)))
void single\_cpu(void){}

// Declares and defines the atom version of single\_cpu.
\_\_attribute\_\_((cpu\_specific(atom)))
void single\_cpu(void){}

// Declares and defines both the ivybridge and atom version of multi\_cpu.
\_\_attribute\_\_((cpu\_specific(ivybridge, atom)))
void multi\_cpu(void){}

A dispatching (or resolving) function can be declared anywhere in a project’s source code with `cpu_dispatch`. This attribute takes one or more CPU names as a parameter (like `cpu_specific`). Functions marked with `cpu_dispatch` are not expected to be defined, only declared. If such a marked function has a definition, any side effects of the function are ignored; trivial function bodies are permissible for ICC compatibility.

// Creates a resolver for single\_cpu above.
\_\_attribute\_\_((cpu\_dispatch(ivybridge, atom)))
void single\_cpu(void){}

// Creates a resolver for multi\_cpu, but adds a 3rd version defined in another
// translation unit.
\_\_attribute\_\_((cpu\_dispatch(ivybridge, atom, sandybridge)))
void multi\_cpu(void){}

Note that it is possible to have a resolving function that dispatches based on more or fewer options than are present in the program. Specifying fewer will result in the omitted options not being considered during resolution. Specifying a version for resolution that isn’t defined in the program will result in a linking failure.

It is also possible to specify a CPU name of `generic` which will be resolved if the executing processor doesn’t satisfy the features required in the CPU name. The behavior of a program executing on a processor that doesn’t satisfy any option of a multiversioned function is undefined.

### [device\_kernel, sycl\_kernel, nvptx\_kernel, amdgpu\_kernel, kernel, \_\_kernel](#id546)[¶](#device-kernel-sycl-kernel-nvptx-kernel-amdgpu-kernel-kernel-kernel "Link to this heading")

Supported Syntaxes[¶](#id143 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`device_kernel`  
`sycl_kernel`  
`nvptx_kernel`  
`amdgpu_kernel`

`clang::device_kernel`  
`clang::sycl_kernel`  
`clang::nvptx_kernel`  
`clang::amdgpu_kernel`

`clang::device_kernel`  
`clang::sycl_kernel`  
`clang::nvptx_kernel`  
`clang::amdgpu_kernel`

`__kernel`  
`kernel`

These attributes specify that the function represents a kernel for device offloading. The specific semantics depend on the offloading language, target, and attribute spelling. The `sycl_kernel` attribute specifies that a function template will be used to outline device code and to generate an OpenCL kernel. Here is a code example of the SYCL program, which demonstrates the compiler’s outlining job:

int foo(int x) { return ++x; }

using namespace cl::sycl;
queue Q;
buffer<int, 1\> a(range<1\>{1024});
Q.submit(\[&\](handler& cgh) {
  auto A \= a.get\_access<access::mode::write\>(cgh);
  cgh.parallel\_for<init\_a\>(range<1\>{1024}, \[\=\](id<1\> index) {
    A\[index\] \= index\[0\] + foo(42);
  });
}

A C++ function object passed to the `parallel_for` is called a “SYCL kernel”. A SYCL kernel defines the entry point to the “device part” of the code. The compiler will emit all symbols accessible from a “kernel”. In this code example, the compiler will emit “foo” function. More details about the compilation of functions for the device part can be found in the SYCL 1.2.1 specification Section 6.4. To show to the compiler entry point to the “device part” of the code, the SYCL runtime can use the `sycl_kernel` attribute in the following way:

namespace cl {
namespace sycl {
class handler {
  template <typename KernelName, typename KernelType/\*, ...\*/\>
  \_\_attribute\_\_((sycl\_kernel)) void sycl\_kernel\_function(KernelType KernelFuncObj) {
    // ...
    KernelFuncObj();
  }

  template <typename KernelName, typename KernelType, int Dims\>
  void parallel\_for(range<Dims\> NumWorkItems, KernelType KernelFunc) {
#ifdef \_\_SYCL\_DEVICE\_ONLY\_\_
    sycl\_kernel\_function<KernelName, KernelType, Dims\>(KernelFunc);
#else
    // Host implementation
#endif
  }
};
} // namespace sycl
} // namespace cl

The compiler will also generate an OpenCL kernel using the function marked with the `sycl_kernel` attribute. Here is the list of SYCL device compiler expectations with regard to the function marked with the `sycl_kernel` attribute:

*   The function must be a template with at least two type template parameters. The compiler generates an OpenCL kernel and uses the first template parameter as a unique name for the generated OpenCL kernel. The host application uses this unique name to invoke the OpenCL kernel generated for the SYCL kernel specialized by this name and second template parameter `KernelType` (which might be an unnamed function object type).
    
*   The function must have at least one parameter. The first parameter is required to be a function object type (named or unnamed i.e. lambda). The compiler uses function object type fields to generate OpenCL kernel parameters.
    
*   The function must return void. The compiler reuses the body of marked functions to generate the OpenCL kernel body, and the OpenCL kernel must return `void`.
    

The SYCL kernel in the previous code sample meets these expectations.

### [diagnose\_as\_builtin](#id547)[¶](#diagnose-as-builtin "Link to this heading")

Supported Syntaxes[¶](#id144 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`diagnose_as_builtin`

`clang::diagnose_as_builtin`

`clang::diagnose_as_builtin`

Yes

The `diagnose_as_builtin` attribute indicates that Fortify diagnostics are to be applied to the declared function as if it were the function specified by the attribute. The builtin function whose diagnostics are to be mimicked should be given. In addition, the order in which arguments should be applied must also be given.

For example, the attribute can be used as follows.

\_\_attribute\_\_((diagnose\_as\_builtin(\_\_builtin\_memset, 3, 2, 1)))
void \*mymemset(int n, int c, void \*s) {
  // ...
}

This indicates that calls to `mymemset` should be diagnosed as if they were calls to `__builtin_memset`. The arguments `3, 2, 1` indicate by index the order in which arguments of `mymemset` should be applied to `__builtin_memset`. The third argument should be applied first, then the second, and then the first. Thus (when Fortify warnings are enabled) the call `mymemset(n, c, s)` will diagnose overflows as if it were the call `__builtin_memset(s, c, n)`.

For variadic functions, the variadic arguments must come in the same order as they would to the builtin function, after all normal arguments. For instance, to diagnose a new function as if it were sscanf, we can use the attribute as follows.

\_\_attribute\_\_((diagnose\_as\_builtin(sscanf, 1, 2)))
int mysscanf(const char \*str, const char \*format, ...)  {
  // ...
}

Then the call mysscanf(“abc def”, “%4s %4s”, buf1, buf2) will be diagnosed as if it were the call sscanf(“abc def”, “%4s %4s”, buf1, buf2).

This attribute cannot be applied to non-static member functions.

### [diagnose\_if](#id548)[¶](#diagnose-if "Link to this heading")

Supported Syntaxes[¶](#id145 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`diagnose_if`

The `diagnose_if` attribute can be placed on function declarations to emit warnings or errors at compile-time if calls to the attributed function meet certain user-defined criteria. For example:

int abs(int a)
  \_\_attribute\_\_((diagnose\_if(a \>= 0, "Redundant abs call", "warning")));
int must\_abs(int a)
  \_\_attribute\_\_((diagnose\_if(a \>= 0, "Redundant abs call", "error")));

int val \= abs(1); // warning: Redundant abs call
int val2 \= must\_abs(1); // error: Redundant abs call
int val3 \= abs(val);
int val4 \= must\_abs(val); // Because run-time checks are not emitted for
                          // diagnose\_if attributes, this executes without
                          // issue.

`diagnose_if` is closely related to `enable_if`, with a few key differences:

*   Overload resolution is not aware of `diagnose_if` attributes: they’re considered only after we select the best candidate from a given candidate set.
    
*   Function declarations that differ only in their `diagnose_if` attributes are considered to be redeclarations of the same function (not overloads).
    
*   If the condition provided to `diagnose_if` cannot be evaluated, no diagnostic will be emitted.
    

Otherwise, `diagnose_if` is essentially the logical negation of `enable_if`.

As a result of bullet number two, `diagnose_if` attributes will stack on the same function. For example:

int foo() \_\_attribute\_\_((diagnose\_if(1, "diag1", "warning")));
int foo() \_\_attribute\_\_((diagnose\_if(1, "diag2", "warning")));

int bar \= foo(); // warning: diag1
                 // warning: diag2
int (\*fooptr)(void) \= foo; // warning: diag1
                           // warning: diag2

constexpr int supportsAPILevel(int N) { return N < 5; }
int baz(int a)
  \_\_attribute\_\_((diagnose\_if(!supportsAPILevel(10),
                             "Upgrade to API level 10 to use baz", "error")));
int baz(int a)
  \_\_attribute\_\_((diagnose\_if(!a, "0 is not recommended.", "warning")));

int (\*bazptr)(int) \= baz; // error: Upgrade to API level 10 to use baz
int v \= baz(0); // error: Upgrade to API level 10 to use baz

Query for this feature with `__has_attribute(diagnose_if)`.

### [disable\_sanitizer\_instrumentation](#id549)[¶](#disable-sanitizer-instrumentation "Link to this heading")

Supported Syntaxes[¶](#id146 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`disable_sanitizer_instrumentation`

`clang::disable_sanitizer_instrumentation`

`clang::disable_sanitizer_instrumentation`

Yes

Use the `disable_sanitizer_instrumentation` attribute on a function, Objective-C method, or global variable, to specify that no sanitizer instrumentation should be applied.

This is not the same as `__attribute__((no_sanitize(...)))`, which depending on the tool may still insert instrumentation to prevent false positive reports.

### [disable\_tail\_calls](#id550)[¶](#disable-tail-calls "Link to this heading")

Supported Syntaxes[¶](#id147 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`disable_tail_calls`

`clang::disable_tail_calls`

`clang::disable_tail_calls`

Yes

The `disable_tail_calls` attribute instructs the backend to not perform tail call optimization inside the marked function.

For example:

> int callee(int);
> 
> int foo(int a) \_\_attribute\_\_((disable\_tail\_calls)) {
>   return callee(a); // This call is not tail-call optimized.
> }

Marking virtual functions as `disable_tail_calls` is legal.

> int callee(int);
> 
> class Base {
> public:
>   \[\[clang::disable\_tail\_calls\]\] virtual int foo1() {
>     return callee(); // This call is not tail-call optimized.
>   }
> };
> 
> class Derived1 : public Base {
> public:
>   int foo1() override {
>     return callee(); // This call is tail-call optimized.
>   }
> };

### [enable\_if](#id551)[¶](#enable-if "Link to this heading")

Supported Syntaxes[¶](#id148 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`enable_if`

Yes

Note

Some features of this attribute are experimental. The meaning of multiple enable\_if attributes on a single declaration is subject to change in a future version of clang. Also, the ABI is not standardized and the name mangling may change in future versions. To avoid that, use asm labels.

The `enable_if` attribute can be placed on function declarations to control which overload is selected based on the values of the function’s arguments. When combined with the `overloadable` attribute, this feature is also available in C.

int isdigit(int c);
int isdigit(int c) \_\_attribute\_\_((enable\_if(c <= \-1 || c \> 255, "chosen when 'c' is out of range"))) \_\_attribute\_\_((unavailable("'c' must have the value of an unsigned char or EOF")));

void foo(char c) {
  isdigit(c);
  isdigit(10);
  isdigit(\-10);  // results in a compile-time error.
}

The enable\_if attribute takes two arguments, the first is an expression written in terms of the function parameters, the second is a string explaining why this overload candidate could not be selected to be displayed in diagnostics. The expression is part of the function signature for the purposes of determining whether it is a redeclaration (following the rules used when determining whether a C++ template specialization is ODR-equivalent), but is not part of the type.

The enable\_if expression is evaluated as if it were the body of a bool-returning constexpr function declared with the arguments of the function it is being applied to, then called with the parameters at the call site. If the result is false or could not be determined through constant expression evaluation, then this overload will not be chosen and the provided string may be used in a diagnostic if the compile fails as a result.

Because the enable\_if expression is an unevaluated context, there are no global state changes, nor the ability to pass information from the enable\_if expression to the function body. For example, suppose we want calls to strnlen(strbuf, maxlen) to resolve to strnlen\_chk(strbuf, maxlen, size of strbuf) only if the size of strbuf can be determined:

\_\_attribute\_\_((always\_inline))
static inline size\_t strnlen(const char \*s, size\_t maxlen)
  \_\_attribute\_\_((overloadable))
  \_\_attribute\_\_((enable\_if(\_\_builtin\_object\_size(s, 0) != \-1))),
                           "chosen when the buffer size is known but 'maxlen' is not")))
{
  return strnlen\_chk(s, maxlen, \_\_builtin\_object\_size(s, 0));
}

Multiple enable\_if attributes may be applied to a single declaration. In this case, the enable\_if expressions are evaluated from left to right in the following manner. First, the candidates whose enable\_if expressions evaluate to false or cannot be evaluated are discarded. If the remaining candidates do not share ODR-equivalent enable\_if expressions, the overload resolution is ambiguous. Otherwise, enable\_if overload resolution continues with the next enable\_if attribute on the candidates that have not been discarded and have remaining enable\_if attributes. In this way, we pick the most specific overload out of a number of viable overloads using enable\_if.

void f() \_\_attribute\_\_((enable\_if(true, "")));  // #1
void f() \_\_attribute\_\_((enable\_if(true, ""))) \_\_attribute\_\_((enable\_if(true, "")));  // #2

void g(int i, int j) \_\_attribute\_\_((enable\_if(i, "")));  // #1
void g(int i, int j) \_\_attribute\_\_((enable\_if(j, ""))) \_\_attribute\_\_((enable\_if(true)));  // #2

In this example, a call to f() is always resolved to #2, as the first enable\_if expression is ODR-equivalent for both declarations, but #1 does not have another enable\_if expression to continue evaluating, so the next round of evaluation has only a single candidate. In a call to g(1, 1), the call is ambiguous even though #2 has more enable\_if attributes, because the first enable\_if expressions are not ODR-equivalent.

Query for this feature with `__has_attribute(enable_if)`.

Note that functions with one or more `enable_if` attributes may not have their address taken, unless all of the conditions specified by said `enable_if` are constants that evaluate to `true`. For example:

const int TrueConstant \= 1;
const int FalseConstant \= 0;
int f(int a) \_\_attribute\_\_((enable\_if(a \> 0, "")));
int g(int a) \_\_attribute\_\_((enable\_if(a \== 0 || a != 0, "")));
int h(int a) \_\_attribute\_\_((enable\_if(1, "")));
int i(int a) \_\_attribute\_\_((enable\_if(TrueConstant, "")));
int j(int a) \_\_attribute\_\_((enable\_if(FalseConstant, "")));

void fn() {
  int (\*ptr)(int);
  ptr \= &f; // error: 'a > 0' is not always true
  ptr \= &g; // error: 'a == 0 || a != 0' is not a truthy constant
  ptr \= &h; // OK: 1 is a truthy constant
  ptr \= &i; // OK: 'TrueConstant' is a truthy constant
  ptr \= &j; // error: 'FalseConstant' is a constant, but not truthy
}

Because `enable_if` evaluation happens during overload resolution, `enable_if` may give unintuitive results when used with templates, depending on when overloads are resolved. In the example below, clang will emit a diagnostic about no viable overloads for `foo` in `bar`, but not in `baz`:

double foo(int i) \_\_attribute\_\_((enable\_if(i \> 0, "")));
void \*foo(int i) \_\_attribute\_\_((enable\_if(i <= 0, "")));
template <int I\>
auto bar() { return foo(I); }

template <typename T\>
auto baz() { return foo(T::number); }

struct WithNumber { constexpr static int number \= 1; };
void callThem() {
  bar<sizeof(WithNumber)\>();
  baz<WithNumber\>();
}

This is because, in `bar`, `foo` is resolved prior to template instantiation, so the value for `I` isn’t known (thus, both `enable_if` conditions for `foo` fail). However, in `baz`, `foo` is resolved during template instantiation, so the value for `T::number` is known.

### [enforce\_tcb](#id552)[¶](#enforce-tcb "Link to this heading")

Supported Syntaxes[¶](#id149 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`enforce_tcb`

`clang::enforce_tcb`

`clang::enforce_tcb`

Yes

The `enforce_tcb` attribute can be placed on functions to enforce that a

trusted compute base (TCB) does not call out of the TCB. This generates a warning every time a function not marked with an `enforce_tcb` attribute is called from a function with the `enforce_tcb` attribute. A function may be a part of multiple TCBs. Invocations through function pointers are currently not checked. Builtins are considered to a part of every TCB.

*   `enforce_tcb(Name)` indicates that this function is a part of the TCB named `Name`
    

### [enforce\_tcb\_leaf](#id553)[¶](#enforce-tcb-leaf "Link to this heading")

Supported Syntaxes[¶](#id150 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`enforce_tcb_leaf`

`clang::enforce_tcb_leaf`

`clang::enforce_tcb_leaf`

Yes

The `enforce_tcb_leaf` attribute satisfies the requirement enforced by

`enforce_tcb` for the marked function to be in the named TCB but does not continue to check the functions called from within the leaf function.

*   `enforce_tcb_leaf(Name)` indicates that this function is a part of the TCB named `Name`
    

### [error, warning](#id554)[¶](#error-warning "Link to this heading")

Supported Syntaxes[¶](#id151 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`error`  
`warning`

`gnu::error`  
`gnu::warning`

`gnu::error`  
`gnu::warning`

Yes

The `error` and `warning` function attributes can be used to specify a custom diagnostic to be emitted when a call to such a function is not eliminated via optimizations. This can be used to create compile time assertions that depend on optimizations, while providing diagnostics pointing to precise locations of the call site in the source.

\_\_attribute\_\_((warning("oh no"))) void dontcall();
void foo() {
  if (someCompileTimeAssertionThatsTrue)
    dontcall(); // Warning

  dontcall(); // Warning

  if (someCompileTimeAssertionThatsFalse)
    dontcall(); // No Warning
  sizeof(dontcall()); // No Warning
}

### [exclude\_from\_explicit\_instantiation](#id555)[¶](#exclude-from-explicit-instantiation "Link to this heading")

Supported Syntaxes[¶](#id152 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`exclude_from_explicit_instantiation`

`clang::exclude_from_explicit_instantiation`

`clang::exclude_from_explicit_instantiation`

Yes

The `exclude_from_explicit_instantiation` attribute opts-out a member of a class template from being part of explicit template instantiations of that class template. This means that an explicit instantiation will not instantiate members of the class template marked with the attribute, but also that code where an extern template declaration of the enclosing class template is visible will not take for granted that an external instantiation of the class template would provide those members (which would otherwise be a link error, since the explicit instantiation won’t provide those members). For example, let’s say we don’t want the `data()` method to be part of libc++’s ABI. To make sure it is not exported from the dylib, we give it hidden visibility:

> // in <string>
> template <class CharT\>
> class basic\_string {
> public:
>   \_\_attribute\_\_((\_\_visibility\_\_("hidden")))
>   const value\_type\* data() const noexcept { ... }
> };
> 
> template class basic\_string<char\>;

Since an explicit template instantiation declaration for `basic_string<char>` is provided, the compiler is free to assume that `basic_string<char>::data()` will be provided by another translation unit, and it is free to produce an external call to this function. However, since `data()` has hidden visibility and the explicit template instantiation is provided in a shared library (as opposed to simply another translation unit), `basic_string<char>::data()` won’t be found and a link error will ensue. This happens because the compiler assumes that `basic_string<char>::data()` is part of the explicit template instantiation declaration, when it really isn’t. To tell the compiler that `data()` is not part of the explicit template instantiation declaration, the `exclude_from_explicit_instantiation` attribute can be used:

> // in <string>
> template <class CharT\>
> class basic\_string {
> public:
>   \_\_attribute\_\_((\_\_visibility\_\_("hidden")))
>   \_\_attribute\_\_((exclude\_from\_explicit\_instantiation))
>   const value\_type\* data() const noexcept { ... }
> };
> 
> template class basic\_string<char\>;

Now, the compiler won’t assume that `basic_string<char>::data()` is provided externally despite there being an explicit template instantiation declaration: the compiler will implicitly instantiate `basic_string<char>::data()` in the TUs where it is used.

This attribute can be used on static and non-static member functions of class templates, static data members of class templates and member classes of class templates.

### [export\_name, \_\_funcref](#id556)[¶](#export-name-funcref "Link to this heading")

Supported Syntaxes[¶](#id153 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`export_name`

`clang::export_name`

`clang::export_name`

`__funcref`

Yes

Clang supports the `__attribute__((export_name(<name>)))` attribute for the WebAssembly target. This attribute may be attached to a function declaration, where it modifies how the symbol is to be exported from the linked WebAssembly.

WebAssembly functions are exported via string name. By default when a symbol is exported, the export name for C/C++ symbols are the same as their C/C++ symbol names. This attribute can be used to override the default behavior, and request a specific string name be used instead.

### [ext\_vector\_type](#id557)[¶](#ext-vector-type "Link to this heading")

Supported Syntaxes[¶](#id154 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ext_vector_type`

`clang::ext_vector_type`

`clang::ext_vector_type`

The `ext_vector_type(N)` attribute specifies that a type is a vector with N elements, directly mapping to an LLVM vector type. Originally from OpenCL, it allows element access the array subscript operator `[]`, `sN` where N is a hexadecimal value, or `x, y, z, w` for graphics-style indexing. This attribute enables efficient SIMD operations and is usable in general-purpose code.

template <typename T, uint32\_t N\>
constexpr T simd\_reduce(T \[\[clang::ext\_vector\_type(N)\]\] v) {
  static\_assert((N & (N \- 1)) \== 0, "N must be a power of two");
  if constexpr (N \== 1)
    return v\[0\];
  else
    return simd\_reduce<T, N / 2\>(v.hi + v.lo);
}

The vector type also supports swizzling up to sixteen elements. This can be done using the object accessors. The OpenCL documentation lists all of the accepted values.

using f16\_x16 \= \_Float16 \_\_attribute\_\_((ext\_vector\_type(16)));

f16\_x16 reverse(f16\_x16 v) { return v.sfedcba9876543210; }

See the OpenCL documentation for some more complete examples.

### [flatten](#id558)[¶](#flatten "Link to this heading")

Supported Syntaxes[¶](#id155 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`flatten`

`gnu::flatten`

`gnu::flatten`

Yes

The `flatten` attribute causes calls within the attributed function to be inlined unless it is impossible to do so, for example if the body of the callee is unavailable or if the callee has the `noinline` attribute.

### [force\_align\_arg\_pointer](#id559)[¶](#force-align-arg-pointer "Link to this heading")

Supported Syntaxes[¶](#id156 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`force_align_arg_pointer`

`gnu::force_align_arg_pointer`

`gnu::force_align_arg_pointer`

Use this attribute to force stack alignment.

Legacy x86 code uses 4-byte stack alignment. Newer aligned SSE instructions (like ‘movaps’) that work with the stack require operands to be 16-byte aligned. This attribute realigns the stack in the function prologue to make sure the stack can be used with SSE instructions.

Note that the x86\_64 ABI forces 16-byte stack alignment at the call site. Because of this, ‘force\_align\_arg\_pointer’ is not needed on x86\_64, except in rare cases where the caller does not align the stack properly (e.g. flow jumps from i386 arch code).

> \_\_attribute\_\_ ((force\_align\_arg\_pointer))
> void f () {
>   ...
> }

### [format](#id560)[¶](#format "Link to this heading")

Supported Syntaxes[¶](#id157 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`format`

`gnu::format`

`gnu::format`

Clang supports the `format` attribute, which indicates that the function accepts (among other possibilities) a `printf` or `scanf`\-like format string and corresponding arguments or a `va_list` that contains these arguments.

Please see [GCC documentation about format attribute](http://gcc.gnu.org/onlinedocs/gcc/Function-Attributes.html) to find details about attribute syntax.

Clang implements two kinds of checks with this attribute.

1.  Clang checks that the function with the `format` attribute is called with a format string that uses format specifiers that are allowed, and that arguments match the format string. This is the `-Wformat` warning, it is on by default.
    
2.  Clang checks that the format string argument is a literal string. This is the `-Wformat-nonliteral` warning, it is off by default.
    
    Clang implements this mostly the same way as GCC, but there is a difference for functions that accept a `va_list` argument (for example, `vprintf`). GCC does not emit `-Wformat-nonliteral` warning for calls to such functions. Clang does not warn if the format string comes from a function parameter, where the function is annotated with a compatible attribute, otherwise it warns. For example:
    
    \_\_attribute\_\_((\_\_format\_\_ (\_\_scanf\_\_, 1, 3)))
    void foo(const char\* s, char \*buf, ...) {
      va\_list ap;
      va\_start(ap, buf);
    
      vprintf(s, ap); // warning: format string is not a string literal
    }
    
    In this case we warn because `s` contains a format string for a `scanf`\-like function, but it is passed to a `printf`\-like function.
    
    If the attribute is removed, clang still warns, because the format string is not a string literal.
    
    Another example:
    
    \_\_attribute\_\_((\_\_format\_\_ (\_\_printf\_\_, 1, 3)))
    void foo(const char\* s, char \*buf, ...) {
      va\_list ap;
      va\_start(ap, buf);
    
      vprintf(s, ap); // warning
    }
    
    In this case Clang does not warn because the format string `s` and the corresponding arguments are annotated. If the arguments are incorrect, the caller of `foo` will receive a warning.
    

As an extension to GCC’s behavior, Clang accepts the `format` attribute on non-variadic functions. Clang checks non-variadic format functions for the same classes of issues that can be found on variadic functions, as controlled by the same warning flags, except that the types of formatted arguments is forced by the function signature. For example:

\_\_attribute\_\_((\_\_format\_\_(\_\_printf\_\_, 1, 2)))
void fmt(const char \*s, const char \*a, int b);

void bar(void) {
  fmt("%s %i", "hello", 123); // OK
  fmt("%i %g", "hello", 123); // warning: arguments don't match format
  extern const char \*fmt;
  fmt(fmt, "hello", 123); // warning: format string is not a string literal
}

When using the format attribute on a variadic function, the first data parameter \_must\_ be the index of the ellipsis in the parameter list. Clang will generate a diagnostic otherwise, as it wouldn’t be possible to forward that argument list to printf\-family functions. For instance, this is an error:

\_\_attribute\_\_((\_\_format\_\_(\_\_printf\_\_, 1, 2)))
void fmt(const char \*s, int b, ...);
// ^ error: format attribute parameter 3 is out of bounds
// (must be \_\_printf\_\_, 1, 3)

Using the `format` attribute on a non-variadic function emits a GCC compatibility diagnostic.

### [format\_matches](#id561)[¶](#format-matches "Link to this heading")

Supported Syntaxes[¶](#id158 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`format_matches`

`gnu::format_matches`

`gnu::format_matches`

The `format` attribute is the basis for the enforcement of diagnostics in the `-Wformat` family, but it only handles the case where the format string is passed along with the arguments it is going to format. It cannot handle the case where the format string and the format arguments are passed separately from each other. For instance:

static const char \*first\_name;
static double todays\_temperature;
static int wind\_speed;

void say\_hi(const char \*fmt) {
  printf(fmt, first\_name, todays\_temperature);
      // ^ warning: format string is not a string literal
  printf(fmt, first\_name, wind\_speed);
      // ^ warning: format string is not a string literal
}

int main() {
  say\_hi("hello %s, it is %g degrees outside");
  say\_hi("hello %s, it is %d degrees outside!");
                        // ^ no diagnostic, but %d cannot format doubles
}

In this example, `fmt` is expected to format a `const char *` and a `double`, but these values are not passed to `say_hi`. Without the `format` attribute (which cannot apply in this case), the -Wformat-nonliteral diagnostic unnecessarily triggers in the body of `say_hi`, and incorrect `say_hi` call sites do not trigger a diagnostic.

To complement the `format` attribute, Clang also defines the `format_matches` attribute. Its syntax is similar to the `format` attribute’s, but instead of taking the index of the first formatted value argument, it takes a C string literal with the expected specifiers:

static const char \*first\_name;
static double todays\_temperature;
static int wind\_speed;

\_\_attribute\_\_((\_\_format\_matches\_\_(printf, 1, "%s %g")))
void say\_hi(const char \*fmt) {
  printf(fmt, first\_name, todays\_temperature); // no dignostic
  printf(fmt, first\_name, wind\_speed); // warning: format specifies type 'int' but the argument has type 'double'
}

int main() {
  say\_hi("hello %s, it is %g degrees outside");
  say\_hi("it is %g degrees outside, have a good day %s!");
  // warning: format specifies 'double' where 'const char \*' is required
  // warning: format specifies 'const char \*' where 'double' is required
}

The third argument to `format_matches` is expected to evaluate to a **C string literal** even when the format string would normally be a different type for the given flavor, like a `CFStringRef` or a `NSString *`.

The only requirement on the format string literal is that it has specifiers that are compatible with the arguments that will be used. It can contain arbitrary non-format characters. For instance, for the purposes of compile-time validation, `"%s scored %g%% on her test"` and `"%s%g"` are interchangeable as the format string argument. As a means of self-documentation, users may prefer the former when it provides a useful example of an expected format string.

In the implementation of a function with the `format_matches` attribute, format verification works as if the format string was identical to the one specified in the attribute.

\_\_attribute\_\_((\_\_format\_matches\_\_(printf, 1, "%s %g")))
void say\_hi(const char \*fmt) {
  printf(fmt, "person", 546);
                     // ^ warning: format specifies type 'double' but the
                     //   argument has type 'int'
  // note: format string is defined here:
  // \_\_attribute\_\_((\_\_format\_matches\_\_(printf, 1, "%s %g")))
  //                                                  ^~
}

At the call sites of functions with the `format_matches` attribute, format verification instead compares the two format strings to evaluate their equivalence. Each format flavor defines equivalence between format specifiers. Generally speaking, two specifiers are equivalent if they format the same type. For instance, in the `printf` flavor, `%2i` and `%-0.5d` are compatible. When `-Wformat-signedness` is disabled, `%d` and `%u` are compatible. For a negative example, `%ld` is incompatible with `%d`.

Do note the following un-obvious cases:

*   Passing `NULL` as the format string does not trigger format diagnostics.
    
*   When the format string is not NULL, it cannot \_miss\_ specifiers, even in trailing positions. For instance, `%d` is not accepted when the required format is `%d %d %d`.
    
*   While checks for the `format` attribute tolerate sone size mismatches that standard argument promotion renders immaterial (such as formatting an `int` with `%hhd`, which specifies a `char`\-sized integer), checks for `format_matches` require specified argument sizes to match exactly.
    
*   Format strings expecting a variable modifier (such as `%*s`) are incompatible with format strings that would itemize the variable modifiers (such as `%i %s`), even if the two specify ABI-compatible argument lists.
    
*   All pointer specifiers, modifiers aside, are mutually incompatible. For instance, `%s` is not compatible with `%p`, and `%p` is not compatible with `%n`, and `%hhn` is incompatible with `%s`, even if the pointers are ABI-compatible or identical on the selected platform. However, `%0.5s` is compatible with `%s`, since the difference only exists in modifier flags. This is not overridable with `-Wformat-pedantic` or its inverse, which control similar behavior in `-Wformat`.
    

At this time, clang implements `format_matches` only for format types in the `printf` family. This includes variants such as Apple’s NSString format and the FreeBSD `kprintf`, but excludes `scanf`. Using a known but unsupported format silently fails in order to be compatible with other implementations that would support these formats.

### [function\_return](#id562)[¶](#function-return "Link to this heading")

Supported Syntaxes[¶](#id159 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`function_return`

`gnu::function_return`

`gnu::function_return`

Yes

The attribute `function_return` can replace return instructions with jumps to target-specific symbols. This attribute supports 2 possible values, corresponding to the values supported by the `-mfunction-return=` command line flag:

*   `__attribute__((function_return("keep")))` to disable related transforms. This is useful for undoing global setting from `-mfunction-return=` locally for individual functions.
    
*   `__attribute__((function_return("thunk-extern")))` to replace returns with jumps, while NOT emitting the thunk.
    

The values `thunk` and `thunk-inline` from GCC are not supported.

The symbol used for `thunk-extern` is target specific: \* X86: `__x86_return_thunk`

As such, this function attribute is currently only supported on X86 targets.

### [gnu\_inline](#id563)[¶](#gnu-inline "Link to this heading")

Supported Syntaxes[¶](#id160 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`gnu_inline`

`gnu::gnu_inline`

`gnu::gnu_inline`

Yes

The `gnu_inline` changes the meaning of `extern inline` to use GNU inline semantics, meaning:

*   If any declaration that is declared `inline` is not declared `extern`, then the `inline` keyword is just a hint. In particular, an out-of-line definition is still emitted for a function with external linkage, even if all call sites are inlined, unlike in C99 and C++ inline semantics.
    
*   If all declarations that are declared `inline` are also declared `extern`, then the function body is present only for inlining and no out-of-line version is emitted.
    

Some important consequences: `static inline` emits an out-of-line version if needed, a plain `inline` definition emits an out-of-line version always, and an `extern inline` definition (in a header) followed by a (non-`extern`) `inline` declaration in a source file emits an out-of-line version of the function in that source file but provides the function body for inlining to all includers of the header.

Either `__GNUC_GNU_INLINE__` (GNU inline semantics) or `__GNUC_STDC_INLINE__` (C99 semantics) will be defined (they are mutually exclusive). If `__GNUC_STDC_INLINE__` is defined, then the `gnu_inline` function attribute can be used to get GNU inline semantics on a per function basis. If `__GNUC_GNU_INLINE__` is defined, then the translation unit is already being compiled with GNU inline semantics as the implied default. It is unspecified which macro is defined in a C++ compilation.

GNU inline semantics are the default behavior with `-std=gnu89`, `-std=c89`, `-std=c94`, or `-fgnu89-inline`.

### [guard](#id564)[¶](#guard "Link to this heading")

Supported Syntaxes[¶](#id161 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`guard`

`clang::guard`

`clang::guard`

`guard`

Yes

Code can indicate CFG checks are not wanted with the `__declspec(guard(nocf))` attribute. This directs the compiler to not insert any CFG checks for the entire function. This approach is typically used only sparingly in specific situations where the programmer has manually inserted “CFG-equivalent” protection. The programmer knows that they are calling through some read-only function table whose address is obtained through read-only memory references and for which the index is masked to the function table limit. This approach may also be applied to small wrapper functions that are not inlined and that do nothing more than make a call through a function pointer. Since incorrect usage of this directive can compromise the security of CFG, the programmer must be very careful using the directive. Typically, this usage is limited to very small functions that only call one function.

Control Flow Guard documentation <https://docs.microsoft.com/en-us/windows/win32/secbp/pe-metadata>

### [hot](#id565)[¶](#hot "Link to this heading")

Supported Syntaxes[¶](#id162 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`hot`

`gnu::hot`

`gnu::hot`

Yes

`__attribute__((hot))` marks a function as hot, as a manual alternative to PGO hotness data. If PGO data is available, the annotation `__attribute__((hot))` overrides the profile count based hotness (unlike `__attribute__((cold))`).

### [hybrid\_patchable](#id566)[¶](#hybrid-patchable "Link to this heading")

Supported Syntaxes[¶](#id163 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`hybrid_patchable`

`clang::hybrid_patchable`

`clang::hybrid_patchable`

`hybrid_patchable`

Yes

The `hybrid_patchable` attribute declares an ARM64EC function with an additional x86-64 thunk, which may be patched at runtime.

For more information see [ARM64EC ABI documentation](https://learn.microsoft.com/en-us/windows/arm/arm64ec-abi).

### [ifunc](#id567)[¶](#ifunc "Link to this heading")

Supported Syntaxes[¶](#id164 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ifunc`

`gnu::ifunc`

`gnu::ifunc`

Yes

`__attribute__((ifunc("resolver")))` is used to mark that the address of a declaration should be resolved at runtime by calling a resolver function.

The symbol name of the resolver function is given in quotes. A function with this name (after mangling) must be defined in the current translation unit; it may be `static`. The resolver function should return a pointer.

The `ifunc` attribute may only be used on a function declaration. A function declaration with an `ifunc` attribute is considered to be a definition of the declared entity. The entity must not have weak linkage; for example, in C++, it cannot be applied to a declaration if a definition at that location would be considered inline.

Not all targets support this attribute:

*   ELF target support depends on both the linker and runtime linker, and is available in at least lld 4.0 and later, binutils 2.20.1 and later, glibc v2.11.1 and later, and FreeBSD 9.1 and later.
    
*   Mach-O targets support it, but with slightly different semantics: the resolver is run at first call, instead of at load time by the runtime linker.
    
*   Windows target supports it on AArch64, but with different semantics: the `ifunc` is replaced with a global function pointer, and the call is replaced with an indirect call. The function pointer is initialized by a constructor that calls the resolver.
    
*   Baremetal target supports it on AVR.
    
*   Other targets currently do not support this attribute.
    

### [import\_module](#id568)[¶](#import-module "Link to this heading")

Supported Syntaxes[¶](#id165 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`import_module`

`clang::import_module`

`clang::import_module`

Yes

Clang supports the `__attribute__((import_module(<module_name>)))` attribute for the WebAssembly target. This attribute may be attached to a function declaration, where it modifies how the symbol is to be imported within the WebAssembly linking environment.

WebAssembly imports use a two-level namespace scheme, consisting of a module name, which typically identifies a module from which to import, and a field name, which typically identifies a field from that module to import. By default, module names for C/C++ symbols are assigned automatically by the linker. This attribute can be used to override the default behavior, and request a specific module name be used instead.

### [import\_name](#id569)[¶](#import-name "Link to this heading")

Supported Syntaxes[¶](#id166 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`import_name`

`clang::import_name`

`clang::import_name`

Yes

Clang supports the `__attribute__((import_name(<name>)))` attribute for the WebAssembly target. This attribute may be attached to a function declaration, where it modifies how the symbol is to be imported within the WebAssembly linking environment.

WebAssembly imports use a two-level namespace scheme, consisting of a module name, which typically identifies a module from which to import, and a field name, which typically identifies a field from that module to import. By default, field names for C/C++ symbols are the same as their C/C++ symbol names. This attribute can be used to override the default behavior, and request a specific field name be used instead.

### [internal\_linkage](#id570)[¶](#internal-linkage "Link to this heading")

Supported Syntaxes[¶](#id167 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`internal_linkage`

`clang::internal_linkage`

`clang::internal_linkage`

Yes

The `internal_linkage` attribute changes the linkage type of the declaration to internal. This is similar to C-style `static`, but can be used on classes and class methods. When applied to a class definition, this attribute affects all methods and static data members of that class. This can be used to contain the ABI of a C++ library by excluding unwanted class methods from the export tables.

### [interrupt (ARM)](#id571)[¶](#interrupt-arm "Link to this heading")

Supported Syntaxes[¶](#id168 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

`gnu::interrupt`

`gnu::interrupt`

Clang supports the GNU style `__attribute__((interrupt("TYPE")))` attribute on ARM targets. This attribute may be attached to a function definition and instructs the backend to generate appropriate function entry/exit code so that it can be used directly as an interrupt service routine.

The parameter passed to the interrupt attribute is optional, but if provided it must be a string literal with one of the following values: “IRQ”, “FIQ”, “SWI”, “ABORT”, “UNDEF”.

The semantics are as follows:

*   If the function is AAPCS, Clang instructs the backend to realign the stack to 8 bytes on entry. This is a general requirement of the AAPCS at public interfaces, but may not hold when an exception is taken. Doing this allows other AAPCS functions to be called.
    
*   If the CPU is M-class this is all that needs to be done since the architecture itself is designed in such a way that functions obeying the normal AAPCS ABI constraints are valid exception handlers.
    
*   If the CPU is not M-class, the prologue and epilogue are modified to save all non-banked registers that are used, so that upon return the user-mode state will not be corrupted. Note that to avoid unnecessary overhead, only general-purpose (integer) registers are saved in this way. If VFP operations are needed, that state must be saved manually.
    
    Specifically, interrupt kinds other than “FIQ” will save all core registers except “lr” and “sp”. “FIQ” interrupts will save r0-r7.
    
*   If the CPU is not M-class, the return instruction is changed to one of the canonical sequences permitted by the architecture for exception return. Where possible the function itself will make the necessary “lr” adjustments so that the “preferred return address” is selected.
    
    Unfortunately the compiler is unable to make this guarantee for an “UNDEF” handler, where the offset from “lr” to the preferred return address depends on the execution state of the code which generated the exception. In this case a sequence equivalent to “movs pc, lr” will be used.
    

### [interrupt (AVR)](#id572)[¶](#interrupt-avr "Link to this heading")

Supported Syntaxes[¶](#id169 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

`gnu::interrupt`

`gnu::interrupt`

Yes

Clang supports the GNU style `__attribute__((interrupt))` attribute on AVR targets. This attribute may be attached to a function definition and instructs the backend to generate appropriate function entry/exit code so that it can be used directly as an interrupt service routine.

On the AVR, the hardware globally disables interrupts when an interrupt is executed. The first instruction of an interrupt handler declared with this attribute is a SEI instruction to re-enable interrupts. See also the signal attribute that does not insert a SEI instruction.

### [interrupt (MIPS)](#id573)[¶](#interrupt-mips "Link to this heading")

Supported Syntaxes[¶](#id170 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

`gnu::interrupt`

`gnu::interrupt`

Yes

Clang supports the GNU style `__attribute__((interrupt("ARGUMENT")))` attribute on MIPS targets. This attribute may be attached to a function definition and instructs the backend to generate appropriate function entry/exit code so that it can be used directly as an interrupt service routine.

By default, the compiler will produce a function prologue and epilogue suitable for an interrupt service routine that handles an External Interrupt Controller (eic) generated interrupt. This behavior can be explicitly requested with the “eic” argument.

Otherwise, for use with vectored interrupt mode, the argument passed should be of the form “vector=LEVEL” where LEVEL is one of the following values: “sw0”, “sw1”, “hw0”, “hw1”, “hw2”, “hw3”, “hw4”, “hw5”. The compiler will then set the interrupt mask to the corresponding level which will mask all interrupts up to and including the argument.

The semantics are as follows:

*   The prologue is modified so that the Exception Program Counter (EPC) and Status coprocessor registers are saved to the stack. The interrupt mask is set so that the function can only be interrupted by a higher priority interrupt. The epilogue will restore the previous values of EPC and Status.
    
*   The prologue and epilogue are modified to save and restore all non-kernel registers as necessary.
    
*   The FPU is disabled in the prologue, as the floating pointer registers are not spilled to the stack.
    
*   The function return sequence is changed to use an exception return instruction.
    
*   The parameter sets the interrupt mask for the function corresponding to the interrupt level specified. If no mask is specified the interrupt mask defaults to “eic”.
    

### [interrupt (RISC-V)](#id574)[¶](#interrupt-risc-v "Link to this heading")

Supported Syntaxes[¶](#id171 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

`gnu::interrupt`

`gnu::interrupt`

Yes

Clang supports the GNU style `__attribute__((interrupt))` attribute on RISCV targets. This attribute may be attached to a function definition and instructs the backend to generate appropriate function entry/exit code so that it can be used directly as an interrupt service routine.

Permissible values for this parameter are `machine`, `supervisor`, `rnmi`, `qci-nest`, `qci-nonest`, `SiFive-CLIC-preemptible`, and `SiFive-CLIC-stack-swap`. If there is no parameter, then it defaults to `machine`.

The `rnmi` value is used for resumable non-maskable interrupts. It requires the standard Smrnmi extension.

The `qci-nest` and `qci-nonest` values require Qualcomm’s Xqciint extension and are used for Machine-mode Interrupts and Machine-mode Non-maskable interrupts. These use the following instructions from Xqciint to save and restore interrupt state to the stack – the `qci-nest` value will use `qc.c.mienter.nest` and the `qci-nonest` value will use `qc.c.mienter` to begin the interrupt handler. Both of these will use `qc.c.mileaveret` to restore the state and return to the previous context.

The `SiFive-CLIC-preemptible` and `SiFive-CLIC-stack-swap` values are used for machine-mode interrupts. For `SiFive-CLIC-preemptible` interrupts, the values of `mcause` and `mepc` are saved onto the stack, and interrupts are re-enabled. For `SiFive-CLIC-stack-swap` interrupts, the stack pointer is swapped with `mscratch` before its first use and after its last use.

The SiFive CLIC values may be combined with each other and with the `machine` attribute value. Any other combination of different values is not allowed.

Repeated interrupt attribute on the same declaration will cause a warning to be emitted. In case of repeated declarations, the last one prevails.

Refer to: [https://gcc.gnu.org/onlinedocs/gcc/RISC-V-Function-Attributes.html](https://gcc.gnu.org/onlinedocs/gcc/RISC-V-Function-Attributes.html) [https://riscv.org/specifications/privileged-isa/](https://riscv.org/specifications/privileged-isa/) The RISC-V Instruction Set Manual Volume II: Privileged Architecture Version 1.10. [https://github.com/quic/riscv-unified-db/releases/tag/Xqci-0.13.0](https://github.com/quic/riscv-unified-db/releases/tag/Xqci-0.13.0) [https://sifive.cdn.prismic.io/sifive/d1984d2b-c9b9-4c91-8de0-d68a5e64fa0f\_sifive-interrupt-cookbook-v1p2.pdf](https://sifive.cdn.prismic.io/sifive/d1984d2b-c9b9-4c91-8de0-d68a5e64fa0f_sifive-interrupt-cookbook-v1p2.pdf)

### [interrupt (X86)](#id575)[¶](#interrupt-x86 "Link to this heading")

Supported Syntaxes[¶](#id172 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

`gnu::interrupt`

`gnu::interrupt`

Clang supports the GNU style `__attribute__((interrupt))` attribute on X86 targets. This attribute may be attached to a function definition and instructs the backend to generate appropriate function entry/exit code so that it can be used directly as an interrupt service routine.

Interrupt handlers have access to the stack frame pushed onto the stack by the processor, and return using the `IRET` instruction. All registers in an interrupt handler are callee-saved. Exception handlers also have access to the error code pushed onto the stack by the processor, when applicable.

An interrupt handler must take the following arguments:

> \_\_attribute\_\_ ((interrupt))
> void f (struct stack\_frame \*frame) {
>     ...
> }
> 
> Where `struct stack_frame` is a suitable struct matching the stack frame pushed by the processor.

An exception handler must take the following arguments:

> \_\_attribute\_\_ ((interrupt))
> void g (struct stack\_frame \*frame, unsigned long code) {
>     ...
> }
> 
> On 32-bit targets, the `code` argument should be of type `unsigned int`.

Exception handlers should only be used when an error code is pushed by the processor. Using the incorrect handler type will crash the system.

Interrupt and exception handlers cannot be called by other functions and must have return type `void`.

Interrupt and exception handlers should only call functions with the ‘no\_caller\_saved\_registers’ attribute, or should be compiled with the ‘-mgeneral-regs-only’ flag to avoid saving unused non-GPR registers.

### [interrupt\_save\_fp (ARM)](#id576)[¶](#interrupt-save-fp-arm "Link to this heading")

Supported Syntaxes[¶](#id173 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt_save_fp`

Clang supports the GNU style `__attribute__((interrupt_save_fp("TYPE")))` on ARM targets. This attribute behaves the same way as the ARM interrupt attribute, except the general purpose floating point registers are also saved, along with FPEXC and FPSCR. Note, even on M-class CPUs, where the floating point context can be automatically saved depending on the FPCCR, the general purpose floating point registers will be saved.

### [lifetime\_capture\_by](#id577)[¶](#lifetime-capture-by "Link to this heading")

Supported Syntaxes[¶](#id174 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`lifetime_capture_by`

`clang::lifetime_capture_by`

Similar to [lifetimebound](#lifetimebound), the `lifetime_capture_by(X)` attribute on a function parameter or implicit object parameter indicates that the capturing entity `X` may refer to the object referred by that parameter.

Below is a list of types of the parameters and what they’re considered to refer to:

*   A reference param (of non-view type) is considered to refer to its referenced object.
    
*   A pointer param (of non-view type) is considered to refer to its pointee.
    
*   View type param (type annotated with `[[gsl::Pointer()]]`) is considered to refer to its pointee (gsl owner). This holds true even if the view type appears as a reference in the parameter. For example, both `std::string_view` and `const std::string_view &` are considered to refer to a `std::string`.
    
*   A `std::initializer_list<T>` is considered to refer to its underlying array.
    
*   Aggregates (arrays and simple `struct`s) are considered to refer to all objects that their transitive subobjects refer to.
    

Clang would diagnose when a temporary object is used as an argument to such an annotated parameter. In this case, the capturing entity `X` could capture a dangling reference to this temporary object.

void addToSet(std::string\_view a \[\[clang::lifetime\_capture\_by(s)\]\], std::set<std::string\_view\>& s) {
  s.insert(a);
}
void use() {
  std::set<std::string\_view\> s;
  addToSet(std::string(), s); // Warning: object whose reference is captured by 's' will be destroyed at the end of the full-expression.
  //       ^^^^^^^^^^^^^
  std::string local;
  addToSet(local, s); // Ok.
}

The capturing entity `X` can be one of the following:

*   Another (named) function parameter.
    
    void addToSet(std::string\_view a \[\[clang::lifetime\_capture\_by(s)\]\], std::set<std::string\_view\>& s) {
      s.insert(a);
    }
    
*   `this` (in case of member functions).
    
    class S {
      void addToSet(std::string\_view a \[\[clang::lifetime\_capture\_by(this)\]\]) {
        s.insert(a);
      }
      std::set<std::string\_view\> s;
    };
    
    Note: When applied to a constructor parameter, \[\[clang::lifetime\_capture\_by(this)\]\] is just an alias of \[\[clang::lifetimebound\]\].
    
*   global, unknown.
    
    std::set<std::string\_view\> s;
    void addToSet(std::string\_view a \[\[clang::lifetime\_capture\_by(global)\]\]) {
      s.insert(a);
    }
    void addSomewhere(std::string\_view a \[\[clang::lifetime\_capture\_by(unknown)\]\]);
    

The attribute can be applied to the implicit `this` parameter of a member function by writing the attribute after the function type:

struct S {
  const char \*data(std::set<S\*>& s) \[\[clang::lifetime\_capture\_by(s)\]\] {
    s.insert(this);
  }
};

The attribute supports specifying more than one capturing entities:

void addToSets(std::string\_view a \[\[clang::lifetime\_capture\_by(s1, s2)\]\],
               std::set<std::string\_view\>& s1,
               std::set<std::string\_view\>& s2) {
  s1.insert(a);
  s2.insert(a);
}

Limitation: The capturing entity `X` is not used by the analysis and is used for documentation purposes only. This is because the analysis is statement-local and only detects use of a temporary as an argument to the annotated parameter.

void addToSet(std::string\_view a \[\[clang::lifetime\_capture\_by(s)\]\], std::set<std::string\_view\>& s);
void use() {
  std::set<std::string\_view\> s;
  if (foo()) {
    std::string str;
    addToSet(str, s); // Not detected.
  }
}

### [lifetimebound](#id578)[¶](#lifetimebound "Link to this heading")

Supported Syntaxes[¶](#id175 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`lifetimebound`

`clang::lifetimebound`

The `lifetimebound` attribute on a function parameter or implicit object parameter indicates that objects that are referred to by that parameter may also be referred to by the return value of the annotated function (or, for a parameter of a constructor, by the value of the constructed object).

By default, a reference is considered to refer to its referenced object, a pointer is considered to refer to its pointee, a `std::initializer_list<T>` is considered to refer to its underlying array, and aggregates (arrays and simple `struct`s) are considered to refer to all objects that their transitive subobjects refer to.

Clang warns if it is able to detect that an object or reference refers to another object with a shorter lifetime. For example, Clang will warn if a function returns a reference to a local variable, or if a reference is bound to a temporary object whose lifetime is not extended. By using the `lifetimebound` attribute, this determination can be extended to look through user-declared functions. For example:

#include <map>
#include <string>

using namespace std::literals;

// Returns m\[key\] if key is present, or default\_value if not.
template<typename T, typename U\>
const U &get\_or\_default(const std::map<T, U\> &m \[\[clang::lifetimebound\]\],
                        const T &key, /\* note, not lifetimebound \*/
                        const U &default\_value \[\[clang::lifetimebound\]\]) {
  if (auto iter \= m.find(key); iter != m.end()) return iter\->second;
  else return default\_value;
}

int main() {
  std::map<std::string, std::string\> m;
  // warning: temporary bound to local reference 'val1' will be destroyed
  // at the end of the full-expression
  const std::string &val1 \= get\_or\_default(m, "foo"s, "bar"s);

  // No warning in this case.
  std::string def\_val \= "bar"s;
  const std::string &val2 \= get\_or\_default(m, "foo"s, def\_val);

  return 0;
}

The attribute can be applied to the implicit `this` parameter of a member function by writing the attribute after the function type:

struct string {
  // The returned pointer should not outlive \`\`\*this\`\`.
  const char \*data() const \[\[clang::lifetimebound\]\];
};

This attribute is inspired by the C++ committee paper [P0936R0](http://wg21.link/p0936r0), but does not affect whether temporary objects have their lifetimes extended.

### [long\_call, far](#id579)[¶](#long-call-far "Link to this heading")

Supported Syntaxes[¶](#id176 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`long_call`  
`far`

`gnu::long_call`  
`gnu::far`

`gnu::long_call`  
`gnu::far`

Yes

Clang supports the `__attribute__((long_call))`, `__attribute__((far))`, and `__attribute__((near))` attributes on MIPS targets. These attributes may only be added to function declarations and change the code generated by the compiler when directly calling the function. The `near` attribute allows calls to the function to be made using the `jal` instruction, which requires the function to be located in the same naturally aligned 256MB segment as the caller. The `long_call` and `far` attributes are synonyms and require the use of a different call sequence that works regardless of the distance between the functions.

These attributes have no effect for position-independent code.

These attributes take priority over command line switches such as `-mlong-calls` and `-mno-long-calls`.

### [malloc](#id580)[¶](#malloc "Link to this heading")

Supported Syntaxes[¶](#id177 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`malloc`

`gnu::malloc`

`gnu::malloc`

`restrict`

Yes

The `malloc` attribute has two forms with different functionality. The first is when it is used without arguments, where it marks that a function acts like a system memory allocation function, returning a pointer to allocated storage that does not alias storage from any other object accessible to the caller.

The second form is when `malloc` takes one or two arguments. The first argument names a function that should be associated with this function as its deallocation function. When this form is used, it enables the compiler to diagnose when the incorrect deallocation function is used with this variable. However the associated warning, spelled \-Wmismatched-dealloc in GCC, is not yet implemented in clang.

### [micromips, nomicromips](#id581)[¶](#micromips-nomicromips "Link to this heading")

Supported Syntaxes[¶](#id178 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`micromips`  
`nomicromips`

`gnu::micromips`  
`gnu::nomicromips`

`gnu::micromips`  
`gnu::nomicromips`

Yes

Clang supports the GNU style `__attribute__((micromips))` and `__attribute__((nomicromips))` attributes on MIPS targets. These attributes may be attached to a function definition and instructs the backend to generate or not to generate microMIPS code for that function.

These attributes override the `-mmicromips` and `-mno-micromips` options on the command line.

### [mig\_server\_routine](#id582)[¶](#mig-server-routine "Link to this heading")

Supported Syntaxes[¶](#id179 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`mig_server_routine`

`clang::mig_server_routine`

`clang::mig_server_routine`

Yes

The Mach Interface Generator release-on-success convention dictates functions that follow it to only release arguments passed to them when they return “success” (a `kern_return_t` error code that indicates that no errors have occurred). Otherwise the release is performed by the MIG client that called the function. The annotation `__attribute__((mig_server_routine))` is applied in order to specify which functions are expected to follow the convention. This allows the Static Analyzer to find bugs caused by violations of that convention. The attribute would normally appear on the forward declaration of the actual server routine in the MIG server header, but it may also be added to arbitrary functions that need to follow the same convention - for example, a user can add them to auxiliary functions called by the server routine that have their return value of type `kern_return_t` unconditionally returned from the routine. The attribute can be applied to C++ methods, and in this case it will be automatically applied to overrides if the method is virtual. The attribute can also be written using C++11 syntax: `[[mig::server_routine]]`.

### [min\_vector\_width](#id583)[¶](#min-vector-width "Link to this heading")

Supported Syntaxes[¶](#id180 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`min_vector_width`

`clang::min_vector_width`

`clang::min_vector_width`

Yes

Clang supports the `__attribute__((min_vector_width(width)))` attribute. This attribute may be attached to a function and informs the backend that this function desires vectors of at least this width to be generated. Target-specific maximum vector widths still apply. This means even if you ask for something larger than the target supports, you will only get what the target supports. This attribute is meant to be a hint to control target heuristics that may generate narrower vectors than what the target hardware supports.

This is currently used by the X86 target to allow some CPUs that support 512-bit vectors to be limited to using 256-bit vectors to avoid frequency penalties. This is currently enabled with the `-prefer-vector-width=256` command line option. The `min_vector_width` attribute can be used to prevent the backend from trying to split vector operations to match the `prefer-vector-width`. All X86 vector intrinsics from x86intrin.h already set this attribute. Additionally, use of any of the X86-specific vector builtins will implicitly set this attribute on the calling function. The intent is that explicitly writing vector code using the X86 intrinsics will prevent `prefer-vector-width` from affecting the code.

### [minsize](#id584)[¶](#minsize "Link to this heading")

Supported Syntaxes[¶](#id181 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`minsize`

`clang::minsize`

`clang::minsize`

Yes

This function attribute indicates that optimization passes and code generator passes make choices that keep the function code size as small as possible. Optimizations may also sacrifice runtime performance in order to minimize the size of the generated code.

### [no\_builtin](#id585)[¶](#no-builtin "Link to this heading")

Supported Syntaxes[¶](#id182 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_builtin`

`clang::no_builtin`

`clang::no_builtin`

Yes

The `__attribute__((no_builtin))` is similar to the `-fno-builtin` flag except it is specific to the body of a function. The attribute may also be applied to a virtual function but has no effect on the behavior of overriding functions in a derived class.

It accepts one or more strings corresponding to the specific names of the builtins to disable (e.g. “memcpy”, “memset”). If the attribute is used without parameters it will disable all buitins at once.

// The compiler is not allowed to add any builtin to foo's body.
void foo(char\* data, size\_t count) \_\_attribute\_\_((no\_builtin)) {
  // The compiler is not allowed to convert the loop into
  // \`\_\_builtin\_memset(data, 0xFE, count);\`.
  for (size\_t i \= 0; i < count; ++i)
    data\[i\] \= 0xFE;
}

// The compiler is not allowed to add the \`memcpy\` builtin to bar's body.
void bar(char\* data, size\_t count) \_\_attribute\_\_((no\_builtin("memcpy"))) {
  // The compiler is allowed to convert the loop into
  // \`\_\_builtin\_memset(data, 0xFE, count);\` but cannot generate any
  // \`\_\_builtin\_memcpy\`
  for (size\_t i \= 0; i < count; ++i)
    data\[i\] \= 0xFE;
}

### [no\_caller\_saved\_registers](#id586)[¶](#no-caller-saved-registers "Link to this heading")

Supported Syntaxes[¶](#id183 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_caller_saved_registers`

`gnu::no_caller_saved_registers`

`gnu::no_caller_saved_registers`

Use this attribute to indicate that the specified function has no caller-saved registers. That is, all registers are callee-saved except for registers used for passing parameters to the function or returning parameters from the function. The compiler saves and restores any modified registers that were not used for passing or returning arguments to the function.

The user can call functions specified with the ‘no\_caller\_saved\_registers’ attribute from an interrupt handler without saving and restoring all call-clobbered registers.

Functions specified with the ‘no\_caller\_saved\_registers’ attribute should only call other functions with the ‘no\_caller\_saved\_registers’ attribute, or should be compiled with the ‘-mgeneral-regs-only’ flag to avoid saving unused non-GPR registers.

Note that ‘no\_caller\_saved\_registers’ attribute is not a calling convention. In fact, it only overrides the decision of which registers should be saved by the caller, but not how the parameters are passed from the caller to the callee.

For example:

> \_\_attribute\_\_ ((no\_caller\_saved\_registers, fastcall))
> void f (int arg1, int arg2) {
>   ...
> }
> 
> In this case parameters ‘arg1’ and ‘arg2’ will be passed in registers. In this case, on 32-bit x86 targets, the function ‘f’ will use ECX and EDX as register parameters. However, it will not assume any scratch registers and should save and restore any modified registers except for ECX and EDX.

### [no\_profile\_instrument\_function](#id587)[¶](#no-profile-instrument-function "Link to this heading")

Supported Syntaxes[¶](#id184 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_profile_instrument_function`

`gnu::no_profile_instrument_function`

`gnu::no_profile_instrument_function`

Yes

Use the `no_profile_instrument_function` attribute on a function declaration to denote that the compiler should not instrument the function with profile-related instrumentation, such as via the `-fprofile-generate` / `-fprofile-instr-generate` / `-fcs-profile-generate` / `-fprofile-arcs` flags.

### [no\_sanitize](#id588)[¶](#no-sanitize "Link to this heading")

Supported Syntaxes[¶](#id185 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_sanitize`

`clang::no_sanitize`  
`gnu::no_sanitize`

`clang::no_sanitize`  
`gnu::no_sanitize`

Yes

Use the `no_sanitize` attribute on a function or a global variable declaration to specify that a particular instrumentation or set of instrumentations should not be applied.

The attribute takes a list of string literals with the following accepted values: \* all values accepted by `-fno-sanitize=`; \* `coverage`, to disable SanitizerCoverage instrumentation.

For example, `__attribute__((no_sanitize("address", "thread")))` specifies that AddressSanitizer and ThreadSanitizer should not be applied to the function or variable. Using `__attribute__((no_sanitize("coverage")))` specifies that SanitizerCoverage should not be applied to the function.

See [Controlling Code Generation](https://clang.llvm.org/docs/UsersManual.html#controlling-code-generation) for a full list of supported sanitizer flags.

### [no\_sanitize\_address, no\_address\_safety\_analysis](#id589)[¶](#no-sanitize-address-no-address-safety-analysis "Link to this heading")

Supported Syntaxes[¶](#id186 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_address_safety_analysis`  
`no_sanitize_address`  
`no_sanitize_thread`  
`no_sanitize_memory`

`gnu::no_address_safety_analysis`  
`gnu::no_sanitize_address`  
`gnu::no_sanitize_thread`  
`clang::no_sanitize_memory`

`gnu::no_address_safety_analysis`  
`gnu::no_sanitize_address`  
`gnu::no_sanitize_thread`  
`clang::no_sanitize_memory`

Yes

Use `__attribute__((no_sanitize_address))` on a function or a global variable declaration to specify that address safety instrumentation (e.g. AddressSanitizer) should not be applied.

### [no\_sanitize\_memory](#id590)[¶](#no-sanitize-memory "Link to this heading")

Supported Syntaxes[¶](#id187 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_address_safety_analysis`  
`no_sanitize_address`  
`no_sanitize_thread`  
`no_sanitize_memory`

`gnu::no_address_safety_analysis`  
`gnu::no_sanitize_address`  
`gnu::no_sanitize_thread`  
`clang::no_sanitize_memory`

`gnu::no_address_safety_analysis`  
`gnu::no_sanitize_address`  
`gnu::no_sanitize_thread`  
`clang::no_sanitize_memory`

Yes

Use `__attribute__((no_sanitize_memory))` on a function declaration to specify that checks for uninitialized memory should not be inserted (e.g. by MemorySanitizer). The function may still be instrumented by the tool to avoid false positives in other places.

### [no\_sanitize\_thread](#id591)[¶](#no-sanitize-thread "Link to this heading")

Supported Syntaxes[¶](#id188 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_address_safety_analysis`  
`no_sanitize_address`  
`no_sanitize_thread`  
`no_sanitize_memory`

`gnu::no_address_safety_analysis`  
`gnu::no_sanitize_address`  
`gnu::no_sanitize_thread`  
`clang::no_sanitize_memory`

`gnu::no_address_safety_analysis`  
`gnu::no_sanitize_address`  
`gnu::no_sanitize_thread`  
`clang::no_sanitize_memory`

Yes

Use `__attribute__((no_sanitize_thread))` on a function declaration to specify that checks for data races on plain (non-atomic) memory accesses should not be inserted by ThreadSanitizer. The function is still instrumented by the tool to avoid false positives and provide meaningful stack traces.

### [no\_speculative\_load\_hardening](#id592)[¶](#no-speculative-load-hardening "Link to this heading")

Supported Syntaxes[¶](#id189 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_speculative_load_hardening`

`clang::no_speculative_load_hardening`

`clang::no_speculative_load_hardening`

Yes

This attribute can be applied to a function declaration in order to indicate

that [Speculative Load Hardening](https://llvm.org/docs/SpeculativeLoadHardening.html) is _not_ needed for the function body. This can also be applied to a method in Objective C. This attribute will take precedence over the command line flag in the case where [\-mspeculative-load-hardening](https://clang.llvm.org/docs/ClangCommandLineReference.html#cmdoption-clang-mspeculative-load-hardening) is specified.

Warning: This attribute may not prevent Speculative Load Hardening from being enabled for a function which inlines a function that has the ‘speculative\_load\_hardening’ attribute. This is intended to provide a maximally conservative model where the code that is marked with the ‘speculative\_load\_hardening’ attribute will always (even when inlined) be hardened. A user of this attribute may want to mark functions called by a function they do not want to be hardened with the ‘noinline’ attribute.

For example:

\_\_attribute\_\_((speculative\_load\_hardening))
int foo(int i) {
  return i;
}

// Note: bar() may still have speculative load hardening enabled if
// foo() is inlined into bar(). Mark foo() with \_\_attribute\_\_((noinline))
// to avoid this situation.
\_\_attribute\_\_((no\_speculative\_load\_hardening))
int bar(int i) {
  return foo(i);
}

### [no\_split\_stack](#id593)[¶](#no-split-stack "Link to this heading")

Supported Syntaxes[¶](#id190 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_split_stack`

`gnu::no_split_stack`

`gnu::no_split_stack`

Yes

The `no_split_stack` attribute disables the emission of the split stack preamble for a particular function. It has no effect if `-fsplit-stack` is not specified.

### [no\_stack\_protector, safebuffers](#id594)[¶](#no-stack-protector-safebuffers "Link to this heading")

Supported Syntaxes[¶](#id191 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_stack_protector`

`clang::no_stack_protector`  
`gnu::no_stack_protector`

`clang::no_stack_protector`  
`gnu::no_stack_protector`

`safebuffers`

Yes

Clang supports the GNU style `__attribute__((no_stack_protector))` and Microsoft style `__declspec(safebuffers)` attribute which disables the stack protector on the specified function. This attribute is useful for selectively disabling the stack protector on some functions when building with `-fstack-protector` compiler option.

For example, it disables the stack protector for the function `foo` but function `bar` will still be built with the stack protector with the `-fstack-protector` option.

int \_\_attribute\_\_((no\_stack\_protector))
foo (int x); // stack protection will be disabled for foo.

int bar(int y); // bar can be built with the stack protector.

### [noalias](#id595)[¶](#noalias "Link to this heading")

Supported Syntaxes[¶](#id192 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noalias`

The `noalias` attribute indicates that the only memory accesses inside function are loads and stores from objects pointed to by its pointer-typed arguments, with arbitrary offsets.

### [nocf\_check](#id596)[¶](#nocf-check "Link to this heading")

Supported Syntaxes[¶](#id193 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nocf_check`

`gnu::nocf_check`

`gnu::nocf_check`

Yes

Jump Oriented Programming attacks rely on tampering with addresses used by indirect call / jmp, e.g. redirect control-flow to non-programmer intended bytes in the binary. X86 Supports Indirect Branch Tracking (IBT) as part of Control-Flow Enforcement Technology (CET). IBT instruments ENDBR instructions used to specify valid targets of indirect call / jmp. The `nocf_check` attribute has two roles: 1. Appertains to a function - do not add ENDBR instruction at the beginning of the function. 2. Appertains to a function pointer - do not track the target function of this pointer (by adding nocf\_check prefix to the indirect-call instruction).

### [noconvergent](#id597)[¶](#noconvergent "Link to this heading")

Supported Syntaxes[¶](#id194 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noconvergent`

`clang::noconvergent`

`clang::noconvergent`

`noconvergent`

Yes

This attribute prevents a function from being treated as convergent; when a function is marked `noconvergent`, calls to that function are not automatically assumed to be convergent, unless such calls are explicitly marked as `convergent`. If a statement is marked as `noconvergent`, any calls to inline `asm` in that statement are no longer treated as convergent.

In languages following SPMD/SIMT programming model, e.g., CUDA/HIP, function declarations and inline asm calls are treated as convergent by default for correctness. This `noconvergent` attribute is helpful for developers to prevent them from being treated as convergent when it’s safe.

\_\_device\_\_ float bar(float);
\_\_device\_\_ float foo(float) \_\_attribute\_\_((noconvergent)) {}

\_\_device\_\_ int example(void) {
  float x;
  \[\[clang::noconvergent\]\] x \= bar(x); // no effect on convergence
  \[\[clang::noconvergent\]\] { asm volatile ("nop"); } // the asm call is non-convergent
}

### [nodiscard, warn\_unused\_result](#id598)[¶](#nodiscard-warn-unused-result "Link to this heading")

Supported Syntaxes[¶](#id195 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`warn_unused_result`

`nodiscard`  
`clang::warn_unused_result`  
`gnu::warn_unused_result`

`nodiscard`  
`gnu::warn_unused_result`

Yes

Clang supports the ability to diagnose when the results of a function call expression are discarded under suspicious circumstances. A diagnostic is generated when a function or its return type is marked with `[[nodiscard]]` (or `__attribute__((warn_unused_result))`) and the function call appears as a potentially-evaluated discarded-value expression that is not explicitly cast to `void`.

A string literal may optionally be provided to the attribute, which will be reproduced in any resulting diagnostics. Redeclarations using different forms of the attribute (with or without the string literal or with different string literal contents) are allowed. If there are redeclarations of the entity with differing string literals, it is unspecified which one will be used by Clang in any resulting diagnostics.

struct \[\[nodiscard\]\] error\_info { /\*...\*/ };
error\_info enable\_missile\_safety\_mode();

void launch\_missiles();
void test\_missiles() {
  enable\_missile\_safety\_mode(); // diagnoses
  launch\_missiles();
}
error\_info &foo();
void f() { foo(); } // Does not diagnose, error\_info is a reference.

Additionally, discarded temporaries resulting from a call to a constructor marked with `[[nodiscard]]` or a constructor of a type marked `[[nodiscard]]` will also diagnose. This also applies to type conversions that use the annotated `[[nodiscard]]` constructor or result in an annotated type.

struct \[\[nodiscard\]\] marked\_type {/\*..\*/ };
struct marked\_ctor {
  \[\[nodiscard\]\] marked\_ctor();
  marked\_ctor(int);
};

struct S {
  operator marked\_type() const;
  \[\[nodiscard\]\] operator int() const;
};

void usages() {
  marked\_type(); // diagnoses.
  marked\_ctor(); // diagnoses.
  marked\_ctor(3); // Does not diagnose, int constructor isn't marked nodiscard.

  S s;
  static\_cast<marked\_type\>(s); // diagnoses
  (int)s; // diagnoses
}

### [noduplicate](#id599)[¶](#noduplicate "Link to this heading")

Supported Syntaxes[¶](#id196 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noduplicate`

`clang::noduplicate`

`clang::noduplicate`

Yes

The `noduplicate` attribute can be placed on function declarations to control whether function calls to this function can be duplicated or not as a result of optimizations. This is required for the implementation of functions with certain special requirements, like the OpenCL “barrier” function, that might need to be run concurrently by all the threads that are executing in lockstep on the hardware. For example this attribute applied on the function “nodupfunc” in the code below avoids that:

void nodupfunc() \_\_attribute\_\_((noduplicate));
// Setting it as a C++11 attribute is also valid
// void nodupfunc() \[\[clang::noduplicate\]\];
void foo();
void bar();

nodupfunc();
if (a \> n) {
  foo();
} else {
  bar();
}

gets possibly modified by some optimizations into code similar to this:

if (a \> n) {
  nodupfunc();
  foo();
} else {
  nodupfunc();
  bar();
}

where the call to “nodupfunc” is duplicated and sunk into the two branches of the condition.

### [noinline](#id600)[¶](#noinline "Link to this heading")

Supported Syntaxes[¶](#id197 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noinline`

`gnu::noinline`  
`clang::noinline`  
`msvc::noinline`

`gnu::noinline`  
`clang::noinline`  
`msvc::noinline`

`noinline`

`__noinline__`

Yes

This function attribute suppresses the inlining of a function at the call sites of the function.

`[[clang::noinline]]` spelling can be used as a statement attribute; other spellings of the attribute are not supported on statements. If a statement is marked `[[clang::noinline]]` and contains calls, those calls inside the statement will not be inlined by the compiler.

`__noinline__` can be used as a keyword in CUDA/HIP languages. This is to avoid diagnostics due to usage of `__attribute__((__noinline__))` with `__noinline__` defined as a macro as `__attribute__((noinline))`.

int example(void) {
  int r;
  \[\[clang::noinline\]\] foo();
  \[\[clang::noinline\]\] r \= bar();
  return r;
}

### [noreturn, \_Noreturn](#id601)[¶](#noreturn-noreturn "Link to this heading")

Supported Syntaxes[¶](#id198 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noreturn`

`noreturn`  
`_Noreturn`

Yes

A function declared as `[[noreturn]]` shall not return to its caller. The compiler will generate a diagnostic for a function declared as `[[noreturn]]` that appears to be capable of returning to its caller.

The `[[_Noreturn]]` spelling is deprecated and only exists to ease code migration for code using `[[noreturn]]` after including `<stdnoreturn.h>`.

### [not\_tail\_called](#id602)[¶](#not-tail-called "Link to this heading")

Supported Syntaxes[¶](#id199 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`not_tail_called`

`clang::not_tail_called`

`clang::not_tail_called`

Yes

The `not_tail_called` attribute prevents tail-call optimization on statically bound calls. Objective-c methods, and functions marked as `always_inline` cannot be marked as `not_tail_called`.

For example, it prevents tail-call optimization in the following case:

> int \_\_attribute\_\_((not\_tail\_called)) foo1(int);
> 
> int foo2(int a) {
>   return foo1(a); // No tail-call optimization on direct calls.
> }

However, it doesn’t prevent tail-call optimization in this case:

> int \_\_attribute\_\_((not\_tail\_called)) foo1(int);
> 
> int foo2(int a) {
>   int (\*fn)(int) \= &foo1;
> 
>   // not\_tail\_called has no effect on an indirect call even if the call can
>   // be resolved at compile time.
>   return (\*fn)(a);
> }

Generally, marking an overriding virtual function as `not_tail_called` is not useful, because this attribute is a property of the static type. Calls made through a pointer or reference to the base class type will respect the `not_tail_called` attribute of the base class’s member function, regardless of the runtime destination of the call:

> struct Foo { virtual void f(); };
> struct Bar : Foo {
>   \[\[clang::not\_tail\_called\]\] void f() override;
> };
> void callera(Bar& bar) {
>   Foo& foo \= bar;
>   // not\_tail\_called has no effect on here, even though the
>   // underlying method is f from Bar.
>   foo.f();
>   bar.f(); // No tail-call optimization on here.
> }

### [nothrow](#id603)[¶](#nothrow "Link to this heading")

Supported Syntaxes[¶](#id200 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nothrow`

`gnu::nothrow`

`gnu::nothrow`

`nothrow`

Yes

Clang supports the GNU style `__attribute__((nothrow))` and Microsoft style `__declspec(nothrow)` attribute as an equivalent of `noexcept` on function declarations. This attribute informs the compiler that the annotated function does not throw an exception. This prevents exception-unwinding. This attribute is particularly useful on functions in the C Standard Library that are guaranteed to not throw an exception.

### [nouwtable](#id604)[¶](#nouwtable "Link to this heading")

Supported Syntaxes[¶](#id201 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nouwtable`

`clang::nouwtable`

`clang::nouwtable`

Yes

Clang supports the `nouwtable` attribute which skips emitting the unwind table entry for the specified function. This attribute is useful for selectively emitting the unwind table entry on some functions when building with `-funwind-tables` compiler option.

### [numthreads](#id605)[¶](#numthreads "Link to this heading")

Supported Syntaxes[¶](#id202 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

The `numthreads` attribute applies to HLSL shaders where explcit thread counts are required. The `X`, `Y`, and `Z` values provided to the attribute dictate the thread id. Total number of threads executed is `X * Y * Z`.

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sm5-attributes-numthreads](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sm5-attributes-numthreads)

### [objc\_method\_family](#id606)[¶](#objc-method-family "Link to this heading")

Supported Syntaxes[¶](#id203 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_method_family`

`clang::objc_method_family`

`clang::objc_method_family`

Yes

Many methods in Objective-C have conventional meanings determined by their selectors. It is sometimes useful to be able to mark a method as having a particular conventional meaning despite not having the right selector, or as not having the conventional meaning that its selector would suggest. For these use cases, we provide an attribute to specifically describe the “method family” that a method belongs to.

**Usage**: `__attribute__((objc_method_family(X)))`, where `X` is one of `none`, `alloc`, `copy`, `init`, `mutableCopy`, or `new`. This attribute can only be placed at the end of a method declaration:

\- (NSString \*)initMyStringValue \_\_attribute\_\_((objc\_method\_family(none)));

Users who do not wish to change the conventional meaning of a method, and who merely want to document its non-standard retain and release semantics, should use the retaining behavior attributes (`ns_returns_retained`, `ns_returns_not_retained`, etc).

Query for this feature with `__has_attribute(objc_method_family)`.

### [objc\_requires\_super](#id607)[¶](#objc-requires-super "Link to this heading")

Supported Syntaxes[¶](#id204 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_requires_super`

`clang::objc_requires_super`

`clang::objc_requires_super`

Yes

Some Objective-C classes allow a subclass to override a particular method in a parent class but expect that the overriding method also calls the overridden method in the parent class. For these cases, we provide an attribute to designate that a method requires a “call to `super`” in the overriding method in the subclass.

**Usage**: `__attribute__((objc_requires_super))`. This attribute can only be placed at the end of a method declaration:

\- (void)foo \_\_attribute\_\_((objc\_requires\_super));

This attribute can only be applied the method declarations within a class, and not a protocol. Currently this attribute does not enforce any placement of where the call occurs in the overriding method (such as in the case of `-dealloc` where the call must appear at the end). It checks only that it exists.

Note that on both OS X and iOS that the Foundation framework provides a convenience macro `NS_REQUIRES_SUPER` that provides syntactic sugar for this attribute:

\- (void)foo NS\_REQUIRES\_SUPER;

This macro is conditionally defined depending on the compiler’s support for this attribute. If the compiler does not support the attribute the macro expands to nothing.

Operationally, when a method has this annotation the compiler will warn if the implementation of an override in a subclass does not call super. For example:

warning: method possibly missing a \[super AnnotMeth\] call
\- (void) AnnotMeth{};
                   ^

### [optnone](#id608)[¶](#optnone "Link to this heading")

Supported Syntaxes[¶](#id205 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`optnone`

`clang::optnone`

`clang::optnone`

Yes

The `optnone` attribute suppresses essentially all optimizations on a function or method, regardless of the optimization level applied to the compilation unit as a whole. This is particularly useful when you need to debug a particular function, but it is infeasible to build the entire application without optimization. Avoiding optimization on the specified function can improve the quality of the debugging information for that function.

This attribute is incompatible with the `always_inline` and `minsize` attributes.

Note that this attribute does not apply recursively to nested functions such as lambdas or blocks when using declaration-specific attribute syntaxes such as double square brackets (`[[]]`) or `__attribute__`. The `#pragma` syntax can be used to apply the attribute to all functions, including nested functions, in a range of source code.

### [overloadable](#id609)[¶](#overloadable "Link to this heading")

Supported Syntaxes[¶](#id206 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`overloadable`

`clang::overloadable`

`clang::overloadable`

Yes

Clang provides support for C++ function overloading in C. Function overloading in C is introduced using the `overloadable` attribute. For example, one might provide several overloaded versions of a `tgsin` function that invokes the appropriate standard function computing the sine of a value with `float`, `double`, or `long double` precision:

#include <math.h>
float \_\_attribute\_\_((overloadable)) tgsin(float x) { return sinf(x); }
double \_\_attribute\_\_((overloadable)) tgsin(double x) { return sin(x); }
long double \_\_attribute\_\_((overloadable)) tgsin(long double x) { return sinl(x); }

Given these declarations, one can call `tgsin` with a `float` value to receive a `float` result, with a `double` to receive a `double` result, etc. Function overloading in C follows the rules of C++ function overloading to pick the best overload given the call arguments, with a few C-specific semantics:

*   Conversion from `float` or `double` to `long double` is ranked as a floating-point promotion (per C99) rather than as a floating-point conversion (as in C++).
    
*   A conversion from a pointer of type `T*` to a pointer of type `U*` is considered a pointer conversion (with conversion rank) if `T` and `U` are compatible types.
    
*   A conversion from type `T` to a value of type `U` is permitted if `T` and `U` are compatible types. This conversion is given “conversion” rank.
    
*   If no viable candidates are otherwise available, we allow a conversion from a pointer of type `T*` to a pointer of type `U*`, where `T` and `U` are incompatible. This conversion is ranked below all other types of conversions. Please note: `U` lacking qualifiers that are present on `T` is sufficient for `T` and `U` to be incompatible.
    

The declaration of `overloadable` functions is restricted to function declarations and definitions. If a function is marked with the `overloadable` attribute, then all declarations and definitions of functions with that name, except for at most one (see the note below about unmarked overloads), must have the `overloadable` attribute. In addition, redeclarations of a function with the `overloadable` attribute must have the `overloadable` attribute, and redeclarations of a function without the `overloadable` attribute must _not_ have the `overloadable` attribute. e.g.,

int f(int) \_\_attribute\_\_((overloadable));
float f(float); // error: declaration of "f" must have the "overloadable" attribute
int f(int); // error: redeclaration of "f" must have the "overloadable" attribute

int g(int) \_\_attribute\_\_((overloadable));
int g(int) { } // error: redeclaration of "g" must also have the "overloadable" attribute

int h(int);
int h(int) \_\_attribute\_\_((overloadable)); // error: declaration of "h" must not
                                          // have the "overloadable" attribute

Functions marked `overloadable` must have prototypes. Therefore, the following code is ill-formed:

int h() \_\_attribute\_\_((overloadable)); // error: h does not have a prototype

However, `overloadable` functions are allowed to use a ellipsis even if there are no named parameters (as is permitted in C++). This feature is particularly useful when combined with the `unavailable` attribute:

void honeypot(...) \_\_attribute\_\_((overloadable, unavailable)); // calling me is an error

Functions declared with the `overloadable` attribute have their names mangled according to the same rules as C++ function names. For example, the three `tgsin` functions in our motivating example get the mangled names `_Z5tgsinf`, `_Z5tgsind`, and `_Z5tgsine`, respectively. There are two caveats to this use of name mangling:

*   Future versions of Clang may change the name mangling of functions overloaded in C, so you should not depend on an specific mangling. To be completely safe, we strongly urge the use of `static inline` with `overloadable` functions.
    
*   The `overloadable` attribute has almost no meaning when used in C++, because names will already be mangled and functions are already overloadable. However, when an `overloadable` function occurs within an `extern "C"` linkage specification, its name _will_ be mangled in the same way as it would in C.
    

For the purpose of backwards compatibility, at most one function with the same name as other `overloadable` functions may omit the `overloadable` attribute. In this case, the function without the `overloadable` attribute will not have its name mangled.

For example:

// Notes with mangled names assume Itanium mangling.
int f(int);
int f(double) \_\_attribute\_\_((overloadable));
void foo() {
  f(5); // Emits a call to f (not \_Z1fi, as it would with an overload that
        // was marked with overloadable).
  f(1.0); // Emits a call to \_Z1fd.
}

Support for unmarked overloads is not present in some versions of clang. You may query for it using `__has_extension(overloadable_unmarked)`.

Query for this attribute with `__has_attribute(overloadable)`.

### [ownership\_holds, ownership\_returns, ownership\_takes (Clang Static Analyzer)](#id610)[¶](#ownership-holds-ownership-returns-ownership-takes-clang-static-analyzer "Link to this heading")

Supported Syntaxes[¶](#id207 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ownership_holds`  
`ownership_returns`  
`ownership_takes`

`clang::ownership_holds`  
`clang::ownership_returns`  
`clang::ownership_takes`

`clang::ownership_holds`  
`clang::ownership_returns`  
`clang::ownership_takes`

Note

In order for the Clang Static Analyzer to acknowledge these attributes, the `Optimistic` config needs to be set to true for the checker `unix.DynamicMemoryModeling`:

`-Xclang -analyzer-config -Xclang unix.DynamicMemoryModeling:Optimistic=true`

These attributes are used by the Clang Static Analyzer’s dynamic memory modeling facilities to mark custom allocating/deallocating functions.

All 3 attributes’ first parameter of type string is the type of the allocation: `malloc`, `new`, etc. to allow for catching [mismatched deallocation](https://clang.llvm.org/docs/analyzer/checkers.html#unix-mismatcheddeallocator) bugs. The allocation type can be any string, e.g. a function annotated with returning a piece of memory of type `lasagna` but freed with a function annotated to release `cheese` typed memory will result in mismatched deallocation warning.

The (currently) only allocation type having special meaning is `malloc` – the Clang Static Analyzer makes sure that allocating functions annotated with `malloc` are treated like they used the standard `malloc()`, and can be safely deallocated with the standard `free()`.

*   Use `ownership_returns` to mark a function as an allocating function. Takes 1 parameter to denote the allocation type.
    
*   Use `ownership_takes` to mark a function as a deallocating function. Takes 2 parameters: the allocation type, and the index of the parameter that is being deallocated (counting from 1).
    
*   Use `ownership_holds` to mark that a function takes over the ownership of a piece of memory and will free it at some unspecified point in the future. Like `ownership_takes`, this takes 2 parameters: the allocation type, and the index of the parameter whose ownership will be taken over (counting from 1).
    

The annotations `ownership_takes` and `ownership_holds` both prevent memory leak reports (concerning the specified argument); the difference between them is that using taken memory is a use-after-free error, while using held memory is assumed to be legitimate.

Example:

// Denotes that my\_malloc will return with a dynamically allocated piece of
// memory using malloc().
void \_\_attribute((ownership\_returns(malloc))) \*my\_malloc(size\_t);

// Denotes that my\_free will deallocate its parameter using free().
void \_\_attribute((ownership\_takes(malloc, 1))) my\_free(void \*);

// Denotes that my\_hold will take over the ownership of its parameter that was
// allocated via malloc().
void \_\_attribute((ownership\_holds(malloc, 1))) my\_hold(void \*);

Further reading about dynamic memory modeling in the Clang Static Analyzer is found in these checker docs: [unix.Malloc](https://clang.llvm.org/docs/analyzer/checkers.html#unix-malloc), [unix.MallocSizeof](https://clang.llvm.org/docs/analyzer/checkers.html#unix-mallocsizeof), [unix.MismatchedDeallocator](https://clang.llvm.org/docs/analyzer/checkers.html#unix-mismatcheddeallocator), [cplusplus.NewDelete](https://clang.llvm.org/docs/analyzer/checkers.html#cplusplus-newdelete), [cplusplus.NewDeleteLeaks](https://clang.llvm.org/docs/analyzer/checkers.html#cplusplus-newdeleteleaks), [optin.taint.TaintedAlloc](https://clang.llvm.org/docs/analyzer/checkers.html#optin-taint-taintedalloc). Mind that many more checkers are affected by dynamic memory modeling changes to some extent.

Further reading for other annotations: [Source Annotations in the Clang Static Analyzer](https://clang.llvm.org/docs/analyzer/user-docs/Annotations.html).

### [packoffset](#id611)[¶](#packoffset "Link to this heading")

Supported Syntaxes[¶](#id208 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`packoffset`

The packoffset attribute is used to change the layout of a cbuffer. Attribute spelling in HLSL is: `packoffset( c[Subcomponent][.component] )`. A subcomponent is a register number, which is an integer. A component is in the form of \[.xyzw\].

Examples:

cbuffer A {
  float3 a : packoffset(c0.y);
  float4 b : packoffset(c4);
}

The full documentation is available here: [https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-variable-packoffset](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-variable-packoffset)

### [patchable\_function\_entry](#id612)[¶](#patchable-function-entry "Link to this heading")

Supported Syntaxes[¶](#id209 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`patchable_function_entry`

`gnu::patchable_function_entry`

`gnu::patchable_function_entry`

Yes

`__attribute__((patchable_function_entry(N,M,Section)))` is used to generate M NOPs before the function entry and N-M NOPs after the function entry, with a record of the entry stored in section `Section`. This attribute takes precedence over the command line option `-fpatchable-function-entry=N,M,Section`. `M` defaults to 0 if omitted.\`\`Section\`\` defaults to the `-fpatchable-function-entry` section name if set, or to `__patchable_function_entries` otherwise.

This attribute is only supported on aarch64/aarch64-be/loongarch32/loongarch64/riscv32/riscv64/i386/x86-64/ppc/ppc64 targets. For ppc/ppc64 targets, AIX is still not supported.

### [preserve\_access\_index](#id613)[¶](#preserve-access-index "Link to this heading")

Supported Syntaxes[¶](#id210 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preserve_access_index`

`clang::preserve_access_index`

`clang::preserve_access_index`

Yes

Clang supports the `__attribute__((preserve_access_index))` attribute for the BPF target. This attribute may be attached to a struct or union declaration, where if -g is specified, it enables preserving struct or union member access debuginfo indices of this struct or union, similar to clang `__builtin_preserve_access_index()`.

### [preserve\_static\_offset](#id614)[¶](#preserve-static-offset "Link to this heading")

Supported Syntaxes[¶](#id211 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`preserve_static_offset`

`clang::preserve_static_offset`

`clang::preserve_static_offset`

Yes

Clang supports the `__attribute__((preserve_static_offset))` attribute for the BPF target. This attribute may be attached to a struct or union declaration. Reading or writing fields of types having such annotation is guaranteed to generate LDX/ST/STX instruction with offset corresponding to the field.

For example:

struct foo {
  int a;
  int b;
};

struct bar {
  int a;
  struct foo b;
} \_\_attribute\_\_((preserve\_static\_offset));

void buz(struct bar \*g) {
  g\->b.a \= 42;
}

The assignment to `g`’s field would produce an ST instruction with offset 8: `*(u32)(r1 + 8) = 42;`.

Without this attribute generated instructions might be different, depending on optimizations behavior. E.g. the example above could be rewritten as `r1 += 8; *(u32)(r1 + 0) = 42;`.

### [register](#id615)[¶](#register "Link to this heading")

Supported Syntaxes[¶](#id212 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`register`

The resource binding attribute sets the virtual register and logical register space for a resource. Attribute spelling in HLSL is: `register(slot [, space])`. `slot` takes the format `[type][number]`, where `type` is a single character specifying the resource type and `number` is the virtual register number.

Register types are: t for shader resource views (SRV), s for samplers, u for unordered access views (UAV), b for constant buffer views (CBV).

Register space is specified in the format `space[number]` and defaults to `space0` if omitted. Here’re resource binding examples with and without space:

RWBuffer<float\> Uav : register(u3, space1);
Buffer<float\> Buf : register(t1);

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3d12/resource-binding-in-hlsl](https://docs.microsoft.com/en-us/windows/win32/direct3d12/resource-binding-in-hlsl)

### [reinitializes](#id616)[¶](#reinitializes "Link to this heading")

Supported Syntaxes[¶](#id213 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`reinitializes`

`clang::reinitializes`

The `reinitializes` attribute can be applied to a non-static, non-const C++ member function to indicate that this member function reinitializes the entire object to a known state, independent of the previous state of the object.

This attribute can be interpreted by static analyzers that warn about uses of an object that has been left in an indeterminate state by a move operation. If a member function marked with the `reinitializes` attribute is called on a moved-from object, the analyzer can conclude that the object is no longer in an indeterminate state.

A typical example where this attribute would be used is on functions that clear a container class:

template <class T\>
class Container {
public:
  ...
  \[\[clang::reinitializes\]\] void Clear();
  ...
};

### [release\_capability, release\_shared\_capability](#id617)[¶](#release-capability-release-shared-capability "Link to this heading")

Supported Syntaxes[¶](#id214 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`release_capability`  
`release_shared_capability`  
`release_generic_capability`  
`unlock_function`

`clang::release_capability`  
`clang::release_shared_capability`  
`clang::release_generic_capability`  
`clang::unlock_function`

Marks a function as releasing a capability.

### [retain](#id618)[¶](#retain "Link to this heading")

Supported Syntaxes[¶](#id215 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`retain`

`gnu::retain`

`gnu::retain`

This attribute, when attached to a function or variable definition, prevents section garbage collection in the linker. It does not prevent other discard mechanisms, such as archive member selection, and COMDAT group resolution.

If the compiler does not emit the definition, e.g. because it was not used in the translation unit or the compiler was able to eliminate all of the uses, this attribute has no effect. This attribute is typically combined with the `used` attribute to force the definition to be emitted and preserved into the final linked image.

This attribute is only necessary on ELF targets; other targets prevent section garbage collection by the linker when using the `used` attribute alone. Using the attributes together should result in consistent behavior across targets.

This attribute requires the linker to support the `SHF_GNU_RETAIN` extension. This support is available in GNU `ld` and `gold` as of binutils 2.36, as well as in `ld.lld` 13.

### [shader](#id619)[¶](#shader "Link to this heading")

Supported Syntaxes[¶](#id216 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

The `shader` type attribute applies to HLSL shader entry functions to identify the shader type for the entry function. The syntax is:

\`\`\[shader(string-literal)\]\`\`

where the string literal is one of: “pixel”, “vertex”, “geometry”, “hull”, “domain”, “compute”, “raygeneration”, “intersection”, “anyhit”, “closesthit”, “miss”, “callable”, “mesh”, “amplification”. Normally the shader type is set by shader target with the `-T` option like `-Tps_6_1`. When compiling to a library target like `lib_6_3`, the shader type attribute can help the compiler to identify the shader type. It is mostly used by Raytracing shaders where shaders must be compiled into a library and linked at runtime.

### [short\_call, near](#id620)[¶](#short-call-near "Link to this heading")

Supported Syntaxes[¶](#id217 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`short_call`  
`near`

`gnu::short_call`  
`gnu::near`

`gnu::short_call`  
`gnu::near`

Yes

Clang supports the `__attribute__((long_call))`, `__attribute__((far))`, `__attribute__((short__call))`, and `__attribute__((near))` attributes on MIPS targets. These attributes may only be added to function declarations and change the code generated by the compiler when directly calling the function. The `short_call` and `near` attributes are synonyms and allow calls to the function to be made using the `jal` instruction, which requires the function to be located in the same naturally aligned 256MB segment as the caller. The `long_call` and `far` attributes are synonyms and require the use of a different call sequence that works regardless of the distance between the functions.

These attributes have no effect for position-independent code.

These attributes take priority over command line switches such as `-mlong-calls` and `-mno-long-calls`.

### [signal](#id621)[¶](#signal "Link to this heading")

Supported Syntaxes[¶](#id218 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`signal`

`gnu::signal`

`gnu::signal`

Yes

Clang supports the GNU style `__attribute__((signal))` attribute on AVR targets. This attribute may be attached to a function definition and instructs the backend to generate appropriate function entry/exit code so that it can be used directly as an interrupt service routine.

Interrupt handler functions defined with the signal attribute do not re-enable interrupts.

### [speculative\_load\_hardening](#id622)[¶](#id8 "Link to this heading")

Supported Syntaxes[¶](#id219 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`speculative_load_hardening`

`clang::speculative_load_hardening`

`clang::speculative_load_hardening`

Yes

This attribute can be applied to a function declaration in order to indicate

that [Speculative Load Hardening](https://llvm.org/docs/SpeculativeLoadHardening.html) should be enabled for the function body. This can also be applied to a method in Objective C. This attribute will take precedence over the command line flag in the case where [\-mno-speculative-load-hardening](https://clang.llvm.org/docs/ClangCommandLineReference.html#cmdoption-clang-mspeculative-load-hardening) is specified.

Speculative Load Hardening is a best-effort mitigation against information leak attacks that make use of control flow miss-speculation - specifically miss-speculation of whether a branch is taken or not. Typically vulnerabilities enabling such attacks are classified as “Spectre variant #1”. Notably, this does not attempt to mitigate against miss-speculation of branch target, classified as “Spectre variant #2” vulnerabilities.

When inlining, the attribute is sticky. Inlining a function that carries this attribute will cause the caller to gain the attribute. This is intended to provide a maximally conservative model where the code in a function annotated with this attribute will always (even after inlining) end up hardened.

### [strict\_gs\_check](#id623)[¶](#strict-gs-check "Link to this heading")

Supported Syntaxes[¶](#id220 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`strict_gs_check`

Clang supports the Microsoft style `__declspec((strict_gs_check))` attribute which upgrades the stack protector check from `-fstack-protector` to `-fstack-protector-strong`.

For example, it upgrades the stack protector for the function `foo` to `-fstack-protector-strong` but function `bar` will still be built with the stack protector with the `-fstack-protector` option.

\_\_declspec((strict\_gs\_check))
int foo(int x); // stack protection will be upgraded for foo.

int bar(int y); // bar can be built with the standard stack protector checks.

### [sv\_dispatchthreadid](#id624)[¶](#sv-dispatchthreadid "Link to this heading")

Supported Syntaxes[¶](#id221 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sv_dispatchthreadid`

The `SV_DispatchThreadID` semantic, when applied to an input parameter, specifies a data binding to map the global thread offset within the Dispatch call (per dimension of the group) to the specified parameter. When applied to a field of a struct, the data binding is specified to the field when the struct is used as a parameter type. The semantic on the field is ignored when not used as a parameter. This attribute is only supported in compute shaders.

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-dispatchthreadid](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-dispatchthreadid)

### [sv\_groupid](#id625)[¶](#sv-groupid "Link to this heading")

Supported Syntaxes[¶](#id222 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sv_groupid`

The `SV_GroupID` semantic, when applied to an input parameter, specifies which thread group a shader is executing in. This attribute is only supported in compute shaders.

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupid](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupid)

### [sv\_groupindex](#id626)[¶](#sv-groupindex "Link to this heading")

Supported Syntaxes[¶](#id223 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sv_groupindex`

The `SV_GroupIndex` semantic, when applied to an input parameter, specifies a data binding to map the group index to the specified parameter. This attribute is only supported in compute shaders.

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupindex](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupindex)

### [sv\_groupthreadid](#id627)[¶](#sv-groupthreadid "Link to this heading")

Supported Syntaxes[¶](#id224 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sv_groupthreadid`

The `SV_GroupThreadID` semantic, when applied to an input parameter, specifies which individual thread within a thread group is executing in. This attribute is only supported in compute shaders.

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupthreadid](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupthreadid)

### [sv\_position](#id628)[¶](#sv-position "Link to this heading")

Supported Syntaxes[¶](#id225 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sv_position`

The `SV_Position` semantic, when applied to an input parameter in a pixel shader, contains the location of the pixel center (x, y) in screen space. This semantic can be applied to the parameter, or a field in a struct used as an input parameter. This attribute is supported as an input in pixel, hull, domain and mesh shaders. This attribute is supported as an output in vertex, geometry and domain shaders.

The full documentation is available here: [https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics)

### [sycl\_external](#id629)[¶](#sycl-external "Link to this heading")

Supported Syntaxes[¶](#id226 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`clang::sycl_external`

Yes

The `sycl_external` attribute indicates that a function defined in another translation unit may be called by a device function defined in the current translation unit or, if defined in the current translation unit, the function may be called by device functions defined in other translation units. The attribute is intended for use in the implementation of the `SYCL_EXTERNAL` macro as specified in section 5.10.1, “SYCL functions and member functions linkage”, of the SYCL 2020 specification.

The attribute only appertains to functions and only those that meet the following requirements:

*   Has external linkage
    
*   Is not explicitly defined as deleted (the function may be an explicitly defaulted function that is defined as deleted)
    

The attribute shall be present on the first declaration of a function and may optionally be present on subsequent declarations.

When compiling for a SYCL device target that does not support the generic address space, the function shall not specify a raw pointer or reference type as the return type or as a parameter type. See section 5.10, “SYCL offline linking”, of the SYCL 2020 specification. The following examples demonstrate the use of this attribute:

\[\[clang::sycl\_external\]\] void Foo(); // Ok.

\[\[clang::sycl\_external\]\] void Bar() { /\* ... \*/ } // Ok.

\[\[clang::sycl\_external\]\] extern void Baz(); // Ok.

\[\[clang::sycl\_external\]\] static void Quux() { /\* ... \*/ } // error:  Quux() has internal linkage.

### [sycl\_kernel\_entry\_point](#id630)[¶](#sycl-kernel-entry-point "Link to this heading")

Supported Syntaxes[¶](#id227 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`clang::sycl_kernel_entry_point`

Yes

The `sycl_kernel_entry_point` attribute facilitates the generation of an offload kernel entry point, sometimes called a SYCL kernel caller function, suitable for invoking a SYCL kernel on an offload device. The attribute is intended for use in the implementation of SYCL kernel invocation functions like the `single_task` and `parallel_for` member functions of the `sycl::handler` class specified in section 4.9.4, “Command group `handler` class”, of the SYCL 2020 specification.

The attribute requires a single type argument that specifies a class type that meets the requirements for a SYCL kernel name as described in section 5.2, “Naming of kernels”, of the SYCL 2020 specification. A unique kernel name type is required for each function declared with the attribute. The attribute may not first appear on a declaration that follows a definition of the function.

The attribute only appertains to functions and only those that meet the following requirements.

*   Has a non-deduced `void` return type.
    
*   Is not a non-static member function, constructor, or destructor.
    
*   Is not a C variadic function.
    
*   Is not a coroutine.
    
*   Is not defined as deleted or as defaulted.
    
*   Is not defined with a function try block.
    
*   Is not declared with the `constexpr` or `consteval` specifiers.
    
*   Is not declared with the `[[noreturn]]` attribute.
    

Use in the implementation of a SYCL kernel invocation function might look as follows.

namespace sycl {
class handler {
  template<typename KernelNameType, typename KernelType\>
  \[\[ clang::sycl\_kernel\_entry\_point(KernelNameType) \]\]
  static void kernel\_entry\_point(KernelType kernel) {
    kernel();
  }

public:
  template<typename KernelNameType, typename KernelType\>
  void single\_task(KernelType kernel) {
    // Call kernel\_entry\_point() to trigger generation of an offload
    // kernel entry point.
    kernel\_entry\_point<KernelNameType\>(kernel);
    // Call functions appropriate for the desired offload backend
    // (OpenCL, CUDA, HIP, Level Zero, etc...).
  }
};
} // namespace sycl

A SYCL kernel is a callable object of class type that is constructed on a host, often via a lambda expression, and then passed to a SYCL kernel invocation function to be executed on an offload device. A SYCL kernel invocation function is responsible for copying the provided SYCL kernel object to an offload device and initiating a call to it. The SYCL kernel object and its data members constitute the parameters of an offload kernel.

A SYCL kernel type is required to satisfy the device copyability requirements specified in section 3.13.1, “Device copyable”, of the SYCL 2020 specification. Additionally, any data members of the kernel object type are required to satisfy section 4.12.4, “Rules for parameter passing to kernels”. For most types, these rules require that the type is trivially copyable. However, the SYCL specification mandates that certain special SYCL types, such as `sycl::accessor` and `sycl::stream` be device copyable even if they are not trivially copyable. These types require special handling because they cannot be copied to device memory as if by `memcpy()`. Additionally, some offload backends, OpenCL for example, require objects of some of these types to be passed as individual arguments to the offload kernel.

An offload kernel consists of an entry point function that declares the parameters of the offload kernel and the set of all functions and variables that are directly or indirectly used by the entry point function.

A SYCL kernel invocation function invokes a SYCL kernel on a device by performing the following tasks (likely with the help of an offload backend like OpenCL):

1.  Identifying the offload kernel entry point to be used for the SYCL kernel.
    
2.  Deconstructing the SYCL kernel object, if necessary, to produce the set of offload kernel arguments required by the offload kernel entry point.
    
3.  Copying the offload kernel arguments to device memory.
    
4.  Initiating execution of the offload kernel entry point.
    

The offload kernel entry point for a SYCL kernel performs the following tasks:

1.  Reconstituting the SYCL kernel object, if necessary, using the offload kernel parameters.
    
2.  Calling the `operator()` member function of the (reconstituted) SYCL kernel object.
    

The `sycl_kernel_entry_point` attribute automates generation of an offload kernel entry point that performs those latter tasks. The parameters and body of a function declared with the `sycl_kernel_entry_point` attribute specify a pattern from which the parameters and body of the entry point function are derived. Consider the following call to a SYCL kernel invocation function.

struct S { int i; };
void f(sycl::handler &handler, sycl::stream &sout, S s) {
  handler.single\_task<struct KN\>(\[\=\] {
    sout << "The value of s.i is " << s.i << "\\n";
  });
}

The SYCL kernel object is the result of the lambda expression. It has two data members corresponding to the captures of `sout` and `s`. Since one of these data members corresponds to a special SYCL type that must be passed individually as an offload kernel parameter, it is necessary to decompose the SYCL kernel object into its constituent parts; the offload kernel will have two kernel parameters. Given a SYCL implementation that uses a `sycl_kernel_entry_point` attributed function like the one shown above, an offload kernel entry point function will be generated that looks approximately as follows.

void sycl\-kernel\-caller\-for\-KN(sycl::stream sout, S s) {
  kernel\-type kernel \= { sout, s );
  kernel();
}

There are a few items worthy of note:

1.  The name of the generated function incorporates the SYCL kernel name, `KN`, that was passed as the `KernelNameType` template parameter to `kernel_entry_point()` and provided as the argument to the `sycl_kernel_entry_point` attribute. There is a one-to-one correspondence between SYCL kernel names and offload kernel entry points.
    
2.  The SYCL kernel is a lambda closure type and therefore has no name; `kernel-type` is substituted above and corresponds to the `KernelType` template parameter deduced in the call to `kernel_entry_point()`. Lambda types cannot be declared and initialized using the aggregate initialization syntax used above, but the intended behavior should be clear.
    
3.  `S` is a device copyable type that does not directly or indirectly contain a data member of a SYCL special type. It therefore does not need to be decomposed into its constituent members to be passed as a kernel argument.
    
4.  The depiction of the `sycl::stream` parameter as a single self contained kernel parameter is an oversimplification. SYCL special types may require additional decomposition such that the generated function might have three or more parameters depending on how the SYCL library implementation defines these types.
    
5.  The call to `kernel_entry_point()` has no effect other than to trigger emission of the entry point function. The statments that make up the body of the function are not executed when the function is called; they are only used in the generation of the entry point function.
    

It is not necessary for a function declared with the `sycl_kernel_entry_point` attribute to be called for the offload kernel entry point to be emitted. For inline functions and function templates, any ODR-use will suffice. For other functions, an ODR-use is not required; the offload kernel entry point will be emitted if the function is defined.

Functions declared with the `sycl_kernel_entry_point` attribute are not limited to the simple example shown above. They may have additional template parameters, declare additional function parameters, and have complex control flow in the function body. Function parameter decomposition and reconstitution is performed for all function parameters. The function must abide by the language feature restrictions described in section 5.4, “Language restrictions for device functions” in the SYCL 2020 specification.

### [target](#id631)[¶](#target "Link to this heading")

Supported Syntaxes[¶](#id228 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`target`

`gnu::target`

`gnu::target`

Yes

Clang supports the GNU style `__attribute__((target("OPTIONS")))` attribute. This attribute may be attached to a function definition and instructs the backend to use different code generation options than were passed on the command line.

The current set of options correspond to the existing “subtarget features” for the target with or without a “-mno-” in front corresponding to the absence of the feature, as well as `arch="CPU"` which will change the default “CPU” for the function.

For X86, the attribute also allows `tune="CPU"` to optimize the generated code for the given CPU without changing the available instructions.

For AArch64, `arch="Arch"` will set the architecture, similar to the -march command line options. `cpu="CPU"` can be used to select a specific cpu, as per the `-mcpu` option, similarly for `tune=`. The attribute also allows the “branch-protection=<args>” option, where the permissible arguments and their effect on code generation are the same as for the command-line option `-mbranch-protection`.

Example “subtarget features” from the x86 backend include: “mmx”, “sse”, “sse4.2”, “avx”, “xop” and largely correspond to the machine specific options handled by the front end.

Note that this attribute does not apply transitively to nested functions such as blocks or C++ lambdas.

Additionally, this attribute supports function multiversioning for ELF based x86/x86-64 targets, which can be used to create multiple implementations of the same function that will be resolved at runtime based on the priority of their `target` attribute strings. A function is considered a multiversioned function if either two declarations of the function have different `target` attribute strings, or if it has a `target` attribute string of `default`. For example:

> \_\_attribute\_\_((target("arch=atom")))
> void foo() {} // will be called on 'atom' processors.
> \_\_attribute\_\_((target("default")))
> void foo() {} // will be called on any other processors.

All multiversioned functions must contain a `default` (fallback) implementation, otherwise usages of the function are considered invalid. Additionally, a function may not become multiversioned after its first use.

### [target\_clones](#id632)[¶](#target-clones "Link to this heading")

Supported Syntaxes[¶](#id229 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`target_clones`

`gnu::target_clones`

`gnu::target_clones`

Yes

Clang supports the `target_clones("OPTIONS")` attribute. This attribute may be attached to a function declaration and causes function multiversioning, where multiple versions of the function will be emitted with different code generation options. Additionally, these versions will be resolved at runtime based on the priority of their attribute options. All `target_clone` functions are considered multiversioned functions.

For AArch64 target: The attribute contains comma-separated strings of target features joined by “+” sign. For example:

> \_\_attribute\_\_((target\_clones("sha2+memtag", "fcma+sve2-pmull128")))
> void foo() {}

For every multiversioned function a `default` (fallback) implementation always generated if not specified directly.

For x86/x86-64 targets: All multiversioned functions must contain a `default` (fallback) implementation, otherwise usages of the function are considered invalid. Additionally, a function may not become multiversioned after its first use.

The options to `target_clones` can either be a target-specific architecture (specified as `arch=CPU`), or one of a list of subtarget features.

Example “subtarget features” from the x86 backend include: “mmx”, “sse”, “sse4.2”, “avx”, “xop” and largely correspond to the machine specific options handled by the front end.

The versions can either be listed as a comma-separated sequence of string literals or as a single string literal containing a comma-separated list of versions. For compatibility with GCC, the two formats can be mixed. For example, the following will emit 4 versions of the function:

> \_\_attribute\_\_((target\_clones("arch=atom,avx2","arch=ivybridge","default")))
> void foo() {}

For targets that support the GNU indirect function (IFUNC) feature, dispatch is performed by emitting an indirect function that is resolved to the appropriate target clone at load time. The indirect function is given the name the multiversioned function would have if it had been declared without the attribute. For backward compatibility with earlier Clang releases, a function alias with an `.ifunc` suffix is also emitted. The `.ifunc` suffixed symbol is a deprecated feature and support for it may be removed in the future.

### [target\_version](#id633)[¶](#target-version "Link to this heading")

Supported Syntaxes[¶](#id230 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`target_version`

`gnu::target_version`

`gnu::target_version`

Yes

For AArch64 target clang supports function multiversioning by `__attribute__((target_version("OPTIONS")))` attribute. When applied to a function it instructs compiler to emit multiple function versions based on `target_version` attribute strings, which resolved at runtime depend on their priority and target features availability. One of the versions is always ( implicitly or explicitly ) the `default` (fallback). Attribute strings can contain dependent features names joined by the “+” sign.

For targets that support the GNU indirect function (IFUNC) feature, dispatch is performed by emitting an indirect function that is resolved to the appropriate target clone at load time. The indirect function is given the name the multiversioned function would have if it had been declared without the attribute. For backward compatibility with earlier Clang releases, a function alias with an `.ifunc` suffix is also emitted. The `.ifunc` suffixed symbol is a deprecated feature and support for it may be removed in the future.

### [try\_acquire\_capability, try\_acquire\_shared\_capability](#id634)[¶](#try-acquire-capability-try-acquire-shared-capability "Link to this heading")

Supported Syntaxes[¶](#id231 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`try_acquire_capability`  
`try_acquire_shared_capability`  
`exclusive_trylock_function`  
`shared_trylock_function`

`clang::try_acquire_capability`  
`clang::try_acquire_shared_capability`

Marks a function that attempts to acquire a capability. This function may fail to actually acquire the capability; they accept a Boolean value determining whether acquiring the capability means success (true), or failing to acquire the capability means success (false).

### [unsafe\_buffer\_usage](#id635)[¶](#unsafe-buffer-usage "Link to this heading")

Supported Syntaxes[¶](#id232 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`unsafe_buffer_usage`

`clang::unsafe_buffer_usage`

`clang::unsafe_buffer_usage`

Yes

The attribute `[[clang::unsafe_buffer_usage]]` should be placed on functions that need to be avoided as they are prone to buffer overflows or unsafe buffer struct fields. It is designed to work together with the off-by-default compiler warning `-Wunsafe-buffer-usage` to help codebases transition away from raw pointer based buffer management, in favor of safer abstractions such as C++20 `std::span`. The attribute causes `-Wunsafe-buffer-usage` to warn on every use of the function or the field it is attached to, and it may also lead to emission of automatic fix-it hints which would help the user replace the use of unsafe functions(/fields) with safe alternatives, though the attribute can be used even when the fix can’t be automated.

*   Attribute attached to functions: The attribute suppresses all `-Wunsafe-buffer-usage` warnings within the function it is attached to, as the function is now classified as unsafe. The attribute should be used carefully, as it will silence all unsafe operation warnings inside the function; including any new unsafe operations introduced in the future.
    
    The attribute is warranted even if the only way a function can overflow the buffer is by violating the function’s preconditions. For example, it would make sense to put the attribute on function `foo()` below because passing an incorrect size parameter would cause a buffer overflow:
    
    \[\[clang::unsafe\_buffer\_usage\]\]
    void foo(int \*buf, size\_t size) {
      for (size\_t i \= 0; i < size; ++i) {
        buf\[i\] \= i;
      }
    }
    
    The attribute is NOT warranted when the function uses safe abstractions, assuming that these abstractions weren’t misused outside the function. For example, function `bar()` below doesn’t need the attribute, because assuming that the container `buf` is well-formed (has size that fits the original buffer it refers to), overflow cannot occur:
    
    void bar(std::span<int\> buf) {
      for (size\_t i \= 0; i < buf.size(); ++i) {
        buf\[i\] \= i;
      }
    }
    
    In this case function `bar()` enables the user to keep the buffer “containerized” in a span for as long as possible. On the other hand, Function `foo()` in the previous example may have internal consistency, but by accepting a raw buffer it requires the user to unwrap their span, which is undesirable according to the programming model behind `-Wunsafe-buffer-usage`.
    
    The attribute is warranted when a function accepts a raw buffer only to immediately put it into a span:
    
    \[\[clang::unsafe\_buffer\_usage\]\]
    void baz(int \*buf, size\_t size) {
      std::span<int\> sp{ buf, size };
      for (size\_t i \= 0; i < sp.size(); ++i) {
        sp\[i\] \= i;
      }
    }
    
    In this case `baz()` does not contain any unsafe operations, but the awkward parameter type causes the caller to unwrap the span unnecessarily. Note that regardless of the attribute, code inside `baz()` isn’t flagged by `-Wunsafe-buffer-usage` as unsafe. It is definitely undesirable, but if `baz()` is on an API surface, there is no way to improve it to make it as safe as `bar()` without breaking the source and binary compatibility with existing users of the function. In such cases the proper solution would be to create a different function (possibly an overload of `baz()`) that accepts a safe container like `bar()`, and then use the attribute on the original `baz()` to help the users update their code to use the new function.
    
*   Attribute attached to fields: The attribute should only be attached to struct fields, if the fields can not be updated to a safe type with bounds check, such as std::span. In other words, the buffers prone to unsafe accesses should always be updated to use safe containers/views and attaching the attribute must be last resort when such an update is infeasible.
    
    The attribute can be placed on individual fields or a set of them as shown below.
    
    struct A {
      \[\[clang::unsafe\_buffer\_usage\]\]
      int \*ptr1;
    
      \[\[clang::unsafe\_buffer\_usage\]\]
      int \*ptr2, buf\[10\];
    
      \[\[clang::unsafe\_buffer\_usage\]\]
      size\_t sz;
    };
    
    Here, every read/write to the fields ptr1, ptr2, buf and sz will trigger a warning that the field has been explcitly marked as unsafe due to unsafe-buffer operations.
    

### [used](#id636)[¶](#used "Link to this heading")

Supported Syntaxes[¶](#id233 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`used`

`gnu::used`

`gnu::used`

This attribute, when attached to a function or variable definition, indicates that there may be references to the entity which are not apparent in the source code. For example, it may be referenced from inline `asm`, or it may be found through a dynamic symbol or section lookup.

The compiler must emit the definition even if it appears to be unused, and it must not apply optimizations which depend on fully understanding how the entity is used.

Whether this attribute has any effect on the linker depends on the target and the linker. Most linkers support the feature of section garbage collection (`--gc-sections`), also known as “dead stripping” (`ld64 -dead_strip`) or discarding unreferenced sections (`link.exe /OPT:REF`). On COFF and Mach-O targets (Windows and Apple platforms), the used attribute prevents symbols from being removed by linker section GC. On ELF targets, it has no effect on its own, and the linker may remove the definition if it is not otherwise referenced. This linker GC can be avoided by also adding the `retain` attribute. Note that `retain` requires special support from the linker; see that attribute’s documentation for further information.

### [xray\_always\_instrument, xray\_never\_instrument, xray\_log\_args](#id637)[¶](#xray-always-instrument-xray-never-instrument-xray-log-args "Link to this heading")

Supported Syntaxes[¶](#id234 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`xray_always_instrument`  
`xray_never_instrument`  
`xray_log_args`

`clang::xray_always_instrument`  
`clang::xray_never_instrument`  
`clang::xray_log_args`

`clang::xray_always_instrument`  
`clang::xray_never_instrument`  
`clang::xray_log_args`

Yes

`__attribute__((xray_always_instrument))` or `[[clang::xray_always_instrument]]` is used to mark member functions (in C++), methods (in Objective C), and free functions (in C, C++, and Objective C) to be instrumented with XRay. This will cause the function to always have space at the beginning and exit points to allow for runtime patching.

Conversely, `__attribute__((xray_never_instrument))` or `[[clang::xray_never_instrument]]` will inhibit the insertion of these instrumentation points.

If a function has neither of these attributes, they become subject to the XRay heuristics used to determine whether a function should be instrumented or otherwise.

`__attribute__((xray_log_args(N)))` or `[[clang::xray_log_args(N)]]` is used to preserve N function arguments for the logging function. Currently, only N==1 is supported.

### [zero\_call\_used\_regs](#id638)[¶](#zero-call-used-regs "Link to this heading")

Supported Syntaxes[¶](#id235 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`zero_call_used_regs`

`gnu::zero_call_used_regs`

`gnu::zero_call_used_regs`

Yes

This attribute, when attached to a function, causes the compiler to zero a subset of all call-used registers before the function returns. It’s used to increase program security by either mitigating [Return-Oriented Programming](https://en.wikipedia.org/wiki/Return-oriented_programming) (ROP) attacks or preventing information leakage through registers.

The term “call-used” means registers which are not guaranteed to be preserved unchanged for the caller by the current calling convention. This could also be described as “caller-saved” or “not callee-saved”.

The choice parameters gives the programmer flexibility to choose the subset of the call-used registers to be zeroed:

*   `skip` doesn’t zero any call-used registers. This choice overrides any command-line arguments.
    
*   `used` only zeros call-used registers used in the function. By `used`, we mean a register whose contents have been set or referenced in the function.
    
*   `used-gpr` only zeros call-used GPR registers used in the function.
    
*   `used-arg` only zeros call-used registers used to pass arguments to the function.
    
*   `used-gpr-arg` only zeros call-used GPR registers used to pass arguments to the function.
    
*   `all` zeros all call-used registers.
    
*   `all-gpr` zeros all call-used GPR registers.
    
*   `all-arg` zeros all call-used registers used to pass arguments to the function.
    
*   `all-gpr-arg` zeros all call-used GPR registers used to pass arguments to the function.
    

The default for the attribute is controlled by the `-fzero-call-used-regs` flag.

[Handle Attributes](#id639)[¶](#handle-attributes "Link to this heading")
-------------------------------------------------------------------------

Handles are a way to identify resources like files, sockets, and processes. They are more opaque than pointers and widely used in system programming. They have similar risks such as never releasing a resource associated with a handle, attempting to use a handle that was already released, or trying to release a handle twice. Using the annotations below it is possible to make the ownership of the handles clear: whose responsibility is to release them. They can also aid static analysis tools to find bugs.

### [acquire\_handle](#id640)[¶](#acquire-handle "Link to this heading")

Supported Syntaxes[¶](#id236 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`acquire_handle`

`clang::acquire_handle`

`clang::acquire_handle`

Yes

If this annotation is on a function or a function type it is assumed to return a new handle. In case this annotation is on an output parameter, the function is assumed to fill the corresponding argument with a new handle. The attribute requires a string literal argument which used to identify the handle with later uses of `use_handle` or `release_handle`.

// Output arguments from Zircon.
zx\_status\_t zx\_socket\_create(uint32\_t options,
                             zx\_handle\_t \_\_attribute\_\_((acquire\_handle("zircon"))) \* out0,
                             zx\_handle\_t\* out1 \[\[clang::acquire\_handle("zircon")\]\]);

// Returned handle.
\[\[clang::acquire\_handle("tag")\]\] int open(const char \*path, int oflag, ... );
int open(const char \*path, int oflag, ... ) \_\_attribute\_\_((acquire\_handle("tag")));

### [release\_handle](#id641)[¶](#release-handle "Link to this heading")

Supported Syntaxes[¶](#id237 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`release_handle`

`clang::release_handle`

`clang::release_handle`

Yes

If a function parameter is annotated with `release_handle(tag)` it is assumed to close the handle. It is also assumed to require an open handle to work with. The attribute requires a string literal argument to identify the handle being released.

zx\_status\_t zx\_handle\_close(zx\_handle\_t handle \[\[clang::release\_handle("tag")\]\]);

### [use\_handle](#id642)[¶](#use-handle "Link to this heading")

Supported Syntaxes[¶](#id238 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`use_handle`

`clang::use_handle`

`clang::use_handle`

Yes

A function taking a handle by value might close the handle. If a function parameter is annotated with `use_handle(tag)` it is assumed to not to change the state of the handle. It is also assumed to require an open handle to work with. The attribute requires a string literal argument to identify the handle being used.

zx\_status\_t zx\_port\_wait(zx\_handle\_t handle \[\[clang::use\_handle("zircon")\]\],
                         zx\_time\_t deadline,
                         zx\_port\_packet\_t\* packet);

[Nullability Attributes](#id643)[¶](#nullability-attributes "Link to this heading")
-----------------------------------------------------------------------------------

Whether a particular pointer may be “null” is an important concern when working with pointers in the C family of languages. The various nullability attributes indicate whether a particular pointer can be null or not, which makes APIs more expressive and can help static analysis tools identify bugs involving null pointers. Clang supports several kinds of nullability attributes: the `nonnull` and `returns_nonnull` attributes indicate which function or method parameters and result types can never be null, while nullability type qualifiers indicate which pointer types can be null (`_Nullable`) or cannot be null (`_Nonnull`).

The nullability (type) qualifiers express whether a value of a given pointer type can be null (the `_Nullable` qualifier), doesn’t have a defined meaning for null (the `_Nonnull` qualifier), or for which the purpose of null is unclear (the `_Null_unspecified` qualifier). Because nullability qualifiers are expressed within the type system, they are more general than the `nonnull` and `returns_nonnull` attributes, allowing one to express (for example) a nullable pointer to an array of nonnull pointers. Nullability qualifiers are written to the right of the pointer to which they apply. For example:

> // No meaningful result when 'ptr' is null (here, it happens to be undefined behavior).
> int fetch(int \* \_Nonnull ptr) { return \*ptr; }
> 
> // 'ptr' may be null.
> int fetch\_or\_zero(int \* \_Nullable ptr) {
>   return ptr ? \*ptr : 0;
> }
> 
> // A nullable pointer to non-null pointers to const characters.
> const char \*join\_strings(const char \* \_Nonnull \* \_Nullable strings, unsigned n);

In Objective-C, there is an alternate spelling for the nullability qualifiers that can be used in Objective-C methods and properties using context-sensitive, non-underscored keywords. For example:

> @interface NSView : NSResponder
>   \- (nullable NSView \*)ancestorSharedWithView:(nonnull NSView \*)aView;
>   @property (assign, nullable) NSView \*superview;
>   @property (readonly, nonnull) NSArray \*subviews;
> @end

As well as built-in pointer types, the nullability attributes can be attached to C++ classes marked with the `_Nullable` attribute.

The following C++ standard library types are considered nullable: `unique_ptr`, `shared_ptr`, `auto_ptr`, `exception_ptr`, `function`, `move_only_function` and `coroutine_handle`.

Types should be marked nullable only where the type itself leaves nullability ambiguous. For example, `std::optional` is not marked `_Nullable`, because `optional<int> _Nullable` is redundant and `optional<int> _Nonnull` is not a useful type. `std::weak_ptr` is not nullable, because its nullability can change with no visible modification, so static annotation is unlikely to be unhelpful.

### [\_Nonnull](#id644)[¶](#nonnull "Link to this heading")

Supported Syntaxes[¶](#id239 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`_Nonnull`

The `_Nonnull` nullability qualifier indicates that null is not a meaningful value for a value of the `_Nonnull` pointer type. For example, given a declaration such as:

> int fetch(int \* \_Nonnull ptr);

a caller of `fetch` should not provide a null value, and the compiler will produce a warning if it sees a literal null value passed to `fetch`. Note that, unlike the declaration attribute `nonnull`, the presence of `_Nonnull` does not imply that passing null is undefined behavior: `fetch` is free to consider null undefined behavior or (perhaps for backward-compatibility reasons) defensively handle null.

### [\_Null\_unspecified](#id645)[¶](#null-unspecified "Link to this heading")

Supported Syntaxes[¶](#id240 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`_Null_unspecified`

The `_Null_unspecified` nullability qualifier indicates that neither the `_Nonnull` nor `_Nullable` qualifiers make sense for a particular pointer type. It is used primarily to indicate that the role of null with specific pointers in a nullability-annotated header is unclear, e.g., due to overly-complex implementations or historical factors with a long-lived API.

### [\_Nullable](#id646)[¶](#nullable "Link to this heading")

Supported Syntaxes[¶](#id241 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`_Nullable`

The `_Nullable` nullability qualifier indicates that a value of the `_Nullable` pointer type can be null. For example, given:

> int fetch\_or\_zero(int \* \_Nullable ptr);

a caller of `fetch_or_zero` can provide null.

The `_Nullable` attribute on classes indicates that the given class can represent null values, and so the `_Nullable`, `_Nonnull` etc qualifiers make sense for this type. For example:

> class \_Nullable ArenaPointer { ... };
> 
> ArenaPointer \_Nonnull x \= ...;
> ArenaPointer \_Nullable y \= nullptr;

### [\_Nullable\_result](#id647)[¶](#nullable-result "Link to this heading")

Supported Syntaxes[¶](#id242 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`_Nullable_result`

The `_Nullable_result` nullability qualifier means that a value of the `_Nullable_result` pointer can be `nil`, just like `_Nullable`. Where this attribute differs from `_Nullable` is when it’s used on a parameter to a completion handler in a Swift async method. For instance, here:

> \-(void)fetchSomeDataWithID:(int)identifier
>          completionHandler:(void (^)(Data \*\_Nullable\_result result, NSError \*error))completionHandler;

This method asynchronously calls `completionHandler` when the data is available, or calls it with an error. `_Nullable_result` indicates to the Swift importer that this is the uncommon case where `result` can get `nil` even if no error has occurred, and will therefore import it as a Swift optional type. Otherwise, if `result` was annotated with `_Nullable`, the Swift importer will assume that `result` will always be non-nil unless an error occurred.

### [nonnull](#id648)[¶](#id10 "Link to this heading")

Supported Syntaxes[¶](#id243 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nonnull`

`gnu::nonnull`

`gnu::nonnull`

The `nonnull` attribute indicates that some function parameters must not be null, and can be used in several different ways. It’s original usage ([from GCC](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html#Common-Function-Attributes)) is as a function (or Objective-C method) attribute that specifies which parameters of the function are nonnull in a comma-separated list. For example:

> extern void \* my\_memcpy (void \*dest, const void \*src, size\_t len)
>                 \_\_attribute\_\_((nonnull (1, 2)));

Here, the `nonnull` attribute indicates that parameters 1 and 2 cannot have a null value. Omitting the parenthesized list of parameter indices means that all parameters of pointer type cannot be null:

> extern void \* my\_memcpy (void \*dest, const void \*src, size\_t len)
>                 \_\_attribute\_\_((nonnull));

Clang also allows the `nonnull` attribute to be placed directly on a function (or Objective-C method) parameter, eliminating the need to specify the parameter index ahead of type. For example:

> extern void \* my\_memcpy (void \*dest \_\_attribute\_\_((nonnull)),
>                          const void \*src \_\_attribute\_\_((nonnull)), size\_t len);

Note that the `nonnull` attribute indicates that passing null to a non-null parameter is undefined behavior, which the optimizer may take advantage of to, e.g., remove null checks. The `_Nonnull` type qualifier indicates that a pointer cannot be null in a more general manner (because it is part of the type system) and does not imply undefined behavior, making it more widely applicable.

### [returns\_nonnull](#id649)[¶](#returns-nonnull "Link to this heading")

Supported Syntaxes[¶](#id244 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`returns_nonnull`

`gnu::returns_nonnull`

`gnu::returns_nonnull`

Yes

The `returns_nonnull` attribute indicates that a particular function (or Objective-C method) always returns a non-null pointer. For example, a particular system `malloc` might be defined to terminate a process when memory is not available rather than returning a null pointer:

> extern void \* malloc (size\_t size) \_\_attribute\_\_((returns\_nonnull));

The `returns_nonnull` attribute implies that returning a null pointer is undefined behavior, which the optimizer may take advantage of. The `_Nonnull` type qualifier indicates that a pointer cannot be null in a more general manner (because it is part of the type system) and does not imply undefined behavior, making it more widely applicable

[OpenCL Address Spaces](#id650)[¶](#opencl-address-spaces "Link to this heading")
---------------------------------------------------------------------------------

The address space qualifier may be used to specify the region of memory that is used to allocate the object. OpenCL supports the following address spaces: \_\_generic(generic), \_\_global(global), \_\_local(local), \_\_private(private), \_\_constant(constant).

> \_\_constant int c \= ...;
> 
> \_\_generic int\* foo(global int\* g) {
>   \_\_local int\* l;
>   private int p;
>   ...
>   return l;
> }

More details can be found in the OpenCL C language Spec v2.0, Section 6.5.

### [\[\[clang::opencl\_global\_device\]\], \[\[clang::opencl\_global\_host\]\]](#id651)[¶](#clang-opencl-global-device-clang-opencl-global-host "Link to this heading")

Supported Syntaxes[¶](#id245 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_global_device`  
`opencl_global_host`

`clang::opencl_global_device`  
`clang::opencl_global_host`

`clang::opencl_global_device`  
`clang::opencl_global_host`

The `global_device` and `global_host` address space attributes specify that an object is allocated in global memory on the device/host. It helps to distinguish USM (Unified Shared Memory) pointers that access global device memory from those that access global host memory. These new address spaces are a subset of the `__global/opencl_global` address space, the full address space set model for OpenCL 2.0 with the extension looks as follows:

> generic->global->host
> 
> \->device
> 
> \->private
> 
> \->local
> 
> constant

As `global_device` and `global_host` are a subset of `__global/opencl_global` address spaces it is allowed to convert `global_device` and `global_host` address spaces to `__global/opencl_global` address spaces (following ISO/IEC TR 18037 5.1.3 “Address space nesting and rules for pointers”).

### [\_\_constant, constant, \[\[clang::opencl\_constant\]\]](#id652)[¶](#constant-constant-clang-opencl-constant "Link to this heading")

Supported Syntaxes[¶](#id246 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_constant`

`clang::opencl_constant`

`clang::opencl_constant`

`__constant`  
`constant`

The constant address space attribute signals that an object is located in a constant (non-modifiable) memory region. It is available to all work items. Any type can be annotated with the constant address space attribute. Objects with the constant address space qualifier can be declared in any scope and must have an initializer.

### [\_\_generic, generic, \[\[clang::opencl\_generic\]\]](#id653)[¶](#generic-generic-clang-opencl-generic "Link to this heading")

Supported Syntaxes[¶](#id247 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_generic`

`clang::opencl_generic`

`clang::opencl_generic`

`__generic`  
`generic`

The generic address space attribute is only available with OpenCL v2.0 and later. It can be used with pointer types. Variables in global and local scope and function parameters in non-kernel functions can have the generic address space type attribute. It is intended to be a placeholder for any other address space except for ‘\_\_constant’ in OpenCL code which can be used with multiple address spaces.

### [\_\_global, global, \[\[clang::opencl\_global\]\]](#id654)[¶](#global-global-clang-opencl-global "Link to this heading")

Supported Syntaxes[¶](#id248 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_global`

`clang::opencl_global`

`clang::opencl_global`

`__global`  
`global`

The global address space attribute specifies that an object is allocated in global memory, which is accessible by all work items. The content stored in this memory area persists between kernel executions. Pointer types to the global address space are allowed as function parameters or local variables. Starting with OpenCL v2.0, the global address space can be used with global (program scope) variables and static local variable as well.

### [\_\_local, local, \[\[clang::opencl\_local\]\]](#id655)[¶](#local-local-clang-opencl-local "Link to this heading")

Supported Syntaxes[¶](#id249 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_local`

`clang::opencl_local`

`clang::opencl_local`

`__local`  
`local`

The local address space specifies that an object is allocated in the local (work group) memory area, which is accessible to all work items in the same work group. The content stored in this memory region is not accessible after the kernel execution ends. In a kernel function scope, any variable can be in the local address space. In other scopes, only pointer types to the local address space are allowed. Local address space variables cannot have an initializer.

### [\_\_private, private, \[\[clang::opencl\_private\]\]](#id656)[¶](#private-private-clang-opencl-private "Link to this heading")

Supported Syntaxes[¶](#id250 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_private`

`clang::opencl_private`

`clang::opencl_private`

`__private`  
`private`

The private address space specifies that an object is allocated in the private (work item) memory. Other work items cannot access the same memory area and its content is destroyed after work item execution ends. Local variables can be declared in the private address space. Function arguments are always in the private address space. Kernel function arguments of a pointer or an array type cannot point to the private address space.

[Performance Constraint Attributes](#id657)[¶](#performance-constraint-attributes "Link to this heading")
---------------------------------------------------------------------------------------------------------

The `nonblocking`, `blocking`, `nonallocating` and `allocating` attributes can be attached to function types, including blocks, C++ lambdas, and member functions. The attributes declare constraints about a function’s behavior pertaining to blocking and heap memory allocation.

There are several rules for function types with these attributes, enforced with compiler warnings:

*   When assigning or otherwise converting to a function pointer of `nonblocking` or `nonallocating` type, the source must also be a function or function pointer of that type, unless it is a null pointer, i.e. the attributes should not be “spoofed”. Conversions that remove the attributes are transparent and valid.
    
*   An override of a `nonblocking` or `nonallocating` virtual method must also be declared with that same attribute (or a stronger one.) An overriding method may add an attribute.
    
*   A redeclaration of a `nonblocking` or `nonallocating` function must also be declared with the same attribute (or a stronger one). A redeclaration may add an attribute.
    

The warnings are controlled by `-Wfunction-effects`, which is disabled by default.

The compiler also diagnoses function calls from `nonblocking` and `nonallocating` functions to other functions which lack the appropriate attribute.

### [allocating](#id658)[¶](#allocating "Link to this heading")

Supported Syntaxes[¶](#id251 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`allocating`

`clang::allocating`

`clang::allocating`

Declares that a function potentially allocates heap memory, and prevents any potential inference of `nonallocating` by the compiler.

### [blocking](#id659)[¶](#blocking "Link to this heading")

Supported Syntaxes[¶](#id252 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`blocking`

`clang::blocking`

`clang::blocking`

Declares that a function potentially blocks, and prevents any potential inference of `nonblocking` by the compiler.

### [nonallocating](#id660)[¶](#nonallocating "Link to this heading")

Supported Syntaxes[¶](#id253 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nonallocating`

`clang::nonallocating`

`clang::nonallocating`

Declares that a function or function type either does or does not allocate heap memory, according to the optional, compile-time constant boolean argument, which defaults to true. When the argument is false, the attribute is equivalent to `allocating`.

### [nonblocking](#id661)[¶](#nonblocking "Link to this heading")

Supported Syntaxes[¶](#id254 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nonblocking`

`clang::nonblocking`

`clang::nonblocking`

Declares that a function or function type either does or does not block in any way, according to the optional, compile-time constant boolean argument, which defaults to true. When the argument is false, the attribute is equivalent to `blocking`.

For the purposes of diagnostics, `nonblocking` is considered to include the `nonallocating` guarantee and is therefore a “stronger” constraint or attribute.

[Statement Attributes](#id662)[¶](#statement-attributes "Link to this heading")
-------------------------------------------------------------------------------

### [#pragma clang loop](#id663)[¶](#pragma-clang-loop "Link to this heading")

Supported Syntaxes[¶](#id255 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

\`\` loop\`\`  
`unroll`  
`nounroll`  
`unroll_and_jam`  
`nounroll_and_jam`

The `#pragma clang loop` directive allows loop optimization hints to be specified for the subsequent loop. The directive allows pipelining to be disabled, or vectorization, vector predication, interleaving, and unrolling to be enabled or disabled. Vector width, vector predication, interleave count, unrolling count, and the initiation interval for pipelining can be explicitly specified. See [language extensions](http://clang.llvm.org/docs/LanguageExtensions.html#extensions-for-loop-hint-optimizations) for details.

### [#pragma unroll, #pragma nounroll](#id664)[¶](#pragma-unroll-pragma-nounroll "Link to this heading")

Supported Syntaxes[¶](#id256 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

\`\` loop\`\`  
`unroll`  
`nounroll`  
`unroll_and_jam`  
`nounroll_and_jam`

Loop unrolling optimization hints can be specified with `#pragma unroll` and `#pragma nounroll`. The pragma is placed immediately before a for, while, do-while, or c++11 range-based for loop. GCC’s loop unrolling hints `#pragma GCC unroll` and `#pragma GCC nounroll` are also supported and have identical semantics to `#pragma unroll` and `#pragma nounroll`.

Specifying `#pragma unroll` without a parameter directs the loop unroller to attempt to fully unroll the loop if the trip count is known at compile time and attempt to partially unroll the loop if the trip count is not known at compile time:

#pragma unroll
for (...) {
  ...
}

Specifying the optional parameter, `#pragma unroll _value_`, directs the unroller to unroll the loop `_value_` times. The parameter may optionally be enclosed in parentheses:

#pragma unroll 16
for (...) {
  ...
}

#pragma unroll(16)
for (...) {
  ...
}

Specifying `#pragma nounroll` indicates that the loop should not be unrolled:

#pragma nounroll
for (...) {
  ...
}

`#pragma unroll` and `#pragma unroll _value_` have identical semantics to `#pragma clang loop unroll(enable)` and `#pragma clang loop unroll_count(_value_)` respectively. `#pragma nounroll` is equivalent to `#pragma clang loop unroll(disable)`. See [language extensions](http://clang.llvm.org/docs/LanguageExtensions.html#extensions-for-loop-hint-optimizations) for further details including limitations of the unroll hints.

### [\[loop\]](#id665)[¶](#loop "Link to this heading")

Supported Syntaxes[¶](#id257 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

The `[loop]` directive allows loop optimization hints to be specified for the subsequent loop. The directive allows unrolling to be disabled and is not compatible with \[unroll(x)\].

Specifying the parameter, `[loop]`, directs the unroller to not unroll the loop.

\[loop\]
for (...) {
  ...
}

\[loop\]
while (...) {
  ...
}

\[loop\]
do {
  ...
} while (...)

See [hlsl loop extensions](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-for) for details.

### [\[unroll(x)\], \[unroll\]](#id666)[¶](#unroll-x-unroll "Link to this heading")

Supported Syntaxes[¶](#id258 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

Loop unrolling optimization hints can be specified with `[unroll(x)]` . The attribute is placed immediately before a for, while, or do-while. Specifying the parameter, `[unroll(_value_)]`, directs the unroller to unroll the loop `_value_` times. Note: \[unroll(x)\] is not compatible with \[loop\].

\[unroll(4)\]
for (...) {
  ...
}

\[unroll\]
for (...) {
  ...
}

\[unroll(4)\]
while (...) {
  ...
}

\[unroll\]
while (...) {
  ...
}

\[unroll(4)\]
do {
  ...
} while (...)

\[unroll\]
do {
  ...
} while (...)

See [hlsl loop extensions](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-for) for details.

### [\_\_read\_only, \_\_write\_only, \_\_read\_write (read\_only, write\_only, read\_write)](#id667)[¶](#read-only-write-only-read-write-read-only-write-only-read-write "Link to this heading")

Supported Syntaxes[¶](#id259 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__read_only`  
`read_only`  
`__write_only`  
`write_only`  
`__read_write`  
`read_write`

The access qualifiers must be used with image object arguments or pipe arguments to declare if they are being read or written by a kernel or function.

The read\_only/\_\_read\_only, write\_only/\_\_write\_only and read\_write/\_\_read\_write names are reserved for use as access qualifiers and shall not be used otherwise.

kernel void
foo (read\_only image2d\_t imageA,
     write\_only image2d\_t imageB) {
  ...
}

In the above example imageA is a read-only 2D image object, and imageB is a write-only 2D image object.

The read\_write (or \_\_read\_write) qualifier can not be used with pipe.

More details can be found in the OpenCL C language Spec v2.0, Section 6.6.

### [assume](#id668)[¶](#id13 "Link to this heading")

Supported Syntaxes[¶](#id260 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`assume`

`assume`  
`clang::assume`

`clang::assume`

The `assume` attribute is used to indicate to the optimizer that a certain condition is assumed to be true at a certain point in the program. If this condition is violated at runtime, the behavior is undefined. `assume` can only be applied to a null statement.

Different optimisers are likely to react differently to the presence of this attribute; in some cases, adding `assume` may affect performance negatively. It should be used with parsimony and care.

Example:

int f(int x, int y) {
  \[\[assume(x \== 27)\]\];
  \[\[assume(x \== y)\]\];
  return y + 1; // May be optimised to \`return 28\`.
}

### [atomic](#id669)[¶](#atomic "Link to this heading")

Supported Syntaxes[¶](#id261 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`atomic`

`clang::atomic`

`clang::atomic`

The `atomic` attribute can be applied to _compound statements_ to override or further specify the default atomic code-generation behavior, especially on targets such as AMDGPU. You can annotate compound statements with options to modify how atomic instructions inside that statement are emitted at the IR level.

For details, see the documentation for [@atomic](http://clang.llvm.org/docs/LanguageExtensions.html#extensions-for-controlling-atomic-code-generation)

### [constexpr](#id670)[¶](#constexpr "Link to this heading")

Supported Syntaxes[¶](#id262 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`msvc::constexpr`

Yes

The `[[msvc::constexpr]]` attribute can be applied only to a function definition or a `return` statement. It does not impact function declarations. A `[[msvc::constexpr]]` function cannot be `constexpr` or `consteval`. A `[[msvc::constexpr]]` function is treated as if it were a `constexpr` function when it is evaluated in a constant context of `[[msvc::constexpr]] return` statement. Otherwise, it is treated as a regular function.

Semantics of this attribute are enabled only under MSVC compatibility (`-fms-compatibility-version`) 19.33 and later.

### [fallthrough](#id671)[¶](#fallthrough "Link to this heading")

Supported Syntaxes[¶](#id263 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`fallthrough`

`fallthrough`  
`clang::fallthrough`  
`gnu::fallthrough`

`fallthrough`  
`gnu::fallthrough`

The `fallthrough` (or `clang::fallthrough`) attribute is used to annotate intentional fall-through between switch labels. It can only be applied to a null statement placed at a point of execution between any statement and the next switch label. It is common to mark these places with a specific comment, but this attribute is meant to replace comments with a more strict annotation, which can be checked by the compiler. This attribute doesn’t change semantics of the code and can be used wherever an intended fall-through occurs. It is designed to mimic control-flow statements like `break;`, so it can be placed in most places where `break;` can, but only if there are no statements on the execution path between it and the next switch label.

By default, Clang does not warn on unannotated fallthrough from one `switch` case to another. Diagnostics on fallthrough without a corresponding annotation can be enabled with the `-Wimplicit-fallthrough` argument.

Here is an example:

// compile with -Wimplicit-fallthrough
switch (n) {
case 22:
case 33:  // no warning: no statements between case labels
  f();
case 44:  // warning: unannotated fall-through
  g();
  \[\[clang::fallthrough\]\];
case 55:  // no warning
  if (x) {
    h();
    break;
  }
  else {
    i();
    \[\[clang::fallthrough\]\];
  }
case 66:  // no warning
  p();
  \[\[clang::fallthrough\]\]; // warning: fallthrough annotation does not
                          //          directly precede case label
  q();
case 77:  // warning: unannotated fall-through
  r();
}

### [intel\_reqd\_sub\_group\_size](#id672)[¶](#intel-reqd-sub-group-size "Link to this heading")

Supported Syntaxes[¶](#id264 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`intel_reqd_sub_group_size`

Yes

The optional attribute intel\_reqd\_sub\_group\_size can be used to indicate that the kernel must be compiled and executed with the specified subgroup size. When this attribute is present, get\_max\_sub\_group\_size() is guaranteed to return the specified integer value. This is important for the correctness of many subgroup algorithms, and in some cases may be used by the compiler to generate more optimal code. See cl\_intel\_required\_subgroup\_size <https://www.khronos.org/registry/OpenCL/extensions/intel/cl\_intel\_required\_subgroup\_size.txt> for details.

### [likely and unlikely](#id673)[¶](#likely-and-unlikely "Link to this heading")

Supported Syntaxes[¶](#id265 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`likely`  
`unlikely`

`clang::likely`  
`clang::unlikely`

The `likely` and `unlikely` attributes are used as compiler hints. The attributes are used to aid the compiler to determine which branch is likely or unlikely to be taken. This is done by marking the branch substatement with one of the two attributes.

It isn’t allowed to annotate a single statement with both `likely` and `unlikely`. Annotating the `true` and `false` branch of an `if` statement with the same likelihood attribute will result in a diagnostic and the attributes are ignored on both branches.

In a `switch` statement it’s allowed to annotate multiple `case` labels or the `default` label with the same likelihood attribute. This makes \* all labels without an attribute have a neutral likelihood, \* all labels marked `[[likely]]` have an equally positive likelihood, and \* all labels marked `[[unlikely]]` have an equally negative likelihood. The neutral likelihood is the more likely of path execution than the negative likelihood. The positive likelihood is the more likely of path of execution than the neutral likelihood.

These attributes have no effect on the generated code when using PGO (Profile-Guided Optimization) or at optimization level 0.

In Clang, the attributes will be ignored if they’re not placed on \* the `case` or `default` label of a `switch` statement, \* or on the substatement of an `if` or `else` statement, \* or on the substatement of an `for` or `while` statement. The C++ Standard recommends to honor them on every statement in the path of execution, but that can be confusing:

if (b) {
  \[\[unlikely\]\] \--b; // In the path of execution,
                    // this branch is considered unlikely.
}

if (b) {
  \--b;
  if(b)
    return;
  \[\[unlikely\]\] \--b; // Not in the path of execution,
}                   // the branch has no likelihood information.

if (b) {
  \--b;
  foo(b);
  // Whether or not the next statement is in the path of execution depends
  // on the declaration of foo():
  // In the path of execution: void foo(int);
  // Not in the path of execution: \[\[noreturn\]\] void foo(int);
  // This means the likelihood of the branch depends on the declaration
  // of foo().
  \[\[unlikely\]\] \--b;
}

Below are some example usages of the likelihood attributes and their effects:

if (b) \[\[likely\]\] { // Placement on the first statement in the branch.
  // The compiler will optimize to execute the code here.
} else {
}

if (b)
  \[\[unlikely\]\] b++; // Placement on the first statement in the branch.
else {
  // The compiler will optimize to execute the code here.
}

if (b) {
  \[\[unlikely\]\] b++; // Placement on the second statement in the branch.
}                   // The attribute will be ignored.

if (b) \[\[likely\]\] {
  \[\[unlikely\]\] b++; // No contradiction since the second attribute
}                   // is ignored.

if (b)
  ;
else \[\[likely\]\] {
  // The compiler will optimize to execute the code here.
}

if (b)
  ;
else
  // The compiler will optimize to execute the next statement.
  \[\[likely\]\] b \= f();

if (b) \[\[likely\]\]; // Both branches are likely. A diagnostic is issued
else \[\[likely\]\];   // and the attributes are ignored.

if (b)
  \[\[likely\]\] int i \= 5; // Issues a diagnostic since the attribute
                        // isn't allowed on a declaration.

switch (i) {
  \[\[likely\]\] case 1:    // This value is likely
    ...
    break;

  \[\[unlikely\]\] case 2:  // This value is unlikely
    ...
    \[\[fallthrough\]\];

  case 3:               // No likelihood attribute
    ...
    \[\[likely\]\] break;   // No effect

  case 4: \[\[likely\]\] {  // attribute on substatement has no effect
    ...
    break;
    }

  \[\[unlikely\]\] default: // All other values are unlikely
    ...
    break;
}

switch (i) {
  \[\[likely\]\] case 0:    // This value and code path is likely
    ...
    \[\[fallthrough\]\];

  case 1:               // No likelihood attribute, code path is neutral
    break;              // falling through has no effect on the likelihood

  case 2:               // No likelihood attribute, code path is neutral
    \[\[fallthrough\]\];

  \[\[unlikely\]\] default: // This value and code path are both unlikely
    break;
}

for(int i \= 0; i != size; ++i) \[\[likely\]\] {
  ...               // The loop is the likely path of execution
}

for(const auto &E : Elements) \[\[likely\]\] {
  ...               // The loop is the likely path of execution
}

while(i != size) \[\[unlikely\]\] {
  ...               // The loop is the unlikely path of execution
}                   // The generated code will optimize to skip the loop body

while(true) \[\[unlikely\]\] {
  ...               // The attribute has no effect
}                   // Clang elides the comparison and generates an infinite
                    // loop

### [musttail](#id674)[¶](#musttail "Link to this heading")

Supported Syntaxes[¶](#id266 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`musttail`

`clang::musttail`

`clang::musttail`

If a `return` statement is marked `musttail`, this indicates that the compiler must generate a tail call for the program to be correct, even when optimizations are disabled. This guarantees that the call will not cause unbounded stack growth if it is part of a recursive cycle in the call graph.

If the callee is a virtual function that is implemented by a thunk, there is no guarantee in general that the thunk tail-calls the implementation of the virtual function, so such a call in a recursive cycle can still result in unbounded stack growth.

`clang::musttail` can only be applied to a `return` statement whose value is the result of a function call (even functions returning void must use `return`, although no value is returned). The target function must have the same number of arguments as the caller. The types of the return value and all arguments must be similar according to C++ rules (differing only in cv qualifiers or array size), including the implicit “this” argument, if any. Any variables in scope, including all arguments to the function and the return value must be trivially destructible. The calling convention of the caller and callee must match, and they must not be variadic functions or have old style K&R C function declarations.

The lifetimes of all local variables and function parameters end immediately before the call to the function. This means that it is undefined behaviour to pass a pointer or reference to a local variable to the called function, which is not the case without the attribute. Clang will emit a warning in common cases where this happens.

`clang::musttail` provides assurances that the tail call can be optimized on all targets, not just one.

### [nomerge](#id675)[¶](#nomerge "Link to this heading")

Supported Syntaxes[¶](#id267 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nomerge`

`clang::nomerge`

`clang::nomerge`

Yes

If a statement is marked `nomerge` and contains call expressions, those call expressions inside the statement will not be merged during optimization. This attribute can be used to prevent the optimizer from obscuring the source location of certain calls. For example, it will prevent tail merging otherwise identical code sequences that raise an exception or terminate the program. Tail merging normally reduces the precision of source location information, making stack traces less useful for debugging. This attribute gives the user control over the tradeoff between code size and debug information precision.

`nomerge` attribute can also be used as function attribute to prevent all calls to the specified function from merging. It has no effect on indirect calls to such functions. For example:

\[\[clang::nomerge\]\] void foo(int) {}

void bar(int x) {
  auto \*ptr \= foo;
  if (x) foo(1); else foo(2); // will not be merged
  if (x) ptr(1); else ptr(2); // indirect call, can be merged
}

`nomerge` attribute can also be used for pointers to functions to prevent calls through such pointer from merging. In such case the effect applies only to a specific function pointer. For example:

\[\[clang::nomerge\]\] void (\*foo)(int);

void bar(int x) {
  auto \*ptr \= foo;
  if (x) foo(1); else foo(2); // will not be merged
  if (x) ptr(1); else ptr(2); // 'ptr' has no 'nomerge' attribute, can be merged
}

### [opencl\_unroll\_hint](#id676)[¶](#opencl-unroll-hint "Link to this heading")

Supported Syntaxes[¶](#id268 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`opencl_unroll_hint`

The opencl\_unroll\_hint attribute qualifier can be used to specify that a loop (for, while and do loops) can be unrolled. This attribute qualifier can be used to specify full unrolling or partial unrolling by a specified amount. This is a compiler hint and the compiler may ignore this directive. See [OpenCL v2.0](https://www.khronos.org/registry/cl/specs/opencl-2.0.pdf) s6.11.5 for details.

### [suppress](#id677)[¶](#suppress "Link to this heading")

Supported Syntaxes[¶](#id269 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`suppress`

`gsl::suppress`  
`clang::suppress`

`clang::suppress`

The `suppress` attribute suppresses unwanted warnings coming from static analysis tools such as the Clang Static Analyzer. The tool will not report any issues in source code annotated with the attribute.

The attribute cannot be used to suppress traditional Clang warnings, because many such warnings are emitted before the attribute is fully parsed. Consider using `#pragma clang diagnostic` to control such diagnostics, as described in [Controlling Diagnostics via Pragmas](https://clang.llvm.org/docs/UsersManual.html#controlling-diagnostics-via-pragmas).

The `suppress` attribute can be placed on an individual statement in order to suppress warnings about undesirable behavior occurring at that statement:

int foo() {
  int \*x \= nullptr;
  ...
  \[\[clang::suppress\]\]
  return \*x;  // null pointer dereference warning suppressed here
}

Putting the attribute on a compound statement suppresses all warnings in scope:

int foo() {
  \[\[clang::suppress\]\] {
    int \*x \= nullptr;
    ...
    return \*x;  // warnings suppressed in the entire scope
  }
}

The attribute can also be placed on entire declarations of functions, classes, variables, member variables, and so on, to suppress warnings related to the declarations themselves. When used this way, the attribute additionally suppresses all warnings in the lexical scope of the declaration:

class \[\[clang::suppress\]\] C {
  int foo() {
    int \*x \= nullptr;
    ...
    return \*x;  // warnings suppressed in the entire class scope
  }

  int bar();
};

int C::bar() {
  int \*x \= nullptr;
  ...
  return \*x;  // warning NOT suppressed! - not lexically nested in 'class C{}'
}

Some static analysis warnings are accompanied by one or more notes, and the line of code against which the warning is emitted isn’t necessarily the best for suppression purposes. In such cases the tools are allowed to implement additional ways to suppress specific warnings based on the attribute attached to a note location.

For example, the Clang Static Analyzer suppresses memory leak warnings when the suppression attribute is placed at the allocation site (highlited by a “note: memory is allocated”), which may be different from the line of code at which the program “loses track” of the pointer (where the warning is ultimately emitted):

int bar1(bool coin\_flip) {
  \_\_attribute\_\_((suppress))
  int \*result \= (int \*)malloc(sizeof(int));
  if (coin\_flip)
    return 1;  // warning about this leak path is suppressed

  return \*result;  // warning about this leak path is also suppressed
}

int bar2(bool coin\_flip) {
  int \*result \= (int \*)malloc(sizeof(int));
  if (coin\_flip)
    return 1;  // leak warning on this path NOT suppressed

  \_\_attribute\_\_((suppress))
  return \*result;  // leak warning is suppressed only on this path
}

When written as `[[gsl::suppress]]`, this attribute suppresses specific clang-tidy diagnostics for rules of the [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#inforce-enforcement) in a portable way. The attribute can be attached to declarations, statements, and at namespace scope.

\[\[gsl::suppress("Rh-public")\]\]
void f\_() {
  int \*p;
  \[\[gsl::suppress("type")\]\] {
    p \= reinterpret\_cast<int\*>(7);
  }
}
namespace N {
  \[\[clang::suppress("type", "bounds")\]\];
  ...
}

### [sycl\_special\_class](#id678)[¶](#sycl-special-class "Link to this heading")

Supported Syntaxes[¶](#id270 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sycl_special_class`

`clang::sycl_special_class`

`clang::sycl_special_class`

Yes

SYCL defines some special classes (accessor, sampler, and stream) which require specific handling during the generation of the SPIR entry point. The `__attribute__((sycl_special_class))` attribute is used in SYCL headers to indicate that a class or a struct needs a specific handling when it is passed from host to device. Special classes will have a mandatory `__init` method and an optional `__finalize` method (the `__finalize` method is used only with the `stream` type). Kernel parameters types are extract from the `__init` method parameters. The kernel function arguments list is derived from the arguments of the `__init` method. The arguments of the `__init` method are copied into the kernel function argument list and the `__init` and `__finalize` methods are called at the beginning and the end of the kernel, respectively. The `__init` and `__finalize` methods must be defined inside the special class. Please note that this is an attribute that is used as an internal implementation detail and not intended to be used by external users.

The syntax of the attribute is as follows:

class \_\_attribute\_\_((sycl\_special\_class)) accessor {};
class \[\[clang::sycl\_special\_class\]\] accessor {};

This is a code example that illustrates the use of the attribute:

class \_\_attribute\_\_((sycl\_special\_class)) SpecialType {
  int F1;
  int F2;
  void \_\_init(int f1) {
    F1 \= f1;
    F2 \= f1;
  }
  void \_\_finalize() {}
public:
  SpecialType() \= default;
  int getF2() const { return F2; }
};

int main () {
  SpecialType T;
  cgh.single\_task(\[\=\] {
    T.getF2();
  });
}

This would trigger the following kernel entry point in the AST:

void \_\_sycl\_kernel(int f1) {
  SpecialType T;
  T.\_\_init(f1);
  ...
  T.\_\_finalize()
}

[Type Attributes](#id679)[¶](#type-attributes "Link to this heading")
---------------------------------------------------------------------

### [\_\_ptr32](#id680)[¶](#ptr32 "Link to this heading")

Supported Syntaxes[¶](#id271 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__ptr32`

The `__ptr32` qualifier represents a native pointer on a 32-bit system. On a 64-bit system, a pointer with `__ptr32` is extended to a 64-bit pointer. The `__sptr` and `__uptr` qualifiers can be used to specify whether the pointer is sign extended or zero extended. This qualifier is enabled under `-fms-extensions`.

### [\_\_ptr64](#id681)[¶](#ptr64 "Link to this heading")

Supported Syntaxes[¶](#id272 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__ptr64`

The `__ptr64` qualifier represents a native pointer on a 64-bit system. On a 32-bit system, a `__ptr64` pointer is truncated to a 32-bit pointer. This qualifier is enabled under `-fms-extensions`.

### [\_\_sptr](#id682)[¶](#sptr "Link to this heading")

Supported Syntaxes[¶](#id273 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__sptr`

The `__sptr` qualifier specifies that a 32-bit pointer should be sign extended when converted to a 64-bit pointer.

### [\_\_uptr](#id683)[¶](#uptr "Link to this heading")

Supported Syntaxes[¶](#id274 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__uptr`

The `__uptr` qualifier specifies that a 32-bit pointer should be zero extended when converted to a 64-bit pointer.

### [align\_value](#id684)[¶](#align-value "Link to this heading")

Supported Syntaxes[¶](#id275 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`align_value`

Yes

The align\_value attribute can be added to the typedef of a pointer type or the declaration of a variable of pointer or reference type. It specifies that the pointer will point to, or the reference will bind to, only objects with at least the provided alignment. This alignment value must be some positive power of 2.

> typedef double \* aligned\_double\_ptr \_\_attribute\_\_((align\_value(64)));
> void foo(double & x  \_\_attribute\_\_((align\_value(128)),
>          aligned\_double\_ptr y) { ... }

If the pointer value does not have the specified alignment at runtime, the behavior of the program is undefined.

### [annotate\_type](#id685)[¶](#annotate-type "Link to this heading")

Supported Syntaxes[¶](#id276 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`clang::annotate_type`

`clang::annotate_type`

This attribute is used to add annotations to types, typically for use by static analysis tools that are not integrated into the core Clang compiler (e.g., Clang-Tidy checks or out-of-tree Clang-based tools). It is a counterpart to the annotate attribute, which serves the same purpose, but for declarations.

The attribute takes a mandatory string literal argument specifying the annotation category and an arbitrary number of optional arguments that provide additional information specific to the annotation category. The optional arguments must be constant expressions of arbitrary type.

For example:

int\* \[\[clang::annotate\_type("category1", "foo", 1)\]\] f(int\[\[clang::annotate\_type("category2")\]\] \*);

The attribute does not have any effect on the semantics of the type system, neither type checking rules, nor runtime semantics. In particular:

*   `std::is_same<T, T [[clang::annotate_type("foo")]]>` is true for all types `T`.
    
*   It is not permissible for overloaded functions or template specializations to differ merely by an `annotate_type` attribute.
    
*   The presence of an `annotate_type` attribute will not affect name mangling.
    

### [arm\_sve\_vector\_bits](#id686)[¶](#arm-sve-vector-bits "Link to this heading")

Supported Syntaxes[¶](#id277 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`arm_sve_vector_bits`

The `arm_sve_vector_bits(N)` attribute is defined by the Arm C Language Extensions (ACLE) for SVE. It is used to define fixed-length (VLST) variants of sizeless types (VLAT).

For example:

#include <arm\_sve.h>

#if \_\_ARM\_FEATURE\_SVE\_BITS==512
typedef svint32\_t fixed\_svint32\_t \_\_attribute\_\_((arm\_sve\_vector\_bits(512)));
#endif

Creates a type `fixed_svint32_t` that is a fixed-length variant of `svint32_t` that contains exactly 512-bits. Unlike `svint32_t`, this type can be used in globals, structs, unions, and arrays, all of which are unsupported for sizeless types.

The attribute can be attached to a single SVE vector (such as `svint32_t`) or to the SVE predicate type `svbool_t`, this excludes tuple types such as `svint32x4_t`. The behavior of the attribute is undefined unless `N==__ARM_FEATURE_SVE_BITS`, the implementation defined feature macro that is enabled under the `-msve-vector-bits` flag.

For more information See [Arm C Language Extensions for SVE](https://developer.arm.com/documentation/100987/latest) for more information.

### [bpf\_fastcall](#id687)[¶](#bpf-fastcall "Link to this heading")

Supported Syntaxes[¶](#id278 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`bpf_fastcall`

`clang::bpf_fastcall`

`clang::bpf_fastcall`

Yes

Functions annotated with this attribute are likely to be inlined by BPF JIT. It is assumed that inlined implementation uses less caller saved registers, than a regular function. Specifically, the following registers are likely to be preserved: - `R0` if function return value is `void`; - ```R2-R5` if function takes 1 argument; - ``R3-R5` if function takes 2 arguments; - ``R4-R5` if function takes 3 arguments; - ``R5``` if function takes 4 arguments;

For such functions Clang generates code pattern that allows BPF JIT to recognize and remove unnecessary spills and fills of the preserved registers.

### [btf\_type\_tag](#id688)[¶](#btf-type-tag "Link to this heading")

Supported Syntaxes[¶](#id279 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`btf_type_tag`

`clang::btf_type_tag`

`clang::btf_type_tag`

Clang supports the `__attribute__((btf_type_tag("ARGUMENT")))` attribute for all targets. It only has effect when `-g` is specified on the command line and is currently silently ignored when not applied to a pointer type (note: this scenario may be diagnosed in the future).

The `ARGUMENT` string will be preserved in IR and emitted to DWARF for the types used in variable declarations, function declarations, or typedef declarations.

For BPF targets, the `ARGUMENT` string will also be emitted to .BTF ELF section.

### [cfi\_unchecked\_callee](#id689)[¶](#cfi-unchecked-callee "Link to this heading")

Supported Syntaxes[¶](#id280 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cfi_unchecked_callee`

`clang::cfi_unchecked_callee`

`clang::cfi_unchecked_callee`

`cfi_unchecked_callee` is a function type attribute which prevents the compiler from instrumenting [Control Flow Integrity](https://clang.llvm.org/docs/ControlFlowIntegrity.html) checks on indirect function calls. Specifically, the attribute has the following semantics:

1.  Indirect calls to a function type with this attribute will not be instrumented with CFI. That is, the indirect call will not be checked. Note that this only changes the behavior for indirect calls on pointers to function types having this attribute. It does not prevent all indirect function calls for a given type from being checked.
    
2.  All direct references to a function whose type has this attribute will always reference the function definition rather than an entry in the CFI jump table.
    
3.  When a pointer to a function with this attribute is implicitly cast to a pointer to a function without this attribute, the compiler will give a warning saying this attribute is discarded. This warning can be silenced with an explicit cast. Note an explicit cast just disables the warning, so direct references to a function with a `cfi_unchecked_callee` attribute will still reference the function definition rather than the CFI jump table.
    

#define CFI\_UNCHECKED\_CALLEE \_\_attribute\_\_((cfi\_unchecked\_callee))

void no\_cfi() CFI\_UNCHECKED\_CALLEE {}

void (\*with\_cfi)() \= no\_cfi;  // warning: implicit conversion discards \`cfi\_unchecked\_callee\` attribute.
                              // \`with\_cfi\` also points to the actual definition of \`no\_cfi\` rather than
                              // its jump table entry.

void invoke(void (CFI\_UNCHECKED\_CALLEE \*func)()) {
  func();  // CFI will not instrument this indirect call.

  void (\*func2)() \= func;  // warning: implicit conversion discards \`cfi\_unchecked\_callee\` attribute.

  func2();  // CFI will instrument this indirect call. Users should be careful however because if this
            // references a function with type \`cfi\_unchecked\_callee\`, then the CFI check may incorrectly
            // fail because the reference will be to the function definition rather than the CFI jump
            // table entry.
}

This attribute can only be applied on functions or member functions. This attribute can be a good alternative to `no_sanitize("cfi")` if you only want to disable innstrumentation for specific indirect calls rather than applying `no_sanitize("cfi")` on the whole function containing indirect call. Note that `cfi_unchecked_attribute` is a type attribute doesn’t disable CFI instrumentation on a function body.

### [clang\_arm\_mve\_strict\_polymorphism](#id690)[¶](#clang-arm-mve-strict-polymorphism "Link to this heading")

Supported Syntaxes[¶](#id281 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__clang_arm_mve_strict_polymorphism`

`clang::__clang_arm_mve_strict_polymorphism`

`clang::__clang_arm_mve_strict_polymorphism`

This attribute is used in the implementation of the ACLE intrinsics for the Arm MVE instruction set. It is used to define the vector types used by the MVE intrinsics.

Its effect is to modify the behavior of a vector type with respect to function overloading. If a candidate function for overload resolution has a parameter type with this attribute, then the selection of that candidate function will be disallowed if the actual argument can only be converted via a lax vector conversion. The aim is to prevent spurious ambiguity in ARM MVE polymorphic intrinsics.

void overloaded(uint16x8\_t vector, uint16\_t scalar);
void overloaded(int32x4\_t vector, int32\_t scalar);
uint16x8\_t myVector;
uint16\_t myScalar;

// myScalar is promoted to int32\_t as a side effect of the addition,
// so if lax vector conversions are considered for myVector, then
// the two overloads are equally good (one argument conversion
// each). But if the vector has the \_\_clang\_arm\_mve\_strict\_polymorphism
// attribute, only the uint16x8\_t,uint16\_t overload will match.
overloaded(myVector, myScalar + 1);

However, this attribute does not prohibit lax vector conversions in contexts other than overloading.

uint16x8\_t function();

// This is still permitted with lax vector conversion enabled, even
// if the vector types have \_\_clang\_arm\_mve\_strict\_polymorphism
int32x4\_t result \= function();

### [cmse\_nonsecure\_call](#id691)[¶](#cmse-nonsecure-call "Link to this heading")

Supported Syntaxes[¶](#id282 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cmse_nonsecure_call`

This attribute declares a non-secure function type. When compiling for secure state, a call to such a function would switch from secure to non-secure state. All non-secure function calls must happen only through a function pointer, and a non-secure function type should only be used as a base type of a pointer. See [ARMv8-M Security Extensions: Requirements on Development Tools - Engineering Specification Documentation](https://developer.arm.com/docs/ecm0359818/latest/) for more information.

### [device\_builtin\_surface\_type](#id692)[¶](#device-builtin-surface-type "Link to this heading")

Supported Syntaxes[¶](#id283 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`device_builtin_surface_type`

`__device_builtin_surface_type__`

Yes

The `device_builtin_surface_type` attribute can be applied to a class template when declaring the surface reference. A surface reference variable could be accessed on the host side and, on the device side, might be translated into an internal surface object, which is established through surface bind and unbind runtime APIs.

### [device\_builtin\_texture\_type](#id693)[¶](#device-builtin-texture-type "Link to this heading")

Supported Syntaxes[¶](#id284 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`device_builtin_texture_type`

`__device_builtin_texture_type__`

Yes

The `device_builtin_texture_type` attribute can be applied to a class template when declaring the texture reference. A texture reference variable could be accessed on the host side and, on the device side, might be translated into an internal texture object, which is established through texture bind and unbind runtime APIs.

### [enforce\_read\_only\_placement](#id694)[¶](#enforce-read-only-placement "Link to this heading")

Supported Syntaxes[¶](#id285 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`enforce_read_only_placement`

`clang::enforce_read_only_placement`

`clang::enforce_read_only_placement`

Yes

This attribute is attached to a structure, class or union declaration.

When attached to a record declaration/definition, it checks if all instances of this type can be placed in the read-only data segment of the program. If it finds an instance that can not be placed in a read-only segment, the compiler emits a warning at the source location where the type was used.

Examples: \* `struct __attribute__((enforce_read_only_placement)) Foo;` \* `struct __attribute__((enforce_read_only_placement)) Bar { ... };`

Both `Foo` and `Bar` types have the `enforce_read_only_placement` attribute.

The goal of introducing this attribute is to assist developers with writing secure code. A `const`\-qualified global is generally placed in the read-only section of the memory that has additional run time protection from malicious writes. By attaching this attribute to a declaration, the developer can express the intent to place all instances of the annotated type in the read-only program memory.

Note 1: The attribute doesn’t guarantee that the object will be placed in the read-only data segment as it does not instruct the compiler to ensure such a placement. It emits a warning if something in the code can be proven to prevent an instance from being placed in the read-only data segment.

Note 2: Currently, clang only checks if all global declarations of a given type ‘T’ are `const`\-qualified. The following conditions would also prevent the data to be put into read only segment, but the corresponding warnings are not yet implemented.

1.  An instance of type `T` is allocated on the heap/stack.
    
2.  Type `T` defines/inherits a mutable field.
    
3.  Type `T` defines/inherits non-constexpr constructor(s) for initialization.
    
4.  A field of type `T` is defined by type `Q`, which does not bear the `enforce_read_only_placement` attribute.
    
5.  A type `Q` inherits from type `T` and it does not have the `enforce_read_only_placement` attribute.
    

### [noderef](#id695)[¶](#noderef "Link to this heading")

Supported Syntaxes[¶](#id286 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noderef`

`clang::noderef`

`clang::noderef`

The `noderef` attribute causes clang to diagnose dereferences of annotated pointer types. This is ideally used with pointers that point to special memory which cannot be read from or written to, but allowing for the pointer to be used in pointer arithmetic. The following are examples of valid expressions where dereferences are diagnosed:

int \_\_attribute\_\_((noderef)) \*p;
int x \= \*p;  // warning

int \_\_attribute\_\_((noderef)) \*\*p2;
x \= \*\*p2;  // warning

int \* \_\_attribute\_\_((noderef)) \*p3;
p \= \*p3;  // warning

struct S {
  int a;
};
struct S \_\_attribute\_\_((noderef)) \*s;
x \= s\->a;    // warning
x \= (\*s).a;  // warning

Not all dereferences may diagnose a warning if the value directed by the pointer may not be accessed. The following are examples of valid expressions where may not be diagnosed:

int \*q;
int \_\_attribute\_\_((noderef)) \*p;
q \= &\*p;
q \= \*&p;

struct S {
  int a;
};
struct S \_\_attribute\_\_((noderef)) \*s;
p \= &s\->a;
p \= &(\*s).a;

`noderef` is currently only supported for pointers and arrays and not usable for references or Objective-C object pointers.

int x \= 2;
int \_\_attribute\_\_((noderef)) &y \= x;  // warning: 'noderef' can only be used on an array or pointer type

id \_\_attribute\_\_((noderef)) obj \= \[NSObject new\]; // warning: 'noderef' can only be used on an array or pointer type

### [objc\_class\_stub](#id696)[¶](#objc-class-stub "Link to this heading")

Supported Syntaxes[¶](#id287 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_class_stub`

`clang::objc_class_stub`

`clang::objc_class_stub`

Yes

This attribute specifies that the Objective-C class to which it applies is instantiated at runtime.

Unlike `__attribute__((objc_runtime_visible))`, a class having this attribute still has a “class stub” that is visible to the linker. This allows categories to be defined. Static message sends with the class as a receiver use a special access pattern to ensure the class is lazily instantiated from the class stub.

Classes annotated with this attribute cannot be subclassed and cannot have implementations defined for them. This attribute is intended for use in Swift-generated headers for classes defined in Swift.

Adding or removing this attribute to a class is an ABI-breaking change.

### [riscv\_rvv\_vector\_bits](#id697)[¶](#riscv-rvv-vector-bits "Link to this heading")

Supported Syntaxes[¶](#id288 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`riscv_rvv_vector_bits`

On RISC-V targets, the `riscv_rvv_vector_bits(N)` attribute is used to define fixed-length variants of sizeless types.

For example:

#include <riscv\_vector.h>

#if defined(\_\_riscv\_v\_fixed\_vlen)
typedef vint8m1\_t fixed\_vint8m1\_t \_\_attribute\_\_((riscv\_rvv\_vector\_bits(\_\_riscv\_v\_fixed\_vlen)));
#endif

Creates a type `fixed_vint8m1_t` that is a fixed-length variant of `vint8m1_t` that contains exactly 512 bits. Unlike `vint8m1_t`, this type can be used in globals, structs, unions, and arrays, all of which are unsupported for sizeless types.

The attribute can be attached to a single RVV vector (such as `vint8m1_t`). The attribute will be rejected unless `N==(__riscv_v_fixed_vlen*LMUL)`, the implementation defined feature macro that is enabled under the `-mrvv-vector-bits` flag. `__riscv_v_fixed_vlen` can only be a power of 2 between 64 and 65536.

For types where LMUL!=1, `__riscv_v_fixed_vlen` needs to be scaled by the LMUL of the type before passing to the attribute.

For `vbool*_t` types, `__riscv_v_fixed_vlen` needs to be divided by the number from the type name. For example, `vbool8_t` needs to use `__riscv_v_fixed_vlen` / 8. If the resulting value is not a multiple of 8, the type is not supported for that value of `__riscv_v_fixed_vlen`.

### [type\_visibility](#id698)[¶](#type-visibility "Link to this heading")

Supported Syntaxes[¶](#id289 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`type_visibility`

`clang::type_visibility`

`clang::type_visibility`

The `type_visibility` attribute allows the visibility of a type and its vague linkage objects (vtable, typeinfo, typeinfo name) to be controlled separately from the visibility of functions and data members of the type.

For example, this can be used to give default visibility to the typeinfo and the vtable of a type while still keeping hidden visibility on its member functions and static data members.

This attribute can only be applied to types and namespaces.

If both `visibility` and `type_visibility` are applied to a type or a namespace, the visibility specified with the `type_visibility` attribute overrides the visibility provided with the regular `visibility` attribute.

[Type Safety Checking](#id699)[¶](#type-safety-checking "Link to this heading")
-------------------------------------------------------------------------------

Clang supports additional attributes to enable checking type safety properties that can’t be enforced by the C type system. To see warnings produced by these checks, ensure that -Wtype-safety is enabled. Use cases include:

*   MPI library implementations, where these attributes enable checking that the buffer type matches the passed `MPI_Datatype`;
    
*   for HDF5 library there is a similar use case to MPI;
    
*   checking types of variadic functions’ arguments for functions like `fcntl()` and `ioctl()`.
    

You can detect support for these attributes with `__has_attribute()`. For example:

#if defined(\_\_has\_attribute)
\#  if \_\_has\_attribute(argument\_with\_type\_tag) && \\
      \_\_has\_attribute(pointer\_with\_type\_tag) && \\
      \_\_has\_attribute(type\_tag\_for\_datatype)
\#    define ATTR\_MPI\_PWT(buffer\_idx, type\_idx) \_\_attribute\_\_((pointer\_with\_type\_tag(mpi,buffer\_idx,type\_idx)))
/\* ... other macros ... \*/
\#  endif
#endif

#if !defined(ATTR\_MPI\_PWT)
\# define ATTR\_MPI\_PWT(buffer\_idx, type\_idx)
#endif

int MPI\_Send(void \*buf, int count, MPI\_Datatype datatype /\*, other args omitted \*/)
    ATTR\_MPI\_PWT(1,3);

### [argument\_with\_type\_tag](#id700)[¶](#argument-with-type-tag "Link to this heading")

Supported Syntaxes[¶](#id290 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`argument_with_type_tag`  
`pointer_with_type_tag`

`clang::argument_with_type_tag`  
`clang::pointer_with_type_tag`

`clang::argument_with_type_tag`  
`clang::pointer_with_type_tag`

Use `__attribute__((argument_with_type_tag(arg_kind, arg_idx, type_tag_idx)))` on a function declaration to specify that the function accepts a type tag that determines the type of some other argument.

This attribute is primarily useful for checking arguments of variadic functions (`pointer_with_type_tag` can be used in most non-variadic cases).

In the attribute prototype above:

*   `arg_kind` is an identifier that should be used when annotating all applicable type tags.
    
*   `arg_idx` provides the position of a function argument. The expected type of this function argument will be determined by the function argument specified by `type_tag_idx`. In the code example below, “3” means that the type of the function’s third argument will be determined by `type_tag_idx`.
    
*   `type_tag_idx` provides the position of a function argument. This function argument will be a type tag. The type tag will determine the expected type of the argument specified by `arg_idx`. In the code example below, “2” means that the type tag associated with the function’s second argument should agree with the type of the argument specified by `arg_idx`.
    

For example:

int fcntl(int fd, int cmd, ...)
    \_\_attribute\_\_(( argument\_with\_type\_tag(fcntl,3,2) ));
// The function's second argument will be a type tag; this type tag will
// determine the expected type of the function's third argument.

### [pointer\_with\_type\_tag](#id701)[¶](#pointer-with-type-tag "Link to this heading")

Supported Syntaxes[¶](#id291 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`argument_with_type_tag`  
`pointer_with_type_tag`

`clang::argument_with_type_tag`  
`clang::pointer_with_type_tag`

`clang::argument_with_type_tag`  
`clang::pointer_with_type_tag`

Use `__attribute__((pointer_with_type_tag(ptr_kind, ptr_idx, type_tag_idx)))` on a function declaration to specify that the function accepts a type tag that determines the pointee type of some other pointer argument.

In the attribute prototype above:

*   `ptr_kind` is an identifier that should be used when annotating all applicable type tags.
    
*   `ptr_idx` provides the position of a function argument; this function argument will have a pointer type. The expected pointee type of this pointer type will be determined by the function argument specified by `type_tag_idx`. In the code example below, “1” means that the pointee type of the function’s first argument will be determined by `type_tag_idx`.
    
*   `type_tag_idx` provides the position of a function argument; this function argument will be a type tag. The type tag will determine the expected pointee type of the pointer argument specified by `ptr_idx`. In the code example below, “3” means that the type tag associated with the function’s third argument should agree with the pointee type of the pointer argument specified by `ptr_idx`.
    

For example:

typedef int MPI\_Datatype;
int MPI\_Send(void \*buf, int count, MPI\_Datatype datatype /\*, other args omitted \*/)
    \_\_attribute\_\_(( pointer\_with\_type\_tag(mpi,1,3) ));
// The function's 3rd argument will be a type tag; this type tag will
// determine the expected pointee type of the function's 1st argument.

### [type\_tag\_for\_datatype](#id702)[¶](#type-tag-for-datatype "Link to this heading")

Supported Syntaxes[¶](#id292 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`type_tag_for_datatype`

`clang::type_tag_for_datatype`

`clang::type_tag_for_datatype`

When declaring a variable, use `__attribute__((type_tag_for_datatype(kind, type)))` to create a type tag that is tied to the `type` argument given to the attribute.

In the attribute prototype above:

*   `kind` is an identifier that should be used when annotating all applicable type tags.
    
*   `type` indicates the name of the type.
    

Clang supports annotating type tags of two forms.

> *   **Type tag that is a reference to a declared identifier.** Use `__attribute__((type_tag_for_datatype(kind, type)))` when declaring that identifier:
>     
>     typedef int MPI\_Datatype;
>     extern struct mpi\_datatype mpi\_datatype\_int
>         \_\_attribute\_\_(( type\_tag\_for\_datatype(mpi,int) ));
>     #define MPI\_INT ((MPI\_Datatype) &mpi\_datatype\_int)
>     // &mpi\_datatype\_int is a type tag. It is tied to type "int".
>     
> *   **Type tag that is an integral literal.** Declare a `static const` variable with an initializer value and attach `__attribute__((type_tag_for_datatype(kind, type)))` on that declaration:
>     
>     typedef int MPI\_Datatype;
>     static const MPI\_Datatype mpi\_datatype\_int
>         \_\_attribute\_\_(( type\_tag\_for\_datatype(mpi,int) )) \= 42;
>     #define MPI\_INT ((MPI\_Datatype) 42)
>     // The number 42 is a type tag. It is tied to type "int".
>     

The `type_tag_for_datatype` attribute also accepts an optional third argument that determines how the type of the function argument specified by either `arg_idx` or `ptr_idx` is compared against the type associated with the type tag. (Recall that for the `argument_with_type_tag` attribute, the type of the function argument specified by `arg_idx` is compared against the type associated with the type tag. Also recall that for the `pointer_with_type_tag` attribute, the pointee type of the function argument specified by `ptr_idx` is compared against the type associated with the type tag.) There are two supported values for this optional third argument:

> *   `layout_compatible` will cause types to be compared according to layout-compatibility rules (In C++11 \[class.mem\] p 17, 18, see the layout-compatibility rules for two standard-layout struct types and for two standard-layout union types). This is useful when creating a type tag associated with a struct or union type. For example:
>     
>     /\* In mpi.h \*/
>     typedef int MPI\_Datatype;
>     struct internal\_mpi\_double\_int { double d; int i; };
>     extern struct mpi\_datatype mpi\_datatype\_double\_int
>         \_\_attribute\_\_(( type\_tag\_for\_datatype(mpi,
>                         struct internal\_mpi\_double\_int, layout\_compatible) ));
>     
>     #define MPI\_DOUBLE\_INT ((MPI\_Datatype) &mpi\_datatype\_double\_int)
>     
>     int MPI\_Send(void \*buf, int count, MPI\_Datatype datatype, ...)
>         \_\_attribute\_\_(( pointer\_with\_type\_tag(mpi,1,3) ));
>     
>     /\* In user code \*/
>     struct my\_pair { double a; int b; };
>     struct my\_pair \*buffer;
>     MPI\_Send(buffer, 1, MPI\_DOUBLE\_INT /\*, ... \*/); // no warning because the
>                                                      // layout of my\_pair is
>                                                      // compatible with that of
>                                                      // internal\_mpi\_double\_int
>     
>     struct my\_int\_pair { int a; int b; }
>     struct my\_int\_pair \*buffer2;
>     MPI\_Send(buffer2, 1, MPI\_DOUBLE\_INT /\*, ... \*/); // warning because the
>                                                       // layout of my\_int\_pair
>                                                       // does not match that of
>                                                       // internal\_mpi\_double\_int
>     
> *   `must_be_null` specifies that the function argument specified by either `arg_idx` (for the `argument_with_type_tag` attribute) or `ptr_idx` (for the `pointer_with_type_tag` attribute) should be a null pointer constant. The second argument to the `type_tag_for_datatype` attribute is ignored. For example:
>     
>     /\* In mpi.h \*/
>     typedef int MPI\_Datatype;
>     extern struct mpi\_datatype mpi\_datatype\_null
>         \_\_attribute\_\_(( type\_tag\_for\_datatype(mpi, void, must\_be\_null) ));
>     
>     #define MPI\_DATATYPE\_NULL ((MPI\_Datatype) &mpi\_datatype\_null)
>     int MPI\_Send(void \*buf, int count, MPI\_Datatype datatype, ...)
>         \_\_attribute\_\_(( pointer\_with\_type\_tag(mpi,1,3) ));
>     
>     /\* In user code \*/
>     struct my\_pair { double a; int b; };
>     struct my\_pair \*buffer;
>     MPI\_Send(buffer, 1, MPI\_DATATYPE\_NULL /\*, ... \*/); // warning: MPI\_DATATYPE\_NULL
>                                                         // was specified but buffer
>                                                         // is not a null pointer
>     

[Undocumented](#id703)[¶](#undocumented "Link to this heading")
---------------------------------------------------------------

This section lists attributes which are recognized by Clang, but which are currently missing documentation.

### [Alignas, align, alignas, aligned](#id704)[¶](#alignas-align-alignas-aligned "Link to this heading")

Supported Syntaxes[¶](#id293 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`aligned`

`gnu::aligned`

`gnu::aligned`

`align`

`alignas`  
`_Alignas`

No documentation.

### [NSObject](#id705)[¶](#nsobject "Link to this heading")

Supported Syntaxes[¶](#id294 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`NSObject`

`clang::NSObject`

`clang::NSObject`

No documentation.

### [\_\_kindof](#id706)[¶](#kindof "Link to this heading")

Supported Syntaxes[¶](#id295 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__kindof`

No documentation.

### [acquired\_after](#id707)[¶](#acquired-after "Link to this heading")

Supported Syntaxes[¶](#id296 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`acquired_after`

No documentation.

### [acquired\_before](#id708)[¶](#acquired-before "Link to this heading")

Supported Syntaxes[¶](#id297 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`acquired_before`

No documentation.

### [address\_space](#id709)[¶](#address-space "Link to this heading")

Supported Syntaxes[¶](#id298 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`address_space`

`clang::address_space`

`clang::address_space`

No documentation.

### [alias](#id710)[¶](#alias "Link to this heading")

Supported Syntaxes[¶](#id299 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`alias`

`gnu::alias`

`gnu::alias`

Yes

No documentation.

### [analyzer\_noreturn](#id711)[¶](#analyzer-noreturn "Link to this heading")

Supported Syntaxes[¶](#id300 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`analyzer_noreturn`

No documentation.

### [annotate](#id712)[¶](#annotate "Link to this heading")

Supported Syntaxes[¶](#id301 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`annotate`

`clang::annotate`

`clang::annotate`

Yes

No documentation.

### [available\_only\_in\_default\_eval\_method](#id713)[¶](#available-only-in-default-eval-method "Link to this heading")

Supported Syntaxes[¶](#id302 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`available_only_in_default_eval_method`

`clang::available_only_in_default_eval_method`

`clang::available_only_in_default_eval_method`

Yes

No documentation.

### [blocks](#id714)[¶](#blocks "Link to this heading")

Supported Syntaxes[¶](#id303 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`blocks`

`clang::blocks`

`clang::blocks`

No documentation.

### [capability, shared\_capability](#id715)[¶](#capability-shared-capability "Link to this heading")

Supported Syntaxes[¶](#id304 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`capability`  
`shared_capability`

`clang::capability`  
`clang::shared_capability`

Yes

No documentation.

### [cdecl](#id716)[¶](#cdecl "Link to this heading")

Supported Syntaxes[¶](#id305 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cdecl`

`gnu::cdecl`

`gnu::cdecl`

`__cdecl`  
`_cdecl`

No documentation.

### [cf\_audited\_transfer](#id717)[¶](#cf-audited-transfer "Link to this heading")

Supported Syntaxes[¶](#id306 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cf_audited_transfer`

`clang::cf_audited_transfer`

`clang::cf_audited_transfer`

Yes

No documentation.

### [cf\_unknown\_transfer](#id718)[¶](#cf-unknown-transfer "Link to this heading")

Supported Syntaxes[¶](#id307 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cf_unknown_transfer`

`clang::cf_unknown_transfer`

`clang::cf_unknown_transfer`

Yes

No documentation.

### [common](#id719)[¶](#common "Link to this heading")

Supported Syntaxes[¶](#id308 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`common`

`gnu::common`

`gnu::common`

Yes

No documentation.

### [const](#id720)[¶](#const "Link to this heading")

Supported Syntaxes[¶](#id309 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`const`  
`__const`

`gnu::const`  
`gnu::__const`

`gnu::const`  
`gnu::__const`

No documentation.

### [constant](#id721)[¶](#constant "Link to this heading")

Supported Syntaxes[¶](#id310 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`constant`

`__constant__`

Yes

No documentation.

### [consumable\_auto\_cast\_state](#id722)[¶](#consumable-auto-cast-state "Link to this heading")

Supported Syntaxes[¶](#id311 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`consumable_auto_cast_state`

`clang::consumable_auto_cast_state`

Yes

No documentation.

### [consumable\_set\_state\_on\_read](#id723)[¶](#consumable-set-state-on-read "Link to this heading")

Supported Syntaxes[¶](#id312 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`consumable_set_state_on_read`

`clang::consumable_set_state_on_read`

Yes

No documentation.

### [device](#id724)[¶](#device "Link to this heading")

Supported Syntaxes[¶](#id313 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`device`

`__device__`

Yes

No documentation.

### [exclusive\_locks\_required, requires\_capability, requires\_shared\_capability, shared\_locks\_required](#id725)[¶](#exclusive-locks-required-requires-capability-requires-shared-capability-shared-locks-required "Link to this heading")

Supported Syntaxes[¶](#id314 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`requires_capability`  
`exclusive_locks_required`  
`requires_shared_capability`  
`shared_locks_required`

`clang::requires_capability`  
`clang::exclusive_locks_required`  
`clang::requires_shared_capability`  
`clang::shared_locks_required`

No documentation.

### [format\_arg](#id726)[¶](#format-arg "Link to this heading")

Supported Syntaxes[¶](#id315 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`format_arg`

`gnu::format_arg`

`gnu::format_arg`

No documentation.

### [global](#id727)[¶](#global "Link to this heading")

Supported Syntaxes[¶](#id316 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`global`

`__global__`

Yes

No documentation.

### [guarded\_by](#id728)[¶](#guarded-by "Link to this heading")

Supported Syntaxes[¶](#id317 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`guarded_by`

No documentation.

### [guarded\_var](#id729)[¶](#guarded-var "Link to this heading")

Supported Syntaxes[¶](#id318 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`guarded_var`

`clang::guarded_var`

No documentation.

### [host](#id730)[¶](#host "Link to this heading")

Supported Syntaxes[¶](#id319 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`host`

`__host__`

Yes

No documentation.

### [ibaction](#id731)[¶](#ibaction "Link to this heading")

Supported Syntaxes[¶](#id320 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ibaction`

`clang::ibaction`

`clang::ibaction`

Yes

No documentation.

### [iboutlet](#id732)[¶](#iboutlet "Link to this heading")

Supported Syntaxes[¶](#id321 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`iboutlet`

`clang::iboutlet`

`clang::iboutlet`

No documentation.

### [iboutletcollection](#id733)[¶](#iboutletcollection "Link to this heading")

Supported Syntaxes[¶](#id322 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`iboutletcollection`

`clang::iboutletcollection`

`clang::iboutletcollection`

No documentation.

### [intel\_ocl\_bicc](#id734)[¶](#intel-ocl-bicc "Link to this heading")

Supported Syntaxes[¶](#id323 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`intel_ocl_bicc`

`clang::intel_ocl_bicc`

No documentation.

### [interrupt](#id735)[¶](#interrupt "Link to this heading")

Supported Syntaxes[¶](#id324 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

`gnu::interrupt`

`gnu::interrupt`

No documentation.

### [interrupt](#id736)[¶](#id16 "Link to this heading")

Supported Syntaxes[¶](#id325 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`interrupt`

No documentation.

### [launch\_bounds](#id737)[¶](#launch-bounds "Link to this heading")

Supported Syntaxes[¶](#id326 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`launch_bounds`

`__launch_bounds__`

Yes

No documentation.

### [lock\_returned](#id738)[¶](#lock-returned "Link to this heading")

Supported Syntaxes[¶](#id327 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`lock_returned`

No documentation.

### [lockable](#id739)[¶](#lockable "Link to this heading")

Supported Syntaxes[¶](#id328 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`lockable`

Yes

No documentation.

### [locks\_excluded](#id740)[¶](#locks-excluded "Link to this heading")

Supported Syntaxes[¶](#id329 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`locks_excluded`

No documentation.

### [matrix\_type](#id741)[¶](#matrix-type "Link to this heading")

Supported Syntaxes[¶](#id330 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`matrix_type`

`clang::matrix_type`

`clang::matrix_type`

No documentation.

### [may\_alias](#id742)[¶](#may-alias "Link to this heading")

Supported Syntaxes[¶](#id331 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`may_alias`

`gnu::may_alias`

`gnu::may_alias`

No documentation.

### [mips16](#id743)[¶](#mips16 "Link to this heading")

Supported Syntaxes[¶](#id332 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`mips16`

`gnu::mips16`

`gnu::mips16`

Yes

No documentation.

### [mode](#id744)[¶](#mode "Link to this heading")

Supported Syntaxes[¶](#id333 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`mode`

`gnu::mode`

`gnu::mode`

No documentation.

### [ms\_struct](#id745)[¶](#ms-struct "Link to this heading")

Supported Syntaxes[¶](#id334 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ms_struct`

`gnu::ms_struct`

`gnu::ms_struct`

Yes

No documentation.

### [naked](#id746)[¶](#naked "Link to this heading")

Supported Syntaxes[¶](#id335 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`naked`

`gnu::naked`

`gnu::naked`

`naked`

Yes

No documentation.

### [neon\_polyvector\_type](#id747)[¶](#neon-polyvector-type "Link to this heading")

Supported Syntaxes[¶](#id336 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`neon_polyvector_type`

`clang::neon_polyvector_type`

`clang::neon_polyvector_type`

No documentation.

### [neon\_vector\_type](#id748)[¶](#neon-vector-type "Link to this heading")

Supported Syntaxes[¶](#id337 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`neon_vector_type`

`clang::neon_vector_type`

`clang::neon_vector_type`

No documentation.

### [no\_instrument\_function](#id749)[¶](#no-instrument-function "Link to this heading")

Supported Syntaxes[¶](#id338 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_instrument_function`

`gnu::no_instrument_function`

`gnu::no_instrument_function`

Yes

No documentation.

### [no\_thread\_safety\_analysis](#id750)[¶](#no-thread-safety-analysis "Link to this heading")

Supported Syntaxes[¶](#id339 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_thread_safety_analysis`

`clang::no_thread_safety_analysis`

`clang::no_thread_safety_analysis`

Yes

No documentation.

### [nocommon](#id751)[¶](#nocommon "Link to this heading")

Supported Syntaxes[¶](#id340 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nocommon`

`gnu::nocommon`

`gnu::nocommon`

Yes

No documentation.

### [nomips16](#id752)[¶](#nomips16 "Link to this heading")

Supported Syntaxes[¶](#id341 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nomips16`

`gnu::nomips16`

`gnu::nomips16`

Yes

No documentation.

### [noreturn](#id753)[¶](#id17 "Link to this heading")

Supported Syntaxes[¶](#id342 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noreturn`

`gnu::noreturn`

`gnu::noreturn`

`noreturn`

No documentation.

### [objc\_arc\_weak\_reference\_unavailable](#id754)[¶](#objc-arc-weak-reference-unavailable "Link to this heading")

Supported Syntaxes[¶](#id343 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_arc_weak_reference_unavailable`

`clang::objc_arc_weak_reference_unavailable`

`clang::objc_arc_weak_reference_unavailable`

Yes

No documentation.

### [objc\_bridge](#id755)[¶](#objc-bridge "Link to this heading")

Supported Syntaxes[¶](#id344 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_bridge`

`clang::objc_bridge`

`clang::objc_bridge`

Yes

No documentation.

### [objc\_bridge\_mutable](#id756)[¶](#objc-bridge-mutable "Link to this heading")

Supported Syntaxes[¶](#id345 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_bridge_mutable`

`clang::objc_bridge_mutable`

`clang::objc_bridge_mutable`

Yes

No documentation.

### [objc\_designated\_initializer](#id758)[¶](#objc-designated-initializer "Link to this heading")

Supported Syntaxes[¶](#id347 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_designated_initializer`

`clang::objc_designated_initializer`

`clang::objc_designated_initializer`

Yes

No documentation.

### [objc\_exception](#id759)[¶](#objc-exception "Link to this heading")

Supported Syntaxes[¶](#id348 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_exception`

`clang::objc_exception`

`clang::objc_exception`

Yes

No documentation.

### [objc\_gc](#id760)[¶](#objc-gc "Link to this heading")

Supported Syntaxes[¶](#id349 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_gc`

`clang::objc_gc`

`clang::objc_gc`

No documentation.

### [objc\_independent\_class](#id761)[¶](#objc-independent-class "Link to this heading")

Supported Syntaxes[¶](#id350 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_independent_class`

`clang::objc_independent_class`

`clang::objc_independent_class`

No documentation.

### [objc\_ownership](#id762)[¶](#objc-ownership "Link to this heading")

Supported Syntaxes[¶](#id351 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_ownership`

`clang::objc_ownership`

`clang::objc_ownership`

No documentation.

### [objc\_precise\_lifetime](#id763)[¶](#objc-precise-lifetime "Link to this heading")

Supported Syntaxes[¶](#id352 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_precise_lifetime`

`clang::objc_precise_lifetime`

`clang::objc_precise_lifetime`

Yes

No documentation.

### [objc\_protocol\_requires\_explicit\_implementation](#id764)[¶](#objc-protocol-requires-explicit-implementation "Link to this heading")

Supported Syntaxes[¶](#id353 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_protocol_requires_explicit_implementation`

`clang::objc_protocol_requires_explicit_implementation`

`clang::objc_protocol_requires_explicit_implementation`

Yes

No documentation.

### [objc\_requires\_property\_definitions](#id765)[¶](#objc-requires-property-definitions "Link to this heading")

Supported Syntaxes[¶](#id354 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_requires_property_definitions`

`clang::objc_requires_property_definitions`

`clang::objc_requires_property_definitions`

Yes

No documentation.

### [objc\_returns\_inner\_pointer](#id766)[¶](#objc-returns-inner-pointer "Link to this heading")

Supported Syntaxes[¶](#id355 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_returns_inner_pointer`

`clang::objc_returns_inner_pointer`

`clang::objc_returns_inner_pointer`

Yes

No documentation.

### [objc\_root\_class](#id767)[¶](#objc-root-class "Link to this heading")

Supported Syntaxes[¶](#id356 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_root_class`

`clang::objc_root_class`

`clang::objc_root_class`

Yes

No documentation.

### [packed](#id768)[¶](#packed "Link to this heading")

Supported Syntaxes[¶](#id357 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`packed`

`gnu::packed`

`gnu::packed`

No documentation.

### [pascal](#id769)[¶](#pascal "Link to this heading")

Supported Syntaxes[¶](#id358 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`pascal`

`clang::pascal`

`clang::pascal`

`__pascal`  
`_pascal`

No documentation.

### [pt\_guarded\_by](#id770)[¶](#pt-guarded-by "Link to this heading")

Supported Syntaxes[¶](#id359 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`pt_guarded_by`

No documentation.

### [pt\_guarded\_var](#id771)[¶](#pt-guarded-var "Link to this heading")

Supported Syntaxes[¶](#id360 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`pt_guarded_var`

`clang::pt_guarded_var`

No documentation.

### [ptrauth\_vtable\_pointer](#id772)[¶](#ptrauth-vtable-pointer "Link to this heading")

Supported Syntaxes[¶](#id361 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`ptrauth_vtable_pointer`

`clang::ptrauth_vtable_pointer`

`clang::ptrauth_vtable_pointer`

Yes

No documentation.

### [pure](#id773)[¶](#pure "Link to this heading")

Supported Syntaxes[¶](#id362 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`pure`

`gnu::pure`

`gnu::pure`

No documentation.

### [reentrant\_capability](#id774)[¶](#reentrant-capability "Link to this heading")

Supported Syntaxes[¶](#id363 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`reentrant_capability`

`clang::reentrant_capability`

`clang::reentrant_capability`

Yes

No documentation.

### [reqd\_work\_group\_size](#id775)[¶](#reqd-work-group-size "Link to this heading")

Supported Syntaxes[¶](#id364 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`reqd_work_group_size`

Yes

No documentation.

### [returns\_twice](#id776)[¶](#returns-twice "Link to this heading")

Supported Syntaxes[¶](#id365 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`returns_twice`

`gnu::returns_twice`

`gnu::returns_twice`

Yes

No documentation.

### [scoped\_lockable](#id777)[¶](#scoped-lockable "Link to this heading")

Supported Syntaxes[¶](#id366 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`scoped_lockable`

`clang::scoped_lockable`

Yes

No documentation.

### [sentinel](#id778)[¶](#sentinel "Link to this heading")

Supported Syntaxes[¶](#id367 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`sentinel`

`gnu::sentinel`

`gnu::sentinel`

No documentation.

### [shared](#id779)[¶](#shared "Link to this heading")

Supported Syntaxes[¶](#id368 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`shared`

`__shared__`

Yes

No documentation.

### [unavailable](#id780)[¶](#unavailable "Link to this heading")

Supported Syntaxes[¶](#id369 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`unavailable`

`clang::unavailable`

`clang::unavailable`

No documentation.

### [uuid](#id781)[¶](#uuid "Link to this heading")

Supported Syntaxes[¶](#id370 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`uuid`

No documentation.

### [vec\_type\_hint](#id782)[¶](#vec-type-hint "Link to this heading")

Supported Syntaxes[¶](#id371 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vec_type_hint`

Yes

No documentation.

### [vecreturn](#id783)[¶](#vecreturn "Link to this heading")

Supported Syntaxes[¶](#id372 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vecreturn`

`clang::vecreturn`

Yes

No documentation.

### [vector\_size](#id784)[¶](#vector-size "Link to this heading")

Supported Syntaxes[¶](#id373 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vector_size`

`gnu::vector_size`

`gnu::vector_size`

No documentation.

### [visibility](#id785)[¶](#visibility "Link to this heading")

Supported Syntaxes[¶](#id374 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`visibility`

`gnu::visibility`

`gnu::visibility`

Yes

No documentation.

### [warn\_unused](#id786)[¶](#warn-unused "Link to this heading")

Supported Syntaxes[¶](#id375 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`warn_unused`

`gnu::warn_unused`

`gnu::warn_unused`

Yes

No documentation.

### [weak\_import](#id787)[¶](#weak-import "Link to this heading")

Supported Syntaxes[¶](#id376 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`weak_import`

`clang::weak_import`

`clang::weak_import`

No documentation.

### [weakref](#id788)[¶](#weakref "Link to this heading")

Supported Syntaxes[¶](#id377 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`weakref`

`gnu::weakref`

`gnu::weakref`

Yes

No documentation.

### [work\_group\_size\_hint](#id789)[¶](#work-group-size-hint "Link to this heading")

Supported Syntaxes[¶](#id378 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`work_group_size_hint`

Yes

No documentation.

[Variable Attributes](#id790)[¶](#variable-attributes "Link to this heading")
-----------------------------------------------------------------------------

### [HLSL Parameter Modifiers](#id791)[¶](#hlsl-parameter-modifiers "Link to this heading")

Supported Syntaxes[¶](#id379 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`in`  
`inout`  
`out`

HLSL function parameters are passed by value. Parameter declarations support three qualifiers to denote parameter passing behavior. The three qualifiers are in, out and inout.

Parameters annotated with in or with no annotation are passed by value from the caller to the callee.

Parameters annotated with out are written to the argument after the callee returns (Note: arguments values passed into out parameters _are not_ copied into the callee).

Parameters annotated with inout are copied into the callee via a temporary, and copied back to the argument after the callee returns.

### [\_\_ptrauth](#id792)[¶](#ptrauth "Link to this heading")

Supported Syntaxes[¶](#id380 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`__ptrauth`

The `__ptrauth` qualifier allows the programmer to directly control how pointers are signed when they are stored in a particular variable. This can be used to strengthen the default protections of pointer authentication and make it more difficult for an attacker to escalate an ability to alter memory into full control of a process.

#include <ptrauth.h>

typedef void (\*my\_callback)(const void\*);
my\_callback \_\_ptrauth(ptrauth\_key\_process\_dependent\_code, 1, 0xe27a) callback;

The first argument to `__ptrauth` is the name of the signing key. Valid key names for the target are defined in `<ptrauth.h>`.

The second argument to `__ptrauth` is a flag (0 or 1) specifying whether the object should use address discrimination.

The third argument to `__ptrauth` is a 16-bit non-negative integer which allows additional discrimination between objects.

### [always\_destroy](#id793)[¶](#always-destroy "Link to this heading")

Supported Syntaxes[¶](#id381 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`always_destroy`

`clang::always_destroy`

Yes

The `always_destroy` attribute specifies that a variable with static or thread storage duration should have its exit-time destructor run. This attribute is the default unless clang was invoked with -fno-c++-static-destructors.

If a variable is explicitly declared with this attribute, Clang will silence otherwise applicable `-Wexit-time-destructors` warnings.

### [binding](#id794)[¶](#binding "Link to this heading")

Supported Syntaxes[¶](#id382 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vk::binding`

The `[[vk::binding]]` attribute allows you to explicitly specify the descriptor set and binding for a resource when targeting SPIR-V. This is particularly useful when you need different bindings for SPIR-V and DXIL, as the `register` attribute can be used for DXIL-specific bindings.

The attribute takes two integer arguments: the binding and the descriptor set. The descriptor set is optional and defaults to 0 if not provided.

// A structured buffer with binding 23 in descriptor set 102.
\[\[vk::binding(23, 102)\]\] StructuredBuffer<float\> Buf;

// A structured buffer with binding 14 in descriptor set 0.
\[\[vk::binding(14)\]\] StructuredBuffer<float\> Buf2;

// A cbuffer with binding 1 in descriptor set 2.
\[\[vk::binding(1, 2)\]\] cbuffer MyCBuffer {
  float4x4 worldViewProj;
};

### [called\_once](#id795)[¶](#called-once "Link to this heading")

Supported Syntaxes[¶](#id383 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`called_once`

`clang::called_once`

`clang::called_once`

Yes

The `called_once` attribute specifies that the annotated function or method parameter is invoked exactly once on all execution paths. It only applies to parameters with function-like types, i.e. function pointers or blocks. This concept is particularly useful for asynchronous programs.

Clang implements a check for `called_once` parameters, `-Wcalled-once-parameter`. It is on by default and finds the following violations:

*   Parameter is not called at all.
    
*   Parameter is called more than once.
    
*   Parameter is not called on one of the execution paths.
    

In the latter case, Clang pinpoints the path where parameter is not invoked by showing the control-flow statement where the path diverges.

void fooWithCallback(void (^callback)(void) \_\_attribute\_\_((called\_once))) {
  if (somePredicate()) {
    ...
    callback();
  } else {
    callback(); // OK: callback is called on every path
  }
}

void barWithCallback(void (^callback)(void) \_\_attribute\_\_((called\_once))) {
  if (somePredicate()) {
    ...
    callback(); // note: previous call is here
  }
  callback(); // warning: callback is called twice
}

void foobarWithCallback(void (^callback)(void) \_\_attribute\_\_((called\_once))) {
  if (somePredicate()) {  // warning: callback is not called when condition is false
    ...
    callback();
  }
}

This attribute is useful for API developers who want to double-check if they implemented their method correctly.

### [clang::code\_align](#id796)[¶](#clang-code-align "Link to this heading")

Supported Syntaxes[¶](#id384 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`code_align`

`clang::code_align`

`clang::code_align`

The `clang::code_align(N)` attribute applies to a loop and specifies the byte alignment for a loop. The attribute accepts a positive integer constant initialization expression indicating the number of bytes for the minimum alignment boundary. Its value must be a power of 2, between 1 and 4096 (inclusive).

void foo() {
  int var \= 0;
  \[\[clang::code\_align(16)\]\] for (int i \= 0; i < 10; ++i) var++;
}

void Array(int \*array, size\_t n) {
  \[\[clang::code\_align(64)\]\] for (int i \= 0; i < n; ++i) array\[i\] \= 0;
}

void count () {
  int a1\[10\], int i \= 0;
  \[\[clang::code\_align(32)\]\] while (i < 10) { a1\[i\] += 3; }
}

void check() {
  int a \= 10;
  \[\[clang::code\_align(8)\]\] do {
    a \= a + 1;
  } while (a < 20);
}

template<int A\>
void func() {
  \[\[clang::code\_align(A)\]\] for(;;) { }
}

### [cleanup](#id797)[¶](#cleanup "Link to this heading")

Supported Syntaxes[¶](#id385 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`cleanup`

`gnu::cleanup`

`gnu::cleanup`

Yes

This attribute allows a function to be run when a local variable goes out of scope. The attribute takes the identifier of a function with a parameter type that is a pointer to the type with the attribute.

static void foo (int \*) { ... }
static void bar (int \*) { ... }
void baz (void) {
  int x \_\_attribute\_\_((cleanup(foo)));
  {
    int y \_\_attribute\_\_((cleanup(bar)));
  }
}

The above example will result in a call to `bar` being passed the address of `y` when `y` goes out of scope, then a call to `foo` being passed the address of `x` when `x` goes out of scope. If two or more variables share the same scope, their `cleanup` callbacks are invoked in the reverse order the variables were declared in. It is not possible to check the return value (if any) of these `cleanup` callback functions.

### [dllexport](#id798)[¶](#dllexport "Link to this heading")

Supported Syntaxes[¶](#id386 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`dllexport`

`gnu::dllexport`

`gnu::dllexport`

`dllexport`

Yes

The `__declspec(dllexport)` attribute declares a variable, function, or Objective-C interface to be exported from the module. It is available under the `-fdeclspec` flag for compatibility with various compilers. The primary use is for COFF object files which explicitly specify what interfaces are available for external use. See the [dllexport](https://msdn.microsoft.com/en-us/library/3y1sfaz2.aspx) documentation on MSDN for more information.

### [dllimport](#id799)[¶](#dllimport "Link to this heading")

Supported Syntaxes[¶](#id387 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`dllimport`

`gnu::dllimport`

`gnu::dllimport`

`dllimport`

Yes

The `__declspec(dllimport)` attribute declares a variable, function, or Objective-C interface to be imported from an external module. It is available under the `-fdeclspec` flag for compatibility with various compilers. The primary use is for COFF object files which explicitly specify what interfaces are imported from external modules. See the [dllimport](https://msdn.microsoft.com/en-us/library/3y1sfaz2.aspx) documentation on MSDN for more information.

Note that a dllimport function may still be inlined, if its definition is available and it doesn’t reference any non-dllimport functions or global variables.

### [ext\_builtin\_input](#id800)[¶](#ext-builtin-input "Link to this heading")

Supported Syntaxes[¶](#id388 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`vk::ext_builtin_input`

Vulkan shaders have Input builtins. Those variables are externally initialized by the driver/pipeline, but each copy is private to the current lane.

Those builtins can be declared using the \[\[vk::ext\_builtin\_input\]\] attribute like follows:

\[\[vk::ext\_builtin\_input(/\* WorkgroupId \*/ 26)\]\]
static const uint3 groupid;

This variable will be lowered into a module-level variable, with the Input storage class, and the BuiltIn 26 decoration.

The full documentation for this inline SPIR-V attribute can be found here: [https://github.com/microsoft/hlsl-specs/blob/main/proposals/0011-inline-spirv.md](https://github.com/microsoft/hlsl-specs/blob/main/proposals/0011-inline-spirv.md)

### [groupshared](#id801)[¶](#groupshared "Link to this heading")

Supported Syntaxes[¶](#id389 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`groupshared`

HLSL enables threads of a compute shader to exchange values via shared memory. HLSL provides barrier primitives such as GroupMemoryBarrierWithGroupSync, and so on to ensure the correct ordering of reads and writes to shared memory in the shader and to avoid data races. Here’s an example to declare a groupshared variable. .. code-block:: c++

> groupshared GSData data\[5\*5\*1\];

The full documentation is available here: [https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-variable-syntax#group-shared](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-variable-syntax#group-shared)

### [init\_priority](#id802)[¶](#init-priority "Link to this heading")

Supported Syntaxes[¶](#id390 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`init_priority`

`gnu::init_priority`

Yes

In C++, the order in which global variables are initialized across translation units is unspecified, unlike the ordering within a single translation unit. The `init_priority` attribute allows you to specify a relative ordering for the initialization of objects declared at namespace scope in C++ within a single linked image on supported platforms. The priority is given as an integer constant expression between 101 and 65535 (inclusive). Priorities outside of that range are reserved for use by the implementation. A lower value indicates a higher priority of initialization. Note that only the relative ordering of values is important. For example:

struct SomeType { SomeType(); };
\_\_attribute\_\_((init\_priority(200))) SomeType Obj1;
\_\_attribute\_\_((init\_priority(101))) SomeType Obj2;

`Obj2` will be initialized _before_ `Obj1` despite the usual order of initialization being the opposite.

Note that this attribute does not control the initialization order of objects across final linked image boundaries like shared objects and executables.

On Windows, `init_seg(compiler)` is represented with a priority of 200 and `init_seg(library)` is represented with a priority of 400. `init_seg(user)` uses the default 65535 priority.

On MachO platforms, this attribute also does not control the order of initialization across translation units, where it only affects the order within a single TU.

This attribute is only supported for C++ and Objective-C++ and is ignored in other language modes. Currently, this attribute is not implemented on z/OS.

### [init\_seg](#id803)[¶](#init-seg "Link to this heading")

Supported Syntaxes[¶](#id391 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`init_seg`

The attribute applied by `pragma init_seg()` controls the section into which global initialization function pointers are emitted. It is only available with `-fms-extensions`. Typically, this function pointer is emitted into `.CRT$XCU` on Windows. The user can change the order of initialization by using a different section name with the same `.CRT$XC` prefix and a suffix that sorts lexicographically before or after the standard `.CRT$XCU` sections. See the [init\_seg](http://msdn.microsoft.com/en-us/library/7977wcck\(v=vs.110\).aspx) documentation on MSDN for more information.

### [leaf](#id804)[¶](#leaf "Link to this heading")

Supported Syntaxes[¶](#id392 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`leaf`

`gnu::leaf`

`gnu::leaf`

Yes

The `leaf` attribute is used as a compiler hint to improve dataflow analysis in library functions. Functions marked with the `leaf` attribute are not allowed to jump back into the caller’s translation unit, whether through invoking a callback function, an external function call, use of `longjmp`, or other means. Therefore, they cannot use or modify any data that does not escape the caller function’s compilation unit.

For more information see gcc documentation <https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html>

### [loader\_uninitialized](#id805)[¶](#loader-uninitialized "Link to this heading")

Supported Syntaxes[¶](#id393 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`loader_uninitialized`

`clang::loader_uninitialized`

`clang::loader_uninitialized`

Yes

The `loader_uninitialized` attribute can be placed on global variables to indicate that the variable does not need to be zero initialized by the loader. On most targets, zero-initialization does not incur any additional cost. For example, most general purpose operating systems deliberately ensure that all memory is properly initialized in order to avoid leaking privileged information from the kernel or other programs. However, some targets do not make this guarantee, and on these targets, avoiding an unnecessary zero-initialization can have a significant impact on load times and/or code size.

A declaration with this attribute is a non-tentative definition just as if it provided an initializer. Variables with this attribute are considered to be uninitialized in the same sense as a local variable, and the programs must write to them before reading from them. If the variable’s type is a C++ class type with a non-trivial default constructor, or an array thereof, this attribute only suppresses the static zero-initialization of the variable, not the dynamic initialization provided by executing the default constructor.

### [maybe\_undef](#id806)[¶](#maybe-undef "Link to this heading")

Supported Syntaxes[¶](#id394 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`maybe_undef`

`clang::maybe_undef`

`clang::maybe_undef`

Yes

The `maybe_undef` attribute can be placed on a function parameter. It indicates that the parameter is allowed to use undef values. It informs the compiler to insert a freeze LLVM IR instruction on the function parameter. Please note that this is an attribute that is used as an internal implementation detail and not intended to be used by external users.

In languages HIP, CUDA etc., some functions have multi-threaded semantics and it is enough for only one or some threads to provide defined arguments. Depending on semantics, undef arguments in some threads don’t produce undefined results in the function call. Since, these functions accept undefined arguments, `maybe_undef` attribute can be placed.

Sample usage: .. code-block:: c

> void maybeundeffunc(int \_\_attribute\_\_((maybe\_undef))param);

### [maybe\_unused, unused](#id807)[¶](#maybe-unused-unused "Link to this heading")

Supported Syntaxes[¶](#id395 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`unused`

`maybe_unused`  
`gnu::unused`

`gnu::unused`  
`maybe_unused`

When passing the `-Wunused` flag to Clang, entities that are unused by the program may be diagnosed. The `[[maybe_unused]]` (or `__attribute__((unused))`) attribute can be used to silence such diagnostics when the entity cannot be removed. For instance, a local variable may exist solely for use in an `assert()` statement, which makes the local variable unused when `NDEBUG` is defined.

The attribute may be applied to the declaration of a class, a typedef, a variable, a function or method, a function parameter, an enumeration, an enumerator, a non-static data member, or a label.

#include <cassert>

\[\[maybe\_unused\]\] void f(\[\[maybe\_unused\]\] bool thing1,
                        \[\[maybe\_unused\]\] bool thing2) {
  \[\[maybe\_unused\]\] bool b \= thing1 && thing2;
  assert(b);
}

### [model](#id808)[¶](#model "Link to this heading")

Supported Syntaxes[¶](#id396 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`model`

`gnu::model`

`gnu::model`

The `model` attribute allows overriding the translation unit’s code model (specified by `-mcmodel`) for a specific global variable.

On LoongArch, allowed values are “normal”, “medium”, “extreme”.

On x86-64, allowed values are `"small"` and `"large"`. `"small"` is roughly equivalent to `-mcmodel=small`, meaning the global is considered “small” placed closer to the `.text` section relative to “large” globals, and to prefer using 32-bit relocations to access the global. `"large"` is roughly equivalent to `-mcmodel=large`, meaning the global is considered “large” and placed further from the `.text` section relative to “small” globals, and 64-bit relocations must be used to access the global.

### [no\_destroy](#id809)[¶](#no-destroy "Link to this heading")

Supported Syntaxes[¶](#id397 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`no_destroy`

`clang::no_destroy`

Yes

The `no_destroy` attribute specifies that a variable with static or thread storage duration shouldn’t have its exit-time destructor run. Annotating every static and thread duration variable with this attribute is equivalent to invoking clang with -fno-c++-static-destructors.

If a variable is declared with this attribute, clang doesn’t access check or generate the type’s destructor. If you have a type that you only want to be annotated with `no_destroy`, you can therefore declare the destructor private:

struct only\_no\_destroy {
  only\_no\_destroy();
private:
  ~only\_no\_destroy();
};

\[\[clang::no\_destroy\]\] only\_no\_destroy global; // fine!

Note that destructors are still required for subobjects of aggregates annotated with this attribute. This is because previously constructed subobjects need to be destroyed if an exception gets thrown before the initialization of the complete object is complete. For instance:

void f() {
  try {
    \[\[clang::no\_destroy\]\]
    static only\_no\_destroy array\[10\]; // error, only\_no\_destroy has a private destructor.
  } catch (...) {
    // Handle the error
  }
}

Here, if the construction of `array[9]` fails with an exception, `array[0..8]` will be destroyed, so the element’s destructor needs to be accessible.

### [nodebug](#id810)[¶](#nodebug "Link to this heading")

Supported Syntaxes[¶](#id398 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nodebug`

`gnu::nodebug`

`gnu::nodebug`

Yes

The `nodebug` attribute allows you to suppress debugging information for a function or method, for a variable that is not a parameter or a non-static data member, or for a typedef or using declaration.

### [noescape](#id811)[¶](#noescape "Link to this heading")

Supported Syntaxes[¶](#id399 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`noescape`

`clang::noescape`

`clang::noescape`

Yes

`noescape` placed on a function parameter of a pointer type is used to inform the compiler that the pointer cannot escape: that is, no reference to the object the pointer points to that is derived from the parameter value will survive after the function returns. Users are responsible for making sure parameters annotated with `noescape` do not actually escape. Calling `free()` on such a parameter does not constitute an escape.

For example:

int \*gp;

void nonescapingFunc(\_\_attribute\_\_((noescape)) int \*p) {
  \*p += 100; // OK.
}

void escapingFunc(\_\_attribute\_\_((noescape)) int \*p) {
  gp \= p; // Not OK.
}

Additionally, when the parameter is a block pointer <https://clang.llvm.org/docs/BlockLanguageSpec.html>, the same restriction applies to copies of the block. For example:

typedef void (^BlockTy)();
BlockTy g0, g1;

void nonescapingFunc(\_\_attribute\_\_((noescape)) BlockTy block) {
  block(); // OK.
}

void escapingFunc(\_\_attribute\_\_((noescape)) BlockTy block) {
  g0 \= block; // Not OK.
  g1 \= Block\_copy(block); // Not OK either.
}

### [nosvm](#id812)[¶](#nosvm "Link to this heading")

Supported Syntaxes[¶](#id400 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`nosvm`

Yes

OpenCL 2.0 supports the optional `__attribute__((nosvm))` qualifier for pointer variable. It informs the compiler that the pointer does not refer to a shared virtual memory region. See OpenCL v2.0 s6.7.2 for details.

Since it is not widely used and has been removed from OpenCL 2.1, it is ignored by Clang.

### [objc\_externally\_retained](#id813)[¶](#objc-externally-retained "Link to this heading")

Supported Syntaxes[¶](#id401 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`objc_externally_retained`

`clang::objc_externally_retained`

`clang::objc_externally_retained`

Yes

The `objc_externally_retained` attribute can be applied to strong local variables, functions, methods, or blocks to opt into [externally-retained semantics](https://clang.llvm.org/docs/AutomaticReferenceCounting.html#externally-retained-variables).

When applied to the definition of a function, method, or block, every parameter of the function with implicit strong retainable object pointer type is considered externally-retained, and becomes `const`. By explicitly annotating a parameter with `__strong`, you can opt back into the default non-externally-retained behavior for that parameter. For instance, `first_param` is externally-retained below, but not `second_param`:

\_\_attribute\_\_((objc\_externally\_retained))
void f(NSArray \*first\_param, \_\_strong NSArray \*second\_param) {
  // ...
}

Likewise, when applied to a strong local variable, that variable becomes `const` and is considered externally-retained.

When compiled without `-fobjc-arc`, this attribute is ignored.

### [pass\_object\_size, pass\_dynamic\_object\_size](#id814)[¶](#pass-object-size-pass-dynamic-object-size "Link to this heading")

Supported Syntaxes[¶](#id402 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`pass_object_size`  
`pass_dynamic_object_size`

`clang::pass_object_size`  
`clang::pass_dynamic_object_size`

`clang::pass_object_size`  
`clang::pass_dynamic_object_size`

Yes

Note

The mangling of functions with parameters that are annotated with `pass_object_size` is subject to change. You can get around this by using `__asm__("foo")` to explicitly name your functions, thus preserving your ABI; also, non-overloadable C functions with `pass_object_size` are not mangled.

The `pass_object_size(Type)` attribute can be placed on function parameters to instruct clang to call `__builtin_object_size(param, Type)` at each callsite of said function, and implicitly pass the result of this call in as an invisible argument of type `size_t` directly after the parameter annotated with `pass_object_size`. Clang will also replace any calls to `__builtin_object_size(param, Type)` in the function by said implicit parameter.

Example usage:

int bzero1(char \*const p \_\_attribute\_\_((pass\_object\_size(0))))
    \_\_attribute\_\_((noinline)) {
  int i \= 0;
  for (/\*\*/; i < (int)\_\_builtin\_object\_size(p, 0); ++i) {
    p\[i\] \= 0;
  }
  return i;
}

int main() {
  char chars\[100\];
  int n \= bzero1(&chars\[0\]);
  assert(n \== sizeof(chars));
  return 0;
}

If successfully evaluating `__builtin_object_size(param, Type)` at the callsite is not possible, then the “failed” value is passed in. So, using the definition of `bzero1` from above, the following code would exit cleanly:

int main2(int argc, char \*argv\[\]) {
  int n \= bzero1(argv);
  assert(n \== \-1);
  return 0;
}

`pass_object_size` plays a part in overload resolution. If two overload candidates are otherwise equally good, then the overload with one or more parameters with `pass_object_size` is preferred. This implies that the choice between two identical overloads both with `pass_object_size` on one or more parameters will always be ambiguous; for this reason, having two such overloads is illegal. For example:

#define PS(N) \_\_attribute\_\_((pass\_object\_size(N)))
// OK
void Foo(char \*a, char \*b); // Overload A
// OK -- overload A has no parameters with pass\_object\_size.
void Foo(char \*a PS(0), char \*b PS(0)); // Overload B
// Error -- Same signature (sans pass\_object\_size) as overload B, and both
// overloads have one or more parameters with the pass\_object\_size attribute.
void Foo(void \*a PS(0), void \*b);

// OK
void Bar(void \*a PS(0)); // Overload C
// OK
void Bar(char \*c PS(1)); // Overload D

void main() {
  char known\[10\], \*unknown;
  Foo(unknown, unknown); // Calls overload B
  Foo(known, unknown); // Calls overload B
  Foo(unknown, known); // Calls overload B
  Foo(known, known); // Calls overload B

  Bar(known); // Calls overload D
  Bar(unknown); // Calls overload D
}

Currently, `pass_object_size` is a bit restricted in terms of its usage:

*   Only one use of `pass_object_size` is allowed per parameter.
    
*   It is an error to take the address of a function with `pass_object_size` on any of its parameters. If you wish to do this, you can create an overload without `pass_object_size` on any parameters.
    
*   It is an error to apply the `pass_object_size` attribute to parameters that are not pointers. Additionally, any parameter that `pass_object_size` is applied to must be marked `const` at its function’s definition.
    

Clang also supports the `pass_dynamic_object_size` attribute, which behaves identically to `pass_object_size`, but evaluates a call to `__builtin_dynamic_object_size` at the callee instead of `__builtin_object_size`. `__builtin_dynamic_object_size` provides some extra runtime checks when the object size can’t be determined at compile-time. You can read more about `__builtin_dynamic_object_size` [here](https://clang.llvm.org/docs/LanguageExtensions.html#evaluating-object-size-dynamically).

### [require\_constant\_initialization, constinit (C++20)](#id815)[¶](#require-constant-initialization-constinit-c-20 "Link to this heading")

Supported Syntaxes[¶](#id403 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`require_constant_initialization`

`clang::require_constant_initialization`

`constinit`

Yes

This attribute specifies that the variable to which it is attached is intended to have a [constant initializer](http://en.cppreference.com/w/cpp/language/constant_initialization) according to the rules of \[basic.start.static\]. The variable is required to have static or thread storage duration. If the initialization of the variable is not a constant initializer an error will be produced. This attribute may only be used in C++; the `constinit` spelling is only accepted in C++20 onwards.

Note that in C++03 strict constant expression checking is not done. Instead the attribute reports if Clang can emit the variable as a constant, even if it’s not technically a ‘constant initializer’. This behavior is non-portable.

Static storage duration variables with constant initializers avoid hard-to-find bugs caused by the indeterminate order of dynamic initialization. They can also be safely used during dynamic initialization across translation units.

This attribute acts as a compile time assertion that the requirements for constant initialization have been met. Since these requirements change between dialects and have subtle pitfalls it’s important to fail fast instead of silently falling back on dynamic initialization.

The first use of the attribute on a variable must be part of, or precede, the initializing declaration of the variable. C++20 requires the `constinit` spelling of the attribute to be present on the initializing declaration if it is used anywhere. The other spellings can be specified on a forward declaration and omitted on a later initializing declaration.

// -std=c++14
#define SAFE\_STATIC \[\[clang::require\_constant\_initialization\]\]
struct T {
  constexpr T(int) {}
  ~T(); // non-trivial
};
SAFE\_STATIC T x \= {42}; // Initialization OK. Doesn't check destructor.
SAFE\_STATIC T y \= 42; // error: variable does not have a constant initializer
// copy initialization is not a constant expression on a non-literal type.

### [section, \_\_declspec(allocate)](#id816)[¶](#section-declspec-allocate "Link to this heading")

Supported Syntaxes[¶](#id404 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`section`

`gnu::section`

`gnu::section`

`allocate`

Yes

The `section` attribute allows you to specify a specific section a global variable or function should be in after translation.

### [standalone\_debug](#id817)[¶](#standalone-debug "Link to this heading")

Supported Syntaxes[¶](#id405 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`standalone_debug`

`clang::standalone_debug`

Yes

The `standalone_debug` attribute causes debug info to be emitted for a record type regardless of the debug info optimizations that are enabled with -fno-standalone-debug. This attribute only has an effect when debug info optimizations are enabled (e.g. with -fno-standalone-debug), and is C++-only.

### [swift\_async\_context](#id818)[¶](#swift-async-context "Link to this heading")

Supported Syntaxes[¶](#id406 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_async_context`

`clang::swift_async_context`

`clang::swift_async_context`

Yes

The `swift_async_context` attribute marks a parameter of a `swiftasynccall` function as having the special asynchronous context-parameter ABI treatment.

If the function is not `swiftasynccall`, this attribute only generates extended frame information.

A context parameter must have pointer or reference type.

### [swift\_context](#id819)[¶](#swift-context "Link to this heading")

Supported Syntaxes[¶](#id407 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_context`

`clang::swift_context`

`clang::swift_context`

Yes

The `swift_context` attribute marks a parameter of a `swiftcall` or `swiftasynccall` function as having the special context-parameter ABI treatment.

This treatment generally passes the context value in a special register which is normally callee-preserved.

A `swift_context` parameter must either be the last parameter or must be followed by a `swift_error_result` parameter (which itself must always be the last parameter).

A context parameter must have pointer or reference type.

### [swift\_error\_result](#id820)[¶](#swift-error-result "Link to this heading")

Supported Syntaxes[¶](#id408 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_error_result`

`clang::swift_error_result`

`clang::swift_error_result`

Yes

The `swift_error_result` attribute marks a parameter of a `swiftcall` function as having the special error-result ABI treatment.

This treatment generally passes the underlying error value in and out of the function through a special register which is normally callee-preserved. This is modeled in C by pretending that the register is addressable memory:

*   The caller appears to pass the address of a variable of pointer type. The current value of this variable is copied into the register before the call; if the call returns normally, the value is copied back into the variable.
    
*   The callee appears to receive the address of a variable. This address is actually a hidden location in its own stack, initialized with the value of the register upon entry. When the function returns normally, the value in that hidden location is written back to the register.
    

A `swift_error_result` parameter must be the last parameter, and it must be preceded by a `swift_context` parameter.

A `swift_error_result` parameter must have type `T**` or `T*&` for some type T. Note that no qualifiers are permitted on the intermediate level.

It is undefined behavior if the caller does not pass a pointer or reference to a valid object.

The standard convention is that the error value itself (that is, the value stored in the apparent argument) will be null upon function entry, but this is not enforced by the ABI.

### [swift\_indirect\_result](#id821)[¶](#swift-indirect-result "Link to this heading")

Supported Syntaxes[¶](#id409 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swift_indirect_result`

`clang::swift_indirect_result`

`clang::swift_indirect_result`

Yes

The `swift_indirect_result` attribute marks a parameter of a `swiftcall` or `swiftasynccall` function as having the special indirect-result ABI treatment.

This treatment gives the parameter the target’s normal indirect-result ABI treatment, which may involve passing it differently from an ordinary parameter. However, only the first indirect result will receive this treatment. Furthermore, low-level lowering may decide that a direct result must be returned indirectly; if so, this will take priority over the `swift_indirect_result` parameters.

A `swift_indirect_result` parameter must either be the first parameter or follow another `swift_indirect_result` parameter.

A `swift_indirect_result` parameter must have type `T*` or `T&` for some object type `T`. If `T` is a complete type at the point of definition of a function, it is undefined behavior if the argument value does not point to storage of adequate size and alignment for a value of type `T`.

Making indirect results explicit in the signature allows C functions to directly construct objects into them without relying on language optimizations like C++’s named return value optimization (NRVO).

### [swiftasynccall](#id822)[¶](#swiftasynccall "Link to this heading")

Supported Syntaxes[¶](#id410 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swiftasynccall`

`clang::swiftasynccall`

`clang::swiftasynccall`

The `swiftasynccall` attribute indicates that a function is compatible with the low-level conventions of Swift async functions, provided it declares the right formal arguments.

In most respects, this is similar to the `swiftcall` attribute, except for the following:

*   A parameter may be marked `swift_async_context`, `swift_context` or `swift_indirect_result` (with the same restrictions on parameter ordering as `swiftcall`) but the parameter attribute `swift_error_result` is not permitted.
    
*   A `swiftasynccall` function must have return type `void`.
    
*   Within a `swiftasynccall` function, a call to a `swiftasynccall` function that is the immediate operand of a `return` statement is guaranteed to be performed as a tail call. This syntax is allowed even in C as an extension (a call to a void-returning function cannot be a return operand in standard C). If something in the calling function would semantically be performed after a guaranteed tail call, such as the non-trivial destruction of a local variable or temporary, then the program is ill-formed.
    

Query for this attribute with `__has_attribute(swiftasynccall)`. Query if the target supports the calling convention with `__has_extension(swiftasynccc)`.

### [swiftcall](#id823)[¶](#swiftcall "Link to this heading")

Supported Syntaxes[¶](#id411 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`swiftcall`

`clang::swiftcall`

`clang::swiftcall`

The `swiftcall` attribute indicates that a function should be called using the Swift calling convention for a function or function pointer.

The lowering for the Swift calling convention, as described by the Swift ABI documentation, occurs in multiple phases. The first, “high-level” phase breaks down the formal parameters and results into innately direct and indirect components, adds implicit parameters for the generic signature, and assigns the context and error ABI treatments to parameters where applicable. The second phase breaks down the direct parameters and results from the first phase and assigns them to registers or the stack. The `swiftcall` convention only handles this second phase of lowering; the C function type must accurately reflect the results of the first phase, as follows:

*   Results classified as indirect by high-level lowering should be represented as parameters with the `swift_indirect_result` attribute.
    
*   Results classified as direct by high-level lowering should be represented as follows:
    
    *   First, remove any empty direct results.
        
    *   If there are no direct results, the C result type should be `void`.
        
    *   If there is one direct result, the C result type should be a type with the exact layout of that result type.
        
    *   If there are a multiple direct results, the C result type should be a struct type with the exact layout of a tuple of those results.
        
*   Parameters classified as indirect by high-level lowering should be represented as parameters of pointer type.
    
*   Parameters classified as direct by high-level lowering should be omitted if they are empty types; otherwise, they should be represented as a parameter type with a layout exactly matching the layout of the Swift parameter type.
    
*   The context parameter, if present, should be represented as a trailing parameter with the `swift_context` attribute.
    
*   The error result parameter, if present, should be represented as a trailing parameter (always following a context parameter) with the `swift_error_result` attribute.
    

`swiftcall` does not support variadic arguments or unprototyped functions.

The parameter ABI treatment attributes are aspects of the function type. A function type which applies an ABI treatment attribute to a parameter is a different type from an otherwise-identical function type that does not. A single parameter may not have multiple ABI treatment attributes.

Support for this feature is target-dependent, although it should be supported on every target that Swift supports. Query for this attribute with `__has_attribute(swiftcall)`. Query if the target supports the calling convention with `__has_extension(swiftcc)`. This implies support for the `swift_context`, `swift_error_result`, and `swift_indirect_result` attributes.

### [thread](#id824)[¶](#thread "Link to this heading")

Supported Syntaxes[¶](#id412 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`thread`

The `__declspec(thread)` attribute declares a variable with thread local storage. It is available under the `-fms-extensions` flag for MSVC compatibility. See the documentation for [\_\_declspec(thread)](http://msdn.microsoft.com/en-us/library/9w1sdazb.aspx) on MSDN.

In Clang, `__declspec(thread)` is generally equivalent in functionality to the GNU `__thread` keyword. The variable must not have a destructor and must have a constant initializer, if any. The attribute only applies to variables declared with static storage duration, such as globals, class static data members, and static locals.

### [tls\_model](#id825)[¶](#tls-model "Link to this heading")

Supported Syntaxes[¶](#id413 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`tls_model`

`gnu::tls_model`

`gnu::tls_model`

Yes

The `tls_model` attribute allows you to specify which thread-local storage model to use. It accepts the following strings:

*   global-dynamic
    
*   local-dynamic
    
*   initial-exec
    
*   local-exec
    

TLS models are mutually exclusive.

### [uninitialized](#id826)[¶](#uninitialized "Link to this heading")

Supported Syntaxes[¶](#id414 "Link to this table")

GNU

C++11

C23

`__declspec`

Keyword

`#pragma`

HLSL Annotation

`#pragma clang attribute`

`uninitialized`

`clang::uninitialized`

Yes

The command-line parameter `-ftrivial-auto-var-init=*` can be used to initialize trivial automatic stack variables. By default, trivial automatic stack variables are uninitialized. This attribute is used to override the command-line parameter, forcing variables to remain uninitialized. It has no semantic meaning in that using uninitialized values is undefined behavior, it rather documents the programmer’s intent.
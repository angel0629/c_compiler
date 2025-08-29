---
title: "OpenMP Support — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/OpenMPSupport.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [OpenMP Support](#openmp-support)
    
    *   [General improvements](#general-improvements)
        
    *   [GPU devices support](#gpu-devices-support)
        
        *   [Data-sharing modes](#data-sharing-modes)
            
        *   [Features not supported or with limited support for Cuda devices](#features-not-supported-or-with-limited-support-for-cuda-devices)
            
    *   [OpenMP 5.0 Implementation Details](#openmp-5-0-implementation-details)
        
    *   [OpenMP 5.1 Implementation Details](#openmp-5-1-implementation-details)
        
    *   [OpenMP 6.0 Implementation Details](#openmp-6-0-implementation-details)
        
    *   [OpenMP Extensions](#openmp-extensions)
        

Clang fully supports OpenMP 4.5, almost all of 5.0 and most of 5.1/2. Clang supports offloading to X86\_64, AArch64, PPC64\[LE\], NVIDIA GPUs (all models) and AMD GPUs (all models).

In addition, the LLVM OpenMP runtime libomp supports the OpenMP Tools Interface (OMPT) on x86, x86\_64, AArch64, and PPC64 on Linux, Windows, and macOS. OMPT is also supported for NVIDIA and AMD GPUs.

For the list of supported features from OpenMP 5.0 and 5.1 see [OpenMP implementation details](#openmp-implementation-details) and [OpenMP 51 implementation details](#openmp-51-implementation-details).

[General improvements](#id3)[¶](#general-improvements "Link to this heading")
-----------------------------------------------------------------------------

*   New collapse clause scheme to avoid expensive remainder operations. Compute loop index variables after collapsing a loop nest via the collapse clause by replacing the expensive remainder operation with multiplications and additions.
    
*   When using the collapse clause on a loop nest the default behavior is to automatically extend the representation of the loop counter to 64 bits for the cases where the sizes of the collapsed loops are not known at compile time. To prevent this conservative choice and use at most 32 bits, compile your program with the \-fopenmp-optimistic-collapse.
    

[GPU devices support](#id4)[¶](#gpu-devices-support "Link to this heading")
---------------------------------------------------------------------------

### [Data-sharing modes](#id5)[¶](#data-sharing-modes "Link to this heading")

Clang supports two data-sharing models for Cuda devices: Generic and Cuda modes. The default mode is Generic. Cuda mode can give an additional performance and can be activated using the \-fopenmp-cuda-mode flag. In Generic mode all local variables that can be shared in the parallel regions are stored in the global memory. In Cuda mode local variables are not shared between the threads and it is user responsibility to share the required data between the threads in the parallel regions. Often, the optimizer is able to reduce the cost of Generic mode to the level of Cuda mode, but the flag, as well as other assumption flags, can be used for tuning.

### [Features not supported or with limited support for Cuda devices](#id6)[¶](#features-not-supported-or-with-limited-support-for-cuda-devices "Link to this heading")

*   Cancellation constructs are not supported.
    
*   Doacross loop nest is not supported.
    
*   User-defined reductions are supported only for trivial types.
    
*   Nested parallelism: inner parallel regions are executed sequentially.
    
*   Debug information for OpenMP target regions is supported, but sometimes it may be required to manually specify the address class of the inspected variables. In some cases the local variables are actually allocated in the global memory, but the debug info may be not aware of it.
    

[OpenMP 5.0 Implementation Details](#id7)[¶](#openmp-5-0-implementation-details "Link to this heading")
-------------------------------------------------------------------------------------------------------

The following table provides a quick overview over various OpenMP 5.0 features and their implementation status. Please post on the [Discourse forums (Runtimes - OpenMP category)](https://discourse.llvm.org/c/runtimes/openmp/35) for more information or if you want to help with the implementation.

Category

Feature

Status

Reviews

loop

support != in the canonical loop form

done

D54441

loop

#pragma omp loop (directive)

partial

D145823 (combined forms)

loop

#pragma omp loop bind

worked on

D144634 (needs review)

loop

collapse imperfectly nested loop

done

loop

collapse non-rectangular nested loop

done

loop

C++ range-base for loop

done

loop

clause: if for SIMD directives

done

loop

inclusive scan (matching C++17 PSTL)

done

memory management

memory allocators

done

r341687,r357929

memory management

allocate directive and allocate clause

done

r355614,r335952

OMPD

OMPD interfaces

done

[https://reviews.llvm.org/D99914](https://reviews.llvm.org/D99914) (Supports only HOST(CPU) and Linux

OMPT

OMPT interfaces (callback support)

done

thread affinity

thread affinity

done

task

taskloop reduction

done

task

task affinity

not upstream

[https://github.com/jklinkenberg/openmp/tree/task-affinity](https://github.com/jklinkenberg/openmp/tree/task-affinity)

task

clause: depend on the taskwait construct

done

D113540 (regular codegen only)

task

depend objects and detachable tasks

done

task

mutexinoutset dependence-type for tasks

done

D53380,D57576

task

combined taskloop constructs

done

task

master taskloop

done

task

parallel master taskloop

done

task

master taskloop simd

done

task

parallel master taskloop simd

done

SIMD

atomic and simd constructs inside SIMD code

done

SIMD

SIMD nontemporal

done

device

infer target functions from initializers

worked on

device

infer target variables from initializers

done

D146418

device

OMP\_TARGET\_OFFLOAD environment variable

done

D50522

device

support full ‘defaultmap’ functionality

done

D69204

device

device specific functions

done

device

clause: device\_type

done

device

clause: extended device

done

device

clause: uses\_allocators clause

done

device

clause: in\_reduction

worked on

r308768

device

omp\_get\_device\_num()

done

D54342,D128347

device

structure mapping of references

unclaimed

device

nested target declare

done

D51378

device

implicitly map ‘this’ (this\[:1\])

done

D55982

device

allow access to the reference count (omp\_target\_is\_present)

done

device

requires directive

done

device

clause: unified\_shared\_memory

done

D52625,D52359

device

clause: unified\_address

partial

device

clause: reverse\_offload

partial

D52780,D155003

device

clause: atomic\_default\_mem\_order

done

D53513

device

clause: dynamic\_allocators

unclaimed parts

D53079

device

user-defined mappers

done

D56326,D58638,D58523,D58074,D60972,D59474

device

map array-section with implicit mapper

done

[https://github.com/llvm/llvm-project/pull/101101](https://github.com/llvm/llvm-project/pull/101101)

device

mapping lambda expression

done

D51107

device

clause: use\_device\_addr for target data

done

device

support close modifier on map clause

done

D55719,D55892

device

teams construct on the host device

done

r371553

device

support non-contiguous array sections for target update

done

[https://github.com/llvm/llvm-project/pull/144635](https://github.com/llvm/llvm-project/pull/144635)

device

pointer attachment

done

atomic

hints for the atomic construct

done

D51233

base language

C11 support

done

base language

C++11/14/17 support

done

base language

lambda support

done

misc

array shaping

done

D74144

misc

library shutdown (omp\_pause\_resource\[\_all\])

done

D55078

misc

metadirectives

mostly done

D91944, [https://github.com/llvm/llvm-project/pull/128640](https://github.com/llvm/llvm-project/pull/128640)

misc

conditional modifier for lastprivate clause

done

misc

iterator and multidependences

done

misc

depobj directive and depobj dependency kind

done

misc

user-defined function variants

done.

D67294, D64095, D71847, D71830, D109635

misc

pointer/reference to pointer based array reductions

done

misc

prevent new type definitions in clauses

done

memory model

memory model update (seq\_cst, acq\_rel, release, acquire,…)

done

[OpenMP 5.1 Implementation Details](#id8)[¶](#openmp-5-1-implementation-details "Link to this heading")
-------------------------------------------------------------------------------------------------------

The following table provides a quick overview over various OpenMP 5.1 features and their implementation status. Please post on the [Discourse forums (Runtimes - OpenMP category)](https://discourse.llvm.org/c/runtimes/openmp/35) for more information or if you want to help with the implementation.

Category

Feature

Status

Reviews

atomic

‘compare’ clause on atomic construct

done

D120290, D120007, D118632, D120200, D116261, D118547, D116637

atomic

‘fail’ clause on atomic construct

worked on

D123235 (in progress)

base language

C++ attribute specifier syntax

done

D105648

device

‘present’ map type modifier

done

D83061, D83062, D84422

device

‘present’ motion modifier

done

D84711, D84712

device

‘present’ in defaultmap clause

done

D92427

device

map clause reordering based on ‘present’ modifier

unclaimed

device

device-specific environment variables

unclaimed

device

omp\_target\_is\_accessible routine

In Progress

[https://github.com/llvm/llvm-project/pull/138294](https://github.com/llvm/llvm-project/pull/138294)

device

omp\_get\_mapped\_ptr routine

done

D141545

device

new async target memory copy routines

done

D136103

device

thread\_limit clause on target construct

partial

D141540 (offload), D152054 (host, in progress)

device

has\_device\_addr clause on target construct

unclaimed

device

iterators in map clause or motion clauses

unclaimed

device

indirect clause on declare target directive

In Progress

device

allow virtual functions calls for mapped object on device

partial

device

interop construct

partial

parsing/sema done: D98558, D98834, D98815

device

assorted routines for querying interoperable properties

partial

D106674

loop

Loop tiling transformation

done

D76342

loop

Loop unrolling transformation

done

D99459

loop

‘reproducible’/’unconstrained’ modifiers in ‘order’ clause

partial

D127855

memory management

alignment for allocate directive and clause

done

D115683

memory management

‘allocator’ modifier for allocate clause

done

[https://github.com/llvm/llvm-project/pull/114883](https://github.com/llvm/llvm-project/pull/114883)

memory management

‘align’ modifier for allocate clause

done

[https://github.com/llvm/llvm-project/pull/121814](https://github.com/llvm/llvm-project/pull/121814)

memory management

new memory management routines

unclaimed

memory management

changes to omp\_alloctrait\_key enum

unclaimed

memory model

seq\_cst clause on flush construct

done

[https://github.com/llvm/llvm-project/pull/114072](https://github.com/llvm/llvm-project/pull/114072)

misc

‘omp\_all\_memory’ keyword and use in ‘depend’ clause

done

D125828, D126321

misc

error directive

done

D139166

misc

scope construct

done

D157933, [https://github.com/llvm/llvm-project/pull/109197](https://github.com/llvm/llvm-project/pull/109197)

misc

routines for controlling and querying team regions

partial

D95003 (libomp only)

misc

changes to ompt\_scope\_endpoint\_t enum

unclaimed

misc

omp\_display\_env routine

done

D74956

misc

extended OMP\_PLACES syntax

unclaimed

misc

OMP\_NUM\_TEAMS and OMP\_TEAMS\_THREAD\_LIMIT env vars

done

D138769

misc

‘target\_device’ selector in context specifier

worked on

misc

begin/end declare variant

done

D71179

misc

dispatch construct and function variant argument adjustment

worked on

D99537, D99679

misc

assumes directives

worked on

misc

assume directive

done

misc

nothing directive

done

D123286

misc

masked construct and related combined constructs

done

D99995, D100514, PR-121741(parallel\_masked\_taskloop) PR-121746(parallel\_masked\_task\_loop\_simd),PR-121914(masked\_taskloop) PR-121916(masked\_taskloop\_simd)

misc

default(firstprivate) & default(private)

done

D75591 (firstprivate), D125912 (private)

other

deprecating master construct

unclaimed

OMPT

new barrier types added to ompt\_sync\_region\_t enum

unclaimed

OMPT

async data transfers added to ompt\_target\_data\_op\_t enum

unclaimed

OMPT

new barrier state values added to ompt\_state\_t enum

unclaimed

OMPT

new ‘emi’ callbacks for external monitoring interfaces

done

OMPT

device tracing interface

in progress

jplehr

task

‘strict’ modifier for taskloop construct

unclaimed

task

inoutset in depend clause

done

D97085, D118383

task

nowait clause on taskwait

partial

parsing/sema done: D131830, D141531

[OpenMP 6.0 Implementation Details](#id9)[¶](#openmp-6-0-implementation-details "Link to this heading")
-------------------------------------------------------------------------------------------------------

The following table provides a quick overview over various OpenMP 6.0 features and their implementation status. Please post on the [Discourse forums (Runtimes - OpenMP category)](https://discourse.llvm.org/c/runtimes/openmp/35) for more information or if you want to help with the implementation.

Feature

C/C++ Status

Fortran Status

Reviews

free-agent threads

unclaimed

unclaimed

threadset clause

:worked on

unclaimed

Recording of task graphs

unclaimed

unclaimed

Parallel inductions

unclaimed

unclaimed

init\_complete for scan directive

unclaimed

unclaimed

Loop transformation constructs

unclaimed

unclaimed

loop stripe transformation

done

[https://github.com/llvm/llvm-project/pull/119891](https://github.com/llvm/llvm-project/pull/119891)

workdistribute construct

in progress

@skc7, @mjklemm

task\_iteration

unclaimed

unclaimed

memscope clause for atomic and flush

unclaimed

unclaimed

transparent clause (hull tasks)

unclaimed

unclaimed

rule-based compound directives

unclaimed

In Progress

Testing for Fortran missing

C23, C++23

unclaimed

unclaimed

Fortran 2023

unclaimed

unclaimed

decl attribute for declarative directives

unclaimed

unclaimed

C attribute syntax

unclaimed

unclaimed

pure directives in DO CONCURRENT

unclaimed

unclaimed

Optional argument for all clauses

unclaimed

unclaimed

Function references for locator list items

unclaimed

unclaimed

All clauses accept directive name modifier

unclaimed

unclaimed

Extensions to depobj construct

unclaimed

unclaimed

Extensions to atomic construct

unclaimed

unclaimed

Private reductions

mostly

unclaimed

Parse/Sema:https://github.com/llvm/llvm-project/pull/129938 Codegen: https://github.com/llvm/llvm-project/pull/134709

Self maps

partial

unclaimed

parsing/sema done: [https://github.com/llvm/llvm-project/pull/129888](https://github.com/llvm/llvm-project/pull/129888)

Release map type for declare mapper

unclaimed

unclaimed

Extensions to interop construct

unclaimed

unclaimed

no\_openmp\_constructs

done

unclaimed

[https://github.com/llvm/llvm-project/pull/125933](https://github.com/llvm/llvm-project/pull/125933)

safe\_sync and progress with identifier and API

unclaimed

unclaimed

OpenMP directives in concurrent loop regions

done

unclaimed

[https://github.com/llvm/llvm-project/pull/125621](https://github.com/llvm/llvm-project/pull/125621)

atomics constructs on concurrent loop regions

done

unclaimed

[https://github.com/llvm/llvm-project/pull/125621](https://github.com/llvm/llvm-project/pull/125621)

Loop construct with DO CONCURRENT

unclaimed

In Progress

device\_type clause for target construct

unclaimed

unclaimed

nowait for ancestor target directives

unclaimed

unclaimed

New API for devices’ num\_teams/thread\_limit

unclaimed

unclaimed

Host and device environment variables

unclaimed

unclaimed

num\_threads ICV and clause accepts list

unclaimed

unclaimed

Numeric names for environment variables

unclaimed

unclaimed

Increment between places for OMP\_PLACES

unclaimed

unclaimed

OMP\_AVAILABLE\_DEVICES envirable

unclaimed

unclaimed

Traits for default device envirable

unclaimed

unclaimed

Optionally omit array length expression

done

unclaimed

[https://github.com/llvm/llvm-project/pull/148048](https://github.com/llvm/llvm-project/pull/148048)

Canonical loop sequences

unclaimed

In Progress

Clarifications to Fortran map semantics

unclaimed

unclaimed

default clause at target construct

In Progress

unclaimed

ref count update use\_device\_{ptr, addr}

unclaimed

unclaimed

Clarifications to implicit reductions

unclaimed

unclaimed

ref modifier for map clauses

In Progress

unclaimed

map-type modifiers in arbitrary position

done

unclaimed

[https://github.com/llvm/llvm-project/pull/90499](https://github.com/llvm/llvm-project/pull/90499)

Lift nesting restriction on concurrent loop

done

unclaimed

[https://github.com/llvm/llvm-project/pull/125621](https://github.com/llvm/llvm-project/pull/125621)

priority clause for target constructs

unclaimed

unclaimed

changes to target\_data construct

unclaimed

unclaimed

Non-const do\_not\_sync for nowait/nogroup

unclaimed

unclaimed

need\_device\_addr modifier for adjust\_args clause

partial

unclaimed

Parsing/Sema: [https://github.com/llvm/llvm-project/pull/143442](https://github.com/llvm/llvm-project/pull/143442)

[https://github.com/llvm/llvm-project/pull/149586](https://github.com/llvm/llvm-project/pull/149586)

Prescriptive num\_threads

In Progress

unclaimed

ro-i

Message and severity clauses

In Progress

unclaimed

ro-i

Local clause on declare target

In Progress

unclaimed

groupprivate directive

In Progress

In Progress

Flang: kparzysz, mjklemm

variable-category on default clause

In Progress

unclaimed

Changes to omp\_target\_is\_accessible

In Progress

In Progress

[OpenMP Extensions](#id10)[¶](#openmp-extensions "Link to this heading")
------------------------------------------------------------------------

The following table provides a quick overview over various OpenMP extensions and their implementation status. These extensions are not currently defined by any standard, so links to associated LLVM documentation are provided. As these extensions mature, they will be considered for standardization. Please post on the [Discourse forums (Runtimes - OpenMP category)](https://discourse.llvm.org/c/runtimes/openmp/35) to provide feedback.

Category

Feature

Status

Reviews

atomic extension

[‘atomic’ strictly nested within ‘teams’](https://openmp.llvm.org/docs/openacc/OpenMPExtensions.html#atomicWithinTeams)

prototyped

D126323

device extension

[‘ompx\_hold’ map type modifier](https://openmp.llvm.org/docs/openacc/OpenMPExtensions.html#ompx-hold)

prototyped

D106509, D106510

device extension

[‘ompx\_bare’ clause on ‘target teams’ construct](https://www.osti.gov/servlets/purl/2205717)

prototyped

#66844, #70612

device extension

Multi-dim ‘num\_teams’ and ‘thread\_limit’ clause on ‘target teams ompx\_bare’ construct

partial

#99732, #101407, #102715
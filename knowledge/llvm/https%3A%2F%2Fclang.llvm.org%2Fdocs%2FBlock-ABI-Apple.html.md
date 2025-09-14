---
title: "Block Implementation Specification — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/Block-ABI-Apple.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [History](#history)
    
*   [High Level](#high-level)
    
*   [Imported Variables](#imported-variables)
    
    *   [Imported `const` copy variables](#imported-const-copy-variables)
        
    *   [Imported `const` copy of `Block` reference](#imported-const-copy-of-block-reference)
        
        *   [Importing `__attribute__((NSObject))` variables](#importing-attribute-nsobject-variables)
            
    *   [Imported `__block` marked variables](#imported-block-marked-variables)
        
        *   [Layout of `__block` marked variables](#layout-of-block-marked-variables)
            
        *   [Access to `__block` variables from within its lexical scope](#access-to-block-variables-from-within-its-lexical-scope)
            
        *   [Importing `__block` variables into `Blocks`](#importing-block-variables-into-blocks)
            
        *   [Importing `__attribute__((NSObject))` `__block` variables](#importing-attribute-nsobject-block-variables)
            
        *   [`__block` escapes](#block-escapes)
            
        *   [Nesting](#nesting)
            
*   [Objective C Extensions to `Blocks`](#objective-c-extensions-to-blocks)
    
    *   [Importing Objects](#importing-objects)
        
    *   [`Blocks` as Objects](#blocks-as-objects)
        
    *   [`__weak __block` Support](#weak-block-support)
        
*   [C++ Support](#c-support)
    
*   [Runtime Helper Functions](#runtime-helper-functions)
    
*   [Copyright](#copyright)
    

[History](#id1)[¶](#history "Link to this heading")
---------------------------------------------------

*   2008/7/14 - created.
    
*   2008/8/21 - revised, C++.
    
*   2008/9/24 - add `NULL` `isa` field to `__block` storage.
    
*   2008/10/1 - revise block layout to use a `static` descriptor structure.
    
*   2008/10/6 - revise block layout to use an unsigned long int flags.
    
*   2008/10/28 - specify use of `_Block_object_assign` and `_Block_object_dispose` for all “Object” types in helper functions.
    
*   2008/10/30 - revise new layout to have invoke function in same place.
    
*   2008/10/30 - add `__weak` support.
    
*   2010/3/16 - rev for stret return, signature field.
    
*   2010/4/6 - improved wording.
    
*   2013/1/6 - improved wording and converted to rst.
    

This document describes the Apple ABI implementation specification of Blocks.

The first shipping version of this ABI is found in Mac OS X 10.6, and shall be referred to as 10.6.ABI. As of 2010/3/16, the following describes the ABI contract with the runtime and the compiler, and, as necessary, will be referred to as ABI.2010.3.16.

Since the Apple ABI references symbols from other elements of the system, any attempt to use this ABI on systems prior to SnowLeopard is undefined.

[High Level](#id2)[¶](#high-level "Link to this heading")
---------------------------------------------------------

The ABI of `Blocks` consist of their layout and the runtime functions required by the compiler. A `Block` of type `R (^)(P...)` consists of a structure of the following form:

struct Block\_literal\_1 {
    void \*isa; // initialized to &\_NSConcreteStackBlock or &\_NSConcreteGlobalBlock
    int flags;
    int reserved;
    R (\*invoke)(struct Block\_literal\_1 \*, P...);
    struct Block\_descriptor\_1 {
        unsigned long int reserved;     // NULL
        unsigned long int size;         // sizeof(struct Block\_literal\_1)
        // optional helper functions
        void (\*copy\_helper)(void \*dst, void \*src);     // IFF (1<<25)
        void (\*dispose\_helper)(void \*src);             // IFF (1<<25)
        // required ABI.2010.3.16
        const char \*signature;                         // IFF (1<<30)
    } \*descriptor;
    // imported variables
};

The following flags bits are in use thusly for a possible ABI.2010.3.16:

enum {
    // Set to true on blocks that have captures (and thus are not true
    // global blocks) but are known not to escape for various other
    // reasons. For backward compatibility with old runtimes, whenever
    // BLOCK\_IS\_NOESCAPE is set, BLOCK\_IS\_GLOBAL is set too. Copying a
    // non-escaping block returns the original block and releasing such a
    // block is a no-op, which is exactly how global blocks are handled.
    BLOCK\_IS\_NOESCAPE      \=  (1 << 23),

    BLOCK\_HAS\_COPY\_DISPOSE \=  (1 << 25),
    BLOCK\_HAS\_CTOR \=          (1 << 26), // helpers have C++ code
    BLOCK\_IS\_GLOBAL \=         (1 << 28),
    BLOCK\_HAS\_STRET \=         (1 << 29), // IFF BLOCK\_HAS\_SIGNATURE
    BLOCK\_HAS\_SIGNATURE \=     (1 << 30),
};

In 10.6.ABI the (1<<29) was usually set and was always ignored by the runtime - it had been a transitional marker that did not get deleted after the transition. This bit is now paired with (1<<30), and represented as the pair (3<<29), for the following combinations of valid bit settings, and their meanings:

switch (flags & (3<<29)) {
  case (0<<29):      10.6.ABI, no signature field available
  case (1<<29):      10.6.ABI, no signature field available
  case (2<<29): ABI.2010.3.16, regular calling convention, presence of signature field
  case (3<<29): ABI.2010.3.16, stret calling convention, presence of signature field,
}

The signature field is not always populated.

The following discussions are presented as 10.6.ABI otherwise.

`Block` literals may occur within functions where the structure is created in stack local memory. They may also appear as initialization expressions for `Block` variables of global or `static` local variables.

When a `Block` literal expression is evaluated the stack based structure is initialized as follows:

1.  A `static` descriptor structure is declared and initialized as follows:
    

> a. The `invoke` function pointer is set to a function that takes the `Block` structure as its first argument and the rest of the arguments (if any) to the `Block` and executes the `Block` compound statement.
> 
> b. The `size` field is set to the size of the following `Block` literal structure.
> 
> c. The `copy_helper` and `dispose_helper` function pointers are set to respective helper functions if they are required by the `Block` literal.

2.  A stack (or global) `Block` literal data structure is created and initialized as follows:
    
    a. The `isa` field is set to the address of the external `_NSConcreteStackBlock`, which is a block of uninitialized memory supplied in `libSystem`, or `_NSConcreteGlobalBlock` if this is a static or file level `Block` literal.
    
    b. The `flags` field is set to zero unless there are variables imported into the `Block` that need helper functions for program level `Block_copy()` and `Block_release()` operations, in which case the (1<<25) flags bit is set.
    

As an example, the `Block` literal expression:

^ { printf("hello world\\n"); }

would cause the following to be created on a 32-bit system:

struct \_\_block\_literal\_1 {
    void \*isa;
    int flags;
    int reserved;
    void (\*invoke)(struct \_\_block\_literal\_1 \*);
    struct \_\_block\_descriptor\_1 \*descriptor;
};

void \_\_block\_invoke\_1(struct \_\_block\_literal\_1 \*\_block) {
    printf("hello world\\n");
}

static struct \_\_block\_descriptor\_1 {
    unsigned long int reserved;
    unsigned long int Block\_size;
} \_\_block\_descriptor\_1 \= { 0, sizeof(struct \_\_block\_literal\_1) };

and where the `Block` literal itself appears:

struct \_\_block\_literal\_1 \_block\_literal \= {
     &\_NSConcreteStackBlock,
     (1<<29), <uninitialized\>,
     \_\_block\_invoke\_1,
     &\_\_block\_descriptor\_1
};

A `Block` imports other `Block` references, `const` copies of other variables, and variables marked `__block`. In Objective-C, variables may additionally be objects.

When a `Block` literal expression is used as the initial value of a global or `static` local variable, it is initialized as follows:

struct \_\_block\_literal\_1 \_\_block\_literal\_1 \= {
      &\_NSConcreteGlobalBlock,
      (1<<28)|(1<<29), <uninitialized\>,
      \_\_block\_invoke\_1,
      &\_\_block\_descriptor\_1
};

that is, a different address is provided as the first value and a particular (1<<28) bit is set in the `flags` field, and otherwise it is the same as for stack based `Block` literals. This is an optimization that can be used for any `Block` literal that imports no `const` or `__block` storage variables.

[Imported Variables](#id3)[¶](#imported-variables "Link to this heading")
-------------------------------------------------------------------------

Variables of `auto` storage class are imported as `const` copies. Variables of `__block` storage class are imported as a pointer to an enclosing data structure. Global variables are simply referenced and not considered as imported.

### [Imported `const` copy variables](#id4)[¶](#imported-const-copy-variables "Link to this heading")

Automatic storage variables not marked with `__block` are imported as `const` copies.

The simplest example is that of importing a variable of type `int`:

int x \= 10;
void (^vv)(void) \= ^{ printf("x is %d\\n", x); }
x \= 11;
vv();

which would be compiled to:

struct \_\_block\_literal\_2 {
    void \*isa;
    int flags;
    int reserved;
    void (\*invoke)(struct \_\_block\_literal\_2 \*);
    struct \_\_block\_descriptor\_2 \*descriptor;
    const int x;
};

void \_\_block\_invoke\_2(struct \_\_block\_literal\_2 \*\_block) {
    printf("x is %d\\n", \_block\->x);
}

static struct \_\_block\_descriptor\_2 {
    unsigned long int reserved;
    unsigned long int Block\_size;
} \_\_block\_descriptor\_2 \= { 0, sizeof(struct \_\_block\_literal\_2) };

and:

struct \_\_block\_literal\_2 \_\_block\_literal\_2 \= {
      &\_NSConcreteStackBlock,
      (1<<29), <uninitialized\>,
      \_\_block\_invoke\_2,
      &\_\_block\_descriptor\_2,
      x
 };

In summary, scalars, structures, unions, and function pointers are generally imported as `const` copies with no need for helper functions.

### [Imported `const` copy of `Block` reference](#id5)[¶](#imported-const-copy-of-block-reference "Link to this heading")

The first case where copy and dispose helper functions are required is for the case of when a `Block` itself is imported. In this case both a `copy_helper` function and a `dispose_helper` function are needed. The `copy_helper` function is passed both the existing stack based pointer and the pointer to the new heap version and should call back into the runtime to actually do the copy operation on the imported fields within the `Block`. The runtime functions are all described in [Runtime Helper Functions](#runtimehelperfunctions).

A quick example:

void (^existingBlock)(void) \= ...;
void (^vv)(void) \= ^{ existingBlock(); }
vv();

struct \_\_block\_literal\_3 {
   ...; // existing block
};

struct \_\_block\_literal\_4 {
    void \*isa;
    int flags;
    int reserved;
    void (\*invoke)(struct \_\_block\_literal\_4 \*);
    struct \_\_block\_literal\_3 \*const existingBlock;
};

void \_\_block\_invoke\_4(struct \_\_block\_literal\_2 \*\_block) {
   \_\_block\->existingBlock\->invoke(\_\_block\->existingBlock);
}

void \_\_block\_copy\_4(struct \_\_block\_literal\_4 \*dst, struct \_\_block\_literal\_4 \*src) {
     //\_Block\_copy\_assign(&dst->existingBlock, src->existingBlock, 0);
     \_Block\_object\_assign(&dst\->existingBlock, src\->existingBlock, BLOCK\_FIELD\_IS\_BLOCK);
}

void \_\_block\_dispose\_4(struct \_\_block\_literal\_4 \*src) {
     // was \_Block\_destroy
     \_Block\_object\_dispose(src\->existingBlock, BLOCK\_FIELD\_IS\_BLOCK);
}

static struct \_\_block\_descriptor\_4 {
    unsigned long int reserved;
    unsigned long int Block\_size;
    void (\*copy\_helper)(struct \_\_block\_literal\_4 \*dst, struct \_\_block\_literal\_4 \*src);
    void (\*dispose\_helper)(struct \_\_block\_literal\_4 \*);
} \_\_block\_descriptor\_4 \= {
    0,
    sizeof(struct \_\_block\_literal\_4),
    \_\_block\_copy\_4,
    \_\_block\_dispose\_4,
};

and where said `Block` is used:

struct \_\_block\_literal\_4 \_block\_literal \= {
      &\_NSConcreteStackBlock,
      (1<<25)|(1<<29), <uninitialized\>
      \_\_block\_invoke\_4,
      & \_\_block\_descriptor\_4
      existingBlock,
};

#### [Importing `__attribute__((NSObject))` variables](#id6)[¶](#importing-attribute-nsobject-variables "Link to this heading")

GCC introduces `__attribute__((NSObject))` on structure pointers to mean “this is an object”. This is useful because many low level data structures are declared as opaque structure pointers, e.g. `CFStringRef`, `CFArrayRef`, etc. When used from C, however, these are still really objects and are the second case where that requires copy and dispose helper functions to be generated. The copy helper functions generated by the compiler should use the `_Block_object_assign` runtime helper function and in the dispose helper the `_Block_object_dispose` runtime helper function should be called.

For example, `Block` foo in the following:

struct Opaque \*\_\_attribute\_\_((NSObject)) objectPointer \= ...;
...
void (^foo)(void) \= ^{  CFPrint(objectPointer); };

would have the following helper functions generated:

void \_\_block\_copy\_foo(struct \_\_block\_literal\_5 \*dst, struct \_\_block\_literal\_5 \*src) {
     \_Block\_object\_assign(&dst\->objectPointer, src\-> objectPointer, BLOCK\_FIELD\_IS\_OBJECT);
}

void \_\_block\_dispose\_foo(struct \_\_block\_literal\_5 \*src) {
     \_Block\_object\_dispose(src\->objectPointer, BLOCK\_FIELD\_IS\_OBJECT);
}

### [Imported `__block` marked variables](#id7)[¶](#imported-block-marked-variables "Link to this heading")

#### [Layout of `__block` marked variables](#id8)[¶](#layout-of-block-marked-variables "Link to this heading")

The compiler must embed variables that are marked `__block` in a specialized structure of the form:

struct \_block\_byref\_foo {
    void \*isa;
    struct Block\_byref \*forwarding;
    int flags;   //refcount;
    int size;
    typeof(marked\_variable) marked\_variable;
};

Variables of certain types require helper functions for when `Block_copy()` and `Block_release()` are performed upon a referencing `Block`. At the “C” level only variables that are of type `Block` or ones that have `__attribute__((NSObject))` marked require helper functions. In Objective-C objects require helper functions and in C++ stack based objects require helper functions. Variables that require helper functions use the form:

struct \_block\_byref\_foo {
    void \*isa;
    struct \_block\_byref\_foo \*forwarding;
    int flags;   //refcount;
    int size;
    // helper functions called via Block\_copy() and Block\_release()
    void (\*byref\_keep)(void  \*dst, void \*src);
    void (\*byref\_dispose)(void \*);
    typeof(marked\_variable) marked\_variable;
};

The structure is initialized such that:

> a. The `forwarding` pointer is set to the beginning of its enclosing structure.
> 
> b. The `size` field is initialized to the total size of the enclosing structure.
> 
> c. The `flags` field is set to either 0 if no helper functions are needed or (1<<25) if they are.
> 
> 4.  The helper functions are initialized (if present).
>     
> 5.  The variable itself is set to its initial value.
>     
> 6.  The `isa` field is set to `NULL`.
>     

#### [Access to `__block` variables from within its lexical scope](#id9)[¶](#access-to-block-variables-from-within-its-lexical-scope "Link to this heading")

In order to “move” the variable to the heap upon a `copy_helper` operation the compiler must rewrite access to such a variable to be indirect through the structures `forwarding` pointer. For example:

int \_\_block i \= 10;
i \= 11;

would be rewritten to be:

struct \_block\_byref\_i {
  void \*isa;
  struct \_block\_byref\_i \*forwarding;
  int flags;   //refcount;
  int size;
  int captured\_i;
} i \= { NULL, &i, 0, sizeof(struct \_block\_byref\_i), 10 };

i.forwarding\->captured\_i \= 11;

In the case of a `Block` reference variable being marked `__block` the helper code generated must use the `_Block_object_assign` and `_Block_object_dispose` routines supplied by the runtime to make the copies. For example:

\_\_block void (voidBlock)(void) \= blockA;
voidBlock \= blockB;

would translate into:

struct \_block\_byref\_voidBlock {
    void \*isa;
    struct \_block\_byref\_voidBlock \*forwarding;
    int flags;   //refcount;
    int size;
    void (\*byref\_keep)(struct \_block\_byref\_voidBlock \*dst, struct \_block\_byref\_voidBlock \*src);
    void (\*byref\_dispose)(struct \_block\_byref\_voidBlock \*);
    void (^captured\_voidBlock)(void);
};

void \_block\_byref\_keep\_helper(struct \_block\_byref\_voidBlock \*dst, struct \_block\_byref\_voidBlock \*src) {
    //\_Block\_copy\_assign(&dst->captured\_voidBlock, src->captured\_voidBlock, 0);
    \_Block\_object\_assign(&dst\->captured\_voidBlock, src\->captured\_voidBlock, BLOCK\_FIELD\_IS\_BLOCK | BLOCK\_BYREF\_CALLER);
}

void \_block\_byref\_dispose\_helper(struct \_block\_byref\_voidBlock \*param) {
    //\_Block\_destroy(param->captured\_voidBlock, 0);
    \_Block\_object\_dispose(param\->captured\_voidBlock, BLOCK\_FIELD\_IS\_BLOCK | BLOCK\_BYREF\_CALLER)}

and:

struct \_block\_byref\_voidBlock voidBlock \= {( .forwarding\=&voidBlock, .flags\=(1<<25), .size\=sizeof(struct \_block\_byref\_voidBlock \*),
    .byref\_keep\=\_block\_byref\_keep\_helper, .byref\_dispose\=\_block\_byref\_dispose\_helper,
    .captured\_voidBlock\=blockA )};

voidBlock.forwarding\->captured\_voidBlock \= blockB;

#### [Importing `__block` variables into `Blocks`](#id10)[¶](#importing-block-variables-into-blocks "Link to this heading")

A `Block` that uses a `__block` variable in its compound statement body must import the variable and emit `copy_helper` and `dispose_helper` helper functions that, in turn, call back into the runtime to actually copy or release the `byref` data block using the functions `_Block_object_assign` and `_Block_object_dispose`.

For example:

int \_\_block i \= 2;
functioncall(^{ i \= 10; });

would translate to:

struct \_block\_byref\_i {
    void \*isa;  // set to NULL
    struct \_block\_byref\_voidBlock \*forwarding;
    int flags;   //refcount;
    int size;
    void (\*byref\_keep)(struct \_block\_byref\_i \*dst, struct \_block\_byref\_i \*src);
    void (\*byref\_dispose)(struct \_block\_byref\_i \*);
    int captured\_i;
};

struct \_\_block\_literal\_5 {
    void \*isa;
    int flags;
    int reserved;
    void (\*invoke)(struct \_\_block\_literal\_5 \*);
    struct \_\_block\_descriptor\_5 \*descriptor;
    struct \_block\_byref\_i \*i\_holder;
};

void \_\_block\_invoke\_5(struct \_\_block\_literal\_5 \*\_block) {
   \_block\->forwarding\->captured\_i \= 10;
}

void \_\_block\_copy\_5(struct \_\_block\_literal\_5 \*dst, struct \_\_block\_literal\_5 \*src) {
     //\_Block\_byref\_assign\_copy(&dst->captured\_i, src->captured\_i);
     \_Block\_object\_assign(&dst\->captured\_i, src\->captured\_i, BLOCK\_FIELD\_IS\_BYREF | BLOCK\_BYREF\_CALLER);
}

void \_\_block\_dispose\_5(struct \_\_block\_literal\_5 \*src) {
     //\_Block\_byref\_release(src->captured\_i);
     \_Block\_object\_dispose(src\->captured\_i, BLOCK\_FIELD\_IS\_BYREF | BLOCK\_BYREF\_CALLER);
}

static struct \_\_block\_descriptor\_5 {
    unsigned long int reserved;
    unsigned long int Block\_size;
    void (\*copy\_helper)(struct \_\_block\_literal\_5 \*dst, struct \_\_block\_literal\_5 \*src);
    void (\*dispose\_helper)(struct \_\_block\_literal\_5 \*);
} \_\_block\_descriptor\_5 \= { 0, sizeof(struct \_\_block\_literal\_5) \_\_block\_copy\_5, \_\_block\_dispose\_5 };

and:

struct \_block\_byref\_i i \= {( .isa\=NULL, .forwarding\=&i, .flags\=0, .size\=sizeof(struct \_block\_byref\_i), .captured\_i\=2 )};
struct \_\_block\_literal\_5 \_block\_literal \= {
      &\_NSConcreteStackBlock,
      (1<<25)|(1<<29), <uninitialized\>,
      \_\_block\_invoke\_5,
      &\_\_block\_descriptor\_5,
      &i,
};

#### [Importing `__attribute__((NSObject))` `__block` variables](#id11)[¶](#importing-attribute-nsobject-block-variables "Link to this heading")

A `__block` variable that is also marked `__attribute__((NSObject))` should have `byref_keep` and `byref_dispose` helper functions that use `_Block_object_assign` and `_Block_object_dispose`.

#### [`__block` escapes](#id12)[¶](#block-escapes "Link to this heading")

Because `Blocks` referencing `__block` variables may have `Block_copy()` performed upon them the underlying storage for the variables may move to the heap. In Objective-C Garbage Collection Only compilation environments the heap used is the garbage collected one and no further action is required. Otherwise the compiler must issue a call to potentially release any heap storage for `__block` variables at all escapes or terminations of their scope. The call should be:

\_Block\_object\_dispose(&\_block\_byref\_foo, BLOCK\_FIELD\_IS\_BYREF);

#### [Nesting](#id13)[¶](#nesting "Link to this heading")

`Blocks` may contain `Block` literal expressions. Any variables used within inner blocks are imported into all enclosing `Block` scopes even if the variables are not used. This includes `const` imports as well as `__block` variables.

[Objective C Extensions to `Blocks`](#id14)[¶](#objective-c-extensions-to-blocks "Link to this heading")
--------------------------------------------------------------------------------------------------------

### [Importing Objects](#id15)[¶](#importing-objects "Link to this heading")

Objects should be treated as `__attribute__((NSObject))` variables; all `copy_helper`, `dispose_helper`, `byref_keep`, and `byref_dispose` helper functions should use `_Block_object_assign` and `_Block_object_dispose`. There should be no code generated that uses `*-retain` or `*-release` methods.

### [`Blocks` as Objects](#id16)[¶](#blocks-as-objects "Link to this heading")

The compiler will treat `Blocks` as objects when synthesizing property setters and getters, will characterize them as objects when generating garbage collection strong and weak layout information in the same manner as objects, and will issue strong and weak write-barrier assignments in the same manner as objects.

### [`__weak __block` Support](#id17)[¶](#weak-block-support "Link to this heading")

Objective-C (and Objective-C++) support the `__weak` attribute on `__block` variables. Under normal circumstances the compiler uses the Objective-C runtime helper support functions `objc_assign_weak` and `objc_read_weak`. Both should continue to be used for all reads and writes of `__weak __block` variables:

objc\_read\_weak(&block\->byref\_i\->forwarding\->i)

The `__weak` variable is stored in a `_block_byref_foo` structure and the `Block` has copy and dispose helpers for this structure that call:

\_Block\_object\_assign(&dest\->\_block\_byref\_i, src\-> \_block\_byref\_i, BLOCK\_FIELD\_IS\_WEAK | BLOCK\_FIELD\_IS\_BYREF);

and:

\_Block\_object\_dispose(src\->\_block\_byref\_i, BLOCK\_FIELD\_IS\_WEAK | BLOCK\_FIELD\_IS\_BYREF);

In turn, the `block_byref` copy support helpers distinguish between whether the `__block` variable is a `Block` or not and should either call:

\_Block\_object\_assign(&dest\->\_block\_byref\_i, src\->\_block\_byref\_i, BLOCK\_FIELD\_IS\_WEAK | BLOCK\_FIELD\_IS\_OBJECT | BLOCK\_BYREF\_CALLER);

for something declared as an object or:

\_Block\_object\_assign(&dest\->\_block\_byref\_i, src\->\_block\_byref\_i, BLOCK\_FIELD\_IS\_WEAK | BLOCK\_FIELD\_IS\_BLOCK | BLOCK\_BYREF\_CALLER);

for something declared as a `Block`.

A full example follows:

\_\_block \_\_weak id obj \= <initialization expression\>;
functioncall(^{ \[obj somemessage\]; });

would translate to:

struct \_block\_byref\_obj {
    void \*isa;  // uninitialized
    struct \_block\_byref\_obj \*forwarding;
    int flags;   //refcount;
    int size;
    void (\*byref\_keep)(struct \_block\_byref\_i \*dst, struct \_block\_byref\_i \*src);
    void (\*byref\_dispose)(struct \_block\_byref\_i \*);
    id captured\_obj;
};

void \_block\_byref\_obj\_keep(struct \_block\_byref\_voidBlock \*dst, struct \_block\_byref\_voidBlock \*src) {
    //\_Block\_copy\_assign(&dst->captured\_obj, src->captured\_obj, 0);
    \_Block\_object\_assign(&dst\->captured\_obj, src\->captured\_obj, BLOCK\_FIELD\_IS\_OBJECT | BLOCK\_FIELD\_IS\_WEAK | BLOCK\_BYREF\_CALLER);
}

void \_block\_byref\_obj\_dispose(struct \_block\_byref\_voidBlock \*param) {
    //\_Block\_destroy(param->captured\_obj, 0);
    \_Block\_object\_dispose(param\->captured\_obj, BLOCK\_FIELD\_IS\_OBJECT | BLOCK\_FIELD\_IS\_WEAK | BLOCK\_BYREF\_CALLER);
};

for the block `byref` part and:

struct \_\_block\_literal\_5 {
    void \*isa;
    int flags;
    int reserved;
    void (\*invoke)(struct \_\_block\_literal\_5 \*);
    struct \_\_block\_descriptor\_5 \*descriptor;
    struct \_block\_byref\_obj \*byref\_obj;
};

void \_\_block\_invoke\_5(struct \_\_block\_literal\_5 \*\_block) {
   \[objc\_read\_weak(&\_block\->byref\_obj\->forwarding\->captured\_obj) somemessage\];
}

void \_\_block\_copy\_5(struct \_\_block\_literal\_5 \*dst, struct \_\_block\_literal\_5 \*src) {
     //\_Block\_byref\_assign\_copy(&dst->byref\_obj, src->byref\_obj);
     \_Block\_object\_assign(&dst\->byref\_obj, src\->byref\_obj, BLOCK\_FIELD\_IS\_BYREF | BLOCK\_FIELD\_IS\_WEAK);
}

void \_\_block\_dispose\_5(struct \_\_block\_literal\_5 \*src) {
     //\_Block\_byref\_release(src->byref\_obj);
     \_Block\_object\_dispose(src\->byref\_obj, BLOCK\_FIELD\_IS\_BYREF | BLOCK\_FIELD\_IS\_WEAK);
}

static struct \_\_block\_descriptor\_5 {
    unsigned long int reserved;
    unsigned long int Block\_size;
    void (\*copy\_helper)(struct \_\_block\_literal\_5 \*dst, struct \_\_block\_literal\_5 \*src);
    void (\*dispose\_helper)(struct \_\_block\_literal\_5 \*);
} \_\_block\_descriptor\_5 \= { 0, sizeof(struct \_\_block\_literal\_5), \_\_block\_copy\_5, \_\_block\_dispose\_5 };

and within the compound statement:

truct \_block\_byref\_obj obj \= {( .forwarding\=&obj, .flags\=(1<<25), .size\=sizeof(struct \_block\_byref\_obj),
                 .byref\_keep\=\_block\_byref\_obj\_keep, .byref\_dispose\=\_block\_byref\_obj\_dispose,
                 .captured\_obj \= <initialization expression\> )};

truct \_\_block\_literal\_5 \_block\_literal \= {
     &\_NSConcreteStackBlock,
     (1<<25)|(1<<29), <uninitialized\>,
     \_\_block\_invoke\_5,
     &\_\_block\_descriptor\_5,
     &obj,        // a reference to the on-stack structure containing "captured\_obj"
};

functioncall(\_block\_literal\->invoke(&\_block\_literal));

[C++ Support](#id18)[¶](#c-support "Link to this heading")
----------------------------------------------------------

Within a block stack based C++ objects are copied into `const` copies using the copy constructor. It is an error if a stack based C++ object is used within a block if it does not have a copy constructor. In addition both copy and destroy helper routines must be synthesized for the block to support the `Block_copy()` operation, and the flags work marked with the (1<<26) bit in addition to the (1<<25) bit. The copy helper should call the constructor using appropriate offsets of the variable within the supplied stack based block source and heap based destination for all `const` constructed copies, and similarly should call the destructor in the destroy routine.

As an example, suppose a C++ class `FOO` existed with a copy constructor. Within a code block a stack version of a `FOO` object is declared and used within a `Block` literal expression:

{
    FOO foo;
    void (^block)(void) \= ^{ printf("%d\\n", foo.value()); };
}

The compiler would synthesize:

struct \_\_block\_literal\_10 {
    void \*isa;
    int flags;
    int reserved;
    void (\*invoke)(struct \_\_block\_literal\_10 \*);
    struct \_\_block\_descriptor\_10 \*descriptor;
    const FOO foo;
};

void \_\_block\_invoke\_10(struct \_\_block\_literal\_10 \*\_block) {
   printf("%d\\n", \_block\->foo.value());
}

void \_\_block\_copy\_10(struct \_\_block\_literal\_10 \*dst, struct \_\_block\_literal\_10 \*src) {
     FOO\_ctor(&dst\->foo, &src\->foo);
}

void \_\_block\_dispose\_10(struct \_\_block\_literal\_10 \*src) {
     FOO\_dtor(&src\->foo);
}

static struct \_\_block\_descriptor\_10 {
    unsigned long int reserved;
    unsigned long int Block\_size;
    void (\*copy\_helper)(struct \_\_block\_literal\_10 \*dst, struct \_\_block\_literal\_10 \*src);
    void (\*dispose\_helper)(struct \_\_block\_literal\_10 \*);
} \_\_block\_descriptor\_10 \= { 0, sizeof(struct \_\_block\_literal\_10), \_\_block\_copy\_10, \_\_block\_dispose\_10 };

and the code would be:

{
  FOO foo;
  comp\_ctor(&foo); // default constructor
  struct \_\_block\_literal\_10 \_block\_literal \= {
    &\_NSConcreteStackBlock,
    (1<<25)|(1<<26)|(1<<29), <uninitialized\>,
    \_\_block\_invoke\_10,
    &\_\_block\_descriptor\_10,
   };
   comp\_ctor(&\_block\_literal\->foo, &foo);  // const copy into stack version
   struct \_\_block\_literal\_10 &block \= &\_block\_literal;  // assign literal to block variable
   block\->invoke(block);    // invoke block
   comp\_dtor(&\_block\_literal\->foo); // destroy stack version of const block copy
   comp\_dtor(&foo); // destroy original version
}

C++ objects stored in `__block` storage start out on the stack in a `block_byref` data structure as do other variables. Such objects (if not `const` objects) must support a regular copy constructor. The `block_byref` data structure will have copy and destroy helper routines synthesized by the compiler. The copy helper will have code created to perform the copy constructor based on the initial stack `block_byref` data structure, and will also set the (1<<26) bit in addition to the (1<<25) bit. The destroy helper will have code to do the destructor on the object stored within the supplied `block_byref` heap data structure. For example,

\_\_block FOO blockStorageFoo;

requires the normal constructor for the embedded `blockStorageFoo` object:

FOO\_ctor(& \_block\_byref\_blockStorageFoo\->blockStorageFoo);

and at scope termination the destructor:

FOO\_dtor(& \_block\_byref\_blockStorageFoo\->blockStorageFoo);

Note that the forwarding indirection is _NOT_ used.

The compiler would need to generate (if used from a block literal) the following copy/dispose helpers:

void \_block\_byref\_obj\_keep(struct \_block\_byref\_blockStorageFoo \*dst, struct \_block\_byref\_blockStorageFoo \*src) {
     FOO\_ctor(&dst\->blockStorageFoo, &src\->blockStorageFoo);
}

void \_block\_byref\_obj\_dispose(struct \_block\_byref\_blockStorageFoo \*src) {
     FOO\_dtor(&src\->blockStorageFoo);
}

for the appropriately named constructor and destructor for the class/struct `FOO`.

To support member variable and function access the compiler will synthesize a `const` pointer to a block version of the `this` pointer.

[Runtime Helper Functions](#id19)[¶](#runtime-helper-functions "Link to this heading")
--------------------------------------------------------------------------------------

The runtime helper functions are described in `/usr/local/include/Block_private.h`. To summarize their use, a `Block` requires copy/dispose helpers if it imports any block variables, `__block` storage variables, `__attribute__((NSObject))` variables, or C++ `const` copied objects with constructor/destructors. The (1<<26) bit is set and functions are generated.

The block copy helper function should, for each of the variables of the type mentioned above, call:

\_Block\_object\_assign(&dst\->target, src\->target, BLOCK\_FIELD\_<apropos\>);

in the copy helper and:

\_Block\_object\_dispose(\->target, BLOCK\_FIELD\_<apropos\>);

in the dispose helper where `<apropos>` is:

enum {
    BLOCK\_FIELD\_IS\_OBJECT   \=  3,  // id, NSObject, \_\_attribute\_\_((NSObject)), block, ...
    BLOCK\_FIELD\_IS\_BLOCK    \=  7,  // a block variable
    BLOCK\_FIELD\_IS\_BYREF    \=  8,  // the on stack structure holding the \_\_block variable

    BLOCK\_FIELD\_IS\_WEAK     \= 16,  // declared \_\_weak

    BLOCK\_BYREF\_CALLER      \= 128, // called from byref copy/dispose helpers
};

and of course the constructors/destructors for `const` copied C++ objects.

The `block_byref` data structure similarly requires copy/dispose helpers for block variables, `__attribute__((NSObject))` variables, or C++ `const` copied objects with constructor/destructors, and again the (1<<26) bit is set and functions are generated in the same manner.

Under ObjC we allow `__weak` as an attribute on `__block` variables, and this causes the addition of `BLOCK_FIELD_IS_WEAK` orred onto the `BLOCK_FIELD_IS_BYREF` flag when copying the `block_byref` structure in the `Block` copy helper, and onto the `BLOCK_FIELD_<apropos>` field within the `block_byref` copy/dispose helper calls.

The prototypes, and summary, of the helper functions are:

/\* Certain field types require runtime assistance when being copied to the
   heap.  The following function is used to copy fields of types: blocks,
   pointers to byref structures, and objects (including
   \_\_attribute\_\_((NSObject)) pointers.  BLOCK\_FIELD\_IS\_WEAK is orthogonal to
   the other choices which are mutually exclusive.  Only in a Block copy
   helper will one see BLOCK\_FIELD\_IS\_BYREF.
\*/
void \_Block\_object\_assign(void \*destAddr, const void \*object, const int flags);

/\* Similarly a compiler generated dispose helper needs to call back for each
   field of the byref data structure.  (Currently the implementation only
   packs one field into the byref structure but in principle there could be
   more).  The same flags used in the copy helper should be used for each
   call generated to this function:
\*/
void \_Block\_object\_dispose(const void \*object, const int flags);

[Copyright](#id20)[¶](#copyright "Link to this heading")
--------------------------------------------------------

Copyright 2008-2010 Apple, Inc. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
---
title: "1. Available Checkers — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/analyzer/checkers.html#optin-taint-taintedalloc"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
The analyzer performs checks that are categorized into families or “checkers”.

The default set of checkers covers a variety of checks targeted at finding security and API usage bugs, dead code, and other logic errors. See the [Default Checkers](#default-checkers) checkers list below.

In addition to these, the analyzer contains a number of [Experimental Checkers](#alpha-checkers) (aka _alpha_ checkers). These checkers are under development and are switched off by default. They may crash or emit a higher number of false positives.

The [debug](#id19) package contains checkers for analyzer developers for debugging purposes.

Table of Contents

*   [Available Checkers](#available-checkers)
    
    *   [Default Checkers](#default-checkers)
        
        *   [core](#core)
            
            *   [core.BitwiseShift (C, C++)](#core-bitwiseshift-c-c)
                
            *   [core.CallAndMessage (C, C++, ObjC)](#core-callandmessage-c-c-objc)
                
            *   [core.DivideZero (C, C++, ObjC)](#core-dividezero-c-c-objc)
                
            *   [core.FixedAddressDereference (C, C++, ObjC)](#core-fixedaddressdereference-c-c-objc)
                
            *   [core.NonNullParamChecker (C, C++, ObjC)](#core-nonnullparamchecker-c-c-objc)
                
            *   [core.NullDereference (C, C++, ObjC)](#core-nulldereference-c-c-objc)
                
            *   [core.StackAddressEscape (C)](#core-stackaddressescape-c)
                
            *   [core.UndefinedBinaryOperatorResult (C)](#core-undefinedbinaryoperatorresult-c)
                
            *   [core.VLASize (C)](#core-vlasize-c)
                
            *   [core.uninitialized.ArraySubscript (C)](#core-uninitialized-arraysubscript-c)
                
            *   [core.uninitialized.Assign (C)](#core-uninitialized-assign-c)
                
            *   [core.uninitialized.Branch (C)](#core-uninitialized-branch-c)
                
            *   [core.uninitialized.CapturedBlockVariable (C)](#core-uninitialized-capturedblockvariable-c)
                
            *   [core.uninitialized.UndefReturn (C)](#core-uninitialized-undefreturn-c)
                
            *   [core.uninitialized.NewArraySize (C++)](#core-uninitialized-newarraysize-c)
                
        *   [cplusplus](#cplusplus)
            
            *   [cplusplus.ArrayDelete (C++)](#cplusplus-arraydelete-c)
                
            *   [cplusplus.InnerPointer (C++)](#cplusplus-innerpointer-c)
                
            *   [cplusplus.Move (C++)](#cplusplus-move-c)
                
            *   [cplusplus.NewDelete (C++)](#cplusplus-newdelete-c)
                
            *   [cplusplus.NewDeleteLeaks (C++)](#cplusplus-newdeleteleaks-c)
                
            *   [cplusplus.PlacementNew (C++)](#cplusplus-placementnew-c)
                
            *   [cplusplus.SelfAssignment (C++)](#cplusplus-selfassignment-c)
                
            *   [cplusplus.StringChecker (C++)](#cplusplus-stringchecker-c)
                
            *   [cplusplus.PureVirtualCall (C++)](#cplusplus-purevirtualcall-c)
                
        *   [deadcode](#deadcode)
            
            *   [deadcode.DeadStores (C)](#deadcode-deadstores-c)
                
        *   [nullability](#nullability)
            
            *   [nullability.NullPassedToNonnull (ObjC)](#nullability-nullpassedtononnull-objc)
                
            *   [nullability.NullReturnedFromNonnull (C, C++, ObjC)](#nullability-nullreturnedfromnonnull-c-c-objc)
                
            *   [nullability.NullableDereferenced (ObjC)](#nullability-nullabledereferenced-objc)
                
            *   [nullability.NullablePassedToNonnull (ObjC)](#nullability-nullablepassedtononnull-objc)
                
            *   [nullability.NullableReturnedFromNonnull (ObjC)](#nullability-nullablereturnedfromnonnull-objc)
                
        *   [optin](#optin)
            
            *   [optin.core.EnumCastOutOfRange (C, C++)](#optin-core-enumcastoutofrange-c-c)
                
            *   [optin.cplusplus.UninitializedObject (C++)](#optin-cplusplus-uninitializedobject-c)
                
            *   [optin.cplusplus.VirtualCall (C++)](#optin-cplusplus-virtualcall-c)
                
            *   [optin.mpi.MPI-Checker (C)](#optin-mpi-mpi-checker-c)
                
            *   [optin.osx.cocoa.localizability.EmptyLocalizationContextChecker (ObjC)](#optin-osx-cocoa-localizability-emptylocalizationcontextchecker-objc)
                
            *   [optin.osx.cocoa.localizability.NonLocalizedStringChecker (ObjC)](#optin-osx-cocoa-localizability-nonlocalizedstringchecker-objc)
                
            *   [optin.performance.GCDAntipattern](#optin-performance-gcdantipattern)
                
            *   [optin.performance.Padding (C, C++, ObjC)](#optin-performance-padding-c-c-objc)
                
            *   [optin.portability.UnixAPI](#optin-portability-unixapi)
                
        *   [optin.taint](#optin-taint)
            
            *   [optin.taint.GenericTaint (C, C++)](#optin-taint-generictaint-c-c)
                
            *   [optin.taint.TaintedAlloc (C, C++)](#optin-taint-taintedalloc-c-c)
                
            *   [optin.taint.TaintedDiv (C, C++, ObjC)](#optin-taint-tainteddiv-c-c-objc)
                
        *   [security](#security)
            
            *   [security.ArrayBound (C, C++)](#security-arraybound-c-c)
                
            *   [security.cert.env.InvalidPtr](#security-cert-env-invalidptr)
                
            *   [security.FloatLoopCounter (C)](#security-floatloopcounter-c)
                
            *   [security.insecureAPI.UncheckedReturn (C)](#security-insecureapi-uncheckedreturn-c)
                
            *   [security.insecureAPI.bcmp (C)](#security-insecureapi-bcmp-c)
                
            *   [security.insecureAPI.bcopy (C)](#security-insecureapi-bcopy-c)
                
            *   [security.insecureAPI.bzero (C)](#security-insecureapi-bzero-c)
                
            *   [security.insecureAPI.getpw (C)](#security-insecureapi-getpw-c)
                
            *   [security.insecureAPI.gets (C)](#security-insecureapi-gets-c)
                
            *   [security.insecureAPI.mkstemp (C)](#security-insecureapi-mkstemp-c)
                
            *   [security.insecureAPI.mktemp (C)](#security-insecureapi-mktemp-c)
                
            *   [security.insecureAPI.rand (C)](#security-insecureapi-rand-c)
                
            *   [security.insecureAPI.strcpy (C)](#security-insecureapi-strcpy-c)
                
            *   [security.insecureAPI.vfork (C)](#security-insecureapi-vfork-c)
                
            *   [security.insecureAPI.DeprecatedOrUnsafeBufferHandling (C)](#security-insecureapi-deprecatedorunsafebufferhandling-c)
                
            *   [security.MmapWriteExec (C)](#security-mmapwriteexec-c)
                
            *   [security.PointerSub (C)](#security-pointersub-c)
                
            *   [security.PutenvStackArray (C)](#security-putenvstackarray-c)
                
            *   [security.SetgidSetuidOrder (C)](#security-setgidsetuidorder-c)
                
        *   [unix](#unix)
            
            *   [unix.API (C)](#unix-api-c)
                
            *   [unix.BlockInCriticalSection (C, C++)](#unix-blockincriticalsection-c-c)
                
            *   [unix.Chroot (C)](#unix-chroot-c)
                
            *   [unix.Errno (C)](#unix-errno-c)
                
            *   [unix.Malloc (C)](#unix-malloc-c)
                
            *   [unix.MallocSizeof (C)](#unix-mallocsizeof-c)
                
            *   [unix.MismatchedDeallocator (C, C++)](#unix-mismatcheddeallocator-c-c)
                
            *   [unix.Vfork (C)](#unix-vfork-c)
                
            *   [unix.cstring.BadSizeArg (C)](#unix-cstring-badsizearg-c)
                
            *   [unix.cstring.NotNullTerminated (C)](#unix-cstring-notnullterminated-c)
                
            *   [unix.cstring.NullArg (C)](#unix-cstring-nullarg-c)
                
            *   [unix.StdCLibraryFunctions (C)](#unix-stdclibraryfunctions-c)
                
            *   [unix.Stream (C)](#unix-stream-c)
                
        *   [osx](#osx)
            
            *   [osx.API (C)](#osx-api-c)
                
            *   [osx.NumberObjectConversion (C, C++, ObjC)](#osx-numberobjectconversion-c-c-objc)
                
            *   [osx.ObjCProperty (ObjC)](#osx-objcproperty-objc)
                
            *   [osx.SecKeychainAPI (C)](#osx-seckeychainapi-c)
                
            *   [osx.cocoa.AtSync (ObjC)](#osx-cocoa-atsync-objc)
                
            *   [osx.cocoa.AutoreleaseWrite](#osx-cocoa-autoreleasewrite)
                
            *   [osx.cocoa.ClassRelease (ObjC)](#osx-cocoa-classrelease-objc)
                
            *   [osx.cocoa.Dealloc (ObjC)](#osx-cocoa-dealloc-objc)
                
            *   [osx.cocoa.IncompatibleMethodTypes (ObjC)](#osx-cocoa-incompatiblemethodtypes-objc)
                
            *   [osx.cocoa.Loops](#osx-cocoa-loops)
                
            *   [osx.cocoa.MissingSuperCall (ObjC)](#osx-cocoa-missingsupercall-objc)
                
            *   [osx.cocoa.NSAutoreleasePool (ObjC)](#osx-cocoa-nsautoreleasepool-objc)
                
            *   [osx.cocoa.NSError (ObjC)](#osx-cocoa-nserror-objc)
                
            *   [osx.cocoa.NilArg (ObjC)](#osx-cocoa-nilarg-objc)
                
            *   [osx.cocoa.NonNilReturnValue](#osx-cocoa-nonnilreturnvalue)
                
            *   [osx.cocoa.ObjCGenerics (ObjC)](#osx-cocoa-objcgenerics-objc)
                
            *   [osx.cocoa.RetainCount (ObjC)](#osx-cocoa-retaincount-objc)
                
            *   [osx.cocoa.RunLoopAutoreleaseLeak](#osx-cocoa-runloopautoreleaseleak)
                
            *   [osx.cocoa.SelfInit (ObjC)](#osx-cocoa-selfinit-objc)
                
            *   [osx.cocoa.SuperDealloc (ObjC)](#osx-cocoa-superdealloc-objc)
                
            *   [osx.cocoa.UnusedIvars (ObjC)](#osx-cocoa-unusedivars-objc)
                
            *   [osx.cocoa.VariadicMethodTypes (ObjC)](#osx-cocoa-variadicmethodtypes-objc)
                
            *   [osx.coreFoundation.CFError (C)](#osx-corefoundation-cferror-c)
                
            *   [osx.coreFoundation.CFNumber (C)](#osx-corefoundation-cfnumber-c)
                
            *   [osx.coreFoundation.CFRetainRelease (C)](#osx-corefoundation-cfretainrelease-c)
                
            *   [osx.coreFoundation.containers.OutOfBounds (C)](#osx-corefoundation-containers-outofbounds-c)
                
            *   [osx.coreFoundation.containers.PointerSizedValues (C)](#osx-corefoundation-containers-pointersizedvalues-c)
                
        *   [Fuchsia](#fuchsia)
            
            *   [fuchsia.HandleChecker](#fuchsia-handlechecker)
                
        *   [WebKit](#webkit)
            
            *   [webkit.RefCntblBaseVirtualDtor](#webkit-refcntblbasevirtualdtor)
                
            *   [webkit.NoUncountedMemberChecker](#webkit-nouncountedmemberchecker)
                
            *   [webkit.UncountedLambdaCapturesChecker](#webkit-uncountedlambdacaptureschecker)
                
    *   [Experimental Checkers](#experimental-checkers)
        
        *   [alpha.clone](#alpha-clone)
            
            *   [alpha.clone.CloneChecker (C, C++, ObjC)](#alpha-clone-clonechecker-c-c-objc)
                
        *   [alpha.core](#alpha-core)
            
            *   [alpha.core.BoolAssignment (ObjC)](#alpha-core-boolassignment-objc)
                
            *   [alpha.core.C11Lock](#alpha-core-c11lock)
                
            *   [alpha.core.CastSize (C)](#alpha-core-castsize-c)
                
            *   [alpha.core.CastToStruct (C, C++)](#alpha-core-casttostruct-c-c)
                
            *   [alpha.core.Conversion (C, C++, ObjC)](#alpha-core-conversion-c-c-objc)
                
            *   [alpha.core.DynamicTypeChecker (ObjC)](#alpha-core-dynamictypechecker-objc)
                
            *   [alpha.core.FixedAddr (C)](#alpha-core-fixedaddr-c)
                
            *   [alpha.core.PointerArithm (C)](#alpha-core-pointerarithm-c)
                
            *   [alpha.core.StackAddressAsyncEscape (ObjC)](#alpha-core-stackaddressasyncescape-objc)
                
            *   [alpha.core.StdVariant (C++)](#alpha-core-stdvariant-c)
                
            *   [alpha.core.TestAfterDivZero (C)](#alpha-core-testafterdivzero-c)
                
            *   [alpha.core.StoreToImmutable (C, C++)](#alpha-core-storetoimmutable-c-c)
                
        *   [alpha.cplusplus](#alpha-cplusplus)
            
            *   [alpha.cplusplus.DeleteWithNonVirtualDtor (C++)](#alpha-cplusplus-deletewithnonvirtualdtor-c)
                
            *   [alpha.cplusplus.InvalidatedIterator (C++)](#alpha-cplusplus-invalidatediterator-c)
                
            *   [alpha.cplusplus.IteratorRange (C++)](#alpha-cplusplus-iteratorrange-c)
                
            *   [alpha.cplusplus.MismatchedIterator (C++)](#alpha-cplusplus-mismatchediterator-c)
                
            *   [alpha.cplusplus.SmartPtr (C++)](#alpha-cplusplus-smartptr-c)
                
        *   [alpha.deadcode](#alpha-deadcode)
            
            *   [alpha.deadcode.UnreachableCode (C, C++)](#alpha-deadcode-unreachablecode-c-c)
                
        *   [alpha.fuchsia](#alpha-fuchsia)
            
            *   [alpha.fuchsia.Lock](#alpha-fuchsia-lock)
                
        *   [alpha.llvm](#alpha-llvm)
            
            *   [alpha.llvm.Conventions](#alpha-llvm-conventions)
                
        *   [alpha.osx](#alpha-osx)
            
            *   [alpha.osx.cocoa.DirectIvarAssignment (ObjC)](#alpha-osx-cocoa-directivarassignment-objc)
                
            *   [alpha.osx.cocoa.DirectIvarAssignmentForAnnotatedFunctions (ObjC)](#alpha-osx-cocoa-directivarassignmentforannotatedfunctions-objc)
                
            *   [alpha.osx.cocoa.InstanceVariableInvalidation (ObjC)](#alpha-osx-cocoa-instancevariableinvalidation-objc)
                
            *   [alpha.osx.cocoa.MissingInvalidationMethod (ObjC)](#alpha-osx-cocoa-missinginvalidationmethod-objc)
                
            *   [alpha.osx.cocoa.localizability.PluralMisuseChecker (ObjC)](#alpha-osx-cocoa-localizability-pluralmisusechecker-objc)
                
        *   [alpha.security](#alpha-security)
            
            *   [alpha.security.ReturnPtrRange (C)](#alpha-security-returnptrrange-c)
                
        *   [alpha.security.cert](#alpha-security-cert)
            
        *   [alpha.unix](#alpha-unix)
            
            *   [alpha.unix.PthreadLock (C)](#alpha-unix-pthreadlock-c)
                
            *   [alpha.unix.SimpleStream (C)](#alpha-unix-simplestream-c)
                
            *   [alpha.unix.cstring.BufferOverlap (C)](#alpha-unix-cstring-bufferoverlap-c)
                
            *   [alpha.unix.cstring.OutOfBounds (C)](#alpha-unix-cstring-outofbounds-c)
                
            *   [alpha.unix.cstring.UninitializedRead (C)](#alpha-unix-cstring-uninitializedread-c)
                
        *   [alpha.WebKit](#alpha-webkit)
            
            *   [alpha.webkit.ForwardDeclChecker](#alpha-webkit-forwarddeclchecker)
                
            *   [alpha.webkit.MemoryUnsafeCastChecker](#alpha-webkit-memoryunsafecastchecker)
                
            *   [alpha.webkit.NoUncheckedPtrMemberChecker](#id16)
                
            *   [alpha.webkit.NoUnretainedMemberChecker](#alpha-webkit-nounretainedmemberchecker)
                
            *   [alpha.webkit.UnretainedLambdaCapturesChecker](#alpha-webkit-unretainedlambdacaptureschecker)
                
            *   [alpha.webkit.UncountedCallArgsChecker](#alpha-webkit-uncountedcallargschecker)
                
            *   [alpha.webkit.UncheckedCallArgsChecker](#alpha-webkit-uncheckedcallargschecker)
                
            *   [alpha.webkit.UnretainedCallArgsChecker](#alpha-webkit-unretainedcallargschecker)
                
            *   [alpha.webkit.UncountedLocalVarsChecker](#alpha-webkit-uncountedlocalvarschecker)
                
            *   [alpha.webkit.UncheckedLocalVarsChecker](#alpha-webkit-uncheckedlocalvarschecker)
                
            *   [alpha.webkit.UnretainedLocalVarsChecker](#alpha-webkit-unretainedlocalvarschecker)
                
            *   [webkit.RetainPtrCtorAdoptChecker](#webkit-retainptrctoradoptchecker)
                
    *   [Debug Checkers](#debug-checkers)
        
        *   [debug](#debug)
            
            *   [debug.AnalysisOrder](#debug-analysisorder)
                
            *   [debug.ConfigDumper](#debug-configdumper)
                
            *   [debug.DumpCFG Display](#debug-dumpcfg-display)
                
            *   [debug.DumpCallGraph](#debug-dumpcallgraph)
                
            *   [debug.DumpCalls](#debug-dumpcalls)
                
            *   [debug.DumpDominators](#debug-dumpdominators)
                
            *   [debug.DumpLiveVars](#debug-dumplivevars)
                
            *   [debug.DumpTraversal](#debug-dumptraversal)
                
            *   [debug.ExprInspection](#debug-exprinspection)
                
            *   [debug.Stats](#debug-stats)
                
            *   [debug.TaintTest](#debug-tainttest)
                
            *   [debug.ViewCFG](#debug-viewcfg)
                
            *   [debug.ViewCallGraph](#debug-viewcallgraph)
                
            *   [debug.ViewExplodedGraph](#debug-viewexplodedgraph)
                

[1.1. Default Checkers](#id35)[¶](#default-checkers "Link to this heading")
---------------------------------------------------------------------------

### [1.1.1. core](#id36)[¶](#core "Link to this heading")

Models core language features and contains general-purpose checkers such as division by zero, null pointer dereference, usage of uninitialized values, etc. _These checkers must be always switched on as other checker rely on them._

#### [1.1.1.1. core.BitwiseShift (C, C++)](#id37)[¶](#core-bitwiseshift-c-c "Link to this heading")

Finds undefined behavior caused by the bitwise left- and right-shift operator operating on integer types.

By default, this checker only reports situations when the right operand is either negative or larger than the bit width of the type of the left operand; these are logically unsound.

Moreover, if the pedantic mode is activated by `-analyzer-config core.BitwiseShift:Pedantic=true`, then this checker also reports situations where the \_left\_ operand of a shift operator is negative or overflow occurs during the right shift of a signed value. (Most compilers handle these predictably, but the C standard and the C++ standards before C++20 say that they’re undefined behavior. In the C++20 standard these constructs are well-defined, so activating pedantic mode in C++20 has no effect.)

**Examples**

static\_assert(sizeof(int) \== 4, "assuming 32-bit int")

void basic\_examples(int a, int b) {
  if (b < 0) {
    b \= a << b; // warn: right operand is negative in left shift
  } else if (b \>= 32) {
    b \= a \>> b; // warn: right shift overflows the capacity of 'int'
  }
}

int pedantic\_examples(int a, int b) {
  if (a < 0) {
    return a \>> b; // warn: left operand is negative in right shift
  }
  a \= 1000u << 31; // OK, overflow of unsigned value is well-defined, a == 0
  if (b \> 10) {
    a \= b << 31; // this is undefined before C++20, but the checker doesn't
                 // warn because it doesn't know the exact value of b
  }
  return 1000 << 31; // warn: this overflows the capacity of 'int'
}

**Solution**

Ensure the shift operands are in proper range before shifting.

#### [1.1.1.2. core.CallAndMessage (C, C++, ObjC)](#id38)[¶](#core-callandmessage-c-c-objc "Link to this heading")

> Check for logical errors for function calls and Objective-C message expressions (e.g., uninitialized arguments, null function pointers).

//C
void test() {
   void (\*foo)(void);
   foo \= 0;
   foo(); // warn: function pointer is null
 }

 // C++
 class C {
 public:
   void f();
 };

 void test() {
   C \*pc;
   pc\->f(); // warn: object pointer is uninitialized
 }

 // C++
 class C {
 public:
   void f();
 };

 void test() {
   C \*pc \= 0;
   pc\->f(); // warn: object pointer is null
 }

 // Objective-C
 @interface MyClass : NSObject
 @property (readwrite,assign) id x;
 \- (long double)longDoubleM;
 @end

 void test() {
   MyClass \*obj1;
   long double ld1 \= \[obj1 longDoubleM\];
     // warn: receiver is uninitialized
 }

 // Objective-C
 @interface MyClass : NSObject
 @property (readwrite,assign) id x;
 \- (long double)longDoubleM;
 @end

 void test() {
   MyClass \*obj1;
   id i \= obj1.x; // warn: uninitialized object pointer
 }

 // Objective-C
 @interface Subscriptable : NSObject
 \- (id)objectAtIndexedSubscript:(unsigned int)index;
 @end

 @interface MyClass : Subscriptable
 @property (readwrite,assign) id x;
 \- (long double)longDoubleM;
 @end

 void test() {
   MyClass \*obj1;
   id i \= obj1\[0\]; // warn: uninitialized object pointer
 }

#### [1.1.1.3. core.DivideZero (C, C++, ObjC)](#id39)[¶](#core-dividezero-c-c-objc "Link to this heading")

> Check for division by zero.

void test(int z) {
  if (z \== 0)
    int x \= 1 / z; // warn
}

void test() {
  int x \= 1;
  int y \= x % 0; // warn
}

#### [1.1.1.4. core.FixedAddressDereference (C, C++, ObjC)](#id40)[¶](#core-fixedaddressdereference-c-c-objc "Link to this heading")

Check for dereferences of fixed addresses.

A pointer contains a fixed address if it was set to a hard-coded value or it becomes otherwise obvious that at that point it can have only a single fixed numerical value.

void test1() {
  int \*p \= (int \*)0x020;
  int x \= p\[0\]; // warn
}

void test2(int \*p) {
  if (p \== (int \*)\-1)
    \*p \= 0; // warn
}

void test3() {
  int (\*p\_function)(char, char);
  p\_function \= (int (\*)(char, char))0x04080;
  int x \= (\*p\_function)('x', 'y'); // NO warning yet at functon pointer calls
}

If the analyzer option `suppress-dereferences-from-any-address-space` is set to true (the default value), then this checker never reports dereference of pointers with a specified address space. If the option is set to false, then reports from the specific x86 address spaces 256, 257 and 258 are still suppressed, but fixed address dereferences from other address spaces are reported.

#### [1.1.1.5. core.NonNullParamChecker (C, C++, ObjC)](#id41)[¶](#core-nonnullparamchecker-c-c-objc "Link to this heading")

Check for null pointers passed as arguments to a function whose arguments are references or marked with the ‘nonnull’ attribute.

int f(int \*p) \_\_attribute\_\_((nonnull));

void test(int \*p) {
  if (!p)
    f(p); // warn
}

#### [1.1.1.6. core.NullDereference (C, C++, ObjC)](#id42)[¶](#core-nulldereference-c-c-objc "Link to this heading")

Check for dereferences of null pointers.

// C
void test(int \*p) {
  if (p)
    return;

  int x \= p\[0\]; // warn
}

// C
void test(int \*p) {
  if (!p)
    \*p \= 0; // warn
}

// C++
class C {
public:
  int x;
};

void test() {
  C \*pc \= 0;
  int k \= pc\->x; // warn
}

// Objective-C
@interface MyClass {
@public
  int x;
}
@end

void test() {
  MyClass \*obj \= 0;
  obj\->x \= 1; // warn
}

Null pointer dereferences of pointers with address spaces are not always defined as error. Specifically on x86/x86-64 target if the pointer address space is 256 (x86 GS Segment), 257 (x86 FS Segment), or 258 (x86 SS Segment), a null dereference is not defined as error. See [X86/X86-64 Language Extensions](https://clang.llvm.org/docs/LanguageExtensions.html#memory-references-to-specified-segments) for reference.

If the analyzer option `suppress-dereferences-from-any-address-space` is set to true (the default value), then this checker never reports dereference of pointers with a specified address space. If the option is set to false, then reports from the specific x86 address spaces 256, 257 and 258 are still suppressed, but null dereferences from other address spaces are reported.

#### [1.1.1.7. core.StackAddressEscape (C)](#id43)[¶](#core-stackaddressescape-c "Link to this heading")

Check that addresses to stack memory do not escape the function.

char const \*p;

void test() {
  char const str\[\] \= "string";
  p \= str; // warn
}

void\* test() {
   return \_\_builtin\_alloca(12); // warn
}

void test() {
  static int \*x;
  int y;
  x \= &y; // warn
}

#### [1.1.1.8. core.UndefinedBinaryOperatorResult (C)](#id44)[¶](#core-undefinedbinaryoperatorresult-c "Link to this heading")

Check for undefined results of binary operators.

void test() {
  int x;
  int y \= x + 1; // warn: left operand is garbage
}

#### [1.1.1.9. core.VLASize (C)](#id45)[¶](#core-vlasize-c "Link to this heading")

Check for declarations of Variable Length Arrays (VLA) of undefined, zero or negative size.

void test() {
  int x;
  int vla1\[x\]; // warn: garbage as size
}

void test() {
  int x \= 0;
  int vla2\[x\]; // warn: zero size
}

The checker also gives warning if the TaintPropagation checker is switched on and an unbound, attacker controlled (tainted) value is used to define the size of the VLA.

void taintedVLA(void) {
  int x;
  scanf("%d", &x);
  int vla\[x\]; // Declared variable-length array (VLA) has tainted (attacker controlled) size, that can be 0 or negative
}

void taintedVerfieidVLA(void) {
  int x;
  scanf("%d", &x);
  if (x<1)
    return;
  int vla\[x\]; // no-warning. The analyzer can prove that x must be positive.
}

#### [1.1.1.10. core.uninitialized.ArraySubscript (C)](#id46)[¶](#core-uninitialized-arraysubscript-c "Link to this heading")

Check for uninitialized values used as array subscripts.

void test() {
  int i, a\[10\];
  int x \= a\[i\]; // warn: array subscript is undefined
}

#### [1.1.1.11. core.uninitialized.Assign (C)](#id47)[¶](#core-uninitialized-assign-c "Link to this heading")

Check for assigning uninitialized values.

void test() {
  int x;
  x |= 1; // warn: left expression is uninitialized
}

#### [1.1.1.12. core.uninitialized.Branch (C)](#id48)[¶](#core-uninitialized-branch-c "Link to this heading")

Check for uninitialized values used as branch conditions.

void test() {
  int x;
  if (x) // warn
    return;
}

#### [1.1.1.13. core.uninitialized.CapturedBlockVariable (C)](#id49)[¶](#core-uninitialized-capturedblockvariable-c "Link to this heading")

Check for blocks that capture uninitialized values.

void test() {
  int x;
  ^{ int y \= x; }(); // warn
}

#### [1.1.1.14. core.uninitialized.UndefReturn (C)](#id50)[¶](#core-uninitialized-undefreturn-c "Link to this heading")

Check for uninitialized values being returned to the caller.

int test() {
  int x;
  return x; // warn
}

#### [1.1.1.15. core.uninitialized.NewArraySize (C++)](#id51)[¶](#core-uninitialized-newarraysize-c "Link to this heading")

Check if the element count in new\[\] is garbage or undefined.

void test() {
  int n;
  int \*arr \= new int\[n\]; // warn: Element count in new\[\] is a garbage value
  delete\[\] arr;
}

### [1.1.2. cplusplus](#id52)[¶](#cplusplus "Link to this heading")

C++ Checkers.

#### [1.1.2.1. cplusplus.ArrayDelete (C++)](#id53)[¶](#cplusplus-arraydelete-c "Link to this heading")

Reports destructions of arrays of polymorphic objects that are destructed as their base class. If the dynamic type of the array is different from its static type, calling delete\[\] is undefined.

This checker corresponds to the SEI CERT rule [EXP51-CPP: Do not delete an array through a pointer of the incorrect type](https://wiki.sei.cmu.edu/confluence/display/cplusplus/EXP51-CPP.+Do+not+delete+an+array+through+a+pointer+of+the+incorrect+type).

class Base {
public:
  virtual ~Base() {}
};
class Derived : public Base {};

Base \*create() {
  Base \*x \= new Derived\[10\]; // note: Casting from 'Derived' to 'Base' here
  return x;
}

void foo() {
  Base \*x \= create();
  delete\[\] x; // warn: Deleting an array of 'Derived' objects as their base class 'Base' is undefined
}

**Limitations**

The checker does not emit note tags when casting to and from reference types, even though the pointer values are tracked across references.

void foo() {
  Derived \*d \= new Derived\[10\];
  Derived &dref \= \*d;

  Base &bref \= static\_cast<Base&>(dref); // no note
  Base \*b \= &bref;
  delete\[\] b; // warn: Deleting an array of 'Derived' objects as their base class 'Base' is undefined
}

#### [1.1.2.2. cplusplus.InnerPointer (C++)](#id54)[¶](#cplusplus-innerpointer-c "Link to this heading")

Check for inner pointers of C++ containers used after re/deallocation.

Many container methods in the C++ standard library are known to invalidate “references” (including actual references, iterators and raw pointers) to elements of the container. Using such references after they are invalidated causes undefined behavior, which is a common source of memory errors in C++ that this checker is capable of finding.

The checker is currently limited to `std::string` objects and doesn’t recognize some of the more sophisticated approaches to passing unowned pointers around, such as `std::string_view`.

void deref\_after\_assignment() {
  std::string s \= "llvm";
  const char \*c \= s.data(); // note: pointer to inner buffer of 'std::string' obtained here
  s \= "clang"; // note: inner buffer of 'std::string' reallocated by call to 'operator='
  consume(c); // warn: inner pointer of container used after re/deallocation
}

const char \*return\_temp(int x) {
  return std::to\_string(x).c\_str(); // warn: inner pointer of container used after re/deallocation
  // note: pointer to inner buffer of 'std::string' obtained here
  // note: inner buffer of 'std::string' deallocated by call to destructor
}

#### [1.1.2.3. cplusplus.Move (C++)](#id55)[¶](#cplusplus-move-c "Link to this heading")

Find use-after-move bugs in C++. This includes method calls on moved-from objects, assignment of a moved-from object, and repeated move of a moved-from object.

struct A {
  void foo() {}
};

void f1() {
  A a;
  A b \= std::move(a); // note: 'a' became 'moved-from' here
  a.foo();            // warn: method call on a 'moved-from' object 'a'
}

void f2() {
  A a;
  A b \= std::move(a);
  A c(std::move(a)); // warn: move of an already moved-from object
}

void f3() {
  A a;
  A b \= std::move(a);
  b \= a; // warn: copy of moved-from object
}

The checker option `WarnOn` controls on what objects the use-after-move is checked:

*   The most strict value is `KnownsOnly`, in this mode only objects are checked whose type is known to be move-unsafe. These include most STL objects (but excluding move-safe ones) and smart pointers.
    
*   With option value `KnownsAndLocals` local variables (of any type) are additionally checked. The idea behind this is that local variables are usually not tempting to be re-used so an use after move is more likely a bug than with member variables.
    
*   With option value `All` any use-after move condition is checked on all kinds of variables, excluding global variables and known move-safe cases.
    

Default value is `KnownsAndLocals`.

Calls of methods named `empty()` or `isEmpty()` are allowed on moved-from objects because these methods are considered as move-safe. Functions called `reset()`, `destroy()`, `clear()`, `assign`, `resize`, `shrink` are treated as state-reset functions and are allowed on moved-from objects, these make the object valid again. This applies to any type of object (not only STL ones).

#### [1.1.2.4. cplusplus.NewDelete (C++)](#id56)[¶](#cplusplus-newdelete-c "Link to this heading")

Check for double-free and use-after-free problems. Traces memory managed by new/delete.

Custom allocation/deallocation functions can be defined using [ownership attributes](https://clang.llvm.org/docs/AttributeReference.html#analyzer-ownership-attrs).

void f(int \*p);

void testUseMiddleArgAfterDelete(int \*p) {
  delete p;
  f(p); // warn: use after free
}

class SomeClass {
public:
  void f();
};

void test() {
  SomeClass \*c \= new SomeClass;
  delete c;
  c\->f(); // warn: use after free
}

void test() {
  int \*p \= (int \*)\_\_builtin\_alloca(sizeof(int));
  delete p; // warn: deleting memory allocated by alloca
}

void test() {
  int \*p \= new int;
  delete p;
  delete p; // warn: attempt to free released
}

void test() {
  int i;
  delete &i; // warn: delete address of local
}

void test() {
  int \*p \= new int\[1\];
  delete\[\] (++p);
    // warn: argument to 'delete\[\]' is offset by 4 bytes
    // from the start of memory allocated by 'new\[\]'
}

#### [1.1.2.5. cplusplus.NewDeleteLeaks (C++)](#id57)[¶](#cplusplus-newdeleteleaks-c "Link to this heading")

Check for memory leaks. Traces memory managed by new/delete.

Custom allocation/deallocation functions can be defined using [ownership attributes](https://clang.llvm.org/docs/AttributeReference.html#analyzer-ownership-attrs).

void test() {
  int \*p \= new int;
} // warn

#### [1.1.2.6. cplusplus.PlacementNew (C++)](#id58)[¶](#cplusplus-placementnew-c "Link to this heading")

Check if default placement new is provided with pointers to sufficient storage capacity.

#include <new>

void f() {
  short s;
  long \*lp \= ::new (&s) long; // warn
}

#### [1.1.2.7. cplusplus.SelfAssignment (C++)](#id59)[¶](#cplusplus-selfassignment-c "Link to this heading")

Checks C++ copy and move assignment operators for self assignment.

#### [1.1.2.8. cplusplus.StringChecker (C++)](#id60)[¶](#cplusplus-stringchecker-c "Link to this heading")

Checks std::string operations.

Checks if the cstring pointer from which the `std::string` object is constructed is `NULL` or not. If the checker cannot reason about the nullness of the pointer it will assume that it was non-null to satisfy the precondition of the constructor.

This checker is capable of checking the [SEI CERT C++ coding rule STR51-CPP. Do not attempt to create a std::string from a null pointer](https://wiki.sei.cmu.edu/confluence/x/E3s-BQ).

#include <string>

void f(const char \*p) {
  if (!p) {
    std::string msg(p); // warn: The parameter must not be null
  }
}

#### [1.1.2.9. cplusplus.PureVirtualCall (C++)](#id61)[¶](#cplusplus-purevirtualcall-c "Link to this heading")

When [virtual methods are called during construction and destruction](https://en.cppreference.com/w/cpp/language/virtual#During_construction_and_destruction) the polymorphism is restricted to the class that’s being constructed or destructed because the more derived contexts are either not yet initialized or already destructed.

This checker reports situations where this restricted polymorphism causes a call to a pure virtual method, which is undefined behavior. (See also the related checker [optin.cplusplus.VirtualCall (C++)](#optin-cplusplus-virtualcall) which reports situations where the restricted polymorphism affects a call and the called method is not pure virtual – but may be still surprising for the programmer.)

struct A {
  virtual int getKind() \= 0;

  A() {
    // warn: This calls the pure virtual method A::getKind().
    log << "Constructing " << getKind();
  }
  virtual ~A() {
    releaseResources();
  }
  void releaseResources() {
    // warn: This can call the pure virtual method A::getKind() when this is
    // called from the destructor.
    callSomeFunction(getKind());
  }
};

### [1.1.3. deadcode](#id62)[¶](#deadcode "Link to this heading")

Dead Code Checkers.

#### [1.1.3.1. deadcode.DeadStores (C)](#id63)[¶](#deadcode-deadstores-c "Link to this heading")

Check for values stored to variables that are never read afterwards.

void test() {
  int x;
  x \= 1; // warn
}

The `WarnForDeadNestedAssignments` option enables the checker to emit warnings for nested dead assignments. You can disable with the `-analyzer-config deadcode.DeadStores:WarnForDeadNestedAssignments=false`. _Defaults to true_.

Would warn for this e.g.: if ((y = make\_int())) { }

### [1.1.4. nullability](#id64)[¶](#nullability "Link to this heading")

Checkers (mostly Objective C) that warn for null pointer passing and dereferencing errors.

#### [1.1.4.1. nullability.NullPassedToNonnull (ObjC)](#id65)[¶](#nullability-nullpassedtononnull-objc "Link to this heading")

Warns when a null pointer is passed to a pointer which has a \_Nonnull type.

if (name != nil)
  return;
// Warning: nil passed to a callee that requires a non-null 1st parameter
NSString \*greeting \= \[@"Hello " stringByAppendingString:name\];

#### [1.1.4.2. nullability.NullReturnedFromNonnull (C, C++, ObjC)](#id66)[¶](#nullability-nullreturnedfromnonnull-c-c-objc "Link to this heading")

Warns when a null pointer is returned from a function that has \_Nonnull return type.

\- (nonnull id)firstChild {
  id result \= nil;
  if (\[\_children count\] \> 0)
    result \= \_children\[0\];

  // Warning: nil returned from a method that is expected
  // to return a non-null value
  return result;
}

Warns when a null pointer is returned from a function annotated with `__attribute__((returns_nonnull))`

int global;
\_\_attribute\_\_((returns\_nonnull)) void\* getPtr(void\* p);

void\* getPtr(void\* p) {
  if (p) { // forgot to negate the condition
    return &global;
  }
  // Warning: nullptr returned from a function that is expected
  // to return a non-null value
  return p;
}

#### [1.1.4.3. nullability.NullableDereferenced (ObjC)](#id67)[¶](#nullability-nullabledereferenced-objc "Link to this heading")

Warns when a nullable pointer is dereferenced.

struct LinkedList {
  int data;
  struct LinkedList \*next;
};

struct LinkedList \* \_Nullable getNext(struct LinkedList \*l);

void updateNextData(struct LinkedList \*list, int newData) {
  struct LinkedList \*next \= getNext(list);
  // Warning: Nullable pointer is dereferenced
  next\->data \= 7;
}

#### [1.1.4.4. nullability.NullablePassedToNonnull (ObjC)](#id68)[¶](#nullability-nullablepassedtononnull-objc "Link to this heading")

Warns when a nullable pointer is passed to a pointer which has a \_Nonnull type.

typedef struct Dummy { int val; } Dummy;
Dummy \*\_Nullable returnsNullable();
void takesNonnull(Dummy \*\_Nonnull);

void test() {
  Dummy \*p \= returnsNullable();
  takesNonnull(p); // warn
}

#### [1.1.4.5. nullability.NullableReturnedFromNonnull (ObjC)](#id69)[¶](#nullability-nullablereturnedfromnonnull-objc "Link to this heading")

Warns when a nullable pointer is returned from a function that has \_Nonnull return type.

### [1.1.5. optin](#id70)[¶](#optin "Link to this heading")

Checkers for portability, performance, optional security and coding style specific rules.

#### [1.1.5.1. optin.core.EnumCastOutOfRange (C, C++)](#id71)[¶](#optin-core-enumcastoutofrange-c-c "Link to this heading")

Check for integer to enumeration casts that would produce a value with no corresponding enumerator. This is not necessarily undefined behavior, but can lead to nasty surprises, so projects may decide to use a coding standard that disallows these “unusual” conversions.

Note that no warnings are produced when the enum type (e.g. std::byte) has no enumerators at all.

enum WidgetKind { A\=1, B, C, X\=99 };

void foo() {
  WidgetKind c \= static\_cast<WidgetKind\>(3);  // OK
  WidgetKind x \= static\_cast<WidgetKind\>(99); // OK
  WidgetKind d \= static\_cast<WidgetKind\>(4);  // warn
}

**Limitations**

This checker does not accept the coding pattern where an enum type is used to store combinations of flag values. Such enums should be annotated with the \_\_attribute\_\_((flag\_enum)) or by the \[\[clang::flag\_enum\]\] attribute to signal this intent. Refer to the [documentation](https://clang.llvm.org/docs/AttributeReference.html#flag-enum) of this Clang attribute.

enum AnimalFlags
{
    HasClaws   \= 1,
    CanFly     \= 2,
    EatsFish   \= 4,
    Endangered \= 8
};

AnimalFlags operator|(AnimalFlags a, AnimalFlags b)
{
    return static\_cast<AnimalFlags\>(static\_cast<int\>(a) | static\_cast<int\>(b));
}

auto flags \= HasClaws | CanFly;

Projects that use this pattern should not enable this optin checker.

#### [1.1.5.2. optin.cplusplus.UninitializedObject (C++)](#id72)[¶](#optin-cplusplus-uninitializedobject-c "Link to this heading")

This checker reports uninitialized fields in objects created after a constructor call. It doesn’t only find direct uninitialized fields, but rather makes a deep inspection of the object, analyzing all of its fields’ subfields. The checker regards inherited fields as direct fields, so one will receive warnings for uninitialized inherited data members as well.

// With Pedantic and CheckPointeeInitialization set to true

struct A {
  struct B {
    int x; // note: uninitialized field 'this->b.x'
    // note: uninitialized field 'this->bptr->x'
    int y; // note: uninitialized field 'this->b.y'
    // note: uninitialized field 'this->bptr->y'
  };
  int \*iptr; // note: uninitialized pointer 'this->iptr'
  B b;
  B \*bptr;
  char \*cptr; // note: uninitialized pointee 'this->cptr'

  A (B \*bptr, char \*cptr) : bptr(bptr), cptr(cptr) {}
};

void f() {
  A::B b;
  char c;
  A a(&b, &c); // warning: 6 uninitialized fields
 //          after the constructor call
}

// With Pedantic set to false and
// CheckPointeeInitialization set to true
// (every field is uninitialized)

struct A {
  struct B {
    int x;
    int y;
  };
  int \*iptr;
  B b;
  B \*bptr;
  char \*cptr;

  A (B \*bptr, char \*cptr) : bptr(bptr), cptr(cptr) {}
};

void f() {
  A::B b;
  char c;
  A a(&b, &c); // no warning
}

// With Pedantic set to true and
// CheckPointeeInitialization set to false
// (pointees are regarded as initialized)

struct A {
  struct B {
    int x; // note: uninitialized field 'this->b.x'
    int y; // note: uninitialized field 'this->b.y'
  };
  int \*iptr; // note: uninitialized pointer 'this->iptr'
  B b;
  B \*bptr;
  char \*cptr;

  A (B \*bptr, char \*cptr) : bptr(bptr), cptr(cptr) {}
};

void f() {
  A::B b;
  char c;
  A a(&b, &c); // warning: 3 uninitialized fields
 //          after the constructor call
}

**Options**

This checker has several options which can be set from command line (e.g. `-analyzer-config optin.cplusplus.UninitializedObject:Pedantic=true`):

*   `Pedantic` (boolean). If to false, the checker won’t emit warnings for objects that don’t have at least one initialized field. Defaults to false.
    
*   `NotesAsWarnings` (boolean). If set to true, the checker will emit a warning for each uninitialized field, as opposed to emitting one warning per constructor call, and listing the uninitialized fields that belongs to it in notes. _Defaults to false_.
    
*   `CheckPointeeInitialization` (boolean). If set to false, the checker will not analyze the pointee of pointer/reference fields, and will only check whether the object itself is initialized. _Defaults to false_.
    
*   `IgnoreRecordsWithField` (string). If supplied, the checker will not analyze structures that have a field with a name or type name that matches the given pattern. _Defaults to “”_.
    

#### [1.1.5.3. optin.cplusplus.VirtualCall (C++)](#id73)[¶](#optin-cplusplus-virtualcall-c "Link to this heading")

When [virtual methods are called during construction and destruction](https://en.cppreference.com/w/cpp/language/virtual#During_construction_and_destruction) the polymorphism is restricted to the class that’s being constructed or destructed because the more derived contexts are either not yet initialized or already destructed.

Although this behavior is well-defined, it can surprise the programmer and cause unintended behavior, so this checker reports calls that appear to be virtual calls but can be affected by this restricted polymorphism.

Note that situations where this restricted polymorphism causes a call to a pure virtual method (which is definitely invalid, triggers undefined behavior) are **reported by another checker:** [cplusplus.PureVirtualCall (C++)](#cplusplus-purevirtualcall) and **this checker does not report them**.

struct A {
  virtual int getKind();

  A() {
    // warn: This calls A::getKind() even if we are constructing an instance
    // of a different class that is derived from A.
    log << "Constructing " << getKind();
  }
  virtual ~A() {
    releaseResources();
  }
  void releaseResources() {
    // warn: This can be called within ~A() and calls A::getKind() even if
    // we are destructing a class that is derived from A.
    callSomeFunction(getKind());
  }
};

#### [1.1.5.4. optin.mpi.MPI-Checker (C)](#id74)[¶](#optin-mpi-mpi-checker-c "Link to this heading")

Checks MPI code.

void test() {
  double buf \= 0;
  MPI\_Request sendReq1;
  MPI\_Ireduce(MPI\_IN\_PLACE, &buf, 1, MPI\_DOUBLE, MPI\_SUM,
      0, MPI\_COMM\_WORLD, &sendReq1);
} // warn: request 'sendReq1' has no matching wait.

void test() {
  double buf \= 0;
  MPI\_Request sendReq;
  MPI\_Isend(&buf, 1, MPI\_DOUBLE, 0, 0, MPI\_COMM\_WORLD, &sendReq);
  MPI\_Irecv(&buf, 1, MPI\_DOUBLE, 0, 0, MPI\_COMM\_WORLD, &sendReq); // warn
  MPI\_Isend(&buf, 1, MPI\_DOUBLE, 0, 0, MPI\_COMM\_WORLD, &sendReq); // warn
  MPI\_Wait(&sendReq, MPI\_STATUS\_IGNORE);
}

void missingNonBlocking() {
  int rank \= 0;
  MPI\_Comm\_rank(MPI\_COMM\_WORLD, &rank);
  MPI\_Request sendReq1\[10\]\[10\]\[10\];
  MPI\_Wait(&sendReq1\[1\]\[7\]\[9\], MPI\_STATUS\_IGNORE); // warn
}

#### [1.1.5.5. optin.osx.cocoa.localizability.EmptyLocalizationContextChecker (ObjC)](#id75)[¶](#optin-osx-cocoa-localizability-emptylocalizationcontextchecker-objc "Link to this heading")

Check that NSLocalizedString macros include a comment for context.

\- (void)test {
  NSString \*string \= NSLocalizedString(@"LocalizedString", nil); // warn
  NSString \*string2 \= NSLocalizedString(@"LocalizedString", @" "); // warn
  NSString \*string3 \= NSLocalizedStringWithDefaultValue(
    @"LocalizedString", nil, \[\[NSBundle alloc\] init\], nil,@""); // warn
}

#### [1.1.5.6. optin.osx.cocoa.localizability.NonLocalizedStringChecker (ObjC)](#id76)[¶](#optin-osx-cocoa-localizability-nonlocalizedstringchecker-objc "Link to this heading")

Warns about uses of non-localized NSStrings passed to UI methods expecting localized NSStrings.

NSString \*alarmText \=
  NSLocalizedString(@"Enabled", @"Indicates alarm is turned on");
if (!isEnabled) {
  alarmText \= @"Disabled";
}
UILabel \*alarmStateLabel \= \[\[UILabel alloc\] init\];

// Warning: User-facing text should use localized string macro
\[alarmStateLabel setText:alarmText\];

#### [1.1.5.7. optin.performance.GCDAntipattern](#id77)[¶](#optin-performance-gcdantipattern "Link to this heading")

Check for performance anti-patterns when using Grand Central Dispatch.

#### [1.1.5.8. optin.performance.Padding (C, C++, ObjC)](#id78)[¶](#optin-performance-padding-c-c-objc "Link to this heading")

Check for excessively padded structs.

This checker detects structs with excessive padding, which can lead to wasted memory thus decreased performance by reducing the effectiveness of the processor cache. Padding bytes are added by compilers to align data accesses as some processors require data to be aligned to certain boundaries. On others, unaligned data access are possible, but impose significantly larger latencies.

To avoid padding bytes, the fields of a struct should be ordered by decreasing by alignment. Usually, its easier to think of the `sizeof` of the fields, and ordering the fields by `sizeof` would usually also lead to the same optimal layout.

In rare cases, one can use the `#pragma pack(1)` directive to enforce a packed layout too, but it can significantly increase the access times, so reordering the fields is usually a better solution.

// warn: Excessive padding in 'struct NonOptimal' (35 padding bytes, where 3 is optimal)
struct NonOptimal {
  char c1;
  // 7 bytes of padding
  std::int64\_t big1; // 8 bytes
  char c2;
  // 7 bytes of padding
  std::int64\_t big2; // 8 bytes
  char c3;
  // 7 bytes of padding
  std::int64\_t big3; // 8 bytes
  char c4;
  // 7 bytes of padding
  std::int64\_t big4; // 8 bytes
  char c5;
  // 7 bytes of padding
};
static\_assert(sizeof(NonOptimal) \== 4\*8+5+5\*7);

// no-warning: The fields are nicely aligned to have the minimal amount of padding bytes.
struct Optimal {
  std::int64\_t big1; // 8 bytes
  std::int64\_t big2; // 8 bytes
  std::int64\_t big3; // 8 bytes
  std::int64\_t big4; // 8 bytes
  char c1;
  char c2;
  char c3;
  char c4;
  char c5;
  // 3 bytes of padding
};
static\_assert(sizeof(Optimal) \== 4\*8+5+3);

// no-warning: Bit packing representation is also accepted by this checker, but
// it can significantly increase access times, so prefer reordering the fields.
#pragma pack(1)
struct BitPacked {
  char c1;
  std::int64\_t big1; // 8 bytes
  char c2;
  std::int64\_t big2; // 8 bytes
  char c3;
  std::int64\_t big3; // 8 bytes
  char c4;
  std::int64\_t big4; // 8 bytes
  char c5;
};
static\_assert(sizeof(BitPacked) \== 4\*8+5);

The `AllowedPad` option can be used to specify a threshold for the number padding bytes raising the warning. If the number of padding bytes of the struct and the optimal number of padding bytes differ by more than the threshold value, a warning will be raised.

By default, the `AllowedPad` threshold is 24 bytes.

To override this threshold to e.g. 4 bytes, use the `-analyzer-config optin.performance.Padding:AllowedPad=4` option.

#### [1.1.5.9. optin.portability.UnixAPI](#id79)[¶](#optin-portability-unixapi "Link to this heading")

Reports situations where 0 is passed as the “size” argument of various allocation functions ( `calloc`, `malloc`, `realloc`, `reallocf`, `alloca`, `__builtin_alloca`, `__builtin_alloca_with_align`, `valloc`).

Note that similar functionality is also supported by [unix.Malloc (C)](#unix-malloc) which reports code that _uses_ memory allocated with size zero.

(The name of this checker is motivated by the fact that it was originally introduced with the vague goal that it “Finds implementation-defined behavior in UNIX/Posix functions.”)

### [1.1.6. optin.taint](#id80)[¶](#optin-taint "Link to this heading")

Checkers implementing [taint analysis](https://en.wikipedia.org/wiki/Taint_checking).

#### [1.1.6.1. optin.taint.GenericTaint (C, C++)](#id81)[¶](#optin-taint-generictaint-c-c "Link to this heading")

Taint analysis identifies potential security vulnerabilities where the attacker can inject malicious data to the program to execute an attack (privilege escalation, command injection, SQL injection etc.).

The malicious data is injected at the taint source (e.g. `getenv()` call) which is then propagated through function calls and being used as arguments of sensitive operations, also called as taint sinks (e.g. `system()` call).

One can defend against this type of vulnerability by always checking and sanitizing the potentially malicious, untrusted user input.

The goal of the checker is to discover and show to the user these potential taint source-sink pairs and the propagation call chain.

The most notable examples of taint sources are:

> *   data from network
>     
> *   files or standard input
>     
> *   environment variables
>     
> *   data from databases
>     

Let us examine a practical example of a Command Injection attack.

// Command Injection Vulnerability Example
int main(int argc, char\*\* argv) {
  char cmd\[2048\] \= "/bin/cat ";
  char filename\[1024\];
  printf("Filename:");
  scanf (" %1023\[^\\n\]", filename); // The attacker can inject a shell escape here
  strcat(cmd, filename);
  system(cmd); // Warning: Untrusted data is passed to a system call
}

The program prints the content of any user specified file. Unfortunately the attacker can execute arbitrary commands with shell escapes. For example with the following input the ls command is also executed after the contents of /etc/shadow is printed. Input: /etc/shadow ; ls /

The analysis implemented in this checker points out this problem.

One can protect against such attack by for example checking if the provided input refers to a valid file and removing any invalid user input.

// No vulnerability anymore, but we still get the warning
void sanitizeFileName(char\* filename){
  if (access(filename,F\_OK)){// Verifying user input
    printf("File does not exist\\n");
    filename\[0\]\='\\0';
    }
}
int main(int argc, char\*\* argv) {
  char cmd\[2048\] \= "/bin/cat ";
  char filename\[1024\];
  printf("Filename:");
  scanf (" %1023\[^\\n\]", filename); // The attacker can inject a shell escape here
  sanitizeFileName(filename);// filename is safe after this point
  if (!filename\[0\])
    return \-1;
  strcat(cmd, filename);
  system(cmd); // Superfluous Warning: Untrusted data is passed to a system call
}

Unfortunately, the checker cannot discover automatically that the programmer have performed data sanitation, so it still emits the warning.

One can get rid of this superfluous warning by telling by specifying the sanitation functions in the taint configuration file (see [Taint Analysis Configuration](https://clang.llvm.org/docs/analyzer/user-docs/TaintAnalysisConfiguration.html)).

Filters:
\- Name: sanitizeFileName
  Args: \[0\]

The clang invocation to pass the configuration file location:

clang  \--analyze \-Xclang \-analyzer-config  \-Xclang optin.taint.TaintPropagation:Config\=\`pwd\`/taint\_config.yml ...

If you are validating your inputs instead of sanitizing them, or don’t want to mention each sanitizing function in our configuration, you can use a more generic approach.

Introduce a generic no-op csa\_mark\_sanitized(..) function to tell the Clang Static Analyzer that the variable is safe to be used on that analysis path.

// Marking sanitized variables safe.
// No vulnerability anymore, no warning.

// User csa\_mark\_sanitize function is for the analyzer only
#ifdef \_\_clang\_analyzer\_\_
  void csa\_mark\_sanitized(const void \*);
#endif

int main(int argc, char\*\* argv) {
  char cmd\[2048\] \= "/bin/cat ";
  char filename\[1024\];
  printf("Filename:");
  scanf (" %1023\[^\\n\]", filename);
  if (access(filename,F\_OK)){// Verifying user input
    printf("File does not exist\\n");
    return \-1;
  }
  #ifdef \_\_clang\_analyzer\_\_
    csa\_mark\_sanitized(filename); // Indicating to CSA that filename variable is safe to be used after this point
  #endif
  strcat(cmd, filename);
  system(cmd); // No warning
}

Similarly to the previous example, you need to define a Filter function in a YAML configuration file and add the csa\_mark\_sanitized function.

Filters:
\- Name: csa\_mark\_sanitized
  Args: \[0\]

Then calling csa\_mark\_sanitized(X) will tell the analyzer that X is safe to be used after this point, because its contents are verified. It is the responsibility of the programmer to ensure that this verification was indeed correct. Please note that csa\_mark\_sanitized function is only declared and used during Clang Static Analysis and skipped in (production) builds.

Further examples of injection vulnerabilities this checker can find.

void test() {
  char x \= getchar(); // 'x' marked as tainted
  system(&x); // warn: untrusted data is passed to a system call
}

// note: compiler internally checks if the second param to
// sprintf is a string literal or not.
// Use -Wno-format-security to suppress compiler warning.
void test() {
  char s\[10\], buf\[10\];
  fscanf(stdin, "%s", s); // 's' marked as tainted

  sprintf(buf, s); // warn: untrusted data used as a format string
}

There are built-in sources, propagations and sinks even if no external taint configuration is provided.

Default sources:

`_IO_getc`, `fdopen`, `fopen`, `freopen`, `get_current_dir_name`, `getch`, `getchar`, `getchar_unlocked`, `getwd`, `getcwd`, `getgroups`, `gethostname`, `getlogin`, `getlogin_r`, `getnameinfo`, `gets`, `gets_s`, `getseuserbyname`, `readlink`, `readlinkat`, `scanf`, `scanf_s`, `socket`, `wgetch`

Default propagations rules:

`atoi`, `atol`, `atoll`, `basename`, `dirname`, `fgetc`, `fgetln`, `fgets`, `fnmatch`, `fread`, `fscanf`, `fscanf_s`, `index`, `inflate`, `isalnum`, `isalpha`, `isascii`, `isblank`, `iscntrl`, `isdigit`, `isgraph`, `islower`, `isprint`, `ispunct`, `isspace`, `isupper`, `isxdigit`, `memchr`, `memrchr`, `sscanf`, `getc`, `getc_unlocked`, `getdelim`, `getline`, `getw`, `memcmp`, `memcpy`, `memmem`, `memmove`, `mbtowc`, `pread`, `qsort`, `qsort_r`, `rawmemchr`, `read`, `recv`, `recvfrom`, `rindex`, `strcasestr`, `strchr`, `strchrnul`, `strcasecmp`, `strcmp`, `strcspn`, `strncasecmp`, `strncmp`, `strndup`, `strndupa`, `strpbrk`, `strrchr`, `strsep`, `strspn`, `strstr`, `strtol`, `strtoll`, `strtoul`, `strtoull`, `tolower`, `toupper`, `ttyname`, `ttyname_r`, `wctomb`, `wcwidth`

Default sinks:

`printf`, `setproctitle`, `system`, `popen`, `execl`, `execle`, `execlp`, `execv`, `execvp`, `execvP`, `execve`, `dlopen`

Please note that there are no built-in filter functions.

One can configure their own taint sources, sinks, and propagation rules by providing a configuration file via checker option `optin.taint.TaintPropagation:Config`. The configuration file is in [YAML](http://llvm.org/docs/YamlIO.html#introduction-to-yaml) format. The taint-related options defined in the config file extend but do not override the built-in sources, rules, sinks. The format of the external taint configuration file is not stable, and could change without any notice even in a non-backward compatible way.

For a more detailed description of configuration options, please see the [Taint Analysis Configuration](https://clang.llvm.org/docs/analyzer/user-docs/TaintAnalysisConfiguration.html). For an example see [Example configuration file](https://clang.llvm.org/docs/analyzer/user-docs/TaintAnalysisConfiguration.html#clangsa-taint-configuration-example).

**Configuration**

*   Config Specifies the name of the YAML configuration file. The user can define their own taint sources and sinks.
    

**Related Guidelines**

*   [CWE Data Neutralization Issues](https://cwe.mitre.org/data/definitions/137.html)
    
*   [SEI Cert STR02-C. Sanitize data passed to complex subsystems](https://wiki.sei.cmu.edu/confluence/display/c/STR02-C.+Sanitize+data+passed+to+complex+subsystems)
    
*   [SEI Cert ENV33-C. Do not call system()](https://wiki.sei.cmu.edu/confluence/pages/viewpage.action?pageId=87152177)
    
*   [ENV03-C. Sanitize the environment when invoking external programs](https://wiki.sei.cmu.edu/confluence/display/c/ENV03-C.+Sanitize+the+environment+when+invoking+external+programs)
    

**Limitations**

*   The taintedness property is not propagated through function calls which are unknown (or too complex) to the analyzer, unless there is a specific propagation rule built-in to the checker or given in the YAML configuration file. This causes potential true positive findings to be lost.
    

#### [1.1.6.2. optin.taint.TaintedAlloc (C, C++)](#id82)[¶](#optin-taint-taintedalloc-c-c "Link to this heading")

This checker warns for cases when the `size` parameter of the `malloc` , `calloc`, `realloc`, `alloca` or the size parameter of the array new C++ operator is tainted (potentially attacker controlled). If an attacker can inject a large value as the size parameter, memory exhaustion denial of service attack can be carried out.

The analyzer emits warning only if it cannot prove that the size parameter is within reasonable bounds (`<= SIZE_MAX/4`). This functionality partially covers the SEI Cert coding standard rule [INT04-C](https://wiki.sei.cmu.edu/confluence/display/c/INT04-C.+Enforce+limits+on+integer+values+originating+from+tainted+sources).

You can silence this warning either by bound checking the `size` parameter, or by explicitly marking the `size` parameter as sanitized. See the [optin.taint.GenericTaint (C, C++)](#optin-taint-generictaint) checker for an example.

Custom allocation/deallocation functions can be defined using [ownership attributes](https://clang.llvm.org/docs/AttributeReference.html#analyzer-ownership-attrs).

void vulnerable(void) {
  size\_t size \= 0;
  scanf("%zu", &size);
  int \*p \= malloc(size); // warn: malloc is called with a tainted (potentially attacker controlled) value
  free(p);
}

void not\_vulnerable(void) {
  size\_t size \= 0;
  scanf("%zu", &size);
  if (1024 < size)
    return;
  int \*p \= malloc(size); // No warning expected as the the user input is bound
  free(p);
}

void vulnerable\_cpp(void) {
  size\_t size \= 0;
  scanf("%zu", &size);
  int \*ptr \= new int\[size\];// warn: Memory allocation function is called with a tainted (potentially attacker controlled) value
  delete\[\] ptr;
}

#### [1.1.6.3. optin.taint.TaintedDiv (C, C++, ObjC)](#id83)[¶](#optin-taint-tainteddiv-c-c-objc "Link to this heading")

This checker warns when the denominator in a division operation is a tainted (potentially attacker controlled) value. If the attacker can set the denominator to 0, a runtime error can be triggered. The checker warns when the denominator is a tainted value and the analyzer cannot prove that it is not 0. This warning is more pessimistic than the [core.DivideZero (C, C++, ObjC)](#core-dividezero) checker which warns only when it can prove that the denominator is 0.

int vulnerable(int n) {
  size\_t size \= 0;
  scanf("%zu", &size);
  return n / size; // warn: Division by a tainted value, possibly zero
}

int not\_vulnerable(int n) {
  size\_t size \= 0;
  scanf("%zu", &size);
  if (!size)
    return 0;
  return n / size; // no warning
}

### [1.1.7. security](#id84)[¶](#security "Link to this heading")

Security related checkers.

#### [1.1.7.1. security.ArrayBound (C, C++)](#id85)[¶](#security-arraybound-c-c "Link to this heading")

Report out of bounds access to memory that is before the start or after the end of the accessed region (array, heap-allocated region, string literal etc.). This usually means incorrect indexing, but the checker also detects access via the operators `*` and `->`.

void test\_underflow(int x) {
  int buf\[100\]\[100\];
  if (x < 0)
    buf\[0\]\[x\] \= 1; // warn
}

void test\_overflow() {
  int buf\[100\];
  int \*p \= buf + 100;
  \*p \= 1; // warn
}

If checkers like [unix.Malloc (C)](#unix-malloc) or [cplusplus.NewDelete (C++)](#cplusplus-newdelete) are enabled to model the behavior of `malloc()`, `operator new` and similar allocators), then this checker can also reports out of bounds access to dynamically allocated memory:

int \*test\_dynamic() {
  int \*mem \= new int\[100\];
  mem\[\-1\] \= 42; // warn
  return mem;
}

In uncertain situations (when the checker can neither prove nor disprove that overflow occurs), the checker assumes that the the index (more precisely, the memory offeset) is within bounds.

However, if [optin.taint.GenericTaint (C, C++)](#optin-taint-generictaint) is enabled and the index/offset is tainted (i.e. it is influenced by an untrusted source), then this checker reports the potential out of bounds access:

void test\_with\_tainted\_index() {
  char s\[\] \= "abc";
  int x \= getchar();
  char c \= s\[x\]; // warn: potential out of bounds access with tainted index
}

Note

This checker is an improved and renamed version of the checker that was previously known as `alpha.security.ArrayBoundV2`. The old checker `alpha.security.ArrayBound` was removed when the (previously “experimental”) V2 variant became stable enough for regular use.

#### [1.1.7.2. security.cert.env.InvalidPtr](#id86)[¶](#security-cert-env-invalidptr "Link to this heading")

Corresponds to SEI CERT Rules [ENV31-C](https://wiki.sei.cmu.edu/confluence/display/c/ENV31-C.+Do+not+rely+on+an+environment+pointer+following+an+operation+that+may+invalidate+it) and [ENV34-C](https://wiki.sei.cmu.edu/confluence/display/c/ENV34-C.+Do+not+store+pointers+returned+by+certain+functions).

*   **ENV31-C**: Rule is about the possible problem with `main` function’s third argument, environment pointer, “envp”. When environment array is modified using some modification function such as `putenv`, `setenv` or others, It may happen that memory is reallocated, however “envp” is not updated to reflect the changes and points to old memory region.
    
*   **ENV34-C**: Some functions return a pointer to a statically allocated buffer. Consequently, subsequent call of these functions will invalidate previous pointer. These functions include: `getenv`, `localeconv`, `asctime`, `setlocale`, `strerror`
    

int main(int argc, const char \*argv\[\], const char \*envp\[\]) {
  if (setenv("MY\_NEW\_VAR", "new\_value", 1) != 0) {
    // setenv call may invalidate 'envp'
    /\* Handle error \*/
  }
  if (envp != NULL) {
    for (size\_t i \= 0; envp\[i\] != NULL; ++i) {
      puts(envp\[i\]);
      // envp may no longer point to the current environment
      // this program has unanticipated behavior, since envp
      // does not reflect changes made by setenv function.
    }
  }
  return 0;
}

void previous\_call\_invalidation() {
  char \*p, \*pp;

  p \= getenv("VAR");
  setenv("SOMEVAR", "VALUE", /\*overwrite = \*/1);
  // call to 'setenv' may invalidate p

  \*p;
  // dereferencing invalid pointer
}

The `InvalidatingGetEnv` option is available for treating `getenv` calls as invalidating. When enabled, the checker issues a warning if `getenv` is called multiple times and their results are used without first creating a copy. This level of strictness might be considered overly pedantic for the commonly used `getenv` implementations.

To enable this option, use: `-analyzer-config security.cert.env.InvalidPtr:InvalidatingGetEnv=true`.

By default, this option is set to _false_.

When this option is enabled, warnings will be generated for scenarios like the following:

char\* p \= getenv("VAR");
char\* pp \= getenv("VAR2"); // assumes this call can invalidate \`env\`
strlen(p); // warns about accessing invalid ptr

#### [1.1.7.3. security.FloatLoopCounter (C)](#id87)[¶](#security-floatloopcounter-c "Link to this heading")

Warn on using a floating point value as a loop counter (CERT: FLP30-C, FLP30-CPP).

void test() {
  for (float x \= 0.1f; x <= 1.0f; x += 0.1f) {} // warn
}

#### [1.1.7.4. security.insecureAPI.UncheckedReturn (C)](#id88)[¶](#security-insecureapi-uncheckedreturn-c "Link to this heading")

Warn on uses of functions whose return values must be always checked.

void test() {
  setuid(1); // warn
}

#### [1.1.7.5. security.insecureAPI.bcmp (C)](#id89)[¶](#security-insecureapi-bcmp-c "Link to this heading")

Warn on uses of the ‘bcmp’ function.

void test() {
  bcmp(ptr0, ptr1, n); // warn
}

#### [1.1.7.6. security.insecureAPI.bcopy (C)](#id90)[¶](#security-insecureapi-bcopy-c "Link to this heading")

Warn on uses of the ‘bcopy’ function.

void test() {
  bcopy(src, dst, n); // warn
}

#### [1.1.7.7. security.insecureAPI.bzero (C)](#id91)[¶](#security-insecureapi-bzero-c "Link to this heading")

Warn on uses of the ‘bzero’ function.

void test() {
  bzero(ptr, n); // warn
}

#### [1.1.7.8. security.insecureAPI.getpw (C)](#id92)[¶](#security-insecureapi-getpw-c "Link to this heading")

Warn on uses of the ‘getpw’ function.

void test() {
  char buff\[1024\];
  getpw(2, buff); // warn
}

#### [1.1.7.9. security.insecureAPI.gets (C)](#id93)[¶](#security-insecureapi-gets-c "Link to this heading")

Warn on uses of the ‘gets’ function.

void test() {
  char buff\[1024\];
  gets(buff); // warn
}

#### [1.1.7.10. security.insecureAPI.mkstemp (C)](#id94)[¶](#security-insecureapi-mkstemp-c "Link to this heading")

Warn when ‘mkstemp’ is passed fewer than 6 X’s in the format string.

void test() {
  mkstemp("XX"); // warn
}

#### [1.1.7.11. security.insecureAPI.mktemp (C)](#id95)[¶](#security-insecureapi-mktemp-c "Link to this heading")

Warn on uses of the `mktemp` function.

void test() {
  char \*x \= mktemp("/tmp/zxcv"); // warn: insecure, use mkstemp
}

#### [1.1.7.12. security.insecureAPI.rand (C)](#id96)[¶](#security-insecureapi-rand-c "Link to this heading")

Warn on uses of inferior random number generating functions (only if arc4random function is available): `drand48, erand48, jrand48, lcong48, lrand48, mrand48, nrand48, random, rand_r`.

void test() {
  random(); // warn
}

#### [1.1.7.13. security.insecureAPI.strcpy (C)](#id97)[¶](#security-insecureapi-strcpy-c "Link to this heading")

Warn on uses of the `strcpy` and `strcat` functions.

void test() {
  char x\[4\];
  char \*y \= "abcd";

  strcpy(x, y); // warn
}

#### [1.1.7.14. security.insecureAPI.vfork (C)](#id98)[¶](#security-insecureapi-vfork-c "Link to this heading")

> Warn on uses of the ‘vfork’ function.

void test() {
  vfork(); // warn
}

#### [1.1.7.15. security.insecureAPI.DeprecatedOrUnsafeBufferHandling (C)](#id99)[¶](#security-insecureapi-deprecatedorunsafebufferhandling-c "Link to this heading")

> Warn on occurrences of unsafe or deprecated buffer handling functions, which now have a secure variant: `sprintf, fprintf, vsprintf, scanf, wscanf, fscanf, fwscanf, vscanf, vwscanf, vfscanf, vfwscanf, sscanf, swscanf, vsscanf, vswscanf, swprintf, snprintf, vswprintf, vsnprintf, memcpy, memmove, strncpy, strncat, memset`

void test() {
  char buf \[5\];
  strncpy(buf, "a", 1); // warn
}

#### [1.1.7.16. security.MmapWriteExec (C)](#id100)[¶](#security-mmapwriteexec-c "Link to this heading")

Warn on `mmap()` calls with both writable and executable access.

void test(int n) {
  void \*c \= mmap(NULL, 32, PROT\_READ | PROT\_WRITE | PROT\_EXEC,
                 MAP\_PRIVATE | MAP\_ANON, \-1, 0);
  // warn: Both PROT\_WRITE and PROT\_EXEC flags are set. This can lead to
  //       exploitable memory regions, which could be overwritten with malicious
  //       code
}

#### [1.1.7.17. security.PointerSub (C)](#id101)[¶](#security-pointersub-c "Link to this heading")

Check for pointer subtractions on two pointers pointing to different memory chunks. According to the C standard §6.5.6 only subtraction of pointers that point into (or one past the end) the same array object is valid (for this purpose non-array variables are like arrays of size 1). This checker only searches for different memory objects at subtraction, but does not check if the array index is correct. Furthermore, only cases are reported where stack-allocated objects are involved (no warnings on pointers to memory allocated by malloc).

void test() {
  int a, b, c\[10\], d\[10\];
  int x \= &c\[3\] \- &c\[1\];
  x \= &d\[4\] \- &c\[1\]; // warn: 'c' and 'd' are different arrays
  x \= (&a + 1) \- &a;
  x \= &b \- &a; // warn: 'a' and 'b' are different variables
}

struct S {
  int x\[10\];
  int y\[10\];
};

void test1() {
  struct S a\[10\];
  struct S b;
  int d \= &a\[4\] \- &a\[6\];
  d \= &a\[0\].x\[3\] \- &a\[0\].x\[1\];
  d \= a\[0\].y \- a\[0\].x; // warn: 'S.b' and 'S.a' are different objects
  d \= (char \*)&b.y \- (char \*)&b.x; // warn: different members of the same object
  d \= (char \*)&b.y \- (char \*)&b; // warn: object of type S is not the same array as a member of it
}

There may be existing applications that use code like above for calculating offsets of members in a structure, using pointer subtractions. This is still undefined behavior according to the standard and code like this can be replaced with the offsetof macro.

#### [1.1.7.18. security.PutenvStackArray (C)](#id102)[¶](#security-putenvstackarray-c "Link to this heading")

Finds calls to the `putenv` function which pass a pointer to a stack-allocated (automatic) array as the argument. Function `putenv` does not copy the passed string, only a pointer to the data is stored and this data can be read even by other threads. Content of a stack-allocated array is likely to be overwritten after exiting from the function.

The problem can be solved by using a static array variable or dynamically allocated memory. Even better is to avoid using `putenv` (it has other problems related to memory leaks) and use `setenv` instead.

The check corresponds to CERT rule [POS34-C. Do not call putenv() with a pointer to an automatic variable as the argument](https://wiki.sei.cmu.edu/confluence/display/c/POS34-C.+Do+not+call+putenv%28%29+with+a+pointer+to+an+automatic+variable+as+the+argument).

int f() {
  char env\[\] \= "NAME=value";
  return putenv(env); // putenv function should not be called with stack-allocated string
}

There is one case where the checker can report a false positive. This is when the stack-allocated array is used at putenv in a function or code branch that does not return (process is terminated on all execution paths).

Another special case is if the putenv is called from function main. Here the stack is deallocated at the end of the program and it should be no problem to use the stack-allocated string (a multi-threaded program may require more attention). The checker does not warn for cases when stack space of main is used at the putenv call.

#### [1.1.7.19. security.SetgidSetuidOrder (C)](#id103)[¶](#security-setgidsetuidorder-c "Link to this heading")

When dropping user-level and group-level privileges in a program by using `setuid` and `setgid` calls, it is important to reset the group-level privileges (with `setgid`) first. Function `setgid` will likely fail if the superuser privileges are already dropped.

The checker checks for sequences of `setuid(getuid())` and `setgid(getgid())` calls (in this order). If such a sequence is found and there is no other privilege-changing function call (`seteuid`, `setreuid`, `setresuid` and the GID versions of these) in between, a warning is generated. The checker finds only exactly `setuid(getuid())` calls (and the GID versions), not for example if the result of `getuid()` is stored in a variable.

void test1() {
  // ...
  // end of section with elevated privileges
  // reset privileges (user and group) to normal user
  if (setuid(getuid()) != 0) {
    handle\_error();
    return;
  }
  if (setgid(getgid()) != 0) { // warning: A 'setgid(getgid())' call following a 'setuid(getuid())' call is likely to fail
    handle\_error();
    return;
  }
  // user-ID and group-ID are reset to normal user now
  // ...
}

In the code above the problem is that `setuid(getuid())` removes superuser privileges before `setgid(getgid())` is called. To fix the problem the `setgid(getgid())` should be called first. Further attention is needed to avoid code like `setgid(getuid())` (this checker does not detect bugs like this) and always check the return value of these calls.

This check corresponds to SEI CERT Rule [POS36-C](https://wiki.sei.cmu.edu/confluence/display/c/POS36-C.+Observe+correct+revocation+order+while+relinquishing+privileges).

### [1.1.8. unix](#id104)[¶](#unix "Link to this heading")

POSIX/Unix checkers.

#### [1.1.8.1. unix.API (C)](#id105)[¶](#unix-api-c "Link to this heading")

Check calls to various UNIX/Posix functions: `open, pthread_once, calloc, malloc, realloc, alloca`.

// Currently the check is performed for apple targets only.
void test(const char \*path) {
  int fd \= open(path, O\_CREAT);
    // warn: call to 'open' requires a third argument when the
    // 'O\_CREAT' flag is set
}

void f();

void test() {
  pthread\_once\_t pred \= {0x30B1BCBA, {0}};
  pthread\_once(&pred, f);
    // warn: call to 'pthread\_once' uses the local variable
}

void test() {
  void \*p \= malloc(0); // warn: allocation size of 0 bytes
}

void test() {
  void \*p \= calloc(0, 42); // warn: allocation size of 0 bytes
}

void test() {
  void \*p \= malloc(1);
  p \= realloc(p, 0); // warn: allocation size of 0 bytes
}

void test() {
  void \*p \= alloca(0); // warn: allocation size of 0 bytes
}

void test() {
  void \*p \= valloc(0); // warn: allocation size of 0 bytes
}

#### [1.1.8.2. unix.BlockInCriticalSection (C, C++)](#id106)[¶](#unix-blockincriticalsection-c-c "Link to this heading")

Check for calls to blocking functions inside a critical section. Blocking functions detected by this checker: `sleep, getc, fgets, read, recv`. Critical section handling functions modeled by this checker: `lock, unlock, pthread_mutex_lock, pthread_mutex_trylock, pthread_mutex_unlock, mtx_lock, mtx_timedlock, mtx_trylock, mtx_unlock, lock_guard, unique_lock`.

void pthread\_lock\_example(pthread\_mutex\_t \*m) {
  pthread\_mutex\_lock(m); // note: entering critical section here
  sleep(10); // warn: Call to blocking function 'sleep' inside of critical section
  pthread\_mutex\_unlock(m);
}

void overlapping\_critical\_sections(mtx\_t \*m1, std::mutex &m2) {
  std::lock\_guard lg{m2}; // note: entering critical section here
  mtx\_lock(m1); // note: entering critical section here
  sleep(10); // warn: Call to blocking function 'sleep' inside of critical section
  mtx\_unlock(m1);
  sleep(10); // warn: Call to blocking function 'sleep' inside of critical section
             // still inside of the critical section of the std::lock\_guard
}

**Limitations**

*   The `trylock` and `timedlock` versions of acquiring locks are currently assumed to always succeed. This can lead to false positives.
    

void trylock\_example(pthread\_mutex\_t \*m) {
  if (pthread\_mutex\_trylock(m) \== 0) { // assume trylock always succeeds
    sleep(10); // warn: Call to blocking function 'sleep' inside of critical section
    pthread\_mutex\_unlock(m);
  } else {
    sleep(10); // false positive: Incorrect warning about blocking function inside critical section.
  }
}

#### [1.1.8.3. unix.Chroot (C)](#id107)[¶](#unix-chroot-c "Link to this heading")

Check improper use of chroot described by SEI Cert C recommendation [POS05-C. Limit access to files by creating a jail](https://wiki.sei.cmu.edu/confluence/display/c/POS05-C.+Limit+access+to+files+by+creating+a+jail). The checker finds usage patterns where `chdir("/")` is not called immediately after a call to `chroot(path)`.

void f();

void test\_bad() {
  chroot("/usr/local");
  f(); // warn: no call of chdir("/") immediately after chroot
}

 void test\_bad\_path() {
   chroot("/usr/local");
   chdir("/usr"); // warn: no call of chdir("/") immediately after chroot
   f();
 }

void test\_good() {
  chroot("/usr/local");
  chdir("/"); // no warning
  f();
}

#### [1.1.8.4. unix.Errno (C)](#id108)[¶](#unix-errno-c "Link to this heading")

Check for improper use of `errno`. This checker implements partially CERT rule [ERR30-C. Set errno to zero before calling a library function known to set errno, and check errno only after the function returns a value indicating failure](https://wiki.sei.cmu.edu/confluence/pages/viewpage.action?pageId=87152351). The checker can find the first read of `errno` after successful standard function calls.

The C and POSIX standards often do not define if a standard library function may change value of `errno` if the call does not fail. Therefore, `errno` should only be used if it is known from the return value of a function that the call has failed. There are exceptions to this rule (for example `strtol`) but the affected functions are not yet supported by the checker. The return values for the failure cases are documented in the standard Linux man pages of the functions and in the [POSIX standard](https://pubs.opengroup.org/onlinepubs/9699919799/).

int unsafe\_errno\_read(int sock, void \*data, int data\_size) {
  if (send(sock, data, data\_size, 0) != data\_size) {
    // 'send' can be successful even if not all data was sent
    if (errno \== 1) { // An undefined value may be read from 'errno'
      return 0;
    }
  }
  return 1;
}

The checker [unix.StdCLibraryFunctions (C)](#unix-stdclibraryfunctions) must be turned on to get the warnings from this checker. The supported functions are the same as by [unix.StdCLibraryFunctions (C)](#unix-stdclibraryfunctions). The `ModelPOSIX` option of that checker affects the set of checked functions.

**Parameters**

The `AllowErrnoReadOutsideConditionExpressions` option allows read of the errno value if the value is not used in a condition (in `if` statements, loops, conditional expressions, `switch` statements). For example `errno` can be stored into a variable without getting a warning by the checker.

int unsafe\_errno\_read(int sock, void \*data, int data\_size) {
  if (send(sock, data, data\_size, 0) != data\_size) {
    int err \= errno;
    // warning if 'AllowErrnoReadOutsideConditionExpressions' is false
    // no warning if 'AllowErrnoReadOutsideConditionExpressions' is true
  }
  return 1;
}

Default value of this option is `true`. This allows save of the errno value for possible later error handling.

**Limitations**

> *   Only the very first usage of `errno` is checked after an affected function call. Value of `errno` is not followed when it is stored into a variable or returned from a function.
>     
> *   Documentation of function `lseek` is not clear about what happens if the function returns different value than the expected file position but not -1. To avoid possible false-positives `errno` is allowed to be used in this case.
>     

#### [1.1.8.5. unix.Malloc (C)](#id109)[¶](#unix-malloc-c "Link to this heading")

Check for memory leaks, double free, and use-after-free problems. Traces memory managed by malloc()/free().

Custom allocation/deallocation functions can be defined using [ownership attributes](https://clang.llvm.org/docs/AttributeReference.html#analyzer-ownership-attrs).

void test() {
  int \*p \= malloc(1);
  free(p);
  free(p); // warn: attempt to release already released memory
}

void test() {
  int \*p \= malloc(sizeof(int));
  free(p);
  \*p \= 1; // warn: use after free
}

void test() {
  int \*p \= malloc(1);
  if (p)
    return; // warn: memory is never released
}

void test() {
  int a\[\] \= { 1 };
  free(a); // warn: argument is not allocated by malloc
}

void test() {
  int \*p \= malloc(sizeof(char));
  p \= p \- 1;
  free(p); // warn: argument to free() is offset by -4 bytes
}

#### [1.1.8.6. unix.MallocSizeof (C)](#id110)[¶](#unix-mallocsizeof-c "Link to this heading")

Check for dubious `malloc` arguments involving `sizeof`.

Custom allocation/deallocation functions can be defined using [ownership attributes](https://clang.llvm.org/docs/AttributeReference.html#analyzer-ownership-attrs).

void test() {
  long \*p \= malloc(sizeof(short));
    // warn: result is converted to 'long \*', which is
    // incompatible with operand type 'short'
  free(p);
}

#### [1.1.8.7. unix.MismatchedDeallocator (C, C++)](#id111)[¶](#unix-mismatcheddeallocator-c-c "Link to this heading")

Check for mismatched deallocators.

Custom allocation/deallocation functions can be defined using [ownership attributes](https://clang.llvm.org/docs/AttributeReference.html#analyzer-ownership-attrs).

// C, C++
void test() {
  int \*p \= (int \*)malloc(sizeof(int));
  delete p; // warn
}

// C, C++
void \_\_attribute((ownership\_returns(malloc))) \*user\_malloc(size\_t);
void \_\_attribute((ownership\_takes(malloc, 1))) \*user\_free(void \*);

void \_\_attribute((ownership\_returns(malloc1))) \*user\_malloc1(size\_t);
void \_\_attribute((ownership\_takes(malloc1, 1))) \*user\_free1(void \*);

void test() {
  int \*p \= (int \*)user\_malloc(sizeof(int));
  delete p; // warn
}

// C, C++
void test() {
  int \*p \= new int;
  free(p); // warn
}

// C, C++
void test() {
  int \*p \= new int\[1\];
  realloc(p, sizeof(long)); // warn
}

// C, C++
void test() {
  int \*p \= user\_malloc(10);
  user\_free1(p); // warn
}

// C, C++
template <typename T\>
struct SimpleSmartPointer {
  T \*ptr;

  explicit SimpleSmartPointer(T \*p \= 0) : ptr(p) {}
  ~SimpleSmartPointer() {
    delete ptr; // warn
  }
};

void test() {
  SimpleSmartPointer<int\> a((int \*)malloc(4));
}

// C++
void test() {
  int \*p \= (int \*)operator new(0);
  delete\[\] p; // warn
}

// Objective-C, C++
void test(NSUInteger dataLength) {
  int \*p \= new int;
  NSData \*d \= \[NSData dataWithBytesNoCopy:p
               length:sizeof(int) freeWhenDone:1\];
    // warn +dataWithBytesNoCopy:length:freeWhenDone: cannot take
    // ownership of memory allocated by 'new'
}

#### [1.1.8.8. unix.Vfork (C)](#id112)[¶](#unix-vfork-c "Link to this heading")

Check for proper usage of `vfork`.

int test(int x) {
  pid\_t pid \= vfork(); // warn
  if (pid != 0)
    return 0;

  switch (x) {
  case 0:
    pid \= 1;
    execl("", "", 0);
    \_exit(1);
    break;
  case 1:
    x \= 0; // warn: this assignment is prohibited
    break;
  case 2:
    foo(); // warn: this function call is prohibited
    break;
  default:
    return 0; // warn: return is prohibited
  }

  while(1);
}

#### [1.1.8.9. unix.cstring.BadSizeArg (C)](#id113)[¶](#unix-cstring-badsizearg-c "Link to this heading")

Check the size argument passed into C string functions for common erroneous patterns. Use `-Wno-strncat-size` compiler option to mute other `strncat`\-related compiler warnings.

void test() {
  char dest\[3\];
  strncat(dest, """""""""""""""""""""""""\*", sizeof(dest));
    // warn: potential buffer overflow
}

#### [1.1.8.10. unix.cstring.NotNullTerminated (C)](#id114)[¶](#unix-cstring-notnullterminated-c "Link to this heading")

Check for arguments which are not null-terminated strings; applies to the `strlen`, `strcpy`, `strcat`, `strcmp` family of functions.

Only very fundamental cases are detected where the passed memory block is absolutely different from a null-terminated string. This checker does not find if a memory buffer is passed where the terminating zero character is missing.

void test1() {
  int l \= strlen((char \*)&test1); // warn
}

void test2() {
label:
  int l \= strlen((char \*)&&label); // warn
}

#### [1.1.8.11. unix.cstring.NullArg (C)](#id115)[¶](#unix-cstring-nullarg-c "Link to this heading")

Check for null pointers being passed as arguments to C string functions: `strlen, strnlen, strcpy, strncpy, strcat, strncat, strcmp, strncmp, strcasecmp, strncasecmp, wcslen, wcsnlen`.

int test() {
  return strlen(0); // warn
}

#### [1.1.8.12. unix.StdCLibraryFunctions (C)](#id116)[¶](#unix-stdclibraryfunctions-c "Link to this heading")

Check for calls of standard library functions that violate predefined argument constraints. For example, according to the C standard the behavior of function `int isalnum(int ch)` is undefined if the value of `ch` is not representable as `unsigned char` and is not equal to `EOF`.

You can think of this checker as defining restrictions (pre- and postconditions) on standard library functions. Preconditions are checked, and when they are violated, a warning is emitted. Postconditions are added to the analysis, e.g. that the return value of a function is not greater than 255. Preconditions are added to the analysis too, in the case when the affected values are not known before the call.

For example, if an argument to a function must be in between 0 and 255, but the value of the argument is unknown, the analyzer will assume that it is in this interval. Similarly, if a function mustn’t be called with a null pointer and the analyzer cannot prove that it is null, then it will assume that it is non-null.

These are the possible checks on the values passed as function arguments:

*   The argument has an allowed range (or multiple ranges) of values. The checker can detect if a passed value is outside of the allowed range and show the actual and allowed values.
    
*   The argument has pointer type and is not allowed to be null pointer. Many (but not all) standard functions can produce undefined behavior if a null pointer is passed, these cases can be detected by the checker.
    
*   The argument is a pointer to a memory block and the minimal size of this buffer is determined by another argument to the function, or by multiplication of two arguments (like at function `fread`), or is a fixed value (for example `asctime_r` requires at least a buffer of size 26). The checker can detect if the buffer size is too small and in optimal case show the size of the buffer and the values of the corresponding arguments.
    

#define EOF -1
void test\_alnum\_concrete(int v) {
  int ret \= isalnum(256); // \\
  // warning: Function argument outside of allowed range
  (void)ret;
}

void buffer\_size\_violation(FILE \*file) {
  enum { BUFFER\_SIZE \= 1024 };
  wchar\_t wbuf\[BUFFER\_SIZE\];

  const size\_t size \= sizeof(\*wbuf);   // 4
  const size\_t nitems \= sizeof(wbuf);  // 4096

  // Below we receive a warning because the 3rd parameter should be the
  // number of elements to read, not the size in bytes. This case is a known
  // vulnerability described by the ARR38-C SEI-CERT rule.
  fread(wbuf, size, nitems, file);
}

int test\_alnum\_symbolic(int x) {
  int ret \= isalnum(x);
  // after the call, ret is assumed to be in the range \[-1, 255\]

  if (ret \> 255)      // impossible (infeasible branch)
    if (x \== 0)
      return ret / x; // division by zero is not reported
  return ret;
}

Additionally to the argument and return value conditions, this checker also adds state of the value `errno` if applicable to the analysis. Many system functions set the `errno` value only if an error occurs (together with a specific return value of the function), otherwise it becomes undefined. This checker changes the analysis state to contain such information. This data is used by other checkers, for example [unix.Errno (C)](#unix-errno).

**Limitations**

The checker can not always provide notes about the values of the arguments. Without this information it is hard to confirm if the constraint is indeed violated. The argument values are shown if they are known constants or the value is determined by previous (not too complicated) assumptions.

The checker can produce false positives in cases such as if the program has invariants not known to the analyzer engine or the bug report path contains calls to unknown functions. In these cases the analyzer fails to detect the real range of the argument.

**Parameters**

The `ModelPOSIX` option controls if functions from the POSIX standard are recognized by the checker.

With `ModelPOSIX=true`, many POSIX functions are modeled according to the [POSIX standard](https://pubs.opengroup.org/onlinepubs/9699919799/). This includes ranges of parameters and possible return values. Furthermore the behavior related to `errno` in the POSIX case is often that `errno` is set only if a function call fails, and it becomes undefined after a successful function call.

With `ModelPOSIX=false`, this checker follows the C99 language standard and only models the functions that are described there. It is possible that the same functions are modeled differently in the two cases because differences in the standards. The C standard specifies less aspects of the functions, for example exact `errno` behavior is often unspecified (and not modeled by the checker).

Default value of the option is `true`.

#### [1.1.8.13. unix.Stream (C)](#id117)[¶](#unix-stream-c "Link to this heading")

Check C stream handling functions: `fopen, fdopen, freopen, tmpfile, fclose, fread, fwrite, fgetc, fgets, fputc, fputs, fprintf, fscanf, ungetc, getdelim, getline, fseek, fseeko, ftell, ftello, fflush, rewind, fgetpos, fsetpos, clearerr, feof, ferror, fileno`.

The checker maintains information about the C stream objects (`FILE *`) and can detect error conditions related to use of streams. The following conditions are detected:

*   The `FILE *` pointer passed to the function is NULL (the single exception is `fflush` where NULL is allowed).
    
*   Use of stream after close.
    
*   Opened stream is not closed.
    
*   Read from a stream after end-of-file. (This is not a fatal error but reported by the checker. Stream remains in EOF state and the read operation fails.)
    
*   Use of stream when the file position is indeterminate after a previous failed operation. Some functions (like `ferror`, `clearerr`, `fseek`) are allowed in this state.
    
*   Invalid 3rd (”`whence`”) argument to `fseek`.
    

The stream operations are by this checker usually split into two cases, a success and a failure case. On the success case it also assumes that the current value of `stdout`, `stderr`, or `stdin` can’t be equal to the file pointer returned by `fopen`. Operations performed on `stdout`, `stderr`, or `stdin` are not checked by this checker in contrast to the streams opened by `fopen`.

In the case of write operations (like `fwrite`, `fprintf` and even `fsetpos`) this behavior could produce a large amount of unwanted reports on projects that don’t have error checks around the write operations, so by default the checker assumes that write operations always succeed. This behavior can be controlled by the `Pedantic` flag: With `-analyzer-config unix.Stream:Pedantic=true` the checker will model the cases where a write operation fails and report situations where this leads to erroneous behavior. (The default is `Pedantic=false`, where write operations are assumed to succeed.)

void test1() {
  FILE \*p \= fopen("foo", "r");
} // warn: opened file is never closed

void test2() {
  FILE \*p \= fopen("foo", "r");
  fseek(p, 1, SEEK\_SET); // warn: stream pointer might be NULL
  fclose(p);
}

void test3() {
  FILE \*p \= fopen("foo", "r");
  if (p) {
    fseek(p, 1, 3); // warn: third arg should be SEEK\_SET, SEEK\_END, or SEEK\_CUR
    fclose(p);
  }
}

void test4() {
  FILE \*p \= fopen("foo", "r");
  if (!p)
    return;

  fclose(p);
  fclose(p); // warn: stream already closed
}

void test5() {
  FILE \*p \= fopen("foo", "r");
  if (!p)
    return;

  fgetc(p);
  if (!ferror(p))
    fgetc(p); // warn: possible read after end-of-file

  fclose(p);
}

void test6() {
  FILE \*p \= fopen("foo", "r");
  if (!p)
    return;

  fgetc(p);
  if (!feof(p))
    fgetc(p); // warn: file position may be indeterminate after I/O error

  fclose(p);
}

**Limitations**

The checker does not track the correspondence between integer file descriptors and `FILE *` pointers.

### [1.1.9. osx](#id118)[¶](#osx "Link to this heading")

macOS checkers.

#### [1.1.9.1. osx.API (C)](#id119)[¶](#osx-api-c "Link to this heading")

Check for proper uses of various Apple APIs.

void test() {
  dispatch\_once\_t pred \= 0;
  dispatch\_once(&pred, ^(){}); // warn: dispatch\_once uses local
}

#### [1.1.9.2. osx.NumberObjectConversion (C, C++, ObjC)](#id120)[¶](#osx-numberobjectconversion-c-c-objc "Link to this heading")

Check for erroneous conversions of objects representing numbers into numbers.

NSNumber \*photoCount \= \[albumDescriptor objectForKey:@"PhotoCount"\];
// Warning: Comparing a pointer value of type 'NSNumber \*'
// to a scalar integer value
if (photoCount \> 0) {
  \[self displayPhotos\];
}

#### [1.1.9.3. osx.ObjCProperty (ObjC)](#id121)[¶](#osx-objcproperty-objc "Link to this heading")

Check for proper uses of Objective-C properties.

NSNumber \*photoCount \= \[albumDescriptor objectForKey:@"PhotoCount"\];
// Warning: Comparing a pointer value of type 'NSNumber \*'
// to a scalar integer value
if (photoCount \> 0) {
  \[self displayPhotos\];
}

#### [1.1.9.4. osx.SecKeychainAPI (C)](#id122)[¶](#osx-seckeychainapi-c "Link to this heading")

Check for proper uses of Secure Keychain APIs.

void test() {
  unsigned int \*ptr \= 0;
  UInt32 length;

  SecKeychainItemFreeContent(ptr, &length);
    // warn: trying to free data which has not been allocated
}

void test() {
  unsigned int \*ptr \= 0;
  UInt32 \*length \= 0;
  void \*outData;

  OSStatus st \=
    SecKeychainItemCopyContent(2, ptr, ptr, length, outData);
    // warn: data is not released
}

void test() {
  unsigned int \*ptr \= 0;
  UInt32 \*length \= 0;
  void \*outData;

  OSStatus st \=
    SecKeychainItemCopyContent(2, ptr, ptr, length, &outData);

  SecKeychainItemFreeContent(ptr, outData);
    // warn: only call free if a non-NULL buffer was returned
}

void test() {
  unsigned int \*ptr \= 0;
  UInt32 \*length \= 0;
  void \*outData;

  OSStatus st \=
    SecKeychainItemCopyContent(2, ptr, ptr, length, &outData);

  st \= SecKeychainItemCopyContent(2, ptr, ptr, length, &outData);
    // warn: release data before another call to the allocator

  if (st \== noErr)
    SecKeychainItemFreeContent(ptr, outData);
}

void test() {
  SecKeychainItemRef itemRef \= 0;
  SecKeychainAttributeInfo \*info \= 0;
  SecItemClass \*itemClass \= 0;
  SecKeychainAttributeList \*attrList \= 0;
  UInt32 \*length \= 0;
  void \*outData \= 0;

  OSStatus st \=
    SecKeychainItemCopyAttributesAndData(itemRef, info,
                                         itemClass, &attrList,
                                         length, &outData);

  SecKeychainItemFreeContent(attrList, outData);
    // warn: deallocator doesn't match the allocator
}

#### [1.1.9.5. osx.cocoa.AtSync (ObjC)](#id123)[¶](#osx-cocoa-atsync-objc "Link to this heading")

Check for nil pointers used as mutexes for @synchronized.

void test(id x) {
  if (!x)
    @synchronized(x) {} // warn: nil value used as mutex
}

void test() {
  id y;
  @synchronized(y) {} // warn: uninitialized value used as mutex
}

#### [1.1.9.6. osx.cocoa.AutoreleaseWrite](#id124)[¶](#osx-cocoa-autoreleasewrite "Link to this heading")

Warn about potentially crashing writes to autoreleasing objects from different autoreleasing pools in Objective-C.

#### [1.1.9.7. osx.cocoa.ClassRelease (ObjC)](#id125)[¶](#osx-cocoa-classrelease-objc "Link to this heading")

Check for sending ‘retain’, ‘release’, or ‘autorelease’ directly to a Class.

@interface MyClass : NSObject
@end

void test(void) {
  \[MyClass release\]; // warn
}

#### [1.1.9.8. osx.cocoa.Dealloc (ObjC)](#id126)[¶](#osx-cocoa-dealloc-objc "Link to this heading")

Warn about Objective-C classes that lack a correct implementation of -dealloc

@interface MyObject : NSObject {
  id \_myproperty;
}
@end

@implementation MyObject // warn: lacks 'dealloc'
@end

@interface MyObject : NSObject {}
@property(assign) id myproperty;
@end

@implementation MyObject // warn: does not send 'dealloc' to super
\- (void)dealloc {
  self.myproperty \= 0;
}
@end

@interface MyObject : NSObject {
  id \_myproperty;
}
@property(retain) id myproperty;
@end

@implementation MyObject
@synthesize myproperty \= \_myproperty;
  // warn: var was retained but wasn't released
\- (void)dealloc {
  \[super dealloc\];
}
@end

@interface MyObject : NSObject {
  id \_myproperty;
}
@property(assign) id myproperty;
@end

@implementation MyObject
@synthesize myproperty \= \_myproperty;
  // warn: var wasn't retained but was released
\- (void)dealloc {
  \[\_myproperty release\];
  \[super dealloc\];
}
@end

#### [1.1.9.9. osx.cocoa.IncompatibleMethodTypes (ObjC)](#id127)[¶](#osx-cocoa-incompatiblemethodtypes-objc "Link to this heading")

Warn about Objective-C method signatures with type incompatibilities.

@interface MyClass1 : NSObject
\- (int)foo;
@end

@implementation MyClass1
\- (int)foo { return 1; }
@end

@interface MyClass2 : MyClass1
\- (float)foo;
@end

@implementation MyClass2
\- (float)foo { return 1.0; } // warn
@end

#### [1.1.9.10. osx.cocoa.Loops](#id128)[¶](#osx-cocoa-loops "Link to this heading")

Improved modeling of loops using Cocoa collection types.

#### [1.1.9.11. osx.cocoa.MissingSuperCall (ObjC)](#id129)[¶](#osx-cocoa-missingsupercall-objc "Link to this heading")

Warn about Objective-C methods that lack a necessary call to super.

@interface Test : UIViewController
@end
@implementation test
\- (void)viewDidLoad {} // warn
@end

#### [1.1.9.12. osx.cocoa.NSAutoreleasePool (ObjC)](#id130)[¶](#osx-cocoa-nsautoreleasepool-objc "Link to this heading")

Warn for suboptimal uses of NSAutoreleasePool in Objective-C GC mode.

void test() {
  NSAutoreleasePool \*pool \= \[\[NSAutoreleasePool alloc\] init\];
  \[pool release\]; // warn
}

#### [1.1.9.13. osx.cocoa.NSError (ObjC)](#id131)[¶](#osx-cocoa-nserror-objc "Link to this heading")

Check usage of NSError parameters.

@interface A : NSObject
\- (void)foo:(NSError """""""""""""""""""""""")error;
@end

@implementation A
\- (void)foo:(NSError """""""""""""""""""""""")error {
  // warn: method accepting NSError"""""""""""""""""""""""" should have a non-void
  // return value
}
@end

@interface A : NSObject
\- (BOOL)foo:(NSError """""""""""""""""""""""")error;
@end

@implementation A
\- (BOOL)foo:(NSError """""""""""""""""""""""")error {
  \*error \= 0; // warn: potential null dereference
  return 0;
}
@end

#### [1.1.9.14. osx.cocoa.NilArg (ObjC)](#id132)[¶](#osx-cocoa-nilarg-objc "Link to this heading")

Check for prohibited nil arguments to ObjC method calls.

> *   caseInsensitiveCompare:
>     
> *   compare:
>     
> *   compare:options:
>     
> *   compare:options:range:
>     
> *   compare:options:range:locale:
>     
> *   componentsSeparatedByCharactersInSet:
>     
> *   initWithFormat:
>     

NSComparisonResult test(NSString \*s) {
  NSString \*aString \= nil;
  return \[s caseInsensitiveCompare:aString\];
    // warn: argument to 'NSString' method
    // 'caseInsensitiveCompare:' cannot be nil
}

#### [1.1.9.15. osx.cocoa.NonNilReturnValue](#id133)[¶](#osx-cocoa-nonnilreturnvalue "Link to this heading")

Models the APIs that are guaranteed to return a non-nil value.

#### [1.1.9.16. osx.cocoa.ObjCGenerics (ObjC)](#id134)[¶](#osx-cocoa-objcgenerics-objc "Link to this heading")

Check for type errors when using Objective-C generics.

NSMutableArray \*names \= \[NSMutableArray array\];
NSMutableArray \*birthDates \= names;

// Warning: Conversion from value of type 'NSDate \*'
// to incompatible type 'NSString \*'
\[birthDates addObject: \[NSDate date\]\];

#### [1.1.9.17. osx.cocoa.RetainCount (ObjC)](#id135)[¶](#osx-cocoa-retaincount-objc "Link to this heading")

Check for leaks and improper reference count management

void test() {
  NSString \*s \= \[\[NSString alloc\] init\]; // warn
}

CFStringRef test(char \*bytes) {
  return CFStringCreateWithCStringNoCopy(
           0, bytes, NSNEXTSTEPStringEncoding, 0); // warn
}

#### [1.1.9.18. osx.cocoa.RunLoopAutoreleaseLeak](#id136)[¶](#osx-cocoa-runloopautoreleaseleak "Link to this heading")

Check for leaked memory in autorelease pools that will never be drained.

#### [1.1.9.19. osx.cocoa.SelfInit (ObjC)](#id137)[¶](#osx-cocoa-selfinit-objc "Link to this heading")

Check that ‘self’ is properly initialized inside an initializer method.

@interface MyObj : NSObject {
  id x;
}
\- (id)init;
@end

@implementation MyObj
\- (id)init {
  \[super init\];
  x \= 0; // warn: instance variable used while 'self' is not
         // initialized
  return 0;
}
@end

@interface MyObj : NSObject
\- (id)init;
@end

@implementation MyObj
\- (id)init {
  \[super init\];
  return self; // warn: returning uninitialized 'self'
}
@end

#### [1.1.9.20. osx.cocoa.SuperDealloc (ObjC)](#id138)[¶](#osx-cocoa-superdealloc-objc "Link to this heading")

Warn about improper use of ‘\[super dealloc\]’ in Objective-C.

@interface SuperDeallocThenReleaseIvarClass : NSObject {
  NSObject \*\_ivar;
}
@end

@implementation SuperDeallocThenReleaseIvarClass
\- (void)dealloc {
  \[super dealloc\];
  \[\_ivar release\]; // warn
}
@end

#### [1.1.9.21. osx.cocoa.UnusedIvars (ObjC)](#id139)[¶](#osx-cocoa-unusedivars-objc "Link to this heading")

Warn about private ivars that are never used.

@interface MyObj : NSObject {
@private
  id x; // warn
}
@end

@implementation MyObj
@end

#### [1.1.9.22. osx.cocoa.VariadicMethodTypes (ObjC)](#id140)[¶](#osx-cocoa-variadicmethodtypes-objc "Link to this heading")

Check for passing non-Objective-C types to variadic collection initialization methods that expect only Objective-C types.

void test() {
  \[NSSet setWithObjects:@"Foo", "Bar", nil\];
    // warn: argument should be an ObjC pointer type, not 'char \*'
}

#### [1.1.9.23. osx.coreFoundation.CFError (C)](#id141)[¶](#osx-corefoundation-cferror-c "Link to this heading")

Check usage of CFErrorRef\* parameters

void test(CFErrorRef \*error) {
  // warn: function accepting CFErrorRef\* should have a
  // non-void return
}

int foo(CFErrorRef \*error) {
  \*error \= 0; // warn: potential null dereference
  return 0;
}

#### [1.1.9.24. osx.coreFoundation.CFNumber (C)](#id142)[¶](#osx-corefoundation-cfnumber-c "Link to this heading")

Check for proper uses of CFNumber APIs.

CFNumberRef test(unsigned char x) {
  return CFNumberCreate(0, kCFNumberSInt16Type, &x);
   // warn: 8-bit integer is used to initialize a 16-bit integer
}

#### [1.1.9.25. osx.coreFoundation.CFRetainRelease (C)](#id143)[¶](#osx-corefoundation-cfretainrelease-c "Link to this heading")

Check for null arguments to CFRetain/CFRelease/CFMakeCollectable.

void test(CFTypeRef p) {
  if (!p)
    CFRetain(p); // warn
}

void test(int x, CFTypeRef p) {
  if (p)
    return;

  CFRelease(p); // warn
}

#### [1.1.9.26. osx.coreFoundation.containers.OutOfBounds (C)](#id144)[¶](#osx-corefoundation-containers-outofbounds-c "Link to this heading")

Checks for index out-of-bounds when using ‘CFArray’ API.

void test() {
  CFArrayRef A \= CFArrayCreate(0, 0, 0, &kCFTypeArrayCallBacks);
  CFArrayGetValueAtIndex(A, 0); // warn
}

#### [1.1.9.27. osx.coreFoundation.containers.PointerSizedValues (C)](#id145)[¶](#osx-corefoundation-containers-pointersizedvalues-c "Link to this heading")

Warns if ‘CFArray’, ‘CFDictionary’, ‘CFSet’ are created with non-pointer-size values.

void test() {
  int x\[\] \= { 1 };
  CFArrayRef A \= CFArrayCreate(0, (const void """""""""""""""""""""""")x, 1,
                               &kCFTypeArrayCallBacks); // warn
}

### [1.1.10. Fuchsia](#id146)[¶](#fuchsia "Link to this heading")

Fuchsia is an open source capability-based operating system currently being developed by Google. This section describes checkers that can find various misuses of Fuchsia APIs.

#### [1.1.10.1. fuchsia.HandleChecker](#id147)[¶](#fuchsia-handlechecker "Link to this heading")

Handles identify resources. Similar to pointers they can be leaked, double freed, or use after freed. This check attempts to find such problems.

void checkLeak08(int tag) {
  zx\_handle\_t sa, sb;
  zx\_channel\_create(0, &sa, &sb);
  if (tag)
    zx\_handle\_close(sa);
  use(sb); // Warn: Potential leak of handle
  zx\_handle\_close(sb);
}

### [1.1.11. WebKit](#id148)[¶](#webkit "Link to this heading")

WebKit is an open-source web browser engine available for macOS, iOS and Linux. This section describes checkers that can find issues in WebKit codebase.

Most of the checkers focus on memory management for which WebKit uses custom implementation of reference counted smartpointers.

Checkers are formulated in terms related to ref-counting:

*   _Ref-counted type_ is either `Ref<T>` or `RefPtr<T>`.
    
*   _Ref-countable type_ is any type that implements `ref()` and `deref()` methods as `RefPtr<>` is a template (i. e. relies on duck typing).
    
*   _Uncounted type_ is ref-countable but not ref-counted type.
    

#### [1.1.11.1. webkit.RefCntblBaseVirtualDtor](#id149)[¶](#webkit-refcntblbasevirtualdtor "Link to this heading")

All uncounted types used as base classes must have a virtual destructor.

Ref-counted types hold their ref-countable data by a raw pointer and allow implicit upcasting from ref-counted pointer to derived type to ref-counted pointer to base type. This might lead to an object of (dynamic) derived type being deleted via pointer to the base class type which C++ standard defines as UB in case the base class doesn’t have virtual destructor `[expr.delete]`.

struct RefCntblBase {
  void ref() {}
  void deref() {}
};

struct Derived : RefCntblBase { }; // warn

#### [1.1.11.2. webkit.NoUncountedMemberChecker](#id150)[¶](#webkit-nouncountedmemberchecker "Link to this heading")

Raw pointers and references to uncounted types can’t be used as class members. Only ref-counted types are allowed.

struct RefCntbl {
  void ref() {}
  void deref() {}
};

struct Foo {
  RefCntbl \* ptr; // warn
  RefCntbl & ptr; // warn
  // ...
};

#### [1.1.11.3. webkit.UncountedLambdaCapturesChecker](#id151)[¶](#webkit-uncountedlambdacaptureschecker "Link to this heading")

Raw pointers and references to uncounted types can’t be captured in lambdas. Only ref-counted types are allowed.

struct RefCntbl {
  void ref() {}
  void deref() {}
};

void foo(RefCntbl\* a, RefCntbl& b) {
  \[&, a\](){ // warn about 'a'
    do\_something(b); // warn about 'b'
  };
};

[1.2. Experimental Checkers](#id152)[¶](#experimental-checkers "Link to this heading")
--------------------------------------------------------------------------------------

_These are checkers with known issues or limitations that keep them from being on by default. They are likely to have false positives. Bug reports and especially patches are welcome._

### [1.2.1. alpha.clone](#id153)[¶](#alpha-clone "Link to this heading")

#### [1.2.1.1. alpha.clone.CloneChecker (C, C++, ObjC)](#id154)[¶](#alpha-clone-clonechecker-c-c-objc "Link to this heading")

Reports similar pieces of code.

void log();

int max(int a, int b) { // warn
  log();
  if (a \> b)
    return a;
  return b;
}

int maxClone(int x, int y) { // similar code here
  log();
  if (x \> y)
    return x;
  return y;
}

### [1.2.2. alpha.core](#id155)[¶](#alpha-core "Link to this heading")

#### [1.2.2.1. alpha.core.BoolAssignment (ObjC)](#id156)[¶](#alpha-core-boolassignment-objc "Link to this heading")

Warn about assigning non-{0,1} values to boolean variables.

void test() {
  BOOL b \= \-1; // warn
}

#### [1.2.2.2. alpha.core.C11Lock](#id157)[¶](#alpha-core-c11lock "Link to this heading")

Similarly to [alpha.unix.PthreadLock](#alpha-unix-pthreadlock), checks for the locking/unlocking of `mtx_t` mutexes.

mtx\_t mtx1;

void bad1(void)
{
  mtx\_lock(&mtx1);
  mtx\_lock(&mtx1); // warn: This lock has already been acquired
}

#### [1.2.2.3. alpha.core.CastSize (C)](#id158)[¶](#alpha-core-castsize-c "Link to this heading")

Check when casting a malloc’ed type `T`, whether the size is a multiple of the size of `T`.

void test() {
  int \*x \= (int \*) malloc(11); // warn
}

#### [1.2.2.4. alpha.core.CastToStruct (C, C++)](#id159)[¶](#alpha-core-casttostruct-c-c "Link to this heading")

Check for cast from non-struct pointer to struct pointer.

// C
struct s {};

void test(int \*p) {
  struct s \*ps \= (struct s \*) p; // warn
}

// C++
class c {};

void test(int \*p) {
  c \*pc \= (c \*) p; // warn
}

#### [1.2.2.5. alpha.core.Conversion (C, C++, ObjC)](#id160)[¶](#alpha-core-conversion-c-c-objc "Link to this heading")

Loss of sign/precision in implicit conversions.

void test(unsigned U, signed S) {
  if (S \> 10) {
    if (U < S) {
    }
  }
  if (S < \-10) {
    if (U < S) { // warn (loss of sign)
    }
  }
}

void test() {
  long long A \= 1LL << 60;
  short X \= A; // warn (loss of precision)
}

#### [1.2.2.6. alpha.core.DynamicTypeChecker (ObjC)](#id161)[¶](#alpha-core-dynamictypechecker-objc "Link to this heading")

Check for cases where the dynamic and the static type of an object are unrelated.

id date \= \[NSDate date\];

// Warning: Object has a dynamic type 'NSDate \*' which is
// incompatible with static type 'NSNumber \*'"
NSNumber \*number \= date;
\[number doubleValue\];

#### [1.2.2.7. alpha.core.FixedAddr (C)](#id162)[¶](#alpha-core-fixedaddr-c "Link to this heading")

Check for assignment of a fixed address to a pointer.

void test() {
  int \*p;
  p \= (int \*) 0x10000; // warn
}

#### [1.2.2.8. alpha.core.PointerArithm (C)](#id163)[¶](#alpha-core-pointerarithm-c "Link to this heading")

Check for pointer arithmetic on locations other than array elements.

void test() {
  int x;
  int \*p;
  p \= &x + 1; // warn
}

#### [1.2.2.9. alpha.core.StackAddressAsyncEscape (ObjC)](#id164)[¶](#alpha-core-stackaddressasyncescape-objc "Link to this heading")

Check that addresses to stack memory do not escape the function that involves dispatch\_after or dispatch\_async. This checker is a part of `core.StackAddressEscape`, but is temporarily disabled until some false positives are fixed.

dispatch\_block\_t test\_block\_inside\_block\_async\_leak() {
  int x \= 123;
  void (^inner)(void) \= ^void(void) {
    int y \= x;
    ++y;
  };
  void (^outer)(void) \= ^void(void) {
    int z \= x;
    ++z;
    inner();
  };
  return outer; // warn: address of stack-allocated block is captured by a
                //       returned block
}

#### [1.2.2.10. alpha.core.StdVariant (C++)](#id165)[¶](#alpha-core-stdvariant-c "Link to this heading")

Check if a value of active type is retrieved from an `std::variant` instance with `std::get`. In case of bad variant type access (the accessed type differs from the active type) a warning is emitted. Currently, this checker does not take exception handling into account.

void test() {
  std::variant<int, char\> v \= 25;
  char c \= stg::get<char\>(v); // warn: "int" is the active alternative
}

#### [1.2.2.11. alpha.core.TestAfterDivZero (C)](#id166)[¶](#alpha-core-testafterdivzero-c "Link to this heading")

Check for division by variable that is later compared against 0. Either the comparison is useless or there is division by zero.

void test(int x) {
  var \= 77 / x;
  if (x \== 0) { } // warn
}

#### [1.2.2.12. alpha.core.StoreToImmutable (C, C++)](#id167)[¶](#alpha-core-storetoimmutable-c-c "Link to this heading")

Check for writes to immutable memory regions. This implements part of SEI CERT Rule ENV30-C.

This checker detects attempts to write to memory regions that are marked as immutable, including const variables, string literals, and other const-qualified memory.

const int global\_const \= 42;

struct TestStruct {
  const int x;
  int y;
};

void immutable\_violation\_examples() {
  \*(int \*)&global\_const \= 100; // warn: Trying to write to immutable memory

  const int local\_const \= 42;
  \*(int \*)&local\_const \= 43; // warn: Trying to write to immutable memory

  // NOTE: The following is reported in C++, but not in C, as the analyzer
  // treats string literals as non-const char arrays in C mode.
  char \*ptr\_to\_str\_literal \= (char \*)"hello";
  ptr\_to\_str\_literal\[0\] \= 'H'; // warn: Trying to write to immutable memory

  TestStruct s \= {1, 2};
  \*(int \*)&s.x \= 10; // warn: Trying to write to immutable memory
}

**Solution**

Avoid writing to const-qualified memory regions. If you need to modify the data, remove the const qualifier from the original declaration or use a mutable copy.

### [1.2.3. alpha.cplusplus](#id168)[¶](#alpha-cplusplus "Link to this heading")

#### [1.2.3.1. alpha.cplusplus.DeleteWithNonVirtualDtor (C++)](#id169)[¶](#alpha-cplusplus-deletewithnonvirtualdtor-c "Link to this heading")

Reports destructions of polymorphic objects with a non-virtual destructor in their base class.

class NonVirtual {};
class NVDerived : public NonVirtual {};

NonVirtual \*create() {
  NonVirtual \*x \= new NVDerived(); // note: Casting from 'NVDerived' to
                                   //       'NonVirtual' here
  return x;
}

void foo() {
  NonVirtual \*x \= create();
  delete x; // warn: destruction of a polymorphic object with no virtual
            //       destructor
}

#### [1.2.3.2. alpha.cplusplus.InvalidatedIterator (C++)](#id170)[¶](#alpha-cplusplus-invalidatediterator-c "Link to this heading")

Check for use of invalidated iterators.

void bad\_copy\_assign\_operator\_list1(std::list &L1,
                                    const std::list &L2) {
  auto i0 \= L1.cbegin();
  L1 \= L2;
  \*i0; // warn: invalidated iterator accessed
}

#### [1.2.3.3. alpha.cplusplus.IteratorRange (C++)](#id171)[¶](#alpha-cplusplus-iteratorrange-c "Link to this heading")

Check for iterators used outside their valid ranges.

void simple\_bad\_end(const std::vector &v) {
  auto i \= v.end();
  \*i; // warn: iterator accessed outside of its range
}

#### [1.2.3.4. alpha.cplusplus.MismatchedIterator (C++)](#id172)[¶](#alpha-cplusplus-mismatchediterator-c "Link to this heading")

Check for use of iterators of different containers where iterators of the same container are expected.

void bad\_insert3(std::vector &v1, std::vector &v2) {
  v2.insert(v1.cbegin(), v2.cbegin(), v2.cend()); // warn: container accessed
                                                  //       using foreign
                                                  //       iterator argument
  v1.insert(v1.cbegin(), v1.cbegin(), v2.cend()); // warn: iterators of
                                                  //       different containers
                                                  //       used where the same
                                                  //       container is
                                                  //       expected
  v1.insert(v1.cbegin(), v2.cbegin(), v1.cend()); // warn: iterators of
                                                  //       different containers
                                                  //       used where the same
                                                  //       container is
                                                  //       expected
}

#### [1.2.3.5. alpha.cplusplus.SmartPtr (C++)](#id173)[¶](#alpha-cplusplus-smartptr-c "Link to this heading")

Check for dereference of null smart pointers.

void deref\_smart\_ptr() {
  std::unique\_ptr<int\> P;
  \*P; // warn: dereference of a default constructed smart unique\_ptr
}

### [1.2.4. alpha.deadcode](#id174)[¶](#alpha-deadcode "Link to this heading")

#### [1.2.4.1. alpha.deadcode.UnreachableCode (C, C++)](#id175)[¶](#alpha-deadcode-unreachablecode-c-c "Link to this heading")

Check unreachable code.

// C
int test() {
  int x \= 1;
  while(x);
  return x; // warn
}

// C++
void test() {
  int a \= 2;

  while (a \> 1)
    a\--;

  if (a \> 1)
    a++; // warn
}

// Objective-C
void test(id x) {
  return;
  \[x retain\]; // warn
}

### [1.2.5. alpha.fuchsia](#id176)[¶](#alpha-fuchsia "Link to this heading")

#### [1.2.5.1. alpha.fuchsia.Lock](#id177)[¶](#alpha-fuchsia-lock "Link to this heading")

Similarly to [alpha.unix.PthreadLock](#alpha-unix-pthreadlock), checks for the locking/unlocking of fuchsia mutexes.

spin\_lock\_t mtx1;

void bad1(void)
{
  spin\_lock(&mtx1);
  spin\_lock(&mtx1);    // warn: This lock has already been acquired
}

### [1.2.6. alpha.llvm](#id178)[¶](#alpha-llvm "Link to this heading")

#### [1.2.6.1. alpha.llvm.Conventions](#id179)[¶](#alpha-llvm-conventions "Link to this heading")

Check code for LLVM codebase conventions:

*   A StringRef should not be bound to a temporary std::string whose lifetime is shorter than the StringRef’s.
    
*   Clang AST nodes should not have fields that can allocate memory.
    

### [1.2.7. alpha.osx](#id180)[¶](#alpha-osx "Link to this heading")

#### [1.2.7.1. alpha.osx.cocoa.DirectIvarAssignment (ObjC)](#id181)[¶](#alpha-osx-cocoa-directivarassignment-objc "Link to this heading")

Check for direct assignments to instance variables.

@interface MyClass : NSObject {}
@property (readonly) id A;
\- (void) foo;
@end

@implementation MyClass
\- (void) foo {
  \_A \= 0; // warn
}
@end

#### [1.2.7.2. alpha.osx.cocoa.DirectIvarAssignmentForAnnotatedFunctions (ObjC)](#id182)[¶](#alpha-osx-cocoa-directivarassignmentforannotatedfunctions-objc "Link to this heading")

Check for direct assignments to instance variables in the methods annotated with `objc_no_direct_instance_variable_assignment`.

@interface MyClass : NSObject {}
@property (readonly) id A;
\- (void) fAnnotated \_\_attribute\_\_((
    annotate("objc\_no\_direct\_instance\_variable\_assignment")));
\- (void) fNotAnnotated;
@end

@implementation MyClass
\- (void) fAnnotated {
  \_A \= 0; // warn
}
\- (void) fNotAnnotated {
  \_A \= 0; // no warn
}
@end

#### [1.2.7.3. alpha.osx.cocoa.InstanceVariableInvalidation (ObjC)](#id183)[¶](#alpha-osx-cocoa-instancevariableinvalidation-objc "Link to this heading")

Check that the invalidatable instance variables are invalidated in the methods annotated with objc\_instance\_variable\_invalidator.

@protocol Invalidation <NSObject\>
\- (void) invalidate
  \_\_attribute\_\_((annotate("objc\_instance\_variable\_invalidator")));
@end

@interface InvalidationImpObj : NSObject <Invalidation\>
@end

@interface SubclassInvalidationImpObj : InvalidationImpObj {
  InvalidationImpObj \*var;
}
\- (void)invalidate;
@end

@implementation SubclassInvalidationImpObj
\- (void) invalidate {}
@end
// warn: var needs to be invalidated or set to nil

#### [1.2.7.4. alpha.osx.cocoa.MissingInvalidationMethod (ObjC)](#id184)[¶](#alpha-osx-cocoa-missinginvalidationmethod-objc "Link to this heading")

Check that the invalidation methods are present in classes that contain invalidatable instance variables.

@protocol Invalidation <NSObject\>
\- (void)invalidate
  \_\_attribute\_\_((annotate("objc\_instance\_variable\_invalidator")));
@end

@interface NeedInvalidation : NSObject <Invalidation\>
@end

@interface MissingInvalidationMethodDecl : NSObject {
  NeedInvalidation \*Var; // warn
}
@end

@implementation MissingInvalidationMethodDecl
@end

#### [1.2.7.5. alpha.osx.cocoa.localizability.PluralMisuseChecker (ObjC)](#id185)[¶](#alpha-osx-cocoa-localizability-pluralmisusechecker-objc "Link to this heading")

Warns against using one vs. many plural pattern in code when generating localized strings.

NSString \*reminderText \=
  NSLocalizedString(@"None", @"Indicates no reminders");
if (reminderCount \== 1) {
  // Warning: Plural cases are not supported across all languages.
  // Use a .stringsdict file instead
  reminderText \=
    NSLocalizedString(@"1 Reminder", @"Indicates single reminder");
} else if (reminderCount \>= 2) {
  // Warning: Plural cases are not supported across all languages.
  // Use a .stringsdict file instead
  reminderText \=
    \[NSString stringWithFormat:
      NSLocalizedString(@"%@ Reminders", @"Indicates multiple reminders"),
        reminderCount\];
}

### [1.2.8. alpha.security](#id186)[¶](#alpha-security "Link to this heading")

#### [1.2.8.1. alpha.security.ReturnPtrRange (C)](#id187)[¶](#alpha-security-returnptrrange-c "Link to this heading")

Check for an out-of-bound pointer being returned to callers.

static int A\[10\];

int \*test() {
  int \*p \= A + 10;
  return p; // warn
}

int test(void) {
  int x;
  return x; // warn: undefined or garbage returned
}

### [1.2.9. alpha.security.cert](#id188)[¶](#alpha-security-cert "Link to this heading")

SEI CERT checkers which tries to find errors based on their [C coding rules](https://wiki.sei.cmu.edu/confluence/display/c/2+Rules).

### [1.2.10. alpha.unix](#id189)[¶](#alpha-unix "Link to this heading")

#### [1.2.10.1. alpha.unix.PthreadLock (C)](#id190)[¶](#alpha-unix-pthreadlock-c "Link to this heading")

Simple lock -> unlock checker. Applies to: `pthread_mutex_lock, pthread_rwlock_rdlock, pthread_rwlock_wrlock, lck_mtx_lock, lck_rw_lock_exclusive` `lck_rw_lock_shared, pthread_mutex_trylock, pthread_rwlock_tryrdlock, pthread_rwlock_tryrwlock, lck_mtx_try_lock, lck_rw_try_lock_exclusive, lck_rw_try_lock_shared, pthread_mutex_unlock, pthread_rwlock_unlock, lck_mtx_unlock, lck_rw_done`.

pthread\_mutex\_t mtx;

void test() {
  pthread\_mutex\_lock(&mtx);
  pthread\_mutex\_lock(&mtx);
    // warn: this lock has already been acquired
}

lck\_mtx\_t lck1, lck2;

void test() {
  lck\_mtx\_lock(&lck1);
  lck\_mtx\_lock(&lck2);
  lck\_mtx\_unlock(&lck1);
    // warn: this was not the most recently acquired lock
}

lck\_mtx\_t lck1, lck2;

void test() {
  if (lck\_mtx\_try\_lock(&lck1) \== 0)
    return;

  lck\_mtx\_lock(&lck2);
  lck\_mtx\_unlock(&lck1);
    // warn: this was not the most recently acquired lock
}

#### [1.2.10.2. alpha.unix.SimpleStream (C)](#id191)[¶](#alpha-unix-simplestream-c "Link to this heading")

Check for misuses of stream APIs. Check for misuses of stream APIs: `fopen, fclose` (demo checker, the subject of the demo ([Slides](https://llvm.org/devmtg/2012-11/Zaks-Rose-Checker24Hours.pdf) , [Video](https://youtu.be/kdxlsP5QVPw)) by Anna Zaks and Jordan Rose presented at the [2012 LLVM Developers’ Meeting](https://llvm.org/devmtg/2012-11/)).

void test() {
  FILE \*F \= fopen("myfile.txt", "w");
} // warn: opened file is never closed

void test() {
  FILE \*F \= fopen("myfile.txt", "w");

  if (F)
    fclose(F);

  fclose(F); // warn: closing a previously closed file stream
}

#### [1.2.10.3. alpha.unix.cstring.BufferOverlap (C)](#id192)[¶](#alpha-unix-cstring-bufferoverlap-c "Link to this heading")

Checks for overlap in two buffer arguments. Applies to: `memcpy, mempcpy, wmemcpy, wmempcpy`.

void test() {
  int a\[4\] \= {0};
  memcpy(a + 2, a + 1, 8); // warn
}

#### [1.2.10.4. alpha.unix.cstring.OutOfBounds (C)](#id193)[¶](#alpha-unix-cstring-outofbounds-c "Link to this heading")

Check for out-of-bounds access in string functions, such as: `memcpy, bcopy, strcpy, strncpy, strcat, strncat, memmove, memcmp, memset` and more.

This check also works with string literals, except there is a known bug in that the analyzer cannot detect embedded NULL characters when determining the string length.

void test1() {
  const char str\[\] \= "Hello world";
  char buffer\[\] \= "Hello world";
  memcpy(buffer, str, sizeof(str) + 1); // warn
}

void test2() {
  const char str\[\] \= "Hello world";
  char buffer\[\] \= "Helloworld";
  memcpy(buffer, str, sizeof(str)); // warn
}

#### [1.2.10.5. alpha.unix.cstring.UninitializedRead (C)](#id194)[¶](#alpha-unix-cstring-uninitializedread-c "Link to this heading")

Check for uninitialized reads from common memory copy/manipulation functions such as:

`memcpy, mempcpy, memmove, memcmp, strcmp, strncmp, strcpy, strlen, strsep` and many more.

void test() {
 char src\[10\];
 char dst\[5\];
 memcpy(dst,src,sizeof(dst)); // warn: Bytes string function accesses uninitialized/garbage values
}

Limitations:

> *   Due to limitations of the memory modeling in the analyzer, one can likely observe a lot of false-positive reports like this:
>     
>     > void false\_positive() {
>     >   int src\[\] \= {1, 2, 3, 4};
>     >   int dst\[5\] \= {0};
>     >   memcpy(dst, src, 4 \* sizeof(int)); // false-positive:
>     >   // The 'src' buffer was correctly initialized, yet we cannot conclude
>     >   // that since the analyzer could not see a direct initialization of the
>     >   // very last byte of the source buffer.
>     > }
>     
>     More details at the corresponding [GitHub issue](https://github.com/llvm/llvm-project/issues/43459).
>     

### [1.2.11. alpha.WebKit](#id195)[¶](#alpha-webkit "Link to this heading")

#### [1.2.11.1. alpha.webkit.ForwardDeclChecker](#id196)[¶](#alpha-webkit-forwarddeclchecker "Link to this heading")

Check for local variables, member variables, and function arguments that are forward declared.

struct Obj;
Obj\* provide();

struct Foo {
  Obj\* ptr; // warn
};

 void foo() {
   Obj\* obj \= provide(); // warn
   consume(obj); // warn
 }

#### [1.2.11.2. alpha.webkit.MemoryUnsafeCastChecker](#id197)[¶](#alpha-webkit-memoryunsafecastchecker "Link to this heading")

Check for all casts from a base type to its derived type as these might be memory-unsafe.

Example:

class Base { };
class Derived : public Base { };

void f(Base\* base) {
    Derived\* derived \= static\_cast<Derived\*>(base); // ERROR
}

For all cast operations (C-style casts, static\_cast, reinterpret\_cast, dynamic\_cast), if the source type a Base\* and the destination type is Derived\*, where Derived inherits from Base, the static analyzer should signal an error.

This applies to:

*   C structs, C++ structs and classes, and Objective-C classes and protocols.
    
*   Pointers and references.
    
*   Inside template instantiations and macro expansions that are visible to the compiler.
    

For types like this, instead of using built in casts, the programmer will use helper functions that internally perform the appropriate type check and disable static analysis.

#### [1.2.11.3. alpha.webkit.NoUncheckedPtrMemberChecker](#id198)[¶](#id16 "Link to this heading")

Raw pointers and references to an object which supports CheckedPtr or CheckedRef can’t be used as class members. Only CheckedPtr, CheckedRef, RefPtr, or Ref are allowed.

struct CheckableObj {
  void incrementCheckedPtrCount() {}
  void decrementCheckedPtrCount() {}
};

struct Foo {
  CheckableObj\* ptr; // warn
  CheckableObj& ptr; // warn
  // ...
};

See [WebKit Guidelines for Safer C++ Programming](https://github.com/WebKit/WebKit/wiki/Safer-CPP-Guidelines) for details.

#### [1.2.11.4. alpha.webkit.NoUnretainedMemberChecker](#id199)[¶](#alpha-webkit-nounretainedmemberchecker "Link to this heading")

Raw pointers and references to a NS or CF object can’t be used as class members or ivars. Only RetainPtr is allowed for CF types regardless of whether ARC is enabled or disabled. Only RetainPtr is allowed for NS types when ARC is disabled.

struct Foo {
  NSObject \*ptr; // warn
  // ...
};

See [WebKit Guidelines for Safer C++ Programming](https://github.com/WebKit/WebKit/wiki/Safer-CPP-Guidelines) for details.

#### [1.2.11.5. alpha.webkit.UnretainedLambdaCapturesChecker](#id200)[¶](#alpha-webkit-unretainedlambdacaptureschecker "Link to this heading")

Raw pointers and references to NS or CF types can’t be captured in lambdas. Only RetainPtr is allowed for CF types regardless of whether ARC is enabled or disabled, and only RetainPtr is allowed for NS types when ARC is disabled.

void foo(NSObject \*a, NSObject \*b) {
  \[&, a\](){ // warn about 'a'
    do\_something(b); // warn about 'b'
  };
};

#### [1.2.11.6. alpha.webkit.UncountedCallArgsChecker](#id201)[¶](#alpha-webkit-uncountedcallargschecker "Link to this heading")

The goal of this rule is to make sure that lifetime of any dynamically allocated ref-countable object passed as a call argument spans past the end of the call. This applies to call to any function, method, lambda, function pointer or functor. Ref-countable types aren’t supposed to be allocated on stack so we check arguments for parameters of raw pointers and references to uncounted types.

Here are some examples of situations that we warn about as they _might_ be potentially unsafe. The logic is that either we’re able to guarantee that an argument is safe or it’s considered if not a bug then bug-prone.

> RefCountable\* provide\_uncounted();
> void consume(RefCountable\*);
> 
> // In these cases we can't make sure callee won't directly or indirectly call \`deref()\` on the argument which could make it unsafe from such point until the end of the call.
> 
> void foo1() {
>   consume(provide\_uncounted()); // warn
> }
> 
> void foo2() {
>   RefCountable\* uncounted \= provide\_uncounted();
>   consume(uncounted); // warn
> }

Although we are enforcing member variables to be ref-counted by webkit.NoUncountedMemberChecker any method of the same class still has unrestricted access to these. Since from a caller’s perspective we can’t guarantee a particular member won’t get modified by callee (directly or indirectly) we don’t consider values obtained from members safe.

Note: It’s likely this heuristic could be made more precise with fewer false positives - for example calls to free functions that don’t have any parameter other than the pointer should be safe as the callee won’t be able to tamper with the member unless it’s a global variable.

> struct Foo {
>   RefPtr<RefCountable\> member;
>   void consume(RefCountable\*) { /\* ... \*/ }
>   void bugprone() {
>     consume(member.get()); // warn
>   }
> };

The implementation of this rule is a heuristic - we define a whitelist of kinds of values that are considered safe to be passed as arguments. If we can’t prove an argument is safe it’s considered an error.

Allowed kinds of arguments:

*   values obtained from ref-counted objects (including temporaries as those survive the call too)
    
    RefCountable\* provide\_uncounted();
    void consume(RefCountable\*);
    
    void foo() {
      RefPtr<RefCountable\> rc \= makeRef(provide\_uncounted());
      consume(rc.get()); // ok
      consume(makeRef(provide\_uncounted()).get()); // ok
    }
    
*   forwarding uncounted arguments from caller to callee
    
    void foo(RefCountable& a) {
      bar(a); // ok
    }
    
    Caller of `foo()` is responsible for `a`’s lifetime.
    
*   `this` pointer
    
    void Foo::foo() {
      baz(this);  // ok
    }
    
    Caller of `foo()` is responsible for keeping the memory pointed to by `this` pointer safe.
    
*   constants
    
    foo(nullptr, NULL, 0); // ok
    

We also define a set of safe transformations which if passed a safe value as an input provide (usually it’s the return value) a safe value (or an object that provides safe values). This is also a heuristic.

*   constructors of ref-counted types (including factory methods)
    
*   getters of ref-counted types
    
*   member overloaded operators
    
*   casts
    
*   unary operators like `&` or `*`
    

#### [1.2.11.7. alpha.webkit.UncheckedCallArgsChecker](#id202)[¶](#alpha-webkit-uncheckedcallargschecker "Link to this heading")

The goal of this rule is to make sure that lifetime of any dynamically allocated CheckedPtr capable object passed as a call argument keeps its memory region past the end of the call. This applies to call to any function, method, lambda, function pointer or functor. CheckedPtr capable objects aren’t supposed to be allocated on stack so we check arguments for parameters of raw pointers and references to unchecked types.

The rules of when to use and not to use CheckedPtr / CheckedRef are same as alpha.webkit.UncountedCallArgsChecker for ref-counted objects.

#### [1.2.11.8. alpha.webkit.UnretainedCallArgsChecker](#id203)[¶](#alpha-webkit-unretainedcallargschecker "Link to this heading")

The goal of this rule is to make sure that lifetime of any dynamically allocated NS or CF objects passed as a call argument keeps its memory region past the end of the call. This applies to call to any function, method, lambda, function pointer or functor. NS or CF objects aren’t supposed to be allocated on stack so we check arguments for parameters of raw pointers and references to unretained types.

The rules of when to use and not to use RetainPtr are same as alpha.webkit.UncountedCallArgsChecker for ref-counted objects.

#### [1.2.11.9. alpha.webkit.UncountedLocalVarsChecker](#id204)[¶](#alpha-webkit-uncountedlocalvarschecker "Link to this heading")

The goal of this rule is to make sure that any uncounted local variable is backed by a ref-counted object with lifetime that is strictly larger than the scope of the uncounted local variable. To be on the safe side we require the scope of an uncounted variable to be embedded in the scope of ref-counted object that backs it.

These are examples of cases that we consider safe:

> void foo1() {
>   RefPtr<RefCountable\> counted;
>   // The scope of uncounted is EMBEDDED in the scope of counted.
>   {
>     RefCountable\* uncounted \= counted.get(); // ok
>   }
> }
> 
> void foo2(RefPtr<RefCountable\> counted\_param) {
>   RefCountable\* uncounted \= counted\_param.get(); // ok
> }
> 
> void FooClass::foo\_method() {
>   RefCountable\* uncounted \= this; // ok
> }

Here are some examples of situations that we warn about as they _might_ be potentially unsafe. The logic is that either we’re able to guarantee that a local variable is safe or it’s considered unsafe.

> void foo1() {
>   RefCountable\* uncounted \= new RefCountable; // warn
> }
> 
> RefCountable\* global\_uncounted;
> void foo2() {
>   RefCountable\* uncounted \= global\_uncounted; // warn
> }
> 
> void foo3() {
>   RefPtr<RefCountable\> counted;
>   // The scope of uncounted is not EMBEDDED in the scope of counted.
>   RefCountable\* uncounted \= counted.get(); // warn
> }

#### [1.2.11.10. alpha.webkit.UncheckedLocalVarsChecker](#id205)[¶](#alpha-webkit-uncheckedlocalvarschecker "Link to this heading")

The goal of this rule is to make sure that any unchecked local variable is backed by a CheckedPtr or CheckedRef with lifetime that is strictly larger than the scope of the unchecked local variable. To be on the safe side we require the scope of an unchecked variable to be embedded in the scope of CheckedPtr/CheckRef object that backs it.

These are examples of cases that we consider safe:

> void foo1() {
>   CheckedPtr<RefCountable\> counted;
>   // The scope of uncounted is EMBEDDED in the scope of counted.
>   {
>     RefCountable\* uncounted \= counted.get(); // ok
>   }
> }
> 
> void foo2(CheckedPtr<RefCountable\> counted\_param) {
>   RefCountable\* uncounted \= counted\_param.get(); // ok
> }
> 
> void FooClass::foo\_method() {
>   RefCountable\* uncounted \= this; // ok
> }

Here are some examples of situations that we warn about as they _might_ be potentially unsafe. The logic is that either we’re able to guarantee that a local variable is safe or it’s considered unsafe.

> void foo1() {
>   RefCountable\* uncounted \= new RefCountable; // warn
> }
> 
> RefCountable\* global\_uncounted;
> void foo2() {
>   RefCountable\* uncounted \= global\_uncounted; // warn
> }
> 
> void foo3() {
>   RefPtr<RefCountable\> counted;
>   // The scope of uncounted is not EMBEDDED in the scope of counted.
>   RefCountable\* uncounted \= counted.get(); // warn
> }

#### [1.2.11.11. alpha.webkit.UnretainedLocalVarsChecker](#id206)[¶](#alpha-webkit-unretainedlocalvarschecker "Link to this heading")

The goal of this rule is to make sure that any NS or CF local variable is backed by a RetainPtr with lifetime that is strictly larger than the scope of the unretained local variable. To be on the safe side we require the scope of an unretained variable to be embedded in the scope of Retainptr object that backs it.

The rules of when to use and not to use RetainPtr are same as alpha.webkit.UncountedCallArgsChecker for ref-counted objects.

These are examples of cases that we consider safe:

> void foo1() {
>   RetainPtr<NSObject\> retained;
>   // The scope of unretained is EMBEDDED in the scope of retained.
>   {
>     NSObject\* unretained \= retained.get(); // ok
>   }
> }
> 
> void foo2(RetainPtr<NSObject\> retained\_param) {
>   NSObject\* unretained \= retained\_param.get(); // ok
> }
> 
> void FooClass::foo\_method() {
>   NSObject\* unretained \= this; // ok
> }

Here are some examples of situations that we warn about as they _might_ be potentially unsafe. The logic is that either we’re able to guarantee that a local variable is safe or it’s considered unsafe.

> void foo1() {
>   NSObject\* unretained \= \[\[NSObject alloc\] init\]; // warn
> }
> 
> NSObject\* global\_unretained;
> void foo2() {
>   NSObject\* unretained \= global\_unretained; // warn
> }
> 
> void foo3() {
>   RetainPtr<NSObject\> retained;
>   // The scope of unretained is not EMBEDDED in the scope of retained.
>   NSObject\* unretained \= retained.get(); // warn
> }

#### [1.2.11.12. webkit.RetainPtrCtorAdoptChecker](#id207)[¶](#webkit-retainptrctoradoptchecker "Link to this heading")

The goal of this rule is to make sure the constructor of RetainPtr as well as adoptNS and adoptCF are used correctly. When creating a RetainPtr with +1 semantics, adoptNS or adoptCF should be used, and in +0 semantics, RetainPtr constructor should be used. Warn otherwise.

These are examples of cases that we consider correct:

> RetainPtr ptr \= adoptNS(\[\[NSObject alloc\] init\]); // ok
> RetainPtr ptr \= CGImageGetColorSpace(image); // ok

Here are some examples of cases that we consider incorrect use of RetainPtr constructor and adoptCF

> RetainPtr ptr \= \[\[NSObject alloc\] init\]; // warn
> auto ptr \= adoptCF(CGImageGetColorSpace(image)); // warn

[1.3. Debug Checkers](#id208)[¶](#debug-checkers "Link to this heading")
------------------------------------------------------------------------

### [1.3.1. debug](#id209)[¶](#debug "Link to this heading")

Checkers used for debugging the analyzer. [Debug Checks](https://clang.llvm.org/docs/analyzer/developer-docs/DebugChecks.html) page contains a detailed description.

#### [1.3.1.1. debug.AnalysisOrder](#id210)[¶](#debug-analysisorder "Link to this heading")

Print callbacks that are called during analysis in order.

#### [1.3.1.2. debug.ConfigDumper](#id211)[¶](#debug-configdumper "Link to this heading")

Dump config table.

#### [1.3.1.3. debug.DumpCFG Display](#id212)[¶](#debug-dumpcfg-display "Link to this heading")

Control-Flow Graphs.

#### [1.3.1.4. debug.DumpCallGraph](#id213)[¶](#debug-dumpcallgraph "Link to this heading")

Display Call Graph.

#### [1.3.1.5. debug.DumpCalls](#id214)[¶](#debug-dumpcalls "Link to this heading")

Print calls as they are traversed by the engine.

#### [1.3.1.6. debug.DumpDominators](#id215)[¶](#debug-dumpdominators "Link to this heading")

Print the dominance tree for a given CFG.

#### [1.3.1.7. debug.DumpLiveVars](#id216)[¶](#debug-dumplivevars "Link to this heading")

Print results of live variable analysis.

#### [1.3.1.8. debug.DumpTraversal](#id217)[¶](#debug-dumptraversal "Link to this heading")

Print branch conditions as they are traversed by the engine.

#### [1.3.1.9. debug.ExprInspection](#id218)[¶](#debug-exprinspection "Link to this heading")

Check the analyzer’s understanding of expressions.

#### [1.3.1.10. debug.Stats](#id219)[¶](#debug-stats "Link to this heading")

Emit warnings with analyzer statistics.

#### [1.3.1.11. debug.TaintTest](#id220)[¶](#debug-tainttest "Link to this heading")

Mark tainted symbols as such.

#### [1.3.1.12. debug.ViewCFG](#id221)[¶](#debug-viewcfg "Link to this heading")

View Control-Flow Graphs using GraphViz.

#### [1.3.1.13. debug.ViewCallGraph](#id222)[¶](#debug-viewcallgraph "Link to this heading")

View Call Graph using GraphViz.

#### [1.3.1.14. debug.ViewExplodedGraph](#id223)[¶](#debug-viewexplodedgraph "Link to this heading")

View Exploded Graphs using GraphViz.
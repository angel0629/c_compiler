---
title: "AST Matcher Reference"
source: "https://clang.llvm.org/docs/LibASTMatchersReference.html#recordDecl0Anchor"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
This document shows all currently implemented matchers. The matchers are grouped by category and node type they match. You can click on matcher names to show the matcher's source documentation.

There are three different basic categories of matchers:

*   [Node Matchers:](#decl-matchers) Matchers that match a specific type of AST node.
*   [Narrowing Matchers:](#narrowing-matchers) Matchers that match attributes on AST nodes.
*   [Traversal Matchers:](#traversal-matchers) Matchers that allow traversal between AST nodes.

Within each category the matchers are ordered by node type they match on. Note that if a matcher can match multiple node types, it will appear multiple times. This means that by searching for Matcher<Stmt> you can find all matchers that can be used to match on Stmt nodes.

The exception to that rule are matchers that can match on any node. Those are marked with a \* and are listed in the beginning of each category.

Note that the categorization of matchers is a great help when you combine them into matcher expressions. You will usually want to form matcher expressions that read like english sentences by alternating between node matchers and narrowing or traversal matchers, like this:

recordDecl(hasDescendant(
    ifStmt(hasTrueExpression(
        expr(hasDescendant(
            ifStmt()))))))

Traverse Mode
-------------

The default mode of operation of AST Matchers visits all nodes in the AST, even if they are not spelled in the source. This is AsIs mode. This mode requires writing AST matchers that explicitly traverse or ignore implicit nodes, such as parentheses surrounding an expression or expressions with cleanups. These implicit nodes are not always obvious from the syntax of the source code, and so this mode requires careful consideration and testing to get the desired behavior from an AST matcher.

In addition, because template instantiations are matched in the default mode, transformations can be accidentally made to template declarations. Finally, because implicit nodes are matched by default, transformations can be made on entirely incorrect places in the code.

For these reasons, it is possible to ignore AST nodes which are not spelled in the source using the IgnoreUnlessSpelledInSource mode. This is likely to be far less error-prone for users who are not already very familiar with where implicit nodes appear in the AST. It is also likely to be less error-prone for experienced AST users, as difficult cases do not need to be encountered and matcher expressions adjusted for these cases.

In clang-query, the mode can be changed with

set traversal IgnoreUnlessSpelledInSource

This affects both matchers and AST dump output in results.

When using the C++ API such as in clang-tidy checks, the traverse() matcher is used to set the mode:

Finder->addMatcher(traverse(TK\_IgnoreUnlessSpelledInSource,
  returnStmt(hasReturnValue(integerLiteral(equals(0))))
  ), this);

The following table compares the AsIs mode with the IgnoreUnlessSpelledInSource mode:

AsIs

IgnoreUnlessSpelledInSource

AST dump of func1:

struct B {
  B(int);
};

B func1() { return 42; }

C++98 dialect:

FunctionDecl
\`-CompoundStmt
  \`-ReturnStmt
    \`-ExprWithCleanups
      \`-CXXConstructExpr
        \`-MaterializeTemporaryExpr
          \`-ImplicitCastExpr
            \`-ImplicitCastExpr
              \`-CXXConstructExpr
                \`-IntegerLiteral 'int' 42

C++11, C++14 dialect:

FunctionDecl
\`-CompoundStmt
  \`-ReturnStmt
    \`-ExprWithCleanups
      \`-CXXConstructExpr
        \`-MaterializeTemporaryExpr
          \`-ImplicitCastExpr
            \`-CXXConstructExpr
              \`-IntegerLiteral 'int' 42

C++17, C++20 dialect:

FunctionDecl
\`-CompoundStmt
  \`-ReturnStmt
    \`-ImplicitCastExpr
      \`-CXXConstructExpr
        \`-IntegerLiteral 'int' 42

All dialects:

FunctionDecl
\`-CompoundStmt
  \`-ReturnStmt
    \`-IntegerLiteral 'int' 42

Matcher for returned 42:

struct B {
  B(int);
};

B func1() { return 42; }

All dialects:

returnStmt(hasReturnValue(
    ignoringImplicit(
        ignoringElidableConstructorCall(
            ignoringImplicit(
                cxxConstructExpr(hasArgument(0,
                    ignoringImplicit(
                        integerLiteral().bind("returnVal")
                        )
                    ))
                )
            )
        )
    ))

All dialects:

returnStmt(hasReturnValue(
    integerLiteral().bind("returnVal")
))

Match result for

implicitCastExpr()

given:

struct B {
  B(int);
};

B func1() { return 42; }

Match found.

No match.

Match result for:

cxxConstructorDecl(
  isCopyConstructor()
  ).bind("prepend\_explicit")

given:

struct Other {};
struct Copyable {
  Other m\_o;
  Copyable();
};

Match found. Insertion produces incorrect output:

struct Other {};
struct explicit Copyable {
  Other m\_o;
  Copyable();
};

No match found. Incorrect replacement not possible.

Replacement of begin() with cbegin():

cxxMemberCallExpr(
  on(ConstContainerExpr),
  callee(cxxMethodDecl(hasName("begin")))
  ).bind("replace\_with\_cbegin")

given:

void foo() {
  const Container c;
  c.begin();

  for (auto i : c) {
  }
}

2 matches found. Replacement produces incorrect output:

void foo() {
  const Container c;
  c.cbegin();

  for (auto i :.cbegin() c) {
  }
}

1 match found. Replacement produces correct output:

void foo() {
  const Container c;
  c.cbegin();

  for (auto i : c) {
  }
}

Replacement of int member with safe\_int:

fieldDecl(
  hasType(asString("int"))
  ).bind("use\_safe\_int")

given:

struct S {
  int m\_i;
};

template <typename T> struct TemplStruct {
  TemplStruct() {}
  ~TemplStruct() {}

private:
  T m\_t;
};

void instantiate() { TemplStruct<int> ti; }

2 matches found. Replacement produces incorrect output:

struct S {
  safe\_int m\_i;
};

template <typename T> struct TemplStruct {
  TemplStruct() {}
  ~TemplStruct() {}

private:
  safe\_int m\_t;
};

void instantiate() { TemplStruct<int> ti; }

1 match found. Replacement produces correct output:

struct S {
  safe\_int m\_i;
};

template <typename T> struct TemplStruct {
  TemplStruct() {}
  ~TemplStruct() {}

private:
  T m\_t;
};

void instantiate() { TemplStruct<int> ti; }

Add prefix to member initializer

cxxCtorInitializer(
  forField(fieldDecl())
  ).bind("add\_prefix")

given:

struct Simple {};

struct Record {
  Record() : i(42) {}
private:
  int i;
  Simple s;
};

2 matches found. Replacement produces incorrect output:

struct Simple {};

struct Record {
  m\_Record() : m\_i(42) {}
private:
  int i;
  Simple s;
};

1 match found. Replacement produces correct output:

struct Simple {};

struct Record {
  Record() : m\_i(42) {}
private:
  int i;
  Simple s;
};

Ignored default arguments

callExpr(
  callee(functionDecl(
    hasName("hasDefaultArg")
    )),
  argumentCountIs(1)
  ).bind("add\_prefix")

given:

void hasDefaultArg(int i, int j = 0) {}
void callDefaultArg() { hasDefaultArg(42); }

No match.

1 match found.

Lambda fields

fieldDecl(
  hasType(asString("int"))
  ).bind("make\_safe")

given:

struct S {
  int m\_i;
};

void func() {
  int a = 0;
  int c = 0;

  auto l = \[a, b = c\](int d) { int e = d; };
  l(43);
}

2 matches found. Replacement produces incorrect output:

struct S {
  safe\_int m\_i;
};

void func() {
  int a = 0;
  int c = 0;

  auto l = \[safe\_a, safe\_b = c\](int d) { int e = d; };
  l(43);
}

1 match found. Replacement produces correct output:

struct S {
  safe\_int m\_i;
};

void func() {
  int a = 0;
  int c = 0;

  auto l = \[a, b = c\](int d) { int e = d; };
  l(43);
}

Rewritten binary operators

binaryOperator(
  hasOperatorName("<"),
  hasRHS(hasDescendant(integerLiteral(equals(0))))
  )

given:

#include <compare>

class HasSpaceship {
public:
   int x;
   bool operator==(const HasSpaceship&) const = default;
   std::strong\_ordering operator<=>(const HasSpaceship&) const = default;
};

bool isLess(const HasSpaceship& a, const HasSpaceship& b) {
   return a < b;
}

1 match found.

   return a < b;
          ^~~~~

No match found.

Node Matchers
-------------

Node matchers are at the core of matcher expressions - they specify the type of node that is expected. Every match expression starts with a node matcher, which can then be further refined with a narrowing or traversal matcher. All traversal matchers take node matchers as their arguments.

For convenience, all node matchers take an arbitrary number of arguments and implicitly act as allOf matchers.

Node matchers are the only matchers that support the bind("id") call to bind the matched node to the given string, to be later retrieved from the match callback.

It is important to remember that the arguments to node matchers are predicates on the same node, just with additional information about the type. This is often useful to make matcher expression more readable by inlining bind calls into redundant node matchers inside another node matcher:

// This binds the CXXRecordDecl to "id", as the decl() matcher will stay on
// the same node.
recordDecl(decl().bind("id"), hasName("::MyClass"))

Return type

Name

Parameters

Matcher<[Attr](https://clang.llvm.org/doxygen/classclang_1_1Attr.html)\>

attr

Matcher<[Attr](https://clang.llvm.org/doxygen/classclang_1_1Attr.html)\>...

Matches attributes.
Attributes may be attached with a variety of different syntaxes (including
keywords, C++11 attributes, GNU \`\`\_\_attribute\`\`\` and MSVC \`\_\_declspec\`\`,
and \`\`#pragma\`\`s). They may also be implicit.

Given
  struct \[\[nodiscard\]\] Foo{};
  void bar(int \* \_\_attribute\_\_((nonnull)) );
  \_\_declspec(noinline) void baz();

  #pragma omp declare simd
  int min();
attr()
  matches "nodiscard", "nonnull", "noinline", and the whole "#pragma" line.

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

cxxBaseSpecifier

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>...

Matches class bases.

Examples matches public virtual B.
  class B {};
  class C : public virtual B {};

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

cxxCtorInitializer

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>...

Matches constructor initializers.

Examples matches i(42).
  class C {
    C() : i(42) {}
    int i;
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

accessSpecDecl

Matcher<[AccessSpecDecl](https://clang.llvm.org/doxygen/classclang_1_1AccessSpecDecl.html)\>...

Matches C++ access specifier declarations.

Given
  class C {
  public:
    int a;
  };
accessSpecDecl()
  matches 'public:'

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

bindingDecl

Matcher<[BindingDecl](https://clang.llvm.org/doxygen/classclang_1_1BindingDecl.html)\>...

Matches binding declarations
Example matches foo and bar
(matcher = bindingDecl()

  auto \[foo, bar\] = std::make\_pair{42, 42};

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

blockDecl

Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>...

Matches block declarations.

Example matches the declaration of the nameless block printing an input
integer.

  myFunc(^(int p) {
    printf("%d", p);
  })

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

classTemplateDecl

Matcher<[ClassTemplateDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateDecl.html)\>...

Matches C++ class template declarations.

Example matches Z
  template<class T> class Z {};

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

classTemplatePartialSpecializationDecl

Matcher<[ClassTemplatePartialSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplatePartialSpecializationDecl.html)\>...

Matches C++ class template partial specializations.

Given
  template<class T1, class T2, int I>
  class A {};

  template<class T, int I>
  class A<T, T\*, I> {};

  template<>
  class A<int, int, 1> {};
classTemplatePartialSpecializationDecl()
  matches the specialization A<T,T\*,I> but not A<int,int,1>

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

classTemplateSpecializationDecl

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>...

Matches C++ class template specializations.

Given
  template<typename T> class A {};
  template<> class A<double> {};
  A<int> a;
classTemplateSpecializationDecl()
  matches the specializations A<int> and A<double>

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

conceptDecl

Matcher<[ConceptDecl](https://clang.llvm.org/doxygen/classclang_1_1ConceptDecl.html)\>...

Matches concept declarations.

Example matches integral
  template<typename T>
  concept integral = std::is\_integral\_v<T>;

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

cxxConstructorDecl

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>...

Matches C++ constructor declarations.

Example matches Foo::Foo() and Foo::Foo(int)
  class Foo {
   public:
    Foo();
    Foo(int);
    int DoSomething();
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

cxxConversionDecl

Matcher<[CXXConversionDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConversionDecl.html)\>...

Matches conversion operator declarations.

Example matches the operator.
  class X { operator int() const; };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

cxxDeductionGuideDecl

Matcher<[CXXDeductionGuideDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXDeductionGuideDecl.html)\>...

Matches user-defined and implicitly generated deduction guide.

Example matches the deduction guide.
  template<typename T>
  class X { X(int) };
  X(int) -> X<int>;

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

cxxDestructorDecl

Matcher<[CXXDestructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXDestructorDecl.html)\>...

Matches explicit C++ destructor declarations.

Example matches Foo::~Foo()
  class Foo {
   public:
    virtual ~Foo();
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

cxxMethodDecl

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>...

Matches method declarations.

Example matches y
  class X { void y(); };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

cxxRecordDecl

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>...

Matches C++ class declarations.

Example matches X, Z
  class X;
  template<class T> class Z {};

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

decl

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>...

Matches declarations.

Examples matches X, C, and the friend declaration inside C;
  void X();
  class C {
    friend X;
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

declaratorDecl

Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>...

Matches declarator declarations (field, variable, function
and non-type template parameter declarations).

Given
  class X { int y; };
declaratorDecl()
  matches int y.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

decompositionDecl

Matcher<[DecompositionDecl](https://clang.llvm.org/doxygen/classclang_1_1DecompositionDecl.html)\>...

Matches decomposition-declarations.

Examples matches the declaration node with foo and bar, but not
number.
(matcher = declStmt(has(decompositionDecl())))

  int number = 42;
  auto \[foo, bar\] = std::make\_pair{42, 42};

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

enumConstantDecl

Matcher<[EnumConstantDecl](https://clang.llvm.org/doxygen/classclang_1_1EnumConstantDecl.html)\>...

Matches enum constants.

Example matches A, B, C
  enum X {
    A, B, C
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

enumDecl

Matcher<[EnumDecl](https://clang.llvm.org/doxygen/classclang_1_1EnumDecl.html)\>...

Matches enum declarations.

Example matches X
  enum X {
    A, B, C
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

exportDecl

Matcher<[ExportDecl](https://clang.llvm.org/doxygen/classclang_1_1ExportDecl.html)\>...

Matches any export declaration.

Example matches following declarations.
  export void foo();
  export { void foo(); }
  export namespace { void foo(); }
  export int v;

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

fieldDecl

Matcher<[FieldDecl](https://clang.llvm.org/doxygen/classclang_1_1FieldDecl.html)\>...

Matches field declarations.

Given
  class X { int m; };
fieldDecl()
  matches 'm'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

friendDecl

Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>...

Matches friend declarations.

Given
  class X { friend void foo(); };
friendDecl()
  matches 'friend void foo()'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

functionDecl

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>...

Matches function declarations.

Example matches f
  void f();

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

functionTemplateDecl

Matcher<[FunctionTemplateDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionTemplateDecl.html)\>...

Matches C++ function template declarations.

Example matches f
  template<class T> void f(T t) {}

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

indirectFieldDecl

Matcher<[IndirectFieldDecl](https://clang.llvm.org/doxygen/classclang_1_1IndirectFieldDecl.html)\>...

Matches indirect field declarations.

Given
  struct X { struct { int a; }; };
indirectFieldDecl()
  matches 'a'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

labelDecl

Matcher<[LabelDecl](https://clang.llvm.org/doxygen/classclang_1_1LabelDecl.html)\>...

Matches a declaration of label.

Given
  goto FOO;
  FOO: bar();
labelDecl()
  matches 'FOO:'

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

linkageSpecDecl

Matcher<[LinkageSpecDecl](https://clang.llvm.org/doxygen/classclang_1_1LinkageSpecDecl.html)\>...

Matches a declaration of a linkage specification.

Given
  extern "C" {}
linkageSpecDecl()
  matches "extern "C" {}"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

namedDecl

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\>...

Matches a declaration of anything that could have a name.

Example matches X, S, the anonymous union type, i, and U;
  typedef int X;
  struct S {
    union {
      int i;
    } U;
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

namespaceAliasDecl

Matcher<[NamespaceAliasDecl](https://clang.llvm.org/doxygen/classclang_1_1NamespaceAliasDecl.html)\>...

Matches a declaration of a namespace alias.

Given
  namespace test {}
  namespace alias = ::test;
namespaceAliasDecl()
  matches "namespace alias" but not "namespace test"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

namespaceDecl

Matcher<[NamespaceDecl](https://clang.llvm.org/doxygen/classclang_1_1NamespaceDecl.html)\>...

Matches a declaration of a namespace.

Given
  namespace {}
  namespace test {}
namespaceDecl()
  matches "namespace {}" and "namespace test {}"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

nonTypeTemplateParmDecl

Matcher<[NonTypeTemplateParmDecl](https://clang.llvm.org/doxygen/classclang_1_1NonTypeTemplateParmDecl.html)\>...

Matches non-type template parameter declarations.

Given
  template <typename T, int N> struct C {};
nonTypeTemplateParmDecl()
  matches 'N', but not 'T'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcCategoryDecl

Matcher<[ObjCCategoryDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCCategoryDecl.html)\>...

Matches Objective-C category declarations.

Example matches Foo (Additions)
  @interface Foo (Additions)
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcCategoryImplDecl

Matcher<[ObjCCategoryImplDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCCategoryImplDecl.html)\>...

Matches Objective-C category definitions.

Example matches Foo (Additions)
  @implementation Foo (Additions)
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcImplementationDecl

Matcher<[ObjCImplementationDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCImplementationDecl.html)\>...

Matches Objective-C implementation declarations.

Example matches Foo
  @implementation Foo
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcInterfaceDecl

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>...

Matches Objective-C interface declarations.

Example matches Foo
  @interface Foo
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcIvarDecl

Matcher<[ObjCIvarDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCIvarDecl.html)\>...

Matches Objective-C instance variable declarations.

Example matches \_enabled
  @implementation Foo {
    BOOL \_enabled;
  }
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcMethodDecl

Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>...

Matches Objective-C method declarations.

Example matches both declaration and definition of -\[Foo method\]
  @interface Foo
  - (void)method;
  @end

  @implementation Foo
  - (void)method {}
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcPropertyDecl

Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>...

Matches Objective-C property declarations.

Example matches enabled
  @interface Foo
  @property BOOL enabled;
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

objcProtocolDecl

Matcher<[ObjCProtocolDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCProtocolDecl.html)\>...

Matches Objective-C protocol declarations.

Example matches FooDelegate
  @protocol FooDelegate
  @end

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

parmVarDecl

Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\>...

Matches parameter variable declarations.

Given
  void f(int x);
parmVarDecl()
  matches int x.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

recordDecl

Matcher<[RecordDecl](https://clang.llvm.org/doxygen/classclang_1_1RecordDecl.html)\>...

Matches class, struct, and union declarations.

Example matches X, Z, U, and S
  class X;
  template<class T> class Z {};
  struct S {};
  union U {};

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

staticAssertDecl

Matcher<[StaticAssertDecl](https://clang.llvm.org/doxygen/classclang_1_1StaticAssertDecl.html)\>...

Matches a C++ static\_assert declaration.

Example:
  staticAssertDecl()
matches
  static\_assert(sizeof(S) == sizeof(int))
in
  struct S {
    int x;
  };
  static\_assert(sizeof(S) == sizeof(int));

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

tagDecl

Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>...

Matches tag declarations.

Example matches X, Z, U, S, E
  class X;
  template<class T> class Z {};
  struct S {};
  union U {};
  enum E {
    A, B, C
  };

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

templateTemplateParmDecl

Matcher<[TemplateTemplateParmDecl](https://clang.llvm.org/doxygen/classclang_1_1TemplateTemplateParmDecl.html)\>...

Matches template template parameter declarations.

Given
  template <template <typename> class Z, int N> struct C {};
templateTypeParmDecl()
  matches 'Z', but not 'N'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

templateTypeParmDecl

Matcher<[TemplateTypeParmDecl](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmDecl.html)\>...

Matches template type parameter declarations.

Given
  template <typename T, int N> struct C {};
templateTypeParmDecl()
  matches 'T', but not 'N'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

translationUnitDecl

Matcher<[TranslationUnitDecl](https://clang.llvm.org/doxygen/classclang_1_1TranslationUnitDecl.html)\>...

Matches the top declaration context.

Given
  int X;
  namespace NS {
  int Y;
  }  // namespace NS
decl(hasDeclContext(translationUnitDecl()))
  matches "int X", but not "int Y".

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

typeAliasDecl

Matcher<[TypeAliasDecl](https://clang.llvm.org/doxygen/classclang_1_1TypeAliasDecl.html)\>...

Matches type alias declarations.

Given
  typedef int X;
  using Y = int;
typeAliasDecl()
  matches "using Y = int", but not "typedef int X"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

typeAliasTemplateDecl

Matcher<[TypeAliasTemplateDecl](https://clang.llvm.org/doxygen/classclang_1_1TypeAliasTemplateDecl.html)\>...

Matches type alias template declarations.

typeAliasTemplateDecl() matches
  template <typename T>
  using Y = X<T>;

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

typedefDecl

Matcher<[TypedefDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefDecl.html)\>...

Matches typedef declarations.

Given
  typedef int X;
  using Y = int;
typedefDecl()
  matches "typedef int X", but not "using Y = int"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

typedefNameDecl

Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>...

Matches typedef name declarations.

Given
  typedef int X;
  using Y = int;
typedefNameDecl()
  matches "typedef int X" and "using Y = int"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

unresolvedUsingTypenameDecl

Matcher<[UnresolvedUsingTypenameDecl](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingTypenameDecl.html)\>...

Matches unresolved using value declarations that involve the
typename.

Given
  template <typename T>
  struct Base { typedef T Foo; };

  template<typename T>
  struct S : private Base<T> {
    using typename Base<T>::Foo;
  };
unresolvedUsingTypenameDecl()
  matches using Base<T>::Foo 

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

unresolvedUsingValueDecl

Matcher<[UnresolvedUsingValueDecl](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingValueDecl.html)\>...

Matches unresolved using value declarations.

Given
  template<typename X>
  class C : private X {
    using X::x;
  };
unresolvedUsingValueDecl()
  matches using X::x 

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

usingDecl

Matcher<[UsingDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingDecl.html)\>...

Matches using declarations.

Given
  namespace X { int x; }
  using X::x;
usingDecl()
  matches using X::x 

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

usingDirectiveDecl

Matcher<[UsingDirectiveDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingDirectiveDecl.html)\>...

Matches using namespace declarations.

Given
  namespace X { int x; }
  using namespace X;
usingDirectiveDecl()
  matches using namespace X 

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

usingEnumDecl

Matcher<[UsingEnumDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingEnumDecl.html)\>...

Matches using-enum declarations.

Given
  namespace X { enum x {...}; }
  using enum X::x;
usingEnumDecl()
  matches using enum X::x 

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

valueDecl

Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>...

Matches any value declaration.

Example matches A, B, C and F
  enum X { A, B, C };
  void F();

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

varDecl

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>...

Matches variable declarations.

Note: this does not match declarations of member variables, which are
"field" declarations in Clang parlance.

Example matches a
  int a;

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\>

lambdaCapture

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\>...

Matches lambda captures.

Given
  int main() {
    int x;
    auto f = \[x\](){};
    auto g = \[x = 1\](){};
  }
In the matcher \`lambdaExpr(hasAnyCapture(lambdaCapture()))\`,
\`lambdaCapture()\` matches \`x\` and \`x=1\`.

Matcher<[NestedNameSpecifierLoc](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifierLoc.html)\>

nestedNameSpecifierLoc

Matcher<[NestedNameSpecifierLoc](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifierLoc.html)\>...

Same as nestedNameSpecifier but matches NestedNameSpecifierLoc.

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\>

nestedNameSpecifier

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\>...

Matches nested name specifiers.

Given
  namespace ns {
    struct A { static void f(); };
    void A::f() {}
    void g() { A::f(); }
  }
  ns::A a;
nestedNameSpecifier()
  matches "ns::" and both "A::"

Matcher<[OMPClause](https://clang.llvm.org/doxygen/classclang_1_1OMPClause.html)\>

ompDefaultClause

Matcher<[OMPDefaultClause](https://clang.llvm.org/doxygen/classclang_1_1OMPDefaultClause.html)\>...

Matches OpenMP \`\`default\`\` clause.

Given

  #pragma omp parallel default(none)
  #pragma omp parallel default(shared)
  #pragma omp parallel default(private)
  #pragma omp parallel default(firstprivate)
  #pragma omp parallel

\`\`ompDefaultClause()\`\` matches \`\`default(none)\`\`, \`\`default(shared)\`\`,
\`\` default(private)\`\` and \`\`default(firstprivate)\`\`

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

qualType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>...

Matches QualTypes in the clang AST.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

addrLabelExpr

Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>...

Matches address of label statements (GNU extension).

Given
  FOO: bar();
  void \*ptr = &&FOO;
  goto \*bar;
addrLabelExpr()
  matches '&&FOO'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

arrayInitIndexExpr

Matcher<[ArrayInitIndexExpr](https://clang.llvm.org/doxygen/classclang_1_1ArrayInitIndexExpr.html)\>...

The arrayInitIndexExpr consists of two subexpressions: a common expression
(the source array) that is evaluated once up-front, and a per-element initializer
that runs once for each array element. Within the per-element initializer,
the current index may be obtained via an ArrayInitIndexExpr.

Given
  void testStructBinding() {
    int a\[2\] = {1, 2};
    auto \[x, y\] = a;
  }
arrayInitIndexExpr() matches the array index that implicitly iterates
over the array \`a\` to copy each element to the anonymous array
that backs the structured binding \`\[x, y\]\` elements of which are
referred to by their aliases \`x\` and \`y\`.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

arrayInitLoopExpr

Matcher<[ArrayInitLoopExpr](https://clang.llvm.org/doxygen/classclang_1_1ArrayInitLoopExpr.html)\>...

Matches a loop initializing the elements of an array in a number of contexts:
 \* in the implicit copy/move constructor for a class with an array member
 \* when a lambda-expression captures an array by value
 \* when a decomposition declaration decomposes an array

Given
  void testLambdaCapture() {
    int a\[10\];
    auto Lam1 = \[a\]() {
      return;
    };
  }
arrayInitLoopExpr() matches the implicit loop that initializes each element of
the implicit array field inside the lambda object, that represents the array \`a\`
captured by value.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

arraySubscriptExpr

Matcher<[ArraySubscriptExpr](https://clang.llvm.org/doxygen/classclang_1_1ArraySubscriptExpr.html)\>...

Matches array subscript expressions.

Given
  int i = a\[1\];
arraySubscriptExpr()
  matches "a\[1\]"

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

asmStmt

Matcher<[AsmStmt](https://clang.llvm.org/doxygen/classclang_1_1AsmStmt.html)\>...

Matches asm statements.

 int i = 100;
  \_\_asm("mov al, 2");
asmStmt()
  matches '\_\_asm("mov al, 2")'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

atomicExpr

Matcher<[AtomicExpr](https://clang.llvm.org/doxygen/classclang_1_1AtomicExpr.html)\>...

Matches atomic builtins.
Example matches \_\_atomic\_load\_n(ptr, 1)
  void foo() { int \*ptr; \_\_atomic\_load\_n(ptr, 1); }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

autoreleasePoolStmt

Matcher<[ObjCAutoreleasePoolStmt](https://clang.llvm.org/doxygen/classclang_1_1ObjCAutoreleasePoolStmt.html)\>...

Matches an Objective-C autorelease pool statement.

Given
  @autoreleasepool {
    int x = 0;
  }
autoreleasePoolStmt(stmt()) matches the declaration of "x"
inside the autorelease pool.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

binaryConditionalOperator

Matcher<[BinaryConditionalOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryConditionalOperator.html)\>...

Matches binary conditional operator expressions (GNU extension).

Example matches a ?: b
  (a ?: b) + 42;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

binaryOperator

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>...

Matches binary operator expressions.

Example matches a || b
  !(a || b)
See also the binaryOperation() matcher for more-general matching.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

blockExpr

Matcher<[BlockExpr](https://clang.llvm.org/doxygen/classclang_1_1BlockExpr.html)\>...

Matches a reference to a block.

Example: matches "^{}":
  void f() { ^{}(); }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

breakStmt

Matcher<[BreakStmt](https://clang.llvm.org/doxygen/classclang_1_1BreakStmt.html)\>...

Matches break statements.

Given
  while (true) { break; }
breakStmt()
  matches 'break'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cStyleCastExpr

Matcher<[CStyleCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CStyleCastExpr.html)\>...

Matches a C-style cast expression.

Example: Matches (int) 2.2f in
  int i = (int) 2.2f;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

callExpr

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>...

Matches call expressions.

Example matches x.y() and y()
  X x;
  x.y();
  y();

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

caseStmt

Matcher<[CaseStmt](https://clang.llvm.org/doxygen/classclang_1_1CaseStmt.html)\>...

Matches case statements inside switch statements.

Given
  switch(a) { case 42: break; default: break; }
caseStmt()
  matches 'case 42:'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

castExpr

Matcher<[CastExpr](https://clang.llvm.org/doxygen/classclang_1_1CastExpr.html)\>...

Matches any cast nodes of Clang's AST.

Example: castExpr() matches each of the following:
  (int) 3;
  const\_cast<Expr \*>(SubExpr);
  char c = 0;
but does not match
  int i = (0);
  int k = 0;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

characterLiteral

Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>...

Matches character literals (also matches wchar\_t).

Not matching Hex-encoded chars (e.g. 0x1234, which is a IntegerLiteral),
though.

Example matches 'a', L'a'
  char ch = 'a';
  wchar\_t chw = L'a';

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

chooseExpr

Matcher<[ChooseExpr](https://clang.llvm.org/doxygen/classclang_1_1ChooseExpr.html)\>...

Matches GNU \_\_builtin\_choose\_expr.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

coawaitExpr

Matcher<[CoawaitExpr](https://clang.llvm.org/doxygen/classclang_1_1CoawaitExpr.html)\>...

Matches co\_await expressions.

Given
  co\_await 1;
coawaitExpr()
  matches 'co\_await 1'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

compoundLiteralExpr

Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>...

Matches compound (i.e. non-scalar) literals

Example match: {1}, (1, 2)
  int array\[4\] = {1};
  vector int myvec = (vector int)(1, 2);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

compoundStmt

Matcher<[CompoundStmt](https://clang.llvm.org/doxygen/classclang_1_1CompoundStmt.html)\>...

Matches compound statements.

Example matches '{}' and '{{}}' in 'for (;;) {{}}'
  for (;;) {{}}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

conditionalOperator

Matcher<[ConditionalOperator](https://clang.llvm.org/doxygen/classclang_1_1ConditionalOperator.html)\>...

Matches conditional operator expressions.

Example matches a ? b : c
  (a ? b : c) + 42

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

constantExpr

Matcher<[ConstantExpr](https://clang.llvm.org/doxygen/classclang_1_1ConstantExpr.html)\>...

Matches a constant expression wrapper.

Example matches the constant in the case statement:
    (matcher = constantExpr())
  switch (a) {
  case 37: break;
  }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

continueStmt

Matcher<[ContinueStmt](https://clang.llvm.org/doxygen/classclang_1_1ContinueStmt.html)\>...

Matches continue statements.

Given
  while (true) { continue; }
continueStmt()
  matches 'continue'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

convertVectorExpr

Matcher<[ConvertVectorExpr](https://clang.llvm.org/doxygen/classclang_1_1ConvertVectorExpr.html)\>...

Matches builtin function \_\_builtin\_convertvector.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

coreturnStmt

Matcher<[CoreturnStmt](https://clang.llvm.org/doxygen/classclang_1_1CoreturnStmt.html)\>...

Matches co\_return statements.

Given
  while (true) { co\_return; }
coreturnStmt()
  matches 'co\_return'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

coroutineBodyStmt

Matcher<[CoroutineBodyStmt](https://clang.llvm.org/doxygen/classclang_1_1CoroutineBodyStmt.html)\>...

Matches coroutine body statements.

coroutineBodyStmt() matches the coroutine below
  generator<int> gen() {
    co\_return;
  }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

coyieldExpr

Matcher<[CoyieldExpr](https://clang.llvm.org/doxygen/classclang_1_1CoyieldExpr.html)\>...

Matches co\_yield expressions.

Given
  co\_yield 1;
coyieldExpr()
  matches 'co\_yield 1'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cudaKernelCallExpr

Matcher<[CUDAKernelCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CUDAKernelCallExpr.html)\>...

Matches CUDA kernel call expression.

Example matches,
  kernel<<<i,j>>>();

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxBindTemporaryExpr

Matcher<[CXXBindTemporaryExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBindTemporaryExpr.html)\>...

Matches nodes where temporaries are created.

Example matches FunctionTakesString(GetStringByValue())
    (matcher = cxxBindTemporaryExpr())
  FunctionTakesString(GetStringByValue());
  FunctionTakesStringByPointer(GetStringPointer());

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxBoolLiteral

Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>...

Matches bool literals.

Example matches true
  true

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxCatchStmt

Matcher<[CXXCatchStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXCatchStmt.html)\>...

Matches catch statements.

  try {} catch(int i) {}
cxxCatchStmt()
  matches 'catch(int i)'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxConstCastExpr

Matcher<[CXXConstCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstCastExpr.html)\>...

Matches a const\_cast expression.

Example: Matches const\_cast<int\*>(&r) in
  int n = 42;
  const int &r(n);
  int\* p = const\_cast<int\*>(&r);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxConstructExpr

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>...

Matches constructor call expressions (including implicit ones).

Example matches string(ptr, n) and ptr within arguments of f
    (matcher = cxxConstructExpr())
  void f(const string &a, const string &b);
  char \*ptr;
  int n;
  f(string(ptr, n), ptr);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxDefaultArgExpr

Matcher<[CXXDefaultArgExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDefaultArgExpr.html)\>...

Matches the value of a default argument at the call site.

Example matches the CXXDefaultArgExpr placeholder inserted for the
    default value of the second parameter in the call expression f(42)
    (matcher = cxxDefaultArgExpr())
  void f(int x, int y = 0);
  f(42);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxDeleteExpr

Matcher<[CXXDeleteExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDeleteExpr.html)\>...

Matches delete expressions.

Given
  delete X;
cxxDeleteExpr()
  matches 'delete X'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxDependentScopeMemberExpr

Matcher<[CXXDependentScopeMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDependentScopeMemberExpr.html)\>...

Matches member expressions where the actual member referenced could not be
resolved because the base expression or the member name was dependent.

Given
  template <class T> void f() { T t; t.g(); }
cxxDependentScopeMemberExpr()
  matches t.g

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxDynamicCastExpr

Matcher<[CXXDynamicCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDynamicCastExpr.html)\>...

Matches a dynamic\_cast expression.

Example:
  cxxDynamicCastExpr()
matches
  dynamic\_cast<D\*>(&b);
in
  struct B { virtual ~B() {} }; struct D : B {};
  B b;
  D\* p = dynamic\_cast<D\*>(&b);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxFoldExpr

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>...

Matches C++17 fold expressions.

Example matches \`(0 + ... + args)\`:
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxForRangeStmt

Matcher<[CXXForRangeStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXForRangeStmt.html)\>...

Matches range-based for statements.

cxxForRangeStmt() matches 'for (auto a : i)'
  int i\[\] =  {1, 2, 3}; for (auto a : i);
  for(int j = 0; j < 5; ++j);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxFunctionalCastExpr

Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>...

Matches functional cast expressions

Example: Matches Foo(bar);
  Foo f = bar;
  Foo g = (Foo) bar;
  Foo h = Foo(bar);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxMemberCallExpr

Matcher<[CXXMemberCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXMemberCallExpr.html)\>...

Matches member call expressions.

Example matches x.y()
  X x;
  x.y();

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxNewExpr

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>...

Matches new expressions.

Given
  new X;
cxxNewExpr()
  matches 'new X'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxNoexceptExpr

Matcher<[CXXNoexceptExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNoexceptExpr.html)\>...

Matches noexcept expressions.

Given
  bool a() noexcept;
  bool b() noexcept(true);
  bool c() noexcept(false);
  bool d() noexcept(noexcept(a()));
  bool e = noexcept(b()) || noexcept(c());
cxxNoexceptExpr()
  matches \`noexcept(a())\`, \`noexcept(b())\` and \`noexcept(c())\`.
  doesn't match the noexcept specifier in the declarations a, b, c or d.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxNullPtrLiteralExpr

Matcher<[CXXNullPtrLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNullPtrLiteralExpr.html)\>...

Matches nullptr literal.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxOperatorCallExpr

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>...

Matches overloaded operator calls.

Note that if an operator isn't overloaded, it won't match. Instead, use
binaryOperator matcher.
Currently it does not match operators such as new delete.
FIXME: figure out why these do not match?

Example matches both operator<<((o << b), c) and operator<<(o, b)
    (matcher = cxxOperatorCallExpr())
  ostream &operator<< (ostream &out, int i) { };
  ostream &o; int b = 1, c = 1;
  o << b << c;
See also the binaryOperation() matcher for more-general matching of binary
uses of this AST node.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxReinterpretCastExpr

Matcher<[CXXReinterpretCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXReinterpretCastExpr.html)\>...

Matches a reinterpret\_cast expression.

Either the source expression or the destination type can be matched
using has(), but hasDestinationType() is more specific and can be
more readable.

Example matches reinterpret\_cast<char\*>(&p) in
  void\* p = reinterpret\_cast<char\*>(&p);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxRewrittenBinaryOperator

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>...

Matches rewritten binary operators

Example matches use of "<":
  #include <compare>
  struct HasSpaceshipMem {
    int a;
    constexpr auto operator<=>(const HasSpaceshipMem&) const = default;
  };
  void compare() {
    HasSpaceshipMem hs1, hs2;
    if (hs1 < hs2)
        return;
  }
See also the binaryOperation() matcher for more-general matching
of this AST node.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxStaticCastExpr

Matcher<[CXXStaticCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXStaticCastExpr.html)\>...

Matches a C++ static\_cast expression.

See also: hasDestinationType
See also: reinterpretCast

Example:
  cxxStaticCastExpr()
matches
  static\_cast<long>(8)
in
  long eight(static\_cast<long>(8));

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxStdInitializerListExpr

Matcher<[CXXStdInitializerListExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXStdInitializerListExpr.html)\>...

Matches C++ initializer list expressions.

Given
  std::vector<int> a({ 1, 2, 3 });
  std::vector<int> b = { 4, 5 };
  int c\[\] = { 6, 7 };
  std::pair<int, int> d = { 8, 9 };
cxxStdInitializerListExpr()
  matches "{ 1, 2, 3 }" and "{ 4, 5 }"

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxTemporaryObjectExpr

Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>...

Matches functional cast expressions having N != 1 arguments

Example: Matches Foo(bar, bar)
  Foo h = Foo(bar, bar);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxThisExpr

Matcher<[CXXThisExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXThisExpr.html)\>...

Matches implicit and explicit this expressions.

Example matches the implicit this expression in "return i".
    (matcher = cxxThisExpr())
struct foo {
  int i;
  int f() { return i; }
};

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxThrowExpr

Matcher<[CXXThrowExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXThrowExpr.html)\>...

Matches throw expressions.

  try { throw 5; } catch(int i) {}
cxxThrowExpr()
  matches 'throw 5'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxTryStmt

Matcher<[CXXTryStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXTryStmt.html)\>...

Matches try statements.

  try {} catch(int i) {}
cxxTryStmt()
  matches 'try {}'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

cxxUnresolvedConstructExpr

Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>...

Matches unresolved constructor call expressions.

Example matches T(t) in return statement of f
    (matcher = cxxUnresolvedConstructExpr())
  template <typename T>
  void f(const T& t) { return T(t); }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

declRefExpr

Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>...

Matches expressions that refer to declarations.

Example matches x in if (x)
  bool x;
  if (x) {}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

declStmt

Matcher<[DeclStmt](https://clang.llvm.org/doxygen/classclang_1_1DeclStmt.html)\>...

Matches declaration statements.

Given
  int a;
declStmt()
  matches 'int a'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

defaultStmt

Matcher<[DefaultStmt](https://clang.llvm.org/doxygen/classclang_1_1DefaultStmt.html)\>...

Matches default statements inside switch statements.

Given
  switch(a) { case 42: break; default: break; }
defaultStmt()
  matches 'default:'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

dependentCoawaitExpr

Matcher<[DependentCoawaitExpr](https://clang.llvm.org/doxygen/classclang_1_1DependentCoawaitExpr.html)\>...

Matches co\_await expressions where the type of the promise is dependent

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

dependentScopeDeclRefExpr

Matcher<[DependentScopeDeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DependentScopeDeclRefExpr.html)\>...

Matches expressions that refer to dependent scope declarations.

example matches T::v;
 template <class T> class X : T { void f() { T::v; } };

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

designatedInitExpr

Matcher<[DesignatedInitExpr](https://clang.llvm.org/doxygen/classclang_1_1DesignatedInitExpr.html)\>...

Matches C99 designated initializer expressions \[C99 6.7.8\].

Example: Matches { \[2\].y = 1.0, \[0\].x = 1.0 }
  point ptarray\[10\] = { \[2\].y = 1.0, \[0\].x = 1.0 };

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

doStmt

Matcher<[DoStmt](https://clang.llvm.org/doxygen/classclang_1_1DoStmt.html)\>...

Matches do statements.

Given
  do {} while (true);
doStmt()
  matches 'do {} while(true)'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

explicitCastExpr

Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>...

Matches explicit cast expressions.

Matches any cast expression written in user code, whether it be a
C-style cast, a functional-style cast, or a keyword cast.

Does not match implicit conversions.

Note: the name "explicitCast" is chosen to match Clang's terminology, as
Clang uses the term "cast" to apply to implicit conversions as well as to
actual cast expressions.

See also: hasDestinationType.

Example: matches all five of the casts in
  int((int)(reinterpret\_cast<int>(static\_cast<int>(const\_cast<int>(42)))))
but does not match the implicit conversion in
  long ell = 42;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

expr

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>...

Matches expressions.

Example matches x()
  void f() { x(); }

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

exprWithCleanups

Matcher<[ExprWithCleanups](https://clang.llvm.org/doxygen/classclang_1_1ExprWithCleanups.html)\>...

Matches expressions that introduce cleanups to be run at the end
of the sub-expression's evaluation.

Example matches std::string()
  const std::string str = std::string();

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

fixedPointLiteral

Matcher<[FixedPointLiteral](https://clang.llvm.org/doxygen/classclang_1_1FixedPointLiteral.html)\>...

Matches fixed-point literals eg.
0.5r, 0.5hr, 0.5lr, 0.5uhr, 0.5ur, 0.5ulr
1.0k, 1.0hk, 1.0lk, 1.0uhk, 1.0uk, 1.0ulk
Exponents 1.0e10k
Hexadecimal numbers 0x0.2p2r

Does not match implicit conversions such as first two lines:
   short \_Accum sa = 2;
   \_Accum a = 12.5;
   \_Accum b = 1.25hk;
   \_Fract c = 0.25hr;
   \_Fract v = 0.35uhr;
   \_Accum g = 1.45uhk;
   \_Accum decexp1 = 1.575e1k;

The matcher matches
but does not
match and from the code block.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

floatLiteral

Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>...

Matches float literals of all sizes / encodings, e.g.
1.0, 1.0f, 1.0L and 1e10.

Does not match implicit conversions such as
  float a = 10;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

forStmt

Matcher<[ForStmt](https://clang.llvm.org/doxygen/classclang_1_1ForStmt.html)\>...

Matches for statements.

Example matches 'for (;;) {}'
  for (;;) {}
  int i\[\] =  {1, 2, 3}; for (auto a : i);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

genericSelectionExpr

Matcher<[GenericSelectionExpr](https://clang.llvm.org/doxygen/classclang_1_1GenericSelectionExpr.html)\>...

Matches C11 \_Generic expression.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

gnuNullExpr

Matcher<[GNUNullExpr](https://clang.llvm.org/doxygen/classclang_1_1GNUNullExpr.html)\>...

Matches GNU \_\_null expression.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

gotoStmt

Matcher<[GotoStmt](https://clang.llvm.org/doxygen/classclang_1_1GotoStmt.html)\>...

Matches goto statements.

Given
  goto FOO;
  FOO: bar();
gotoStmt()
  matches 'goto FOO'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

ifStmt

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>...

Matches if statements.

Example matches 'if (x) {}'
  if (x) {}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

imaginaryLiteral

Matcher<[ImaginaryLiteral](https://clang.llvm.org/doxygen/classclang_1_1ImaginaryLiteral.html)\>...

Matches imaginary literals, which are based on integer and floating
point literals e.g.: 1i, 1.0i

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

implicitCastExpr

Matcher<[ImplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ImplicitCastExpr.html)\>...

Matches the implicit cast nodes of Clang's AST.

This matches many different places, including function call return value
eliding, as well as any type conversions.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

implicitValueInitExpr

Matcher<[ImplicitValueInitExpr](https://clang.llvm.org/doxygen/classclang_1_1ImplicitValueInitExpr.html)\>...

Matches implicit initializers of init list expressions.

Given
  point ptarray\[10\] = { \[2\].y = 1.0, \[2\].x = 2.0, \[0\].x = 1.0 };
implicitValueInitExpr()
  matches "\[0\].y" (implicitly)

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

initListExpr

Matcher<[InitListExpr](https://clang.llvm.org/doxygen/classclang_1_1InitListExpr.html)\>...

Matches init list expressions.

Given
  int a\[\] = { 1, 2 };
  struct B { int x, y; };
  B b = { 5, 6 };
initListExpr()
  matches "{ 1, 2 }" and "{ 5, 6 }"

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

integerLiteral

Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>...

Matches integer literals of all sizes / encodings, e.g.
1, 1L, 0x1 and 1U.

Does not match character-encoded integers such as L'a'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

labelStmt

Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>...

Matches label statements.

Given
  goto FOO;
  FOO: bar();
labelStmt()
  matches 'FOO:'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

lambdaExpr

Matcher<[LambdaExpr](https://clang.llvm.org/doxygen/classclang_1_1LambdaExpr.html)\>...

Matches lambda expressions.

Example matches \[&\](){return 5;}
  \[&\](){return 5;}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

materializeTemporaryExpr

Matcher<[MaterializeTemporaryExpr](https://clang.llvm.org/doxygen/classclang_1_1MaterializeTemporaryExpr.html)\>...

Matches nodes where temporaries are materialized.

Example: Given
  struct T {void func();};
  T f();
  void g(T);
materializeTemporaryExpr() matches 'f()' in these statements
  T u(f());
  g(f());
  f().func();
but does not match
  f();

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

memberExpr

Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>...

Matches member expressions.

Given
  class Y {
    void x() { this->x(); x(); Y y; y.x(); a; this->b; Y::b; }
    int a; static int b;
  };
memberExpr()
  matches this->x, x, y.x, a, this->b

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

nullStmt

Matcher<[NullStmt](https://clang.llvm.org/doxygen/classclang_1_1NullStmt.html)\>...

Matches null statements.

  foo();;
nullStmt()
  matches the second ';'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcCatchStmt

Matcher<[ObjCAtCatchStmt](https://clang.llvm.org/doxygen/classclang_1_1ObjCAtCatchStmt.html)\>...

Matches Objective-C @catch statements.

Example matches @catch
  @try {}
  @catch (...) {}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcFinallyStmt

Matcher<[ObjCAtFinallyStmt](https://clang.llvm.org/doxygen/classclang_1_1ObjCAtFinallyStmt.html)\>...

Matches Objective-C @finally statements.

Example matches @finally
  @try {}
  @finally {}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcIvarRefExpr

Matcher<[ObjCIvarRefExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCIvarRefExpr.html)\>...

Matches a reference to an ObjCIvar.

Example: matches "a" in "init" method:
@implementation A {
  NSString \*a;
}
- (void) init {
  a = @"hello";
}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcMessageExpr

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>...

Matches ObjectiveC Message invocation expressions.

The innermost message send invokes the "alloc" class method on the
NSString class, while the outermost message send invokes the
"initWithString" instance method on the object returned from
NSString's "alloc". This matcher should match both message sends.
  \[\[NSString alloc\] initWithString:@"Hello"\]

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcStringLiteral

Matcher<[ObjCStringLiteral](https://clang.llvm.org/doxygen/classclang_1_1ObjCStringLiteral.html)\>...

Matches ObjectiveC String literal expressions.

Example matches @"abcd"
  NSString \*s = @"abcd";

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcThrowStmt

Matcher<[ObjCAtThrowStmt](https://clang.llvm.org/doxygen/classclang_1_1ObjCAtThrowStmt.html)\>...

Matches Objective-C statements.

Example matches @throw obj;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

objcTryStmt

Matcher<[ObjCAtTryStmt](https://clang.llvm.org/doxygen/classclang_1_1ObjCAtTryStmt.html)\>...

Matches Objective-C @try statements.

Example matches @try
  @try {}
  @catch (...) {}

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

ompExecutableDirective

Matcher<[OMPExecutableDirective](https://clang.llvm.org/doxygen/classclang_1_1OMPExecutableDirective.html)\>...

Matches any \`\`#pragma omp\`\` executable directive.

Given

  #pragma omp parallel
  #pragma omp parallel default(none)
  #pragma omp taskyield

\`\`ompExecutableDirective()\`\` matches \`\`omp parallel\`\`,
\`\`omp parallel default(none)\`\` and \`\`omp taskyield\`\`.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

opaqueValueExpr

Matcher<[OpaqueValueExpr](https://clang.llvm.org/doxygen/classclang_1_1OpaqueValueExpr.html)\>...

Matches opaque value expressions. They are used as helpers
to reference another expressions and can be met
in BinaryConditionalOperators, for example.

Example matches 'a'
  (a ?: c) + 42;

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

parenExpr

Matcher<[ParenExpr](https://clang.llvm.org/doxygen/classclang_1_1ParenExpr.html)\>...

Matches parentheses used in expressions.

Example matches (foo() + 1)
  int foo() { return 1; }
  int a = (foo() + 1);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

parenListExpr

Matcher<[ParenListExpr](https://clang.llvm.org/doxygen/classclang_1_1ParenListExpr.html)\>...

Matches paren list expressions.
ParenListExprs don't have a predefined type and are used for late parsing.
In the final AST, they can be met in template declarations.

Given
  template<typename T> class X {
    void f() {
      X x(\*this);
      int a = 0, b = 1; int i = (a, b);
    }
  };
parenListExpr() matches "\*this" but NOT matches (a, b) because (a, b)
has a predefined type and is a ParenExpr, not a ParenListExpr.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

predefinedExpr

Matcher<[PredefinedExpr](https://clang.llvm.org/doxygen/classclang_1_1PredefinedExpr.html)\>...

Matches predefined identifier expressions \[C99 6.4.2.2\].

Example: Matches \_\_func\_\_
  printf("%s", \_\_func\_\_);

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

returnStmt

Matcher<[ReturnStmt](https://clang.llvm.org/doxygen/classclang_1_1ReturnStmt.html)\>...

Matches return statements.

Given
  return 1;
returnStmt()
  matches 'return 1'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

stmt

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>...

Matches statements.

Given
  { ++a; }
stmt()
  matches both the compound statement '{ ++a; }' and '++a'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

stmtExpr

Matcher<[StmtExpr](https://clang.llvm.org/doxygen/classclang_1_1StmtExpr.html)\>...

Matches statement expression (GNU extension).

Example match: ({ int X = 4; X; })
  int C = ({ int X = 4; X; });

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

stringLiteral

Matcher<[StringLiteral](https://clang.llvm.org/doxygen/classclang_1_1StringLiteral.html)\>...

Matches string literals (also matches wide string literals).

Example matches "abcd", L"abcd"
  char \*s = "abcd";
  wchar\_t \*ws = L"abcd";

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

substNonTypeTemplateParmExpr

Matcher<[SubstNonTypeTemplateParmExpr](https://clang.llvm.org/doxygen/classclang_1_1SubstNonTypeTemplateParmExpr.html)\>...

Matches substitutions of non-type template parameters.

Given
  template <int N>
  struct A { static const int n = N; };
  struct B : public A<42> {};
substNonTypeTemplateParmExpr()
  matches "N" in the right-hand side of "static const int n = N;"

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

switchCase

Matcher<[SwitchCase](https://clang.llvm.org/doxygen/classclang_1_1SwitchCase.html)\>...

Matches case and default statements inside switch statements.

Given
  switch(a) { case 42: break; default: break; }
switchCase()
  matches 'case 42:' and 'default:'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

switchStmt

Matcher<[SwitchStmt](https://clang.llvm.org/doxygen/classclang_1_1SwitchStmt.html)\>...

Matches switch statements.

Given
  switch(a) { case 42: break; default: break; }
switchStmt()
  matches 'switch(a)'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

unaryExprOrTypeTraitExpr

Matcher<[UnaryExprOrTypeTraitExpr](https://clang.llvm.org/doxygen/classclang_1_1UnaryExprOrTypeTraitExpr.html)\>...

Matches sizeof (C99), alignof (C++11) and vec\_step (OpenCL)

Given
  Foo x = bar;
  int y = sizeof(x) + alignof(x);
unaryExprOrTypeTraitExpr()
  matches sizeof(x) and alignof(x)

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

unaryOperator

Matcher<[UnaryOperator](https://clang.llvm.org/doxygen/classclang_1_1UnaryOperator.html)\>...

Matches unary operator expressions.

Example matches !a
  !a || b

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

unresolvedLookupExpr

Matcher<[UnresolvedLookupExpr](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedLookupExpr.html)\>...

Matches reference to a name that can be looked up during parsing
but could not be resolved to a specific declaration.

Given
  template<typename T>
  T foo() { T a; return a; }
  template<typename T>
  void bar() {
    foo<T>();
  }
unresolvedLookupExpr()
  matches foo<T>() 

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

unresolvedMemberExpr

Matcher<[UnresolvedMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedMemberExpr.html)\>...

Matches unresolved member expressions.

Given
  struct X {
    template <class T> void f();
    void g();
  };
  template <class T> void h() { X x; x.f<T>(); x.g(); }
unresolvedMemberExpr()
  matches x.f<T>

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

userDefinedLiteral

Matcher<[UserDefinedLiteral](https://clang.llvm.org/doxygen/classclang_1_1UserDefinedLiteral.html)\>...

Matches user defined literal operator call.

Example match: "foo"\_suffix

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

whileStmt

Matcher<[WhileStmt](https://clang.llvm.org/doxygen/classclang_1_1WhileStmt.html)\>...

Matches while statements.

Given
  while (true) {}
whileStmt()
  matches 'while (true) {}'.

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>

templateArgumentLoc

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>...

Matches template arguments (with location info).

Given
  template <typename T> struct C {};
  C<int> c;
templateArgumentLoc()
  matches 'int' in C<int>.

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

templateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>...

Matches template arguments.

Given
  template <typename T> struct C {};
  C<int> c;
templateArgument()
  matches 'int' in C<int>.

Matcher<[TemplateName](https://clang.llvm.org/doxygen/classclang_1_1TemplateName.html)\>

templateName

Matcher<[TemplateName](https://clang.llvm.org/doxygen/classclang_1_1TemplateName.html)\>...

Matches template name.

Given
  template <typename T> class X { };
  X<int> xi;
templateName()
  matches 'X' in X<int>.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

elaboratedTypeLoc

Matcher<[ElaboratedTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedTypeLoc.html)\>...

Matches C or C++ elaborated \`TypeLoc\`s.

Given
  struct s {};
  struct s ss;
elaboratedTypeLoc()
  matches the \`TypeLoc\` of the variable declaration of \`ss\`.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

pointerTypeLoc

Matcher<[PointerTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1PointerTypeLoc.html)\>...

Matches pointer \`TypeLoc\`s.

Given
  int\* x;
pointerTypeLoc()
  matches \`int\*\`.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

qualifiedTypeLoc

Matcher<[QualifiedTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1QualifiedTypeLoc.html)\>...

Matches \`QualifiedTypeLoc\`s in the clang AST.

Given
  const int x = 0;
qualifiedTypeLoc()
  matches \`const int\`.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

referenceTypeLoc

Matcher<[ReferenceTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1ReferenceTypeLoc.html)\>...

Matches reference \`TypeLoc\`s.

Given
  int x = 3;
  int& l = x;
  int&& r = 3;
referenceTypeLoc()
  matches \`int&\` and \`int&&\`.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

templateSpecializationTypeLoc

Matcher<[TemplateSpecializationTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationTypeLoc.html)\>...

Matches template specialization \`TypeLoc\`s.

Given
  template <typename T> class C {};
  C<char> var;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(typeLoc())))
  matches \`C<char> var\`.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

typeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>...

Matches TypeLocs in the clang AST.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

arrayType

Matcher<[ArrayType](https://clang.llvm.org/doxygen/classclang_1_1ArrayType.html)\>...

Matches all kinds of arrays.

Given
  int a\[\] = { 2, 3 };
  int b\[4\];
  void f() { int c\[a\[0\]\]; }
arrayType()
  matches "int a\[\]", "int b\[4\]" and "int c\[a\[0\]\]";

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

atomicType

Matcher<[AtomicType](https://clang.llvm.org/doxygen/classclang_1_1AtomicType.html)\>...

Matches atomic types.

Given
  \_Atomic(int) i;
atomicType()
  matches "\_Atomic(int) i"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

autoType

Matcher<[AutoType](https://clang.llvm.org/doxygen/classclang_1_1AutoType.html)\>...

Matches types nodes representing C++11 auto types.

Given:
  auto n = 4;
  int v\[\] = { 2, 3 }
  for (auto i : v) { }
autoType()
  matches "auto n" and "auto i"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

blockPointerType

Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>...

Matches block pointer types, i.e. types syntactically represented as
"void (^)(int)".

The pointee is always required to be a FunctionType.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

builtinType

Matcher<[BuiltinType](https://clang.llvm.org/doxygen/classclang_1_1BuiltinType.html)\>...

Matches builtin Types.

Given
  struct A {};
  A a;
  int b;
  float c;
  bool d;
builtinType()
  matches "int b", "float c" and "bool d"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

complexType

Matcher<[ComplexType](https://clang.llvm.org/doxygen/classclang_1_1ComplexType.html)\>...

Matches C99 complex types.

Given
  \_Complex float f;
complexType()
  matches "\_Complex float f"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

constantArrayType

Matcher<[ConstantArrayType](https://clang.llvm.org/doxygen/classclang_1_1ConstantArrayType.html)\>...

Matches C arrays with a specified constant size.

Given
  void() {
    int a\[2\];
    int b\[\] = { 2, 3 };
    int c\[b\[0\]\];
  }
constantArrayType()
  matches "int a\[2\]"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

decayedType

Matcher<[DecayedType](https://clang.llvm.org/doxygen/classclang_1_1DecayedType.html)\>...

Matches decayed type
Example matches i\[\] in declaration of f.
    (matcher = valueDecl(hasType(decayedType(hasDecayedType(pointerType())))))
Example matches i\[1\].
    (matcher = expr(hasType(decayedType(hasDecayedType(pointerType())))))
  void f(int i\[\]) {
    i\[1\] = 0;
  }

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

decltypeType

Matcher<[DecltypeType](https://clang.llvm.org/doxygen/classclang_1_1DecltypeType.html)\>...

Matches types nodes representing C++11 decltype(<expr>) types.

Given:
  short i = 1;
  int j = 42;
  decltype(i + j) result = i + j;
decltypeType()
  matches "decltype(i + j)"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

deducedTemplateSpecializationType

Matcher<[DeducedTemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1DeducedTemplateSpecializationType.html)\>...

Matches C++17 deduced template specialization types, e.g. deduced class
template types.

Given
  template <typename T>
  class C { public: C(T); };

  C c(123);
deducedTemplateSpecializationType() matches the type in the declaration
of the variable c.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

dependentNameType

Matcher<[DependentNameType](https://clang.llvm.org/doxygen/classclang_1_1DependentNameType.html)\>...

Matches a dependent name type

Example matches T::type
 template <typename T> struct declToImport {
   typedef typename T::type dependent\_name;
 };

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

dependentSizedArrayType

Matcher<[DependentSizedArrayType](https://clang.llvm.org/doxygen/classclang_1_1DependentSizedArrayType.html)\>...

Matches C++ arrays whose size is a value-dependent expression.

Given
  template<typename T, int Size>
  class array {
    T data\[Size\];
  };
dependentSizedArrayType()
  matches "T data\[Size\]"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

dependentSizedExtVectorType

Matcher<[DependentSizedExtVectorType](https://clang.llvm.org/doxygen/classclang_1_1DependentSizedExtVectorType.html)\>...

Matches C++ extended vector type where either the type or size is
dependent.

Given
  template<typename T, int Size>
  class vector {
    typedef T \_\_attribute\_\_((ext\_vector\_type(Size))) type;
  };
dependentSizedExtVectorType()
  matches "T \_\_attribute\_\_((ext\_vector\_type(Size)))"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

dependentTemplateSpecializationType

Matcher<[DependentTemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1DependentTemplateSpecializationType.html)\>...

Matches a dependent template specialization type

Example matches A<T>::template B<T>
  template<typename T> struct A;
  template<typename T> struct declToImport {
    typename A<T>::template B<T> a;
  };

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

elaboratedType

Matcher<[ElaboratedType](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedType.html)\>...

Matches types specified with an elaborated type keyword or with a
qualified name.

Given
  namespace N {
    namespace M {
      class D {};
    }
  }
  class C {};

  class C c;
  N::M::D d;

elaboratedType() matches the type of the variable declarations of both
c and d.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

enumType

Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>...

Matches enum types.

Given
  enum C { Green };
  enum class S { Red };

  C c;
  S s;

enumType() matches the type of the variable declarations of both c and
s.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

functionProtoType

Matcher<[FunctionProtoType](https://clang.llvm.org/doxygen/classclang_1_1FunctionProtoType.html)\>...

Matches FunctionProtoType nodes.

Given
  int (\*f)(int);
  void g();
functionProtoType()
  matches "int (\*f)(int)" and the type of "g" in C++ mode.
  In C mode, "g" is not matched because it does not contain a prototype.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

functionType

Matcher<[FunctionType](https://clang.llvm.org/doxygen/classclang_1_1FunctionType.html)\>...

Matches FunctionType nodes.

Given
  int (\*f)(int);
  void g();
functionType()
  matches "int (\*f)(int)" and the type of "g".

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

incompleteArrayType

Matcher<[IncompleteArrayType](https://clang.llvm.org/doxygen/classclang_1_1IncompleteArrayType.html)\>...

Matches C arrays with unspecified size.

Given
  int a\[\] = { 2, 3 };
  int b\[42\];
  void f(int c\[\]) { int d\[a\[0\]\]; };
incompleteArrayType()
  matches "int a\[\]" and "int c\[\]"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

injectedClassNameType

Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>...

Matches injected class name types.

Example matches S s, but not S<T> s.
    (matcher = parmVarDecl(hasType(injectedClassNameType())))
  template <typename T> struct S {
    void f(S s);
    void g(S<T> s);
  };

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

lValueReferenceType

Matcher<[LValueReferenceType](https://clang.llvm.org/doxygen/classclang_1_1LValueReferenceType.html)\>...

Matches lvalue reference types.

Given:
  int \*a;
  int &b = \*a;
  int &&c = 1;
  auto &d = b;
  auto &&e = c;
  auto &&f = 2;
  int g = 5;

lValueReferenceType() matches the types of b, d, and e. e is
matched since the type is deduced as int& by reference collapsing rules.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

macroQualifiedType

Matcher<[MacroQualifiedType](https://clang.llvm.org/doxygen/classclang_1_1MacroQualifiedType.html)\>...

Matches qualified types when the qualifier is applied via a macro.

Given
  #define CDECL \_\_attribute\_\_((cdecl))
  typedef void (CDECL \*X)();
  typedef void (\_\_attribute\_\_((cdecl)) \*Y)();
macroQualifiedType()
  matches the type of the typedef declaration of X but not Y.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

memberPointerType

Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>...

Matches member pointer types.
Given
  struct A { int i; }
  A::\* ptr = A::i;
memberPointerType()
  matches "A::\* ptr"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

objcObjectPointerType

Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>...

Matches an Objective-C object pointer type, which is different from
a pointer type, despite being syntactically similar.

Given
  int \*a;

  @interface Foo
  @end
  Foo \*f;
pointerType()
  matches "Foo \*f", but does not match "int \*a".

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

parenType

Matcher<[ParenType](https://clang.llvm.org/doxygen/classclang_1_1ParenType.html)\>...

Matches ParenType nodes.

Given
  int (\*ptr\_to\_array)\[4\];
  int \*array\_of\_ptrs\[4\];

varDecl(hasType(pointsTo(parenType()))) matches ptr\_to\_array but not
array\_of\_ptrs.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

pointerType

Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>...

Matches pointer types, but does not match Objective-C object pointer
types.

Given
  int \*a;
  int &b = \*a;
  int c = 5;

  @interface Foo
  @end
  Foo \*f;
pointerType()
  matches "int \*a", but does not match "Foo \*f".

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

rValueReferenceType

Matcher<[RValueReferenceType](https://clang.llvm.org/doxygen/classclang_1_1RValueReferenceType.html)\>...

Matches rvalue reference types.

Given:
  int \*a;
  int &b = \*a;
  int &&c = 1;
  auto &d = b;
  auto &&e = c;
  auto &&f = 2;
  int g = 5;

rValueReferenceType() matches the types of c and f. e is not
matched as it is deduced to int& by reference collapsing rules.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

recordType

Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>...

Matches record types (e.g. structs, classes).

Given
  class C {};
  struct S {};

  C c;
  S s;

recordType() matches the type of the variable declarations of both c
and s.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

referenceType

Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>...

Matches both lvalue and rvalue reference types.

Given
  int \*a;
  int &b = \*a;
  int &&c = 1;
  auto &d = b;
  auto &&e = c;
  auto &&f = 2;
  int g = 5;

referenceType() matches the types of b, c, d, e, and f.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

substTemplateTypeParmType

Matcher<[SubstTemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1SubstTemplateTypeParmType.html)\>...

Matches types that represent the result of substituting a type for a
template type parameter.

Given
  template <typename T>
  void F(T t) {
    int i = 1 + t;
  }

substTemplateTypeParmType() matches the type of 't' but not '1'

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

tagType

Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>...

Matches tag types (record and enum types).

Given
  enum E {};
  class C {};

  E e;
  C c;

tagType() matches the type of the variable declarations of both e
and c.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

templateSpecializationType

Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>...

Matches template specialization types.

Given
  template <typename T>
  class C { };

  template class C<int>;  // A
  C<char> var;            // B

templateSpecializationType() matches the type of the explicit
instantiation in A and the type of the variable declaration in B.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

templateTypeParmType

Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>...

Matches template type parameter types.

Example matches T, but not int.
    (matcher = templateTypeParmType())
  template <typename T> void f(int i);

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

type

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>...

Matches Types in the clang AST.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

typedefType

Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>...

Matches typedef types.

Given
  typedef int X;
typedefType()
  matches "typedef int X"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

unaryTransformType

Matcher<[UnaryTransformType](https://clang.llvm.org/doxygen/classclang_1_1UnaryTransformType.html)\>...

Matches types nodes representing unary type transformations.

Given:
  typedef \_\_underlying\_type(T) type;
unaryTransformType()
  matches "\_\_underlying\_type(T)"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

usingType

Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>...

Matches types specified through a using declaration.

Given
  namespace a { struct S {}; }
  using a::S;
  S s;

usingType() matches the type of the variable declaration of s.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

variableArrayType

Matcher<[VariableArrayType](https://clang.llvm.org/doxygen/classclang_1_1VariableArrayType.html)\>...

Matches C arrays with a specified size that is not an
integer-constant-expression.

Given
  void f() {
    int a\[\] = { 2, 3 }
    int b\[42\];
    int c\[a\[0\]\];
  }
variableArrayType()
  matches "int c\[a\[0\]\]"

Narrowing Matchers
------------------

Narrowing matchers match certain attributes on the current node, thus narrowing down the set of nodes of the current type to match on.

There are special logical narrowing matchers (allOf, anyOf, anything and unless) which allow users to create more powerful match expressions.

Return type

Name

Parameters

Matcher<\*>

allOf

Matcher<\*>, ..., Matcher<\*>

Matches if all given matchers match.

Usable as: Any Matcher

Matcher<\*>

anyOf

Matcher<\*>, ..., Matcher<\*>

Matches if any of the given matchers matches.

Usable as: Any Matcher

Matcher<\*>

anything

Matches any node.

Useful when another matcher requires a child matcher, but there's no
additional constraint. This will often be used with an explicit conversion
to an internal::Matcher<> type such as TypeMatcher.

Example: DeclarationMatcher(anything()) matches all declarations, e.g.,
"int\* p" and "void f()" in
  int\* p;
  void f();

Usable as: Any Matcher

_unspecified_

mapAnyOf

nodeMatcherFunction...

Matches any of the NodeMatchers with InnerMatchers nested within

Given
  if (true);
  for (; true; );
with the matcher
  mapAnyOf(ifStmt, forStmt).with(
    hasCondition(cxxBoolLiteralExpr(equals(true)))
    ).bind("trueCond")
matches the if and the for. It is equivalent to:
  auto trueCond = hasCondition(cxxBoolLiteralExpr(equals(true)));
  anyOf(
    ifStmt(trueCond).bind("trueCond"),
    forStmt(trueCond).bind("trueCond")
    );

The with() chain-call accepts zero or more matchers which are combined
as-if with allOf() in each of the node matchers.
Usable as: Any Matcher

Matcher<\*>

unless

Matcher<\*>

Matches if the provided matcher does not match.

Example matches Y (matcher = cxxRecordDecl(unless(hasName("X"))))
  class X {};
  class Y {};

Usable as: Any Matcher

Matcher<[Attr](https://clang.llvm.org/doxygen/classclang_1_1Attr.html)\>

isImplicit

Matches an entity that has been implicitly added by the compiler (e.g.
implicit default/copy constructors).

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

hasAnyOperatorName

StringRef, ..., StringRef

Matches operator expressions (binary or unary) that have any of the
specified names.

   hasAnyOperatorName("+", "-")
 Is equivalent to
   anyOf(hasOperatorName("+"), hasOperatorName("-"))

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

hasOperatorName

std::string Name

Matches the operator Name of operator expressions and fold expressions
(binary or unary).

Example matches a || b (matcher = binaryOperator(hasOperatorName("||")))
  !(a || b)

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(hasOperatorName("+")))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

isAssignmentOperator

Matches all kinds of assignment operators.

Example 1: matches a += b (matcher = binaryOperator(isAssignmentOperator()))
  if (a == b)
    a += b;

Example 2: matches s1 = s2
           (matcher = cxxOperatorCallExpr(isAssignmentOperator()))
  struct S { S& operator=(const S&); };
  void x() { S s1, s2; s1 = s2; }

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

isComparisonOperator

Matches comparison operators.

Example 1: matches a == b (matcher = binaryOperator(isComparisonOperator()))
  if (a == b)
    a += b;

Example 2: matches s1 < s2
           (matcher = cxxOperatorCallExpr(isComparisonOperator()))
  struct S { bool operator<(const S& other); };
  void x(S s1, S s2) { bool b1 = s1 < s2; }

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

isPrivate

Matches private C++ declarations and C++ base specifers that specify private
inheritance.

Examples:
  class C {
  public:    int a;
  protected: int b;
  private:   int c; // fieldDecl(isPrivate()) matches 'c'
  };

  struct Base {};
  struct Derived1 : private Base {}; // matches 'Base'
  class Derived2 : Base {}; // matches 'Base'

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

isProtected

Matches protected C++ declarations and C++ base specifers that specify
protected inheritance.

Examples:
  class C {
  public:    int a;
  protected: int b; // fieldDecl(isProtected()) matches 'b'
  private:   int c;
  };

  class Base {};
  class Derived : protected Base {}; // matches 'Base'

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

isPublic

Matches public C++ declarations and C++ base specifers that specify public
inheritance.

Examples:
  class C {
  public:    int a; // fieldDecl(isPublic()) matches 'a'
  protected: int b;
  private:   int c;
  };

  class Base {};
  class Derived1 : public Base {}; // matches 'Base'
  struct Derived2 : Base {}; // matches 'Base'

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

isVirtual

Matches declarations of virtual methods and C++ base specifers that specify
virtual inheritance.

Example:
  class A {
   public:
    virtual void x(); // matches x
  };

Example:
  class Base {};
  class DirectlyDerived : virtual Base {}; // matches Base
  class IndirectlyDerived : DirectlyDerived, Base {}; // matches Base

Usable as: Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>

equals

bool Value

Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>

equals

const ValueT Value

Matches literals that are equal to the given value of type ValueT.

Given
  f('false, 3.14, 42);
characterLiteral(equals(0))
  matches 'cxxBoolLiteral(equals(false)) and cxxBoolLiteral(equals(0))
  match false
floatLiteral(equals(3.14)) and floatLiteral(equals(314e-2))
  match 3.14
integerLiteral(equals(42))
  matches 42

Note that you cannot directly match a negative numeric literal because the
minus sign is not part of the literal: It is a unary operator whose operand
is the positive numeric literal. Instead, you must use a unaryOperator()
matcher to match the minus sign:

unaryOperator(hasOperatorName("-"),
              hasUnaryOperand(integerLiteral(equals(13))))

Usable as: Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>, Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>,
           Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>, Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>

equals

double Value

Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>

equals

unsigned Value

Matcher<[CXXCatchStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXCatchStmt.html)\>

isCatchAll

Matches a C++ catch statement that has a catch-all handler.

Given
  try {
    // ...
  } catch (int) {
    // ...
  } catch (...) {
    // ...
  }
cxxCatchStmt(isCatchAll()) matches catch(...) but not catch(int).

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

argumentCountAtLeast

unsigned N

Checks that a call expression or a constructor call expression has at least
the specified number of arguments (including absent default arguments).

Example matches f(0, 0) and g(0, 0, 0)
(matcher = callExpr(argumentCountAtLeast(2)))
  void f(int x, int y);
  void g(int x, int y, int z);
  f(0, 0);
  g(0, 0, 0);

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

argumentCountIs

unsigned N

Checks that a call expression or a constructor call expression has
a specific number of arguments (including absent default arguments).

Example matches f(0, 0) (matcher = callExpr(argumentCountIs(2)))
  void f(int x, int y);
  f(0, 0);

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

isListInitialization

Matches a constructor call expression which uses list initialization.

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

requiresZeroInitialization

Matches a constructor call expression which requires
zero initialization.

Given
void foo() {
  struct point { double x; double y; };
  point pt\[2\] = { { 1.0, 2.0 } };
}
initListExpr(has(cxxConstructExpr(requiresZeroInitialization()))
will match the implicit array filler for pt\[1\].

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

isCopyConstructor

Matches constructor declarations that are copy constructors.

Given
  struct S {
    S(); // #1
    S(const S &); // #2
    S(S &&); // #3
  };
cxxConstructorDecl(isCopyConstructor()) will match #2, but not #1 or #3.

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

isDefaultConstructor

Matches constructor declarations that are default constructors.

Given
  struct S {
    S(); // #1
    S(const S &); // #2
    S(S &&); // #3
  };
cxxConstructorDecl(isDefaultConstructor()) will match #1, but not #2 or #3.

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

isDelegatingConstructor

Matches constructors that delegate to another constructor.

Given
  struct S {
    S(); // #1
    S(int) {} // #2
    S(S &&) : S() {} // #3
  };
  S::S() : S(0) {} // #4
cxxConstructorDecl(isDelegatingConstructor()) will match #3 and #4, but not
#1 or #2.

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

isExplicit

Matches constructor, conversion function, and deduction guide declarations
that have an explicit specifier if this explicit specifier is resolved to
true.

Given
  template<bool b>
  struct S {
    S(int); // #1
    explicit S(double); // #2
    operator int(); // #3
    explicit operator bool(); // #4
    explicit(false) S(bool) // # 7
    explicit(true) S(char) // # 8
    explicit(b) S(S) // # 9
  };
  S(int) -> S<true> // #5
  explicit S(double) -> S<false> // #6
cxxConstructorDecl(isExplicit()) will match #2 and #8, but not #1, #7 or #9.
cxxConversionDecl(isExplicit()) will match #4, but not #3.
cxxDeductionGuideDecl(isExplicit()) will match #6, but not #5.

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

isInheritingConstructor

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

isMoveConstructor

Matches constructor declarations that are move constructors.

Given
  struct S {
    S(); // #1
    S(const S &); // #2
    S(S &&); // #3
  };
cxxConstructorDecl(isMoveConstructor()) will match #3, but not #1 or #2.

Matcher<[CXXConversionDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConversionDecl.html)\>

isExplicit

Matches constructor, conversion function, and deduction guide declarations
that have an explicit specifier if this explicit specifier is resolved to
true.

Given
  template<bool b>
  struct S {
    S(int); // #1
    explicit S(double); // #2
    operator int(); // #3
    explicit operator bool(); // #4
    explicit(false) S(bool) // # 7
    explicit(true) S(char) // # 8
    explicit(b) S(S) // # 9
  };
  S(int) -> S<true> // #5
  explicit S(double) -> S<false> // #6
cxxConstructorDecl(isExplicit()) will match #2 and #8, but not #1, #7 or #9.
cxxConversionDecl(isExplicit()) will match #4, but not #3.
cxxDeductionGuideDecl(isExplicit()) will match #6, but not #5.

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

isBaseInitializer

Matches a constructor initializer if it is initializing a base, as
opposed to a member.

Given
  struct B {};
  struct D : B {
    int I;
    D(int i) : I(i) {}
  };
  struct E : B {
    E() : B() {}
  };
cxxConstructorDecl(hasAnyConstructorInitializer(isBaseInitializer()))
  will match E(), but not match D(int).

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

isMemberInitializer

Matches a constructor initializer if it is initializing a member, as
opposed to a base.

Given
  struct B {};
  struct D : B {
    int I;
    D(int i) : I(i) {}
  };
  struct E : B {
    E() : B() {}
  };
cxxConstructorDecl(hasAnyConstructorInitializer(isMemberInitializer()))
  will match D(int), but not match E().

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

isWritten

Matches a constructor initializer if it is explicitly written in
code (as opposed to implicitly added by the compiler).

Given
  struct Foo {
    Foo() { }
    Foo(int) : foo\_("A") { }
    string foo\_;
  };
cxxConstructorDecl(hasAnyConstructorInitializer(isWritten()))
  will match Foo(int), but not Foo()

Matcher<[CXXDeductionGuideDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXDeductionGuideDecl.html)\>

isExplicit

Matches constructor, conversion function, and deduction guide declarations
that have an explicit specifier if this explicit specifier is resolved to
true.

Given
  template<bool b>
  struct S {
    S(int); // #1
    explicit S(double); // #2
    operator int(); // #3
    explicit operator bool(); // #4
    explicit(false) S(bool) // # 7
    explicit(true) S(char) // # 8
    explicit(b) S(S) // # 9
  };
  S(int) -> S<true> // #5
  explicit S(double) -> S<false> // #6
cxxConstructorDecl(isExplicit()) will match #2 and #8, but not #1, #7 or #9.
cxxConversionDecl(isExplicit()) will match #4, but not #3.
cxxDeductionGuideDecl(isExplicit()) will match #6, but not #5.

Matcher<[CXXDependentScopeMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDependentScopeMemberExpr.html)\>

hasMemberName

std::string N

Matches template-dependent, but known, member names.

In template declarations, dependent members are not resolved and so can
not be matched to particular named declarations.

This matcher allows to match on the known name of members.

Given
  template <typename T>
  struct S {
      void mem();
  };
  template <typename T>
  void x() {
      S<T> s;
      s.mem();
  }
cxxDependentScopeMemberExpr(hasMemberName("mem")) matches \`s.mem()\`

Matcher<[CXXDependentScopeMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDependentScopeMemberExpr.html)\>

isArrow

Matches member expressions that are called with '->' as opposed
to '.'.

Member calls on the implicit this pointer match as called with '->'.

Given
  class Y {
    void x() { this->x(); x(); Y y; y.x(); a; this->b; Y::b; }
    template <class T> void f() { this->f<T>(); f<T>(); }
    int a;
    static int b;
  };
  template <class T>
  class Z {
    void x() { this->m; }
  };
memberExpr(isArrow())
  matches this->x, x, y.x, a, this->b
cxxDependentScopeMemberExpr(isArrow())
  matches this->m
unresolvedMemberExpr(isArrow())
  matches this->f<T>, f<T>

Matcher<[CXXDependentScopeMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDependentScopeMemberExpr.html)\>

memberHasSameNameAsBoundNode

std::string BindingID

Matches template-dependent, but known, member names against an already-bound
node

In template declarations, dependent members are not resolved and so can
not be matched to particular named declarations.

This matcher allows to match on the name of already-bound VarDecl, FieldDecl
and CXXMethodDecl nodes.

Given
  template <typename T>
  struct S {
      void mem();
  };
  template <typename T>
  void x() {
      S<T> s;
      s.mem();
  }
The matcher
@code
cxxDependentScopeMemberExpr(
  hasObjectExpression(declRefExpr(hasType(templateSpecializationType(
      hasDeclaration(classTemplateDecl(has(cxxRecordDecl(has(
          cxxMethodDecl(hasName("mem")).bind("templMem")
          )))))
      )))),
  memberHasSameNameAsBoundNode("templMem")
  )
@endcode
first matches and binds the @c mem member of the @c S template, then
compares its name to the usage in @c s.mem() in the @c x function template

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasOperatorName

std::string Name

Matches the operator Name of operator expressions and fold expressions
(binary or unary).

Example matches a || b (matcher = binaryOperator(hasOperatorName("||")))
  !(a || b)

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(hasOperatorName("+")))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

isBinaryFold

Matches binary fold expressions, i.e. fold expressions with an initializer.

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(isBinaryFold()))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ...);
  }

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

isLeftFold

Matches left-folding fold expressions.

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(isLeftFold()))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ... \* 1);
  }

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

isRightFold

Matches right-folding fold expressions.

Example matches \`(args \* ... \* 1)\`
    (matcher = cxxFoldExpr(isRightFold()))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ... \* 1);
  }

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

isUnaryFold

Matches unary fold expressions, i.e. fold expressions without an
initializer.

Example matches \`(args \* ...)\`
    (matcher = cxxFoldExpr(isUnaryFold()))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ...);
  }

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isConst

Matches if the given method declaration is const.

Given
struct A {
  void foo() const;
  void bar();
};

cxxMethodDecl(isConst()) matches A::foo() but not A::bar()

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isCopyAssignmentOperator

Matches if the given method declaration declares a copy assignment
operator.

Given
struct A {
  A &operator=(const A &);
  A &operator=(A &&);
};

cxxMethodDecl(isCopyAssignmentOperator()) matches the first method but not
the second one.

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isExplicitObjectMemberFunction

Matches if the given method declaration declares a member function with an
explicit object parameter.

Given
struct A {
 int operator-(this A, int);
 void fun(this A &&self);
 static int operator()(int);
 int operator+(int);
};

cxxMethodDecl(isExplicitObjectMemberFunction()) matches the first two
methods but not the last two.

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isFinal

Matches if the given method or class declaration is final.

Given:
  class A final {};

  struct B {
    virtual void f();
  };

  struct C : B {
    void f() final;
  };
matches A and C::f, but not B, C, or B::f

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isMoveAssignmentOperator

Matches if the given method declaration declares a move assignment
operator.

Given
struct A {
  A &operator=(const A &);
  A &operator=(A &&);
};

cxxMethodDecl(isMoveAssignmentOperator()) matches the second method but not
the first one.

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isOverride

Matches if the given method declaration overrides another method.

Given
  class A {
   public:
    virtual void x();
  };
  class B : public A {
   public:
    virtual void x();
  };
  matches B::x

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isPure

Matches if the given method declaration is pure.

Given
  class A {
   public:
    virtual void x() = 0;
  };
  matches A::x

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isUserProvided

Matches method declarations that are user-provided.

Given
  struct S {
    S(); // #1
    S(const S &) = default; // #2
    S(S &&) = delete; // #3
  };
cxxConstructorDecl(isUserProvided()) will match #1, but not #2 or #3.

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isVirtual

Matches declarations of virtual methods and C++ base specifers that specify
virtual inheritance.

Example:
  class A {
   public:
    virtual void x(); // matches x
  };

Example:
  class Base {};
  class DirectlyDerived : virtual Base {}; // matches Base
  class IndirectlyDerived : DirectlyDerived, Base {}; // matches Base

Usable as: Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

isVirtualAsWritten

Matches if the given method declaration has an explicit "virtual".

Given
  class A {
   public:
    virtual void x();
  };
  class B : public A {
   public:
    void x();
  };
  matches A::x but not B::x

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>

isArray

Matches array new expressions.

Given:
  MyClass \*p1 = new MyClass\[10\];
cxxNewExpr(isArray())
  matches the expression 'new MyClass\[10\]'.

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasAnyOperatorName

StringRef, ..., StringRef

Matches operator expressions (binary or unary) that have any of the
specified names.

   hasAnyOperatorName("+", "-")
 Is equivalent to
   anyOf(hasOperatorName("+"), hasOperatorName("-"))

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasAnyOverloadedOperatorName

StringRef, ..., StringRef

Matches overloaded operator names.

Matches overloaded operator names specified in strings without the
"operator" prefix: e.g. "<<".

  hasAnyOverloadedOperatorName("+", "-")
Is equivalent to
  anyOf(hasOverloadedOperatorName("+"), hasOverloadedOperatorName("-"))

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasOperatorName

std::string Name

Matches the operator Name of operator expressions and fold expressions
(binary or unary).

Example matches a || b (matcher = binaryOperator(hasOperatorName("||")))
  !(a || b)

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(hasOperatorName("+")))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasOverloadedOperatorName

StringRef Name

Matches overloaded operator names.

Matches overloaded operator names specified in strings without the
"operator" prefix: e.g. "<<".

Given:
  class A { int operator\*(); };
  const A &operator<<(const A &a, const A &b);
  A a;
  a << a;   // <-- This matches

cxxOperatorCallExpr(hasOverloadedOperatorName("<<"))) matches the
specified line and
cxxRecordDecl(hasMethod(hasOverloadedOperatorName("\*")))
matches the declaration of A.

Usable as: Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>, Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

isAssignmentOperator

Matches all kinds of assignment operators.

Example 1: matches a += b (matcher = binaryOperator(isAssignmentOperator()))
  if (a == b)
    a += b;

Example 2: matches s1 = s2
           (matcher = cxxOperatorCallExpr(isAssignmentOperator()))
  struct S { S& operator=(const S&); };
  void x() { S s1, s2; s1 = s2; }

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

isComparisonOperator

Matches comparison operators.

Example 1: matches a == b (matcher = binaryOperator(isComparisonOperator()))
  if (a == b)
    a += b;

Example 2: matches s1 < s2
           (matcher = cxxOperatorCallExpr(isComparisonOperator()))
  struct S { bool operator<(const S& other); };
  void x(S s1, S s2) { bool b1 = s1 < s2; }

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

hasDefinition

Matches a class declaration that is defined.

Example matches x (matcher = cxxRecordDecl(hasDefinition()))
class x {};
class y;

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isDerivedFrom

std::string BaseName

Overloaded method as shortcut for isDerivedFrom(hasName(...)).

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isDirectlyDerivedFrom

std::string BaseName

Overloaded method as shortcut for isDirectlyDerivedFrom(hasName(...)).

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isExplicitTemplateSpecialization

Matches explicit template specializations of function, class, or
static member variable template instantiations.

Given
  template<typename T> void A(T t) { }
  template<> void A(int N) { }
functionDecl(isExplicitTemplateSpecialization())
  matches the specialization A<int>().

Usable as: Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isFinal

Matches if the given method or class declaration is final.

Given:
  class A final {};

  struct B {
    virtual void f();
  };

  struct C : B {
    void f() final;
  };
matches A and C::f, but not B, C, or B::f

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isLambda

Matches the generated class of lambda expressions.

Given:
  auto x = \[\]{};

cxxRecordDecl(isLambda()) matches the implicit class declaration of
decltype(x)

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isSameOrDerivedFrom

std::string BaseName

Overloaded method as shortcut for
isSameOrDerivedFrom(hasName(...)).

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isTemplateInstantiation

Matches template instantiations of function, class, or static
member variable template instantiations.

Given
  template <typename T> class X {}; class A {}; X<A> x;
or
  template <typename T> class X {}; class A {}; template class X<A>;
or
  template <typename T> class X {}; class A {}; extern template class X<A>;
cxxRecordDecl(hasName("::X"), isTemplateInstantiation())
  matches the template instantiation of X<A>.

But given
  template <typename T>  class X {}; class A {};
  template <> class X<A> {}; X<A> x;
cxxRecordDecl(hasName("::X"), isTemplateInstantiation())
  does not match, as X<A> is an explicit template specialization.

Usable as: Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

hasAnyOperatorName

StringRef, ..., StringRef

Matches operator expressions (binary or unary) that have any of the
specified names.

   hasAnyOperatorName("+", "-")
 Is equivalent to
   anyOf(hasOperatorName("+"), hasOperatorName("-"))

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

hasOperatorName

std::string Name

Matches the operator Name of operator expressions and fold expressions
(binary or unary).

Example matches a || b (matcher = binaryOperator(hasOperatorName("||")))
  !(a || b)

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(hasOperatorName("+")))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

isAssignmentOperator

Matches all kinds of assignment operators.

Example 1: matches a += b (matcher = binaryOperator(isAssignmentOperator()))
  if (a == b)
    a += b;

Example 2: matches s1 = s2
           (matcher = cxxOperatorCallExpr(isAssignmentOperator()))
  struct S { S& operator=(const S&); };
  void x() { S s1, s2; s1 = s2; }

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

isComparisonOperator

Matches comparison operators.

Example 1: matches a == b (matcher = binaryOperator(isComparisonOperator()))
  if (a == b)
    a += b;

Example 2: matches s1 < s2
           (matcher = cxxOperatorCallExpr(isComparisonOperator()))
  struct S { bool operator<(const S& other); };
  void x(S s1, S s2) { bool b1 = s1 < s2; }

Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>

argumentCountAtLeast

unsigned N

Checks that a call expression or a constructor call expression has at least
the specified number of arguments (including absent default arguments).

Example matches f(0, 0) and g(0, 0, 0)
(matcher = callExpr(argumentCountAtLeast(2)))
  void f(int x, int y);
  void g(int x, int y, int z);
  f(0, 0);
  g(0, 0, 0);

Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>

argumentCountIs

unsigned N

Checks that a call expression or a constructor call expression has
a specific number of arguments (including absent default arguments).

Example matches f(0, 0) (matcher = callExpr(argumentCountIs(2)))
  void f(int x, int y);
  f(0, 0);

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

argumentCountAtLeast

unsigned N

Checks that a call expression or a constructor call expression has at least
the specified number of arguments (including absent default arguments).

Example matches f(0, 0) and g(0, 0, 0)
(matcher = callExpr(argumentCountAtLeast(2)))
  void f(int x, int y);
  void g(int x, int y, int z);
  f(0, 0);
  g(0, 0, 0);

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

argumentCountIs

unsigned N

Checks that a call expression or a constructor call expression has
a specific number of arguments (including absent default arguments).

Example matches f(0, 0) (matcher = callExpr(argumentCountIs(2)))
  void f(int x, int y);
  f(0, 0);

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

usesADL

Matches call expressions which were resolved using ADL.

Example matches y(x) but not y(42) or NS::y(x).
  namespace NS {
    struct X {};
    void y(X);
  }

  void y(...);

  void test() {
    NS::X x;
    y(x); // Matches
    NS::y(x); // Doesn't match
    y(42); // Doesn't match
    using NS::y;
    y(x); // Found by both unqualified lookup and ADL, doesn't match
   }

Matcher<[CastExpr](https://clang.llvm.org/doxygen/classclang_1_1CastExpr.html)\>

hasCastKind

CastKind Kind

Matches casts that has a given cast kind.

Example: matches the implicit cast around 0
(matcher = castExpr(hasCastKind(CK\_NullToPointer)))
  int \*p = 0;

If the matcher is use from clang-query, CastKind parameter
should be passed as a quoted string. e.g., hasCastKind("CK\_NullToPointer").

Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>

equals

bool Value

Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>

equals

const ValueT Value

Matches literals that are equal to the given value of type ValueT.

Given
  f('false, 3.14, 42);
characterLiteral(equals(0))
  matches 'cxxBoolLiteral(equals(false)) and cxxBoolLiteral(equals(0))
  match false
floatLiteral(equals(3.14)) and floatLiteral(equals(314e-2))
  match 3.14
integerLiteral(equals(42))
  matches 42

Note that you cannot directly match a negative numeric literal because the
minus sign is not part of the literal: It is a unary operator whose operand
is the positive numeric literal. Instead, you must use a unaryOperator()
matcher to match the minus sign:

unaryOperator(hasOperatorName("-"),
              hasUnaryOperand(integerLiteral(equals(13))))

Usable as: Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>, Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>,
           Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>, Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>

equals

double Value

Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>

equals

unsigned Value

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

templateArgumentCountIs

unsigned N

Matches if the number of template arguments equals N.

Given
  template<typename T> struct C {};
  C<int> c;
  template<typename T> void f() {}
  void func() { f<int>(); };

classTemplateSpecializationDecl(templateArgumentCountIs(1))
  matches C<int>.

functionDecl(templateArgumentCountIs(1))
  matches f<int>();

Matcher<[CompoundStmt](https://clang.llvm.org/doxygen/classclang_1_1CompoundStmt.html)\>

statementCountIs

unsigned N

Checks that a compound statement contains a specific number of
child statements.

Example: Given
  { for (;;) {} }
compoundStmt(statementCountIs(0)))
  matches '{}'
  but does not match the outer compound statement.

Matcher<[ConstantArrayType](https://clang.llvm.org/doxygen/classclang_1_1ConstantArrayType.html)\>

hasSize

unsigned N

Matches nodes that have the specified size.

Given
  int a\[42\];
  int b\[2 \* 21\];
  int c\[41\], d\[43\];
  char \*s = "abcd";
  wchar\_t \*ws = L"abcd";
  char \*w = "a";
constantArrayType(hasSize(42))
  matches "int a\[42\]" and "int b\[2 \* 21\]"
stringLiteral(hasSize(4))
  matches "abcd", L"abcd"

Matcher<[DeclStmt](https://clang.llvm.org/doxygen/classclang_1_1DeclStmt.html)\>

declCountIs

unsigned N

Matches declaration statements that contain a specific number of
declarations.

Example: Given
  int a, b;
  int c;
  int d = 2, e;
declCountIs(2)
  matches 'int a, b;' and 'int d = 2, e;', but not 'int c;'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

equalsBoundNode

std::string ID

Matches if a node equals a previously bound node.

Matches a node if it equals the node previously bound to ID.

Given
  class X { int a; int b; };
cxxRecordDecl(
    has(fieldDecl(hasName("a"), hasType(type().bind("t")))),
    has(fieldDecl(hasName("b"), hasType(type(equalsBoundNode("t"))))))
  matches the class X, as a and b have the same type.

Note that when multiple matches are involved via forEach\* matchers,
equalsBoundNodes acts as a filter.
For example:
compoundStmt(
    forEachDescendant(varDecl().bind("d")),
    forEachDescendant(declRefExpr(to(decl(equalsBoundNode("d"))))))
will trigger a match for each combination of variable declaration
and reference to that variable declaration within a compound statement.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

equalsNode

const Decl\* Other

Matches if a node equals another node.

Decl has pointer identity in the AST.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

hasAttr

attr::Kind AttrKind

Matches declaration that has a given attribute.

Given
  \_\_attribute\_\_((device)) void f() { ... }
decl(hasAttr(clang::attr::CUDADevice)) matches the function declaration of
f. If the matcher is used from clang-query, attr::Kind parameter should be
passed as a quoted string. e.g., hasAttr("attr::CUDADevice").

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isExpandedFromMacro

std::string MacroName

Matches statements that are (transitively) expanded from the named macro.
Does not match if only part of the statement is expanded from that macro or
if different parts of the statement are expanded from different
appearances of the macro.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isExpansionInFileMatching

StringRef RegExp, Regex::RegexFlags Flags = NoFlags

Matches AST nodes that were expanded within files whose name is
partially matching a given regex.

Example matches Y but not X
    (matcher = cxxRecordDecl(isExpansionInFileMatching("AST.\*"))
  #include "ASTMatcher.h"
  class X {};
ASTMatcher.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

If the matcher is used in clang-query, RegexFlags parameter
should be passed as a quoted string. e.g: "NoFlags".
Flags can be combined with '|' example "IgnoreCase | BasicRegex"

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isExpansionInMainFile

Matches AST nodes that were expanded within the main-file.

Example matches X but not Y
  (matcher = cxxRecordDecl(isExpansionInMainFile())
  #include <Y.h>
  class X {};
Y.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isExpansionInSystemHeader

Matches AST nodes that were expanded within system-header-files.

Example matches Y but not X
    (matcher = cxxRecordDecl(isExpansionInSystemHeader())
  #include <SystemHeader.h>
  class X {};
SystemHeader.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isImplicit

Matches an entity that has been implicitly added by the compiler (e.g.
implicit default/copy constructors).

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isInAnonymousNamespace

Matches declarations in an anonymous namespace.

Given
  class vector {};
  namespace foo {
    class vector {};
    namespace {
      class vector {}; // #1
    }
  }
  namespace {
    class vector {}; // #2
    namespace foo {
      class vector{}; // #3
    }
  }
cxxRecordDecl(hasName("vector"), isInAnonymousNamespace()) will match
#1, #2 and #3.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isInStdNamespace

Matches declarations in the namespace \`std\`, but not in nested namespaces.

Given
  class vector {};
  namespace foo {
    class vector {};
    namespace std {
      class vector {};
    }
  }
  namespace std {
    inline namespace \_\_1 {
      class vector {}; // #1
      namespace experimental {
        class vector {};
      }
    }
  }
cxxRecordDecl(hasName("vector"), isInStdNamespace()) will match only #1.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isInstantiated

Matches declarations that are template instantiations or are inside
template instantiations.

Given
  template<typename T> void A(T t) { T i; }
  A(0);
  A(0U);
functionDecl(isInstantiated())
  matches 'A(int) {...};' and 'A(unsigned) {...}'.

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isPrivate

Matches private C++ declarations and C++ base specifers that specify private
inheritance.

Examples:
  class C {
  public:    int a;
  protected: int b;
  private:   int c; // fieldDecl(isPrivate()) matches 'c'
  };

  struct Base {};
  struct Derived1 : private Base {}; // matches 'Base'
  class Derived2 : Base {}; // matches 'Base'

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isProtected

Matches protected C++ declarations and C++ base specifers that specify
protected inheritance.

Examples:
  class C {
  public:    int a;
  protected: int b; // fieldDecl(isProtected()) matches 'b'
  private:   int c;
  };

  class Base {};
  class Derived : protected Base {}; // matches 'Base'

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

isPublic

Matches public C++ declarations and C++ base specifers that specify public
inheritance.

Examples:
  class C {
  public:    int a; // fieldDecl(isPublic()) matches 'a'
  protected: int b;
  private:   int c;
  };

  class Base {};
  class Derived1 : public Base {}; // matches 'Base'
  struct Derived2 : Base {}; // matches 'Base'

Matcher<[DependentNameType](https://clang.llvm.org/doxygen/classclang_1_1DependentNameType.html)\>

hasDependentName

std::string N

Matches the dependent name of a DependentScopeDeclRefExpr or
DependentNameType

Given:
 template <class T> class X : T { void f() { T::v; } };
dependentScopeDeclRefExpr(hasDependentName("v")) matches \`T::v\`

Given:
 template <typename T> struct declToImport {
   typedef typename T::type dependent\_name;
 };
dependentNameType(hasDependentName("type")) matches \`T::type\`

Matcher<[DependentScopeDeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DependentScopeDeclRefExpr.html)\>

hasDependentName

std::string N

Matches the dependent name of a DependentScopeDeclRefExpr or
DependentNameType

Given:
 template <class T> class X : T { void f() { T::v; } };
dependentScopeDeclRefExpr(hasDependentName("v")) matches \`T::v\`

Given:
 template <typename T> struct declToImport {
   typedef typename T::type dependent\_name;
 };
dependentNameType(hasDependentName("type")) matches \`T::type\`

Matcher<[DesignatedInitExpr](https://clang.llvm.org/doxygen/classclang_1_1DesignatedInitExpr.html)\>

designatorCountIs

unsigned N

Matches designated initializer expressions that contain
a specific number of designators.

Example: Given
  point ptarray\[10\] = { \[2\].y = 1.0, \[0\].x = 1.0 };
  point ptarray2\[10\] = { \[2\].y = 1.0, \[2\].x = 0.0, \[0\].x = 1.0 };
designatorCountIs(2)
  matches '{ \[2\].y = 1.0, \[0\].x = 1.0 }',
  but not '{ \[2\].y = 1.0, \[2\].x = 0.0, \[0\].x = 1.0 }'.

Matcher<[EnumDecl](https://clang.llvm.org/doxygen/classclang_1_1EnumDecl.html)\>

isScoped

Matches C++11 scoped enum declaration.

Example matches Y (matcher = enumDecl(isScoped()))
enum X {};
enum class Y {};

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

isInstantiationDependent

Matches expressions that are instantiation-dependent even if it is
neither type- nor value-dependent.

In the following example, the expression sizeof(sizeof(T() + T()))
is instantiation-dependent (since it involves a template parameter T),
but is neither type- nor value-dependent, since the type of the inner
sizeof is known (std::size\_t) and therefore the size of the outer
sizeof is known.
  template<typename T>
  void f(T x, T y) { sizeof(sizeof(T() + T()); }
expr(isInstantiationDependent()) matches sizeof(sizeof(T() + T())

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

isTypeDependent

Matches expressions that are type-dependent because the template type
is not yet instantiated.

For example, the expressions "x" and "x + y" are type-dependent in
the following code, but "y" is not type-dependent:
  template<typename T>
  void add(T x, int y) {
    x + y;
  }
expr(isTypeDependent()) matches x + y

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

isValueDependent

Matches expression that are value-dependent because they contain a
non-type template parameter.

For example, the array bound of "Chars" in the following example is
value-dependent.
  template<int Size> int f() { return Size; }
expr(isValueDependent()) matches return Size

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

nullPointerConstant

Matches expressions that resolve to a null pointer constant, such as
GNU's \_\_null, C++11's nullptr, or C's NULL macro.

Given:
  void \*v1 = NULL;
  void \*v2 = nullptr;
  void \*v3 = \_\_null; // GNU extension
  char \*cp = (char \*)0;
  int \*ip = 0;
  int i = 0;
expr(nullPointerConstant())
  matches the initializer for v1, v2, v3, cp, and ip. Does not match the
  initializer for i.

Matcher<[FieldDecl](https://clang.llvm.org/doxygen/classclang_1_1FieldDecl.html)\>

hasBitWidth

unsigned Width

Matches non-static data members that are bit-fields of the specified
bit width.

Given
  class C {
    int a : 2;
    int b : 4;
    int c : 2;
  };
fieldDecl(hasBitWidth(2))
  matches 'int a;' and 'int c;' but not 'int b;'.

Matcher<[FieldDecl](https://clang.llvm.org/doxygen/classclang_1_1FieldDecl.html)\>

isBitField

Matches non-static data members that are bit-fields.

Given
  class C {
    int a : 2;
    int b;
  };
fieldDecl(isBitField())
  matches 'int a;' but not 'int b;'.

Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>

equals

const ValueT Value

Matches literals that are equal to the given value of type ValueT.

Given
  f('false, 3.14, 42);
characterLiteral(equals(0))
  matches 'cxxBoolLiteral(equals(false)) and cxxBoolLiteral(equals(0))
  match false
floatLiteral(equals(3.14)) and floatLiteral(equals(314e-2))
  match 3.14
integerLiteral(equals(42))
  matches 42

Note that you cannot directly match a negative numeric literal because the
minus sign is not part of the literal: It is a unary operator whose operand
is the positive numeric literal. Instead, you must use a unaryOperator()
matcher to match the minus sign:

unaryOperator(hasOperatorName("-"),
              hasUnaryOperand(integerLiteral(equals(13))))

Usable as: Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>, Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>,
           Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>, Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>

equals

double Value

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasAnyOverloadedOperatorName

StringRef, ..., StringRef

Matches overloaded operator names.

Matches overloaded operator names specified in strings without the
"operator" prefix: e.g. "<<".

  hasAnyOverloadedOperatorName("+", "-")
Is equivalent to
  anyOf(hasOverloadedOperatorName("+"), hasOverloadedOperatorName("-"))

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasDynamicExceptionSpec

Matches functions that have a dynamic exception specification.

Given:
  void f();
  void g() noexcept;
  void h() noexcept(true);
  void i() noexcept(false);
  void j() throw();
  void k() throw(int);
  void l() throw(...);
functionDecl(hasDynamicExceptionSpec()) and
  functionProtoType(hasDynamicExceptionSpec())
  match the declarations of j, k, and l, but not f, g, h, or i.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasOverloadedOperatorName

StringRef Name

Matches overloaded operator names.

Matches overloaded operator names specified in strings without the
"operator" prefix: e.g. "<<".

Given:
  class A { int operator\*(); };
  const A &operator<<(const A &a, const A &b);
  A a;
  a << a;   // <-- This matches

cxxOperatorCallExpr(hasOverloadedOperatorName("<<"))) matches the
specified line and
cxxRecordDecl(hasMethod(hasOverloadedOperatorName("\*")))
matches the declaration of A.

Usable as: Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>, Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasTrailingReturn

Matches a function declared with a trailing return type.

Example matches Y (matcher = functionDecl(hasTrailingReturn()))
int X() {}
auto Y() -> int {}

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isConsteval

Matches consteval function declarations and if consteval/if ! consteval
statements.

Given:
  consteval int a();
  void b() { if consteval {} }
  void c() { if ! consteval {} }
  void d() { if ! consteval {} else {} }
functionDecl(isConsteval())
  matches the declaration of "int a()".
ifStmt(isConsteval())
  matches the if statement in "void b()", "void c()", "void d()".

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isConstexpr

Matches constexpr variable and function declarations,
       and if constexpr.

Given:
  constexpr int foo = 42;
  constexpr int bar();
  void baz() { if constexpr(1 > 0) {} }
varDecl(isConstexpr())
  matches the declaration of foo.
functionDecl(isConstexpr())
  matches the declaration of bar.
ifStmt(isConstexpr())
  matches the if statement in baz.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isDefaulted

Matches defaulted function declarations.

Given:
  class A { ~A(); };
  class B { ~B() = default; };
functionDecl(isDefaulted())
  matches the declaration of ~B, but not ~A.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isDefinition

Matches if a declaration has a body attached.

Example matches A, va, fa
  class A {};
  class B;  // Doesn't match, as it has no body.
  int va;
  extern int vb;  // Doesn't match, as it doesn't define the variable.
  void fa() {}
  void fb();  // Doesn't match, as it has no body.
  @interface X
  - (void)ma; // Doesn't match, interface is declaration.
  @end
  @implementation X
  - (void)ma {}
  @end

Usable as: Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>,
  Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isDeleted

Matches deleted function declarations.

Given:
  void Func();
  void DeletedFunc() = delete;
functionDecl(isDeleted())
  matches the declaration of DeletedFunc, but not Func.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isExplicitTemplateSpecialization

Matches explicit template specializations of function, class, or
static member variable template instantiations.

Given
  template<typename T> void A(T t) { }
  template<> void A(int N) { }
functionDecl(isExplicitTemplateSpecialization())
  matches the specialization A<int>().

Usable as: Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isExternC

Matches extern "C" function or variable declarations.

Given:
  extern "C" void f() {}
  extern "C" { void g() {} }
  void h() {}
  extern "C" int x = 1;
  extern "C" int y = 2;
  int z = 3;
functionDecl(isExternC())
  matches the declaration of f and g, but not the declaration of h.
varDecl(isExternC())
  matches the declaration of x and y, but not the declaration of z.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isInline

Matches functions, variables and namespace declarations that are marked with
the inline keyword.

Given
  inline void f();
  void g();
  namespace n {
  inline namespace m {}
  }
  inline int Foo = 5;
functionDecl(isInline()) will match ::f().
namespaceDecl(isInline()) will match n::m.
varDecl(isInline()) will match Foo;

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isMain

Determines whether the function is "main", which is the entry point
into an executable program.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isNoReturn

Matches FunctionDecls that have a noreturn attribute.

Given
  void nope();
  \[\[noreturn\]\] void a();
  \_\_attribute\_\_((noreturn)) void b();
  struct c { \[\[noreturn\]\] c(); };
functionDecl(isNoReturn())
  matches all of those except
  void nope();

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isNoThrow

Matches functions that have a non-throwing exception specification.

Given:
  void f();
  void g() noexcept;
  void h() throw();
  void i() throw(int);
  void j() noexcept(false);
functionDecl(isNoThrow()) and functionProtoType(isNoThrow())
  match the declarations of g, and h, but not f, i or j.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isStaticStorageClass

Matches variable/function declarations that have "static" storage
class specifier ("static" keyword) written in the source.

Given:
  static void f() {}
  static int i = 0;
  extern int j;
  int k;
functionDecl(isStaticStorageClass())
  matches the function declaration f.
varDecl(isStaticStorageClass())
  matches the variable declaration i.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isTemplateInstantiation

Matches template instantiations of function, class, or static
member variable template instantiations.

Given
  template <typename T> class X {}; class A {}; X<A> x;
or
  template <typename T> class X {}; class A {}; template class X<A>;
or
  template <typename T> class X {}; class A {}; extern template class X<A>;
cxxRecordDecl(hasName("::X"), isTemplateInstantiation())
  matches the template instantiation of X<A>.

But given
  template <typename T>  class X {}; class A {};
  template <> class X<A> {}; X<A> x;
cxxRecordDecl(hasName("::X"), isTemplateInstantiation())
  does not match, as X<A> is an explicit template specialization.

Usable as: Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isVariadic

Matches if a function declaration is variadic.

Example matches f, but not g or h. The function i will not match, even when
compiled in C mode.
  void f(...);
  void g(int);
  template <typename... Ts> void h(Ts...);
  void i();

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

isWeak

Matches weak function declarations.

Given:
  void foo() \_\_attribute\_\_((\_\_weakref\_\_("\_\_foo")));
  void bar();
functionDecl(isWeak())
  matches the weak declaration "foo", but not "bar".

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

parameterCountIs

unsigned N

Matches FunctionDecls and FunctionProtoTypes that have a
specific parameter count.

Given
  void f(int i) {}
  void g(int i, int j) {}
  void h(int i, int j);
  void j(int i);
  void k(int x, int y, int z, ...);
functionDecl(parameterCountIs(2))
  matches g and h
functionProtoType(parameterCountIs(2))
  matches g and h
functionProtoType(parameterCountIs(3))
  matches k

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

templateArgumentCountIs

unsigned N

Matches if the number of template arguments equals N.

Given
  template<typename T> struct C {};
  C<int> c;
  template<typename T> void f() {}
  void func() { f<int>(); };

classTemplateSpecializationDecl(templateArgumentCountIs(1))
  matches C<int>.

functionDecl(templateArgumentCountIs(1))
  matches f<int>();

Matcher<[FunctionProtoType](https://clang.llvm.org/doxygen/classclang_1_1FunctionProtoType.html)\>

hasDynamicExceptionSpec

Matches functions that have a dynamic exception specification.

Given:
  void f();
  void g() noexcept;
  void h() noexcept(true);
  void i() noexcept(false);
  void j() throw();
  void k() throw(int);
  void l() throw(...);
functionDecl(hasDynamicExceptionSpec()) and
  functionProtoType(hasDynamicExceptionSpec())
  match the declarations of j, k, and l, but not f, g, h, or i.

Matcher<[FunctionProtoType](https://clang.llvm.org/doxygen/classclang_1_1FunctionProtoType.html)\>

isNoThrow

Matches functions that have a non-throwing exception specification.

Given:
  void f();
  void g() noexcept;
  void h() throw();
  void i() throw(int);
  void j() noexcept(false);
functionDecl(isNoThrow()) and functionProtoType(isNoThrow())
  match the declarations of g, and h, but not f, i or j.

Matcher<[FunctionProtoType](https://clang.llvm.org/doxygen/classclang_1_1FunctionProtoType.html)\>

parameterCountIs

unsigned N

Matches FunctionDecls and FunctionProtoTypes that have a
specific parameter count.

Given
  void f(int i) {}
  void g(int i, int j) {}
  void h(int i, int j);
  void j(int i);
  void k(int x, int y, int z, ...);
functionDecl(parameterCountIs(2))
  matches g and h
functionProtoType(parameterCountIs(2))
  matches g and h
functionProtoType(parameterCountIs(3))
  matches k

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

isConsteval

Matches consteval function declarations and if consteval/if ! consteval
statements.

Given:
  consteval int a();
  void b() { if consteval {} }
  void c() { if ! consteval {} }
  void d() { if ! consteval {} else {} }
functionDecl(isConsteval())
  matches the declaration of "int a()".
ifStmt(isConsteval())
  matches the if statement in "void b()", "void c()", "void d()".

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

isConstexpr

Matches constexpr variable and function declarations,
       and if constexpr.

Given:
  constexpr int foo = 42;
  constexpr int bar();
  void baz() { if constexpr(1 > 0) {} }
varDecl(isConstexpr())
  matches the declaration of foo.
functionDecl(isConstexpr())
  matches the declaration of bar.
ifStmt(isConstexpr())
  matches the if statement in baz.

Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

equals

bool Value

Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

equals

const ValueT Value

Matches literals that are equal to the given value of type ValueT.

Given
  f('false, 3.14, 42);
characterLiteral(equals(0))
  matches 'cxxBoolLiteral(equals(false)) and cxxBoolLiteral(equals(0))
  match false
floatLiteral(equals(3.14)) and floatLiteral(equals(314e-2))
  match 3.14
integerLiteral(equals(42))
  matches 42

Note that you cannot directly match a negative numeric literal because the
minus sign is not part of the literal: It is a unary operator whose operand
is the positive numeric literal. Instead, you must use a unaryOperator()
matcher to match the minus sign:

unaryOperator(hasOperatorName("-"),
              hasUnaryOperand(integerLiteral(equals(13))))

Usable as: Matcher<[CharacterLiteral](https://clang.llvm.org/doxygen/classclang_1_1CharacterLiteral.html)\>, Matcher<[CXXBoolLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXBoolLiteralExpr.html)\>,
           Matcher<[FloatingLiteral](https://clang.llvm.org/doxygen/classclang_1_1FloatingLiteral.html)\>, Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

equals

double Value

Matcher<[IntegerLiteral](https://clang.llvm.org/doxygen/classclang_1_1IntegerLiteral.html)\>

equals

unsigned Value

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\>

capturesThis

Matches a \`LambdaCapture\` that refers to 'this'.

Given
class C {
  int cc;
  int f() {
    auto l = \[this\]() { return cc; };
    return l();
  }
};
lambdaExpr(hasAnyCapture(lambdaCapture(capturesThis())))
  matches \`\[this\]() { return cc; }\`.

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\>

isImplicit

Matches an entity that has been implicitly added by the compiler (e.g.
implicit default/copy constructors).

Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>

isArrow

Matches member expressions that are called with '->' as opposed
to '.'.

Member calls on the implicit this pointer match as called with '->'.

Given
  class Y {
    void x() { this->x(); x(); Y y; y.x(); a; this->b; Y::b; }
    template <class T> void f() { this->f<T>(); f<T>(); }
    int a;
    static int b;
  };
  template <class T>
  class Z {
    void x() { this->m; }
  };
memberExpr(isArrow())
  matches this->x, x, y.x, a, this->b
cxxDependentScopeMemberExpr(isArrow())
  matches this->m
unresolvedMemberExpr(isArrow())
  matches this->f<T>, f<T>

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\>

hasAnyName

StringRef, ..., StringRef

Matches NamedDecl nodes that have any of the specified names.

This matcher is only provided as a performance optimization of hasName.
    hasAnyName(a, b, c)
 is equivalent to, but faster than
    anyOf(hasName(a), hasName(b), hasName(c))

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\>

hasExternalFormalLinkage

Matches a declaration that has external formal linkage.

Example matches only z (matcher = varDecl(hasExternalFormalLinkage()))
void f() {
  int x;
  static int y;
}
int z;

Example matches f() because it has external formal linkage despite being
unique to the translation unit as though it has internal likage
(matcher = functionDecl(hasExternalFormalLinkage()))

namespace {
void f() {}
}

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\>

hasName

StringRef Name

Matches NamedDecl nodes that have the specified name.

Supports specifying enclosing namespaces or classes by prefixing the name
with '<enclosing>::'.
Does not match typedefs of an underlying type with the given name.

Example matches X (Name == "X")
  class X;

Example matches X (Name is one of "::a::b::X", "a::b::X", "b::X", "X")
  namespace a { namespace b { class X; } }

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\>

matchesName

StringRef RegExp, Regex::RegexFlags Flags = NoFlags

Matches NamedDecl nodes whose fully qualified names contain
a substring matched by the given RegExp.

Supports specifying enclosing namespaces or classes by
prefixing the name with '<enclosing>::'.  Does not match typedefs
of an underlying type with the given name.

Example matches X (regexp == "::X")
  class X;

Example matches X (regexp is one of "::X", "^foo::.\*X", among others)
  namespace foo { namespace bar { class X; } }

If the matcher is used in clang-query, RegexFlags parameter
should be passed as a quoted string. e.g: "NoFlags".
Flags can be combined with '|' example "IgnoreCase | BasicRegex"

Matcher<[NamespaceDecl](https://clang.llvm.org/doxygen/classclang_1_1NamespaceDecl.html)\>

isAnonymous

Matches anonymous namespace declarations.

Given
  namespace n {
  namespace {} // #1
  }
namespaceDecl(isAnonymous()) will match #1 but not ::n.

Matcher<[NamespaceDecl](https://clang.llvm.org/doxygen/classclang_1_1NamespaceDecl.html)\>

isInline

Matches functions, variables and namespace declarations that are marked with
the inline keyword.

Given
  inline void f();
  void g();
  namespace n {
  inline namespace m {}
  }
  inline int Foo = 5;
functionDecl(isInline()) will match ::f().
namespaceDecl(isInline()) will match n::m.
varDecl(isInline()) will match Foo;

Matcher<[OMPDefaultClause](https://clang.llvm.org/doxygen/classclang_1_1OMPDefaultClause.html)\>

isFirstPrivateKind

Matches if the OpenMP \`\`default\`\` clause has \`\`firstprivate\`\` kind
specified.

Given

  #pragma omp parallel
  #pragma omp parallel default(none)
  #pragma omp parallel default(shared)
  #pragma omp parallel default(private)
  #pragma omp parallel default(firstprivate)

\`\`ompDefaultClause(isFirstPrivateKind())\`\` matches only
\`\`default(firstprivate)\`\`.

Matcher<[OMPDefaultClause](https://clang.llvm.org/doxygen/classclang_1_1OMPDefaultClause.html)\>

isNoneKind

Matches if the OpenMP \`\`default\`\` clause has \`\`none\`\` kind specified.

Given

  #pragma omp parallel
  #pragma omp parallel default(none)
  #pragma omp parallel default(shared)
  #pragma omp parallel default(private)
  #pragma omp parallel default(firstprivate)

\`\`ompDefaultClause(isNoneKind())\`\` matches only \`\`default(none)\`\`.

Matcher<[OMPDefaultClause](https://clang.llvm.org/doxygen/classclang_1_1OMPDefaultClause.html)\>

isPrivateKind

Matches if the OpenMP \`\`default\`\` clause has \`\`private\`\` kind
specified.

Given

  #pragma omp parallel
  #pragma omp parallel default(none)
  #pragma omp parallel default(shared)
  #pragma omp parallel default(private)
  #pragma omp parallel default(firstprivate)

\`\`ompDefaultClause(isPrivateKind())\`\` matches only
\`\`default(private)\`\`.

Matcher<[OMPDefaultClause](https://clang.llvm.org/doxygen/classclang_1_1OMPDefaultClause.html)\>

isSharedKind

Matches if the OpenMP \`\`default\`\` clause has \`\`shared\`\` kind specified.

Given

  #pragma omp parallel
  #pragma omp parallel default(none)
  #pragma omp parallel default(shared)
  #pragma omp parallel default(private)
  #pragma omp parallel default(firstprivate)

\`\`ompDefaultClause(isSharedKind())\`\` matches only \`\`default(shared)\`\`.

Matcher<[OMPExecutableDirective](https://clang.llvm.org/doxygen/classclang_1_1OMPExecutableDirective.html)\>

isAllowedToContainClauseKind

OpenMPClauseKind CKind

Matches if the OpenMP directive is allowed to contain the specified OpenMP
clause kind.

Given

  #pragma omp parallel
  #pragma omp parallel for
  #pragma omp          for

\`ompExecutableDirective(isAllowedToContainClause(OMPC\_default))\`\` matches
\`\`omp parallel\`\` and \`\`omp parallel for\`\`.

If the matcher is use from clang-query, \`\`OpenMPClauseKind\`\` parameter
should be passed as a quoted string. e.g.,
\`\`isAllowedToContainClauseKind("OMPC\_default").\`\`

Matcher<[OMPExecutableDirective](https://clang.llvm.org/doxygen/classclang_1_1OMPExecutableDirective.html)\>

isStandaloneDirective

Matches standalone OpenMP directives,
i.e., directives that can't have a structured block.

Given

  #pragma omp parallel
  {}
  #pragma omp taskyield

\`\`ompExecutableDirective(isStandaloneDirective()))\`\` matches
\`\`omp taskyield\`\`.

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

isDerivedFrom

std::string BaseName

Overloaded method as shortcut for isDerivedFrom(hasName(...)).

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

isDirectlyDerivedFrom

std::string BaseName

Overloaded method as shortcut for isDirectlyDerivedFrom(hasName(...)).

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

isSameOrDerivedFrom

std::string BaseName

Overloaded method as shortcut for
isSameOrDerivedFrom(hasName(...)).

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

argumentCountAtLeast

unsigned N

Checks that a call expression or a constructor call expression has at least
the specified number of arguments (including absent default arguments).

Example matches f(0, 0) and g(0, 0, 0)
(matcher = callExpr(argumentCountAtLeast(2)))
  void f(int x, int y);
  void g(int x, int y, int z);
  f(0, 0);
  g(0, 0, 0);

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

argumentCountIs

unsigned N

Checks that a call expression or a constructor call expression has
a specific number of arguments (including absent default arguments).

Example matches f(0, 0) (matcher = callExpr(argumentCountIs(2)))
  void f(int x, int y);
  f(0, 0);

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasAnySelector

StringRef, ..., StringRef

Matches when at least one of the supplied string equals to the
Selector.getAsString()

 matcher = objCMessageExpr(hasSelector("methodA:", "methodB:"));
 matches both of the expressions below:
    \[myObj methodA:argA\];
    \[myObj methodB:argB\];

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasKeywordSelector

Matches when the selector is a keyword selector

objCMessageExpr(hasKeywordSelector()) matches the generated setFrame
message expression in

  UIWebView \*webView = ...;
  CGRect bodyFrame = webView.frame;
  bodyFrame.size.height = self.bodyContentHeight;
  webView.frame = bodyFrame;
  //     ^---- matches here

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasNullSelector

Matches when the selector is the empty selector

Matches only when the selector of the objCMessageExpr is NULL. This may
represent an error condition in the tree!

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasSelector

std::string BaseName

Matches when BaseName == Selector.getAsString()

 matcher = objCMessageExpr(hasSelector("loadHTMLString:baseURL:"));
 matches the outer message expr in the code below, but NOT the message
 invocation for self.bodyView.
    \[self.bodyView loadHTMLString:html baseURL:NULL\];

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasUnarySelector

Matches when the selector is a Unary Selector

 matcher = objCMessageExpr(matchesSelector(hasUnarySelector());
 matches self.bodyView in the code below, but NOT the outer message
 invocation of "loadHTMLString:baseURL:".
    \[self.bodyView loadHTMLString:html baseURL:NULL\];

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

isClassMessage

Returns true when the Objective-C message is sent to a class.

Example
matcher = objcMessageExpr(isClassMessage())
matches
  \[NSString stringWithFormat:@"format"\];
but not
  NSString \*x = @"hello";
  \[x containsString:@"h"\];

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

isInstanceMessage

Returns true when the Objective-C message is sent to an instance.

Example
matcher = objcMessageExpr(isInstanceMessage())
matches
  NSString \*x = @"hello";
  \[x containsString:@"h"\];
but not
  \[NSString stringWithFormat:@"format"\];

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

matchesSelector

StringRef RegExp, Regex::RegexFlags Flags = NoFlags

Matches ObjC selectors whose name contains
a substring matched by the given RegExp.
 matcher = objCMessageExpr(matchesSelector("loadHTMLStringmatches the outer message expr in the code below, but NOT the message
 invocation for self.bodyView.
    \[self.bodyView loadHTMLString:html baseURL:NULL\];

If the matcher is used in clang-query, RegexFlags parameter
should be passed as a quoted string. e.g: "NoFlags".
Flags can be combined with '|' example "IgnoreCase | BasicRegex"

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

numSelectorArgs

unsigned N

Matches when the selector has the specified number of arguments

 matcher = objCMessageExpr(numSelectorArgs(0));
 matches self.bodyView in the code below

 matcher = objCMessageExpr(numSelectorArgs(2));
 matches the invocation of "loadHTMLString:baseURL:" but not that
 of self.bodyView
    \[self.bodyView loadHTMLString:html baseURL:NULL\];

Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

isClassMethod

Returns true when the Objective-C method declaration is a class method.

Example
matcher = objcMethodDecl(isClassMethod())
matches
@interface I + (void)foo; @end
but not
@interface I - (void)bar; @end

Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

isDefinition

Matches if a declaration has a body attached.

Example matches A, va, fa
  class A {};
  class B;  // Doesn't match, as it has no body.
  int va;
  extern int vb;  // Doesn't match, as it doesn't define the variable.
  void fa() {}
  void fb();  // Doesn't match, as it has no body.
  @interface X
  - (void)ma; // Doesn't match, interface is declaration.
  @end
  @implementation X
  - (void)ma {}
  @end

Usable as: Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>,
  Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

isInstanceMethod

Returns true when the Objective-C method declaration is an instance method.

Example
matcher = objcMethodDecl(isInstanceMethod())
matches
@interface I - (void)bar; @end
but not
@interface I + (void)foo; @end

Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\>

hasDefaultArgument

Matches a declaration that has default arguments.

Example matches y (matcher = parmVarDecl(hasDefaultArgument()))
void x(int val) {}
void y(int val = 0) {}

Deprecated. Use hasInitializer() instead to be able to
match on the contents of the default argument.  For example:

void x(int val = 7) {}
void y(int val = 42) {}
parmVarDecl(hasInitializer(integerLiteral(equals(42))))
  matches the parameter of y

A matcher such as
  parmVarDecl(hasInitializer(anything()))
is equivalent to parmVarDecl(hasDefaultArgument()).

Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\>

isAtPosition

unsigned N

Matches the ParmVarDecl nodes that are at the N'th position in the parameter
list. The parameter list could be that of either a block, function, or
objc-method.


Given

void f(int a, int b, int c) {
}

\`\`parmVarDecl(isAtPosition(0))\`\` matches \`\`int a\`\`.

\`\`parmVarDecl(isAtPosition(1))\`\` matches \`\`int b\`\`.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

asString

std::string Name

Matches if the matched type is represented by the given string.

Given
  class Y { public: void x(); };
  void z() { Y\* y; y->x(); }
cxxMemberCallExpr(on(hasType(asString("class Y \*"))))
  matches y->x()

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

equalsBoundNode

std::string ID

Matches if a node equals a previously bound node.

Matches a node if it equals the node previously bound to ID.

Given
  class X { int a; int b; };
cxxRecordDecl(
    has(fieldDecl(hasName("a"), hasType(type().bind("t")))),
    has(fieldDecl(hasName("b"), hasType(type(equalsBoundNode("t"))))))
  matches the class X, as a and b have the same type.

Note that when multiple matches are involved via forEach\* matchers,
equalsBoundNodes acts as a filter.
For example:
compoundStmt(
    forEachDescendant(varDecl().bind("d")),
    forEachDescendant(declRefExpr(to(decl(equalsBoundNode("d"))))))
will trigger a match for each combination of variable declaration
and reference to that variable declaration within a compound statement.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

hasLocalQualifiers

Matches QualType nodes that have local CV-qualifiers attached to
the node, not hidden within a typedef.

Given
  typedef const int const\_int;
  const\_int i;
  int \*const j;
  int \*volatile k;
  int m;
varDecl(hasType(hasLocalQualifiers())) matches only j and k.
i is const-qualified but the qualifier is not local.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isAnyCharacter

Matches QualType nodes that are of character type.

Given
  void a(char);
  void b(wchar\_t);
  void c(double);
functionDecl(hasAnyParameter(hasType(isAnyCharacter())))
matches "a(char)", "b(wchar\_t)", but not "c(double)".

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isAnyPointer

Matches QualType nodes that are of any pointer type; this includes
the Objective-C object pointer type, which is different despite being
syntactically similar.

Given
  int \*i = nullptr;

  @interface Foo
  @end
  Foo \*f;

  int j;
varDecl(hasType(isAnyPointer()))
  matches "int \*i" and "Foo \*f", but not "int j".

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isConstQualified

Matches QualType nodes that are const-qualified, i.e., that
include "top-level" const.

Given
  void a(int);
  void b(int const);
  void c(const int);
  void d(const int\*);
  void e(int const) {};
functionDecl(hasAnyParameter(hasType(isConstQualified())))
  matches "void b(int const)", "void c(const int)" and
  "void e(int const) {}". It does not match d as there
  is no top-level const on the parameter type "const int \*".

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isInteger

Matches QualType nodes that are of integer type.

Given
  void a(int);
  void b(long);
  void c(double);
functionDecl(hasAnyParameter(hasType(isInteger())))
matches "a(int)", "b(long)", but not "c(double)".

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isSignedInteger

Matches QualType nodes that are of signed integer type.

Given
  void a(int);
  void b(unsigned long);
  void c(double);
functionDecl(hasAnyParameter(hasType(isSignedInteger())))
matches "a(int)", but not "b(unsigned long)" and "c(double)".

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isUnsignedInteger

Matches QualType nodes that are of unsigned integer type.

Given
  void a(int);
  void b(unsigned long);
  void c(double);
functionDecl(hasAnyParameter(hasType(isUnsignedInteger())))
matches "b(unsigned long)", but not "a(int)" and "c(double)".

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

isVolatileQualified

Matches QualType nodes that are volatile-qualified, i.e., that
include "top-level" volatile.

Given
  void a(int);
  void b(int volatile);
  void c(volatile int);
  void d(volatile int\*);
  void e(int volatile) {};
functionDecl(hasAnyParameter(hasType(isVolatileQualified())))
  matches "void b(int volatile)", "void c(volatile int)" and
  "void e(int volatile) {}". It does not match d as there
  is no top-level volatile on the parameter type "volatile int \*".

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

equalsBoundNode

std::string ID

Matches if a node equals a previously bound node.

Matches a node if it equals the node previously bound to ID.

Given
  class X { int a; int b; };
cxxRecordDecl(
    has(fieldDecl(hasName("a"), hasType(type().bind("t")))),
    has(fieldDecl(hasName("b"), hasType(type(equalsBoundNode("t"))))))
  matches the class X, as a and b have the same type.

Note that when multiple matches are involved via forEach\* matchers,
equalsBoundNodes acts as a filter.
For example:
compoundStmt(
    forEachDescendant(varDecl().bind("d")),
    forEachDescendant(declRefExpr(to(decl(equalsBoundNode("d"))))))
will trigger a match for each combination of variable declaration
and reference to that variable declaration within a compound statement.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

equalsNode

const Stmt\* Other

Matches if a node equals another node.

Stmt has pointer identity in the AST.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

isExpandedFromMacro

std::string MacroName

Matches statements that are (transitively) expanded from the named macro.
Does not match if only part of the statement is expanded from that macro or
if different parts of the statement are expanded from different
appearances of the macro.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

isExpansionInFileMatching

StringRef RegExp, Regex::RegexFlags Flags = NoFlags

Matches AST nodes that were expanded within files whose name is
partially matching a given regex.

Example matches Y but not X
    (matcher = cxxRecordDecl(isExpansionInFileMatching("AST.\*"))
  #include "ASTMatcher.h"
  class X {};
ASTMatcher.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

If the matcher is used in clang-query, RegexFlags parameter
should be passed as a quoted string. e.g: "NoFlags".
Flags can be combined with '|' example "IgnoreCase | BasicRegex"

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

isExpansionInMainFile

Matches AST nodes that were expanded within the main-file.

Example matches X but not Y
  (matcher = cxxRecordDecl(isExpansionInMainFile())
  #include <Y.h>
  class X {};
Y.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

isExpansionInSystemHeader

Matches AST nodes that were expanded within system-header-files.

Example matches Y but not X
    (matcher = cxxRecordDecl(isExpansionInSystemHeader())
  #include <SystemHeader.h>
  class X {};
SystemHeader.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

isInTemplateInstantiation

Matches statements inside of a template instantiation.

Given
  int j;
  template<typename T> void A(T t) { T i; j += 42;}
  A(0);
  A(0U);
declStmt(isInTemplateInstantiation())
  matches 'int i;' and 'unsigned i'.
unless(stmt(isInTemplateInstantiation()))
  will NOT match j += 42; as it's shared between the template definition and
  instantiation.

Matcher<[StringLiteral](https://clang.llvm.org/doxygen/classclang_1_1StringLiteral.html)\>

hasSize

unsigned N

Matches nodes that have the specified size.

Given
  int a\[42\];
  int b\[2 \* 21\];
  int c\[41\], d\[43\];
  char \*s = "abcd";
  wchar\_t \*ws = L"abcd";
  char \*w = "a";
constantArrayType(hasSize(42))
  matches "int a\[42\]" and "int b\[2 \* 21\]"
stringLiteral(hasSize(4))
  matches "abcd", L"abcd"

Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>

isClass

Matches TagDecl object that are spelled with "class."

Example matches C, but not S, U or E.
  struct S {};
  class C {};
  union U {};
  enum E {};

Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>

isDefinition

Matches if a declaration has a body attached.

Example matches A, va, fa
  class A {};
  class B;  // Doesn't match, as it has no body.
  int va;
  extern int vb;  // Doesn't match, as it doesn't define the variable.
  void fa() {}
  void fb();  // Doesn't match, as it has no body.
  @interface X
  - (void)ma; // Doesn't match, interface is declaration.
  @end
  @implementation X
  - (void)ma {}
  @end

Usable as: Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>,
  Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>

isEnum

Matches TagDecl object that are spelled with "enum."

Example matches E, but not C, S or U.
  struct S {};
  class C {};
  union U {};
  enum E {};

Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>

isStruct

Matches TagDecl object that are spelled with "struct."

Example matches S, but not C, U or E.
  struct S {};
  class C {};
  union U {};
  enum E {};

Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>

isUnion

Matches TagDecl object that are spelled with "union."

Example matches U, but not C, S or E.
  struct S {};
  class C {};
  union U {};
  enum E {};

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

equalsIntegralValue

std::string Value

Matches a TemplateArgument of integral type with a given value.

Note that 'Value' is a string as the template argument's value is
an arbitrary precision integer. 'Value' must be euqal to the canonical
representation of that integral value in base 10.

Given
  template<int T> struct C {};
  C<42> c;
classTemplateSpecializationDecl(
  hasAnyTemplateArgument(equalsIntegralValue("42")))
  matches the implicit instantiation of C in C<42>.

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

isIntegral

Matches a TemplateArgument that is an integral value.

Given
  template<int T> struct C {};
  C<42> c;
classTemplateSpecializationDecl(
  hasAnyTemplateArgument(isIntegral()))
  matches the implicit instantiation of C in C<42>
  with isIntegral() matching 42.

Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>

templateArgumentCountIs

unsigned N

Matches if the number of template arguments equals N.

Given
  template<typename T> struct C {};
  C<int> c;
  template<typename T> void f() {}
  void func() { f<int>(); };

classTemplateSpecializationDecl(templateArgumentCountIs(1))
  matches C<int>.

functionDecl(templateArgumentCountIs(1))
  matches f<int>();

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

isExpandedFromMacro

std::string MacroName

Matches statements that are (transitively) expanded from the named macro.
Does not match if only part of the statement is expanded from that macro or
if different parts of the statement are expanded from different
appearances of the macro.

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

isExpansionInFileMatching

StringRef RegExp, Regex::RegexFlags Flags = NoFlags

Matches AST nodes that were expanded within files whose name is
partially matching a given regex.

Example matches Y but not X
    (matcher = cxxRecordDecl(isExpansionInFileMatching("AST.\*"))
  #include "ASTMatcher.h"
  class X {};
ASTMatcher.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

If the matcher is used in clang-query, RegexFlags parameter
should be passed as a quoted string. e.g: "NoFlags".
Flags can be combined with '|' example "IgnoreCase | BasicRegex"

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

isExpansionInMainFile

Matches AST nodes that were expanded within the main-file.

Example matches X but not Y
  (matcher = cxxRecordDecl(isExpansionInMainFile())
  #include <Y.h>
  class X {};
Y.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

isExpansionInSystemHeader

Matches AST nodes that were expanded within system-header-files.

Example matches Y but not X
    (matcher = cxxRecordDecl(isExpansionInSystemHeader())
  #include <SystemHeader.h>
  class X {};
SystemHeader.h:
  class Y {};

Usable as: Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>, Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

booleanType

Matches type bool.

Given
 struct S { bool func(); };
functionDecl(returns(booleanType()))
  matches "bool func();"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

equalsBoundNode

std::string ID

Matches if a node equals a previously bound node.

Matches a node if it equals the node previously bound to ID.

Given
  class X { int a; int b; };
cxxRecordDecl(
    has(fieldDecl(hasName("a"), hasType(type().bind("t")))),
    has(fieldDecl(hasName("b"), hasType(type(equalsBoundNode("t"))))))
  matches the class X, as a and b have the same type.

Note that when multiple matches are involved via forEach\* matchers,
equalsBoundNodes acts as a filter.
For example:
compoundStmt(
    forEachDescendant(varDecl().bind("d")),
    forEachDescendant(declRefExpr(to(decl(equalsBoundNode("d"))))))
will trigger a match for each combination of variable declaration
and reference to that variable declaration within a compound statement.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

equalsNode

const Type\* Other

Matches if a node equals another node.

Type has pointer identity in the AST.

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

realFloatingPointType

Matches any real floating-point type (float, double, long double).

Given
  int i;
  float f;
realFloatingPointType()
  matches "float f" but not "int i"

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

voidType

Matches type void.

Given
 struct S { void func(); };
functionDecl(returns(voidType()))
  matches "void func();"

Matcher<[UnaryExprOrTypeTraitExpr](https://clang.llvm.org/doxygen/classclang_1_1UnaryExprOrTypeTraitExpr.html)\>

ofKind

UnaryExprOrTypeTrait Kind

Matches unary expressions of a certain kind.

Given
  int x;
  int s = sizeof(x) + alignof(x)
unaryExprOrTypeTraitExpr(ofKind(UETT\_SizeOf))
  matches sizeof(x)

If the matcher is use from clang-query, UnaryExprOrTypeTrait parameter
should be passed as a quoted string. e.g., ofKind("UETT\_SizeOf").

Matcher<[UnaryOperator](https://clang.llvm.org/doxygen/classclang_1_1UnaryOperator.html)\>

hasAnyOperatorName

StringRef, ..., StringRef

Matches operator expressions (binary or unary) that have any of the
specified names.

   hasAnyOperatorName("+", "-")
 Is equivalent to
   anyOf(hasOperatorName("+"), hasOperatorName("-"))

Matcher<[UnaryOperator](https://clang.llvm.org/doxygen/classclang_1_1UnaryOperator.html)\>

hasOperatorName

std::string Name

Matches the operator Name of operator expressions and fold expressions
(binary or unary).

Example matches a || b (matcher = binaryOperator(hasOperatorName("||")))
  !(a || b)

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(hasOperatorName("+")))
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

Matcher<[UnresolvedMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedMemberExpr.html)\>

isArrow

Matches member expressions that are called with '->' as opposed
to '.'.

Member calls on the implicit this pointer match as called with '->'.

Given
  class Y {
    void x() { this->x(); x(); Y y; y.x(); a; this->b; Y::b; }
    template <class T> void f() { this->f<T>(); f<T>(); }
    int a;
    static int b;
  };
  template <class T>
  class Z {
    void x() { this->m; }
  };
memberExpr(isArrow())
  matches this->x, x, y.x, a, this->b
cxxDependentScopeMemberExpr(isArrow())
  matches this->m
unresolvedMemberExpr(isArrow())
  matches this->f<T>, f<T>

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

hasAutomaticStorageDuration

Matches a variable declaration that has automatic storage duration.

Example matches x, but not y, z, or a.
(matcher = varDecl(hasAutomaticStorageDuration())
void f() {
  int x;
  static int y;
  thread\_local int z;
}
int a;

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

hasGlobalStorage

Matches a variable declaration that does not have local storage.

Example matches y and z (matcher = varDecl(hasGlobalStorage())
void f() {
  int x;
  static int y;
}
int z;

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

hasLocalStorage

Matches a variable declaration that has function scope and is a
non-static local variable.

Example matches x (matcher = varDecl(hasLocalStorage())
void f() {
  int x;
  static int y;
}
int z;

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

hasStaticStorageDuration

Matches a variable declaration that has static storage duration.
It includes the variable declared at namespace scope and those declared
with "static" and "extern" storage class specifiers.

void f() {
  int x;
  static int y;
  thread\_local int z;
}
int a;
static int b;
extern int c;
varDecl(hasStaticStorageDuration())
  matches the function declaration y, a, b and c.

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

hasThreadStorageDuration

Matches a variable declaration that has thread storage duration.

Example matches z, but not x, z, or a.
(matcher = varDecl(hasThreadStorageDuration())
void f() {
  int x;
  static int y;
  thread\_local int z;
}
int a;

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isConstexpr

Matches constexpr variable and function declarations,
       and if constexpr.

Given:
  constexpr int foo = 42;
  constexpr int bar();
  void baz() { if constexpr(1 > 0) {} }
varDecl(isConstexpr())
  matches the declaration of foo.
functionDecl(isConstexpr())
  matches the declaration of bar.
ifStmt(isConstexpr())
  matches the if statement in baz.

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isConstinit

Matches constinit variable declarations.

Given:
  constinit int foo = 42;
  constinit const char\* bar = "bar";
  int baz = 42;
  \[\[clang::require\_constant\_initialization\]\] int xyz = 42;
varDecl(isConstinit())
  matches the declaration of \`foo\` and \`bar\`, but not \`baz\` and \`xyz\`.

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isDefinition

Matches if a declaration has a body attached.

Example matches A, va, fa
  class A {};
  class B;  // Doesn't match, as it has no body.
  int va;
  extern int vb;  // Doesn't match, as it doesn't define the variable.
  void fa() {}
  void fb();  // Doesn't match, as it has no body.
  @interface X
  - (void)ma; // Doesn't match, interface is declaration.
  @end
  @implementation X
  - (void)ma {}
  @end

Usable as: Matcher<[TagDecl](https://clang.llvm.org/doxygen/classclang_1_1TagDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>,
  Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isExceptionVariable

Matches a variable declaration that is an exception variable from
a C++ catch block, or an Objective-C statement.

Example matches x (matcher = varDecl(isExceptionVariable())
void f(int y) {
  try {
  } catch (int x) {
  }
}

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isExplicitTemplateSpecialization

Matches explicit template specializations of function, class, or
static member variable template instantiations.

Given
  template<typename T> void A(T t) { }
  template<> void A(int N) { }
functionDecl(isExplicitTemplateSpecialization())
  matches the specialization A<int>().

Usable as: Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isExternC

Matches extern "C" function or variable declarations.

Given:
  extern "C" void f() {}
  extern "C" { void g() {} }
  void h() {}
  extern "C" int x = 1;
  extern "C" int y = 2;
  int z = 3;
functionDecl(isExternC())
  matches the declaration of f and g, but not the declaration of h.
varDecl(isExternC())
  matches the declaration of x and y, but not the declaration of z.

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isInitCapture

Matches a variable serving as the implicit variable for a lambda init-
capture.

Example matches x (matcher = varDecl(isInitCapture()))
auto f = \[x=3\]() { return x; };

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isInline

Matches functions, variables and namespace declarations that are marked with
the inline keyword.

Given
  inline void f();
  void g();
  namespace n {
  inline namespace m {}
  }
  inline int Foo = 5;
functionDecl(isInline()) will match ::f().
namespaceDecl(isInline()) will match n::m.
varDecl(isInline()) will match Foo;

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isStaticLocal

Matches a static variable with local scope.

Example matches y (matcher = varDecl(isStaticLocal()))
void f() {
  int x;
  static int y;
}
static int z;

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isStaticStorageClass

Matches variable/function declarations that have "static" storage
class specifier ("static" keyword) written in the source.

Given:
  static void f() {}
  static int i = 0;
  extern int j;
  int k;
functionDecl(isStaticStorageClass())
  matches the function declaration f.
varDecl(isStaticStorageClass())
  matches the variable declaration i.

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

isTemplateInstantiation

Matches template instantiations of function, class, or static
member variable template instantiations.

Given
  template <typename T> class X {}; class A {}; X<A> x;
or
  template <typename T> class X {}; class A {}; template class X<A>;
or
  template <typename T> class X {}; class A {}; extern template class X<A>;
cxxRecordDecl(hasName("::X"), isTemplateInstantiation())
  matches the template instantiation of X<A>.

But given
  template <typename T>  class X {}; class A {};
  template <> class X<A> {}; X<A> x;
cxxRecordDecl(hasName("::X"), isTemplateInstantiation())
  does not match, as X<A> is an explicit template specialization.

Usable as: Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>, Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>, Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

Matcher<[VarTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1VarTemplateSpecializationDecl.html)\>

templateArgumentCountIs

unsigned N

Matches if the number of template arguments equals N.

Given
  template<typename T> struct C {};
  C<int> c;
  template<typename T> void f() {}
  void func() { f<int>(); };

classTemplateSpecializationDecl(templateArgumentCountIs(1))
  matches C<int>.

functionDecl(templateArgumentCountIs(1))
  matches f<int>();

AST Traversal Matchers
----------------------

Traversal matchers specify the relationship to other nodes that are reachable from the current node.

Note that there are special traversal matchers (has, hasDescendant, forEach and forEachDescendant) which work on all nodes and allow users to write more generic match expressions.

Return type

Name

Parameters

Matcher<\*>

binaryOperation

Matcher<\*>...Matcher<\*>

Matches nodes which can be used with binary operators.

The code
  var1 != var2;
might be represented in the clang AST as a binaryOperator, a
cxxOperatorCallExpr or a cxxRewrittenBinaryOperator, depending on

\* whether the types of var1 and var2 are fundamental (binaryOperator) or at
  least one is a class type (cxxOperatorCallExpr)
\* whether the code appears in a template declaration, if at least one of the
  vars is a dependent-type (binaryOperator)
\* whether the code relies on a rewritten binary operator, such as a
spaceship operator or an inverted equality operator
(cxxRewrittenBinaryOperator)

This matcher elides details in places where the matchers for the nodes are
compatible.

Given
  binaryOperation(
    hasOperatorName("!="),
    hasLHS(expr().bind("lhs")),
    hasRHS(expr().bind("rhs"))
  )
matches each use of "!=" in:
  struct S{
      bool operator!=(const S&) const;
  };

  void foo()
  {
     1 != 2;
     S() != S();
  }

  template<typename T>
  void templ()
  {
     1 != 2;
     T() != S();
  }
  struct HasOpEq
  {
      bool operator==(const HasOpEq &) const;
  };

  void inverse()
  {
      HasOpEq s1;
      HasOpEq s2;
      if (s1 != s2)
          return;
  }

  struct HasSpaceship
  {
      bool operator<=>(const HasOpEq &) const;
  };

  void use\_spaceship()
  {
      HasSpaceship s1;
      HasSpaceship s2;
      if (s1 != s2)
          return;
  }

Matcher<\*>

eachOf

Matcher<\*>, ..., Matcher<\*>

Matches if any of the given matchers matches.

Unlike anyOf, eachOf will generate a match result for each
matching submatcher.

For example, in:
  class A { int a; int b; };
The matcher:
  cxxRecordDecl(eachOf(has(fieldDecl(hasName("a")).bind("v")),
                       has(fieldDecl(hasName("b")).bind("v"))))
will generate two results binding "v", the first of which binds
the field declaration of a, the second the field declaration of
b.

Usable as: Any Matcher

Matcher<\*>

findAll

Matcher<\*> Matcher

Matches if the node or any descendant matches.

Generates results for each match.

For example, in:
  class A { class B {}; class C {}; };
The matcher:
  cxxRecordDecl(hasName("::A"),
                findAll(cxxRecordDecl(isDefinition()).bind("m")))
will generate results for A, B and C.

Usable as: Any Matcher

Matcher<\*>

forEachDescendant

Matcher<\*>

Matches AST nodes that have descendant AST nodes that match the
provided matcher.

Example matches X, A, A::X, B, B::C, B::C::X
  (matcher = cxxRecordDecl(forEachDescendant(cxxRecordDecl(hasName("X")))))
  class X {};
  class A { class X {}; };  // Matches A, because A::X is a class of name
                            // X inside A.
  class B { class C { class X {}; }; };

DescendantT must be an AST base type.

As opposed to 'hasDescendant', 'forEachDescendant' will cause a match for
each result that matches instead of only on the first one.

Note: Recursively combined ForEachDescendant can cause many matches:
  cxxRecordDecl(forEachDescendant(cxxRecordDecl(
    forEachDescendant(cxxRecordDecl())
  )))
will match 10 times (plus injected class name matches) on:
  class A { class B { class C { class D { class E {}; }; }; }; };

Usable as: Any Matcher

Matcher<\*>

forEach

Matcher<\*>

Matches AST nodes that have child AST nodes that match the
provided matcher.

Example matches X, Y, Y::X, Z::Y, Z::Y::X
  (matcher = cxxRecordDecl(forEach(cxxRecordDecl(hasName("X")))
  class X {};
  class Y { class X {}; };  // Matches Y, because Y::X is a class of name X
                            // inside Y.
  class Z { class Y { class X {}; }; };  // Does not match Z.

ChildT must be an AST base type.

As opposed to 'has', 'forEach' will cause a match for each result that
matches instead of only on the first one.

Usable as: Any Matcher

Matcher<\*>

hasAncestor

Matcher<\*>

Matches AST nodes that have an ancestor that matches the provided
matcher.

Given
void f() { if (true) { int x = 42; } }
void g() { for (;;) { int x = 43; } }
expr(integerLiteral(hasAncestor(ifStmt()))) matches 42, but not 43.

Usable as: Any Matcher

Matcher<\*>

hasDescendant

Matcher<\*>

Matches AST nodes that have descendant AST nodes that match the
provided matcher.

Example matches X, Y, Z
    (matcher = cxxRecordDecl(hasDescendant(cxxRecordDecl(hasName("X")))))
  class X {};  // Matches X, because X::X is a class of name X inside X.
  class Y { class X {}; };
  class Z { class Y { class X {}; }; };

DescendantT must be an AST base type.

Usable as: Any Matcher

Matcher<\*>

has

Matcher<\*>

Matches AST nodes that have child AST nodes that match the
provided matcher.

Example matches X, Y
  (matcher = cxxRecordDecl(has(cxxRecordDecl(hasName("X")))
  class X {};  // Matches X, because X::X is a class of name X inside X.
  class Y { class X {}; };
  class Z { class Y { class X {}; }; };  // Does not match Z.

ChildT must be an AST base type.

Usable as: Any Matcher
Note that has is direct matcher, so it also matches things like implicit
casts and paren casts. If you are matching with expr then you should
probably consider using ignoringParenImpCasts like:
has(ignoringParenImpCasts(expr())).

Matcher<\*>

hasParent

Matcher<\*>

Matches AST nodes that have a parent that matches the provided
matcher.

Given
void f() { for (;;) { int x = 42; if (true) { int x = 43; } } }
compoundStmt(hasParent(ifStmt())) matches "{ int x = 43; }".

Usable as: Any Matcher

Matcher<\*>

invocation

Matcher<\*>...Matcher<\*>

Matches function calls and constructor calls

Because CallExpr and CXXConstructExpr do not share a common
base class with API accessing arguments etc, AST Matchers for code
which should match both are typically duplicated. This matcher
removes the need for duplication.

Given code
struct ConstructorTakesInt
{
  ConstructorTakesInt(int i) {}
};

void callTakesInt(int i)
{
}

void doCall()
{
  callTakesInt(42);
}

void doConstruct()
{
  ConstructorTakesInt cti(42);
}

The matcher
invocation(hasArgument(0, integerLiteral(equals(42))))
matches the expression in both doCall and doConstruct

Matcher<\*>

optionally

Matcher<\*>

Matches any node regardless of the submatcher.

However, optionally will retain any bindings generated by the submatcher.
Useful when additional information which may or may not present about a main
matching node is desired.

For example, in:
  class Foo {
    int bar;
  }
The matcher:
  cxxRecordDecl(
    optionally(has(
      fieldDecl(hasName("bar")).bind("var")
  ))).bind("record")
will produce a result binding for both "record" and "var".
The matcher will produce a "record" binding for even if there is no data
member named "bar" in that class.

Usable as: Any Matcher

Matcher<\*>

traverse

TraversalKind TK, Matcher<\*> InnerMatcher

Causes all nested matchers to be matched with the specified traversal kind.

Given
  void foo()
  {
      int i = 3.0;
  }
The matcher
  traverse(TK\_IgnoreUnlessSpelledInSource,
    varDecl(hasInitializer(floatLiteral().bind("init")))
  )
matches the variable declaration with "init" bound to the "3.0".

Matcher<[AbstractConditionalOperator](https://clang.llvm.org/doxygen/classclang_1_1AbstractConditionalOperator.html)\>

hasCondition

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the condition expression of an if statement, for loop,
switch statement or conditional operator.

Example matches true (matcher = hasCondition(cxxBoolLiteral(equals(true))))
  if (true) {}

Matcher<[AbstractConditionalOperator](https://clang.llvm.org/doxygen/classclang_1_1AbstractConditionalOperator.html)\>

hasFalseExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the false branch expression of a conditional operator
(binary or ternary).

Example matches b
  condition ? a : b
  condition ?: b

Matcher<[AbstractConditionalOperator](https://clang.llvm.org/doxygen/classclang_1_1AbstractConditionalOperator.html)\>

hasTrueExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the true branch expression of a conditional operator.

Example 1 (conditional ternary operator): matches a
  condition ? a : b

Example 2 (conditional binary operator): matches opaqueValueExpr(condition)
  condition ?: b

Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[ArraySubscriptExpr](https://clang.llvm.org/doxygen/classclang_1_1ArraySubscriptExpr.html)\>

hasBase

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the base expression of an array subscript expression.

Given
  int i\[5\];
  void f() { i\[1\] = 42; }
arraySubscriptExpression(hasBase(implicitCastExpr(
    hasSourceExpression(declRefExpr()))))
  matches i\[1\] with the declRefExpr() matching i

Matcher<[ArraySubscriptExpr](https://clang.llvm.org/doxygen/classclang_1_1ArraySubscriptExpr.html)\>

hasIndex

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the index expression of an array subscript expression.

Given
  int i\[5\];
  void f() { i\[1\] = 42; }
arraySubscriptExpression(hasIndex(integerLiteral()))
  matches i\[1\] with the integerLiteral() matching 1

Matcher<[ArraySubscriptExpr](https://clang.llvm.org/doxygen/classclang_1_1ArraySubscriptExpr.html)\>

hasLHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the left hand side of binary operator expressions.

Example matches a (matcher = binaryOperator(hasLHS()))
  a || b

Matcher<[ArraySubscriptExpr](https://clang.llvm.org/doxygen/classclang_1_1ArraySubscriptExpr.html)\>

hasRHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the right hand side of binary operator expressions.

Example matches b (matcher = binaryOperator(hasRHS()))
  a || b

Matcher<[ArrayType](https://clang.llvm.org/doxygen/classclang_1_1ArrayType.html)\>

hasElementType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches arrays and C99 complex types that have a specific element
type.

Given
  struct A {};
  A a\[7\];
  int b\[7\];
arrayType(hasElementType(builtinType()))
  matches "int b\[7\]"

Usable as: Matcher<[ArrayType](https://clang.llvm.org/doxygen/classclang_1_1ArrayType.html)\>, Matcher<[ComplexType](https://clang.llvm.org/doxygen/classclang_1_1ComplexType.html)\>

Matcher<[AtomicType](https://clang.llvm.org/doxygen/classclang_1_1AtomicType.html)\>

hasValueType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches atomic types with a specific value type.

Given
  \_Atomic(int) i;
  \_Atomic(float) f;
atomicType(hasValueType(isInteger()))
 matches "\_Atomic(int) i"

Usable as: Matcher<[AtomicType](https://clang.llvm.org/doxygen/classclang_1_1AtomicType.html)\>

Matcher<[AutoType](https://clang.llvm.org/doxygen/classclang_1_1AutoType.html)\>

hasDeducedType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches AutoType nodes where the deduced type is a specific type.

Note: There is no TypeLoc for the deduced type and thus no
getDeducedLoc() matcher.

Given
  auto a = 1;
  auto b = 2.0;
autoType(hasDeducedType(isInteger()))
  matches "auto a"

Usable as: Matcher<[AutoType](https://clang.llvm.org/doxygen/classclang_1_1AutoType.html)\>

Matcher<[BaseUsingDecl](https://clang.llvm.org/doxygen/classclang_1_1BaseUsingDecl.html)\>

hasAnyUsingShadowDecl

Matcher<[UsingShadowDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingShadowDecl.html)\> InnerMatcher

Matches any using shadow declaration.

Given
  namespace X { void b(); }
  using X::b;
usingDecl(hasAnyUsingShadowDecl(hasName("b"))))
  matches using X::b 

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

hasEitherOperand

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if either the left hand side or the right hand side of a
binary operator or fold expression matches.

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

hasLHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the left hand side of binary operator expressions.

Example matches a (matcher = binaryOperator(hasLHS()))
  a || b

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

hasOperands

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher1, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher2

Matches if both matchers match with opposite sides of the binary operator
or fold expression.

Example matcher = binaryOperator(hasOperands(integerLiteral(equals(1),
                                             integerLiteral(equals(2)))
  1 + 2 // Match
  2 + 1 // Match
  1 + 1 // No match
  2 + 2 // No match

Matcher<[BinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1BinaryOperator.html)\>

hasRHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the right hand side of binary operator expressions.

Example matches b (matcher = binaryOperator(hasRHS()))
  a || b

Matcher<[BindingDecl](https://clang.llvm.org/doxygen/classclang_1_1BindingDecl.html)\>

forDecomposition

Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\> InnerMatcher

Matches the DecompositionDecl the binding belongs to.

For example, in:
void foo()
{
    int arr\[3\];
    auto &\[f, s, t\] = arr;

    f = 42;
}
The matcher:
  bindingDecl(hasName("f"),
                forDecomposition(decompositionDecl())
matches 'f' in 'auto &\[f, s, t\]'.

Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>

hasAnyParameter

Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> InnerMatcher

Matches any parameter of a function or an ObjC method declaration or a
block.

Does not match the 'this' parameter of a method.

Given
  class X { void f(int x, int y, int z) {} };
cxxMethodDecl(hasAnyParameter(hasName("y")))
  matches f(int x, int y, int z) {}
with hasAnyParameter(...)
  matching int y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end

the matcher objcMethodDecl(hasAnyParameter(hasName("y")))
matches the declaration of method f with hasParameter
matching y.

For blocks, given
  b = ^(int y) { printf("%d", y) };

the matcher blockDecl(hasAnyParameter(hasName("y")))
matches the declaration of the block b with hasParameter
matching y.

Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>

hasParameter

unsigned N, Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> InnerMatcher

Matches the n'th parameter of a function or an ObjC method
declaration or a block.

Given
  class X { void f(int x) {} };
cxxMethodDecl(hasParameter(0, hasType(varDecl())))
  matches f(int x) {}
with hasParameter(...)
  matching int x

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end

the matcher objcMethodDecl(hasParameter(0, hasName("y")))
matches the declaration of method f with hasParameter
matching y.

Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>

pointee

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Narrows PointerType (and similar) matchers to those where the
pointee matches a given matcher.

Given
  int \*a;
  int const \*b;
  float const \*f;
pointerType(pointee(isConstQualified(), isInteger()))
  matches "int const \*b"

Usable as: Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>, Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>,
  Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>, Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>,
  Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

hasType

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the declaration of the expression's or value
declaration's type.

In case of a value declaration (for example a variable declaration),
this resolves one layer of indirection. For example, in the value
declaration "X x;", cxxRecordDecl(hasName("X")) matches the declaration of
X, while varDecl(hasType(cxxRecordDecl(hasName("X")))) matches the
declaration of x.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              cxxRecordDecl(hasName("X"))))
 class X {};
 void y(X &x) { x; X z; }
 class Y { friend class X; };
 class Z : public virtual X {};

Example matches class Derived
(matcher = cxxRecordDecl(hasAnyBase(hasType(cxxRecordDecl(hasName("Base"))))))
class Base {};
class Derived : Base {};

Usable as: Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>, Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>, Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>,
Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

hasType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the expression's or declaration's type matches a type
matcher.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and U (matcher = typedefDecl(hasType(asString("int")))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              asString("class X")))
 class X {};
 void y(X &x) { x; X z; }
 typedef int U;
 class Y { friend class X; };
 class Z : public virtual X {};

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

forEachArgumentWithParam

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> ArgMatcher, Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> ParamMatcher

Matches all arguments and their respective ParmVarDecl.

Given
  void f(int i);
  int y;
  f(y);
callExpr(
  forEachArgumentWithParam(
    declRefExpr(to(varDecl(hasName("y")))),
    parmVarDecl(hasType(isInteger()))
))
  matches f(y);
with declRefExpr(...)
  matching int y
and parmVarDecl(...)
  matching int i

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

forEachArgumentWithParamType

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> ArgMatcher, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> ParamMatcher

Matches all arguments and their respective types for a CallExpr or
CXXConstructExpr. It is very similar to forEachArgumentWithParam but
it works on calls through function pointers as well.

The difference is, that function pointers do not provide access to a
ParmVarDecl, but only the QualType for each argument.

Given
  void f(int i);
  int y;
  f(y);
  void (\*f\_ptr)(int) = f;
  f\_ptr(y);
callExpr(
  forEachArgumentWithParamType(
    declRefExpr(to(varDecl(hasName("y")))),
    qualType(isInteger()).bind("type)
))
  matches f(y) and f\_ptr(y)
with declRefExpr(...)
  matching int y
and qualType(...)
  matching int

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

hasAnyArgument

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches any argument of a call expression or a constructor call
expression, or an ObjC-message-send expression.

Given
  void x(int, int, int) { int y; x(1, y, 42); }
callExpr(hasAnyArgument(declRefExpr()))
  matches x(1, y, 42)
with hasAnyArgument(...)
  matching y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end
  void foo(I \*i) { \[i f:12\]; }
objcMessageExpr(hasAnyArgument(integerLiteral(equals(12))))
  matches \[i f:12\]

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

hasArgument

unsigned N, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the n'th argument of a call expression or a constructor
call expression.

Example matches y in x(y)
    (matcher = callExpr(hasArgument(0, declRefExpr())))
  void x(int) { int y; x(y); }

Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

forEachConstructorInitializer

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\> InnerMatcher

Matches each constructor initializer in a constructor definition.

Given
  class A { A() : i(42), j(42) {} int i; int j; };
cxxConstructorDecl(forEachConstructorInitializer(
  forField(decl().bind("x"))
))
  will trigger two matches, binding for 'i' and 'j' respectively.

Matcher<[CXXConstructorDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructorDecl.html)\>

hasAnyConstructorInitializer

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\> InnerMatcher

Matches a constructor initializer.

Given
  struct Foo {
    Foo() : foo\_(1) { }
    int foo\_;
  };
cxxRecordDecl(has(cxxConstructorDecl(
  hasAnyConstructorInitializer(anything())
)))
  record matches Foo, hasAnyConstructorInitializer matches foo\_(1)

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

forField

Matcher<[FieldDecl](https://clang.llvm.org/doxygen/classclang_1_1FieldDecl.html)\> InnerMatcher

Matches the field declaration of a constructor initializer.

Given
  struct Foo {
    Foo() : foo\_(1) { }
    int foo\_;
  };
cxxRecordDecl(has(cxxConstructorDecl(hasAnyConstructorInitializer(
    forField(hasName("foo\_"))))))
  matches Foo
with forField matching foo\_

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>

withInitializer

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the initializer expression of a constructor initializer.

Given
  struct Foo {
    Foo() : foo\_(1) { }
    int foo\_;
  };
cxxRecordDecl(has(cxxConstructorDecl(hasAnyConstructorInitializer(
    withInitializer(integerLiteral(equals(1)))))))
  matches Foo
with withInitializer matching (1)

Matcher<[CXXDependentScopeMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXDependentScopeMemberExpr.html)\>

hasObjectExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches a member expression where the object expression is matched by a
given matcher. Implicit object expressions are included; that is, it matches
use of implicit \`this\`.

Given
  struct X {
    int m;
    int f(X x) { x.m; return m; }
  };
memberExpr(hasObjectExpression(hasType(cxxRecordDecl(hasName("X")))))
  matches \`x.m\`, but not \`m\`; however,
memberExpr(hasObjectExpression(hasType(pointsTo(
     cxxRecordDecl(hasName("X"))))))
  matches \`m\` (aka. \`this->m\`), but not \`x.m\`.

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

callee

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches if the call or fold expression's callee expression matches.

Given
  class Y { void x() { this->x(); x(); Y y; y.x(); } };
  void f() { f(); }
callExpr(callee(expr()))
  matches this->x(), x(), y.x(), f()
with callee(...)
  matching this->x, x, y.x, f respectively

Given
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ... \* 1);
  }
cxxFoldExpr(callee(expr()))
  matches (args \* ... \* 1)
with callee(...)
  matching \*

Note: Callee cannot take the more general internal::Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>
because this introduces ambiguous overloads with calls to Callee taking a
internal::Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, as the matcher hierarchy is purely
implemented in terms of implicit casts.

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasEitherOperand

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if either the left hand side or the right hand side of a
binary operator or fold expression matches.

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasFoldInit

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMacher

Matches the operand that does not contain the parameter pack.

Example matches \`(0 + ... + args)\` and \`(args \* ... \* 1)\`
    (matcher = cxxFoldExpr(hasFoldInit(expr())))
  with hasFoldInit(...)
    matching \`0\` and \`1\` respectively
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ... \* 1);
  }

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasLHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the left hand side of binary operator expressions.

Example matches a (matcher = binaryOperator(hasLHS()))
  a || b

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasOperands

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher1, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher2

Matches if both matchers match with opposite sides of the binary operator
or fold expression.

Example matcher = binaryOperator(hasOperands(integerLiteral(equals(1),
                                             integerLiteral(equals(2)))
  1 + 2 // Match
  2 + 1 // Match
  1 + 1 // No match
  2 + 2 // No match

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasPattern

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMacher

Matches the operand that contains the parameter pack.

Example matches \`(0 + ... + args)\`
    (matcher = cxxFoldExpr(hasPattern(expr())))
  with hasPattern(...)
    matching \`args\`
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ... \* 1);
  }

Matcher<[CXXFoldExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFoldExpr.html)\>

hasRHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the right hand side of binary operator expressions.

Example matches b (matcher = binaryOperator(hasRHS()))
  a || b

Matcher<[CXXForRangeStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXForRangeStmt.html)\>

hasBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a 'for', 'while', 'while' statement or a function or coroutine
definition that has a given body. Note that in case of functions or
coroutines this matcher only matches the definition itself and not the
other declarations of the same function or coroutine.

Given
  for (;;) {}
forStmt(hasBody(compoundStmt()))
  matches 'for (;;) {}'
with compoundStmt()
  matching '{}'

Given
  void f();
  void f() {}
functionDecl(hasBody(compoundStmt()))
  matches 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void f();'

Matcher<[CXXForRangeStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXForRangeStmt.html)\>

hasInitStatement

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches selection statements with initializer.

Given:
 void foo() {
   if (int i = foobar(); i > 0) {}
   switch (int i = foobar(); i) {}
   for (auto& a = get\_range(); auto& x : a) {}
 }
 void bar() {
   if (foobar() > 0) {}
   switch (foobar()) {}
   for (auto& x : get\_range()) {}
 }
ifStmt(hasInitStatement(anything()))
  matches the if statement in foo but not in bar.
switchStmt(hasInitStatement(anything()))
  matches the switch statement in foo but not in bar.
cxxForRangeStmt(hasInitStatement(anything()))
  matches the range for statement in foo but not in bar.

Matcher<[CXXForRangeStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXForRangeStmt.html)\>

hasLoopVariable

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\> InnerMatcher

Matches the initialization statement of a for loop.

Example:
    forStmt(hasLoopVariable(anything()))
matches 'int x' in
    for (int x : a) { }

Matcher<[CXXForRangeStmt](https://clang.llvm.org/doxygen/classclang_1_1CXXForRangeStmt.html)\>

hasRangeInit

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the range initialization statement of a for loop.

Example:
    forStmt(hasRangeInit(anything()))
matches 'a' in
    for (int x : a) { }

Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CXXMemberCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXMemberCallExpr.html)\>

onImplicitObjectArgument

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches on the implicit object argument of a member call expression. Unlike
\`on\`, matches the argument directly without stripping away anything.

Given
  class Y { public: void m(); };
  Y g();
  class X : public Y { void g(); };
  void z(Y y, X x) { y.m(); x.m(); x.g(); (g()).m(); }
cxxMemberCallExpr(onImplicitObjectArgument(hasType(
    cxxRecordDecl(hasName("Y")))))
  matches \`y.m()\`, \`x.m()\` and (\`g()).m()\`, but not \`x.g()\`).
cxxMemberCallExpr(on(callExpr()))
  only matches \`(g()).m()\` (the parens are ignored).

FIXME: Overload to allow directly matching types?

Matcher<[CXXMemberCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXMemberCallExpr.html)\>

on

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches on the implicit object argument of a member call expression, after
stripping off any parentheses or implicit casts.

Given
  class Y { public: void m(); };
  Y g();
  class X : public Y {};
  void z(Y y, X x) { y.m(); (g()).m(); x.m(); }
cxxMemberCallExpr(on(hasType(cxxRecordDecl(hasName("Y")))))
  matches \`y.m()\` and \`(g()).m()\`.
cxxMemberCallExpr(on(hasType(cxxRecordDecl(hasName("X")))))
  matches \`x.m()\`.
cxxMemberCallExpr(on(callExpr()))
  matches \`(g()).m()\`.

FIXME: Overload to allow directly matching types?

Matcher<[CXXMemberCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXMemberCallExpr.html)\>

thisPointerType

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the type's declaration.

Matcher<[CXXMemberCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXMemberCallExpr.html)\>

thisPointerType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the type of the expression's implicit object argument either
matches the InnerMatcher, or is a pointer to a type that matches the
InnerMatcher.

Given
  class Y { public: void m(); };
  class X : public Y { void g(); };
  void z() { Y y; y.m(); Y \*p; p->m(); X x; x.m(); x.g(); }
cxxMemberCallExpr(thisPointerType(hasDeclaration(
    cxxRecordDecl(hasName("Y")))))
  matches \`y.m()\`, \`p->m()\` and \`x.m()\`.
cxxMemberCallExpr(thisPointerType(hasDeclaration(
    cxxRecordDecl(hasName("X")))))
  matches \`x.g()\`.

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

forEachOverridden

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\> InnerMatcher

Matches each method overridden by the given method. This matcher may
produce multiple matches.

Given
  class A { virtual void f(); };
  class B : public A { void f(); };
  class C : public B { void f(); };
cxxMethodDecl(ofClass(hasName("C")),
              forEachOverridden(cxxMethodDecl().bind("b"))).bind("d")
  matches once, with "b" binding "A::f" and "d" binding "C::f" (Note
  that B::f is not overridden by C::f).

The check can produce multiple matches in case of multiple inheritance, e.g.
  class A1 { virtual void f(); };
  class A2 { virtual void f(); };
  class C : public A1, public A2 { void f(); };
cxxMethodDecl(ofClass(hasName("C")),
              forEachOverridden(cxxMethodDecl().bind("b"))).bind("d")
  matches twice, once with "b" binding "A1::f" and "d" binding "C::f", and
  once with "b" binding "A2::f" and "d" binding "C::f".

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\>

ofClass

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\> InnerMatcher

Matches the class declaration that the given method declaration
belongs to.

FIXME: Generalize this for other kinds of declarations.
FIXME: What other kind of declarations would we need to generalize
this to?

Example matches A() in the last line
    (matcher = cxxConstructExpr(hasDeclaration(cxxMethodDecl(
        ofClass(hasName("A"))))))
  class A {
   public:
    A();
  };
  A a = A();

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>

hasAnyPlacementArg

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches any placement new expression arguments.

Given:
  MyClass \*p1 = new (Storage) MyClass();
cxxNewExpr(hasAnyPlacementArg(anything()))
  matches the expression 'new (Storage, 16) MyClass()'.

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>

hasArraySize

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches array new expressions with a given array size.

Given:
  MyClass \*p1 = new MyClass\[10\];
cxxNewExpr(hasArraySize(integerLiteral(equals(10))))
  matches the expression 'new MyClass\[10\]'.

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>

hasPlacementArg

unsigned Index, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches placement new expression arguments.

Given:
  MyClass \*p1 = new (Storage, 16) MyClass();
cxxNewExpr(hasPlacementArg(1, integerLiteral(equals(16))))
  matches the expression 'new (Storage, 16) MyClass()'.

Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasEitherOperand

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if either the left hand side or the right hand side of a
binary operator or fold expression matches.

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasLHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the left hand side of binary operator expressions.

Example matches a (matcher = binaryOperator(hasLHS()))
  a || b

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasOperands

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher1, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher2

Matches if both matchers match with opposite sides of the binary operator
or fold expression.

Example matcher = binaryOperator(hasOperands(integerLiteral(equals(1),
                                             integerLiteral(equals(2)))
  1 + 2 // Match
  2 + 1 // Match
  1 + 1 // No match
  2 + 2 // No match

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasRHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the right hand side of binary operator expressions.

Example matches b (matcher = binaryOperator(hasRHS()))
  a || b

Matcher<[CXXOperatorCallExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXOperatorCallExpr.html)\>

hasUnaryOperand

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if the operand of a unary operator matches.

Example matches true (matcher = hasUnaryOperand(
                                  cxxBoolLiteral(equals(true))))
  !true

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

hasAnyBase

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\> BaseSpecMatcher

Matches C++ classes that have a direct or indirect base matching BaseSpecMatcher.

Example:
matcher hasAnyBase(hasType(cxxRecordDecl(hasName("SpecialBase"))))
  class Foo;
  class Bar : Foo {};
  class Baz : Bar {};
  class SpecialBase;
  class Proxy : SpecialBase {};  // matches Proxy
  class IndirectlyDerived : Proxy {};  //matches IndirectlyDerived

FIXME: Refactor this and isDerivedFrom to reuse implementation.

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

hasDirectBase

Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\> BaseSpecMatcher

Matches C++ classes that have a direct base matching BaseSpecMatcher.

Example:
matcher hasDirectBase(hasType(cxxRecordDecl(hasName("SpecialBase"))))
  class Foo;
  class Bar : Foo {};
  class Baz : Bar {};
  class SpecialBase;
  class Proxy : SpecialBase {};  // matches Proxy
  class IndirectlyDerived : Proxy {};  // doesn't match

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

hasMethod

Matcher<[CXXMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXMethodDecl.html)\> InnerMatcher

Matches the first method of a class or struct that satisfies InnerMatcher.

Given:
  class A { void func(); };
  class B { void member(); };

cxxRecordDecl(hasMethod(hasName("func"))) matches the declaration of
A but not B.

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isDerivedFrom

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> Base

Matches C++ classes that are directly or indirectly derived from a class
matching Base, or Objective-C classes that directly or indirectly
subclass a class matching Base.

Note that a class is not considered to be derived from itself.

Example matches Y, Z, C (Base == hasName("X"))
  class X;
  class Y : public X {};  // directly derived
  class Z : public Y {};  // indirectly derived
  typedef X A;
  typedef A B;
  class C : public B {};  // derived from a typedef of X

In the following example, Bar matches isDerivedFrom(hasName("X")):
  class Foo;
  typedef Foo X;
  class Bar : public Foo {};  // derived from a type that X is a typedef of

In the following example, Bar matches isDerivedFrom(hasName("NSObject"))
  @interface NSObject @end
  @interface Bar : NSObject @end

Usable as: Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>, Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isDirectlyDerivedFrom

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> Base

Matches C++ or Objective-C classes that are directly derived from a class
matching Base.

Note that a class is not considered to be derived from itself.

Example matches Y, C (Base == hasName("X"))
  class X;
  class Y : public X {};  // directly derived
  class Z : public Y {};  // indirectly derived
  typedef X A;
  typedef A B;
  class C : public B {};  // derived from a typedef of X

In the following example, Bar matches isDerivedFrom(hasName("X")):
  class Foo;
  typedef Foo X;
  class Bar : public Foo {};  // derived from a type that X is a typedef of

Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>

isSameOrDerivedFrom

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> Base

Similar to isDerivedFrom(), but also matches classes that directly
match Base.

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

hasEitherOperand

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if either the left hand side or the right hand side of a
binary operator or fold expression matches.

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

hasLHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the left hand side of binary operator expressions.

Example matches a (matcher = binaryOperator(hasLHS()))
  a || b

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

hasOperands

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher1, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> Matcher2

Matches if both matchers match with opposite sides of the binary operator
or fold expression.

Example matcher = binaryOperator(hasOperands(integerLiteral(equals(1),
                                             integerLiteral(equals(2)))
  1 + 2 // Match
  2 + 1 // Match
  1 + 1 // No match
  2 + 2 // No match

Matcher<[CXXRewrittenBinaryOperator](https://clang.llvm.org/doxygen/classclang_1_1CXXRewrittenBinaryOperator.html)\>

hasRHS

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the right hand side of binary operator expressions.

Example matches b (matcher = binaryOperator(hasRHS()))
  a || b

Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>

hasAnyArgument

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches any argument of a call expression or a constructor call
expression, or an ObjC-message-send expression.

Given
  void x(int, int, int) { int y; x(1, y, 42); }
callExpr(hasAnyArgument(declRefExpr()))
  matches x(1, y, 42)
with hasAnyArgument(...)
  matching y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end
  void foo(I \*i) { \[i f:12\]; }
objcMessageExpr(hasAnyArgument(integerLiteral(equals(12))))
  matches \[i f:12\]

Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>

hasArgument

unsigned N, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the n'th argument of a call expression or a constructor
call expression.

Example matches y in x(y)
    (matcher = callExpr(hasArgument(0, declRefExpr())))
  void x(int) { int y; x(y); }

Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

callee

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches 1) if the call expression's callee's declaration matches the
given matcher; or 2) if the Obj-C message expression's callee's method
declaration matches the given matcher.

Example matches y.x() (matcher = callExpr(callee(
                                   cxxMethodDecl(hasName("x")))))
  class Y { public: void x(); };
  void z() { Y y; y.x(); }

Example 2. Matches \[I foo\] with
objcMessageExpr(callee(objcMethodDecl(hasName("foo"))))

  @interface I: NSObject
  +(void)foo;
  @end
  ...
  \[I foo\]

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

callee

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches if the call or fold expression's callee expression matches.

Given
  class Y { void x() { this->x(); x(); Y y; y.x(); } };
  void f() { f(); }
callExpr(callee(expr()))
  matches this->x(), x(), y.x(), f()
with callee(...)
  matching this->x, x, y.x, f respectively

Given
  template <typename... Args>
  auto sum(Args... args) {
      return (0 + ... + args);
  }

  template <typename... Args>
  auto multiply(Args... args) {
      return (args \* ... \* 1);
  }
cxxFoldExpr(callee(expr()))
  matches (args \* ... \* 1)
with callee(...)
  matching \*

Note: Callee cannot take the more general internal::Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>
because this introduces ambiguous overloads with calls to Callee taking a
internal::Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>, as the matcher hierarchy is purely
implemented in terms of implicit casts.

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

forEachArgumentWithParam

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> ArgMatcher, Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> ParamMatcher

Matches all arguments and their respective ParmVarDecl.

Given
  void f(int i);
  int y;
  f(y);
callExpr(
  forEachArgumentWithParam(
    declRefExpr(to(varDecl(hasName("y")))),
    parmVarDecl(hasType(isInteger()))
))
  matches f(y);
with declRefExpr(...)
  matching int y
and parmVarDecl(...)
  matching int i

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

forEachArgumentWithParamType

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> ArgMatcher, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> ParamMatcher

Matches all arguments and their respective types for a CallExpr or
CXXConstructExpr. It is very similar to forEachArgumentWithParam but
it works on calls through function pointers as well.

The difference is, that function pointers do not provide access to a
ParmVarDecl, but only the QualType for each argument.

Given
  void f(int i);
  int y;
  f(y);
  void (\*f\_ptr)(int) = f;
  f\_ptr(y);
callExpr(
  forEachArgumentWithParamType(
    declRefExpr(to(varDecl(hasName("y")))),
    qualType(isInteger()).bind("type)
))
  matches f(y) and f\_ptr(y)
with declRefExpr(...)
  matching int y
and qualType(...)
  matching int

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

hasAnyArgument

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches any argument of a call expression or a constructor call
expression, or an ObjC-message-send expression.

Given
  void x(int, int, int) { int y; x(1, y, 42); }
callExpr(hasAnyArgument(declRefExpr()))
  matches x(1, y, 42)
with hasAnyArgument(...)
  matching y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end
  void foo(I \*i) { \[i f:12\]; }
objcMessageExpr(hasAnyArgument(integerLiteral(equals(12))))
  matches \[i f:12\]

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

hasArgument

unsigned N, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the n'th argument of a call expression or a constructor
call expression.

Example matches y in x(y)
    (matcher = callExpr(hasArgument(0, declRefExpr())))
  void x(int) { int y; x(y); }

Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[CaseStmt](https://clang.llvm.org/doxygen/classclang_1_1CaseStmt.html)\>

hasCaseConstant

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

If the given case statement does not use the GNU case range
extension, matches the constant given in the statement.

Given
  switch (1) { case 1: case 1+1: case 3 ... 4: ; }
caseStmt(hasCaseConstant(integerLiteral()))
  matches "case 1:"

Matcher<[CastExpr](https://clang.llvm.org/doxygen/classclang_1_1CastExpr.html)\>

hasSourceExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if the cast's source expression
or opaque value's source expression matches the given matcher.

Example 1: matches "a string"
(matcher = castExpr(hasSourceExpression(cxxConstructExpr())))
class URL { URL(string); };
URL url = "a string";

Example 2: matches 'b' (matcher =
opaqueValueExpr(hasSourceExpression(implicitCastExpr(declRefExpr())))
int a = b ?: 1;

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

forEachTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specialization,
variable template specialization, and function template specialization
nodes where the template argument matches the inner matcher. This matcher
may produce multiple matches.

Given
  template <typename T, unsigned N, unsigned M>
  struct Matrix {};

  constexpr unsigned R = 2;
  Matrix<int, R \* 2, R \* 4> M;

  template <typename T, typename U>
  void f(T&& t, U&& u) {}

  bool B = false;
  f(R, B);
templateSpecializationType(forEachTemplateArgument(isExpr(expr())))
  matches twice, with expr() matching 'R \* 2' and 'R \* 4'
functionDecl(forEachTemplateArgument(refersToType(builtinType())))
  matches the specialization f<unsigned, bool> twice, for 'unsigned'
  and 'bool'

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

hasAnyTemplateArgumentLoc

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
that have at least one \`TemplateArgumentLoc\` matching the given
\`InnerMatcher\`.

Given
  template<typename T> class A {};
  A<int> a;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasAnyTemplateArgumentLoc(
  hasTypeLoc(loc(asString("int")))))))
  matches \`A<int> a\`.

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

hasAnyTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationTypes, class template specializations,
variable template specializations, and function template specializations
that have at least one TemplateArgument matching the given InnerMatcher.

Given
  template<typename T> class A {};
  template<> class A<double> {};
  A<int> a;

  template<typename T> f() {};
  void func() { f<int>(); };

classTemplateSpecializationDecl(hasAnyTemplateArgument(
    refersToType(asString("int"))))
  matches the specialization A<int>

functionDecl(hasAnyTemplateArgument(refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

hasSpecializedTemplate

Matcher<[ClassTemplateDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateDecl.html)\> InnerMatcher

Matches the specialized template of a specialization declaration.

Given
  template<typename T> class A {}; #1
  template<> class A<int> {}; #2
classTemplateSpecializationDecl(hasSpecializedTemplate(classTemplateDecl()))
  matches '#2' with classTemplateDecl() matching the class template
  declaration of 'A' at #1.

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

hasTemplateArgumentLoc

unsigned Index, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
where the n'th \`TemplateArgumentLoc\` matches the given \`InnerMatcher\`.

Given
  template<typename T, typename U> class A {};
  A<double, int> b;
  A<int, double> c;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasTemplateArgumentLoc(0,
  hasTypeLoc(loc(asString("double")))))))
  matches \`A<double, int> b\`, but not \`A<int, double> c\`.

Matcher<[ClassTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1ClassTemplateSpecializationDecl.html)\>

hasTemplateArgument

unsigned N, Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specializations,
variable template specializations, and function template specializations
where the n'th TemplateArgument matches the given InnerMatcher.

Given
  template<typename T, typename U> class A {};
  A<bool, int> b;
  A<int, bool> c;

  template<typename T> void f() {}
  void func() { f<int>(); };
classTemplateSpecializationDecl(hasTemplateArgument(
    1, refersToType(asString("int"))))
  matches the specialization A<bool, int>

functionDecl(hasTemplateArgument(0, refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[ComplexType](https://clang.llvm.org/doxygen/classclang_1_1ComplexType.html)\>

hasElementType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches arrays and C99 complex types that have a specific element
type.

Given
  struct A {};
  A a\[7\];
  int b\[7\];
arrayType(hasElementType(builtinType()))
  matches "int b\[7\]"

Usable as: Matcher<[ArrayType](https://clang.llvm.org/doxygen/classclang_1_1ArrayType.html)\>, Matcher<[ComplexType](https://clang.llvm.org/doxygen/classclang_1_1ComplexType.html)\>

Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[CompoundStmt](https://clang.llvm.org/doxygen/classclang_1_1CompoundStmt.html)\>

hasAnySubstatement

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches compound statements where at least one substatement matches
a given matcher. Also matches StmtExprs that have CompoundStmt as children.

Given
  { {}; 1+2; }
hasAnySubstatement(compoundStmt())
  matches '{ {}; 1+2; }'
with compoundStmt()
  matching '{}'

Matcher<[CoroutineBodyStmt](https://clang.llvm.org/doxygen/classclang_1_1CoroutineBodyStmt.html)\>

hasBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a 'for', 'while', 'while' statement or a function or coroutine
definition that has a given body. Note that in case of functions or
coroutines this matcher only matches the definition itself and not the
other declarations of the same function or coroutine.

Given
  for (;;) {}
forStmt(hasBody(compoundStmt()))
  matches 'for (;;) {}'
with compoundStmt()
  matching '{}'

Given
  void f();
  void f() {}
functionDecl(hasBody(compoundStmt()))
  matches 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void f();'

Matcher<[DecayedType](https://clang.llvm.org/doxygen/classclang_1_1DecayedType.html)\>

hasDecayedType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerType

Matches the decayed type, whoes decayed type matches InnerMatcher

Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>

hasAnyTemplateArgumentLoc

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
that have at least one \`TemplateArgumentLoc\` matching the given
\`InnerMatcher\`.

Given
  template<typename T> class A {};
  A<int> a;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasAnyTemplateArgumentLoc(
  hasTypeLoc(loc(asString("int")))))))
  matches \`A<int> a\`.

Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>

hasTemplateArgumentLoc

unsigned Index, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
where the n'th \`TemplateArgumentLoc\` matches the given \`InnerMatcher\`.

Given
  template<typename T, typename U> class A {};
  A<double, int> b;
  A<int, double> c;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasTemplateArgumentLoc(0,
  hasTypeLoc(loc(asString("double")))))))
  matches \`A<double, int> b\`, but not \`A<int, double> c\`.

Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>

throughUsingDecl

Matcher<[UsingShadowDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingShadowDecl.html)\> Inner

Matches if a node refers to a declaration through a specific
using shadow declaration.

Examples:
  namespace a { int f(); }
  using a::f;
  int x = f();
declRefExpr(throughUsingDecl(anything()))
  matches f

  namespace a { class X{}; }
  using a::X;
  X x;
typeLoc(loc(usingType(throughUsingDecl(anything()))))
  matches X

Usable as: Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>, Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>

Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>

to

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a DeclRefExpr that refers to a declaration that matches the
specified matcher.

Example matches x in if(x)
    (matcher = declRefExpr(to(varDecl(hasName("x")))))
  bool x;
  if (x) {}

Matcher<[DeclStmt](https://clang.llvm.org/doxygen/classclang_1_1DeclStmt.html)\>

containsDeclaration

unsigned N, Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches the n'th declaration of a declaration statement.

Note that this does not work for global declarations because the AST
breaks up multiple-declaration DeclStmt's into multiple single-declaration
DeclStmt's.
Example: Given non-global declarations
  int a, b = 0;
  int c;
  int d = 2, e;
declStmt(containsDeclaration(
      0, varDecl(hasInitializer(anything()))))
  matches only 'int d = 2, e;', and
declStmt(containsDeclaration(1, varDecl()))
  matches 'int a, b = 0' as well as 'int d = 2, e;'
  but 'int c;' is not matched.

Matcher<[DeclStmt](https://clang.llvm.org/doxygen/classclang_1_1DeclStmt.html)\>

hasSingleDecl

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches the Decl of a DeclStmt which has a single declaration.

Given
  int a, b;
  int c;
declStmt(hasSingleDecl(anything()))
  matches 'int c;' but not 'int a, b;'.

Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\>

hasDeclContext

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches declarations whose declaration context, interpreted as a
Decl, matches InnerMatcher.

Given
  namespace N {
    namespace M {
      class D {};
    }
  }

cxxRcordDecl(hasDeclContext(namedDecl(hasName("M")))) matches the
declaration of class D.

Matcher<[DecltypeType](https://clang.llvm.org/doxygen/classclang_1_1DecltypeType.html)\>

hasUnderlyingType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches DecltypeType or UsingType nodes to find the underlying type.

Given
  decltype(1) a = 1;
  decltype(2.0) b = 2.0;
decltypeType(hasUnderlyingType(isInteger()))
  matches the type of "a"

Usable as: Matcher<[DecltypeType](https://clang.llvm.org/doxygen/classclang_1_1DecltypeType.html)\>, Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>

Matcher<[DecompositionDecl](https://clang.llvm.org/doxygen/classclang_1_1DecompositionDecl.html)\>

hasAnyBinding

Matcher<[BindingDecl](https://clang.llvm.org/doxygen/classclang_1_1BindingDecl.html)\> InnerMatcher

Matches any binding of a DecompositionDecl.

For example, in:
void foo()
{
    int arr\[3\];
    auto &\[f, s, t\] = arr;

    f = 42;
}
The matcher:
  decompositionDecl(hasAnyBinding(bindingDecl(hasName("f").bind("fBinding"))))
matches the decomposition decl with 'f' bound to "fBinding".

Matcher<[DecompositionDecl](https://clang.llvm.org/doxygen/classclang_1_1DecompositionDecl.html)\>

hasBinding

unsigned N, Matcher<[BindingDecl](https://clang.llvm.org/doxygen/classclang_1_1BindingDecl.html)\> InnerMatcher

Matches the Nth binding of a DecompositionDecl.

For example, in:
void foo()
{
    int arr\[3\];
    auto &\[f, s, t\] = arr;

    f = 42;
}
The matcher:
  decompositionDecl(hasBinding(0,
  bindingDecl(hasName("f").bind("fBinding"))))
matches the decomposition decl with 'f' bound to "fBinding".

Matcher<[DoStmt](https://clang.llvm.org/doxygen/classclang_1_1DoStmt.html)\>

hasBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a 'for', 'while', 'while' statement or a function or coroutine
definition that has a given body. Note that in case of functions or
coroutines this matcher only matches the definition itself and not the
other declarations of the same function or coroutine.

Given
  for (;;) {}
forStmt(hasBody(compoundStmt()))
  matches 'for (;;) {}'
with compoundStmt()
  matching '{}'

Given
  void f();
  void f() {}
functionDecl(hasBody(compoundStmt()))
  matches 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void f();'

Matcher<[DoStmt](https://clang.llvm.org/doxygen/classclang_1_1DoStmt.html)\>

hasCondition

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the condition expression of an if statement, for loop,
switch statement or conditional operator.

Example matches true (matcher = hasCondition(cxxBoolLiteral(equals(true))))
  if (true) {}

Matcher<[ElaboratedTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedTypeLoc.html)\>

hasNamedTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> InnerMatcher

Matches elaborated \`TypeLoc\`s that have a named \`TypeLoc\` matching
\`InnerMatcher\`.

Given
  template <typename T>
  class C {};
  class C<int> c;

  class D {};
  class D d;
elaboratedTypeLoc(hasNamedTypeLoc(templateSpecializationTypeLoc()));
  matches the \`TypeLoc\` of the variable declaration of \`c\`, but not \`d\`.

Matcher<[ElaboratedType](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedType.html)\>

hasQualifier

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\> InnerMatcher

Matches ElaboratedTypes whose qualifier, a NestedNameSpecifier,
matches InnerMatcher if the qualifier exists.

Given
  namespace N {
    namespace M {
      class D {};
    }
  }
  N::M::D d;

elaboratedType(hasQualifier(hasPrefix(specifiesNamespace(hasName("N"))))
matches the type of the variable declaration of d.

Matcher<[ElaboratedType](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedType.html)\>

namesType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches ElaboratedTypes whose named type matches InnerMatcher.

Given
  namespace N {
    namespace M {
      class D {};
    }
  }
  N::M::D d;

elaboratedType(namesType(recordType(
hasDeclaration(namedDecl(hasName("D")))))) matches the type of the variable
declaration of d.

Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>

hasDestinationType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches casts whose destination type matches a given matcher.

(Note: Clang's AST refers to other conversions as "casts" too, and calls
actual casts "explicit" casts.)

Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

hasType

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the declaration of the expression's or value
declaration's type.

In case of a value declaration (for example a variable declaration),
this resolves one layer of indirection. For example, in the value
declaration "X x;", cxxRecordDecl(hasName("X")) matches the declaration of
X, while varDecl(hasType(cxxRecordDecl(hasName("X")))) matches the
declaration of x.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              cxxRecordDecl(hasName("X"))))
 class X {};
 void y(X &x) { x; X z; }
 class Y { friend class X; };
 class Z : public virtual X {};

Example matches class Derived
(matcher = cxxRecordDecl(hasAnyBase(hasType(cxxRecordDecl(hasName("Base"))))))
class Base {};
class Derived : Base {};

Usable as: Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>, Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>, Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>,
Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

hasType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the expression's or declaration's type matches a type
matcher.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and U (matcher = typedefDecl(hasType(asString("int")))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              asString("class X")))
 class X {};
 void y(X &x) { x; X z; }
 typedef int U;
 class Y { friend class X; };
 class Z : public virtual X {};

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

ignoringElidableConstructorCall

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches expressions that match InnerMatcher that are possibly wrapped in an
elidable constructor and other corresponding bookkeeping nodes.

In C++17, elidable copy constructors are no longer being generated in the
AST as it is not permitted by the standard. They are, however, part of the
AST in C++14 and earlier. So, a matcher must abstract over these differences
to work in all language modes. This matcher skips elidable constructor-call
AST nodes, \`ExprWithCleanups\` nodes wrapping elidable constructor-calls and
various implicit nodes inside the constructor calls, all of which will not
appear in the C++17 AST.

Given

struct H {};
H G();
void f() {
  H D = G();
}

\`\`varDecl(hasInitializer(ignoringElidableConstructorCall(callExpr())))\`\`
matches \`\`H D = G()\`\` in C++11 through C++17 (and beyond).

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

ignoringImpCasts

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches expressions that match InnerMatcher after any implicit casts
are stripped off.

Parentheses and explicit casts are not discarded.
Given
  int arr\[5\];
  int a = 0;
  char b = 0;
  const int c = a;
  int \*d = arr;
  long e = (long) 0l;
The matchers
   varDecl(hasInitializer(ignoringImpCasts(integerLiteral())))
   varDecl(hasInitializer(ignoringImpCasts(declRefExpr())))
would match the declarations for a, b, c, and d, but not e.
While
   varDecl(hasInitializer(integerLiteral()))
   varDecl(hasInitializer(declRefExpr()))
only match the declarations for a.

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

ignoringImplicit

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches expressions that match InnerMatcher after any implicit AST
nodes are stripped off.

Parentheses and explicit casts are not discarded.
Given
  class C {};
  C a = C();
  C b;
  C c = b;
The matchers
   varDecl(hasInitializer(ignoringImplicit(cxxConstructExpr())))
would match the declarations for a, b, and c.
While
   varDecl(hasInitializer(cxxConstructExpr()))
only match the declarations for b and c.

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

ignoringParenCasts

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches expressions that match InnerMatcher after parentheses and
casts are stripped off.

Implicit and non-C Style casts are also discarded.
Given
  int a = 0;
  char b = (0);
  void\* c = reinterpret\_cast<char\*>(0);
  char d = char(0);
The matcher
   varDecl(hasInitializer(ignoringParenCasts(integerLiteral())))
would match the declarations for a, b, c, and d.
while
   varDecl(hasInitializer(integerLiteral()))
only match the declaration for a.

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

ignoringParenImpCasts

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches expressions that match InnerMatcher after implicit casts and
parentheses are stripped off.

Explicit casts are not discarded.
Given
  int arr\[5\];
  int a = 0;
  char b = (0);
  const int c = a;
  int \*d = (arr);
  long e = ((long) 0l);
The matchers
   varDecl(hasInitializer(ignoringParenImpCasts(integerLiteral())))
   varDecl(hasInitializer(ignoringParenImpCasts(declRefExpr())))
would match the declarations for a, b, c, and d, but not e.
while
   varDecl(hasInitializer(integerLiteral()))
   varDecl(hasInitializer(declRefExpr()))
would only match the declaration for a.

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>

ignoringParens

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Overload ignoringParens for Expr.

Given
  const char\* str = ("my-string");
The matcher
  implicitCastExpr(hasSourceExpression(ignoringParens(stringLiteral())))
would match the implicit cast resulting from the assignment.

Matcher<[FieldDecl](https://clang.llvm.org/doxygen/classclang_1_1FieldDecl.html)\>

hasInClassInitializer

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches non-static data members that have an in-class initializer.

Given
  class C {
    int a = 2;
    int b = 3;
    int c;
  };
fieldDecl(hasInClassInitializer(integerLiteral(equals(2))))
  matches 'int a;' but not 'int b;'.
fieldDecl(hasInClassInitializer(anything()))
  matches 'int a;' and 'int b;' but not 'int c;'.

Matcher<[ForStmt](https://clang.llvm.org/doxygen/classclang_1_1ForStmt.html)\>

hasBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a 'for', 'while', 'while' statement or a function or coroutine
definition that has a given body. Note that in case of functions or
coroutines this matcher only matches the definition itself and not the
other declarations of the same function or coroutine.

Given
  for (;;) {}
forStmt(hasBody(compoundStmt()))
  matches 'for (;;) {}'
with compoundStmt()
  matching '{}'

Given
  void f();
  void f() {}
functionDecl(hasBody(compoundStmt()))
  matches 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void f();'

Matcher<[ForStmt](https://clang.llvm.org/doxygen/classclang_1_1ForStmt.html)\>

hasCondition

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the condition expression of an if statement, for loop,
switch statement or conditional operator.

Example matches true (matcher = hasCondition(cxxBoolLiteral(equals(true))))
  if (true) {}

Matcher<[ForStmt](https://clang.llvm.org/doxygen/classclang_1_1ForStmt.html)\>

hasIncrement

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches the increment statement of a for loop.

Example:
    forStmt(hasIncrement(unaryOperator(hasOperatorName("++"))))
matches '++x' in
    for (x; x < N; ++x) { }

Matcher<[ForStmt](https://clang.llvm.org/doxygen/classclang_1_1ForStmt.html)\>

hasLoopInit

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches the initialization statement of a for loop.

Example:
    forStmt(hasLoopInit(declStmt()))
matches 'int x = 0' in
    for (int x = 0; x < N; ++x) { }

Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>

hasType

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the declaration of the expression's or value
declaration's type.

In case of a value declaration (for example a variable declaration),
this resolves one layer of indirection. For example, in the value
declaration "X x;", cxxRecordDecl(hasName("X")) matches the declaration of
X, while varDecl(hasType(cxxRecordDecl(hasName("X")))) matches the
declaration of x.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              cxxRecordDecl(hasName("X"))))
 class X {};
 void y(X &x) { x; X z; }
 class Y { friend class X; };
 class Z : public virtual X {};

Example matches class Derived
(matcher = cxxRecordDecl(hasAnyBase(hasType(cxxRecordDecl(hasName("Base"))))))
class Base {};
class Derived : Base {};

Usable as: Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>, Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>, Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>,
Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>

hasType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the expression's or declaration's type matches a type
matcher.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and U (matcher = typedefDecl(hasType(asString("int")))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              asString("class X")))
 class X {};
 void y(X &x) { x; X z; }
 typedef int U;
 class Y { friend class X; };
 class Z : public virtual X {};

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

forEachTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specialization,
variable template specialization, and function template specialization
nodes where the template argument matches the inner matcher. This matcher
may produce multiple matches.

Given
  template <typename T, unsigned N, unsigned M>
  struct Matrix {};

  constexpr unsigned R = 2;
  Matrix<int, R \* 2, R \* 4> M;

  template <typename T, typename U>
  void f(T&& t, U&& u) {}

  bool B = false;
  f(R, B);
templateSpecializationType(forEachTemplateArgument(isExpr(expr())))
  matches twice, with expr() matching 'R \* 2' and 'R \* 4'
functionDecl(forEachTemplateArgument(refersToType(builtinType())))
  matches the specialization f<unsigned, bool> twice, for 'unsigned'
  and 'bool'

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasAnyBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a function declaration that has a given body present in the AST.
Note that this matcher matches all the declarations of a function whose
body is present in the AST.

Given
  void f();
  void f() {}
  void g();
functionDecl(hasAnyBody(compoundStmt()))
  matches both 'void f();'
  and 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void g();'

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasAnyParameter

Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> InnerMatcher

Matches any parameter of a function or an ObjC method declaration or a
block.

Does not match the 'this' parameter of a method.

Given
  class X { void f(int x, int y, int z) {} };
cxxMethodDecl(hasAnyParameter(hasName("y")))
  matches f(int x, int y, int z) {}
with hasAnyParameter(...)
  matching int y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end

the matcher objcMethodDecl(hasAnyParameter(hasName("y")))
matches the declaration of method f with hasParameter
matching y.

For blocks, given
  b = ^(int y) { printf("%d", y) };

the matcher blockDecl(hasAnyParameter(hasName("y")))
matches the declaration of the block b with hasParameter
matching y.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasAnyTemplateArgumentLoc

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
that have at least one \`TemplateArgumentLoc\` matching the given
\`InnerMatcher\`.

Given
  template<typename T> class A {};
  A<int> a;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasAnyTemplateArgumentLoc(
  hasTypeLoc(loc(asString("int")))))))
  matches \`A<int> a\`.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasAnyTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationTypes, class template specializations,
variable template specializations, and function template specializations
that have at least one TemplateArgument matching the given InnerMatcher.

Given
  template<typename T> class A {};
  template<> class A<double> {};
  A<int> a;

  template<typename T> f() {};
  void func() { f<int>(); };

classTemplateSpecializationDecl(hasAnyTemplateArgument(
    refersToType(asString("int"))))
  matches the specialization A<int>

functionDecl(hasAnyTemplateArgument(refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a 'for', 'while', 'while' statement or a function or coroutine
definition that has a given body. Note that in case of functions or
coroutines this matcher only matches the definition itself and not the
other declarations of the same function or coroutine.

Given
  for (;;) {}
forStmt(hasBody(compoundStmt()))
  matches 'for (;;) {}'
with compoundStmt()
  matching '{}'

Given
  void f();
  void f() {}
functionDecl(hasBody(compoundStmt()))
  matches 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void f();'

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasExplicitSpecifier

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the expression in an explicit specifier if present in the given
declaration.

Given
  template<bool b>
  struct S {
    S(int); // #1
    explicit S(double); // #2
    operator int(); // #3
    explicit operator bool(); // #4
    explicit(false) S(bool) // # 7
    explicit(true) S(char) // # 8
    explicit(b) S(S) // # 9
  };
  S(int) -> S<true> // #5
  explicit S(double) -> S<false> // #6
cxxConstructorDecl(hasExplicitSpecifier(constantExpr())) will match #7, #8 and #9, but not #1 or #2.
cxxConversionDecl(hasExplicitSpecifier(constantExpr())) will not match #3 or #4.
cxxDeductionGuideDecl(hasExplicitSpecifier(constantExpr())) will not match #5 or #6.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasParameter

unsigned N, Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> InnerMatcher

Matches the n'th parameter of a function or an ObjC method
declaration or a block.

Given
  class X { void f(int x) {} };
cxxMethodDecl(hasParameter(0, hasType(varDecl())))
  matches f(int x) {}
with hasParameter(...)
  matching int x

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end

the matcher objcMethodDecl(hasParameter(0, hasName("y")))
matches the declaration of method f with hasParameter
matching y.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasReturnTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> ReturnMatcher

Matches a function declared with the specified return \`TypeLoc\`.

Given
  int f() { return 5; }
  void g() {}
functionDecl(hasReturnTypeLoc(loc(asString("int"))))
  matches the declaration of \`f\`, but not \`g\`.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasTemplateArgumentLoc

unsigned Index, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
where the n'th \`TemplateArgumentLoc\` matches the given \`InnerMatcher\`.

Given
  template<typename T, typename U> class A {};
  A<double, int> b;
  A<int, double> c;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasTemplateArgumentLoc(0,
  hasTypeLoc(loc(asString("double")))))))
  matches \`A<double, int> b\`, but not \`A<int, double> c\`.

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

hasTemplateArgument

unsigned N, Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specializations,
variable template specializations, and function template specializations
where the n'th TemplateArgument matches the given InnerMatcher.

Given
  template<typename T, typename U> class A {};
  A<bool, int> b;
  A<int, bool> c;

  template<typename T> void f() {}
  void func() { f<int>(); };
classTemplateSpecializationDecl(hasTemplateArgument(
    1, refersToType(asString("int"))))
  matches the specialization A<bool, int>

functionDecl(hasTemplateArgument(0, refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\>

returns

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches the return type of a function declaration.

Given:
  class X { int f() { return 1; } };
cxxMethodDecl(returns(asString("int")))
  matches int f() { return 1; }

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

hasCondition

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the condition expression of an if statement, for loop,
switch statement or conditional operator.

Example matches true (matcher = hasCondition(cxxBoolLiteral(equals(true))))
  if (true) {}

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

hasConditionVariableStatement

Matcher<[DeclStmt](https://clang.llvm.org/doxygen/classclang_1_1DeclStmt.html)\> InnerMatcher

Matches the condition variable statement in an if statement.

Given
  if (A\* a = GetAPointer()) {}
hasConditionVariableStatement(...)
  matches 'A\* a = GetAPointer()'.

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

hasElse

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches the else-statement of an if statement.

Examples matches the if statement
  (matcher = ifStmt(hasElse(cxxBoolLiteral(equals(true)))))
  if (false) false; else true;

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

hasInitStatement

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches selection statements with initializer.

Given:
 void foo() {
   if (int i = foobar(); i > 0) {}
   switch (int i = foobar(); i) {}
   for (auto& a = get\_range(); auto& x : a) {}
 }
 void bar() {
   if (foobar() > 0) {}
   switch (foobar()) {}
   for (auto& x : get\_range()) {}
 }
ifStmt(hasInitStatement(anything()))
  matches the if statement in foo but not in bar.
switchStmt(hasInitStatement(anything()))
  matches the switch statement in foo but not in bar.
cxxForRangeStmt(hasInitStatement(anything()))
  matches the range for statement in foo but not in bar.

Matcher<[IfStmt](https://clang.llvm.org/doxygen/classclang_1_1IfStmt.html)\>

hasThen

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches the then-statement of an if statement.

Examples matches the if statement
  (matcher = ifStmt(hasThen(cxxBoolLiteral(equals(true)))))
  if (false) true; else false;

Matcher<[ImplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ImplicitCastExpr.html)\>

hasImplicitDestinationType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches implicit casts whose destination type matches a given
matcher.

Matcher<[InitListExpr](https://clang.llvm.org/doxygen/classclang_1_1InitListExpr.html)\>

hasInit

unsigned N, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the n'th item of an initializer list expression.

Example matches y.
    (matcher = initListExpr(hasInit(0, expr())))
  int x{y}.

Matcher<[InitListExpr](https://clang.llvm.org/doxygen/classclang_1_1InitListExpr.html)\>

hasSyntacticForm

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the syntactic form of init list expressions
(if expression have it).

Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\>

capturesVar

Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\> InnerMatcher

Matches a \`LambdaCapture\` that refers to the specified \`VarDecl\`. The
\`VarDecl\` can be a separate variable that is captured by value or
reference, or a synthesized variable if the capture has an initializer.

Given
  void foo() {
    int x;
    auto f = \[x\](){};
    auto g = \[x = 1\](){};
  }
In the matcher
lambdaExpr(hasAnyCapture(lambdaCapture(capturesVar(hasName("x")))),
capturesVar(hasName("x")) matches \`x\` and \`x = 1\`.

Matcher<[LambdaExpr](https://clang.llvm.org/doxygen/classclang_1_1LambdaExpr.html)\>

forEachLambdaCapture

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\> InnerMatcher

Matches each lambda capture in a lambda expression.

Given
  int main() {
    int x, y;
    float z;
    auto f = \[=\]() { return x + y + z; };
  }
lambdaExpr(forEachLambdaCapture(
    lambdaCapture(capturesVar(varDecl(hasType(isInteger()))))))
will trigger two matches, binding for 'x' and 'y' respectively.

Matcher<[LambdaExpr](https://clang.llvm.org/doxygen/classclang_1_1LambdaExpr.html)\>

hasAnyCapture

Matcher<[LambdaCapture](https://clang.llvm.org/doxygen/classclang_1_1LambdaCapture.html)\> InnerMatcher

Matches any capture in a lambda expression.

Given
  void foo() {
    int t = 5;
    auto f = \[=\](){ return t; };
  }
lambdaExpr(hasAnyCapture(lambdaCapture())) and
lambdaExpr(hasAnyCapture(lambdaCapture(refersToVarDecl(hasName("t")))))
  both match \`\[=\](){ return t; }\`.

Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>

hasObjectExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches a member expression where the object expression is matched by a
given matcher. Implicit object expressions are included; that is, it matches
use of implicit \`this\`.

Given
  struct X {
    int m;
    int f(X x) { x.m; return m; }
  };
memberExpr(hasObjectExpression(hasType(cxxRecordDecl(hasName("X")))))
  matches \`x.m\`, but not \`m\`; however,
memberExpr(hasObjectExpression(hasType(pointsTo(
     cxxRecordDecl(hasName("X"))))))
  matches \`m\` (aka. \`this->m\`), but not \`x.m\`.

Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>

member

Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\> InnerMatcher

Matches a member expression where the member is matched by a
given matcher.

Given
  struct { int first, second; } first, second;
  int i(second.first);
  int j(first.second);
memberExpr(member(hasName("first")))
  matches second.first
  but not first.second (because the member name there is "second").

Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>

pointee

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Narrows PointerType (and similar) matchers to those where the
pointee matches a given matcher.

Given
  int \*a;
  int const \*b;
  float const \*f;
pointerType(pointee(isConstQualified(), isInteger()))
  matches "int const \*b"

Usable as: Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>, Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>,
  Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>, Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>,
  Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\>

hasUnderlyingDecl

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> InnerMatcher

Matches a NamedDecl whose underlying declaration matches the given
matcher.

Given
  namespace N { template<class T> void f(T t); }
  template <class T> void g() { using N::f; f(T()); }
unresolvedLookupExpr(hasAnyDeclaration(
    namedDecl(hasUnderlyingDecl(hasName("::N::f")))))
  matches the use of f in g() .

Matcher<[NestedNameSpecifierLoc](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifierLoc.html)\>

hasPrefix

Matcher<[NestedNameSpecifierLoc](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifierLoc.html)\> InnerMatcher

Matches on the prefix of a NestedNameSpecifierLoc.

Given
  struct A { struct B { struct C {}; }; };
  A::B::C c;
nestedNameSpecifierLoc(hasPrefix(loc(specifiesType(asString("struct A")))))
  matches "A::"

Matcher<[NestedNameSpecifierLoc](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifierLoc.html)\>

loc

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\> InnerMatcher

Matches NestedNameSpecifierLocs for which the given inner
NestedNameSpecifier-matcher matches.

Matcher<[NestedNameSpecifierLoc](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifierLoc.html)\>

specifiesTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> InnerMatcher

Matches nested name specifier locs that specify a type matching the
given TypeLoc.

Given
  struct A { struct B { struct C {}; }; };
  A::B::C c;
nestedNameSpecifierLoc(specifiesTypeLoc(loc(type(
  hasDeclaration(cxxRecordDecl(hasName("A")))))))
  matches "A::"

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\>

hasPrefix

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\> InnerMatcher

Matches on the prefix of a NestedNameSpecifier.

Given
  struct A { struct B { struct C {}; }; };
  A::B::C c;
nestedNameSpecifier(hasPrefix(specifiesType(asString("struct A")))) and
  matches "A::"

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\>

specifiesNamespace

Matcher<[NamespaceDecl](https://clang.llvm.org/doxygen/classclang_1_1NamespaceDecl.html)\> InnerMatcher

Matches nested name specifiers that specify a namespace matching the
given namespace matcher.

Given
  namespace ns { struct A {}; }
  ns::A a;
nestedNameSpecifier(specifiesNamespace(hasName("ns")))
  matches "ns::"

Matcher<[NestedNameSpecifier](https://clang.llvm.org/doxygen/classclang_1_1NestedNameSpecifier.html)\>

specifiesType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches nested name specifiers that specify a type matching the
given QualType matcher without qualifiers.

Given
  struct A { struct B { struct C {}; }; };
  A::B::C c;
nestedNameSpecifier(specifiesType(
  hasDeclaration(cxxRecordDecl(hasName("A")))
))
  matches "A::"

Matcher<[OMPExecutableDirective](https://clang.llvm.org/doxygen/classclang_1_1OMPExecutableDirective.html)\>

hasAnyClause

Matcher<[OMPClause](https://clang.llvm.org/doxygen/classclang_1_1OMPClause.html)\> InnerMatcher

Matches any clause in an OpenMP directive.

Given

  #pragma omp parallel
  #pragma omp parallel default(none)

\`\`ompExecutableDirective(hasAnyClause(anything()))\`\` matches
\`\`omp parallel default(none)\`\`.

Matcher<[OMPExecutableDirective](https://clang.llvm.org/doxygen/classclang_1_1OMPExecutableDirective.html)\>

hasStructuredBlock

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches the structured-block of the OpenMP executable directive

Prerequisite: the executable directive must not be standalone directive.
If it is, it will never match.

Given

   #pragma omp parallel
   ;
   #pragma omp parallel
   {}

\`\`ompExecutableDirective(hasStructuredBlock(nullStmt()))\`\` will match \`\`;\`\`

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

hasType

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the declaration of the expression's or value
declaration's type.

In case of a value declaration (for example a variable declaration),
this resolves one layer of indirection. For example, in the value
declaration "X x;", cxxRecordDecl(hasName("X")) matches the declaration of
X, while varDecl(hasType(cxxRecordDecl(hasName("X")))) matches the
declaration of x.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              cxxRecordDecl(hasName("X"))))
 class X {};
 void y(X &x) { x; X z; }
 class Y { friend class X; };
 class Z : public virtual X {};

Example matches class Derived
(matcher = cxxRecordDecl(hasAnyBase(hasType(cxxRecordDecl(hasName("Base"))))))
class Base {};
class Derived : Base {};

Usable as: Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>, Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>, Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>,
Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

isDerivedFrom

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> Base

Matches C++ classes that are directly or indirectly derived from a class
matching Base, or Objective-C classes that directly or indirectly
subclass a class matching Base.

Note that a class is not considered to be derived from itself.

Example matches Y, Z, C (Base == hasName("X"))
  class X;
  class Y : public X {};  // directly derived
  class Z : public Y {};  // indirectly derived
  typedef X A;
  typedef A B;
  class C : public B {};  // derived from a typedef of X

In the following example, Bar matches isDerivedFrom(hasName("X")):
  class Foo;
  typedef Foo X;
  class Bar : public Foo {};  // derived from a type that X is a typedef of

In the following example, Bar matches isDerivedFrom(hasName("NSObject"))
  @interface NSObject @end
  @interface Bar : NSObject @end

Usable as: Matcher<[CXXRecordDecl](https://clang.llvm.org/doxygen/classclang_1_1CXXRecordDecl.html)\>, Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

isDirectlyDerivedFrom

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> Base

Matches C++ or Objective-C classes that are directly derived from a class
matching Base.

Note that a class is not considered to be derived from itself.

Example matches Y, C (Base == hasName("X"))
  class X;
  class Y : public X {};  // directly derived
  class Z : public Y {};  // indirectly derived
  typedef X A;
  typedef A B;
  class C : public B {};  // derived from a typedef of X

In the following example, Bar matches isDerivedFrom(hasName("X")):
  class Foo;
  typedef Foo X;
  class Bar : public Foo {};  // derived from a type that X is a typedef of

Matcher<[ObjCInterfaceDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCInterfaceDecl.html)\>

isSameOrDerivedFrom

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> Base

Similar to isDerivedFrom(), but also matches classes that directly
match Base.

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

callee

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches 1) if the call expression's callee's declaration matches the
given matcher; or 2) if the Obj-C message expression's callee's method
declaration matches the given matcher.

Example matches y.x() (matcher = callExpr(callee(
                                   cxxMethodDecl(hasName("x")))))
  class Y { public: void x(); };
  void z() { Y y; y.x(); }

Example 2. Matches \[I foo\] with
objcMessageExpr(callee(objcMethodDecl(hasName("foo"))))

  @interface I: NSObject
  +(void)foo;
  @end
  ...
  \[I foo\]

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasAnyArgument

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches any argument of a call expression or a constructor call
expression, or an ObjC-message-send expression.

Given
  void x(int, int, int) { int y; x(1, y, 42); }
callExpr(hasAnyArgument(declRefExpr()))
  matches x(1, y, 42)
with hasAnyArgument(...)
  matching y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end
  void foo(I \*i) { \[i f:12\]; }
objcMessageExpr(hasAnyArgument(integerLiteral(equals(12))))
  matches \[i f:12\]

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasArgument

unsigned N, Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the n'th argument of a call expression or a constructor
call expression.

Example matches y in x(y)
    (matcher = callExpr(hasArgument(0, declRefExpr())))
  void x(int) { int y; x(y); }

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasReceiver

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if the Objective-C message is sent to an instance,
and the inner matcher matches on that instance.

For example the method call in
  NSString \*x = @"hello";
  \[x containsString:@"h"\];
is matched by
objcMessageExpr(hasReceiver(declRefExpr(to(varDecl(hasName("x"))))))

Matcher<[ObjCMessageExpr](https://clang.llvm.org/doxygen/classclang_1_1ObjCMessageExpr.html)\>

hasReceiverType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches on the receiver of an ObjectiveC Message expression.

Example
matcher = objCMessageExpr(hasReceiverType(asString("UIWebView \*")));
matches the \[webView ...\] message invocation.
  NSString \*webViewJavaScript = ...
  UIWebView \*webView = ...
  \[webView stringByEvaluatingJavaScriptFromString:webViewJavascript\];

Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

hasAnyParameter

Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> InnerMatcher

Matches any parameter of a function or an ObjC method declaration or a
block.

Does not match the 'this' parameter of a method.

Given
  class X { void f(int x, int y, int z) {} };
cxxMethodDecl(hasAnyParameter(hasName("y")))
  matches f(int x, int y, int z) {}
with hasAnyParameter(...)
  matching int y

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end

the matcher objcMethodDecl(hasAnyParameter(hasName("y")))
matches the declaration of method f with hasParameter
matching y.

For blocks, given
  b = ^(int y) { printf("%d", y) };

the matcher blockDecl(hasAnyParameter(hasName("y")))
matches the declaration of the block b with hasParameter
matching y.

Matcher<[ObjCMethodDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCMethodDecl.html)\>

hasParameter

unsigned N, Matcher<[ParmVarDecl](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)\> InnerMatcher

Matches the n'th parameter of a function or an ObjC method
declaration or a block.

Given
  class X { void f(int x) {} };
cxxMethodDecl(hasParameter(0, hasType(varDecl())))
  matches f(int x) {}
with hasParameter(...)
  matching int x

For ObjectiveC, given
  @interface I - (void) f:(int) y; @end

the matcher objcMethodDecl(hasParameter(0, hasName("y")))
matches the declaration of method f with hasParameter
matching y.

Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>

pointee

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Narrows PointerType (and similar) matchers to those where the
pointee matches a given matcher.

Given
  int \*a;
  int const \*b;
  float const \*f;
pointerType(pointee(isConstQualified(), isInteger()))
  matches "int const \*b"

Usable as: Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>, Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>,
  Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>, Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>,
  Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>

Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[OpaqueValueExpr](https://clang.llvm.org/doxygen/classclang_1_1OpaqueValueExpr.html)\>

hasSourceExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if the cast's source expression
or opaque value's source expression matches the given matcher.

Example 1: matches "a string"
(matcher = castExpr(hasSourceExpression(cxxConstructExpr())))
class URL { URL(string); };
URL url = "a string";

Example 2: matches 'b' (matcher =
opaqueValueExpr(hasSourceExpression(implicitCastExpr(declRefExpr())))
int a = b ?: 1;

Matcher<[OverloadExpr](https://clang.llvm.org/doxygen/classclang_1_1OverloadExpr.html)\>

hasAnyDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches an OverloadExpr if any of the declarations in the set of
overloads matches the given matcher.

Given
  template <typename T> void foo(T);
  template <typename T> void bar(T);
  template <typename T> void baz(T t) {
    foo(t);
    bar(t);
  }
unresolvedLookupExpr(hasAnyDeclaration(
    functionTemplateDecl(hasName("foo"))))
  matches foo in foo(t); but not bar in bar(t);

Matcher<[ParenType](https://clang.llvm.org/doxygen/classclang_1_1ParenType.html)\>

innerType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches ParenType nodes where the inner type is a specific type.

Given
  int (\*ptr\_to\_array)\[4\];
  int (\*ptr\_to\_func)(int);

varDecl(hasType(pointsTo(parenType(innerType(functionType()))))) matches
ptr\_to\_func but not ptr\_to\_array.

Usable as: Matcher<[ParenType](https://clang.llvm.org/doxygen/classclang_1_1ParenType.html)\>

Matcher<[PointerTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1PointerTypeLoc.html)\>

hasPointeeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> PointeeMatcher

Matches pointer \`TypeLoc\`s that have a pointee \`TypeLoc\` matching
\`PointeeMatcher\`.

Given
  int\* x;
pointerTypeLoc(hasPointeeLoc(loc(asString("int"))))
  matches \`int\*\`.

Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>

pointee

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Narrows PointerType (and similar) matchers to those where the
pointee matches a given matcher.

Given
  int \*a;
  int const \*b;
  float const \*f;
pointerType(pointee(isConstQualified(), isInteger()))
  matches "int const \*b"

Usable as: Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>, Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>,
  Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>, Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>,
  Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

hasCanonicalType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches QualTypes whose canonical type matches InnerMatcher.

Given:
  typedef int &int\_ref;
  int a;
  int\_ref b = a;

varDecl(hasType(qualType(referenceType()))))) will not match the
declaration of b but varDecl(hasType(qualType(hasCanonicalType(referenceType())))))) does.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

ignoringParens

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches types that match InnerMatcher after any parens are stripped.

Given
  void (\*fp)(void);
The matcher
  varDecl(hasType(pointerType(pointee(ignoringParens(functionType())))))
would match the declaration for fp.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

pointsTo

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the pointee type's declaration.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

pointsTo

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the matched type is a pointer type and the pointee type
matches the specified matcher.

Example matches y->x()
  (matcher = cxxMemberCallExpr(on(hasType(pointsTo
     cxxRecordDecl(hasName("Y")))))))
  class Y { public: void x(); };
  void z() { Y \*y; y->x(); }

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

references

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the referenced type's declaration.

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>

references

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the matched type is a reference type and the referenced
type matches the specified matcher.

Example matches X &x and const X &y
    (matcher = varDecl(hasType(references(cxxRecordDecl(hasName("X"))))))
  class X {
    void a(X b) {
      X &x = b;
      const X &y = b;
    }
  };

Matcher<[QualifiedTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1QualifiedTypeLoc.html)\>

hasUnqualifiedLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> InnerMatcher

Matches \`QualifiedTypeLoc\`s that have an unqualified \`TypeLoc\` matching
\`InnerMatcher\`.

Given
  int\* const x;
  const int y;
qualifiedTypeLoc(hasUnqualifiedLoc(pointerTypeLoc()))
  matches the \`TypeLoc\` of the variable declaration of \`x\`, but not \`y\`.

Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[ReferenceTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1ReferenceTypeLoc.html)\>

hasReferentLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> ReferentMatcher

Matches reference \`TypeLoc\`s that have a referent \`TypeLoc\` matching
\`ReferentMatcher\`.

Given
  int x = 3;
  int& xx = x;
referenceTypeLoc(hasReferentLoc(loc(asString("int"))))
  matches \`int&\`.

Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>

pointee

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Narrows PointerType (and similar) matchers to those where the
pointee matches a given matcher.

Given
  int \*a;
  int const \*b;
  float const \*f;
pointerType(pointee(isConstQualified(), isInteger()))
  matches "int const \*b"

Usable as: Matcher<[BlockPointerType](https://clang.llvm.org/doxygen/classclang_1_1BlockPointerType.html)\>, Matcher<[MemberPointerType](https://clang.llvm.org/doxygen/classclang_1_1MemberPointerType.html)\>,
  Matcher<[PointerType](https://clang.llvm.org/doxygen/classclang_1_1PointerType.html)\>, Matcher<[ReferenceType](https://clang.llvm.org/doxygen/classclang_1_1ReferenceType.html)\>,
  Matcher<[ObjCObjectPointerType](https://clang.llvm.org/doxygen/classclang_1_1ObjCObjectPointerType.html)\>

Matcher<[ReturnStmt](https://clang.llvm.org/doxygen/classclang_1_1ReturnStmt.html)\>

hasReturnValue

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the return value expression of a return statement

Given
  return a + b;
hasReturnValue(binaryOperator())
  matches 'return a + b'
with binaryOperator()
  matching 'a + b'

Matcher<[StmtExpr](https://clang.llvm.org/doxygen/classclang_1_1StmtExpr.html)\>

hasAnySubstatement

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches compound statements where at least one substatement matches
a given matcher. Also matches StmtExprs that have CompoundStmt as children.

Given
  { {}; 1+2; }
hasAnySubstatement(compoundStmt())
  matches '{ {}; 1+2; }'
with compoundStmt()
  matching '{}'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

alignOfExpr

Matcher<[UnaryExprOrTypeTraitExpr](https://clang.llvm.org/doxygen/classclang_1_1UnaryExprOrTypeTraitExpr.html)\> InnerMatcher

Same as unaryExprOrTypeTraitExpr, but only matching
alignof.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

forCallable

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches declaration of the function, method, or block the statement
belongs to.

Given:
F& operator=(const F& o) {
  std::copy\_if(o.begin(), o.end(), begin(), \[\](V v) { return v > 0; });
  return \*this;
}
returnStmt(forCallable(functionDecl(hasName("operator="))))
  matches 'return \*this'
  but does not match 'return v > 0'

Given:
-(void) foo {
  int x = 1;
  dispatch\_sync(queue, ^{ int y = 2; });
}
declStmt(forCallable(objcMethodDecl()))
  matches 'int x = 1'
  but does not match 'int y = 2'.
whereas declStmt(forCallable(blockDecl()))
  matches 'int y = 2'
  but does not match 'int x = 1'.

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

forFunction

Matcher<[FunctionDecl](https://clang.llvm.org/doxygen/classclang_1_1FunctionDecl.html)\> InnerMatcher

Matches declaration of the function the statement belongs to.

Deprecated. Use forCallable() to correctly handle the situation when
the declaration is not a function (but a block or an Objective-C method).
forFunction() not only fails to take non-functions into account but also
may match the wrong declaration in their presence.

Given:
F& operator=(const F& o) {
  std::copy\_if(o.begin(), o.end(), begin(), \[\](V v) { return v > 0; });
  return \*this;
}
returnStmt(forFunction(hasName("operator=")))
  matches 'return \*this'
  but does not match 'return v > 0'

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\>

sizeOfExpr

Matcher<[UnaryExprOrTypeTraitExpr](https://clang.llvm.org/doxygen/classclang_1_1UnaryExprOrTypeTraitExpr.html)\> InnerMatcher

Same as unaryExprOrTypeTraitExpr, but only matching
sizeof.

Matcher<[SubstTemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1SubstTemplateTypeParmType.html)\>

hasReplacementType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches template type parameter substitutions that have a replacement
type that matches the provided matcher.

Given
  template <typename T>
  double F(T t);
  int i;
  double j = F(i);

substTemplateTypeParmType(hasReplacementType(type())) matches int

Matcher<[SwitchStmt](https://clang.llvm.org/doxygen/classclang_1_1SwitchStmt.html)\>

forEachSwitchCase

Matcher<[SwitchCase](https://clang.llvm.org/doxygen/classclang_1_1SwitchCase.html)\> InnerMatcher

Matches each case or default statement belonging to the given switch
statement. This matcher may produce multiple matches.

Given
  switch (1) { case 1: case 2: default: switch (2) { case 3: case 4: ; } }
switchStmt(forEachSwitchCase(caseStmt().bind("c"))).bind("s")
  matches four times, with "c" binding each of "case 1:", "case 2:",
"case 3:" and "case 4:", and "s" respectively binding "switch (1)",
"switch (1)", "switch (2)" and "switch (2)".

Matcher<[SwitchStmt](https://clang.llvm.org/doxygen/classclang_1_1SwitchStmt.html)\>

hasCondition

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the condition expression of an if statement, for loop,
switch statement or conditional operator.

Example matches true (matcher = hasCondition(cxxBoolLiteral(equals(true))))
  if (true) {}

Matcher<[SwitchStmt](https://clang.llvm.org/doxygen/classclang_1_1SwitchStmt.html)\>

hasInitStatement

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches selection statements with initializer.

Given:
 void foo() {
   if (int i = foobar(); i > 0) {}
   switch (int i = foobar(); i) {}
   for (auto& a = get\_range(); auto& x : a) {}
 }
 void bar() {
   if (foobar() > 0) {}
   switch (foobar()) {}
   for (auto& x : get\_range()) {}
 }
ifStmt(hasInitStatement(anything()))
  matches the if statement in foo but not in bar.
switchStmt(hasInitStatement(anything()))
  matches the switch statement in foo but not in bar.
cxxForRangeStmt(hasInitStatement(anything()))
  matches the range for statement in foo but not in bar.

Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

isExpr

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches a sugar TemplateArgument that refers to a certain expression.

Given
  struct B { int next; };
  template<int(B::\*next\_ptr)> struct A {};
  A<&B::next> a;
templateSpecializationType(hasAnyTemplateArgument(
  isExpr(hasDescendant(declRefExpr(to(fieldDecl(hasName("next"))))))))
  matches the specialization A<&B::next> with fieldDecl(...) matching
    B::next

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

refersToDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a canonical TemplateArgument that refers to a certain
declaration.

Given
  struct B { int next; };
  template<int(B::\*next\_ptr)> struct A {};
  A<&B::next> a;
classTemplateSpecializationDecl(hasAnyTemplateArgument(
    refersToDeclaration(fieldDecl(hasName("next")))))
  matches the specialization A<&B::next> with fieldDecl(...) matching
    B::next

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

refersToIntegralType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches a TemplateArgument that refers to an integral type.

Given
  template<int T> struct C {};
  C<42> c;
classTemplateSpecializationDecl(
  hasAnyTemplateArgument(refersToIntegralType(asString("int"))))
  matches the implicit instantiation of C in C<42>.

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

refersToTemplate

Matcher<[TemplateName](https://clang.llvm.org/doxygen/classclang_1_1TemplateName.html)\> InnerMatcher

Matches a TemplateArgument that refers to a certain template.

Given
  template<template <typename> class S> class X {};
  template<typename T> class Y {};
  X<Y> xi;
classTemplateSpecializationDecl(hasAnyTemplateArgument(
    refersToTemplate(templateName())))
  matches the specialization X<Y>

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\>

refersToType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches a TemplateArgument that refers to a certain type.

Given
  struct X {};
  template<typename T> struct A {};
  A<X> a;
classTemplateSpecializationDecl(hasAnyTemplateArgument(refersToType(
  recordType(hasDeclaration(recordDecl(hasName("X")))))))
matches the specialization of struct A generated by A<X>.

Matcher<[TemplateSpecializationTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationTypeLoc.html)\>

hasAnyTemplateArgumentLoc

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
that have at least one \`TemplateArgumentLoc\` matching the given
\`InnerMatcher\`.

Given
  template<typename T> class A {};
  A<int> a;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasAnyTemplateArgumentLoc(
  hasTypeLoc(loc(asString("int")))))))
  matches \`A<int> a\`.

Matcher<[TemplateSpecializationTypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationTypeLoc.html)\>

hasTemplateArgumentLoc

unsigned Index, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
where the n'th \`TemplateArgumentLoc\` matches the given \`InnerMatcher\`.

Given
  template<typename T, typename U> class A {};
  A<double, int> b;
  A<int, double> c;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasTemplateArgumentLoc(0,
  hasTypeLoc(loc(asString("double")))))))
  matches \`A<double, int> b\`, but not \`A<int, double> c\`.

Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>

forEachTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specialization,
variable template specialization, and function template specialization
nodes where the template argument matches the inner matcher. This matcher
may produce multiple matches.

Given
  template <typename T, unsigned N, unsigned M>
  struct Matrix {};

  constexpr unsigned R = 2;
  Matrix<int, R \* 2, R \* 4> M;

  template <typename T, typename U>
  void f(T&& t, U&& u) {}

  bool B = false;
  f(R, B);
templateSpecializationType(forEachTemplateArgument(isExpr(expr())))
  matches twice, with expr() matching 'R \* 2' and 'R \* 4'
functionDecl(forEachTemplateArgument(refersToType(builtinType())))
  matches the specialization f<unsigned, bool> twice, for 'unsigned'
  and 'bool'

Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>

hasAnyTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationTypes, class template specializations,
variable template specializations, and function template specializations
that have at least one TemplateArgument matching the given InnerMatcher.

Given
  template<typename T> class A {};
  template<> class A<double> {};
  A<int> a;

  template<typename T> f() {};
  void func() { f<int>(); };

classTemplateSpecializationDecl(hasAnyTemplateArgument(
    refersToType(asString("int"))))
  matches the specialization A<int>

functionDecl(hasAnyTemplateArgument(refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>

hasTemplateArgument

unsigned N, Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specializations,
variable template specializations, and function template specializations
where the n'th TemplateArgument matches the given InnerMatcher.

Given
  template<typename T, typename U> class A {};
  A<bool, int> b;
  A<int, bool> c;

  template<typename T> void f() {}
  void func() { f<int>(); };
classTemplateSpecializationDecl(hasTemplateArgument(
    1, refersToType(asString("int"))))
  matches the specialization A<bool, int>

functionDecl(hasTemplateArgument(0, refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\>

loc

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches TypeLocs for which the given inner
QualType-matcher matches.

Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

hasTypeLoc

Matcher<[TypeLoc](https://clang.llvm.org/doxygen/classclang_1_1TypeLoc.html)\> Inner

Matches if the type location of a node matches the inner matcher.

Examples:
  int x;
declaratorDecl(hasTypeLoc(loc(asString("int"))))
  matches int x

auto x = int(3);
cxxTemporaryObjectExpr(hasTypeLoc(loc(asString("int"))))
  matches int(3)

struct Foo { Foo(int, int); };
auto x = Foo(1, 2);
cxxFunctionalCastExpr(hasTypeLoc(loc(asString("struct Foo"))))
  matches Foo(1, 2)

Usable as: Matcher<[BlockDecl](https://clang.llvm.org/doxygen/classclang_1_1BlockDecl.html)\>, Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>,
  Matcher<[CXXCtorInitializer](https://clang.llvm.org/doxygen/classclang_1_1CXXCtorInitializer.html)\>, Matcher<[CXXFunctionalCastExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXFunctionalCastExpr.html)\>,
  Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[CXXTemporaryObjectExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXTemporaryObjectExpr.html)\>,
  Matcher<[CXXUnresolvedConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXUnresolvedConstructExpr.html)\>,
  Matcher<[CompoundLiteralExpr](https://clang.llvm.org/doxygen/classclang_1_1CompoundLiteralExpr.html)\>,
  Matcher<[DeclaratorDecl](https://clang.llvm.org/doxygen/classclang_1_1DeclaratorDecl.html)\>, Matcher<[ExplicitCastExpr](https://clang.llvm.org/doxygen/classclang_1_1ExplicitCastExpr.html)\>,
  Matcher<[ObjCPropertyDecl](https://clang.llvm.org/doxygen/classclang_1_1ObjCPropertyDecl.html)\>, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\>,
  Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

Matcher<[TypedefNameDecl](https://clang.llvm.org/doxygen/classclang_1_1TypedefNameDecl.html)\>

hasType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the expression's or declaration's type matches a type
matcher.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and U (matcher = typedefDecl(hasType(asString("int")))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              asString("class X")))
 class X {};
 void y(X &x) { x; X z; }
 typedef int U;
 class Y { friend class X; };
 class Z : public virtual X {};

Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

hasUnqualifiedDesugaredType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\> InnerMatcher

Matches if the matched type matches the unqualified desugared
type of the matched node.

For example, in:
  class A {};
  using B = A;
The matcher type(hasUnqualifiedDesugaredType(recordType())) matches
both B and A.

Matcher<[UnaryExprOrTypeTraitExpr](https://clang.llvm.org/doxygen/classclang_1_1UnaryExprOrTypeTraitExpr.html)\>

hasArgumentOfType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches unary expressions that have a specific type of argument.

Given
  int a, c; float b; int s = sizeof(a) + sizeof(b) + alignof(c);
unaryExprOrTypeTraitExpr(hasArgumentOfType(asString("int"))
  matches sizeof(a) and alignof(c)

Matcher<[UnaryOperator](https://clang.llvm.org/doxygen/classclang_1_1UnaryOperator.html)\>

hasUnaryOperand

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches if the operand of a unary operator matches.

Example matches true (matcher = hasUnaryOperand(
                                  cxxBoolLiteral(equals(true))))
  !true

Matcher<[UnresolvedMemberExpr](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedMemberExpr.html)\>

hasObjectExpression

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches a member expression where the object expression is matched by a
given matcher. Implicit object expressions are included; that is, it matches
use of implicit \`this\`.

Given
  struct X {
    int m;
    int f(X x) { x.m; return m; }
  };
memberExpr(hasObjectExpression(hasType(cxxRecordDecl(hasName("X")))))
  matches \`x.m\`, but not \`m\`; however,
memberExpr(hasObjectExpression(hasType(pointsTo(
     cxxRecordDecl(hasName("X"))))))
  matches \`m\` (aka. \`this->m\`), but not \`x.m\`.

Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

hasDeclaration

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Matches a node if the declaration associated with that node
matches the given matcher.

The associated declaration is:
- for type nodes, the declaration of the underlying type
- for CallExpr, the declaration of the callee
- for MemberExpr, the declaration of the referenced member
- for CXXConstructExpr, the declaration of the constructor
- for CXXNewExpr, the declaration of the operator new
- for ObjCIvarExpr, the declaration of the ivar

For type nodes, hasDeclaration will generally match the declaration of the
sugared type. Given
  class X {};
  typedef X Y;
  Y y;
in varDecl(hasType(hasDeclaration(decl()))) the decl will match the
typedefDecl. A common use case is to match the underlying, desugared type.
This can be achieved by using the hasUnqualifiedDesugaredType matcher:
  varDecl(hasType(hasUnqualifiedDesugaredType(
      recordType(hasDeclaration(decl())))))
In this matcher, the decl will match the CXXRecordDecl of class X.

Usable as: Matcher<[AddrLabelExpr](https://clang.llvm.org/doxygen/classclang_1_1AddrLabelExpr.html)\>, Matcher<[CallExpr](https://clang.llvm.org/doxygen/classclang_1_1CallExpr.html)\>,
  Matcher<[CXXConstructExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXConstructExpr.html)\>, Matcher<[CXXNewExpr](https://clang.llvm.org/doxygen/classclang_1_1CXXNewExpr.html)\>, Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>,
  Matcher<[EnumType](https://clang.llvm.org/doxygen/classclang_1_1EnumType.html)\>, Matcher<[InjectedClassNameType](https://clang.llvm.org/doxygen/classclang_1_1InjectedClassNameType.html)\>, Matcher<[LabelStmt](https://clang.llvm.org/doxygen/classclang_1_1LabelStmt.html)\>,
  Matcher<[MemberExpr](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)\>, Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\>, Matcher<[RecordType](https://clang.llvm.org/doxygen/classclang_1_1RecordType.html)\>,
  Matcher<[TagType](https://clang.llvm.org/doxygen/classclang_1_1TagType.html)\>, Matcher<[TemplateSpecializationType](https://clang.llvm.org/doxygen/classclang_1_1TemplateSpecializationType.html)\>,
  Matcher<[TemplateTypeParmType](https://clang.llvm.org/doxygen/classclang_1_1TemplateTypeParmType.html)\>, Matcher<[TypedefType](https://clang.llvm.org/doxygen/classclang_1_1TypedefType.html)\>,
  Matcher<[UnresolvedUsingType](https://clang.llvm.org/doxygen/classclang_1_1UnresolvedUsingType.html)\>

Matcher<[UsingShadowDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingShadowDecl.html)\>

hasTargetDecl

Matcher<[NamedDecl](https://clang.llvm.org/doxygen/classclang_1_1NamedDecl.html)\> InnerMatcher

Matches a using shadow declaration where the target declaration is
matched by the given matcher.

Given
  namespace X { int a; void b(); }
  using X::a;
  using X::b;
usingDecl(hasAnyUsingShadowDecl(hasTargetDecl(functionDecl())))
  matches using X::b but not using X::a 

Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>

hasUnderlyingType

Matcher<[Type](https://clang.llvm.org/doxygen/classclang_1_1Type.html)\>

Matches DecltypeType or UsingType nodes to find the underlying type.

Given
  decltype(1) a = 1;
  decltype(2.0) b = 2.0;
decltypeType(hasUnderlyingType(isInteger()))
  matches the type of "a"

Usable as: Matcher<[DecltypeType](https://clang.llvm.org/doxygen/classclang_1_1DecltypeType.html)\>, Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>

Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>

throughUsingDecl

Matcher<[UsingShadowDecl](https://clang.llvm.org/doxygen/classclang_1_1UsingShadowDecl.html)\> Inner

Matches if a node refers to a declaration through a specific
using shadow declaration.

Examples:
  namespace a { int f(); }
  using a::f;
  int x = f();
declRefExpr(throughUsingDecl(anything()))
  matches f

  namespace a { class X{}; }
  using a::X;
  X x;
typeLoc(loc(usingType(throughUsingDecl(anything()))))
  matches X

Usable as: Matcher<[DeclRefExpr](https://clang.llvm.org/doxygen/classclang_1_1DeclRefExpr.html)\>, Matcher<[UsingType](https://clang.llvm.org/doxygen/classclang_1_1UsingType.html)\>

Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>

hasType

Matcher<[Decl](https://clang.llvm.org/doxygen/classclang_1_1Decl.html)\> InnerMatcher

Overloaded to match the declaration of the expression's or value
declaration's type.

In case of a value declaration (for example a variable declaration),
this resolves one layer of indirection. For example, in the value
declaration "X x;", cxxRecordDecl(hasName("X")) matches the declaration of
X, while varDecl(hasType(cxxRecordDecl(hasName("X")))) matches the
declaration of x.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              cxxRecordDecl(hasName("X"))))
 class X {};
 void y(X &x) { x; X z; }
 class Y { friend class X; };
 class Z : public virtual X {};

Example matches class Derived
(matcher = cxxRecordDecl(hasAnyBase(hasType(cxxRecordDecl(hasName("Base"))))))
class Base {};
class Derived : Base {};

Usable as: Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\>, Matcher<[FriendDecl](https://clang.llvm.org/doxygen/classclang_1_1FriendDecl.html)\>, Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>,
Matcher<[CXXBaseSpecifier](https://clang.llvm.org/doxygen/classclang_1_1CXXBaseSpecifier.html)\>

Matcher<[ValueDecl](https://clang.llvm.org/doxygen/classclang_1_1ValueDecl.html)\>

hasType

Matcher<[QualType](https://clang.llvm.org/doxygen/classclang_1_1QualType.html)\> InnerMatcher

Matches if the expression's or declaration's type matches a type
matcher.

Example matches x (matcher = expr(hasType(cxxRecordDecl(hasName("X")))))
            and z (matcher = varDecl(hasType(cxxRecordDecl(hasName("X")))))
            and U (matcher = typedefDecl(hasType(asString("int")))
            and friend class X (matcher = friendDecl(hasType("X"))
            and public virtual X (matcher = cxxBaseSpecifier(hasType(
                                              asString("class X")))
 class X {};
 void y(X &x) { x; X z; }
 typedef int U;
 class Y { friend class X; };
 class Z : public virtual X {};

Matcher<[VarDecl](https://clang.llvm.org/doxygen/classclang_1_1VarDecl.html)\>

hasInitializer

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches a variable declaration that has an initializer expression
that matches the given matcher.

Example matches x (matcher = varDecl(hasInitializer(callExpr())))
  bool y() { return true; }
  bool x = y();

Matcher<[VarTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1VarTemplateSpecializationDecl.html)\>

forEachTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specialization,
variable template specialization, and function template specialization
nodes where the template argument matches the inner matcher. This matcher
may produce multiple matches.

Given
  template <typename T, unsigned N, unsigned M>
  struct Matrix {};

  constexpr unsigned R = 2;
  Matrix<int, R \* 2, R \* 4> M;

  template <typename T, typename U>
  void f(T&& t, U&& u) {}

  bool B = false;
  f(R, B);
templateSpecializationType(forEachTemplateArgument(isExpr(expr())))
  matches twice, with expr() matching 'R \* 2' and 'R \* 4'
functionDecl(forEachTemplateArgument(refersToType(builtinType())))
  matches the specialization f<unsigned, bool> twice, for 'unsigned'
  and 'bool'

Matcher<[VarTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1VarTemplateSpecializationDecl.html)\>

hasAnyTemplateArgumentLoc

Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
that have at least one \`TemplateArgumentLoc\` matching the given
\`InnerMatcher\`.

Given
  template<typename T> class A {};
  A<int> a;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasAnyTemplateArgumentLoc(
  hasTypeLoc(loc(asString("int")))))))
  matches \`A<int> a\`.

Matcher<[VarTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1VarTemplateSpecializationDecl.html)\>

hasAnyTemplateArgument

Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationTypes, class template specializations,
variable template specializations, and function template specializations
that have at least one TemplateArgument matching the given InnerMatcher.

Given
  template<typename T> class A {};
  template<> class A<double> {};
  A<int> a;

  template<typename T> f() {};
  void func() { f<int>(); };

classTemplateSpecializationDecl(hasAnyTemplateArgument(
    refersToType(asString("int"))))
  matches the specialization A<int>

functionDecl(hasAnyTemplateArgument(refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[VarTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1VarTemplateSpecializationDecl.html)\>

hasTemplateArgumentLoc

unsigned Index, Matcher<[TemplateArgumentLoc](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgumentLoc.html)\> InnerMatcher

Matches template specialization \`TypeLoc\`s, class template specializations,
variable template specializations, and function template specializations
where the n'th \`TemplateArgumentLoc\` matches the given \`InnerMatcher\`.

Given
  template<typename T, typename U> class A {};
  A<double, int> b;
  A<int, double> c;
varDecl(hasTypeLoc(templateSpecializationTypeLoc(hasTemplateArgumentLoc(0,
  hasTypeLoc(loc(asString("double")))))))
  matches \`A<double, int> b\`, but not \`A<int, double> c\`.

Matcher<[VarTemplateSpecializationDecl](https://clang.llvm.org/doxygen/classclang_1_1VarTemplateSpecializationDecl.html)\>

hasTemplateArgument

unsigned N, Matcher<[TemplateArgument](https://clang.llvm.org/doxygen/classclang_1_1TemplateArgument.html)\> InnerMatcher

Matches templateSpecializationType, class template specializations,
variable template specializations, and function template specializations
where the n'th TemplateArgument matches the given InnerMatcher.

Given
  template<typename T, typename U> class A {};
  A<bool, int> b;
  A<int, bool> c;

  template<typename T> void f() {}
  void func() { f<int>(); };
classTemplateSpecializationDecl(hasTemplateArgument(
    1, refersToType(asString("int"))))
  matches the specialization A<bool, int>

functionDecl(hasTemplateArgument(0, refersToType(asString("int"))))
  matches the specialization f<int>

Matcher<[VariableArrayType](https://clang.llvm.org/doxygen/classclang_1_1VariableArrayType.html)\>

hasSizeExpr

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches VariableArrayType nodes that have a specific size
expression.

Given
  void f(int b) {
    int a\[b\];
  }
variableArrayType(hasSizeExpr(ignoringImpCasts(declRefExpr(to(
  varDecl(hasName("b")))))))
  matches "int a\[b\]"

Matcher<[WhileStmt](https://clang.llvm.org/doxygen/classclang_1_1WhileStmt.html)\>

hasBody

Matcher<[Stmt](https://clang.llvm.org/doxygen/classclang_1_1Stmt.html)\> InnerMatcher

Matches a 'for', 'while', 'while' statement or a function or coroutine
definition that has a given body. Note that in case of functions or
coroutines this matcher only matches the definition itself and not the
other declarations of the same function or coroutine.

Given
  for (;;) {}
forStmt(hasBody(compoundStmt()))
  matches 'for (;;) {}'
with compoundStmt()
  matching '{}'

Given
  void f();
  void f() {}
functionDecl(hasBody(compoundStmt()))
  matches 'void f() {}'
with compoundStmt()
  matching '{}'
  but does not match 'void f();'

Matcher<[WhileStmt](https://clang.llvm.org/doxygen/classclang_1_1WhileStmt.html)\>

hasCondition

Matcher<[Expr](https://clang.llvm.org/doxygen/classclang_1_1Expr.html)\> InnerMatcher

Matches the condition expression of an if statement, for loop,
switch statement or conditional operator.

Example matches true (matcher = hasCondition(cxxBoolLiteral(equals(true))))
  if (true) {}
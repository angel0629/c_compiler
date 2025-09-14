---
title: "Clang-Repl — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangRepl.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
**Clang-Repl** is an interactive C++ interpreter that allows for incremental compilation. It supports interactive programming for C++ in a read-evaluate-print-loop (REPL) style. It uses Clang as a library to compile the high level programming language into LLVM IR. Then the LLVM IR is executed by the LLVM just-in-time (JIT) infrastructure.

Clang-Repl is suitable for exploratory programming and in places where time to insight is important. Clang-Repl is a project inspired by the work in [Cling](https://github.com/root-project/cling), a LLVM-based C/C++ interpreter developed by the field of high energy physics and used by the scientific data analysis framework [ROOT](https://root.cern/). Clang-Repl allows to move parts of Cling upstream, making them useful and available to a broader audience.

Clang-Repl Basic Data Flow[¶](#clang-repl-basic-data-flow "Link to this heading")
---------------------------------------------------------------------------------

![ClangRepl design](https://clang.llvm.org/docs/_images/ClangRepl_design.png)

Clang-Repl data flow can be divided into roughly 8 phases:

1.  Clang-Repl controls the input infrastructure by an interactive prompt or by an interface allowing the incremental processing of input.
    
2.  Then it sends the input to the underlying incremental facilities in Clang infrastructure.
    
3.  Clang compiles the input into an AST representation.
    
4.  When required the AST can be further transformed in order to attach specific behavior.
    
5.  The AST representation is then lowered to LLVM IR.
    
6.  The LLVM IR is the input format for LLVM’s JIT compilation infrastructure. The tool will instruct the JIT to run specified functions, translating them into machine code targeting the underlying device architecture (eg. Intel x86 or NVPTX).
    
7.  The LLVM JIT lowers the LLVM IR to machine code.
    
8.  The machine code is then executed.
    

Build Instructions:[¶](#build-instructions "Link to this heading")
------------------------------------------------------------------

$ cd llvm-project
$ mkdir build
$ cd build
$ cmake \-DCMAKE\_BUILD\_TYPE\=RelWithDebInfo \-DLLVM\_ENABLE\_PROJECTS\=clang \-G "Unix Makefiles" ../llvm

**Note here**, above RelWithDebInfo - Debug / Release

cmake --build . --target clang clang-repl -j n
   OR
cmake --build . --target clang clang-repl

**Clang-repl** is built under llvm-project/build/bin. Proceed into the directory **llvm-project/build/bin**

./clang-repl
clang-repl>

Clang-Repl Usage[¶](#clang-repl-usage "Link to this heading")
-------------------------------------------------------------

**Clang-Repl** is an interactive C++ interpreter that allows for incremental compilation. It supports interactive programming for C++ in a read-evaluate-print-loop (REPL) style. It uses Clang as a library to compile the high level programming language into LLVM IR. Then the LLVM IR is executed by the LLVM just-in-time (JIT) infrastructure.

Basic:[¶](#basic "Link to this heading")
----------------------------------------

clang-repl> #include <iostream>
clang-repl> int f() { std::cout << "Hello Interpreted World!\\n"; return 0; }
clang-repl> auto r = f();
 // Prints Hello Interpreted World!

clang-repl> #include<iostream>
clang-repl> using namespace std;
clang-repl> std::cout << "Welcome to CLANG-REPL" << std::endl;
Welcome to CLANG-REPL
// Prints Welcome to CLANG-REPL

Function Definitions and Calls:[¶](#function-definitions-and-calls "Link to this heading")
------------------------------------------------------------------------------------------

clang-repl> #include <iostream>
clang-repl> int sum(int a, int b){ return a+b; };
clang-repl> int c = sum(9,10);
clang-repl> std::cout << c << std::endl;
19
clang-repl>

Iterative Structures:[¶](#iterative-structures "Link to this heading")
----------------------------------------------------------------------

clang-repl> #include <iostream>
clang-repl> for (int i = 0;i < 3;i++){ std::cout << i << std::endl;}
0
1
2
clang-repl> while(i < 7){ i++; std::cout << i << std::endl;}
4
5
6
7

Classes and Structures:[¶](#classes-and-structures "Link to this heading")
--------------------------------------------------------------------------

clang-repl> #include <iostream>
clang-repl> class Rectangle {int width, height; public: void set\_values (int,int);\\
clang-repl... int area() {return width\*height;}};
clang-repl>  void Rectangle::set\_values (int x, int y) { width = x;height = y;}
clang-repl> int main () { Rectangle rect;rect.set\_values (3,4);\\
clang-repl... std::cout << "area: " << rect.area() << std::endl;\\
clang-repl... return 0;}
clang-repl> main();
area: 12
clang-repl>
// Note: This '\\' can be used for continuation of the statements in the next line

Lamdas:[¶](#lamdas "Link to this heading")
------------------------------------------

clang-repl> #include <iostream>
clang-repl> using namespace std;
clang-repl> auto welcome = \[\]()  { std::cout << "Welcome to REPL" << std::endl;};
clang-repl> welcome();
Welcome to REPL

Built in Commands:[¶](#built-in-commands "Link to this heading")
----------------------------------------------------------------

clang-repl has some special commands that are of the form `%<something>`. To list all these commands, use the `%help` command:

### Help:[¶](#help "Link to this heading")

The `%help` command lists all built in clang-repl commands.

clang-repl> %help

### Using Dynamic Libraries:[¶](#using-dynamic-libraries "Link to this heading")

The `%lib` command links a dynamic library.

clang-repl> %lib print.so
clang-repl> #include"print.hpp"
clang-repl> print(9);
9

**Generation of dynamic library**

// print.cpp
#include <iostream>
#include "print.hpp"

void print(int a)
{
   std::cout << a << std::endl;
}

// print.hpp
void print (int a);

// Commands
clang++-17  -c -o print.o print.cpp
clang-17 -shared print.o -o print.so

### Undo:[¶](#undo "Link to this heading")

The `%undo` command undoes the previous input.

clang-repl> int a = 1; a
(int) 1
clang-repl> %undo
clang-repl> a
In file included from <<< inputs >>>:1:
input\_line\_2:1:1: error: use of undeclared identifier 'a'
1 | a
\* | ^
error: Parsing failed.

### Quit:[¶](#quit "Link to this heading")

The `%quit` command terminates clang-repl.

clang-repl> %quit

Just like Clang, Clang-Repl can be integrated in existing applications as a library (using the clangInterpreter library). This turns your C++ compiler into a service that can incrementally consume and execute code. The **Compiler as A Service** (**CaaS**) concept helps support advanced use cases such as template instantiations on demand and automatic language interoperability. It also helps static languages such as C/C++ become apt for data science.

Execution Results Handling in Clang-Repl[¶](#execution-results-handling-in-clang-repl "Link to this heading")
-------------------------------------------------------------------------------------------------------------

Execution Results Handling features discussed below help extend the Clang-Repl functionality by creating an interface between the execution results of a program and the compiled program.

1\. **Capture Execution Results**: This feature helps capture the execution results of a program and bring them back to the compiled program.

2\. **Dump Captured Execution Results**: This feature helps create a temporary dump for Value Printing/Automatic Printf, that is, to display the value and type of the captured data.

1\. Capture Execution Results[¶](#capture-execution-results "Link to this heading")
-----------------------------------------------------------------------------------

In many cases, it is useful to bring back the program execution result to the compiled program. This result can be stored in an object of type **Value**.

### How Execution Results are captured (Value Synthesis):[¶](#how-execution-results-are-captured-value-synthesis "Link to this heading")

The synthesizer chooses which expression to synthesize, and then it replaces the original expression with the synthesized expression. Depending on the expression type, it may choose to save an object (`LastValue`) of type ‘value’ while allocating memory to it (`SetValueWithAlloc()`), or not ( `SetValueNoAlloc()`).

![Shows how an object of type 'Value' is synthesized](https://clang.llvm.org/docs/_images/graphviz-4d52a65fd072512bb39329fb783bdfbdd8bbb1e6.png)

Value Synthesis[¶](#valuesynthesis "Link to this image")

### Where is the captured result stored?[¶](#where-is-the-captured-result-stored "Link to this heading")

`LastValue` holds the last result of the value printing. It is a class member because it can be accessed even after subsequent inputs.

**Note:** If no value printing happens, then it is in an invalid state.

### Improving Efficiency and User Experience[¶](#improving-efficiency-and-user-experience "Link to this heading")

The Value object is essentially used to create a mapping between an expression ‘type’ and the allocated ‘memory’. Built-in types (bool, char, int, float, double, etc.) are copyable. Their memory allocation size is known and the Value object can introduce a small-buffer optimization. In case of objects, the `Value` class provides reference-counted memory management.

The implementation maps the type as written and the Clang Type to be able to use the preprocessor to synthesize the relevant cast operations. For example, `X(char, Char_S)`, where `char` is the type from the language’s type system and `Char_S` is the Clang builtin type which represents it. This mapping helps to import execution results from the interpreter in a compiled program and vice versa. The `Value.h` header file can be included at runtime and this is why it has a very low token count and was developed with strict constraints in mind.

This also enables the user to receive the computed ‘type’ back in their code and then transform the type into something else (e.g., re-cast a double into a float). Normally, the compiler can handle these conversions transparently, but in interpreter mode, the compiler cannot see all the ‘from’ and ‘to’ types, so it cannot implicitly do the conversions. So this logic enables providing these conversions on request.

On-request conversions can help improve the user experience, by allowing conversion to a desired ‘to’ type, when the ‘from’ type is unknown or unclear.

### Significance of this Feature[¶](#significance-of-this-feature "Link to this heading")

The ‘Value’ object enables wrapping a memory region that comes from the JIT, and bringing it back to the compiled code (and vice versa). This is a very useful functionality when:

*   connecting an interpreter to the compiled code, or
    
*   connecting an interpreter in another language.
    

For example, this feature helps transport values across boundaries. A notable example is the cppyy project code makes use of this feature to enable running C++ within Python. It enables transporting values/information between C++ and Python.

Note: [cppyy](https://github.com/wlav/cppyy/) is an automatic, run-time, Python-to-C++ bindings generator, for calling C++ from Python and Python from C++. It uses LLVM along with a C++ interpreter (e.g., Cling) to enable features like run-time instantiation of C++ templates, cross-inheritance, callbacks, auto-casting, transparent use of smart pointers, etc.

In a nutshell, this feature enables a new way of developing code, paving the way for language interoperability and easier interactive programming.

Implementation Details[¶](#implementation-details "Link to this heading")
-------------------------------------------------------------------------

### Interpreter as a REPL vs. as a Library[¶](#interpreter-as-a-repl-vs-as-a-library "Link to this heading")

1 - If we’re using the interpreter in interactive (REPL) mode, it will dump the value (i.e., value printing).

if (LastValue.isValid()) {
  if (!V) {
    LastValue.dump();
    LastValue.clear();
  } else
    \*V = std::move(LastValue);
}

2 - If we’re using the interpreter as a library, then it will pass the value to the user.

### Incremental AST Consumer[¶](#incremental-ast-consumer "Link to this heading")

The `IncrementalASTConsumer` class wraps the original code generator `ASTConsumer` and it performs a hook, to traverse all the top-level decls, to look for expressions to synthesize, based on the `isSemiMissing()` condition.

If this condition is found to be true, then `Interp.SynthesizeExpr()` will be invoked.

**Note:** Following is a sample code snippet. Actual code may vary over time.

for (Decl \*D : DGR)
  if (auto \*TSD = llvm::dyn\_cast<TopLevelStmtDecl>(D);
      TSD && TSD->isSemiMissing())
    TSD->setStmt(Interp.SynthesizeExpr(cast<Expr>(TSD->getStmt())));

return Consumer->HandleTopLevelDecl(DGR);

The synthesizer will then choose the relevant expression, based on its type.

### Communication between Compiled Code and Interpreted Code[¶](#communication-between-compiled-code-and-interpreted-code "Link to this heading")

In Clang-Repl there is **interpreted code**, and this feature adds a ‘value’ runtime that can talk to the **compiled code**.

Following is an example where the compiled code interacts with the interpreter code. The execution results of an expression are stored in the object ‘V’ of type Value. This value is then printed, effectively helping the interpreter use a value from the compiled code.

int Global = 42;
void setGlobal(int val) { Global = val; }
int getGlobal() { return Global; }
Interp.ParseAndExecute(“void setGlobal(int val);”);
Interp.ParseAndExecute(“int getGlobal();”);
Value V;
Interp.ParseAndExecute(“getGlobal()”, &V);
std::cout << V.getAs<int>() << “\\n”; // Prints 42

**Note:** Above is an example of interoperability between the compiled code and the interpreted code. Interoperability between languages (e.g., C++ and Python) works similarly.

2\. Dump Captured Execution Results[¶](#dump-captured-execution-results "Link to this heading")
-----------------------------------------------------------------------------------------------

This feature helps create a temporary dump to display the value and type (pretty print) of the desired data. This is a good way to interact with the interpreter during interactive programming.

### How value printing is simplified (Automatic Printf)[¶](#how-value-printing-is-simplified-automatic-printf "Link to this heading")

The `Automatic Printf` feature makes it easy to display variable values during program execution. Using the `printf` function repeatedly is not required. This is achieved using an extension in the `libclangInterpreter` library.

To automatically print the value of an expression, simply write the expression in the global scope **without a semicolon**.

![Shows how Automatic PrintF can be used](https://clang.llvm.org/docs/_images/graphviz-7b3ae88c785ecc90fa69fae162f157c2ba60ffaf.png)

Automatic PrintF[¶](#automaticprintf "Link to this image")

### Significance of this feature[¶](#id1 "Link to this heading")

Inspired by a similar implementation in [Cling](https://github.com/root-project/cling), this feature added to upstream Clang repo has essentially extended the syntax of C++, so that it can be more helpful for people that are writing code for data science applications.

This is useful, for example, when you want to experiment with a set of values against a set of functions, and you’d like to know the results right away. This is similar to how Python works (hence its popularity in data science research), but the superior performance of C++, along with this flexibility makes it a more attractive option.

Implementation Details[¶](#id3 "Link to this heading")
------------------------------------------------------

### Parsing mechanism:[¶](#parsing-mechanism "Link to this heading")

The Interpreter in Clang-Repl (`Interpreter.cpp`) includes the function `ParseAndExecute()` that can accept a ‘Value’ parameter to capture the result. But if the value parameter is made optional and it is omitted (i.e., that the user does not want to utilize it elsewhere), then the last value can be validated and pushed into the `dump()` function.

![Shows the Parsing Mechanism for Pretty Printing](https://clang.llvm.org/docs/_images/graphviz-2733886182489010eae293ddcc1371d32d58038d.png)

Parsing Mechanism[¶](#parsing "Link to this image")

**Note:** Following is a sample code snippet. Actual code may vary over time.

llvm::Error Interpreter::ParseAndExecute(llvm::StringRef Code, Value \*V) {

auto PTU = Parse(Code);
if (!PTU)
    return PTU.takeError();
if (PTU->TheModule)
    if (llvm::Error Err = Execute(\*PTU))
    return Err;

if (LastValue.isValid()) {
    if (!V) {
    LastValue.dump();
    LastValue.clear();
    } else
    \*V = std::move(LastValue);
}
return llvm::Error::success();
}

The `dump()` function (in `value.cpp`) calls the `print()` function.

Printing the Data and Type are handled in their respective functions: `ReplPrintDataImpl()` and `ReplPrintTypeImpl()`.

### Annotation Token (annot\_repl\_input\_end)[¶](#annotation-token-annot-repl-input-end "Link to this heading")

This feature uses a new token (`annot_repl_input_end`) to consider printing the value of an expression if it doesn’t end with a semicolon. When parsing an Expression Statement, if the last semicolon is missing, then the code will pretend that there one and set a marker there for later utilization, and continue parsing.

A semicolon is normally required in C++, but this feature expands the C++ syntax to handle cases where a missing semicolon is expected (i.e., when handling an expression statement). It also makes sure that an error is not generated for the missing semicolon in this specific case.

This is accomplished by identifying the end position of the user input (expression statement). This helps store and return the expression statement effectively, so that it can be printed (displayed to the user automatically).

**Note:** This logic is only available for C++ for now, since part of the implementation itself requires C++ features. Future versions may support more languages.

Token \*CurTok = nullptr;
// If the semicolon is missing at the end of REPL input, consider if
// we want to do value printing. Note this is only enabled in C++ mode
// since part of the implementation requires C++ language features.
// Note we shouldn't eat the token since the callback needs it.
if (Tok.is(tok::annot\_repl\_input\_end) && Actions.getLangOpts().CPlusPlus)
  CurTok = &Tok;
else
  // Otherwise, eat the semicolon.
  ExpectAndConsumeSemi(diag::err\_expected\_semi\_after\_expr);

StmtResult R = handleExprStmt(Expr, StmtCtx);
if (CurTok && !R.isInvalid())
  CurTok->setAnnotationValue(R.get());

return R;
  }

### AST Transformation[¶](#ast-transformation "Link to this heading")

When Sema encounters the `annot_repl_input_end` token, it knows to transform the AST before the real CodeGen process. It will consume the token and set a ‘semi missing’ bit in the respective decl.

if (Tok.is(tok::annot\_repl\_input\_end) &&
    Tok.getAnnotationValue() != nullptr) {
    ConsumeAnnotationToken();
    cast<TopLevelStmtDecl>(DeclsInGroup.back())->setSemiMissing();
}

In the AST Consumer, traverse all the Top Level Decls, to look for expressions to synthesize. If the current Decl is the Top Level Statement Decl(`TopLevelStmtDecl`) and has a semicolon missing, then ask the interpreter to synthesize another expression (an internal function call) to replace this original expression.

### Detailed RFC and Discussion:[¶](#detailed-rfc-and-discussion "Link to this heading")

For more technical details, community discussion and links to patches related to these features, Please visit: [RFC on LLVM Discourse](https://discourse.llvm.org/t/rfc-handle-execution-results-in-clang-repl/68493).

Some logic presented in the RFC (e.g. ValueGetter()) may be outdated, compared to the final developed solution.
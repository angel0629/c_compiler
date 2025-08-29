---
title: "Clang Plugins — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangPlugins.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
Clang Plugins make it possible to run extra user defined actions during a compilation. This document will provide a basic walkthrough of how to write and run a Clang Plugin.

Introduction[¶](#introduction "Link to this heading")
-----------------------------------------------------

Clang Plugins run FrontendActions over code. See the [FrontendAction tutorial](https://clang.llvm.org/docs/RAVFrontendAction.html) on how to write a `FrontendAction` using the `RecursiveASTVisitor`. In this tutorial, we’ll demonstrate how to write a simple clang plugin.

Writing a `PluginASTAction`[¶](#writing-a-pluginastaction "Link to this heading")
---------------------------------------------------------------------------------

The main difference from writing normal `FrontendActions` is that you can handle plugin command line options. The `PluginASTAction` base class declares a `ParseArgs` method which you have to implement in your plugin.

bool ParseArgs(const CompilerInstance &CI,
               const std::vector<std::string\>& args) {
  for (unsigned i \= 0, e \= args.size(); i != e; ++i) {
    if (args\[i\] \== "-some-arg") {
      // Handle the command line argument.
    }
  }
  return true;
}

Registering a plugin[¶](#registering-a-plugin "Link to this heading")
---------------------------------------------------------------------

A plugin is loaded from a dynamic library at runtime by the compiler. To register a plugin in a library, use `FrontendPluginRegistry::Add<>`:

static FrontendPluginRegistry::Add<MyPlugin\> X("my-plugin-name", "my plugin description");

Defining pragmas[¶](#defining-pragmas "Link to this heading")
-------------------------------------------------------------

Plugins can also define pragmas by declaring a `PragmaHandler` and registering it using `PragmaHandlerRegistry::Add<>`:

// Define a pragma handler for #pragma example\_pragma
class ExamplePragmaHandler : public PragmaHandler {
public:
  ExamplePragmaHandler() : PragmaHandler("example\_pragma") { }
  void HandlePragma(Preprocessor &PP, PragmaIntroducer Introducer,
                    Token &PragmaTok) {
    // Handle the pragma
  }
};

static PragmaHandlerRegistry::Add<ExamplePragmaHandler\> Y("example\_pragma","example pragma description");

Defining attributes[¶](#defining-attributes "Link to this heading")
-------------------------------------------------------------------

Plugins can define attributes by declaring a `ParsedAttrInfo` and registering it using `ParsedAttrInfoRegister::Add<>`:

class ExampleAttrInfo : public ParsedAttrInfo {
public:
  ExampleAttrInfo() {
    Spellings.push\_back({ParsedAttr::AS\_GNU,"example"});
  }
  AttrHandling handleDeclAttribute(Sema &S, Decl \*D,
                                   const ParsedAttr &Attr) const override {
    // Handle the attribute
    return AttributeApplied;
  }
};

static ParsedAttrInfoRegistry::Add<ExampleAttrInfo\> Z("example\_attr","example attribute description");

The members of `ParsedAttrInfo` that a plugin attribute must define are:

> *   `Spellings`, which must be populated with every [Spelling](https://clang.llvm.org/doxygen/structclang_1_1ParsedAttrInfo_1_1Spelling.html) of the attribute, each of which consists of an attribute syntax and how the attribute name is spelled for that syntax. If the syntax allows a scope then the spelling must be “scope::attr” if a scope is present or “::attr” if not.
>     

The members of `ParsedAttrInfo` that may need to be defined, depending on the attribute, are:

> *   `NumArgs` and `OptArgs`, which set the number of required and optional arguments to the attribute.
>     
> *   `diagAppertainsToDecl`, which checks if the attribute has been used on the right kind of declaration and issues a diagnostic if not.
>     
> *   `handleDeclAttribute`, which is the function that applies the attribute to a declaration. It is responsible for checking that the attribute’s arguments are valid, and typically applies the attribute by adding an `Attr` to the `Decl`. It returns either `AttributeApplied`, to indicate that the attribute was successfully applied, or `AttributeNotApplied` if it wasn’t.
>     
> *   `diagAppertainsToStmt`, which checks if the attribute has been used on the right kind of statement and issues a diagnostic if not.
>     
> *   `handleStmtAttribute`, which is the function that applies the attribute to a statement. It is responsible for checking that the attribute’s arguments are valid, and typically applies the attribute by adding an `Attr` to the `Stmt`. It returns either `AttributeApplied`, to indicate that the attribute was successfully applied, or `AttributeNotApplied` if it wasn’t.
>     
> *   `diagLangOpts`, which checks if the attribute is permitted for the current language mode and issues a diagnostic if not.
>     
> *   `existsInTarget`, which checks if the attribute is permitted for the given target.
>     

To see a working example of an attribute plugin, see [the Attribute.cpp example](https://github.com/llvm/llvm-project/blob/main/clang/examples/Attribute/Attribute.cpp).

Putting it all together[¶](#putting-it-all-together "Link to this heading")
---------------------------------------------------------------------------

Let’s look at an example plugin that prints top-level function names. This example is checked into the clang repository; please take a look at the [latest version of PrintFunctionNames.cpp](https://github.com/llvm/llvm-project/blob/main/clang/examples/PrintFunctionNames/PrintFunctionNames.cpp).

Running the plugin[¶](#running-the-plugin "Link to this heading")
-----------------------------------------------------------------

### Using the compiler driver[¶](#using-the-compiler-driver "Link to this heading")

The Clang driver accepts the \-fplugin option to load a plugin. Clang plugins can receive arguments from the compiler driver command line via the fplugin-arg-<plugin name>-<argument> option. Using this method, the plugin name cannot contain dashes itself, but the argument passed to the plugin can.

$ export BD\=/path/to/build/directory
$ make \-C $BD CallSuperAttr
$ clang++ \-fplugin\=$BD/lib/CallSuperAttr.so \\
          \-fplugin-arg-call\_super\_plugin-help \\
          test.cpp

If your plugin name contains dashes, either rename the plugin or used the cc1 command line options listed below.

### Using the cc1 command line[¶](#using-the-cc1-command-line "Link to this heading")

To run a plugin, the dynamic library containing the plugin registry must be loaded via the \-load command line option. This will load all plugins that are registered, and you can select the plugins to run by specifying the \-plugin option. Additional parameters for the plugins can be passed with \-plugin-arg-<plugin-name>.

Note that those options must reach clang’s cc1 process. There are two ways to do so:

*   Directly call the parsing process by using the \-cc1 option; this has the downside of not configuring the default header search paths, so you’ll need to specify the full system path configuration on the command line.
    
*   Use clang as usual, but prefix all arguments to the cc1 process with \-Xclang.
    

For example, to run the `print-function-names` plugin over a source file in clang, first build the plugin, and then call clang with the plugin from the source tree:

$ export BD\=/path/to/build/directory
$ (cd $BD && make PrintFunctionNames )
$ clang++ \-D\_GNU\_SOURCE \-D\_DEBUG \-D\_\_STDC\_CONSTANT\_MACROS \\
          \-D\_\_STDC\_FORMAT\_MACROS \-D\_\_STDC\_LIMIT\_MACROS \-D\_GNU\_SOURCE \\
          \-I$BD/tools/clang/include \-Itools/clang/include \-I$BD/include \-Iinclude \\
          tools/clang/tools/clang-check/ClangCheck.cpp \-fsyntax-only \\
          \-Xclang \-load \-Xclang $BD/lib/PrintFunctionNames.so \-Xclang \\
          \-plugin \-Xclang print-fns

Also see the print-function-name plugin example’s [README](https://github.com/llvm/llvm-project/blob/main/clang/examples/PrintFunctionNames/README.txt)

### Using the clang command line[¶](#using-the-clang-command-line "Link to this heading")

Using \-fplugin=plugin on the clang command line passes the plugin through as an argument to \-load on the cc1 command line. If the plugin class implements the `getActionType` method then the plugin is run automatically. For example, to run the plugin automatically after the main AST action (i.e. the same as using \-add-plugin):

// Automatically run the plugin after the main AST action
PluginASTAction::ActionType getActionType() override {
  return AddAfterMainAction;
}

### Interaction with `-clear-ast-before-backend`[¶](#interaction-with-clear-ast-before-backend "Link to this heading")

To reduce peak memory usage of the compiler, plugins are recommended to run _before_ the main action, which is usually code generation. This is because having any plugins that run after the codegen action automatically turns off `-clear-ast-before-backend`. `-clear-ast-before-backend` reduces peak memory by clearing the Clang AST after generating IR and before running IR optimizations. Use `CmdlineBeforeMainAction` or `AddBeforeMainAction` as `getActionType` to run plugins while still benefitting from `-clear-ast-before-backend`. Plugins must make sure not to modify the AST, otherwise they should run after the main action.
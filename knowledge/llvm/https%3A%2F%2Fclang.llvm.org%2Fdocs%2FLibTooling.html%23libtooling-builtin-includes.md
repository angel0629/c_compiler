---
title: "LibTooling — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/LibTooling.html#libtooling-builtin-includes"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
LibTooling is a library to support writing standalone tools based on Clang. This document will provide a basic walkthrough of how to write a tool using LibTooling.

For the information on how to setup Clang Tooling for LLVM see [How To Setup Clang Tooling For LLVM](https://clang.llvm.org/docs/HowToSetupToolingForLLVM.html)

Introduction[¶](#introduction "Link to this heading")
-----------------------------------------------------

Tools built with LibTooling, like Clang Plugins, run `FrontendActions` over code.

In this tutorial, we’ll demonstrate the different ways of running Clang’s `SyntaxOnlyAction`, which runs a quick syntax check, over a bunch of code.

Parsing a code snippet in memory[¶](#parsing-a-code-snippet-in-memory "Link to this heading")
---------------------------------------------------------------------------------------------

If you ever wanted to run a `FrontendAction` over some sample code, for example to unit test parts of the Clang AST, `runToolOnCode` is what you looked for. Let me give you an example:

#include "clang/Tooling/Tooling.h"

TEST(runToolOnCode, CanSyntaxCheckCode) {
  // runToolOnCode returns whether the action was correctly run over the
  // given code.
  EXPECT\_TRUE(runToolOnCode(std::make\_unique<clang::SyntaxOnlyAction\>(), "class X {};"));
}

Writing a standalone tool[¶](#writing-a-standalone-tool "Link to this heading")
-------------------------------------------------------------------------------

Once you unit tested your `FrontendAction` to the point where it cannot possibly break, it’s time to create a standalone tool. For a standalone tool to run clang, it first needs to figure out what command line arguments to use for a specified file. To that end we create a `CompilationDatabase`. There are different ways to create a compilation database, and we need to support all of them depending on command-line options. There’s the `CommonOptionsParser` class that takes the responsibility to parse command-line parameters related to compilation databases and inputs, so that all tools share the implementation.

### Parsing common tools options[¶](#parsing-common-tools-options "Link to this heading")

`CompilationDatabase` can be read from a build directory or the command line. Using `CommonOptionsParser` allows for explicit specification of a compile command line, specification of build path using the `-p` command-line option, and automatic location of the compilation database using source files paths.

#include "clang/Tooling/CommonOptionsParser.h"
#include "llvm/Support/CommandLine.h"

using namespace clang::tooling;
using namespace llvm;

// Apply a custom category to all command-line options so that they are the
// only ones displayed.
static cl::OptionCategory MyToolCategory("my-tool options");

int main(int argc, const char \*\*argv) {
  // CommonOptionsParser::create will parse arguments and create a
  // CompilationDatabase.
  auto ExpectedParser \= CommonOptionsParser::create(argc, argv, MyToolCategory);
  if (!ExpectedParser) {
    // Fail gracefully for unsupported options.
    llvm::errs() << ExpectedParser.takeError();
    return 1;
  }
  CommonOptionsParser& OptionsParser \= ExpectedParser.get();

  // Use OptionsParser.getCompilations() and OptionsParser.getSourcePathList()
  // to retrieve CompilationDatabase and the list of input file paths.
}

### Creating and running a ClangTool[¶](#creating-and-running-a-clangtool "Link to this heading")

Once we have a `CompilationDatabase`, we can create a `ClangTool` and run our `FrontendAction` over some code. For example, to run the `SyntaxOnlyAction` over the files “a.cc” and “b.cc” one would write:

// A clang tool can run over a number of sources in the same process...
std::vector<std::string\> Sources;
Sources.push\_back("a.cc");
Sources.push\_back("b.cc");

// We hand the CompilationDatabase we created and the sources to run over into
// the tool constructor.
ClangTool Tool(OptionsParser.getCompilations(), Sources);

// The ClangTool needs a new FrontendAction for each translation unit we run
// on.  Thus, it takes a FrontendActionFactory as parameter.  To create a
// FrontendActionFactory from a given FrontendAction type, we call
// newFrontendActionFactory<clang::SyntaxOnlyAction>().
int result \= Tool.run(newFrontendActionFactory<clang::SyntaxOnlyAction\>().get());

### Putting it together — the first tool[¶](#putting-it-together-the-first-tool "Link to this heading")

Now we combine the two previous steps into our first real tool. A more advanced version of this example tool is also checked into the clang tree at `tools/clang-check/ClangCheck.cpp`.

// Declares clang::SyntaxOnlyAction.
#include "clang/Frontend/FrontendActions.h"
#include "clang/Tooling/CommonOptionsParser.h"
#include "clang/Tooling/Tooling.h"
// Declares llvm::cl::extrahelp.
#include "llvm/Support/CommandLine.h"

using namespace clang::tooling;
using namespace llvm;

// Apply a custom category to all command-line options so that they are the
// only ones displayed.
static cl::OptionCategory MyToolCategory("my-tool options");

// CommonOptionsParser declares HelpMessage with a description of the common
// command-line options related to the compilation database and input files.
// It's nice to have this help message in all tools.
static cl::extrahelp CommonHelp(CommonOptionsParser::HelpMessage);

// A help message for this specific tool can be added afterwards.
static cl::extrahelp MoreHelp("\\nMore help text...\\n");

int main(int argc, const char \*\*argv) {
  auto ExpectedParser \= CommonOptionsParser::create(argc, argv, MyToolCategory);
  if (!ExpectedParser) {
    llvm::errs() << ExpectedParser.takeError();
    return 1;
  }
  CommonOptionsParser& OptionsParser \= ExpectedParser.get();
  ClangTool Tool(OptionsParser.getCompilations(),
                 OptionsParser.getSourcePathList());
  return Tool.run(newFrontendActionFactory<clang::SyntaxOnlyAction\>().get());
}

### Running the tool on some code[¶](#running-the-tool-on-some-code "Link to this heading")

When you check out and build clang, clang-check is already built and available to you in bin/clang-check inside your build directory.

You can run clang-check on a file in the llvm repository by specifying all the needed parameters after a “`--`” separator:

$ cd /path/to/source/llvm
$ export BD\=/path/to/build/llvm
$ $BD/bin/clang-check tools/clang/tools/clang-check/ClangCheck.cpp \-- \\
      clang++ \-D\_\_STDC\_CONSTANT\_MACROS \-D\_\_STDC\_LIMIT\_MACROS \\
      \-Itools/clang/include \-I$BD/include \-Iinclude \\
      \-Itools/clang/lib/Headers \-c

As an alternative, you can also configure cmake to output a compile command database into its build directory:

\# Alternatively to calling cmake, use ccmake, toggle to advanced mode and
\# set the parameter CMAKE\_EXPORT\_COMPILE\_COMMANDS from the UI.
$ cmake \-DCMAKE\_EXPORT\_COMPILE\_COMMANDS\=ON .

This creates a file called `compile_commands.json` in the build directory. Now you can run **clang-check** over files in the project by specifying the build path as first argument and some source files as further positional arguments:

$ cd /path/to/source/llvm
$ export BD\=/path/to/build/llvm
$ $BD/bin/clang-check \-p $BD tools/clang/tools/clang-check/ClangCheck.cpp

### Builtin includes[¶](#builtin-includes "Link to this heading")

Clang tools need their builtin headers and search for them the same way Clang does. Thus, the default location to look for builtin headers is in a path `$(dirname /path/to/tool)/../lib/clang/3.3/include` relative to the tool binary. This works out-of-the-box for tools running from llvm’s toplevel binary directory after building clang-resource-headers, or if the tool is running from the binary directory of a clang install next to the clang binary.

Tips: if your tool fails to find `stddef.h` or similar headers, call the tool with `-v` and look at the search paths it looks through.

### Linking[¶](#linking "Link to this heading")

For a list of libraries to link, look at one of the tools’ CMake files (for example [clang-check/CMakeList.txt](https://github.com/llvm/llvm-project/blob/main/clang/tools/clang-check/CMakeLists.txt)).
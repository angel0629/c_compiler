---
title: "Clang-Format Style Options — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangFormatStyleOptions.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
[Clang-Format Style Options](#) describes configurable formatting style options supported by [LibFormat](https://clang.llvm.org/docs/LibFormat.html) and [ClangFormat](https://clang.llvm.org/docs/ClangFormat.html).

When using **clang-format** command line utility or `clang::format::reformat(...)` functions from code, one can either use one of the predefined styles (LLVM, Google, Chromium, Mozilla, WebKit, Microsoft) or create a custom style by configuring specific style options.

Configuring Style with clang-format[¶](#configuring-style-with-clang-format "Link to this heading")
---------------------------------------------------------------------------------------------------

**clang-format** supports two ways to provide custom style options: directly specify style configuration in the `-style=` command line option or use `-style=file` and put style configuration in the `.clang-format` or `_clang-format` file in the project directory.

When using `-style=file`, **clang-format** for each input file will try to find the `.clang-format` file located in the closest parent directory of the input file. When the standard input is used, the search is started from the current directory.

When using `-style=file:<format_file_path>`, **clang-format** for each input file will use the format file located at <format\_file\_path>. The path may be absolute or relative to the working directory.

The `.clang-format` file uses YAML format:

key1: value1
key2: value2
\# A comment.
...

The configuration file can consist of several sections each having different `Language:` parameter denoting the programming language this section of the configuration is targeted at. See the description of the **Language** option below for the list of supported languages. The first section may have no language set, it will set the default style options for all languages. Configuration sections for specific language will override options set in the default section.

When **clang-format** formats a file, it auto-detects the language using the file name. When formatting standard input or a file that doesn’t have the extension corresponding to its language, `-assume-filename=` option can be used to override the file name **clang-format** uses to detect the language.

An example of a configuration file for multiple languages:

\---
\# We'll use defaults from the LLVM style, but with 4 columns indentation.
BasedOnStyle: LLVM
IndentWidth: 4
\---
Language: Cpp
\# Force pointers to the type for C++.
DerivePointerAlignment: false
PointerAlignment: Left
\---
Language: JavaScript
\# Use 100 columns for JS.
ColumnLimit: 100
\---
Language: Proto
\# Don't format .proto files.
DisableFormat: true
\---
Language: CSharp
\# Use 100 columns for C#.
ColumnLimit: 100
...

An easy way to get a valid `.clang-format` file containing all configuration options of a certain predefined style is:

clang-format -style=llvm -dump-config > .clang-format

When specifying configuration in the `-style=` option, the same configuration is applied for all input files. The format of the configuration is:

\-style='{key1: value1, key2: value2, ...}'

Disabling Formatting on a Piece of Code[¶](#disabling-formatting-on-a-piece-of-code "Link to this heading")
-----------------------------------------------------------------------------------------------------------

Clang-format understands also special comments that switch formatting in a delimited range. The code between a comment `// clang-format off` or `/* clang-format off */` up to a comment `// clang-format on` or `/* clang-format on */` will not be formatted. The comments themselves will be formatted (aligned) normally. Also, a colon (`:`) and additional text may follow `// clang-format off` or `// clang-format on` to explain why clang-format is turned off or back on.

int formatted\_code;
// clang-format off
    void    unformatted\_code  ;
// clang-format on
void formatted\_code\_again;

In addition, the `OneLineFormatOffRegex` option gives you a concise way to disable formatting for all of the lines that match the regular expression.

Configuring Style in Code[¶](#configuring-style-in-code "Link to this heading")
-------------------------------------------------------------------------------

When using `clang::format::reformat(...)` functions, the format is specified by supplying the [clang::format::FormatStyle](https://clang.llvm.org/doxygen/structclang_1_1format_1_1FormatStyle.html) structure.

Configurable Format Style Options[¶](#configurable-format-style-options "Link to this heading")
-----------------------------------------------------------------------------------------------

This section lists the supported style options. Value type is specified for each option. For enumeration types possible values are specified both as a C++ enumeration member (with a prefix, e.g. `LS_Auto`), and as a value usable in the configuration (without a prefix: `Auto`).

**BasedOnStyle** (`String`) [¶](#basedonstyle)

The style used for all options not specifically set in the configuration.

This option is supported only in the **clang-format** configuration (both within `-style='{...}'` and the `.clang-format` file).

Possible values:

*   `LLVM` A style complying with the [LLVM coding standards](https://llvm.org/docs/CodingStandards.html)
    
*   `Google` A style complying with [Google’s C++ style guide](https://google.github.io/styleguide/cppguide.html)
    
*   `Chromium` A style complying with [Chromium’s style guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md)
    
*   `Mozilla` A style complying with [Mozilla’s style guide](https://firefox-source-docs.mozilla.org/code-quality/coding-style/index.html)
    
*   `WebKit` A style complying with [WebKit’s style guide](https://www.webkit.org/coding/coding-style.html)
    
*   `Microsoft` A style complying with [Microsoft’s style guide](https://docs.microsoft.com/en-us/visualstudio/ide/editorconfig-code-style-settings-reference)
    
*   `GNU` A style complying with the [GNU coding standards](https://www.gnu.org/prep/standards/standards.html)
    
*   `InheritParentConfig` Not a real style, but allows to use the `.clang-format` file from the parent directory (or its parent if there is none). If there is no parent file found it falls back to the `fallback` style, and applies the changes to that.
    
    With this option you can overwrite some parts of your main style for your subdirectories. This is also possible through the command line, e.g.: `--style={BasedOnStyle: InheritParentConfig, ColumnLimit: 20}`
    

**AccessModifierOffset** (`Integer`) clang-format 3.3 [¶](#accessmodifieroffset)

The extra indent or outdent of access modifiers, e.g. `public:`.

**AlignAfterOpenBracket** (`BracketAlignmentStyle`) clang-format 3.8 [¶](#alignafteropenbracket)

If `true`, horizontally aligns arguments after an open bracket.

This applies to round brackets (parentheses), angle brackets and square brackets.

Possible values:

*   `BAS_Align` (in configuration: `Align`) Align parameters on the open bracket, e.g.:
    
    someLongFunction(argument1,
                     argument2);
    
*   `BAS_DontAlign` (in configuration: `DontAlign`) Don’t align, instead use `ContinuationIndentWidth`, e.g.:
    
    someLongFunction(argument1,
        argument2);
    
*   `BAS_AlwaysBreak` (in configuration: `AlwaysBreak`) Always break after an open bracket, if the parameters don’t fit on a single line, e.g.:
    
    someLongFunction(
        argument1, argument2);
    
*   `BAS_BlockIndent` (in configuration: `BlockIndent`) Always break after an open bracket, if the parameters don’t fit on a single line. Closing brackets will be placed on a new line. E.g.:
    
    someLongFunction(
        argument1, argument2
    )
    
    Note
    
    This currently only applies to braced initializer lists (when `Cpp11BracedListStyle` is `true`) and parentheses.
    

**AlignArrayOfStructures** (`ArrayInitializerAlignmentStyle`) clang-format 13 [¶](#alignarrayofstructures)

If not `None`, when using initialization for an array of structs aligns the fields into columns.

Note

As of clang-format 15 this option only applied to arrays with equal number of columns per row.

Possible values:

*   `AIAS_Left` (in configuration: `Left`) Align array column and left justify the columns e.g.:
    
    struct test demo\[\] \=
    {
        {56, 23,    "hello"},
        {\-1, 93463, "world"},
        {7,  5,     "!!"   }
    };
    
*   `AIAS_Right` (in configuration: `Right`) Align array column and right justify the columns e.g.:
    
    struct test demo\[\] \=
    {
        {56,    23, "hello"},
        {\-1, 93463, "world"},
        { 7,     5,    "!!"}
    };
    
*   `AIAS_None` (in configuration: `None`) Don’t align array initializer columns.
    

**AlignConsecutiveAssignments** (`AlignConsecutiveStyle`) clang-format 3.8 [¶](#alignconsecutiveassignments)

Style of aligning consecutive assignments.

`Consecutive` will result in formattings like:

int a            \= 1;
int somelongname \= 2;
double c         \= 3;

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveAssignments: AcrossEmptyLines

AlignConsecutiveAssignments:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignConsecutiveBitFields** (`AlignConsecutiveStyle`) clang-format 11 [¶](#alignconsecutivebitfields)

Style of aligning consecutive bit fields.

`Consecutive` will align the bitfield separators of consecutive lines. This will result in formattings like:

int aaaa : 1;
int b    : 12;
int ccc  : 8;

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveBitFields: AcrossEmptyLines

AlignConsecutiveBitFields:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignConsecutiveDeclarations** (`AlignConsecutiveStyle`) clang-format 3.8 [¶](#alignconsecutivedeclarations)

Style of aligning consecutive declarations.

`Consecutive` will align the declaration names of consecutive lines. This will result in formattings like:

int         aaaa \= 12;
float       b \= 23;
std::string ccc;

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveDeclarations: AcrossEmptyLines

AlignConsecutiveDeclarations:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignConsecutiveMacros** (`AlignConsecutiveStyle`) clang-format 9 [¶](#alignconsecutivemacros)

Style of aligning consecutive macro definitions.

`Consecutive` will result in formattings like:

#define SHORT\_NAME       42
#define LONGER\_NAME      0x007f
#define EVEN\_LONGER\_NAME (2)
#define foo(x)           (x \* x)
#define bar(y, z)        (y + z)

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveMacros: AcrossEmptyLines

AlignConsecutiveMacros:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignConsecutiveShortCaseStatements** (`ShortCaseStatementsAlignmentStyle`) clang-format 17 [¶](#alignconsecutiveshortcasestatements)

Style of aligning consecutive short case labels. Only applies if `AllowShortCaseExpressionOnASingleLine` or `AllowShortCaseLabelsOnASingleLine` is `true`.

\# Example of usage:
AlignConsecutiveShortCaseStatements:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: true
  AlignCaseColons: false

Nested configuration flags:

Alignment options.

*   `bool Enabled` Whether aligning is enabled.
    
    true:
    switch (level) {
    case log::info:    return "info:";
    case log::warning: return "warning:";
    default:           return "";
    }
    
    false:
    switch (level) {
    case log::info: return "info:";
    case log::warning: return "warning:";
    default: return "";
    }
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    switch (level) {
    case log::info:    return "info:";
    case log::warning: return "warning:";
    
    default:           return "";
    }
    
    false:
    switch (level) {
    case log::info:    return "info:";
    case log::warning: return "warning:";
    
    default: return "";
    }
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    switch (level) {
    case log::info:    return "info:";
    case log::warning: return "warning:";
    /\* A comment. \*/
    default:           return "";
    }
    
    false:
    switch (level) {
    case log::info:    return "info:";
    case log::warning: return "warning:";
    /\* A comment. \*/
    default: return "";
    }
    
*   `bool AlignCaseArrows` Whether to align the case arrows when aligning short case expressions.
    
    true:
    i \= switch (day) {
      case THURSDAY, SATURDAY \-> 8;
      case WEDNESDAY          \-> 9;
      default                 \-> 0;
    };
    
    false:
    i \= switch (day) {
      case THURSDAY, SATURDAY \-> 8;
      case WEDNESDAY \->          9;
      default \->                 0;
    };
    
*   `bool AlignCaseColons` Whether aligned case labels are aligned on the colon, or on the tokens after the colon.
    
    true:
    switch (level) {
    case log::info   : return "info:";
    case log::warning: return "warning:";
    default          : return "";
    }
    
    false:
    switch (level) {
    case log::info:    return "info:";
    case log::warning: return "warning:";
    default:           return "";
    }
    

**AlignConsecutiveTableGenBreakingDAGArgColons** (`AlignConsecutiveStyle`) clang-format 19 [¶](#alignconsecutivetablegenbreakingdagargcolons)

Style of aligning consecutive TableGen DAGArg operator colons. If enabled, align the colon inside DAGArg which have line break inside. This works only when TableGenBreakInsideDAGArg is BreakElements or BreakAll and the DAGArg is not excepted by TableGenBreakingDAGArgOperators’s effect.

let dagarg \= (ins
    a  :$src1,
    aa :$src2,
    aaa:$src3
)

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveTableGenBreakingDAGArgColons: AcrossEmptyLines

AlignConsecutiveTableGenBreakingDAGArgColons:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignConsecutiveTableGenCondOperatorColons** (`AlignConsecutiveStyle`) clang-format 19 [¶](#alignconsecutivetablegencondoperatorcolons)

Style of aligning consecutive TableGen cond operator colons. Align the colons of cases inside !cond operators.

!cond(!eq(size, 1) : 1,
      !eq(size, 16): 1,
      true         : 0)

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveTableGenCondOperatorColons: AcrossEmptyLines

AlignConsecutiveTableGenCondOperatorColons:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignConsecutiveTableGenDefinitionColons** (`AlignConsecutiveStyle`) clang-format 19 [¶](#alignconsecutivetablegendefinitioncolons)

Style of aligning consecutive TableGen definition colons. This aligns the inheritance colons of consecutive definitions.

def Def       : Parent {}
def DefDef    : Parent {}
def DefDefDef : Parent {}

Nested configuration flags:

Alignment options.

They can also be read as a whole for compatibility. The choices are:

*   `None`
    
*   `Consecutive`
    
*   `AcrossEmptyLines`
    
*   `AcrossComments`
    
*   `AcrossEmptyLinesAndComments`
    

For example, to align across empty lines and not across comments, either of these work.

AlignConsecutiveTableGenDefinitionColons: AcrossEmptyLines

AlignConsecutiveTableGenDefinitionColons:
  Enabled: true
  AcrossEmptyLines: true
  AcrossComments: false

*   `bool Enabled` Whether aligning is enabled.
    
    #define SHORT\_NAME       42
    #define LONGER\_NAME      0x007f
    #define EVEN\_LONGER\_NAME (2)
    #define foo(x)           (x \* x)
    #define bar(y, z)        (y + z)
    
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int aaaa : 1;
    int b    : 12;
    int ccc  : 8;
    
    int         aaaa \= 12;
    float       b \= 23;
    std::string ccc;
    
*   `bool AcrossEmptyLines` Whether to align across empty lines.
    
    true:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d            \= 3;
    
    false:
    int a            \= 1;
    int somelongname \= 2;
    double c         \= 3;
    
    int d \= 3;
    
*   `bool AcrossComments` Whether to align across comments.
    
    true:
    int d    \= 3;
    /\* A comment. \*/
    double e \= 4;
    
    false:
    int d \= 3;
    /\* A comment. \*/
    double e \= 4;
    
*   `bool AlignCompound` Only for `AlignConsecutiveAssignments`. Whether compound assignments like `+=` are aligned along with `=`.
    
    true:
    a   &= 2;
    bbb  \= 2;
    
    false:
    a &= 2;
    bbb \= 2;
    
*   `bool AlignFunctionDeclarations` Only for `AlignConsecutiveDeclarations`. Whether function declarations are aligned.
    
    true:
    unsigned int f1(void);
    void         f2(void);
    size\_t       f3(void);
    
    false:
    unsigned int f1(void);
    void f2(void);
    size\_t f3(void);
    
*   `bool AlignFunctionPointers` Only for `AlignConsecutiveDeclarations`. Whether function pointers are aligned.
    
    true:
    unsigned i;
    int     &r;
    int     \*p;
    int      (\*f)();
    
    false:
    unsigned i;
    int     &r;
    int     \*p;
    int (\*f)();
    
*   `bool PadOperators` Only for `AlignConsecutiveAssignments`. Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.
    
    true:
    a   \>>= 2;
    bbb   \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    
    false:
    a \>>= 2;
    bbb \= 2;
    
    a     \= 2;
    bbb \>>= 2;
    

**AlignEscapedNewlines** (`EscapedNewlineAlignmentStyle`) clang-format 5 [¶](#alignescapednewlines)

Options for aligning backslashes in escaped newlines.

Possible values:

*   `ENAS_DontAlign` (in configuration: `DontAlign`) Don’t align escaped newlines.
    
    #define A \\
      int aaaa; \\
      int b; \\
      int dddddddddd;
    
*   `ENAS_Left` (in configuration: `Left`) Align escaped newlines as far left as possible.
    
    #define A   \\
      int aaaa; \\
      int b;    \\
      int dddddddddd;
    
*   `ENAS_LeftWithLastLine` (in configuration: `LeftWithLastLine`) Align escaped newlines as far left as possible, using the last line of the preprocessor directive as the reference if it’s the longest.
    
    #define A         \\
      int aaaa;       \\
      int b;          \\
      int dddddddddd;
    
*   `ENAS_Right` (in configuration: `Right`) Align escaped newlines in the right-most column.
    
    #define A                                                            \\
      int aaaa;                                                          \\
      int b;                                                             \\
      int dddddddddd;
    

**AlignOperands** (`OperandAlignmentStyle`) clang-format 3.5 [¶](#alignoperands)

If `true`, horizontally align operands of binary and ternary expressions.

Possible values:

*   `OAS_DontAlign` (in configuration: `DontAlign`) Do not align operands of binary and ternary expressions. The wrapped lines are indented `ContinuationIndentWidth` spaces from the start of the line.
    
*   `OAS_Align` (in configuration: `Align`) Horizontally align operands of binary and ternary expressions.
    
    Specifically, this aligns operands of a single expression that needs to be split over multiple lines, e.g.:
    
    int aaa \= bbbbbbbbbbbbbbb +
              ccccccccccccccc;
    
    When `BreakBeforeBinaryOperators` is set, the wrapped operator is aligned with the operand on the first line.
    
    int aaa \= bbbbbbbbbbbbbbb
              + ccccccccccccccc;
    
*   `OAS_AlignAfterOperator` (in configuration: `AlignAfterOperator`) Horizontally align operands of binary and ternary expressions.
    
    This is similar to `OAS_Align`, except when `BreakBeforeBinaryOperators` is set, the operator is un-indented so that the wrapped operand is aligned with the operand on the first line.
    
    int aaa \= bbbbbbbbbbbbbbb
            + ccccccccccccccc;
    

**AllowAllArgumentsOnNextLine** (`Boolean`) clang-format 9 [¶](#allowallargumentsonnextline)

If a function call or braced initializer list doesn’t fit on a line, allow putting all arguments onto the next line, even if `BinPackArguments` is `false`.

true:
callFunction(
    a, b, c, d);

false:
callFunction(a,
             b,
             c,
             d);

**AllowAllConstructorInitializersOnNextLine** (`Boolean`) clang-format 9 [¶](#allowallconstructorinitializersonnextline)

This option is **deprecated**. See `NextLine` of `PackConstructorInitializers`.

**AllowAllParametersOfDeclarationOnNextLine** (`Boolean`) clang-format 3.3 [¶](#allowallparametersofdeclarationonnextline)

If the function declaration doesn’t fit on a line, allow putting all parameters of a function declaration onto the next line even if `BinPackParameters` is `OnePerLine`.

true:
void myFunction(
    int a, int b, int c, int d, int e);

false:
void myFunction(int a,
                int b,
                int c,
                int d,
                int e);

**AllowBreakBeforeNoexceptSpecifier** (`BreakBeforeNoexceptSpecifierStyle`) clang-format 18 [¶](#allowbreakbeforenoexceptspecifier)

Controls if there could be a line break before a `noexcept` specifier.

Possible values:

*   `BBNSS_Never` (in configuration: `Never`) No line break allowed.
    
    void foo(int arg1,
             double arg2) noexcept;
    
    void bar(int arg1, double arg2) noexcept(
        noexcept(baz(arg1)) &&
        noexcept(baz(arg2)));
    
*   `BBNSS_OnlyWithParen` (in configuration: `OnlyWithParen`) For a simple `noexcept` there is no line break allowed, but when we have a condition it is.
    
    void foo(int arg1,
             double arg2) noexcept;
    
    void bar(int arg1, double arg2)
        noexcept(noexcept(baz(arg1)) &&
                 noexcept(baz(arg2)));
    
*   `BBNSS_Always` (in configuration: `Always`) Line breaks are allowed. But note that because of the associated penalties `clang-format` often prefers not to break before the `noexcept`.
    
    void foo(int arg1,
             double arg2) noexcept;
    
    void bar(int arg1, double arg2)
        noexcept(noexcept(baz(arg1)) &&
                 noexcept(baz(arg2)));
    

**AllowShortBlocksOnASingleLine** (`ShortBlockStyle`) clang-format 3.5 [¶](#allowshortblocksonasingleline)

Dependent on the value, `while (true) { continue; }` can be put on a single line.

Possible values:

*   `SBS_Never` (in configuration: `Never`) Never merge blocks into a single line.
    
    while (true) {
    }
    while (true) {
      continue;
    }
    
*   `SBS_Empty` (in configuration: `Empty`) Only merge empty blocks.
    
    while (true) {}
    while (true) {
      continue;
    }
    
*   `SBS_Always` (in configuration: `Always`) Always merge short blocks into a single line.
    
    while (true) {}
    while (true) { continue; }
    

**AllowShortCaseExpressionOnASingleLine** (`Boolean`) clang-format 19 [¶](#allowshortcaseexpressiononasingleline)

Whether to merge a short switch labeled rule into a single line.

true:                               false:
switch (a) {           vs.          switch (a) {
case 1 \-> 1;                        case 1 \->
default \-> 0;                         1;
};                                  default \->
                                      0;
                                    };

**AllowShortCaseLabelsOnASingleLine** (`Boolean`) clang-format 3.6 [¶](#allowshortcaselabelsonasingleline)

If `true`, short case labels will be contracted to a single line.

true:                                   false:
switch (a) {                    vs.     switch (a) {
case 1: x \= 1; break;                   case 1:
case 2: return;                           x \= 1;
}                                         break;
                                        case 2:
                                          return;
                                        }

**AllowShortCompoundRequirementOnASingleLine** (`Boolean`) clang-format 18 [¶](#allowshortcompoundrequirementonasingleline)

Allow short compound requirement on a single line.

true:
template <typename T\>
concept c \= requires(T x) {
  { x + 1 } \-> std::same\_as<int\>;
};

false:
template <typename T\>
concept c \= requires(T x) {
  {
    x + 1
  } \-> std::same\_as<int\>;
};

**AllowShortEnumsOnASingleLine** (`Boolean`) clang-format 11 [¶](#allowshortenumsonasingleline)

Allow short enums on a single line.

true:
enum { A, B } myEnum;

false:
enum {
  A,
  B
} myEnum;

**AllowShortFunctionsOnASingleLine** (`ShortFunctionStyle`) clang-format 3.5 [¶](#allowshortfunctionsonasingleline)

Dependent on the value, `int f() { return 0; }` can be put on a single line.

Possible values:

*   `SFS_None` (in configuration: `None`) Never merge functions into a single line.
    
*   `SFS_InlineOnly` (in configuration: `InlineOnly`) Only merge functions defined inside a class. Same as `inline`, except it does not imply `empty`: i.e. top level empty functions are not merged either.
    
    class Foo {
      void f() { foo(); }
    };
    void f() {
      foo();
    }
    void f() {
    }
    
*   `SFS_Empty` (in configuration: `Empty`) Only merge empty functions.
    
    void f() {}
    void f2() {
      bar2();
    }
    
*   `SFS_Inline` (in configuration: `Inline`) Only merge functions defined inside a class. Implies `empty`.
    
    class Foo {
      void f() { foo(); }
    };
    void f() {
      foo();
    }
    void f() {}
    
*   `SFS_All` (in configuration: `All`) Merge all functions fitting on a single line.
    
    class Foo {
      void f() { foo(); }
    };
    void f() { bar(); }
    

**AllowShortIfStatementsOnASingleLine** (`ShortIfStyle`) clang-format 3.3 [¶](#allowshortifstatementsonasingleline)

Dependent on the value, `if (a) return;` can be put on a single line.

Possible values:

*   `SIS_Never` (in configuration: `Never`) Never put short ifs on the same line.
    
    if (a)
      return;
    
    if (b)
      return;
    else
      return;
    
    if (c)
      return;
    else {
      return;
    }
    
*   `SIS_WithoutElse` (in configuration: `WithoutElse`) Put short ifs on the same line only if there is no else statement.
    
    if (a) return;
    
    if (b)
      return;
    else
      return;
    
    if (c)
      return;
    else {
      return;
    }
    
*   `SIS_OnlyFirstIf` (in configuration: `OnlyFirstIf`) Put short ifs, but not else ifs nor else statements, on the same line.
    
    if (a) return;
    
    if (b) return;
    else if (b)
      return;
    else
      return;
    
    if (c) return;
    else {
      return;
    }
    
*   `SIS_AllIfsAndElse` (in configuration: `AllIfsAndElse`) Always put short ifs, else ifs and else statements on the same line.
    
    if (a) return;
    
    if (b) return;
    else return;
    
    if (c) return;
    else {
      return;
    }
    

**AllowShortLambdasOnASingleLine** (`ShortLambdaStyle`) clang-format 9 [¶](#allowshortlambdasonasingleline)

Dependent on the value, `auto lambda []() { return 0; }` can be put on a single line.

Possible values:

*   `SLS_None` (in configuration: `None`) Never merge lambdas into a single line.
    
*   `SLS_Empty` (in configuration: `Empty`) Only merge empty lambdas.
    
    auto lambda \= \[\](int a) {};
    auto lambda2 \= \[\](int a) {
        return a;
    };
    
*   `SLS_Inline` (in configuration: `Inline`) Merge lambda into a single line if the lambda is argument of a function.
    
    auto lambda \= \[\](int x, int y) {
        return x < y;
    };
    sort(a.begin(), a.end(), \[\](int x, int y) { return x < y; });
    
*   `SLS_All` (in configuration: `All`) Merge all lambdas fitting on a single line.
    
    auto lambda \= \[\](int a) {};
    auto lambda2 \= \[\](int a) { return a; };
    

**AllowShortLoopsOnASingleLine** (`Boolean`) clang-format 3.7 [¶](#allowshortloopsonasingleline)

If `true`, `while (true) continue;` can be put on a single line.

**AllowShortNamespacesOnASingleLine** (`Boolean`) clang-format 20 [¶](#allowshortnamespacesonasingleline)

If `true`, `namespace a { class b; }` can be put on a single line.

**AlwaysBreakAfterDefinitionReturnType** (`DefinitionReturnTypeBreakingStyle`) clang-format 3.7 [¶](#alwaysbreakafterdefinitionreturntype)

The function definition return type breaking style to use. This option is **deprecated** and is retained for backwards compatibility.

Possible values:

*   `DRTBS_None` (in configuration: `None`) Break after return type automatically. `PenaltyReturnTypeOnItsOwnLine` is taken into account.
    
*   `DRTBS_All` (in configuration: `All`) Always break after the return type.
    
*   `DRTBS_TopLevel` (in configuration: `TopLevel`) Always break after the return types of top-level functions.
    

**AlwaysBreakAfterReturnType** (`deprecated`) clang-format 3.8 [¶](#alwaysbreakafterreturntype)

This option is renamed to `BreakAfterReturnType`.

**AlwaysBreakBeforeMultilineStrings** (`Boolean`) clang-format 3.4 [¶](#alwaysbreakbeforemultilinestrings)

If `true`, always break before multiline string literals.

This flag is mean to make cases where there are multiple multiline strings in a file look more consistent. Thus, it will only take effect if wrapping the string at that point leads to it being indented `ContinuationIndentWidth` spaces from the start of the line.

true:                                  false:
aaaa \=                         vs.     aaaa \= "bbbb"
    "bbbb"                                    "cccc";
    "cccc";

**AlwaysBreakTemplateDeclarations** (`deprecated`) clang-format 3.4 [¶](#alwaysbreaktemplatedeclarations)

This option is renamed to `BreakTemplateDeclarations`.

**AttributeMacros** (`List of Strings`) clang-format 12 [¶](#attributemacros)

A vector of strings that should be interpreted as attributes/qualifiers instead of identifiers. This can be useful for language extensions or static analyzer annotations.

For example:

x \= (char \*\_\_capability)&y;
int function(void) \_\_unused;
void only\_writes\_to\_buffer(char \*\_\_output buffer);

In the .clang-format configuration file, this can be configured like:

AttributeMacros: \[\_\_capability, \_\_output, \_\_unused\]

**BinPackArguments** (`Boolean`) clang-format 3.7 [¶](#binpackarguments)

If `false`, a function call’s arguments will either be all on the same line or will have one line each.

true:
void f() {
  f(aaaaaaaaaaaaaaaaaaaa, aaaaaaaaaaaaaaaaaaaa,
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa);
}

false:
void f() {
  f(aaaaaaaaaaaaaaaaaaaa,
    aaaaaaaaaaaaaaaaaaaa,
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa);
}

**BinPackLongBracedList** (`Boolean`) clang-format 21 [¶](#binpacklongbracedlist)

If `BinPackLongBracedList` is `true` it overrides `BinPackArguments` if there are 20 or more items in a braced initializer list.

BinPackLongBracedList: false  vs.    BinPackLongBracedList: true
vector<int\> x{                       vector<int\> x{1, 2, ...,
                                                   20, 21};
            1,
            2,
            ...,
            20,
            21};

**BinPackParameters** (`BinPackParametersStyle`) clang-format 3.7 [¶](#binpackparameters)

The bin pack parameters style to use.

Possible values:

*   `BPPS_BinPack` (in configuration: `BinPack`) Bin-pack parameters.
    
    void f(int a, int bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb,
           int ccccccccccccccccccccccccccccccccccccccccccc);
    
*   `BPPS_OnePerLine` (in configuration: `OnePerLine`) Put all parameters on the current line if they fit. Otherwise, put each one on its own line.
    
    void f(int a, int b, int c);
    
    void f(int a,
           int b,
           int ccccccccccccccccccccccccccccccccccccc);
    
*   `BPPS_AlwaysOnePerLine` (in configuration: `AlwaysOnePerLine`) Always put each parameter on its own line.
    
    void f(int a,
           int b,
           int c);
    

**BitFieldColonSpacing** (`BitFieldColonSpacingStyle`) clang-format 12 [¶](#bitfieldcolonspacing)

The BitFieldColonSpacingStyle to use for bitfields.

Possible values:

*   `BFCS_Both` (in configuration: `Both`) Add one space on each side of the `:`
    
    unsigned bf : 2;
    
*   `BFCS_None` (in configuration: `None`) Add no space around the `:` (except when needed for `AlignConsecutiveBitFields`).
    
    unsigned bf:2;
    
*   `BFCS_Before` (in configuration: `Before`) Add space before the `:` only
    
    unsigned bf :2;
    
*   `BFCS_After` (in configuration: `After`) Add space after the `:` only (space may be added before if needed for `AlignConsecutiveBitFields`).
    
    unsigned bf: 2;
    

**BraceWrapping** (`BraceWrappingFlags`) clang-format 3.8 [¶](#bracewrapping)

Control of individual brace wrapping cases.

If `BreakBeforeBraces` is set to `Custom`, use this to specify how each individual brace case should be handled. Otherwise, this is ignored.

\# Example of usage:
BreakBeforeBraces: Custom
BraceWrapping:
  AfterEnum: true
  AfterStruct: false
  SplitEmptyFunction: false

Nested configuration flags:

Precise control over the wrapping of braces.

\# Should be declared this way:
BreakBeforeBraces: Custom
BraceWrapping:
    AfterClass: true

*   `bool AfterCaseLabel` Wrap case labels.
    
    false:                                true:
    switch (foo) {                vs.     switch (foo) {
      case 1: {                             case 1:
        bar();                              {
        break;                                bar();
      }                                       break;
      default: {                            }
        plop();                             default:
      }                                     {
    }                                         plop();
                                            }
                                          }
    
*   `bool AfterClass` Wrap class definitions.
    
    true:
    class foo
    {};
    
    false:
    class foo {};
    
*   `BraceWrappingAfterControlStatementStyle AfterControlStatement` Wrap control statements (`if`/`for`/`while`/`switch`/..).
    
    Possible values:
    
    *   `BWACS_Never` (in configuration: `Never`) Never wrap braces after a control statement.
        
        if (foo()) {
        } else {
        }
        for (int i \= 0; i < 10; ++i) {
        }
        
    *   `BWACS_MultiLine` (in configuration: `MultiLine`) Only wrap braces after a multi-line control statement.
        
        if (foo && bar &&
            baz)
        {
          quux();
        }
        while (foo || bar) {
        }
        
    *   `BWACS_Always` (in configuration: `Always`) Always wrap braces after a control statement.
        
        if (foo())
        {
        } else
        {}
        for (int i \= 0; i < 10; ++i)
        {}
        
*   `bool AfterEnum` Wrap enum definitions.
    
    true:
    enum X : int
    {
      B
    };
    
    false:
    enum X : int { B };
    
*   `bool AfterFunction` Wrap function definitions.
    
    true:
    void foo()
    {
      bar();
      bar2();
    }
    
    false:
    void foo() {
      bar();
      bar2();
    }
    
*   `bool AfterNamespace` Wrap namespace definitions.
    
    true:
    namespace
    {
    int foo();
    int bar();
    }
    
    false:
    namespace {
    int foo();
    int bar();
    }
    
*   `bool AfterObjCDeclaration` Wrap ObjC definitions (interfaces, implementations…).
    
    Note
    
    @autoreleasepool and @synchronized blocks are wrapped according to `AfterControlStatement` flag.
    
*   `bool AfterStruct` Wrap struct definitions.
    
    true:
    struct foo
    {
      int x;
    };
    
    false:
    struct foo {
      int x;
    };
    
*   `bool AfterUnion` Wrap union definitions.
    
    true:
    union foo
    {
      int x;
    }
    
    false:
    union foo {
      int x;
    }
    
*   `bool AfterExternBlock` Wrap extern blocks.
    
    true:
    extern "C"
    {
      int foo();
    }
    
    false:
    extern "C" {
    int foo();
    }
    
*   `bool BeforeCatch` Wrap before `catch`.
    
    true:
    try {
      foo();
    }
    catch () {
    }
    
    false:
    try {
      foo();
    } catch () {
    }
    
*   `bool BeforeElse` Wrap before `else`.
    
    true:
    if (foo()) {
    }
    else {
    }
    
    false:
    if (foo()) {
    } else {
    }
    
*   `bool BeforeLambdaBody` Wrap lambda block.
    
    true:
    connect(
      \[\]()
      {
        foo();
        bar();
      });
    
    false:
    connect(\[\]() {
      foo();
      bar();
    });
    
*   `bool BeforeWhile` Wrap before `while`.
    
    true:
    do {
      foo();
    }
    while (1);
    
    false:
    do {
      foo();
    } while (1);
    
*   `bool IndentBraces` Indent the wrapped braces themselves.
    
*   `bool SplitEmptyFunction` If `false`, empty function body can be put on a single line. This option is used only if the opening brace of the function has already been wrapped, i.e. the `AfterFunction` brace wrapping mode is set, and the function could/should not be put on a single line (as per `AllowShortFunctionsOnASingleLine` and constructor formatting options).
    
    false:          true:
    int f()   vs.   int f()
    {}              {
                    }
    
*   `bool SplitEmptyRecord` If `false`, empty record (e.g. class, struct or union) body can be put on a single line. This option is used only if the opening brace of the record has already been wrapped, i.e. the `AfterClass` (for classes) brace wrapping mode is set.
    
    false:           true:
    class Foo   vs.  class Foo
    {}               {
                     }
    
*   `bool SplitEmptyNamespace` If `false`, empty namespace body can be put on a single line. This option is used only if the opening brace of the namespace has already been wrapped, i.e. the `AfterNamespace` brace wrapping mode is set.
    
    false:               true:
    namespace Foo   vs.  namespace Foo
    {}                   {
                         }
    

**BracedInitializerIndentWidth** (`Integer`) clang-format 17 [¶](#bracedinitializerindentwidth)

The number of columns to use to indent the contents of braced init lists. If unset or negative, `ContinuationIndentWidth` is used.

AlignAfterOpenBracket: AlwaysBreak
BracedInitializerIndentWidth: 2

void f() {
  SomeClass c{
    "foo",
    "bar",
    "baz",
  };
  auto s \= SomeStruct{
    .foo \= "foo",
    .bar \= "bar",
    .baz \= "baz",
  };
  SomeArrayT a\[3\] \= {
    {
      foo,
      bar,
    },
    {
      foo,
      bar,
    },
    SomeArrayT{},
  };
}

**BreakAdjacentStringLiterals** (`Boolean`) clang-format 18 [¶](#breakadjacentstringliterals)

Break between adjacent string literals.

true:
return "Code"
       "\\0\\52\\26\\55\\55\\0"
       "x013"
       "\\02\\xBA";
false:
return "Code" "\\0\\52\\26\\55\\55\\0" "x013" "\\02\\xBA";

**BreakAfterAttributes** (`AttributeBreakingStyle`) clang-format 16 [¶](#breakafterattributes)

Break after a group of C++11 attributes before variable or function (including constructor/destructor) declaration/definition names or before control statements, i.e. `if`, `switch` (including `case` and `default` labels), `for`, and `while` statements.

Possible values:

*   `ABS_Always` (in configuration: `Always`) Always break after attributes.
    
    \[\[maybe\_unused\]\]
    const int i;
    \[\[gnu::const\]\] \[\[maybe\_unused\]\]
    int j;
    
    \[\[nodiscard\]\]
    inline int f();
    \[\[gnu::const\]\] \[\[nodiscard\]\]
    int g();
    
    \[\[likely\]\]
    if (a)
      f();
    else
      g();
    
    switch (b) {
    \[\[unlikely\]\]
    case 1:
      ++b;
      break;
    \[\[likely\]\]
    default:
      return;
    }
    
*   `ABS_Leave` (in configuration: `Leave`) Leave the line breaking after attributes as is.
    
    \[\[maybe\_unused\]\] const int i;
    \[\[gnu::const\]\] \[\[maybe\_unused\]\]
    int j;
    
    \[\[nodiscard\]\] inline int f();
    \[\[gnu::const\]\] \[\[nodiscard\]\]
    int g();
    
    \[\[likely\]\] if (a)
      f();
    else
      g();
    
    switch (b) {
    \[\[unlikely\]\] case 1:
      ++b;
      break;
    \[\[likely\]\]
    default:
      return;
    }
    
*   `ABS_Never` (in configuration: `Never`) Never break after attributes.
    
    \[\[maybe\_unused\]\] const int i;
    \[\[gnu::const\]\] \[\[maybe\_unused\]\] int j;
    
    \[\[nodiscard\]\] inline int f();
    \[\[gnu::const\]\] \[\[nodiscard\]\] int g();
    
    \[\[likely\]\] if (a)
      f();
    else
      g();
    
    switch (b) {
    \[\[unlikely\]\] case 1:
      ++b;
      break;
    \[\[likely\]\] default:
      return;
    }
    

**BreakAfterJavaFieldAnnotations** (`Boolean`) clang-format 3.8 [¶](#breakafterjavafieldannotations)

Break after each annotation on a field in Java files.

true:                                  false:
@Partial                       vs.     @Partial @Mock DataLoad loader;
@Mock
DataLoad loader;

**BreakAfterReturnType** (`ReturnTypeBreakingStyle`) clang-format 19 [¶](#breakafterreturntype)

The function declaration return type breaking style to use.

Possible values:

*   `RTBS_None` (in configuration: `None`) This is **deprecated**. See `Automatic` below.
    
*   `RTBS_Automatic` (in configuration: `Automatic`) Break after return type based on `PenaltyReturnTypeOnItsOwnLine`.
    
    class A {
      int f() { return 0; };
    };
    int f();
    int f() { return 1; }
    int
    LongName::AnotherLongName();
    
*   `RTBS_ExceptShortType` (in configuration: `ExceptShortType`) Same as `Automatic` above, except that there is no break after short return types.
    
    class A {
      int f() { return 0; };
    };
    int f();
    int f() { return 1; }
    int LongName::
        AnotherLongName();
    
*   `RTBS_All` (in configuration: `All`) Always break after the return type.
    
    class A {
      int
      f() {
        return 0;
      };
    };
    int
    f();
    int
    f() {
      return 1;
    }
    int
    LongName::AnotherLongName();
    
*   `RTBS_TopLevel` (in configuration: `TopLevel`) Always break after the return types of top-level functions.
    
    class A {
      int f() { return 0; };
    };
    int
    f();
    int
    f() {
      return 1;
    }
    int
    LongName::AnotherLongName();
    
*   `RTBS_AllDefinitions` (in configuration: `AllDefinitions`) Always break after the return type of function definitions.
    
    class A {
      int
      f() {
        return 0;
      };
    };
    int f();
    int
    f() {
      return 1;
    }
    int
    LongName::AnotherLongName();
    
*   `RTBS_TopLevelDefinitions` (in configuration: `TopLevelDefinitions`) Always break after the return type of top-level definitions.
    
    class A {
      int f() { return 0; };
    };
    int f();
    int
    f() {
      return 1;
    }
    int
    LongName::AnotherLongName();
    

**BreakArrays** (`Boolean`) clang-format 16 [¶](#breakarrays)

If `true`, clang-format will always break after a Json array `[` otherwise it will scan until the closing `]` to determine if it should add newlines between elements (prettier compatible).

Note

This is currently only for formatting JSON.

true:                                  false:
\[                          vs.      \[1, 2, 3, 4\]
  1,
  2,
  3,
  4
\]

**BreakBeforeBinaryOperators** (`BinaryOperatorStyle`) clang-format 3.6 [¶](#breakbeforebinaryoperators)

The way to wrap binary operators.

Possible values:

*   `BOS_None` (in configuration: `None`) Break after operators.
    
    LooooooooooongType loooooooooooooooooooooongVariable \=
        someLooooooooooooooooongFunction();
    
    bool value \= aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa +
                         aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \==
                     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa &&
                 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \>
                     ccccccccccccccccccccccccccccccccccccccccc;
    
*   `BOS_NonAssignment` (in configuration: `NonAssignment`) Break before operators that aren’t assignments.
    
    LooooooooooongType loooooooooooooooooooooongVariable \=
        someLooooooooooooooooongFunction();
    
    bool value \= aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                         + aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                     \== aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                 && aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        \> ccccccccccccccccccccccccccccccccccccccccc;
    
*   `BOS_All` (in configuration: `All`) Break before operators.
    
    LooooooooooongType loooooooooooooooooooooongVariable
        \= someLooooooooooooooooongFunction();
    
    bool value \= aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                         + aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                     \== aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                 && aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        \> ccccccccccccccccccccccccccccccccccccccccc;
    

**BreakBeforeBraces** (`BraceBreakingStyle`) clang-format 3.7 [¶](#breakbeforebraces)

The brace breaking style to use.

Possible values:

*   `BS_Attach` (in configuration: `Attach`) Always attach braces to surrounding context.
    
    namespace N {
    enum E {
      E1,
      E2,
    };
    
    class C {
    public:
      C();
    };
    
    bool baz(int i) {
      try {
        do {
          switch (i) {
          case 1: {
            foobar();
            break;
          }
          default: {
            break;
          }
          }
        } while (\--i);
        return true;
      } catch (...) {
        handleError();
        return false;
      }
    }
    
    void foo(bool b) {
      if (b) {
        baz(2);
      } else {
        baz(5);
      }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_Linux` (in configuration: `Linux`) Like `Attach`, but break before braces on function, namespace and class definitions.
    
    namespace N
    {
    enum E {
      E1,
      E2,
    };
    
    class C
    {
    public:
      C();
    };
    
    bool baz(int i)
    {
      try {
        do {
          switch (i) {
          case 1: {
            foobar();
            break;
          }
          default: {
            break;
          }
          }
        } while (\--i);
        return true;
      } catch (...) {
        handleError();
        return false;
      }
    }
    
    void foo(bool b)
    {
      if (b) {
        baz(2);
      } else {
        baz(5);
      }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_Mozilla` (in configuration: `Mozilla`) Like `Attach`, but break before braces on enum, function, and record definitions.
    
    namespace N {
    enum E
    {
      E1,
      E2,
    };
    
    class C
    {
    public:
      C();
    };
    
    bool baz(int i)
    {
      try {
        do {
          switch (i) {
          case 1: {
            foobar();
            break;
          }
          default: {
            break;
          }
          }
        } while (\--i);
        return true;
      } catch (...) {
        handleError();
        return false;
      }
    }
    
    void foo(bool b)
    {
      if (b) {
        baz(2);
      } else {
        baz(5);
      }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_Stroustrup` (in configuration: `Stroustrup`) Like `Attach`, but break before function definitions, `catch`, and `else`.
    
    namespace N {
    enum E {
      E1,
      E2,
    };
    
    class C {
    public:
      C();
    };
    
    bool baz(int i)
    {
      try {
        do {
          switch (i) {
          case 1: {
            foobar();
            break;
          }
          default: {
            break;
          }
          }
        } while (\--i);
        return true;
      }
      catch (...) {
        handleError();
        return false;
      }
    }
    
    void foo(bool b)
    {
      if (b) {
        baz(2);
      }
      else {
        baz(5);
      }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_Allman` (in configuration: `Allman`) Always break before braces.
    
    namespace N
    {
    enum E
    {
      E1,
      E2,
    };
    
    class C
    {
    public:
      C();
    };
    
    bool baz(int i)
    {
      try
      {
        do
        {
          switch (i)
          {
          case 1:
          {
            foobar();
            break;
          }
          default:
          {
            break;
          }
          }
        } while (\--i);
        return true;
      }
      catch (...)
      {
        handleError();
        return false;
      }
    }
    
    void foo(bool b)
    {
      if (b)
      {
        baz(2);
      }
      else
      {
        baz(5);
      }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_Whitesmiths` (in configuration: `Whitesmiths`) Like `Allman` but always indent braces and line up code with braces.
    
    namespace N
      {
    enum E
      {
      E1,
      E2,
      };
    
    class C
      {
    public:
      C();
      };
    
    bool baz(int i)
      {
      try
        {
        do
          {
          switch (i)
            {
            case 1:
            {
            foobar();
            break;
            }
            default:
            {
            break;
            }
            }
          } while (\--i);
        return true;
        }
      catch (...)
        {
        handleError();
        return false;
        }
      }
    
    void foo(bool b)
      {
      if (b)
        {
        baz(2);
        }
      else
        {
        baz(5);
        }
      }
    
    void bar() { foo(true); }
      } // namespace N
    
*   `BS_GNU` (in configuration: `GNU`) Always break before braces and add an extra level of indentation to braces of control statements, not to those of class, function or other definitions.
    
    namespace N
    {
    enum E
    {
      E1,
      E2,
    };
    
    class C
    {
    public:
      C();
    };
    
    bool baz(int i)
    {
      try
        {
          do
            {
              switch (i)
                {
                case 1:
                  {
                    foobar();
                    break;
                  }
                default:
                  {
                    break;
                  }
                }
            }
          while (\--i);
          return true;
        }
      catch (...)
        {
          handleError();
          return false;
        }
    }
    
    void foo(bool b)
    {
      if (b)
        {
          baz(2);
        }
      else
        {
          baz(5);
        }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_WebKit` (in configuration: `WebKit`) Like `Attach`, but break before functions.
    
    namespace N {
    enum E {
      E1,
      E2,
    };
    
    class C {
    public:
      C();
    };
    
    bool baz(int i)
    {
      try {
        do {
          switch (i) {
          case 1: {
            foobar();
            break;
          }
          default: {
            break;
          }
          }
        } while (\--i);
        return true;
      } catch (...) {
        handleError();
        return false;
      }
    }
    
    void foo(bool b)
    {
      if (b) {
        baz(2);
      } else {
        baz(5);
      }
    }
    
    void bar() { foo(true); }
    } // namespace N
    
*   `BS_Custom` (in configuration: `Custom`) Configure each individual brace in `BraceWrapping`.
    

**BreakBeforeConceptDeclarations** (`BreakBeforeConceptDeclarationsStyle`) clang-format 12 [¶](#breakbeforeconceptdeclarations)

The concept declaration style to use.

Possible values:

*   `BBCDS_Never` (in configuration: `Never`) Keep the template declaration line together with `concept`.
    
    template <typename T\> concept C \= ...;
    
*   `BBCDS_Allowed` (in configuration: `Allowed`) Breaking between template declaration and `concept` is allowed. The actual behavior depends on the content and line breaking rules and penalties.
    
*   `BBCDS_Always` (in configuration: `Always`) Always break before `concept`, putting it in the line after the template declaration.
    
    template <typename T\>
    concept C \= ...;
    

**BreakBeforeInlineASMColon** (`BreakBeforeInlineASMColonStyle`) clang-format 16 [¶](#breakbeforeinlineasmcolon)

The inline ASM colon style to use.

Possible values:

*   `BBIAS_Never` (in configuration: `Never`) No break before inline ASM colon.
    
    asm volatile("string", : : val);
    
*   `BBIAS_OnlyMultiline` (in configuration: `OnlyMultiline`) Break before inline ASM colon if the line length is longer than column limit.
    
    asm volatile("string", : : val);
    asm("cmoveq %1, %2, %\[result\]"
        : \[result\] "=r"(result)
        : "r"(test), "r"(new), "\[result\]"(old));
    
*   `BBIAS_Always` (in configuration: `Always`) Always break before inline ASM colon.
    
    asm volatile("string",
                 :
                 : val);
    

**BreakBeforeTemplateCloser** (`Boolean`) clang-format 21 [¶](#breakbeforetemplatecloser)

If `true`, break before a template closing bracket (`>`) when there is a line break after the matching opening bracket (`<`).

true:
template <typename Foo, typename Bar\>

template <typename Foo,
          typename Bar\>

template <
    typename Foo,
    typename Bar
\>

false:
template <typename Foo, typename Bar\>

template <typename Foo,
          typename Bar\>

template <
    typename Foo,
    typename Bar\>

**BreakBeforeTernaryOperators** (`Boolean`) clang-format 3.7 [¶](#breakbeforeternaryoperators)

If `true`, ternary operators will be placed after line breaks.

true:
veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongDescription
    ? firstValue
    : SecondValueVeryVeryVeryVeryLong;

false:
veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongDescription ?
    firstValue :
    SecondValueVeryVeryVeryVeryLong;

**BreakBinaryOperations** (`BreakBinaryOperationsStyle`) clang-format 20 [¶](#breakbinaryoperations)

The break binary operations style to use.

Possible values:

*   `BBO_Never` (in configuration: `Never`) Don’t break binary operations
    
    aaa + bbbb \* ccccc \- ddddd +
    eeeeeeeeeeeeeeee;
    
*   `BBO_OnePerLine` (in configuration: `OnePerLine`) Binary operations will either be all on the same line, or each operation will have one line each.
    
    aaa +
    bbbb \*
    ccccc \-
    ddddd +
    eeeeeeeeeeeeeeee;
    
*   `BBO_RespectPrecedence` (in configuration: `RespectPrecedence`) Binary operations of a particular precedence that exceed the column limit will have one line each.
    
    aaa +
    bbbb \* ccccc \-
    ddddd +
    eeeeeeeeeeeeeeee;
    

**BreakConstructorInitializers** (`BreakConstructorInitializersStyle`) clang-format 5 [¶](#breakconstructorinitializers)

The break constructor initializers style to use.

Possible values:

*   `BCIS_BeforeColon` (in configuration: `BeforeColon`) Break constructor initializers before the colon and after the commas.
    
    Constructor()
        : initializer1(),
          initializer2()
    
*   `BCIS_BeforeComma` (in configuration: `BeforeComma`) Break constructor initializers before the colon and commas, and align the commas with the colon.
    
    Constructor()
        : initializer1()
        , initializer2()
    
*   `BCIS_AfterColon` (in configuration: `AfterColon`) Break constructor initializers after the colon and commas.
    
    Constructor() :
        initializer1(),
        initializer2()
    

**BreakFunctionDefinitionParameters** (`Boolean`) clang-format 19 [¶](#breakfunctiondefinitionparameters)

If `true`, clang-format will always break before function definition parameters.

true:
void functionDefinition(
         int A, int B) {}

false:
void functionDefinition(int A, int B) {}

**BreakInheritanceList** (`BreakInheritanceListStyle`) clang-format 7 [¶](#breakinheritancelist)

The inheritance list style to use.

Possible values:

*   `BILS_BeforeColon` (in configuration: `BeforeColon`) Break inheritance list before the colon and after the commas.
    
    class Foo
        : Base1,
          Base2
    {};
    
*   `BILS_BeforeComma` (in configuration: `BeforeComma`) Break inheritance list before the colon and commas, and align the commas with the colon.
    
    class Foo
        : Base1
        , Base2
    {};
    
*   `BILS_AfterColon` (in configuration: `AfterColon`) Break inheritance list after the colon and commas.
    
    class Foo :
        Base1,
        Base2
    {};
    
*   `BILS_AfterComma` (in configuration: `AfterComma`) Break inheritance list only after the commas.
    
    class Foo : Base1,
                Base2
    {};
    

**BreakStringLiterals** (`Boolean`) clang-format 3.9 [¶](#breakstringliterals)

Allow breaking string literals when formatting.

In C, C++, and Objective-C:

true:
const char\* x \= "veryVeryVeryVeryVeryVe"
                "ryVeryVeryVeryVeryVery"
                "VeryLongString";

false:
const char\* x \=
    "veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString";

In C# and Java:

true:
string x \= "veryVeryVeryVeryVeryVe" +
           "ryVeryVeryVeryVeryVery" +
           "VeryLongString";

false:
string x \=
    "veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString";

C# interpolated strings are not broken.

In Verilog:

true:
string x \= {"veryVeryVeryVeryVeryVe",
            "ryVeryVeryVeryVeryVery",
            "VeryLongString"};

false:
string x \=
    "veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString";

**BreakTemplateDeclarations** (`BreakTemplateDeclarationsStyle`) clang-format 19 [¶](#breaktemplatedeclarations)

The template declaration breaking style to use.

Possible values:

*   `BTDS_Leave` (in configuration: `Leave`) Do not change the line breaking before the declaration.
    
    template <typename T\>
    T foo() {
    }
    template <typename T\> T foo(int aaaaaaaaaaaaaaaaaaaaa,
                                int bbbbbbbbbbbbbbbbbbbbb) {
    }
    
*   `BTDS_No` (in configuration: `No`) Do not force break before declaration. `PenaltyBreakTemplateDeclaration` is taken into account.
    
    template <typename T\> T foo() {
    }
    template <typename T\> T foo(int aaaaaaaaaaaaaaaaaaaaa,
                                int bbbbbbbbbbbbbbbbbbbbb) {
    }
    
*   `BTDS_MultiLine` (in configuration: `MultiLine`) Force break after template declaration only when the following declaration spans multiple lines.
    
    template <typename T\> T foo() {
    }
    template <typename T\>
    T foo(int aaaaaaaaaaaaaaaaaaaaa,
          int bbbbbbbbbbbbbbbbbbbbb) {
    }
    
*   `BTDS_Yes` (in configuration: `Yes`) Always break after template declaration.
    
    template <typename T\>
    T foo() {
    }
    template <typename T\>
    T foo(int aaaaaaaaaaaaaaaaaaaaa,
          int bbbbbbbbbbbbbbbbbbbbb) {
    }
    

**ColumnLimit** (`Unsigned`) clang-format 3.7 [¶](#columnlimit)

The column limit.

A column limit of `0` means that there is no column limit. In this case, clang-format will respect the input’s line breaking decisions within statements unless they contradict other rules.

**CompactNamespaces** (`Boolean`) clang-format 5 [¶](#compactnamespaces)

If `true`, consecutive namespace declarations will be on the same line. If `false`, each namespace is declared on a new line.

true:
namespace Foo { namespace Bar {
}}

false:
namespace Foo {
namespace Bar {
}
}

If it does not fit on a single line, the overflowing namespaces get wrapped:

namespace Foo { namespace Bar {
namespace Extra {
}}}

**ConstructorInitializerAllOnOneLineOrOnePerLine** (`Boolean`) clang-format 3.7 [¶](#constructorinitializerallononelineoroneperline)

This option is **deprecated**. See `CurrentLine` of `PackConstructorInitializers`.

**ConstructorInitializerIndentWidth** (`Unsigned`) clang-format 3.7 [¶](#constructorinitializerindentwidth)

The number of characters to use for indentation of constructor initializer lists as well as inheritance lists.

**ContinuationIndentWidth** (`Unsigned`) clang-format 3.7 [¶](#continuationindentwidth)

Indent width for line continuations.

ContinuationIndentWidth: 2

int i \=         //  VeryVeryVeryVeryVeryLongComment
  longFunction( // Again a long comment
    arg);

**Cpp11BracedListStyle** (`Boolean`) clang-format 3.4 [¶](#cpp11bracedliststyle)

If `true`, format braced lists as best suited for C++11 braced lists.

Important differences:

*   No spaces inside the braced list.
    
*   No line break before the closing brace.
    
*   Indentation with the continuation indent, not with the block indent.
    

Fundamentally, C++11 braced lists are formatted exactly like function calls would be formatted in their place. If the braced list follows a name (e.g. a type or variable name), clang-format formats as if the `{}` were the parentheses of a function call with that name. If there is no name, a zero-length name is assumed.

true:                                  false:
vector<int\> x{1, 2, 3, 4};     vs.     vector<int\> x{ 1, 2, 3, 4 };
vector<T\> x{{}, {}, {}, {}};           vector<T\> x{ {}, {}, {}, {} };
f(MyMap\[{composite, key}\]);            f(MyMap\[{ composite, key }\]);
new int\[3\]{1, 2, 3};                   new int\[3\]{ 1, 2, 3 };

**DeriveLineEnding** (`Boolean`) clang-format 10 [¶](#derivelineending)

This option is **deprecated**. See `DeriveLF` and `DeriveCRLF` of `LineEnding`.

**DerivePointerAlignment** (`Boolean`) clang-format 3.7 [¶](#derivepointeralignment)

If `true`, analyze the formatted file for the most common alignment of `&` and `*`. Pointer and reference alignment styles are going to be updated according to the preferences found in the file. `PointerAlignment` is then used only as fallback.

**DisableFormat** (`Boolean`) clang-format 3.7 [¶](#disableformat)

Disables formatting completely.

**EmptyLineAfterAccessModifier** (`EmptyLineAfterAccessModifierStyle`) clang-format 13 [¶](#emptylineafteraccessmodifier)

Defines when to put an empty line after access modifiers. `EmptyLineBeforeAccessModifier` configuration handles the number of empty lines between two access modifiers.

Possible values:

*   `ELAAMS_Never` (in configuration: `Never`) Remove all empty lines after access modifiers.
    
    struct foo {
    private:
      int i;
    protected:
      int j;
      /\* comment \*/
    public:
      foo() {}
    private:
    protected:
    };
    
*   `ELAAMS_Leave` (in configuration: `Leave`) Keep existing empty lines after access modifiers. MaxEmptyLinesToKeep is applied instead.
    
*   `ELAAMS_Always` (in configuration: `Always`) Always add empty line after access modifiers if there are none. MaxEmptyLinesToKeep is applied also.
    
    struct foo {
    private:
    
      int i;
    protected:
    
      int j;
      /\* comment \*/
    public:
    
      foo() {}
    private:
    
    protected:
    
    };
    

**EmptyLineBeforeAccessModifier** (`EmptyLineBeforeAccessModifierStyle`) clang-format 12 [¶](#emptylinebeforeaccessmodifier)

Defines in which cases to put empty line before access modifiers.

Possible values:

*   `ELBAMS_Never` (in configuration: `Never`) Remove all empty lines before access modifiers.
    
    struct foo {
    private:
      int i;
    protected:
      int j;
      /\* comment \*/
    public:
      foo() {}
    private:
    protected:
    };
    
*   `ELBAMS_Leave` (in configuration: `Leave`) Keep existing empty lines before access modifiers.
    
*   `ELBAMS_LogicalBlock` (in configuration: `LogicalBlock`) Add empty line only when access modifier starts a new logical block. Logical block is a group of one or more member fields or functions.
    
    struct foo {
    private:
      int i;
    
    protected:
      int j;
      /\* comment \*/
    public:
      foo() {}
    
    private:
    protected:
    };
    
*   `ELBAMS_Always` (in configuration: `Always`) Always add empty line before access modifiers unless access modifier is at the start of struct or class definition.
    
    struct foo {
    private:
      int i;
    
    protected:
      int j;
      /\* comment \*/
    
    public:
      foo() {}
    
    private:
    
    protected:
    };
    

**EnumTrailingComma** (`EnumTrailingCommaStyle`) clang-format 21 [¶](#enumtrailingcomma)

Insert a comma (if missing) or remove the comma at the end of an `enum` enumerator list.

Warning

Setting this option to any value other than `Leave` could lead to incorrect code formatting due to clang-format’s lack of complete semantic information. As such, extra care should be taken to review code changes made by this option.

Possible values:

*   `ETC_Leave` (in configuration: `Leave`) Don’t insert or remove trailing commas.
    
    enum { a, b, c, };
    enum Color { red, green, blue };
    
*   `ETC_Insert` (in configuration: `Insert`) Insert trailing commas.
    
    enum { a, b, c, };
    enum Color { red, green, blue, };
    
*   `ETC_Remove` (in configuration: `Remove`) Remove trailing commas.
    
    enum { a, b, c };
    enum Color { red, green, blue };
    

**ExperimentalAutoDetectBinPacking** (`Boolean`) clang-format 3.7 [¶](#experimentalautodetectbinpacking)

If `true`, clang-format detects whether function calls and definitions are formatted with one parameter per line.

Each call can be bin-packed, one-per-line or inconclusive. If it is inconclusive, e.g. completely on one line, but a decision needs to be made, clang-format analyzes whether there are other bin-packed cases in the input file and act accordingly.

Note

This is an experimental flag, that might go away or be renamed. Do not use this in config files, etc. Use at your own risk.

**ForEachMacros** (`List of Strings`) clang-format 3.7 [¶](#foreachmacros)

A vector of macros that should be interpreted as foreach loops instead of as function calls.

These are expected to be macros of the form:

FOREACH(<variable\-declaration\>, ...)
  <loop\-body\>

In the .clang-format configuration file, this can be configured like:

ForEachMacros: \[RANGES\_FOR, FOREACH\]

For example: BOOST\_FOREACH.

**IfMacros** (`List of Strings`) clang-format 13 [¶](#ifmacros)

A vector of macros that should be interpreted as conditionals instead of as function calls.

These are expected to be macros of the form:

IF(...)
  <conditional\-body\>
else IF(...)
  <conditional\-body\>

In the .clang-format configuration file, this can be configured like:

IfMacros: \[IF\]

For example: [KJ\_IF\_MAYBE](https://github.com/capnproto/capnproto/blob/master/kjdoc/tour.md#maybes)

**IncludeBlocks** (`IncludeBlocksStyle`) clang-format 6 [¶](#includeblocks)

Dependent on the value, multiple `#include` blocks can be sorted as one and divided based on category.

Possible values:

*   `IBS_Preserve` (in configuration: `Preserve`) Sort each `#include` block separately.
    
    #include "b.h"               into      #include "b.h"
    
    #include <lib/main.h>                  #include "a.h"
    #include "a.h"                         #include <lib/main.h>
    
*   `IBS_Merge` (in configuration: `Merge`) Merge multiple `#include` blocks together and sort as one.
    
    #include "b.h"               into      #include "a.h"
                                           #include "b.h"
    #include <lib/main.h>                  #include <lib/main.h>
    #include "a.h"
    
*   `IBS_Regroup` (in configuration: `Regroup`) Merge multiple `#include` blocks together and sort as one. Then split into groups based on category priority. See `IncludeCategories`.
    
    #include "b.h"               into      #include "a.h"
                                           #include "b.h"
    #include <lib/main.h>
    #include "a.h"                         #include <lib/main.h>
    

**IncludeCategories** (`List of IncludeCategories`) clang-format 3.8 [¶](#includecategories)

Regular expressions denoting the different `#include` categories used for ordering `#includes`.

[POSIX extended](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html) regular expressions are supported.

These regular expressions are matched against the filename of an include (including the <> or “”) in order. The value belonging to the first matching regular expression is assigned and `#includes` are sorted first according to increasing category number and then alphabetically within each category.

If none of the regular expressions match, INT\_MAX is assigned as category. The main header for a source file automatically gets category 0. so that it is generally kept at the beginning of the `#includes` ([https://llvm.org/docs/CodingStandards.html#include-style](https://llvm.org/docs/CodingStandards.html#include-style)). However, you can also assign negative priorities if you have certain headers that always need to be first.

There is a third and optional field `SortPriority` which can used while `IncludeBlocks = IBS_Regroup` to define the priority in which `#includes` should be ordered. The value of `Priority` defines the order of `#include blocks` and also allows the grouping of `#includes` of different priority. `SortPriority` is set to the value of `Priority` as default if it is not assigned.

Each regular expression can be marked as case sensitive with the field `CaseSensitive`, per default it is not.

To configure this in the .clang-format file, use:

IncludeCategories:
  \- Regex:           '^"(llvm|llvm-c|clang|clang-c)/'
    Priority:        2
    SortPriority:    2
    CaseSensitive:   true
  \- Regex:           '^((<|")(gtest|gmock|isl|json)/)'
    Priority:        3
  \- Regex:           '<\[\[:alnum:\].\]+>'
    Priority:        4
  \- Regex:           '.\*'
    Priority:        1
    SortPriority:    0

**IncludeIsMainRegex** (`String`) clang-format 3.9 [¶](#includeismainregex)

Specify a regular expression of suffixes that are allowed in the file-to-main-include mapping.

When guessing whether a #include is the “main” include (to assign category 0, see above), use this regex of allowed suffixes to the header stem. A partial match is done, so that: \* `""` means “arbitrary suffix” \* `"$"` means “no suffix”

For example, if configured to `"(_test)?$"`, then a header a.h would be seen as the “main” include in both a.cc and a\_test.cc.

**IncludeIsMainSourceRegex** (`String`) clang-format 10 [¶](#includeismainsourceregex)

Specify a regular expression for files being formatted that are allowed to be considered “main” in the file-to-main-include mapping.

By default, clang-format considers files as “main” only when they end with: `.c`, `.cc`, `.cpp`, `.c++`, `.cxx`, `.m` or `.mm` extensions. For these files a guessing of “main” include takes place (to assign category 0, see above). This config option allows for additional suffixes and extensions for files to be considered as “main”.

For example, if this option is configured to `(Impl\.hpp)$`, then a file `ClassImpl.hpp` is considered “main” (in addition to `Class.c`, `Class.cc`, `Class.cpp` and so on) and “main include file” logic will be executed (with _IncludeIsMainRegex_ setting also being respected in later phase). Without this option set, `ClassImpl.hpp` would not have the main include file put on top before any other include.

**IndentAccessModifiers** (`Boolean`) clang-format 13 [¶](#indentaccessmodifiers)

Specify whether access modifiers should have their own indentation level.

When `false`, access modifiers are indented (or outdented) relative to the record members, respecting the `AccessModifierOffset`. Record members are indented one level below the record. When `true`, access modifiers get their own indentation level. As a consequence, record members are always indented 2 levels below the record, regardless of the access modifier presence. Value of the `AccessModifierOffset` is ignored.

false:                                 true:
class C {                      vs.     class C {
  class D {                                class D {
    void bar();                                void bar();
  protected:                                 protected:
    D();                                       D();
  };                                       };
public:                                  public:
  C();                                     C();
};                                     };
void foo() {                           void foo() {
  return 1;                              return 1;
}                                      }

**IndentCaseBlocks** (`Boolean`) clang-format 11 [¶](#indentcaseblocks)

Indent case label blocks one level from the case label.

When `false`, the block following the case label uses the same indentation level as for the case label, treating the case label the same as an if-statement. When `true`, the block gets indented as a scope block.

false:                                 true:
switch (fool) {                vs.     switch (fool) {
case 1: {                              case 1:
  bar();                                 {
} break;                                   bar();
default: {                               }
  plop();                                break;
}                                      default:
}                                        {
                                           plop();
                                         }
                                       }

**IndentCaseLabels** (`Boolean`) clang-format 3.3 [¶](#indentcaselabels)

Indent case labels one level from the switch statement.

When `false`, use the same indentation level as for the switch statement. Switch statement body is always indented one level more than case labels (except the first block following the case label, which itself indents the code - unless IndentCaseBlocks is enabled).

false:                                 true:
switch (fool) {                vs.     switch (fool) {
case 1:                                  case 1:
  bar();                                   bar();
  break;                                   break;
default:                                 default:
  plop();                                  plop();
}                                      }

**IndentExportBlock** (`Boolean`) clang-format 20 [¶](#indentexportblock)

If `true`, clang-format will indent the body of an `export { ... }` block. This doesn’t affect the formatting of anything else related to exported declarations.

true:                     false:
export {          vs.     export {
  void foo();             void foo();
  void bar();             void bar();
}                         }

**IndentExternBlock** (`IndentExternBlockStyle`) clang-format 11 [¶](#indentexternblock)

IndentExternBlockStyle is the type of indenting of extern blocks.

Possible values:

*   `IEBS_AfterExternBlock` (in configuration: `AfterExternBlock`) Backwards compatible with AfterExternBlock’s indenting.
    
    IndentExternBlock: AfterExternBlock
    BraceWrapping.AfterExternBlock: true
    extern "C"
    {
        void foo();
    }
    
    IndentExternBlock: AfterExternBlock
    BraceWrapping.AfterExternBlock: false
    extern "C" {
    void foo();
    }
    
*   `IEBS_NoIndent` (in configuration: `NoIndent`) Does not indent extern blocks.
    
    extern "C" {
    void foo();
    }
    
*   `IEBS_Indent` (in configuration: `Indent`) Indents extern blocks.
    
    extern "C" {
      void foo();
    }
    

**IndentGotoLabels** (`Boolean`) clang-format 10 [¶](#indentgotolabels)

Indent goto labels.

When `false`, goto labels are flushed left.

true:                                  false:
int f() {                      vs.     int f() {
  if (foo()) {                           if (foo()) {
  label1:                              label1:
    bar();                                 bar();
  }                                      }
label2:                                label2:
  return 1;                              return 1;
}                                      }

**IndentPPDirectives** (`PPDirectiveIndentStyle`) clang-format 6 [¶](#indentppdirectives)

The preprocessor directive indenting style to use.

Possible values:

*   `PPDIS_None` (in configuration: `None`) Does not indent any directives.
    
    #if FOO
    #if BAR
    #include <foo>
    #endif
    #endif
    
*   `PPDIS_AfterHash` (in configuration: `AfterHash`) Indents directives after the hash.
    
    #if FOO
    \#  if BAR
    #    include <foo>
    \#  endif
    #endif
    
*   `PPDIS_BeforeHash` (in configuration: `BeforeHash`) Indents directives before the hash.
    
    #if FOO
      #if BAR
        #include <foo>
      #endif
    #endif
    

**IndentRequiresClause** (`Boolean`) clang-format 15 [¶](#indentrequiresclause)

Indent the requires clause in a template. This only applies when `RequiresClausePosition` is `OwnLine`, `OwnLineWithBrace`, or `WithFollowing`.

In clang-format 12, 13 and 14 it was named `IndentRequires`.

true:
template <typename It\>
  requires Iterator<It\>
void sort(It begin, It end) {
  //....
}

false:
template <typename It\>
requires Iterator<It\>
void sort(It begin, It end) {
  //....
}

**IndentWidth** (`Unsigned`) clang-format 3.7 [¶](#indentwidth)

The number of columns to use for indentation.

IndentWidth: 3

void f() {
   someFunction();
   if (true, false) {
      f();
   }
}

**IndentWrappedFunctionNames** (`Boolean`) clang-format 3.7 [¶](#indentwrappedfunctionnames)

Indent if a function definition or declaration is wrapped after the type.

true:
LoooooooooooooooooooooooooooooooooooooooongReturnType
    LoooooooooooooooooooooooooooooooongFunctionDeclaration();

false:
LoooooooooooooooooooooooooooooooooooooooongReturnType
LoooooooooooooooooooooooooooooooongFunctionDeclaration();

**InsertBraces** (`Boolean`) clang-format 15 [¶](#insertbraces)

Insert braces after control statements (`if`, `else`, `for`, `do`, and `while`) in C++ unless the control statements are inside macro definitions or the braces would enclose preprocessor directives.

Warning

Setting this option to `true` could lead to incorrect code formatting due to clang-format’s lack of complete semantic information. As such, extra care should be taken to review code changes made by this option.

false:                                    true:

if (isa<FunctionDecl\>(D))        vs.      if (isa<FunctionDecl\>(D)) {
  handleFunctionDecl(D);                    handleFunctionDecl(D);
else if (isa<VarDecl\>(D))                 } else if (isa<VarDecl\>(D)) {
  handleVarDecl(D);                         handleVarDecl(D);
else                                      } else {
  return;                                   return;
                                          }

while (i\--)                      vs.      while (i\--) {
  for (auto \*A : D.attrs())                 for (auto \*A : D.attrs()) {
    handleAttr(A);                            handleAttr(A);
                                            }
                                          }

do                               vs.      do {
  \--i;                                      \--i;
while (i);                                } while (i);

**InsertNewlineAtEOF** (`Boolean`) clang-format 16 [¶](#insertnewlineateof)

Insert a newline at end of file if missing.

**InsertTrailingCommas** (`TrailingCommaStyle`) clang-format 11 [¶](#inserttrailingcommas)

If set to `TCS_Wrapped` will insert trailing commas in container literals (arrays and objects) that wrap across multiple lines. It is currently only available for JavaScript and disabled by default `TCS_None`. `InsertTrailingCommas` cannot be used together with `BinPackArguments` as inserting the comma disables bin-packing.

TSC\_Wrapped:
const someArray \= \[
aaaaaaaaaaaaaaaaaaaaaaaaaa,
aaaaaaaaaaaaaaaaaaaaaaaaaa,
aaaaaaaaaaaaaaaaaaaaaaaaaa,
//                        ^ inserted
\]

Possible values:

*   `TCS_None` (in configuration: `None`) Do not insert trailing commas.
    
*   `TCS_Wrapped` (in configuration: `Wrapped`) Insert trailing commas in container literals that were wrapped over multiple lines. Note that this is conceptually incompatible with bin-packing, because the trailing comma is used as an indicator that a container should be formatted one-per-line (i.e. not bin-packed). So inserting a trailing comma counteracts bin-packing.
    

**IntegerLiteralSeparator** (`IntegerLiteralSeparatorStyle`) clang-format 16 [¶](#integerliteralseparator)

Format integer literal separators (`'` for C++ and `_` for C#, Java, and JavaScript).

Nested configuration flags:

Separator format of integer literals of different bases.

If negative, remove separators. If `0`, leave the literal as is. If positive, insert separators between digits starting from the rightmost digit.

For example, the config below will leave separators in binary literals alone, insert separators in decimal literals to separate the digits into groups of 3, and remove separators in hexadecimal literals.

IntegerLiteralSeparator:
  Binary: 0
  Decimal: 3
  Hex: \-1

You can also specify a minimum number of digits (`BinaryMinDigits`, `DecimalMinDigits`, and `HexMinDigits`) the integer literal must have in order for the separators to be inserted.

*   `int8_t Binary` Format separators in binary literals.
    
    /\* -1: \*/ b = 0b100111101101;
    /\*  0: \*/ b = 0b10011'11'0110'1;
    /\*  3: \*/ b = 0b100'111'101'101;
    /\*  4: \*/ b = 0b1001'1110'1101;
    
*   `int8_t BinaryMinDigits` Format separators in binary literals with a minimum number of digits.
    
    // Binary: 3
    // BinaryMinDigits: 7
    b1 = 0b101101;
    b2 = 0b1'101'101;
    
*   `int8_t Decimal` Format separators in decimal literals.
    
    /\* -1: \*/ d = 18446744073709550592ull;
    /\*  0: \*/ d = 184467'440737'0'95505'92ull;
    /\*  3: \*/ d = 18'446'744'073'709'550'592ull;
    
*   `int8_t DecimalMinDigits` Format separators in decimal literals with a minimum number of digits.
    
    // Decimal: 3
    // DecimalMinDigits: 5
    d1 = 2023;
    d2 = 10'000;
    
*   `int8_t Hex` Format separators in hexadecimal literals.
    
    /\* -1: \*/ h = 0xDEADBEEFDEADBEEFuz;
    /\*  0: \*/ h = 0xDEAD'BEEF'DE'AD'BEE'Fuz;
    /\*  2: \*/ h = 0xDE'AD'BE'EF'DE'AD'BE'EFuz;
    
*   `int8_t HexMinDigits` Format separators in hexadecimal literals with a minimum number of digits.
    
    // Hex: 2
    // HexMinDigits: 6
    h1 = 0xABCDE;
    h2 = 0xAB'CD'EF;
    

**JavaImportGroups** (`List of Strings`) clang-format 8 [¶](#javaimportgroups)

A vector of prefixes ordered by the desired groups for Java imports.

One group’s prefix can be a subset of another - the longest prefix is always matched. Within a group, the imports are ordered lexicographically. Static imports are grouped separately and follow the same group rules. By default, static imports are placed before non-static imports, but this behavior is changed by another option, `SortJavaStaticImport`.

In the .clang-format configuration file, this can be configured like in the following yaml example. This will result in imports being formatted as in the Java example below.

JavaImportGroups: \[com.example, com, org\]

import static com.example.function1;

import static com.test.function2;

import static org.example.function3;

import com.example.ClassA;
import com.example.Test;
import com.example.a.ClassB;

import com.test.ClassC;

import org.example.ClassD;

**JavaScriptQuotes** (`JavaScriptQuoteStyle`) clang-format 3.9 [¶](#javascriptquotes)

The JavaScriptQuoteStyle to use for JavaScript strings.

Possible values:

*   `JSQS_Leave` (in configuration: `Leave`) Leave string quotes as they are.
    
    string1 \= "foo";
    string2 \= 'bar';
    
*   `JSQS_Single` (in configuration: `Single`) Always use single quotes.
    
    string1 \= 'foo';
    string2 \= 'bar';
    
*   `JSQS_Double` (in configuration: `Double`) Always use double quotes.
    
    string1 \= "foo";
    string2 \= "bar";
    

**JavaScriptWrapImports** (`Boolean`) clang-format 3.9 [¶](#javascriptwrapimports)

Whether to wrap JavaScript import/export statements.

true:
import {
    VeryLongImportsAreAnnoying,
    VeryLongImportsAreAnnoying,
    VeryLongImportsAreAnnoying,
} from "some/module.js"

false:
import {VeryLongImportsAreAnnoying, VeryLongImportsAreAnnoying, VeryLongImportsAreAnnoying,} from "some/module.js"

**KeepEmptyLines** (`KeepEmptyLinesStyle`) clang-format 19 [¶](#keepemptylines)

Which empty lines are kept. See `MaxEmptyLinesToKeep` for how many consecutive empty lines are kept.

Nested configuration flags:

Options regarding which empty lines are kept.

For example, the config below will remove empty lines at start of the file, end of the file, and start of blocks.

KeepEmptyLines:
  AtEndOfFile: false
  AtStartOfBlock: false
  AtStartOfFile: false

*   `bool AtEndOfFile` Keep empty lines at end of file.
    
*   `bool AtStartOfBlock` Keep empty lines at start of a block.
    
    true:                                  false:
    if (foo) {                     vs.     if (foo) {
                                             bar();
      bar();                               }
    }
    
*   `bool AtStartOfFile` Keep empty lines at start of file.
    

**KeepEmptyLinesAtEOF** (`Boolean`) clang-format 17 [¶](#keepemptylinesateof)

This option is **deprecated**. See `AtEndOfFile` of `KeepEmptyLines`.

**KeepEmptyLinesAtTheStartOfBlocks** (`Boolean`) clang-format 3.7 [¶](#keepemptylinesatthestartofblocks)

This option is **deprecated**. See `AtStartOfBlock` of `KeepEmptyLines`.

**KeepFormFeed** (`Boolean`) clang-format 20 [¶](#keepformfeed)

Keep the form feed character if it’s immediately preceded and followed by a newline. Multiple form feeds and newlines within a whitespace range are replaced with a single newline and form feed followed by the remaining newlines.

**LambdaBodyIndentation** (`LambdaBodyIndentationKind`) clang-format 13 [¶](#lambdabodyindentation)

The indentation style of lambda bodies. `Signature` (the default) causes the lambda body to be indented one additional level relative to the indentation level of the signature. `OuterScope` forces the lambda body to be indented one additional level relative to the parent scope containing the lambda signature.

Possible values:

*   `LBI_Signature` (in configuration: `Signature`) Align lambda body relative to the lambda signature. This is the default.
    
    someMethod(
        \[\](SomeReallyLongLambdaSignatureArgument foo) {
          return;
        });
    
*   `LBI_OuterScope` (in configuration: `OuterScope`) For statements within block scope, align lambda body relative to the indentation level of the outer scope the lambda signature resides in.
    
    someMethod(
        \[\](SomeReallyLongLambdaSignatureArgument foo) {
      return;
    });
    
    someMethod(someOtherMethod(
        \[\](SomeReallyLongLambdaSignatureArgument foo) {
      return;
    }));
    

**Language** (`LanguageKind`) clang-format 3.5 [¶](#language)

The language that this format style targets.

Note

You can specify the language (`C`, `Cpp`, or `ObjC`) for `.h` files by adding a `// clang-format Language:` line before the first non-comment (and non-empty) line, e.g. `// clang-format Language: Cpp`.

Possible values:

*   `LK_None` (in configuration: `None`) Do not use.
    
*   `LK_C` (in configuration: `C`) Should be used for C.
    
*   `LK_Cpp` (in configuration: `Cpp`) Should be used for C++.
    
*   `LK_CSharp` (in configuration: `CSharp`) Should be used for C#.
    
*   `LK_Java` (in configuration: `Java`) Should be used for Java.
    
*   `LK_JavaScript` (in configuration: `JavaScript`) Should be used for JavaScript.
    
*   `LK_Json` (in configuration: `Json`) Should be used for JSON.
    
*   `LK_ObjC` (in configuration: `ObjC`) Should be used for Objective-C, Objective-C++.
    
*   `LK_Proto` (in configuration: `Proto`) Should be used for Protocol Buffers ([https://developers.google.com/protocol-buffers/](https://developers.google.com/protocol-buffers/)).
    
*   `LK_TableGen` (in configuration: `TableGen`) Should be used for TableGen code.
    
*   `LK_TextProto` (in configuration: `TextProto`) Should be used for Protocol Buffer messages in text format ([https://developers.google.com/protocol-buffers/](https://developers.google.com/protocol-buffers/)).
    
*   `LK_Verilog` (in configuration: `Verilog`) Should be used for Verilog and SystemVerilog. [https://standards.ieee.org/ieee/1800/6700/](https://standards.ieee.org/ieee/1800/6700/) [https://sci-hub.st/10.1109/IEEESTD.2018.8299595](https://sci-hub.st/10.1109/IEEESTD.2018.8299595)
    

**LineEnding** (`LineEndingStyle`) clang-format 16 [¶](#lineending)

Line ending style (`\n` or `\r\n`) to use.

Possible values:

*   `LE_LF` (in configuration: `LF`) Use `\n`.
    
*   `LE_CRLF` (in configuration: `CRLF`) Use `\r\n`.
    
*   `LE_DeriveLF` (in configuration: `DeriveLF`) Use `\n` unless the input has more lines ending in `\r\n`.
    
*   `LE_DeriveCRLF` (in configuration: `DeriveCRLF`) Use `\r\n` unless the input has more lines ending in `\n`.
    

**MacroBlockBegin** (`String`) clang-format 3.7 [¶](#macroblockbegin)

A regular expression matching macros that start a block.

\# With:
MacroBlockBegin: "^NS\_MAP\_BEGIN|\\
NS\_TABLE\_HEAD$"
MacroBlockEnd: "^\\
NS\_MAP\_END|\\
NS\_TABLE\_.\*\_END$"

NS\_MAP\_BEGIN
  foo();
NS\_MAP\_END

NS\_TABLE\_HEAD
  bar();
NS\_TABLE\_FOO\_END

\# Without:
NS\_MAP\_BEGIN
foo();
NS\_MAP\_END

NS\_TABLE\_HEAD
bar();
NS\_TABLE\_FOO\_END

**MacroBlockEnd** (`String`) clang-format 3.7 [¶](#macroblockend)

A regular expression matching macros that end a block.

**Macros** (`List of Strings`) clang-format 17 [¶](#macros)

A list of macros of the form `<definition>=<expansion>` .

Code will be parsed with macros expanded, in order to determine how to interpret and format the macro arguments.

For example, the code:

A(a\*b);

will usually be interpreted as a call to a function A, and the multiplication expression will be formatted as `a * b`.

If we specify the macro definition:

Macros:
\- A(x)=x

the code will now be parsed as a declaration of the variable b of type a\*, and formatted as `a* b` (depending on pointer-binding rules).

Features and restrictions:

*   Both function-like macros and object-like macros are supported.
    
*   Macro arguments must be used exactly once in the expansion.
    
*   No recursive expansion; macros referencing other macros will be ignored.
    
*   Overloading by arity is supported: for example, given the macro definitions A=x, A()=y, A(a)=a
    

A; \-> x;
A(); \-> y;
A(z); \-> z;
A(a, b); // will not be expanded.

**MacrosSkippedByRemoveParentheses** (`List of Strings`) clang-format 21 [¶](#macrosskippedbyremoveparentheses)

A vector of function-like macros whose invocations should be skipped by `RemoveParentheses`.

**MainIncludeChar** (`MainIncludeCharDiscriminator`) clang-format 19 [¶](#mainincludechar)

When guessing whether a #include is the “main” include, only the include directives that use the specified character are considered.

Possible values:

*   `MICD_Quote` (in configuration: `Quote`) Main include uses quotes: `#include "foo.hpp"` (the default).
    
*   `MICD_AngleBracket` (in configuration: `AngleBracket`) Main include uses angle brackets: `#include <foo.hpp>`.
    
*   `MICD_Any` (in configuration: `Any`) Main include uses either quotes or angle brackets.
    

**MaxEmptyLinesToKeep** (`Unsigned`) clang-format 3.7 [¶](#maxemptylinestokeep)

The maximum number of consecutive empty lines to keep.

MaxEmptyLinesToKeep: 1         vs.     MaxEmptyLinesToKeep: 0
int f() {                              int f() {
  int \= 1;                                 int i \= 1;
                                           i \= foo();
  i \= foo();                               return i;
                                       }
  return i;
}

**NamespaceIndentation** (`NamespaceIndentationKind`) clang-format 3.7 [¶](#namespaceindentation)

The indentation used for namespaces.

Possible values:

*   `NI_None` (in configuration: `None`) Don’t indent in namespaces.
    
    namespace out {
    int i;
    namespace in {
    int i;
    }
    }
    
*   `NI_Inner` (in configuration: `Inner`) Indent only in inner namespaces (nested in other namespaces).
    
    namespace out {
    int i;
    namespace in {
      int i;
    }
    }
    
*   `NI_All` (in configuration: `All`) Indent in all namespaces.
    
    namespace out {
      int i;
      namespace in {
        int i;
      }
    }
    

**NamespaceMacros** (`List of Strings`) clang-format 9 [¶](#namespacemacros)

A vector of macros which are used to open namespace blocks.

These are expected to be macros of the form:

NAMESPACE(<namespace\-name\>, ...) {
  <namespace\-content\>
}

For example: TESTSUITE

**ObjCBinPackProtocolList** (`BinPackStyle`) clang-format 7 [¶](#objcbinpackprotocollist)

Controls bin-packing Objective-C protocol conformance list items into as few lines as possible when they go over `ColumnLimit`.

If `Auto` (the default), delegates to the value in `BinPackParameters`. If that is `BinPack`, bin-packs Objective-C protocol conformance list items into as few lines as possible whenever they go over `ColumnLimit`.

If `Always`, always bin-packs Objective-C protocol conformance list items into as few lines as possible whenever they go over `ColumnLimit`.

If `Never`, lays out Objective-C protocol conformance list items onto individual lines whenever they go over `ColumnLimit`.

Always (or Auto, if BinPackParameters\==BinPack):
@interface ccccccccccccc () <
    ccccccccccccc, ccccccccccccc,
    ccccccccccccc, ccccccccccccc\> {
}

Never (or Auto, if BinPackParameters!=BinPack):
@interface ddddddddddddd () <
    ddddddddddddd,
    ddddddddddddd,
    ddddddddddddd,
    ddddddddddddd\> {
}

Possible values:

*   `BPS_Auto` (in configuration: `Auto`) Automatically determine parameter bin-packing behavior.
    
*   `BPS_Always` (in configuration: `Always`) Always bin-pack parameters.
    
*   `BPS_Never` (in configuration: `Never`) Never bin-pack parameters.
    

**ObjCBlockIndentWidth** (`Unsigned`) clang-format 3.7 [¶](#objcblockindentwidth)

The number of characters to use for indentation of ObjC blocks.

ObjCBlockIndentWidth: 4

\[operation setCompletionBlock:^{
    \[self onOperationDone\];
}\];

**ObjCBreakBeforeNestedBlockParam** (`Boolean`) clang-format 11 [¶](#objcbreakbeforenestedblockparam)

Break parameters list into lines when there is nested block parameters in a function call.

false:
 \- (void)\_aMethod
 {
     \[self.test1 t:self w:self callback:^(typeof(self) self, NSNumber
     \*u, NSNumber \*v) {
         u \= c;
     }\]
 }
 true:
 \- (void)\_aMethod
 {
    \[self.test1 t:self
                 w:self
        callback:^(typeof(self) self, NSNumber \*u, NSNumber \*v) {
             u \= c;
         }\]
 }

**ObjCPropertyAttributeOrder** (`List of Strings`) clang-format 18 [¶](#objcpropertyattributeorder)

The order in which ObjC property attributes should appear.

Attributes in code will be sorted in the order specified. Any attributes encountered that are not mentioned in this array will be sorted last, in stable order. Comments between attributes will leave the attributes untouched.

Warning

Using this option could lead to incorrect code formatting due to clang-format’s lack of complete semantic information. As such, extra care should be taken to review code changes made by this option.

ObjCPropertyAttributeOrder: \[
    class, direct,
    atomic, nonatomic,
    assign, retain, strong, copy, weak, unsafe\_unretained,
    readonly, readwrite, getter, setter,
    nullable, nonnull, null\_resettable, null\_unspecified
\]

**ObjCSpaceAfterProperty** (`Boolean`) clang-format 3.7 [¶](#objcspaceafterproperty)

Add a space after `@property` in Objective-C, i.e. use `@property (readonly)` instead of `@property(readonly)`.

**ObjCSpaceBeforeProtocolList** (`Boolean`) clang-format 3.7 [¶](#objcspacebeforeprotocollist)

Add a space in front of an Objective-C protocol list, i.e. use `Foo <Protocol>` instead of `Foo<Protocol>`.

**OneLineFormatOffRegex** (`String`) clang-format 21 [¶](#onelineformatoffregex)

A regular expression that describes markers for turning formatting off for one line. If it matches a comment that is the only token of a line, clang-format skips the comment and the next line. Otherwise, clang-format skips lines containing a matched token.

// OneLineFormatOffRegex: ^(// NOLINT|logger$)
// results in the output below:
int a;
int b ;  // NOLINT
int c;
 // NOLINTNEXTLINE
int d ;
int e;
s \= "// NOLINT";
 logger() ;
logger2();
my\_logger();

**PPIndentWidth** (`Integer`) clang-format 13 [¶](#ppindentwidth)

The number of columns to use for indentation of preprocessor statements. When set to -1 (default) `IndentWidth` is used also for preprocessor statements.

PPIndentWidth: 1

#ifdef \_\_linux\_\_
\# define FOO
#else
\# define BAR
#endif

**PackConstructorInitializers** (`PackConstructorInitializersStyle`) clang-format 14 [¶](#packconstructorinitializers)

The pack constructor initializers style to use.

Possible values:

*   `PCIS_Never` (in configuration: `Never`) Always put each constructor initializer on its own line.
    
    Constructor()
        : a(),
          b()
    
*   `PCIS_BinPack` (in configuration: `BinPack`) Bin-pack constructor initializers.
    
    Constructor()
        : aaaaaaaaaaaaaaaaaaaa(), bbbbbbbbbbbbbbbbbbbb(),
          cccccccccccccccccccc()
    
*   `PCIS_CurrentLine` (in configuration: `CurrentLine`) Put all constructor initializers on the current line if they fit. Otherwise, put each one on its own line.
    
    Constructor() : a(), b()
    
    Constructor()
        : aaaaaaaaaaaaaaaaaaaa(),
          bbbbbbbbbbbbbbbbbbbb(),
          ddddddddddddd()
    
*   `PCIS_NextLine` (in configuration: `NextLine`) Same as `PCIS_CurrentLine` except that if all constructor initializers do not fit on the current line, try to fit them on the next line.
    
    Constructor() : a(), b()
    
    Constructor()
        : aaaaaaaaaaaaaaaaaaaa(), bbbbbbbbbbbbbbbbbbbb(), ddddddddddddd()
    
    Constructor()
        : aaaaaaaaaaaaaaaaaaaa(),
          bbbbbbbbbbbbbbbbbbbb(),
          cccccccccccccccccccc()
    
*   `PCIS_NextLineOnly` (in configuration: `NextLineOnly`) Put all constructor initializers on the next line if they fit. Otherwise, put each one on its own line.
    
    Constructor()
        : a(), b()
    
    Constructor()
        : aaaaaaaaaaaaaaaaaaaa(), bbbbbbbbbbbbbbbbbbbb(), ddddddddddddd()
    
    Constructor()
        : aaaaaaaaaaaaaaaaaaaa(),
          bbbbbbbbbbbbbbbbbbbb(),
          cccccccccccccccccccc()
    

**PenaltyBreakAssignment** (`Unsigned`) clang-format 5 [¶](#penaltybreakassignment)

The penalty for breaking around an assignment operator.

**PenaltyBreakBeforeFirstCallParameter** (`Unsigned`) clang-format 3.7 [¶](#penaltybreakbeforefirstcallparameter)

The penalty for breaking a function call after `call(`.

**PenaltyBreakBeforeMemberAccess** (`Unsigned`) clang-format 20 [¶](#penaltybreakbeforememberaccess)

The penalty for breaking before a member access operator (`.`, `->`).

**PenaltyBreakFirstLessLess** (`Unsigned`) clang-format 3.7 [¶](#penaltybreakfirstlessless)

The penalty for breaking before the first `<<`.

**PenaltyBreakOpenParenthesis** (`Unsigned`) clang-format 14 [¶](#penaltybreakopenparenthesis)

The penalty for breaking after `(`.

**PenaltyBreakScopeResolution** (`Unsigned`) clang-format 18 [¶](#penaltybreakscoperesolution)

The penalty for breaking after `::`.

**PenaltyBreakString** (`Unsigned`) clang-format 3.7 [¶](#penaltybreakstring)

The penalty for each line break introduced inside a string literal.

**PenaltyBreakTemplateDeclaration** (`Unsigned`) clang-format 7 [¶](#penaltybreaktemplatedeclaration)

The penalty for breaking after template declaration.

**PenaltyExcessCharacter** (`Unsigned`) clang-format 3.7 [¶](#penaltyexcesscharacter)

The penalty for each character outside of the column limit.

**PenaltyIndentedWhitespace** (`Unsigned`) clang-format 12 [¶](#penaltyindentedwhitespace)

Penalty for each character of whitespace indentation (counted relative to leading non-whitespace column).

**PenaltyReturnTypeOnItsOwnLine** (`Unsigned`) clang-format 3.7 [¶](#penaltyreturntypeonitsownline)

Penalty for putting the return type of a function onto its own line.

**PointerAlignment** (`PointerAlignmentStyle`) clang-format 3.7 [¶](#pointeralignment)

Pointer and reference alignment style.

Possible values:

*   `PAS_Left` (in configuration: `Left`) Align pointer to the left.
    
    int\* a;
    
*   `PAS_Right` (in configuration: `Right`) Align pointer to the right.
    
    int \*a;
    
*   `PAS_Middle` (in configuration: `Middle`) Align pointer in the middle.
    
    int \* a;
    

**QualifierAlignment** (`QualifierAlignmentStyle`) clang-format 14 [¶](#qualifieralignment)

Different ways to arrange specifiers and qualifiers (e.g. const/volatile).

Warning

Setting `QualifierAlignment` to something other than `Leave`, COULD lead to incorrect code formatting due to incorrect decisions made due to clang-formats lack of complete semantic information. As such extra care should be taken to review code changes made by the use of this option.

Possible values:

*   `QAS_Leave` (in configuration: `Leave`) Don’t change specifiers/qualifiers to either Left or Right alignment (default).
    
    int const a;
    const int \*a;
    
*   `QAS_Left` (in configuration: `Left`) Change specifiers/qualifiers to be left-aligned.
    
    const int a;
    const int \*a;
    
*   `QAS_Right` (in configuration: `Right`) Change specifiers/qualifiers to be right-aligned.
    
    int const a;
    int const \*a;
    
*   `QAS_Custom` (in configuration: `Custom`) Change specifiers/qualifiers to be aligned based on `QualifierOrder`. With:
    
    QualifierOrder: \[inline, static, type, const\]
    
    int const a;
    int const \*a;
    

**QualifierOrder** (`List of Strings`) clang-format 14 [¶](#qualifierorder)

The order in which the qualifiers appear. The order is an array that can contain any of the following:

> *   `const`
>     
> *   `inline`
>     
> *   `static`
>     
> *   `friend`
>     
> *   `constexpr`
>     
> *   `volatile`
>     
> *   `restrict`
>     
> *   `type`
>     

Note

It must contain `type`.

Items to the left of `type` will be placed to the left of the type and aligned in the order supplied. Items to the right of `type` will be placed to the right of the type and aligned in the order supplied.

QualifierOrder: \[inline, static, type, const, volatile\]

**RawStringFormats** (`List of RawStringFormats`) clang-format 6 [¶](#rawstringformats)

Defines hints for detecting supported languages code blocks in raw strings.

A raw string with a matching delimiter or a matching enclosing function name will be reformatted assuming the specified language based on the style for that language defined in the .clang-format file. If no style has been defined in the .clang-format file for the specific language, a predefined style given by `BasedOnStyle` is used. If `BasedOnStyle` is not found, the formatting is based on `LLVM` style. A matching delimiter takes precedence over a matching enclosing function name for determining the language of the raw string contents.

If a canonical delimiter is specified, occurrences of other delimiters for the same language will be updated to the canonical if possible.

There should be at most one specification per language and each delimiter and enclosing function should not occur in multiple specifications.

To configure this in the .clang-format file, use:

RawStringFormats:
  \- Language: TextProto
      Delimiters:
        \- pb
        \- proto
    EnclosingFunctions:
        \- PARSE\_TEXT\_PROTO
      BasedOnStyle: google
  \- Language: Cpp
      Delimiters:
        \- cc
        \- cpp
    BasedOnStyle: LLVM
      CanonicalDelimiter: cc

**ReferenceAlignment** (`ReferenceAlignmentStyle`) clang-format 13 [¶](#referencealignment)

Reference alignment style (overrides `PointerAlignment` for references).

Possible values:

*   `RAS_Pointer` (in configuration: `Pointer`) Align reference like `PointerAlignment`.
    
*   `RAS_Left` (in configuration: `Left`) Align reference to the left.
    
    int& a;
    
*   `RAS_Right` (in configuration: `Right`) Align reference to the right.
    
    int &a;
    
*   `RAS_Middle` (in configuration: `Middle`) Align reference in the middle.
    
    int & a;
    

**RemoveBracesLLVM** (`Boolean`) clang-format 14 [¶](#removebracesllvm)

Remove optional braces of control statements (`if`, `else`, `for`, and `while`) in C++ according to the LLVM coding style.

Warning

This option will be renamed and expanded to support other styles.

Warning

Setting this option to `true` could lead to incorrect code formatting due to clang-format’s lack of complete semantic information. As such, extra care should be taken to review code changes made by this option.

false:                                     true:

if (isa<FunctionDecl\>(D)) {        vs.     if (isa<FunctionDecl\>(D))
  handleFunctionDecl(D);                     handleFunctionDecl(D);
} else if (isa<VarDecl\>(D)) {              else if (isa<VarDecl\>(D))
  handleVarDecl(D);                          handleVarDecl(D);
}

if (isa<VarDecl\>(D)) {             vs.     if (isa<VarDecl\>(D)) {
  for (auto \*A : D.attrs()) {                for (auto \*A : D.attrs())
    if (shouldProcessAttr(A)) {                if (shouldProcessAttr(A))
      handleAttr(A);                             handleAttr(A);
    }                                      }
  }
}

if (isa<FunctionDecl\>(D)) {        vs.     if (isa<FunctionDecl\>(D))
  for (auto \*A : D.attrs()) {                for (auto \*A : D.attrs())
    handleAttr(A);                             handleAttr(A);
  }
}

if (auto \*D \= (T)(D)) {            vs.     if (auto \*D \= (T)(D)) {
  if (shouldProcess(D)) {                    if (shouldProcess(D))
    handleVarDecl(D);                          handleVarDecl(D);
  } else {                                   else
    markAsIgnored(D);                          markAsIgnored(D);
  }                                        }
}

if (a) {                           vs.     if (a)
  b();                                       b();
} else {                                   else if (c)
  if (c) {                                   d();
    d();                                   else
  } else {                                   e();
    e();
  }
}

**RemoveEmptyLinesInUnwrappedLines** (`Boolean`) clang-format 20 [¶](#removeemptylinesinunwrappedlines)

Remove empty lines within unwrapped lines.

false:                            true:

int c                  vs.        int c \= a + b;

    \= a + b;

enum : unsigned        vs.        enum : unsigned {
                                    AA \= 0,
{                                   BB
  AA \= 0,                         } myEnum;
  BB
} myEnum;

while (                vs.        while (true) {
                                  }
    true) {
}

**RemoveParentheses** (`RemoveParenthesesStyle`) clang-format 17 [¶](#removeparentheses)

Remove redundant parentheses.

Warning

Setting this option to any value other than `Leave` could lead to incorrect code formatting due to clang-format’s lack of complete semantic information. As such, extra care should be taken to review code changes made by this option.

Possible values:

*   `RPS_Leave` (in configuration: `Leave`) Do not remove parentheses.
    
    class \_\_declspec((dllimport)) X {};
    co\_return (((0)));
    return ((a + b) \- ((c + d)));
    
*   `RPS_MultipleParentheses` (in configuration: `MultipleParentheses`) Replace multiple parentheses with single parentheses.
    
    class \_\_declspec(dllimport) X {};
    co\_return (0);
    return ((a + b) \- (c + d));
    
*   `RPS_ReturnStatement` (in configuration: `ReturnStatement`) Also remove parentheses enclosing the expression in a `return`/`co_return` statement.
    
    class \_\_declspec(dllimport) X {};
    co\_return 0;
    return (a + b) \- (c + d);
    

**RemoveSemicolon** (`Boolean`) clang-format 16 [¶](#removesemicolon)

Remove semicolons after the closing braces of functions and constructors/destructors.

Warning

Setting this option to `true` could lead to incorrect code formatting due to clang-format’s lack of complete semantic information. As such, extra care should be taken to review code changes made by this option.

false:                                     true:

int max(int a, int b) {                    int max(int a, int b) {
  return a \> b ? a : b;                      return a \> b ? a : b;
};                                         }

**RequiresClausePosition** (`RequiresClausePositionStyle`) clang-format 15 [¶](#requiresclauseposition)

The position of the `requires` clause.

Possible values:

*   `RCPS_OwnLine` (in configuration: `OwnLine`) Always put the `requires` clause on its own line (possibly followed by a semicolon).
    
    template <typename T\>
      requires C<T\>
    struct Foo {...
    
    template <typename T\>
    void bar(T t)
      requires C<T\>;
    
    template <typename T\>
      requires C<T\>
    void bar(T t) {...
    
    template <typename T\>
    void baz(T t)
      requires C<T\>
    {...
    
*   `RCPS_OwnLineWithBrace` (in configuration: `OwnLineWithBrace`) As with `OwnLine`, except, unless otherwise prohibited, place a following open brace (of a function definition) to follow on the same line.
    
    void bar(T t)
      requires C<T\> {
      return;
    }
    
    void bar(T t)
      requires C<T\> {}
    
    template <typename T\>
      requires C<T\>
    void baz(T t) {
      ...
    
*   `RCPS_WithPreceding` (in configuration: `WithPreceding`) Try to put the clause together with the preceding part of a declaration. For class templates: stick to the template declaration. For function templates: stick to the template declaration. For function declaration followed by a requires clause: stick to the parameter list.
    
    template <typename T\> requires C<T\>
    struct Foo {...
    
    template <typename T\> requires C<T\>
    void bar(T t) {...
    
    template <typename T\>
    void baz(T t) requires C<T\>
    {...
    
*   `RCPS_WithFollowing` (in configuration: `WithFollowing`) Try to put the `requires` clause together with the class or function declaration.
    
    template <typename T\>
    requires C<T\> struct Foo {...
    
    template <typename T\>
    requires C<T\> void bar(T t) {...
    
    template <typename T\>
    void baz(T t)
    requires C<T\> {...
    
*   `RCPS_SingleLine` (in configuration: `SingleLine`) Try to put everything in the same line if possible. Otherwise normal line breaking rules take over.
    
    // Fitting:
    template <typename T\> requires C<T\> struct Foo {...
    
    template <typename T\> requires C<T\> void bar(T t) {...
    
    template <typename T\> void bar(T t) requires C<T\> {...
    
    // Not fitting, one possible example:
    template <typename LongName\>
    requires C<LongName\>
    struct Foo {...
    
    template <typename LongName\>
    requires C<LongName\>
    void bar(LongName ln) {
    
    template <typename LongName\>
    void bar(LongName ln)
        requires C<LongName\> {
    

**RequiresExpressionIndentation** (`RequiresExpressionIndentationKind`) clang-format 16 [¶](#requiresexpressionindentation)

The indentation used for requires expression bodies.

Possible values:

*   `REI_OuterScope` (in configuration: `OuterScope`) Align requires expression body relative to the indentation level of the outer scope the requires expression resides in. This is the default.
    
    template <typename T\>
    concept C \= requires(T t) {
      ...
    }
    
*   `REI_Keyword` (in configuration: `Keyword`) Align requires expression body relative to the `requires` keyword.
    
    template <typename T\>
    concept C \= requires(T t) {
                  ...
                }
    

**SeparateDefinitionBlocks** (`SeparateDefinitionStyle`) clang-format 14 [¶](#separatedefinitionblocks)

Specifies the use of empty lines to separate definition blocks, including classes, structs, enums, and functions.

Never                  v.s.     Always
#include <cstring>              #include <cstring>
struct Foo {
  int a, b, c;                  struct Foo {
};                                int a, b, c;
namespace Ns {                  };
class Bar {
public:                         namespace Ns {
  struct Foobar {               class Bar {
    int a;                      public:
    int b;                        struct Foobar {
  };                                int a;
private:                            int b;
  int t;                          };
  int method1() {
    // ...                      private:
  }                               int t;
  enum List {
    ITEM1,                        int method1() {
    ITEM2                           // ...
  };                              }
  template<typename T\>
  int method2(T x) {              enum List {
    // ...                          ITEM1,
  }                                 ITEM2
  int i, j, k;                    };
  int method3(int par) {
    // ...                        template<typename T>
  }                               int method2(T x) {
};                                  // ...
class C {};                       }
}
                                  int i, j, k;

                                  int method3(int par) {
                                    // ...
                                  }
                                };

                                class C {};
                                }

Possible values:

*   `SDS_Leave` (in configuration: `Leave`) Leave definition blocks as they are.
    
*   `SDS_Always` (in configuration: `Always`) Insert an empty line between definition blocks.
    
*   `SDS_Never` (in configuration: `Never`) Remove any empty line between definition blocks.
    

**ShortNamespaceLines** (`Unsigned`) clang-format 13 [¶](#shortnamespacelines)

The maximal number of unwrapped lines that a short namespace spans. Defaults to 1.

This determines the maximum length of short namespaces by counting unwrapped lines (i.e. containing neither opening nor closing namespace brace) and makes `FixNamespaceComments` omit adding end comments for those.

ShortNamespaceLines: 1     vs.     ShortNamespaceLines: 0
namespace a {                      namespace a {
  int foo;                           int foo;
}                                  } // namespace a

ShortNamespaceLines: 1     vs.     ShortNamespaceLines: 0
namespace b {                      namespace b {
  int foo;                           int foo;
  int bar;                           int bar;
} // namespace b                   } // namespace b

**SkipMacroDefinitionBody** (`Boolean`) clang-format 18 [¶](#skipmacrodefinitionbody)

Do not format macro definition body.

**SortIncludes** (`SortIncludesOptions`) clang-format 3.8 [¶](#sortincludes)

Controls if and how clang-format will sort `#includes`.

Nested configuration flags:

Includes sorting options.

*   `bool Enabled` If `true`, includes are sorted based on the other suboptions below. (`Never` is deprecated by `Enabled: false`.)
    
*   `bool IgnoreCase` Whether or not includes are sorted in a case-insensitive fashion. (`CaseSensitive` and `CaseInsensitive` are deprecated by `IgnoreCase: false` and `IgnoreCase: true`, respectively.)
    
    true:                      false:
    #include "A/B.h"    vs.    #include "A/B.h"
    #include "A/b.h"           #include "A/b.h"
    #include "a/b.h"           #include "B/A.h"
    #include "B/A.h"           #include "B/a.h"
    #include "B/a.h"           #include "a/b.h"
    
*   `bool IgnoreExtension` When sorting includes in each block, only take file extensions into account if two includes compare equal otherwise.
    
    true:                          false:
    # include "A.h"         vs.    # include "A-util.h"
    # include "A.inc"              # include "A.h"
    # include "A-util.h"           # include "A.inc"
    

**SortJavaStaticImport** (`SortJavaStaticImportOptions`) clang-format 12 [¶](#sortjavastaticimport)

When sorting Java imports, by default static imports are placed before non-static imports. If `JavaStaticImportAfterImport` is `After`, static imports are placed after non-static imports.

Possible values:

*   `SJSIO_Before` (in configuration: `Before`) Static imports are placed before non-static imports.
    
    import static org.example.function1;
    
    import org.example.ClassA;
    
*   `SJSIO_After` (in configuration: `After`) Static imports are placed after non-static imports.
    
    import org.example.ClassA;
    
    import static org.example.function1;
    

**SortUsingDeclarations** (`SortUsingDeclarationsOptions`) clang-format 5 [¶](#sortusingdeclarations)

Controls if and how clang-format will sort using declarations.

Possible values:

*   `SUD_Never` (in configuration: `Never`) Using declarations are never sorted.
    
    using std::chrono::duration\_cast;
    using std::move;
    using boost::regex;
    using boost::regex\_constants::icase;
    using std::string;
    
*   `SUD_Lexicographic` (in configuration: `Lexicographic`) Using declarations are sorted in the order defined as follows: Split the strings by `::` and discard any initial empty strings. Sort the lists of names lexicographically, and within those groups, names are in case-insensitive lexicographic order.
    
    using boost::regex;
    using boost::regex\_constants::icase;
    using std::chrono::duration\_cast;
    using std::move;
    using std::string;
    
*   `SUD_LexicographicNumeric` (in configuration: `LexicographicNumeric`) Using declarations are sorted in the order defined as follows: Split the strings by `::` and discard any initial empty strings. The last element of each list is a non-namespace name; all others are namespace names. Sort the lists of names lexicographically, where the sort order of individual names is that all non-namespace names come before all namespace names, and within those groups, names are in case-insensitive lexicographic order.
    
    using boost::regex;
    using boost::regex\_constants::icase;
    using std::move;
    using std::string;
    using std::chrono::duration\_cast;
    

**SpaceAfterCStyleCast** (`Boolean`) clang-format 3.5 [¶](#spaceaftercstylecast)

If `true`, a space is inserted after C style casts.

true:                                  false:
(int) i;                       vs.     (int)i;

**SpaceAfterLogicalNot** (`Boolean`) clang-format 9 [¶](#spaceafterlogicalnot)

If `true`, a space is inserted after the logical not operator (`!`).

true:                                  false:
! someExpression();            vs.     !someExpression();

**SpaceAfterOperatorKeyword** (`Boolean`) clang-format 21 [¶](#spaceafteroperatorkeyword)

If `true`, a space will be inserted after the `operator` keyword.

true:                                false:
bool operator \==(int a);     vs.     bool operator\==(int a);

**SpaceAfterTemplateKeyword** (`Boolean`) clang-format 4 [¶](#spaceaftertemplatekeyword)

If `true`, a space will be inserted after the `template` keyword.

true:                                  false:
template <int\> void foo();     vs.     template<int\> void foo();

**SpaceAroundPointerQualifiers** (`SpaceAroundPointerQualifiersStyle`) clang-format 12 [¶](#spacearoundpointerqualifiers)

Defines in which cases to put a space before or after pointer qualifiers

Possible values:

*   `SAPQ_Default` (in configuration: `Default`) Don’t ensure spaces around pointer qualifiers and use PointerAlignment instead.
    
    PointerAlignment: Left                 PointerAlignment: Right
    void\* const\* x \= NULL;         vs.     void \*const \*x \= NULL;
    
*   `SAPQ_Before` (in configuration: `Before`) Ensure that there is a space before pointer qualifiers.
    
    PointerAlignment: Left                 PointerAlignment: Right
    void\* const\* x \= NULL;         vs.     void \* const \*x \= NULL;
    
*   `SAPQ_After` (in configuration: `After`) Ensure that there is a space after pointer qualifiers.
    
    PointerAlignment: Left                 PointerAlignment: Right
    void\* const \* x \= NULL;         vs.     void \*const \*x \= NULL;
    
*   `SAPQ_Both` (in configuration: `Both`) Ensure that there is a space both before and after pointer qualifiers.
    
    PointerAlignment: Left                 PointerAlignment: Right
    void\* const \* x \= NULL;         vs.     void \* const \*x \= NULL;
    

**SpaceBeforeAssignmentOperators** (`Boolean`) clang-format 3.7 [¶](#spacebeforeassignmentoperators)

If `false`, spaces will be removed before assignment operators.

true:                                  false:
int a \= 5;                     vs.     int a\= 5;
a += 42;                               a+= 42;

**SpaceBeforeCaseColon** (`Boolean`) clang-format 12 [¶](#spacebeforecasecolon)

If `false`, spaces will be removed before case colon.

true:                                   false
switch (x) {                    vs.     switch (x) {
  case 1 : break;                         case 1: break;
}                                       }

**SpaceBeforeCpp11BracedList** (`Boolean`) clang-format 7 [¶](#spacebeforecpp11bracedlist)

If `true`, a space will be inserted before a C++11 braced list used to initialize an object (after the preceding identifier or type).

true:                                  false:
Foo foo { bar };               vs.     Foo foo{ bar };
Foo {};                                Foo{};
vector<int\> { 1, 2, 3 };               vector<int\>{ 1, 2, 3 };
new int\[3\] { 1, 2, 3 };                new int\[3\]{ 1, 2, 3 };

**SpaceBeforeCtorInitializerColon** (`Boolean`) clang-format 7 [¶](#spacebeforectorinitializercolon)

If `false`, spaces will be removed before constructor initializer colon.

true:                                  false:
Foo::Foo() : a(a) {}                   Foo::Foo(): a(a) {}

**SpaceBeforeInheritanceColon** (`Boolean`) clang-format 7 [¶](#spacebeforeinheritancecolon)

If `false`, spaces will be removed before inheritance colon.

true:                                  false:
class Foo : Bar {}             vs.     class Foo: Bar {}

**SpaceBeforeJsonColon** (`Boolean`) clang-format 17 [¶](#spacebeforejsoncolon)

If `true`, a space will be added before a JSON colon. For other languages, e.g. JavaScript, use `SpacesInContainerLiterals` instead.

true:                                  false:
{                                      {
  "key" : "value"              vs.       "key": "value"
}                                      }

**SpaceBeforeParens** (`SpaceBeforeParensStyle`) clang-format 3.5 [¶](#spacebeforeparens)

Defines in which cases to put a space before opening parentheses.

Possible values:

*   `SBPO_Never` (in configuration: `Never`) This is **deprecated** and replaced by `Custom` below, with all `SpaceBeforeParensOptions` but `AfterPlacementOperator` set to `false`.
    
*   `SBPO_ControlStatements` (in configuration: `ControlStatements`) Put a space before opening parentheses only after control statement keywords (`for/if/while...`).
    
    void f() {
      if (true) {
        f();
      }
    }
    
*   `SBPO_ControlStatementsExceptControlMacros` (in configuration: `ControlStatementsExceptControlMacros`) Same as `SBPO_ControlStatements` except this option doesn’t apply to ForEach and If macros. This is useful in projects where ForEach/If macros are treated as function calls instead of control statements. `SBPO_ControlStatementsExceptForEachMacros` remains an alias for backward compatibility.
    
    void f() {
      Q\_FOREACH(...) {
        f();
      }
    }
    
*   `SBPO_NonEmptyParentheses` (in configuration: `NonEmptyParentheses`) Put a space before opening parentheses only if the parentheses are not empty.
    
    void() {
      if (true) {
        f();
        g (x, y, z);
      }
    }
    
*   `SBPO_Always` (in configuration: `Always`) Always put a space before opening parentheses, except when it’s prohibited by the syntax rules (in function-like macro definitions) or when determined by other style rules (after unary operators, opening parentheses, etc.)
    
    void f () {
      if (true) {
        f ();
      }
    }
    
*   `SBPO_Custom` (in configuration: `Custom`) Configure each individual space before parentheses in `SpaceBeforeParensOptions`.
    

**SpaceBeforeParensOptions** (`SpaceBeforeParensCustom`) clang-format 14 [¶](#spacebeforeparensoptions)

Control of individual space before parentheses.

If `SpaceBeforeParens` is set to `Custom`, use this to specify how each individual space before parentheses case should be handled. Otherwise, this is ignored.

\# Example of usage:
SpaceBeforeParens: Custom
SpaceBeforeParensOptions:
  AfterControlStatements: true
  AfterFunctionDefinitionName: true

Nested configuration flags:

Precise control over the spacing before parentheses.

\# Should be declared this way:
SpaceBeforeParens: Custom
SpaceBeforeParensOptions:
  AfterControlStatements: true
  AfterFunctionDefinitionName: true

*   `bool AfterControlStatements` If `true`, put space between control statement keywords (for/if/while…) and opening parentheses.
    
    true:                                  false:
    if (...) {}                     vs.    if(...) {}
    
*   `bool AfterForeachMacros` If `true`, put space between foreach macros and opening parentheses.
    
    true:                                  false:
    FOREACH (...)                   vs.    FOREACH(...)
      <loop\-body\>                            <loop\-body\>
    
*   `bool AfterFunctionDeclarationName` If `true`, put a space between function declaration name and opening parentheses.
    
    true:                                  false:
    void f ();                      vs.    void f();
    
*   `bool AfterFunctionDefinitionName` If `true`, put a space between function definition name and opening parentheses.
    
    true:                                  false:
    void f () {}                    vs.    void f() {}
    
*   `bool AfterIfMacros` If `true`, put space between if macros and opening parentheses.
    
    true:                                  false:
    IF (...)                        vs.    IF(...)
      <conditional\-body\>                     <conditional\-body\>
    
*   `bool AfterNot` If `true`, put a space between alternative operator `not` and the opening parenthesis.
    
    true:                                  false:
    return not (a || b);            vs.    return not(a || b);
    
*   `bool AfterOverloadedOperator` If `true`, put a space between operator overloading and opening parentheses.
    
    true:                                  false:
    void operator++ (int a);        vs.    void operator++(int a);
    object.operator++ (10);                object.operator++(10);
    
*   `bool AfterPlacementOperator` If `true`, put a space between operator `new`/`delete` and opening parenthesis.
    
    true:                                  false:
    new (buf) T;                    vs.    new(buf) T;
    delete (buf) T;                        delete(buf) T;
    
*   `bool AfterRequiresInClause` If `true`, put space between requires keyword in a requires clause and opening parentheses, if there is one.
    
    true:                                  false:
    template<typename T\>            vs.    template<typename T\>
    requires (A<T\> && B<T\>)                requires(A<T\> && B<T\>)
    ...                                    ...
    
*   `bool AfterRequiresInExpression` If `true`, put space between requires keyword in a requires expression and opening parentheses.
    
    true:                                  false:
    template<typename T\>            vs.    template<typename T\>
    concept C \= requires (T t) {           concept C \= requires(T t) {
                  ...                                    ...
                }                                      }
    
*   `bool BeforeNonEmptyParentheses` If `true`, put a space before opening parentheses only if the parentheses are not empty.
    
    true:                                  false:
    void f (int a);                 vs.    void f();
    f (a);                                 f();
    

**SpaceBeforeRangeBasedForLoopColon** (`Boolean`) clang-format 7 [¶](#spacebeforerangebasedforloopcolon)

If `false`, spaces will be removed before range-based for loop colon.

true:                                  false:
for (auto v : values) {}       vs.     for(auto v: values) {}

**SpaceBeforeSquareBrackets** (`Boolean`) clang-format 10 [¶](#spacebeforesquarebrackets)

If `true`, spaces will be before `[`. Lambdas will not be affected. Only the first `[` will get a space added.

true:                                  false:
int a \[5\];                    vs.      int a\[5\];
int a \[5\]\[5\];                 vs.      int a\[5\]\[5\];

**SpaceInEmptyBlock** (`Boolean`) clang-format 10 [¶](#spaceinemptyblock)

This option is **deprecated**. See `Block` of `SpaceInEmptyBraces`.

**SpaceInEmptyBraces** (`SpaceInEmptyBracesStyle`) clang-format 22 [¶](#spaceinemptybraces)

Specifies when to insert a space in empty braces.

Note

This option doesn’t apply to initializer braces if `Cpp11BracedListStyle` is set to `true`.

Possible values:

*   `SIEB_Always` (in configuration: `Always`) Always insert a space in empty braces.
    
    void f() { }
    class Unit { };
    auto a \= \[\] { };
    int x{ };
    
*   `SIEB_Block` (in configuration: `Block`) Only insert a space in empty blocks.
    
    void f() { }
    class Unit { };
    auto a \= \[\] { };
    int x{};
    
*   `SIEB_Never` (in configuration: `Never`) Never insert a space in empty braces.
    
    void f() {}
    class Unit {};
    auto a \= \[\] {};
    int x{};
    

**SpaceInEmptyParentheses** (`Boolean`) clang-format 3.7 [¶](#spaceinemptyparentheses)

If `true`, spaces may be inserted into `()`. This option is **deprecated**. See `InEmptyParentheses` of `SpacesInParensOptions`.

**SpacesInAngles** (`SpacesInAnglesStyle`) clang-format 3.4 [¶](#spacesinangles)

The SpacesInAnglesStyle to use for template argument lists.

Possible values:

*   `SIAS_Never` (in configuration: `Never`) Remove spaces after `<` and before `>`.
    
    static\_cast<int\>(arg);
    std::function<void(int)\> fct;
    
*   `SIAS_Always` (in configuration: `Always`) Add spaces after `<` and before `>`.
    
    static\_cast< int \>(arg);
    std::function< void(int) \> fct;
    
*   `SIAS_Leave` (in configuration: `Leave`) Keep a single space after `<` and before `>` if any spaces were present. Option `Standard: Cpp03` takes precedence.
    

**SpacesInCStyleCastParentheses** (`Boolean`) clang-format 3.7 [¶](#spacesincstylecastparentheses)

If `true`, spaces may be inserted into C style casts. This option is **deprecated**. See `InCStyleCasts` of `SpacesInParensOptions`.

**SpacesInConditionalStatement** (`Boolean`) clang-format 10 [¶](#spacesinconditionalstatement)

If `true`, spaces will be inserted around if/for/switch/while conditions. This option is **deprecated**. See `InConditionalStatements` of `SpacesInParensOptions`.

**SpacesInContainerLiterals** (`Boolean`) clang-format 3.7 [¶](#spacesincontainerliterals)

If `true`, spaces are inserted inside container literals (e.g. ObjC and Javascript array and dict literals). For JSON, use `SpaceBeforeJsonColon` instead.

true:                                  false:
var arr \= \[ 1, 2, 3 \];         vs.     var arr \= \[1, 2, 3\];
f({a : 1, b : 2, c : 3});              f({a: 1, b: 2, c: 3});

**SpacesInParens** (`SpacesInParensStyle`) clang-format 17 [¶](#spacesinparens)

Defines in which cases spaces will be inserted after `(` and before `)`.

Possible values:

*   `SIPO_Never` (in configuration: `Never`) Never put a space in parentheses.
    
    void f() {
      if(true) {
        f();
      }
    }
    
*   `SIPO_Custom` (in configuration: `Custom`) Configure each individual space in parentheses in SpacesInParensOptions.
    

**SpacesInParensOptions** (`SpacesInParensCustom`) clang-format 17 [¶](#spacesinparensoptions)

Control of individual spaces in parentheses.

If `SpacesInParens` is set to `Custom`, use this to specify how each individual space in parentheses case should be handled. Otherwise, this is ignored.

\# Example of usage:
SpacesInParens: Custom
SpacesInParensOptions:
  ExceptDoubleParentheses: false
  InConditionalStatements: true
  InEmptyParentheses: true

Nested configuration flags:

Precise control over the spacing in parentheses.

\# Should be declared this way:
SpacesInParens: Custom
SpacesInParensOptions:
  ExceptDoubleParentheses: false
  InConditionalStatements: true
  Other: true

*   `bool ExceptDoubleParentheses` Override any of the following options to prevent addition of space when both opening and closing parentheses use multiple parentheses.
    
     true:
     \_\_attribute\_\_(( noreturn ))
     \_\_decltype\_\_(( x ))
     if (( a \= b ))
    false:
      Uses the applicable option.
    
*   `bool InConditionalStatements` Put a space in parentheses only inside conditional statements (`for/if/while/switch...`).
    
    true:                                  false:
    if ( a )  { ... }              vs.     if (a) { ... }
    while ( i < 5 )  { ... }               while (i < 5) { ... }
    
*   `bool InCStyleCasts` Put a space in C style casts.
    
    true:                                  false:
    x \= ( int32 )y                  vs.    x \= (int32)y
    y \= (( int (\*)(int) )foo)(x);          y \= ((int (\*)(int))foo)(x);
    
*   `bool InEmptyParentheses` Insert a space in empty parentheses, i.e. `()`.
    
    true:                                false:
    void f( ) {                    vs.   void f() {
      int x\[\] \= {foo( ), bar( )};          int x\[\] \= {foo(), bar()};
      if (true) {                          if (true) {
        f( );                                f();
      }                                    }
    }                                    }
    
*   `bool Other` Put a space in parentheses not covered by preceding options.
    
    true:                                 false:
    t f( Deleted & ) & \= delete;    vs.   t f(Deleted &) & \= delete;
    

**SpacesInParentheses** (`Boolean`) clang-format 3.7 [¶](#spacesinparentheses)

If `true`, spaces will be inserted after `(` and before `)`. This option is **deprecated**. The previous behavior is preserved by using `SpacesInParens` with `Custom` and by setting all `SpacesInParensOptions` to `true` except for `InCStyleCasts` and `InEmptyParentheses`.

**SpacesInSquareBrackets** (`Boolean`) clang-format 3.7 [¶](#spacesinsquarebrackets)

If `true`, spaces will be inserted after `[` and before `]`. Lambdas without arguments or unspecified size array declarations will not be affected.

true:                                  false:
int a\[ 5 \];                    vs.     int a\[5\];
std::unique\_ptr<int\[\]\> foo() {} // Won't be affected

**Standard** (`LanguageStandard`) clang-format 3.7 [¶](#standard)

Parse and format C++ constructs compatible with this standard.

c++03:                                 latest:
vector<set<int\> \> x;           vs.     vector<set<int\>> x;

Possible values:

*   `LS_Cpp03` (in configuration: `c++03`) Parse and format as C++03. `Cpp03` is a deprecated alias for `c++03`
    
*   `LS_Cpp11` (in configuration: `c++11`) Parse and format as C++11.
    
*   `LS_Cpp14` (in configuration: `c++14`) Parse and format as C++14.
    
*   `LS_Cpp17` (in configuration: `c++17`) Parse and format as C++17.
    
*   `LS_Cpp20` (in configuration: `c++20`) Parse and format as C++20.
    
*   `LS_Latest` (in configuration: `Latest`) Parse and format using the latest supported language version. `Cpp11` is a deprecated alias for `Latest`
    
*   `LS_Auto` (in configuration: `Auto`) Automatic detection based on the input.
    

**StatementAttributeLikeMacros** (`List of Strings`) clang-format 12 [¶](#statementattributelikemacros)

Macros which are ignored in front of a statement, as if they were an attribute. So that they are not parsed as identifier, for example for Qts emit.

AlignConsecutiveDeclarations: true
StatementAttributeLikeMacros: \[\]
unsigned char data \= 'x';
emit          signal(data); // This is parsed as variable declaration.

AlignConsecutiveDeclarations: true
StatementAttributeLikeMacros: \[emit\]
unsigned char data \= 'x';
emit signal(data); // Now it's fine again.

**StatementMacros** (`List of Strings`) clang-format 8 [¶](#statementmacros)

A vector of macros that should be interpreted as complete statements.

Typical macros are expressions and require a semicolon to be added. Sometimes this is not the case, and this allows to make clang-format aware of such cases.

For example: Q\_UNUSED

**TabWidth** (`Unsigned`) clang-format 3.7 [¶](#tabwidth)

The number of columns used for tab stops.

**TableGenBreakInsideDAGArg** (`DAGArgStyle`) clang-format 19 [¶](#tablegenbreakinsidedagarg)

The styles of the line break inside the DAGArg in TableGen.

Possible values:

*   `DAS_DontBreak` (in configuration: `DontBreak`) Never break inside DAGArg.
    
    let DAGArgIns \= (ins i32:$src1, i32:$src2);
    
*   `DAS_BreakElements` (in configuration: `BreakElements`) Break inside DAGArg after each list element but for the last. This aligns to the first element.
    
    let DAGArgIns \= (ins i32:$src1,
                         i32:$src2);
    
*   `DAS_BreakAll` (in configuration: `BreakAll`) Break inside DAGArg after the operator and the all elements.
    
    let DAGArgIns \= (ins
        i32:$src1,
        i32:$src2
    );
    

**TableGenBreakingDAGArgOperators** (`List of Strings`) clang-format 19 [¶](#tablegenbreakingdagargoperators)

Works only when TableGenBreakInsideDAGArg is not DontBreak. The string list needs to consist of identifiers in TableGen. If any identifier is specified, this limits the line breaks by TableGenBreakInsideDAGArg option only on DAGArg values beginning with the specified identifiers.

For example the configuration,

TableGenBreakInsideDAGArg: BreakAll
TableGenBreakingDAGArgOperators: \[ins, outs\]

makes the line break only occurs inside DAGArgs beginning with the specified identifiers `ins` and `outs`.

let DAGArgIns \= (ins
    i32:$src1,
    i32:$src2
);
let DAGArgOtherID \= (other i32:$other1, i32:$other2);
let DAGArgBang \= (!cast<SomeType\>("Some") i32:$src1, i32:$src2)

**TemplateNames** (`List of Strings`) clang-format 20 [¶](#templatenames)

A vector of non-keyword identifiers that should be interpreted as template names.

A `<` after a template name is annotated as a template opener instead of a binary operator.

**TypeNames** (`List of Strings`) clang-format 17 [¶](#typenames)

A vector of non-keyword identifiers that should be interpreted as type names.

A `*`, `&`, or `&&` between a type name and another non-keyword identifier is annotated as a pointer or reference token instead of a binary operator.

**TypenameMacros** (`List of Strings`) clang-format 9 [¶](#typenamemacros)

A vector of macros that should be interpreted as type declarations instead of as function calls.

These are expected to be macros of the form:

STACK\_OF(...)

In the .clang-format configuration file, this can be configured like:

TypenameMacros: \[STACK\_OF, LIST\]

For example: OpenSSL STACK\_OF, BSD LIST\_ENTRY.

**UseCRLF** (`Boolean`) clang-format 10 [¶](#usecrlf)

This option is **deprecated**. See `LF` and `CRLF` of `LineEnding`.

**UseTab** (`UseTabStyle`) clang-format 3.7 [¶](#usetab)

The way to use tab characters in the resulting file.

Possible values:

*   `UT_Never` (in configuration: `Never`) Never use tab.
    
*   `UT_ForIndentation` (in configuration: `ForIndentation`) Use tabs only for indentation.
    
*   `UT_ForContinuationAndIndentation` (in configuration: `ForContinuationAndIndentation`) Fill all leading whitespace with tabs, and use spaces for alignment that appears within a line (e.g. consecutive assignments and declarations).
    
*   `UT_AlignWithSpaces` (in configuration: `AlignWithSpaces`) Use tabs for line continuation and indentation, and spaces for alignment.
    
*   `UT_Always` (in configuration: `Always`) Use tabs whenever we need to fill whitespace that spans at least from one tab stop to the next one.
    

**VariableTemplates** (`List of Strings`) clang-format 20 [¶](#variabletemplates)

A vector of non-keyword identifiers that should be interpreted as variable template names.

A `)` after a variable template instantiation is **not** annotated as the closing parenthesis of C-style cast operator.

**VerilogBreakBetweenInstancePorts** (`Boolean`) clang-format 17 [¶](#verilogbreakbetweeninstanceports)

For Verilog, put each port on its own line in module instantiations.

true:
ffnand ff1(.q(),
           .qbar(out1),
           .clear(in1),
           .preset(in2));

false:
ffnand ff1(.q(), .qbar(out1), .clear(in1), .preset(in2));

**WhitespaceSensitiveMacros** (`List of Strings`) clang-format 11 [¶](#whitespacesensitivemacros)

A vector of macros which are whitespace-sensitive and should not be touched.

These are expected to be macros of the form:

STRINGIZE(...)

In the .clang-format configuration file, this can be configured like:

WhitespaceSensitiveMacros: \[STRINGIZE, PP\_STRINGIZE\]

For example: BOOST\_PP\_STRINGIZE

**WrapNamespaceBodyWithEmptyLines** (`WrapNamespaceBodyWithEmptyLinesStyle`) clang-format 20 [¶](#wrapnamespacebodywithemptylines)

Wrap namespace body with empty lines.

Possible values:

*   `WNBWELS_Never` (in configuration: `Never`) Remove all empty lines at the beginning and the end of namespace body.
    
    namespace N1 {
    namespace N2 {
    function();
    }
    }
    
*   `WNBWELS_Always` (in configuration: `Always`) Always have at least one empty line at the beginning and the end of namespace body except that the number of empty lines between consecutive nested namespace definitions is not increased.
    
    namespace N1 {
    namespace N2 {
    
    function();
    
    }
    }
    
*   `WNBWELS_Leave` (in configuration: `Leave`) Keep existing newlines at the beginning and the end of namespace body. `MaxEmptyLinesToKeep` still applies.
    

Adding additional style options[¶](#adding-additional-style-options "Link to this heading")
-------------------------------------------------------------------------------------------

Each additional style option adds costs to the clang-format project. Some of these costs affect the clang-format development itself, as we need to make sure that any given combination of options work and that new features don’t break any of the existing options in any way. There are also costs for end users as options become less discoverable and people have to think about and make a decision on options they don’t really care about.

The goal of the clang-format project is more on the side of supporting a limited set of styles really well as opposed to supporting every single style used by a codebase somewhere in the wild. Of course, we do want to support all major projects and thus have established the following bar for adding style options. Each new style option must:

> *   be used in a project of significant size (have dozens of contributors)
>     
> *   have a publicly accessible style guide
>     
> *   have a person willing to contribute and maintain patches
>     

Examples[¶](#examples "Link to this heading")
---------------------------------------------

A style similar to the [Linux Kernel style](https://www.kernel.org/doc/html/latest/process/coding-style.html):

BasedOnStyle: LLVM
IndentWidth: 8
UseTab: Always
BreakBeforeBraces: Linux
AllowShortIfStatementsOnASingleLine: false
IndentCaseLabels: false

The result is (imagine that tabs are used for indentation here):

void test()
{
        switch (x) {
        case 0:
        case 1:
                do\_something();
                break;
        case 2:
                do\_something\_else();
                break;
        default:
                break;
        }
        if (condition)
                do\_something\_completely\_different();

        if (x \== y) {
                q();
        } else if (x \> y) {
                w();
        } else {
                r();
        }
}

A style similar to the default Visual Studio formatting style:

UseTab: Never
IndentWidth: 4
BreakBeforeBraces: Allman
AllowShortIfStatementsOnASingleLine: false
IndentCaseLabels: false
ColumnLimit: 0

The result is:

void test()
{
    switch (suffix)
    {
    case 0:
    case 1:
        do\_something();
        break;
    case 2:
        do\_something\_else();
        break;
    default:
        break;
    }
    if (condition)
        do\_something\_completely\_different();

    if (x \== y)
    {
        q();
    }
    else if (x \> y)
    {
        w();
    }
    else
    {
        r();
    }
}
---
title: "Clang Transformer Tutorial — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangTransformerTutorial.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
A tutorial on how to write a source-to-source translation tool using Clang Transformer.

*   [What is Clang Transformer?](#what-is-clang-transformer)
    
*   [Who is Clang Transformer for?](#who-is-clang-transformer-for)
    
*   [Getting Started](#getting-started)
    
    *   [Example: style-checking names](#example-style-checking-names)
        
    *   [Example: renaming a function](#example-renaming-a-function)
        
    *   [Example: method to function](#example-method-to-function)
        
    *   [Example: rewriting method calls](#example-rewriting-method-calls)
        
*   [Reference: ranges, stencils, edits, rules](#reference-ranges-stencils-edits-rules)
    
    *   [Rewriting ASTs to… Text?](#rewriting-asts-to-text)
        
    *   [Range Selectors](#range-selectors)
        
    *   [Stencils](#stencils)
        
    *   [Edits](#edits)
        
    *   [`EditGenerator`s (Advanced)](#editgenerators-advanced)
        
    *   [Rules](#rules)
        
*   [Using a RewriteRule as a clang-tidy check](#using-a-rewriterule-as-a-clang-tidy-check)
    
*   [Related Reading](#related-reading)
    

[What is Clang Transformer?](#id4)[¶](#what-is-clang-transformer "Link to this heading")
----------------------------------------------------------------------------------------

Clang Transformer is a framework for writing C++ diagnostics and program transformations. It is built on the clang toolchain and the LibTooling library, but aims to hide much of the complexity of clang’s native, low-level libraries.

The core abstraction of Transformer is the _rewrite rule_, which specifies how to change a given program pattern into a new form. Here are some examples of tasks you can achieve with Transformer:

*   warn against using the name `MkX` for a declared function,
    
*   change `MkX` to `MakeX`, where `MkX` is the name of a declared function,
    
*   change `s.size()` to `Size(s)`, where `s` is a `string`,
    
*   collapse `e.child().m()` to `e.m()`, for any expression `e` and method named `m`.
    

All of the examples have a common form: they identify a pattern that is the target of the transformation, they specify an _edit_ to the code identified by the pattern, and their pattern and edit refer to common variables, like `s`, `e`, and `m`, that range over code fragments. Our first and second examples also specify constraints on the pattern that aren’t apparent from the syntax alone, like “`s` is a `string`.” Even the first example (“warn …”) shares this form, even though it doesn’t change any of the code – it’s “edit” is simply a no-op.

Transformer helps users succinctly specify rules of this sort and easily execute them locally over a collection of files, apply them to selected portions of a codebase, or even bundle them as a clang-tidy check for ongoing application.

[Who is Clang Transformer for?](#id5)[¶](#who-is-clang-transformer-for "Link to this heading")
----------------------------------------------------------------------------------------------

Clang Transformer is for developers who want to write clang-tidy checks or write tools to modify a large number of C++ files in (roughly) the same way. What qualifies as “large” really depends on the nature of the change and your patience for repetitive editing. In our experience, automated solutions become worthwhile somewhere between 100 and 500 files.

[Getting Started](#id6)[¶](#getting-started "Link to this heading")
-------------------------------------------------------------------

Patterns in Transformer are expressed with [clang’s AST matchers](https://clang.llvm.org/docs/LibASTMatchers.html). Matchers are a language of combinators for describing portions of a clang Abstract Syntax Tree (AST). Since clang’s AST includes complete type information (within the limits of single [Translation Unit (TU)](https://en.wikipedia.org/wiki/Translation_unit_\(programming\)), these patterns can even encode rich constraints on the type properties of AST nodes.

We assume a familiarity with the clang AST and the corresponding AST matchers for the purpose of this tutorial. Users who are unfamiliar with either are encouraged to start with the recommended references in [Related Reading](#related-reading).

### [Example: style-checking names](#id7)[¶](#example-style-checking-names "Link to this heading")

Assume you have a style-guide rule which forbids functions from being named “MkX” and you want to write a check that catches any violations of this rule. We can express this a Transformer rewrite rule:

makeRule(functionDecl(hasName("MkX")).bind("fun"),
         noopEdit(node("fun")),
         cat("The name \`\`MkX\`\` is not allowed for functions; please rename"));

`makeRule` is our go-to function for generating rewrite rules. It takes three arguments: the pattern, the edit, and (optionally) an explanatory note. In our example, the pattern (`functionDecl(...)`) identifies the declaration of the function `MkX`. Since we’re just diagnosing the problem, but not suggesting a fix, our edit is an no-op. But, it contains an _anchor_ for the diagnostic message: `node("fun")` says to associate the message with the source range of the AST node bound to “fun”; in this case, the ill-named function declaration. Finally, we use `cat` to build a message that explains the change. Regarding the name `cat` – we’ll discuss it in more detail below, but suffice it to say that it can also take multiple arguments and concatenate their results.

Note that the result of `makeRule` is a value of type `clang::transformer::RewriteRule`, but most users don’t need to care about the details of this type.

### [Example: renaming a function](#id8)[¶](#example-renaming-a-function "Link to this heading")

Now, let’s extend this example to a _transformation_; specifically, the second example above:

makeRule(declRefExpr(to(functionDecl(hasName("MkX")))),
         changeTo(cat("MakeX")),
         cat("MkX has been renamed MakeX"));

In this example, the pattern (`declRefExpr(...)`) identifies any _reference_ to the function `MkX`, rather than the declaration itself, as in our previous example. Our edit (`changeTo(...)`) says to _change_ the code matched by the pattern _to_ the text “MakeX”. Finally, we use `cat` again to build a message that explains the change.

Here are some example changes that this rule would make:

Original

Result

`X x = MkX(3);`

`X x = MakeX(3);`

`CallFactory(MkX, 3);`

`CallFactory(MakeX, 3);`

`auto f = MkX;`

`auto f = MakeX;`

### [Example: method to function](#id9)[¶](#example-method-to-function "Link to this heading")

Next, let’s write a rule to replace a method call with a (free) function call, applied to the original method call’s target object. Specifically, “change `s.size()` to `Size(s)`, where `s` is a `string`.” We start with a simpler change that ignores the type of `s`. That is, it will modify _any_ method call where the method is named “size”:

llvm::StringRef s \= "str";
makeRule(
  cxxMemberCallExpr(
    on(expr().bind(s)),
    callee(cxxMethodDecl(hasName("size")))),
  changeTo(cat("Size(", node(s), ")")),
  cat("Method \`\`size\`\` is deprecated in favor of free function \`\`Size\`\`"));

We express the pattern with the given AST matcher, which binds the method call’s target to `s` [\[1\]](#f1). For the edit, we again use `changeTo`, but this time we construct the term from multiple parts, which we compose with `cat`. The second part of our term is `node(s)`, which selects the source code corresponding to the AST node `s` that was bound when a match was found in the AST for our rule’s pattern. `node(s)` constructs a `RangeSelector`, which, when used in `cat`, indicates that the selected source should be inserted in the output at that point.

Now, we probably don’t want to rewrite _all_ invocations of “size” methods, just those on `std::string`s. We can achieve this change simply by refining our matcher. The rest of the rule remains unchanged:

llvm::StringRef s \= "str";
makeRule(
  cxxMemberCallExpr(
    on(expr(hasType(namedDecl(hasName("std::string"))))
      .bind(s)),
    callee(cxxMethodDecl(hasName("size")))),
  changeTo(cat("Size(", node(s), ")")),
  cat("Method \`\`size\`\` is deprecated in favor of free function \`\`Size\`\`"));

### [Example: rewriting method calls](#id10)[¶](#example-rewriting-method-calls "Link to this heading")

In this example, we delete an “intermediary” method call in a string of invocations. This scenario can arise, for example, if you want to collapse a substructure into its parent.

llvm::StringRef e \= "expr", m \= "member";
auto child\_call \= cxxMemberCallExpr(on(expr().bind(e)),
                                    callee(cxxMethodDecl(hasName("child"))));
makeRule(cxxMemberCallExpr(on(child\_call), callee(memberExpr().bind(m)),
         changeTo(cat(e, ".", member(m), "()"))),
         cat("\`\`child\`\` accessor is being removed; call ",
             member(m), " directly on parent"));

This rule isn’t quite what we want: it will rewrite `my_object.child().foo()` to `my_object.foo()`, but it will also rewrite `my_ptr->child().foo()` to `my_ptr.foo()`, which is not what we intend. We could fix this by restricting the pattern with `not(isArrow())` in the definition of `child_call`. Yet, we _want_ to rewrite calls through pointers.

To capture this idiom, we provide the `access` combinator to intelligently construct a field/method access. In our example, the member access is expressed as:

access(e, cat(member(m)))

The first argument specifies the object being accessed and the second, a description of the field/method name. In this case, we specify that the method name should be copied from the source – specifically, the source range of `m`’s member. To construct the method call, we would use this expression in `cat`:

cat(access(e, cat(member(m))), "()")

[Reference: ranges, stencils, edits, rules](#id11)[¶](#reference-ranges-stencils-edits-rules "Link to this heading")
--------------------------------------------------------------------------------------------------------------------

The above examples demonstrate just the basics of rewrite rules. Every element we touched on has more available constructors: range selectors, stencils, edits and rules. In this section, we’ll briefly review each in turn, with references to the source headers for up-to-date information. First, though, we clarify what rewrite rules are actually rewriting.

### [Rewriting ASTs to… Text?](#id12)[¶](#rewriting-asts-to-text "Link to this heading")

The astute reader may have noticed that we’ve been somewhat vague in our explanation of what the rewrite rules are actually rewriting. We’ve referred to “code”, but code can be represented both as raw source text and as an abstract syntax tree. So, which one is it?

Ideally, we’d be rewriting the input AST to a new AST, but clang’s AST is not terribly amenable to this kind of transformation. So, we compromise: we express our patterns and the names that they bind in terms of the AST, but our changes in terms of source code text. We’ve designed Transformer’s language to bridge the gap between the two representations, in an attempt to minimize the user’s need to reason about source code locations and other, low-level syntactic details.

### [Range Selectors](#id13)[¶](#range-selectors "Link to this heading")

Transformer provides a small API for describing source ranges: the `RangeSelector` combinators. These ranges are most commonly used to specify the source code affected by an edit and to extract source code in constructing new text.

Roughly, there are two kinds of range combinators: ones that select a source range based on the AST, and others that combine existing ranges into new ranges. For example, `node` selects the range of source spanned by a particular AST node, as we’ve seen, while `after` selects the (empty) range located immediately after its argument range. So, `after(node("id"))` is the empty range immediately following the AST node bound to `id`.

For the full collection of `RangeSelector`s, see the header, [clang/Tooling/Transformer/RangeSelector.h](https://github.com/llvm/llvm-project/blob/main/clang/include/clang/Tooling/Transformer/RangeSelector.h)

### [Stencils](#id14)[¶](#stencils "Link to this heading")

Transformer offers a large and growing collection of combinators for constructing output. Above, we demonstrated `cat`, the core function for constructing stencils. It takes a series of arguments, of three possible kinds:

1.  Raw text, to be copied directly to the output.
    
2.  Selector: specified with a `RangeSelector`, indicates a range of source text to copy to the output.
    
3.  Builder: an operation that constructs a code snippet from its arguments. For example, the `access` function we saw above.
    

Data of these different types are all represented (generically) by a `Stencil`. `cat` takes text and `RangeSelector`s directly as arguments, rather than requiring that they be constructed with a builder; other builders are constructed explicitly.

In general, `Stencil`s produce text from a match result. So, they are not limited to generating source code, but can also be used to generate diagnostic messages that reference (named) elements of the matched code, like we saw in the example of rewriting method calls.

Further details of the `Stencil` type are documented in the header file [clang/Tooling/Transformer/Stencil.h](https://github.com/llvm/llvm-project/blob/main/clang/include/clang/Tooling/Transformer/Stencil.h).

### [Edits](#id15)[¶](#edits "Link to this heading")

Transformer supports additional forms of edits. First, in a `changeTo`, we can specify the particular portion of code to be replaced, using the same `RangeSelector` we saw earlier. For example, we could change the function name in a function declaration with:

makeRule(functionDecl(hasName("bad")).bind(f),
         changeTo(name(f), cat("good")),
         cat("bad is now good"));

We also provide simpler editing primitives for insertion and deletion: `insertBefore`, `insertAfter` and `remove`. These can all be found in the header file [clang/Tooling/Transformer/RewriteRule.h](https://github.com/llvm/llvm-project/blob/main/clang/include/clang/Tooling/Transformer/RewriteRule.h).

We are not limited one edit per match found. Some situations require making multiple edits for each match. For example, suppose we wanted to swap two arguments of a function call.

For this, we provide an overload of `makeRule` that takes a list of edits, rather than just a single one. Our example might look like:

makeRule(callExpr(...),
        {changeTo(node(arg0), cat(node(arg2))),
         changeTo(node(arg2), cat(node(arg0)))},
        cat("swap the first and third arguments of the call"));

### [`EditGenerator`s (Advanced)](#id16)[¶](#editgenerators-advanced "Link to this heading")

The particular edits we’ve seen so far are all instances of the `ASTEdit` class, or a list of such. But, not all edits can be expressed as `ASTEdit`s. So, we also support a very general signature for edit generators:

using EditGenerator \= MatchConsumer<llvm::SmallVector<Edit, 1\>>;

That is, an `EditGenerator` is function that maps a `MatchResult` to a set of edits, or fails. This signature supports a very general form of computation over match results. Transformer provides a number of functions for working with `EditGenerator`s, most notably [flatten](https://github.com/llvm/llvm-project/blob/1fabe6e51917bcd7a1242294069c682fe6dffa45/clang/include/clang/Tooling/Transformer/RewriteRule.h#L165-L167) `EditGenerator`s, like list flattening. For the full list, see the header file [clang/Tooling/Transformer/RewriteRule.h](https://github.com/llvm/llvm-project/blob/main/clang/include/clang/Tooling/Transformer/RewriteRule.h).

### [Rules](#id17)[¶](#rules "Link to this heading")

We can also compose multiple _rules_, rather than just edits within a rule, using `applyFirst`: it composes a list of rules as an ordered choice, where Transformer applies the first rule whose pattern matches, ignoring others in the list that follow. If the matchers are independent then order doesn’t matter. In that case, `applyFirst` is simply joining the set of rules into one.

The benefit of `applyFirst` is that, for some problems, it allows the user to more concisely formulate later rules in the list, since their patterns need not explicitly exclude the earlier patterns of the list. For example, consider a set of rules that rewrite compound statements, where one rule handles the case of an empty compound statement and the other handles non-empty compound statements. With `applyFirst`, these rules can be expressed compactly as:

applyFirst({
  makeRule(compoundStmt(statementCountIs(0)).bind("empty"), ...),
  makeRule(compoundStmt().bind("non-empty"),...)
})

The second rule does not need to explicitly specify that the compound statement is non-empty – it follows from the rules position in `applyFirst`. For more complicated examples, this can lead to substantially more readable code.

Sometimes, a modification to the code might require the inclusion of a particular header file. To this end, users can modify rules to specify include directives with `addInclude`.

For additional documentation on these functions, see the header file [clang/Tooling/Transformer/RewriteRule.h](https://github.com/llvm/llvm-project/blob/main/clang/include/clang/Tooling/Transformer/RewriteRule.h).

[Using a RewriteRule as a clang-tidy check](#id18)[¶](#using-a-rewriterule-as-a-clang-tidy-check "Link to this heading")
------------------------------------------------------------------------------------------------------------------------

Transformer supports executing a rewrite rule as a [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) check, with the class `clang::tidy::utils::TransformerClangTidyCheck`. It is designed to require minimal code in the definition. For example, given a rule `MyCheckAsRewriteRule`, one can define a tidy check as follows:

class MyCheck : public TransformerClangTidyCheck {
 public:
  MyCheck(StringRef Name, ClangTidyContext \*Context)
      : TransformerClangTidyCheck(MyCheckAsRewriteRule, Name, Context) {}
};

`TransformerClangTidyCheck` implements the virtual `registerMatchers` and `check` methods based on your rule specification, so you don’t need to implement them yourself. If the rule needs to be configured based on the language options and/or the clang-tidy configuration, it can be expressed as a function taking these as parameters and (optionally) returning a `RewriteRule`. This would be useful, for example, for our method-renaming rule, which is parameterized by the original name and the target. For details, see [clang-tools-extra/clang-tidy/utils/TransformerClangTidyCheck.h](https://github.com/llvm/llvm-project/blob/main/clang-tools-extra/clang-tidy/utils/TransformerClangTidyCheck.h)
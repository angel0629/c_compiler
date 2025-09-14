---
title: "Libclang tutorial — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/LibClang.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
The C Interface to Clang provides a relatively small API that exposes facilities for parsing source code into an abstract syntax tree (AST), loading already-parsed ASTs, traversing the AST, associating physical source locations with elements within the AST, and other facilities that support Clang-based development tools. This C interface to Clang will never provide all of the information representation stored in Clang’s C++ AST, nor should it: the intent is to maintain an API that is [relatively stable](#stability) from one release to the next, providing only the basic functionality needed to support development tools. The entire C interface of libclang is available in the file [Index.h](https://github.com/llvm/llvm-project/blob/main/clang/include/clang-c/Index.h)

Essential types overview[¶](#essential-types-overview "Link to this heading")
-----------------------------------------------------------------------------

All types of libclang are prefixed with `CX`

### CXIndex[¶](#cxindex "Link to this heading")

An Index that consists of a set of translation units that would typically be linked together into an executable or library.

### CXTranslationUnit[¶](#cxtranslationunit "Link to this heading")

A single translation unit, which resides in an index.

### CXCursor[¶](#cxcursor "Link to this heading")

A cursor representing a pointer to some element in the abstract syntax tree of a translation unit.

#### Code example[¶](#code-example "Link to this heading")

// file.cpp
struct foo{
  int bar;
  int\* bar\_pointer;
};

#include <clang-c/Index.h>
#include <iostream>

int main(){
  CXIndex index \= clang\_createIndex(0, 0); //Create index
  CXTranslationUnit unit \= clang\_parseTranslationUnit(
    index,
    "file.cpp", nullptr, 0,
    nullptr, 0,
    CXTranslationUnit\_None); //Parse "file.cpp"

  if (unit \== nullptr){
    std::cerr << "Unable to parse translation unit. Quitting.\\n";
    return 0;
  }
  CXCursor cursor \= clang\_getTranslationUnitCursor(unit); //Obtain a cursor at the root of the translation unit
}

### Visiting elements of an AST[¶](#visiting-elements-of-an-ast "Link to this heading")

The elements of an AST can be recursively visited with pre-order traversal with `clang_visitChildren`.

clang\_visitChildren(
  cursor, //Root cursor
  \[\](CXCursor current\_cursor, CXCursor parent, CXClientData client\_data){

    CXString current\_display\_name \= clang\_getCursorDisplayName(current\_cursor);
    //Allocate a CXString representing the name of the current cursor

    std::cout << "Visiting element " << clang\_getCString(current\_display\_name) << "\\n";
    //Print the char\* value of current\_display\_name

    clang\_disposeString(current\_display\_name);
    //Since clang\_getCursorDisplayName allocates a new CXString, it must be freed. This applies
    //to all functions returning a CXString

    return CXChildVisit\_Recurse;

  }, //CXCursorVisitor: a function pointer
  nullptr //client\_data
  );

The return value of `CXCursorVisitor`, the callable argument of `clang_visitChildren`, can return one of the three:

1.  `CXChildVisit_Break`: Terminates the cursor traversal
    
2.  `CXChildVisit_Continue`: Continues the cursor traversal with the next sibling of the cursor just visited, without visiting its children.
    
3.  `CXChildVisit_Recurse`: Recursively traverse the children of this cursor, using the same visitor and client data
    

The expected output of that program is

Visiting element foo
Visiting element bar
Visiting element bar\_pointer

### Complete example code[¶](#complete-example-code "Link to this heading")

#include <clang-c/Index.h>
#include <iostream>

int main(){
  CXIndex index \= clang\_createIndex(0, 0); //Create index
  CXTranslationUnit unit \= clang\_parseTranslationUnit(
    index,
    "file.cpp", nullptr, 0,
    nullptr, 0,
    CXTranslationUnit\_None); //Parse "file.cpp"

  if (unit \== nullptr){
    std::cerr << "Unable to parse translation unit. Quitting.\\n";
    return 0;
  }
  CXCursor cursor \= clang\_getTranslationUnitCursor(unit); //Obtain a cursor at the root of the translation unit

  clang\_visitChildren(
  cursor,
  \[\](CXCursor current\_cursor, CXCursor parent, CXClientData client\_data){
    CXType cursor\_type \= clang\_getCursorType(current\_cursor);

    CXString type\_kind\_spelling \= clang\_getTypeKindSpelling(cursor\_type.kind);
    std::cout << "TypeKind: " << clang\_getCString(type\_kind\_spelling);
    clang\_disposeString(type\_kind\_spelling);

    if(cursor\_type.kind \== CXType\_Pointer ||                     // If cursor\_type is a pointer
      cursor\_type.kind \== CXType\_LValueReference ||              // or an LValue Reference (&)
      cursor\_type.kind \== CXType\_RValueReference){               // or an RValue Reference (&&),
      CXType pointed\_to\_type \= clang\_getPointeeType(cursor\_type);// retrieve the pointed-to type

      CXString pointed\_to\_type\_spelling \= clang\_getTypeSpelling(pointed\_to\_type);     // Spell out the entire
      std::cout << "pointing to type: " << clang\_getCString(pointed\_to\_type\_spelling);// pointed-to type
      clang\_disposeString(pointed\_to\_type\_spelling);
    }
    else if(cursor\_type.kind \== CXType\_Record){
      CXString type\_spelling \= clang\_getTypeSpelling(cursor\_type);
      std::cout <<  ", namely " << clang\_getCString(type\_spelling);
      clang\_disposeString(type\_spelling);
    }
    std::cout << "\\n";
    return CXChildVisit\_Recurse;
  },
  nullptr
  );

  clang\_visitChildren(
  cursor,
  \[\](CXCursor current\_cursor, CXCursor parent, CXClientData client\_data){

    CXType cursor\_type \= clang\_getCursorType(current\_cursor);
    CXString cursor\_spelling \= clang\_getCursorSpelling(current\_cursor);
    CXSourceRange cursor\_range \= clang\_getCursorExtent(current\_cursor);
    std::cout << "Cursor " << clang\_getCString(cursor\_spelling);

    CXFile file;
    unsigned start\_line, start\_column, start\_offset;
    unsigned end\_line, end\_column, end\_offset;

    clang\_getExpansionLocation(clang\_getRangeStart(cursor\_range), &file, &start\_line, &start\_column, &start\_offset);
    clang\_getExpansionLocation(clang\_getRangeEnd  (cursor\_range), &file, &end\_line  , &end\_column  , &end\_offset);
    std::cout << " spanning lines " << start\_line << " to " << end\_line;
    clang\_disposeString(cursor\_spelling);

    std::cout << "\\n";
    return CXChildVisit\_Recurse;
  },
  nullptr
  );
}

ABI and API Stability[¶](#abi-and-api-stability "Link to this heading")
-----------------------------------------------------------------------

The C interfaces in libclang are intended to be relatively stable. This allows a programmer to use libclang without having to worry as much about Clang upgrades breaking existing code. However, the library is not unchanging. For example, the library will gain new interfaces over time as needs arise, existing APIs may be deprecated for eventual removal, etc. Also, the underlying implementation of the facilities by Clang may change behavior as bugs are fixed, features get implemented, etc.

The library should be ABI and API stable over time, but ABI- and API-breaking changes can happen in the following (non-exhaustive) situations:

*   Adding new enumerator to an enumeration (can be ABI-breaking in C++).
    
*   Removing an explicitly deprecated API after a suitably long deprecation period.
    
*   Using implementation details, such as names or comments that say something is “private”, “reserved”, “internal”, etc.
    
*   Bug fixes and changes to Clang’s internal implementation happen routinely and will change the behavior of callers.
    
*   Rarely, bug fixes to libclang itself.
    

The library has version macros (`CINDEX_VERSION_MAJOR`, `CINDEX_VERSION_MINOR`, and `CINDEX_VERSION`) which can be used to test for specific library versions at compile time. The `CINDEX_VERSION_MAJOR` macro is only incremented if there are major source- or ABI-breaking changes. Except for removing an explicitly deprecated API, the changes listed above are not considered major source- or ABI-breaking changes. Historically, the value this macro expands to has not changed, but may be incremented in the future should the need arise. The `CINDEX_VERSION_MINOR` macro is incremented as new APIs are added. The `CINDEX_VERSION` macro expands to a value based on the major and minor version macros.

In an effort to allow the library to be modified as new needs arise, the following situations are explicitly unsupported:

*   Loading different library versions into the same executable and passing objects between the libraries; despite general ABI stability, different versions of the library may use different implementation details that are not compatible across library versions.
    
*   For the same reason as above, serializing objects from one version of the library and deserializing with a different version is also not supported.
    

Note: because libclang is a wrapper around the compiler frontend, it is not a [security-sensitive component](https://llvm.org/docs/Security.html#what-is-considered-a-security-issue) of the LLVM Project. Consider using a sandbox or some other mitigation approach if processing untrusted input.
---
title: "Clang Maintainers — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/Maintainers.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
This file is a list of the [maintainers](https://llvm.org/docs/DeveloperPolicy.html#maintainers) for Clang. The list of current Clang Area Team members can be found [here](https://github.com/llvm/llvm-project/blob/main/clang/AreaTeamMembers.txt).

[Active Maintainers](#id2)[¶](#active-maintainers "Link to this heading")
-------------------------------------------------------------------------

The following people are the active maintainers for the project. Please reach out to them for code reviews, questions about their area of expertise, or other assistance.

### [Lead Maintainer](#id3)[¶](#lead-maintainer "Link to this heading")

Aaron Ballman

aaron@aaronballman.com (email), aaron.ballman (Phabricator), AaronBallman (GitHub), AaronBallman (Discourse), aaronballman (Discord)

### [Contained Components](#id4)[¶](#contained-components "Link to this heading")

These maintainers are responsible for particular high-level components within Clang that are typically contained to one area of the compiler.

#### AST matchers[¶](#ast-matchers "Link to this heading")

Aaron Ballman

aaron@aaronballman.com (email), aaron.ballman (Phabricator), AaronBallman (GitHub), AaronBallman (Discourse), aaronballman (Discord)

#### AST Visitors[¶](#ast-visitors "Link to this heading")

Sirraide

aeternalmail@gmail.com (email), Sirraide (GitHub), Ætérnal (Discord), Sirraide (Discourse)

#### Clang LLVM IR generation[¶](#clang-llvm-ir-generation "Link to this heading")

John McCall

rjmccall@apple.com (email), rjmccall (Phabricator), rjmccall (GitHub)

Eli Friedman

efriedma@quicinc.com (email), efriedma (Phabricator), efriedma-quic (GitHub)

Anton Korobeynikov

anton@korobeynikov.info (email), asl (Phabricator), asl (GitHub)

#### Clang MLIR generation[¶](#clang-mlir-generation "Link to this heading")

Andy Kaylor

akaylor@nvidia.com (email), AndyKaylor (Discord), AndyKaylor (GitHub)

Bruno Cardoso Lopes

bruno.cardoso@gmail.com (email), sonicsprawl (Discord), bcardosolopes (GitHub)

Henrich Lauko

henrich.lau@gmail.com (email), henrich.lauko (Discord), xlauko (GitHub)

#### Analysis & CFG[¶](#analysis-cfg "Link to this heading")

Dmitri Gribenko

gribozavr@gmail.com (email), gribozavr (Phabricator), gribozavr (GitHub)

Yitzhak Mandelbaum

yitzhakm@google.com (email), ymandel (Phabricator), ymand (GitHub)

Stanislav Gatev

sgatev@google.com (email), sgatev (Phabricator), sgatev (GitHub)

#### Sema[¶](#sema "Link to this heading")

Sirraide

aeternalmail@gmail.com (email), Sirraide (GitHub), Ætérnal (Discord), Sirraide (Discourse)

Mariya Podchishchaeva

mariya.podchishchaeva@intel.com (email), Fznamznon (GitHub), fznamznon (Discord), Fznamznon (Discourse)

#### Recovery AST[¶](#recovery-ast "Link to this heading")

Haojian Wu

hokein.wu@gmail.com (email), hokein (Phabricator), hokein (GitHub), hokein (Discourse)

#### Experimental new constant interpreter[¶](#experimental-new-constant-interpreter "Link to this heading")

Timm Bäder

tbaeder@redhat.com (email), tbaeder (Phabricator), tbaederr (GitHub), tbaeder (Discourse), tbaeder (Discord)

#### Modules & serialization[¶](#modules-serialization "Link to this heading")

Chuanqi Xu

yedeng.yd@linux.alibaba.com (email), ChuanqiXu (Phabricator), ChuanqiXu9 (GitHub)

Michael Spencer

bigcheesegs@gmail.com (email), Bigcheese (Phabricator), Bigcheese (GitHub)

Vassil Vassilev

Vassil.Vassilev@cern.ch (email), v.g.vassilev (Phabricator), vgvassilev (GitHub)

#### Templates[¶](#templates "Link to this heading")

Erich Keane

ekeane@nvidia.com (email), ErichKeane (Phabricator), erichkeane (GitHub)

#### Lambdas[¶](#lambdas "Link to this heading")

Corentin Jabot

corentin.jabot@gmail.com (email), cor3ntin (Phabricator), cor3ntin (GitHub)

#### Debug information[¶](#debug-information "Link to this heading")

Adrian Prantl

aprantl@apple.com (email), aprantl (Phabricator), adrian-prantl (GitHub)

David Blaikie

dblaikie@gmail.com (email), dblaikie (Phabricator), dwblaikie (GitHub)

Eric Christopher

echristo@gmail.com (email), echristo (Phabricator), echristo (GitHub)

#### Exception handling[¶](#exception-handling "Link to this heading")

Anton Korobeynikov

anton@korobeynikov.info (email), asl (Phabricator), asl (GitHub)

#### Clang static analyzer[¶](#clang-static-analyzer "Link to this heading")

Artem Dergachev

adergachev@apple.com (email), NoQ (Phabricator), haoNoQ (GitHub)

Gábor Horváth

xazax.hun@gmail.com (email), xazax.hun (Phabricator), Xazax-hun (GitHub)

Balázs Benics

benicsbalazs@gmail.com (email), steakhal (Phabricator), steakhal (GitHub)

balazs.benics@sonarsource.com (email), balazs-benics-sonarsource (GitHub)

#### Compiler options[¶](#compiler-options "Link to this heading")

Jan Svoboda

jan\_svoboda@apple.com (email), jansvoboda11 (Phabricator), jansvoboda11 (GitHub)

#### API Notes[¶](#api-notes "Link to this heading")

Egor Zhdan

e\_zhdan@apple.com (email), egorzhdan (GitHub), egor.zhdan (Discourse)

Saleem Abdulrasool

compnerd@compnerd.org (email), compnerd (GitHub), compnerd (Discourse)

#### OpenBSD driver[¶](#openbsd-driver "Link to this heading")

Brad Smith

brad@comstyle.com (email), brad (Phabricator), brad0 (GitHub)

#### Offloading driver[¶](#offloading-driver "Link to this heading")

Joseph Huber

joseph.huber@amd.com (email), jhuber6 (GitHub)

#### Driver parts not covered by someone else[¶](#driver-parts-not-covered-by-someone-else "Link to this heading")

Fangrui Song

i@maskray.me (email), MaskRay (Phabricator), MaskRay (GitHub)

#### Constant Expressions[¶](#constant-expressions "Link to this heading")

Mariya Podchishchaeva

mariya.podchishchaeva@intel.com (email), Fznamznon (GitHub), fznamznon (Discord), Fznamznon (Discourse)

#### Thread Safety Analysis[¶](#thread-safety-analysis "Link to this heading")

Aaron Puchert

aaron.puchert@sap.com (email), aaronpuchert (GitHub), aaronpuchert (Discourse)

#### Function Effect Analysis[¶](#function-effect-analysis "Link to this heading")

Doug Wyatt

dwyatt@apple.com (email), dougsonos (GitHub), dougsonos (Discourse)

Sirraide

aeternalmail@gmail.com (email), Sirraide (GitHub), Ætérnal (Discord), Sirraide (Discourse)

### [Tools](#id5)[¶](#tools "Link to this heading")

These maintainers are responsible for user-facing tools under the Clang umbrella or components used to support such tools.

#### clang-format[¶](#clang-format "Link to this heading")

MyDeveloperDay

mydeveloperday@gmail.com (email), MyDeveloperDay (Phabricator), MyDeveloperDay (GitHub)

Owen Pan

owenpiano@gmail.com (email), owenpan (Phabricator), owenca (GitHub)

### [ABIs](#id6)[¶](#abis "Link to this heading")

The following people are responsible for decisions involving ABI.

#### Itanium ABI[¶](#itanium-abi "Link to this heading")

John McCall

rjmccall@apple.com (email), rjmccall (Phabricator), rjmccall (GitHub)

#### Microsoft ABI[¶](#microsoft-abi "Link to this heading")

Reid Kleckner

rnk@google.com (email), rnk (Phabricator), rnk (GitHub)

#### ARM EABI[¶](#arm-eabi "Link to this heading")

Anton Korobeynikov

anton@korobeynikov.info (email), asl (Phabricator), asl (GitHub)

### [Compiler-Wide Topics](#id7)[¶](#compiler-wide-topics "Link to this heading")

The following people are responsible for functionality that does not fit into a single part of the compiler, but instead span multiple components within the compiler.

#### Attributes[¶](#attributes "Link to this heading")

Erich Keane

ekeane@nvidia.com (email), ErichKeane (Phabricator), erichkeane (GitHub)

#### Plugins[¶](#plugins "Link to this heading")

Vassil Vassilev

Vassil.Vassilev@cern.ch (email), v.g.vassilev (Phabricator), vgvassilev (GitHub)

#### Inline assembly[¶](#inline-assembly "Link to this heading")

Eric Christopher

echristo@gmail.com (email), echristo (Phabricator), echristo (GitHub)

#### Text encodings[¶](#text-encodings "Link to this heading")

Tom Honermann

tom@honermann.net (email), tahonermann (Phabricator), tahonermann (GitHub)

Corentin Jabot

corentin.jabot@gmail.com (email), cor3ntin (Phabricator), cor3ntin (GitHub)

#### CMake integration[¶](#cmake-integration "Link to this heading")

Petr Hosek

phosek@google.com (email), phosek (Phabricator), petrhosek (GitHub)

John Ericson

git@johnericson.me (email), Ericson2314 (Phabricator), Ericson2314 (GitHub)

#### General Windows support[¶](#general-windows-support "Link to this heading")

Reid Kleckner

rnk@google.com (email), rnk (Phabricator), rnk (GitHub)

#### Incremental compilation, REPLs, clang-repl[¶](#incremental-compilation-repls-clang-repl "Link to this heading")

Vassil Vassilev

Vassil.Vassilev@cern.ch (email), v.g.vassilev (Phabricator), vgvassilev (GitHub)

### [Standards Conformance](#id8)[¶](#standards-conformance "Link to this heading")

The following people are responsible for validating that changes are conforming to a relevant standard. Contact them for questions about how to interpret a standard, when fixing standards bugs, or when implementing a new standard feature.

#### C conformance[¶](#c-conformance "Link to this heading")

Aaron Ballman

aaron@aaronballman.com (email), aaron.ballman (Phabricator), AaronBallman (GitHub), AaronBallman (Discourse), aaronballman (Discord)

#### C++ conformance[¶](#id1 "Link to this heading")

Hubert Tong

hubert.reinterpretcast@gmail.com (email), hubert.reinterpretcast (Phabricator), hubert-reinterpretcast (GitHub)

Shafik Yaghmour

shafik.yaghmour@intel.com (email), shafik (GitHub), shafik.yaghmour (Discord), shafik (Discourse)

Vlad Serebrennikov

serebrennikov.vladislav@gmail.com (email), Endilll (GitHub), Endill (Discord), Endill (Discourse)

#### C++ Defect Reports[¶](#c-defect-reports "Link to this heading")

Vlad Serebrennikov

serebrennikov.vladislav@gmail.com (email), Endilll (GitHub), Endill (Discord), Endill (Discourse)

#### Objective-C/C++ conformance[¶](#objective-c-c-conformance "Link to this heading")

John McCall

rjmccall@apple.com (email), rjmccall (Phabricator), rjmccall (GitHub)

#### OpenMP conformance[¶](#openmp-conformance "Link to this heading")

Alexey Bataev

a.bataev@hotmail.com (email), ABataev (Phabricator), alexey-bataev (GitHub)

#### OpenCL conformance[¶](#opencl-conformance "Link to this heading")

Sven van Haastregt

sven.vanhaastregt@arm.com (email), svenvh (GitHub)

#### OpenACC[¶](#openacc "Link to this heading")

Erich Keane

ekeane@nvidia.com (email), ErichKeane (Phabricator), erichkeane (GitHub)

#### SYCL conformance[¶](#sycl-conformance "Link to this heading")

Alexey Bader

alexey.bader@intel.com (email), bader (Phabricator), bader (GitHub)

#### HLSL conformance[¶](#hlsl-conformance "Link to this heading")

Chris Bieneman

chris.bieneman@gmail.com (email), llvm-beanz (GitHub), beanz (Discord), beanz (Discourse)

#### Issue Triage[¶](#issue-triage "Link to this heading")

Shafik Yaghmour

shafik.yaghmour@intel.com (email), shafik (GitHub), shafik.yaghmour (Discord), shafik (Discourse)

hstk30

hanwei62@huawei.com (email), hstk30-hw (GitHub), hstk30(Discord), hstk30 (Discourse)
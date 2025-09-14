---
title: "Clang Offload Packager — Clang 22.0.0git documentation"
source: "https://clang.llvm.org/docs/ClangOffloadPackager.html"
source_tag: "llvm"
license: "Apache-2.0 WITH LLVM-exception"
license_url: "https://llvm.org/LICENSE.txt"
attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"
---
*   [Introduction](#introduction)
    
*   [Binary Format](#binary-format)
    
*   [Usage](#usage)
    
*   [Example](#example)
    

[Introduction](#id2)[¶](#introduction "Link to this heading")
-------------------------------------------------------------

This tool bundles device files into a single image containing necessary metadata. We use a custom binary format for bundling all the device images together. The image format is a small header wrapping around a string map. This tool creates bundled binaries so that they can be embedded into the host to create a fat-binary.

[Binary Format](#id3)[¶](#binary-format "Link to this heading")
---------------------------------------------------------------

The binary format is marked by the `0x10FF10AD` magic bytes, followed by a version. Each created binary contains its own magic bytes. This allows us to locate all the embedded offloading sections even after they may have been merged by the linker, such as when using relocatable linking. Conceptually, this binary format is a serialization of a string map and an image buffer. The binary header is described in the following [table](#table-binary-header).

Once identified through the magic bytes, we use the size field to take a slice of the binary blob containing the information for a single offloading image. We can then use the offset field to find the actual offloading entries containing the image and metadata. The offload entry contains information about the device image. It contains the fields shown in the following [table](#table-binary-entry).

Offloading Entry Table[¶](#table-binary-entry "Link to this table")

Type

Identifier

Description

uint16\_t

image kind

The kind of the device image (e.g. bc, cubin)

uint16\_t

offload kind

The producer of the image (e.g. openmp, cuda)

uint32\_t

flags

Generic flags for the image

uint64\_t

string offset

Absolute offset of the string metadata table

uint64\_t

num strings

Number of string entries in the table

uint64\_t

image offset

Absolute offset of the device image in bytes

uint64\_t

image size

Size of the device image in bytes

This table contains the offsets of the string table and the device image itself along with some other integer information. The image kind lets us easily identify the type of image stored here without needing to inspect the binary. The offloading kind is used to determine which registration code or linking semantics are necessary for this image. These are stored as enumerations with the following values for the [offload kind](#table-offload-kind) and the [image kind](#table-image-kind).

Image Kind[¶](#table-image-kind "Link to this table")

Name

Value

Description

IMG\_None

0x00

No image information provided

IMG\_Object

0x01

The image is a generic object file

IMG\_Bitcode

0x02

The image is an LLVM-IR bitcode file

IMG\_Cubin

0x03

The image is a CUDA object file

IMG\_Fatbinary

0x04

The image is a CUDA fatbinary file

IMG\_PTX

0x05

The image is a CUDA PTX file

Offload Kind[¶](#table-offload-kind "Link to this table")

Name

Value

Description

OFK\_None

0x00

No offloading information provided

OFK\_OpenMP

0x01

The producer was OpenMP offloading

OFK\_CUDA

0x02

The producer was CUDA

OFK\_HIP

0x03

The producer was HIP

OFK\_SYCL

0x04

The producer was SYCL

The flags are used to signify certain conditions, such as the presence of debugging information or whether or not LTO was used. The string entry table is used to generically contain any arbitrary key-value pair. This is stored as an array of the [string entry](#table-binary-string) format.

Offloading String Entry[¶](#table-binary-string "Link to this table")

Type

Identifier

Description

uint64\_t

key offset

Absolute byte offset of the key in the string table

uint64\_t

value offset

Absolute byte offset of the value in the string table

The string entries simply provide offsets to a key and value pair in the binary images string table. The string table is simply a collection of null terminated strings with defined offsets in the image. The string entry allows us to create a key-value pair from this string table. This is used for passing arbitrary arguments to the image, such as the triple and architecture.

All of these structures are combined to form a single binary blob, the order does not matter because of the use of absolute offsets. This makes it easier to extend in the future. As mentioned previously, multiple offloading images are bundled together by simply concatenating them in this format. Because we have the magic bytes and size of each image, we can extract them as-needed.

[Usage](#id4)[¶](#usage "Link to this heading")
-----------------------------------------------

This tool can be used with the following arguments. Generally information is passed as a key-value pair to the `image=` argument. The `file` and `triple`, arguments are considered mandatory to make a valid image. The `arch` argument is suggested.

OVERVIEW: A utility for bundling several object files into a single binary.
The output binary can then be embedded into the host section table
to create a fatbinary containing offloading code.

USAGE: clang-offload-packager \[options\]

OPTIONS:

Generic Options:

  --help                      - Display available options (--help-hidden for more)
  --help-list                 - Display list of available options (--help-list-hidden for more)
  --version                   - Display the version of this program

clang-offload-packager options:

  --image=<<key>=<value>,...> - List of key and value arguments. Required
                                keywords are 'file' and 'triple'.
  -o <file>                   - Write output to <file>.

[Example](#id5)[¶](#example "Link to this heading")
---------------------------------------------------

This tool simply takes many input files from the `image` option and creates a single output file with all the images combined.

clang-offload-packager -o out.bin --image=file=input.o,triple=nvptx64,arch=sm\_70

The inverse operation can be performed instead by passing the packaged binary as input. In this mode the matching images will either be placed in the output specified by the `file` option. If no `file` argument is provided a name will be generated for each matching image.

clang-offload-packager in.bin --image=file=output.o,triple=nvptx64,arch=sm\_70
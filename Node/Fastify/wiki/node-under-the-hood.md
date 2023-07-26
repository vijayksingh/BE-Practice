## Node 

### Under the Hood of Node

How did JS get converted into machine code ? 
- Javascript Engine

What is V8 ?
- V8 is fast because it directly compiles JavaScript into machine code when it is first executed. There are no intermediate byte codes, no interpreter.
- Wherease in terms of SpiderMonkey (Firefox) and Chakra (IE) they use intermediate byte code. Where the code is first compiled into byte code and then executed by a virtual machine.
- V8 can be run standalone or can be embedded into any C++ application.

What is Node.js ?
- Node.js is a C++ application that embeds V8 and libuv.
- V8 itself is written in C++ and it exposes a C++ API which can be imported into any C++ application.
- Other than node.js there are other applications that embed V8 like MongoDB, CouchDB, Atom, etc.
- Similarly libuv is written in C and exposes a C API which can be imported into any C application.

What is libuv ?
- libuv is a multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by Node.js, but it’s also used by Luvit, Julia, pyuv, and others.
- libuv provides a thread pool, file system access, and asynchronous I/O with an event loop.
- a C library that is used to abstract non-blocking I/O operations to a consistent interface across all supported platforms.


### Event Emitter

- What is an event emitter object?

- Example of events in the OS

- What happens when `on` and `emit` methods run ? 

- What is the `once` method ?

-  Implementation of EventEmitter class
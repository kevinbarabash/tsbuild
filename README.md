# tsbuild #

fast builds for projects using TypeScript + Browserify

## Usage ##

    var tsbuild = require("tsbuild");
    
    tsbuild({
        filename: "processing-debugger.ts", 
        srcDir: "./src", 
        libDir: "./lib", 
        distDir: "./dist", 
        standalone: "ProcessingDebugger"
    });

- filename - main entry
- srcDir - root folder where __filename__ and other source reside
- libDir - destination of commonjs modules
- distDir - destination of universal modules
- standalone - symbol name to export to the global context when a module loader is not being used

var browserify = require("browserify");
var fs = require('fs');
var spawn = require("child_process").spawn;
var mkdirp = require("mkdirp");

function build(filename, srcDir, libDir, distDir, standalone) {
    var compileStart = Date.now();

    var args = [
        "--target", "ES5",
        "--removeComments",
        "--module", "commonjs",
        "--outDir", libDir,
        srcDir + "/" + filename,
        "--watch",
        "--declaration"
    ];

    var tsc = spawn(__dirname + "/node_modules/.bin/tsc", args);

    var b = null;
    var options = {
        cache: {},
        packageCache: {},
        fullPaths: true,
        standalone: standalone
    };

    tsc.stdout.on('data', function (data) {
        data = data.toString();
        process.stdout.write(data);

        if (data.indexOf("TS6042") !== -1) {
            console.log("compile time = " + (Date.now() - compileStart));
            var browserifyStart = Date.now();

            if (b === null) {
                b = browserify(libDir + "/" + filename.replace(".ts", ".js"), options);
            }

            mkdirp(distDir, function(err) {
                if (err) {
                    console.log("couldn't created the folder");
                    process.exit();
                } else {
                    var writable = fs.createWriteStream(distDir + "/" + filename.replace(".ts", ".js"));
                    b.bundle().pipe(writable);
                    console.log("browserify time = " + (Date.now() - browserifyStart));
                }
            });
        }

        if (data.indexOf("TS6032") !== -1) {
            compileStart = Date.now();
        }
    });
}

module.exports = build;

//var browserify = require("browserify");
var watchify = require("watchify");
var fs = require('fs');
var spawn = require("child_process").spawn;

var args = [
    "--target", "ES5",
    "--removeComments",
    "--module", "commonjs",
    "--outDir", "test/lib",
    "test/src/Point.ts",
    "--watch",
    "--declaration"
];

var tsc = spawn("./node_modules/.bin/tsc", args);
var first = true;

tsc.stdout.on('data', function (data) {
    console.log("tsc: " + data);

    if (first) {
        first = false;
    }
});

var options = {
    cache: {},
    packageCache: {},
    //fullPaths: true,
    standalone: "Point"
};

var b = browserify(__dirname + "/test/lib/Point.js", options);
var w = watchify(b);

w.on('update', function (ids) {
    var writable = fs.createWriteStream(__dirname + "/test/dist/Point.js");
    w.bundle().pipe(writable);
});

w.on('time', function (time) {
    console.log("build took " + time + "ms");
});

w.on('log', function (msg) {
    console.log("log: " + msg);
});

var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.mul = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    Point.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    return Point;
})();
module.exports = Point;

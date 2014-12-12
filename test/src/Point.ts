class Point {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    mul(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    add(other: Point) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
}

export = Point;

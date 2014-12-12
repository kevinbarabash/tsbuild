declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    mul(s: number): Point;
    add(other: Point): Point;
}
export = Point;

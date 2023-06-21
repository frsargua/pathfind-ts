import { pathfind } from "../src/pathfind";
import { Vector } from "../src/Vector.type";

describe("Pathfind", () => {
  it("An empty matrix", () => {
    const A = [];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Matrix is filled with empty arrays", () => {
    const A = [[]];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Non-integer coordinates", () => {
    const A = [
      [true, false],
      [true, true],
    ];
    const P: Vector = { x: 0.5, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("start and end the same", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 0 };

    expect(pathfind(A, P, Q)).toBe(0);
  });

  it("Matrix contains non-boolean values", () => {
    const A = [
      [true, true, true, true, true],
      ["1", false, false, false, true],
      ["true", true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 0 };

    expect(pathfind(A as boolean[][], P, Q)).toBe(0);
  });
  it("Matrix with uniform dimenstions", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 4, y: 4 };

    expect(pathfind(A, P, Q)).toBe(0);
  });

  it("example case", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 1, y: 0 };
    const Q: Vector = { x: 2, y: 3 };

    expect(pathfind(A, P, Q)).toBe(6);
  });
  it("P and Q are next to each other", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 1, y: 0 };

    expect(pathfind(A, P, Q)).toBe(1);
  });
  it("P and Q are in the same row", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 4, y: 0 };

    expect(pathfind(A, P, Q)).toBe(4);
  });
  it("P and Q are in the same column", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 4 };

    expect(pathfind(A, P, Q)).toBe(4);
  });

  // You can add further tests here
  it("points are unreachable", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 3 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });

  it("P is outside boundaries", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 8, y: 0 };
    const Q: Vector = { x: 0, y: 0 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });

  it("Q is outside boundaries", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 8, y: 3 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });

  it("Both are outside boundaries", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 8, y: 0 };
    const Q: Vector = { x: 8, y: 3 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });

  it("P is at a wall point", () => {
    const A = [
      [true, true, true, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 3, y: 0 };
    const Q: Vector = { x: 3, y: 3 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });

  it("Q is at a wall point", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, false, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 3, y: 3 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Both are at a wall point", () => {
    const A = [
      [false, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, false, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 3, y: 3 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Q is at a wall point and next to P", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, false, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("P is at a wall point and next to Q", () => {
    const A = [
      [false, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, false, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Both is at a wall point and next to each other", () => {
    const A = [
      [false, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, false, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
});

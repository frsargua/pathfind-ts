import { pathfind } from "../src/pathfind";
import { Vector } from "../src/Vector.type";

describe("Pathfind", () => {
  it("An empty matrix", () => {
    const A = [];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Matrix filled with empty arrays", () => {
    const A = [[], [], []];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Non-integer vector coordinates", () => {
    const A = [
      [true, false],
      [true, true],
    ];
    const P: Vector = { x: 0.5, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Single cell and that cell is the start and end point", () => {
    const A = [[true]];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 0 };

    expect(pathfind(A, P, Q)).toBe(0);
  });
  it("Single cell but with a false value", () => {
    const A = [[false]];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 0, y: 0 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });

  it("Start and end the same", () => {
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
  it("Matrix with non-uniform dimensions", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 4, y: 4 };

    expect(pathfind(A, P, Q)).toBe(14);
  });
  it("Matrix with non-uniform dimensions 2; unsolvable", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [false, false, true, false, false],
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, true, false, true],
      [true],
      [false, false, true, false, false],
      [true, false, true, true, true],
      [true, false, true, false, false],
      [true, false, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 4, y: 12 };

    expect(pathfind(A, P, Q)).toBe(-1);
  });
  it("Matrix with non-uniform dimensions 3", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [false, false, true, false, false],
      [true, true, true],
      [true, false, false, false, false],
      [true, false, true, false, true],
      [true, true, true, true, true],
      [true, true, true],
      [false, false, true, false, false],
      [true, false, true, true, true],
      [true, false, true, false, false],
      [true, false, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 4, y: 13 };

    expect(pathfind(A, P, Q)).toBe(25);
  });
  it("Matrix with a maze structure", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [false, false, true, false, false],
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, true, false, true],
      [true, true, true, true, true],
      [false, false, true, false, false],
      [true, false, true, true, true],
      [true, false, true, false, false],
      [true, false, true, true, true],
      [true, true, true, true, true],
    ];
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 4, y: 12 };

    expect(pathfind(A, P, Q)).toBe(24);
  });

  it("Original Sample Case", () => {
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

  it("P is at a wall coordinate", () => {
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

  it("Q is at a wall coordinate", () => {
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
  it("Both are at a wall coordinate", () => {
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
  it("Q is at a wall coordinate and next to P", () => {
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
  it("Larger Matrix", () => {
    const A = new Array(1000).fill(new Array(1000).fill(true));
    const P: Vector = { x: 0, y: 0 };
    const Q: Vector = { x: 999, y: 999 };

    expect(pathfind(A, P, Q)).toBe(1998);
  });

  it("Vector's coordinates are of type string", () => {
    const A = [
      [true, true],
      [true, true],
    ];
    const P: Vector = { x: "0" as any, y: 0 };
    const Q: Vector = { x: "1" as any, y: 1 };

    expect(() => pathfind(A, P, Q)).toThrow();
  });
  it("Vector's coordinate, x or y, is null", () => {
    const A = [
      [true, true],
      [true, true],
    ];
    const P: Vector = { x: null as any, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(() => pathfind(A, P, Q)).toThrow();
  });
  it("Vector's coordinate, x or y, is undefined", () => {
    const A = [
      [true, true],
      [true, true],
    ];
    const P: Vector = { x: undefined as any, y: 0 };
    const Q: Vector = { x: 1, y: 1 };

    expect(() => pathfind(A, P, Q)).toThrow();
  });
});

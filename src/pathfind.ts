import { Vector } from "./Vector.type";

// Take BFS approach, an efficient approach
export const pathfind = (A: boolean[][], P: Vector, Q: Vector): number => {
  // Allows points up, down, left and right to the current location to checked.
  const directions: Vector[] = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  // If matrix is empty return -1;
  if (!A.length || !A[0].length) return -1;

  // Throw an error if vector's coordinates are not of type  number.
  // An alternative would be to return -1
  if (
    ![P, Q].every(
      (obj) => typeof obj.x === "number" && typeof obj.y === "number"
    )
  ) {
    throw new Error("Wrong input type");
  }

  // If original vectors falls outside the matrix's boundaries return -1
  if (!A[P.y][P.x] || !A[Q.y][Q.x]) return -1;

  // All the vectors/slots are set to false
  // false = not visited
  let visited = A.map((row) => row.map(() => false));

  // This tracks order in which the vectors will be checked.
  let queue = [{ position: P, distance: 0 }];

  // If the queue is empty it means that P and Q are unreachable.
  while (queue.length) {
    // Remove the first value in the queue
    let { position, distance } = queue.shift()!;

    // Check if the vector matches the the destination.
    if (position.x == Q.x && position.y == Q.y) return distance;

    directions.forEach((direction: Vector) => {
      // Create new vector
      let newPosition = {
        x: position.x + direction.x,
        y: position.y + direction.y,
      };

      // Check that the new vector is within the boundaries of the matrix
      let isWithinXBoundaries =
        newPosition.x >= 0 && newPosition.x < A[0].length;
      let isWithinYBoundaries = newPosition.y >= 0 && newPosition.y < A.length;

      // Check that the new vector has not been visited before
      let hasBeenVisited =
        visited.hasOwnProperty(newPosition.y) &&
        visited[newPosition.y].hasOwnProperty(newPosition.x) &&
        visited[newPosition.y][newPosition.x];

      //Check that the new the vector exist/isn't a wall
      let existInMatrix =
        A.hasOwnProperty(newPosition.y) &&
        A[newPosition.y].hasOwnProperty(newPosition.x) &&
        A[newPosition.y][newPosition.x];

      if (
        isWithinXBoundaries &&
        isWithinYBoundaries &&
        existInMatrix &&
        !hasBeenVisited
      ) {
        // Mark new vector as visited
        visited[newPosition.y][newPosition.x] = true;
        // Add new vector point to the queue to check it against the destination
        queue.push({ position: newPosition, distance: distance + 1 });
      }
    });
  }

  return -1;
};

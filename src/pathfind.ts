import { Vector } from "./Vector.type";

// Take BFS approach, not the most efficient but my initial suggestion
export const pathfind = (A: boolean[][], P: Vector, Q: Vector): number => {
  // Allows points up, down, left and right to the current location to checked.
  const directions: Vector[] = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  // If matrix is empty
  if (!A.length || !A[0].length) return -1;

  // If original positions are walls return -1
  if (!A[P.y][P.x] || !A[Q.y][Q.x]) return -1;

  // All the locations are set to false
  // false = not visited
  let visited = A.map((row) => row.map(() => false));
  let queue = [{ position: P, distance: 0 }];

  while (queue.length) {
    // Remove the first value in the queue
    let { position, distance } = queue.shift()!;

    // Check if the spot is Q
    if (position.x == Q.x && position.y == Q.y) return distance;

    directions.forEach((direction: Vector) => {
      // Create new spot locations
      let newPosition = {
        x: position.x + direction.x,
        y: position.y + direction.y,
      };

      // Check position is within the boundaries of the matrix
      let isWithinXBoundaries =
        newPosition.x >= 0 && newPosition.x < A[0].length;
      let isWithinYBoundaries = newPosition.y >= 0 && newPosition.y < A.length;

      // Check position has not been visited before
      let hasBeenVisited =
        visited.hasOwnProperty(newPosition.y) &&
        visited[newPosition.y].hasOwnProperty(newPosition.x) &&
        visited[newPosition.y][newPosition.x];

      //Check the point exist/isn't a wall
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
        // Update position to be visited
        visited[newPosition.y][newPosition.x] = true;
        // Add new position point to the queue to check it
        queue.push({ position: newPosition, distance: distance + 1 });
      }
    });
  }

  return -1;
};

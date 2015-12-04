export function cubeToPixel(size, cubeCoords, worldCentre) {
  return {
    x: worldCentre.x + (size * 3 / 2 * cubeCoords.x),
    y: worldCentre.y + (size * Math.sqrt(3) * (cubeCoords.z + cubeCoords.x / 2))
  };
}


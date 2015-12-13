export function cubeToPixel(size, cubeCoords, worldCentre) {
  return {
    x: worldCentre.x + (size * 3 / 2 * cubeCoords.x),
    y: worldCentre.y + (size * Math.sqrt(3) * (cubeCoords.z + cubeCoords.x / 2))
  };
}

// see http://www.redblobgames.com/grids/hexagons/#range
export function radius(cubeCoords, range) {
  var result = [];

  for (var dx = -range; dx <= range; ++dx) {
    for (var dy = Math.max(-range, -dx - range); dy <= Math.min(range, -dx + range); ++dy) {
      var dz = -dx - dy;
      result.push({
        x: cubeCoords.x + dx,
        y: cubeCoords.y + dy,
        z: cubeCoords.z + dz
      });
    }
  }
  return result;
}

export function hexDist(pos1, pos2) {
  return Math.max(pos2.x - pos1.x, pos2.y - pos1.y, pos2.z - pos1.z);
}
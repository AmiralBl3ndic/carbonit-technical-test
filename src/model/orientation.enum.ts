enum Orientation {
  NORTH = 'N',
  SOUTH = 'S',
  EAST = 'E',
  WEST = 'O',
}

export function parseOrientation(orientationString: string): Orientation {
  switch (orientationString) {
    case 'N':
      return Orientation.NORTH;
    case 'S':
      return Orientation.SOUTH;
    case 'E':
      return Orientation.EAST;
    default:
      return Orientation.WEST;
  }
}

export default Orientation;

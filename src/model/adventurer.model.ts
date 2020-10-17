import AdventurerError from '@/error/adventurer.error';
import Action from '@/model/action.enum';
import Orientation from '@/model/orientation.enum';

type AdventurerCoords = [number, number, Orientation];

/**
 * Represents an adventurer
 */
class Adventurer {
  name: string;

  x: number;

  y: number;

  orientation: Orientation;

  actions: Action[];

  treasures: number = 0;

  constructor(
    name: string,
    startX: number,
    startY: number,
    startOrientation: Orientation,
    actions: Action[],
  ) {
    this.name = name;
    this.x = startX;
    this.y = startY;
    this.orientation = startOrientation;
    this.actions = actions;
  }

  move(): void {
    const [nextX, nextY] = this.nextCoords;

    // Check if move would move adventurer out of boundaries
    if (nextX < 0 || nextY < 0)
      throw new AdventurerError(
        'Cannot move adventurer to negative coordinates',
      );

    // Perform move
    [this.x, this.y, this.orientation] = this.nextCoords;

    // Get rid of action
    this.skipMove();
  }

  skipMove(): void {
    this.actions.shift();
  }

  pickupTreasure(): void {
    this.treasures += 1;
  }

  get hasNextMove(): boolean {
    return !!this.actions.length;
  }

  get coords(): AdventurerCoords {
    return [this.x, this.y, this.orientation];
  }

  /**
   * Coordinates of the adventurer after he performs its next move
   */
  get nextCoords(): AdventurerCoords {
    let { x, y, orientation } = this;

    const action = this.actions[0];

    if (action === Action.MOVE_FORWARD) {
      switch (this.orientation) {
        case Orientation.NORTH:
          y -= 1;
          break;
        case Orientation.SOUTH:
          y += 1;
          break;
        case Orientation.EAST:
          x += 1;
          break;
        default:
          x -= 1;
      }
    } else if (action === Action.TURN_LEFT) {
      switch (this.orientation) {
        case Orientation.NORTH:
          orientation = Orientation.WEST;
          break;
        case Orientation.SOUTH:
          orientation = Orientation.EAST;
          break;
        case Orientation.EAST:
          orientation = Orientation.NORTH;
          break;
        default:
          orientation = Orientation.SOUTH;
      }
    } else {
      switch (this.orientation) {
        case Orientation.NORTH:
          orientation = Orientation.EAST;
          break;
        case Orientation.SOUTH:
          orientation = Orientation.WEST;
          break;
        case Orientation.EAST:
          orientation = Orientation.SOUTH;
          break;
        default:
          orientation = Orientation.NORTH;
      }
    }

    return [x, y, orientation];
  }
}

export default Adventurer;

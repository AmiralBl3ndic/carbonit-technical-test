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
    const a = this.x + this.y;
  }

  get nextCoords(): AdventurerCoords {
    return [this.x, this.y, this.orientation];
  }
}

export default Adventurer;

import Action from '@/model/action.enum';
import Orientation from '@/model/orientation.enum';

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
}

export default Adventurer;

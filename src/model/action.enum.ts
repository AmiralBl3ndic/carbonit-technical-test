enum Action {
  MOVE_FORWARD = 'A',
  TURN_RIGHT = 'D',
  TURN_LEFT = 'G',
}

export function parseAction(actionString: string): Action {
  switch (actionString) {
    case 'A':
      return Action.MOVE_FORWARD;
    case 'D':
      return Action.TURN_RIGHT;
    default:
      return Action.TURN_LEFT;
  }
}

export default Action;

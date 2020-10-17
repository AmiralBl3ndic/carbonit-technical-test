import AdventurerError from '@/error/adventurer.error';
import Action from '@/model/action.enum';
import Adventurer from '@/model/adventurer.model';
import Orientation from '@/model/orientation.enum';

describe('Adventurer', () => {
  let adventurer: Adventurer | undefined;

  it('moves correctly within boundaries', () => {
    adventurer = new Adventurer('Indiana Jones', 0, 0, Orientation.EAST, [
      Action.MOVE_FORWARD,
      Action.TURN_RIGHT,
      Action.MOVE_FORWARD,
      Action.MOVE_FORWARD,
      Action.TURN_LEFT,
      Action.MOVE_FORWARD,
    ]);

    // Move forward
    adventurer.move();
    expect(adventurer.x).toBe(1);
    expect(adventurer.y).toBe(0);
    expect(adventurer.orientation).toBe(Orientation.EAST);

    // Turn right
    adventurer.move();
    expect(adventurer.x).toBe(1);
    expect(adventurer.y).toBe(0);
    expect(adventurer.orientation).toBe(Orientation.SOUTH);

    // Move forward
    adventurer.move();
    expect(adventurer.x).toBe(1);
    expect(adventurer.y).toBe(1);
    expect(adventurer.orientation).toBe(Orientation.SOUTH);

    // Move forward
    adventurer.move();
    expect(adventurer.x).toBe(1);
    expect(adventurer.y).toBe(2);
    expect(adventurer.orientation).toBe(Orientation.SOUTH);

    // Turn left
    adventurer.move();
    expect(adventurer.x).toBe(1);
    expect(adventurer.y).toBe(2);
    expect(adventurer.orientation).toBe(Orientation.EAST);

    // Move forward
    adventurer.move();
    expect(adventurer.x).toBe(2);
    expect(adventurer.y).toBe(2);
    expect(adventurer.orientation).toBe(Orientation.EAST);
  });

  it('gives right next coordinates', () => {
    adventurer = new Adventurer('Indiana Jones', 0, 0, Orientation.EAST, [
      Action.TURN_RIGHT,
      Action.MOVE_FORWARD,
      Action.TURN_LEFT,
      Action.MOVE_FORWARD,
    ]);

    let [nextX, nextY, nextOrientation] = adventurer.nextCoords;

    expect(nextX).toBe(0);
    expect(nextY).toBe(0);
    expect(nextOrientation).toBe(Orientation.SOUTH);

    adventurer.move();
    expect(adventurer.x).toBe(nextX);
    expect(adventurer.y).toBe(nextY);
    expect(adventurer.orientation).toBe(nextOrientation);

    [nextX, nextY, nextOrientation] = adventurer.nextCoords;
    expect(nextX).toBe(adventurer.x);
    expect(nextY).toBe(adventurer.y + 1);
    expect(nextOrientation).toBe(Orientation.SOUTH);

    adventurer.move();
    expect(adventurer.x).toBe(nextX);
    expect(adventurer.y).toBe(nextY);
    expect(adventurer.orientation).toBe(nextOrientation);

    [nextX, nextY, nextOrientation] = adventurer.nextCoords;
    expect(nextX).toBe(adventurer.x);
    expect(nextY).toBe(adventurer.y);
    expect(nextOrientation).toBe(Orientation.EAST);
  });

  it('does not allow moving in negative coordinates', () => {
    adventurer = new Adventurer('Indiana Jones', 0, 0, Orientation.WEST, [
      Action.MOVE_FORWARD,
    ]);

    const [nextX, nextY, nextOrientation] = adventurer.nextCoords;

    expect(nextX).toBe(-1);
    expect(nextY).toBe(0);
    expect(nextOrientation).toBe(Orientation.WEST);

    expect(() => {
      (adventurer as Adventurer).move();
    }).toThrowError(
      new AdventurerError('Cannot move adventurer to negative coordinates'),
    );
  });

  it('is possible to skip a move on demand', () => {
    adventurer = new Adventurer('Indiana Jones', 0, 0, Orientation.NORTH, [
      Action.MOVE_FORWARD, // This would cause a move to negative coordinates
      Action.TURN_RIGHT,
    ]);

    const initialCoords = adventurer.coords;
    const initialNextCoords = adventurer.nextCoords;

    // We do not attempt to move since this would cause an error
    // Hence, we must skip the first move
    adventurer.skipMove();

    expect(adventurer.coords).toStrictEqual(initialCoords);
    expect(adventurer.nextCoords).not.toStrictEqual(initialNextCoords);
    expect(adventurer.nextCoords[2]).toBe(Orientation.EAST);
  });
});

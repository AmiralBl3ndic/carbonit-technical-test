import * as fs from 'fs';
import AdventurerError from '@/error/adventurer.error';
import TerrainError from '@/error/terrain.error';
import Tile from '@/model/tile.model';
import Action, { parseAction } from '@/model/action.enum';
import Adventurer from '@/model/adventurer.model';
import Orientation, { parseOrientation } from '@/model/orientation.enum';
import LineType from '@/model/line-type.enum';

/**
 * Model to represent and hold the map's data
 */
class Terrain {
  width: number;

  height: number;

  mountains: Tile[] = [];

  treasures: Tile[] = [];

  adventurers: Adventurer[] = [];

  constructor(w: number, h: number) {
    if (w <= 0 || h <= 0) {
      throw new Error(
        'Unable to create a map with negative or null width or height',
      );
    }

    this.width = w;
    this.height = h;
  }

  static parse(terrainString: string): Terrain {
    // Separate data at the beginning so that the file can be read in any order
    let terrain: Terrain | null = null;
    const mountains: Tile[] = [];
    const treasures: Tile[] = [];
    const adventurers: Adventurer[] = [];

    const linesToParse = terrainString
      .split('\n')
      .map((_) => _.trim()) // Get rid of spaces before and after interesting data
      .filter((_) => _.length && !_.startsWith('#')); // Get rid of empty lines && comments lines

    // Parse each line, a for-of loop would have been better optimized, but eslint complies if I use it
    linesToParse.forEach((line) => {
      const parsed = Terrain.parseLine(line);

      // Must check type of returned object
      if (parsed instanceof Terrain) {
        if (terrain)
          throw new TerrainError('Mismatching terrain dimensions data');
        terrain = parsed;
      } else if (parsed instanceof Array) {
        if (parsed[0].type === 'mountain') {
          // Check if no mountain already occupies this spot
          if (mountains.some((m) => m.x === parsed[0].x && m.y === parsed[0].y))
            throw new TerrainError('Multiple mountains on same tile');

          // Check if no treasure already occupies this spot
          if (treasures.some((t) => t.x === parsed[0].x && t.y === parsed[0].y))
            throw new TerrainError('Treasure on a mountain tile');

          // Check if no aventurer already occupies this spot
          if (
            adventurers.some((a) => a.x === parsed[0].x && a.y === parsed[0].y)
          )
            throw new TerrainError('Adventurer starts on a mountain');

          mountains.push(parsed[0]);
        } else {
          // Check if no mountain already occupies this spot
          if (mountains.some((m) => m.x === parsed[0].x && m.y === parsed[0].y))
            throw new TerrainError('Treasure on a mountain tile');

          treasures.push(...parsed);
        }
      } else {
        // A terrain is required to determine if adventurer coordinates are OK
        if (!terrain) {
          throw new TerrainError(
            'Found adventurer declaration before terrain declaration',
          );
        }

        // Check if adventurer is spawned within terrain boundaries
        if (
          parsed.x < 0 ||
          parsed.y < 0 ||
          parsed.x >= terrain.width ||
          parsed.y >= terrain.height
        ) {
          throw new TerrainError('Adventurer starts out of terrain boundaries');
        }

        // Check if adventurer starts on a mountain
        if (mountains.some((m) => m.x === parsed.x && m.y === parsed.y))
          throw new TerrainError('Adventurer starts on a mountain');

        adventurers.push(parsed);
      }
    });

    if (terrain === null)
      throw new TerrainError('Unable to read terrain data from file');

    // Assemble read data in the single Terrain instance
    (terrain as Terrain).mountains = mountains;
    (terrain as Terrain).treasures = treasures;
    (terrain as Terrain).adventurers = adventurers;

    return terrain;
  }

  // eslint-disable-next-line no-unused-vars
  static parseFile(fileName: string): Terrain {
    if (!fs.existsSync(fileName)) {
      throw new Error(`No such file or directory: ${fileName}`);
    }

    return Terrain.parse(fs.readFileSync(fileName, 'utf-8'));
  }

  /// /////////////////////////////////////////////////////////
  //  PRIVATE STATIC METHODS
  // //////////////////////////////////////////////////////////

  /**
   * Parse data from a line and get the right data structure from it
   * @param terrainLine Line to parse
   */
  private static parseLine(terrainLine: string): Terrain | Tile[] | Adventurer {
    const [lineType, ...lineData] = terrainLine.trim().split(' - ');

    switch (lineType) {
      case LineType.Terrain:
        return Terrain.parseTerrain(lineData);

      case LineType.Treasure:
        return Terrain.parseTreasures(lineData);

      case LineType.Mountain:
        return [Terrain.parseMountain(lineData)];

      case LineType.Adventurer:
        return Terrain.parseAdventurer(lineData);

      default: {
        throw new TerrainError(
          `Unable to parse terrain tile with data: "${terrainLine}"`,
        );
      }
    }
  }

  /**
   * Parse data from a terrain line
   * @param terrainData Line elements to parse terrain data from
   */
  private static parseTerrain(terrainData: string[]): Terrain {
    if (terrainData.length < 2)
      throw new Error('Too few information for terrain definition');

    if (terrainData.length > 2)
      throw new TerrainError('Too much information for terrain definition');

    const [width, height] = terrainData.map((_) => Number(_));

    if (![width, height].every(Number.isInteger)) {
      throw new TerrainError('Unparsable data for terrain definition');
    }

    if (width <= 0 || height <= 0) {
      throw new TerrainError('Terrain cannot have 0 height or width');
    }

    return new Terrain(width, height);
  }

  /**
   * Parse data from a treasure line
   * @param treasureData Line elements to parse treasure data from
   */
  private static parseTreasures(treasureData: string[]): Tile[] {
    if (treasureData.length < 3)
      throw new TerrainError('Too few information for tile of type treasure');

    if (treasureData.length > 3)
      throw new TerrainError('Too much information for tile of type treasure');

    const [x, y, quantity] = treasureData.map((_) => Number(_));

    if ([x, y, quantity].some((_) => !Number.isInteger(_) || _ < 0)) {
      throw new TerrainError(
        'Width, height and quantity must be >= 0 for a treasure tile',
      );
    }

    return new Array<Tile>(quantity).fill({
      x,
      y,
      type: 'treasure',
    });
  }

  /**
   * Parse data from a mountain line
   * @param mountainData Line elements to parse mountain data from
   */
  private static parseMountain(mountainData: string[]): Tile {
    if (mountainData.length < 2)
      throw new TerrainError('Too few information for tile of type mountain');

    if (mountainData.length > 2)
      throw new TerrainError('Too much information for tile of type mountain');

    const [x, y] = mountainData.map((_) => Number(_));

    if ([x, y].some((_) => !Number.isInteger(_) || _ < 0)) {
      throw new TerrainError(
        'Width and height must be >= 0 for a mountain tile',
      );
    }

    return {
      x,
      y,
      type: 'mountain',
    };
  }

  /**
   * Parse data from an adventurer line
   * @param adventurerData Line elements to parse adventurer data from
   */
  private static parseAdventurer(adventurerData: string[]): Adventurer {
    if (adventurerData.length < 5)
      throw new TerrainError('Too few information for adventurer');

    if (adventurerData.length > 5)
      throw new TerrainError('Too much information for adventurer');

    const adventurerName = adventurerData[0];
    const initialX = Number.parseInt(adventurerData[1], 10);
    const initialY = Number.parseInt(adventurerData[2], 10);

    if (!/[NSEO]/.test(adventurerData[3]))
      throw new AdventurerError('Unparsable orientation');

    const orientation: Orientation = parseOrientation(adventurerData[3]);

    if (!/^[ADG]+$/.test(adventurerData[4]))
      throw new AdventurerError(
        `Invalid actions/directions sequence for adventurer ${adventurerName}: ${adventurerData[4]}`,
      );

    const actions: Action[] = adventurerData[4].split('').map(parseAction);

    return new Adventurer(
      adventurerName,
      initialX,
      initialY,
      orientation,
      actions,
    );
  }
}

export default Terrain;

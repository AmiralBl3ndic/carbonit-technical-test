import AdventurerError from '@/error/adventurer.error';
import TerrainError from '@/error/terrain.error';
import Tile from '@/model/tile.model';
import Action, { parseAction } from '@/model/action.enum';
import Adventurer from '@/model/adventurer.model';
import Orientation, { parseOrientation } from '@/model/orientation.enum';

/**
 * Model to represent and hold the map's data
 */
class Terrain {
  width: number;

  height: number;

  mountains: Tile[] = [];

  treasures: Tile[] = [];

  constructor(w: number, h: number) {
    if (w <= 0 || h <= 0) {
      throw new Error(
        'Unable to create a map with negative or null width or height',
      );
    }

    this.width = w;
    this.height = h;
  }

  // eslint-disable-next-line no-unused-vars
  static parse(terrainString: string): Terrain {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line no-unused-vars
  static parseFile(fileName: string): Terrain {
    throw new Error('Not implemented');
  }

  /**
   * Parse data from a line and get the right data structure from it
   * @param terrainLine Line to parse
   */
  private static parseLine(terrainLine: string): Terrain | Tile[] | Adventurer {
    const [lineType, ...lineData] = terrainLine.trim().split(' - ');

    switch (lineType) {
      case 'C':
        return Terrain.parseTerrain(lineData);

      case 'T':
        return Terrain.parseTreasures(lineData);

      case 'M':
        return [Terrain.parseMountain(lineData)];

      case 'A':
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

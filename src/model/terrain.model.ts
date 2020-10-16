import Tile from '@/model/tile.model';

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

  // eslint-disable-next-line no-unused-vars
  private static parseLine(terrainLine: string): Tile {
    throw new Error('Not implemented');
  }
}

export default Terrain;

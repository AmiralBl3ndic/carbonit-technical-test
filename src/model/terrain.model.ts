import TerrainError from '@/error/terrain.error';
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
  private static parseLine(terrainLine: string): Terrain | Tile[] {
    const [lineType, ...terrainData] = terrainLine.trim().split(' - ');

    switch (lineType) {
      case 'C': {
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

      case 'T': {
        if (terrainData.length < 3)
          throw new TerrainError(
            'Too few information for tile of type treasure',
          );

        if (terrainData.length > 3)
          throw new TerrainError(
            'Too much information for tile of type treasure',
          );

        const [x, y, quantity] = terrainData.map((_) => Number(_));

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

      case 'M': {
        if (terrainData.length < 2)
          throw new TerrainError(
            'Too few information for tile of type mountain',
          );

        if (terrainData.length > 2)
          throw new TerrainError(
            'Too much information for tile of type mountain',
          );

        const [x, y] = terrainData.map((_) => Number(_));

        if ([x, y].some((_) => !Number.isInteger(_) || _ < 0)) {
          throw new TerrainError(
            'Width and height must be >= 0 for a mountain tile',
          );
        }

        return [
          {
            x,
            y,
            type: 'mountain',
          },
        ];
      }

      case 'A': {
        if (terrainData.length < 5)
          throw new TerrainError('Too few information for adventurer');

        if (terrainData.length > 5)
          throw new TerrainError('Too much information for adventurer');

        return [];
      }

      default: {
        throw new TerrainError(
          `Unable to parse terrain tile with data: "${terrainLine}"`,
        );
      }
    }
  }
}

export default Terrain;

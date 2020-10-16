import TerrainError from '@/error/terrain.error';
import Terrain from '@/model/terrain.model';
import Tile from '@/model/tile.model';

describe('Terrain', () => {
  describe('.parse()', () => {
    it('should accept valid terrains', () => {
      const terrainString =
        'C​ - 3 - 4\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      expect(() => {
        Terrain.parse(terrainString);
      }).not.toThrow();
    });

    it('should reject invalid terrains', () => {
      const terrainString =
        'C​ - 4 - 5\nM​ - 1 - 0\nM​ - 1 - 0\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      expect(() => {
        Terrain.parse(terrainString);
      }).toThrowError(new TerrainError('Invalid terrain'));
    });

    it('should accept valid terrains with comments', () => {
      const terrainString =
        'C​ - 3 - 4# This is a comment\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      expect(() => {
        Terrain.parse(terrainString);
      }).not.toThrow();
    });

    it('should place the mountains right', () => {
      const terrainString =
        'C​ - 3 - 4\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      const terrain = Terrain.parse(terrainString);

      const mountains: Tile[] = [
        {
          type: 'mountain',
          x: 1,
          y: 0,
        },
        {
          type: 'mountain',
          x: 2,
          y: 1,
        },
      ];

      expect(terrain.mountains.length).toBe(2);
      expect(terrain.mountains).toStrictEqual(
        expect.arrayContaining(mountains),
      );
    });

    it('should place the treasures right', () => {
      const terrainString =
        'C​ - 3 - 4\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      const terrain = Terrain.parse(terrainString);

      const treasures: Tile[] = [
        {
          type: 'treasure',
          x: 0,
          y: 3,
        },
        {
          type: 'treasure',
          x: 0,
          y: 3,
        },
        {
          type: 'treasure',
          x: 1,
          y: 3,
        },
        {
          type: 'treasure',
          x: 1,
          y: 3,
        },
        {
          type: 'treasure',
          x: 1,
          y: 3,
        },
      ];

      expect(terrain.treasures.length).toBe(5);
      expect(terrain.treasures).toStrictEqual(
        expect.arrayContaining(treasures),
      );
    });

    it('should specify why an invalid terrain is invalid', () => {
      const sameTileMountainsTerrainString =
        'C​ - 4 - 5\nM​ - 1 - 0\nM​ - 1 - 0\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      const multipleDimensionsTerrainString =
        'C​ - 4 - 5\nC​ - 10 - 10\nM​ - 1 - 0\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      const treasureOnMountainTerrainString =
        'C​ - 4 - 5\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 2 - 1 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      const adventurerStartsOnMountainTerrainString =
        'C​ - 3 - 4\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 0 - S - AADADAGGA\n';

      const adventurerStartsOutsideOfBoundariesTerrainString =
        'C​ - 3 - 4\nM​ - 1 - 0\nM​ - 2 - 1\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - -1 - 10 - S - AADADAGGA\n';

      const unrecognizedTileTerrainString =
        'C​ - 4 - 5\nZ - 1 - 0\nM​ - 1 - 0\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 3\nA​ - Lara - 1 - 1 - S - AADADAGGA\n';

      expect(() => {
        Terrain.parse(sameTileMountainsTerrainString);
      }).toThrowError(new TerrainError('Multiple mountains on same tile'));

      expect(() => {
        Terrain.parse(multipleDimensionsTerrainString);
      }).toThrowError(new TerrainError('Mismatching terrain dimensions data'));

      expect(() => {
        Terrain.parse(treasureOnMountainTerrainString);
      }).toThrowError(new TerrainError('Treasure on a mountain tile'));

      expect(() => {
        Terrain.parse(adventurerStartsOnMountainTerrainString);
      }).toThrowError(new TerrainError('Adventurer starts on a mountain'));

      expect(() => {
        Terrain.parse(adventurerStartsOutsideOfBoundariesTerrainString);
      }).toThrowError(
        new TerrainError('Adventurer starts out of terrain boundaries'),
      );

      expect(() => {
        Terrain.parse(unrecognizedTileTerrainString);
      }).toThrowError(
        new TerrainError('Unable to parse terrain tile with data: "Z - 1 - 0"'),
      );
    });
  });

  describe('.parseFile()', () => {
    it('should accept valid file paths', () => {
      expect(() => {
        Terrain.parseFile('data/valid-1.terrain');
      }).not.toThrow();
    });
    it('should reject invalid file paths', () => {
      expect(() => {
        Terrain.parseFile('data/file-that-does-not-exist.terrain');
      }).toThrowError('no such file or directory');
    });
  });

  describe('.parseLine()', () => {
    // eslint-disable-next-line prefer-destructuring, dot-notation, prefer-destructuring
    const parseLine = Terrain['parseLine'];

    it('should parse terrain lines right', () => {
      const terrainLine = 'C - 3 - 4';
      const expectedTerrain = new Terrain(3, 4);
      const parsed = parseLine(terrainLine);

      expect(parsed).toBeInstanceOf(Terrain);
      expect(parsed).toBe(expectedTerrain);
    });

    it('should parse treasures lines right', () => {
      const treasureLine = 'T - 0 - 3 - 2';
      const expectedTiles: Tile[] = [
        { type: 'treasure', x: 0, y: 3 },
        { type: 'treasure', x: 0, y: 3 },
      ];
      const parsed = parseLine(treasureLine);

      expect(parsed).not.toBeInstanceOf(Terrain);
      expect(parsed).toHaveLength(2);
      expect(parsed).toStrictEqual(expect.arrayContaining(expectedTiles));
    });

    it('should parse mountains lines right', () => {
      const mountainLine = 'M - 1 - 1';
      const expectedMountain: Tile = { type: 'mountain', x: 1, y: 1 };
      const parsed = parseLine(mountainLine);

      expect(parsed).not.toBeInstanceOf(Terrain);
      expect(parsed).toHaveLength(1);
      expect(parsed).toContainEqual(expectedMountain);
    });

    it('should throw error when parsing invalid line type', () => {
      const invalidLine = 'Z - 1 - 1';

      expect(() => {
        parseLine(invalidLine);
      }).toThrowError(
        new TerrainError(
          `Unable to parse terrain tile with data: "${invalidLine}"`,
        ),
      );
    });

    it('should throw error when parsing line with too much information', () => {
      const terrainLine = 'C - 3 - 4 - 1 - 2';
      const treasureLine = 'T - 3 - 4 - 2 - 1 - 3';
      const mountainLine = 'M - 1 - 1 - 2 - 3';
      const adventurerLine =
        'A - Indiana - 1 - 1 - S - AADADA - shouldcauseerror';

      expect(() => {
        parseLine(terrainLine);
      }).toThrowError(
        new TerrainError('Too much information for terrain definition'),
      );

      expect(() => {
        parseLine(treasureLine);
      }).toThrowError(
        new TerrainError('Too much information for tile of type treasure'),
      );

      expect(() => {
        parseLine(mountainLine);
      }).toThrowError(
        new TerrainError('Too much information for tile of type mountain'),
      );

      expect(() => {
        parseLine(adventurerLine);
      }).toThrowError(new TerrainError('Too much information for adventurer'));
    });

    it('should throw error when parsing line with too few information', () => {
      const terrainLine = 'C - 3';
      const treasureLine = 'T - 3 - 4';
      const mountainLine = 'M - 1';
      const adventurerLine = 'A - Indiana - 1 - 1 - S';

      expect(() => {
        parseLine(terrainLine);
      }).toThrowError(
        new TerrainError('Too few information for terrain definition'),
      );

      expect(() => {
        parseLine(treasureLine);
      }).toThrowError(
        new TerrainError('Too few information for tile of type treasure'),
      );

      expect(() => {
        parseLine(mountainLine);
      }).toThrowError(
        new TerrainError('Too few information for tile of type mountain'),
      );

      expect(() => {
        parseLine(adventurerLine);
      }).toThrowError(new TerrainError('Too few information for adventurer'));
    });
  });
});

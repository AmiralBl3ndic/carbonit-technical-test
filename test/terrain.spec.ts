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
      }).toThrowError('Invalid terrain');
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

      const terrain = new Terrain(1, 1); //Terrain.parse(terrainString);

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

      terrain.mountains = mountains;

      expect(terrain.mountains.length).toBe(2);
      expect(terrain.mountains).toBe(expect.arrayContaining(mountains));
    });

    it('should place the treasures right', () => {});

    it('should specify why an invalid terrain is invalid', () => {});
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
});

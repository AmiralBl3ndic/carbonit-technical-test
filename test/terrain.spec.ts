import Terrain from '@/model/terrain.model';

describe('Terrain', () => {
  describe('.parse()', () => {
    it('should accept valid terrains', () => {});

    it('should reject invalid terrains', () => {});

    it('should accept valid terrains with comments', () => {});

    it('should place the mountains right', () => {});

    it('should place the treasures right', () => {});

    it('should specify why an invalid terrain is invalid', () => {});
  });

  describe('.parseFile()', () => {
    it('should accept valid file paths', () => {
      expect(() => {
        Terrain.parseFile('data/valid-1.terrain');
      }).not.toThrowError('no such file or directory');
    });
    it('should reject invalid file paths', () => {
      expect(() => {
        Terrain.parseFile('data/file-that-does-not-exist.terrain');
      }).toThrowError('no such file or directory');
    });
  });
});

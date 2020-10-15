type TileType = 'mountain' | 'treasure' | 'default';

/**
 * Represent a tile on a **Terrain**
 */
type Tile = {
  x: number;
  y: number;
  type: TileType;
};

export default Tile;

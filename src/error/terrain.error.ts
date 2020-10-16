class TerrainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TerrainError';
  }
}

export default TerrainError;

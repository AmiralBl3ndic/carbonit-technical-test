class TerrainError {
  message: string;

  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'TerrainError';
    (Error as any).captureStackTrace(this, TerrainError);
  }
}

export default TerrainError;

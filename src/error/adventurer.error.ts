class AdventurerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdventurerError';
  }
}

export default AdventurerError;

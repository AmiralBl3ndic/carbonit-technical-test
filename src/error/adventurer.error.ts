class AdventurerError {
  message: string;

  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'AdventurerError';
  }
}

export default AdventurerError;

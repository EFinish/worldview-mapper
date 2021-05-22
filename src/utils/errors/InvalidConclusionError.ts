class InvalidConclusionError implements Error {
  message: string;

  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'Invalid Conclusion';
  }
}

export default InvalidConclusionError;

export const kafkaWrapper = {
  client: {
    producer: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      send: jest.fn(),
      disconnect: jest.fn(),
    })),
    consumer: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      subscribe: jest.fn(),
      run: jest.fn(),
    })),
  },
};

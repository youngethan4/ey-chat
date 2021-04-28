export const kafkaWrapper = {
  client: {
    producer: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      send: jest.fn(),
      disconnect: jest.fn(),
    })),
  },
};

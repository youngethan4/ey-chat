export const kafkaWrapper = {
  client: {
    producer() {
      return {
        connect: jest.fn(),
        send: jest.fn(),
        disconnect: jest.fn(),
      };
    },
  },
};

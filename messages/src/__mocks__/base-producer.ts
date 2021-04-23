class BaseProducer {
  send = jest.fn().mockImplementation((message, cb: () => void) => {
    cb();
  });
}

export default BaseProducer;

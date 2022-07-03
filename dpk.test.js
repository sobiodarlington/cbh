require('jest')
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  const MAX_PARTITION_KEY_LENGTH = 256
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should always return a string", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 'Sample Key' });
    expect(typeof trivialKey).toBe("string");
  });

  it("Return a key less than or equal to 256", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 'Sample Key' });
    expect(MAX_PARTITION_KEY_LENGTH).toBeGreaterThanOrEqual(
      trivialKey.length
    );
  });
});

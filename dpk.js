const crypto = require("crypto");


exports.deterministicPartitionKey = (event) => {  
  const TRIVIAL_PARTITION_KEY = "0";
  if (!event || !event.partitionKey) {
    return TRIVIAL_PARTITION_KEY;// return early when event is falsy
  }

  // With the assuption that the only valid value for event is an object
  const { partitionKey } = event;
  const MAX_PARTITION_KEY_LENGTH = 256;
  const data = JSON.stringify(event);
  let candidate = partitionKey;

  candidate = crypto.createHash("sha3-512").update(data).digest("hex");

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    // What happens if the newly generated hash is greater that MAX_PARTITION_KEY_LENGTH
    // We could do a recursive call if there's a guarantee we'll get a hash less than or equal to MAX_PARTITION_KEY_LENGTH
    // in a few tries
    // e.g return deterministicPartitionKey(event)
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }

  return candidate;
};

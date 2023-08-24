function convertBufferToBoolean(buffer) {
  if (Buffer.isBuffer(buffer)) {
    if (buffer.readInt8()) return true;
    else return false;
  }
}

module.exports = { convertBufferToBoolean };

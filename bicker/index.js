class BickerClient {
  sendMessage(msg, connection, headerType="message") {
    const header = Buffer.alloc(20);
    header.write(headerType, 0, "utf-8");
    const body = Buffer.from(msg);
    const data = Buffer.concat([header, body]);

    connection.write(data, (err) => {
      if (err) {
        console.error("Error sending message");
        console.log(err);
      } else {
        console.log(`${headerType} successfully sent.`);
      }
    });
  }

  parseMessage(data) {
    // Slice first 20 bytes
    const header = data.slice(0, 20);
    const body = data.slice(20);

    return {
      header: this.bufferToString(header),
      body: this.bufferToString(body),
    };
  }

  bufferToString(data) {
    return data.toString().replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, "");
  }
}

module.exports = BickerClient;

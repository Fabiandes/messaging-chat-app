const net = require("net");
const readline = require("readline");

const Bicker = require("../bicker/index");

class Client {
  constructor(port, username) {
    //Get the port that the server is listening on.
    this.port = port;
    this.username = username;

    //Set up Bicker
    this.bicker = new Bicker();

    //Connect to server
    this.client = net.createConnection({ port: this.port }, () => {
      console.log("Connection Successfully Established.");
    });

    this.client.on("data", this.handleMessage);
  }

  handleMessage = (data) => {
    const msg = this.bicker.parseMessage(data);

    switch (msg.header) {
      case "message":
        this.displayMessage(msg.body);
        break;
      case "auth":
        this.authenicateClient();
        break;
      default:
        console.log("Receievd message with unknown header:", msg.header);
        break;
    }
  };

  authenicateClient = () => {
    console.log("Authenicating Client...");
    this.bicker.sendMessage(this.username, this.client, "auth");
  };

  displayMessage = (msg) => {
    console.log("Server:", msg.toString());
  };
}

module.exports = Client;

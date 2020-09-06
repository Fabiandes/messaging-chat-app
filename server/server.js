// Import the net library
const net = require("net");

// Import the User Object
const User = require("./user");

//Import Bicker
const Bicker = require("../bicker/index");

class Server {
  constructor(motd = "Welcome to the server!") {
    // Create set to store all users for broadcasting and logging
    this.connectedUsers = new Object();

    //this.users = new Set()
    this.bicker = new Bicker();

    this.motd = motd;

    // Create server instance
    this.server = net.createServer(this.handleNewConnection);
  }

  handleMessage = (data, connection) => {
    const msg = this.bicker.parseMessage(data);
    switch (msg.header) {
      case "message":
          const ID = connection.address()
          const username =this.getUsername(ID)
        this.displayMessage(username, msg.body);
        break;
      case "auth":
        this.registerSocket(msg.body, connection);
        break;
      default:
        console.log(`Unknown header |${msg.header}|`);
        break;
    }
  };

  displayMessage = (username, msg) => {
    console.log(`${username}: ${msg}`);
  };

  registerSocket = (username, connection) => {
    console.log("Registering", username);
    this.connectedUsers[connection.address()] = username;
    // Send MOTD to client
    this.bicker.sendMessage(this.motd, connection);
  };

  handleNewConnection = (connection) => {
    console.log("New Connection Established @", connection.address());

    // When connection closes
    connection.on("end", () =>
      console.log("Connection Closed @", connection.address())
    );

    // Error handling when socket is closed
    connection.on("error", (err) => {
      console.log(
        `There was an error that resulted in the socket @ ${connection.address()} to close.`
      );
    });

    // Parse incoming message
    connection.on("data", (data) => this.handleMessage(data, connection));

    // Get the username of the client.
    this.bicker.sendMessage("", connection, "auth");
  };

  getUsername = (ID)=>{
    return this.connectedUsers[ID]
  }

  listen = (port) => {
    this.server.listen(port, () => {
      console.log("Server running on", this.server.address());
    });
  };
}

module.exports = Server;

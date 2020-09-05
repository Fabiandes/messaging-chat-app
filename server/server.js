// Import the net library
const net = require('net')

// Import the User Object
const User = require('./user')

class Server {
    constructor(motd = "Welcome to the server!") {
        // Create set to store all users for broadcasting and logging
        this.users = new Set()

        // Create server instance
        this.server = net.createServer((connection) => {
            console.log("New Connection Established @", connection.address)

            // When connection closes
            connection.on('end', () => console.log("Connection Closed @", connection.address))

            // Parse incoming message
            connection.on('data', this.parseMessage(data))

            // Send MOTD to client
            this.sendMessage(motd)
        })
    }

    sendMessage(msg) {
        connection.write(msg, (err) => {
            if (err) {
                console.error("Error sending message to client.")
                console.log(err)
            } else {
                console.log("MOTD sent to client.")
            }
        })
    }

    parseMessage(msg) {
        console.log("Message recieved")
        console.log(msg.toString())
    }

    listen(port) {
        this.server.listen(port, () => {
            console.log('Server running on', this.server.address());
        });
    }
}

module.exports = Server;
// Import the net library
const net = require('net')

// Import the User Object
const User = require('./user')

//Import Bicker
const Bicker = require('../bicker/index')

class Server {
    constructor(motd = "Welcome to the server!") {
        // Create set to store all users for broadcasting and logging
        //this.users = new Set()
        this.bicker = new Bicker()

        this.motd = motd

        // Create server instance
        this.server = net.createServer(this.handleNewConnection)
    }

    displayMessage = (data) =>{
        const msg = this.bicker.parseMessage(data)
        if(msg.header === "message"){
            console.log("Client:", msg.body)
        }
    }

    handleNewConnection = (connection) => {
        console.log("New Connection Established @", connection.address())

        // When connection closes
        connection.on('end', () => console.log("Connection Closed @", connection.address()))

        // Error handling when socket is closed
        connection.on('error', (err) => {
            console.log(`There was an error that resulted in the socket @ ${connection.address()} to close.`)
        })

        // Parse incoming message
        connection.on('data', this.displayMessage)

        // Send MOTD to client
        this.bicker.sendMessage(this.motd, connection)
    }

    listen = (port) => {
        this.server.listen(port, () => {
            console.log('Server running on', this.server.address());
        });
    }
}

module.exports = Server;
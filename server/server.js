// Import the net library
const net = require('net')

class Server {
    constructor(motd="Welcome to the server!") {
        // Create server instance
        this.server = net.createServer((connection) => {
            console.log("New Connection Established @", connection.address)

            // When connection closes
            connection.on('end', () => {
                console.log("Connection Closed @", connection.address)
            })

            connection.on('data', (msg) => {
                console.log("Message recieved")
                console.log(msg.toString())
            })

            // Send MOTD to client
            connection.write(motd, (err) => {
                if (err) {
                    console.error("Error sending message to client.")
                    console.log(err)
                } else {
                    console.log("MOTD sent to client.")
                }
            })
        })
    }

    listen(port){
        this.server.listen(port,() => {
            console.log('Server running on', this.server.address());
        });
    }
}

module.exports = Server;
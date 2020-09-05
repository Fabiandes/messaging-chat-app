// Import the net library
const net = require('net')

// Create server instance
const server = net.createServer((connection)=>{
    console.log("New Connection Established.")

    // When connection closes
    connection.on('end', ()=>{
        console.log("Connection Closed.")
    })

    connection.on('data', (msg)=>{
        console.log("Message recieved")
        console.log(msg.toString())
    })

    // Send first message to client
    connection.write("Server says hello.",(err)=>{
        if(err){
            console.error("Error sending message to client.")
            console.log(err)
        }else{
            console.log("Message sent to client.")
        }
    })
})

module.exports = server;
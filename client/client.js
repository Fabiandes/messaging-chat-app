const net = require('net')
const readline = require('readline')

const Bicker = require('../bicker/index')

class Client{
    constructor(port){
        //Get the port that the server is listening on.
        this.port = port

        //Set up Bicker
        this.bicker = new Bicker()

        //Connect to server
        this.client = net.createConnection({port: this.port}, ()=>{
            console.log("Connection Successfully Established.")
        })

        this.client.on('data', this.displayMessage)
    }

    displayMessage = (data) => {
        const msg = this.bicker.parseMessage(data)
        if(msg.header == "message"){
            console.log("Server:", msg.body)
        }
    }
}

module.exports = Client
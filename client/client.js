const net = require('net')
const readline = require('readline')

class Client{
    constructor(port){
        //Get the port that the server is listening on.
        this.port = port

        //Connect to server
        console.log("Connection to server on port ", this.port)
        this.client = net.createConnection({port: this.port}, ()=>{
            console.log("Connection Successfully Established.")
        })

        this.client.on('data',(data)=>{
            console.log("Message recieved from server.")
            console.log(`Server: ${data}`)
        })
    }
}

module.exports = Client
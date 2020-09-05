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
            const msg = data.toString()
            console.log("Message recieved from server.")
            console.log(`Server: `, msg)
        })
    }

    sendMessage(msg){
        this.client.write(msg,(err)=>{
            if(err){
                console.error("Error sending message")
                console.log(err)
            }else{
                console.log("Message successfully sent to server")
            }
        })
    }
}

module.exports = Client
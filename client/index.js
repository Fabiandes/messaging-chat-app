const readline = require('readline')
const Client = require('./client')

const getServerPort = new Promise((resolve, reject)=>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question("What port is the server listening on?\r\n", (port)=>{
        resolve(port.trim())
        rl.close()
    })
})

getServerPort
.then((port)=>{
    const client = new Client(port);
    client.sendMessage("Hello from client")
})
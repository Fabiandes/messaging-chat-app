const readline = require('readline')
const Client = require('./client')

const getSetupInfo = new Promise((resolve, reject)=>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    let port = ''
    let username = ''

    rl.question("What port is the server listening on?\r\n", (input)=>{
        port = input.trim()
        rl.question("What is your username?\r\n", (input)=>{
            username = input.trim()
            rl.close()
            resolve([port, username])
        })
    })


})

getSetupInfo
.then((info)=>{
    const client = new Client(info[0], info[1]);
    client.bicker.sendMessage("I have just joint.", client.client)
})
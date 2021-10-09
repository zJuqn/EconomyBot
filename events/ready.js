const client = require("../index")

client.on('ready', async() => {
    console.log(`Estoy conectado como ${client.user.username}`)
});
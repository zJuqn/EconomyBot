const Discord = require('discord.js');
const intents = new Discord.Intents(32767)
const client = new Discord.Client({
    messageCacheLifetime: 120,
    fetchAllMembers: false,
    messageCacheMaxSize: 500,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents,
    disableMentions: 'everyone'
});
require('dotenv').config();

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
module.exports = client

require("./handler")(client);


client.login(process.env.token)
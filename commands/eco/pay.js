const Discord = require('discord.js');
const eco = require("../../models/eco")

module.exports = {
    name: "pay",
    category: "eco",
    aliases: [],
    usage: "pay @user <cantidad>",
    description: "Dale dinero a un usuario",
    /**
    *@param {Discord.Client} client
    *@param {Discord.Message} message
    *@param {String[]} args
    */
    run: async (client, message, args) => {
        const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
        const datau = await eco.findOne({ guild: message.guild.id, user: usuario.id})
        const datam = await eco.findOne({ guild: message.guild.id, user: messagea.author.id})
        if(!datam) return message.reply({ content: "No tieneos dinero"})

        const cantidad = args[1]
        if(!cantidad) return message.reply({ content: "Debes especificar una cantidad"})
        if(isNaN(cantidad)) return message.reply({ content: "La cantidad debe ser un numero"})
        if(cantidad > datam.money) return message.reply({ content: "No tienes suficiente dinero"})

        if(datau) {
            const money1 = parseInt(cantidad) + parseInt(datau.money)
            const money2 = parseInt(datam.money) - parseInt(cantidad)
            await eco.updateOne({guild: message.guild.id, user: usuario.id}, {money: money1})
            await eco.updateOne({ guild: message.guild.id, user: messagea.author.id}, {money: money2})
            return message.channel.send({ content: `${message.author} le pagaste **${cantidad}** a ${usuario}`})
        } else {
            const money2 = parseInt(datam.money) - parseInt(cantidad)
            await new eco({
                guild: message.guild.id,
                user: usuario.id,
                money: cantidad
            }).save();
            await eco.updateOne({ guild: message.guild.id, user: messagea.author.id}, {money: money2})
            message.channel.send({ content: `${message.author} le pagaste **${cantidad}** a ${usuario}`})
        }

    }
};
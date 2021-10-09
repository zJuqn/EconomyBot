const Discord = require('discord.js');
const eco = require("../../models/eco")
const a = new Set();

module.exports = {
    name: "rob",
    category: "eco",
    aliases: [],
    usage: "rob @user",
    description: "robale dinero a un usuario",
    /**
    *@param {Discord.Client} client
    *@param {Discord.Message} message
    *@param {String[]} args
    */
    run: async (client, message, args) => {

        if (a.has(message.author.id))
        return message.channel.send(`${message.author} Estas en cooldown`);
      
        a.add(message.author.id);
      
        setTimeout(() => {
          a.delete(message.author.id);
        }, 180000);

 const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
 if(!usuario) return message.reply({ content: "Debes mencionar a un usuario"})
 if(usuario.id === message.author.id) return message.reply({ content: "No te puedes robar a ti mismo"})
 const datos1 = await eco.findOne({ guild: message.guild.id, user: usuario.id})
 if(!datos1) return message.reply({content: "No tienes el suficiente dinero para robarle a esa persona"})
 const datos2 = await eco.findOne({ guild: message.guild.id, user: message.author.id})

 const porcentaje = Math.floor(Math.random() * 100)
 const robarc = Math.floor(Math.random() * datos1.money)

 if(porcentaje > 60) {
     const money1 = parseInt(robarc) + parseInt(datos2.money)
     const money2 = parseInt(robarc) - parseInt(datos1.money)
     await eco.updateOne(
         {guild: message.guild.id, user: message.author.id}, {money: money1}
     );
     await eco.updateOne({ guild: message.author.id, user: usuario.id});
     message.reply({
         embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription(`Robo exitoso, le robaste ${robarc} a ${usuario}`)]
     });
 };
 if(porcentaje < 50) {
    const money2 = parseInt(robarc) - parseInt(datos2.money)
    await eco.updateOne(
        {guild: message.guild.id, user: message.author.id}, {money: money2}
    );
    message.reply({
        embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription(`El robo no salio del todo bien y perdiste **-${robarc}** zZz`)]
    });
 }







    }
}
const Discord = require('discord.js')
const bank = require('../../models/banco')//Llamamos nuestro schema del banco
const eco = require('../../models/eco')//Llamamos nuestro schema de la economia normal

module.exports = {//Exportamos
    name: "balance",
    category: "Economy",
    aliases: [],
    usage: "",
    description: "",
     /**
     *@param {Discord.client} client
     *@param {Discord.Message} message
     *@param {String[]} args
     */
    run: async(client, message, args) => {
        //Si te sale cmd.execute is a not function remplaza el run: por un execute:

        //DEFINIREMOS USER Y EL SERVIDOR
        const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const servidor = message.guild.id

      const mb = await bank.findOne({ user: usuario.user.id, guild: servidor})//Buscamos datos del banco
      const m = await eco.findOne({ user: usuario.user.id, guild: servidor})//Buscamos datos del dinero que tiene a la mano
      const embed = new Discord.MessageEmbed()//Hacemos un embed
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
      .setColor("RANDOM")
      if(m && mb) {//Si tiene dinero en el banco y en la mano...
        embed.addField("Dinero:", `$${m.money}.`)//Colocamos un field con el dinero en la mano
        embed.addField("Banco:", `$${mb.money}.`)//Colocamos un field con el dinero del banco
        embed.addField("Total:", `$${mb.money + m.money}.`)//Sumamos ambas cantidades
        return message.reply({ embeds: [embed]})//y Retornamos con el embed de la informacion
      };//Cerramos el if
      if(!m && mb) {//Si no tiene dinero a la mano...
        embed.addField("Dinero:", `$0.`)//Colocamos 0 en el dinero a la mano
        embed.addField("Banco:", `$${mb.money}.`)//Colocamos el dinero que tiene en el banco
        embed.addField("Total:", `$${mb.money}.`)//Y de total solamente tendria el dinero del banco
        return message.reply({ embeds: [embed]})//y Retornamos con el embed de la informacion
      };//Cerramos el if
      if(m && !mb) {//Si tiene dinero en la mano pero no en el banco...
        embed.addField("Dinero:", `$${m.money}.`)//Colocamos el dinero que tiene en la mano
        embed.addField("Banco:", `$0.`)//Colocamos 0 en el banco
        embed.addField("Total:", `$${m.money}.`)//Y colocamos de dinero total el dinero que tiene a la mano
        return message.reply({ embeds: [embed]})//y Retornamos con el embed de la informacion
      };//Cerramos el if
      if(!m && !mb) {//Ahora si no tiene dinero ni en el banco y tampoco en la mano
        embed.addField("Dinero:", `$0.`)//Colocamos 0 en el dinero
        embed.addField("Banco:", `$0.`)//Colocamos 0 en el banco
        embed.addField("Total:", `$0.`)//Y si aprendiste matematicas sabes que 0 + 0 + 0 = 0 entonces colocamos 0 en dinero total
        return message.reply({ embeds: [embed]})//y Retornamos con el embed de la informacion
      };//Cerramos el if
      

    }//Cerramos
}//Cerramos
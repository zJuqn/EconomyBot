const Discord = require('discord.js');
const eco = require('../../models/eco')//Llamamos nuestro schema
const cooldown = new Set();

module.exports = {
    name: "work",
    category: "eco",
    aliases: [],
    usage: "work",
    description: "Trabaja",
    /**
    *@param {Discord.Client} client
    *@param {Discord.Message} message
    *@param {String[]} args
    */
    run: async (client, message, args) => {
        
        if (cooldown.has(message.author.id))
  return message.channel.send(`${message.author} Estas en cooldown`);

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 10000);

         //DEFINIREMOS USER Y EL SERVIDOR
         const usuario = message.author.id;//Id del usuario
         const servidor = message.guild.id//Id del servidor
 
            let trabajos = [//Hacemos un array con los trabajos
                "Trabajaste de Bombero y te pagaron:",
                "Trabajaste de Policia y te pagaron:",
                "Trabajaste de Guardia y te pagaron:",
                "Trabajaste de Streaper y te pagaron:",
                "Trabajaste de Mesero y te pagaron:",
                "Trabajaste de Cocinero y te pagaron:",
                "Trabajaste de Editor y te pagaron:",
                "Trabajaste de Chofer y te pagaron:",
                "Trabajaste de Modelo y te pagaron:",
                "Trabajaste de DJ y te pagaron:",
                "Trabajaste en YouTube y te pagaron:",
                "Trabajaste en Twitch y te pagaron:",
                "Trabajaste de Mecanico y te pagaron:"
            ];//Puedes colocar los que quieras
 
            let rand = trabajos[Math.floor(Math.random() * trabajos.length)];//Usamos la funcion Math.floor
             
            const dinero = await eco.findOne({ user: usuario, guild: servidor });//Buscamos los datos del usuario
            const cantidad = Math.floor(Math.random() * 1000)
            if(dinero) {//Si tiene dinero
             var work = parseInt(dinero.money) + parseInt(cantidad)//Obtenemos la cantidad que tenga y la sumamos
             //con la que ganara
             await eco.updateOne(//y actualizamos la informacion
                 { user: usuario, guild: servidor },
                 { money: work }
               );
            } else {//Y si no tiene
             let add = new eco({//Creamos un nuevo model
                 user: usuario,
                 guild: servidor,
                 money: cantidad,
               });
               await add.save();
            }
            const embedWork = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true}))
            .setDescription(`${rand} $${cantidad}. Felicidades!!`)
            .setColor("RANDOM")
 
            message.reply({ 
                embeds: [embedWork]
            });


    }
}
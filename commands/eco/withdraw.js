const Discord = require('discord.js')
const bank = require('../../models/banco')//Llamamos nuestro schema del banco
const eco = require('../../models/eco')//Llamamos nuestro schema de la economia normal

module.exports = {//Exportamos
    name: "withdraw",
    category: "",
    aliases: ["with"],
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
        const usuario = message.author.id;
        const servidor = message.guild.id
        
        const dinerom = await eco.findOne({ user: usuario, guild: servidor})//Buscamos los datos en nuestros datos xd
        const dinerob = await bank.findOne({ user: usuario, guild: servidor})//Buscamos los datos en nuestros datos xd
        if(!dinerob) return message.reply("Actualmente no tienes dinero en el banco")//Si no tiene dinero en el banco retornamos

        const cantidad = args[0]//Recolectamos los argumentos
        if(!cantidad) return message.reply("Ingrsa una cantidad")//Si no coloca argumentos retornamos
        if(isNaN(cantidad)) return message.reply("La cantidad debe ser un numero")//Si la cantidad no es un numero retornamos 

        if(cantidad > dinerob.money) return message.reply("No tienes esa cantidad")
        //Si la cantidad que ingresa es mayor a la que posee que retorne

        //vamos a retirar el dinero de su banco
        if(dinerom) {//Si tiene dinero
            const ct = parseInt(dinerom.money) + parseInt(cantidad)//Sumamos el dinero
            const a = parseInt(dinerob.money) - parseInt(cantidad)//Restamos el dinero
            await eco.updateOne(//y actualizamos la informacion
                { user: usuario, guild: servidor },
                { money: ct }
              );
              await bank.updateOne(//y actualizamos la informacion
                { user: usuario, guild: servidor },
                { money: a }
              );
          return message.reply(`Retiraste **$${cantidad}** de tu banco correctamente`)
        } else {
             const remover = parseInt(dinrob.money) - parseInt(cantidad)
            let banco = new eco({
                user: usuario,
                guild: servidor,
                money: cantidad
            })
            await eco.save();
            await bank.updateOne({user: usuario, guild: servidor}, {money: remover})
            return message.reply(`Retiraste **$${cantidad}** de tu banco correctamente`)
       }
    }//Cerramos
}//Ceramos
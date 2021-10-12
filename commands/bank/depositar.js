const Discord = require('discord.js')
const bank = require('../../models/banco')//Llamamos nuestro schema del banco
const eco = require('../../models/eco')//Llamamos nuestro schema de la economia normal

module.exports = {//Exportamos
    name: "depositar",
    category: "",
    aliases: ["deposit"],
    usage: "",
    description: "",
     /**
     *Colocamos nuestros parametros :eyes:
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
        if(!dinerom) return message.reply("No cuentas con dinero")//Si no tiene dinero retornamos
        const dinerob = await bank.findOne({ user: usuario, guild: servidor})//Buscamos los datos en nuestros datos xd

        const cantidad = args[0]//Recolectamos los argumentos
        if(!cantidad) return message.reply("Ingrsa una cantidad")//Si no coloca argumentos retornamos
        if(isNaN(cantidad)) return message.reply("La cantidad debe ser un numero")//Si la cantidad no es un numero retornamos 

        if(cantidad > dinerom.money) return message.reply("No tienes esa cantidad")
        //Si la cantidad que ingresa es mayor a la que posee que retorne

        //vamos a guardar en su banco
        if(dinerob) {//Si tiene dinero
            let agregarB = parseInt(dinerob.money) + parseInt(cantidad);
          let quitarM = parseInt(dinerom.money) - parseInt(cantidad);
  
          await bank.updateOne({ user: usuario, guild: servidor }, { money: agregarB });//Actualizamos los datos en el banco agregando el dinero
          await eco.updateOne({ user: usuario, guild: servidor }, { money: quitarM });//Actualizamos los datos en el dinero que tiene en la mano, restando el dinero
              return message.reply({//Retornamos con el embed diciendo que todo salio bien
                  embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription("Depositaste **"+cantidad+"** a tu banco correctamente!")]
              })
        }else {
            let quitarM = parseInt(dinerom.money) - parseInt(money);
  
            await eco.updateOne({ user: usuario, guild: servidor }, { money: quitarM });
    
            let a = new bank({
              user: usuario,
              guild: servidor,
              money: cantidad,
            });
            await a.save();
              return message.reply({//Retornamos con el embed diciendo que todo salio bien
                  embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription("Depositaste **"+cantidad+"** a tu banco correctamente!")]
              })
        }
    }
}

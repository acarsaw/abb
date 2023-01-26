const Discord = require('discord.js');
const db = require("croxydb")
const ms = require('ms');

module.exports = {
  name: 'kod-oluştur',
    kategori: 'owner',
    help: 'kod [süre]',
    description: 'key oluşturur',
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed().setDescription(`${client.config.mod} Üzgünüm sadece yöneticim bu komutu kullanabilir.`).setColor("RED")
 if (!client.config.owner.includes(message.member.id)) return message.channel.send({ embeds: [embed3] }).then(x => setTimeout(() => { x.delete()}, 10000 ))
var generator = require('generate-password');
var kod = generator.generate({
    length: 10,
    numbers: true
}); 
  let sure = args[0]
  if(!sure) return message.channel.send({content:`Süre girmedin, örneğin: 1 gün için 1d / 1 hafta için 1w / 30 gün için 30d`}).then(x => setTimeout(() => { x.delete()}, 10000 ))
     db.set(`kod_${kod}`, ms(sure))
     message.channel.send({ content: "Başarılı bir şekilde kod oluşturuldu ✅"}).then(x => setTimeout(() => { x.delete()}, 20000 ))
     message.author.send({content:`\`\`\`${kod}\`\`\``})
  }
}
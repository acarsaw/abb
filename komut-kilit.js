const Discord = require("discord.js")
const db1 = require('megadb')
const dbase = new db1.crearDB('database')

module.exports = {
  name: 'komut-engel',
  description: 'Komudu kullandığınız kanalın komutlarını kilitler/açar',
  help: 'komut-engel',
  kategori: 'owner',
  run: async (client, message, args) => {
    let embeds = new Discord.MessageEmbed().setDescription(`${client.config.mod} Üzgünüm sadece yöneticim bu komudu kullanabilir`).setColor("RED")
    if (!client.config.owner.includes(message.member.id)) return message.channel.send({embeds: [embeds]}).then(x => setTimeout(() => { x.delete()}, 10000 ))
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) await dbase.set(`kullanilabilir_kanallar_${message.channel.id}`, [])
    cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)

    if (cantbeuse.includes(message.channel.id)) {
      cantbeuse = cantbeuse.filter(g => !g.includes(message.channel.id))
      await dbase.set(`kullanilabilir_kanallar_${message.channel.id}`, cantbeuse)
    let embed3 = new Discord.MessageEmbed()
    .setDescription(`Bu kanalda bütün komutlar tekrardan aktif edildi`).setColor("RANDOM")
      return message.channel.send({embeds: [embed3]})

    } else {
      await dbase.push(`kullanilabilir_kanallar_${message.channel.id}`, message.channel.id)
    let embed4 = new Discord.MessageEmbed()
    .setDescription(`Komutlar artık bu kanalda kullanılamayacak\nKilidi açmak için tekrar bu kanala \`${message.content}\` yaz.`).setColor("RANDOM")
      return message.channel.send({embeds: [embed4]})

    }
  }
}
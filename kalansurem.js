const db = require("croxydb")
const ms = require('ms');
const Discord = require('discord.js');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')

module.exports = {
  name: 'kalansüre',
  aliases: ['kalansure','kalansurem','kalansürem'],
    kategori: 'kullanıcı',
    help: 'kalan süre',
    description: 'premium üyeliğinizde kalan süreyi gösterir',
  run: async (client, message, args) => {
let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({ content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()} , 10000))
    else {
    
    let cc = db.has(`pre_${message.author.id}`);
   if(cc === true) {
   	  let pre = db.fetch(`presure_${message.author.id}`)
      const moment = require("moment");
      require("moment-duration-format");
      const sure = moment.duration(db.fetch(`presure_${message.author.id}`) - Date.now()).format(" D [gün], H [saat], m [dakika], s [saniye]");
        let embed4 = new Discord.MessageEmbed() .setColor("#FFD600") .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })).setTitle("Üyeliğinizin bitmesine kalan süre:").setDescription(`${sure}`)  
        message.channel.send({ embeds: [embed4] })} else {
        let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
        let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({ embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 10000 ))}
        }
        }}
const Discord = require('discord.js');
const db = require("croxydb")
const ms = require('ms');


module.exports = {
  name: 'kod-sil',
    kategori: 'owner',
    help: 'kod-sil (üye) veya (key)',
    description: 'kullanılan veya kullanılmamış keyi siler',
  run: async (client, message, args) => {
    let embeds = new Discord.MessageEmbed().setDescription(`${client.config.mod} Üzgünüm sadece yöneticim bu komudu kullanabilir`).setColor("RED")
  if (!client.config.owner.includes(message.member.id)) return message.channel.send({embeds: [embeds]}).then(x => setTimeout(() => { x.delete()}, 10000 ))
  if(!args[0]) return message.channel.send({content:"Lütfen bir argüman girin örnek => `!key-sil user` veya `key-sil key` kullanınız"}).then(x => setTimeout(() => { x.delete()}, 10000 ))
  if(args[0] === `üye` || args[0] === `user`) {
let üye = message.mentions.members.first() || client.users.cache.get(args[1])
if(!üye) return message.channel.send({content: "Lütfen üyeliği alınacak `kullanıcıyı etiketleyin` veya `ID girin`"}).then(x => setTimeout(() => { x.delete()}, 10000 ))
let cc = db.has(`pre_${üye.id}`);
if(cc === true) {
  const moment = require("moment");
  require("moment-duration-format");
  const sure = moment.duration(db.fetch(`presure_${üye.id}`) - Date.now()).format(" D [gün], H [saat], m [dakika], s [saniye]");
  let embed = new Discord.MessageEmbed() .setColor("#FFD600") .setTimestamp() .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })).setTitle("Başarılı").setDescription(`${üye} üyesinin premium üyeliği sonlandırılmıştır\nÜyeliği bitmeden önce kalan süre => ${sure}\nÜyeliği silen yetkili ${message.author}`) 
  client.channels.cache.get(client.config.premiumsonlandilog).send({embeds: [embed]})
  db.delete(`presure_${üye.id}`);
  db.delete(`pre_${üye.id}`);
  message.channel.send(`${üye} üyesinin premium üyeliği sonlandırılmıştır`).then(x => setTimeout(() => { x.delete()}, 10000 ))
  
      
        
} else { message.channel.send(`${üye} üyesinin premium üyeliği bulunmamaktadır`).then(x => setTimeout(() => { x.delete()}, 10000 )) }}

if(args[0] === `kod` || args[0] === `kod`) {
let x = args[1]
if(!x) return message.channel.send({content:`Lütfen bir kod giriniz`}).then(x => setTimeout(() => { x.delete()}, 10000 ))
let kod = db.fetch(`kod_${x}`)
if(!kod) return message.channel.send({content:`Böyle bir kod bulunmamaktadır`}).then(x => setTimeout(() => { x.delete()}, 10000 ))
db.delete(`kod_${x}`)
message.channel.send({content: `${x} kodunu başarıyla sildim`})
}
  }
  }
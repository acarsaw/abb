const Discord = require('discord.js');
const db = require("croxydb")
const ms = require('ms');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')

module.exports = {
  name: 'kodkullan',
    kategori: 'kullanıcı',
    help: 'kod-kullan [üyelik-kodu]',
    description: 'botun ücretli komutlarına erişmek için',
  run: async (client, message, args) => {
  
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({ content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete() , 10000 }))
    else {
  
let x = args[0]
        let embed = new Discord.MessageEmbed() .setColor("#FFD600")
    .setTitle(`Hata`)
    .setDescription(`
\`Geçerli bir kod girmemişsin.\`
`)      
        let embed2 = new Discord.MessageEmbed() .setColor("#FFD600")
    .setTitle(`Hata`)
    .setDescription(`
\`Girdigin kod kullanılmış veya geçersiz.\`
`)
        

    let cc = db.has(`pre_${message.author.id}`);
   if(cc === true) {
   	message.channel.send(`Şu anda zaten aktif bir premium üyeliğiniz bulunuyor.`).then(x => setTimeout(() => { x.delete()}, 10000 ))
   } else {
    if(!x) return message.channel.send(embed)
    let kod = db.fetch(`kod_${x}`)
   let pre = db.fetch(`presure_${message.author.id}`)
    if(!kod) return message.channel.send({ embeds: [embed2] })
    if(pre) {
    db.add(`presure_${message.author.id}`,kod)
    }else{
    db.add(`presure_${message.author.id}`,kod + Date.now())
      
    }db.set(`pre_${message.author.id}`,true)
    db.delete(`kod_${x}`)
      const moment = require("moment");
    require("moment-duration-format");
    const sure = moment.duration(db.fetch(`presure_${message.author.id}`) - Date.now()).format(" D [gün], H [saat], m [dakika], s [saniye]");
        let embed3 = new Discord.MessageEmbed() .setColor("#FFD600").setTitle(`Başarılı`).setDescription(`\`Üyeliğin aktif edildi !yardım yazarak bot komutlarını kullanabilirsin\`\nEğer komut kullanımlarını bilmiyorsanız [BURAYA TIKLAYINIZ](https://discord.gg/kwSDykSG)\n Kalan süren: ${sure}`)
        let embed4 = new Discord.MessageEmbed() .setColor("#FFD600").setTitle("Başarılı").setDescription(`\`${message.author.tag}\` \`${message.author.id}\` adlı üye \`${x}\` kodunu kullanarak \`${sure}\` premium üye oldu.`)  
        message.channel.send({ embeds: [embed3] })
        client.channels.cache.get(client.config.premiumbasladilog).send({ embeds: [embed4] });

}
}}}
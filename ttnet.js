const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'ttnet',
    kategori: 'sorgu',
    help: 'nasil kullanildigi',
    description: 'komutun aciklamasi',
  run: async (client, message, args) => {
           let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
            if (!cantbeuse) cantbeuse = []
            if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 10000 ));
            else {
      let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 10000 ));
 
        message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.elmas} ${message.author} S4rgulama için is4m ve s4y is4mi aynı mesajda gönd4riniz.\n**Örnek gösterim: Ahm4t Ç4çek**`).setColor("RED")]}).then(async m => {
        let awaitMessage = await m.channel.awaitMessages({filter: x => x.author.id == message.author.id,  max: 1, time: 15000 });
        if (!awaitMessage.size) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} ${message.author} Zamanında cevap verm4diğin için işlemi iptal edildi.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
        setTimeout(() => { m.delete()}, 20000 )
        let ad = awaitMessage.first();
    

        let sorgu = mysql.createConnection({
          host: "91.151.83.93",
          user: "amiral",
          password: "asdasd2525",
          database: "ttnet-6m"
        });
   
let sonuç = `SELECT * FROM data WHERE ADSOYAD="${ad}"`

      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} S4rgunuz yapıl4yor, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 1000 )).then(
        sorgu.query(sonuç, [ad], async function(err, result) {
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Gird4ğin bilg4lere ait bir kayıt bulunamadı.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
           let datam = require('util').inspect(data)
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${ad}-ttnet-s4rgu.txt`);
        message.channel.send({content: `Hey işte ${ad} kiş4sinin b4lgileri 🎉\`\`\`js\n${datam} \`\`\` `}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )).catch(err => {
          message.channel.send({content: `${client.config.elmas} Verd4ğin bilg4ler ile eşl4şen birden fazla k4şi olduğu için sonuç **TXT** olarak gönderildi.`,files: [dosyahazırla]}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )) })
          let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`ttnet\` komutunu kullandı\n\nSorgulattığı ad/soyad => ${ad}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.ttnetlog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.ttnetlog).send({content: `${message.author} \`${message.author.username}\` Adlı kullanıcı \`ttnet\` komutunu kullandı\n\nSorgulattığı ad soyad => ${ad}\n${client.config.elmas} İşte bilgiler aşağıda verilmiştir`,files: [dosyahazırla]})})
          
        }))


})

}
        }}
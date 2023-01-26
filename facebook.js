const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'facebook',
    kategori: 'sorgu',
    help: 'facebook [tel no]',
    description: 'telefon numarasına ait kişinin kimlik bilgisini atar',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 7000 ));
    else {
    
         let vip1 = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription("BU OYUN BAKIMDA")
        let vip = db.fetch(`bakım_${message.author.id}`)
        if(!vip) return message.channel.send({embed: [vip1]}).then(x => setTimeout(() => { x.delete()}, 10000 ));
       
    let gsm = args[0]
    if(!gsm) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ Geç4rli bir telef0n num4rası giriniz. **Örneğin: !facebook +905303304700**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
    let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "facebook-20m"
    });
   
    let sonuç = `SELECT * FROM data WHERE NUMARA="${gsm}"`
      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} ${gsm} S4rgunuz yapılıyor, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 2000 )).then(
        sorgu.query(sonuç, [gsm], async function(err, result) {
          if(err) throw err
          
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.config.mod} Girdiğin bilgilere ait bir kayıt bulunamadı.`).setColor("RED")).then(x => setTimeout(() => { x.delete()}, 7000 ));
           let datam = require('util').inspect(data)
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${gsm}-s4rgu.txt`);
        message.channel.send(`Hey işte ${gsm} n0lu num4r4nın b4lgileri 🎉\`\`\`js\n${datam} \`\`\` `).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )).catch(err => {
          message.channel.send(`${client.config.elmas} Verdiğin bilg4ler ile eşl4şen birden fazla kişi olduğu için sonuç **TXT** olarak gönderildi.`, dosyahazırla).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )) })
          let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`facebook\` komutunu kullandı\n\nSorgulattığı telefon numarası => ${gsm}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.facelog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.facelog).send({content: `${message.author.username} Adlı kullanıcı \`facebook\` komutunu kullandı\n\nSorgulattığı telefon numarası => ${gsm}\nİşte bilgiler`,files: [dosyahazırla]})})
          
        })  
      )

}
}
}
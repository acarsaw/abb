const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'tc',
    kategori: 'sorgu',
    help: 'tc [tc no]',
    description: 'tc kimlik numarasına ait kişinin ad-soyad bilgisini atar',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 7000 ));
    else {
          let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
       
    let tc = Number(args[0])
    if(!tc) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ Geçerli bir k4ml4k num4r@sı giriniz. **Örneğin: !tc 11111111110**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "101m"
    });
   
    let sonuç = `SELECT * FROM 101m WHERE TC="${tc}"`
      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} S4rgunuz yapılıy0r, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 1000 ))
        sorgu.query(sonuç, [tc], async function(err, result) {
          if(err) throw err
          
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Girdiğin bilgilere ait bir kayıt bulunamadı.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
           let datam = require('util').inspect(data)
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${tc}-s4rgu.txt`);
        message.channel.send({content: `Hey işte ${tc} n4m4r4lı k4ml4ğin bilg4leri 🎉\`\`\`js\n${datam} \`\`\` `}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )).catch(err => {
          message.channel.send({content: `${client.config.elmas} Verdiğin b4lg4ler ile eşleşen birden fazla k4şi olduğu için sonuç **TXT** olarak gönderildi.`,files: [dosyahazırla]}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )) })
          let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`tc\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${tc}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.tclog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.tclog).send({content: `${message.author.username} Adlı kullanıcı \`tc\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${tc}\nİşte bilgiler`,files: [dosyahazırla]})})
          
        })  
      

}
}
}
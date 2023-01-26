const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const request = require('request')
const mysql = require('mysql')
module.exports = {
  name: 'sms',
    kategori: 'sms',
    help: 'sms [telefon no]',
    description: 'sms bomber',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 7000 ));
    else {
          let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
       
    let sms = Number(args[0])
    if(!sms) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ Geçerli bir k4ml4k num4r@sı giriniz. **Örneğin: !sms 5541564**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
   
      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} S4rgunuz yapılıy0r, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 1000 ))
           request(`https:smsboomber.monst3rcuts.repl.co/api/smsboomber?auth=77e2edcc9b40441200e31dc57dbb8829&number=${sms}`, (error, response, body) => {
		  let result = JSON.parse(body);
          if(error) throw error
          
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Girdiğin bilgilere ait bir kayıt bulunamadı.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
           let datam = data.map(x => `Sehir Kodu : ${x.CityId} \n\n İlce:  ${x.Town} \n\n Adres: ${x.Address} \n\n VergiDairesi : ${x.TaxOffice}\n`).join("\n")
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${sms}-s4rgu.txt`);
        message.channel.send({content: `Hey işte ${sms} n4m4r4lı k4ml4ğin a#dres bilg4leri 🎉\`\`\`js\n${datam} \`\`\` `}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )).catch(err => {
          message.channel.send({content: `${client.config.elmas} Verdiğin b4lg4ler ile eşleşen birden fazla k4şi olduğu için sonuç **TXT** olarak gönderildi.`,files: [dosyahazırla]}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )) })
          let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`sms\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${sms}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.smslog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.smslog).send({content: `${message.author.username} Adlı kullanıcı \`adres\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${sms}\nİşte bilgiler`,files: [dosyahazırla]})})
          
        })  
      

}
}
}
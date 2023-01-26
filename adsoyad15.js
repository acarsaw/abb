const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'egm-2015',
    kategori: 'sorgu',
    help: 'nasil kullanildigi',
    description: 'komutun aciklamasi',
  run: async (client, message, args) => {
           let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
            if (!cantbeuse) cantbeuse = []
            if (cantbeuse.includes(message.channel.id)) return message.channel.send({content:`❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 10000 ))
            else {
      let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]})
        let membed1 = new Discord.MessageEmbed().setDescription(`${client.config.elmas} ${message.author} S4rgulanacak kişinin **ad!nı** giriniz.`).setColor("RED")
        message.channel.send({embeds: [membed1]}).then(async m => {
        let awaitMessage = await m.channel.awaitMessages({filter: x => x.author.id == message.author.id,  max: 1, time: 15000 });
        let membed2 = new Discord.MessageEmbed().setDescription(`${client.config.mod} ${message.author} Senden cevap alamadığım için işlemi iptal ettim.`).setColor("RED")
        if (!awaitMessage.size) return m.edit({embeds: [membed2]}).then(x => setTimeout(() => {x.delete()}, 7000))
        let ad = awaitMessage.first();
    let membed3 = new Discord.MessageEmbed().setDescription(`${client.config.elmas} ${message.author} S4rgulanacak kişinin **s0yad!nı** giriniz.`).setColor("RED")
        m.edit({embeds: [membed3]}).then(async z => {
         
            let awaitMessage1 = await z.channel.awaitMessages({filter: x => x.author.id == message.author.id,  max: 1, time: 15000 });
            setTimeout(() => {z.delete()}, 20000)
            if (!awaitMessage1.size) return z.edit({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} ${message.author} Senden cevap alamadığım için işlemi iptal ettim.`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 7000))
            let soyad = awaitMessage1.first();
                   message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${message.author} Ar4dığın şahsın yaş4dığı !li girecek misin? [\`evet/hayır\`]`).setColor("RED")]}).then(async b => {
    
                let awaitMessage31 = await b.channel.awaitMessages({filter: x => x.author.id == message.author.id,  max: 1, time: 15000 });
                setTimeout(() => {b.delete()}, 20000)
                if (!awaitMessage31.size) return b.edit({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} ${message.author} Senden cevap alamadığım için işlemi iptal ettim.`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 7000))
if(!awaitMessage31.first().content) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Lütfen \`evet\` veya \`hayır\` arrgümanlarından birini kullanın.`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 7000))

if (awaitMessage31.first().content == "hayır") {

        let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mernis-2015"
    });
   
let sonuç = `SELECT * FROM data WHERE ADI="${ad}" AND SOYADI="${soyad}"`

      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} S4rgunuz yapılıyor, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 3000 )).then(
        sorgu.query(sonuç, [ad,soyad], async function(err, result) {
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Girdiğin bilgilere ait bir kayıt bulunamadı.`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 10000));
           let datam = require('util').inspect(data)
           let mal = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.ANAADI} ${x.BABAADI} ${x.DOGUMYERI} ${x.DOGUMTARIHI} ${x.CINSIYETI} ${x.NUFUSILI} ${x.NUFUSILCESI} ${x.ADRESIL} ${x.ADRESILCE} ${x.MAHALLE} ${x.CADDE} ${x.KAPINO} ${x.DAIRENO}\n`).join("\n")
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(mal), `${ad}-${soyad}-s4rgu.txt`);
        message.channel.send({content: `Hey işte ${ad} ${soyad} kiş4sinin b4lgileri 🎉\`\`\`js\n${datam} \`\`\` `}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )).catch(err => {
          message.channel.send({content: `${client.config.elmas} Verdiğin bilgiler ile eşleşen birden fazla kişi olduğu için sonuç **TXT** olarak gönderildi.`, files: [dosyahazırla]}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )) })
          let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`ad-soyad\` komutunu kullandı\n\nSorgulattığı ad/soyad => ${ad} ${soyad}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.adsoyadlog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.adsoyadlog).send({content:`${message.author} \`${message.author.username}\` Adlı kullanıcı \`ad-soyad\` komutunu kullandı\n\nSorgulattığı ad soyad => ${ad} ${soyad}\n${client.config.elmas} İşte bilgiler aşağıda verilmiştir`, files: [dosyahazırla]})})
          
        })  

)

} else


if (awaitMessage31.first().content == "evet") {

b.edit({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Lütfen bir !l adı giriniz`).setColor("RED")]}).then(async r => {
        
        let awaitMessage = await m.channel.awaitMessages({filter: x => x.author.id == message.author.id,  max: 1, time: 15000 });
        if (!awaitMessage.size) return r.edit({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} ${message.author} Zamanında cevap vermediğin için  sistemini iptal ettim`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 10000));
        let il = awaitMessage.first();
        
        let sorgu = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "mernis-2015"
        });
       
   
let sonuç = `SELECT * FROM data WHERE ADI="${ad}" AND SOYADI="${soyad}" AND ADRESIL="${il}"`
      
       message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} S4rgunuz yapılıyor lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 2000)).then(
        sorgu.query(sonuç, [ad,soyad,il], async function(err, result) {
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Üzgünüm aradığınız sonuç bulunamadı`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 10000));
           let datam = require('util').inspect(data)
           let mal = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.ANAADI} ${x.BABAADI} ${x.DOGUMYERI} ${x.DOGUMTARIHI} ${x.CINSIYETI} ${x.NUFUSILI} ${x.NUFUSILCESI} ${x.ADRESIL} ${x.ADRESILCE} ${x.MAHALLE} ${x.CADDE} ${x.KAPINO} ${x.DAIRENO}\n`).join("\n")
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(mal), `${ad}-${soyad}-${il}-s4rgu.txt`);
           message.channel.send({content: `Hey işte ${ad} ${soyad} kiş4sinin b4lgileri 🎉\`\`\`js\n${datam} \`\`\` `}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )).catch(err => {
            message.channel.send({content: `${client.config.elmas} Verdiğin bilgiler ile eşleşen birden fazla kişi olduğu için sonuç **TXT** olarak gönderildi.`, files: [dosyahazırla]}).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi )) })
          let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`ad-soyad-il\` komutunu kullandı\n\nSorgulattığı ad/soyad/il => ${ad} ${soyad} | ${il}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.adsoyadlog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.adsoyadlog).send({content: `${message.author} \`${message.author.username}\` Adlı kullanıcı \`ad-soyad-il\` komutunu kullandı\n\nSorgulattığı ad/soyad/il => ${ad} ${soyad} | ${il}\n${client.config.elmas} İşte bilgiler`, files: [dosyahazırla]})})
          
        })  
)

})
} else message.channel.send(new Discord.MessageEmbed().setDescription(`${client.config.mod} Lütfen \`Evet\` veya \`hayır\` arrgümanlarından birini kullan`).setColor("RED")).then(x => setTimeout(() => { x.delete()}, client.config.mesajsilmesüresi ))


})
        
})
})
}
        }}
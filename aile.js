const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'aile',
    kategori: 'sorgu',
    help: 'tc [tc no]',
    description: 'tc kimlik numarasına ait kişinin ad-soyad bilgisini atar',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content:`❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 10000 ))
    else {
let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
  let vip = db.fetch(`pre_${message.author.id}`)
if(!vip) return message.channel.send({embeds: [vip1]})

    let tc = Number(args[0])
    if(!tc) return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ Geçerli bir k4ml4k num4r@sı giriniz. **Örneğin: !tc 11111111110**`).setColor("RED")).then(x => x.delete({ timeout: 7000 }))
let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "101m"
    });
   
    let sonuç = `SELECT * FROM 101m WHERE TC="${tc}"`
   
    message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} S4rgunuz yapılıyor, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 1000 )).then(
          sorgu.query(sonuç, [tc], async function(err, result) {
            const data = JSON.parse(JSON.stringify(result))  
            if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Girdiğin bilgilere ait bir kayıt bulunamadı.`).setColor("RED")]}).then(x => setTimeout(() => {x.delete()}, 10000));
           let datam = require('util').inspect(data)
           let mal = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}\n`).join("\n")
          let babatc = data.map(y => `${y.BABATC}`)
          let annetc = data.map(y => `${y.ANNETC}`)
         
          let sonuç2 = `SELECT * FROM 101m WHERE TC="${babatc}"`
          sorgu.query(sonuç2, [babatc], async function(err, result) {
            const data = JSON.parse(JSON.stringify(result))  
            let datam = require('util').inspect(data)
            let babamap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}\n`).join("\n")
          

          let sonuç3 = `SELECT * FROM 101m WHERE TC="${annetc}"`
          sorgu.query(sonuç3, [annetc], async function(err, result) {
            const data = JSON.parse(JSON.stringify(result))  
            let datam = require('util').inspect(data)
            let annemap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}\n`).join("\n")
         
            let sonuç4 = `SELECT * FROM 101m WHERE ANNETC="${annetc}"`
            sorgu.query(sonuç4, [annetc], async function(err, result) {
              const data = JSON.parse(JSON.stringify(result))  
              let datam = require('util').inspect(data)
              let kardesmap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}`).join("\n")
           
              let sonuç5 = `SELECT * FROM 101m WHERE ANNETC="${tc}" OR BABATC="${tc}"`
              sorgu.query(sonuç5, [tc], async function(err, result) {
                const data = JSON.parse(JSON.stringify(result))  
                let datam = require('util').inspect(data)
                let çocuklarmap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}`).join("\n")
                message.channel.send({content: `\`\`\`js\n"Kendisi"\`\`\`\n${mal}\n\`\`\`js\n"Babası"\`\`\`\n${babamap}\n\`\`\`js\n"Annesi"\`\`\`\n${annemap}\n\`\`\`js\n"Kardeşleri"\`\`\`\n${kardesmap}\n\n\`\`\`js\n"Çocukları"\`\`\`\n${çocuklarmap ? `${çocuklarmap}`: 'Verilere kayıtlı bir çocuğu bulunmamaktadır'}`})
             

                
              })
           
            })  
          })

        })
          }))
}}}
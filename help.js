const Discord = require('discord.js')

const db1 = require('megadb')
const dbase = new db1.crearDB('database')

module.exports = {
    name: 'Yardım',
    aliases: ['yardım'],
    run: async(client, message, args) => {

    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({ content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()} , 10000 ))
    else {
    
let embed = new Discord.MessageEmbed().setColor('#00ff00').setDescription(`
:warning: **Genel Komutlar**
	
\`!yardım\` *(Botun yardım menüsünü açar.)*
\`!kalansürem\` *(Kalan üyelik süreni gösterir.)*
\`!kodkullan <kod>\` *(Üyeliğinizi aktif eder.)*
 
:warning: **Sorgu Komutları**

\`!adsoyad\` *(Yazılan bilgilerle eşleşen kişileri çıkartır.)* - *(Botun istediği bilgileri gönderiniz.)*
    
\`!tc <tc>\` *(Yazılan tc numarasına ait kişinin bilgilerini çıkartır.)*
       
\`!aile <tc>\` *(Yazılan tc numarasına ait kişinin aile bilgilerini çıkartır.)*

\`!adres <tc>\` *(Yazılan tc numarasına ait kişinin adres bilgilerini çıkartır.)*
       
\`!gsm <telefon>\` *(Yazılan numaranın hat sahibinin TC numarasını çıkartır.)* - *(Telefon numarasını başında sıfır olmadan giriniz.)*
       
\`!tcgsm <tc>\` *(Yazılan TC numarasına kayıtlı olan numaraları çıkartır.)*`)

message.reply({ embeds: [embed] })
}
}
}  
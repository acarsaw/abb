const Discord = require('discord.js')
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
module.exports = {
  name: 'pre-list',
    kategori: 'owner',
    help: 'pre-list',
    description: 'premium listeyi atar',
  run: async (client, message, args) => {
    let embeds = new Discord.MessageEmbed().setDescription(`${client.config.mod} Üzgünüm sadece yöneticim bu komudu kullanabilir`).setColor("RED")
    if (!client.config.owner.includes(message.author.id)) return message.channel.send({embeds: [embeds]}).then(x => setTimeout(() => { x.delete()}, 10000 ))
(async() => {
  const premiums = [];
  await client.users.cache.forEach(async(üye) => {
    let user = await db.fetch(`pre_${üye.id}`);
    if (user) premiums.push(üye);
  })
  let embed = new Discord.MessageEmbed().setColor("#FFEE58").setDescription(`Bluzer Communitypremium üyelik sistemi 
  \`Premium üye sayısı:\` ${premiums.length}
  
  *Premiumda olan üyeleri listelemek için aşşağıdaki emojiye basmanız yeterli.*
  `)
let pre = premiums.map(u => `${u.username} \| ${u.id}`).join("\n")
let prem = premiums.map(u => `${u}`).join("\n")
await message.channel.send({embeds: [embed]}).then(async msg => {
        let emoji = "✅"
        await msg.react(emoji)
        const qwe = (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id;
        const collector = msg.createReactionCollector({ filter: qwe, time: 20000, max: 1 })
        console.log("sa")
        collector.on("collect", async () => {
          await msg.reactions.removeAll()
          await msg.edit({content:`\`Bluzer community\` premium üyeleri aşşağıda belirtilmiştir
${pre}`}).catch(e => {
  msg.edit({content:`\`Bluzer community\` premium üyeleri aşşağıda belirtilmiştir
  ${prem}`})
})
 })
 })
})();





}
}



  
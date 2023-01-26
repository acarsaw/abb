const Discord = require('discord.js');
const client = global.client = new Discord.Client({partials: ["CHANNEL","MESSAGE"], allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: 32767});

const fs = require('fs');
const process = global.process;
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const db = require("croxydb")

fs.readdirSync('./komutlar', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/kullanıcı', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/kullanıcı/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/kullanıcı/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/owner', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/owner/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/owner/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/sorgu', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/sorgu/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/sorgu/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



client.on("messageCreate", message => {
    const prefix = "!"; // prefix
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.split(' ').slice(1);
    const command = message.content.split(' ')[0].slice(prefix.length);
    
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
}) 

client.config = {
    token : "MTA2MjA3NDUwOTcwNTg3MTQwMA.G-W1H5.jRCeh9_64YoVzOi6odbgvzff2Pos-JD9zCHGSc",
    üyelikyokmesaj: ":no_entry_sign: Sistemde üyeliğiniz bulunmamaktadır!",
    premiumbittilog: '1061370788478980136',
    premiumbasladilog: '1061370788478980136',
    premiumsonlandilog: '1061370788478980136',
    owner: ["654736784458252291","1029070712075464814","920781785372168204","1025061477431910520","848293418291036191"],
    gsmtclog: '1061754731191607427',
    mesajsilmesüresi: '2000000', //mesajı kaç saniyede sileceğini yazın 10000 = 10sn 60000 = 60sn
    tclog: '1061754665357807687',
    tcgsmlog: '1061754615881793566',
    load: ":tada:",
    mod: ":tada:",
    elmas: ":tada:",
    supriz: ":tada:",
    adsoyadlog: "1061754472252067971",
    facelog: "1061754537150521385",
    ttnetlog: "1061370788478980136",
    adreslog: "1062308257860952064",
    sulalelog: "1062309785611022336",
    smslog: "QY7N16hpM6YdI4K",
    komutlog: "1061754643169955911"
    }

client.on('ready', () => {
    
    client.user.setPresence({ activity: { name: 'Fox Ch4ck Community'}, status: 'idle' })
    console.log(`[main/INFO] Başarıyla sunucuya bağlanıldı.`)
})


client.login(client.config.token)
  .catch(() => console.log('ERROR - API\'ye bağlanılamadı.'));
  
  client.on("messageCreate", message => {
    if (client.config.owner.includes(message.author.id)) return;
  if (message.channel.type === "DM") { 
  	if (message.author.bot) return;
console.log(`${message.author.tag} > ${message.content}`)
client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > ${message.content}`}).catch(err => {
    client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > mesajı çok uzun`})})

}});
  

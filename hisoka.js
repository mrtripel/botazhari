
require('./index')
const { BufferJSON, 
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
proto, generateWAMessageContent, 
generateWAMessage, 
prepareWAMessageMedia, 
areJidsSameUser, 
MessageType,
MessageOptions, 
Mimetype,
getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom } = require('./lib/myfunc')

// read database

global.db = JSON.parse(fs.readFileSync('./src/database.json'))
if (global.db) global.db.data = {
sticker: {},
database: {},
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}




process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
module.exports = conn = async (conn, m, chatUpdate, store) => {
try {
var cmd = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var prefix = /^[!?#/.,]/.test(cmd) ? cmd.match(/^[!?#/.,]/gi) : "/"
var body = (m.mtype === 'conversation' && m.message.conversation.startsWith(prefix)) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption.startsWith(prefix) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption.startsWith(prefix) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(prefix) ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
/*var prefix = prefa ? /^[!?#$/.,]/gi.test(body) ? body.match(/^[!?#$/.,]/gi)[0] : "" : prefa ?? global.prefix*/
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await conn.decodeJid(conn.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
/*const isOff = [...global.udah].includes(m.chat)
const isBan = [...global.ban].includes(m.chat)
const isSimi = [...global.simi].includes(m.chat)*/
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
/*const isOffline = !m.isGroup ? global.offline.includes("offline") : false
const simo = budy.slice(0)*/
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const smime = (m.msg).mimetype || ''
const sisMedia = /image|video|sticker|audio/.test(smime)

// Group
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false

	try {

} catch (err) {
console.log(err)
}
	
// Public & Self
if (!conn.public) {
if (!m.key.fromMe) return
}

// Push Message To Console && Auto Read
if (m.message) {
/*conn.sendReadReceipt(m.chat, m.sender, [m.key.id])*/
console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
}
	

	// reset limit every 12 hours
 let cron = require('node-cron')
cron.schedule('00 12 * * *', () => {
let user = Object.keys(global.db.data.users)
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
for (let jid of user) global.db.data.users[jid].limit = limitUser
console.log('Reseted Limit')
}, {
scheduled: true,
timezone: "Asia/Jakarta"
})


  
  //Akinator
        this.akinator = this.akinator ? this.akinator : {}
        if(typeof this.akinator[m.sender] == 'object' && budy.length == 1 && ["1", "2", "3", "4", "5"].includes(budy)) {
        await this.akinator[m.sender].step(Number(budy) - 1)
        if (this.akinator[m.sender].progress >= 89 || this.akinator[m.sender].currentStep >= 78) {
        await this.akinator[m.sender].win();
        let _teksAki = `*Saya berpikir*
        
${this.akinator[m.sender].answers[0].name}
${this.akinator[m.sender].answers[0].description}


Akinator selesai dalam ${this.akinator[m.sender].currentStep} langkah!`
conn.sendMessage(m.chat, { image: { url: this.akinator[m.sender].answers[0].absolute_picture_path}, caption: _teksAki }, { quoted: m }).then(() => { delete this.akinator[m.sender] })
return !0
        }
        yuk = `*${this.akinator[m.sender].currentStep + 1}*. *${this.akinator[m.sender].question}*
*Progress:* ${this.akinator[m.sender].progress}

[1] Iya
[2] Tidak
[3] Tidak Tahu
[4] Mungkin Iya
[5] Mungkin Tidak

Ketik angka/teksnya!`
conn.sendMessage(m.chat, {text: yuk}, {quoted: m})
        }

if(!m.isGroup) {
if(!isCreator && !m.sender.startsWith("62") && !m.sender.startsWith("60")) return m.reply("Bot has stopped operating for private message")
if(budy.includes("Assalamualaikum")) return m.reply("Waalaikumussalam")
if(!isCreator) {
if(!command) return m.reply("Ini adalah *Bot WhatsApp* ketik /menu untuk menampilkan list menu yang tersedia")
}
}
if(isCmd) {
	if(!coomd.includes(m.sender)) {
		coomd.push(m.sender)
		fs.writeFileSync('./user.json', JSON.stringify(coomd))
		}
	}

	if (!m.isGroup) return m.reply("Bot Hanya Dapat Digunakan Di Grub \n\nJika Ingin Sewa Bot Ini Hanya 10K/1 Grub \n\nHubungi Owner wa.me/6289501427163")


switch(command) {



	 
case 'belipremium': case 'sewa': {
	respons = `*Sewa Bot*
	
Sewa bot join grup 
Cuman 10k/Grub pembayaran via Gopay/Dana
Chat owner untuk melanjutkan

©BotVirtual`
	conn.sendMessage(m.chat, {text: respons, contextInfo: {externalAdReply: {title: 'Owner Bot', body: 'Klik disini untuk menuju nomor Owner', sourceUrl: `https://wa.me/6281232646925`, mediaUrl: `https://wa.me/6281232646925`, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./image/pem.jpg`)}}})
	}
break



case 'sticker': case 'stiker': case 's': case 'stickergif': case 'sgif': {
	wm = args.join(" ")
	wm1 = "©P-Bot 2022" /*wm.split("/")[0]*/
	wm2 = pushname /*wm.split("/")[1]*/
if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: wm1 ? wm1: global.packname, author: wm2 ? wm2: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((m.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: wm1 ? wm1: global.packname, author: wm2 ? wm2: global.author })
await fs.unlinkSync(encmedia)
} else {
return m.reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
}
}
break
  
case 'emojimix': {
	m.reply('Sedang Proses ...');

	try {
	if (!text.includes("+")) return m.reply(`Contoh : ${prefix + command} 😅+🤔`)
		let [emoji1, emoji2] = text.split`+`
		let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		for (let res of anu.results) {
		let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
		await fs.unlinkSync(encmedia)
		}
		} catch(err) {
		m.reply("Masukkan emoji yang jelas!")
		}
	}
	break
	/*case 'semoji': {
		try {
	if(!text) return m.reply(`Masukkan emoji nya!\n*Contoh :* ${prefix+command} 😎`)
		let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(text)}`)
		for (let res of anu.results) {
		let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
		await fs.unlinkSync(encmedia)
		}
		} catch {
			m.reply("Masukkan emoji yang jelas!")
			}
	}
	break*/
case 'toimage': case 'toimg': {
if (!quoted) return m.reply('Reply Image')
if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)
let media = await conn.downloadAndSaveMediaMessage(quoted)

m.reply('Sedang Proses ...');


let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return m.reply(err)
let buffer = fs.readFileSync(ran)
conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})
}
break
case 'triggered':
case 'trigger':{
	if (!quoted) return m.reply('Reply Image')
    if (!/image/.test(mime)) return m.reply(`Balas gambar dengan caption *${prefix + command}*`)
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'trigger.jpg')
	yuricanvas = require("yuri-canvas");
    async function create() {
    let img = await yuricanvas.trigger('trigger.jpg');
    yuricanvas.write(img, "trigger.jpg");
    conn.sendImageAsSticker(m.chat, fs.readFileSync(`./trigger.jpg`), m, {packname: 'Sticker', author: '©Perwira Bot WhatsApp'})
}
create();
}
break
case 'template':{
	if(!text) return m.reply(`*Contoh :* ${prefix+command} gay(reply gambar)

*List Type Template*
gay
jail
wanted
wasted
trash
burn
scary`)
	if (!quoted) return m.reply('Reply Image')
    if (!/image/.test(mime)) return m.reply(`Balas gambar dengan caption *${prefix + command}*`)
    if(args[0] === 'burn') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'sponge.jpg')
var pathh = 'ouit.png'
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Burn()
    .setAvatar('sponge.jpg')
    .toAttachment();
    data = image.toBuffer();
    await fs.writeFileSync(pathh, data)
    conn.sendMessage(m.chat, {image: {url: pathh}, caption: 'Done'}, {quoted: m})
}
haha();
} else if(args[0] === 'gay') {
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'gay.jpg')
    	async function create() {
    	yuricanvas = require("yuri-canvas");
    let img = await yuricanvas.gay('gay.jpg');
    yuricanvas.write(img, "jadigay.jpg");
    conn.sendImage(m.chat, fs.readFileSync(`./jadigay.jpg`), 'Done', m)
    	}
    create();
} else if(args[0] === 'jail') {
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'jail.jpg')
    	async function create() {
    	yuricanvas = require("yuri-canvas");
    let img = await yuricanvas.jail('jail.jpg');
    yuricanvas.write(img, "jadijail.jpg");
    conn.sendImage(m.chat, fs.readFileSync(`./jadijail.jpg`), 'Done', m)
    	}
    create();
} else if(args[0] === 'wanted') {
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'wanted.jpg')
    	async function create() {
    	yuricanvas = require("yuri-canvas");
    let img = await yuricanvas.wanted('wanted.jpg');
    yuricanvas.write(img, "jadiwanted.jpg");
    conn.sendImage(m.chat, fs.readFileSync(`./jadiwanted.jpg`), 'Done', m)
    	}
    create();
} else if(args[0] === 'trash') {
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'trash.jpg')
    	async function create() {
    	yuricanvas = require("yuri-canvas");
    let img = await yuricanvas.trash('trash.jpg');
    yuricanvas.write(img, "jaditrash.jpg");
    conn.sendImage(m.chat, fs.readFileSync(`./jaditrash.jpg`), 'Done', m)
    	}
    create();
} else if(args[0] === 'scary') {
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'scae.jpg')
    	hacker = async () => {
var pathh = 'out.png'
var knights = require("./lib/knights-canvas")
var image = await new knights.Patrick()
    .setAvatar(media)
    .toAttachment();
  data = image.toBuffer();
  await fs.writeFileSync(pathh, data)
conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
}
hacker()
} else if(args[0] === 'wasted') {
	let media = await conn.downloadAndSaveMediaMessage2(quoted, 'wasted.jpg')
    	async function create() {
    	yuricanvas = require("yuri-canvas");
    let img = await yuricanvas.wasted('wasted.jpg');
    yuricanvas.write(img, "jadiwasted.jpg");
    conn.sendImage(m.chat, fs.readFileSync(`./jadiwasted.jpg`), 'Done', m)
    }
    create();
    	} else { m.reply(`Maaf ${args[0]} tidak ada di Type Template
*Contoh :* ${prefix+command} gay(reply gambar)

*List Type Template*
gay
jail
wanted
wasted
trash
burn
scary`) }
	}
	break


case 'convert': 
case 'to': {
	if(!text) return m.reply(`*Contoh:* ${prefix+command} mp3(sambil reply media)\n\n*List yang tersedia*\nmp3\nmp4\ngif\nimg`)
	if(text.includes("img", "gambar", "image")) {
		if (!quoted) return m.reply('Reply Image')
if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)
let media = await conn.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return m.reply(err)
let buffer = fs.readFileSync(ran)
conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})
		} else if(text.includes("mp3", "audio")) {
			if (/document/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
conn.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert tomp3.mp3`}, { quoted : m })
		} else if(text.includes("mp4", "video", "vidio")) {
			if (!quoted) return m.reply('Reply sticker animated')
if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)

		let { webp2mp4File } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
await fs.unlinkSync(media)
		} else if(text.includes("gif")) {
			if (!quoted) return m.reply('Reply Image')
if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)

		let { webp2mp4File } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)
		} else {
			m.reply(`*Contoh:* ${prefix+command} mp3(sambil reply media)\n\n*List yang tersedia*\nmp3\nmp4\ngif\nimg`)
			}
	}
	break

	case 'tomp4': case 'tovideo': {
if (!quoted) return m.reply('Reply sticker animated')
if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)

		let { webp2mp4File } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
await fs.unlinkSync(media)
}
break
case 'toaud': case 'toaudio': {
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
}
break
case 'tomp3': {
if (/document/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
conn.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert tomp3 ${new Date()}.mp3`}, { quoted : m })
}
break
case 'tovn': case 'toptt': {
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toPTT } = require('./lib/converter')
let audio = await toPTT(media, 'mp4')
conn.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
}
break
case 'togif': {
if (!quoted) return m.reply('Reply Image')
if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)

		let { webp2mp4File } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
m.reply("Tunggu Sebentar...")
let webpToMp4 = await webp2mp4File(media)
await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)
}
break
	case 'tourl': {
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
} else if (!/image/.test(mime)) {
let anu = await UploadFileUgu(media)
m.reply(util.format(anu))
}
await fs.unlinkSync(media)
}
break
case 'imagenobg': case 'removebg': case 'remove-bg': {
	if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	let remobg = require('remove.bg')
	let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU','S258diZhcuFJooAtHTaPEn4T','5LjfCVAp4vVNYiTjq9mXJWHF','aT7ibfUsGSwFyjaPZ9eoJc61','BY63t7Vx2tS68YZFY6AJ4HHF','5Gdq1sSWSeyZzPMHqz7ENfi8','86h6d6u4AXrst4BVMD9dzdGZ','xp8pSDavAgfE5XScqXo9UKHF','dWbCoCb3TacCP93imNEcPxcL']
	let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]
	hmm = await './src/remobg-'+getRandom('')
	localFile = await conn.downloadAndSaveMediaMessage(quoted, hmm)
	outputFile = await './src/hremo-'+getRandom('.png')
	
	remobg.removeBackgroundFromImageFile({
	  path: localFile,
	  apiKey: apinobg,
	  size: "regular",
	  type: "auto",
	  scale: "100%",
	  outputFile 
	}).then(async result => {
	conn.sendMessage(m.chat, {image: fs.readFileSync(outputFile), caption: mess.success}, { quoted : m })
	await fs.unlinkSync(localFile)
	await fs.unlinkSync(outputFile)
	})
	}
	break
	case 'yts': 
	case 'ytsearch': {
		try {
		let { yts } = require("./lib/yts")
		let _s = await yts(text)
		no_ = 1
		_no = 1
		is_ = []
		_is = []
		for (let isu of _s.video) {
is_.push({
"title": `${no_++}.${isu.title}`,
"description": `•Channel : ${isu.authorName}\n•Duration : ${isu.duration} •Upload : ${isu.publishedTime}`,
"rowId": `ytdl ${isu.url}`
})
}

let listMessage = {
text: 'Hasil penelusuran',
footer: `©Perwira Bot WhatsApp`,
title: `Yt-Search`,
buttonText: "Video yang ditemukan",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": is_}]
}

conn.sendMessage(m.chat, listMessage, {quoted: 
                               {
	    	      	         key: { fromMe: false, participant: `${quoted.sender}`},
                         	  message: {
                              "extendedTextMessage": {
                              "text": `*YouTube Search*`,
                              "title": ``,
                              'jpegThumbnail': fs.readFileSync('./image/yt.png')
                               }} 
                               }, contextInfo: {mentionedJid: [quoted.sender]}})
		
		} catch(err) {
			m.reply(String(err))
			}
		
		}
		break
		
	case 'ytss': case 'ytsearchh': {
if (!text) return m.reply(`Contoh : ${prefix + command} story wa anime`)
let yts = require("yt-search")
let search = await yts(text)
let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
let no = 1
let po = 1
let kunn = []
let kunni = []
for (let i of search.all) {
kunn.push({
"title": `${no++}.${i.title}`,
"description": `•Upload : ${i.ago}\n•Duration : ${i.timestamp}`,
"rowId": `ytdl ${i.url}`
})
/*kunni.push({
"title": `${po++}.${i.title}`,
"description": `•Upload : ${i.ago}\n•Duration : ${i.timestamp}`,
"rowId": `ytmp4 ${i.url}`
})*/
}
let listMessage = {
text: 'Hasil penelusuran',
footer: `©Perwira Bot WhatsApp`,
title: `Yt-Search`,
buttonText: "Video yang ditemukan",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": kunn}]
}
conn.sendMessage(m.chat, listMessage, {quoted: 
                               {
	    	      	         key: { fromMe: false, participant: `${quoted.sender}`},
                         	  message: {
                              "extendedTextMessage": {
                              "text": `*YouTube Search*`,
                              "title": ``,
                              'jpegThumbnail': fs.readFileSync('./image/yt.png')
                               }} 
                               }, contextInfo: {mentionedJid: [quoted.sender]}})
  /*teks += `No : ${no++}\nType : ${i.type}\nVideo ID : ${i.videoId}\nTitle : ${i.title}\nViews : ${i.views}\nDuration : ${i.timestamp}\nUpload At : ${i.ago}\nAuthor : ${i.author.name}\nUrl : ${i.url}\n\n─────────────────\n\n`*/

/* conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })*/
}
break

case 'download':
case 'dl': {
	if(!text) return m.reply(`Masukkan linknya\n*Contoh:* ${prefix+command} https://www.instagram.com/p/CcejPskP8Ia/?igshid=YmMyMTA2M2Y=`)
	if(text.includes("youtu")) {
		pesan = `Silahkan pilih type media`
		let btnz = [{buttonId: `ytmp3 ${text}`, buttonText: {displayText: 'Audio'}, type:1},{buttonId: `ytmp4 ${text}`, buttonText: {displayText: 'Video'}, type:1}]
	    conn.sendButtonText(m.chat, btnz, pesan, `©Perwira Bot WhatsApp`, m)
		} else if(text.includes("instagram.com")) {
			if(text.includes("/stories/")) return m.reply(`_Gunakan perintah ${prefix}igstory_`)
mimeaxig= ''
{
	try {
	if(text.includes("instagram.com")) {
let {instagram} = require('mumaker')
helo = await instagram(text)
let res = await axios.head(helo[0].url)
mimeaxig= res.headers['content-type']
if(mimeaxig.split("/")[0] === "image"){
return conn.sendMessage(m.chat, { document: {url: helo[0].url}, mimetype: 'image/jpeg', fileName: `${text}.jpg`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `Instagram Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/ig.jpeg')}}}) /*conn.sendButDoc2(m.chat, "©Perwira Bot WhatsApp", '*Click Document untuk download*\n\n*Lokasi file*\nAndroid/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', `Instagram Download`, "©Perwira Bot WhatsApp", fs.readFileSync('./image/ig.jpeg'), text, 1, `${text}.jpg` , helo[0].url, 'image/jpeg', [{ buttonId: 'ok', buttonText: { displayText: 'Thanks' }, type: 1 }], m, true) */
} else if(mimeaxig.split("/")[0] === "video"){
return conn.sendMessage(m.chat, { document: {url: helo[0].url}, mimetype: 'video/mp4', fileName: `${text}.mp4`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `Instagram Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/ig.jpeg')}}})
}
		} else {
			m.reply(`Masukkan link!\n*Contoh :* ${prefix+command} https://www.instagram.com/p/CcejPskP8Ia/?igshid=YmMyMTA2M2Y=`)
			}
			} catch(e) {
				conn.sendButtonText(m.chat, [{buttonId: `igdl2 ${text}`, buttonText: {displayText: 'Versi lain'}, type: 1}, {buttonId: `igdl ${text}`, buttonText: {displayText: 'Coba lagi'}, type: 1}], `Ulangi kembali, jika tetap error lapor Owner\n\n*Rincian kesalahan :*\n${String(e)}`, '©Perwira Bot WhatsApp')
				}
	}
		} else if(text.includes("tiktok.com")) {
			try {
tiktok = require('./lib/tiktok')
resion = await tiktok(text)
/*got_vid = await getBuffer(resion.medias.nowm.url).catch(e => m.reply("Error"))*/
conn.sendMessage(m.chat, {video: {url: `${resion.medias.nowm.url}` }, mimetype: 'video/mp4', caption: "*Tiktok Downloader*"}, {quoted: m})
/*sendButVid(m.chat, '*TikTok Downloader*', '©Perwira Bot WhatsApp', `${resion.medias.nowm.url}`, [{quickReplyButton: {displayText: 'Audio', id: `ttmp3 ${text}`}}])*/
} catch(e) {
	conn.sendButtonText(m.chat, [{buttonId: `tiktok2 ${text}`, buttonText: {displayText: 'Server lain'}, type: 1}], `Ulangi kembali, jika tetap error lapor Owner\n\n*Rincian kesalahan :*\n${String(e)}`, '©Perwira Bot WhatsApp')
	}
		} else if(text.includes("mediafire.com")) {
			try {
	if(text.includes('mediafire.com')) {
		let {mediafire} = require('mumaker')
		await mediafire(text).then(async datan => {
			if(datan[0].mime === 'zip') {
			conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/zip', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
			} else if(datan[0].mime === '9') {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/vnd.android.package-archive', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
					} else if(datan[0].mime === '7z') {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/7z', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
					} else if(datan[0].nama.endsWith('.mp4')) {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'video/mp4', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}})
					} else if(datan[0].nama.endsWith('.pdf')) {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/pdf', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}})
					} else {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/octet-stream', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}})
					m.reply('Buka document melalui apk File manager anda')
					}
})
		} else {
			m.reply(`*Cara Penggunaan*\n\n*Contoh :* ${prefix+command} https://www.mediafire.com/file/jqxsuqn83s0f2wp/PIXELLAB+DARK+BLUE+1.9.9.apk/file`)
			}
		} catch (e) {
			m.reply("Error")
			}
		} else if(text.includes("t.me")) {
			try {
			if (m.isGroup) return m.reply("Tidak bisa digunakan di group")
			if (!text) return m.reply(`Contoh: ${prefix+command} https://t.me/addstickers/geestickerpack`)
			if (!text.includes('t.me/addstickers')) return m.reply('Bukan link telegram stiker')
			let { Tstick } = require('./lib/scraper')
var telestc = await Tstick(`${q}`).catch(err => m.reply(`*Error*\n${util.format(err)}`))
			for (let unduh of telestc) {
			conn.sendMessage(m.chat, {sticker: await getBuffer(unduh.url), mimetype:'image/webp'},{quoted: m}).catch(err => m.reply(`*Error*\n${util.format(err)}`))
			}
			} catch(e) {
	m.reply(String(e))
	}
			} else {
				m.reply(`Belum tersedia untuk download link ${text}`)
				}
	}
	break
case 'ytdl':{
	pesan = `Silahkan pilih type media`
	let btnz = [{buttonId: `ytmp3 ${text}`, buttonText: {displayText: 'Audio'}, type:1},{buttonId: `ytmp4 ${text}`, buttonText: {displayText: 'Video'}, type:1}]
	conn.sendButtonText(m.chat, btnz, pesan, `©Perwira Bot WhatsApp`, m)
	}break
case 'google': {
if (!text) return m.reply(`Contoh : ${prefix + command} fatih arridho`)
let google = require('google-it')
google({'query': text}).then(res => {
let teks = `Google Search From : ${text}\n\n`
for (let g of res) {
teks += `*Title* : ${g.title}\n`
teks += `*Description* : ${g.snippet}\n`
teks += `*Link* : ${g.link}\n\n────────────────────────\n\n`
} 
m.reply(teks)
})
}
break
case 'tesbut':{
conn.sendMessage(m.chat, 
{document: fs.readFileSync('./image/pem.jpg'), mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
fileName: '𝗟𝗶𝘀𝘁 𝗠𝗲𝗻𝘂', contextInfo: {
externalAdReply: {
sourceUrl: `https://©Perwira Bot WhatsApp`, 
mediaUrl: `https://Perwira Not WhatsApp`, 
mediaType: 1, renderLargerThumbnail: true,
thumbnail: fs.readFileSync(`./image/ig.jpeg`)}},
                    caption: 'Hello World',
                    footer: 'CAF BOTz - Bot MD',
                    buttons: buttonLoc,
                    headerType:4})
}break
  case 'gimage': {
if (!text) return m.reply(`Contoh : ${prefix + command} kaori cicak`)
let gis = require('g-i-s')
gis(text, async (error, result) => {
n = result
images = n[Math.floor(Math.random() * n.length)].url
let buttons = [
{buttonId: `gimage ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
]
let buttonMessage = {
image: { url: images },
caption: `*Google Image*`,
footer: conn.user.name,
buttons: buttons,
headerType: 4
}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
})
}
break

case 'tsticker':
case 'telesticker': 
case 'tstiker': {
	try {
			if (m.isGroup) return m.reply("Tidak bisa digunakan di group")
			if (!text) return m.reply(`Contoh: ${prefix+command} https://t.me/addstickers/geestickerpack`)
			if (!text.includes('t.me')) return m.reply('Bukan link telegram stiker')
			let { Tstick } = require('./lib/scraper')
var telestc = await Tstick(`${q}`).catch(err => m.reply(`*Error*\n${util.format(err)}`))
			for (let unduh of telestc) {
			conn.sendMessage(m.chat, {sticker: await getBuffer(unduh.url), mimetype:'image/webp'},{quoted: m}).catch(err => m.reply(`*Error*\n${util.format(err)}`))
			}
			} catch(e) {
	m.reply(String(e))
	}
		}
		break
case 'tes':
let sections = [
{
title: "Section 1",
rows: [
{title: "Option 1", rowId: "option1"},
{title: "Option 2", rowId: "option2", description: "This is a description"}
]
},
{
title: "Section 2",
rows: [
{title: "Option 3", rowId: "option3"},
{title: "Option 4", rowId: "option4", 
description: "This is a description V2"}
]
},
]

let listMessage = {
  text: "This is a list",
  footer: "nice footer, link: https://google.com",
  title: "Amazing boldfaced list title",
  buttonText: "Required, text on the button to view the list",
  sections
}

await conn.sendMessage(m.chat, listMessage)
break
	case 'play': case 'ytplay': {
if (!text) return m.reply(`Contoh : ${prefix + command} perfect ed-sheeran`)
try {
let yts = require("yt-search")
let { yta } = require('./lib/y2mate')
let search = await yts(text)
let aramat = search.all
/*search.videos[Math.floor(Math.random() * search.videos.length)]*/
let res = await yta(`${search.videos[0].url}`)
let get_img = await getBuffer(res.thumb)
if (res.filesize >= 10000) return m.reply('File Melebihi Batas, maximal 10m')
conn.sendMessage(m.chat, { document: { url: res.dl_link }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Perwira Bot WhatsApp", mediaUrl: `${search.videos[0].url}`, sourceUrl: `${search.videos[0].url}`, mediaType: 2, showAdAttribution: true, thumbnail: get_img}}}, {}).catch((e) => m.reply(String(e))).then(() => {

let kunnu = []
let no = 1

for(let i of aramat) {
kunnu.push({
  "title": `${no++}. ${i.title}`,
  "description": `• Upload: ${i.ago}\n• Duration: ${i.timestamp}`,
  "rowId": `ytmp3 ${i.url}` 
 })

}

let listMessage = {
text: 'Hasil penelusuran lain',
footer: `©Perwira Bot WhatsApp`,
title: `Jika hasil salah klik disini`,
buttonText: "Hasil lainya",
sections: [{
"title": `Hasil penelusuran`,
"rows": kunnu
}],
}
conn.sendMessage(m.chat, listMessage, {quoted: m})

	})
} catch(e) {
	m.reply(String(e))
	}
}break

case 'end': {
if(!isCreator) return m.reply("Khusus Owner")
try {
if(text.endsWith("@g.us")) {
	a = await conn.sendMessage(m.chat, {text: "Succes"})
    b = await conn.sendMessage(m.chat, {react: {text: "🗿", key: { remoteJid: m.chat, fromMe: true, id: a.key.id }}})
	conn.sendMessage(text, {text: "."}, {quoted: b})
} else if(text.startsWith("@")) {
	a = await conn.sendMessage(m.chat, {text: "Succes"})
    b = await conn.sendMessage(m.chat, {react: {text: "🗿", key: { remoteJid: m.chat, fromMe: true, id: a.key.id }}})
    conn.sendMessage(`${text.split("@")[1]}@s.whatsapp.net`, {text: "."}, {quoted: b})
} else if(text.includes("+")) {
    a = await conn.sendMessage(m.chat, {text: "Succes"})
    b = await conn.sendMessage(m.chat, {react: {text: "🗿", key: { remoteJid: m.chat, fromMe: true, id: a.key.id }}})
    conn.sendMessage(`${text.split("+")[1]}@s.whatsapp.net`, {text: "."}, {quoted: b})
} else if(m.quoted) {
    a = await conn.sendMessage(m.chat, {text: "Succes"})
    b = await conn.sendMessage(m.chat, {react: {text: "🗿", key: { remoteJid: m.chat, fromMe: true, id: a.key.id }}})
    conn.sendMessage(quoted.sender, {text: "."}, {quoted: b})
} else {
		m.reply("Dibutuhkan id Room")
		}
} catch (e) {
		m.reply("error")
		}
}
break

case 'ytmp3': 
case 'ytaudio': {
try {
if(text.includes("youtu")) {
let { yta } = require('./lib/y2mate')
if (!text) return m.reply(`Contoh : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`)
/*let quality = args[1] ? args[1] : '360p'*/
let res = await yta(text)
  let ythumb = await getBuffer(res.thumb)
if (res.filesize >= 10000) return m.reply('File Melebihi Batas, maximal 10mb')
conn.sendMessage(m.chat, { document: { url: res.dl_link }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Perwira Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: ythumb}}}, {}).catch((e) => m.reply(String(e)))
/*conn.sendButDoc2(m.chat, "©Perwira Bot WhatsApp", '*Click Document untuk download*\n\n*Lokasi file*\nAndroid/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', `${res.title}`, "©Perwira Bot WhatsApp", ythumb, text, 2, `${res.title}.mp3` , res.dl_link, "audio/mpeg", [{ buttonId: 'ok', buttonText: { displayText: 'Thanks' }, type: 1 }], m)*/
} else {
	m.reply(`Masukkan link YouTube.\n*Contoh :* ${prefix+command} https://youtu.be/FIeUzNdApMA`)
}
} catch(e) {
	m.reply(String(e))
	}

}break

case 'ytmp4': 
case 'ytvideo': {
try {
if(text.includes("youtu")) {
let { ytv } = require('./lib/y2mate')
if (!text) return m.reply(`Contoh : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`)
/*let quality = args[1] ? args[1] : '360p'*/

let res = await ytv(text)
let ythum = await getBuffer(res.thumb)
if (res.filesize >= 20000) return m.reply('File Melebihi Batas, maximal 20mb')
conn.sendMessage(m.chat, { document: { url: res.dl_link }, mimetype: 'video/mp4', fileName: `${res.title}.mp4`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Perwira Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: ythum}}},{})
/*conn.sendButDoc2(m.chat, "©Perwira Bot WhatsApp", '*Click Document untuk download*\n\n*Lokasi file*\nAndroid/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', `${res.title}`, "©Perwira Bot WhatsApp", ythum, text, 2, `${res.title}.mp4` , res.dl_link, "video/mp4", [{ buttonId: 'ok', buttonText: { displayText: 'Thanks' }, type: 1 }], m)*/
} else {
	m.reply(`Masukkan link YouTube.\n*Contoh :* ${prefix+command} https://youtu.be/FIeUzNdApMA`)
}
} catch(e) {
	m.reply(String(e))
	}
}break
case 'call':{
	if(!isCreator) return m.reply("Khusus Owner")
	if(text.includes("@")) {
                    exec("python call.py "+text.split("@62")[1], (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                    } else if(text.startsWith("8")) {
                    	exec("python call.py "+text, (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                    	} else {
                    	m.reply(`Masukkan nomor contoh\n${prefix+command} 852+++++++++\natau\nTag nomor demgan cara\n${prefix+command} tag nomor`)
                    	}
                }
	break
	

case 'wikihow': {
	if(!text) return m.reply("*Contoh:* /wikihow cara tidur")
	try {
	let { wihow } = require("./lib/wikihow")
	let { wikihow } = require("./lib/wikihow")
	
	if(text.includes("https://id.wikihow.com")) {
		hw = ``
		wikuh = await wikihow(text)
		for(let wio of wikuh) {
			hw += `*${wio.title}*
			${wio.data}\n\n`
			}
			conn.sendMessage(m.chat, {text: hw, contextInfo: {externalAdReply: {title: "Wikihow", body: "©Perwira Bot WhatsApp", sourceUrl: text, mediaUrl: text, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./image/howiki.png`)}}})
		} else {
	
		dwt = await wihow(text)
		wikh = await wikihow(dwt[0].link)
		
		
		dat = ``
		
		for(let wi of wikh) {
			dat += `*${wi.title}*
			${wi.data}\n\n`
			}
			
			mehow = []
			nii = 1
			for(let l of dwt) {
				mehow.push({
	            "title": `${nii++}.${l.title}`,
	             "description": `• update: ${l.date}\n• view: ${l.view}`,
	             "rowId": `wikihow ${l.link}`
                })
				}
				
				let listhow = {
text: 'Hasil penelusuran',
footer: `©Perwira Bot WhatsApp`,
title: `Wikihow`,
buttonText: "Catatan yang ditemukan",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": mehow}]
}
			
			conn.sendMessage(m.chat, {text: dat, contextInfo: {externalAdReply: {title: "Wikihow", body: "©Perwira Bot WhatsApp", sourceUrl: `${dwt[0].link}`, mediaUrl: `${dwt[0].link}`, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./image/howiki.png`)}}}).then(() => {conn.sendMessage(m.chat, listhow, {quoted: 
                               {
	    	      	         key: { fromMe: false, participant: `${quoted.sender}`},
                         	  message: {
                              "extendedTextMessage": {
                              "text": `*Wikihow*`,
                              "title": ``,
                              'jpegThumbnail': fs.readFileSync('./image/how2.png')
                               }} 
                               }, contextInfo: {mentionedJid: [quoted.sender]}})
                               })
                               }
		} catch(e) {
			m.reply(String(e))
			}
	}
	break

case 'wikipedia': {
	if(!text) return m.reply("*Contoh:* /wikipedia apa itu globalisasi")
	try {
		
	let { wikipedia } = require('./lib/wikipedia')
	let { swiki } = require('./lib/wikipedia')
	
	if(text.includes("https://id.m.wikipedia.org")) {
		lw = await wikipedia(text)
		dwk = `*${lw.title[0]}*
    
    ${lw.result[0].data}`
	conn.sendMessage(m.chat, {image: {url: lw.img[0] || "https://github.com/PerwiraKusuma111/PerwiraKusuma111/raw/main/images%20(2)-picsay.png"}, caption: dwk }, {quoted: m})
		} else {
	
	swi = await swiki(encodeURI(text))
	wikped = await wikipedia(swi[0].data ? swi[0].data: `https://id.m.wikipedia.org/wiki/${text}`)
	listmes = []
	noi = 1
	
	for(let w of swi) {
	listmes.push({
	"title": `${noi++}.${w.data.split("/")[4].replace(/_/g, " ")}`,
	"description": `Wikiedia result ${w.data.split("/")[4].replace(/_/g, " ")}`,
	"rowId": `wikipedia ${w.data}`
    })
    }
    
    dw = `*${wikped.title[0]}*
    
    ${wikped.result[0].data}`
    
let listMessagew = {
text: 'Hasil penelusuran',
footer: `©Perwira Bot WhatsApp`,
title: `Wikipedia`,
buttonText: "Catatan yang ditemukan",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": listmes}]
}
conn.sendMessage(m.chat, {image: {url: wikped.img[0] || "https://github.com/PerwiraKusuma111/PerwiraKusuma111/raw/main/images%20(2)-picsay.png"}, caption: dw }, {quoted: m}).then(() => {conn.sendMessage(m.chat, listMessagew, {quoted: 
                               {
	    	      	         key: { fromMe: false, participant: `${quoted.sender}`},
                         	  message: {
                              "extendedTextMessage": {
                              "text": `*Wikipedia*`,
                              "title": ``,
                              'jpegThumbnail': fs.readFileSync('./image/wiki.png')
                               }} 
                               }, contextInfo: {mentionedJid: [quoted.sender]}})
                               })
                               
                               }
                               
                             } catch(err) {
                             	try {
        let { wikipedia } = require('./lib/wikipedia')
        lw = await wikipedia("https://id.m.wikipedia.org/wiki/" + text)
		dwk = `*${lw.title[0]}*
    
    ${lw.result[0].data}`
	conn.sendMessage(m.chat, {image: {url: lw.img[0] || "https://github.com/PerwiraKusuma111/PerwiraKusuma111/raw/main/images%20(2)-picsay.png"}, caption: dwk }, {quoted: m})
                             	} catch(err) {
                             	m.reply(String(err))
                             	}
                             	}
	}
	break



case 'pinterest': {
			if(!q) return m.reply(`Masukkan query\n*Contoh :* ${prefix+command} Naruto`)
async function pinterestSearch(query) {
return new Promise((resolve, reject) => {
fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`, {
"headers": {
"accept": "application/json, text/javascript, */*, q=0.01",
"accept-language": "en-US,en;q=0.9",
"cache-control": "no-cache",
"pragma": "no-cache",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "same-origin",
"sec-gpc": "1",
"x-app-version": "9a236a4",
"x-pinterest-appstate": "active",
"x-requested-with": "XMLHttpRequest"
},
"referrer": "https://www.pinterest.com/",
"referrerPolicy": "origin",
"body": null,
"method": "GET",
"mode": "cors"
}).then((res) => res.json())
.then((json) => {
const generatepin = json.resource_response.data.results[Math.floor(Math.random() * (json.resource_response.data.results.length))]
var result = [];
result.push({
link: generatepin.images.orig.url
})
resolve(result)
}).catch(reject)
})
}

const pinterest = (query) => new Promise((resolve, reject) => {
pinterestSearch(query).then((data) => {
resolve({
status: 200,
image: data[0].link
})
}).catch(reject)
})

pinterest(q).then(async res => {
 /*  	let we = await getBuffer(res.image).catch(err => reply(`*Error*
${util.format(err)}`))*/
  	  conn.sendMessage(m.chat, {image: {url : res.image}, caption: `Random search image from Pinterest`}, {quoted: m}).catch(e => m.reply(`*Error* ${String(e)}`))
  }).catch(e => m.reply(`*Error* ${String(e)}`))
} break

/*case 'wallpaper':{
	if(!text) return m.reply(`Masukkan wallpaper yang ingin dicari\n*Contoh :* ${prefix+command} Naruto`)
	try {
	let { wallpaper1 } = require('./lib/wallpaper')
    let res = await wallpaper1(text)
	conn.sendMessage(m.chat, {image: {url: res.result.link}, caption: `*${res.result.title}*`}, {quoted: m})
	} catch(e) {
		m.reply(e)
		}
	}break*/

case 'ghdl': 
case 'github': {
	if(!text.includes("https://github.com")) return m.reply("Masukkan link dengan benar!\n*Contoh:* /github https://github.com/DARK-02/DarkBotMD")
	if(!text.split("/")[4]) return
	try {
	conn.sendMessage(m.chat, {document: {url: text + "/archive/refs/heads/main.zip"}, mimetype: 'application/zip', fileName: `${text}.zip`, contextInfo: {externalAdReply: {title: "Github Download", body: "©Perwira Bot WhatsApp", sourceUrl: text, mediaUrl: text, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./image/gh.png`)}}}, {quoted: m})
	} catch(e) {
		m.reply(String(e))
		}
	}
	break

case 'tiktokaudio':
case 'ttmp3':
case 'tiktokmp3': {
	m.reply(`Tunggu Sebentar...`)
	/*kuyi = {
	    	      	       	  key: { 
       	      	   	      	  fromMe: false,
	      	      	          participant: `${quoted.sender}`
                           },
                         	  message: { 
		                      "extendedTextMessage": {
                              "text": `*TikTok Downloader*`,
                              "title": ``,
                              'jpegThumbnail': fs.readFileSync('./image/tiktok.png')
                           }
	                            } 
                                     }*/
if (text.includes("tiktok.com")) {
	try {
tiktok = require('./lib/tiktok')
resioni = await tiktok(text)
conn.sendMessage(m.chat, {document: {url: `${resioni.medias.audio.url}`}, ptt: false, mimetype: 'audio/mpeg', fileName: `${resioni.medias.audio.sound}.mp3`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `Tiktok Downloader`, body: "©Perwira Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 1, renderLargerThumbnail: true, showAdAttribution: true, thumbnail: fs.readFileSync('./image/tiktok.jpeg')}}}) /*conn.sendButDoc2(m.chat, "©Perwira Bot WhatsApp", '*Click Document untuk download*\n\n*Lokasi file*\nAndroid/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', `TikTok Download`, "©Perwira Bot WhatsApp", fs.readFileSync('./image/tiktok.jpeg'), text, 1, `${resioni.medias.audio.sound}.mp3`, `${resioni.medias.audio.url}`, 'audio/mpeg', [{ buttonId: 'ok', buttonText: { displayText: 'Thanks' }, type: 1 }], m, true) */
} catch(e) {
	conn.sendButtonText(m.chat, [{buttonId: `ttmp32 ${text}`, buttonText: {displayText: 'Server lain'}, type: 1}], `Ulangi kembali, jika tetap error lapor Owner\n\n*Rincian kesalahan :*\n${String(e)}`, '©Perwira Bot WhatsApp')
	}
} else {
	m.reply(`Linknya?\n*Contoh :* ${prefix+command} https://vt.tiktok.com/ZSextfjoX/`)
}
}
break
case 'ttmp4':
case 'tiktok':
case 'ttdl':
case 'tiktokdl':
case 'tiktoknowm':{
if (text.includes("tiktok.com")) {

	m.reply(`Tunggu Sebentar...`)


	try {
tiktok = require('./lib/tiktok')
resion = await tiktok(text)
/*got_vid = await getBuffer(resion.medias.nowm.url).catch(e => m.reply("Error"))*/
conn.sendMessage(m.chat, {video: {url: `${resion.medias.nowm.url}` }, mimetype: 'video/mp4', caption: "*Tiktok Downloader*"}, {quoted: m})
/*conn.sendButVid(m.chat, '*TikTok Downloader*', '©Perwira Bot WhatsApp', `${resion.medias.nowm.url}`, [{quickReplyButton: {displayText: 'Audio', id: `ttmp3 ${text}`}}])*/
} catch(e) {
	conn.sendButtonText(m.chat, [{buttonId: `tiktok2 ${text}`, buttonText: {displayText: 'Server lain'}, type: 1}], `Ulangi kembali, jika tetap error lapor Owner\n\n*Rincian kesalahan :*\n${String(e)}`, '©Perwira Bot WhatsApp')
	}
} else {m.reply(`Linknya?\n*Contoh :* ${prefix+command} https://vt.tiktok.com/ZSextfjoX/`)}
}
break

	


case 'mediafire': {
	try {
	if(text.includes('mediafire.com')) {
		let {mediafire} = require('mumaker')
		await mediafire(text).then(async datan => {
			if(datan[0].mime === 'zip') {
			conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/zip', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
			} else if(datan[0].mime === '9') {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/vnd.android.package-archive', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
					} else if(datan[0].mime === '7z') {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/7z', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
					} else if(datan[0].nama.endsWith('.mp4')) {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'video/mp4', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}})
					} else if(datan[0].nama.endsWith('.pdf')) {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/pdf', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}})
					} else {
					conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: datan[0].nama, mimetype: 'application/octet-stream', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}})
					m.reply('Buka document melalui apk File manager anda')
					}
})
		} else {
			m.reply(`*Cara Penggunaan*\n\n*Contoh :* ${prefix+command} https://www.mediafire.com/file/jqxsuqn83s0f2wp/PIXELLAB+DARK+BLUE+1.9.9.apk/file`)
			}
		} catch (e) {
			m.reply("Error")
			}
	}
break

case 'igstory':
case 'igs':{
	if(!text) return m.reply(`Cara penggunaan\n*Contoh :* ${prefix+command} natashawilona12`)
	if(text.includes(`https://`)) return m.reply(`Cara penggunaan\n*Contoh :* ${prefix+command} natashawilona12`)
	try {
	let { igstory } = require ('mumaker')
	data = []
	thennn = 0
	thenn = 1
	tres = await igstory(text).then(() => {
		for(let newd of tres) {
			data.push({
				"title": `${thenn++}. Story Instagram`,
				"description": `Jenis ${newd.type}`,
				"rowId": `igos ${newd.url}`
				              })
			                               }
			})
			                                           
let listMess = {
text: 'Hasil penelusuran',
footer: `©Perwira Bot WhatsApp`,
title: `Instagram Story`,
buttonText: "Story yang ditemukan",
sections: [{
"title": `Story instagram yang ditemukan`,
"rows": data}]
}

conn.sendMessage(m.chat, listMess, {quoted: 
                               {
	    	      	         key: { fromMe: false, participant: `${quoted.sender}`},
                         	  message: {
                              "extendedTextMessage": {
                              "text": `*Instagram Story*`,
                              "title": ``,
                              'jpegThumbnail': fs.readFileSync('./image/ig.png')
                               }} 
                               }, contextInfo: {mentionedJid: [quoted.sender]}})
	} catch(err) {
		m.reply("Pastikan nickname Instagram memiliki story yang tidak di privat")
		}
	}
	break

case 'igos': {
	
	mimeaxigs= ""
	try {
	let contentigos = await axios.head(text)
    mimeaxigs= contentigos.headers['content-type']
    if(mimeaxigs.split("/")[0] === "image"){
return conn.sendMessage(m.chat, { image: {url: text}}, {quoted: m})
} else if(mimeaxigs.split("/")[0] === "video"){
return conn.sendMessage(m.chat, { video: {url: text}}, {quoted: m})
} else {
	m.reply("Media tidak didukung")
	}
	} catch(err) {
		m.reply("Error")
		}
	}
	break

case 'igdl':
case 'instagram':
case 'ig':


if(text.includes("/stories/")) return m.reply(`_Gunakan perintah ${prefix}igstory_`)
mimeaxig= ''
{
	try {

	if(text.includes("instagram.com")) {
let {insta_post} = require("@phaticusthiccy/open-apis")
helo = await insta_post(text)
let res = await axios.head(helo.post1.url)
mimeaxig= res.headers['content-type']
if(mimeaxig.split("/")[0] === "image"){
return conn.sendMessage(m.chat, { document: {url: helo.post1.url}, mimetype: 'image/jpeg', fileName: `${text}.jpg`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `Instagram Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/ig.jpeg')}}}) /*conn.sendButDoc2(m.chat, "©Perwira Bot WhatsApp", '*Click Document untuk download*\n\n*Lokasi file*\nAndroid/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', `Instagram Download`, "©Perwira Bot WhatsApp", fs.readFileSync('./image/ig.jpeg'), text, 1, `${text}.jpg` , helo[0].url, 'image/jpeg', [{ buttonId: 'ok', buttonText: { displayText: 'Thanks' }, type: 1 }], m, true) */
} else if(mimeaxig.split("/")[0] === "video"){
return conn.sendMessage(m.chat, { document: {url: helo.post1.url}, mimetype: 'video/mp4', fileName: `${text}.mp4`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `Instagram Download`, body: "©Perwira Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/ig.jpeg')}}})
}
		} else {
			m.reply(`Masukkan link!\n*Contoh :* ${prefix+command} https://www.instagram.com/p/CcejPskP8Ia/?igshid=YmMyMTA2M2Y=`)
			}
			} catch(e) {
				conn.sendButtonText(m.chat, [{buttonId: `igdl2 ${text}`, buttonText: {displayText: 'Versi lain'}, type: 1}, {buttonId: `igdl ${text}`, buttonText: {displayText: 'Coba lagi'}, type: 1}], `Ulangi kembali, jika tetap error lapor Owner\n\n*Rincian kesalahan :*\n${String(e)}`, '©Perwira Bot WhatsApp')
				}
	}
	break

case 'ttp': {
	if(!text) return m.reply(`Cara menggunakan\n*Contoh :* ${prefix+command} BotVirtual`)
conn.sendImageAsSticker(m.chat, `https://api.akuari.my.id/other/ttp?file&text=${encodeURI(text)}`, m, {packname: 'Sticker', author: 'Perwira Bot WhatsApp'})
}
break
case 'attp':
{
try {
  if (args.length == 0) return m.reply(`Contoh: ${prefix+command} Halo`)
  stik = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
  conn.sendMessage(m.chat, {sticker: stik, mimetype: 'image/webp'}, {quoted: m})
  } catch(e) {
	m.reply(util.format(e))
	}
  }
  break


case 'nulis':{
	try {
if (!text) return m.reply(`Masukkan teksnya\nContoh: ${prefix}${command} Perwira`)
nulli = await getBuffer(`https://hadi-api.herokuapp.com/api/canvas/nulis?text=${encodeURI(q)}`)
await conn.sendMessage(m.chat, {image: nulli, mimetype: 'image/jpeg', caption: 'Done'}, {quoted: m}).catch((e) => m.reply(String(e)))
} catch(e) {
	m.reply(`${String(e)}`)
}
}break

case 'owner': case 'creator': {
	tio = `Berikut adalah tag owner dari bot ini
@6289501427163 (Owner Utama)`
conn.sendMessage(m.chat, {text: tio, mentions: ['6289501427163@s.whatsapp.net']},{quoted: m})
}
break
case 'info': {
	butp = `*Informasi Bot*
_Ini adalah simpel bot di WhatsApp yang dapat mempermudah untuk mendownload, membuat sticker ataupun convert beberapa pesan._


*Note!*
Dilarang menelpon (blokir otomatis)
Dilarang spam command`
m.reply(butp)
	} break
/*case 'info':{
	let btn = [{
callButton: {
displayText: 'Phone',
phoneNumber: '+62 8123-3264-6925'
}
}, {
urlButton: {
displayText: 'Owner',
url: 'https://wa.me/6281232646925'
}
}, {
quickReplyButton: {
displayText: 'Sewa',
id: 'sewa'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}  
},
{
quickReplyButton: {
displayText: 'Spesifikasi',
id: 'ping'
}  
}]

info = `*Simple Bot WhatsApp*

*Thanks to*
*DikaArdnt* (Base bot)
*CAF ID* (Contributor)
*Mr_Dark* (Python script)
*Perwira* (Recode and fix bug)

*Base Bot:*
https://github.com/DikaArdnt/Hisoka-Morou

*Sewa Bot*
Sewa bot join grup selamanya bot aktif
Cuman 5k pembayaran via Pulsa/Dana
Chat owner untuk melanjutkan


*Rules Bot*

#Dilarang spam
#Dilarang menelfon

Fitur error? chat owner!
Melanggar? block
`
  
await conn.sendButGif(m.chat, info, `©Perwira Bot WhatsApp`, fs.readFileSync('./image/gify.mp4'), btn)
	}break*/

case 'igstalk':
case 'stalkig': {
	if(!text) return m.reply(`Masukkan username instagram yang tepat\n*Contoh :* ${prefix+command} perwira_kusuma1`)
	if(text.includes(`https://`)) return m.reply(`Masukkan username instagram yang tepat\n*Contoh :* ${prefix+command} perwira_kusuma1`)
	try {
	let { igstalk } = require("./lib/stalk.js")
	prof = ''
	prif = ''
	preif = ''
	datast = await igstalk(text)
	datastalke = `  *Profile user*
━━━━━━━━━━
*${datast.full_name}*
${datast.username}
${datast.edge_followed_by.count} Followers
${datast.edge_follow.count} Following
${datast.edge_owner_to_timeline_media.count} Post

*Description*
${datast.biography}

*Url Link*
${datast.external_url}

  *Account info*
━━━━━━━━━━
Professional: ${datast.is_professional_account}
Business: ${datast.is_business_account}
Private: ${datast.is_private}
Verivied: ${datast.is_verified}

*Profile picture*
_${datast.profile_pic_url_hd}_
`
imgsr = await getBuffer(datast.profile_pic_url_hd)
conn.sendMessage(m.chat, {text: datastalke}, {quoted: m})
	} catch(err) {
		m.reply(String(err))
		}
	}
	break

case 'menu': 
case 'list': 
case 'help': {
	
	let buttonis = [
{ buttonId: 'owner', buttonText: { displayText: 'Owner' }, type: 1 },
{ buttonId: 'info', buttonText: { displayText: 'Info' }, type: 1 },
{ buttonId: 'sewa', buttonText: { displayText: 'Sewa Bot' }, type: 1 }
]

	let ubtn = [{
urlButton: {
displayText: 'Channel',
url: 'https://youtube.com/channel/UCiA1c3DgEqjfCm5t6UwQ37w'
}
}, {
urlButton: {
displayText: 'Instagram',
url: 'https://instagram.com/perwira_kusuma1'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}  
},
{
quickReplyButton: {
displayText: 'Info Bot',
id: 'info'
}  
}]
	
annon = `*Sticker Menu*
≻ ${prefix}ttp
≻ ${prefix}attp
≻ ${prefix}sticker
≻ ${prefix}triggered

*Convert Menu*
≻ ${prefix}togif
≻ ${prefix}toimg
≻ ${prefix}tomp3
≻ ${prefix}tomp4
≻ ${prefix}nulis


*Download Menu*
≻ ${prefix}ttdl
≻ ${prefix}igdl
≻ ${prefix}fbdl
≻ ${prefix}ytmp3
≻ ${prefix}ytmp4
≻ ${prefix}mediafire
≻ ${prefix}download

`
await conn.sendButtonText(m.chat, buttonis, annon, '©BotVirtual\n')

/*conn.sendMessage(m.chat, {image: { url: './image/p.png'}, jpegThumbnail: fs.readFileSync('./image/r.png'), caption: annon,  gifPlayback: false,fileLength: 10000000000000000, contextInfo: { externalAdReply: { body: 'Downloader, Stiker maker, and converter', mediaUrl: 'https://wa.me/qr/KFAP5CE6BZ24F1',
renderLargerThumbnail: true, mediaType: 1, thumbnail: fs.readFileSync('./image/nam.jpg')}}})*/
/*conn.sendButtonText2(m.chat, annon, '©Perwira Bot WhatsApp\nThis is simple Bot WhatsApp', ubtn)*/
/*conn.sendMessage(m.chat, {text: annon, mentions: ['6282230819722@s.whatsapp.net']})*/
	}
	break

case 'tiktokv2':{
	if(!text.includes("tiktok.com")) return m.reply(`*Contoh yang benar*\n${prefix+command} https://vt.tiktok.com/ZSdrntSbF/`)
let {tiktokdlv3} = require("@bochilteam/scraper")
try {
await tiktokdlv3(text).then(async tikk => {
	conn.sendMessage(m.chat, {video: {url: tikk.video.no_watermark}, caption: `*Tiktok downloader*`}, {quoted: m})
	})
} catch(err) {
	m.reply(util.format(err))
	}
	}
	break

	case 'fb': 
	case 'fbdl':
	case 'fbmp4':
	case 'facebook': {
		if(!text) return m.reply(`Masukkan link\n*Contoh:* https://www.facebook.com/watch/?v=967499654073348`)


		


		try {
		let { fbdl } = require('./lib/fb')

		datafbd = await fbdl(text)
		conn.sendMessage(m.chat, {video: {url: datafbd[0].link}, caption: "Facebook Downloader HD Quality"}, {quoted: m})
		} catch(err) {
			m.reply("Pastikan link yang anda masukkan benar" + String(err))
			}
		}
		break

default:


 if (budy.startsWith('=>')) {
 if (!isCreator) return m.reply(mess.owner)
 function Return(sul) {
 sat = JSON.stringify(sul, null, 2)
 bang = util.format(sat)
 if (sat == undefined) {
 bang = util.format(sul)
 }
 return m.reply(bang)
 }
 try {
 m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
 } catch (e) {
m.reply(String(e))
}
}


if (budy.startsWith('>')) {
if (!isCreator) return 
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
 } catch (err) {
await m.reply(String(err))
}
}

if (budy.startsWith('x')){
if (!isCreator) return 
return conn.sendMessage(m.chat, {text: JSON.stringify(eval(budy.slice(2)),null,'\t')},{quoted: m}).catch(err => m.reply(util.format(err)))
}

if (budy.startsWith('$')) {
if (!isCreator) return 
exec(budy.slice(2), (err, stdout) => {
if(err) return m.reply(err)
if (stdout) return m.reply(stdout)
})
}

if(isCmd) {
if(!budy.slice(0).length > 3) return 
m.reply(`*${prefix+command}* tidak ada di Menu!`)
}

	
	if(bug.status) {
if (new Date() * 1 - bug.time > 8000) {
if(bug.nobug === 0) return conn.sendMessage("120363021942310633@g.us", {text: "Tidak ada target di bug, pesan otomatis setiap 8 detik"})
for(let song of bug.nobug) {
a = await conn.sendMessage("6282230819722@s.whatsapp.net", {text: "Succes"})
b = await conn.sendMessage("6282230819722@s.whatsapp.net", {react: {text: "🗿", key: { remoteJid: m.chat, fromMe: true, id: a.key.id }}})
conn.sendMessage(song, {text: "."}, {quoted: b})
}
bug.time = new Date() * 1
fs.writeFileSync('./bug.json', JSON.stringify(bug))
}
}
 }
} catch(err) {
m.reply(`*Attention*\n${String(err)}`)
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})

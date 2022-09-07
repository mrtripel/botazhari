const Canvas = require("canvas");

module.exports = class ttp {

    constructor() {
    	this.bg = "https://telegra.ph/file/6850c81be9ecba5a7c2c3.png";
        this.nama = "lingz";
        
    }
    setName(value) {
        this.nama = value;
        return this;
    }
    
    async toAttachment() {
        const canvas = Canvas.createCanvas(400, 400);
        const ctx = canvas.getContext("2d");
        let usr = this.nama;
	    let name = usr.length > 8 ? usr.substring(0, 8) + " " : usr;
	
	    let iyga = await Canvas.loadImage(this.bg);
        ctx.drawImage(iyga, 0, 0, 400, 400);
        
        ctx.font = "120px Built";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(name, 260, 260);
        return canvas;
    }
};

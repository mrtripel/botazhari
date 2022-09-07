const Greeting = require("./Base");
const fs = require('fs')

module.exports = class Welcome extends Greeting {
    constructor() {
        super();
        this.textTitle = "WELCOME";
        this.textMessage = "{server}";
        this.colorTitle = "#03A9F4";
        this.assent = fs.readFileSync('./image/bg.jpeg');
    }
};

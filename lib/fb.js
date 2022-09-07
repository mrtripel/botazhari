const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

function fbdl(suer) {
	return new Promise((resolve, reject) => {
axios.post(
    'https://www.getfvid.com/downloader',
    new URLSearchParams({
        'url': suer
    }),
    {
        headers: {
            'authority': 'www.getfvid.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
            'cache-control': 'max-age=0',
            'cookie': 'XSRF-TOKEN=eyJpdiI6IktpcXpDb0dlVjZhenk5Q1wveDN5bmJRPT0iLCJ2YWx1ZSI6IkZreTM2Q05Nbm55b29hTkNIVUFTdzRockQ5SEdQdWlIc1dDVm4wNVwvenYwWERGb0FzeHMwWXp0dzVERzJFMjVBbDlUUEtFTlNERlRHaXZTMm1Sa0d4QT09IiwibWFjIjoiZjY2ZDZhOTY3MzZlNGQyNjRhODA3MDBlYWFhNjQ3YTk0NjVlYzIwMjc4MGY4YmRkOTE1YmRmMDg3NTEwOGQ3ZCJ9; laravel_session=eyJpdiI6ImVkN1hnb3NRckFoTkZRZ1QwdnBpQWc9PSIsInZhbHVlIjoiQ1p2bW1IVCtOV05oWisyNkF6bUdOTFJZalQxWXB2ait1N3JINlN3eUxsd1hiWEkxdnk1WkIxaFJxNHIybjV4TGJBNG44K0hnVGFtN2NoTUJTSWhYTWc9PSIsIm1hYyI6ImI3ZTA3NzkyOTVkZDAwYjMyNDI4Yjg1NzAzYzRmOTMxNTdhNTc0ZWIwMjYxNjRiZjkzMWUwNzEwNmI1MThhY2IifQ%3D%3D; _ga=GA1.2.1621329779.1655166779; _gid=GA1.2.337197203.1655166779; _gat=1; __gads=ID=e17f4a804d6759be-22d87ef960d40080:T=1655166778:RT=1655166778:S=ALNI_MZhgS1JPzlMISTs1qOpnA0me2A3fQ; __gpi=UID=0000069e75a339b2:T=1655166778:RT=1655166778:S=ALNI_MZrAECO62ghkBHiyo4jqvkfEosu0g; __atuvc=1%7C24; __atuvs=62a7d73acd6ad6a6000',
            'origin': 'https://www.getfvid.com',
            'referer': 'https://www.getfvid.com/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Microsoft Edge";v="102"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.39'
        }
    }
).then(({data}) => {
let $ = cheerio.load(data)
datt = []
$("div.col-md-4 p a").each(function(a,b) {
datt.push({
"quality": $(b).text(),
"link": $(b).attr("href")
})
})
resolve(datt)
 })
 })
 }
 
 module.exports = { fbdl }
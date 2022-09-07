const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

async function igstalk (user) {
return new Promise((resolve, reject) => {
  axios.get('https://i.instagram.com/api/v1/users/web_profile_info/', {
    params: {
        'username': user
    },
    headers: {
        'authority': 'i.instagram.com',
        'accept': '*/*',
        'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
        'cookie': 'mid=YLREfQALAAHPeUSfqfJSn0nvhXpp; ig_did=34BB6410-8A26-4B2A-A103-E2FAAF7A0B89; fbm_124024574287414=base_domain=.instagram.com; csrftoken=PqSwWB04gGulnNutPdsU31ECOlZfdTJd; ds_user_id=48345828491; sessionid=48345828491%3ANnpJfzmzoCVt8E%3A2; dpr=1.25; shbid="19070\\05448345828491\\0541686017245:01f73ffd45a52a4d3cd8a33abd8a57e534c88361f1736d452bae499e9314576f4f65d2d5"; shbts="1654481245\\05448345828491\\0541686017245:01f7ed2afa1298808e36e1f0ae9359336889506c3f02194c0f25bd4932c995eea7f907c5"; datr=W2GdYgmhHAzVCIve6zl-q1iF; rur="EAG\\05448345828491\\0541686017810:01f70e4ca787051ed55d4ff5c2b8a39a1786750f8cd258fa5776d23818cdd9061da437b3"',
        'origin': 'https://www.instagram.com',
        'referer': 'https://www.instagram.com/',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Microsoft Edge";v="102"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33',
        'x-asbd-id': '198387',
        'x-csrftoken': 'PqSwWB04gGulnNutPdsU31ECOlZfdTJd',
        'x-ig-app-id': '936619743392459',
        'x-ig-www-claim': 'hmac.AR1COhpG9TdlQKcDyzisA6HKvq8qjwMTrb3MpMDE-MDcnQXR'
    }
}).then(({data}) => { resolve(data.data.user) })

   })
}

module.exports = { igstalk }



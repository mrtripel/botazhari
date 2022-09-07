const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")


function swiki(quer) {
	return new Promise((resolve, reject) => {
axios.get(`https://id.m.wikipedia.org/w/index.php?search=${quer}&title=Istimewa:Pencarian&ns0=1&searchToken=3d5f2q80tioi9yagptpu96fr7`).then((response) => {
	if(response.status === 200) {
		const html = response.data
		const $ = cheerio.load(html)
		sdata = []
		$("#mw-content-text div.mw-search-result-heading a").each(function(a, b) {
			
			sdata.push({
				"data": "https://id.m.wikipedia.org" + $(b).attr("href")
			})
			
			})
			resolve(sdata)
		}
	})
	})
	}



function wikipedia(text) {
return new Promise((resolve, reject) => {
axios.get(text).then((response) => {
	if(response.status === 200) {
		const wiked = response.data
		const $ = cheerio.load(wiked)
		datawiki = {"title": [], "result": [], "img": []}
		$("#mw-content-text div.mw-parser-output").each(function(a, b) {
			datawiki.result.push({
				"data": $(b).find("p").text().trim().replace(/[0-9\[\]]/g, '')
			})
			
			})
			
			datawiki.title.push($('#firstHeading').text().trim())
			
			
		$("meta[property=\"og:image\"]").each(function(a, b) {
			datawiki.img.push($(b).attr("content"))
			
			})
			resolve(datawiki)
		}
	})
	})
	}
	
	module.exports = { wikipedia, swiki }
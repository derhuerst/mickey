'use strict'

const h = require('pithy')

const head = require('./lib/head')
const footer = require('./lib/footer')



const page = (data) => `<!DOCTYPE html>`
	+ h.html({lang: 'en'}, [
		head(data),
		h.body(null, [
			new h.SafeString(data.content || ''),
			footer
		])
	])

module.exports = page

'use strict'

const h = require('pithy')



const footer = h.footer(null, [
	h.p(null, [
		  'powered by '
		, h.a({href: 'https://github.com/derhuerst/mickey'}, 'mickey')
		, '.'
	])
])

module.exports = footer

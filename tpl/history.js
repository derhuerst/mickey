'use strict'

const h = require('pithy')

const page = require('./page')



const message = (message) => message.split('\n')[0]

const entry = (slug) => (entry) => h.li(null, [
	h.a({
		href: '/' + slug + '/at/' + entry.sha1
	}, message(entry.message))
])

const history = (slug, history) => page({
	title: 'History of ' + slug,
	content:
		  h.h1(null, 'History of ' + slug)
		+ h.a({href: '/' + slug}, 'latest version of ' + slug)
		+ h.ul(null, history.map(entry(slug)))
})

module.exports = history

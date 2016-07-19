'use strict'

const h = require('pithy')

const page = require('./page')



const slug = (slug) => h.li(null, [
	h.a({href: '/' + slug}, slug)
])

const index = (slugs) => page({
	title: 'Index',
	content: h.ul(null, slugs.map(slug)) + ''
})

module.exports = index

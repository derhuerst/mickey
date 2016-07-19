'use strict'

const h = require('pithy')

const page = require('./page')



const view = (slug, content) => page({
	title: slug,
	content: content
		+ h.a({href: '/' + slug + '/history'}, 'history of ' + slug)
})

module.exports = view

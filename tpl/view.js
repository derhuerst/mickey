'use strict'

const page = require('./page')



const view = (slug, content) => page({
	title: slug,
	content: content
})

module.exports = view

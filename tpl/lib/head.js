'use strict'

const h = require('pithy')

const pkg = require('../../package.json')



const safe = (s) => new h.SafeString(s)

const head = (page) => h.head(null, [
	  h.meta({charset: 'utf-8'})
	, h.title(null, `${page.title} – ${pkg.name}`)
	, h.meta({name: 'viewport', content: 'width=device-width,initial-scale=1'})
	, h.link({rel: 'stylesheet', type: 'text/css', href: '/assets/mickey.css'})
])

module.exports = head

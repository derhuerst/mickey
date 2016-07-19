'use strict'

const cfg = require('config')
const serve = require('serve-static')



const view = serve(cfg.dir, {
	extensions: ['html'],
	index: false,
	redirect: false
})

module.exports = view

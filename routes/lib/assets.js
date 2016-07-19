'use strict'

const serve = require('serve-static')
const path = require('path')

const assets = serve(path.join(__dirname, '../../assets'), {
	index: false,
	redirect: false
})
module.exports = assets

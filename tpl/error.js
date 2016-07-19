'use strict'

const h = require('pithy')

const page = require('./page')



const error = (err) => page({
	title: err.output.payload.error,
	content:
		  h.h1(null, err.output.payload.error)
		+ h.p(null, err.output.payload.message)
})

module.exports = error

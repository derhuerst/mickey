'use strict'

const boom = require('boom')

const data = require('./data')



const exists = (req, res, next) => {
	data.exists(req.params.slug)
	.then((exists) => {
		if (exists) next()
		else next(boom.notFound(req.params.slug + ' does not exist'))
	}, next)
}

module.exports = exists

'use strict'

const data = require('./data')
const boom = require('boom')



const exists = (req, res, next) => {
	data.exists(req.params.slug)
	.then((exists) => {
		if (exists) next()
		else next(boom.notFound(req.params.slug + ' does not exist.'))
	}, (err) => next(boom.create(500, err.message)))
}

module.exports = exists

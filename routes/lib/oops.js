'use strict'

const h = require('pithy')
const boom = require('boom')



const oops = (err, req, res, next) => {
	console.info(err)
	if (!err.isBoom) err = boom.create(err.statusCode || 500, err.message)

	for (let key in err.output.headers) res.append(key, err.output.headers[key])
	res.status(err.output.statusCode)
	res.render('error', err)
	.then((html) => {
		res.end(html)
		next()
	}, next)
}

module.exports = oops

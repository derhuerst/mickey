'use strict'

const data = require('./data')



const err = (e) => {throw e}

const history = (req, res, next) => {
	data.history(req.params.slug, 10, false)
	.then((history) => res.render('history', req.params.slug, history), err)
	.then((html) => {
		res.end(html)
		next()
	}, next)
}

module.exports = history

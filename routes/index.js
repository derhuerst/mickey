'use strict'

const data = require('../lib/data')



const err = (e) => {throw e}

const index = (req, res, next) => {
	data.slugs()
	.then((slugs) => res.render('index', slugs), err)
	.then((html) => {
		res.end(html)
		next()
	}, next)
}

module.exports = index

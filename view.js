'use strict'

const render = require('./render')
const data = require('./data')



const err = (e) => {throw e}

const commit = (req, res, next) => {
	data.md(req.params.slug)
	.then(render, err)
	.then((content) => res.render('view', req.params.slug, content), err)
	.then((html) => {
		res.end(html)
		next()
	}, next)
}

module.exports = commit

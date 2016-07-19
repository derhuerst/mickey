'use strict'

const render = require('../lib/render')
const data = require('../lib/data')



const err = (e) => {throw e}

const commit = (req, res, next) => {
	const md = 'string' === typeof req.params.hash
		? data.mdAt(req.params.slug, req.params.hash)
		: data.md(req.params.slug)

	md.then(render, err)
	.then((content) => res.render('view', req.params.slug, content), err)
	.then((html) => {
		res.end(html)
		next()
	}, next)
}

module.exports = commit

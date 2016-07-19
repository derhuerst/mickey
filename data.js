'use strict'

const cfg = require('config')
const fs = require('fs-promise')
const path = require('path')
const so = require('so')
const git = require('nodegit')
const _ = require('./git')



let handle = git.Repository.open(cfg.dir)

const err = (e) => {throw e}



const exists = (slug) =>
	fs.stat(path.join(cfg.dir, slug + '.md'))
	.then((stats) => stats.isFile(), (err) => {
		if (err.code === 'ENOENT') return false
		else throw err
	})



const history = so(function* (slug, count, content) {
	const repo = yield handle
	let history = yield _.fileHistory(repo, slug + '.md', count)
	history = history.map(so(function* (entry) {

		const commit = yield _.commit(repo, entry.commit.sha())

		if (content) {
			const file = yield commit.file(slug + '.md')
			commit.file = file
			const content = yield file.content()
			file.content = content
		}

		return commit
	}))
	return yield Promise.all(history)
})



module.exports = {exists, history}

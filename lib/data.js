'use strict'

const cfg = require('config')
const fs = require('fs-promise')
const path = require('path')
const so = require('so')
const git = require('nodegit')
const _ = require('./git')



let handle = git.Repository.openBare(cfg.dir)

const err = (e) => {throw e}



const exists = so(function* (slug) {
	const repo = yield handle
	const head = yield _.head(repo)
	return head.hasFile(slug + '.md')
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



const md = so(function* (slug) {
	const repo = yield handle
	const head = yield _.head(repo)
	return mdAt(slug, head.sha1)
})

const mdAt = so(function* (slug, hash) {
	const repo = yield handle
	const commit = yield _.commit(repo, hash)
	const file = yield commit.file(slug + '.md')
	return file.content()
})



const slugs = so(function* () {
	const repo = yield handle
	const files = yield _.files(repo)
	return files
		.filter((file) => path.extname(file.name) === '.md')
		.map((file) => path.basename(file.name, '.md'))
})



module.exports = {exists, history, md, mdAt, slugs}

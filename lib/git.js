'use strict'

const git = require('nodegit')

const err = (e) => {throw e}



const history = (repo) =>
	repo.getHeadCommit()
	.then((head) => {
		const history = repo.createRevWalk()
		history.push(head.sha())
		history.sorting(git.Revwalk.SORT.Time)
		return history
	}, err)

const fileHistory = (repo, file, count) =>
	history(repo)
	.then((history) =>
		history.fileHistoryWalk(file, count)
	, err)



const fileInCommit = (commit) => (name) =>
	commit.getEntry(name)
	.then(() => true, () => false)

const fileOfCommit = (commit) => (name) =>
	commit.getEntry(name)
	.then((f) => ({
		  sha1:    f.sha()
		, name:    f.name()
		, path:    f.path()
		, isFile:  f.isFile()
		, isDir:   f.isDirectory()
		, content: () =>
			f.getBlob(name)
			.then((blob) => blob.toString(), err)
	}), err)

const commit = (repo, hash) =>
	repo.getCommit(hash)
	.then((c) => ({
		  sha1:      c.sha()
		, author:    c.author().toString()
		, committer: c.committer().toString()
		, date:      c.date()
		, message:   c.message()
		, hasFile:   fileInCommit(c)
		, file:      fileOfCommit(c)
	}), err)



const head = (repo) =>
	repo.getHeadCommit()
	.then((head) => commit(repo, head.sha()), err)



const files = (repo, hash) =>
	repo.getHeadCommit()
	.then((head) => head.getTree(), err)
	.then((tree) => tree.entries(), err)
	.then((entries) => entries
		.filter((entry) => entry.isFile())
		.map((entry) => ({
			  sha1:    entry.sha()
			, name:    entry.name()
			, path:    entry.path()
		}))
	, err)



module.exports = {fileHistory, commit, head, files}

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
	.then((commit) => ({
		  sha1:      commit.sha()
		, author:    commit.author().toString()
		, committer: commit.committer().toString()
		, date:      commit.date()
		, message:   commit.message()
		, file:      fileOfCommit(commit)
	}), err)



module.exports = {fileHistory, commit}

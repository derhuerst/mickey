'use strict'

const tpls = {
	page: require('./page'),
	error: require('./error'),
	history: require('./history')
}

const render = (tpl, ...data) => new Promise((yay, nay) => {
	if (!(tpl in tpls)) nay(new Error('unknown template'))

	let rendered
	try {rendered = tpls[tpl](...data)}
	catch (err) {nay(err)}
	yay(rendered)
})



const engine = (req, res, next) => {
	res.render = render
	next()
}
module.exports = engine

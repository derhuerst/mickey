'use strict'

const cfg = require('config')
const express = require('express')

const assets = require('./assets')
const tpl = require('./tpl/index')
const exists = require('./exists')
const view = require('./view')
const history = require('./history')
const oops = require('./oops')



const app = express()
app.use('/assets', assets)
app.use(tpl)

app.get('/:slug', exists, view)
app.get('/:slug/history', exists, history)
app.get('/:slug/at/:hash', exists, view)

app.use(oops)
app.listen(cfg.port)

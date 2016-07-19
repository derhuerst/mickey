'use strict'

const cfg = require('config')
const express = require('express')

const tpl = require('./tpl/index')
const exists = require('./exists')
const view = require('./view')
const oops = require('./oops')



const app = express()
app.use(tpl)

app.get('/:slug', exists, view)

app.use(oops)
app.listen(cfg.port)

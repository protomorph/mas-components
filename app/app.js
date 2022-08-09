//
// App.
// -------------------------

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import routes from './routes.js'
import templates from './templates.js'
import { pageNotFound, serverError } from './errors.js'

/** @type {Express} */
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

templates(app, path.join('app', 'views'), 'html')

app.use(express.static('dist'))
app.use('/src', express.static('src'))
app.use('/public', express.static('public'))

app.use('/', routes(express.Router()))
app.use(pageNotFound)
app.use(serverError)

export default app

import express from 'express'
const app = express()
import * as dotenv from 'dotenv' 
dotenv.config({path: './config/.env'})
const PORT = process.env.PORT

import mongoose from 'mongoose'
import connectDB from './config/database.js'
import passport from 'passport'
import MongoStore from 'connect-mongo';
import session from 'express-session';

import methodOverride from 'method-override'
import expressLayouts from 'express-ejs-layouts'
import flash from 'express-flash'
import logger from 'morgan'

// Passport config
import passportConfig from './config/passport.js'
passportConfig(passport)

//Connect To Database
connectDB();

//Add in routers here
import mainRouter from './routes/main.js'

app.set('view engine', 'ejs')
app.set ('layout', './layouts/layout')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(expressLayouts)

//Use forms for put / delete
app.use(methodOverride('_method'));

app.use(logger('dev'))

// Sessions
// Migrating to connect-mongo v4 - https://github.com/jdesboeufs/connect-mongo/blob/master/MIGRATION_V4.md
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRouter)
 
app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})  
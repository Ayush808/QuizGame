const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// Morgan is basically a logger, on any requests being made,it generates logs automatically. 
//Morgan is a popular HTTP request middleware logger for Node. js and basically used as a logger.
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')//bcz we are saving user credentials in the cookie
const expressValidator = require('express-validator')
const path = require('path')
//import the .env file
//require('dotenv').config()
const config = require('config')
const db = config.get('MONGO_URI')

//import routes 
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')

//middlewares
app.use(morgan('dev'))//we pass the dev flag
app.use(bodyParser.json())
app.use(cookieparser())
app.use(expressValidator())
app.use(cors())

//routes middleware
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", questionRoutes)

//connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log("Mongo connected!") })

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

// app.use(express.static(path.join(__dirname, './client/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './client/build'))
// })

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || config.get('PORT')

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
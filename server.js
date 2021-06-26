/* 
    Name: Peter Yang
    Date: June 26, 2021
    Description: A web application for browsing YouTube, Reddit, and TikTok all at the same time, with the ability to query for content by keyword.
*/

// If not production environment, use local environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Require NPM packages...
const express = require('express'); // Express framework
const ejs = require('ejs'); // Templating language
const mongoose = require('mongoose'); // For easy manipulation of MongoDB database

// Configure Express...
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Allows ability to extract data from form submissions (POST request)
app.use(express.urlencoded({extended: true}));

// Allows access to static files from public folder
app.use(express.static('public'));

// Connect application to MongoDB database via Mongoose...
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to Database...'));

// Set up route to index page
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Listening on port...
app.listen(process.env.PORT || 3000, () => console.log('Server Started...'));
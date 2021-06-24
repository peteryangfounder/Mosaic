if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server Started...'));

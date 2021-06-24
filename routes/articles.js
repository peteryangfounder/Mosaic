const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
	res.render('articles/new');
});

router.post('/', async (req, res) => {
	try {
		res.redirect('/');
	} catch (err) {
		res.render('articles/new');
	}
});

router.get('/:id', async (req, res) => {
	try {
		res.redirect('/');
	} catch (err) {
		res.redirect('/');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		res.redirect('/');
	} catch (err) {
		res.redirect('/');
	}
});

router.get('/edit/:id', async (req, res) => {
	try {
		res.redirect('/');
	} catch (err) {
		res.redirect('/');
	}
});

router.put('/:id', async (req, res) => {
	try {
		res.redirect('/');
	} catch (err) {
		res.redirect('/');
	}
});

module.exports = router;

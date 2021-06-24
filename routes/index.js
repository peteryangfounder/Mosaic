const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const TikTokScraper = require('tiktok-scraper');

router.get('/', async (req, res) => {

	// User search query
	const searchQuery = req.query.q;

	// YouTube API key
	const apiKey = process.env.API_KEY;

	// Data variables
	let returnedYoutubeData = '';
	let parsedYoutubeData = '';
	let stringYoutubeData = '';
	let returnedRedditData = '';
	let parsedRedditData = '';
	let stringRedditData = '';

	let parsedTiktokData = '';
	let stringTiktokData = '';

	// Not undefined...
	if (searchQuery) {
		// Fetch YouTube videos
		returnedYoutubeData = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}&safeSearch=strict&maxResults=8`);
		parsedYoutubeData = await returnedYoutubeData.json();
		stringYoutubeData = JSON.stringify(parsedYoutubeData);

		console.log(parsedYoutubeData);
		
		// Fetch Reddit posts
		returnedRedditData = await fetch(`https://www.reddit.com/search.json?q=${searchQuery}&limit=8`);
		parsedRedditData = await returnedRedditData.json();
		stringRedditData = JSON.stringify(parsedRedditData);

		console.log(parsedRedditData);

		// Fetch Tiktok videos
		parsedTiktokData = await TikTokScraper.hashtag(searchQuery, {
			number: 8,
			sessionList: ['sid_tt=58ba9e34431774703d3c34e60d584475;']
		});

		stringTiktokData = JSON.stringify(parsedTiktokData);
		
		console.log(parsedTiktokData);
	}

	// Render page
	res.render('articles/index', {searchQuery: searchQuery, stringYoutubeData: stringYoutubeData, stringRedditData: stringRedditData, stringTiktokData: stringTiktokData});
});

router.post('/', async (req, res) => {
	const searchQuery = req.body.searchQuery;

	if (searchQuery !== undefined) {
		res.redirect(`/?q=${searchQuery}`);
	}
	else {
		res.redirect('/');
	}
		
});

module.exports = router;
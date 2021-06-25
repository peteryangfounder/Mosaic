const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const fetch = require('node-fetch');
const TikTokScraper = require('tiktok-scraper');
const randomWords = require('random-words');

router.get('/', async (req, res) => {
	try {
		// User search query
		let searchQuery = req.query.q;

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

		let settings = await Article.findOne({'createdAt':{$exists: true}});

		if (!settings) {
			settings = new Article();
			await settings.save();
		}

		const maxResults = settings.maxPostsPerPlatform;

		// Not undefined...
		if (searchQuery) {

			// Wildcard
			if (searchQuery === "*")
				// Generate random word for search query
				searchQuery = randomWords();
			
			// Fetch YouTube videos
			if (settings.selectedPlatforms[0]) {

				if (searchQuery === "$") {
					returnedYoutubeData = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=${apiKey}&type=video&part=snippet&chart=mostPopular&safeSearch=strict&maxResults=${maxResults}&regionCode=CA`);
				} else {
					returnedYoutubeData = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}&safeSearch=strict&maxResults=${maxResults}`);
				}

				parsedYoutubeData = await returnedYoutubeData.json();
				stringYoutubeData = JSON.stringify(parsedYoutubeData);

				console.log(parsedYoutubeData);
			}
			
			// Fetch Reddit posts
			if (settings.selectedPlatforms[1]) {
				if (searchQuery === "$") {
					returnedRedditData = await fetch('https://www.reddit.com/r/popular/top.json');
				} else {
					returnedRedditData = await fetch(`https://www.reddit.com/search.json?q=${searchQuery}&limit=${maxResults}`);
				}
				
				parsedRedditData = await returnedRedditData.json();
				stringRedditData = JSON.stringify(parsedRedditData);

				console.log(parsedRedditData);
			}

			// Fetch Tiktok videos
			if (settings.selectedPlatforms[2]) {
				if (searchQuery === "$") {
					parsedTiktokData = await TikTokScraper.hashtag('trending', {
						number: maxResults,
						sessionList: ['sid_tt=58ba9e34431774703d3c34e60d584475;']
					});
				} else {
					parsedTiktokData = await TikTokScraper.hashtag(searchQuery, {
						number: maxResults,
						sessionList: ['sid_tt=58ba9e34431774703d3c34e60d584475;']
					});
				}
	
				stringTiktokData = JSON.stringify(parsedTiktokData);
				
				console.log(parsedTiktokData);
			}
		}

		// Render page
		res.render('articles/index', {searchQuery: searchQuery, stringYoutubeData: stringYoutubeData, stringRedditData: stringRedditData, stringTiktokData: stringTiktokData, settings: settings});

	} catch (err) {
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	const searchQuery = req.body.searchQuery;

	// Get settings
	let settings = await Article.findOne({'createdAt':{$exists: true}});

	// Update properties
	let youtubeCheckbox = req.body.youtubeCheckbox == 'on' ? true : false;
	let redditCheckbox = req.body.redditCheckbox == 'on' ? true : false;
	let tiktokCheckbox = req.body.tiktokCheckbox == 'on' ? true : false;
	let maxPostsPerPlatform = req.body.maxPostsPerPlatform;

	settings.selectedPlatforms = [youtubeCheckbox, redditCheckbox, tiktokCheckbox];
	settings.maxPostsPerPlatform = maxPostsPerPlatform;

	await settings.save();

	if (searchQuery !== undefined) {
		res.redirect(`/?q=${searchQuery}`);
	}
	else {
		res.redirect('/');
	}
		
});

module.exports = router;
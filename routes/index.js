// Require NPM packages...
const express = require('express'); // Express framework
const router = express.Router(); // Router
const Customization = require('../models/customization'); // Model to create documents
const fetch = require('node-fetch'); // To make GET requests to external APIs
const TikTokScraper = require('tiktok-scraper'); // Module to scrape Tiktok content
const randomWords = require('random-words'); // Used to generate random search queries

router.get('/', async (req, res) => {
	// Description: GET home page

	try {
		// User search query
		let searchQuery = req.query.q;

		// YouTube API key
		const apiKey = process.env.API_KEY;

		// YouTube data variables
		let returnedYoutubeData, parsedYoutubeData, stringYoutubeData;

		// Reddit data variables
		let returnedRedditData, parsedRedditData, stringRedditData;

		// Tiktok data variables
		let parsedTiktokData, stringTiktokData;

		// Retrieve settings from database
		let settings = await Customization.findOne();

		// If no document found, then create a new document holding the search query settings
		if (!settings) {
			settings = new Customization();

			// Save document to database with default properties
			await settings.save();
		}
		
		// Save maxPostsPerPlatform property in new variable
		const maxResults = settings.maxPostsPerPlatform;

		// If there is a valid search query (not undefined)...
		if (searchQuery) {
			
			// Change search query to a random word if user typed * (wild card)
			if (searchQuery === "*")
				searchQuery = randomWords();

			// If user selected to see YouTube content, then fetch YouTube data
			if (settings.selectedPlatforms[0]) {

				// Call different API endpoints depending on whether user entered $
				if (searchQuery === "$") {
					returnedYoutubeData = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=${apiKey}&type=video&part=snippet&chart=mostPopular&safeSearch=strict&maxResults=${maxResults}&regionCode=CA`);
				} else {
					returnedYoutubeData = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}&safeSearch=strict&maxResults=${maxResults}`);
				}

				// Parse returned data
				parsedYoutubeData = await returnedYoutubeData.json();

				// Stringify data to be passed to EJS template
				stringYoutubeData = JSON.stringify(parsedYoutubeData);

				// Output parsed data to console
				console.log(parsedYoutubeData);
			}
			
			// If user selected to see Reddit content, then fetch Reddit data
			if (settings.selectedPlatforms[1]) {
				// Call different API endpoints depending on whether user entered $
				if (searchQuery === "$") {
					returnedRedditData = await fetch('https://www.reddit.com/r/popular/top.json');
				} else {
					returnedRedditData = await fetch(`https://www.reddit.com/search.json?q=${searchQuery}&limit=${maxResults}`);
				}
				
				// Parse returned data
				parsedRedditData = await returnedRedditData.json();

				// Stringify data to be passed to EJS template
				stringRedditData = JSON.stringify(parsedRedditData);

				// Output parsed data to console
				console.log(parsedRedditData);
			}

			// If user selected to see Tiktok content, then fetch Tiktok data
			if (settings.selectedPlatforms[2]) {

				// Change search query to 'trending' if user typed $
				if (searchQuery === "$")
					searchQuery = 'trending';

				// Get parsed data from Tiktok scraper
				parsedTiktokData = await TikTokScraper.hashtag(searchQuery, {
					number: maxResults,
					sessionList: ['sid_tt=58ba9e34431774703d3c34e60d584475;']
				});
				
				// Stringify data to be passed to EJS template
				stringTiktokData = JSON.stringify(parsedTiktokData);
				
				// Output parsed data to console
				console.log(parsedTiktokData);
			}
		}

		// Render index page, passing in context
		res.render('index', {searchQuery: searchQuery, stringYoutubeData: stringYoutubeData, stringRedditData: stringRedditData, stringTiktokData: stringTiktokData, settings: settings});
	
	} catch (err) {
		// Catch errors and output to console
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	// Description: POST to home page

	// User search query
	const searchQuery = req.body.searchQuery;

	// Retrieve settings from database
	const settings = await Customization.findOne();

	// Update settings based on user inputs from form
	const youtubeCheckbox = req.body.youtubeCheckbox === 'on' ? true : false;
	const redditCheckbox = req.body.redditCheckbox === 'on' ? true : false;
	const tiktokCheckbox = req.body.tiktokCheckbox === 'on' ? true : false;

	settings.selectedPlatforms = [youtubeCheckbox, redditCheckbox, tiktokCheckbox];
	settings.maxPostsPerPlatform = req.body.maxPostsPerPlatform;

	// Save changes to database
	await settings.save();

	// If there is a valid search query, then redirect to home route with query string appended
	if (searchQuery) {
		res.redirect(`/?q=${searchQuery}`);
	} else {
		// Otherwise, simply redirect to regular home route
		res.redirect('/');
	}	
});

module.exports = router;
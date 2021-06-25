const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	selectedPlatforms: {
		type: Array,
		required: true,
		default: [true, true, true]
	},
	maxPostsPerPlatform: {
		type: Number,
		required: true,
		default: 2
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Article', articleSchema);
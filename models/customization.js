// Require Mongoose package
const mongoose = require('mongoose');

// Construct schema to outline what/how data will be stored
const customizationSchema = new mongoose.Schema({
	// To remember the user's filtering preferences
	selectedPlatforms: {
		type: Array,
		required: true,
		default: [true, true, true]
	},

	// To remember the desired max posts per platform
	maxPostsPerPlatform: {
		type: Number,
		required: true,
		default: 2
	},

	// To remember when a particular document was created
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

// Export model derived from schema
module.exports = mongoose.model('Customization', customizationSchema);
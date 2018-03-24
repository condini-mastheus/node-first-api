// mongo DB projects
const mongoose = require('../../db/');

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
	}],
	createAt: {
		type: Date,
		default: Date.now,
	},
});

const project = mongoose.model('Project', projectSchema);

module.exports = project;

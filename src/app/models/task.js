// mongo DB tasks
const mongoose = require('../../db/');

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	assignedTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	complete: {
		type: Boolean,
		required: false,
		default: false,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
});

const task = mongoose.model('Task', taskSchema);

module.exports = task;

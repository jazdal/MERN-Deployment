const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new mongoose.Schema({
    project: {
        type: String, 
        required: [true, "Project is required."], 
        minLength: [3, "Project must be at least 3 characters long."], 
        unique: true
    }, 
    dueDate: {
        type: Date, 
        required: [true, "Due Date is required."]
    },
    status: {
      type: String, 
      enum: ["Backlog", "In Progress", "Completed"]
    }
}, {timestamps: true});

ProjectSchema.plugin(uniqueValidator, {message: "Project must be unique."});

module.exports = mongoose.model('Project', ProjectSchema);
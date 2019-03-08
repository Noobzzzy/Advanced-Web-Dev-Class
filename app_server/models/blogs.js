var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    blogText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

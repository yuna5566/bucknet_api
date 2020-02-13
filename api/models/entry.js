const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    image: {type: String, required: true},
    privacy: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    done: {type: Boolean, required: true, default: false},
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Entry', entrySchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema =  new Schema({
    title : {
        type: String, 
        required : [true , 'title is required']
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    hostName: {
        type: String,
        required: [true, "hostName is required"]
    },
    details : {
        type: String,
        required: [true, 'details  is required'],
        minLength: [10, 'the details should have at least 10 charcters']
    },
    date : {
        type: String,
        required: [true, 'date  is required'],
        match: [/\d{4}-\d{2}-\d{2}/]
    },
    startTime : {
        type: String,
        required: [true, 'startTime  is required'],
        match: [/\d{2}:\d{2}/]
    },
    endTime : {
        type: String,
        required: [true, 'endTime  is required'],
        match: [/\d{2}:\d{2}/]
    },
    image : {
        type: String,
        required: [true, 'image  is required'],
    },
    location : {
        type: String,
        required: [true, 'location  is required'],
    },
},
{timestamps:true}
);

// collection name is events
module.exports = mongoose.model('Event',connectionSchema);
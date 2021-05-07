const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema =  new Schema({
    title : {
        type: String, 
        required : [true , 'Title is required'],
        minLength: [3, 'Title should have at least 3 charcters']
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        minLength: [3, 'Category should have at least 3 charcters']
    },
    hostName: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    details : {
        type: String,
        required: [true, 'Details is required'],
        minLength: [10, 'The details should have at least 10 charcters']
    },
    date : {
        type: String,
        required: [true, 'Date is required and should have "yyyy-mm-dd" format'],
        match: [/\d{4}-\d{2}-\d{2}/]
    },
    startTime : {
        type: String,
        required: [true, 'StartTime is required and should have "hh:mm" format'],
        match: [/\d{2}:\d{2}/]
    },
    endTime : {
        type: String,
        required: [true, 'EndTime is required and should have "hh:mm" format'],
        match: [/\d{2}:\d{2}/]
    },
    image : {
        type: String,
        required: [true, 'Image is required'],
    },
    location : {
        type: String,
        required: [true, 'Location is required'],
    },
},
{timestamps:true}
);

// collection name is events
module.exports = mongoose.model('Event',connectionSchema);
const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({


    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ReplyContent: {
        type: String,
        required: true
    }, 
    DateCreated: {
        type: Date,
        required: true,
        default:Date.now()
    },
    RoomID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    }

},{ getters: true });

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
 
    
        Sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        MessageContent: {
            type: String,
            required: true
        }, 
        DateCreated: {
            type: Date,
            required: true,
            default:Date.now()
        },
        Replies:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reply'
              }
        ]
  

},{ getters: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
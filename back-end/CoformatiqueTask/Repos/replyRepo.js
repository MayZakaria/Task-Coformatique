
const User = require('../models/Users');
const Room=require('../models/Rooms');
const Reply=require('../models/Reply');
const RoomRepo=require('../Repos/roomRepo');

module.exports =
{
    
    getAllRepliesByRoomID: async function (roomID)
    {
        replies =  await Reply.find({RoomID:roomID}).populate('RoomID');
        
        return replies;
    },
    notifyReplyOfRoom:async function(reply)
    {
        RoomRepo.addReplyInRoom(reply);
    },
    UpdateReplyById:async function(replyID,msg)
    {
        return await Reply.findByIdAndUpdate(replyID, {ReplyContent: msg});
    },
    DeleteReply:async function(replyID)
      {
        var reply= await Reply.findById(replyID);
        if(reply)
        {
            var room=await Room.findById(reply.RoomID);
            console.log("room",room);
           room.Replies = room.Replies.filter(r => r._id != replyID);
            console.log("room filter",room);
            await room.save();
            reply = await Reply.findByIdAndDelete(replyID); 
           
            return room;
        }
        return null;
    },
    addReply:async function(replyData)
    {
        let reply = new Reply({
            ...replyData  //spread the object
        });
        return reply;

    },
    getReplyByID:async function (replyID)
    {
        return await Reply.findById(replyID);
    }
  
}

const User = require('../models/Users');
const Room=require('../models/Rooms');
const Reply=require('../models/Reply');
const UserRepo=require('../Repos/userRepo');

//var moment = require('moment');

module.exports =
{
    
    getAllRoomsWithReplies: async function ()
    {
        rooms =  await Room.find({}).populate('Sender').populate({
            path: 'Replies',
            model: Reply,
            populate: {
                path: 'Sender',
                model: User
            }
            });       
        //rooms =  await Room.find({}).populate('Sender').populate('Replies.id'); 
        return rooms;
    },

    getRoomById: async function(roomID)
    {
        return await Room.findById(roomID).populate({
            path: 'Replies',
            model: Reply,
            populate: {
                path: 'Sender',
                model: User
            }
            });
    },
    getRoomsByUser: async function(userId)
    {
        return await Room.find({"Sender":userId}).sort({DateCreated: -1}).populate({
            path: 'Replies',
            model: Reply,
            populate: {
                path: 'Sender',
                model: User
            }
            })
    },
    addRoom:async function(roomData)
    {
        let room = new Room({
            ...roomData  //spread the object
        });
        return room;

    },
    notifyUserOfRooms:async function(room)
    {
        UserRepo.AddRoomInUser(room);
    },
   
    UpdateRoomById:async function(roomID,msg)
    {
        return await Room.findByIdAndUpdate(roomID, {MessageContent: msg});
    },
    addReplyInRoom:async function(reply)
    {
       room= await Room.findById(reply.RoomID);
         room.Replies.push(reply._id);
        room = await room.save();
        return room;
    },
    DeleteRoom:async function(roomID)
      {
          console.log("Inside delete room Repo");
        var room= await Room.findById(roomID);
        if(room)
        {
            var user=await User.findById(room.Sender);
            console.log("user",user);
            user.Rooms = user.Rooms.filter(r => r.id != roomID);
            console.log("usersafter filter",user);
            await Reply.deleteMany({RoomID:room._id});
            user = await user.save();
            room= await Room.findByIdAndDelete(roomID); 
           
            return user;
        }
        return null;
      }
  
}
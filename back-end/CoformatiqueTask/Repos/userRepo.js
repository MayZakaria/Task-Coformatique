//const Room = require('../models/Rooms');
const User = require('../models/Users');
const Room=require('../models/Rooms');

module.exports =
{

     GetAllUsers :async function() {

        return await User.find({}).populate('Rooms.id');
    },

    SaveUser: async function(user) {
    
      
        return await user.save();
    },

    GetUserById :async function(Id) {

        return await User.findById(Id).populate('Rooms.id');
    },

    GetUserByIdWithRooms :async function(Id) {

        return await User.findById(Id).populate('Rooms.id');
    },

    GetUserByUsername : async function(username)
    {
         return await User.findOne({Username:username}).populate('Rooms.id');
    },
    CheckIfUsernameExists : async function(username)
    {
          const user = await User.findOne({Username: new RegExp('^'+username+'$', "i")});
          if(user == null)
             return false;
          return true;
    },
    AddRoomInUser:async function(room)
    {
        user= await User.findById(room.Sender);
        user.Rooms.push({"id":room._id});
        user = await user.save();
        return user;
    },
      GetUserByIdWithRooms :async function(Id) {

        return await User.findById(Id).populate('Rooms.id');
    }
}
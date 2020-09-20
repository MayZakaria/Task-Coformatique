const express = require('express');

const Room = require('../models/Rooms'); 
const Reply = require('../models/Reply'); 
const User = require('../models/Users');
const validateUsers = require('../helpers/validateUser');
const validateRooms = require('../helpers/validateRoom');
const validateReplies = require('../helpers/validateReply');
const validateObjectId = require('../helpers/validateObjectId');

const UserRepo=require('../Repos/userRepo');
const RoomRepo=require('../Repos/roomRepo');
const ReplyRepo=require('../Repos/replyRepo');


const router = express.Router();

router.get('/', async (req, res) => {
    const Rooms = await RoomRepo.getAllRoomsWithReplies();
    
    res.send(Rooms);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = validateObjectId(id);
    if (error) {
        console.log("error in Id validatoin")
        return res.status(400).send('Invalid room Id');
    }
    const room = await RoomRepo.getRoomById(id);
    if (!room) {
        console.log("room not found");
        return res.status(404).send('room not found');
    }
    console.log("success");

    res.send(room);
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = validateObjectId(id);
    if (error) {
        console.log("error in Id validatoin")
        return res.status(400).send('Invalid user Id');
    }
    const rooms = await RoomRepo.getRoomsByUser(id);
    if (!rooms) {
        console.log("no rooms found");
        return res.status(404).send('room not found');
    }
    console.log("success");

    res.send(rooms);
});


router.post('/', async (req, res) => {
    const { error } = validateRooms(req.body);
    if (error) {
        console.log(error.details);
        return res.status(400).send( error.details);
    }

    let room = await RoomRepo.addRoom(req.body);
    room = await room.save();

    //mapping room in User's rooms []
    await RoomRepo.notifyUserOfRooms(room);

    room = await RoomRepo.getRoomById(room._id);
    res.send(room);
});


router.patch('/:id', async (req, res) => {
    //Step1: ValidateId
    let { id } = req.params;
    let { error } = validateObjectId(id);
    if (error) {
        console.log(error.details);
        return res.status(400).send('Invalid id');
    }
    let room = await RoomRepo.getRoomById(id);
   
    if(room != null)
    {
        if(req.body.MessageContent != undefined)
        {
            room = await RoomRepo.UpdateRoomById(id,req.body.MessageContent);
            console.log("room Successfully Updated!");
            res.send(room);

        }
    }
    else
    {
        console.log(error.details);
        return res.status(404).send('room resource not found!');
    }
   
    
});

router.delete('/:id', async (req, res) => {

    let { id } = req.params;
    let { error } = validateObjectId(id);
    if (error) {

        return res.status(400).send('Invalid id');
    }
    let room = await Room.findById(id);
    if (room == null) {
        return res.status(404).send('room resource not found!');
    }
    else
    {
        console.log("Delete Room..")
        room = await RoomRepo.DeleteRoom(id);
        return res.status(200).send('room is successfully deleted');
    }
})


module.exports = router;
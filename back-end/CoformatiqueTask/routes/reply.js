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
const validateReply = require('../helpers/validateReply');


const router = express.Router();

//get reply by roomid
router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params;
    const { error } = validateObjectId(roomId);
    if (error) {
        console.log("error in Id validatoin")
        return res.status(400).send('Invalid reply Id');
    }
    const reply = await ReplyRepo.getAllRepliesByRoomID(roomId);
    if (!reply) {
        console.log("reply not found");
        return res.status(404).send('reply not found');
    }
    console.log("success");

    res.send(reply);
});


//insert reply
router.post('/', async (req, res) => {
    const { error } = validateReply(req.body);
    if (error) {
        console.log(error.details);
        return res.status(400).send( error.details);
    }

    let reply = await ReplyRepo.addReply(req.body);
    reply = await reply.save();

    //mapping room in User's rooms []
    reply= await ReplyRepo.notifyReplyOfRoom(reply);
    res.send(reply);
});


//PATCH Replies/id
router.patch('/:id', async (req, res) => {
    //Step1: ValidateId
    let { id } = req.params;
    let { error } = validateObjectId(id);
    if (error) {
        console.log(error.details);
        return res.status(400).send('Invalid id');
    }
    let reply = await ReplyRepo.getReplyByID(id);
   
    if(reply != null)
    {
        if(req.body.ReplyContent != undefined)
        {
            reply = await ReplyRepo.UpdateReplyById(id,req.body.ReplyContent);
            console.log("reply Successfully Updated!");
            res.send(reply);

        }
    }
    else
    {
        console.log(error.details);
        return res.status(404).send('reply resource not found!');
    }
   
    
});


// DELETE Replies/id
router.delete('/:id', async (req, res) => {

    let { id } = req.params;
    let { error } = validateObjectId(id);
    if (error) {

        return res.status(400).send('Invalid id');
    }
    let reply = await Reply.findById(id);
    if (reply == null) {
        return res.status(404).send('reply resource not found!');
    }
    else
    {
        console.log("Delete reply..")
        reply = await ReplyRepo.DeleteReply(id);
        return res.status(200).send('reply is successfully canceled');
    }
})


module.exports = router;
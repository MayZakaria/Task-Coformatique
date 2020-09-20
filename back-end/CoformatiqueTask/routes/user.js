const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config');
const AuthorizationMiddleware = require('../middlewares/authorization');

const Room = require('../models/Rooms'); 
const User = require('../models/Users');
const validateUsers = require('../helpers/validateUser');
const validateRooms = require('../helpers/validateRoom');
const validateObjectId = require('../helpers/validateObjectId');

const UserRepo = require('../Repos/userRepo');

const router = express.Router();

router.get('/', async (req, res) => {
    const Users = await UserRepo.GetAllUsers();
    res.send(Users);
});

router.get('/ValidateUsername/:username', async (req, res) => {
    let { username } = req.params;
    if(username == null)
      return res.status(400).send("Username is not sent");
   
    value = await UserRepo.CheckIfUsernameExists(username) ;
    res.status(200).send({'exists':value});
});


//get user's Rooms (view history)
router.get('/User/Rooms',AuthorizationMiddleware.verifyToken, async (req, res) => {
    console.log("Routes UserInfo",req.user);
    const  userId  = req.user.id;
    const { error } = validateObjectId(userId);
    if (error) {
        console.log("error in Id validation")
        return res.status(400).send('Invalid user Id');
    }

    let user = await UserRepo.GetUserByIdWithRooms(userId);
    res.status(200).send(user.Rooms);
});

router.post('/', async (req, res) => {
    console.log("Post user")
    const { error } = validateUsers(req.body);
    if (error) {
        console.log(error.details);
        return res.status(400).send(error.details);
    }

    let user = new User({
        ...req.body
    });

    console.log("After Hash", user);
    user = await UserRepo.SaveUser(user);
    console.log("FullName",user.FullName);
    res.status(201).send(user);
});


router.get('/User/Rooms/:roomId',AuthorizationMiddleware.verifyToken, async (req, res) => {
    console.log("Routes UserInfo",req.user);
    const  userId  = req.user.id;
    const { roomId } = req.params;
    const { error } = validateObjectId(userId);
    if (error) {
        console.log("error in Id validation")
        return res.status(400).send('Invalid user Id');
    }
    console.log("Room Id :", roomId);

    let user = await UserRepo.GetUserById(userId);

    var roomExists = user.Rooms.find(r => r.id == roomId);//check status or not??
    console.log("roomExists:", roomExists);
    if (roomExists) {
        let room = await Rooms.findOne({ "_id": roomId }).populate( {
            path: 'Replies',
            model: Reply,
            populate: {
                path: 'Sender',
                model: Users
            }
        });
        console.log('room Resource is found', room);
        res.status(200).send(room);
    }
    else
        res.status(404).send("room resource is not found!");

});


//Signing In a user
router.post('/Login', async (req, res) => {
    console.log("server is hit");
    const username = req.body.Username;
    const password = req.body.Password;
    let user = await UserRepo.GetUserByUsername(username);
    console.log("user",user);
    if (user!=null) {
        console.log("inside if");
        bcrypt.compare(password, user.Password, async (err, isMatched) => {
            if (isMatched) {
                console.log("isMatched");
                const payload = { id: user._id, username: user.Username };//holds user info/details
                console.log("payload", payload);

                jwt.sign({ user: payload }, SECRET_KEY, { expiresIn: 36000 }, (err, token) => {
                    
                        if (err) 
                            console.log("Error",err.details);
                        if (token)
                        { 
                             console.log(" if (token)",token);
                            res.status(200).json({ mess: "Signed In Successfully", tokenCreated: token});
                            
                        }
                        else
                        {
                            console.log("else");

                             res.status(200).json("Valid Password But error occurred while creating token! ");
                        }
                    });


            }
            else {
                return res.status(400).send("Invalid Password!");
            }
        });
    }
    else {
        return res.status(404).send("User not found!")
    }

});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');

 const UsersRouter = require('./routes/user');
 const RoomsRouter = require('./routes/room');
 const RepliesRouter = require('./routes/reply');


var cors = require('cors');


const app = express();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/Guestbook';
const port = process.env.PORT || 3000;
    
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());//for form req body

app.use('/Users', UsersRouter);
app.use('/Rooms', RoomsRouter);
app.use('/Replies', RepliesRouter);


 
 mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true})
 .then(result => {
    console.log('Connected to MongoDB...')
    app.listen(port, () => console.log(`Server listens on port ${port}`));
 })
 .catch(err => {
   console.log(err);
 });


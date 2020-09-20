const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const rooomSchema = Joi.object({

    Sender: Joi.objectId().required(),
    MessageContent: Joi.string().min(2).max(1000).required(),
    DateCreated: Joi.date().default(Date.now()),  
    //Replies:Joi.array().items(Joi.objectId()).default([])
    Replies:Joi.array().default([])

});

const validateRoom = room => rooomSchema.validate(room, { abortEarly: false });

module.exports = validateRoom;
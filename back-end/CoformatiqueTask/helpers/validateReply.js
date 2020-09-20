const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const replySchema = Joi.object({
    RoomID: Joi.objectId().required(),
    Sender: Joi.objectId().required(),
    ReplyContent: Joi.string().min(2).max(1000).required(),
    DateCreated: Joi.date().default(Date.now()),   
});

const validateReply = reply => replySchema.validate(reply, { abortEarly: false });

module.exports = validateReply;
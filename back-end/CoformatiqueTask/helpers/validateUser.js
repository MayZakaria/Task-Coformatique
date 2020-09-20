const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = Joi.object({
    FirstName: Joi.string().regex(/^[a-zA-Z-]*$/),
    LastName: Joi.string().regex(/^[a-zA-Z-]*$/),
    Username: Joi.string().regex(/^[a-z0-9_-]{3,16}$/).required(),
    Password: Joi.string().min(8).max(16).required(),
    Rooms:Joi.array().items({id:Joi.objectId()}).default([])
});

const validateUser = user => userSchema.validate(user, { abortEarly: false });

module.exports = validateUser;
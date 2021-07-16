//const { Schema, model, models } = require('mongoose');


import mongoose, { Schema, model, models } from 'mongoose';

const ChannelSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },    
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]

})

//module.exports = model('Channel', ChannelSchema);

//export default model('Channel', ChannelSchema);


export default models.Channel || model('Channel', ChannelSchema)

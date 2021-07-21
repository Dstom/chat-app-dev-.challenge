const { Schema, model } = require('mongoose');


import mongoose from 'mongoose';

const MessageSchema = Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

MessageSchema.methods.saveAndPopulate = function(doc) {
    return doc.save().then(doc => doc.populate('sender').execPopulate())
};

//module.exports = model('Message', MessageSchema);

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)

//const { Schema, model } = require('mongoose');

import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }],
    profile: {
        type: String
    },
    cloudinary_id: {
        type: String
    }

})


//module.exports = model('User', UserSchema);

export default mongoose.models.User || mongoose.model('User', UserSchema)

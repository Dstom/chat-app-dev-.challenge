import Pusher from "pusher";
import {
    getSession
} from "next-auth/client";


import Channel from "../../../models/Channel";
import Message from '../../../models/Message';
import User from '../../../models/User';


export const pusher = new Pusher({
    appId: process.env.app_id,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster
});

export default async function handler(req, res) {

    const {
        message,
        channelId
    } = req.body;

    const session = await getSession({
        req: req
    });
    if (!session) {
        res.status(401).json({
            message: 'Not authenticated'
        });
        return;
    }

    if (!message || !channelId) {
        return;
    }

    /* Find the user  */
    const userEmail = session.user.email;
    const user = await User.findOne({
        email: userEmail
    });

    /* Creating message */
    const messageToBd = new Message();
    messageToBd.text = message;
    messageToBd.sender = user._id;
    messageToBd.channel = channelId;

    const messageSaved = await messageToBd.save();
    const messageFound = await Message.populate(messageSaved, 'sender');

    await pusher.trigger(`chat${channelId}`, "chat-event", {
        _id: messageFound._id,
        date: messageFound.date,
        text: messageFound.text,
        sender: messageFound.sender,
        channel: messageFound.channel
    });

    /* Adding message to channel */
    await Channel.findByIdAndUpdate(channelId, {
        "$push": {
            "messages": messageSaved._id
        }
    });
    res.json({
        message: "completed"
    });
}
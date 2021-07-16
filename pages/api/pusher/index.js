import Pusher from "pusher";
import { getSession } from "next-auth/client";


import Channel from "../../../models/Channel";
import Message from '../../../models/Message';
import User from '../../../models/User';


export const pusher = new Pusher({
    appId: process.env.app_id,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true,
});

export default async function handler(req, res) {

    const { message, channelId } = req.body;

    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }
    /* Find the user  */
    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail });
    /* Creating message */

    const messageToBd = new Message();
    messageToBd.text = message;
    messageToBd.sender = user._id;
    messageToBd.channel = channelId;

    const messageSaved = await messageToBd.save();

    //   messageSaved.popuplate('sender').execPopulate();
    /* Adding message to channel */
    const channel = await Channel.findById({ _id: channelId });
    channel.messages.push(messageSaved._id);


    const messageFinded = await Message.findById({ _id: messageSaved._id }).populate('sender').lean();
    
    await pusher.trigger(`chat${channelId}`, "chat-event", {
        ...messageFinded
    });


    res.json({ message: "completed" });
}


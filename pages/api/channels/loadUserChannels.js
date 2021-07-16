import { getSession } from "next-auth/client";
import Channel from "../../../models/Channel";
import User from '../../../models/User';

import dbConnect from '../../../lib/dbConnect';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    await dbConnect();

    // const channel = new Channel(req.body);

    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }
    const userEmail = session.user.email;

    const user = await User.findOne({ email: userEmail });

    // const user = await User.findOne({ email: userEmail }).populate('channels', 'name description').exec();
    /* const channels = await Channel.find().select('name description members').lean().map(channel => {
         console.log(channel);
         return channel.map(chan => {
             console.log(user._id_, chan.members.includes(user._id));
             return chan.members.includes(user._id) ? { ...chan, isMember: true } : { ...chan, isMember: false }
         }
         )
         ///return channel == null ? channel : (channel.members.includes(user._id) ? { channel, isMember: true } : { channel, isMember: false });
     });*/

    const userChannelIsMember = await Channel.find({ "members": { "$in": [user._id] } }).populate('members').lean();
    const userChannelIsNotMember = await Channel.find({ "members": { "$nin": [user._id] } }).populate('members').lean();

    const userChannelsMapped = userChannelIsMember.map(channel => {
        return { ...channel, isMember: true }
    });

    const userChannelIsNotMapped = userChannelIsNotMember.map(channel => {
        return { ...channel, isMember: false }
    })

    res.status(201).json({
        ok: true,
        channels: [...userChannelsMapped, ...userChannelIsNotMapped]
    });

}

export default handler;
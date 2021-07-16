import { getSession } from "next-auth/client";
import Channel from "../../../models/Channel";
import User from '../../../models/User';

import dbConnect from '../../../lib/dbConnect';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    await dbConnect();

    const { name, description } = req.body;
    console.log(name, description);

    const channel = new Channel(req.body);

    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }
    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail }).exec();

    channel.members.push(user._id);

    const channelAdded = await channel.save();

    //Update Adding channel to User Channel's
    user.channels.push(channelAdded._id);

    const userUpdated = await user.save();
    //Find the created channel and populate 
    const channelFound = await Channel.findById({ _id: channelAdded._id }).populate('members').lean();

    res.status(201).json({
        ok: true,
        channelAdded: {
            ...channelFound,
            isMember: true
        }
    });

}

export default handler;
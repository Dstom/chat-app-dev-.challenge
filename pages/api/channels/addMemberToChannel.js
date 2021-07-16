import { getSession } from "next-auth/client";
import Channel from "../../../models/Channel";
import User from '../../../models/User';

import dbConnect from '../../../lib/dbConnect';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    await dbConnect();

    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }

    const userEmail = session.user.email;

    const { id } = req.body;
    
    console.log(id);
    //Updated user and channel

    const userUpdated = await User.findOneAndUpdate(
        { "email": userEmail },
        { "$push": { "channels": id } },
        { "new": true }
    ).exec();

    console.log(userUpdated);

    await Channel.findByIdAndUpdate(id,
        { "$push": { "members": userUpdated._id } },
        { "new": true }
    );

    res.status(201).json({
        ok: true,
        userUpdated
    });

}

export default handler;
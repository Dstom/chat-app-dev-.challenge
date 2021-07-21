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

    const userUpdated = await User.findOne({ "email": userEmail });

    // const userUpdated = await User.findOneAndUpdate({ "email": userEmail }, { "$addToSet": { "channels": id } });
    /* const channelUpdated = await Channel.findByIdAndUpdate(id,
         { "$addToSet": { "members": userUpdated._id } },
         { "new": true }
     )*/

    const channelUpdated = await Channel.updateOne({ "_id": id },
        { "$addToSet": { "members": userUpdated._id } },
    )
    if (channelUpdated && channelUpdated.nModified === 0) {
        return res.status(200).json({
            ok: false,
            message: 'User is already in this channel'
        })
    }

    res.status(201).json({
        ok: true,
        userUpdated
    });

    /*const userUpdated = await User.findOneAndUpdate(
        { "email": userEmail },
        { "$push": { "channels": id } },
        { "new": true }
    ).exec();

    console.log(userUpdated);

    await Channel.findByIdAndUpdate(id,
        { "$push": { "members": userUpdated._id } },
        { "new": true }
    );*/
}

export default handler;
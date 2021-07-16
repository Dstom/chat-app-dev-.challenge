import { getSession } from "next-auth/client";
import Channel from "../../../models/Channel";
import User from '../../../models/User';
import Message from '../../../models/Message'

import dbConnect from '../../../lib/dbConnect';

const handler = async (req, res) => {

    if (req.method !== 'POST') {
        return;
    }

    await dbConnect();

    const { channelId } = req.body;

    const messagesBd = await Message.find({ channel: channelId }).populate('sender');

    res.json(messagesBd);
}

export default handler;
const cloudinary = require('../../../lib/cloudinary');

import formidable from 'formidable-serverless';
import User from "../../../models/User";
import dbConnect from '../../../lib/dbConnect';
import { getSession } from "next-auth/client";


async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }

    await dbConnect();

    const email = session.user.email;

    const user = await User.findOne({ "email": email })

    res.json({
        ok: true,
        username: user.username,
        email: user.email,
        avatar: user.profile
    })


}

export default handler;
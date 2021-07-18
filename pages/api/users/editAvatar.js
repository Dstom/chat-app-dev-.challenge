const cloudinary = require('../../../lib/cloudinary');

import formidable from 'formidable-serverless';
import User from "../../../models/User";
import dbConnect from '../../../lib/dbConnect';
import { getSession } from "next-auth/client";



export const config = {
    api: {
        bodyParser: false,
    },
}

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

    const form = new formidable.IncomingForm();

    const resultEditAvatar = await new Promise((resolve, reject) => {
        form.parse(req, async function (err, field, file) {
            if (err) {
                reject(err)
            }
            try {
                const userEmail = session.user.email;

                const userFound = await User.findOne({ "email": userEmail });
                //Delete cloudinary image
                await cloudinary.uploader.destroy(userFound.cloudinary_id);
                //Upload new image
                const resultUploadImage = await cloudinary.uploader.upload(file.image.path);

                //Updating user
                userFound.cloudinary_id = resultUploadImage.public_id;
                userFound.profile = resultUploadImage.secure_url;

                const userUpdated = await userFound.save();                

                resolve(res.status(201).json({
                    ok: true,
                    message: 'Avatar updtaed!',
                    avatar: userUpdated.profile
                }));

            } catch (error) {
                console.log("error", error);
            }
        });

    })
    return resultEditAvatar;

}

export default handler;
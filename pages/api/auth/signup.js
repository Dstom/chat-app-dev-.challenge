import { hashPassword } from "../../../lib/auth";

const cloudinary = require('../../../lib/cloudinary');


import formidable from 'formidable-serverless';
import User from "../../../models/User";
import Channel from "../../../models/Channel";
import dbConnect from '../../../lib/dbConnect';


export const config = {
    api: {
        bodyParser: false,
    },
}

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }
    await dbConnect();

    const form = new formidable.IncomingForm();

    const resultCreatedUser = await new Promise((resolve, reject) => {
        form.parse(req, async function (err, field, file) {
            if (err) {
                reject(err)
            }
            try {
                const result = await cloudinary.uploader.upload(file.image.path);
                const { email, password, username } = field;

                if (!email || !email.includes('@') || !password || password.trim().length < 7) {
                    reject(res.status(422).json({ message: 'Invalid Input' }));
                }


                const existingUser = await User.findOne({ email: email });
                if (existingUser) {
                    reject(res.status(422).json({ nessage: 'user exists already' }))
                }

                const hashedPassword = await hashPassword(password);

                const welcomeChannel = await Channel.findById({ _id: '60eb591160a06d4e10403948' });

                /* Creating User*/
                const newUser = new User();
                newUser.email = email;
                newUser.password = hashedPassword;
                newUser.cloudinary_id = result.public_id;
                newUser.profile = result.secure_url;
                newUser.username = username;
                /* Adding WELCOME Channel to user*/
                newUser.channels.push(welcomeChannel._id);

                const userSaved = await newUser.save();
                /* Adding user to WELCOME Channel*/
                welcomeChannel.members.push(userSaved._id);
                /* Saving user to channel*/
                await welcomeChannel.save();

                resolve(res.status(201).json({
                    ok: true,
                    message: 'Created user!'
                }));

            } catch (error) {
                console.log(error);
            }
        });

    })
    return resultCreatedUser;

}

export default handler;
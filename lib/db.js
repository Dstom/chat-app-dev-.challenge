import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://mern_user:zl1YzBCydtYUMSyy@cluster0.l4kqh.mongodb.net/mern_chat_group');
    return client;
}


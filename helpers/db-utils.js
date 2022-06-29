import { MongoClient } from 'mongodb';

export async function connectDatabase(){
    const connetionString= `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.asgrjbd.mongodb.net/test1?retryWrites=true&w=majority`
    const client = await MongoClient.connect(connetionString);
    return client;
}

export async function insertDocument(client, collection, document){
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}
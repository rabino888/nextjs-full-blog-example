import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler (req, res) {    
    if(req.method === 'POST'){
        const emailRegex = /\S+@\S+\.\S+/;
        const { name, email, comment } = req.body;
        // console.log(name);
        // console.log(email);
        // console.log(comment);

        let client;
        try {
            //import
            client = await connectDatabase();
        } catch(error){
            res.status(500).json({
                message: 'failed to connect to database',
                status: 'error',
                username: process.env.mongodb_username,
                password: process.env.mongodb_password,
                clustername: process.env.mongodb_clustername
            });
            return;
        }     

        if (
            !email ||
            email.trim() === '' ||
            !emailRegex.test(email) ||
            !name ||
            name.trim() === '' ||
            !comment ||
            comment.trim() === ''
        ) {
            res.status(422).json({message: 'Invalid inputs', status: 'error'});
            client.close();
            return;
        }
        const newComment = {
            email,
            name,
            comment
        };

        let insertedComment;
        try {
            insertedComment = await insertDocument(client, 'comments', newComment);
            newComment.id = insertedComment.insertedId;
            // console.log(insertedComment);
            return res.status(201).json({message: 'This was a success', status: 'success', newComment: newComment});
        } catch (error) {
            res.status(500).json({message: 'inserting data failed', status: 'error'});
        }
        // const db = client.db();
        // const insertComment = await db.collection('comments').insertOne(newComment);
        // console.log(insertComment);
        client.close();
    }

}

export default handler;
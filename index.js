const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, Transaction } = require('mongodb');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



// user = eventHandler
// pass = 7BNNZxiYwmqs3NNr

// =-------------------------- from my DB


const uri = "mongodb+srv://eventHandler:7BNNZxiYwmqs3NNr@cluster0.nikeevp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// --------------------------------------------

async function run() {
    try {
        await client.connect();


        const eventCollection = client.db("eventHandler").collection("event");

        app.get('/api/v3/app', async (req, res) => {
            const uid = req.query.uid;
            const query = { uid: uid };
            const result = await eventCollection.findOne(query);
            res.send(result);
        })

        app.get('/api/v3/app/eventCount', async (req, res) => {
            const count = await eventCollection.estimatedDocumentCount();
            res.send({ count });
        })


        app.get('/api/v3/app/latestEvents', async (req, res) => {
            const page = parseInt(req.query.page);
            const query = {};
            const cursor = eventCollection.find(query);
            const result = await cursor.skip(page * 5).limit(5).toArray();
            const reversedResult = result.reverse();
            // const events = .reversedResult;
            res.send(reversedResult);
        })

        app.delete('/api/v3/app/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { uid: uid };
            const result = await eventCollection.deleteOne(query);
            res.send(result);
        })

        app.post('/api/v3/app/newEvent', async (req, res) => {
            const newEvent = req.body;
            const result = await eventCollection.insertOne(newEvent);
            res.send(result);
        })

        app.put('/api/v3/app/updateEvent', async (req, res) => {
            const id = req.query.uid;
            const { type, uid, name, tagline, schedule, description, image, moderator, category, sub_category, rigor_rank } = req.body;
            const filter = { uid: id };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    type: type,
                    uid: uid,
                    name: name,
                    tagline: tagline,
                    schedule: schedule,
                    description: description,
                    image: image,
                    moderator: moderator,
                    category: category,
                    sub_category: sub_category,
                    rigor_rank: rigor_rank
                }
            };
            const result = await eventCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running ')
})
app.listen(port, () => {
    console.log('crud is running')
})
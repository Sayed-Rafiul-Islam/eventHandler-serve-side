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
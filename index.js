const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dgqch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);
// console.log(client)


async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');
        const database = client.db('Doctor_Client_Portal');
        const appointmentsCollection = database.collection('appointments');
        const usersCollection = database.collection('users');

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello Assignment 12!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
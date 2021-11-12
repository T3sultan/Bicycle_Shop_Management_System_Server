const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const cors = require('cors');
require('dotenv').config();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dgqch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);
// console.log(client)


async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');
        const productsCollection = client.db("Bicycle_Sales").collection("products");
        const usersCollection = client.db("Bicycle_Sales").collection("users");
        const ordersCollection = client.db("Bicycle_Sales").collection("orders");
        const reviewCollection = client.db("Bicycle_Sales").collection("review");


        //add productsCollection
        app.post("/addProducts", async (req, res) => {
            console.log(req.body);
            const result = await productsCollection.insertOne(req.body);
            res.send(result);
        });
        // get all products
        app.get("/allProducts", async (req, res) => {
            const result = await productsCollection.find({}).toArray();
            res.send(result);
        });

        // single service
        app.get("/singleProducts/:id", async (req, res) => {
            console.log(req.params.id);
            const result = await productsCollection
                .find({ _id: ObjectId(req.params.id) })
                .toArray();
            res.send(result[0]);
            console.log(result);
        });
        // insert order and

        app.post("/placeOrders", async (req, res) => {
            const result = await ordersCollection.insertOne(req.body);
            res.send(result);
        });
        //  my order

        app.get("/myOrder/:email", async (req, res) => {
            console.log(req.params.email);
            const result = await ordersCollection
                .find({ email: req.params.email })
                .toArray();
            res.send(result);
        });
        // review
        app.post("/addReview", async (req, res) => {
            const result = await reviewCollection.insertOne(req.body);
            res.send(result);
        });

           // get all review
           app.get("/reviewItem", async (req, res) => {
            const result = await reviewCollection.find({}).toArray();
            res.send(result);
        });




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
const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000


// Middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9s2cu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);



async function run() {
    try {
        await client.connect()
        // console.log("database connected")
        const database = client.db("deshi-restaurant");
        const breakfastCollection = database.collection("breakfast");
        const lunchCollection = database.collection("lunch");
        const dinnerCollection = database.collection("dinner");

        app.post('/breakfast', async (req, res) => {
            const breakfast = req.body;
            // console.log('hit the post api', breakfast);
            const result = await breakfastCollection.insertOne(breakfast);
            // console.log(result);
            res.json(result)
        });
        app.post('/lunch', async (req, res) => {
            const lunch = req.body;
            console.log('hit the post api', lunch);
            const result = await lunchCollection.insertOne(lunch);
            console.log(result);
            res.json(result)
        });
        app.post('/dinner', async (req, res) => {
            const dinner = req.body;
            console.log('hit the post api', dinner);
            const result = await dinnerCollection.insertOne(dinner);
            console.log(result);
            res.json(result)
        });
        app.get('/breakfast', async (req, res) => {
            const cursor = breakfastCollection.find({});
            const breakfast = await cursor.toArray();
            res.send(breakfast);
        });
        app.get('/lunch', async (req, res) => {
            const cursor = lunchCollection.find({});
            const lunch = await cursor.toArray();
            res.send(lunch);
        });
        app.get('/dinner', async (req, res) => {
            const cursor = dinnerCollection.find({});
            const dinner = await cursor.toArray();
            res.send(dinner);
        });

        app.delete('/dinner/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dinnerCollection.deleteOne(query);
            res.json(result);
        })
        app.delete('/breakfast/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await breakfastCollection.deleteOne(query);
            res.json(result);
        })
        app.delete('/lunch/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await lunchCollection.deleteOne(query);
            res.json(result);
        })
        app.get('/dinner/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const dinner = await dinnerCollection.findOne(query);
            res.json(dinner);
        });
        app.get('/breakfast/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const breakfast = await breakfastCollection.findOne(query);
            res.json(breakfast);
        });
        app.get('/lunch/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const lunch = await lunchCollection.findOne(query);
            res.json(lunch);
        });
        app.put('/dinner/:id', async (req, res) => {
            const id = req.params.id;
            console.log('updating', id)
            const updatedDinner = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedDinner.name,
                    price: updatedDinner.price,
                    img: updatedDinner.img,


                },
            };
            const result = await dinnerCollection.updateOne(filter, updateDoc, options)
            console.log('updating', id)
            res.json(result)


        });
        app.put('/breakfast/:id', async (req, res) => {
            const id = req.params.id;
            console.log('updating', id)
            const updatedBreakfast = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedBreakfast.name,
                    price: updatedBreakfast.price,
                    img: updatedBreakfast.img,


                },
            };
            const result = await breakfastCollection.updateOne(filter, updateDoc, options)
            console.log('updating', id)
            res.json(result)


        });
        app.put('/lunch/:id', async (req, res) => {
            const id = req.params.id;
            console.log('updating', id)
            const updatedLunch = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedLunch.name,
                    price: updatedLunch.price,
                    img: updatedLunch.img,


                },
            };
            const result = await lunchCollection.updateOne(filter, updateDoc, options)
            console.log('updating', id)
            res.json(result)


        });

    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Deshi Restaurant Server Running');
})

app.listen(port, () => {
    console.log("Running Deshi Restaurant Server:", port)
})
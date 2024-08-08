// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/wishlist', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('wishlist');
    const { destinationName, location, photo, description } = req.body;

    await collection.insertOne({ destinationName, location, photo, description });
    res.status(201).json({ message: 'Destination added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding destination to wishlist', error });
  }
});

app.get('/wishlist', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('wishlist');
    const wishlist = await collection.find({}).toArray();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
});

app.put('/wishlist/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('wishlist');
    const { id } = req.params;
    const { destinationName, location, photo, description } = req.body;

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { destinationName, location, photo, description } });
    res.status(200).json({ message: 'Destination updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating destination', error });
  }
});

app.delete('/wishlist/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('wishlist');
    const { id } = req.params;

    await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

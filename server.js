const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const App = express();
App.use(bodyParser.json());
//const dotenv = require('dotenv');
//dotenv.config({ path: './backend/config/config.env' });

mongoose.set('strictQuery', true);

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost/react-shopping-cart-db',
  () => console.log('Databse connected')
);
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);
App.get('/api/products', async (_req, res) => {
  const products = await Product.find({});
  res.send(products);
});
App.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});
App.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const PORT = process.env.PORT || 5000;
App.listen(PORT, () => console.log(`server is running on ${PORT}`));
///////////////////////////////////////////////////
/*const dotenv = require('dotenv');
dotenv.config({ path: './backend/config/config.env' });

//-----connection----
//const db = process.env.db_con; (makinche)


App.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

App.post('/api/orders', async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
App.get('/api/orders', async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
App.delete('/api/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

App.use('/', express.static(__dirname + '/build'));
App.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'));*/

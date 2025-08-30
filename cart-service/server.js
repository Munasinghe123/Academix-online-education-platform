const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" })); 
app.use(express.json());
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const cartRoutes = require('./routes/CartRoutes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/cart/', cartRoutes);



mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log('cart Database connected'))
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));


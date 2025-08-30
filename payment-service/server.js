
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose=require('mongoose');

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/payment", require("./routes/webhookRoutes"));


app.use(express.json());


app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/payment",require('./routes/enrollmentRoutes'))
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log('payment Database connected'))
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running at port ${PORT}`));
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require('./config/db.js')
const cors = require("cors");
const slotRoutes = require("./Routes/appointment.Route"); 
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());

const corsOptions = {
  origin: 'https://mannam-syndeo-ui.vercel.app/', // Allow specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true // Include credentials if needed
};

app.use(cors());
app.use(bodyParser.json());

// Use the slotRoutes
app.use("/api", slotRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports=app;
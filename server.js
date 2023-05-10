const express = require ("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./dbConnect/connectDB");


// dotenv.congig
dotenv.config();

// db conn
connectDb();

// rest object
const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
});

app.use("/api/mentor", require("./routes/mentorRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));

app.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${ PORT }`))
const cors = require("cors");
require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

const notesRoutes = require("./routes/notesRoutes");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "My Notes Backend is Running"
    });
});

app.use("/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);
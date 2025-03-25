const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user-routes");
const taskRoutes = require("./routes/task-routes");
const connectDB = require('./config/database');
require('dotenv').config(); 



const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

connectDB(); 
app.use("/api/v1/user" , userRoutes);
app.use("/api/v1/task" , taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Todo App API!");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


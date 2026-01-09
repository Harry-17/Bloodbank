const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/bloodbank", require("./routes/bloodbankRoutes"));
app.use("/api/user", require("./routes/userRoutes"));




app.listen(5000, () => console.log("Server running on 5000"));

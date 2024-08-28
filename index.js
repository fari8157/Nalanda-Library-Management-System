require('dotenv').config();

const express = require('express');
const app = express();
const connectDB=require("./config/db")
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reportRoutes = require("./routes/reportRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const job = require("./config/job");
job.start();

connectDB()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/borrow", borrowRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
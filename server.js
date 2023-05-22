const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const port = process.env.PORT || 5000;

connectDb();
app.use(express.json());

app.use("/contacts", require("./routes/contactRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});

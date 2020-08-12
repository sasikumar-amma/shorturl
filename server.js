const express = require("express");
const { PORT, MONGODB_URL } = require("./Config");
const app = express();
const { connect } = require("mongoose");

connect(
  MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("database connected");
  }
);

app.use(express.json({ extended: false }));

//load Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is running on port " + PORT);
});
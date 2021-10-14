require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

/* Setup Middleware */

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* Setup Routes */

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* Start Server */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}/\n`);
});
const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
      "Access-Control-Request-Method",
    ],
    credentials: true,
  })
);

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// Export the app for Vercel
module.exports = (req, res) => {
  db();
  app(req, res);
};

if (process.env.NODE_ENV !== "production") {
  const server = () => {
    db();
    app.listen(PORT, () => {
      console.log("listening to port:", PORT);
    });
  };

  server();
}

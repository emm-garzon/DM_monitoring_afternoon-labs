const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// ROLLBAR START

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "8a1420a47a6a407ca3131fc794674a38",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
  rollbar.info("html file served successfully.");
});

let inputText = [];

app.post("/user", (req, res) => {
  let { input } = req.body;
  inputText.push(input);
  rollbar.log("Successfully received input text");
  res.status(200).send(inputText);
});

try {
  nonExistentFunction();
} catch (error) {
  rollbar.error(error);
}
try {
  nonExistentFunction();
} catch (error) {
  rollbar.critical("critical error");
}
try {
  nonExistentFunction();
} catch (error) {
  rollbar.warning("im warning you!");
}

app.use(rollbar.errorHandler());

// ROLLBAR END

const port = process.env.PORT || 4545;

app.listen(port, () => {
  console.log(`Take us to warp ${port}`);
});

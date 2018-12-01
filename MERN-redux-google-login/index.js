const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
var sslRedirect = require("heroku-ssl-redirect");
var enforce = require("express-sslify");

const https = require("https");
const http = require("http");
var fs = require("fs");

// Load User Model
require("./models/User");

// Passport Config
require("./config/passport")(passport);

// Load Routes
const auth = require("./routes/auth");

// Load Keys
const keys = require("./config/keys");

console.log("BROOOO");
console.log(keys.mongoURI);

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

app.use(cookieParser());

// Body parser middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: "anything",
    resave: false,
    saveUninitialized: false
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use Routes
app.use("/auth", auth);
// app.use("/api/questions", questions);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

const port = process.env.PORT || 5000;

var httpServer = http.createServer(app);

httpServer.listen(port);

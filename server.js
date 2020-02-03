var express = require("express");
var mongoose = require("mongoose");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
let User = require("./models/userModel")

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/employerdb", { useNewUrlParser: true });

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/portfolio", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/portfolio.html"));
});

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
  // Create a new user using req.body
console.log(req.body);

  
  var user = new User(req.body);
  // Log any errors
  User.create(user)
  .then(function(User) {
    // If saved successfully, send the the new User document to the client
    res.json(User);
  })
  .catch(function(err) {
    // If an error occurs, send the error to the client
    res.json(err);
  });
 
  // user.setFullName();
  // user.lastUpdatedDate();
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


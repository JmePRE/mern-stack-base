"use strict";

//https://kb.objectrocket.com/mongo-db/create-react-app-with-mongodb-part-2-building-the-backend-900
var express = require('express');

var app = express();

var cors = require('cors');

var PORT = 4000;

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

app.use(cors());
var router = express.Router();
app.use("/", router);
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
var connectionString = "mongodb+srv://root:yodafoundation@cluster0.vw5yg.mongodb.net/todo-lists?retryWrites=true&w=majority";
MongoClient.connect(connectionString, {
  useUnifiedTopology: true
}).then(function (client) {
  console.log("Connected to Database");
  var db = client.db('todo-lists'); //specify collection

  var todosCollection = db.collection('todos');
  console.log(todosCollection); //CRUD Methods----------------------------------------------------------------
  //GET request

  app.get('/', function (req, res, next) {
    //res.send("Hello World")
    //for static files: res.sendFile(__dirname + "/index.html");
    todosCollection.find().toArray() //sends in results as 'quotes'
    .then(function (results) {
      res.send(results);
    })["catch"](function (error) {
      return console.error(error);
    });
  });
})["catch"](function (error) {
  return console.error(error);
}); //nodemon index.js to start
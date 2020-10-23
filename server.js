//https://kb.objectrocket.com/mongo-db/create-react-app-with-mongodb-part-2-building-the-backend-900

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
app.use("/", router);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
  });

var connectionString = "mongodb+srv://root:yodafoundation@cluster0.vw5yg.mongodb.net/todo-lists?retryWrites=true&w=majority"
MongoClient.connect(connectionString, {useUnifiedTopology:true})
    .then(client => {
        console.log("Connected to Database")
        const db = client.db('todo-lists');
        //specify collection
        const todosCollection = db.collection('todos');
        console.log(todosCollection);

        //CRUD Methods----------------------------------------------------------------
        //GET request
        app.get('/', (req, res, next) => {
            //for static files: res.sendFile(__dirname + "/index.html");
            todosCollection.find({}).toArray()
            //sends in results as 'quotes'
                .then(results => {res.send(results)})	
                .catch(error => console.error(error))
            });

        app.post('/signup', (req, res) => {
            todosCollection.insertOne({name: req.query.name, password: req.query.password, todos:["My First Todo"]})
            .then(results => {
                res.send("Successfully signed up!");
            })
            .catch(error => console.error(error))
        })
        

        app.post('/getTodos', (req, res) => {
            console.log("request")
            console.log(req.query.name)
            todosCollection.find({name: req.query.name, password: req.query.password}).toArray()
            //sends in results as 'quotes'
                .then(results => {
                    res.send(results);
                    console.log(results);
                })	
                .catch(error => console.error(error))
            });

            

        app.post('/submitTodos', (req, res) => {
            console.log("nameeeeeeeeee: " + req.query.name)
            todosCollection.updateOne({name: req.query.name}, {$set: {todos: req.query.list}})
                .then(results => {
                    res.send(results);
                    console.log(results);
                })	
                .catch(error => console.error(error))
    
        })

        
        //Change to not hardcode
        app.delete('/deleteTodos', (req, res) => {
            console.log(req.query.list)
            todosCollection.updateOne({name: req.query.name}, {$set: {todos: req.query.list}})
                .then(results => {
                    res.send(results);
                    console.log(results);
                })	
                .catch(error => console.error(error))
    
        })    
    })
    .catch(error => console.error(error));


//nodemon index.js to start
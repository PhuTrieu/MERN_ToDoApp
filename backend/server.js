const express = require('express'); //load express vao ung dung
const app = express(); //dinh nghia doi tuong app, la 1 ung dung express
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router(); // de app co cau truc hon, de mo rong -> the hien duong dan api ma app ho tro
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true, useUnifiedTopology: true}); // ket noi db
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established successfully");
})

app.use('/todos', todoRoutes);

todoRoutes.route('/').get(function(req, res){
    Todo.find(function(err, todos){
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res){
    let todo = new Todo(req.body); //tao 1 Schema doi tuong
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').put(function(req, res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        if (!todo) {
            res.status(404).send('data is not found');
        } else {
            todo.todo_description = req.body.todo_description,
            todo.todo_responsible = req.body.todo_responsible,
            todo.todo_priority = req.body.todo_priority,
            todo.todo_completed = req.body.todo_completed

            todo.save()
                .then(todo => {
                    res.json('Todo updated');
                })
                .catch(err => {
                    res.status(400).send('Update not possible');
                });
        }
    });
});

todoRoutes.route('/delete/:id').delete(function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err, todo){
        if (!todo) {
            res.status(404).send('data is not found');
        } else {
            res.json('Todo deleted');
        }
    })
})

//chay server
app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT);
});
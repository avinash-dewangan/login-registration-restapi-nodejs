const express = require('express');
const router = express.Router();
var checkAuth = require("../api/middleware/auth");

//import model
//const Todo = require("../models/todo");
const todoController = require("../api/controller/todo");


//Data Listing
router.get('/:id', checkAuth, todoController.getAllTodos);

//Add the data
router.post('/', checkAuth, todoController.addTodo);

//Delete The Data
router.delete('/:id', checkAuth, todoController.deleteTodo);


//Data Listing
router.get('/:id', checkAuth, todoController.findByIdTodo);

module.exports = router;
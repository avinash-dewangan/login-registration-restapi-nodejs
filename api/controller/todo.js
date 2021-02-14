const Todo = require("../../models/todo");

exports.getAllTodos = (req, res) => {
    var id = req.params.id;
    // for single itema select 
    //Todo.find({}, { 'name': 1, '_id': 0 })
    Todo.find({ user_id: id })
        .sort({ date: -1 })
        .then((todos) => res.json(todos))
}

exports.addTodo = (req, res, next) => {

    console.log(req.userData);

    const newTodo = new Todo({
        name: req.body.name,
        user_id: req.body.user_id
    })
    //newTodo.save().then((todo) => res.json(todo))
    newTodo.save()
        .then((todo) => res.json(todo))
        .catch(err => {
            res.json(err);
        });
}

exports.deleteTodo = (req, res) => {
    Todo.findById(req.params.id)
        .then((todo) => todo.remove().then(() => res.json({ success: true })))
        .catch(err => res.json({ success: false }).status(404))
}

exports.findByIdTodo = (req, res) => {
    Todo.findById(req.params.id)
        .then((todo) => res.json(todo))
        .catch(err => {
            res.json(err);
        });


}
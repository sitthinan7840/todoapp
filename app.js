const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = []; 

app.get('/api/todolist', (req, res) => {
    res.json(todos);
});

app.post('/api/todolist', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { title, description };
    todos.push(newTodo);
    console.log(`create todolist success`);
    res.status(201).json(newTodo);
});

app.put('/api/todolist/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { title, description } = req.body;
    if (index >= 0 && index < todos.length) {
        todos[index] = { title, description };
        res.json(todos[index]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/api/todolist/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

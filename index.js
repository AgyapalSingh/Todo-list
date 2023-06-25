const express = require('express');
const path = require('path');
const port = 8000;

const app = express();


// View Engine - ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// MIDDLE WARE
app.use(express.urlencoded());

// MIDDLE WARE to excess static files
app.use(express.static('assets'));


var todoList = [
    {
        description : "Let's make a TODO App",
        category : " School ",
        date : " 2023-04-09"
    },
]



// GET 
app.get('/', function(req, res){
    return res.render('home', { 
        title: "Todo List ",
        todo_list : todoList
    });
});



// Different Colors for category div
const category_color = {
    'Personal' : 'blue',
    'Home' : 'yellow',
    'Work' : 'red',
    'School' : 'violet',
    'Cleaning' : 'pink',
    'Others' : 'black'
};


//  POST
app.post('/create-todo', function(req, res){
    req.body['color'] = category_color[req.body.category] || 'blue';
    todoList.push({...req.body, color:category_color[req.body.category] || 'blue'});
    return res.redirect('back');
})


// For Deleting a TODO
app.get('/delete-todo/', function(req, res){
    let description = req.query.description;
    let todoIndex = todoList.findIndex(todo => todo.description == description);
    if(todoIndex != -1){
        todoList.splice(todoIndex, 1);
    }
    return res.redirect('back');
});


//  LISTEN
app.listen(port, function(err){
    if(err){
        console.log('Error', err);
    } 
    console.log('Server is running on Port:', port);
});
var express  = require('express');
var request  = require('request');
var mongoose= require('mongoose');
var session = require("express-session");

var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://hg75:zipang@ds121534.mlab.com:21534/todolist', options , function(err) {
});

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
 session({
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);


var todoSchema = mongoose.Schema({
  user: String,
  task: String
});

var userSchema = mongoose.Schema({
  user: String,
  password: String,
  confirmPassword: String
})

var todoModel = mongoose.model('todo', todoSchema);

var userModel = mongoose.model('user', userSchema);

app.get('/', function(req, res){
  res.render('index');
});

app.get('/dataBase', function(req, res){
  if(req.query.task != '' || req.query != undefined){
    var tasks = new todoModel ({
      user:req.query.user,
      task:req.query.task
    });
    tasks.save(function (error, info){
      todoModel.find({user:req.query.user}, function (err, list){
        res.send(JSON.stringify(list));
      });
    });
  }
});

app.get('/affichage', function(req, res){
  todoModel.find({user:req.query.user}, function(err, list){
    res.send(JSON.stringify(list));
  });
});

app.get('/delete', function(req, res){
  console.log(req.query);
  todoModel.remove({task:req.query.task}, function(error) {
    todoModel.find( {user:req.query.user}, function (err, list){
      res.send(JSON.stringify(list));
    });
  });
});

app.get('/signin', function(req, res){
  console.log(req.query);
  if(req.query.user != '' && req.query.password != ''){
    userModel.findOne({user:req.query.user, password:req.query.password}, function(err, users){
      console.log(users);
      if(users != null){
        res.send('oui');
      } else {
        res.send('non');
      }
    });
  } else {
    res.send('non');
  }
});

app.get('/signup', function(req, res){
  userModel.findOne({user:req.query.user}, function(err, users){
    if(users != null){
      if(req.query.user != users.user){
        var user = new userModel ({
          user:req.query.user,
          password:req.query.password,
          confirmPassword:req.query.confirmPassword
          });

        user.save(function (err, list){
          console.log(list);
        });

        res.send('oui');
      } else {
        res.send('non');
      }
    } else {
      var user = new userModel ({
        user:req.query.user,
        password:req.query.password,
        confirmPassword:req.query.confirmPassword
        });

      user.save(function (err, list){
        console.log(list);
      });

      res.send('oui');
    }
  });
  });

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});

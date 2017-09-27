// Get and use Express:
var express = require('express');
var app = express();

//Get and use Session:
var session = require('express-session');
app.use(session({secret: 'imsuperradicalman', resave: true, saveUninitialized: true}));
var cookieParser = require('cookie-parser');
app.use(cookieParser('imsuperradicalman'));

// Get and use Path:
var path = require('path');

// Get and use BodyParser:
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get and use Mongoose:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/polls');
var Schema = mongoose.Schema;

// Direct to the Angular static files:
app.use(express.static(path.join(__dirname, './public/dist')));

// Mongoose Schemas:
var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 2},
    polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}]
}, {timestamps: true });
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

var PollSchema = new mongoose.Schema({
    name: {type: String},
    question: {type: String, required: true, minlength: 8},
    options: [{type: Schema.Types.ObjectId, ref: 'Option'}],
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true });
mongoose.model('Poll', PollSchema);
var Poll = mongoose.model('Poll');

var OptionSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 3},
    votes: {type: Number},
    _poll: {type: Schema.Types.ObjectId, ref: 'Poll'}
}, {timestamps: true});
mongoose.model('Option', OptionSchema);
var Option = mongoose.model('Option');




// Routes for talking to Database:
app.get('/user', function(req, res){
    User.findOne({_id: req.session.userId}, function(err, user){
        if(err){
            console.log("Couldn't get the user at the server.js level.");
        } else {
            console.log(user);
            res.json(user);
        }
    })
})

app.post('/findUser', function(req, res){
    User.findOne({username:req.body.username}).populate('polls').exec(function(err, user){
        if(err){
            console.log("There was an error at the server.js level.");
        } else{
            if(user!=null){
                console.log("Found the user in the database.");
                req.session.userId = user._id;
                console.log(req.session.userId);
                res.json(user);
            } else{
                res.json(user);
            }
        }
    })
});

app.post('/user', function(req, res){
    User.create(req.body, function (err, user){
        if(err){
            console.log("There was an error creating the user at the server.js level.");
        } else {
            console.log("The user was created successfully at server.js level.");
            res.json(user);
        }
    })
})

app.get('/clearUser', function(req, res){
    req.session.destroy;
    return;
})

app.get('/polls', function(req, res){
    Poll.find({}, function(err, polls){
        if(err){
            console.log("There was an error retrieving the polls at the server.js level.");
        } else{
            res.json(polls);
        }
    })
})

app.post('/poll', function(req, res){
    User.findOne({_id: req.session.userId}, function(err, user){
        var pollQuestion = new Poll({question: req.body.question, name: user.username, _user: user._id});
        pollQuestion.save(function(err){
            user.polls.push(pollQuestion);
            user.save(function(err){
                if(err){
                    console.log("Error saving the poll question at the server.js level.");
                } else {
                    Poll.findOne({_id: pollQuestion._id}, function(err, poll){
                        var option1 = new Option({content: req.body.option1});
                        option1._poll = poll._id;
                        option1.votes = 0;
                        option1.save(function(err){
                            poll.options.push(option1);
                            var option2 = new Option({content: req.body.option2});
                            option2._poll = poll._id;
                            option2.votes = 0;
                            option2.save(function(err){
                                poll.options.push(option2);
                                var option3 = new Option({content: req.body.option3});
                                option3._poll = poll._id;
                                option3.votes = 0;
                                option3.save(function(err){
                                    poll.options.push(option3);
                                    var option4 = new Option({content: req.body.option4});
                                    option4._poll = poll._id;
                                    option4.votes = 0;
                                    option4.save(function(err){
                                        poll.options.push(option4);
                                        poll.save(function(err){
                                            if(err){
                                                console.log("Error saving the options at the server.js level.");
                                            } else {
                                                res.json(poll);
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        })
    })
})

app.get('/poll/:id', function(req, res){
    console.log("&&&&&&&&&&&&&&&&&&&&", req.params.id);
    Poll.findOne({_id: req.params.id}).populate('options').exec(function(err, poll){
        if(err){
            console.log("There was an error getting the single poll from the database - server.js");
        } else {
            res.json(poll);
        }
    })
})

app.get('/option/:id', function(req, res){
    Option.findOne({_id: req.params.id}, function(err, option){
        option.votes += 1;
        option.save(function(err){
            if(err){
                console.log("There was an error saving the vote at the server.js level.");
            }else{
                res.json(option);
            }
        })
    })
})

app.get('/delete/:id', function(req, res){
    Poll.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("There was an error deleting the poll at the server.js level.");
        } else {
            res.json();
        }
    })
})

app.all('*', (req, res, next)=>{
    res.sendFile(path.resolve("./public/dist/index.html"));
});

// Setting server to listen:
app.listen(8000, function(){
    console.log("Listening on port 8000.");
})

//Backend API for CRUD actions on database
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://issifu.suhununu:openme12@ds141128.mlab.com:41128/heroku_sm98ptzk', ['tasks', 'cities']);

//Get all cities
router.get('/cities', function(req, res, next){
    db.cities.find(
        {}, 
        {"_id": 0, "destination": 1, "origin": 1, "days": 1, "fare": 1},
    
    function(error, tasks){
        if(error){
            res.send(error);
        }
        res.json(tasks);
    });
});


// Get Single Task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(error, task){
        if(error){
            res.send(error);
        }
        res.json(task);
    });
});

//Save Task
router.post('/task', function(req, res, next){
    var task =  req.body;
    if(!task.title || !(task.isDone+'')){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.save(task, function(error, task){
            if(error){
                res.send(error);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(error, task){
        if(error){
            res.send(error);
        }
        res.json(task);
    });
});

// Update task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad data"
        })
    } else {
            db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {},  function(error, task){
            if(error){
                res.send(error);
            }
            res.json(task);
            });
        }
});

module.exports =  router;
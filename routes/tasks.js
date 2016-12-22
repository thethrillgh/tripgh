//Backend API for CRUD actions on database
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://issifu.suhununu:openme12@ds139428.mlab.com:39428/mytasklist_issifu', ['tasks']);

//Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(error, tasks){
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
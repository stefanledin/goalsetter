var express = require('express');
var router = express.Router();
const Goal = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/goals/add', (req, res, next) => {
  console.log(req.body);
  Goal.create({
    goal: req.body.goal,
    column: req.body.column
  }, function (err, newGoal) {
    if (err) res.redirect('/');
    res.json(newGoal);
  });
})

router.get('/goals/:id/delete', (req, res, next) => {
  Goal.findByIdAndRemove(req.params.id, function (plask) {
    res.send('plask');
  });
  
})

module.exports = router;

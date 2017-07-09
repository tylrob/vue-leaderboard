var express = require('express');
var router = express.Router();
var _ = require('lodash');

var athletes = [
  {
    id: 'id1',
    name: 'Aaron',
    gym: 'CrossFit Greensboro',
    score: 9
  },
  {
    id: 'id2',
    name: 'Beth',
    gym: 'CrossFit 919',
    score: 7
  },
  {
    id: 'id3',
    name: 'Carl',
    gym: 'CrossFit Chapel Hill',
    score: 5
  },
  {
    id: 'id4',
    name: 'Diane',
    gym: 'CrossFit RTP',
    score: 2
  }
];

router.get('/athletes', function(req, res){
  //console.log('scores: ' + JSON.stringify(athletes, null, '\t'));
  res.send(athletes);
});

router.put('/shuffle', function(req, res){
  //added fake delay to test client behavior
  var delay = _.random(1,5) * 1000;
  setTimeout(function(){
    athletes = _.each(athletes, function(athlete){
      athlete.score = _.random(0,10);
    });
    athletes = _.orderBy(athletes, ['score', 'name'], ['desc', 'asc']);
    //console.log('scores: ' + JSON.stringify(athletes, null, '\t'));
    res.send(athletes);    
  }, delay);
});

module.exports = router;
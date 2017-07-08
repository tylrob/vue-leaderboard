var express = require('express');
var router = express.Router();

var athletes = [
  {
  	id: 'ath1',
  	name: 'James',
  	rank: 1
  },
  {
  	id: 'ath2',
  	name: 'Scott',
  	rank: 2
  },
  {
  	id: 'ath3',
  	name: 'Brian',
  	rank: 3
  },
  {
  	id: 'ath4',
  	name: 'Iris',
  	rank: 4
  }
];

router.get('/athletes', function(req, res){
  res.send(athletes);
});

module.exports = router;
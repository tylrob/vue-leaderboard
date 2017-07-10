var express = require('express')
var router = express.Router()
var _ = require('lodash')
var cache = require('memory-cache')
var _athletes = [
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
]

function getAthletes () {
  if (cache.get('athletes') === null) {
    cache.put('athletes', _athletes)
  }
  return cache.get('athletes')
}

function setAthletes (newAthletes) {
  cache.put('athletes', newAthletes)
}

function addAthlete (athlete) {
  var athletes = getAthletes()
  if (athletes == null || typeof athletes !== 'object') {
    athletes = []
  }
  var id = _.random(10, 1000)
  athlete.id = 'id' + id
  athletes.push(athlete)
  athletes = _.orderBy(athletes, ['score', 'name'], ['desc', 'asc'])
  cache.put('athletes', athletes)
  return athlete
}

router.get('/athletes', function (req, res) {
  // console.log('scores: ' + JSON.stringify(athletes, null, '\t'));
  res.send(getAthletes())
})

router.put('/shuffle', function (req, res) {
  // added fake delay to test client behavior
  var delay = _.random(1, 5) * 1000
  var athletes = getAthletes()
  setTimeout(function () {
    athletes = _.each(athletes, function (athlete) {
      athlete.score = _.random(0, 10)
    })
    athletes = _.orderBy(athletes, ['score', 'name'], ['desc', 'asc'])
    // console.log('scores: ' + JSON.stringify(athletes, null, '\t'));
    setAthletes(athletes)
    res.send(athletes)
  }, delay)
})

router.post('/athletes', function (req, res) {
  var body = req.body
  if (typeof body !== 'undefined' && body !== null) {
    var athlete = addAthlete(body)
    res.status(201)
    res.send(athlete)
  }
  res.status(400)
  res.send()
})

module.exports = router

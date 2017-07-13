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
    setAthletes(_athletes)
  }
  var athletes = cache.get('athletes')

  return _.orderBy(athletes, ['score', 'name'], ['desc', 'asc'])
}

function setAthletes (newAthletes) {
  newAthletes = _.orderBy(newAthletes, ['score', 'name'], ['desc', 'asc'])
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
  setAthletes(athletes)
  return athlete
}

function updateAthlete (athlete) {
  var athletes = getAthletes()
  if (athletes == null || typeof athletes !== 'object') {
    athletes = []
  }
  var existingAthleteIndex = _.findIndex(athletes, function (a) {
    return a.id === athlete.id
  })
  if (existingAthleteIndex === -1) {
    return null
  }
  athletes[existingAthleteIndex] = athlete
  setAthletes(athletes)
  return athlete
}

function removeAthlete (id) {
  var athletes = getAthletes()
  _.remove(athletes, {
    id: id
  })
  setAthletes(athletes)
}

router.get('/athletes', function (req, res) {
  // console.log('scores: ' + JSON.stringify(athletes, null, '\t'));
  res.send(getAthletes())
})

router.put('/shuffle', function (req, res) {
  // added fake delay to test client behavior
  var athletes = getAthletes()
  athletes = _.each(athletes, function (athlete) {
    athlete.score = _.random(0, 10)
  })
  athletes = _.orderBy(athletes, ['score', 'name'], ['desc', 'asc'])
  // console.log('scores: ' + JSON.stringify(athletes, null, '\t'));
  setAthletes(athletes)
  res.send(athletes)
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

router.put('/athletes', function (req, res) {
  var athlete = req.body
  if (athlete) {
    if (updateAthlete(athlete) != null) {
      res.status(201)
      res.send(athlete)
    } else {
      res.status(404)
      res.send('Athlete not found')
    }
  } else {
    res.status(400)
    res.send('Bad Data')
  }
})

router.delete('/athletes/:id', function (req, res) {
  var id = req.params.id
  if (id) {
    removeAthlete(id)
    res.status(200)
    res.send(id)
  }
  res.status(400)
  res.send()
})

module.exports = router

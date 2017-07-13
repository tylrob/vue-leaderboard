/* eslint-env browser */
window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue Leaderboard!',
      orderBy: 'desc',
      pollSecs: 5000,
      pollTimeout: null,
      pollEnabled: false,
      query: '',
      athletes: [
        {
          id: 'id1',
          name: 'Aaron',
          gym: 'CrossFit Greensboro',
          score: 0
        },
        {
          id: 'id2',
          name: 'Beth',
          gym: 'CrossFit 919',
          score: 0
        },
        {
          id: 'id3',
          name: 'Carl',
          gym: 'CrossFit Chapel Hill',
          score: 0
        },
        {
          id: 'id4',
          name: 'Diane',
          gym: 'CrossFit RTP',
          score: 0
        }
      ],
      tyler: {
        id: null,
        name: 'Tyler',
        gym: 'Pewter',
        score: _.random(0, 10)
      }
    },
    methods: {
      randomRanks: function () {
        _.each(this.athletes, function (athlete) {
          athlete.score = _.random(0, 10)
        })
        this.athletes = _.orderBy(this.athletes, ['score', 'name'],
          ['desc', 'asc'])
      },
      axiosGet: function () {
        axios.get('/api/athletes')
          .then(function (response) {
            console.log(JSON.stringify(response.data, null, '\t'))
            vm.athletes = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      serverShuffle: function () {
        axios.put('/api/shuffle')
          .then(function (response) {
            console.log(JSON.stringify(response.data, null, '\t'))
            vm.athletes = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      pollResults: function () {
        this.pollEnabled = true
        axios.get('/api/athletes')
          .then(function (response) {
            vm.athletes = response.data
            if (vm.pollEnabled) {
              vm.pollTimeout = setTimeout(vm.pollResults, vm.pollSecs)
            }
          })
      },
      stopPolling: function () {
        clearTimeout(this.pollTimeout)
        this.pollTimeout = null
        this.pollEnabled = false
      },
      addAthlete: function () {
        axios.post('/api/athletes', vm.tyler)
          .then(function (response) {
            vm.tyler = response.data
            vm.athletes.push(vm.tyler)
            vm.athletes = _.orderBy(vm.athletes, ['score', 'name'],
              ['desc', 'asc'])
          })
      },
      removeAthlete: function () {
        axios.delete('/api/athletes/' + vm.tyler.id)
          .then(function (response) {
            vm.tyler.id = null
            var index = _.findIndex(vm.athletes, function (a) {
              return a.id === vm.tyler.id
            })
            if (index > -1) {
              vm.athletes.splice(index, 1)
            }
          }).catch(function (res) {
            console.log(res)
          })
      }
    },
    computed: {
      computedList: function() {
        var self = this
        return _.filter(this.athletes, function (athlete) {
          return athlete.name.toLowerCase()
            .indexOf(self.query.toLowerCase()) !== -1
        })
      }
    }
  })
}

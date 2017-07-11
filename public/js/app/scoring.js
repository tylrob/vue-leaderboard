/* eslint-env browser */
window.onload = function () {
  var athletePublish = {
    props: {
      athlete: Object
    },
    template: '#athlete-template',
    data: function () {
      return {
        publishingText: 'Publish',
        dirtied: false
      }
    },
    methods: {
      publishScore: function () {
        this.publishingText = 'Publishing...'
        var self = this
        axios.put('/api/athletes', this.athlete)
          .then(function (response) {
            self.publishingText = 'Published'
            self.$emit('published')
            setTimeout(function () {
              self.publishingText = 'Publish'
              self.dirtied = false
            }, 1000)
          }).catch(function (response) {
            console.log(response)
          })
      },
      dirtyInput: function () {
        this.dirtied = true
      }
    }
  }

  Vue.component('athlete-publish', athletePublish)

  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue Leaderboard!',
      orderBy: 'desc',
      athletes: {}
    },
    methods: {
      axiosGet: function () {
        axios.get('/api/athletes')
          .then(function (response) {
            vm.athletes = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      sortAthletes: function () {
        this.athletes = _.orderBy(this.athletes, ['score', 'name'],
          ['desc', 'asc'])
      }
    },
    beforeMount: function () {
      this.axiosGet()
    }
  })
}

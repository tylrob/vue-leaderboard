Vue.component('scorecard-input', {
  template: '#scorecard-input-template',
  props: ['golden', 'pug', 'athleteName', 'score', 'vueKey', 'tiebreak'],
  data: function () {
    return {
      localScore: this.score,
      localTiebreak: this.tiebreak
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    },
    updateScore: function (value, vueKey) {
      this.$emit('loki', value, vueKey)
    },
    updateTiebreak: function (value, vueKey) {
      this.$emit('', value, vueKey)
    }
  },
})

new Vue({
  el: '#app',
  data: {
  	parentGolden: 'Finchy',
    dingo: 'GILDED',
    heading: 'Scoring System',
    scores: [
    	{
        vueKey: 'a',
      	athleteName: 'Tyler Robinson',
        score: 2,
        tiebreak: ''
      },
      {
        vueKey: 'b',
      	athleteName: 'Avery Robinson',
        score: 3,
        tiebreak: ''
      }
    ]
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    },
    scoreHandler: function (value, vueKey) {
      var index = _.findIndex(this.scores, ['vueKey', vueKey])
      this.scores[index].score = value
    },
    tiebreakHandler: function (value, vueKey) {
      var index = _.findIndex(this.scores, ['vueKey', vueKey])
      this.scores[index].tiebreak = value
    }
  }
})
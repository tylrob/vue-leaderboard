/* eslint-env browser */
window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue Leaderboard!',
      orderBy: 'desc',
      athletes: [
        {
          name: 'Aaron'
        },
        {
          name: 'Beth'
        },
        {
          name: 'Carl'
        },
        {
          name: 'Diane'
        }
      ]
    },
    methods: {
      changeText: function () {
        this.message = 'new text replaced...'
      },
      changeOrder: function () {
        this.athletes = _.orderBy(this.athletes, ['name'], [this.orderBy])
        if (this.orderBy === 'asc') {
          this.orderBy = 'desc'
        } else {
          this.orderBy = 'asc'
        }
      }
    }
  })
}

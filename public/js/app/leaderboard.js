/* eslint-env browser */
window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue Leaderboard!',
      orderBy: 'desc',
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
      ]
    },
    methods: {
      randomRanks: function(){
        _.each(this.athletes, function(athlete){
          athlete.score = _.random(0,10);
        });
        this.athletes = _.orderBy(this.athletes, ['score', 'name'],
          ['desc', 'asc']);
      },
      axiosGet: function(){
        axios.get('/api/athletes')
          .then(function(response){
            console.log(JSON.stringify(response.data, null, '\t'));
            vm.athletes = response.data;
          })
          .catch(function(error){
            console.log(error);
          });
      },
      serverShuffle: function(){
        axios.put('/api/shuffle')
          .then(function(response){
            console.log(JSON.stringify(response.data, null, '\t'));
            vm.athletes = response.data;
          })
          .catch(function(error){
            console.log(error);
          });
      }
    }
  });
}
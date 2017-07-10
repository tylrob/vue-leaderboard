# vue-leaderboard

An exploratory app for using Vue and Axios to pull data from Express and render it.

To start the app:
1. Run `npm install`
2. Run `node server.js`
3. Navigate to 127.0.0.1:8080/leaderboard.html

### TODO:
1. <s>Render a list of athletes, ranked in an order provided by the server.</s> **Done!**
1. <s>Set Axios to query the server every X seconds to refresh the list. Use the updated ranks to refresh the list. Updates should be applied using smooth animations.</s> **Done!**
1. POC for how new entries would enter and leave the screen. Add a button to the Leaderboard that will PUT athlete 'Tyler' on the server with a random score from 0 to 10. When client syncs, show the new athlete name sliding in from offscreen on the right, while existing items make room for the new item. Add another button that will PUT athlete 'Tyler' out of the list on the server. When client syncs, slide it back out to the right and show the list collapsing to fill in the space. See [List Move Transitions](https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions) for example and code.
1. Build a scoring page where admin users enter scores for each athlete. Only on this page can scores be added.

The leaderboard page doesn't need to be able to add or delete anything, just read the updates.
The server will be the single source of truth for the ranks.

Use 2 spaces for indents, 80-char line limit

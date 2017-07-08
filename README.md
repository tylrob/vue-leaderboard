vue-leaderboard

An exploratory app for using Vue and Axios to pull data from Express and render it.

===
To start the app, run node server.js and navigate to 127.0.0.1:8080/leaderboard.html
===

TODO:
1. Render a list of athletes, ranked in an order provided by the server.
2. Set Axios to query the server every X seconds to refresh the list. Use the updated ranks to refresh the list. Updates should be applied using smooth animations.
3. Build a scoring page where admin users enter scores for each athlete. Only on this page can scores be added.

The leaderboard page doesn't need to be able to add or delete anything, just read the updates.
The server will be the single source of truth for the ranks.

Use 2 spaces for indents, 80-char line limit
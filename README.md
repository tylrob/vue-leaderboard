# vue-leaderboard

An exploratory app for using Vue and Axios to pull data from Express and render it.

To start the app:
1. Run `npm install`
2. Run `node server.js`
3. Navigate to `127.0.0.1:8080/leaderboard.html`

### TODO:
1. <s>Render a list of athletes, ranked in an order provided by the server.</s> **Done!**
1. <s>Set Axios to query the server every X seconds to refresh the list. Use the updated ranks to refresh the list. Updates should be applied using smooth animations.</s> **Done!**
1. POC for how new entries would enter and leave the screen. Add a button to the Leaderboard that will PUT athlete 'Tyler' on the server with a random score from 0 to 10. When client syncs, show the new athlete name sliding in from offscreen on the right, while existing items make room for the new item. Add another button that will PUT athlete 'Tyler' out of the list on the server. When client syncs, slide it back out to the right and show the list collapsing to fill in the space. See [List Move Transitions](https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions) for example and code.
1. Build `scoring.html` where admin users can enter scores for each athlete. Only on this page can scores be added. On page load Admin users see a list of athletes participating in this event in alphabetical order. Athletes are not added or removed here, just scored from the list of athletes that signed up earlier. Admin users can see an input box for each athlete where a numeric score can be entered. Each row has a button with text "Publish" which is disabled by default, but when the input is dirtied the button is enabled. When clicked, the button is disabled again and text changes to "Publishing...". When server returns successfully, button stays disabled but text says "Published!" *Consider wording: save/saving/saved or broadcast/broadcasting/broadcasted. Needs to indicate that this action has made my work visible to all users watching the Leaderboard.*

The leaderboard page doesn't need to be able to add or delete anything, just read the updates.
The server will be the single source of truth for the ranks.

Use 2 spaces for indents, 80-char line limit

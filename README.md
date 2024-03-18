# health engine

:)

to do local work on the site: 

1) run `npm i` in both `/client` and `/server`
2) `cd` into the `/client` directory and run `npm start` (for frontend)
3) `cd` into `/server` and run `nodemon index.js` (for proxy server/"backend")
4) the instructions above assume that you have installed postgres on your local machine and you've set it up according to the instructions in `/server/database.sql`
- you may have to change the code on `/server/db.js` to have the appropriate password for local testing. comment (don't delete!) unused lines of code in `db.js`

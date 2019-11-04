
const express = require('express');
const app = express();
const allApps = require('./seed.js');
require('dotenv').config();





app.get('/', (req, res) => res.send('MDLIVE Pagination app!'))



// Get range parameters
app.get('/apps/:by', async function (req, res) {

  let by = '';
  if (req.params !== null) {
    by = req.params.by
  }

  let range = {
    by: by,
    start: Number(req.query.start) - 1 || 0,
    end: Number(req.query.end),
    max: Number(req.query.max) || 50,
    order: req.query.order || 'asc'
  };

  let appsList = [];
  let size;


  // Sort apps by name
  function sortByName() {
    appsList.sort((a, b) => {
      if (range.order == 'asc') {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      else {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      }
    })
  }


  // Sort apps by ID
  function sortByID() {
    appsList.sort((a, b) => {
      if (range.order == 'asc') {
        return a.id - b.id;
      }
      else {
        return b.id - a.id;
      }
    })
  }


  // Set size to last app on page
  if(range.end < range.start+range.max){
    size = range.end;
  }  
  else{
    size = range.start+range.max;
  }

  // Push requested apps to array
  for (let i = range.start; i < size; i++) {
    appsList.push(allApps[i]);
  }


  // Sort the requested apps
  if (range.by == 'name') {
    sortByName();
  }
  else if (range.by == 'id') {
    sortByID();
  }

  // JSON the resulting apps list
  res.json(appsList);
});

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))

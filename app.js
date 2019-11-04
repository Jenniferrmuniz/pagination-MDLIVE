
const express = require('express');
const app = express();
const allApps = require('./seed.js');
require('dotenv').config();


app.get('/', (req, res) => res.send('MDLIVE Pagination challenge!'))


// Get range parameters
app.get('/apps/:range', async function (req, res) {

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

  // Finds object in array to get start/end points
  function findObj(limit) {
    result = allApps.find(obj => {
      return obj.id === Number(limit) || obj.name === limit;
    })
    if(allApps.indexOf(result)<0){
      return undefined;
    }
    return allApps.indexOf(result);
  }

  // Range given by params
  let range = {
    by: req.query.by,
    start: findObj(req.query.start) || 0,
    end: findObj(req.query.end)+1,
    max: Number(req.query.max) || 50,
    order: req.query.order || 'asc'
  };
  let appsList = [];
  let endpoint;


  // Set endpoint to last app on page
  if (range.end < range.start + range.max) {
    endpoint = range.end;
  }
  else {
    endpoint = range.start + range.max;
  }

  // Push requested apps to array
  for (let i = range.start; i < endpoint; i++) {
    if (i === allApps.length) {
      break;
    }
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


const express = require('express');
const app = express();
const allApps = require('./seed.js');

require('dotenv').config();

// Get range parameters
function buildRange(req) {
  return {
    by: req.query.by,
    start: req.query.start,
    end: req.query.end,
    order: req.query.order || 'asc',
    max: Number(req.query.max) || 50
  }
}

// Sort apps by ID
function sortByID(apps, order) {
  apps.sort((a, b) => {
    if (order == 'asc') {
      return a.id - b.id;
    }
    else {
      return b.id - a.id;
    }
  })
  return apps;
}

// Sort apps by name
function sortByName(apps, order) {
  apps.sort((a, b) => {
    if (order == 'asc') {
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
  return apps;
}


// Finds object in array to get start/end points
function findObj(sortedList, boundary) {
  result = sortedList.find(obj => {
    return obj.id === Number(boundary) || obj.name === boundary;
  })
  if (sortedList.indexOf(result) < 0) {
    return undefined;
  }
  return sortedList.indexOf(result);
}


// Routes that don't have params
app.get('/', (req, res) =>{
  res.send('MDLive Pagination challenge! ( type params in url to paginate api - ex: https://pagination-challenge.herokuapp.com/apps/range?by=id&start=2 ) ');
})
app.get('/apps', (req, res) =>{
  res.send('MDLive Pagination challenge! ( type params in url to paginate api - ex: https://pagination-challenge.herokuapp.com/apps/range?by=id&start=2 ) ');
})



// Get range parameters
app.get('/apps/:range', async function (req, res) {

  if (req.query.by === undefined ){
    res.status(400).send('The param by is not optional, possible values are: name or id')
  }

  let sorted;

  const incomingRange = buildRange(req);
  
  // Sort apps
  if(incomingRange.by == 'name'){
    sorted = sortByName(allApps, incomingRange.order);
  }
  else if(incomingRange.by == 'id'){
    sorted = sortByID(allApps, incomingRange.order);
  }


  // Range given by params
  let range = {
    start: findObj(sorted, incomingRange.start) || 0,
    end: findObj(sorted, incomingRange.end) + 1,
    max: Number(incomingRange.max) || 50,
  };
  let appsList = [];
  let endpoint;



  // Set endpoint to last app on page
  if (range.end < range.start + range.max && range.end>range.start) {
    endpoint = range.end;
  }
  else {
    endpoint = range.start + range.max;
  }

  // Push requested apps to array
  appsList.push(sorted.slice(range.start, endpoint));


  // JSON the resulting apps list
  res.json(appsList);
});

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))

module.exports = {
  buildRange: buildRange,
  sortById: sortByID,
  sortByName: sortByName,
  findObj: findObj,
}
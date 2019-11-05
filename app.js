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



// Set endpoint to last app on page
function getEndpoint(start, end, max) {
  if (end < start + max && end > start) {
    return end;
  }
  else {
    return start + max;
  }
}



// Paginate and return requested apps in order
function paginateAndSort(apps, req) {
  
  let sorted;
  const incomingRange = buildRange(req);

  if(incomingRange.by == 'name'){
    sorted = sortByName(apps, incomingRange.order);
  }
  else if(incomingRange.by == 'id'){
    sorted = sortByID(apps, incomingRange.order);
  }

  let range = {
    start: findObj(sorted, incomingRange.start) || 0,
    end: findObj(sorted, incomingRange.end) + 1,
    max: incomingRange.max,
  };
  const endpoint = getEndpoint(range.start, range.end, range.max);

  return sorted.slice(range.start, endpoint);
}




// Route that does not have params or endpoint
app.get('/', (req, res) =>{
  res.send('MDLive Pagination challenge! ( type params in url to paginate api - ex: https://pagination-challenge.herokuapp.com/apps/range?by=id&start=2 ) ');
})



// Endpoint but no range params are specified so it is set to default case
app.get('/apps', (req, res) =>{  
  req.query.by = 'id'
  res.json(paginateAndSort(allApps, req));
})


// Get range parameters
app.get('/apps/:range', async function (req, res) {
  res.json(paginateAndSort(allApps, req));
});



app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))

module.exports = {
  buildRange: buildRange,
  sortById: sortByID,
  sortByName: sortByName,
  findObj: findObj,
  getEndpoint: getEndpoint,
  paginateAndSort: paginateAndSort
}

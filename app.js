
const express = require('express');
const app = express();
const port = 3000


app.get('/', (req, res) => res.send('MDLIVE Pagination app!'))

// allApps = [
//   { id: 1, name: 'my-app-001' },
//   { id: 2, name: 'my-app-002' },
//   { id: 3, name: 'my-app-003' },
//   { id: 4, name: 'my-app-004' },
//   { id: 5, name: 'my-app-005' },
//   { id: 6, name: 'my-app-006' },
//   { id: 7, name: 'my-app-007' },
//   { id: 8, name: 'my-app-008' },
//   { id: 9, name: 'my-app-009' },
//   { id: 10, name: 'my-app-010' }
// ];


allApps = [
  { id: 1, name: 'jennifer' },
  { id: 2, name: 'whatever' },
  { id: 3, name: 'example' },
  { id: 4, name: 'hi' },
  { id: 5, name: 'hello' },
  { id: 6, name: 'bye' },
  { id: 7, name: 'javascript' },
  { id: 8, name: 'coding' },
  { id: 9, name: 'awesome' },
  { id: 10, name: 'cool' }
];



app.get('/apps/:by', async function (req, res) {


  let by = '';
  if (req.params !== null) {
    by = req.params.by
  }

  let range = {
    by: by,
    start: Number(req.query.start) - 1 || 0,
    end: Number(req.query.end),
    max: Number(req.query.max) || 5,
    order: req.query.order || 'asc'
  };

  let appsList = [];
  let size;



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



  if(range.end < range.start+range.max){
    size = range.end;
  }  
  else{
    size = range.start+range.max;
  }


  for (let i = range.start; i < size; i++) {
    appsList.push(allApps[i]);
  }


  if (range.by == 'name') {
    sortByName();
  }
  else if (range.by == 'id') {
    sortByID();
  }





  res.json(appsList);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

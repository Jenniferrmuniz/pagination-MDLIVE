
const express = require('express');
const app = express();
require('dotenv').config();



console.log(process.env.PORT);

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
  { id: 1, name: 'Axios app' },
  { id: 2, name: 'Bootstrap app' },
  { id: 3, name: 'Coding app' },
  { id: 4, name: 'Debug app' },
  { id: 5, name: 'Express app' },
  { id: 6, name: 'Filter app' },
  { id: 7, name: 'Github app' },
  { id: 8, name: 'Heap app' },
  { id: 9, name: 'Index app' },
  { id: 10, name: 'Java app' },
  { id: 11, name: 'Keyboard app' },
  { id: 12, name: 'Loops app' },
  { id: 13, name: 'Map app' },
  { id: 14, name: 'Node app' },
  { id: 15, name: 'OAuth app' },
  { id: 16, name: 'Promise app' },
  { id: 17, name: 'Query app' },
  { id: 18, name: 'React app' },
  { id: 19, name: 'Sort app' },
  { id: 20, name: 'Tech app' },
  { id: 21, name: 'Undefined app' },
  { id: 22, name: 'Visual studio code app' },
  { id: 23, name: 'Web developer app' },
  { id: 24, name: 'Xml app' },
  { id: 25, name: 'Yoyo app' },
  { id: 26, name: 'Zebra app' },
  { id: 27, name: 'Apple app' },
  { id: 28, name: 'Banana app' },
  { id: 29, name: 'Cat app' },
  { id: 30, name: 'Dog app' },
  { id: 31, name: 'Rabbit app' },
  { id: 32, name: 'Ironhack app' },
  { id: 33, name: 'Fish app' },
  { id: 34, name: 'Bird app' },
  { id: 35, name: 'Zip app' },
  { id: 36, name: 'Bunny app' },
  { id: 37, name: 'Whale app' },
  { id: 38, name: 'Shark app' },
  { id: 39, name: 'Cookie app' },
  { id: 40, name: 'Brownie app' },
  { id: 41, name: 'Apple app' },
  { id: 42, name: 'Dragon app' },
  { id: 43, name: 'Eagle app' },
  { id: 44, name: 'Frown app' },
  { id: 45, name: 'Gorilla app' },
  { id: 46, name: 'Happy app' },
  { id: 47, name: 'Ice cream app' },
  { id: 48, name: 'Jump rope app' },
  { id: 49, name: 'Ice app' },
  { id: 50, name: 'Candy app' },
  { id: 51, name: 'Ape app' },
  { id: 52, name: 'Basket app' },
  { id: 53, name: 'Cup app' },
  { id: 54, name: 'Door app' },
  { id: 55, name: 'Easter app' },
  { id: 56, name: 'Flower app' },
  { id: 57, name: 'Garden app' },
  { id: 58, name: 'Halloween app' },
  { id: 59, name: 'Valentine app' },
  { id: 60, name: 'Thanksgiving app' },
  { id: 71, name: 'Fruits app' },
  { id: 72, name: 'Bear app' },
  { id: 73, name: 'Christmas app' },
  { id: 74, name: 'Chicken app' },
  { id: 75, name: 'Eggs app' },
  { id: 76, name: 'Rose app' },
  { id: 77, name: 'Glory app' },
  { id: 78, name: 'Tulip app' },
  { id: 79, name: 'Orange app' },
  { id: 80, name: 'Blue app' },
  { id: 81, name: 'Purple app' },
  { id: 82, name: 'Green app' },
  { id: 83, name: 'Yellow app' },
  { id: 84, name: 'Red app' },
  { id: 85, name: 'Dolphin app' },
  { id: 86, name: 'Gold app' },
  { id: 87, name: 'Silver app' },
  { id: 88, name: 'White app' },
  { id: 89, name: 'Black app' },
  { id: 90, name: 'Brown app' },
  { id: 91, name: 'Color app' },
  { id: 92, name: 'Holiday app' },
  { id: 93, name: 'Pasta app' },
  { id: 94, name: 'Pear app' },
  { id: 95, name: 'Spinach app' },
  { id: 96, name: 'Milk app' },
  { id: 97, name: 'Juice app' },
  { id: 98, name: 'Water app' },
  { id: 99, name: 'Harry Potter app' },
  { id: 100, name: 'Star Wars app' },
  { id: 101, name: 'Caramel app' },
  { id: 102, name: 'Cheese app' },
  { id: 103, name: 'Miami app' },
  { id: 104, name: 'Paris app' },
  { id: 105, name: 'London app' },
  { id: 106, name: 'Australia app' },
  { id: 107, name: 'New Zealand app' },
  { id: 108, name: 'Germany app' },
  { id: 109, name: 'Italy app' },
  { id: 110, name: 'Javascript app' },
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

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))


# Pagination - MDLIVE QA Challenge

A Simple HTTP API endpoint that will perform pagination without using libraries to implement it.
The endpoint should return a JSON array of "apps".

____

## Solution 

First, I used the seed file to populate and test the app. 

I sorted all of the apps by either name or id in decsending/ascending order depending on the order specified.

Then, using the sorted array, I created an object `range` where I get the indices of the start and end apps specified. I use this info with the max to determine the index of the last app on the page.

This data was used to slice the sorted array and get the portion of the array that was requested.

Finally, the resulting array of the requested apps is returned in JSON format.

____

### Available parameters
- **by (required)**
    * values: 'id', 'name'
- **start**
    * values: id, name
    * defaults to 0
- **end**
    * values: id, name
- **max**
    * values: id, name
    * defaults to 50
- **order**
    * values: 'desc', 'asc'
    * defaults to 'asc'

____

### Example querys
- /apps/range?by=id
- /apps/range?by=id&start=5&max=10
- /apps/range?by=name&order=desc
- /apps/range?by=id&end=10&order=asc
- /apps/range?by=name&start=javascript-app&max=20

____

## Testing

I separated my logic into small functions so that I could write unit tests for those functions.
In order to enable me to do more end to end testing, I wrote a single function that contains all of my logic for the apps route.

There are tests checking the range, sorting algorithms, endpoints, and indices as well as the resulting array of requested apps.

##### To use tests:
- Install jasmine
- Inside the root folder, 'npm test'

____

## Created by Jennifer Muniz


# Pagination - MDLIVE QA Challenge

A Simple HTTP API endpoint that will perform pagination without using libraries to implement it.
The endpoint should return a JSON array of "apps".


## Solution 

First, I used the seed file to populate and test the app. 

I sorted all of the apps by either name or id in decsending/ascending order depending on the order stated in the query.

Then using that sorted array, I created a range object with the given parameters. If they are unspecfied, they are given a dedault value.

I checked if the end specified in the range is valid. If invalid or it exceeds the max value, the last app will be based on the max value instead of the end value. 

Using this endpoint and starting point specified in the range, I finally push the requested apps to an array to get the list.

The resulting array of apps is returned in JSON format.


### Available parameters
- by (required)
    * values: id, name
- start
    * defaults to 0
- end
- max
    * defaults to 50
- order
    * values: desc, asc




### Example querys
- /apps/range?by=id
- /apps/range?by=id&start=5&max=10
- /apps/range?by=name&order=desc
- /apps/range?by=id&end=10&order=asc
- /apps/range?by=name&start=javascript-app&max=20


## Testing

Jasmine


##### Created by Jennifer Muniz
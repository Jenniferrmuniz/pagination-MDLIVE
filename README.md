

# Pagination - MDLIVE QA Challenge

A Simple HTTP API endpoint that will perform pagination without using libraries to implement it.
The endpoint should return a JSON array of "apps".


## Solution 

First, I used the seed file to populate and test the app. 

In app.js, I created an object using the given range parameters; if they are unspecified they are given a default value. 
I looped through the apps at the specified start/end points to get the requested apps and I pushed them to an array that is then sorted.
The resulting array of apps is returned in JSON format.


## Testing

Testing


##### Created by Jennifer Muniz
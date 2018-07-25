// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//
//
//
function runSimulator(times) {
  
  //
  // test the case where we keep our original choice
  //
  let correctGuess = 0;
  let inCorrectGuess = 0;
  for (let i = 0; i < times; i++) { 
    // choose where the car is going to be
    let carDoor = (Math.floor((Math.random() * 3)+1)) - 1;
    let userPick = (Math.floor((Math.random() * 3)+1)) - 1;
    console.log("- Working with car under door: "+ carDoor + " userPick: " + userPick);
    if (userPick == carDoor) {
      correctGuess++;
    }
    else {
      inCorrectGuess++;
    }
  }
  console.log("\n\n****** Keeping your original guess ******");
  console.log("After " + times + " you got " + correctGuess + " correct ones And " + inCorrectGuess + " wrong guess\n\n");
  
  //
  // test the case where we CHANGE our original choice
  //
  let currect2 = 0;
  let inCorrect2 = 0;
  for (let i = 0; i < times; i++) { 
    let userPick = (Math.floor((Math.random() * 3) + 1)) - 1;
    // choose where the car is going to be
    let carDoor = (Math.floor((Math.random() * 3) + 1)) - 1;
    
    let removeDoor = -1;
    if (carDoor == 0) {
      removeDoor = userPick + 1;
      if (userPick == 2) {
        removeDoor = 1;
      }
    }
    if (carDoor == 1) {
      removeDoor = 0;
      if (userPick == 0) {
        removeDoor = 2;
      }
    }
    if (carDoor == 2) {
      removeDoor = 1;
      if (userPick == 1) {
        removeDoor = 0;
      }
    }
    
    console.log(" -- orig userPick: " + userPick + " carDoor: " + carDoor + " removed door: " + removeDoor);
    
    if (removeDoor == 2) {
      // the user change from 0,1
      if (userPick == 0 || userPick == 2) {
        userPick = 1;
      }
      else {
        userPick = 0;
      }
      
    }
    else if (removeDoor == 1) {
      if (userPick == 0 || userPick == 1) {
        userPick = 2;
      }
      else {
        userPick = 0;
      }
      
    }
    else {
      // removeDoor = 0
      if (userPick == 0 || userPick == 1) {
        userPick = 2;
      }
      else {
        userPick = 1;
      }
    }
    
    console.log("Current userPick: " + userPick + " carDoor: " + carDoor);
    if (userPick == carDoor) {
      currect2++;
    }
    else {
      inCorrect2++;
    }
  }
  console.log("\n\n**** NOT Keeping your original guess ****");
  console.log("After " + times + " you got " + currect2 + " correct ones And " + inCorrect2 + " wrong guess");
  
} // end runSimulator

//
//
//
runSimulator(20);
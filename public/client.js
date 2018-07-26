// The logic for the client side
//
// @author: Ido Green | @greenido
// @date: July 2018
// @see https://greenido.wordpress.com/

//
// Util function to log our output to the web page
//
function logToPage(str) {
  let targ = document.getElementById("simResults");
  targ.value += str;
}

//
// The simulator logic
//
function runSim() {
  document.getElementById("simResults").value="";
  let times = 1000;
  // test the case where we keep our original choice
  //
  let correctGuess = 0;
  let inCorrectGuess = 0;
  for (let i = 0; i < times; i++) { 
    // choose where the car is going to be
    let carDoor = (Math.floor((Math.random() * 3)+1)) - 1;
    let userPick = (Math.floor((Math.random() * 3)+1)) - 1;
    //logToPage("- Working with car under door: "+ carDoor + " userPick: " + userPick);
    if (userPick == carDoor) {
      correctGuess++;
    }
    else {
      inCorrectGuess++;
    }
  }
  logToPage("(1) Keeping your original guess\n");
  logToPage("After " + times + " you got " + correctGuess + " correct ones And " + inCorrectGuess + " wrong guess\n\n");
  
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
    
    //logToPage(" -- orig userPick: " + userPick + " carDoor: " + carDoor + " removed door: " + removeDoor);
    
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
    
    //logToPage("Current userPick: " + userPick + " carDoor: " + carDoor);
    if (userPick == carDoor) {
      currect2++;
    }
    else {
      inCorrect2++;
    }
  }
  logToPage("(2) NOT Keeping your original guess\n");
  logToPage("After " + times + " you got " + currect2 + " correct ones And " + inCorrect2 + " wrong guess");
  
  
}

//
// Start the party
//
(function () {
  document.getElementById("simButton").addEventListener("click", runSim);
})();

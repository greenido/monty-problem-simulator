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
  
  // let's run the simulator for X times
  let times = document.getElementById("simTimes").innerHTML;
  
  // the counters for the right/wrong guess
  let correctGuess = 0;
  let inCorrectGuess = 0;
  
  // start the simulation
  for (let i = 0; i < times; i++) { 
    // Choose where the car is going to be
    let carDoor = (Math.floor((Math.random() * 3)+1)) - 1;
    
    // Let the user choose a door
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
    
    // Find which door the host is going to open
    let removeDoor = -1;
    if (carDoor == 0) {
      // The car is in the first door so the host can choose door 1 or 2 (0 is the first door)
      // If the user choose 0, the host will choose 1. If she picked 1 the host will open 2
      removeDoor = userPick + 1;
      if (userPick == 2) {
        // In case she pick door 2 the host is left to open door 1 (as the car is in door 0)
        removeDoor = 1;
      }
    }
    
    if (carDoor == 1) {
      // if the car is in the middle - the host open door 0
      removeDoor = 0;
      if (userPick == 0) {
        // unless she picked it and then he must open door 2
        removeDoor = 2;
      }
    }
    
    if (carDoor == 2) {
      // if the car is in door 2 - the host open door 1
      removeDoor = 1;
      if (userPick == 1) {
        // unless the user pick it and now he must open door 0
        removeDoor = 0;
      }
    }
    
    //logToPage(" -- orig userPick: " + userPick + " carDoor: " + carDoor + " removed door: " + removeDoor);
    
    // Let's see which door the user choose to switch too now after the host open the door with the goat
    if (removeDoor == 2) {
      // The user can change from 0 to 1 (or from 1 to 0)
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
  let slider = document.getElementById("simRange");
  let simTimes = document.getElementById("simTimes");
  simTimes.innerHTML = slider.value;

  slider.oninput = function() {
    simTimes.innerHTML = this.value;
  }
})();

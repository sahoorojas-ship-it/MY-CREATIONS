var playing = false;
var score;
var trialsleft;
var step; 
var action; 
var fruits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; 
var sliceType = 0; // 0 = Vertical, 1 = Horizontal, 2 = Slant (Reset this on game start)

$(function () {
  //click on start or reset button
  $("#front").show();
  $("#startReset").click(function () {
    if (playing == true) {
      //if we are playing
      location.reload(); //reload page
    } else {
      //if we are not playing from before
      $("#front").hide();
      $("#score").show();
      playing = true;
      //set score to 0
      score = 0;
      $("#scoreValue").html(score);

      //show trials left box

      $("#trialsleft").show();
      trialsleft = 3;
      addhearts();

      //hide game over box
      $("#gameOver").hide();

      //change button to reset game
      $("#startReset").html("Reset Game");

      //start action
      startAction();
    }
  });// slice a fruit
$("#fruit1").mouseover(function () {
  score++; // increase score
  $("#scoreValue").html(score);

  // play sound
  $("#slicesound")[0].play();

  // stop fruit
  clearInterval(action);

  // Determine slice direction sequence
  if (sliceType === 0) {
    // 1. VERTICAL CUT (Splits left and right)
    $("#fruit1").hide("explode", { rows: 1, cols: 2 }, 500);
    sliceType = 1; // Set up next cut as horizontal
  } 
  else if (sliceType === 1) { // Fixed: changed 'elif' to 'else if'
    // 2. HORIZONTAL CUT (Splits top and bottom)
    $("#fruit1").hide("explode", { rows: 2, cols: 1 }, 500);
    sliceType = 2; // Set up next cut as slant
  } 
  else {
    // 3. SLANT/DIAGONAL CUT
    $("#fruit1").hide("explode", { rows: 2, cols: 2 }, 500);
    sliceType = 0; // Reset loop back to vertical
  }

  // send new fruit
  setTimeout(startAction, 500);
});

  //functions

  //addhearts
  function addhearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {
      $("#trialsleft").append(
        '<img src="https://raw.githubusercontent.com/Saumya-07/Fruit-Slicer/master/images/wrong.png" , class="life">'
      );
    }
  }

  //start action
  function startAction() {
    //generate random fruit
    $("#fruit1").show();

    //choose random fruit
    chooseRandom();
    //random position
    $("#fruit1").css({
      left: Math.round(550 * Math.random()),
      top: -50,
    });
    //generate random step
    step = 1 + Math.round(5 * Math.random()); //change steps
    //descend fruits down by 10ms
    action = setInterval(function () {
      //move fruit by one step
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      //check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitcontainer").height() - 50) {
        //yes it is low
        // check trails left
        if (trialsleft > 1) {
          //generate a fruit
          $("#fruit1").show();
          //choose random fruit
          chooseRandom();
          //random position
          $("#fruit1").css({
            left: Math.round(550 * Math.random()),
            top: -50,
          });
          //generate random step
          step = 1 + Math.round(5 * Math.random()); //change steps

          //reduce trials by one
          trialsleft--;
          //populate trails left box by one
          addhearts();
        } else {
          //game over
          playing = false; //we are not playing any more
          $("#score").hide();
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsleft").hide();
          stopAction(); //stops Action
        }
      }
    }, 10);
  }

  //choose random fruits
  function chooseRandom() {
    $("#fruit1").attr(
      "src",
      "https://raw.githubusercontent.com/Saumya-07/Fruit-Slicer/master/images/" +
        fruits[Math.round(9 * Math.random())] +
        ".png"
    );
  }
  // Stop Action
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
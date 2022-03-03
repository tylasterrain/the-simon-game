const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

$(document).keydown(function(){
  if (!gameStarted) {
    $("#level-title").text("Level 0");
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animateButton(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (
      gamePattern[currentLevel] === userClickedPattern[currentLevel]
    ) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 500);
      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      gameStarted = false;
      level = 0;
      gamePattern = [];
    }
  }
  

function nextSequence() {

    userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + (level-1));

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  setTimeout(() => {
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 500);


}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(() => {
    $("#" + colour).removeClass("pressed");
  }, 100);
}


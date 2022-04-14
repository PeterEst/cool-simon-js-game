var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameON = false;
var level = 0;
var userClickedPattern = [];


// step by step (levels repeat)
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); //fading animation
    playSound(randomChosenColour);
    $("#level-title").html("Level "+level);
    level++; // level increment
}

//adding pressed class animation with a delay 100ms
function animatePress(currentColour){
    $('#' + currentColour).addClass('pressed');
    var delayInMilliseconds = 100; //1 second

    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
        //your code to be executed after 1 second
    }, delayInMilliseconds);
}

//on click functions (play sound and pressing animation)
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

//play sound function base
function playSound(name){
    audioObj = new Audio('sounds/'+ name +'.mp3');
    audioObj.play();
}

//startup keypress ONLY 1 TIME (gameON boll trigger)
    $(document).keypress(function() {
    if (!gameON){
        nextSequence();
        gameON = true;
    }

    })

//checking answer to continue or end
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
            nextSequence();
            }, 1000);

        }
    }else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        // delay of 200 ms
        setTimeout(function() {
            $("body").removeClass('game-over');
            //your code to be executed after 200 ms
        }, 200);

        $("#level-title").html('Game Over, Press Any Key to Restart');

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameON = false;
}
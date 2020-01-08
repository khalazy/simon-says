var buttonColors = [ 'red', 'blue', 'green', 'yellow' ];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var gameLevel = 0;

// Handles button presses
function handleClick() {
	var userChosenColor = $(this).attr('id');
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);
}
$('.btn').click(handleClick);

// Creates random sequence
function nextSequence() {
	userClickedPattern = [];

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColor);

	gameLevel++;

	$('#level-title').text('Level ' + gameLevel);
}

// Plays sound effect
function playSound(name) {
	var soundEffect = new Audio('sounds/' + name + '.mp3');
	soundEffect.play();
}

// Handles button press animation
function animatePress(currentColor) {
	$('#' + currentColor).addClass('pressed');

	setTimeout(function() {
		$('#' + currentColor).removeClass('pressed');
	}, 100);
}

$(document).keydown(function() {
	if (!gameStart) {
		nextSequence();
		gameStart = true;
	}
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log('success');
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	} else {
		var wrongAnswer = new Audio('sounds/wrong.mp3');
		wrongAnswer.play();

		$('body').addClass('game-over');

		setTimeout(function() {
			$('body').removeClass('game-over');
        }, 200);
        
        $('h1').text('Game Over, Press Any Key to Restart')

        startOver();
        
		console.log('wrong');
	}
}

function startOver() {
    gameLevel = 0;
    gamePattern = [];
    gameStart = false;
}
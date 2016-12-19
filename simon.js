function startButton() {
	off = false;
	document.getElementById("start").disabled = true;
	setTimeout(beginGame, 500);
}

var strictModeStatus = false;
var sequence = [];
var replayLastSequence = false;
var tryAgainFromStart = false;
var continueValue = true;
var z = 0;
var restart = false;
var off = false;

function strictMode() {
	if (!strictModeStatus) {
		strictModeStatus = true;
	} else {
		strictModeStatus = false;
	}
}

function turnOffTheGame() {
	replayLastSequence = false;
	tryAgainFromStart = false;
	restart = false;
	off = true;
	sequence = [];
	z = 0;
	clearButtonColor();
	document.getElementById("count").innerHTML = '';
	disableButtons();
}

function restartTheGame() {
	document.getElementById("restart").disabled = true;
	restart = true;
	clearButtonColor();
	sequence = [];
	replayLastSequence = false;
	tryAgainFromStart = false;
	document.getElementById("count").innerHTML = '00';
	z = 0;
	restart = false; 
	setTimeout(beginGame, 1000);	
}

function disableButtons() {
	document.getElementById("green").disabled = true;
	document.getElementById("red").disabled = true;
	document.getElementById("yellow").disabled = true;
	document.getElementById("blue").disabled = true;
	document.getElementById("restart").disabled = true;
}

function enableButtons() {
	document.getElementById("green").disabled = false;
	document.getElementById("red").disabled = false;
	document.getElementById("yellow").disabled = false;
	document.getElementById("blue").disabled = false;	
	document.getElementById("restart").disabled = false;
}	

function beginGame() {
	var speed = Number(document.getElementById('SPEED').className);
	if (restart) {
		return;
	}
	if (off) {
		return;
	}
	disableButtons();
	if (tryAgainFromStart) {
		sequence = [];
		tryAgainFromStart = false;
		replayLastSequence = false;
	}
	if (!replayLastSequence) {
		var randomButton = Math.floor(Math.random() * (4) + 1);
		sequence.push(randomButton);
		replayLastSequence = false;
	}
	if (sequence.length < 10) {
		document.getElementById("count").innerHTML = '0' + sequence.length;		
	} else {
		document.getElementById("count").innerHTML = sequence.length;
	}
	if (sequence.length === 21) {
		alert("Congratulations, you have beaten the game");
		restartTheGame();
	}
	for (var i = 0; i <= sequence.length; i++) {
		var j = 0;
		(function(index) {
			setTimeout(function() { 
				setTimeout(clearButtonColor, speed);
				if (restart) {
					return;
				}

				if (j < sequence.length) {
					if (sequence[j] === 1) {
						document.getElementById("green").style.background = '#41D559';
						var sound1 = document.getElementById('greenSound');
						sound1.play();
					} else if (sequence[j] === 2) {
						document.getElementById("red").style.background = '#EC5E5E';
						var sound2 = document.getElementById('redSound');
						sound2.play();
					} else if (sequence[j] === 3) {
						document.getElementById("yellow").style.background = "#DBEA0A";
						var sound3 = document.getElementById('yellowSound');
						sound3.play();
					} else if (sequence[j] === 4) {
						document.getElementById("blue").style.background = "#676BF4";
						var sound4 = document.getElementById('blueSound');
						sound4.play();   
					} 
				} else {
					document.getElementById("green").style.background = 'green';
					document.getElementById("red").style.background = '#9D0000';
					document.getElementById("yellow").style.background = '#B9B41E';
					document.getElementById("blue").style.background = '#000A8C';
					enableButtons();
				}

				j += 1;
			 }, i * (2 * speed));
		})(i);
	}
}

function testTheInput(lastPress) {
	continueValue = true;
	if (z != sequence.length) {
		if (sequence[z] === lastPress) {
			z++; 
			buttonFinder(lastPress);
		} else {
			if (!strictModeStatus) {
				disableButtons();
				setTimeout(wrongButtonEffect, 200);
				z = 0;
				replayLastSequence = true;	
				if (restart) {
					return;
				}
				setTimeout(beginGame, 2500);
				continueValue = false;
			} else {
				disableButtons();
				setTimeout(gameOverEffect, 200);
				document.getElementById("count").innerHTML = '00';
				z = 0;
				tryAgainFromStart = true;
				if (restart) {
					return;
				}
				setTimeout(beginGame, 2500);
			}
		}
	}
	if (z === sequence.length) {
		disableButtons();
		replayLastSequence = false;
		z = 0;
		if (restart) {
			restartTheGame();
		}
		setTimeout(beginGame, 1500);
	}
}

function buttonFinder(whatpress) {
	if (whatpress === 1) {
		document.getElementById("green").style.background = '#41D559';
		var sound1 = document.getElementById('greenSound');
		sound1.play();
	} else if (whatpress === 2) {
		document.getElementById("red").style.background = '#EC5E5E';
		var sound2 = document.getElementById('redSound');
		sound2.play();
	} else if (whatpress === 3) {
		document.getElementById("yellow").style.background = "#DBEA0A";
		var sound3 = document.getElementById('yellowSound');
		sound3.play();
	} else if (whatpress === 4) {
		document.getElementById("blue").style.background = "#676BF4";
		var sound4 = document.getElementById('blueSound');
		sound4.play();   
	} 	
	setTimeout(clearButtonColor, 300);
}

function clearButtonColor() {
	document.getElementById("green").style.background = 'green';
	document.getElementById("red").style.background = '#9D0000';
	document.getElementById("yellow").style.background = '#B9B41E';
	document.getElementById("blue").style.background = '#000A8C';
}

function wrongButtonEffect() {
	var wrongbutton = document.getElementById('wrongButtonSound');
	wrongbutton.play(); 
	wrongButtonFlash();	
}

function wrongButtonFlash() {
	for (var i = 0; i < 3; i++) {
		(function(index) {
			setTimeout(function() { 
				document.getElementById("green").style.background = '#41D559';
				document.getElementById("red").style.background = '#EC5E5E';
				document.getElementById("yellow").style.background = "#DBEA0A";
				document.getElementById("blue").style.background = "#676BF4";
				setTimeout(clearButtonColor, 250);
			 }, i * 500);
		})(i);
	}
}

function gameOverEffect() {
	var gameover = document.getElementById('gameOverSound');
	gameover.play();   
	gameOverFlash();
}

function gameOverFlash() {
	if (restart) {
		return;
	}
	document.getElementById("green").style.background = '#41D559';
	document.getElementById("red").style.background = '#EC5E5E';
	document.getElementById("yellow").style.background = "#DBEA0A";
	document.getElementById("blue").style.background = "#676BF4";
	setTimeout(clearButtonColor, 1500);
}



	

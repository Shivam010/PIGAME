/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, scoreLimit;

newGame();

document.querySelector('.btn-roll').addEventListener('click', rollDice)
document.addEventListener('keydown', function(event){
	if(event.code === "KeyR") {
		rollDice();
	}
});

document.querySelector('.btn-hold').addEventListener('click', changePlayer);
document.addEventListener('keydown', function(event){
	if(event.code === "KeyH") {
		changePlayer();
	}
});

document.querySelector('.btn-new').addEventListener('click', newGame);
document.addEventListener('keydown', function(event){
	if(event.code === "KeyN") {
		newGame();
	}
});

document.getElementById('limit').addEventListener('keydown', function (event) {
	if(event.code === "Enter") {
		scoreLimit = Number(document.getElementById('limit').value);
		document.getElementById('limit').value = null;
		document.getElementById('limit').style.display = 'none';
		document.getElementById('gameName').style.display = 'none';

		document.querySelector('.btn-roll').style.display = 'block';
		document.querySelector('.btn-hold').style.display = 'block';
		document.querySelector('.btn-new').style.display = 'block';

		document.querySelectorAll('.dull').forEach(function(cls){
		    cls.classList.remove('dull');
		});
		
	}
});

function newGame () {
	activePlayer = 0;
	roundScore = 0;
	score = [0,0];

	document.getElementById('gameName').style.display = 'block';
	document.getElementById('limit').style.display = 'block';

	document.querySelectorAll('.winner').forEach(function (winner) {
		winner.style.display = 'none';
	});
	document.querySelector('.btn-roll').style.display = 'none';
	document.querySelector('.btn-hold').style.display = 'none';
	document.querySelector('.btn-new').style.display = 'none';

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.add('dull');
	document.querySelector('.player-1-panel').classList.add('dull');

	document.getElementById('limit').focus();
}

function rolling () {
	document.querySelector('.dice').style.display = 'block';
	
	var dice = Math.floor(Math.random() * 6) + 1;

	var times = Math.floor(Math.random()*12) + 12;
	for(var i=0;i<times;i++){
		document.querySelector('.dice').setAttribute('src', 'images/dice-'+ new Number(i%6 + 1) + '.png');
	};

	document.querySelector('.dice').setAttribute('src', 'images/dice-'+ dice + '.png');
	return dice;
}

function rollDice () {

	activePlayer = Number(document.querySelector('.active').children[0].id.split('-')[1]);
	
	var dice = rolling();
	roundScore += dice;

	if (dice === 1) {
		roundScore = 0;
		changePlayer();
		return;
	}
	document.getElementById('current-'+activePlayer).textContent = roundScore;
}

function changePlayer () {

	score[activePlayer] += roundScore;
	document.getElementById('current-'+activePlayer).textContent = 0;
	document.getElementById('score-'+activePlayer).textContent = score[activePlayer];

	if(score[activePlayer] >= scoreLimit) {

		document.querySelector('.pl-'+activePlayer).style.display = 'block';
		
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
		
		return
	}

	document.querySelector('.active').classList.remove('active');
	activePlayer = 1 - activePlayer;
	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');

	document.getElementById('current-'+activePlayer).textContent = 0;
	roundScore = 0;
}


/*
 * Create a list that holds all of your cards
 */
let cardArray = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor', 
'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 
'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

let openCards = []; //openCards.length to get count of cards in this aray
let clicks = 0;
let rating = document.querySelector('.stars', 'ul');
let reset = document.querySelector('.restart');
let matchTotal = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    console.log('im in the shuffle')
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    array.forEach(function(arrayOfCards){

    	let li = `<li class="card"><i class="fa ${arrayOfCards}"></i></li>`;
    	let addCards = document.querySelector('.deck');
    	addCards.insertAdjacentHTML('afterbegin', li);
    	console.log(li);
    })

    return array;
}

function modal() {
	let newElement = document.createElement('div');
	newElement.setAttribute('class', 'backdrop');
	document.getElementsByClassName('container')[0].appendChild(newElement);
	document.querySelectorAll('.score-panel')[0].classList.add('modal');
	document.querySelectorAll('.modal')[0].style.display = 'block';
	
}

//function to start the timer after the first click
let seconds = 0;
let myTimer = 0;

	function startTimer() {
		seconds ++;
	    document.getElementById('seconds').innerText = seconds % 60;
	    document.getElementById('minutes').innerText = parseInt(seconds / 60);
	    
	}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//This function resets the game to brand new when you click the reset button
reset.addEventListener('click', function() {
		location.reload(true);
		newGame();
	});

//This is the beginning of the actual game play
function newGame() {
		shuffle(cardArray);//calls the function to shuffle the cards

let allCards = document.querySelectorAll('.card');
allCards.forEach(function(card) {	
	card.classList.remove('open', 'show', 'match', 'shake', 'rubberBand' );//resets the board to no cards flipped
	card.addEventListener('click', function(e) {		
		clicks += 1; //Keeps tally of the number of moves taken
		let tally = document.querySelector('.moves').textContent = clicks;

		//this starts the timer on the first click
		if (clicks == 1){
		myTimer = setInterval(startTimer, 1000);
		}
		//This section below counts the number of clicks and removes the star ratings as you go
		let rating = document.querySelector('.stars li');
		console.log(clicks);
		switch (clicks) {
			case 17:
				rating.firstChild.remove();
			case 20:
			  	rating.nextSibling.remove();
			case 24:
				rating.remove();
		}
		// This next if statement makes sure none of the open, show or match classes are active on the selected card already
		// if any of them are, you will not be able to click them
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');
			if (openCards.length == 2) {
				// openCards.forEach(function(){
				 	if (openCards[0].outerHTML == openCards[1].outerHTML) {
				 		console.log('match');
				 		openCards[0].classList.add('match', 'animated', 'rubberBand');
				 		openCards[1].classList.add('match', 'animated', 'rubberBand');
				 		openCards = [];//This resets the number of cards in openCards to zero so that you can select more
				 		matchTotal +=1;
				 		console.log(matchTotal);
				 		console.log(allCards.length / 2);
				 		if (matchTotal == allCards.length/2) { //This will look for a total of 8 matches signifying all cards matched
							console.log('You Win!!');
							clearInterval(myTimer); //this stops the timer
							modal(); //calls modal popup window
						}
				 	} else {
				 		openCards.forEach(function(card) {
				 			card.classList.add('shake');
				 		})				 		
				 		setTimeout(function() {
				 		console.log('not a match');
				 		console.log(openCards);
					 		openCards.forEach(function(card) {
					 			card.classList.remove('open', 'show', 'shake');
					 		});					 		
					 		openCards = [];
					 		}, 1000);
				 		} 
				
				}
			} 
		})
	})
};

newGame();//This calls the beginning of the game upon first opening the browser
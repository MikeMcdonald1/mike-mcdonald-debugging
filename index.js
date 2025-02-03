// variables for guess input and both buttons
const guessInput = document.getElementById('guess'); // Guess input box
const submitButton = document.getElementById('submit'); //Submit Guess button
const resetButton = document.getElementById('reset'); //Reset button

//variables for potential MESSAGES
const messages = document.getElementsByClassName('message');//I'm thinking of a number from 1 to 99!Can you guess it in 5 tries or less?
const tooHighMessage = document.getElementById('too-high');//You guessed too high. Try again.
const tooLowMessage = document.getElementById('too-low');//You guessed too low. Try again.
const maxGuessesMessage = document.getElementById('max-guesses');//You reached max number of guesses
const numberOfGuessesMessage = document.getElementById('number-of-guesses');//?????????????????????????????!!!!!!!!!!!!!!!
const correctMessage = document.getElementById('correct'); //Congratulations, You guessed correctly! <br>Would you like to play again?

let targetNumber; //IMPORTANT: WE MIGHT NEED TO DEFINE THIS SINCE IT IS UNDEFINED, PROBABLY WITH FUNCTION
let attempts = 0;
const maxNumberOfAttempts = 5;

// This function returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 99)
// <- 32
// > getRandomNumber(1, 99)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//function declaration for hideAllMessages() function
function hideAllMessages() {//defines function, the loop goes through every item in the messages collection
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {//IMPORTANT: SHOULD BE < INSTEAD OF <=!!!!!!!!
    messages[elementIndex].style.display = 'none';//for each message, this hides it an sets display to none which removes it from screen
  }
}

// Get value from guess input, and up attempts
function checkGuess() {
  const guess = parseInt(guessInput.value, 10);
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    alert("Please enter a number between 1 and 100.");
    return;
  }
  
  attempts = attempts + 1;


// Function for hiding and clearing all messages being displayed on screen
  hideAllMessages();//IMPORTANT: THIS IS A CALL MADE BEFORE DECLARATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// IF user guess equals target number AKA user is correct do this
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = ''; //this shows the message that tells the player how many guesses they've made
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`; //this updates the guesses amount stored in attempts variable

    correctMessage.style.display = ''; //this displays the #correct paragraph text hello

    submitButton.disabled = true;//this disables the submitButton
    guessInput.disabled = true;//this disables the guessInput
  }

// IF user guess does not equal target number AKA user is incorrect and they haven't reached max attempts do this
  if (guess !== targetNumber) { //if guess does NOT equal target number then there are a three options(try again or game over because guesses reached)
    if (guess < targetNumber) {//scenario one is guess is less than target number
      tooLowMessage.style.display = ''; //display too low message
    } else { //otherwise do this, meaning guess was too high
      tooHighMessage.style.display = ''; // !IMPORTANT display too HIGH message ! BUG FOUND HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    let remainingAttempts = maxNumberOfAttempts - attempts;//if guess is too high or low AND user has attempts left, display this
    //IMPORTANT: CONST SHOULD BE CHANGED TO LET TO ALLOW CHANGES TO REMAINING ATTEMPTS EACH TURN

    numberOfGuessesMessage.style.display = '';//display this message AFTER a guess is made
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;//add in user's previous guess, and display guesses remaining
    if (remainingAttempts === 1) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }
  }

  if (attempts === maxNumberOfAttempts) {//IF user reaches maximum number of attempts without guessing target number
    submitButton.disabled = true;//disable the submit button so it is not used again
    guessInput.disabled = true;//disable the guess input box so it is not used again
  }

  guessInput.value = '';//this clears whatever guess was typed into the input field 

  resetButton.style.display = ''; //this makes the reset button visible again
}



// Declare setup() function
function setup() {

  targetNumber = getRandomNumber(1, 100);// Get random number that user will be trying to guess, store in var called targetNumber
  console.log(`target number: ${targetNumber}`);//console log random number, but user will not see it displayed

  // maxNumberOfAttempts = 0;  //Reset number of attempts, IMPORTANT: SHOULD PROB BE SET TO MAX NUMBER OF ATTEMPTS DESIRED (here it is 5)...DIDN'T WORK BUT WAIT THIS VARIABLE WAS ALREADY DEDCLARED GLOBALLY!

  submitButton.disabled = false; //Enable the Submit Guess button IMPORTANT TYPO HERE!!!!!!!!!!!!!!!!!!!!!!! DISABELD CHANGED TO DISABLED
  guessInput.disabled = false; //Enable the guess input box

  hideAllMessages(); //run hideAllMessages function and hide all messages that were previously displayed
  resetButton.style.display = 'none'; //hides the display button at the start
}

submitButton.addEventListener('click', checkGuess); //when clicked, checkGuess() function is called
resetButton.addEventListener('click', setup); //when clicked, setup() function is called

  // Call setup() function
setup(); //initializes everything when page is first loads. put this last bc you need everything else to be defined first, order of execution
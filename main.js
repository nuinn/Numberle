// create random password
const password = [];
for (let i = 0; i < 5; i++) {
  const number = (Math.floor(Math.random() * 10));
  password.push(number);
}

const root = document.getElementById('root'); // access root
// create title
const title = document.createElement('h1');
title.id = 'title';
title.innerText = 'Numberwang';
root.appendChild(title);

// create game board
const gameContainer = document.createElement('div');
gameContainer.id = 'gameContainer';
root.appendChild(gameContainer);
for (let i = 0; i < 6; i++) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  // rowDiv.classList.add(i);
  gameContainer.appendChild(rowDiv);
  for (let j = 0; j < 5; j++) {
    const numberBox = document.createElement('div');
    numberBox.classList.add('cell');
    numberBox.classList.add(i);
    rowDiv.appendChild(numberBox);
  }
}
// create keypad
const keyPad = document.createElement('div');
keyPad.id = 'keyPad';
root.appendChild(keyPad);
const enter = document.createElement('div');
enter.id = 'enter';
enter.innerText = 'ENTER';
keyPad.appendChild(enter);
for (let i = 0; i < 10; i++) {
  const keyNumber = document.createElement('div');
  keyNumber.classList.add('key');
  keyNumber.id = i;
  keyNumber.innerText = i;
  keyPad.appendChild(keyNumber);
}
const backspace = document.createElement('div');
backspace.id = 'backspace';
backspace.innerText = 'BACK';
keyPad.appendChild(backspace);

// rows = document.getElementsByClassName('row');

let h = 0; // will count rows
let i = 0; // will count columns

// function to deal with interaction with keypad
function getNumber(event){
  const rowElements = document.getElementsByClassName(h); // saves all elements in row h in an array
  const gotNumber = event.target.innerText; // saves number which is clicked
  // avoids issue with parent div's inner entire inner text being called, as well as ENTER being pressed too early
  if (gotNumber.length > 5 || gotNumber === 'ENTER' && i < 5){
    return;
  }
  // when ENTER is clicked at the right time
  if (gotNumber === 'ENTER' && i === 5){
    const guess = getGuess(rowElements);
    checkNumber(guess,password,rowElements);
    h++; // moves on to next row
    i = 0; // resets i to work from first cell again
  }
  // controls the BACK button
  else if (gotNumber === 'BACK'){
    if (i > 0){ // ensures that you can't go back beyond 0
      i--;
      rowElements[i].innerText = '';
      rowElements[i].style.borderColor = 'lightgrey';
    }
  }
  // else if (i >= 5){
  //   console.log('here');
  //   i = 5;
  // }
  // if all else is OK, fills the board with number
  else{
    if (i < 5){
      rowElements[i].innerText = gotNumber;
      rowElements[i].style.borderColor = 'grey';
      i++;
    }
  }
}
if (i < 5){
  keyPad.onclick = getNumber; // interaction with the keypad
}
function getGuess(rowElements){
  const rowElementsArray = [...rowElements];
  const guess = rowElementsArray.map((rowElement) => {
    return rowElement.innerText;
  });
  // const guess = [];
  // for (let i = 0; i < rowElements.length; i++) {
  //   const number = rowElements[i].innerText;
  //   guess.push(number);
  // }
  return guess;
}
function checkNumber(guess,password,rowElements){
  const passwordCopy = [...password];
  // for (let i = 0; i < password.length; i++) {
  //   passwordCopy.push(password[i]);
  // }
  for (let j = 0; j < guess.length; j++) {
    const number = parseInt(guess[j]);
    // const currentCell = rowElements[j];
    if (number === password[j]){
      delete passwordCopy[passwordCopy.indexOf(number)];
    }
  }
  for (let k = 0; k < guess.length; k++) {
    const number = parseInt(guess[k]);
    const currentCell = rowElements[k];
    if (number === password[k]){
      currentCell.style.color = 'white';
      currentCell.style.backgroundColor = '#6BAA64';
      currentCell.style.borderColor = '#6BAA64';
    }
    else if (passwordCopy.includes(number)){
      currentCell.style.color = 'white';
      currentCell.style.backgroundColor = '#C9B458';
      currentCell.style.borderColor = '#C9B458';
      delete passwordCopy[passwordCopy.indexOf(number)];
    }
    else{
      currentCell.style.color = 'white';
      currentCell.style.backgroundColor = 'grey';
    }
  }
  let passwordGuessed = true;
  for (let i = 0; i < passwordCopy.length; i++) {
    passwordCopy[i] === undefined ? passwordGuessed : passwordGuessed = false;
  }
  if (passwordGuessed === true){
    alert('You win!');
  }
}


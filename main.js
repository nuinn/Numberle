const password = [];
for (let i = 0; i < 5; i++) {
  const number = (Math.floor(Math.random() * 10));
  password.push(number);
}
const root = document.getElementById('root');
const title = document.createElement('p');
title.id = 'title';
title.innerText = 'Numberwang';
root.appendChild(title);
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
  keyNumber.innerText = i;
  keyPad.appendChild(keyNumber);
}
const backspace = document.createElement('div');
backspace.id = 'backspace';
backspace.innerText = 'BACK';
keyPad.appendChild(backspace);



// rows = document.getElementsByClassName('row');
// console.log(rows);
// console.log(rowElements);
let h = 0;
let i = 0;
function getNumber(event){
  rowElements = document.getElementsByClassName(h);
  const gotNumber = event.target.innerText;
  if (gotNumber === 'ENTER' && i === 5){
    guess = getGuess(rowElements);
    checkNumber(guess,password);
    h++;
    i = 0;
  }
  else if (gotNumber.length > 5 || gotNumber === 'ENTER' && i < 5){
  }
  else if (gotNumber === 'BACK'){
    if (i > 0){
      i--;
      rowElements[i].innerText = '';
    }
  }
  else{
    rowElements[i].innerText = gotNumber;
    i++;
  }
}
keyPad.onclick = getNumber;
function getGuess(rowElements){
  const guess = [];
  for (let i = 0; i < rowElements.length; i++) {
    const number = rowElements[i].innerText;
    guess.push(number);
  }
  return guess;
}
function checkNumber(guess,password){
  const passwordCopy = [];
  for (let i = 0; i < password.length; i++) {
    passwordCopy.push(password[i]);
  }
  for (let j = 0; j < guess.length; j++) {
    const number = parseInt(guess[j]);
    currentCell = rowElements[j];
    if (number === password[j]){
      delete passwordCopy[passwordCopy.indexOf(number)];
    }
  }
  for (let k = 0; k < guess.length; k++) {
    const number = parseInt(guess[k]);
    currentCell = rowElements[k];
    if (number === password[k]){
      currentCell.style.color = 'white';
      currentCell.style.backgroundColor = '#6BAA64';
    }
    else if (passwordCopy.includes(number)){
      currentCell.style.color = 'white';
      currentCell.style.backgroundColor = '#C9B458';
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


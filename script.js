const cards = document.querySelectorAll('.memory-card');
const restartButton = document.getElementById('restart-button');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

shuffle();

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');
  if(!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // match cards
  if(firstCard.dataset.img === 
    secondCard.dataset.img) {
    // MATCH
    disableCards();
  } else {
    // NOT A MATCH
    unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 700)
}
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
};

cards.forEach(card => card.addEventListener('click', flipCard));

// RESTART
restartButton.addEventListener('click', () => {
  cards.forEach(card => card.classList.remove('flip'));
  setTimeout(() => {
    cards.forEach(card => card.addEventListener('click', flipCard));
    resetBoard();
    shuffle();
  }, 500)
});
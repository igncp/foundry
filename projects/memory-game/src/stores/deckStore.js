import actions from 'actions.js';

let deck;

const shuffleArr = (array) => {
  var counter = array.length,
    newArray = R.map(R.identity, array),
    temp, index;
  
  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = newArray[counter];
    newArray[counter] = newArray[index];
    newArray[index] = temp;
  }

  return newArray;
};

const randomItem = (array)=> array[Math.floor((Math.random() * array.length))];

const generateShuffledArrayDoubledNumbers = (cardsNumber) => {
  const isEven = (cardsNumber % 2) === 0;
  const numbers = R.range(1, Math.floor(cardsNumber / 2) + 1);
  const cardsNumbers = numbers.concat(numbers).concat((isEven) ? [] : [randomItem(numbers)]);

  return shuffleArr(cardsNumbers);
};

const isFaceDownPred = R.propEq('isFaceDown', true);
const turnDownADeck = R.map((card)=> card.isFaceDown = true);
const getCardsUpOfADeck = R.filter(R.compose(R.not, isFaceDownPred));


export default Reflux.createStore({
  init() {
    this.listenTo(actions.generateDeck, this.onGenerateDeck);
    this.listenTo(actions.handleCardClick, this.onHandleCardClick);
  },
  generateDeck(cardsNumber) {
    const deck = [];
    const shuffledNumbersArr = generateShuffledArrayDoubledNumbers(cardsNumber);

    for (let i = 0; i < cardsNumber; i++) {
      deck.push({
        id: i,
        value: shuffledNumbersArr[i],
        isFaceDown: true,
      });
    }
    return deck;
  },
  onHandleCardClick(cardId) {
    const card = R.find(R.propEq('id', cardId), deck);

    if (card.isFaceDown === false) return;

    const cardsUp = getCardsUpOfADeck(deck);

    if (cardsUp.length === 0 || cardsUp.length === 1) {
      card.isFaceDown = !card.isFaceDown;
      if (cardsUp.length === 1) {
        setTimeout(()=> {
          turnDownADeck(deck);
          this.onTrigger();
        }, 1000);
      }

      this.onTrigger();
    }
  },
  onGenerateDeck(cardsNumber) {
    deck = this.generateDeck(cardsNumber);
    this.onTrigger();
  },
  onTrigger() {
    this.trigger({
      deck: deck,
    });
  },
});
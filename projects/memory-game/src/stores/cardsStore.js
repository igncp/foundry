import actions from 'actions.js';

let cards;

export default Reflux.createStore({
  init() {
    this.listenTo(actions.generateCards, this.onGenerateCards);
  },
  onGenerateCards() {
    cards = 
    this.trigger({
      cards: cards,
    });
  }
});
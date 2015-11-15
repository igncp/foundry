import actions from 'actions.js';

let scoreValue = 0;

export default Reflux.createStore({
  init() {
    this.listenTo(actions.increaseScore, this.onIncreaseScore);
    this.listenTo(actions.decreaseScore, this.onDecreaseScore);
  },
  onIncreaseScore(quantity) {
    this.modifyScoreAndTrigger(quantity);
  },
  onDecreaseScore(quantity) {
    this.modifyScoreAndTrigger(-quantity);
  },
  modifyScoreAndTrigger(quantity) {
    scoreValue += quantity;
    this.trigger({
      score: scoreValue,
    });
  },
});
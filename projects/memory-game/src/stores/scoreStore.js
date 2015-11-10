import actions from 'actions.js';

let scoreValue = 0;

export default Reflux.createStore({
  init() {
    this.listenTo(actions.updateScore, this.onUpdate);
  },
  onUpdate() {
    this.trigger(++scoreValue);
  }
});
import actions from 'actions.js';

let scoreValue = 0;

export default Reflux.createStore({
  onUpdate() {
    this.trigger(++scoreValue);
  }
});
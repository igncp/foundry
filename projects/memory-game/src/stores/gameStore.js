import actions from 'actions.js';

let size;

export default Reflux.createStore({
  init() {
    this.onSetGameSettings();

    this.listenTo(actions.setGameSettings, this.onSetGameSettings);
    this.listenTo(actions.getGameSettings, this.onGetGameSettings);
  },
  onSetGameSettings() {
    size = 3;
    this.triggerGameSettings();
  },
  onGetGameSettings() {
    this.triggerGameSettings();
  },
  triggerGameSettings() {
    this.trigger({
      size: size,
    });
  },
});
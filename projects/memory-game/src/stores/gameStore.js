import actions from 'actions.js';

let size = 4;

export default Reflux.createStore({
  init() {
    this.listenTo(actions.setGameSettings, this.onSetGameSettings);
  },
  onSetGameSettings(settings) {
    size = settings.size;
    this.triggerGameSettings();
  },
  getGameSettings() {
    return {
      size: size,
    };
  },
  triggerGameSettings() {
    const settings = this.getGameSettings();

    this.trigger(settings);
  },
});
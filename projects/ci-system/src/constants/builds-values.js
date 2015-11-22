module.exports = Immutable.fromJS({
  status: {
    pending: {
      text: 'Pending',
      iconsPalette: ['ellipsis-h', 'ellipsis-h', 'ellipsis-h'],
    },
    running: {
      text: 'Running',
      iconsPalette: ['refresh', 'refresh', 'refresh'],
    },
    success: {
      text: 'Running',
      iconsPalette: ['check-circle-o', 'check', 'check-square'],
    },
    error: {
      text: 'Failed',
      iconsPalette: ['times-circle-o', 'exclamation', 'times-circle'],
    }
  },
  states: [{
    type: 'build',
    text: 'Build',
  }, {
    type: 'unit',
    text: 'Unit Test',
  }, {
    type: 'functional',
    text: 'Functional Test',
  }]
});

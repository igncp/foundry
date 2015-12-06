import bind from 'helpers/bindActionToStore';

export const MASK_ON = 'mask_on';
export const MASK_OFF = 'mask_off';

export function mask(message) {
  return bind({
    type: MASK_ON,
    payload: message,
  });
}

export function unmask() {
  return bind({
    type: MASK_OFF,
    payload: null,
  });
}

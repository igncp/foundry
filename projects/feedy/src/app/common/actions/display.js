export const TOAST = 'toast';

export function toast(message) {
  return {
    type: TOAST,
    payload: message,
  };
}

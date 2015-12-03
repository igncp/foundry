export const TOAST = 'toast';

/**
 * @param  {Object} opts toast message options
 * @param  {string} opts.type 'success', 'error', 'warning'
 */
export function toast(opts) {
  return {
    type: TOAST,
    payload: opts,
  };
}

export function toastError(opts) {
  return {
    type: TOAST,
    payload: {type: 'error', ...opts, },
  };
}

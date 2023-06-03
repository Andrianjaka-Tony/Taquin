/**
 * @returns {HTMLElement}
 */
export function getOffsetCard() {
  return document.querySelector(`.card[offset="true"]`);
}

/**
 * @typedef {Object} Position
 * @property {number} top
 * @property {number} left
 */
/**
 * @return {Position}
 */
export function offsetPosition() {
  let styles = window.getComputedStyle(getOffsetCard());
  let { top, left } = styles;
  let response = {
    top: parseInt(top.replace("px", "")),
    left: parseInt(left.replace("px", "")),
  };
  return response;
}

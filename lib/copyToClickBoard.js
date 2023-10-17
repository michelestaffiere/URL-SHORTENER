/**
 * copyToClickBoard
 * targets the button clicked and grabs its siblingElement inner text to the users clipboard.
 * @param {Event} e - tracks the element clicked event
 * @returns {null} - function has no return value.
 */
export const copyToClickBoard = (link) => {
  navigator.clipboard.writeText(link);
  return null;
};



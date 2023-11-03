/**
 * saveToLocalStorage
 * @param {string} link             - Original Link, passed as string.
 * @param {string} shortenedLink    - Shortened Link, passed as string.
 * @returns {void}                  - no return value.
 */
export const saveToLocalStorage = (link, shortenedLink) => {
  if (localStorage.getItem(link)) return; // If the link exists break out.
  localStorage.setItem(link, shortenedLink);
};

/**
 * readLocalStorage
 * @param {null}      - No Params needed, accesses windows Web Storage API.
 * @returns {object}  - returns an object containing all elements stored in local storage that can be parsed for conditional rendering on the client side.
 */
export const readLocalStorage = () => {
  const currentLocalStorage = Object.entries({ ...localStorage });
  if (currentLocalStorage.length === 0) return; // if storage is empty break.
  const validLinksInStorage = [];
  const regExPattern =  /^https:\/\//;
  currentLocalStorage.forEach((array)=>{
    if(regExPattern.test(array[0])){
      validLinksInStorage.push(array);
    }
  });
  return validLinksInStorage
};

/**
 * Removes an item from the local storage list.
 * @param {key} - Item in local storage to be removed.
 */
export const removeHandling = (key) => {
  console.log("removed " + key);
  localStorage.removeItem(key);
};

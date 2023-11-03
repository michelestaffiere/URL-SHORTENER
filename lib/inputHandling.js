// Import dependencies
import axios from "axios";

/**
 * handleInputChange
 * Handles the link input and checks to see if the inputted link is a valid URL that can be shortened.
 * @param {setState} state - state that will be updated needs to be passed in.
 * @param {event || e}  event - tracks the target of the event, e or event needs to passed in.
 * @returns {void} - no return value, only updates state.
 */
export const handleInputChange = (e, setState) => {
  setState(e.target.value);
};

/**
 *  validateLink
 *  Handles link validation for the input field.
 * @param {string} link - represents the link the user will pass into the input - requires a string.
 * @returns  {true || false} - if link is valid URL returns true, else false.
 */
export const validateLink = (link) => {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    try {
      new URL(link);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false; // previous try catch returns no protocol found.
};

/**
 * handleSubmit - handles the submission of the shortener input field
 *
 * @param {event}   e               - tracks the event scoped to the function
 * @param {state}   usersInput      - current state of  the users input in the input field
 * @param {updater} setInput        - updates the userInput state
 * @param {state}   shortLinksState - current state of the shortened links
 * @param {updater} setShortLinks   - updates shortLinksState
 * @param {state} originalLinkState - current state of the original pasted in link
 * @param {updater} setOriginalLinks- updates originalLinkState
 * @param {updater} setLink         - updates the link state
 *
 */
  export const handleSubmit = async (
    e,
    usersInput,
    setInput,
    shortLinksState,
    setShortLinks,
    originalLinkState,
    setOriginalLinks,
    setLink
  ) => {
    e.preventDefault();
    if (validateLink(usersInput) === true) {
      const params = new URLSearchParams();
      params.set("url", usersInput);
      const options = {
        method: "POST",
        url: "https://url-shortener-service.p.rapidapi.com/shorten",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
        },
        data: params,
      };
  
      try {
        const res = await axios.request(options);
        // new states
        const newShortLink = res.data.result_url;
        const newOriginalLink = usersInput;
        // make a spread copy of current state and add new link to it.
        setShortLinks([...shortLinksState, newShortLink]);
        setOriginalLinks([...originalLinkState, newOriginalLink]);
        // Reset Field and Update Link state
        setInput("");
        setLink(true);
        
      } catch (error) {
        console.error(error);
      }
    } else {
      // invalid input
      setLink(false);
    }
  };

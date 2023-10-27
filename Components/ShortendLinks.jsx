import { useState, useEffect } from "react";
import styles from "../Styles/shortenedLinks.module.css";
import { copyToClickBoard } from "../lib/copyToClickBoard";
import { saveToLocalStorage } from "../lib/localStorageHandling";

const ShortenedLinks = ({
  currentShortList,
  currentOgList,
  shortDuringSessionLinks,
  normalDuringSessionLinks,
  setNormalLinksDuringSession,
  setShortLinksDuringSession,
}) => {

  let shortLinks = currentShortList;
  let longLinks = currentOgList;
  const [linkCopied, setLinkCopied] = useState([]);
  const [linkSaved, setLinkSaved] = useState([]);
  const [buttonClicked, setButtonClicked] = useState({});

  const handleClick = (e, link) => {
    copyToClickBoard(link);
    setLinkCopied([...linkCopied, link]);
    setButtonClicked({ ...buttonClicked, [link]: true });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.resultsContainer}>
        {shortLinks.length === 0 && longLinks.length === 0 ? (
          <p className={styles.cta}> Add some links to shorten! 🔗</p>
        ) : (
          <ul>
            {shortLinks.map((link, index) => {
              return (
                <li key={index}>
                  <div className={styles.longLink}>
                    <p>{longLinks[index]}</p>
                  </div>
                  <div className={styles.shortLink}>
                    <p>{link}</p>

                    <button
                      onClick={(e) => {
                        handleClick(e, link);
                      }}
                      className={buttonClicked[link] ? styles.copied : ""}
                    >
                      {linkCopied.includes(link) ? "Copied!" : "Copy Link"}
                    </button>

                    <button
                      className={styles.save}
                      onClick={(e) => {
                        const link =
                          e.target.parentNode.previousElementSibling.children[0]
                            .innerText;
                        const shortLink =
                          e.target.parentNode.children[0].innerText;
                        saveToLocalStorage(link, shortLink);
                        
                        let _shortDuringSession = [...shortDuringSessionLinks];
                        let _normalDuringSession = [...normalDuringSessionLinks];

                        _shortDuringSession.push(shortLink);
                        _normalDuringSession.push(link);

                        setShortLinksDuringSession(_shortDuringSession);
                        setNormalLinksDuringSession(_normalDuringSession);
                      }}
                    >
                      Save Link
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShortenedLinks;

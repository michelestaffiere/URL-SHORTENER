import { useState } from "react";
import styles from "../Styles/shortenedLinks.module.css";
import { copyToClickBoard } from "../lib/copyToClickBoard";

const ShortenedLinks = ({ currentShortList, currentOgList }) => {
  const shortLinks = currentShortList;
  const longLinks = currentOgList;

  const [linkCopied, setLinkCopied] = useState([]);
  const [buttonClicked,setButtonClicked] = useState({});

  const handleClick = (e,link) => {
    copyToClickBoard(link);
    setLinkCopied([...linkCopied, link]);
    setButtonClicked({...buttonClicked, [link]:true});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.resultsContainer}>
        {shortLinks.length === 0 && longLinks.length === 0 ? (
          <p> Add some links to shorten! 🔗</p>
        ) : (
          <ul>
            {shortLinks.map((link, index) => {
              return (
                <li key={index}>
                  <div className={styles.longLink}>
                    <p className="long-link">{longLinks[index]}</p>
                  </div>
                  <div className={styles.shortLink}>
                    <p className="short-link">{link}</p>


                    <button
                      onClick={(e) => {
                        handleClick(e,link);
                      }}
                      className={buttonClicked[link] ? styles.copied:""}
                    >
                      {linkCopied.includes(link) ? "Copied!" : "Copy Link"}
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

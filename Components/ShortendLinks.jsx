import styles from '../Styles/shortenedLinks.module.css'


const ShortenedLinks = ({ currentShortList, currentOgList }) => {
  const shortLinks = currentShortList;
  const longLinks = currentOgList;

  return (
    <div className={`${styles.wrapper} ${styles.resultsContainer}`}>
      {shortLinks.length === 0 && longLinks.length === 0 ? (
        <p> Add some links to shorten! 🔗</p>
      ) : (
        <ul>
          {shortLinks.map((link, index) => {
            return (
              <li key={index}>
                <p className="short-link">{link}</p>
                <p className="long-link">{longLinks[index]}</p>
                <button
                  onClick={(e) => {
                    console.log(e);
                  }}
                >
                  Copy Link
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShortenedLinks;

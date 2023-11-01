import { onValue, ref, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { dbRef } from "../lib/firebase";
import styles from "../Styles/favouriteLinks.module.css";

const FavouriteLinks = ({ userUid }) => {
  const [linksFromDb, setLinksFromDb] = useState({});
  const db = getDatabase();
  const userDbRef = ref(db, `users/${userUid}/savedLinks`);

  useEffect(() => {
    onValue(userDbRef, (snapShot) => {
      const data = snapShot.val();
      setLinksFromDb(data);
    });
  }, [userUid]);

  useEffect(() => {
    // console.log(linksFromDb);
  }, [linksFromDb]);

  return (
    <>
      {linksFromDb === null ? (
        <p>Sign In to see your personal links!</p>
      ) : (
        <div className={styles.container}>
          <ul className={styles.favouriteList}>
            {Object.entries(linksFromDb).map(([key, value]) => {
              return (
                <li key={key}>
                  <div className={styles.longLink}>
                    <p>{value.long}</p>
                  </div>
                  <div className={styles.shortLink}>
                    <p>{value.short}</p>
                    <button>Remove</button>
                    <button>Copy</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default FavouriteLinks;

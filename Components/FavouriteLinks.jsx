import { onValue, ref, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { dbRef } from "../lib/firebase";

const FavouriteLinks = ({ userUid }) => {
  const [linksFromDb, setLinksFromDb] = useState({});
  const db = getDatabase();
  const userDbRef = ref(db, `users/${userUid}/savedLinks`);

  useEffect(() => {
    onValue(userDbRef, (snapShot) => {
      const data = snapShot.val();
      setLinksFromDb(data);
    })
  }, [userUid]);

  useEffect(()=>{
    // console.log(linksFromDb);
  },[linksFromDb])


  return (
    <>
      {linksFromDb === null ? (
        <p>No links</p>
      ) : (
        <>
           {Object.entries(linksFromDb).map(([key, value]) => {
          return (
            <div key={key}>
              <p>Long: {value.long}</p>
              <p>Short: {value.short}</p>
            </div>
          );
        })}
        </>
      )}
    </>
  );
};

export default FavouriteLinks;

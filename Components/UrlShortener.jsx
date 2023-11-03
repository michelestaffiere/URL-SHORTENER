import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/UrlShortener.module.css";
import { handleInputChange, handleSubmit } from "../lib/inputHandling";
import FavouriteLinks from "./FavouriteLinks";
import ShortenedLinks from "./ShortendLinks";
import SavedLinks from "./SavedLinks";

const UrlShortener = ({
  shortLinks,
  normalLinks,
  currentShortList,
  currentOgList,
  children,
  userUid
}) => {
  //states
  const [userInput, setUserInput] = useState("");
  const [linkValid, setLinkValid] = useState(true);

  const [nomralLinksDuringSession, setNormalLinksDuringSession] = useState([]);
  const [shortLinksDuringSession, setShortLinksDuringSession] = useState([]);

  return (
    <section>
      <div className={`${styles.wrapper} ${styles.shortenerContainer}`}>
        <form action="#">
          <input
            type="text"
            name="link"
            id="link"
            value={userInput}
            onChange={(e) => {
              handleInputChange(e, setUserInput);
            }}
            required
            placeholder="Shorten a link..."
            className={linkValid ? "" : styles.invalidLink}
          />
          <button
            onClick={(e) => {
              handleSubmit(
                e,
                userInput,
                setUserInput,
                currentShortList,
                shortLinks,
                currentOgList,
                normalLinks,
                setLinkValid
              );
            }}
          >
            Shorten It!
          </button>
          {linkValid ? (
            ""
          ) : (
            <>
              <p className={styles.invalidMessage}>Please enter valid link.</p>
            </>
          )}
        </form>
      </div>
      <SavedLinks
        shortDuringSessionLinks={shortLinksDuringSession}
        normalDuringSessionLinks={nomralLinksDuringSession}
        setNormalLinksDuringSession={setNormalLinksDuringSession}
        setShortLinksDuringSession={setShortLinksDuringSession}
        userUid = {userUid}
      />
      <ShortenedLinks
        currentShortList={currentShortList}
        currentOgList={currentOgList}
        shortDuringSessionLinks={shortLinksDuringSession}
        normalDuringSessionLinks={nomralLinksDuringSession}
        setNormalLinksDuringSession={setNormalLinksDuringSession}
        setShortLinksDuringSession={setShortLinksDuringSession}
      />
    </section>
  );
};
export default UrlShortener;

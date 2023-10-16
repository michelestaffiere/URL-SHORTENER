import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/UrlShortener.module.css";
import {
  handleInputChange,
  handleSubmit,
  validateLink,
} from "../lib/inputHandling";
import ShortenedLinks from "./ShortendLinks";

const UrlShortener = ({
  shortLinks,
  normalLinks,
  currentShortList,
  currentOgList,
  children,
}) => {
  //states
  const [userInput, setUserInput] = useState("");
  const [linkValid, setLinkValid] = useState(true);

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
      {
        <ShortenedLinks
          currentShortList={currentShortList}
          currentOgList={currentOgList}
        />
      }
    </section>
  );
};
export default UrlShortener;

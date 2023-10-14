import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UrlShortener.module.css";
import {
  handleInputChange,
  handleSubmit,
  validateLink,
} from "../lib/inputHandling";

const UrlShortener = ({
  shortLinks,
  normalLinks,
  currentShortList,
  currentOgList,
}) => {
  //states
  const [userInput, setUserInput] = useState("");
  const [linkValid, setLinkValid] = useState(true);

  return (
    <section className={styles.UrlShortener}>
      <div className={styles.shortenerContainer}>
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
            placeholder="Enter link"
            className={linkValid ? "" : "invalid-link"}
          />
          {linkValid ? (
            ""
          ) : (
            <p className="invalid-message">
              <em>please enter a valid link</em>{" "}
            </p>
          )}
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
        </form>
      </div>
      {
        <div className={styles.results}>
          <ul>
            {currentShortList.map((link, index) => {
              return (
                <li key={index}>
                  <p className="short-link">{link}</p>
                  <p className="long-link">{currentOgList[index]}</p>
                  <button
                  onClick={(e)=>{console.log(e)}
                }
                  >Copy Link</button>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </section>
  );
};
export default UrlShortener;

import React from "react";
import { useEffect, useState } from "react";
import { readLocalStorage, removeHandling } from "../lib/localStorageHandling";

const SavedLinks = ({
  shortDuringSessionLinks,
  normalDuringSessionLinks,
  setNormalLinksDuringSession,
  setShortLinksDuringSession,
}) => {
  const [longLinks, setLongLinks] = useState([]);
  const [shortLinks, setShortLinks] = useState([]);
  const [intialCheck, setIntialCheck] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let currentStorage = readLocalStorage();
    let _longLinks = [...longLinks];
    let _shortLinks = [...shortLinks];
    if (currentStorage) {
      currentStorage.forEach((item) => {
        _longLinks.push(item[0]);
        _shortLinks.push(item[1]);
      });
    }
    setLongLinks(_longLinks);
    setShortLinks(_shortLinks);
    setIntialCheck(true);
  }, []);

  useEffect(() => {
    if(intialCheck){
        let _shortLinks = [...shortLinks];
        let _longLinks = [...longLinks];

        _longLinks.push(normalDuringSessionLinks[normalDuringSessionLinks.length - 1]);
        _shortLinks.push(shortDuringSessionLinks[shortDuringSessionLinks[shortDuringSessionLinks.length - 1]]);

        setLongLinks(_longLinks);
        setShortLinks(_shortLinks);
    }
  }, [shortDuringSessionLinks,normalDuringSessionLinks]);
  return (
    <div>
      {!show ? (
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          Show Saved Links
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            Hide
          </button>
          <ul>
            {longLinks.map((link, index) => {
              return (
                <li key={index}>
                  <p>{link}</p>
                  <p>{shortLinks[index]}</p>
                  <button onClick={(e) => console.log(e)}>remove</button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SavedLinks;

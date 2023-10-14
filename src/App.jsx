import {useState } from 'react'
import './App.css'


import Header from '../Components/Header'
import UrlShortener from '../Components/UrlShortener'
import ShortenedLinks from '../Components/ShortendLinks'
// footer

function App() {
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [originalLinks, setOriginalLinks] = useState([]);

  return (
    <>
      <Header />
      <UrlShortener 
        shortLinks={setShortenedLinks} 
        normalLinks={setOriginalLinks}
        currentShortList ={shortenedLinks}
        currentOgList ={originalLinks}
      />
      <ShortenedLinks 
        currentShortList ={shortenedLinks}
        currentOgList ={originalLinks}
      />

    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'

import Navigation from '../Components/Navigation'
import Header from '../Components/Header'
import UrlShortener from '../Components/UrlShortener'
import ShortenedLinks from '../Components/ShortendLinks'

function App() {
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [originalLinks, setOriginalLinks] = useState([]);


  useEffect(()=>{
    console.log(shortenedLinks)
    console.log(originalLinks)
  },[shortenedLinks,originalLinks])
  return (
    <>
      <Navigation />
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

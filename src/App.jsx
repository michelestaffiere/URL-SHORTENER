import {useState } from 'react'
import './App.css'


import Header from '../Components/Header'
import UrlShortener from '../Components/UrlShortener'
import ShortenedLinks from '../Components/ShortendLinks'
import Layout from '../Components/Layout'
// footer

function App() {
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [originalLinks, setOriginalLinks] = useState([]);

  return (
    <>
    <Layout>

      <Header />
      <UrlShortener 
        shortLinks={setShortenedLinks} 
        normalLinks={setOriginalLinks}
        currentShortList ={shortenedLinks}
        currentOgList ={originalLinks}
      />
    </Layout>

    </>
  )
}

export default App

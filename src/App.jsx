import {useState } from 'react'
import './App.css'


import Layout from '../Components/Layout'
import Header from '../Components/Header'
import UrlShortener from '../Components/UrlShortener'
import Footer from '../Components/Footer'
import Features from '../Components/Features'
import CtaBanner from '../Components/CtaBanner'

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
      <Features />
      <CtaBanner />
      <Footer />
    </Layout>
    </>
  )
}

export default App

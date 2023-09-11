import { useState } from 'react'
import './App.css'

import Navigation from '../Components/Navigation'
import Header from '../Components/Header'
import UrlShortener from '../Components/UrlShortener'

function App() {
  return (
    <>
      <Navigation />
      <Header />
      <UrlShortener />
    </>
  )
}

export default App

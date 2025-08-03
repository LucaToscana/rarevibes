import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onLCP, onINP, onCLS } from 'web-vitals/attribution';

import BottomPlayer from './components/layout/BottomPlayer'
import Navbar from './components/layout/Navbar'

import Home from './pages/Home'
import Artists from './pages/Artists'
import ArtistPage from './pages/ArtistPage'
import Submit from './pages/Submit'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ParallaxLayout from './components/layout/ParallaxLayout'
import AboutUs from './pages/AboutUs'
import { useEffect } from 'react'


export default function App() {

  useEffect(() => {
    onLCP((metric) => {
      console.log('LCP con attribuzione:', metric);
    });

    onINP((metric) => {
      console.log('INP con attribuzione:', metric);
    });

    onCLS((metric) => {
      console.log('CLS con attribuzione:', metric);
    });
  }, []);
  return (

    <BrowserRouter >
      <Navbar />
      <Routes>
        <Route element={<ParallaxLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:slug" element={<ArtistPage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/aboutus" element={<AboutUs />} />

        </Route>
      </Routes>
      <BottomPlayer />
    </BrowserRouter>


  )
}
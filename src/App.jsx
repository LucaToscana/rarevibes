import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './components/layout/Footer'
import BottomPlayer from './components/players/BottomPlayer'
import Navbar from './components/layout/Navbar'

import Home from './pages/Home'
import Artists from './pages/Artists'
import ArtistPage from './pages/ArtistPage'
import Submit from './pages/Submit'
import PrivacyPolicy from './pages/PrivacyPolicy'



export default function App() {
  return (

<BrowserRouter basename="/rarevibes">
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/artists" element={<Artists />} />
    <Route path="/artists/:slug" element={<ArtistPage />} />
    <Route path="/submit" element={<Submit />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
  </Routes>
  <BottomPlayer />
  <Footer />
</BrowserRouter>


  )
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/rarevibes/" element={<Home />} />
        <Route path="/rarevibes/artists" element={<Artists />} />
        <Route path="/rarevibes/artists/:slug"  element={<ArtistPage  /> } />
        <Route path="/rarevibes/submit" element={<Submit />} />
        <Route path="/rarevibes/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <BottomPlayer />
      <Footer></Footer>
    </Router>
  )
}
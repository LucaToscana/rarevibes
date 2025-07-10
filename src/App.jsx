import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Artists from './pages/Artists'
import ArtistPage from './pages/ArtistPage'
import Submit from './pages/Submit'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:slug" element={<ArtistPage />} />
        <Route path="/submit" element={<Submit />} />

      </Routes>
    </Router>
  )
}
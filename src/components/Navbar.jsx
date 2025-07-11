import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react' // icone hamburger & close (usa lucide-react o heroicons)
import { useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="bg-iron sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="heading-monoton">
            RARE VIBES
          </h1>
        </Link>

        {/* Mobile menu button */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop links */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Link
            to="/"
            className={`font-arvo text-xl transition-all duration-200 
    hover:font-bold 
    ${location.pathname === '/' ? 'line-through' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/artists"
            className={`font-arvo text-xl transition-all duration-200 
    hover:font-bold 
    ${location.pathname === '/artists' ? 'line-through' : ''}`}
          >
            Artisti
          </Link>
          <Link
            to="/submit"
            className="btn-monza"
          >
            Submit
          </Link>
        </div>
      </div>

      {/* Mobile links dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute left-0 right-0  px-4 py-4 flex flex-col space-y-3 z-40 shadow-md">
          <Link to="/" className="font-arvo text-lg hover:line-through" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/artists" className="font-arvo text-lg hover:line-through" onClick={() => setMenuOpen(false)}>Artisti</Link>

          <Link
            to="/submit"
            className="font-arvo text-lg bg-monza  font-bold px-4 py-2 rounded-full hover:bg-zinc-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Submit
          </Link>
        </div>
      )}
    </nav>
  )
}

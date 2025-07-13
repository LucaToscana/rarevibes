import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react' // icone hamburger & close (usa lucide-react o heroicons)
import NavLinkCustom from './NavLinkCustom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="bg-iron fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link to="/rarevibes/">
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
          <NavLinkCustom to="/rarevibes/">Home</NavLinkCustom>
          <NavLinkCustom to="/rarevibes/artists">Artists</NavLinkCustom>
          <NavLinkCustom to="/rarevibes/privacy">Privacy</NavLinkCustom>

          <NavLinkCustom to="/rarevibes/submit" extraClass="btn-monza">
            Submit
          </NavLinkCustom>
        </div>
      </div>
      {/* Mobile links dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute left-0 right-0 px-4 py-4 flex flex-col space-y-3 z-40 shadow-md bg-iron">
          <NavLinkCustom to="/rarevibes/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLinkCustom>
          <NavLinkCustom to="/rarevibes/artists" onClick={() => setMenuOpen(false)}>
            Artisti
          </NavLinkCustom>
          <NavLinkCustom to="/rarevibes/privacy" onClick={() => setMenuOpen(false)}>
            Privacy
          </NavLinkCustom>
          <NavLinkCustom to="/rarevibes/submit" extraClass="btn-monza" onClick={() => setMenuOpen(false)}>
            Submit
          </NavLinkCustom>
        </div>
      )}
    </nav>
  )
}

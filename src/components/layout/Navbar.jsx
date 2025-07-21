import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinkCustom from './NavLinkCustom';
import { Menu, X } from 'lucide-react'; // o le tue icone
import { useTranslation } from 'react-i18next'; // 👈 QUESTA È LA RIGA MANCANTE
import LanguageSwitcher from '../../locales/LanguageSwitcher';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation('common'); // 👈 specifica il namespace

  return (
    <nav className="bg-iron fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="px-4 sm:px-8 py-4 flex justify-between items-center">

        <Link to="/">
          <h1 className="heading-monoton">RARE VIBES</h1>
        </Link>
        <div>
          <div className='sm:hidden'>
            <LanguageSwitcher />
          </div>
        </div>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden sm:flex space-x-6 items-center">
          <NavLinkCustom to="/">Home</NavLinkCustom>
          <NavLinkCustom to="/artists"> {t('artists')}</NavLinkCustom>
          <NavLinkCustom to="/privacy">Privacy</NavLinkCustom>
          <NavLinkCustom to="/submit" extraClass="button">
            {t("submit")}

          </NavLinkCustom>
          <LanguageSwitcher />

        </div>
      </div>

      {/* Mobile links dropdown */}
      {menuOpen && (<>

        <div className="sm:hidden absolute left-0 right-0 px-4 py-4 flex flex-col space-y-3 z-40 shadow-md bg-iron">
          <NavLinkCustom to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLinkCustom>
          <NavLinkCustom to="/artists" onClick={() => setMenuOpen(false)}>
            {t('artists')}
          </NavLinkCustom>
          <NavLinkCustom to="/privacy" onClick={() => setMenuOpen(false)}>
            Privacy
          </NavLinkCustom>
          <NavLinkCustom to="/submit" extraClass="button" onClick={() => setMenuOpen(false)}>
            {t("submit")}
          </NavLinkCustom>

        </div></>
      )}
    </nav>
  )
}

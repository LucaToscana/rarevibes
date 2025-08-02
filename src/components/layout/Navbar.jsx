import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinkCustom from './NavLinkCustom';
import { Menu, X } from 'lucide-react'; // o le tue icone
import { useTranslation } from 'react-i18next'; //  QUESTA È LA RIGA MANCANTE
import LanguageSwitcher from '../../locales/LanguageSwitcher';
import CardWrapper from './CardWrapper';
import SectionTitle from './SectionTitle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation('common'); //  specifica il namespace

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 p-3 sm:pr-8 sm:pl-8 md:pr-16 md:pl-16 pt-3  pointer-events-none">

      <div className="  p-0 sm:p-2 w-full  flex justify-between items-center gap-2  md:gap-4 overflow-visible ">

        <SectionTitle>
          <Link to="/">
            <div className='font-arvo text-sm lg:text-xl pointer-events-auto whitespace-nowrap'>
              RARE VIBES
            </div>
          </Link>
        </SectionTitle>

        <div>
          <div className='md:hidden pointer-events-auto'>
            <LanguageSwitcher />
          </div>
        </div>

        <div className='md:hidden pointer-events-auto'>
          <CardWrapper >
            <button
              className="focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </CardWrapper>
        </div>

        <div className="hidden md:flex space-x-6 items-center pointer-events-auto ">
          <NavLinkCustom to="/artists"> {t('artists')}</NavLinkCustom>
          <NavLinkCustom to="/privacy">Privacy</NavLinkCustom>
          <NavLinkCustom to="/aboutus" >{t('aboutus')}</NavLinkCustom>
          <NavLinkCustom to="/submit" extraClass="button"> {t("submit")}</NavLinkCustom>
          <LanguageSwitcher />
        </div>



      </div>

      {/* Mobile links dropdown */}
      {menuOpen && (<>

        <div className="md:hidden absolute  right-8 px-2 py-2 flex flex-col space-y-3 z-50 pointer-events-auto">
          <NavLinkCustom to="/artists" onClick={() => setMenuOpen(false)}>
            {t('artists')}
          </NavLinkCustom>
          <NavLinkCustom to="/privacy" onClick={() => setMenuOpen(false)}>
            Privacy
          </NavLinkCustom>
          <NavLinkCustom to="/aboutus" onClick={() => setMenuOpen(false)}>
            {t('aboutus')}
          </NavLinkCustom>
          <NavLinkCustom to="/submit" extraClass="button" onClick={() => setMenuOpen(false)}>
            {t("submit")}
          </NavLinkCustom>

        </div></>
      )}
    </nav>

  )
}

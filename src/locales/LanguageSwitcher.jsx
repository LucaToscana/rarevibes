import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import FiltersWrapper from '../components/layout/FiltersWrapper';

const languages = [
  { code: 'en', label: '🇬🇧' },
  { code: 'it', label: '🇮🇹' },
  { code: 'fr', label: '🇫🇷' },
  { code: 'es', label: '🇪🇸' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [open, setOpen] = useState(false);

  const current = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left lg:mt-2">
      <FiltersWrapper>

        <button
          onClick={() => setOpen(prev => !prev)}
          className="inline-flex items-center px-1  text-monza text-sm font-medium shadow-sm  focus:outline-none "
        >
          {current.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </FiltersWrapper>
      {open && (
        
        <div className="absolute z-50 mt-2 w-12 rounded-md shadow-lg bg-iron ring-1 ring-black ring-opacity-5">
               <FiltersWrapper>

          <div className="py-1 z-50 ">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => {
                  i18n.changeLanguage(code);
                  setOpen(false);
                }}
                className={`w-full  text-center text-sm hover:bg-gray-100 ${currentLang === code ? 'font-semibold text-monza' : 'text-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
                </FiltersWrapper>

        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

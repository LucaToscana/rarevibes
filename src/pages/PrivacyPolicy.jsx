import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-rubik ">

      <div className="monoton-monza text-lg lg:text-6xl mb-8 mt-10 break-words">{t('title')}</div>
      <div className="h-1 bg-monza mb-16 " />

      <p className="mb-6 arvo-black text-lg   drop-shadow">{t('intro')}</p>

      <h2 className="text-lg  font-semibold mt-8">{t('dataCollectionTitle')}</h2>
      <p className='arvo-black text-lg   drop-shadow'>{t('dataCollection')}</p>

      <h2 className="text-lg  font-semibold mt-8">{t('useOfDataTitle')}</h2>
      <p  className='arvo-black text-lg   drop-shadow'>{t('useOfData')}</p>

      <h2 className="text-lg  font-semibold mt-8">{t('dataSharingTitle')}</h2>
      <p  className='arvo-black text-lg   drop-shadow'>{t('dataSharing')}</p>

      <h2 className="text-lg  font-semibold mt-8">{t('cookiesTitle')}</h2>
      <p  className='arvo-black text-lg   drop-shadow'>{t('cookies')}</p>

      <h2 className="text-lg  font-semibold mt-8">{t('userRightsTitle')}</h2>
      <p  className='arvo-black text-lg   drop-shadow'>{t('userRights')}</p>

      <p className="mt-10 text-sm text-gray-500">{t('lastUpdated')}</p>
    </main>
  );
};

export default PrivacyPolicy;

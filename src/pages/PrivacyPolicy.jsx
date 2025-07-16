import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-rubik">

      <div className="artist-monoton mb-8 mt-10">{t('title')}</div>
      <div className="h-1 bg-monza mb-16 " />

      <p className="mb-6 arvo-black text-xl  drop-shadow">{t('intro')}</p>

      <h2 className="text-xl font-semibold mt-8">{t('dataCollectionTitle')}</h2>
      <p className='arvo-black text-xl  drop-shadow'>{t('dataCollection')}</p>

      <h2 className="text-xl font-semibold mt-8">{t('useOfDataTitle')}</h2>
      <p  className='arvo-black text-xl  drop-shadow'>{t('useOfData')}</p>

      <h2 className="text-xl font-semibold mt-8">{t('dataSharingTitle')}</h2>
      <p  className='arvo-black text-xl  drop-shadow'>{t('dataSharing')}</p>

      <h2 className="text-xl font-semibold mt-8">{t('cookiesTitle')}</h2>
      <p  className='arvo-black text-xl  drop-shadow'>{t('cookies')}</p>

      <h2 className="text-xl font-semibold mt-8">{t('userRightsTitle')}</h2>
      <p  className='arvo-black text-xl  drop-shadow'>{t('userRights')}</p>

      <p className="mt-10 text-sm text-gray-500">{t('lastUpdated')}</p>
    </main>
  );
};

export default PrivacyPolicy;

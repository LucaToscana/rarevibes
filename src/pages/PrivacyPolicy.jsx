import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/layout/SectionTitle';
import SectionDivider from '../components/layout/SectionDivider';
import CardWrapper from '../components/layout/CardWrapper';

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-arvo">

      <div className="mt-24 break-words"><SectionTitle>{t('title')}</SectionTitle></div>

      <SectionDivider></SectionDivider>


      <div className='m-4'>
        <CardWrapper>
          <p className="arvo-black    drop-shadow">{t('intro')}</p>
        </CardWrapper>
      </div>

      <div className='m-4'>
        <CardWrapper>
          <h2 className="  font-semibold ">{t('dataCollectionTitle')}</h2>
          <p className='arvo-black    drop-shadow'>{t('dataCollection')}</p>
        </CardWrapper>
      </div>


      <div className='m-4'>
        <CardWrapper>
          <h2 className="  font-semibold ">{t('useOfDataTitle')}</h2>
          <p className='arvo-black    drop-shadow'>{t('useOfData')}</p>
        </CardWrapper>
      </div>


      <div className='m-4'>
        <CardWrapper>
          <h2 className="  font-semibold ">{t('dataSharingTitle')}</h2>
          <p className='arvo-black    drop-shadow'>{t('dataSharing')}</p>
        </CardWrapper>
      </div>


      <div className='m-4'>
        <CardWrapper>
          <h2 className="  font-semibold ">{t('cookiesTitle')}</h2>
          <p className='arvo-black    drop-shadow'>{t('cookies')}</p>
        </CardWrapper>
      </div>


      <div className='m-4'>
        <CardWrapper>
          <h2 className="  font-semibold ">{t('userRightsTitle')}</h2>
          <p className='arvo-black    drop-shadow'>{t('userRights')}</p>
        </CardWrapper>
      </div>


      <div className='m-4 mt-16 w-96 h-24'>
        <CardWrapper>
          <p className="ext-sm text-gray-500">{t('lastUpdated')}</p>
        </CardWrapper>
      </div>


    </main>
  );
};

export default PrivacyPolicy;

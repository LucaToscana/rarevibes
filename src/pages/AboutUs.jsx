import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/layout/SectionTitle';
import SectionDivider from '../components/layout/SectionDivider';
import CardWrapper from '../components/layout/CardWrapper';
import { useEffect } from 'react';
import BuyMeACoffeeButton from '../components/layout/BuyMeACoffeeButton';
import BuyMeACoffeeSimpleButton from '../components/layout/BuyMeACoffeeButton';

const AboutUs = () => {
    const { t } = useTranslation('about'); // usa il namespace 'about'

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-arvo ">
            <div className="mt-24 break-words ">
                <SectionTitle>{t('title')}</SectionTitle>
            </div>

            <SectionDivider />

            <div className="m-4 p-8">
                <CardWrapper>
                    <p className="arvo-black drop-shadow">{t('intro')}</p>
                </CardWrapper>
            </div>

            {/*
            <div className="m-4">
                <CardWrapper>
                    <h2 className="font-semibold">{t('ourMissionTitle')}</h2>
                    <p className="arvo-black drop-shadow">{t('ourMission')}</p>
                </CardWrapper>
            </div>
                        <div className="m-4">
                <CardWrapper>
                    <h2 className="font-semibold">{t('ourStoryTitle')}</h2>
                    <p className="arvo-black drop-shadow">{t('ourStory')}</p>
                </CardWrapper>
            </div>
            
            <div className="m-4">
        <CardWrapper>
          <h2 className="font-semibold">{t('teamTitle')}</h2>
          <p className="arvo-black drop-shadow">{t('team')}</p>
        </CardWrapper>
      </div>*/ }
            <div className='px-16'> <CardWrapper>
                <div className="flex items-center justify-between w-full ">
                    <p className="arvo-black drop-shadow mr-4">{t('bmc')}</p>
                    <div className="shrink-0">
                        <BuyMeACoffeeSimpleButton />
                    </div>
                </div>
            </CardWrapper></div>


        </main>
    );
};

export default AboutUs;

import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/layout/SectionTitle';
import SectionDivider from '../components/layout/SectionDivider';
import CardWrapper from '../components/layout/CardWrapper';
import { useEffect } from 'react';
import BuyMeACoffeeSimpleButton from '../components/layout/BuyMeACoffeeButton';

const AboutUs = () => {
    const { t } = useTranslation('about'); 

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-heming">
            <div className="mt-24 break-words ">
                <SectionTitle>{t('title')}</SectionTitle>
            </div>

            <SectionDivider />

            <div className="m-4 ">
                <CardWrapper>
                    <p className="heming-black drop-shadow">{t('intro')}</p>
                </CardWrapper>
            </div>

            <div className=' m-4 mb-48'>
                <CardWrapper>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 w-full">
                        <p className="heming-black drop-shadow mr-4">{t('bmc')}</p>
                        <div className="shrink-0">
                            <BuyMeACoffeeSimpleButton />
                        </div>
                    </div>
                </CardWrapper>
            </div>


        </main>
    );
};

export default AboutUs;

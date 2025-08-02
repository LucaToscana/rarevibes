import CardWrapper from '../layout/CardWrapper';
import FiltersWrapper from '../layout/FiltersWrapper';
import SectionTitle from '../layout/SectionTitle';

const MerchList = ({ merch = [] }) => {
    if (!merch.length) return null;

    return (
        <CardWrapper>

            <h3 className="text-sm  font-semibold  font-arvo mb-0.5 leading-snug">Merch</h3>
            <div className="flex flex-wrap justify-center gap-2 font-arvo w-fit">


                {merch.slice(0, 3).map((item, index) => (
                    <CardWrapper>
                        <div
                            key={index}
                            className="w-full max-w-md flex items-center border-b border-gray-200 py-2"
                        >
                            <img
                                loading="lazy" 
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover mr-3 flex-shrink-0"
                            />

                            <div className="flex flex-col justify-center flex-grow">
                                <h3 className="text-sm font-medium text-arvo mb-0.5 leading-tight">{item.name}</h3>
                                <p className="text-xs text-gray-600 mb-1 text-arvo">{item.price}</p>

                                <div className="self-end">
                                    <FiltersWrapper> <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-arvo underline hover:text-black"
                                    >
                                        Buy
                                    </a>
                                    </FiltersWrapper>
                                </div>
                            </div>
                        </div>
                    </CardWrapper>

                ))}
            </div>
        </CardWrapper>
    );
};

export default MerchList;

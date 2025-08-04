import CardWrapper from '../layout/CardWrapper';
import FiltersWrapper from '../layout/FiltersWrapper';

const MerchList = ({ merch = [] }) => {
  if (!merch.length) return null;

  return (
    <CardWrapper>
      <h3 className="text-sm font-semibold font-arvo mb-2 leading-snug">Merch</h3>

      <div className="flex flex-col gap-2 font-arvo w-full">
        {merch
          .filter(item => item.image)
          .slice(0, 3)
          .map((item, index) => (
            <CardWrapper key={index}>
              <div className="flex items-center gap-3">
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/filicio2-small.webp";
                  }}
                  className="w-16 h-16 object-cover bg-gray-100 rounded flex-shrink-0"
                />

                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <h3 className="text-sm font-uèymedium text-black ">{item.name}</h3>
                  <p className="text-xs text-gray-600">{item.price}</p>

                  <div className="mt-1 absolute right-2 bottom-2">
                    <FiltersWrapper>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline hover:text-black"
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

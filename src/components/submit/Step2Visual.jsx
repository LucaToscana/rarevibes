import SubmitArtistFields from "../layout/SubmitArtistField";
import { artistFieldsConfig, groupFieldsByCategory } from "../../data/artistFieldsConfig"; // esempio percorso
import FiltersWrapper from '../layout/FiltersWrapper'
import CardStaticWrapper from '../layout/CardStaticWrapper'
import CompactMerchFields from "./CompactMerchFields";
import { useTranslation } from "react-i18next";


const Step2Visual = ({ formVisual, handleVisualInputChange }) => {
  const groupedFields = groupFieldsByCategory(artistFieldsConfig);
  const { t } = useTranslation("common");
  return (
    <section className="p-6  text-black">
      <div className="mt-4"></div>
      <CardStaticWrapper>

        <FiltersWrapper>
          <h2 className="text-2xl font-bold w-fit text-monza">
            {t("visualart")}
          </h2>
        </FiltersWrapper>
        <div className="p-2">
          <SubmitArtistFields fields={groupedFields.main} form={formVisual} onChange={handleVisualInputChange} />
        </div>
      </CardStaticWrapper>

      <div className="mt-4">
        <CardStaticWrapper>
          <FiltersWrapper>
            <h2 className="text-2xl font-bold w-fit text-monza">
              Merch
            </h2>
          </FiltersWrapper>
          <div className="p-2">
            <CompactMerchFields
              fields={groupedFields.merch}
              form={formVisual}
              onChange={handleVisualInputChange}
            />
          </div>
        </CardStaticWrapper>
      </div>
      <div className="m-4"></div>
      <CardStaticWrapper>
        <FiltersWrapper>
          <h2 className="text-2xl font-bold w-fit text-monza">
            Social
          </h2>
        </FiltersWrapper>
        <div className="p-2">
          <SubmitArtistFields fields={groupedFields.social} form={formVisual} onChange={handleVisualInputChange} />
        </div>
      </CardStaticWrapper>




    </section>
  );
};

export default Step2Visual;
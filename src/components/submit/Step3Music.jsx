import SubmitArtistFields from "../layout/SubmitArtistField";
import { musicianFieldsConfig, groupFieldsByCategory } from "../../data/artistFieldsConfig"; // esempio percorso
import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";
import CompactMerchFields from "./CompactMerchFields";

const groupedFields = groupFieldsByCategory(musicianFieldsConfig);


const Step3Music = ({ formMusic, handleMusicInputChange }) => (


  <section className="p-6  text-black">
    <div className="mt-4"></div>
    <CardStaticWrapper>
      <FiltersWrapper>
        <h2 className="text-2xl font-bold w-fit text-monza">
          Music
        </h2>
      </FiltersWrapper>
      <div className="p-2">
        <SubmitArtistFields fields={groupedFields.main} form={formMusic} onChange={handleMusicInputChange} />
      </div>
    </CardStaticWrapper>


    <div className="mt-4">
      <CardStaticWrapper>
        <FiltersWrapper>
          <h2 className="text-2xl font-bold w-fit text-monza">
            Track
          </h2>
        </FiltersWrapper>
        <div className="p-2">
          <SubmitArtistFields
            fields={groupedFields.track}
            form={formMusic}
            onChange={handleMusicInputChange}
          />
        </div>
      </CardStaticWrapper>
    </div>


    <div className="mt-4">
      <CardStaticWrapper>
        <FiltersWrapper>
          <h2 className="text-2xl font-bold w-fit text-monza">
            Platform
          </h2>
        </FiltersWrapper>
        <div className="p-2">
          <SubmitArtistFields
            fields={groupedFields.platform}
            form={formMusic}
            onChange={handleMusicInputChange}
          />
        </div>
      </CardStaticWrapper>
    </div>


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
            form={formMusic}
            onChange={handleMusicInputChange}
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
        <SubmitArtistFields fields={groupedFields.social} form={formMusic} onChange={handleMusicInputChange} />
      </div>
    </CardStaticWrapper>




  </section>
);

export default Step3Music;

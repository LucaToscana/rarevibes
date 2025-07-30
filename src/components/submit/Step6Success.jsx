import CardStaticWrapper from "../layout/CardStaticWrapper";
import SectionTitle from "../layout/SectionTitle";
import { Link } from "react-router-dom";

const Step6Success = ({ reset, t }) => (



  <CardStaticWrapper>
    <div className="text-center p-6 text-black">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        {t("submissioncomplete")}
      </h2>
      <p className="mb-8">{t("thankyou")}</p>
      <SectionTitle>
        <Link to="/">
          <div className='font-arvo text-xl pointer-events-auto text-arvo'>
            RARE VIBES
          </div>
        </Link>
      </SectionTitle>
    </div>
  </CardStaticWrapper>
);

export default Step6Success;

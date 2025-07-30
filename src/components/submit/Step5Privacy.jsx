import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";
import { CheckboxCustom } from "../layout/CheckboxCustom";

const Step5Privacy = ({
  handleCaptchaChange,
  acceptPrivacy,
  setAcceptPrivacy,
}) => {
  const { t } = useTranslation("common");

  return (
    <CardStaticWrapper>
      <div className="mt-6 text-black space-y-4">
        {/* Checkbox obbligatoria */}
        <div className="flex items-start gap-2 text-sm">
          <div className="ml-3 mr-3">
            <FiltersWrapper>
              <label className="flex items-center cursor-pointer select-none">
                {/* Checkbox nascosta */}
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="peer hidden"
                />

                {/* Quadrato custom */}
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition
          ${acceptPrivacy ? "bg-monza border-black" : "bg-white border-black"}
        `}
                >
                  {acceptPrivacy && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </label>

            </FiltersWrapper>




          </div>
          <span>
            {t("gdprconsent")}&nbsp;


            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "/privacy",
                  "privacyWindow",
                  "width=400,height=300,resizable=yes,scrollbars=yes"
                );
              }}
              className="text-monza underline"
            >
              {t("privacy")}
            </a>
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-center m-5">
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_GOOGLE_CAPTCHA_HTML}
          onChange={handleCaptchaChange}
        />
      </div>
    </CardStaticWrapper>
  );
};

export default Step5Privacy;

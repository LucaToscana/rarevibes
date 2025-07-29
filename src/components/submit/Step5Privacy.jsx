import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper"

const Step5Privacy = ({
  status,
  handleCaptchaChange,
  acceptPrivacy,
  setAcceptPrivacy,
  acceptNewsletter,
  setAcceptNewsletter,
}) => (
  <CardStaticWrapper>
    <div className="mt-6 text-black space-y-4">
      {/* Checkbox obbligatoria */}
      <label className="flex items-start gap-2 text-sm">
        <FiltersWrapper>
          <input
            type="checkbox"
            required
            checked={acceptPrivacy}
            onChange={(e) => setAcceptPrivacy(e.target.checked)}
            className="mt-1"
          />
        </FiltersWrapper>
        <span>
          Dichiaro di aver letto e accettato la{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-monza underline"
          >
            privacy policy
          </a>
          , e acconsento al trattamento dei dati personali ai sensi del GDPR.
        </span>
      </label>

      {/* Checkbox opzionale newsletter 
      <label className="flex items-start gap-2 text-sm">
        <FiltersWrapper>
          <input
            type="checkbox"
            checked={acceptNewsletter}
            onChange={(e) => setAcceptNewsletter(e.target.checked)}
            className="mt-1"
          />
        </FiltersWrapper>
        <span>
          Acconsento a ricevere comunicazioni promozionali e newsletter.
        </span>
      </label>
    
*/}


    </div>
    <div className="mt-6 flex justify-center">
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_GOOGLE_CAPTCHA_HTML}
        onChange={handleCaptchaChange}
      />
    </div>
  </CardStaticWrapper>
);

export default Step5Privacy;

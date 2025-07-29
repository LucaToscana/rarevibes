import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";

const Step5Privacy = ({ status, handleCaptchaChange }) => (
  <>
    <CardStaticWrapper>
      <div className="mt-6 text-black">
        <label className="flex items-start gap-2 text-sm">
          <FiltersWrapper>
            <input type="checkbox" required className="mt-1" />
          </FiltersWrapper>
          <span>
            Dichiaro di aver letto e accettato la{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              privacy policy
            </a>
            , e acconsento al trattamento dei dati personali ai sensi del GDPR.
          </span>
        </label>
      </div>

      <div className="mt-6 flex justify-center">
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_GOOGLE_CAPTCHA_HTML}
          onChange={handleCaptchaChange}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-8 w-full disabled:opacity-50"
      >
        {status === "sending" ? "Invio in corso..." : "Invia"}
      </button>
    </CardStaticWrapper>
  </>
);

export default Step5Privacy;

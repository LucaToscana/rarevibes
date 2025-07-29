import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import musicFilters from "../data/musicFilters.json";
import artFilters from "../data/artFilters.json";
import FiltersWrapper from "../components/layout/FiltersWrapper";
import Step5Privacy from "../components/submit/Step5Privacy";
import Step4Filters from "../components/submit/Step4Filters";
import Step3Music from "../components/submit/Step3Music";
import Step2Visual from "../components/submit/Step2Visual";
import Step1BaseInfo from "../components/submit/Step1BaseInfo";
import {
  formBaseInitialState,
  formVisualInitialState,
  formMusicInitialState,
} from "../components/submit/formInitialStates";

export default function Submit() {
  const [artistType, setArtistType] = useState("visual");
  const [formBase, setFormBase] = useState(formBaseInitialState);
  const [formVisual, setFormVisual] = useState(formVisualInitialState);
  const [formMusic, setFormMusic] = useState(formMusicInitialState);

  const [selectedSubgenres, setSelectedSubgenres] = useState([]);
  const [expandedGenre, setExpandedGenre] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("idle");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  // Handlers
  const handleBaseInputChange = (e) => {
    const { name, value } = e.target;
    setFormBase((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisualInputChange = (e) => {
    const { name, value } = e.target;
    setFormVisual((prev) => ({ ...prev, [name]: value }));
  };

  const handleMusicInputChange = (e) => {
    const { name, value } = e.target;
    setFormMusic((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSubgenre = (key) => {
    setSelectedSubgenres((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const selectAllSubgenres = (genre) => {
    const allKeys = genre.subgenres.map((s) => s.key);
    const allSelected = allKeys.every((key) => selectedSubgenres.includes(key));
    if (allSelected) {
      setSelectedSubgenres((prev) => prev.filter((k) => !allKeys.includes(k)));
    } else {
      setSelectedSubgenres((prev) => [...new Set([...prev, ...allKeys])]);
    }
  };

  const toggleExpandGenre = (key) => {
    setExpandedGenre((prev) => (prev === key ? null : key));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Completa il reCAPTCHA per continuare.");
      return;
    }

    // Verifica nome artista
    const artistNameVisual = formVisual.artistName?.trim().toLowerCase() || "";
    const artistNameMusic = formMusic.artistName?.trim().toLowerCase() || "";
    const artistName =
      artistNameVisual || artistNameMusic || formBase.name.trim().toLowerCase();

    if (!artistName) {
      alert("Inserisci il nome artista nei campi richiesti.");
      return;
    }

    const artistKey = `submittedArtist_${artistName}`;
    if (localStorage.getItem(artistKey)) {
      alert("Hai già inviato una submission con questo nome artista.");
      return;
    }

    setStatus("sending");

    const dataToSend = {
      ...formBase,
      ...formVisual,
      ...formMusic,
      selectedSubgenres: selectedSubgenres.join(", "),
      artistType,
      captchaToken,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        dataToSend,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        alert(" Email inviata con successo!");
        setFormBase(formBaseInitialState);
        setFormVisual(formVisualInitialState);
        setFormMusic(formMusicInitialState);
        setSelectedSubgenres([]);
        setCaptchaToken(null);
        setCurrentStep(1);
        localStorage.setItem(artistKey, "true");
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        alert("Errore durante l’invio. Riprova più tardi.");
      });
  };

  const goNextStep = () => {
    setCurrentStep((prev) => {
      let next = prev + 1;

      // Salta lo step 2 se non è visual o both
      if (next === 2 && artistType === "music") next++;

      // Salta lo step 3 se non è music o both
      if (next === 3 && artistType === "visual") next++;

      // Limita a max 5
      return Math.min(next, 5);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const goPrevStep = () => {
    setCurrentStep((prev) => {
      let prevStep = prev - 1;

      // Salta lo step 3 se non è music o both
      if (prevStep === 3 && artistType === "visual") prevStep--;

      // Salta lo step 2 se non è visual o both
      if (prevStep === 2 && artistType === "music") prevStep--;

      // Limita a min 1
      return Math.max(prevStep, 1);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

  };


  return (
    <main className="max-w-3xl mx-auto p-6 pb-48 pt-24 font-arvo">
      <FiltersWrapper>
        <h1 className="font-arvo font-bold text-center">Submit Your Art & Music</h1>
      </FiltersWrapper>

      {status === "sending" && (
        <p className="text-yellow-600 font-semibold mb-4 text-center animate-pulse">
          🎧 Invio in corso...
        </p>
      )}
      {status === "success" && (
        <p className="text-green-600 font-semibold mb-4 text-center">
          ✅ Messaggio inviato con successo!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-semibold mb-4 text-center">
          Errore durante l'invio. Riprova più tardi.
        </p>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-8 mt-4y">
        {currentStep === 1 && (
          <Step1BaseInfo
            artistType={artistType}
            setArtistType={setArtistType}
            formBase={formBase}
            handleBaseInputChange={handleBaseInputChange}
          />
        )}

        {currentStep === 2 && (artistType === "visual" || artistType === "both") && (
          <Step2Visual formVisual={formVisual} handleVisualInputChange={handleVisualInputChange} />
        )}
        {currentStep === 3 && (artistType === "music" || artistType === "both") && (
          <Step3Music formMusic={formMusic} handleMusicInputChange={handleMusicInputChange} />
        )}

        {currentStep === 4 && (
          <Step4Filters
            artistType={artistType}
            artFilters={artFilters}
            musicFilters={musicFilters}
            selectedSubgenres={selectedSubgenres}
            toggleSubgenre={toggleSubgenre}
            selectAllSubgenres={selectAllSubgenres}
            expandedGenre={expandedGenre}
            toggleExpandGenre={toggleExpandGenre}
          />
        )}

        {currentStep === 5 && (
          <Step5Privacy status={status} handleCaptchaChange={handleCaptchaChange} />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <FiltersWrapper>
              <button
                type="button"
                onClick={goPrevStep}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Indietro
              </button>
            </FiltersWrapper>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (

            <FiltersWrapper>
              <button
                type="button"
                onClick={goNextStep}
                className="px-4 py-2 bg-monza text-white hover:bg-monzadark"
              >
                Avanti
              </button></FiltersWrapper>
          ) : (
            <FiltersWrapper>    <button
              type="submit"
              disabled={status === "sending"}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
            >
              Invia
            </button>
            </FiltersWrapper>
          )}
        </div>
      </form>
    </main>
  );
}

import { useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import musicFilters from "../data/musicFilters.json";
import artFilters from "../data/artFilters.json";

export default function SubmitPage() {
  // Stato form: unisco i campi vecchi e nuovi
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    title: "",
    artistName: "",
    releaseDate: "",
    description: "",
    spotify: "",
    soundcloud: "",
    image: "",
    socials: "",
    albumLink: "",
  });

  const [selectedSubgenres, setSelectedSubgenres] = useState([]);
  const [expandedGenre, setExpandedGenre] = useState(null);
  const [artistType, setArtistType] = useState("both"); // "visual", "music", "both"
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSubgenre = (key) => {
    setSelectedSubgenres((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const selectAllSubgenres = (genre) => {
    const subKeys = genre.subgenres.map((s) => s.key);
    const allSelected = subKeys.every((k) => selectedSubgenres.includes(k));
    if (allSelected) {
      setSelectedSubgenres((prev) => prev.filter((k) => !subKeys.includes(k)));
    } else {
      setSelectedSubgenres((prev) => [...new Set([...prev, ...subKeys])]);
    }
  };

  const toggleExpandGenre = (genreKey) => {
    setExpandedGenre((prev) => (prev === genreKey ? null : genreKey));
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

    // Controllo duplicati: uso artistName come chiave (come nel secondo form)
    const artistKey = `submittedArtist_${form.artistName.toLowerCase().trim()}`;
    if (localStorage.getItem(artistKey)) {
      alert("Hai già inviato una submission con questo nome artista!");
      setStatus("idle");
      return;
    }

    setStatus("sending");

    // Preparo dati da inviare
    const dataToSend = {
      ...form,
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
        setSuccess(true);
        setError(false);
        localStorage.setItem(artistKey, "true");
        alert("Grazie per la tua submission! Email inviata con successo.");
        setForm({
          name: "",
          email: "",
          message: "",
          title: "",
          artistName: "",
          releaseDate: "",
          description: "",
          spotify: "",
          soundcloud: "",
          image: "",
          socials: "",
          albumLink: "",
        });
        setSelectedSubgenres([]);
        setCaptchaToken(null);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        setError(true);
        setSuccess(false);
        alert("Errore durante l’invio. Riprova più tardi.");
      });
  };

  const visualGenres = artFilters.genres;
  const musicGenres = musicFilters.genres;

  const showVisual = artistType === "visual" || artistType === "both";
  const showMusic = artistType === "music" || artistType === "both";

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Contattaci / Submit Your Track</h1>

      {status === "sending" && (
        <p className="text-yellow-500 mb-4 text-center animate-pulse">
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
          ❌ Errore durante l'invio. Riprova più tardi.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo artista */}
        <fieldset className="mb-6">
          <legend className="font-semibold mb-2">Seleziona tipo artista</legend>
          {["visual", "music", "both"].map((type) => (
            <label
              key={type}
              className="inline-flex items-center mr-4 cursor-pointer"
            >
              <input
                type="radio"
                name="artistType"
                value={type}
                checked={artistType === type}
                onChange={() => setArtistType(type)}
                className="mr-2"
              />
              {type === "visual"
                ? "Artisti Visuali"
                : type === "music"
                ? "Musicisti"
                : "Entrambi"}
            </label>
          ))}
        </fieldset>

        {/* Campi base */}
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Messaggio</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            rows={5}
            required
          />
        </div>

        {/* Campi extra musica */}
        {[
          { id: "title", label: "Titolo Traccia o Album", type: "text", required: true },
          { id: "artistName", label: "Nome Artista", type: "text", required: true },
          { id: "releaseDate", label: "Data di Release", type: "date", required: true },
          {
            id: "description",
            label: "Descrizione",
            isTextArea: true,
            required: true,
          },
          { id: "spotify", label: "Link Spotify (opzionale)", type: "url" },
          { id: "soundcloud", label: "Link SoundCloud (opzionale)", type: "url" },
          { id: "albumLink", label: "Link Album Completo (opzionale)", type: "url" },
          { id: "image", label: "URL Cover Image", type: "url", required: true },
          { id: "socials", label: "Social principali (Instagram, X...)", type: "text" },
        ].map(({ id, label, type, isTextArea, required }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block font-medium mb-1"
            >
              {label}
            </label>
            {isTextArea ? (
              <textarea
                id={id}
                name={id}
                value={form[id]}
                onChange={handleInputChange}
                required={required}
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            ) : (
              <input
                type={type || "text"}
                id={id}
                name={id}
                value={form[id]}
                onChange={handleInputChange}
                required={required}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            )}
          </div>
        ))}

        {/* FILTRI Visuali */}
        {showVisual && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Filtri Artisti Visuali</h2>
            {visualGenres.map((genre) => {
              const subKeys = genre.subgenres.map((s) => s.key);
              const allSelected = subKeys.every((k) =>
                selectedSubgenres.includes(k)
              );
              return (
                <div
                  key={genre.key}
                  className="border p-4 rounded bg-gray-100 mb-3"
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => selectAllSubgenres(genre)}
                      />
                      {genre.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleExpandGenre(genre.key)}
                      className="text-sm text-blue-500 underline"
                    >
                      {expandedGenre === genre.key
                        ? "Nascondi"
                        : "Mostra sottogeneri"}
                    </button>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <label
                          key={sub.key}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubgenres.includes(sub.key)}
                            onChange={() => toggleSubgenre(sub.key)}
                          />
                          {sub.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* Separatore se entrambi */}
        {showVisual && showMusic && <hr className="my-8 border-gray-400" />}

        {/* FILTRI Musica */}
        {showMusic && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Filtri Musicisti</h2>
            {musicGenres.map((genre) => {
              const subKeys = genre.subgenres.map((s) => s.key);
              const allSelected = subKeys.every((k) =>
                selectedSubgenres.includes(k)
              );
              return (
                <div
                  key={genre.key}
                  className="border p-4 rounded bg-gray-100 mb-3"
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => selectAllSubgenres(genre)}
                      />
                      {genre.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleExpandGenre(genre.key)}
                      className="text-sm text-blue-500 underline"
                    >
                      {expandedGenre === genre.key
                        ? "Nascondi"
                        : "Mostra sottogeneri"}
                    </button>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <label
                          key={sub.key}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubgenres.includes(sub.key)}
                            onChange={() => toggleSubgenre(sub.key)}
                          />
                          {sub.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* reCAPTCHA */}
        <div className="mt-6">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_GOOGLE_CAPTCHA_HTML}
            onChange={handleCaptchaChange}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-8 w-full disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === "sending" ? "Invio in corso..." : "Invia"}
        </button>
      </form>
    </main>
  );
}

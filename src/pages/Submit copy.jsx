import { useState } from "react";
import emailjs from "@emailjs/browser";
import musicFilters from "../data/musicFilters.json";
import artFilters from "../data/artFilters.json";

export default function Submit() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [selectedSubgenres, setSelectedSubgenres] = useState([]);
  const [expandedGenre, setExpandedGenre] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Nuovo stato per il tipo di artista selezionato
  const [artistType, setArtistType] = useState("both"); // "visual", "music", "both"

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSubgenre = (key) => {
    setSelectedSubgenres((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
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

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        ...form,
        selectedSubgenres: selectedSubgenres.join(", "),
        artistType,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setSelectedSubgenres([]);
    })
    .catch((error) => {
      console.error(error.text);
      setError(true);
    });
  };

  // Decidi quali generi mostrare in base a artistType
  const visualGenres = artFilters.genres;
  const musicGenres = musicFilters.genres;

  const showVisual = artistType === "visual" || artistType === "both";
  const showMusic = artistType === "music" || artistType === "both";

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Contattaci</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo artista */}
        <fieldset className="mb-6">
          <legend className="font-semibold mb-2">Seleziona tipo artista</legend>
          <label className="inline-flex items-center mr-4 cursor-pointer">
            <input
              type="radio"
              name="artistType"
              value="visual"
              checked={artistType === "visual"}
              onChange={() => setArtistType("visual")}
              className="mr-2"
            />
            Artisti Visuali
          </label>
          <label className="inline-flex items-center mr-4 cursor-pointer">
            <input
              type="radio"
              name="artistType"
              value="music"
              checked={artistType === "music"}
              onChange={() => setArtistType("music")}
              className="mr-2"
            />
            Musicisti
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="artistType"
              value="both"
              checked={artistType === "both"}
              onChange={() => setArtistType("both")}
              className="mr-2"
            />
            Entrambi
          </label>
        </fieldset>

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
                <div key={genre.key} className="border p-4 rounded bg-gray-100 mb-3">
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
                      {expandedGenre === genre.key ? "Nascondi" : "Mostra sottogeneri"}
                    </button>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <label key={sub.key} className="flex items-center gap-2">
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
        {showVisual && showMusic && (
          <hr className="my-8 border-gray-400" />
        )}

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
                <div key={genre.key} className="border p-4 rounded bg-gray-100 mb-3">
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
                      {expandedGenre === genre.key ? "Nascondi" : "Mostra sottogeneri"}
                    </button>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <label key={sub.key} className="flex items-center gap-2">
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-8"
        >
          Invia
        </button>

        {success && (
          <p className="text-green-600 font-semibold mt-4">
            Messaggio inviato con successo!
          </p>
        )}
        {error && (
          <p className="text-red-600 font-semibold mt-4">Errore durante l'invio.</p>
        )}
      </form>
    </div>
  );
}

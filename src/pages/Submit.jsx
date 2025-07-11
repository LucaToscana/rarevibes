import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Submit() {
  const [form, setForm] = useState({
    title: '',
    artistName: '',
    releaseDate: '',
    description: '',
    spotify: '',
    soundcloud: '',
    image: '',
    socials: '',
    albumLink: '',
  })

  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const artistKey = `submittedArtist_${form.artistName.toLowerCase().trim()}`

    if (localStorage.getItem(artistKey)) {
      alert('Hai già inviato una traccia con questo nome artista!')
      setStatus('')

      return
    }
    setStatus('sending')

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success')
        localStorage.setItem(artistKey, 'true')

        alert('Grazie per la tua submission! Email inviata con successo.')
        setForm({
          title: '',
          artistName: '',
          releaseDate: '',
          description: '',
          spotify: '',
          soundcloud: '',
          image: '',
          socials: '',
          albumLink: '',
        })
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setStatus('error')
        alert('Errore durante l’invio. Riprova più tardi.')
      })
  }

  return (
    <main className="min-h-screen   px-6 py-12 max-w-2xl mx-auto">
      <h1 className="heading-monoton mb-8 text-center mt-12">Invia la tua Traccia</h1>

      {status === 'sending' && <p className="text-yellow-400 mb-4">Invio in corso...</p>}
      {status === 'success' && <p className="text-green-500 mb-4">Inviato con successo!</p>}
      {status === 'error' && <p className="text-red-500 mb-4">Errore durante l’invio.</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { id: 'title', label: 'Titolo del brano o album', type: 'text', required: true },
          { id: 'artistName', label: 'Nome artista', type: 'text', required: true },
          { id: 'releaseDate', label: 'Data di uscita', type: 'date', required: true },
          { id: 'description', label: 'Descrizione', isTextArea: true, required: true },
          { id: 'spotify', label: 'Link Spotify (opzionale)', type: 'url' },
          { id: 'soundcloud', label: 'Link SoundCloud (opzionale)', type: 'url' },
          { id: 'albumLink', label: 'Link album completo (opzionale)', type: 'url' },
          { id: 'image', label: 'URL immagine copertina', type: 'url', required: true },
          { id: 'socials', label: 'Social principali (Instagram, X, ecc...)', type: 'text' }
        ].map(({ id, label, type, isTextArea, required }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1 title-small">{label}</label>
            {isTextArea ? (
              <textarea
                id={id}
                name={id}
                value={form[id]}
                onChange={handleChange}
                required={required}
                rows={4}
                className="w-full p-3 rounded title-small "
                placeholder="Come è stata creata la traccia, ispirazioni, strumenti..."
              />
            ) : (
              <input
                type={type || 'text'}
                id={id}
                name={id}
                value={form[id]}
                onChange={handleChange}
                required={required}
                className="w-full p-3 rounded title-small "
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="btn-monza"
          disabled={status === 'sending'}
        >
          Invia
        </button>
      </form>
    </main>
  )
}

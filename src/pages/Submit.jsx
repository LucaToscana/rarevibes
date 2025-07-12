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
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto font-sans text-white bg-iron">
      <h1 className="heading-monoton mb-8 text-center mt-12 text-4xl text-monza tracking-wider">
        Submit Your Track
      </h1>

      {status === 'sending' && (
        <p className="text-yellow-400 mb-4 text-center animate-pulse">🎧 Sending...</p>
      )}
      {status === 'success' && (
        <p className="text-green-500 mb-4 text-center">✅ Successfully submitted!</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 mb-4 text-center">❌ Submission failed. Please try again.</p>
      )}


      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { id: 'title', label: 'Track or Album Title', type: 'text', required: true },
          { id: 'artistName', label: 'Artist Name', type: 'text', required: true },
          { id: 'releaseDate', label: 'Release Date', type: 'date', required: true },
          { id: 'description', label: 'Description', isTextArea: true, required: true },
          { id: 'spotify', label: 'Spotify Link (optional)', type: 'url' },
          { id: 'soundcloud', label: 'SoundCloud Link (optional)', type: 'url' },
          { id: 'albumLink', label: 'Full Album Link (optional)', type: 'url' },
          { id: 'image', label: 'Cover Image URL', type: 'url', required: true },
          { id: 'socials', label: 'Main Socials (Instagram, X, etc...)', type: 'text' }
        ].map(({ id, label, type, isTextArea, required }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1 title-small text-monza tracking-wide uppercase">
              {label}
            </label>
            {isTextArea ? (
              <textarea
                id={id}
                name={id}
                value={form[id]}
                onChange={handleChange}
                required={required}
                rows={4}
                className="w-full p-4 rounded-md bg-neutral-100 order border-neutral-700 placeholder:text-neutral-500 title-small resize-none h-32 focus:ring-2 focus:ring-monza focus:outline-none"
                placeholder="Track and project: idea, inspirations, instruments, collaborations, visuals..."
              />
            ) : (
              <input
                type={type || 'text'}
                id={id}
                name={id}
                value={form[id]}
                onChange={handleChange}
                required={required}
                className="w-full p-4 rounded-md bg-neutral-100 border border-neutral-700 placeholder:text-neutral-500 title-small focus:ring-2 focus:ring-monza focus:outline-none"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="btn-monza w-full py-3 rounded-md text-white font-bold tracking-wide uppercase transition duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Submit Track'}
        </button>
      </form>
    </main>
  )
}

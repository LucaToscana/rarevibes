// components/TogglePlayerButton.jsx (o .tsx se usi TypeScript)
export default function TogglePlayerButton({ playerOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={playerOpen ? 'Nascondi player' : 'Espandi player'}
      className="p-2 rounded hover:bg-zinc-700 transition-colors"
    >
      {playerOpen ? (
        // Icona chiusura (X)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-zinc-300 hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        // Icona apertura (+)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-zinc-300 hover:text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
        </svg>
      )}
    </button>
  )
}

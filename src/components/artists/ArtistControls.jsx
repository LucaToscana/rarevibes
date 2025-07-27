// ArtistControls.jsx
import ArtistPlayerButtons from '../players/ArtistPlayerButtons'

export default function ArtistControls({ artist }) {
  return (
    <div className="space-y-1 select-none">
      <ArtistPlayerButtons artist={artist} />  
    </div>
  )
}

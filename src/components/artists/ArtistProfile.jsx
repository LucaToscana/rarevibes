import { useTranslation } from "react-i18next";

const ArtistProfile = ({ slug, className = "" }) => {
  const { t } = useTranslation("bios");
  if (!slug) return null;

  // Recupera dati bio tradotti
  const extended = t(`${slug}.extended`, { defaultValue: "" });
  const trivia = t(`${slug}.trivia`, { defaultValue: "" });
  const lineup = t(`${slug}.lineup`, { returnObjects: true, defaultValue: [] });
  const collaborations = t(`${slug}.collaborations`, { returnObjects: true, defaultValue: [] });
  const discography = t(`${slug}.discography`, { returnObjects: true, defaultValue: [] });

  return (
    <div className={`max-w-4xl mx-auto  p-2 bg-white  bio-text-white  space-y-6 ${className}`}>
      {Array.isArray(lineup) && lineup.length > 0 && (
        <section>
          <h2 className="text-md font-bold mb-2">Line-up</h2>
          <ul className="list-disc list-inside space-y-1">
            {lineup.map((member, index) => (
              <li key={index}>
                <strong>{member.name}</strong> – {member.roles.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(collaborations) && collaborations.length > 0 && (
        <section>
          <h2 className="text-md font-bold mb-2">Collaborations</h2>
          <ul className="list-disc list-inside space-y-1">
            {collaborations.map((collab, index) => (
              <li key={index}>
                <strong>{collab.name}</strong>
                {collab.instrument && ` – ${collab.instrument}`}
                {collab.note && ` (${collab.note})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(discography) && discography.length > 0 && (
        <section>
          <h2 className="text-md font-bold mb-2">Discography</h2>
          <ul className="list-disc list-inside space-y-1">
            {discography.map((release, index) => (
              <li key={index}>
                <strong>{release.title}</strong> ({release.year}) – {release.type}
                {release.with && <> (with <em>{release.with}</em>)</>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {trivia && (
        <section>
          <h2 className="text-md font-bold mb-2">Trivia</h2>
          <p className="text-gray-700">{trivia}</p>
        </section>
      )}
    </div>
  );
};

export default ArtistProfile;

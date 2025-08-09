import { useParams } from 'react-router-dom';
import ItalicQuotes from '../components/layout/ItalicQuotes';
import articlesData from '../locales/en/articles.json';  // Importa il json
import CardStaticWrapper from '../components/layout/CardStaticWrapper';

export default function ArticleDetail() {
  const { slug } = useParams();

  // Prendo l'articolo direttamente dall'oggetto tramite la chiave slug
  const article = articlesData[slug];

  if (!article) {
    return <div className="p-8 max-w-4xl mx-auto text-center">Articolo non trovato</div>;
  }

  return (
    <div className="w-full font-arvo">
      {/* Immagine come sfondo con overlay e titolo */}
      <div
        className="w-full h-[500px] relative flex items-end p-8 text-white rounded"
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%'  // sposta un po' verso l’alto (30% dall’alto)
        }}
      >
        <div style={{ fontFamily: 'Heming' }} className="bg-black/50 p-6 rounded text-3xl font-bold max-w-3xl">
          {article.title}
        </div>
      </div>
      <div className="px-36">
        {/* Testo articolo */}
        <CardStaticWrapper>
          <p
            style={{ whiteSpace: 'pre-line', fontFamily: 'Heming', fontWeight: 300, lineHeight: '1.6', fontSize: '1.125rem' }}
            className="mt-6 text-black"
          >
            <ItalicQuotes text={article.main} />
          </p>
        </CardStaticWrapper>
      </div>
      <div style={{ height: '160px' }}></div>
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import RichContentRenderer from '../components/layout/RichContentRenderer';
import { useEffect } from 'react';
import CardWrapper from '../components/layout/CardWrapper';
import { useTranslation } from 'react-i18next';

export default function ArticleDetail() {
  const { slug } = useParams();
  const { t } = useTranslation('articles');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Prendo l'articolo direttamente dall'oggetto tramite la chiave slug
  const article = t(slug, { returnObjects: true });

  if (!article) {
    return <div className="p-8 max-w-4xl mx-auto text-center">Articolo non trovato</div>;
  }

  return (
    <div className="w-full bg-iron">

      {/* Immagine come sfondo con overlay e titolo */}
      <div
        className="w-full h-[700px] relative flex items-end p-8 text-white rounded"
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

      <div className="px-4 lg:px-36">
        {/* Testo articolo */}
        <div
          style={{ whiteSpace: 'pre-line', fontFamily: 'Heming', fontWeight: 300, lineHeight: '1.6', fontSize: '1.125rem' }}
          className="mt-6 text-black"
        >
          <RichContentRenderer text={article.main} youtube={article.youtube} />
        </div>
      </div>
      <div className="ml-4  lg:ml-16 mt-4">
        <CardWrapper className="text-xs animate-fade-in lowercase font-heming w-fit">
          <Link to="/read">← read</Link>
        </CardWrapper>
      </div>
      <div style={{ height: '160px' }}></div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/layout/ArticleCard';
import articlesData from '../locales/en/articles.json';

export default function Read() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation('articles');

    // Recupera tutte le chiavi dall'oggetto JSON originale
    const articleKeys = Object.keys(articlesData);

    // Recupera tutti gli articoli tradotti con fallback
    const featuredArticles = articleKeys.map((key) => {
        return t(key, { returnObjects: true }) || {
            title: 'Article not found',
            image: '',
            excerpt: 'No excerpt available'
        };
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % featuredArticles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featuredArticles.length]);

    return (
        <div className="w-full font-heming">
            {/* Slider principale */}
            <div className="w-full overflow-hidden relative h-[600px]">
                {featuredArticles.map((article, index) => (
                    <div
                        key={articleKeys[index]}
                        className={`
                            absolute inset-0 bg-cover bg-center flex items-end p-8 text-white
                            transition-opacity duration-1000 ease-in-out
                            ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                            cursor-pointer
                        `}
                        style={{
                            backgroundImage: `url(${article.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 30%'
                        }}
                        onClick={() => navigate(`/read/${articleKeys[index]}`)}
                    >
                        <div className="bg-black/50 p-6 rounded text-3xl font-bold max-w-3xl">
                            {article.title}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sezione articoli recenti */}
            <div className="p-8 max-w-7xl mx-auto">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-48">
                    {articleKeys.map((key) => {
                        return <ArticleCard key={key} articleKey={key}/>;
                    })}
                </div>
            </div>
        </div>
    );
}

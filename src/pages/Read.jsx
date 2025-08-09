import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import articlesData from '../locales/en/articles.json'
import ArticleCard from '../components/layout/ArticleCard';
const featuredArticles = Object.values(articlesData);



export default function Read() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % featuredArticles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full font-heming">
            {/* Slider principale */}
            <div className="w-full overflow-hidden relative h-[600px]">
                {Object.entries(articlesData).map(([key, article], index) => (
                    <div
                        key={key}
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
                        onClick={() => navigate(`/read/${key}`)}
                    >
                        <div className="bg-black/50 p-6 rounded text-3xl font-bold max-w-3xl">
                            {article.title}
                        </div>
                    </div>
                ))}

            </div>

            {/* Sezione articoli recenti */}
            <div className="p-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6">Articoli Recenti</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-48">
                    {Object.entries(articlesData).map(([key, article]) => (
                        <ArticleCard key={key} articleKey={key} article={article} />

                    ))}


                </div>
            </div>
        </div>
    );
}
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CardWrapper from './CardWrapper';

export default function ArticleCard({ articleKey }) {
  const navigate = useNavigate();
  const { t } = useTranslation('articles');

const article = t(articleKey, { returnObjects: true }) || {
  title: 'Article not found',
  image: '',
  excerpt: 'No excerpt available'
};
  return (
    <CardWrapper key={articleKey}>
      <div
        className="transition overflow-hidden flex flex-col cursor-pointer max-h-[550px]"
        onClick={() => navigate(`/read/${articleKey}`)}
      >
        <div className="w-full h-64 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow bg-white min-h-0">
          <h3 className="text-md font-semibold mb-2">{article.title}</h3>
          <p className="text-xs text-gray-600 flex-grow overflow-hidden min-h-0">
            {article.excerpt}
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}

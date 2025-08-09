import React from 'react';
import CardWrapper from './CardWrapper';
import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article, articleKey }) {
  const navigate = useNavigate();

  return (
    <CardWrapper key={articleKey}>
      <div
        className="transition overflow-hidden flex flex-col cursor-pointer max-h-[450px]"
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
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600 flex-grow overflow-hidden min-h-0">
            {article.excerpt}
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}

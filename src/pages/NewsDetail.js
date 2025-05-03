import { useLocation } from 'react-router-dom';

const NewsDetail = () => {
  const { state } = useLocation();
  const news = state?.news;

  if (!news) {
    return <div className="container mx-auto py-8">News not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <img
        src={news.urlToImage || '/assets/cricket-ball.png'}
        alt={news.title}
        className="w-full max-w-2xl mx-auto mb-6 rounded-lg"
      />
      <p className="text-gray-600 mb-4">{news.publishedAt} | {news.source.name}</p>
      <div className="prose max-w-none">{news.content}</div>
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        Read Full Article
      </a>
    </div>
  );
};

export default NewsDetail;
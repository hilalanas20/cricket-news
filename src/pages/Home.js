import React, { useEffect, useState } from 'react';
import { getCricketNews } from '../api/cricketApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getCricketNews();
        setNews(newsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Cricket News</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <NewsCard key={index} news={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;

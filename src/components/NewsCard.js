import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.03 }} // Zoom slightly on hover
      initial={{ opacity: 0, y: 50 }} // Start hidden and lower
      animate={{ opacity: 1, y: 0 }} // Animate to visible and normal position
      transition={{ duration: 0.5 }}
    >
      <img
        src={news.urlToImage || '/assets/cricket-ball.png'} 
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{news.title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{news.description}</p>
        <Link
          to={`/news/${encodeURIComponent(news.title)}`}
          state={{ news }}
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
};

export default NewsCard;

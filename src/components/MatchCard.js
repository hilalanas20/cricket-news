import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

const MatchCard = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{match.name}</h3>
      <p className="text-gray-600">{match.venue}</p>
      <p className="text-gray-600">{formatDate(match.date)}</p>
      <p className="text-sm font-bold text-green-600">{match.status}</p>
      <Link
        to={`/match/${match.id}`}
        className="text-blue-600 hover:underline mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};

export default MatchCard;

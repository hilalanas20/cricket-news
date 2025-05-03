import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className="card bg-white shadow-md rounded-md p-4">
      <div className="card-content">
        <h3 className="card-title text-xl font-bold">{player.name || 'Unknown Player'}</h3>
        <p className="card-description text-gray-600">Runs: {player.runs || 0}</p>
        <p className="card-description text-gray-600">Wickets: {player.wickets || 0}</p>
      </div>
    </div>
  );
};

export default PlayerCard;

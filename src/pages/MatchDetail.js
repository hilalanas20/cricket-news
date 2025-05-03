import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PlayerCard from '../components/PlayerCard';
import { getMatchScore, getPlayerStats } from '../api/cricketApi';

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [commentary, setCommentary] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const matchData = await getMatchScore(matchId);
        setMatch(matchData);
        setCommentary(matchData.commentary || []);

        const playerPromises = (matchData.players || []).map((pid) => getPlayerStats(pid));
        const playerData = await Promise.all(playerPromises);
        setPlayers(playerData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatchDetails();
    const interval = setInterval(fetchMatchDetails, 15000); // Refresh every 15 seconds
    return () => clearInterval(interval);
  }, [matchId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!match) return <div className="container mx-auto py-8">Match not found</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{match.name}</h1>
      <p className="text-gray-600 mb-4">{match.venue} | {match.status}</p>

      <h2 className="text-2xl font-semibold mb-4">Live Score</h2>
      <p className="text-lg font-bold">{match.score}</p>

      <h2 className="text-2xl font-semibold mb-4 mt-6">Ball-by-Ball Commentary</h2>
      <div className="bg-white rounded-lg shadow-md p-4 max-h-96 overflow-y-auto">
        {commentary.map((comment, index) => (
          <p key={index} className="text-gray-700 border-b py-2">{comment}</p>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-6">Player Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.pid} player={player} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-6">Match Summary</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p>{match.summary || 'Summary not available'}</p>
      </div>
    </div>
  );
};

export default MatchDetail;

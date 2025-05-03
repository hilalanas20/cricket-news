import React, { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getMatches } from '../api/cricketApi';
import { motion, AnimatePresence } from 'framer-motion';

const Matches = () => {
  const [matches, setMatches] = useState({ live: [], upcoming: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming'); // Default tab

  const fetchMatches = async () => {
    try {
      const matchesData = await getMatches();
      // Handle filtering of matches correctly based on the status
      const live = matchesData.filter((m) => m.status && m.status.toLowerCase().includes('live'));
      const upcoming = matchesData.filter((m) => m.status === 'Match not started');
      const completed = matchesData.filter((m) => m.status && (m.status.toLowerCase().includes('ended') || m.status.toLowerCase().includes('completed')));
      
      setMatches({ live, upcoming, completed });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const renderMatches = () => {
    const list = activeTab === 'live' ? matches.live :
                activeTab === 'upcoming' ? matches.upcoming : matches.completed;

    if (list.length === 0) {
      return <p className="text-center text-gray-600">No matches available right now.</p>;
    }

    return list.map((match) => (
      <motion.div key={match.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <MatchCard match={match} />
      </motion.div>
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Matches</h1>

      {/* Tabs to toggle between Live, Upcoming, and Completed */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
          }`}
          onClick={() => setActiveTab('live')}
        >
          Live Matches
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Matches
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Matches
        </button>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {/* Display matches */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderMatches()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Matches;

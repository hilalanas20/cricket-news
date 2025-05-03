import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getSchedule } from '../api/cricketApi';
import { formatDate } from '../utils/formatDate';
import { motion, AnimatePresence } from 'framer-motion';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSeries, setOpenSeries] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleData = await getSchedule();
        setSchedules(scheduleData || []); // Safe default
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const toggleSeries = (seriesId) => {
    setOpenSeries(openSeries === seriesId ? null : seriesId);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Tournament Schedule</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <div className="space-y-6">
        {schedules.length > 0 ? (
          schedules.map((series) => (
            <div key={series.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSeries(series.id)}
                className="w-full text-left p-4 font-semibold text-xl bg-blue-100 hover:bg-blue-200 transition"
              >
                {series.name} ({formatDate(series.startDate)} - {formatDate(series.endDate)})
              </button>

              <AnimatePresence>
                {openSeries === series.id && (
                  <motion.ul
                    className="px-6 py-4 space-y-2 bg-gray-50"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {series.matches?.map((match) => (
                      <li key={match.id} className="text-gray-700">
                        {match.name} at {match.venue} on {formatDate(match.date)}
                      </li>
                    )) || <li>No matches available.</li>}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No tournament schedule available.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Schedule from './pages/Schedule';
import NewsDetail from './pages/NewsDetail';
import MatchDetail from './pages/MatchDetail';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/news/:title" element={<NewsDetail />} />
        <Route path="/match/:matchId" element={<MatchDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pt-20"> {/* pt-20 because navbar is fixed */}
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;

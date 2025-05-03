import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'; // Added Sun and Moon Icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">
          News Live
        </div>

        <div className="flex items-center space-x-4">
          <div onClick={toggleDarkMode} className="cursor-pointer text-white text-2xl">
            {darkMode ? <FiSun /> : <FiMoon />}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-300 transition-colors duration-300"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/matches" 
                className={({ isActive }) => isActive ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-300 transition-colors duration-300"}
              >
                Matches
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/schedule" 
                className={({ isActive }) => isActive ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-300 transition-colors duration-300"}
              >
                Schedule
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-blue-700 flex flex-col items-center py-4 space-y-4">
          <li>
            <NavLink 
              to="/" 
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-300 transition-colors duration-300"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/matches" 
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-300 transition-colors duration-300"}
            >
              Matches
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/schedule" 
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-300 transition-colors duration-300"}
            >
              Schedule
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

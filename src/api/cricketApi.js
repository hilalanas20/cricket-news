import axios from 'axios';

// Your API Keys
const CRIC_API_KEY = '2585ec23-26a1-43e2-b0e6-dbea486649bc'; // CricAPI key
const NEWS_API_KEY = '27a149f2f75a467582971c91f5e8aa2a';    // NewsAPI key

// CricAPI instance
const cricketApi = axios.create({
  baseURL: 'https://api.cricapi.com/v1/',
});

// NewsAPI instance
const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2/',
});

// Fetch live, upcoming, completed matches
export const getMatches = async () => {
  try {
    const response = await cricketApi.get(`matches?apikey=${CRIC_API_KEY}`);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch matches');
  }
};

// Fetch match score + commentary
export const getMatchScore = async (matchId) => {
  try {
    const response = await cricketApi.get(`cricketScore?apikey=${CRIC_API_KEY}&unique_id=${matchId}`);
    return response.data || {};
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch match score');
  }
};

// Fetch player stats
export const getPlayerStats = async (playerId) => {
  try {
    const response = await cricketApi.get(`playerStats?apikey=${CRIC_API_KEY}&pid=${playerId}`);
    return response.data || {};
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch player stats');
  }
};

// Fetch cricket news
export const getCricketNews = async () => {
  try {
    const response = await newsApi.get(`everything?q=cricket&apiKey=${NEWS_API_KEY}`);
    return response.data.articles || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch news');
  }
};

// Fetch match schedule (series)
export const getSchedule = async () => {
  try {
    const response = await cricketApi.get(`series?apikey=${CRIC_API_KEY}`);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch schedule');
  }
};

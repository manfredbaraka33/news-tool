import axios from "axios";

const API_BASE = "https://news-tool-backend-production.up.railway.app/";

export const processUrls = (urls) => axios.post(`${API_BASE}/process/`, { urls });
export const askQuestion = (query) => axios.post(`${API_BASE}/ask/`, { query });

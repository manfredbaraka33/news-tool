import axios from "axios";

const API_BASE = "https://elopyx-news-tool.hf.space";

export const processUrls = (urls) => axios.post(`${API_BASE}/process/`, { urls });
export const askQuestion = (query) => axios.post(`${API_BASE}/ask/`, { query });

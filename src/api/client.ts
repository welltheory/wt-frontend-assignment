import axios from "axios";

//added the API keys directly here instead of storing them in a .env folder. Hope that's okay for this assignment
const API_KEY = "fd3990b7-da2b-455b-8a2e-7d00ad5cb5e1";
const BASE_URL = "https://mock-members-api-154716608073.us-central1.run.app/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

// Automatically inject API key
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["X-Api-Key"] = API_KEY;
  return config;
});

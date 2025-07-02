const { VITE_APP_BASE_URL, VITE_API_BASE_URL, MODE } = import.meta.env;

const envConfig = {
  appBaseUrl: VITE_APP_BASE_URL,
  apiBaseUrl: VITE_API_BASE_URL,
  isDevelopment: MODE === "development",
  isStaging: MODE === "staging",
  isProduction: MODE === "production",
};

export default envConfig;

const envConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  isDevelopment: process.env.MODE === "development",
  isStaging: process.env.MODE === "staging",
  isProduction: process.env.MODE === "production",
};

export default envConfig;

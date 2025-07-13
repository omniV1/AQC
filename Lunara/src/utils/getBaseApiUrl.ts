export const getBaseApiUrl = (): string => {
  // Vite build-time replacement (see vite.config.ts)
  const viteDefine = typeof __VITE_API_BASE_URL__ !== 'undefined' && __VITE_API_BASE_URL__;

  // Node / Jest runtime – read from process.env when running tests or SSR
  const nodeEnv = typeof process !== 'undefined' ? process.env.VITE_API_BASE_URL : undefined;

  return viteDefine || nodeEnv || '/api';
}; 
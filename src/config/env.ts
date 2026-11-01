const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

if (!configuredApiBaseUrl && import.meta.env.PROD) {
  throw new Error('VITE_API_BASE_URL must be set when building the production frontend.');
}

export const apiBaseUrl = (configuredApiBaseUrl || 'http://localhost:3000').replace(/\/+$/, '');

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const getResourceUrl = (resource) => `${getApiBaseUrl()}/${resource}/`;

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [payload.data, payload.results, payload.items, payload.records];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    const nested = normalizeCollection(payload.data);
    if (nested.length > 0) {
      return nested;
    }
  }

  return [];
};

export async function fetchCollection(resource) {
  const url = getResourceUrl(resource);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}

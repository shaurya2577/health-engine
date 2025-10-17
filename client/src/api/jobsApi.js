// API client for job board operations
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

class JobsApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'JobsApiError';
    this.status = status;
    this.response = response;
  }
}

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new JobsApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof JobsApiError) {
      throw error;
    }
    throw new JobsApiError(
      `Network error: ${error.message}`,
      0,
      { originalError: error.message }
    );
  }
};

export const jobsApi = {
  // Get all jobs
  async list() {
    return apiRequest('/jobs');
  },

  // Apply to a specific job
  async apply(payload) {
    return apiRequest('/jobs/apply', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Submit universal application
  async submitUniversal(payload) {
    return apiRequest('/jobs/universal', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Health check
  async health() {
    return apiRequest('/health');
  },
};

export { JobsApiError };

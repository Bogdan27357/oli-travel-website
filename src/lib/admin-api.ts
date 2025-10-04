import { adminAuth } from './admin-auth';

const ADMIN_API_URL = 'https://functions.poehali.dev/2ebb973a-0dd8-4f3b-8168-e788b062dbef';

async function apiCall(resource: string, method: string, params?: any, body?: any) {
  const token = adminAuth.getToken();
  if (!token) throw new Error('Not authenticated');
  
  const url = new URL(ADMIN_API_URL);
  url.searchParams.set('resource', resource);
  
  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.set(key, params[key]);
    });
  }
  
  const response = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': token
    },
    body: body ? JSON.stringify(body) : undefined
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'API Error');
  }
  
  return response.json();
}

export const adminAPI = {
  stats: {
    async get() {
      const url = new URL(ADMIN_API_URL);
      url.searchParams.set('resource', 'stats');
      const response = await fetch(url.toString());
      return response.json();
    }
  },
  
  submissions: {
    async list(status = 'all', limit = 100, offset = 0) {
      return apiCall('submissions', 'GET', { status, limit, offset });
    },
    async updateStatus(id: number, status: string) {
      return apiCall('submissions', 'PUT', {}, { id, status });
    },
    async delete(id: number) {
      return apiCall('submissions', 'DELETE', { id });
    }
  },
  
  tours: {
    async list(limit = 100, offset = 0) {
      return apiCall('tours', 'GET', { limit, offset });
    },
    async get(id: number) {
      return apiCall('tours', 'GET', { id });
    },
    async create(tour: any) {
      return apiCall('tours', 'POST', {}, tour);
    },
    async update(tour: any) {
      return apiCall('tours', 'PUT', {}, tour);
    },
    async delete(id: number) {
      return apiCall('tours', 'DELETE', { id });
    }
  },
  
  reviews: {
    async list(status = 'all', limit = 100, offset = 0) {
      return apiCall('reviews', 'GET', { status, limit, offset });
    },
    async approve(id: number) {
      return apiCall('reviews', 'PUT', {}, { id, action: 'approve' });
    },
    async reject(id: number) {
      return apiCall('reviews', 'PUT', {}, { id, action: 'reject' });
    },
    async delete(id: number) {
      return apiCall('reviews', 'DELETE', { id });
    }
  }
};
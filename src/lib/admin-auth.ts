const TOKEN_KEY = 'admin_token';
const ROLE_KEY = 'admin_role';
const ADMIN_AUTH_URL = 'https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f';

export const adminAuth = {
  async login(password: string): Promise<{ success: boolean; token?: string; role?: string; error?: string }> {
    try {
      const response = await fetch(ADMIN_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password })
      });
      
      const data = await response.json();
      
      if (data.success && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(ROLE_KEY, data.role || 'manager');
        return { success: true, token: data.token, role: data.role };
      }
      
      return { success: false, error: data.error || 'Ошибка авторизации' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  },
  
  async verify(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const response = await fetch(ADMIN_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', token })
      });
      
      const data = await response.json();
      return data.success && data.valid;
    } catch {
      return false;
    }
  },
  
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getRole(): string {
    return localStorage.getItem(ROLE_KEY) || 'manager';
  },
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
  
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
};
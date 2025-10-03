const TOKEN_KEY = 'admin_token';
const CORRECT_PASSWORD = 'admin2025';

export const adminAuth = {
  async login(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    // Локальная авторизация без backend
    if (password === CORRECT_PASSWORD) {
      const token = 'local_admin_token_' + Date.now();
      localStorage.setItem(TOKEN_KEY, token);
      return { success: true, token };
    }
    
    return { success: false, error: 'Неверный пароль. Используйте: admin2025' };
  },
  
  async verify(): Promise<boolean> {
    const token = this.getToken();
    return !!token;
  },
  
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

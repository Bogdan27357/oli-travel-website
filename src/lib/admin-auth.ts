const TOKEN_KEY = 'admin_token';
const ROLE_KEY = 'admin_role';
const ADMIN_AUTH_URL = 'https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f';

export const adminAuth = {
  async login(password: string): Promise<{ success: boolean; token?: string; role?: string; error?: string }> {
    // Временная локальная проверка пароля из-за CORS проблем
    const ADMIN_PASS = 'Bogdik273!';
    const MANAGER_PASS = 'Bogdik18!!';
    
    let role = '';
    if (password === ADMIN_PASS) {
      role = 'admin';
    } else if (password === MANAGER_PASS) {
      role = 'manager';
    } else {
      return { success: false, error: 'Неверный пароль' };
    }
    
    // Генерируем временный токен локально
    const token = btoa(`${role}:${Date.now()}:temp-token`);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    
    return { success: true, token, role };
  },
  
  async verify(): Promise<boolean> {
    // Временная локальная проверка токена
    const token = this.getToken();
    return !!token;
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
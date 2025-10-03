import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { adminAuth } from '@/lib/admin-auth';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [passwords, setPasswords] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getPasswordHint = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_hint' })
      });
      const data = await response.json();
      setPasswords(data);
      setShowHint(true);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось получить подсказку",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Ошибка",
        description: "Введите пароль",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await adminAuth.login(password);
      
      if (result.success) {
        const is2FAEnabled = localStorage.getItem('admin_2fa_enabled') === 'true';
        const email = localStorage.getItem('admin_2fa_email');

        if (is2FAEnabled && email) {
          toast({
            title: "🔐 Требуется 2FA",
            description: "Введите код из email",
            className: "bg-blue-50 border-blue-500"
          });
          navigate('/admin/2fa', { 
            state: { 
              email, 
              tempToken: result.token 
            } 
          });
        } else {
          toast({
            title: "✅ Успешный вход",
            description: "Добро пожаловать в админ панель",
            className: "bg-green-50 border-green-500"
          });
          navigate('/admin/dashboard');
        }
      } else {
        toast({
          title: "Ошибка входа",
          description: result.error || "Неверный пароль",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Попробуйте позже",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
            <Icon name="Lock" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl">Админ Панель</CardTitle>
          <CardDescription>Введите пароль для доступа</CardDescription>
        </CardHeader>
        <CardContent>
          {!showHint ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm flex-1">
                  <p className="font-semibold text-amber-900 mb-2">Не можете войти?</p>
                  <p className="text-xs text-amber-700 mb-3">
                    Пароли хранятся в секретах проекта. Нажмите кнопку ниже, чтобы увидеть актуальные пароли.
                  </p>
                  <Button
                    type="button"
                    onClick={getPasswordHint}
                    variant="outline"
                    size="sm"
                    className="w-full bg-white"
                  >
                    <Icon name="Eye" size={16} className="mr-2" />
                    Показать актуальные пароли
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm flex-1">
                  <p className="font-semibold text-green-900 mb-2">Актуальные пароли из секретов:</p>
                  {passwords && (
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>👤 <strong>Администратор:</strong> <code className="bg-green-100 px-2 py-0.5 rounded font-mono">{passwords.full_admin}</code></li>
                      <li>👔 <strong>Менеджер:</strong> <code className="bg-green-100 px-2 py-0.5 rounded font-mono">{passwords.full_manager}</code></li>
                    </ul>
                  )}
                  <Button
                    type="button"
                    onClick={() => setShowHint(false)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs"
                  >
                    Скрыть
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-sm"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться на сайт
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
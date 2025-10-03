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
  const navigate = useNavigate();
  const { toast } = useToast();

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
        toast({
          title: "✅ Успешный вход",
          description: "Добро пожаловать в админ панель",
          className: "bg-green-50 border-green-500"
        });
        navigate('/admin/dashboard');
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
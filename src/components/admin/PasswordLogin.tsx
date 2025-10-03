import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PasswordLoginProps {
  onAuthenticated: () => void;
}

export default function PasswordLogin({ onAuthenticated }: PasswordLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkPassword = async () => {
    if (!password.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите пароль',
        variant: 'destructive'
      });
      return;
    }
    
    const correctPassword = 'manager123';
    
    if (password.trim() === correctPassword) {
      localStorage.setItem('manager_auth_token', 'temp_token_' + Date.now());
      toast({
        title: '✅ Доступ разрешен',
        description: 'Добро пожаловать в чат менеджера',
        className: 'bg-green-50 border-green-500'
      });
      onAuthenticated();
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          password: password.trim()
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('manager_auth_token', data.token);
        toast({
          title: '✅ Доступ разрешен',
          description: 'Добро пожаловать в чат менеджера',
          className: 'bg-green-50 border-green-500'
        });
        onAuthenticated();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Неверный пароль',
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message, 'for', 'https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f');
      toast({
        title: 'Ошибка подключения',
        description: 'Используйте пароль: manager123',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <a href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Button>
        </a>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <Icon name="Shield" size={28} className="text-primary" />
            Чат менеджера
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Введите пароль для доступа к чату
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 mb-1">Пароль для доступа:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-blue-700 font-mono">manager123</code>
              </div>
            </div>
          </div>
          
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
            className="h-12"
          />
          <Button
            onClick={checkPassword}
            className="w-full h-12 bg-gradient-to-r from-primary to-secondary"
            disabled={!password.trim() || isLoading}
          >
            {isLoading ? (
              <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
            ) : (
              <Icon name="Lock" size={20} className="mr-2" />
            )}
            Войти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

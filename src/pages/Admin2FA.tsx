import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Admin2FA() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayCode, setDisplayCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const email = location.state?.email || localStorage.getItem('admin_2fa_email');
  const tempToken = location.state?.tempToken;

  useEffect(() => {
    if (!email || !tempToken) {
      navigate('/admin/login');
      return;
    }

    generateCode();
  }, [email, tempToken]);

  const generateCode = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_2fa_code', email })
      });

      const data = await response.json();

      if (data.success) {
        setDisplayCode(data.code);
        toast({
          title: "📧 Код отправлен",
          description: `Проверьте ${email}`,
          className: "bg-blue-50 border-blue-500"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить код",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      toast({
        title: "Ошибка",
        description: "Введите 6-значный код",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_2fa_code',
          email,
          code
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_token', tempToken);
        toast({
          title: "✅ Вход выполнен",
          description: "Добро пожаловать!",
          className: "bg-green-50 border-green-500"
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Неверный код",
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

  const handleResend = () => {
    setCode('');
    generateCode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
            <Icon name="ShieldCheck" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl">Двухфакторная аутентификация</CardTitle>
          <CardDescription>Введите код из email</CardDescription>
        </CardHeader>
        <CardContent>
          {displayCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Mail" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 mb-1">Демо-режим</p>
                  <p className="text-green-800 mb-2">
                    Код для входа: <code className="bg-green-100 px-2 py-1 rounded font-mono text-lg font-bold">{displayCode}</code>
                  </p>
                  <p className="text-xs text-green-700">
                    В production коды отправляются на {email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                6-значный код
              </label>
              <Input
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-12 text-center text-2xl tracking-widest font-mono"
                maxLength={6}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Код действителен 10 минут
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="Check" size={20} className="mr-2" />
                  Подтвердить
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/login')}
              className="text-sm"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>

            <Button
              variant="ghost"
              onClick={handleResend}
              className="text-sm"
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Отправить снова
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

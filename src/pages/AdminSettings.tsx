import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { adminAuth } from '@/lib/admin-auth';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('admin_2fa_email') || '');
  const [enable2FA, setEnable2FA] = useState(localStorage.getItem('admin_2fa_enabled') === 'true');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Новые пароли не совпадают",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть минимум 6 символов",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/a5ac7b7d-d827-4215-869d-0bb5f5eb885f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': adminAuth.getToken() || ''
        },
        body: JSON.stringify({
          action: 'change_password',
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "✅ Пароль изменён",
          description: "Используйте новый пароль при следующем входе",
          className: "bg-green-50 border-green-500"
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось изменить пароль",
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

  const toggle2FA = () => {
    const newValue = !enable2FA;
    setEnable2FA(newValue);
    localStorage.setItem('admin_2fa_enabled', String(newValue));
    
    if (newValue && email) {
      localStorage.setItem('admin_2fa_email', email);
      toast({
        title: "✅ 2FA включена",
        description: `Коды будут отправляться на ${email}`,
        className: "bg-green-50 border-green-500"
      });
    } else {
      toast({
        title: "🔓 2FA отключена",
        description: "Двухфакторная аутентификация выключена"
      });
    }
  };

  const saveEmail = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Ошибка",
        description: "Введите корректный email",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('admin_2fa_email', email);
    toast({
      title: "✅ Email сохранён",
      description: "Email для 2FA обновлён",
      className: "bg-green-50 border-green-500"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Настройки безопасности</h1>
            <p className="text-gray-600 mt-1">Управление паролем и двухфакторной аутентификацией</p>
          </div>
          <Button onClick={() => navigate('/admin/dashboard')} variant="outline">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Key" size={24} className="text-primary" />
                Смена пароля
              </CardTitle>
              <CardDescription>
                Измените пароль для входа в админ-панель
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Текущий пароль
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Новый пароль
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Минимум 6 символов
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Подтвердите новый пароль
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Обновление...
                    </>
                  ) : (
                    <>
                      <Icon name="Check" size={18} className="mr-2" />
                      Изменить пароль
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={24} className="text-primary" />
                Двухфакторная аутентификация
              </CardTitle>
              <CardDescription>
                Дополнительная защита при входе
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${enable2FA ? 'bg-green-100' : 'bg-gray-200'}`}>
                    <Icon 
                      name={enable2FA ? "ShieldCheck" : "ShieldOff"} 
                      size={24} 
                      className={enable2FA ? 'text-green-600' : 'text-gray-500'}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {enable2FA ? 'Включена' : 'Выключена'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {enable2FA ? 'Вход защищён кодом' : 'Только пароль'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={toggle2FA}
                  variant={enable2FA ? "destructive" : "default"}
                  size="sm"
                >
                  {enable2FA ? 'Отключить' : 'Включить'}
                </Button>
              </div>

              {enable2FA && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email для получения кодов
                    </label>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      На этот email будут отправляться коды подтверждения
                    </p>
                  </div>

                  <Button
                    onClick={saveEmail}
                    variant="outline"
                    className="w-full h-11"
                  >
                    <Icon name="Mail" size={18} className="mr-2" />
                    Сохранить email
                  </Button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Как работает 2FA:</p>
                        <ol className="text-xs space-y-1 list-decimal list-inside">
                          <li>Введите пароль на странице входа</li>
                          <li>Получите код на email</li>
                          <li>Введите код для завершения входа</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={24} className="text-primary" />
              Информация о безопасности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon name="User" size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Ваша роль</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {adminAuth.isAdmin() ? 'Администратор (полный доступ)' : 'Менеджер (ограниченный доступ)'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon name="Clock" size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Срок сессии</p>
                  <p className="text-xs text-gray-600 mt-1">
                    24 часа с момента входа
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900 mb-1">Рекомендации по безопасности</p>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>✓ Используйте сложный пароль (минимум 8 символов)</li>
                    <li>✓ Включите двухфакторную аутентификацию</li>
                    <li>✓ Не используйте демо-пароли в production</li>
                    <li>✓ Меняйте пароль раз в 3 месяца</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

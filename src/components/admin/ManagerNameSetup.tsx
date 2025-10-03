import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ManagerNameSetupProps {
  onNameSaved: (name: string) => void;
}

export default function ManagerNameSetup({ onNameSaved }: ManagerNameSetupProps) {
  const [managerName, setManagerName] = useState('');
  const { toast } = useToast();

  const saveManagerName = () => {
    if (managerName.trim()) {
      localStorage.setItem('manager_name', managerName.trim());
      localStorage.setItem('manager_last_seen', Date.now().toString());
      toast({
        title: '✅ Имя сохранено',
        description: 'Вы можете начать отвечать клиентам'
      });
      onNameSaved(managerName.trim());
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
            <Icon name="UserCog" size={28} className="text-primary" />
            Панель менеджера
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Введите ваше имя для начала работы с чатами
          </p>
          <Input
            placeholder="Ваше имя (например: Ольга, Вячеслав)"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveManagerName()}
            className="h-12"
          />
          <Button
            onClick={saveManagerName}
            className="w-full h-12 bg-gradient-to-r from-primary to-secondary"
            disabled={!managerName.trim()}
          >
            <Icon name="LogIn" size={20} className="mr-2" />
            Войти в панель
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ArchiveControlProps {
  sessionId: string | null;
  isArchived: boolean;
  onArchiveToggle: (sessionId: string, archived: boolean) => void;
}

export default function ArchiveControl({ sessionId, isArchived, onArchiveToggle }: ArchiveControlProps) {
  const { toast } = useToast();

  if (!sessionId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-400">
            <Icon name="Archive" size={48} className="mx-auto mb-2" />
            <p>Выберите чат для архивации</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleToggle = () => {
    onArchiveToggle(sessionId, !isArchived);
    
    toast({
      title: isArchived ? '📂 Чат восстановлен' : '📁 Чат архивирован',
      description: isArchived 
        ? 'Чат перемещён в активные' 
        : 'Чат перемещён в архив',
      duration: 3000
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon name="Archive" size={18} />
          Архивация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg border-2 ${
          isArchived 
            ? 'bg-gray-50 border-gray-300' 
            : 'bg-green-50 border-green-300'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <Icon 
              name={isArchived ? 'Archive' : 'CheckCircle'} 
              size={24} 
              className={isArchived ? 'text-gray-600' : 'text-green-600'} 
            />
            <div>
              <p className="font-semibold">
                {isArchived ? 'В архиве' : 'Активный чат'}
              </p>
              <p className="text-sm text-gray-600">
                {isArchived 
                  ? 'Диалог завершён и архивирован'
                  : 'Диалог активен и требует внимания'
                }
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          variant={isArchived ? 'outline' : 'default'}
          className={`w-full ${
            !isArchived && 'bg-gradient-to-r from-primary to-secondary'
          }`}
        >
          <Icon 
            name={isArchived ? 'ArchiveRestore' : 'Archive'} 
            size={18} 
            className="mr-2" 
          />
          {isArchived ? 'Восстановить из архива' : 'Переместить в архив'}
        </Button>

        <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
          <p><strong>📁 Архив:</strong> завершённые диалоги</p>
          <p><strong>✅ Активные:</strong> требуют ответа</p>
          <p>Архивные чаты можно восстановить в любой момент</p>
        </div>
      </CardContent>
    </Card>
  );
}

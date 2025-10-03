import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ChatTag } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface TagManagerProps {
  sessionId: string | null;
  sessionTags: string[];
  onTagsUpdate: (sessionId: string, tags: string[]) => void;
}

const DEFAULT_TAGS: ChatTag[] = [
  { id: '1', name: 'Вопрос', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: '2', name: 'Срочно', color: 'bg-red-100 text-red-700 border-red-300' },
  { id: '3', name: 'Заказ', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: '4', name: 'Жалоба', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { id: '5', name: 'Консультация', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: '6', name: 'VIP', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
];

export default function TagManager({ sessionId, sessionTags, onTagsUpdate }: TagManagerProps) {
  const [customTag, setCustomTag] = useState('');
  const [tags, setTags] = useState<ChatTag[]>(DEFAULT_TAGS);
  const { toast } = useToast();

  if (!sessionId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-400">
            <Icon name="Tag" size={48} className="mx-auto mb-2" />
            <p>Выберите чат для добавления тегов</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const toggleTag = (tagName: string) => {
    const newTags = sessionTags.includes(tagName)
      ? sessionTags.filter(t => t !== tagName)
      : [...sessionTags, tagName];
    
    onTagsUpdate(sessionId, newTags);
    
    toast({
      title: sessionTags.includes(tagName) ? '🏷️ Тег удалён' : '🏷️ Тег добавлен',
      description: tagName,
      duration: 2000
    });
  };

  const addCustomTag = () => {
    if (!customTag.trim()) return;
    
    const newTagName = customTag.trim();
    const newTag: ChatTag = {
      id: Date.now().toString(),
      name: newTagName,
      color: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    
    setTags([...tags, newTag]);
    
    const newTags = [...sessionTags, newTagName];
    onTagsUpdate(sessionId, newTags);
    
    setCustomTag('');
    
    toast({
      title: '✅ Свой тег создан',
      description: newTagName,
      duration: 2000
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon name="Tags" size={18} />
          Теги чата
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Быстрые теги:</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  sessionTags.includes(tag.name)
                    ? tag.color
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => toggleTag(tag.name)}
              >
                {tag.name}
                {sessionTags.includes(tag.name) && (
                  <Icon name="Check" size={12} className="ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Свой тег:</p>
          <div className="flex gap-2">
            <Input
              placeholder="Название тега..."
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
              className="h-9"
            />
            <Button
              size="sm"
              onClick={addCustomTag}
              disabled={!customTag.trim()}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        {sessionTags.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 font-medium mb-2">Активные теги:</p>
            <div className="flex flex-wrap gap-2">
              {sessionTags.map((tagName) => {
                const tag = tags.find(t => t.name === tagName);
                return (
                  <Badge
                    key={tagName}
                    variant="outline"
                    className={tag?.color || 'bg-gray-100 text-gray-700'}
                  >
                    {tagName}
                    <button
                      onClick={() => toggleTag(tagName)}
                      className="ml-1 hover:text-red-600"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

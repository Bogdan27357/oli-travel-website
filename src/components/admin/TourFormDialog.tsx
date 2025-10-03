import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Tour {
  id?: number;
  country: string;
  city: string;
  hotel: string;
  stars: number;
  date_from: string;
  date_to: string;
  nights: number;
  people: number;
  flight: boolean;
  price: number;
  old_price: number;
  image_url: string;
  gallery_images?: string[];
  description: string;
  included: string[];
  is_hot: boolean;
  is_active: boolean;
}

interface TourFormDialogProps {
  isOpen: boolean;
  editingTour: Tour | null;
  formData: Tour;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  onSelectChange: (name: string, value: string) => void;
  onIncludedChange: (value: string) => void;
  onGalleryChange: (value: string) => void;
}

export default function TourFormDialog({
  isOpen,
  editingTour,
  formData,
  onClose,
  onSubmit,
  onInputChange,
  onCheckboxChange,
  onSelectChange,
  onIncludedChange,
  onGalleryChange,
}: TourFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingTour ? 'Редактировать тур' : 'Создать тур'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о туре
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="country">Страна</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={onInputChange}
              placeholder="Турция"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Город</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              placeholder="Анталия"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotel">Отель</Label>
            <Input
              id="hotel"
              name="hotel"
              value={formData.hotel}
              onChange={onInputChange}
              placeholder="Grand Resort"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stars">Звезды</Label>
            <Select
              value={String(formData.stars)}
              onValueChange={(value) => onSelectChange('stars', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 звезда</SelectItem>
                <SelectItem value="2">2 звезды</SelectItem>
                <SelectItem value="3">3 звезды</SelectItem>
                <SelectItem value="4">4 звезды</SelectItem>
                <SelectItem value="5">5 звезд</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_from">Дата начала</Label>
            <Input
              id="date_from"
              name="date_from"
              type="date"
              value={formData.date_from}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_to">Дата окончания</Label>
            <Input
              id="date_to"
              name="date_to"
              type="date"
              value={formData.date_to}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nights">Ночей</Label>
            <Input
              id="nights"
              name="nights"
              type="number"
              min="1"
              value={formData.nights}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="people">Человек</Label>
            <Input
              id="people"
              name="people"
              type="number"
              min="1"
              value={formData.people}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Цена (₽)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="old_price">Старая цена (₽)</Label>
            <Input
              id="old_price"
              name="old_price"
              type="number"
              min="0"
              value={formData.old_price}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="image_url">URL главного изображения</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={onInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="gallery_images">Галерея фото (URL через запятую)</Label>
            <Textarea
              id="gallery_images"
              value={(formData.gallery_images || []).join(', ')}
              onChange={(e) => onGalleryChange(e.target.value)}
              placeholder="/img/hotel.jpg, /img/room.jpg, /img/pool.jpg, /img/beach.jpg"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Рекомендуем добавить фото: фасад отеля, номер, бассейн, пляж, ресторан
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Описание тура..."
              rows={4}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="included">Что включено (через запятую)</Label>
            <Input
              id="included"
              value={formData.included.join(', ')}
              onChange={(e) => onIncludedChange(e.target.value)}
              placeholder="Перелет, Питание, Трансфер"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="flight"
              checked={formData.flight}
              onCheckedChange={(checked) =>
                onCheckboxChange('flight', checked as boolean)
              }
            />
            <Label htmlFor="flight" className="cursor-pointer">
              Включен перелет
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_hot"
              checked={formData.is_hot}
              onCheckedChange={(checked) =>
                onCheckboxChange('is_hot', checked as boolean)
              }
            />
            <Label htmlFor="is_hot" className="cursor-pointer">
              Горящий тур
            </Label>
          </div>

          <div className="flex items-center space-x-2 md:col-span-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                onCheckboxChange('is_active', checked as boolean)
              }
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Активный
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSubmit}>
            {editingTour ? 'Сохранить' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
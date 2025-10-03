import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { adminAuth } from '@/lib/admin-auth';

export default function AdminLayout() {
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await adminAuth.verify();
      if (!isValid) {
        navigate('/admin/login');
      } else {
        setIsVerifying(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    adminAuth.logout();
    navigate('/admin/login');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Главная', icon: 'LayoutDashboard' },
    { path: '/admin/submissions', label: 'Заявки', icon: 'Mail' },
    { path: '/admin/tours', label: 'Туры', icon: 'Plane' },
    { path: '/admin/reviews', label: 'Отзывы', icon: 'Star' },
    { path: '/admin/settings', label: 'Безопасность', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Админ Панель</h1>
                <p className="text-xs text-gray-500">Travel Agency CMS</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/" target="_blank">
                <Button variant="outline" size="sm">
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Открыть сайт
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2 sticky top-24">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        isActive ? 'bg-gradient-to-r from-primary to-secondary' : ''
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} className="mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
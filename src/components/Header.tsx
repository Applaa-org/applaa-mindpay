import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Bell, Plus, User, Home, Clock } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Add Bill', href: '/add-bill', icon: Plus },
  { name: 'Reminders', href: '/reminders', icon: Clock },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💡</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              BillSmart
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium",
                    location.pathname === item.href && "text-blue-600"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
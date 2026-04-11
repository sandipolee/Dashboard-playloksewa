
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { name: 'Overview', icon: 'dashboard', path: '/' },
    { name: 'Model Sets', icon: 'quiz', path: '/model-sets' },
    { name: 'User Management', icon: 'group', path: '/users' },
    { name: 'Revenue', icon: 'payments', path: '/revenue' },
    { name: 'Global Settings', icon: 'settings', path: '/settings' },
    { name: 'Support', icon: 'contact_support', path: '#' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container flex flex-col py-6 px-4 gap-y-2 border-r border-outline-variant/20 z-40">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            quiz
          </span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-on-surface font-headline leading-tight">
            Play loksewa
          </h1>
          <p className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">Admin Suite</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out font-inter text-sm ${
                isActive && item.path !== '#'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/20">
        <Link
          to="/model-sets/create"
          className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Create New Set</span>
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 mt-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all duration-200 ease-in-out font-inter text-sm"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

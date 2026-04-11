export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container z-30 flex items-center justify-between px-8 border-b border-outline-variant/20 shadow-none">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-xl">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/50 rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface placeholder:text-outline transition-all"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant/20"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-on-surface">Admin User</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-primary">
              Super Admin
            </p>
          </div>
          <img
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full ring-2 ring-primary/20 bg-surface-container-high object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV8ezrOhxzV__Cs3WLM7wtUYkNfEvr2lxYG7_Cijmx9V8Yd-H2WTqdU0g9tH0CcrB9Mp_WT_z5tcuEKOCIm6H01q82rOqNbs5spGW8tyiwSUO35b6U1RsNbuKIEZi4js182FhsHwCeI5ZCRb1JmzVuOhgxBthb9BgCg1tzyTPC1qMfcjKZqrF0naVcPEI_e5CyiMZnDZEK1FK6z7PqkyYBHgqLJM3idk1gxgSbQidYDIsXPcNS7dudUTEDmIkbW2UOAm2tR0x6_aY"
          />
        </div>
      </div>
    </header>
  );
}

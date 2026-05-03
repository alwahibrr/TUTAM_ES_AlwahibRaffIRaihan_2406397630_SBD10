'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { clearToken } from '@/lib/auth';

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push('/login');
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-black/5 bg-tertiary/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 flex items-center justify-center rounded-sm">
            <Image src="/ToDo_logo_transparent.png" alt="Logo" width={32} height={32} />
          </div>
          <span className="text-xs tracking-[0.25em] text-black/60 uppercase font-medium">Todo List</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-black/50 hover:text-black/80 transition-colors duration-200 uppercase tracking-widest"
        >
          <Image src="/Logout.png" alt="Logout" width={14} height={14} className="opacity-60 invert" />
          Sign out
        </button>
      </div>
    </header>
  );
}

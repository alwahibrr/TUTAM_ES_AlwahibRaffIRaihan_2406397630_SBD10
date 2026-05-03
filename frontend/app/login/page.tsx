import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Todo List account.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-tertiary px-4">

      <div className="orb animate-float w-[520px] h-[520px] bg-white opacity-[0.07] -top-48 left-1/2 -translate-x-1/2" />
      <div className="orb animate-float-slow w-[380px] h-[380px] bg-amber-300 opacity-[0.12] bottom-0 -left-24" />
      <div className="orb animate-float w-[300px] h-[300px] bg-yellow-200 opacity-[0.08] -bottom-20 -right-20" />

      <div className="animate-fade-slide relative z-10 w-full max-w-sm">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-7 h-7 border border-black/20 flex items-center justify-center rounded overflow-hidden relative">
              <Image src="/ToDo_logo_transparent.png" alt="Todo List Logo" fill className="object-contain" />
            </div>
            <span className="text-xs tracking-[0.3em] text-black/60 uppercase">Todo List</span>
          </div>
          <h1 className="text-2xl font-semibold text-black tracking-tight">Sign in</h1>
          <p className="text-sm text-black/60 mt-1.5">Enter your credentials to continue.</p>
        </div>

        <div className="card rounded-2xl p-8">
          <LoginForm />
        </div>

        <p className="text-center text-[11px] text-black/40 mt-8 tracking-widest uppercase">
          © 2025 Todo List
        </p>
      </div>
    </main>
  );
}

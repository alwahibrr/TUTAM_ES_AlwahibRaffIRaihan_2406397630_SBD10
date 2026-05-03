import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a new Todo List account and get organized.',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-tertiary px-4 py-12">

      <div className="orb animate-float-slow w-[480px] h-[480px] bg-amber-300 opacity-[0.11] -top-32 -right-24" />
      <div className="orb animate-float w-[360px] h-[360px] bg-white opacity-[0.07] bottom-0 left-1/2 -translate-x-1/2" />
      <div className="orb animate-float-slow w-[260px] h-[260px] bg-yellow-200 opacity-[0.09] top-1/4 -left-20" />

      <div className="animate-fade-slide relative z-10 w-full max-w-sm">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-7 h-7 border border-black/20 flex items-center justify-center rounded overflow-hidden relative">
              <Image src="/ToDo_logo_transparent.png" alt="Todo List Logo" fill className="object-contain" />
            </div>
            <span className="text-xs tracking-[0.3em] text-black/60 uppercase">Todo List</span>
          </div>
          <h1 className="text-2xl font-semibold text-black tracking-tight">Create account</h1>
          <p className="text-sm text-black/60 mt-1.5">Fill in the details below to get started.</p>
        </div>

        <div className="card rounded-2xl p-8">
          <RegisterForm />
        </div>

        <p className="text-center text-[11px] text-black/40 mt-8 tracking-widest uppercase">
          © 2025 Todo List
        </p>
      </div>
    </main>
  );
}

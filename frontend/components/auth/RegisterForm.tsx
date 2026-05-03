'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, register, saveToken } from '@/lib/auth';
import { ApiClientError } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import FormField from '@/components/ui/FormField';

interface FieldErrors {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function passwordStrength(pwd: string): { level: number; label: string } {
    if (!pwd) return { level: 0, label: '' };
    let score = 0;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return { level: score, label: labels[score] };
  }

  const strength = passwordStrength(password);
  const strengthOpacity = ['', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'];

  function validate(): boolean {
    const errors: FieldErrors = {};

    if (!name.trim())
      errors.name = 'Name is required';
    else if (name.length > 100)
      errors.name = 'Name must be at most 100 characters';

    if (!username.trim())
      errors.username = 'Username is required';
    else if (username.length < 3 || username.length > 20)
      errors.username = 'Username must be between 3 and 20 characters';
    else if (!/^[a-zA-Z0-9_]+$/.test(username))
      errors.username = 'Only letters, numbers, and underscores allowed';

    if (!email.trim())
      errors.email = 'Email is required';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      errors.email = 'Enter a valid email address';

    if (phone && !/^\+?[\d\s-]+$/.test(phone))
      errors.phone = 'Use international format (e.g. +62 812 3456 7890)';

    if (!password)
      errors.password = 'Password is required';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/.test(password))
      errors.password = 'Min 10 chars with uppercase, lowercase, number, and special character';

    if (!confirmPassword)
      errors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      errors.confirmPassword = 'Passwords do not match';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload = { name, username, email, password, ...(phone ? { phone } : {}) };
      await register(payload);

      const authData = await login({ email, password });
      saveToken(authData.token);

      router.push('/todos');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {serverError && (
        <div className="p-3.5 border border-red-500/40 rounded-xl text-sm text-red-400">
          {serverError}
        </div>
      )}

      <FormField label="Full Name" htmlFor="name" required>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
          autoComplete="name"
        />
      </FormField>

      <FormField label="Username" htmlFor="username" required>
        <Input
          id="username"
          type="text"
          placeholder="john_doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={fieldErrors.username}
          autoComplete="username"
        />
      </FormField>

      <FormField label="Email" htmlFor="reg-email" required>
        <Input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
        />
      </FormField>

      <FormField label="Phone" htmlFor="phone">
        <Input
          id="phone"
          type="tel"
          placeholder="+62 812 3456 7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={fieldErrors.phone}
          autoComplete="tel"
        />
      </FormField>

      <FormField label="Password" htmlFor="reg-password" required>
        <div className="relative">
          <Input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            autoComplete="new-password"
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {password.length > 0 && (
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-0.5 flex-1 transition-all duration-300 bg-[#9AB17A] ${n <= strength.level ? strengthOpacity[strength.level] : 'opacity-10'
                    }`}
                />
              ))}
            </div>
            {strength.label && (
              <p className="text-[11px] text-neutral-500 uppercase tracking-widest">
                {strength.label}
              </p>
            )}
          </div>
        )}
      </FormField>

      <FormField label="Confirm Password" htmlFor="confirm-password" required>
        <Input
          id="confirm-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
        />
      </FormField>

      <Button type="submit" isLoading={isLoading}>
        Create Account
      </Button>

      <p className="text-center text-xs text-neutral-500">
        Already have an account?{' '}
        <Link href="/login" className="text-[#9AB17A] underline underline-offset-2 hover:text-[#9AB17A]/80 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}

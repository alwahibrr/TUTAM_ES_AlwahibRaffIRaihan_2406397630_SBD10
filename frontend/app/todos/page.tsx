'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, clearToken } from '@/lib/auth';
import { Todo, getTodos, createTodo, updateTodoStatus, deleteTodo } from '@/lib/todos';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function TodosPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTodos(token);
  }, [router]);

  async function fetchTodos(token: string) {
    try {
      const data = await getTodos(token);
      setTodos(data || []);
    } catch (err) {
      console.error(err);
      if ((err as any).status === 401) {
        clearToken();
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const token = getToken();
    if (!token) return;

    try {
      const newTodo = await createTodo(token, { title, description });
      setTodos([newTodo, ...todos]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggle(id: number, currentStatus: boolean) {
    const token = getToken();
    if (!token) return;
    try {
      const updated = await updateTodoStatus(token, id, !currentStatus);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    const token = getToken();
    if (!token) return;
    try {
      await deleteTodo(token, id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Orbs - Increased opacity for visibility on light background */}
      <div className="orb animate-float-slow w-[600px] h-[600px] bg-[#9AB17A] opacity-[0.4] -top-40 -right-20" />
      <div className="orb animate-float w-[500px] h-[500px] bg-[#C3CC9B] opacity-[0.5] bottom-[-10%] -left-32" />
      <div className="orb animate-float w-[350px] h-[350px] bg-white opacity-[0.7] top-1/4 left-1/4" />
      <div className="orb animate-float-slow w-[400px] h-[400px] bg-[#E4DFB5] opacity-[0.8] bottom-1/4 right-1/4" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto py-24 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#9AB17A]">My Todos</h1>
        <Button variant="ghost" onClick={() => { clearToken(); router.push('/login'); }} className="w-auto px-2 py-1.5 text-xs text-neutral-500 border-neutral-300 hover:border-neutral-400 hover:bg-white/50 flex items-center gap-1.5">
          <Image src="/Logout.png" alt="Logout" width={14} height={14} className="opacity-60 invert" />
          Logout
        </Button>
      </div>

      <form onSubmit={handleAdd} className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#C3CC9B]/30 flex flex-col gap-4">
        <Input 
          placeholder="What needs to be done?" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <Input 
          placeholder="Details (optional)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <Button type="submit" className="w-full">Add Task</Button>
      </form>

      {isLoading ? (
        <p className="text-center text-neutral-500">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-neutral-500 py-8 bg-white/50 rounded-2xl border border-dashed border-[#C3CC9B]">
          No tasks yet. Enjoy your day!
        </p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:shadow-md ${todo.is_completed ? 'bg-white/40 border-[#E4DFB5]' : 'bg-white/80 border-[#C3CC9B]/40'}`}>
              <input 
                type="checkbox" 
                checked={todo.is_completed} 
                onChange={() => handleToggle(todo.id, todo.is_completed)}
                className="w-5 h-5 accent-[#9AB17A] rounded cursor-pointer"
              />
              <div className="flex-1">
                <h3 className={`font-medium ${todo.is_completed ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`text-sm mt-1 ${todo.is_completed ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {todo.description}
                  </p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(todo.id)}
                className="text-red-400 hover:text-red-600 p-2 transition-colors"
                aria-label="Delete todo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
}

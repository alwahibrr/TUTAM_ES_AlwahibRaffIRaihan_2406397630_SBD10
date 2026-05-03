'use client';
import type { Item } from '@/lib/items';
import Image from 'next/image';

interface ItemCardProps {
  item: Item;
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

const ITEM_IMAGES: Record<string, string> = {
  'Laptop': 'https://i.ibb.co.com/B5pwzzxp/Laptop.avif',
  'Monitor': 'https://i.ibb.co.com/1G554T2f/Monitor.webp',
  'Keyboard': 'https://i.ibb.co.com/PsM4xK28/Keyboard.webp',
  'Mouse': 'https://i.ibb.co.com/d4zXDfFC/Mouse.webp'
};

export default function ItemCard({ item }: ItemCardProps) {
  const inStock = item.stock > 0;
  const imageUrl = ITEM_IMAGES[item.name] || '/sample-item.png';

  return (
    <article className="group relative flex flex-col bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,200,80,0.05)]">

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-center h-40 border-b border-white/6 bg-white/[0.02] relative overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={item.name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-300" 
        />
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h2 className="text-sm font-medium text-white leading-snug">{item.name}</h2>

        <div className="flex items-end justify-between mt-auto">
          <p className="text-base font-semibold text-white tracking-tight">
            {formatRupiah(item.price)}
          </p>

          <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-widest font-medium ${inStock
            ? 'border-white/15 text-white/40'
            : 'border-red-500/30 text-red-400/70'
            }`}>
            {inStock ? `${item.stock} left` : 'Out of stock'}
          </span>
        </div>
      </div>
    </article>
  );
}

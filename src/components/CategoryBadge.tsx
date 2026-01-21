import { CategoryColor } from '@/types/Project';

interface CategoryBadgeProps {
  category: string;
  color: CategoryColor;
}

const colorStyles: Record<CategoryColor, { base: string; glow: string }> = {
  green: {
    base: 'bg-badge-green/20 text-badge-green border-badge-green/40',
    glow: 'shadow-[0_0_8px_rgba(74,222,128,0.4)]',
  },
  purple: {
    base: 'bg-badge-purple/20 text-badge-purple border-badge-purple/40',
    glow: 'shadow-[0_0_8px_rgba(141,139,242,0.4)]',
  },
  orange: {
    base: 'bg-badge-orange/20 text-badge-orange border-badge-orange/40',
    glow: 'shadow-[0_0_8px_rgba(251,146,60,0.4)]',
  },
  blue: {
    base: 'bg-badge-blue/20 text-badge-blue border-badge-blue/40',
    glow: 'shadow-[0_0_8px_rgba(96,165,250,0.4)]',
  },
  pink: {
    base: 'bg-badge-pink/20 text-badge-pink border-badge-pink/40',
    glow: 'shadow-[0_0_8px_rgba(244,114,182,0.4)]',
  },
};

export const CategoryBadge = ({ category, color }: CategoryBadgeProps) => {
  const styles = colorStyles[color];
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${styles.base} ${styles.glow}`}
    >
      {category}
    </span>
  );
};

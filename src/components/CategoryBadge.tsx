import { CategoryColor } from '@/types/Project';

interface CategoryBadgeProps {
  category: string;
  color: CategoryColor;
}

const colorStyles: Record<CategoryColor, string> = {
  green: 'bg-badge-green/20 text-badge-green border-badge-green/30',
  purple: 'bg-badge-purple/20 text-badge-purple border-badge-purple/30',
  orange: 'bg-badge-orange/20 text-badge-orange border-badge-orange/30',
  blue: 'bg-badge-blue/20 text-badge-blue border-badge-blue/30',
  pink: 'bg-badge-pink/20 text-badge-pink border-badge-pink/30',
};

export const CategoryBadge = ({ category, color }: CategoryBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${colorStyles[color]}`}
    >
      {category}
    </span>
  );
};

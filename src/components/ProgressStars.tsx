import { Star } from 'lucide-react';

interface ProgressStarsProps {
  completion: number; // 0-100
}

export const ProgressStars = ({ completion }: ProgressStarsProps) => {
  // Convert percentage to 0-5 stars
  const filledStars = Math.round((completion / 100) * 5);
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 transition-colors duration-300 ${
            index < filledStars
              ? 'fill-star-filled text-star-filled'
              : 'fill-transparent text-star-empty'
          }`}
        />
      ))}
    </div>
  );
};

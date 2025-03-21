import { cn } from 'lib/utils';

type Props = {
  fadeIn?: boolean;
  fadeInDelay?: number;
  className?: string;
  children: React.ReactNode;
};

export default function TextImageAnimation({
  fadeIn,
  fadeInDelay,
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(className, fadeIn && 'animate-fade-in-up', className)}
      style={fadeInDelay ? { animationDelay: `${fadeInDelay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

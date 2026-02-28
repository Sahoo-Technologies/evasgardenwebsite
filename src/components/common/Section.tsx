import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  bg?: string;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export default function Section({ children, bg = 'bg-white', className = '', id, fullWidth = false }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-32 px-6 ${bg} ${className}`}>
      <div className={fullWidth ? '' : 'container mx-auto max-w-7xl'}>
        {children}
      </div>
    </section>
  );
}

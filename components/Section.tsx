
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  bg?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', containerClassName = '', bg = 'bg-stone-50', id }) => {
  return (
    <section id={id} className={`py-20 md:py-32 ${bg} ${className}`}>
      <div className={`container mx-auto px-6 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;

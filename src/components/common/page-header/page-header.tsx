import * as React from 'react';
import { Button } from '@app/components/ui/button';

interface PageHeaderProps {
  title: React.ReactNode;
  titleIcon?: React.ReactNode;
  buttonText: React.ReactNode;
  buttonIcon?: React.ReactNode;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  titleClassName?: string;
  buttonClassName?: string;
}

export function PageHeader({
  title,
  titleIcon,
  buttonText,
  buttonIcon,
  onButtonClick,
  className = '',
  titleClassName = '',
  buttonClassName = '',
}: PageHeaderProps) {
  return (
    <div
      className={`mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${className}`.trim()}
    >
      <h2
        className={`text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 flex items-center gap-2 min-w-0 ${
          titleClassName
        }`.trim()}
      >
        {titleIcon && (
          <span className="bg-cyan-500/10 p-1.5 sm:p-2 rounded-md shrink-0 inline-flex items-center justify-center">
            {titleIcon}
          </span>
        )}
        <span className="leading-tight min-w-0">{title}</span>
      </h2>
      <Button
        onClick={onButtonClick}
        className={`w-full sm:w-auto shrink-0 justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm sm:text-base ${buttonClassName}`.trim()}
      >
        {buttonIcon && (
          <span className="mr-1 flex items-center shrink-0">
            {buttonIcon}
          </span>
        )}
        {buttonText}
      </Button>
    </div>
  );
}

export default PageHeader;

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-natural-900 dark:text-dark-text mb-3 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 border-2 border-natural-900 dark:border-dark-border
            bg-white dark:bg-dark-bg text-natural-900 dark:text-dark-text placeholder-natural-400 dark:placeholder-natural-500
            transition-colors
            focus:border-natural-700 dark:focus:border-dark-border focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-natural-900 dark:focus:ring-dark-border
            disabled:bg-natural-100 dark:disabled:bg-dark-card disabled:text-natural-500 dark:disabled:text-natural-600 disabled:cursor-not-allowed
            ${error ? 'border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400 focus:ring-red-600 dark:focus:ring-red-400' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

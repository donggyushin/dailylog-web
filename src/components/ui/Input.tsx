import { InputHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

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
            className="block text-sm font-medium text-neutral-700 dark:text-sepia-300 mb-3 transition-colors"
          >
            {label}
          </label>
        )}
        <motion.input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3.5 rounded-xl border-2 border-neutral-200 dark:border-sepia-700
            bg-white dark:bg-sepia-800 text-neutral-900 dark:text-sepia-100 placeholder-neutral-400 dark:placeholder-sepia-500
            transition-all duration-200
            focus:border-warm-400 dark:focus:border-sepia-600 focus:ring-4 focus:ring-warm-400/10 dark:focus:ring-sepia-600/20 focus:outline-none
            disabled:bg-neutral-50 dark:disabled:bg-sepia-900 disabled:text-neutral-500 dark:disabled:text-sepia-600 disabled:cursor-not-allowed
            ${error ? 'border-red-400 dark:border-red-700 focus:border-red-400 dark:focus:border-red-700 focus:ring-red-400/10 dark:focus:ring-red-700/20' : ''}
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400 transition-colors"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

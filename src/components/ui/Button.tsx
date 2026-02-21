import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-warm-400 dark:focus:ring-sepia-600 focus:ring-offset-2 dark:focus:ring-offset-sepia-900 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      default: 'bg-gradient-to-r from-warm-400 to-warm-500 dark:from-sepia-600 dark:to-sepia-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all',
      outline: 'border-2 border-warm-400 dark:border-sepia-600 text-warm-500 dark:text-sepia-300 hover:bg-warm-50 dark:hover:bg-sepia-800 active:bg-warm-100 dark:active:bg-sepia-700 transition-all',
      ghost: 'text-warm-500 dark:text-sepia-300 hover:bg-warm-50 dark:hover:bg-sepia-800 active:bg-warm-100 dark:active:bg-sepia-700 transition-all',
    };

    const sizes = {
      default: 'h-11 px-6 py-2.5 text-base',
      sm: 'h-9 px-4 py-2 text-sm',
      lg: 'h-12 px-8 py-3 text-lg',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            잠시만요...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'default', size = 'default', isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-natural-900 dark:focus:ring-dark-border disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            default: 'bg-natural-900 dark:bg-dark-text text-white dark:text-dark-bg border-2 border-natural-900 dark:border-dark-border hover:bg-natural-800 dark:hover:bg-natural-200 active:bg-natural-700 dark:active:bg-natural-300',
            outline: 'border-2 border-natural-900 dark:border-dark-border text-natural-900 dark:text-dark-text hover:bg-natural-100 dark:hover:bg-dark-card active:bg-natural-200 dark:active:bg-natural-800',
            ghost: 'text-natural-900 dark:text-dark-text hover:bg-natural-100 dark:hover:bg-dark-card active:bg-natural-200 dark:active:bg-natural-800',
        };

        const sizes = {
            default: 'h-11 px-6 py-3 text-base',
            sm: 'h-9 px-4 py-2 text-sm',
            lg: 'h-12 px-8 py-3.5 text-base tracking-wide',
        };

        const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

        return (
            <button
                ref={ref}
                className={classes}
                disabled={disabled || isLoading}
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
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };

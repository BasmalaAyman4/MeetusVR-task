'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import styles from '@/styles/Button.module.css';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={`${styles.button}  ${styles[variant as keyof typeof styles]} ${styles[size as keyof typeof styles]} ${className || ''} `}
                disabled={disabled || loading}
                whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
                transition={{ duration: 0.1 }}
                {...props}
            >
                {loading ? (
                    <motion.div
                        className={styles.spinner}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

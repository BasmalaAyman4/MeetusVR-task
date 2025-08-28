'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon, className, ...props }, ref) => {
        return (
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className={`${styles.inputWrapper}`}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <input
                        ref={ref}
                        className={`${styles.input} ${icon ? styles.withIcon : ''} ${className || ''}`}
                        placeholder={label}
                        {...props}
                    />
                </div>
            </motion.div>
        );
    }
);

Input.displayName = 'Input';
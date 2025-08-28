'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sms, Lock , Eye,EyeSlash } from "iconsax-react";
import { useAuthStore, useUiStore } from '@/store';
import { validateEmail } from '@/lib/utils';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

import styles from '@/styles/LoginForm.module.css';
import Image from 'next/image';
import logo from '@/public/images/logo.png'
import meetusVR from '@/public/images/meetusVR.png'

export function LoginForm() {
    const router = useRouter();
    const { login, error: authError, clearError } = useAuthStore();

    const {
        loginForm: { isSubmitting, showPassword },
        setLoginSubmitting,
        togglePasswordVisibility,
    } = useUiStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleInputChange = (field: 'email' | 'password') => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };


    useEffect(() => {
        if(formData.email=='' && formData.password=='')
        clearError();
    }, [clearError, formData.email, formData.password]); 
   
  

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginSubmitting(true);

        try {
            await login(formData);
            router.push('/dashboard');
        } catch (error) {
            console.log(error,'error')
        } finally {
            setLoginSubmitting(false);
        }
    };

    const isFormValid = formData.email && formData.password && validateEmail(formData.email);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
           
        >
            <div className={`${styles.blob} ${styles.blob__top_right}`}></div>
            <div className={`${styles.blob} ${styles.blob__top_left}`}></div>
            <div className={`${styles.blob} ${styles.blob__bottom_right}`}></div>
            <div className={`${styles.blob} ${styles.blob__bottom_left}`}></div>
            <div className={styles.container}>
                <div>
                    <div className={styles.header}>
                        <motion.h1
                            className={styles.title}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            Welcome back
                        </motion.h1>
                        <motion.p
                            className={styles.subtitle}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Step into our shopping metaverse for an unforgettable shopping experience
                        </motion.p>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className={styles.form}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Input
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            icon={<Sms size={20} color="#333" variant="Outline" />}
                            disabled={isSubmitting}
                            required
                        />

                        <div className={styles.passwordContainer}>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                value={formData.password}
                                onChange={handleInputChange('password')}
                                icon={<Lock size={20} color="#333" variant="Outline" />}
                                disabled={isSubmitting}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={togglePasswordVisibility}
                                disabled={isSubmitting}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeSlash size={20} color="#333" variant="Outline" /> : <Eye size={20} color="#333" variant="Outline" />}
                            </button>
                        </div>

                        { authError && (
                            <motion.div
                                className={styles.generalError}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                { authError}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={!isFormValid || isSubmitting}
                            className={styles.submitButton}
                        >
                            Login
                        </Button>

                        <motion.p
                            className={styles.signupLink}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            {`Don't have an account? Sign up`}
                        </motion.p>
                    </motion.form>
                </div>
                <motion.div
                    className={styles.logoContainer}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Image alt='logo' src={logo} width={744} height={523} />
                    <Image alt='meetus' src={meetusVR} width={413} height={75} />

                </motion.div>
            </div>
           

         
        </motion.div>
    );
}

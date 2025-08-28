'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore, useUiStore } from '@/store/index';
import { Button } from './ui/Button';
import styles from '@/styles/Dashboard.module.css';
import LoadingSpinner from './ui/LoadingSpinner';
import { Layer, Logout } from "iconsax-react";
import Image from 'next/image';
import logo from '@/public/images/logo.png'
import meetusVR from '@/public/images/meetusVR.png'
export function Dashboard() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading, logout, checkAuth } = useAuthStore();
    const { dashboard: { isLoading }, setDashboardLoading } = useUiStore();

    useEffect(() => {
        const initializeDashboard = async () => {
            setDashboardLoading(true);
            await checkAuth();

            setDashboardLoading(false);
        };

        initializeDashboard();
    }, [checkAuth, setDashboardLoading]);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, authLoading, router]);

    const handleLogout = async () => {
        setDashboardLoading(true);
        logout();
        router.push('/');
    };

    if (authLoading || isLoading || !user) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Image alt='' src={logo} className={styles.iconlogo} width={50} height={50} />
                    <Image alt='' src={meetusVR} className={styles.imglogo} width={50} height={50} />
                </div>
            </div>
            <nav className={styles.nav}>
                <div
                    className={`${styles.navItem} ${styles.navItemActive}`}
                >
                    <Layer size={20} color="#333" variant="Outline" />
                    <span className={styles.navText}>Overview</span>
                </div>
            </nav>
            <div className={styles.footer} onClick={handleLogout}>
                <div
                    className={`${styles.navItem}`}
                >
                    <Logout className={styles.navIcon} size={20} color="#333" variant="Outline" />
                    <span className={styles.navText}>Logout</span>
                </div>
            </div>
        </div>
            <motion.div
                className={styles.welcomeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <h2>Welcome to the Dashboard, {user.name}!</h2>
                <p>You are now logged in to the shopping metaverse.</p>
                <div>
                    <span>You ID: {user.id} </span> , 
                    <span> Your Name : {user.name} </span>
                </div>
                <Button  onClick={handleLogout} disabled={isLoading} className={styles.logout__btn}>
                    Logout
                </Button>
            </motion.div>
                    </motion.div>
    );
}
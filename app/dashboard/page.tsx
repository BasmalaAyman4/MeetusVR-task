import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Dashboard } from '@/components/Dashboard';
export const metadata: Metadata = {
    title: 'MeetusVR Dashboard',
    description: 'Step into our shopping metaverse for an unforgettable shopping experience',
};

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/');
    }

    return <Dashboard />;
}
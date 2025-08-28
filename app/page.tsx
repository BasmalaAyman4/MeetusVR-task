import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { LoginForm } from '@/components/LoginForm';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}


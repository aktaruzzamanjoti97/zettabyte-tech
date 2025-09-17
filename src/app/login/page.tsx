import LoadingSpinner from '@/components/LoadingSpinner';
import LoginPageBody from '@/components/LoginPageBody';
import { Suspense } from 'react';

export default function LoginPage() {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<LoginPageBody />
		</Suspense>
	);
}

'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		try {
			await signIn('google', {
				callbackUrl: '/profile',
				redirect: true,
			});
		} catch (error) {
			console.error('Login failed:', error);
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-dark-500 flex items-center justify-center px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full'>
				<div className='bg-dark-400 border border-dark-300 rounded-2xl shadow-2xl p-8'>
					<div className='text-center mb-8'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: 'spring' }}
							className='w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
							<span className='text-3xl'>⚡</span>
						</motion.div>
						<h1 className='text-3xl font-bold text-white mb-2'>
							Welcome Back
						</h1>
						<p className='text-gray-400'>
							Sign in to access your dashboard
						</p>
					</div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg'>
							<p className='text-red-400 text-sm text-center'>
								{error === 'OAuthSignin' &&
									'Failed to sign in with Google. Please try again.'}
								{error === 'OAuthCallback' &&
									'Authentication error. Please try again.'}
								{error === 'Default' &&
									'An error occurred. Please try again.'}
							</p>
						</motion.div>
					)}

					<div className='space-y-4'>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleGoogleLogin}
							disabled={isLoading}
							className='w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
							{!isLoading ? (
								<>
									<svg className='w-5 h-5' viewBox='0 0 24 24'>
										<path
											fill='#4285F4'
											d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
										/>
										<path
											fill='#34A853'
											d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
										/>
										<path
											fill='#FBBC05'
											d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
										/>
										<path
											fill='#EA4335'
											d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
										/>
									</svg>
									<span>Continue with Google</span>
								</>
							) : (
								<div className='flex items-center space-x-2'>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}
										className='w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full'
									/>
									<span>Signing in...</span>
								</div>
							)}
						</motion.button>

						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-dark-300'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-dark-400 text-gray-500'>
									Or continue with
								</span>
							</div>
						</div>

						<button
							disabled
							className='w-full bg-dark-300 text-gray-400 py-3 px-4 rounded-lg font-medium cursor-not-allowed opacity-50'>
							Email Sign In (Coming Soon)
						</button>
					</div>

					<p className='text-center text-gray-500 text-sm mt-6'>
						By signing in, you agree to our Terms of Service and Privacy
						Policy
					</p>
				</div>
			</motion.div>
		</div>
	);
}

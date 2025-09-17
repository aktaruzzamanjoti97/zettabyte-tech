'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import Card from '@/ui/Card';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		return <LoadingSpinner />;
	}

	if (!session?.user) {
		router.push('/login');
		return null;
	}

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/login' });
	};

	return (
		<div className='max-w-4xl mx-auto'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='mb-8'>
				<h1 className='text-4xl font-bold text-white'>Profile</h1>
				<p className='text-gray-400 mt-2'>
					Manage your account settings and preferences
				</p>
			</motion.div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Profile Card */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 }}>
					<Card>
						<div className='text-center'>
							{session.user.image ? (
								<motion.img
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', delay: 0.2 }}
									src={session.user.image}
									alt={session.user.name || 'Profile'}
									className='w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500'
								/>
							) : (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', delay: 0.2 }}
									className='w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold'>
									{session.user.name?.charAt(0) || 'U'}
								</motion.div>
							)}
							<h2 className='text-2xl font-bold text-white mb-2'>
								{session.user.name}
							</h2>
							<p className='text-gray-400'>{session.user.email}</p>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleSignOut}
								className='mt-6 w-full bg-red-500/20 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500/30 transition-colors'>
								Sign Out
							</motion.button>
						</div>
					</Card>
				</motion.div>

				{/* Account Details */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className='lg:col-span-2'>
					<Card>
						<h3 className='text-xl font-semibold text-white mb-6'>
							Account Information
						</h3>

						<div className='space-y-4'>
							<div>
								<label className='text-sm font-medium text-gray-500'>
									Full Name
								</label>
								<p className='text-white mt-1'>
									{session.user.name || 'Not provided'}
								</p>
							</div>

							<div>
								<label className='text-sm font-medium text-gray-500'>
									Email Address
								</label>
								<p className='text-white mt-1'>
									{session.user.email || 'Not provided'}
								</p>
							</div>

							<div>
								<label className='text-sm font-medium text-gray-500'>
									User ID
								</label>
								<p className='text-gray-400 mt-1 font-mono text-sm'>
									{/* {session.user.id || 'Not available'} */}
								</p>
							</div>

							<div>
								<label className='text-sm font-medium text-gray-500'>
									Authentication Provider
								</label>
								<p className='text-white mt-1'>Google OAuth</p>
							</div>

							<div className='pt-4 border-t border-dark-300'>
								<h4 className='text-lg font-semibold text-white mb-3'>
									Quick Actions
								</h4>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<button className='bg-dark-300 text-gray-300 py-2 px-4 rounded-lg hover:bg-dark-200 transition-colors'>
										Edit Profile
									</button>
									<button className='bg-dark-300 text-gray-300 py-2 px-4 rounded-lg hover:bg-dark-200 transition-colors'>
										Privacy Settings
									</button>
									<button className='bg-dark-300 text-gray-300 py-2 px-4 rounded-lg hover:bg-dark-200 transition-colors'>
										Notifications
									</button>
									<button className='bg-dark-300 text-gray-300 py-2 px-4 rounded-lg hover:bg-dark-200 transition-colors'>
										Security
									</button>
								</div>
							</div>
						</div>
					</Card>
				</motion.div>
			</div>

			{/* Activity Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='mt-6'>
				<Card>
					<h3 className='text-xl font-semibold text-white mb-4'>
						Recent Activity
					</h3>
					<div className='space-y-3'>
						{[
							{
								action: 'Signed in via Google',
								time: 'Just now',
								icon: '🔐',
							},
							{
								action: 'Profile viewed',
								time: '2 minutes ago',
								icon: '👤',
							},
							{
								action: 'Dashboard accessed',
								time: '5 minutes ago',
								icon: '📊',
							},
						].map((activity, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 + index * 0.1 }}
								className='flex items-center justify-between p-3 bg-dark-300 rounded-lg'>
								<div className='flex items-center space-x-3'>
									<span className='text-2xl'>{activity.icon}</span>
									<div>
										<p className='text-white'>{activity.action}</p>
										<p className='text-gray-500 text-sm'>
											{activity.time}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</Card>
			</motion.div>
		</div>
	);
}

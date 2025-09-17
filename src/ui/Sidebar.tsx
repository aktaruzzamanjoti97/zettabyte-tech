'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
	{ href: '/', label: 'Dashboard', icon: '🏠' },
	{ href: '/posts', label: 'Posts', icon: '📝' },
	{ href: '/users', label: 'Users', icon: '👥' },
	{ href: '/profile', label: 'Profile', icon: '👤', requireAuth: true },
];

export default function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();
	const { data: session } = useSession();

     const filteredMenuItems = menuItems.filter(
       (item) => !item.requireAuth || (item.requireAuth && session)
   );

	return (
		<motion.aside
			initial={{ width: 240 }}
			animate={{ width: isCollapsed ? 80 : 240 }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			className='bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-xl relative'>
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className='absolute -right-3 top-9 bg-white text-gray-700 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow z-10'>
				<motion.svg
					animate={{ rotate: isCollapsed ? 180 : 0 }}
					transition={{ duration: 0.3 }}
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
						clipRule='evenodd'
					/>
				</motion.svg>
			</button>

			<div className='p-6'>
				<motion.h1
					animate={{ fontSize: isCollapsed ? '1.5rem' : '1.875rem' }}
					className='font-bold text-center'>
					{isCollapsed ? 'MD' : 'Mini Dashboard'}
				</motion.h1>
			</div>

			<nav className='px-4'>
				{filteredMenuItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link key={item.href} href={item.href}>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
									isActive
										? 'bg-white/20 text-white'
										: 'hover:bg-white/10 text-white/80'
								}`}>
								<span className='text-xl'>{item.icon}</span>
								<AnimatePresence mode='wait'>
									{!isCollapsed && (
										<motion.span
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: 'auto' }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2 }}
											className='ml-3 overflow-hidden whitespace-nowrap'>
											{item.label}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					);
				})}
			</nav>
            {/* User Section */}
			{session?.user && (
				<div className='absolute bottom-0 left-0 right-0 p-4 border-t border-dark-300'>
					<Link href='/profile'>
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-300 transition-colors'>
							{session.user.image ? (
								<img
									src={session.user.image}
									alt={session.user.name || ''}
									className='w-8 h-8 rounded-full'
								/>
							) : (
								<div className='w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold'>
									{session.user.name?.charAt(0) || 'U'}
								</div>
							)}
							{!isCollapsed && (
								<div className='flex-1 overflow-hidden'>
									<p className='text-white text-sm font-medium truncate'>
										{session.user.name}
									</p>
									<p className='text-gray-400 text-xs truncate'>
										{session.user.email}
									</p>
								</div>
							)}
						</motion.div>
					</Link>
				</div>
			)}

			{/* Login Button if not authenticated */}
			{!session && (
				<div className='absolute bottom-0 left-0 right-0 p-4 border-t border-dark-300'>
					<Link href='/login'>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center'>
							{!isCollapsed ? 'Sign In' : '→'}
						</motion.button>
					</Link>
				</div>
			)}
		</motion.aside>
	);
}

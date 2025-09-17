'use client';

import Card from '@/components/Card';
import StatsCard from '@/components/StatsCard';
import { motion } from 'framer-motion';

export default function HomePage() {
	const stats = [
		{
			title: 'Total Users',
			value: '1,234',
			icon: '👥',
			color: 'from-purple-500/30 to-purple-600',
		},
		{
			title: 'Posts',
			value: '456',
			icon: '📝',
			color: ' from-blue-500/30 to-blue-600',
		},
		{
			title: 'Comments',
			value: '789',
			icon: '💬',
			color: 'from-green-500/30 to-green-600',
		},
		{
			title: 'Engagement',
			value: '92%',
			icon: '📈',
			color: 'from-orange-500/30 to-orange-600',
		},
	];

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<h1 className='text-4xl font-bold text-gray-200 mb-2'>
					Welcome to Dashboard
				</h1>
				<p className='text-gray-400 mb-8'>
					{"Here's what's happening in your application today."}
				</p>
			</motion.div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				{stats.map((stat, index) => (
					<StatsCard key={stat.title} {...stat} delay={index * 0.1} />
				))}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card delay={0.4}>
					<h2 className='text-xl font-semibold text-gray-200 mb-4'>
						Recent Activity
					</h2>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className='space-y-3'>
						{[1, 2, 3].map((i) => (
							<motion.div
								key={i}
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.6 + i * 0.1 }}
								className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<div className='w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse' />
								<p className='text-gray-600'>User activity item {i}</p>
							</motion.div>
						))}
					</motion.div>
				</Card>

				<Card delay={0.5}>
					<h2 className='text-xl font-semibold text-gray-200 mb-4'>
						Performance Chart
					</h2>
					<div className='h-48 flex items-end justify-around'>
						{[65, 45, 78, 52, 88, 74, 90, 45, 80, 70].map((height, index) => (
							<motion.div
								key={index}
								initial={{ height: 0 }}
								animate={{ height: `${height}%` }}
								transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
								className='w-8 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg'
							/>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}

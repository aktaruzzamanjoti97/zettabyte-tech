'use client';

import Card from '@/components/Card';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useFetch } from '@/hooks/useFetch';
import { Post } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';

interface PostPageProps {
	params: Promise<{ id: string }>;
}

export default function PostPage({ params }: PostPageProps) {
	const resolvedParams = use(params);
	const {
		data: post,
		loading,
		error,
		refetch,
	} = useFetch<Post>(
		`https://jsonplaceholder.typicode.com/posts/${resolvedParams.id}`
	);

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error} onRetry={refetch} />;
	if (!post) return <ErrorMessage message='Post not found' />;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<Link href='/posts'>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='mb-6 flex items-center text-indigo-600 hover:text-indigo-700 font-medium'>
					<svg
						className='w-5 h-5 mr-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Back to Posts
				</motion.button>
			</Link>

			<Card animate={false}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}>
					<div className='mb-4'>
						<span className='inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium'>
							Post #{post.id}
						</span>
						<span className='ml-2 inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'>
							User #{post.userId}
						</span>
					</div>

					<h1 className='text-3xl font-bold text-gray-200 mb-6'>
						{post.title}
					</h1>

					<div className='prose max-w-none'>
						<p className='text-gray-400 leading-relaxed text-lg'>
							{post.body}
						</p>
					</div>

					<div className='mt-8 pt-6 border-t border-gray-200'>
						<div className='flex items-center space-x-6 text-gray-400'>
							<button className='flex items-center hover:text-indigo-600 transition-colors'>
								<span className='mr-2'>👍</span> Like
							</button>
							<button className='flex items-center hover:text-indigo-600 transition-colors'>
								<span className='mr-2'>💬</span> Comment
							</button>
							<button className='flex items-center hover:text-indigo-600 transition-colors'>
								<span className='mr-2'>🔗</span> Share
							</button>
						</div>
					</div>
				</motion.div>
			</Card>
		</motion.div>
	);
}

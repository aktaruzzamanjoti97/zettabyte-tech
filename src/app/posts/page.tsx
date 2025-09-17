'use client';

import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useFetch } from '@/hooks/useFetch';
import { Post } from '@/types';
import Card from '@/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function PostsPage() {
	const [useInvalidUrl, setUseInvalidUrl] = useState(false);

	const url = useInvalidUrl
		? 'https://jsonplaceholder.typicode.com/invalid-posts'
		: 'https://jsonplaceholder.typicode.com/posts';

	const { data: posts, loading, error, refetch } = useFetch<Post[]>(url);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	if (loading) return <LoadingSpinner />;

	if (error) {
		return <ErrorMessage message={error} onRetry={refetch} />;
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-8'>
				<div>
					<h1 className='text-4xl font-bold text-gray-200'>Posts</h1>
					<p className='text-gray-400 mt-2'>Browse through all posts</p>
				</div>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => {
						setUseInvalidUrl(!useInvalidUrl);
						setTimeout(refetch, 100);
					}}
					className={`px-4 py-2 rounded-lg font-medium ${
						useInvalidUrl
							? 'bg-red-600 text-white hover:bg-red-700'
							: 'bg-green-600 text-white hover:bg-gray-700'
					} transition-colors`}>
					{useInvalidUrl ? 'Use Valid URL' : 'Simulate Error'}
				</motion.button>
			</div>

			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{posts?.slice(0, 12).map((post, index) => (
					<Link key={post.id} href={`/posts/${post.id}`}>
						<Card delay={index * 0.05}>
							<h2 className='text-2xl font-semibold text-gray-200 mb-2 line-clamp-2'>
								{post.title}
							</h2>
							<p className='text-gray-400 line-clamp-3'>{post.body}</p>
							<div className='mt-4 text-indigo-600 font-medium flex items-center'>
								Read more
								<svg
									className='w-4 h-4 ml-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 5l7 7-7 7'
									/>
								</svg>
							</div>
						</Card>
					</Link>
				))}
			</motion.div>
		</div>
	);
}

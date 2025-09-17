'use client';

import { motion } from 'framer-motion';

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
			<div className='text-red-600 text-5xl mb-4'>⚠️</div>
			<h3 className='text-red-800 font-semibold text-lg mb-2'>
				Error Occurred
			</h3>
			<p className='text-red-600 mb-4'>{message}</p>
			{onRetry && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onRetry}
					className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors'>
					Try Again
				</motion.button>
			)}
		</motion.div>
	);
}

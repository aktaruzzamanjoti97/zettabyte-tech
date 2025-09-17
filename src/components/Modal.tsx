'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className='fixed inset-0 bg-black/50 z-40'
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.75, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.75, y: 20 }}
						transition={{ type: 'spring', duration: 0.5 }}
						className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none'>
						<div className='bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 pointer-events-auto'>
							<button
								onClick={onClose}
								className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl'>
								×
							</button>
							{children}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

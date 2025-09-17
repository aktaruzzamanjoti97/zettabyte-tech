'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	animate?: boolean;
	delay?: number;
}

export default function Card({
	children,
	className = '',
	onClick,
	animate = true,
	delay = 0,
}: CardProps) {
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				delay: delay,
				ease: 'easeOut',
			},
		},
	};

	return (
		<motion.div
			// variants={animate ? cardVariants : undefined}
			initial={animate ? 'hidden' : undefined}
			animate={animate ? 'visible' : undefined}
			whileHover={onClick ? { scale: 1.02, y: -5 } : { scale: 1.01 }}
			whileTap={onClick ? { scale: 0.98 } : undefined}
			onClick={onClick}
			className={`bg-black rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 ${
				onClick ? 'cursor-pointer' : ''
			} ${className}`}>
			{children}
		</motion.div>
	);
}

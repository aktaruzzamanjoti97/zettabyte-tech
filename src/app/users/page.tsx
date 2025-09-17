'use client';

import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import Modal from '@/components/Modal';
import { useFetch } from '@/hooks/useFetch';
import { User } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function UsersPage() {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const {
		data: users,
		loading,
		error,
		refetch,
	} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error} onRetry={refetch} />;

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-8'>
				<h1 className='text-4xl font-bold text-gray-200'>Users</h1>
				<p className='text-gray-400 mt-2'>
					Manage and view user information
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className='bg-white rounded-xl shadow-lg overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>
							<tr>
								<th className='px-6 py-4 text-left font-semibold'>
									Name
								</th>
								<th className='px-6 py-4 text-left font-semibold'>
									Email
								</th>
								<th className='px-6 py-4 text-left font-semibold'>
									Company
								</th>
								<th className='px-6 py-4 text-left font-semibold'>
									City
								</th>
								<th className='px-6 py-4 text-left font-semibold'>
									Details
								</th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user, index) => (
								<motion.tr
									key={user.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
									onClick={() => setSelectedUser(user)}
									className='border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors'
									whileHover={{ backgroundColor: '#f9fafb' }}>
									<td className='px-6 py-4'>
										<div className='font-medium text-gray-800'>
											{user.name}
										</div>
										<div className='text-sm text-gray-500'>
											@{user.username}
										</div>
									</td>
									<td className='px-6 py-4 text-gray-600'>
										{user.email}
									</td>
									<td className='px-6 py-4'>
										<div className='text-gray-800'>
											{user.company.name}
										</div>
										<div className='text-sm text-gray-500'>
											{user.company.catchPhrase}
										</div>
									</td>
									<td className='px-6 py-4 text-gray-600'>
										{user.address.city}
									</td>
									<td className='px-6 py-4 text-gray-600'>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											
											className={`px-4 py-2 rounded-lg font-medium  transition-colors bg-green-600 text-white hover:bg-gray-700`}>
										View
										</motion.button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			<Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
				{selectedUser && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1 }}>
						<h2 className='text-2xl font-bold text-gray-800 mb-4'>
							{selectedUser.name}
						</h2>

						<div className='space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Username
									</label>
									<p className='text-gray-800'>
										@{selectedUser.username}
									</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Email
									</label>
									<p className='text-gray-800'>{selectedUser.email}</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Phone
									</label>
									<p className='text-gray-800'>{selectedUser.phone}</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Website
									</label>
									<p className='text-gray-800'>
										{selectedUser.website}
									</p>
								</div>
							</div>

							<div className='border-t pt-4'>
								<label className='text-sm font-medium text-gray-500'>
									Company
								</label>
								<p className='text-gray-800 font-semibold'>
									{selectedUser.company.name}
								</p>
								<p className='text-gray-600 text-sm'>
									{selectedUser.company.catchPhrase}
								</p>
								<p className='text-gray-500 text-sm'>
									{selectedUser.company.bs}
								</p>
							</div>

							<div className='border-t pt-4'>
								<label className='text-sm font-medium text-gray-500'>
									Address
								</label>
								<p className='text-gray-800'>
									{selectedUser.address.street},{' '}
									{selectedUser.address.suite}
								</p>
								<p className='text-gray-800'>
									{selectedUser.address.city},{' '}
									{selectedUser.address.zipcode}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</Modal>
		</div>
	);
}

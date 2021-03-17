import { useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import Link from 'next/link';

function TopNavbar() {
	const [session, loading] = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const isSignedIn = session && !loading;
	const showOpenIcon = !isOpen ? 'block' : 'hidden';
	const shopCloseIcon = isOpen ? 'block' : 'hidden';
	const openTransition = !isOpen
		? '-translate-y-full opacity-0 top-0'
		: '-translate-y-0 opacity-1';

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='relative flex items-center justify-between h-16'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
							onClick={() => setIsOpen((state) => !state)}
						>
							<span className='sr-only'>Open main menu</span>

							<svg
								className={`${showOpenIcon} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
							<svg
								className={`${shopCloseIcon} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex-shrink-0 flex items-center'>
							<Link href='/'>
								<a className='text-white font-semibold tracking-wide'>
									OrinuShop
								</a>
							</Link>
						</div>
						<div className='hidden sm:block sm:ml-6'>
							<div className='flex space-x-4'>
								<Link href='/cart'>
									<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										Cart
									</a>
								</Link>

								{!isSignedIn && (
									<Link href='/signin'>
										<a className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'>
											Sign in
										</a>
									</Link>
								)}

								{isSignedIn && (
									<button
										className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
										onClick={() => signOut()}
									>
										Sign Out
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`bg-gray-800 transition-all transform absolute inset-x-0 z-50 ${openTransition} sm:hidden`}
				id='mobile-menu'
			>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					<Link href='/cart'>
						<a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
							Cart
						</a>
					</Link>

					{!isSignedIn && (
						<Link href='/signin'>
							<a className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'>
								Sign in
							</a>
						</Link>
					)}

					{isSignedIn && (
						<button
							className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
							onClick={() => signOut()}
						>
							Sign out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}

export default TopNavbar;

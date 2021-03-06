import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

function SignInPage() {
	const router = useRouter();
	const [hasError, setHasError] = useState(false);
	const [hasRegistered, setHasRegistered] = useState(false);
	const inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		if (router.query.error) {
			setHasError(true);
		}

		if (router.query.register === 'success') {
			setHasRegistered(true);
		}
	}, [router]);

	useEffect(() => {
		axios.get('/api/auth/csrf').then(({ data }) => {
			if (inputRef.current) {
				inputRef.current.value = data.csrfToken;
			}
		});
	}, []);

	return (
		<main className='p-4 sm:w-128 mx-auto mt-4 space-y-6 sm:mt-8'>
			<h1 className='uppercase text-2xl tracking-wide font-medium text-gray-700'>
				Sign in
			</h1>

			{hasError && (
				<p className='bg-red-300 px-2 py-3 text-white border-red-400 border rounded-sm'>
					Invalid email or password, please try again.
				</p>
			)}

			{hasRegistered && (
				<p className='bg-green-300 px-2 py-3 text-white border-green-400 border rounded-sm'>
					Sign in into your account.
				</p>
			)}

			<form
				className='space-y-4'
				method='post'
				action='/api/auth/callback/credentials'
			>
				<input
					name='csrfToken'
					type='hidden'
					// @ts-ignore
					ref={inputRef}
				/>
				<div className='space-y-2'>
					<label
						htmlFor='email'
						className='block font-medium tracking-wide text-gray-500'
					>
						Email Address
					</label>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Enter email'
						className='w-full p-3 bg-gray-200 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700'
					/>
				</div>
				<div className='space-y-2'>
					<label
						htmlFor='password'
						className='block font-medium tracking-wide text-gray-500'
					>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Enter password'
						className='w-full p-3 bg-gray-200 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700'
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-900 uppercase tracking-wide hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'
				>
					Sign in
				</button>
				<p className='text-gray-700'>
					New Customer?{' '}
					<Link href='/register'>
						<a className='font-semibold'>Register</a>
					</Link>
				</p>
			</form>
		</main>
	);
}

export default SignInPage;

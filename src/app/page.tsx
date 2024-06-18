'use client';

import { useEffect, useState } from 'react';

interface Item {
	title: string;
	price: string;
}

const Home: React.FC = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch('https://functions.yandexcloud.net/d4e22dkvvkt9va7hka55');
				let data: Item[] = await res.json();

				data = data.map(item => ({
					...item,
					price: item.price.split('.css')[0].trim(),
				}));

				const cleanedData = data.map(item => ({
					...item,
					price: item.price.split('.css')[0].trim(),
				}));
				setItems(cleanedData);
			} catch (error) {
				console.error('Failed to fetch data', error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<div className='min-h-screen bg-gray-900 py-10'>
			<h1 className='text-3xl font-bold text-center mb-10 text-white'>Parsing ads from OLX</h1>
			<ul className='max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-5'>
				{loading
					? [...Array(5)].map((_, index) => (
							<li
								key={index}
								className='border-b border-gray-700 py-3 animate-pulse'
							>
								<div className='h-6 bg-gray-700 rounded w-3/4 mb-2'></div>
								<div className='h-4 bg-gray-700 rounded w-1/2'></div>
							</li>
					  ))
					: items.map((item, index) => (
							<li
								key={index}
								className='border-b border-gray-700 py-3'
							>
								<h2 className='text-xl font-semibold text-white'>{item.title}</h2>
								<p className='text-gray-400'>{item.price}</p>
							</li>
					  ))}
			</ul>
		</div>
	);
};

export default Home;

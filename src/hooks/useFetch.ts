import { useEffect, useState } from 'react';

interface UseFetchResult<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const jsonData = await response.json();
			setData(jsonData);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch data');
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return { data, loading, error, refetch: fetchData };
}

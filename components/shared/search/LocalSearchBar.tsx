'use client';

import Image from 'next/image';
import { Input } from '../../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeUrlQuery } from '@/lib/utils';

interface CustomProps {
	route: string;
	iconPosition: string;
	imgSrc: string;
	placeholder: string;
	otherClasses?: string;
}

const LocalSearchBar = ({
	route,
	iconPosition,
	imgSrc,
	placeholder,
	otherClasses,
}: CustomProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get('q');

	const [search, setSearch] = useState(query || '');

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'q',
					value: search,
				});

				router.push(newUrl, { scroll: false });
			} else {
				if (pathname === route) {
					const newUrl = removeUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ['q'],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 400);

		return () => clearTimeout(delayDebounceFn);
	}, [search, searchParams, route, pathname, router, query]);

	return (
		<div
			className={`background-light800_darkgradient  flex  min-h-[56px] grow items-center gap-4 rounded-[10px]  px-4  ${otherClasses} ${route === '/' && 'w-full'}`}
		>
			{iconPosition === 'left' && (
				<Image
					src={imgSrc}
					alt="search icon"
					height={24}
					width={24}
					className="cursor-pointer"
				/>
			)}
			<Input
				type="text"
				placeholder={placeholder}
				value={search}
				onChange={(e) => setSearch(e.target?.value)}
				className="paragraph-regular no-focus placeholder text-dark400_light700  border-none shadow-none outline-none bg-transparent"
			/>
			{iconPosition === 'right' && (
				<Image
					src={imgSrc}
					alt="search icon"
					height={24}
					width={24}
					className="cursor-pointer"
				/>
			)}
		</div>
	);
};

export default LocalSearchBar;

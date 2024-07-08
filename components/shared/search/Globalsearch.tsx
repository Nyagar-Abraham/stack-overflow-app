'use client';

import { Input } from '@/components/ui/input';
import { formUrlQuery, removeUrlQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import GlobalResult from './GlobalResult';

const Globalsearch = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const searchContainerRef = useRef();

	const query = searchParams.get('q');

	const [search, setSearch] = useState(query || '');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleOutClick = (event: any) => {
			if (
				searchContainerRef.current &&
				// @ts-ignore
				!searchContainerRef.current.contains(event.target)
			) {
				setIsOpen(false);
				setSearch('');
			}
		};

		setIsOpen(false);

		document.addEventListener('click', handleOutClick);

		return () => {
			document.removeEventListener('click', handleOutClick);
		};
	}, [pathname]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'global',
					value: search,
				});

				router.push(newUrl, { scroll: false });
			} else {
				if (query) {
					const newUrl = removeUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ['global', 'type'],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 400);

		return () => clearTimeout(delayDebounceFn);
	}, [search, searchParams, pathname, router, query]);

	return (
		<div
			// @ts-ignore
			ref={searchContainerRef}
			className="relative w-full max-w-[600px] max-lg:hidden"
		>
			<div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
				<Image
					src="/assets/icons/search.svg"
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
				<Input
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);

						if (!isOpen) setIsOpen(true);
						if (e.target.value === '' && isOpen) setIsOpen(false);
					}}
					placeholder="search globally"
					className="paragraph-regular no-focus placeholder  text-dark400_light700 border-none bg-transparent shadow-none outline-none"
				/>
			</div>
			{isOpen && <GlobalResult />}
		</div>
	);
};

export default Globalsearch;

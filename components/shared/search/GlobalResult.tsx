/* eslint-disable spaced-comment */
'use client';

import { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GlobalFilter from './GlobalFilter';
import { globalSearch } from '@/lib/actions/general.actions';

const GlobalResult = () => {
	const searchparams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState([]);

	const global = searchparams.get('global');
	const type = searchparams.get('type');

	useEffect(() => {
		const fetchResult = async () => {
			try {
				setResult([]);
				setIsLoading(true);
				//global search
				const res = await globalSearch({ query: global, type });

				setResult(JSON.parse(res));
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		if (global) fetchResult();
	}, [global, type]);

	const renderLink = (type: string, id: string) => {
		switch (type) {
			case 'question':
				return `/question/${id}`;
			case 'answer':
				return `/question/${id}`;
			case 'user':
				return `/profile/${id}`;
			case 'tag':
				return `/tags/${id}`;
			default:
				return '/';
		}
	};

	return (
		<div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
			<GlobalFilter />
			<div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50" />
			<div className="space-y-5">
				<p className="text-dark400_light900 paragraph-semibold px-5">
					Top match
				</p>

				{isLoading ? (
					<div className="flex-center flex-col px-5">
						<ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
						<p>Browsing the entire database</p>
					</div>
				) : (
					<div className="flex flex-col gap-2">
						{result.length > 0 ? (
							result.map((item: any, index: number) => (
								<Link
									href={renderLink(item.type, item.id)}
									key={item.type + item.id + index}
									className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:bg-dark-500/50"
								>
									<Image
										src="/assets/icons/tag.svg"
										alt="tags"
										width={18}
										height={18}
										className="invert-colors mt-1 object-contain"
									/>

									<div className="flex flex-col">
										<p className="body-medium text-dark200_light800 line-clamp-1">
											{item.title}
										</p>
										<p className="text-light400_light500 font-bold capitalize small-medium mt-1 ">
											{item.type}
										</p>
									</div>
								</Link>
							))
						) : (
							<div className="flex-center flex-col px-5">
								<p className="text-dark200_light800 body-regular px-5 py-2.5 ">
									Oops, no result
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default GlobalResult;

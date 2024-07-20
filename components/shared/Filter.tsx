'use client';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { formUrlQuery } from '@/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
	filters: {
		name: string;
		value: string;
	}[];
	otherClasses?: string;
	containerClasses?: string;
	route?: string;
}

const Filter = ({ filters, otherClasses, containerClasses, route }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const paramFilter = searchParams?.get('filter');

	const handleUpdateParams = (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'filter',
			value,
		});

		router.push(newUrl, { scroll: false });
	};

	return (
		<div className={`relative ${containerClasses}`}>
			<Select
				onValueChange={handleUpdateParams}
				defaultValue={paramFilter || undefined}
			>
				<SelectTrigger
					className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
				>
					<div className="line-clamp-1 flex-1 text-left gap-2 flex items-center">
						{route === '/jobs' && (
							<Image
								alt='location icon'
								src="/assets/icons/location.svg"
								width={16}
								height={16}
								className="rounded-full object-contain invert "
							/>
						)}
						<SelectValue placeholder="select a filter" />
					</div>
				</SelectTrigger>
				<SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
					<SelectGroup>
						{filters.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
								className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
							>
								{item.name}{' '}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default Filter;

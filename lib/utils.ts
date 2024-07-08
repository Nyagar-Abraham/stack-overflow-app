import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
import { BADGE_CRITERIA } from '@/constants';
import { BadgeCounts } from '@/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
	const now = new Date();
	const diffInMs = now.getTime() - createdAt?.getTime();
	const diffInSeconds = Math.floor(diffInMs / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInWeeks = Math.floor(diffInDays / 7);
	const diffInMonths = Math.floor(diffInDays / 30); // Approximation
	const diffInYears = Math.floor(diffInDays / 365); // Approximation

	if (diffInYears > 0) {
		return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
	} else if (diffInMonths > 0) {
		return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
	} else if (diffInWeeks > 0) {
		return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
	} else if (diffInDays > 0) {
		return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
	} else if (diffInHours > 0) {
		return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
	} else if (diffInMinutes > 0) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
	} else {
		return 'just now';
	}
};

export const formatBigNumber = (num: number): string => {
	if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(1) + 'M';
	} else if (num >= 1_000) {
		return (num / 1_000).toFixed(1) + 'K';
	} else {
		return num.toString();
	}
};

export const getJoinedDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const formattedDate = date.toLocaleDateString(undefined, options);
	return `Joined on ${formattedDate}`;
};

interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
};

interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}
export const removeUrlQuery = ({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) => {
	const currentUrl = qs.parse(params);

	keysToRemove.forEach((key: string) => {
		delete currentUrl[key];
	});

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
};

interface BadgeParam {
	criteria: {
		type: keyof typeof BADGE_CRITERIA;
		count: number;
	}[];
}

export const assignBadges = (params: BadgeParam) => {
	const badgeCounts: BadgeCounts = {
		GOLD: 0,
		SILVER: 0,
		BRONZE: 0,
	};

	const { criteria } = params;

	criteria.forEach((item) => {
		const { type, count } = item;
		const badgeLevels: any = BADGE_CRITERIA[type];

		Object.keys(badgeLevels).forEach((level: any) => {
			if (count >= badgeLevels[level]) {
				badgeCounts[level as keyof BadgeCounts] += 1;
			}
		});
	});

	return badgeCounts;
};

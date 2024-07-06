import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

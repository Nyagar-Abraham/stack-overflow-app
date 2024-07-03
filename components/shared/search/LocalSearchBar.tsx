'use client';

import Image from 'next/image';
import { Input } from '../../ui/input';

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
	return (
		<div
			className={`background-light800_darkgradient  flex w-full min-h-[56px] grow items-center gap-4 rounded-[10px]  px-4  ${otherClasses}`}
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
				onChange={() => {}}
				className="paragraph-regular no-focus placeholder background-light800_darkgradient shadow-none border-none outline-none"
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

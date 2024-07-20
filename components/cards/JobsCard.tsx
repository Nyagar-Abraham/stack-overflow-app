import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
	_id: number;
	title: string;
	description: string;
	salary: string;
	workHours: string;
	address: string;
}

const JobsCard = ({
	_id,
	title,
	description,
	salary,
	workHours,
	address,
}: Props) => {
	return (
		<div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
			<div className="flex items-start gap-4 ">
				<Image
					src="/assets/images/site-logo.svg"
					width={32}
					alt="company logo"
					height={32}
					className="rounded-xl object-contain"
				/>
				<div className="flex flex-1 flex-col gap-3 ">
					<div className="flex flex-wrap items-center justify-between gap-1">
						<h2 className="sm:h3-semibold base-semibold text-dark200_light900  flex-1 text-nowrap ">
							{title}
						</h2>
						<Button className="background-light800_dark300 flex items-center gap-2  rounded-full border-none px-3">
							<Image
								src="/assets/images/site-logo.svg"
								width={14}
								height={14}
								alt="flag"
								className="rounded-xl object-contain"
							/>
							<span className="small-medium text-dark400_light800">
								{address}
							</span>
						</Button>
					</div>
					<p className="small-medium text-dark400_light800 line-clamp-2 text-[16px] ">
						{description}
					</p>
					<div className="mt-4 flex flex-wrap items-center justify-between gap-2">
						<div className="flex items-center  gap-4">
							<p className="subtle-medium text-light400_light500 flex items-center gap-1 rounded-md border-none  py-2 uppercase ">
								<Image
									src="/assets/icons/clock.svg"
									width={16}
									height={16}
									alt="clock "
									className="rounded-xl object-contain"
								/>
								<span>{workHours}</span>
							</p>
							<p className="subtle-medium text-light400_light500 flex items-center gap-1 rounded-md border-none  py-2 uppercase">
								<Image
									src="/assets/icons/currency-dollar-circle.svg"
									width={16}
									height={16}
									alt="dollar"
									className="rounded-xl object-contain"
								/>
								<span>{!salary ? 'Not disclosed' : salary}</span>
							</p>
						</div>
						<Link href="#" className="flex items-center gap-2 text-primary-500">
							<p>view job</p>
							<Image
								src="/assets/icons/arrow-up-right.svg"
								width={16}
								height={16}
								alt="arrow-up-right icon"
								className="rounded-xl object-contain"
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobsCard;

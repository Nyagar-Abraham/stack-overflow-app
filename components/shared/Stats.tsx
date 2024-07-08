import { formatBigNumber } from '@/lib/utils';
import { BadgeCounts } from '@/types';
import Image from 'next/image';
interface StatsProps {
	imgUrl: string;
	value: number;
	title: string;
}

const StatsCard = ({ imgUrl, title, value }: StatsProps) => {
	return (
		<div className="light-border background-light900_dark300 flex flex-wrap items-center justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
			<Image src={imgUrl} alt={title} width={40} height={40} />
			<div>
				<p className="paragraph-semibold text-dark200_light900">
					{formatBigNumber(value)}{' '}
				</p>
				<p className="body-medium text-dark400_light700">{title} </p>
			</div>
		</div>
	);
};

interface Props {
	totalQuestions: number;
	totalAnswers: number;
	badge: BadgeCounts;
	reputation: number;
}

const Stats = ({ totalQuestions, totalAnswers, badge, reputation }: Props) => {
	return (
		<div className="mt-10">
			<h4 className="h3-bold text-dark200_light900">Stats - {reputation}</h4>
			<div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2">
				<div className="light-border background-light900_dark300 flex flex-wrap items-center justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
					<div>
						<p className="paragraph-semibold text-dark200_light900">
							{formatBigNumber(totalQuestions)}{' '}
						</p>
						<p className="body-medium text-dark400_light700">Questions</p>
					</div>
					<div>
						<p className="paragraph-semibold text-dark200_light900">
							{formatBigNumber(totalAnswers)}{' '}
						</p>
						<p className="body-medium text-dark400_light700">Answers</p>
					</div>
				</div>

				<StatsCard
					imgUrl="/assets/icons/gold-medal.svg"
					value={badge.GOLD}
					title="Gold Badge"
				/>
				<StatsCard
					imgUrl="/assets/icons/silver-medal.svg"
					value={badge.SILVER}
					title="Silver Badge"
				/>
				<StatsCard
					imgUrl="/assets/icons/bronze-medal.svg"
					value={badge.BRONZE}
					title="Brownze Badge"
				/>
			</div>
		</div>
	);
};

export default Stats;

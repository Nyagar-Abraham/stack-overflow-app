import { AnswerFilters } from '@/constants/filters';
import Filter from './Filter';
import { getAnswer } from '@/lib/actions/answer.actions';
import Link from 'next/link';
import Image from 'next/image';
import { IMG } from '@/constants';
import { getTimestamp } from '@/lib/utils';
import Votes from './Votes';
import Pagination from './Pagination';

interface Props {
	questionId: string;
	userId: string;
	totalAnswers: number;
	page?: string;
	filter?: string;
}
const AllAnswers = async ({
	questionId,
	userId,
	totalAnswers,
	page,
	filter,
}: Props) => {
	// @ts-ignore
	const { answers, isNext }: { answers: any[]; isNext: boolean } =
		await getAnswer({
			questionId,
			sortBy: filter,
			page: page ? +page : 1,
			pageSize: 1,
		});

	return (
		<div className="mt-11">
			<div className="flex items-center justify-between">
				<h3 className="primary-text-gradient">{totalAnswers} Answer </h3>
				<Filter filters={AnswerFilters} />
			</div>

			<div>
				{answers.map((answer: any) => (
					<article key={answer._id} className="light-border border-b py-10">
						<div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
							<Link
								href={`/profile/${answer.author.picture}`}
								className="flex flex-1 items-start gap-1 sm:items-center"
							>
								<Image
									src={IMG}
									width={18}
									height={18}
									alt="profile"
									className="aspect-square rounded-full object-cover max-sm:mt-0.5"
								/>
								<div className="flex flex-col sm:flex-row sm:items-center">
									<p className="body-semibold text-dark400_light700 mt-0.5 line-clamp-1">
										{answer.author.name}
									</p>
									<p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
										answered {getTimestamp(answer.createdAt)}
									</p>
								</div>
							</Link>
							<div className="flex-justify-end">
								<Votes
									type="answer"
									itemId={JSON.stringify(answer._id)}
									userId={JSON.stringify(userId)}
									upvotes={answer.upvotes.length}
									hasupVoted={answer.upvotes.includes(userId)}
									downvotes={answer.downvotes.length}
									hasdownVoted={answer.downvotes.includes(userId)}
								/>
							</div>
						</div>
					</article>
				))}
			</div>
			<div className="mt-10">
				<Pagination pageNumber={page ? +page : 1} isNext={isNext} />
			</div>
		</div>
	);
};

export default AllAnswers;

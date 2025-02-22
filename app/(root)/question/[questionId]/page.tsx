import Answer from '@/components/form/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTag from '@/components/shared/RenderTag';
import Votes from '@/components/shared/Votes';
import { IMG } from '@/constants';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatBigNumber, getTimestamp } from '@/lib/utils';

import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ params, searchParams }: any) => {
	const { question } = await getQuestionById({ questionId: params.questionId });
	const { userId } = auth();

	const { _id: authorId, saved } = await getUserById({ userId: 'clerk12345' });

	console.log(userId);

	return (
		<>
			<div className="flex-start w-full flex-col">
				<div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
					<Link
						href={`/profile/${question.author.clerkId}`}
						className="flex items-center justify-start gap-1"
					>
						<Image
							src={IMG}
							className="aspect-square rounded-full"
							width={22}
							height={22}
							alt="profile"
						/>
						<p className="paragraph-semibold text-dark300_light700">
							{question.author.name}
						</p>
					</Link>
					<div className="flex justify-end">
						<Votes
							type="question"
							itemId={JSON.stringify(question._id)}
							userId={JSON.stringify(authorId)}
							upvotes={question.upvotes.length}
							hasupVoted={question.upvotes.includes(authorId)}
							downvotes={question.downvotes.length}
							hasdownVoted={question.downvotes.includes(authorId)}
							hasSaved={saved?.includes(question._id)}
						/>
					</div>
				</div>
				<h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
					{question.title}
				</h2>
			</div>

			<div className="mb-8 mt-5 flex flex-wrap gap-4">
				<Metric
					imgUrl="/assets/icons/clock.svg"
					alt="clock icon"
					value={`asked ${getTimestamp(question.createdAt)}`}
					title="Asked"
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/message.svg"
					alt="message"
					value={formatBigNumber(question.answers.length)}
					title="Answers"
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/eye.svg"
					alt="eye"
					value={formatBigNumber(question.views)}
					title="Views"
					textStyles="small-medium text-dark400_light800"
				/>
			</div>

			<ParseHTML data={question.content} />

			<div className="mt-8 flex flex-wrap gap-4">
				{question.tags.map((tag: any) => (
					<RenderTag
						key={tag._id}
						_id={tag._id}
						name={tag.name}
						showCount={false}
					/>
				))}
			</div>

			<AllAnswers
				page={searchParams?.page}
				filter={searchParams?.filter}
				questionId={question?._id}
				userId={authorId}
				totalAnswers={question.answers.length}
			/>

			<Answer
				authorId={JSON.stringify(authorId)}
				question={question.content}
				questionId={JSON.stringify(question._id)}
			/>
		</>
	);
};

export default Page;

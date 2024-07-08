import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import AnswerCard from '../cards/AnswerCard';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
	userId: string;
	clerkId: string | null;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: Props) => {
	const { answers, isNext } = await getUserAnswers({
		userId,
		page: searchParams?.page ? +searchParams.page : 1,
		pageSize: 1,
	});

	return (
		<>
			{answers.map((answer: any) => (
				<AnswerCard
					key={answer._id}
					clerkId={clerkId}
					_id={answer._id}
					question={answer.question}
					author={answer.author}
					upvotes={answer.upvotes.length}
					createdAt={answer.createdAt}
				/>
			))}
			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={isNext}
				/>
			</div>
		</>
	);
};

export default AnswerTab;

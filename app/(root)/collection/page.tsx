import QuestionsCard from '@/components/cards/QuestionsCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { QuestionFilters } from '@/constants/filters';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server';

const page = async ({ searchParams }: SearchParamsProps) => {
	const { userId } = auth();

	if (!userId) return null;

	const { savedQuestions: questions, isNext } = await getSavedQuestions({
		clerkId: 'clerk12345',
		searchQuery: searchParams.q,
		filter: searchParams.filter,
		page: searchParams?.page ? +searchParams.page : 1,
		pageSize: 1,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">saved Questions</h1>

			<div className="mt-11  flex justify-between gap-5 max-sm:flex-col sm:items-center   ">
				<LocalSearchBar
					route="/collection"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="search questions..."
					otherClasses="flex-1"
				/>
				<Filter
					filters={QuestionFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<div className="mt-10 flex w-full flex-col gap-6 ">
				{questions?.length > 0 ? (
					questions.map((question: any) => (
						<QuestionsCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There's no saved question to show"
						description="Be the first to break the silence! 🚀Ask a Question and kickstart the
				discussion. our query could be the next big thing others learn from. Get
				involved! 💡"
						link="/ask-question"
						linkTitle="Ask a Question"
					/>
				)}
			</div>

			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={isNext}
				/>
			</div>
		</>
	);
};

export default page;

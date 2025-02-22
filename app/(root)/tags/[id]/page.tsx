import QuestionsCard from '@/components/cards/QuestionsCard';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';

import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';

const Page = async ({ params, searchParams }: URLProps) => {
	const { questions, tagTitle, isNext } = await getQuestionsByTagId({
		tagId: params.id,
		page: searchParams?.page ? +searchParams.page : 1,
		searchQuery: searchParams.q,
		pageSize: 1,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

			<div className="mt-11 w-full ">
				<LocalSearchBar
					route={`/tags/${params.id}`}
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="search tag questions"
					otherClasses="flex-1"
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
						title="There's no tag question to show"
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

export default Page;

import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { getAllCountries, getJobs } from '@/lib/actions/jobs.action';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import JobsCard from '../../../components/cards/JobsCard';

const jobs = [
	{
		_id: 1,
		title: 'Shipping & Receiving Operator',
		address: 'Atalanta,la',
		description:
			'Honest Jobs is the largest employment network for people with criminal records. If you have a cv you can apply',
		salary: null,
		workHours: 'fulltime',
	},
	{
		_id: 2,
		title: 'Shipping & Receiving Operator',
		address: 'Atalanta,la',
		description:
			'Honest Jobs is the largest employment network for people with criminal records. If you have a cv you can apply',
		salary: null,
		workHours: 'fulltime',
	},
];

const page = async ({ searchParams }: SearchParamsProps) => {
	const { userId } = auth();

	if (!userId) return null;

	const countries = await getAllCountries();
	const data = await getJobs();

	console.log(data);

	const countriesFilter = countries.map((item: any) => ({
		name: item.name.common,
		value: item.name.common.toLowerCase(),
	}));

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Jobs</h1>

			<div className="mt-11  flex justify-between gap-5 max-xs:flex-col sm:items-center   ">
				<LocalSearchBar
					route="/jobs"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="search jobs"
					otherClasses="flex-1"
				/>
				<Filter
					filters={countriesFilter}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					route="/jobs"
				/>
			</div>

			<div className="mt-10 flex w-full flex-col gap-6 ">
				{jobs?.length > 0 ? (
					jobs.map((job: any) => (
						<JobsCard
							key={job._id}
							_id={job._id}
							title={job.title}
							description={job.description}
							salary={job.salary}
							workHours={job.workHours}
							address={job.address}
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
				{/* <Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={isNext}
				/> */}
			</div>
		</>
	);
};

export default page;

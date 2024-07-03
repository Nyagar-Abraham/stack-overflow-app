import Image from 'next/image';
import Link from 'next/link';
import RenderTag from './RenderTag';

const questions = [
	'It is a long established fact that a reader will be ',
	'Various versions have evolved over the years, ',
	'It is a long established fact that a reader will be distracted by the readable .',
	'Various versions have evolved over the years, sometimes',

	'Various versions have evolved over the years, sometimes by accident, ',
];

const popularTags = [
	{ _id: '1', name: 'javaScript', totalQuestions: 5 },
	{ _id: '2', name: 'css', totalQuestions: 7 },
	{ _id: '3', name: 'react', totalQuestions: 5 },
	{ _id: '4', name: 'Vue', totalQuestions: 94 },
	{ _id: '5', name: 'Html', totalQuestions: 5 },
];

const RightSideBar = () => {
	return (
		<section className="background-light900_dark200 sticky top-0 right-0 flex h-screen flex-col overflow-y-auto  p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar  border-l">
			<div>
				<h3 className=" h3-bold text-dark200_light900">Top Questions</h3>
				<div className=" mt-7 gap-[30px] w-full flex flex-col ">
					{questions.map((question) => (
						<Link
							key={question}
							href={`/questions/${question}`}
							className="flex cursor-pointer items-center justify-between gap-7 "
						>
							<p className="body-medium text-dark500_light700">{question}</p>
							<Image
								src="/assets/icons/chevron-right.svg"
								alt="chevron right"
								width={20}
								height={20}
								className="invert-colors"
							/>
						</Link>
					))}
				</div>
			</div>

			<div className="mt-16">
				<h3 className=" h3-bold text-dark200_light900">Top Questions</h3>
				<div className=" flex flex-col mt-7 gap-4 ">
					{popularTags.map((tag) => (
						<RenderTag
							key={tag._id}
							_id={tag._id}
							name={tag.name}
							totalQuestions={tag.totalQuestions}
							showCount
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default RightSideBar;

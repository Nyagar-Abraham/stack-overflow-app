/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { IMG } from '@/constants';
import { getUserInfo } from '@/lib/actions/user.action';
import { URLProps } from '@/types';
import { SignedIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getJoinedDate } from '@/lib/utils';
import Profilelink from '@/components/shared/Prifilelink';
import Stats from '@/components/shared/Stats';
import QuestionsTab from '@/components/shared/QuestionsTab';
import AnswerTab from '@/components/shared/AnswerTab';

const clerkId = 'clerk12345';

const page = async ({ params, searchParams }: any) => {
	// @ts-ignore
	const { userId } = auth();
	const { user, totalQuestions, totalAnswers, badgeCounts, reputation } =
		await getUserInfo({
			userId: params.userId,
		});

	return (
		<>
			<div className="flex flex-col-reverse items-start justify-between sm:flex-row">
				<div className="flex flex-col items-start gap-4 lg:flex-row">
					<Image
						src={IMG}
						alt="profile"
						width={140}
						height={140}
						className="aspect-square rounded-full object-cover"
					/>

					<div className="mt-3">
						<h2 className="h2-bold text-dark100_light900">{user.name}</h2>
						<p className="paragraph-regular text-dark200_light800">
							{user.username}
						</p>
						<div className="mt-5 flex flex-wrap items-center justify-start gap-5">
							{user?.portfoliowebsite && (
								<Profilelink
									imgUrl="/assets/icons/link.svg"
									href={user.portfolioWebsite}
									title="portfolio"
								/>
							)}
							{user?.location && (
								<Profilelink
									imgUrl="/assets/icons/location.svg"
									title={user.location}
								/>
							)}

							<Profilelink
								imgUrl="/assets/icons/calendar.svg"
								title={getJoinedDate(user.joinedAt)}
							/>
						</div>
						{user.bio && (
							<p className={`paragraph-regular text-dark400_light800`}>
								{user.bio}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 ">
					<SignedIn>
						{clerkId === user?.clerkId && (
							<Link href="/profile/edit">
								<Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
									Edit Profile
								</Button>
							</Link>
						)}
					</SignedIn>
				</div>
			</div>

			<Stats
				reputation={reputation}
				totalQuestions={totalQuestions}
				totalAnswers={totalAnswers}
				badge={badgeCounts}
			/>

			<div className="mt-10 flex gap-10">
				<Tabs defaultValue="account" className="flex-1">
					<TabsList className="background-light800_dark400 min-h-[42px] p-1">
						<TabsTrigger value="top-posts" className="tab">
							top Posts
						</TabsTrigger>
						<TabsTrigger value="answer" className="tab">
							Answer
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="top-posts"
						className="mt-5 flex w-full flex-col gap-6"
					>
						<QuestionsTab
							searchParams={searchParams}
							userId={user._id}
							clerkId={clerkId}
						/>
					</TabsContent>
					<TabsContent value="answer" className="flex w-full flex-col gap-6">
						<AnswerTab
							searchParams={searchParams}
							userId={user._id}
							clerkId={clerkId}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
};

export default page;

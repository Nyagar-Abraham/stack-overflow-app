/* eslint-disable spaced-comment */
'use client';
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.actions';
import { viewQuestion } from '@/lib/actions/interaction.action';
import {
	downvoteQuestion,
	upvoteQuestion,
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatBigNumber } from '@/lib/utils';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';

interface Props {
	type: string;
	itemId: string;
	userId: string;
	upvotes: number;
	hasupVoted: boolean;
	downvotes: number;
	hasdownVoted: boolean;
	hasSaved?: boolean;
}

const Votes = ({
	type,
	itemId,
	userId,
	upvotes,
	hasupVoted,
	downvotes,
	hasdownVoted,
	hasSaved,
}: Props) => {
	const pathname = usePathname();
	const router = useRouter();

	const handleVote = async (action: string) => {
		if (!userId)
			return toast({
				title: 'Please log in',
				description: 'You must be logged in to perform this action',
			});

		if (action === 'upvote') {
			if (type === 'question') {
				await upvoteQuestion({
					userId: JSON.parse(userId),
					hasdownVoted,
					hasupVoted,
					questionId: JSON.parse(itemId),
					path: pathname,
				});
			} else if (type === 'answer') {
				await upvoteAnswer({
					userId: JSON.parse(userId),
					hasdownVoted,
					hasupVoted,
					answerId: JSON.parse(itemId),
					path: pathname,
				});
			}

			return toast({
				title: `upvote ${!hasupVoted} ?'successfull':'Removed'`,
				variant: !hasupVoted ? 'default' : 'destructive',
			});
		}

		if (action === 'downvote') {
			if (type === 'question') {
				await downvoteQuestion({
					userId: JSON.parse(userId),
					hasdownVoted,
					hasupVoted,
					questionId: JSON.parse(itemId),
					path: pathname,
				});
			} else if (type === 'answer') {
				await downvoteAnswer({
					userId: JSON.parse(userId),
					hasdownVoted,
					hasupVoted,
					answerId: JSON.parse(itemId),
					path: pathname,
				});
			}

			return toast({
				title: `Downvote ${!hasdownVoted} ?'successfull':'Removed'`,
				variant: !hasdownVoted ? 'default' : 'destructive',
			});
		}
	};
	const handleSave = async () => {
		await toggleSaveQuestion({
			userId: JSON.parse(userId),
			questionId: JSON.parse(itemId),
			path: pathname,
		});

		return toast({
			title: `Question ${hasSaved ? 'Saved' : 'removed'} your collection`,
			variant: !hasSaved ? 'default' : 'destructive',
		});
	};

	useEffect(() => {
		viewQuestion({
			questionId: JSON.parse(itemId),
			userId: userId ? JSON.parse(userId) : undefined,
		});
	}, [itemId, userId, pathname, router]);

	return (
		<div className="flex gap-5">
			<div className="flex-center gap-2.5 ">
				<div className="flex-center gap-1.5">
					<Image
						src={
							hasupVoted
								? '/assets/icons/upvoted.svg'
								: '/assets/icons/upvote.svg'
						}
						width={18}
						height={18}
						alt="upvote"
						className="cursor-pointer"
						onClick={() => handleVote('upvote')}
					/>

					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatBigNumber(upvotes)}
						</p>
					</div>
				</div>
				{/* 2 */}
				<div className="flex-center gap-1.5">
					<Image
						src={
							hasdownVoted
								? '/assets/icons/downvoted.svg'
								: '/assets/icons/downvote.svg'
						}
						width={18}
						height={18}
						alt="downvote"
						className="cursor-pointer"
						onClick={() => handleVote('downvote')}
					/>

					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatBigNumber(downvotes)}
						</p>
					</div>
				</div>
			</div>
			{type === 'question' && (
				<Image
					src={
						hasSaved
							? '/assets/icons/star-filled.svg'
							: '/assets/icons/star-red.svg'
					}
					width={18}
					height={18}
					alt="star"
					className="cursor-pointer"
					onClick={handleSave}
				/>
			)}
		</div>
	);
};

export default Votes;

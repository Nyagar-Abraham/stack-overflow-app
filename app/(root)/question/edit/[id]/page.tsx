import Question from '@/components/form/Question';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const page = async ({ params }: ParamsProps) => {
	const { userId } = auth();

	if (!userId) redirect('/sign-in');

	const mongoUser = await getUserById({ userId: 'clerk12345' });

	const { question } = await getQuestionById({ questionId: params.id });

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Edit question</h1>
			<div className="mt-9">
				<Question
					mongoUserId={mongoUser?._id}
					type="edit"
					questionDetails={JSON.stringify(question)}
				/>
			</div>
		</>
	);
};

export default page;

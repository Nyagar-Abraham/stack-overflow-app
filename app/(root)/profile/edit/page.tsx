import Profile from '@/components/form/Profile';

import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const page = async ({ params }: ParamsProps) => {
	const { userId } = auth();

	if (!userId) redirect('/sign-in');

	const mongoUser = await getUserById({ userId: 'clerk12345' });

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
			<div className="mt-9">
				<Profile user={JSON.stringify(mongoUser)} clerkId="clerk12345" />
			</div>
		</>
	);
};

export default page;

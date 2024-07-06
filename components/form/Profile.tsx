'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ProfileSchema } from '@/lib/validations';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.action';

interface Params {
	clerkId: string;
	user: string;
}

const Profile = ({ user, clerkId }: Params) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const parsedUser = JSON.parse(user);

	// 1. Define your form.
	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: parsedUser.name || '',
			username: parsedUser.username || '',
			portfolioWebsite: parsedUser.portfoliowebsite || '',
			location: parsedUser.location || '',
			bio: parsedUser.bio || '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof ProfileSchema>) {
		setSubmitting(true);

		try {
			await updateUser({
				clerkId,
				updateData: {
					name: values.name,
					username: values.username,
					portfolioWebsite: values.portfolioWebsite,
					location: values.location,
					bio: values.bio,
				},
				path: pathname,
			});

			router.back();
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-9 flex w-full flex-col gap-9"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel>
								Name <span className="text-primary-500">*</span>{' '}
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your Name"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel>
								Username <span className="text-primary-500">*</span>{' '}
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your username"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="portfolioWebsite"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel>
								Portfolio Link <span className="text-primary-500">*</span>{' '}
							</FormLabel>
							<FormControl>
								<Input
									type="url"
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your portfolio URL"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel>
								Location <span className="text-primary-500">*</span>{' '}
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Where are you from"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel>
								Bio <span className="text-primary-500">*</span>{' '}
							</FormLabel>
							<FormControl>
								<Textarea
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="What`s special about you"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-7 flex justify-end ">
					<Button
						type="submit"
						className="primary-gradient w-fit"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'saving...' : 'save'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Profile;

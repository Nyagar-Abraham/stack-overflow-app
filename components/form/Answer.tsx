'use client';
/* eslint-disable spaced-comment */

import { useTheme } from '@/context/ThemeContext';
import { AnswerSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.actions';
import { usePathname } from 'next/navigation';

interface Props {
	question: string;
	questionId: string;
	authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
	const pathname = usePathname();
	const [isSubmitting, setSubmitting] = useState(false);
	const [isSubmittingAI, setSubmittingAI] = useState(false);
	const editorRef = useRef(null);
	const { mode } = useTheme();

	const form = useForm<z.infer<typeof AnswerSchema>>({
		resolver: zodResolver(AnswerSchema),
		defaultValues: {
			answer: '',
		},
	});

	const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
		setSubmitting(true);

		try {
			await createAnswer({
				content: values.answer,
				author: JSON.parse(authorId),
				question: JSON.parse(questionId),
				path: pathname,
			});

			form.reset();

			if (editorRef.current) {
				const editor = editorRef.current as any;

				editor.setContent('');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleGenerateAIAnswer = async () => {
		if (!authorId) return;

		setSubmittingAI(true);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
				{
					method: 'POST',
					body: JSON.stringify({ question }),
				}
			);

			const aiAnswer = await response.json();

			//convert plain to html
			const formattedAnswer = aiAnswer.reply.replace(/\n/g, '<br/>');

			if (editorRef.current) {
				const editor = editorRef.current as any;
				editor.setContent(formattedAnswer);
			}
			//Toast
		} catch (error) {
			console.log(error);
		} finally {
			setSubmittingAI(false);
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
				<h4 className="paragraph-semibold text-dark400_light800">
					Write your answer here
				</h4>

				<Button
					disabled={isSubmittingAI}
					className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
					onClick={handleGenerateAIAnswer}
				>
					<Image
						src="/assets/icons/stars.svg"
						alt="star"
						width={12}
						height={12}
						className="object-contain"
					/>
					Generate an AI answer
				</Button>
			</div>
			<Form {...form}>
				<form
					className="mt-6 flex w-full flex-col gap-10"
					onSubmit={form.handleSubmit(handleCreateAnswer)}
				>
					<FormField
						control={form.control}
						name="answer"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col gap-3">
								<FormControl className="mt-3.5">
									<Editor
										apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
										onInit={(_evt, editor) => {
											//@ts-ignore
											editorRef.current = editor;
										}}
										onBlur={field.onBlur}
										onEditorChange={(content) => field.onChange(content)}
										initialValue=""
										init={{
											height: 500,
											menubar: false,
											plugins: [
												'advlist',
												'autolink',
												'lists',
												'link',
												'image',
												'charmap',
												'preview',
												'anchor',
												'searchreplace',
												'visualblocks',
												'codesample',
												'fullscreen',
												'insertdatetime',
												'media',
												'table',
											],
											toolbar:
												'undo redo | blocks | ' +
												'codesample | bold italic forecolor | alignleft aligncenter | ' +
												'alignright alignjustify | bullist numlist',
											content_style:
												'body { font-family:Inter; font-size:16px }',
											skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
											content_css: mode === 'dark' ? 'dark' : 'light',
										}}
									/>
								</FormControl>

								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>

					<div className="flex justify-end">
						<Button
							type="submit"
							className="primary-gradient w-full shrink-0 text-white"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'submitting' : 'Submit'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Answer;

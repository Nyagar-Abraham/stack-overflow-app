/* eslint-disable spaced-comment */
'use server';

import Question from '@/database/question.modal';
import { connectToDatabase } from '../mongoose';
import Tag from '@/database/tag.model';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
	try {
		connectToDatabase();

		const questions = await Question.find({})
			.populate({ path: 'tags', model: Tag })
			.populate({ path: 'author', model: User })
			.sort({ createAt: -1 });

		return { questions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createQuestion(params: CreateQuestionParams) {
	try {
		connectToDatabase();

		const { title, content, tags, author, path } = params;

		//create the question
		const question = await Question.create({
			title,
			content,
			author,
		});

		const tagDocuments = [];
		//creating the tags or getting the if they exist
		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, 'i') } },
				{ $setOnInsert: { name: tag }, $push: { question: question._id } },
				{ upsert: true, new: true }
			);

			tagDocuments.push(existingTag._id);
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		});

		//create an interaction record for the use`s ask_question

		//increment author`s reputation by +5 for asking a question

		revalidatePath(path);
	} catch (error) {}
}

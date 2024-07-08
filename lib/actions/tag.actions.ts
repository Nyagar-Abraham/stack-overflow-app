/* eslint-disable spaced-comment */
'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
	GetAllTagsParams,
	GetQuestionsByTagIdParams,
	GetTopInteractedTagsParams,
} from './shared.types';
import Tag, { ITag } from '@/database/tag.model';
import { FilterQuery } from 'mongoose';
import Question from '@/database/question.modal';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase();

		const { userId } = params;

		const user = await User.findById(userId);

		if (!user) throw new Error('User not found');

		//find interactions for the user and by tags...
		//interactions..

		//Get top tags from interactions...

		return [
			{ _id: '1', name: 'tag1' },
			{ _id: '2', name: 'tag2' },
		];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase();

		const { searchQuery, filter, page = 1, pageSize = 1 } = params;

		const skipAmount = (page - 1) * pageSize;

		const query: FilterQuery<typeof Tag> = {};

		if (searchQuery) {
			query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }];
		}

		let sortOptions = {};

		switch (filter) {
			case 'recent':
				sortOptions = { createdOn: -1 };
				break;
			case 'popular':
				sortOptions = { questions: -1 };
				break;
			case 'name':
				sortOptions = { name: 1 };
				break;
			case 'old':
				sortOptions = { createdOn: 1 };
				break;
		}

		const tags = await Tag.find(query)
			.skip(skipAmount)
			.limit(pageSize)
			.sort(sortOptions);

		const totalsTags = await Tag.countDocuments(query);

		const isNext = totalsTags > skipAmount + tags.length;

		return { tags, isNext };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
	try {
		connectToDatabase();

		const { tagId, searchQuery, page = 1, pageSize = 1 } = params;

		const skipAmount = (page - 1) * pageSize;

		const tagFilter: FilterQuery<ITag> = { _id: tagId };

		const tag = await Tag.findOne(tagFilter).populate({
			path: 'questions',
			model: Question,
			match: searchQuery
				? { title: { $regex: searchQuery, $options: 'i' } }
				: {},
			options: {
				sort: { createdAt: -1 },
				skip: skipAmount,
				limit: pageSize + 1, //to check if their is a next page,
			},
			populate: [
				{ path: 'tags', model: Tag, select: '_id name' },
				{ path: 'author', model: User, select: '_id name clerkId picture' },
			],
		});

		const isNext = tag.questions.length > pageSize;

		if (!tag) {
			throw new Error('Tag not found');
		}

		const questions = tag.questions;

		return { tagTitle: tag.name, questions, isNext };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getPopularTags() {
	try {
		connectToDatabase();

		const popularTags = await Tag.aggregate([
			{
				$project: { name: 1, numberOfQuestions: { $size: '$questions' } },
			},
			{ $sort: { numberOfQuestions: -1 } },
			{ $limit: 5 },
		]);

		return popularTags;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
// export async function getAllUsers(params: GetAllUsersParams) {
// 	try {
// 		connectToDatabase();
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }

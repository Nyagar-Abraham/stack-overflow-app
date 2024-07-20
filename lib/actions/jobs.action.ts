'use server';

const endpoint = 'https://jsearch.p.rapidapi.com/search';

export async function getAllCountries() {
	try {
		const res = await fetch('https://restcountries.com/v3.1/all?fields=name');

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getJobs() {
	try {
		const response = await fetch(`https://jsearch.p.rapidapi.com/search`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${'2f93ff0173msh354a0f3984c156ep1c3c61jsn8f84ecd3d0bd'}`,
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return data;
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

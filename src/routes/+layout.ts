import { user } from '../states.svelte.js';
import type { IUser } from '../types.js';

export async function load(ev) {
	try {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser) as IUser;
			user.user_id = parsedUser.user_id;
			user.username = parsedUser.username;
			user.user_roll_number = parsedUser.user_roll_number;
			user.user_id_token = parsedUser.user_id_token;
		} else {
			const response = await ev.fetch(`/api/get_id`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const { user_id, user_id_token } = await response.json();
			user.user_id = user_id;
			user.user_id_token = user_id_token;

			console.log({ user });

			try {
				localStorage.setItem('user', JSON.stringify(user));
				console.log('Stored user to local');
			} catch (error) {}
		}
	} catch (error) {}
}

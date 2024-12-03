import { type IGame, type IUser } from './types';

export const user = $state<IUser>({
	user_id: '',
	username: '',
	user_id_token: '',
	user_roll_number: '',
	class: ''
});

export const game = $state<IGame>({ words: [], user });

import type { IUser } from '../types';

export default function save_user_to_local(user: IUser) {
	localStorage.setItem('user_info', JSON.stringify(user));
}

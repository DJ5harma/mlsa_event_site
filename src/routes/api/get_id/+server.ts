import { JWT_SECRET } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

let count = 0;

export const GET: RequestHandler = async () => {
	count++;
	const user_id = count;
	const user_id_token = jwt.sign({ user_id }, JWT_SECRET);

	return json({ user_id, user_id_token });
};

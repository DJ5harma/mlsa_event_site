import { json, type RequestHandler } from '@sveltejs/kit';
import { gamesMap } from '../cache';
import type { IScores } from '../../../types';

export const GET: RequestHandler = async () => {
	try {
		const scores: IScores = [];
		gamesMap.forEach((game) => {
			scores.push({
				class: game.user.class,
				points: game.points || 0,
				user_id: game.user.user_id,
				user_roll_number: game.user.user_roll_number,
				username: game.user.username
			});
		});
		return json({ scores });
	} catch (error) {
		return json({ err: (error as Error).message });
	}
};

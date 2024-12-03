import { json, type RequestHandler } from '@sveltejs/kit';
import { gamesMap } from '../cache';
import type { IGame } from '../../../types';

export const POST: RequestHandler = async (ev) => {
	try {
		const { user_id_token, game } = (await ev.request.json()) as {
			user_id_token: string;
			game: IGame;
		};
		if (!user_id_token) throw new Error('user id token missing');

		console.log(game);

		const cachedGame = gamesMap.get(user_id_token);
		if (!cachedGame) throw new Error('User id not associated with a game');
		if (cachedGame.gameOver) return json({ points: cachedGame.points });

		let points = 0;
		cachedGame.words.forEach(({ actual }, i) => {
			if (actual === game.words[i].actual) points++;
		});
		cachedGame.points = points;
		cachedGame.gameOver = true;

		return json({ points });
	} catch (error) {
		return json({ err: (error as Error).message });
	}
};

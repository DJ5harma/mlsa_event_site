import { JWT_SECRET } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { IGame, IUser } from '../../../types';
import { gamesMap, gameWords } from '../cache';

export const POST: RequestHandler = async (ev) => {
	try {
		const { user } = (await ev.request.json()) as { user: IUser };
		const { user_id_token } = user;
		if (!user_id_token) throw new Error('user id token missing');

		console.log({ user });

		try {
			jwt.verify(user_id_token, JWT_SECRET);
		} catch (error) {
			throw new Error('invalid user id token');
		}
		console.log(2);

		const game = gamesMap.get(user_id_token);
		if (game) {
			const clientGame: IGame = {
				...game,
				words: game.words.map(({ display, charNumbers }) => ({
					display,
					actual: display,
					charNumbers
				}))
			};
			return json({ clientGame });
		}
		console.log(3);

		const newGame: IGame = { words: [], user };

		const charNums: { [char: string]: number } = {};
		let added = 0;
		for (let i = 0; added < 26; i++) {
			if (Math.random() * 3 < 1) {
				charNums[String.fromCharCode(65 + added)] = i;
				added++;
			}
		}
		for (let i = 0; newGame.words.length < 20; i++) {
			if (Math.random() * 4 < 1) {
				const newWord = gameWords[i % gameWords.length];
				for (let j = 0; j < newWord.actual.length; j++) {
					const letter = newWord.actual[j];
					newWord.charNumbers.push(charNums[letter]);
				}
				newGame.words.push(newWord);
			}
		}
		gamesMap.set(user_id_token, newGame);
		console.log('hi');

		const clientGame: IGame = {
			...newGame,
			words: newGame.words.map(({ display, charNumbers }) => ({
				display,
				actual: display,
				charNumbers
			}))
		};
		return json({ clientGame });
	} catch (error) {
		return json({ err: (error as Error).message });
	}
};

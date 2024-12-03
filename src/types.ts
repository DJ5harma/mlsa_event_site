export interface IUser {
	username: string;
	user_id: string;
	user_id_token: string;
	user_roll_number: string;
	class: string;
}

export interface IGameWord {
	actual: string;
	display: string;
	charNumbers: number[]; // length = 26
}

export interface IGame {
	words: IGameWord[];
	points?: number;
	gameOver?: boolean;
	user: IUser;
}

export type IScores = {
	user_id: string;
	username: string;
	user_roll_number: string;
	class: string;
	points: number;
}[];

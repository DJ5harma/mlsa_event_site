export interface IUser {
	username: string;
	user_id: string;
	user_id_token: string;
	user_roll_number: string;
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
}

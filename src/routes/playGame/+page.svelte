<script lang="ts">
	import { onMount } from 'svelte';
	import { game, user } from '../../states.svelte';
	import type { IGame } from '../../types';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	onMount(async () => {
		if (!user.user_roll_number) {
			goto('/');
			return;
		}
		if (game.words.length === 0) {
			const storedGame = localStorage.getItem('game');
			if (storedGame) {
				const { words } = JSON.parse(storedGame) as IGame;
				game.words = words;
			} else {
				toast.loading('Fetching game...');
				const response = await axios.post('/api/get_game', { user });

				toast.dismiss();
				game.words = response.data.clientGame.words;

				localStorage.setItem('game', JSON.stringify(game));
			}
		}
	});
	const handleSubmit = async () => {
		const { user_id_token } = user;
		const response = await axios.post('/api/check_result', { user_id_token, game });
		if (response.data.error) toast.error(response.data.error);
		toast.success(response.data.message || '' + response.data.points + ' points');
		goto('/scoreboard');
	};
</script>

<section class="gap-4 py-4 font-semibold">
	<div class="flex flex-col items-center gap-2 [&>p]:text-xl">
		<p class="bg-purple-950 p-2">Fill in the blanks</p>
		<p class="rounded-none bg-black px-4 py-2 text-center">
			For ease, boxes with the same number below will have the same letter as the correct answer
		</p>
	</div>
	{#each game.words as word, wordIdx}
		<div class="border-t-2 border-black p-2">
			{#each word.display as letter, letterIdx}
				{#if letter === ' '}
					<div class="flex w-full flex-wrap"></div>
				{:else}
					<div class="inline-flex flex-col items-center">
						{#if letter === '_'}
							<input
								onchange={(e) => {
									const val = e.currentTarget.value.toUpperCase();
									e.currentTarget.value = val;

									let str = '';
									for (let i = 0; i < word.actual.length; i++) {
										if (i === letterIdx) str += val;
										else str += word.actual[i];
									}
									console.log(str);

									game.words[wordIdx].actual = str;
									localStorage.setItem('game', JSON.stringify(game));
								}}
								maxlength="1"
								type="text"
								class="h-10 w-12 text-center text-black"
							/>
						{:else}
							<p class="flex h-10 w-10 items-center justify-center bg-black px-3 py-4">
								{letter}
							</p>
						{/if}
						<p>{word.charNumbers[letterIdx]}</p>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
	<button onclick={handleSubmit}>Submit</button>
</section>

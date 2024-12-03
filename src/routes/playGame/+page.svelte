<script lang="ts">
	import { onMount } from 'svelte';
	import { game, user } from '../../states.svelte';
	import type { IGame } from '../../types';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	onMount(async () => {
		if (!user.user_id) goto('/');
		if (game.words.length === 0) {
			const storedGame = localStorage.getItem('game');
			if (storedGame) {
				const { words } = JSON.parse(storedGame) as IGame;
				game.words = words;
			} else {
				const { user_id_token } = user;
				const response = await axios.post('/api/get_game', { user_id_token });

				console.log(response.data.clientGame);

				game.words = response.data.clientGame.words;

				localStorage.setItem('game', JSON.stringify(game));
			}
		}
		console.log(game.words[0].actual.length, game.words[0].display.length);
	});
	const handleSubmit = async () => {
		const { user_id_token } = user;
		const response = await axios.post('/api/check_result', { user_id_token, game });
		toast.success(response.data.points + ' points');
	};
</script>

<section class="gap-4 py-4 text-xl font-semibold">
	{#each game.words as word, wordIdx}
		<div class="flex gap-0.5">
			{#each word.display as letter, letterIdx}
				<div class="flex flex-col items-center">
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
					{:else if letter === ' '}
						<p class="px-3">{' '}</p>
					{:else}
						<p class="flex h-10 w-10 items-center bg-black px-3 py-4 text-white">
							{letter}
						</p>
					{/if}
					<p>{word.charNumbers[letterIdx]}</p>
				</div>
			{/each}
		</div>
	{/each}
	<button onclick={handleSubmit}>Submit</button>
</section>

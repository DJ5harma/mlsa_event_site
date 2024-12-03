<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { IScores } from '../../types';
	let scores = $state<IScores>([]);
	onMount(async () => {
		const response = await axios.get('/api/get_scoreboard');
		console.log(response.data);
		scores = response.data.scores as IScores;
		scores.sort((a, b) => b.points - a.points);
	});
</script>

<section class="flex flex-col py-2">
	<h1 class="bg-purple-900 p-2 font-extrabold">Scoreboard</h1>
	<table class="w-full border-separate border-spacing-2">
		<thead class="bg-black">
			<tr class="[&>*]:border [&>*]:p-2 [&>*]:text-center">
				<th>id</th>
				<th>Rollno</th>
				<th>Class</th>
				<th>Username</th>
				<th>Points</th>
			</tr>
		</thead>
		<tbody class="bg-white text-black">
			{#each scores as score}
				<tr class="[&>*]:border [&>*]:p-2 [&>*]:text-center">
					<td>{score.user_id}</td>
					<td>{score.user_roll_number}</td>
					<td>{score.class}</td>
					<td>{score.username}</td>
					<td class="bg-purple-950 text-white">{score.points}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

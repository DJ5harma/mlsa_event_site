<script lang="ts">
	import { user } from '../states.svelte';
	import { goto } from '$app/navigation';

	const handleSubmit = async () => {
		localStorage.setItem('user', JSON.stringify(user));
		goto('/playGame');
	};
</script>

<section class="gap-4">
	<h1>Your ID is: {user.user_id}</h1>
	<section>
		<p>Enter your name:</p>
		<input bind:value={user.username} placeholder="Name" />
	</section>
	<section>
		<p>Enter your roll no:</p>
		<input bind:value={user.user_roll_number} placeholder="Roll number" />
	</section>
	<section>
		<p>Enter your class:</p>
		<input bind:value={user.user_roll_number} placeholder="Roll number" />
	</section>
	<section>
		<p>Enter your :</p>
		<input bind:value={user.user_roll_number} placeholder="Roll number" />
	</section>
	<button onclick={handleSubmit}>Play game</button>
</section>

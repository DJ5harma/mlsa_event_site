<script lang="ts">
	import { user } from '../states.svelte';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	const handleSubmit = async () => {
		if (!user.username || !user.class || !user.user_roll_number)
			return toast.error('Please enter all the fields');
		localStorage.setItem('user', JSON.stringify(user));
		goto('/playGame');
	};
</script>

<div class="flex h-screen items-center justify-center">
	<section class="gap-4">
		<h1>
			Your ID is:
			<b class="bg-black p-2 text-white">
				{user.user_id}
			</b>
		</h1>
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
			<input bind:value={user.class} placeholder="Class" />
		</section>
		<button onclick={handleSubmit}>Play game</button>
	</section>
</div>

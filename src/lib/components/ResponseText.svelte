<script lang="ts">
	import { onDestroy } from 'svelte';

	import { characterStore } from '$lib/stores/character';
	import { convoStore, transcriptStore } from '$lib/stores/transcript';

	let text;

	const updateConversation = (newValue) => {
		if (newValue.result) {
			const message = newValue.result;
			convoStore.update((convo) => [...convo, { tag: 'AI', message }]);
		}
		if (newValue.input) {
			const message = newValue.input;
			convoStore.update((convo) => [...convo, { tag: 'Human', message }]);
		}
		console.log($convoStore);
	};

	const unsubscribe = transcriptStore.subscribe(updateConversation);

	async function fetchPosts() {
		console.log({ body: { character: $characterStore, conversation: { $convoStore } } });

		// Prepare the request options
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				character: $characterStore,
				conversation: $convoStore
			})
		};

		// Send the POST request
		const response = await fetch('/api/response', requestOptions);
		text = await response.json(); // Extract the text from the response
		updateConversation(text);
	}

	onDestroy(unsubscribe);
</script>

<button on:click={() => fetchPosts()}>click</button>
<p>{text}</p>

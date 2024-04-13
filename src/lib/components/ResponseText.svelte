<script lang="ts">
	import { onDestroy } from 'svelte';

	import { characterStore } from '$lib/stores/character';
	import { convoStore, transcriptStore } from '$lib/stores/transcript';

	let text;

	const updateConversation = (newValue) => {
		if (newValue.result) {
			const content = newValue.result;
			convoStore.update((convo) => [...convo, { tag: 'AI', content }]);
		}
		if (newValue.input) {
			const content = newValue.input;
			convoStore.update((convo) => [...convo, { tag: 'Human', content }]);
		}
		console.log($convoStore);
	};

	const unsubscribe = transcriptStore.subscribe(updateConversation);

	async function fetchPosts() {

		// Prepare the request options
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				character: $characterStore,
				chat: $convoStore
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

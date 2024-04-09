<script lang="ts">
	import { transcriptStore } from '$lib/stores/transcript';
	import { listening } from '$lib/stores/states';
	import { isOpen } from '$lib/stores/states';
	import { characterStore } from "$lib/stores/character";
	import { InMemoryStore } from 'langchain/storage/in_memory';


	import {spawnCharacter} from '$lib/prompts/convo'

	let response: string; // Dclaring final response top level to export later.

	// Things that happen once every conversation
	export const prepareConvo = async () => {
		// Create new memory instance
		const convoMemory = new InMemoryStore();
		// Add Initial hello and system message to memory
		const chat = spawnCharacter($characterStore)
		console.log(chat);
	};

	// Reactive statement to watch for changes to $isOpen
	$: if ($isOpen) {
		console.log('working');
		prepareConvo();
		// Identify stage

		// Coraborate stage linear cohesion

		// Evaluate stage completion

		// Decide to continue

		// Response creation
		response = stage[0]; // Assign the value inside the loop
		console.log(response);
	}
</script>

<p>
	{response}
</p>

<script lang="ts">
	import { transcriptStore } from '$lib/stores/transcript';
	import { listening } from '$lib/stores/states';
	import { isOpen } from '$lib/stores/states';
	import { characterStore } from '$lib/stores/character';
	import { InMemoryStore } from 'langchain/storage/in_memory';

	import { characterChat } from '$lib/prompts/convo';

	let response: string; // Dclaring final response top level to export later.

	// This will happen every time transcript is updated
	$: if ($transcriptStore && Object.keys($transcriptStore).length > 0) {
    // Wrap the async call in an immediately invoked async function expression (IIFE)
    (async () => {
        try {
            const text = await characterChat($characterStore, $transcriptStore);
            console.log(text);
        } catch (error) {
            console.error('Error in characterChat:', error);
        }
    })();
}

</script>

<p>
	{response}
</p>

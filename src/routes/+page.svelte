<script lang="ts">
	import VoiceToText from '$lib/components/VoiceToText.svelte';
	import ResponseText from '$lib/components/ResponseText.svelte';
	import { characterStore } from '$lib/stores/character';
	import { templates } from '$lib/prompts/characterTemplates';

	const startCall = (character) => {
		$characterStore = character

	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 flex flex-col items-center">
		<br />
		<h1 class="h1">Practice your selling skills!</h1>
		<h3 class="h3">
			Your objective is to schedule a meeting, during the call you will get some guidence on how to
			progress, When you finish the call or get hanged up on, you will get feedback on your
			performance.
		</h3>
		<h3 class="h3">
			You will be selling an AI powered omnichannel lead generation service. (They have no other
			challenges)
		</h3>
		<aside class="alert variant-filled-warning">
			<div class="alert-message">
				<p>⚠️ After you click on a level to call, make sure to enable your microphone.</p>
			</div>
		</aside>

		<div class="w-100 text-token card p-4 space-y-4">
			<dl class="list-dl">
					{#each Object.entries(templates) as [key], index}
						<div>
							<span class="flex-auto"
								><dt class="font-bold">Level {index +1 } {key}</dt>
								<dd class="text-sm opacity-50">{templates[key].role} in {templates[key].company} </dd>
							</span> <button class="btn variant-filled" on:click={startCall(templates[key])}>Call</button
							>
						</div>
					{/each}
			</dl>
		</div>
		<br>
	</div>
</div>


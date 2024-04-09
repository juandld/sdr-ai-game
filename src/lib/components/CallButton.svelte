<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import { characterStore } from '$lib/stores/character';
	import type { Character } from '$lib/interfaces/Character';
	import { calling } from '$lib/stores/states';
	import { templates } from '$lib/prompts/characterTemplates';

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'example-1',
		bgDrawer: 'variant-filled-secondary text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'md:w-[800px] w-full',
		height: 'h-[700px]',
		padding: 'p-6',
		rounded: 'rounded-xl'
	};
	
	const toggleCall = async (character) => {
		drawerStore.open(drawerSettings);
		$characterStore = character;
		$calling = true;
	};
</script>

<div class="w-full md:w-[60%] text-token card p-4 space-y-4 variant-ghost-success">
	<dl class="list-dl">
		{#each Object.entries(templates) as [key], index}
			<a href="" on:click={toggleCall(templates[key])}> 
				<div class="hover:variant-soft-secondary">
					<span class="flex-auto">
						<dt class="font-bold">Level {index + 1} {key}</dt>
						<dd class="text-sm opacity-50">{templates[key].role} in {templates[key].company}</dd>
					</span>
					<span class="badge bg-secondary-500 text-xl">🎯</span>
				</div>
			</a>
		{/each}
	</dl>
</div>

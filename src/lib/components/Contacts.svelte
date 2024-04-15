<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { characterStore } from '$lib/stores/character';
	import type { Character } from '$lib/interfaces/Character';
	import { templates } from '$lib/templates/characterTemplates';

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'example-1',
		bgDrawer: 'variant-filled-secondary text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'md:w-[800px] w-full',
		height: 'max-h-[100%] h-[700px]',
		padding: 'p-6',
		rounded: 'rounded-xl'
	};

	const toggleDrawer = async (char:Character) => {
		$characterStore = char;
		drawerStore.open(drawerSettings);
	};
</script>

<div class="w-full md:w-[65%] text-token card p-4 space-y-4 variant-ghost-success">
	<dl class="list-dl">
		{#each Object.entries(templates) as [key], index}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				href="#"
				on:click={(event) => {
					event.preventDefault();
					toggleDrawer(templates[key]);
				}}
			>
				<div class="hover:variant-soft-secondary flex justify-between">
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

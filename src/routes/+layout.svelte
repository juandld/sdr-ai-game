<script lang="ts">
	import '../app.postcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import VoiceToText from '$lib/components/VoiceToText.svelte'
	import {calling} from '$lib/stores/states'; 
	import { onDestroy } from 'svelte';

	initializeStores();
	//Make sure call ends when Drawer is closed
	function handleStoreChange(value) {
		if(value.open){
			$calling = true;
		} else {
			$calling = false;
		}
	}
	const drawerStore = getDrawerStore();
	const unsubscribe = drawerStore.subscribe(handleStoreChange);
	onDestroy(unsubscribe)
</script>

<Drawer position='right'>
	{#if $drawerStore.id === 'example-1'}
		<VoiceToText/>
	{/if}
</Drawer>
<slot/>

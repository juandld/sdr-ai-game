<script lang="ts">
	import '../app.postcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import DialPad from '$lib/components/DialPad.svelte'
	import {calling} from '$lib/stores/states'; 
	import { onDestroy } from 'svelte';

	initializeStores();
	//Make sure call ends when Drawer is closed

	const drawerStore = getDrawerStore();

</script>

<Drawer position='right'>
	{#if $drawerStore.id === 'example-1'}
		<DialPad/>
	{/if}
</Drawer>
<slot/>

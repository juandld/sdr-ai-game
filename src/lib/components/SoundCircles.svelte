<script lang="ts">
    import { AudioAnimationTools } from '$lib/util/audioAnimation'; 
    import { onMount, onDestroy } from 'svelte';
    import { isOpen } from '$lib/stores/states'; 

    export let stream;

    let circleStyle = ``;
    let tools: AudioAnimationTools | undefined;
    let circleStyleStoreUnsubscription: () => void | undefined; 

    onMount(() => {
        tools = new AudioAnimationTools(stream);
        tools.updateCircle();
    });

    isOpen.subscribe(value => {
        if(!value && tools) {
            tools.stop();
        }
    });
    
    $: if (tools) {
        if (circleStyleStoreUnsubscription) {
            // If the function already exists, unsubscribe to the previous circleStyleChanger store
            circleStyleStoreUnsubscription();
        }
        circleStyleStoreUnsubscription = tools.getCircleStyle().subscribe(value => {
            circleStyle = `border: 2px solid red; background-color: transparent; border-radius: 50%; ${value || ''}`;
        });
    }

    onDestroy(() => {
        if (circleStyleStoreUnsubscription) {
            // If the function exists, unsubscribe to the circleStyleChanger store
            circleStyleStoreUnsubscription();
        }
    });
</script>

<div>
    <div style={circleStyle}></div>
</div>

<script lang="ts">
    import { AudioAnimationTools } from '$lib/util/audioAnimation'; 
    import { onMount } from 'svelte';
    import { isOpen } from '$lib/stores/states'; // State of deepgram API WS connection

    export let stream;
    let circleStyle = ``;
    let tools: AudioAnimationTools | undefined; // Explicitly type tools

    onMount(() => {
        tools = new AudioAnimationTools(stream);
        tools.updateCircle();
    });

    isOpen.subscribe(value => {
        if(!value && tools) {
            tools.stop();
        }
    });
    
    // Reactive statement to update circleStyle
    $: if (tools) {
        console.log(`${tools.getCircleStyle() || ''}`);
        
        circleStyle = `border: 2px solid red; background-color: transparent; border-radius: 50%; ${tools.getCircleStyle() || ''}`;
    }
</script>

<div>
    <div style={circleStyle}></div>
</div>

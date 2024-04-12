<script>
    import { characterStore } from '$lib/stores/character';

    let text;

    async function fetchPosts() {
        // Prepare the request options
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:  JSON.stringify( $characterStore ) // Convert the character data to a JSON string
        };

        // Send the POST request
        const response = await fetch('/api/response', requestOptions);
        text = await response.text(); // Extract the text from the response
    }
</script>

<button on:click={()=> fetchPosts()}>click</button>
<p>{text}</p>

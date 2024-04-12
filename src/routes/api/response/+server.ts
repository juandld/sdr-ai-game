import { json } from '@sveltejs/kit';
import { mainConvo } from '$lib/server/chains/mainChain';

export async function POST({request, cookies}) {
    // Extract character data from the request body
    const data = await request.json();
    console.log(data);
    
    // Use the character data in your mainConvo function
    let result = await mainConvo(data);

    // Return the result as JSON
    return json(result);
}

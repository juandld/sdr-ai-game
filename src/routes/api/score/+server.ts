import { json } from '@sveltejs/kit';
import { genScore } from '$lib/server/flows/scoreFlow';

export async function POST({request}) {
    // Extract character data from the request body
    const data = await request.json();
    
    // Use the character data in your mainConvo function
    let result = await genScore(data);

    // Return the result as JSON
    return json({result:result});
}
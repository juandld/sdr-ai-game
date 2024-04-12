// src/routes/api/posts/+server.ts
import { json } from '@sveltejs/kit';
import {mainConvo} from '$lib/server/chains/mainChain'

export async function GET(event) {
     let result = await mainConvo();
     return json(result);
}

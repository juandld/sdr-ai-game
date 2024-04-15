import { ElevenLabsClient } from "elevenlabs";

export async function POST({ request }) {
    const data = await request.json();
    const { text, voice } = data; // Destructure text and voice from the parsed data    
    const elevenlabs = new ElevenLabsClient({ apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY });
    const audio = await elevenlabs.generate({ text, voice, model_id: "eleven_monolingual_v1" });
    
    // Type assertion to ReadableStream<Uint8Array>
    const audioStream = audio as unknown as ReadableStream<Uint8Array>;
    
    // Return a Response object with the audio stream as the body
    return new Response(audioStream, {
        headers: {
            'Content-Type': 'audio/mpeg', // Adjust the content type as necessary
        },
    });
}

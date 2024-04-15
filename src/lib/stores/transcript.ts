import { writable } from 'svelte/store';

type Message = {
    tag: string;
    content: string;
};

export const transcriptStore = writable({});
//export const convoStore = writable<Message[]>([{tag: "AI", content: "Hello?"}, {tag: "Human", content: "Hi Mary, this is David with Cience, how are you doing today?"}, {tag: "AI", content: "I'm well, thank you. How can I help you??"}, {tag: "Human", content: "Mary I know that as a business leader you are always looking to expand, at cience we just launched a pay per performance model for our qualified meeting generation service, I thought you would find it relevant, can i have 20 seconds of your time to expand?"}]);
export const convoStore = writable<Message[]>([{tag: "AI", content: "I must remember to stay in character, not try to be helpful, tho phone is ringing and i will pick it up."}, {tag: "AI", content: "Hello?"}]);
//export const convoStore = writable<Message[]>([{tag: "AI", content: "Hello?"}, {tag: "Human", content: "Hi Mary, this is David with Cience, how are you doing today?"}]);

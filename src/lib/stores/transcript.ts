import { writable } from 'svelte/store';

type Message = {
    tag: string;
    content: string;
};

export const transcriptStore = writable({});
export const convoStore = writable<Message[]>([{tag: "AI", content: "I must remember to stay in character, not try to be helpful, tho phone is ringing and i will pick it up."}, {tag: "AI", content: "Hello?"}]);

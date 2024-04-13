import { writable } from 'svelte/store';

type Message = {
    tag: string;
    content: string;
   };

export const transcriptStore = writable({});
export const convoStore = writable<Message[]>([{tag: "AI", content: "Hello?"}, {tag: "Human", content: "Hi, is this Mary?"}]);

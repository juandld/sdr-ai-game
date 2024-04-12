import { writable } from 'svelte/store';

type Message = {
    message: string;
    tag: string;
   };

export const transcriptStore = writable({});
export const convoStore = writable<Message[]>([]);

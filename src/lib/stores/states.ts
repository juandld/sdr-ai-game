import { writable } from 'svelte/store';

export const listening = writable(true);
export const isOpen = writable(false);
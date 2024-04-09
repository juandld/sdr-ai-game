import { writable } from 'svelte/store';
import type { Character } from '$lib/interfaces/Character';


export const characterStore = writable<Character>({
    fullName: '',
    age: '',
    role: '',
    company: '',
    location: '',
    circumstance: '',
    passing_percentage: 0,
    employees: 0
});


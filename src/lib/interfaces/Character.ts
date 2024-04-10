export interface Character {
    fullName: string;
    age: string;
    role: string;
    company: string;
    location: string;
    circumstance: string;
    passing_percentage: number;
    employees: number;
}

export type CharacterTemplates = Record<string, Character>;
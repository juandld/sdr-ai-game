// Library imports
import { LLMChain } from "langchain/chains";

// Type imports
import type { Character } from "$lib/interfaces/Character";

// Core imports
import { genCalls } from '$lib/server/chains/dynamicCall';
import { conversationTemplates } from '$lib/server/prompts/mainPrompts'
import { json } from "@sveltejs/kit";

// Generate all calls on mount, ready to use for performance
const decisionCalls = genCalls(conversationTemplates);

// Main function set
export const mainConvo = async () => {

    const chatHistory = {};
    const chatHistoryString = JSON.stringify(chatHistory);

    const response = await decisionCalls['identifyCurrentPhase']({ chatHistory: chatHistoryString });
    return response
}




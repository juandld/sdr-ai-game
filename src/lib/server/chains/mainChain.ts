import { SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { genCalls } from '$lib/server/chains/dynamicCall';
import type { Character } from "$lib/interfaces/Character";
// Stores that pass data to and from client side
import { isOpen } from '$lib/stores/states'; 
import { characterStore } from '$lib/stores/character'; 
import { transcriptStore } from '$lib/stores/transcript'; 


// Generate all calls on mount, ready to use for performance
const decisionCalls = genCalls(conversationTemplates);
const qualifications = genCalls(qualificationTemplates);

//Template objects to inject
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {fullName},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, DO NOT BREAK CHARACTER FOR ANY REASON, DO NOT ANSWER UNRELATED QUESTIONS`
)




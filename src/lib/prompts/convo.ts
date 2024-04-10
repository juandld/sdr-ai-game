import { SystemMessagePromptTemplate, AIMessagePromptTemplate } from "@langchain/core/prompts";
import { genCalls } from '$lib/chains/dynamicCall';
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import type { Character } from "$lib/interfaces/Character";

const chatLlm = new ChatOpenAI({
    temperature: 0.4,
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

// Standard step templates
const conversationTemplates = {
    "identifyPhase": `
    You are in a phone call and you recieve this message: {input0}
    
    1.intro
    2.validation
    3.qualification
    4.call to action
    5.objections 
    6.commitment
    7.closing" 
    What stage is the conversation on? respond only with the number and nothing more
    `,
    "resolveCohesion": `
    hi, how are you? {input0}
    `

}

const qualificationTemplates = {
    "intro": ``,
    "validation": ``,
    "qualification": ``,
    "cta": ``,
    "objections": ``,
    "commitment": ``,
    "closing": ``,
}

// Generate all calls on mount, ready to use for performance
const decisionCalls = genCalls(conversationTemplates);
const qualifications = genCalls(qualificationTemplates);

//Template objects to inject
const aimessageTemplate = AIMessagePromptTemplate.fromTemplate("hello?")
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {fullName},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, DO NOT BREAK CHARACTER FOR ANY REASON, DO NOT ANSWER UNRELATED QUESTIONS`
)

const chatTemplate = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("history"),
    aimessageTemplate,
    ["human", "{input}"],
]); 



// Form main chat with system and initial messages
export const characterChat = async (characterStore:Character, transcriptStore) => {

    const inception = await systemMessageTemplate.invoke(characterStore)

    const chain = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history", chatHistory: new ChatMessageHistory(inception) }),
        prompt: chatTemplate,
        llm: chatLlm,
    });
    
    console.log(transcriptStore);
    
    const results = await chain.invoke(transcriptStore)    

    return results.response
};


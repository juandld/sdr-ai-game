// Library imports
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { AIMessage } from "@langchain/core/messages";
import { SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";


// Type imports
import type { Character } from "$lib/interfaces/Character";

// Core imports
import { genCalls } from '$lib/server/chains/dynamicCall';
import { conversationTemplates } from '$lib/server/prompts/mainPrompts'
import { json } from "@sveltejs/kit";

const chatLlm = new ChatOpenAI({
    temperature: 0.4,
    verbose: false,
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    maxTokens: 80
});

// Generate all calls on mount, ready to use for performance
const decisionCalls = genCalls(conversationTemplates);
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {fullName},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, DO NOT BREAK CHARACTER FOR ANY REASON, DO NOT ANSWER UNRELATED QUESTIONS`
)
const chatTemplate = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]); 

// Main function set
export const mainConvo = async (data) => {
    
    const inception = await systemMessageTemplate.invoke(data.character)

    // Main chat save
    const chatHistory = new ChatMessageHistory(inception);
    await chatHistory.addMessage(new AIMessage("Hello?"));

    const mainChain = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history", chatHistory}),
        prompt: chatTemplate,
        llm: chatLlm,
    });

    // Cohesion assesment, always before deciding to say 'what?'
    const chatHistoryMessages = await chatHistory.getMessages();
    const cohensionResult = await decisionCalls['resolveCohesion']({ input0: JSON.stringify(chatHistoryMessages)});
    const firstResponse = "Cant hear you, maybe try again later? Bye"
    if (cohensionResult) {
        const firstResponse = await mainChain.invoke({input: "hello, this mary?"});
    } else {

    }
    return firstResponse
}




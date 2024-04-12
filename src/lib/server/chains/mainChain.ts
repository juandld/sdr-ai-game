// Library imports
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";

// Core imports
import { genCalls } from '$lib/server/chains/dynamicCall';
import { genChatHistory } from '$lib/server/util/chatHistory'
import { conversationTemplates } from '$lib/server/prompts/mainPrompts'

// Main chat llm
const chatLlm = new ChatOpenAI({
    temperature: 0.4,
    verbose: false,
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    maxTokens: 80
});

// Generate all calls on mount, ready to use for performance

// Main function set
export const genMainChain = async (chatHistory, chatTemplate) => {

    const mainChain = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history", chatHistory }),
        prompt: chatTemplate,
        llm: chatLlm,
    });

    return mainChain
}




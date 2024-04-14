// Library imports
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";

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
export const genMainChain = async (chatTemplate, bufferMemory) => {

    const mainChain = new ConversationChain({
        memory: bufferMemory,
        prompt: chatTemplate,
        llm: chatLlm,
    });

    return mainChain
}




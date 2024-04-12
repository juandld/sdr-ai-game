import { genCalls } from "../chains/dynamicCall";
import { genMainChain } from "../chains/mainChain";
import { genChatHistory } from "../util/chatHistory";
import { conversationTemplates } from "../prompts/mainPrompts";


export const starterConvo = async (data:any) => {
    const { chatHistory, chatTemplate } = await genChatHistory(data.character, data.chat)
    const mainChain = genMainChain(chatHistory, chatTemplate)
    const decisionCalls = genCalls(conversationTemplates);



    // Veriify chat coherence
    const coherence = await decisionCalls['resolveCohesion'](JSON.stringify(data.chat))
    // Verify chat stage
    const stage = await decisionCalls['identifyCurrentPhase'](JSON.stringify(data.chat))


}


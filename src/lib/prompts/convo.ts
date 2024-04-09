import { SystemMessagePromptTemplate, AIMessagePromptTemplate } from "@langchain/core/prompts";
import { genCalls } from '$lib/chains/dynamicCall';

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { InMemoryStore } from 'langchain/storage/in_memory';

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
    "resolveCohesion":`
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

const aimessageTemplate = AIMessagePromptTemplate.fromTemplate("hello?")
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {name},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, a Sales Development Representative (SDR) from
    CIENCE Technologies, and will try to get you to book a meeting. 
    Navigate this conversation focusing on your company goals and personal interests,
    showing skepticism, curiosity, or interest based on the SDR's performance`
)

const chatTemplate = ChatPromptTemplate.fromMessages([
    systemMessageTemplate,
    aimessageTemplate
]);

export const spawnCharacter = async (characterStore) => {

    const messages = await chatTemplate.formatMessages({characterStore});
    return messages
}

